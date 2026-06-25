#!/usr/bin/env node
// Quality gates for an operative-guide draft, run as a CI check on the PR: two deterministic
// checks (house-style + expert-cta, no API) + six adversarial LLM gates graded by Claude
// (fact-check, originality, brand-voice, seo-structure, geo-citability, honesty).
// Because guides auto-publish hands-off, the honesty + expert-cta gates carry the safety load:
// every external regulatory/fiscal claim must be attributed, and every guide must route the
// reader to Soraia for an honest expert opinion on their own case.
// Reads the changed IT guide file(s) (+ EN counterpart), writes a scorecard to
// GITHUB_STEP_SUMMARY and automation/.gate-report.md, and exits non-zero if any gate fails.
//
// Usage: node automation/guide-quality-gates.mjs [src/content/guides/foo.md ...]
//   (no args → git diff against origin/main for changed src/content/guides/*.md)

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
    return out.split("\n").filter((f) => /^src\/content\/guides\/[^/]+\.md$/.test(f.trim()));
  } catch { return []; }
}

const llms = (() => { try { return readFileSync("public/llms.txt", "utf8"); } catch { return ""; } })();
const sys = (() => { try { return readFileSync("automation/guide-system-prompt.md", "utf8"); } catch { return ""; } })();

// Deterministic allowlist of real, published routes (IT + EN), built from src/pages + content.
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
EXTERNAL facts (laws/regulations like the EU AI Act, GDPR, NIS2, a Garante Privacy ruling, a tax incentive) are ACCEPTABLE when attributed to a named source (e.g. "Regolamento UE 2024/1689, art. 99", "Garante Privacy, provvedimento n. ...", "Agenzia delle Entrate"). Do NOT fail them merely because they post-date your knowledge. Only fail an external claim if it carries a specific number/date/article with NO attribution at all.

VALID ROUTES (the complete set of real published routes):
${[...VALID_ROUTES].sort().join("  ")}

SOURCE OF TRUTH for Soraia/client numbers (llms.txt):
${llms.slice(0, 6000)}` },
  { g: "originality", crit: `FAIL if the guide substantially re-covers a topic already owned by the five pillar guides (agenti IA per aziende, AI Act per aziende [the law overview], consulenza AI Italia, costi consulenza AI, formazione AI aziendale) or by another existing guide, instead of taking a DISTINCT operative or timely angle (a checklist, a template, a regulatory update, a decision framework). A guide that LINKS to a pillar for background while owning a new angle is fine. Note any real overlap.` },
  { g: "brand-voice", crit: `Judge VOICE ONLY. FAIL on: any banned phrase ("digital transformation", "rivoluziona", "soluzione magica", "game-changer", empty hype, fearmongering); or prose that reads like generic AI slop rather than an operationally-honest senior practitioner. Do NOT fail on factual sourcing, metrics, internal links/routes, or the CTA, other gates own those.\n\nVOICE RULES (excerpt):\n${sys.slice(0, 3500)}\n\nPublished clients (valid citations, do not flag these):\n${(llms.match(/\[[^\]]+\]/g) || []).join(" ")}` },
  { g: "seo-structure", crit: `Use the MEASURED METRICS provided; do not recount. FAIL if: title >60 chars or missing the primary keyword; meta description not 140-160 chars; FAQ not 3-8 items; fewer than 3 internal links to published pages; body length outside ~800-1600 words; no clear sectioned structure (at least 3 H2 sections); or EN metrics differ materially from IT.` },
  { g: "geo-citability", crit: `Would an LLM (ChatGPT/Perplexity) lift a clean, correct answer from this guide for a real buyer question? FAIL if there is no self-contained, quotable opening answer/definition or the key takeaways and FAQ answers are not standalone. Suggest the single highest-impact fix.` },
  { g: "honesty", crit: `Judge HONESTY + EXPERT-OPINION FRAMING (this guide auto-publishes, so be strict). FAIL if ANY of:
1) an external regulatory/fiscal/market fact (a law, article number, deadline, fine, incentive, regulator decision, statistic) is stated WITHOUT attribution to a named source;
2) the guide presents itself as definitive legal/tax/compliance advice for the reader's specific company, rather than general guidance;
3) the guide does NOT clearly invite the reader to get an HONEST EXPERT OPINION from Soraia on their own situation;
4) overclaiming, hype, fearmongering, or false certainty about an evolving rule.
PASS if the guide is factual, attributes every external claim to a named source, is honest about limitations and what does NOT apply, and routes the reader to Soraia for a tailored honest opinion. Note the single highest-impact fix.

SOURCE OF TRUTH for Soraia/client numbers:\n${llms.slice(0, 4000)}` },
];

const VERDICT_INSTR = `Return ONLY JSON: {"pass": boolean, "score": number 0-10, "issues": ["..."]}. issues=[] when pass. No prose outside JSON.`;

function parse(text) {
  const s = text.indexOf("{"), e = text.lastIndexOf("}");
  try { return JSON.parse(text.slice(s, e + 1)); } catch { return { pass: false, score: 0, issues: ["judge returned unparseable output"] }; }
}

// Deterministic metrics handed to the seo-structure lens so it uses exact figures.
function metrics(src, label) {
  if (!src) return `${label}: (file not found)`;
  const parts = src.split(/^---$/m);
  const fm = parts[1] || "", body = parts.slice(2).join("---");
  const title = (fm.match(/^title:\s*"(.*)"$/m) || [, ""])[1];
  const desc = (fm.match(/^description:\s*"(.*)"$/m) || [, ""])[1];
  const faq = (fm.match(/^\s*-\s*q:/gm) || []).length;
  const words = (body.trim().match(/\S+/g) || []).length;
  const h2 = (body.match(/^##\s+/gm) || []).length;
  const links = [...body.matchAll(/\]\((\/[^)]*)\)|href="(\/[^"]*)"/g)].map((m) => (m[1] || m[2]).replace(/[#?].*$/, "").replace(/\/$/, "")).filter((r) => r.startsWith("/"));
  const valid = links.filter((r) => VALID_ROUTES.has(r || "/"));
  return `${label}: title=${title.length} chars, meta description=${desc.length} chars, FAQ items=${faq}, body=${words} words, H2 sections=${h2}, internal links=${links.length} (${valid.length} resolve to published routes)`;
}

// Deterministic house-style gate (no API): ASCII-hyphen only, no typographic dash.
function dashGate(it, en) {
  const hits = [];
  for (const [label, src] of [["IT", it], ["EN", en]]) {
    if (!src) continue;
    src.split("\n").forEach((ln, i) => {
      if (FANCY_DASH.test(ln)) hits.push(`${label} line ${i + 1}: ${ln.trim().slice(0, 88)}`);
    });
  }
  return {
    g: "house-style",
    pass: hits.length === 0,
    score: hits.length === 0 ? 10 : 0,
    issues: hits.length
      ? ["House style is ASCII-hyphen only. Replace every em dash, en dash, horizontal bar or minus sign with a hyphen (in ranges, e.g. 10-50k) or a comma/colon/full stop (in prose). Offending lines:", ...hits]
      : [],
  };
}

// Deterministic expert-CTA gate (no API): every guide MUST route the reader to Soraia for an
// honest expert opinion. IT body must link /parliamone, EN body must link /en/contact.
function expertCtaGate(it, en) {
  const miss = [];
  if (it && !/\/parliamone\b/.test(it)) miss.push("IT guide: missing the contact link /parliamone in the closing CTA.");
  if (en && !/\/en\/contact\b/.test(en)) miss.push("EN guide: missing the contact link /en/contact in the closing CTA.");
  return {
    g: "expert-cta",
    pass: miss.length === 0,
    score: miss.length === 0 ? 10 : 0,
    issues: miss.length
      ? ["Every guide must invite an honest expert opinion from Soraia, with a contact link in the closing section. Add it:", ...miss]
      : [],
  };
}

const files = changedFiles();
if (!files.length) { console.log("No changed guide .md files, nothing to gate."); process.exit(0); }

let anyFail = false;
const report = ["## 🧭 Guide quality gates\n"];

for (const itPath of files) {
  if (!existsSync(itPath)) continue;
  const it = readFileSync(itPath, "utf8");
  const slugIt = itPath.split("/").pop().replace(/\.md$/, "");
  // find EN counterpart via GUIDE_SLUG_MAP in i18n.ts
  let en = "";
  try {
    const map = readFileSync("src/lib/i18n.ts", "utf8");
    const m = map.match(new RegExp(`"${slugIt}":\\s*"([^"]+)"`));
    if (m && existsSync(`src/content/guides/en/${m[1]}.md`)) en = readFileSync(`src/content/guides/en/${m[1]}.md`, "utf8");
  } catch {}

  report.push(`\n### \`${slugIt}\``);
  const measured = `MEASURED METRICS (authoritative, use these EXACT counts, do NOT recount):\n${metrics(it, "IT")}\n${metrics(en, "EN")}\n\n`;
  const article = (measured + `IT FILE (${itPath}):\n${it}\n\nEN FILE:\n${en || "(not found)"}`).slice(0, 32000);

  const llmVerdicts = await Promise.all(LENSES.map(async (l) => {
    try {
      const r = await client.messages.create({
        model: MODEL, max_tokens: 1200,
        system: `You are an adversarial editorial gate for Soraia's operative guides. Be strict and specific. ${VERDICT_INSTR}`,
        messages: [{ role: "user", content: `GATE: ${l.g}\nCRITERIA: ${l.crit}\n\nGUIDE:\n${article}` }],
      });
      const v = parse(r.content.filter((b) => b.type === "text").map((b) => b.text).join(""));
      return { g: l.g, ...v };
    } catch (e) { return { g: l.g, pass: false, score: 0, issues: ["API error: " + (e?.message || e)] }; }
  }));
  // Deterministic gates run first (free, no API), then the LLM lenses.
  const verdicts = [dashGate(it, en), expertCtaGate(it, en), ...llmVerdicts];

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

if (anyFail) { console.error("\n✗ One or more guide quality gates failed."); process.exit(1); }
console.log("\n✓ All guide quality gates passed.");
