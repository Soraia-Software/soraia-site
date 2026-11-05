#!/usr/bin/env node
// AI visibility monitor: asks a fixed panel of buyer questions (ai-visibility-questions.json) to every
// AI engine we have a key for, and records whether the answer names Soraia, whether it cites
// soraia.io, and which domains it cites instead. Writes automation/ai-visibility/YYYY-MM.json and a
// summary (stdout + GITHUB_STEP_SUMMARY). Engines without a key are skipped, and one failing
// question never stops the run. Driven monthly by .github/workflows/ai-visibility.yml.
//
// Env: ANTHROPIC_API_KEY (Claude with web search). Optional, one engine each: OPENAI_API_KEY
// (ChatGPT search, Responses API), PERPLEXITY_API_KEY, GEMINI_API_KEY (Google Search grounding).
// Model overrides: MONITOR_CLAUDE_MODEL, MONITOR_OPENAI_MODEL, MONITOR_PERPLEXITY_MODEL,
// MONITOR_GEMINI_MODEL.
//
// Usage: node automation/ai-visibility.mjs [--dry-run] [--limit N]

import { readFileSync, writeFileSync, mkdirSync, appendFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";

const DRY = process.argv.includes("--dry-run");
const LIMIT = Number(process.argv[process.argv.indexOf("--limit") + 1]) || Infinity;
const MONTH = new Date().toISOString().slice(0, 7);
const env = process.env;

const questions = JSON.parse(readFileSync("automation/ai-visibility-questions.json", "utf8")).slice(0, LIMIT);

// ---- engines: each returns { text, cited: [url or domain] } ----

async function askClaude(q) {
  const client = new Anthropic();
  const messages = [{ role: "user", content: q }];
  let resp, guard = 0;
  do {
    resp = await client.beta.messages.create({
      model: env.MONITOR_CLAUDE_MODEL || "claude-opus-5-5",
      max_tokens: 16000,
      output_config: { effort: "medium" },
      // On a safety decline the API retries on a fallback model instead of returning nothing.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      tools: [{ type: "web_search_20260209", name: "web_search" }],
      messages,
    });
    if (resp.stop_reason === "pause_turn") messages.push({ role: "assistant", content: resp.content });
  } while (resp.stop_reason === "pause_turn" && ++guard < 6);
  if (resp.stop_reason === "refusal") throw new Error(`refusal (${resp.stop_details?.category ?? "no category"})`);
  const texts = resp.content.filter((b) => b.type === "text");
  return {
    text: texts.map((b) => b.text).join(""),
    cited: texts.flatMap((b) => (b.citations || []).filter((c) => c.type === "web_search_result_location").map((c) => c.url)),
  };
}

async function postJson(url, headers, body) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${data?.error?.message || JSON.stringify(data).slice(0, 200)}`);
  return data;
}

async function askOpenAI(q) {
  const d = await postJson("https://api.openai.com/v1/responses", { Authorization: `Bearer ${env.OPENAI_API_KEY}` },
    { model: env.MONITOR_OPENAI_MODEL || "gpt-5", input: q, tools: [{ type: "web_search" }] });
  const parts = (d.output || []).filter((o) => o.type === "message").flatMap((o) => o.content || []).filter((c) => c.type === "output_text");
  return {
    text: parts.map((p) => p.text).join(""),
    cited: parts.flatMap((p) => (p.annotations || []).filter((a) => a.type === "url_citation").map((a) => a.url)),
  };
}

async function askPerplexity(q) {
  const d = await postJson("https://api.perplexity.ai/chat/completions", { Authorization: `Bearer ${env.PERPLEXITY_API_KEY}` },
    { model: env.MONITOR_PERPLEXITY_MODEL || "sonar", messages: [{ role: "user", content: q }] });
  return {
    text: d.choices?.[0]?.message?.content || "",
    cited: d.citations?.length ? d.citations : (d.search_results || []).map((s) => s.url),
  };
}

async function askGemini(q) {
  const model = env.MONITOR_GEMINI_MODEL || "gemini-2.5-flash";
  const d = await postJson(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, { "x-goog-api-key": env.GEMINI_API_KEY },
    { contents: [{ parts: [{ text: q }] }], tools: [{ google_search: {} }] });
  const cand = d.candidates?.[0];
  return {
    text: (cand?.content?.parts || []).map((p) => p.text || "").join(""),
    // Grounding URIs are Google redirect links: the cited site's domain is in web.title.
    cited: (cand?.groundingMetadata?.groundingChunks || []).map((c) => c.web?.title || c.web?.uri).filter(Boolean),
  };
}

const ENGINES = [
  { name: "claude", ask: askClaude, on: !!(env.ANTHROPIC_API_KEY || env.ANTHROPIC_AUTH_TOKEN) },
  { name: "chatgpt", ask: askOpenAI, on: !!env.OPENAI_API_KEY },
  { name: "perplexity", ask: askPerplexity, on: !!env.PERPLEXITY_API_KEY },
  { name: "gemini", ask: askGemini, on: !!env.GEMINI_API_KEY },
].filter((e) => e.on);

const domainOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return String(u).replace(/^www\./, ""); } };

if (DRY || !ENGINES.length) {
  console.log(`AI visibility ${MONTH}: ${questions.length} questions, engines with a key: ${ENGINES.map((e) => e.name).join(", ") || "none"}`);
  questions.forEach((q) => console.log(`  [${q.lang}] ${q.q}`));
  process.exit(0);
}

// ---- run the panel (sequential: gentle on rate limits, cheap enough monthly) ----
const results = [];
for (const q of questions) {
  for (const e of ENGINES) {
    try {
      const { text, cited } = await e.ask(q.q);
      const domains = [...new Set(cited.map(domainOf))];
      results.push({
        engine: e.name, id: q.id, lang: q.lang, q: q.q,
        mentioned: /\bsoraia\b/i.test(text), cited: domains.some((d) => /(^|\.)soraia\.io$/i.test(d)),
        domains, answer: text.slice(0, 1500),
      });
    } catch (err) {
      results.push({ engine: e.name, id: q.id, lang: q.lang, q: q.q, error: String(err?.message || err).slice(0, 300) });
    }
    console.log(`${e.name.padEnd(10)} ${q.id}: ${results.at(-1).error ? "error" : results.at(-1).cited ? "CITED" : results.at(-1).mentioned ? "named" : "-"}`);
  }
}

// ---- summary ----
const ok = results.filter((r) => !r.error);
const perEngine = ENGINES.map((e) => {
  const rs = ok.filter((r) => r.engine === e.name);
  return { engine: e.name, answered: rs.length, named: rs.filter((r) => r.mentioned).length, cited: rs.filter((r) => r.cited).length, errors: results.filter((r) => r.engine === e.name && r.error).length };
});
const domainCount = {};
ok.flatMap((r) => r.domains).filter((d) => !/soraia\.io$/i.test(d)).forEach((d) => { domainCount[d] = (domainCount[d] || 0) + 1; });
const topDomains = Object.entries(domainCount).sort((a, b) => b[1] - a[1]).slice(0, 20);
const hits = ok.filter((r) => r.mentioned || r.cited);

mkdirSync("automation/ai-visibility", { recursive: true });
const file = `automation/ai-visibility/${MONTH}.json`;
writeFileSync(file, JSON.stringify({ month: MONTH, generatedAt: new Date().toISOString(), perEngine, topDomains, results }, null, 2) + "\n");

const md = [
  `## AI visibility ${MONTH}`,
  "",
  "| Engine | Answered | Names Soraia | Cites soraia.io | Errors |",
  "|---|---|---|---|---|",
  ...perEngine.map((p) => `| ${p.engine} | ${p.answered} | ${p.named} | ${p.cited} | ${p.errors} |`),
  "",
  `**Where Soraia shows up:** ${hits.length ? hits.map((r) => `${r.engine} · ${r.id}${r.cited ? " (cited)" : ""}`).join(", ") : "nowhere yet"}`,
  "",
  "**Most cited domains instead:** " + (topDomains.map(([d, n]) => `${d} (${n})`).join(", ") || "none"),
  "",
  `Full results: \`${file}\``,
].join("\n");
console.log("\n" + md);
if (env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY, md + "\n");
