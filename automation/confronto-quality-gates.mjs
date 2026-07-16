#!/usr/bin/env node
// Quality gates for an A-vs-B comparison draft: one deterministic check (house-style) +
// six adversarial LLM gates (fact-check, originality, brand-voice, seo-structure, geo-citability,
// balance). The `balance` gate is confronto-specific: both options must have real pros AND cons
// and the verdict must be nuanced, not a one-sided ad. Writes a scorecard to
// automation/.gate-report.md and exits non-zero on any failure.
//
// Usage: node automation/confronto-quality-gates.mjs [src/content/confronti/foo.md ...]

import { readFileSync, existsSync, writeFileSync, appendFileSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import Anthropic from "@anthropic-ai/sdk";
import { FANCY_DASH } from "./house-style.mjs";

const MODEL = process.env.GATE_MODEL || "claude-sonnet-4-6";
const client = new Anthropic();

function changedFiles() {
  const args = process.argv.slice(2).filter((a) => a.endsWith(".md"));
  if (args.length) return args;
  try {
    execSync("git fetch origin main --depth=1", { stdio: "ignore" });
    const out = execSync("git diff --name-only origin/main...HEAD", { encoding: "utf8" });
    return out.split("\n").filter((f) => /^src\/content\/confronti\/[^/]+\.md$/.test(f.trim()));
  } catch { return []; }
}

const llms = (() => { try { return readFileSync("public/llms.txt", "utf8"); } catch { return ""; } })();
const sys = (() => { try { return readFileSync("automation/confronto-system-prompt.md", "utf8"); } catch { return ""; } })();

function walkPages(dir, base = "") {
  const out = [];
  let entries; try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    if (e.isDirectory()) { out.push(...walkPages(`${dir}/${e.name}`, `${base}/${e.name}`)); continue; }
    if (!e.name.endsWith(".astro") || e.name.includes("[")) continue;
    const n = e.name.replace(/\.astro$/, "");
    out.push(n === "index" ? (base || "/") : `${base}/${n}`);
  }
  return out;
}
const undraft = (p) => { try { return !/^draft:\s*true\b/m.test(readFileSync(p, "utf8")); } catch { return true; } };
const mdSlugs = (dir) => { try { return readdirSync(dir).filter((f) => f.endsWith(".md") && undraft(`${dir}/${f}`)).map((f) => f.replace(/\.md$/, "")); } catch { return []; } };
const VALID_ROUTES = new Set([
  ...walkPages("src/pages"),
  ...mdSlugs("src/content/case-studies").map((s) => `/case-studies/${s}`),
  ...mdSlugs("src/content/case-studies/en").map((s) => `/en/case-studies/${s}`),
  ...mdSlugs("src/content/guides").map((s) => `/guide/${s}`),
  ...mdSlugs("src/content/guides/en").map((s) => `/en/guide/${s}`),
  ...mdSlugs("src/content/blog").map((s) => `/blog/${s}`),
  ...mdSlugs("src/content/blog/en").map((s) => `/en/blog/${s}`),
  ...mdSlugs("src/content/confronti").map((s) => `/confronto/${s}`),
  ...mdSlugs("src/content/confronti/en").map((s) => `/en/confronto/${s}`),
]);

const LENSES = [
  { g: "fact-check", crit: `FAIL if any metric/%/price/result about Soraia or a client is fabricated, unverifiable, or contradicts public/llms.txt (below). FAIL if any internal link (in faq answers / descriptions / verdetto) is not in VALID ROUTES, or cites oggi-lavoro/aegis. External facts (laws, market data) are OK if attributed to a named source.\n\nVALID ROUTES:\n${[...VALID_ROUTES].sort().join("  ")}\n\nSOURCE OF TRUTH (llms.txt):\n${llms.slice(0, 5500)}` },
  { g: "originality", crit: `FAIL if this comparison substantially duplicates an existing confronto already on disk, or merely re-covers a blog/guide topic instead of being a genuine A-vs-B decision page. Note overlaps.` },
  { g: "brand-voice", crit: `Judge VOICE ONLY. FAIL on banned phrases ("digital transformation", "rivoluziona", "soluzione magica", "game-changer", empty hype, fearmongering) or generic AI slop. Do NOT fail on sourcing/links/CTA.\n\nVOICE RULES (excerpt):\n${sys.slice(0, 3000)}` },
  { g: "seo-structure", crit: `Use the MEASURED METRICS provided; do not recount. FAIL if: titolo >60 chars or missing the primary keyword; description not 140-160 chars; inBreve missing or under ~120 chars; FAQ not 3-6 items; fewer than 3 table rows; fewer than 2 internal links to published pages; or EN metrics differ materially from IT.` },
  { g: "geo-citability", crit: `Would an LLM lift a clean answer to "should I choose A or B" from the inBreve block? FAIL if inBreve is not a self-contained, situation-dependent verdict citable verbatim, or if the option names/entity naming are ambiguous. Suggest the single highest-impact fix.` },
  { g: "balance", crit: `Confronto-specific honesty gate. FAIL if EITHER option lacks real pros OR real cons (a side with no downsides is banned), if the comparison is rigged toward one option, or if the verdetto is a one-sided ad rather than a nuanced, situation-dependent recommendation ("choose A when..., B when..."). A fair comparison that still concludes Soraia's approach wins in most SME cases is fine IF the reasoning is honest and the other side's real strengths are acknowledged.` },
];

const VERDICT_INSTR = `Return ONLY JSON: {"pass": boolean, "score": number 0-10, "issues": ["..."]}. issues=[] when pass. No prose outside JSON.`;
function parse(text) { const s = text.indexOf("{"), e = text.lastIndexOf("}"); try { return JSON.parse(text.slice(s, e + 1)); } catch { return { pass: false, score: 0, issues: ["judge returned unparseable output"] }; } }

function metrics(src, label) {
  if (!src) return `${label}: (file not found)`;
  const titolo = (src.match(/^titolo:\s*"(.*)"$/m) || [, ""])[1];
  const desc = (src.match(/^description:\s*"(.*)"$/m) || [, ""])[1];
  const inBreve = (src.match(/^inBreve:\s*"(.*)"$/m) || [, ""])[1];
  const verdetto = (src.match(/^verdetto:\s*"(.*)"$/m) || [, ""])[1];
  const faq = (src.match(/^\s{2}-\s*q:/gm) || []).length;
  const rows = (src.match(/^\s{2}-\s*criterio:/gm) || []).length;
  const links = [...src.matchAll(/\]\((\/[^)]*)\)|href=['"](\/[^'"]*)['"]/g)].map((m) => (m[1] || m[2]).replace(/[#?].*$/, "").replace(/\/$/, "")).filter((r) => r.startsWith("/"));
  const valid = links.filter((r) => VALID_ROUTES.has(r || "/"));
  return `${label}: titolo=${titolo.length} chars, description=${desc.length} chars, inBreve=${inBreve.length} chars, verdetto=${verdetto.length} chars, FAQ items=${faq}, table rows=${rows}, internal links=${links.length} (${valid.length} resolve to published routes)`;
}

function dashGate(it, en) {
  const hits = [];
  for (const [label, src] of [["IT", it], ["EN", en]]) {
    if (!src) continue;
    src.split("\n").forEach((ln, i) => { if (FANCY_DASH.test(ln)) hits.push(`${label} line ${i + 1}: ${ln.trim().slice(0, 88)}`); });
  }
  return { g: "house-style", pass: hits.length === 0, score: hits.length === 0 ? 10 : 0,
    issues: hits.length ? ["House style is ASCII-hyphen only. Replace every em dash, en dash, horizontal bar or minus sign with a hyphen or a comma/colon. Offending lines:", ...hits] : [] };
}

const files = changedFiles();
if (!files.length) { console.log("No changed confronto .md files, nothing to gate."); process.exit(0); }

let anyFail = false;
const report = ["## ⚖️ Confronto quality gates\n"];

for (const itPath of files) {
  if (!existsSync(itPath)) continue;
  const it = readFileSync(itPath, "utf8");
  const slugIt = itPath.split("/").pop().replace(/\.md$/, "");
  let en = "";
  try {
    const map = readFileSync("src/lib/i18n.ts", "utf8");
    const m = map.match(new RegExp(`"${slugIt}":\\s*"([^"]+)"`));
    if (m && existsSync(`src/content/confronti/en/${m[1]}.md`)) en = readFileSync(`src/content/confronti/en/${m[1]}.md`, "utf8");
  } catch {}

  report.push(`\n### \`${slugIt}\``);
  const measured = `MEASURED METRICS (authoritative, use these EXACT counts):\n${metrics(it, "IT")}\n${metrics(en, "EN")}\n\n`;
  const article = (measured + `IT FILE (${itPath}):\n${it}\n\nEN FILE:\n${en || "(not found)"}`).slice(0, 30000);

  const llmVerdicts = await Promise.all(LENSES.map(async (l) => {
    try {
      const r = await client.messages.create({ model: MODEL, max_tokens: 1200,
        system: `You are an adversarial editorial gate for Soraia's A-vs-B comparisons. Be strict and specific. ${VERDICT_INSTR}`,
        messages: [{ role: "user", content: `GATE: ${l.g}\nCRITERIA: ${l.crit}\n\nCOMPARISON:\n${article}` }] });
      const v = parse(r.content.filter((b) => b.type === "text").map((b) => b.text).join(""));
      return { g: l.g, ...v };
    } catch (e) { return { g: l.g, pass: false, score: 0, issues: ["API error: " + (e?.message || e)] }; }
  }));
  const verdicts = [dashGate(it, en), ...llmVerdicts];

  for (const v of verdicts) {
    const icon = v.pass ? "✅" : "❌";
    if (!v.pass) anyFail = true;
    report.push(`- ${icon} **${v.g}** (${v.score ?? "?"}/10)${v.pass ? "" : "\n" + (v.issues || []).map((i) => `    - ${i}`).join("\n")}`);
  }
}

const md = report.join("\n");
writeFileSync("automation/.gate-report.md", md + "\n");
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + "\n");
console.log(md);
if (anyFail) { console.error("\n✗ One or more confronto quality gates failed."); process.exit(1); }
console.log("\n✓ All confronto quality gates passed.");
