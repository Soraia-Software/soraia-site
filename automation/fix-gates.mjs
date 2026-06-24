#!/usr/bin/env node
// Auto-correct a blog draft that FAILED the quality gates. Reads the latest gate
// findings + the changed IT blog file(s) (+ EN counterpart), asks Claude to apply the
// MINIMAL targeted edits to resolve exactly those findings (preserving voice, structure,
// frontmatter, and everything unrelated), and writes the corrected files back.
// Run by the `autofix` job in quality-gates.yml; bounded by MAX_AUTOFIX attempts
// (the workflow counts prior "Auto-fix attempt" commits before invoking this).
//
// Local dry run (no API call, no writes): node automation/fix-gates.mjs --dry-run <it.md>

import { readFileSync, existsSync, writeFileSync, readdirSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";

const DRY = process.argv.includes("--dry-run");
const MODEL = process.env.AUTHOR_MODEL || "claude-opus-4-8"; // fixing needs a capable model
const die = (m) => { console.error("✗ " + m); process.exit(1); };

// Same deterministic route allowlist the gate uses, so fixes only point at real routes.
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
const VALID_ROUTES = [
  ...walkPages("src/pages"),
  ...mdSlugs("src/content/case-studies").map((s) => `/case-studies/${s}`),
  ...mdSlugs("src/content/case-studies/en").map((s) => `/en/case-studies/${s}`),
  ...mdSlugs("src/content/guides").map((s) => `/guide/${s}`),
  ...mdSlugs("src/content/guides/en").map((s) => `/en/guide/${s}`),
].sort();

function extractJson(text) {
  let t = String(text).trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const s = t.indexOf("{"), e = t.lastIndexOf("}");
  if (s === -1 || e === -1) die("No JSON object found in model output");
  return JSON.parse(t.slice(s, e + 1));
}
const measure = (src) => {
  const fm = src.split(/^---$/m)[1] || "";
  const t = (fm.match(/^title:\s*"(.*)"$/m) || [, ""])[1];
  const d = (fm.match(/^description:\s*"(.*)"$/m) || [, ""])[1];
  return `title=${t.length} chars, meta description=${d.length} chars`;
};

const files = process.argv.slice(2).filter((a) => /^src\/content\/blog\/[^/]+\.md$/.test(a));
if (!files.length) { console.log("No IT blog files passed; nothing to fix."); process.exit(0); }

const findings = (() => { try { return readFileSync(process.env.FINDINGS_FILE || "automation/.gate-findings.md", "utf8"); } catch { return ""; } })();
if (!findings.trim()) die("No gate findings available to fix against.");
const llms = (() => { try { return readFileSync("public/llms.txt", "utf8"); } catch { return ""; } })();
const sysRules = (() => { try { return readFileSync("automation/system-prompt.md", "utf8"); } catch { return ""; } })();

const client = DRY ? null : new Anthropic();

for (const itPath of files) {
  if (!existsSync(itPath)) continue;
  const it = readFileSync(itPath, "utf8");
  const slugIt = itPath.split("/").pop().replace(/\.md$/, "");
  let enPath = "", en = "";
  try {
    const map = readFileSync("src/lib/i18n.ts", "utf8");
    const m = map.match(new RegExp(`"${slugIt}":\\s*"([^"]+)"`));
    if (m) { enPath = `src/content/blog/en/${m[1]}.md`; if (existsSync(enPath)) en = readFileSync(enPath, "utf8"); }
  } catch {}

  const user = [
    "A Soraia blog draft FAILED one or more quality gates. Apply the MINIMAL edits needed to resolve EXACTLY the flagged issues. Do not rewrite the article, do not change the voice or the argument, do not touch anything unrelated to a finding. If a finding is NOT fixable by editing the text (e.g. the topic substantially overlaps an existing post), leave the files unchanged and say so in `changes`.",
    "",
    "GATE FINDINGS TO RESOLVE:\n" + findings,
    "",
    "CONSTRAINTS you must keep satisfied: meta description 140-160 chars; title ≤60 chars (both include the primary keyword); FAQ 3-7 items; ≥3 internal links; body 450-1500 words; EN metrics match IT; keep `draft: true` and `lang` unchanged. Invent no numbers — Soraia/client figures must trace to llms.txt; external facts must be attributed to a named source.",
    `CURRENT MEASUREMENTS — IT ${measure(it)}${en ? `; EN ${measure(en)}` : ""}.`,
    "",
    "Internal links may ONLY be one of these real published routes:\n" + VALID_ROUTES.join("  "),
    "",
    "SOURCE OF TRUTH for Soraia/client numbers:\n" + llms.slice(0, 5000),
    "",
    "VOICE RULES (do not violate):\n" + sysRules.slice(0, 2500),
    "",
    `IT FILE (${itPath}):\n${it}`,
    enPath ? `\nEN FILE (${enPath}):\n${en}` : "\n(no EN counterpart found)",
    "",
    'Return ONLY strict JSON: {"it_md": "<COMPLETE corrected IT file>", "en_md": "<COMPLETE corrected EN file, or \\"\\" if unchanged/none>", "changes": ["one short note per fix, or why unfixable"]}. The *_md fields must be the full file contents (frontmatter + body), byte-for-byte except the minimal fixes. No prose outside the JSON.',
  ].join("\n");

  console.log(`→ auto-fixing ${itPath}${enPath ? " + " + enPath : ""} · ${MODEL}`);
  if (DRY) { console.log(`dry-run: findings ${findings.length}B, routes ${VALID_ROUTES.length}, IT ${measure(it)}${en ? `, EN ${measure(en)}` : ""}. No API call, no writes.`); continue; }

  let resp;
  try { resp = await client.messages.create({ model: MODEL, max_tokens: 16000, messages: [{ role: "user", content: user }] }); }
  catch (e) { die("Anthropic API error: " + (e?.message || e)); }
  const text = resp.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  const out = extractJson(text);
  if (!out.it_md || !/^---/.test(out.it_md.trim())) die("Model returned no valid it_md");
  if (!/^draft:\s*true\b/m.test(out.it_md)) die("Refusing to write: it_md lost `draft: true` (safety)");

  writeFileSync(itPath, out.it_md.endsWith("\n") ? out.it_md : out.it_md + "\n");
  if (enPath && out.en_md && /^---/.test(out.en_md.trim())) {
    if (!/^draft:\s*true\b/m.test(out.en_md)) die("Refusing to write: en_md lost `draft: true` (safety)");
    writeFileSync(enPath, out.en_md.endsWith("\n") ? out.en_md : out.en_md + "\n");
  }
  console.log("✓ fixes applied:", (out.changes || []).join(" | ") || "(none reported)");
}
