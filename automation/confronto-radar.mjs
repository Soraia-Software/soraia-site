#!/usr/bin/env node
// Confronto radar: uses Claude + web search to find "A vs B" decisions SME buyers actually
// research, dedupes against existing confronti + the blog/guide backlogs (so nothing overlaps),
// scores them, and appends survivors to automation/confronto-topics.json as `status:"parked"`.
// Never writes comparisons and never sets `todo`. Run as the confronto backlog-refill step of
// .github/workflows/monthly-content.yml (the monthly orchestrator then promotes parked candidates).
//
// Local dry run: node automation/confronto-radar.mjs --dry-run

import { readFileSync, writeFileSync, readdirSync, appendFileSync, existsSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";

const DRY = process.argv.includes("--dry-run");
const MODEL = process.env.AUTHOR_MODEL || "claude-opus-4-8";
const MAX_NEW = Number(process.env.RADAR_MAX_TOPICS || 4);
const TODAY = new Date().toISOString().slice(0, 10);
const TOPICS = "automation/confronto-topics.json";
const die = (msg) => { console.error("✗ " + msg); process.exit(1); };
const norm = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

function extractJson(text) {
  let t = String(text).trim();
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  const s = t.indexOf("{"), e = t.lastIndexOf("}");
  if (s === -1 || e === -1) die("No JSON object found in model output");
  return JSON.parse(t.slice(s, e + 1));
}
function ghOutput(kv) { const f = process.env.GITHUB_OUTPUT; if (!f) return; for (const [k, v] of Object.entries(kv)) appendFileSync(f, `${k}<<__EOF__\n${v}\n__EOF__\n`); }
function stepSummary(md) { const f = process.env.GITHUB_STEP_SUMMARY; if (f) appendFileSync(f, md + "\n"); }

const slugsIn = (dir) => { try { return readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")); } catch { return []; } };
const isDraft = (p) => { try { return /^draft:\s*true\b/m.test(readFileSync(p, "utf8")); } catch { return false; } };
const publishedCaseStudies = slugsIn("src/content/case-studies").filter((s) => !isDraft(`src/content/case-studies/${s}.md`));
const confrontoSlugs = slugsIn("src/content/confronti").filter((s) => !isDraft(`src/content/confronti/${s}.md`));
const blogSlugs = slugsIn("src/content/blog").filter((s) => !isDraft(`src/content/blog/${s}.md`));
const guideSlugs = slugsIn("src/content/guides").filter((s) => !isDraft(`src/content/guides/${s}.md`));
const SERVICE_ROUTES = ["/ai-agents", "/ai-adoption", "/ai-search-optimization", "/software-development"];
const OPS_ROUTES = ["/recruitment", "/finance", "/sales-marketing", "/customer-support", "/real-estate", "/event-management"];
const VALID_ROUTES = new Set([
  ...SERVICE_ROUTES, ...OPS_ROUTES, "/check-up", "/parliamone",
  ...publishedCaseStudies.map((s) => `/case-studies/${s}`),
  ...guideSlugs.map((s) => `/guide/${s}`),
]);

const topics = JSON.parse(readFileSync(TOPICS, "utf8"));
const seenIds = new Set(topics.map((t) => t.id));
const seenSlugsIt = new Set([...topics.map((t) => t.slug_it), ...confrontoSlugs]);
const seenSlugsEn = new Set(topics.map((t) => t.slug_en));
const seenKw = new Set(topics.map((t) => norm(t.primaryKeyword)));
// Pull blog + guide backlogs so a confronto never duplicates an existing article/guide topic.
for (const bt of ["automation/blog-topics.json", "automation/guide-topics.json"]) {
  try { for (const t of JSON.parse(readFileSync(bt, "utf8"))) { seenKw.add(norm(t.primaryKeyword)); seenSlugsIt.add(t.slug_it); } } catch {}
}

console.log(`→ confronto-radar · ${MODEL} · ${topics.length} backlog · ${confrontoSlugs.length} published confronti`);
if (DRY) { console.log("dry-run: would propose up to", MAX_NEW, "parked confronto candidates. No API call, no writes."); process.exit(0); }

const llms = (() => { try { return readFileSync("public/llms.txt", "utf8"); } catch { return ""; } })();
const backlogDigest = topics.map((t) => `- [${t.status}] ${t.id}: ${t.optionA_name} vs ${t.optionB_name}`).join("\n");

const system = [
  "You are Soraia's scout for A-vs-B COMPARISON pages (/confronto). Soraia is an Italian AI agency serving SMBs across ALL of Italy (HQ in Biella, nationwide provider). Comparisons rank well for 'X vs Y' buyer queries and are highly citable by AI engines.",
  "Use web_search to find real either/or decisions Italian SME buyers research when deciding HOW to adopt AI: custom AI agents vs ready platforms, build-vs-buy, AI agency vs internal team, one LLM/coding-agent vs another for business use (e.g. Claude vs ChatGPT, Claude Code vs alternatives), agentic AI vs rule-based automation. Propose NEW comparison topics that are genuine decisions (two real, comparable options), net-new vs the backlog and vs existing blog/guide topics.",
  "HARD RULES:",
  "1. Each topic is a real A-vs-B decision with two comparable options (not a generic how-to).",
  "2. Reject anything overlapping the existing confronti, or an existing blog/guide topic.",
  "3. internalLinkTargets ONLY from real routes: " + [...VALID_ROUTES].join(", ") + ". Always include /parliamone.",
  "4. Italian primary keyword with COMMERCIAL/buyer intent (Italian market, nationwide); plain ASCII (hyphen only, no typographic dashes). AVOID single-tool-glossary comparisons and anything aimed at a global/English informational audience.",
  "Score subScores in [0,1]: intent, biz, winnability, freshness, geo. score = round(100*(0.25*intent+0.30*biz+0.20*winnability+0.10*freshness+0.15*geo)).",
].join("\n");

const user = [
  `Research now, then propose up to ${MAX_NEW} NEW A-vs-B comparison topics. Today is ${TODAY}.`,
  "", "EXISTING BACKLOG:", backlogDigest, "",
  "PUBLISHED CONFRONTI (do not duplicate): " + confrontoSlugs.join(", "),
  "", "CORPUS (facts):", llms.slice(0, 5000), "",
  "Return ONLY this JSON:",
  `{
  "research_summary": "3-5 sentences",
  "candidates": [
    { "id": "kebab", "slug_it": "kebab-it", "slug_en": "kebab-en", "categoria": "short label",
      "optionA_name": "...", "optionB_name": "...", "title_hint": "italian working title",
      "primaryKeyword": "italian keyword", "targetPersona": "e.g. COO",
      "internalLinkTargets": ["/route","/parliamone"], "dedupNotes": "why net-new",
      "freshnessExpiry": "YYYY-MM-DD or null", "score": 0,
      "subScores": {"intent":0,"biz":0,"winnability":0,"freshness":0,"geo":0}, "sources": ["url"] }
  ]
}`,
].join("\n");

const client = new Anthropic();
const tools = [{ type: "web_search_20260209", name: "web_search" }, { type: "web_fetch_20260209", name: "web_fetch" }];
const messages = [{ role: "user", content: user }];
let resp, guard = 0;
try {
  do {
    resp = await client.messages.create({ model: MODEL, max_tokens: 14000, thinking: { type: "adaptive" }, system, tools, messages });
    if (resp.stop_reason === "pause_turn") messages.push({ role: "assistant", content: resp.content });
  } while (resp.stop_reason === "pause_turn" && ++guard < 8);
} catch (e) { die("Anthropic API error: " + (e?.message || e)); }
if (resp.stop_reason === "refusal") die("Model refused the request.");

const out = extractJson(resp.content.filter((b) => b.type === "text").map((b) => b.text).join(""));
const raw = Array.isArray(out.candidates) ? out.candidates : [];
console.log(`→ proposed ${raw.length} candidate(s). Validating…`);

const clamp01 = (n) => Math.max(0, Math.min(1, Number(n) || 0));
const kept = [], dropped = [];
for (const c of raw) {
  if (!c || !c.id || !c.slug_it || !c.slug_en || !c.primaryKeyword || !c.optionA_name || !c.optionB_name) { dropped.push([c?.id || "?", "missing fields"]); continue; }
  const k = norm(c.primaryKeyword);
  if (seenIds.has(c.id) || seenSlugsIt.has(c.slug_it) || seenSlugsEn.has(c.slug_en) || seenKw.has(k)) { dropped.push([c.id, "duplicate"]); continue; }
  if (existsSync(`src/content/confronti/${c.slug_it}.md`)) { dropped.push([c.id, "file exists"]); continue; }
  const links = [...new Set((c.internalLinkTargets || []).filter((r) => VALID_ROUTES.has(r)))];
  if (links.length < 2) { dropped.push([c.id, "fewer than 2 valid links"]); continue; }
  const sub = { intent: clamp01(c.subScores?.intent), biz: clamp01(c.subScores?.biz), winnability: clamp01(c.subScores?.winnability), freshness: clamp01(c.subScores?.freshness), geo: clamp01(c.subScores?.geo) };
  const score = Math.round(100 * (0.25 * sub.intent + 0.30 * sub.biz + 0.20 * sub.winnability + 0.10 * sub.freshness + 0.15 * sub.geo));
  kept.push({ id: c.id, status: "parked", slug_it: c.slug_it, slug_en: c.slug_en, categoria: c.categoria || "Confronto",
    optionA_name: c.optionA_name, optionB_name: c.optionB_name, title_hint: c.title_hint || `${c.optionA_name} vs ${c.optionB_name}`,
    primaryKeyword: c.primaryKeyword, targetPersona: c.targetPersona || "", internalLinkTargets: links,
    dedupNotes: c.dedupNotes || "", freshnessExpiry: c.freshnessExpiry || null, score, subScores: sub,
    sources: ["confronto-radar", ...(Array.isArray(c.sources) ? c.sources.slice(0, 4) : [])], discovered_at: TODAY, drafted_at: null });
  seenIds.add(c.id); seenSlugsIt.add(c.slug_it); seenSlugsEn.add(c.slug_en); seenKw.add(k);
  if (kept.length >= MAX_NEW) break;
}
kept.sort((a, b) => b.score - a.score);
for (const [id, why] of dropped) console.log(`  dropped ${id}: ${why}`);

if (kept.length === 0) {
  console.log("No new valid confronto candidates. Nothing appended.");
  ghOutput({ added: "false", count: "0" });
  stepSummary(`### Confronto radar, no new candidates\n${out.research_summary || ""}`);
  process.exit(0);
}
topics.push(...kept);
writeFileSync(TOPICS, JSON.stringify(topics, null, 2) + "\n");
console.log(`✓ appended ${kept.length} parked confronto candidate(s)`);
const list = kept.map((t) => `- **${t.id}** (score ${t.score}): ${t.optionA_name} vs ${t.optionB_name}`).join("\n");
ghOutput({ added: "true", count: String(kept.length), title: `Confronto radar: ${kept.length} new candidate(s)`, prbody: `Confronto radar appended ${kept.length} parked candidate(s) to automation/confronto-topics.json.\n\n### Research summary\n${out.research_summary || "(none)"}\n\n### Candidates\n${list}\n\nFlip one to \`"todo"\` to draft it.` });
stepSummary(`### Confronto radar, ${kept.length} new parked candidate(s)\n${list}`);
console.log("✓ done");
