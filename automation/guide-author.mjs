#!/usr/bin/env node
// Guide author: picks the first `todo` topic from guide-topics.json, generates a
// bilingual (IT+EN) operative guide with Claude against automation/guide-system-prompt.md,
// writes both .md files as draft:true under src/content/guides{,/en}, registers the slug
// pair in GUIDE_SLUG_MAP, and marks the topic `drafted`. Never publishes (draft:true) and
// never deploys, the quality-gates pipeline flips draft:false on a green run. Run by
// .github/workflows/guide-draft.yml (weekly, Wednesday). Requires ANTHROPIC_API_KEY.
//
// Local dry run (no API call, no writes): node automation/guide-author.mjs --dry-run

import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
import { normalizeDashes } from "./house-style.mjs";

const DRY = process.argv.includes("--dry-run");
const MODEL = process.env.AUTHOR_MODEL || "claude-opus-4-8"; // set to claude-sonnet-4-6 for steady-state cost
const TODAY = new Date().toISOString().slice(0, 10);

const TOPICS = "automation/guide-topics.json";
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

// Build YAML frontmatter for the GUIDES schema (title, h1?, description, pubDate, author,
// readMinutes, keywords, related, faq, featured, lang, draft). Guides have NO tags / ogImage.
// faq answers are HTML-unescaped so set:html renders real tags.
function frontmatter(d, lang) {
  const j = (v) => JSON.stringify(v);
  const o = ["---"];
  o.push(`title: ${j(d.title)}`);
  if (d.h1) o.push(`h1: ${j(d.h1)}`);
  o.push(`description: ${j(d.description)}`);
  o.push(`pubDate: ${TODAY}`);
  o.push(`author: ${j(d.author || "Daniel Levis")}`);
  o.push(`readMinutes: ${Number(d.readMinutes) || 10}`);
  o.push("keywords:"); (d.keywords || []).forEach((k) => o.push(`  - ${j(k)}`));
  o.push("related:"); (d.related || []).forEach((r) => o.push(`  - ${j(r)}`));
  if (d.faq && d.faq.length) {
    o.push("faq:");
    for (const f of d.faq) { o.push(`  - q: ${j(f.q)}`); o.push(`    a: ${j(unescapeHtml(f.a))}`); }
  }
  o.push(`featured: ${d.featured ? "true" : "false"}`);
  o.push(`lang: "${lang}"`);
  o.push("draft: true");
  o.push("---");
  return o.join("\n");
}
const mdFile = (fm, lang, body) => frontmatter(fm, lang) + "\n\n" + String(body).trim() + "\n";

function ghOutput(kv) {
  const f = process.env.GITHUB_OUTPUT;
  if (!f) return;
  for (const [k, v] of Object.entries(kv)) {
    appendFileSync(f, `${k}<<__EOF__\n${v}\n__EOF__\n`);
  }
}
function stepSummary(md) {
  const f = process.env.GITHUB_STEP_SUMMARY;
  if (f) appendFileSync(f, md + "\n");
}

// ---- pick topic ----
const topics = JSON.parse(readFileSync(TOPICS, "utf8"));
let topic = topics.find((t) => t.status === "todo");
// Full-autonomy fallback: with AUTOPUBLISH on, if nothing is queued, pick the
// highest-scoring non-expired `parked` candidate so the weekly run self-sustains
// (guide-radar keeps `parked` stocked). Without AUTOPUBLISH, a human still promotes.
if (!topic && process.env.AUTOPUBLISH === "true") {
  topic = topics
    .filter((t) => t.status === "parked" && !existsSync(`src/content/guides/${t.slug_it}.md`) && (!t.freshnessExpiry || t.freshnessExpiry >= TODAY))
    .sort((a, b) => (b.score || 0) - (a.score || 0))[0];
  if (topic) console.log(`→ no "todo"; AUTOPUBLISH on → auto-promoting top parked: ${topic.id} (score ${topic.score})`);
}
if (!topic) { console.log("Backlog empty: no guide topic with status \"todo\". Promote a parked topic to publish."); ghOutput({ drafted: "false" }); process.exit(0); }
const itPath = `src/content/guides/${topic.slug_it}.md`;
const enPath = `src/content/guides/en/${topic.slug_en}.md`;
if (existsSync(itPath)) { console.log(`Target already exists (${itPath}); nothing drafted. Check topic status.`); ghOutput({ drafted: "false" }); process.exit(0); }
console.log(`→ guide topic: ${topic.id} (${topic.archetype}) · ${MODEL}`);

if (DRY) { console.log("dry-run: would generate", itPath, "+", enPath); process.exit(0); }

// ---- context ----
const system = readFileSync("automation/guide-system-prompt.md", "utf8");
const llms = readFileSync("public/llms.txt", "utf8");
const anchors = ["consulenza-ai-italia", "agenti-ai-aziende", "costi-consulenza-ai"]
  .map((s) => { try { return readFileSync(`src/content/guides/${s}.md`, "utf8"); } catch { return ""; } })
  .join("\n\n---\n\n").slice(0, 14000);

const user = [
  "Write ONE Soraia operative guide (Italian + English) for this topic, obeying your system rules EXACTLY.",
  "",
  `TOPIC:\n${JSON.stringify(topic, null, 1)}`,
  `\npubDate: ${TODAY}  ·  slug_it: ${topic.slug_it}  ·  slug_en: ${topic.slug_en}`,
  "",
  "VOICE ANCHORS (existing guides, match tone, depth, structure; do NOT re-cover them):",
  anchors,
  "",
  "SOURCE OF TRUTH for every Soraia/client number (public/llms.txt), invent nothing, never cite oggi-lavoro or aegis (draft, 404). Attribute every external regulatory/fiscal fact to a named source or cut it:",
  llms,
  "",
  "Return ONLY the JSON object from your instructions (frontmatter_it, it_body, frontmatter_en, en_body, slug_it, slug_en, guide_slug_map_entry, llms_txt_line_it?, llms_txt_line_en?). Do NOT include pubDate/lang/draft/updatedDate in the frontmatter objects. The body MUST contain the contact CTA (/parliamone in IT, /en/contact in EN) inviting an honest expert opinion from Soraia. No code fences, no prose outside the JSON.",
].join("\n");

const client = new Anthropic(); // ANTHROPIC_API_KEY from env
let resp;
try {
  resp = await client.messages.create({ model: MODEL, max_tokens: 12000, system, messages: [{ role: "user", content: user }] });
} catch (e) { die("Anthropic API error: " + (e?.message || e)); }
const text = resp.content.filter((b) => b.type === "text").map((b) => b.text).join("");
const art = extractJson(text);
for (const k of ["frontmatter_it", "it_body", "frontmatter_en", "en_body"]) if (!art[k]) die("Model output missing field: " + k);

// force slugs from the topic so files + slug map stay consistent
art.slug_it = topic.slug_it; art.slug_en = topic.slug_en;

// House style: strip any typographic dash the model emitted before writing (matches the
// deterministic `house-style` quality gate, so drafts pass it on the first run).
writeFileSync(itPath, normalizeDashes(mdFile(art.frontmatter_it, "it", art.it_body)));
writeFileSync(enPath, normalizeDashes(mdFile(art.frontmatter_en, "en", art.en_body)));
console.log("✓ wrote", itPath, "+", enPath);

// register slug pair in GUIDE_SLUG_MAP (idempotent)
const i18nPath = "src/lib/i18n.ts";
let i18n = readFileSync(i18nPath, "utf8");
if (!i18n.includes(`"${art.slug_it}":`)) {
  i18n = i18n.replace(
    "export const GUIDE_SLUG_MAP: Record<string, string> = {",
    (m) => `${m}\n  "${art.slug_it}": "${art.slug_en}",`,
  );
  writeFileSync(i18nPath, i18n);
  console.log("✓ GUIDE_SLUG_MAP updated");
}

// mark topic drafted
topic.status = "drafted";
topic.drafted_at = TODAY;
writeFileSync(TOPICS, JSON.stringify(topics, null, 2) + "\n");

// hand off to the workflow (PR title/body) + run summary
const cornerstone = art.llms_txt_line_it
  ? `\n\n**Cornerstone, on publish, add to llms.txt:**\n\nIT (\`public/llms.txt\`):\n\`${art.llms_txt_line_it}\`\n\nEN (\`public/en/llms.txt\`):\n\`${art.llms_txt_line_en || ""}\``
  : "";
const prBody = [
  `Auto-drafted guide **${art.frontmatter_it.title}** (\`${art.slug_it}\`), \`draft: true\`, invisible in production.`,
  "",
  "### Review checklist before merge",
  "- [ ] Read the rendered draft (`npm run dev` → `/guide/" + art.slug_it + "/` and `/en/guide/" + art.slug_en + "/`)",
  "- [ ] Every Soraia/client metric matches `public/llms.txt` / a published case study",
  "- [ ] Every external regulatory/fiscal fact is attributed to a named source",
  "- [ ] Closing CTA invites an honest expert opinion from Soraia (`/parliamone` / `/en/contact`)",
  "- [ ] Voice is on-brand; no hype; honest about limitations",
  "- [ ] Internal links resolve (published pages only)",
  "- [ ] Quality-gate scorecard below is green (or issues addressed)",
  "- [ ] Flip `draft: true → false` in **both** IT and EN files to publish on merge",
  cornerstone,
].join("\n");
ghOutput({ drafted: "true", title: art.frontmatter_it.title, slug: art.slug_it, prbody: prBody });
stepSummary(`### Drafted guide: ${art.frontmatter_it.title}\n- IT: \`${itPath}\`\n- EN: \`${enPath}\`\n- topic: \`${topic.id}\` → drafted${cornerstone}`);
console.log("✓ done:", art.slug_it);
