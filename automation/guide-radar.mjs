#!/usr/bin/env node
// Guide radar (discovery): uses Claude + web search to find recent regulatory developments,
// news, and operative questions in Soraia's domains, scores candidate GUIDE topics against the
// guide-topics rubric, dedupes them against the existing guide backlog, the published guides,
// AND the blog backlog/posts (so guides and blog never cannibalize each other), and APPENDS the
// survivors to automation/guide-topics.json as `status:"parked"`. It never writes guides and
// never sets `todo`; with AUTOPUBLISH on, the weekly author auto-promotes the top parked one.
// Run by .github/workflows/guide-topic-radar.yml. Requires ANTHROPIC_API_KEY (web search billed).
//
// Local dry run (no API call, no writes): node automation/guide-radar.mjs --dry-run

import { readFileSync, writeFileSync, readdirSync, appendFileSync, existsSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";

const DRY = process.argv.includes("--dry-run");
const MODEL = process.env.AUTHOR_MODEL || "claude-opus-4-8";
const MAX_NEW = Number(process.env.RADAR_MAX_TOPICS || 5);
const TODAY = new Date().toISOString().slice(0, 10);

const TOPICS = "automation/guide-topics.json";
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
function ghOutput(kv) {
  const f = process.env.GITHUB_OUTPUT;
  if (!f) return;
  for (const [k, v] of Object.entries(kv)) appendFileSync(f, `${k}<<__EOF__\n${v}\n__EOF__\n`);
}
function stepSummary(md) {
  const f = process.env.GITHUB_STEP_SUMMARY;
  if (f) appendFileSync(f, md + "\n");
}

// ---- build the allowlist of REAL, PUBLISHED internal routes (for link validation) ----
const slugsIn = (dir) => { try { return readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")); } catch { return []; } };
const isDraft = (path) => { try { return /^draft:\s*true\b/m.test(readFileSync(path, "utf8")); } catch { return false; } };
const publishedCaseStudies = slugsIn("src/content/case-studies").filter((s) => !isDraft(`src/content/case-studies/${s}.md`));
const guideSlugs = slugsIn("src/content/guides").filter((s) => !isDraft(`src/content/guides/${s}.md`));
const blogSlugs = slugsIn("src/content/blog").filter((s) => !isDraft(`src/content/blog/${s}.md`));
const SERVICE_ROUTES = ["/ai-agents", "/ai-adoption", "/ai-search-optimization", "/software-development"];
const OPS_ROUTES = ["/recruitment", "/finance", "/sales-marketing", "/customer-support", "/real-estate", "/event-management"];
const VALID_ROUTES = new Set([
  ...SERVICE_ROUTES, ...OPS_ROUTES, "/check-up", "/parliamone",
  ...publishedCaseStudies.map((s) => `/case-studies/${s}`),
  ...guideSlugs.map((s) => `/guide/${s}`),
]);
const PUBLISHED_CS = new Set(publishedCaseStudies);

// ---- existing backlog + cross-collection dedupe basis ----
const topics = JSON.parse(readFileSync(TOPICS, "utf8"));
const seenIds = new Set(topics.map((t) => t.id));
const seenSlugsIt = new Set([...topics.map((t) => t.slug_it), ...guideSlugs, ...blogSlugs]);
const seenSlugsEn = new Set(topics.map((t) => t.slug_en));
const seenKw = new Set(topics.map((t) => norm(t.primaryKeyword)));
// Pull blog backlog ids/slugs/keywords in too, so the guide radar never duplicates a blog topic.
try {
  const blogTopics = JSON.parse(readFileSync("automation/blog-topics.json", "utf8"));
  for (const t of blogTopics) { seenIds.add(t.id); seenSlugsIt.add(t.slug_it); seenSlugsEn.add(t.slug_en); seenKw.add(norm(t.primaryKeyword)); }
} catch {}

const OWNED_THEMES = [
  "agenti IA per aziende (pillar)", "AI Act per aziende, overview della legge (pillar)",
  "consulenza AI Italia (pillar)", "costi consulenza AI (pillar)", "formazione AI aziendale (pillar)",
];

console.log(`→ guide-radar · ${MODEL} · backlog has ${topics.length} guide topics · ${guideSlugs.length} published guides · deduping vs ${blogSlugs.length} blog posts`);
if (DRY) {
  console.log("dry-run: valid routes =", [...VALID_ROUTES].join(", "));
  console.log("dry-run: would research the web and propose up to", MAX_NEW, "parked guide candidates. No API call, no writes.");
  process.exit(0);
}

// ---- context for the model ----
const llms = (() => { try { return readFileSync("public/llms.txt", "utf8"); } catch { return ""; } })();
const backlogDigest = topics.map((t) => `- [${t.status}] ${t.id}, kw:"${t.primaryKeyword}", ${t.title_hint}`).join("\n");

const system = [
  "You are Soraia's regulatory + operative content scout for OPERATIVE GUIDES (published under /guide/). Soraia is an Italian AI agency that builds vertical AI agents, custom software, and AI-search optimization for Italian & European SMBs (CEO/COO/CFO/Head of Ops, 10-200 people). The goal of these guides is to position Soraia as the honest, operational EXPERT on AI for SMEs.",
  "Your job: use web_search (and web_fetch on promising pages) to find recent REGULATORY developments, official news, deadlines, and operative questions these decision-makers face RIGHT NOW, then propose NEW guide topics that are factual, citable, and net-new vs the backlog. Favor topics where a precise, attributed, operative answer wins SEO + AI-search (GEO) citability.",
  "",
  "Domains to scout (recent = last ~6 months, prefer attributable regulatory/news angles): the EU AI Act (fully applicable from August 2026) and its operative obligations; GDPR + AI; NIS2; the Italian Garante Privacy decisions on AI; fatturazione elettronica; tax incentives / credito d'imposta for AI & digitalization (Agenzia delle Entrate, MIMIT); sector compliance (recruitment, finance); practical operative playbooks (AI policy, internal assessment, compliance automation); AI adoption & governance in SMBs.",
  "",
  "HARD RULES:",
  "1. Propose ONLY genuinely new angles. Reject anything that overlaps > ~0.8 with the existing guide backlog, the published guides, the blog backlog/posts, or these OWNED pillar themes: " + OWNED_THEMES.join("; ") + ". A good guide takes a DISTINCT operative or timely angle (a checklist, a template, a regulatory update, a decision framework) and links to a pillar instead of re-explaining it.",
  "2. Every topic must be FACTUAL and ATTRIBUTABLE: if it hinges on a law/deadline/incentive/ruling, there must be a real named source. Put the source URLs in `sources`. Never invent a deadline, a fine, an article number, or a fund.",
  "3. supportingCaseStudy MUST be one of these PUBLISHED slugs or null: " + [...PUBLISHED_CS].join(", ") + ". NEVER reference oggi-lavoro or aegis (hidden/draft).",
  "4. internalLinkTargets MUST be chosen ONLY from these real published routes: " + [...VALID_ROUTES].join(", ") + ". Always include /parliamone (the guide must route the reader to an honest expert opinion from Soraia).",
  "5. Every topic must map to a real SMB intent with business value, no vanity/hype. Italian primary keyword. Set `freshnessExpiry` (YYYY-MM-DD) for time-sensitive regulatory/news topics, else null.",
  "6. Write every topic field (title_hint, dedupNotes, keywords) in plain ASCII: use the hyphen '-' only, never a typographic, em or en dash. House style is enforced downstream.",
  "",
  "Score each candidate with subScores in [0,1], intent (search demand + buyer intent), biz (revenue relevance to Soraia), winnability (can a focused guide realistically rank), freshness, geo (likelihood of being cited verbatim by ChatGPT/Claude/Perplexity). `score` = round(100 * (0.25*intent + 0.30*biz + 0.20*winnability + 0.10*freshness + 0.15*geo)).",
].join("\n");

const user = [
  `Research the web now, then propose up to ${MAX_NEW} NEW guide topics. Today is ${TODAY}.`,
  "",
  "EXISTING GUIDE BACKLOG (do not duplicate, dedupe on theme + keyword):",
  backlogDigest,
  "",
  "PUBLISHED GUIDES (do not re-cover): " + guideSlugs.join(", "),
  "",
  "PUBLISHED CORPUS / source of truth for numbers & links (public/llms.txt):",
  llms.slice(0, 7000),
  "",
  "After researching, return ONLY this JSON (no prose, no code fences outside it):",
  `{
  "research_summary": "3-5 sentences on what regulatory/operative topics are live and where the gaps are",
  "candidates": [
    {
      "id": "kebab-case-unique",
      "archetype": "how-to | regulatory-update | opinion | news-reaction",
      "slug_it": "kebab-case-italian",
      "slug_en": "kebab-case-english",
      "title_hint": "working Italian title",
      "cluster": "compliance | process-automation | ai-agents | custom-software | ai-search",
      "primaryKeyword": "italian primary keyword",
      "targetPersona": "e.g. CFO / COO / DPO",
      "supportingCaseStudy": "<published slug or null>",
      "internalLinkTargets": ["/route", "/route", "/parliamone"],
      "dedupNotes": "why this is net-new vs owned pillars/backlog/blog, and the named source(s) it relies on",
      "freshnessExpiry": "YYYY-MM-DD or null",
      "score": 0,
      "subScores": { "intent": 0, "biz": 0, "winnability": 0, "freshness": 0, "geo": 0 },
      "sources": ["https://… official/named source url(s) you found"]
    }
  ]
}`,
].join("\n");

// ---- call Claude with web search; resume on pause_turn ----
const client = new Anthropic();
const tools = [
  { type: "web_search_20260209", name: "web_search" },
  { type: "web_fetch_20260209", name: "web_fetch" },
];
const messages = [{ role: "user", content: user }];
let resp, guard = 0;
try {
  do {
    resp = await client.messages.create({
      model: MODEL,
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system,
      tools,
      messages,
    });
    if (resp.stop_reason === "pause_turn") { messages.push({ role: "assistant", content: resp.content }); }
  } while (resp.stop_reason === "pause_turn" && ++guard < 8);
} catch (e) { die("Anthropic API error: " + (e?.message || e)); }
if (resp.stop_reason === "refusal") die("Model refused the request.");

const text = resp.content.filter((b) => b.type === "text").map((b) => b.text).join("");
const out = extractJson(text);
const raw = Array.isArray(out.candidates) ? out.candidates : [];
console.log(`→ model proposed ${raw.length} candidate(s). Validating + deduping…`);

// ---- validate, sanitize, dedupe ----
const clamp01 = (n) => Math.max(0, Math.min(1, Number(n) || 0));
const kept = [];
const dropped = [];
for (const c of raw) {
  if (!c || !c.id || !c.slug_it || !c.slug_en || !c.primaryKeyword || !c.title_hint) { dropped.push([c?.id || "?", "missing required fields"]); continue; }
  const k = norm(c.primaryKeyword);
  if (seenIds.has(c.id) || seenSlugsIt.has(c.slug_it) || seenSlugsEn.has(c.slug_en) || seenKw.has(k)) { dropped.push([c.id, "duplicate of existing guide/blog backlog"]); continue; }
  if (existsSync(`src/content/guides/${c.slug_it}.md`)) { dropped.push([c.id, "guide file already exists"]); continue; }
  const cs = c.supportingCaseStudy && PUBLISHED_CS.has(c.supportingCaseStudy) ? c.supportingCaseStudy : null;
  const links = [...new Set((c.internalLinkTargets || []).filter((r) => VALID_ROUTES.has(r)))];
  if (links.length < 2) { dropped.push([c.id, "fewer than 2 valid internal links"]); continue; }
  const sub = {
    intent: clamp01(c.subScores?.intent), biz: clamp01(c.subScores?.biz),
    winnability: clamp01(c.subScores?.winnability), freshness: clamp01(c.subScores?.freshness),
    geo: clamp01(c.subScores?.geo),
  };
  const score = Math.round(100 * (0.25 * sub.intent + 0.30 * sub.biz + 0.20 * sub.winnability + 0.10 * sub.freshness + 0.15 * sub.geo));
  kept.push({
    id: c.id, status: "parked", archetype: c.archetype || "how-to",
    slug_it: c.slug_it, slug_en: c.slug_en, title_hint: c.title_hint,
    cluster: c.cluster || "compliance", primaryKeyword: c.primaryKeyword,
    targetPersona: c.targetPersona || "", supportingCaseStudy: cs,
    internalLinkTargets: links, dedupNotes: c.dedupNotes || "",
    freshnessExpiry: c.freshnessExpiry || null, score, subScores: sub,
    sources: ["guide-radar", ...(Array.isArray(c.sources) ? c.sources.slice(0, 4) : [])],
    discovered_at: TODAY, drafted_at: null,
  });
  seenIds.add(c.id); seenSlugsIt.add(c.slug_it); seenSlugsEn.add(c.slug_en); seenKw.add(k);
  if (kept.length >= MAX_NEW) break;
}

kept.sort((a, b) => b.score - a.score);
for (const [id, why] of dropped) console.log(`, dropped ${id}: ${why}`);

if (kept.length === 0) {
  console.log("No new valid guide candidates this run. Nothing appended.");
  ghOutput({ added: "false", count: "0" });
  stepSummary(`### Guide radar, no new candidates\n${out.research_summary || ""}\n\nProposed ${raw.length}, all dropped (dupes/invalid).`);
  process.exit(0);
}

topics.push(...kept);
writeFileSync(TOPICS, JSON.stringify(topics, null, 2) + "\n");
console.log(`✓ appended ${kept.length} parked guide candidate(s) to ${TOPICS}`);

const list = kept.map((t) => `- **${t.id}** (score ${t.score}, ${t.cluster}), ${t.title_hint}\n  - kw: \`${t.primaryKeyword}\` · persona: ${t.targetPersona} · links: ${t.internalLinkTargets.join(", ")}${t.freshnessExpiry ? ` · fresh until ${t.freshnessExpiry}` : ""}`).join("\n");
const prBody = [
  `Guide radar found **${kept.length}** new candidate guide topic(s), appended as \`status: "parked"\` (nothing drafts yet).`,
  "",
  `**What changed:** \`automation/guide-topics.json\` only, ${kept.length} parked entries. No guides written.`,
  "",
  "### Research summary",
  out.research_summary || "(none)",
  "",
  "### Proposed candidates (ranked)",
  list,
  "",
  "### To act on these",
  "Review the angles + named sources below. To publish one, flip its `status` to `\"todo\"` (the weekly author drafts it), or set `\"rejected\"` to discard. Leave as `\"parked\"` to keep for later. With AUTOPUBLISH on, the author auto-promotes the top parked candidate when no `todo` is queued.",
].join("\n");
ghOutput({ added: "true", count: String(kept.length), title: `Guide radar: ${kept.length} new candidate topic(s)`, prbody: prBody });
stepSummary(`### Guide radar, ${kept.length} new parked candidate(s)\n${list}`);
console.log("✓ done");
