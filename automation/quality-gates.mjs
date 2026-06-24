#!/usr/bin/env node
// Five adversarial quality gates for a blog draft, run as a CI check on the PR.
// Reads the changed IT blog file(s) (+ EN counterpart), grades each with Claude,
// writes a scorecard to GITHUB_STEP_SUMMARY and automation/.gate-report.md (posted
// to the PR by the workflow), and exits non-zero if any hard gate fails.
//
// Usage: node automation/quality-gates.mjs [src/content/blog/foo.md ...]
//   (no args → git diff against origin/main for changed src/content/blog/*.md)

import { readFileSync, existsSync, writeFileSync, appendFileSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.GATE_MODEL || "claude-sonnet-4-6";
const client = new Anthropic();

function changedFiles() {
  const args = process.argv.slice(2).filter((a) => a.endsWith(".md"));
  if (args.length) return args;
  try {
    execSync("git fetch origin main --depth=1", { stdio: "ignore" });
    const out = execSync("git diff --name-only origin/main...HEAD", { encoding: "utf8" });
    return out.split("\n").filter((f) => /^src\/content\/blog\/[^/]+\.md$/.test(f.trim()));
  } catch { return []; }
}

const llms = (() => { try { return readFileSync("public/llms.txt", "utf8"); } catch { return ""; } })();
const sys = (() => { try { return readFileSync("automation/system-prompt.md", "utf8"); } catch { return ""; } })();

// Deterministic allowlist of real, published routes (IT + EN) — so the fact-check gate
// validates internal links against ground truth instead of guessing from a truncated
// llms.txt slice (which caused false "unverifiable route" failures on /en/ links).
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
]);

const LENSES = [
  { g: "fact-check", crit: `Two checks ONLY. Do not fact-check external world events you cannot see.
1) SORAIA/CLIENT NUMBERS: every metric, %, price, client result, or delivery-time claim about Soraia or a Soraia client must be traceable to public/llms.txt or a published case study. FAIL if such a number is fabricated, unverifiable, or contradicts llms.txt.
2) INTERNAL LINKS: every internal link must appear in the VALID ROUTES list below (ignore trailing slashes). FAIL on any link not in the list, or any cite/link to oggi-lavoro or aegis (draft → 404).
EXTERNAL facts (laws/regulations like the EU AI Act or GDPR, public institutions, dated public events) are ACCEPTABLE when attributed to a named source (e.g. "Regolamento UE 2024/1689, art. 99", "Parlamento europeo, giugno 2026") — do NOT fail them merely because they post-date your knowledge or are absent from llms.txt; that is editorial, out of scope for this gate. Only fail an external claim if it carries a specific number/date with NO attribution at all.

VALID ROUTES (the complete set of real published routes):
${[...VALID_ROUTES].sort().join("  ")}

SOURCE OF TRUTH for Soraia/client numbers (llms.txt):
${llms.slice(0, 6000)}` },
  { g: "originality", crit: `FAIL if the article substantially re-covers a topic already owned by the existing guides/posts (agenti IA, AI Act, consulenza AI, costi consulenza, formazione AI, ROI framework, ChatGPT-vs-agents) instead of the intended gap. Note overlaps.` },
  { g: "brand-voice", crit: `Judge against Soraia's voice rules. FAIL on any banned phrase ("digital transformation", "rivoluziona", "soluzione magica", generic hype), if the "paghi solo se funziona" guarantee is softened where mentioned, or if it reads like generic AI slop instead of an operationally-honest practitioner.\n\nVOICE RULES (excerpt):\n${sys.slice(0, 3500)}` },
  { g: "seo-structure", crit: `FAIL if: title >60 chars or missing the primary keyword; meta description not 140-160 chars; no "In breve:" TL;DR block with standalone quotable bullets; FAQ not 3-7 items; fewer than 3 internal links to published pages; body length outside ~450-1500 words; or EN metrics differ from IT.` },
  { g: "geo-citability", crit: `Would an LLM (ChatGPT/Perplexity) lift a clean, correct answer from this for a real buyer question? FAIL if there is no self-contained, quotable definition/answer block or the key takeaways are not standalone. Suggest the single highest-impact fix.` },
];

const VERDICT_INSTR = `Return ONLY JSON: {"pass": boolean, "score": number 0-10, "issues": ["..."]}. issues=[] when pass. No prose outside JSON.`;

function parse(text) {
  const s = text.indexOf("{"), e = text.lastIndexOf("}");
  try { return JSON.parse(text.slice(s, e + 1)); } catch { return { pass: false, score: 0, issues: ["judge returned unparseable output"] }; }
}

// Compute the countable metrics deterministically and hand them to the judge, so the
// seo-structure lens uses exact figures instead of (unreliably) eyeballing char counts.
function metrics(src, label) {
  if (!src) return `${label}: (file not found)`;
  const parts = src.split(/^---$/m);
  const fm = parts[1] || "", body = parts.slice(2).join("---");
  const title = (fm.match(/^title:\s*"(.*)"$/m) || [, ""])[1];
  const desc = (fm.match(/^description:\s*"(.*)"$/m) || [, ""])[1];
  const faq = (fm.match(/^\s*-\s*q:/gm) || []).length;
  const words = (body.trim().match(/\S+/g) || []).length;
  const links = [...body.matchAll(/\]\((\/[^)]*)\)|href="(\/[^"]*)"/g)].map((m) => (m[1] || m[2]).replace(/[#?].*$/, "").replace(/\/$/, "")).filter((r) => r.startsWith("/"));
  const valid = links.filter((r) => VALID_ROUTES.has(r || "/"));
  return `${label}: title=${title.length} chars, meta description=${desc.length} chars, FAQ items=${faq}, body=${words} words, internal links=${links.length} (${valid.length} resolve to published routes)`;
}

const files = changedFiles();
if (!files.length) { console.log("No changed blog .md files — nothing to gate."); process.exit(0); }

let anyFail = false;
const report = ["## 🧪 Blog quality gates\n"];

for (const itPath of files) {
  if (!existsSync(itPath)) continue;
  const it = readFileSync(itPath, "utf8");
  const slugIt = itPath.split("/").pop().replace(/\.md$/, "");
  // find EN counterpart via BLOG_SLUG_MAP in i18n.ts
  let en = "";
  try {
    const map = readFileSync("src/lib/i18n.ts", "utf8");
    const m = map.match(new RegExp(`"${slugIt}":\\s*"([^"]+)"`));
    if (m && existsSync(`src/content/blog/en/${m[1]}.md`)) en = readFileSync(`src/content/blog/en/${m[1]}.md`, "utf8");
  } catch {}

  report.push(`\n### \`${slugIt}\``);
  const measured = `MEASURED METRICS (authoritative — use these EXACT counts, do NOT recount):\n${metrics(it, "IT")}\n${metrics(en, "EN")}\n\n`;
  const article = (measured + `IT FILE (${itPath}):\n${it}\n\nEN FILE:\n${en || "(not found)"}`).slice(0, 28000);

  const verdicts = await Promise.all(LENSES.map(async (l) => {
    try {
      const r = await client.messages.create({
        model: MODEL, max_tokens: 1200,
        system: `You are an adversarial editorial gate for Soraia's blog. Be strict and specific. ${VERDICT_INSTR}`,
        messages: [{ role: "user", content: `GATE: ${l.g}\nCRITERIA: ${l.crit}\n\nARTICLE:\n${article}` }],
      });
      const v = parse(r.content.filter((b) => b.type === "text").map((b) => b.text).join(""));
      return { g: l.g, ...v };
    } catch (e) { return { g: l.g, pass: false, score: 0, issues: ["API error: " + (e?.message || e)] }; }
  }));

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

if (anyFail) { console.error("\n✗ One or more quality gates failed."); process.exit(1); }
console.log("\n✓ All quality gates passed.");
