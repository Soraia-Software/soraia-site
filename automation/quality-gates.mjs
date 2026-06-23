#!/usr/bin/env node
// Five adversarial quality gates for a blog draft, run as a CI check on the PR.
// Reads the changed IT blog file(s) (+ EN counterpart), grades each with Claude,
// writes a scorecard to GITHUB_STEP_SUMMARY and automation/.gate-report.md (posted
// to the PR by the workflow), and exits non-zero if any hard gate fails.
//
// Usage: node automation/quality-gates.mjs [src/content/blog/foo.md ...]
//   (no args → git diff against origin/main for changed src/content/blog/*.md)

import { readFileSync, existsSync, writeFileSync, appendFileSync } from "node:fs";
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

const LENSES = [
  { g: "fact-check", crit: `Every number/%, price, date, and client claim must be traceable to public/llms.txt or a published case study. FAIL if any is unverifiable, fabricated, or if it cites/links oggi-lavoro or aegis (both draft → 404), or links a non-existent route.\n\nSOURCE OF TRUTH (llms.txt):\n${llms.slice(0, 6000)}` },
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
  const article = `IT FILE (${itPath}):\n${it}\n\nEN FILE:\n${en || "(not found)"}`.slice(0, 28000);

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
