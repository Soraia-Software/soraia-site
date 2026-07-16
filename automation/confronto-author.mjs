#!/usr/bin/env node
// Confronto author: picks the first `todo` topic from confronto-topics.json, generates a
// bilingual (IT+EN) A-vs-B comparison with Claude against automation/confronto-system-prompt.md,
// writes both .md files as draft:true under src/content/confronti{,/en} (structured frontmatter,
// no markdown body), registers the slug pair in CONFRONTO_SLUG_MAP, marks the topic `drafted`.
// Never publishes, never deploys. Run by .github/workflows/confronto-draft.yml. Needs ANTHROPIC_API_KEY.
//
// Local dry run (no API call, no writes): node automation/confronto-author.mjs --dry-run

import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
import { normalizeDashes } from "./house-style.mjs";

const DRY = process.argv.includes("--dry-run");
const MODEL = process.env.AUTHOR_MODEL || "claude-opus-4-8";
const TODAY = new Date().toISOString().slice(0, 10);
const TOPICS = "automation/confronto-topics.json";
const die = (msg) => { console.error("✗ " + msg); process.exit(1); };

const unescapeHtml = (s) => String(s)
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&amp;/g, "&");

function extractJson(text) {
  let t = text.trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const s = t.indexOf("{"), e = t.lastIndexOf("}");
  if (s === -1 || e === -1) die("No JSON object found in model output");
  return JSON.parse(t.slice(s, e + 1));
}

// Build YAML frontmatter for the structured `confronti` schema (nested optionA/optionB,
// tabella[], faq[]). Values are JSON-encoded so they are valid double-quoted YAML scalars.
function frontmatter(d, lang) {
  const j = (v) => JSON.stringify(v == null ? "" : v);
  const o = ["---"];
  o.push(`titolo: ${j(d.titolo)}`);
  if (d.sottotitolo) o.push(`sottotitolo: ${j(d.sottotitolo)}`);
  o.push(`description: ${j(d.description)}`);
  o.push(`inBreve: ${j(d.inBreve)}`);
  o.push(`categoria: ${j(d.categoria)}`);
  o.push(`author: ${j(d.author || "Daniel Levis")}`);
  o.push("keywords:"); (d.keywords || []).forEach((k) => o.push(`  - ${j(k)}`));
  const opt = (key, obj = {}) => {
    o.push(`${key}:`);
    o.push(`  nome: ${j(obj.nome)}`);
    o.push(`  descrizione: ${j(obj.descrizione)}`);
    o.push("  pro:"); (obj.pro || []).forEach((x) => o.push(`    - ${j(x)}`));
    o.push("  contro:"); (obj.contro || []).forEach((x) => o.push(`    - ${j(x)}`));
    o.push("  idealePer:"); (obj.idealePer || []).forEach((x) => o.push(`    - ${j(x)}`));
  };
  opt("optionA", d.optionA);
  opt("optionB", d.optionB);
  o.push("tabella:");
  (d.tabella || []).forEach((r) => {
    o.push(`  - criterio: ${j(r.criterio)}`);
    o.push(`    valoreA: ${j(r.valoreA)}`);
    o.push(`    valoreB: ${j(r.valoreB)}`);
  });
  o.push(`verdetto: ${j(d.verdetto)}`);
  if (d.faq && d.faq.length) {
    o.push("faq:");
    for (const f of d.faq) { o.push(`  - q: ${j(f.q)}`); o.push(`    a: ${j(unescapeHtml(f.a))}`); }
  }
  o.push("related: []");
  o.push("featured: false");
  o.push(`pubDate: ${TODAY}`);
  o.push(`lang: "${lang}"`);
  o.push("draft: true");
  o.push("---");
  return o.join("\n") + "\n";
}
// Structured confronti render from frontmatter; the markdown body stays empty.
const mdFile = (fm, lang) => frontmatter(fm, lang);

function ghOutput(kv) {
  const f = process.env.GITHUB_OUTPUT;
  if (!f) return;
  for (const [k, v] of Object.entries(kv)) appendFileSync(f, `${k}<<__EOF__\n${v}\n__EOF__\n`);
}
function stepSummary(md) { const f = process.env.GITHUB_STEP_SUMMARY; if (f) appendFileSync(f, md + "\n"); }

// ---- pick topic ----
const topics = JSON.parse(readFileSync(TOPICS, "utf8"));
const SKIP_SLUG = (process.env.SKIP_SLUG || "").trim();
if (SKIP_SLUG) {
  const skip = topics.find((t) => t.slug_it === SKIP_SLUG || t.id === SKIP_SLUG);
  if (skip && skip.status !== "rejected") {
    skip.status = "rejected"; skip.rejected_at = TODAY;
    skip.rejected_reason = "auto-rotated: could not pass quality gates after the autofix budget";
    if (!DRY) writeFileSync(TOPICS, JSON.stringify(topics, null, 2) + "\n");
    console.log(`→ SKIP_SLUG="${SKIP_SLUG}": marked rejected, rotating to a fresh topic`);
  }
}
let topic = topics.find((t) => t.status === "todo");
if (!topic && process.env.AUTOPUBLISH === "true") {
  topic = topics
    .filter((t) => t.status === "parked" && !existsSync(`src/content/confronti/${t.slug_it}.md`) && (!t.freshnessExpiry || t.freshnessExpiry >= TODAY))
    .sort((a, b) => (b.score || 0) - (a.score || 0))[0];
  if (topic) console.log(`→ no "todo"; AUTOPUBLISH on → auto-promoting top parked: ${topic.id} (score ${topic.score})`);
}
if (!topic) { console.log("Backlog empty: no confronto topic with status \"todo\"."); ghOutput({ drafted: "false" }); process.exit(0); }
const itPath = `src/content/confronti/${topic.slug_it}.md`;
const enPath = `src/content/confronti/en/${topic.slug_en}.md`;
if (existsSync(itPath)) { console.log(`Target already exists (${itPath}); nothing drafted.`); ghOutput({ drafted: "false" }); process.exit(0); }
console.log(`→ confronto topic: ${topic.id} · ${MODEL}`);
if (DRY) { console.log("dry-run: would generate", itPath, "+", enPath); process.exit(0); }

// ---- context ----
const system = readFileSync("automation/confronto-system-prompt.md", "utf8");
const llms = readFileSync("public/llms.txt", "utf8");
const anchors = ["ai-in-casa-vs-partner"]
  .map((s) => { try { return readFileSync(`src/content/confronti/${s}.md`, "utf8"); } catch { return ""; } })
  .join("\n\n---\n\n").slice(0, 8000);

const user = [
  "Write ONE Soraia A-vs-B comparison (Italian + English) for this topic, obeying your system rules EXACTLY. Be balanced: both options get real pros AND real cons.",
  "",
  `TOPIC:\n${JSON.stringify(topic, null, 1)}`,
  `\nslug_it: ${topic.slug_it}  ·  slug_en: ${topic.slug_en}`,
  "",
  "VOICE ANCHOR (existing confronto, match tone/structure; do NOT re-cover it):",
  anchors,
  "",
  "SOURCE OF TRUTH for every Soraia/client number (public/llms.txt), invent nothing, never cite oggi-lavoro or aegis:",
  llms,
  "",
  "Return ONLY the JSON object from your instructions (it, en, slug_it, slug_en, confronto_slug_map_entry). No code fences, no prose outside the JSON.",
].join("\n");

const client = new Anthropic();
let resp;
try { resp = await client.messages.create({ model: MODEL, max_tokens: 10000, system, messages: [{ role: "user", content: user }] }); }
catch (e) { die("Anthropic API error: " + (e?.message || e)); }
const text = resp.content.filter((b) => b.type === "text").map((b) => b.text).join("");
const art = extractJson(text);
for (const k of ["it", "en"]) {
  if (!art[k] || !art[k].titolo || !art[k].optionA || !art[k].optionB || !art[k].verdetto) die("Model output missing/invalid field: " + k);
}
art.slug_it = topic.slug_it; art.slug_en = topic.slug_en;

writeFileSync(itPath, normalizeDashes(mdFile(art.it, "it")));
writeFileSync(enPath, normalizeDashes(mdFile(art.en, "en")));
console.log("✓ wrote", itPath, "+", enPath);

// register slug pair in CONFRONTO_SLUG_MAP (idempotent)
const i18nPath = "src/lib/i18n.ts";
let i18n = readFileSync(i18nPath, "utf8");
if (!i18n.includes(`"${art.slug_it}":`)) {
  i18n = i18n.replace(
    "export const CONFRONTO_SLUG_MAP: Record<string, string> = {",
    (m) => `${m}\n  "${art.slug_it}": "${art.slug_en}",`,
  );
  writeFileSync(i18nPath, i18n);
  console.log("✓ CONFRONTO_SLUG_MAP updated");
}

topic.status = "drafted"; topic.drafted_at = TODAY;
writeFileSync(TOPICS, JSON.stringify(topics, null, 2) + "\n");

const prBody = [
  `Auto-drafted comparison **${art.it.titolo}** (\`${art.slug_it}\`), \`draft: true\`, invisible in production.`,
  "",
  "### Review checklist before merge",
  "- [ ] Read the rendered draft (`npm run dev` → `/confronto/" + art.slug_it + "/` and `/en/confronto/" + art.slug_en + "/`)",
  "- [ ] Both options have real pros AND real cons; the verdict is balanced, not one-sided",
  "- [ ] Every Soraia/client metric matches `public/llms.txt`",
  "- [ ] Internal links resolve (published pages only)",
  "- [ ] Quality-gate scorecard below is green",
].join("\n");
ghOutput({ drafted: "true", title: art.it.titolo, slug: art.slug_it, prbody: prBody });
stepSummary(`### Drafted confronto: ${art.it.titolo}\n- IT: \`${itPath}\`\n- EN: \`${enPath}\`\n- topic: \`${topic.id}\` → drafted`);
console.log("✓ done:", art.slug_it);
