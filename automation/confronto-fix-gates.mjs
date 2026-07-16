#!/usr/bin/env node
// Auto-correct an A-vs-B comparison draft that FAILED the quality gates. Reads the latest
// gate findings + the changed IT confronto file (+ EN counterpart), asks Claude for the MINIMAL
// edits to resolve exactly those findings, and writes the corrected files back dash-normalized.
// Escalates to a full rewrite (--rewrite) once minimal fixes stall. Refuses to drop `draft: true`.
//
// Local dry run: node automation/confronto-fix-gates.mjs --dry-run <it.md>

import { readFileSync, existsSync, writeFileSync, readdirSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
import { normalizeDashes } from "./house-style.mjs";

const DRY = process.argv.includes("--dry-run");
const REWRITE = process.argv.includes("--rewrite");
const MODEL = process.env.AUTHOR_MODEL || "claude-opus-4-8";
const die = (m) => { console.error("✗ " + m); process.exit(1); };

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
  ...mdSlugs("src/content/guides").map((s) => `/guide/${s}`),
  ...mdSlugs("src/content/blog").map((s) => `/blog/${s}`),
  ...mdSlugs("src/content/confronti").map((s) => `/confronto/${s}`),
].sort();

function extractJson(text) {
  let t = String(text).trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const s = t.indexOf("{"), e = t.lastIndexOf("}");
  if (s === -1 || e === -1) die("No JSON object found in model output");
  return JSON.parse(t.slice(s, e + 1));
}

const files = process.argv.slice(2).filter((a) => /^src\/content\/confronti\/[^/]+\.md$/.test(a));
if (!files.length) { console.log("No IT confronto files passed; nothing to fix."); process.exit(0); }

const findings = (() => { try { return readFileSync(process.env.FINDINGS_FILE || "automation/.gate-findings.md", "utf8"); } catch { return ""; } })();
if (!findings.trim()) die("No gate findings available to fix against.");
const llms = (() => { try { return readFileSync("public/llms.txt", "utf8"); } catch { return ""; } })();
const sysRules = (() => { try { return readFileSync("automation/confronto-system-prompt.md", "utf8"); } catch { return ""; } })();

const client = DRY ? null : new Anthropic();

for (const itPath of files) {
  if (!existsSync(itPath)) continue;
  const it = readFileSync(itPath, "utf8");
  const slugIt = itPath.split("/").pop().replace(/\.md$/, "");
  let enPath = "", en = "";
  try {
    const map = readFileSync("src/lib/i18n.ts", "utf8");
    const m = map.match(new RegExp(`"${slugIt}":\\s*"([^"]+)"`));
    if (m) { enPath = `src/content/confronti/en/${m[1]}.md`; if (existsSync(enPath)) en = readFileSync(enPath, "utf8"); }
  } catch {}

  const user = [
    REWRITE
      ? "A Soraia A-vs-B comparison draft has FAILED the gates repeatedly and minimal edits keep oscillating. REWRITE both files IN FULL so they pass EVERY gate at once. Keep the topic, the two options, the approved numbers and the balanced/honest voice, but you may restructure the fields freely. Both options MUST keep real pros AND real cons; the verdict stays nuanced."
      : "A Soraia A-vs-B comparison draft FAILED one or more quality gates. Apply the MINIMAL edits needed to resolve EXACTLY the flagged issues. Do not rewrite, do not change the voice or the argument, do not touch anything unrelated to a finding.",
    "",
    "GATE FINDINGS TO RESOLVE:\n" + findings,
    "",
    "CONSTRAINTS: titolo <=60 chars with primary keyword; description 140-160 chars; inBreve a self-contained situation-dependent verdict; FAQ 3-6; >=3 table rows; both optionA and optionB keep real pro AND contro (non-empty); verdetto nuanced and balanced; keep `draft: true` and `lang` unchanged. Invent no numbers (trace to llms.txt); internal links only from the list below; ASCII hyphen only, never a typographic dash.",
    "",
    "Internal links may ONLY be these real published routes:\n" + VALID_ROUTES.join("  "),
    "",
    "SOURCE OF TRUTH for Soraia/client numbers:\n" + llms.slice(0, 5000),
    "",
    "VOICE + HONESTY RULES:\n" + sysRules.slice(0, 2600),
    "",
    `IT FILE (${itPath}):\n${it}`,
    enPath ? `\nEN FILE (${enPath}):\n${en}` : "\n(no EN counterpart found)",
    "",
    'Return ONLY strict JSON: {"it_md": "<COMPLETE corrected IT file>", "en_md": "<COMPLETE corrected EN file, or \\"\\" if unchanged/none>", "changes": ["one short note per fix, or why unfixable"]}. The *_md fields must be the full file contents (frontmatter, no body). No prose outside the JSON.',
  ].join("\n");

  console.log(`→ auto-fixing ${itPath}${enPath ? " + " + enPath : ""} · ${MODEL}${REWRITE ? " · REWRITE" : ""}`);
  if (DRY) { console.log(`dry-run: findings ${findings.length}B, routes ${VALID_ROUTES.length}. No API call, no writes.`); continue; }

  let resp;
  try { resp = await client.messages.create({ model: MODEL, max_tokens: 14000, messages: [{ role: "user", content: user }] }); }
  catch (e) { die("Anthropic API error: " + (e?.message || e)); }
  const text = resp.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  const out = extractJson(text);
  if (!out.it_md || !/^---/.test(out.it_md.trim())) die("Model returned no valid it_md");
  if (!/^draft:\s*true\b/m.test(out.it_md)) die("Refusing to write: it_md lost `draft: true` (safety)");

  writeFileSync(itPath, normalizeDashes(out.it_md.endsWith("\n") ? out.it_md : out.it_md + "\n"));
  if (enPath && out.en_md && /^---/.test(out.en_md.trim())) {
    if (!/^draft:\s*true\b/m.test(out.en_md)) die("Refusing to write: en_md lost `draft: true` (safety)");
    writeFileSync(enPath, normalizeDashes(out.en_md.endsWith("\n") ? out.en_md : out.en_md + "\n"));
  }
  console.log("✓ fixes applied:", (out.changes || []).join(" | ") || "(none reported)");
}
