#!/usr/bin/env node
// Monthly content orchestrator (replaces the old per-cron draft+gate+publish machinery).
//
// Builds a weekday calendar for the target month and fills every business day with ONE
// piece so the site ships 5 pieces/week: Mon/Wed/Fri = blog, Tue/Thu = confronto
// (3 blog + 2 confronti per week, exactly as requested). For each open weekday it runs
// the EXISTING pipeline end to end — author -> quality-gates -> fix-gates (bounded) — and
// only when every gate passes does it stamp the gate provenance and flip `draft:false`
// with `pubDate` set to that weekday. Pieces that never pass stay `draft:true` (dormant,
// invisible in prod) and are reported as a shortfall.
//
// It never reveals anything early: the page filters ship a piece only once its pubDate is
// reached (see the drip filter in the blog/confronto pages). The weekday drip job
// (scheduled-publish.yml) just triggers a rebuild each morning so that day's pieces appear.
//
// This is an ORCHESTRATOR: it shells out to the tested scripts rather than re-implementing
// them, so authoring/gating/fixing logic stays in one place.
//
// Env:  ANTHROPIC_API_KEY (author/gates/fix), MONTH=YYYY-MM (default: next month),
//       FIX_ROUNDS (default 3), EXTRA_ATTEMPTS (default 1, topic re-rolls per slot),
//       BREVO_API_KEY + ALERT_EMAIL + LEAD_FROM_EMAIL (shortfall alert, optional).
// Flags: --self-test (calendar math only, no API, asserts the 3+2 split),
//        --dry-run (print the full plan, no API/writes), --month=YYYY-MM.

import { readFileSync, writeFileSync, existsSync, readdirSync, unlinkSync, appendFileSync, mkdtempSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const argv = process.argv.slice(2);
const SELF_TEST = argv.includes("--self-test");
const DRY = argv.includes("--dry-run") || SELF_TEST;
const MONTH_ARG = (argv.find((a) => a.startsWith("--month=")) || "").split("=")[1] || process.env.MONTH || "";
const FIX_ROUNDS = Number(process.env.FIX_ROUNDS || 3);
const EXTRA_ATTEMPTS = Number(process.env.EXTRA_ATTEMPTS || 1);
const GATE_MODEL = process.env.GATE_MODEL || "claude-sonnet-4-6";

const die = (m) => { console.error("✗ " + m); process.exit(1); };
const log = (m) => console.log(m);

// blog on Mon(1)/Wed(3)/Fri(5), confronto on Tue(2)/Thu(4); weekend (0,6) skipped.
const DOW_KIND = { 1: "blog", 3: "blog", 5: "blog", 2: "confronto", 4: "confronto" };

const KIND = {
  blog: {
    author: "automation/author.mjs",
    gates: "automation/quality-gates.mjs",
    fix: "automation/fix-gates.mjs",
    dir: "src/content/blog",
    enDir: "src/content/blog/en",
    label: "Blog",
  },
  confronto: {
    author: "automation/confronto-author.mjs",
    gates: "automation/confronto-quality-gates.mjs",
    fix: "automation/confronto-fix-gates.mjs",
    dir: "src/content/confronti",
    enDir: "src/content/confronti/en",
    label: "Confronto",
  },
};

// ---- target month + weekday calendar ----------------------------------------
function targetMonth() {
  if (/^\d{4}-\d{2}$/.test(MONTH_ARG)) {
    const [y, m] = MONTH_ARG.split("-").map(Number);
    return { y, m: m - 1 }; // JS month is 0-based
  }
  const now = new Date();
  return { y: now.getFullYear() + (now.getMonth() === 11 ? 1 : 0), m: (now.getMonth() + 1) % 12 };
}
const pad = (n) => String(n).padStart(2, "0");
function calendar() {
  const { y, m } = targetMonth();
  const days = new Date(y, m + 1, 0).getDate();
  const slots = [];
  for (let d = 1; d <= days; d++) {
    const dow = new Date(y, m, d).getDay();
    const kind = DOW_KIND[dow];
    if (!kind) continue;
    slots.push({ date: `${y}-${pad(m + 1)}-${pad(d)}`, kind });
  }
  return { y, m, slots };
}

// ---- helpers -----------------------------------------------------------------
const listMd = (dir) => { try { return readdirSync(dir).filter((f) => f.endsWith(".md")); } catch { return []; } };
const pubDateOf = (path) => { try { return (readFileSync(path, "utf8").match(/^pubDate:\s*(\d{4}-\d{2}-\d{2})/m) || [, ""])[1]; } catch { return ""; } };
function occupied(kind) {
  const c = KIND[kind];
  const set = new Set();
  for (const f of listMd(c.dir)) { const d = pubDateOf(`${c.dir}/${f}`); if (d) set.add(d); }
  return set;
}

function run(script, args, extraEnv) {
  const r = spawnSync("node", [script, ...args], { stdio: "inherit", env: { ...process.env, ...extraEnv } });
  return r.status === 0;
}

// Author one piece for `date`; returns {itPath, enPath} of the freshly written draft, or null.
function author(kind, date) {
  const c = KIND[kind];
  const beforeIt = new Set(listMd(c.dir));
  const beforeEn = new Set(listMd(c.enDir));
  run(c.author, [], { TARGET_PUBDATE: date, AUTOPUBLISH: "true" });
  const newIt = listMd(c.dir).filter((f) => !beforeIt.has(f));
  const newEn = listMd(c.enDir).filter((f) => !beforeEn.has(f));
  if (!newIt.length) return null; // backlog empty or nothing drafted
  return { itPath: `${c.dir}/${newIt[0]}`, enPath: newEn.length ? `${c.enDir}/${newEn[0]}` : "" };
}

// Run gates on the IT file; returns {ok, entry} where entry is the JSON report row.
function gate(kind, itPath) {
  const c = KIND[kind];
  const jsonPath = join(mkdtempSync(join(tmpdir(), "gate-")), "report.json");
  const ok = run(c.gates, [itPath], { GATE_REPORT_JSON: jsonPath, GATE_MODEL });
  let entry = null;
  try {
    const rep = JSON.parse(readFileSync(jsonPath, "utf8"));
    const slug = itPath.split("/").pop().replace(/\.md$/, "");
    entry = rep.find((e) => e.slug === slug) || rep[0] || null;
  } catch {}
  return { ok, entry };
}

function fix(kind, itPath, rewrite) {
  const c = KIND[kind];
  return run(c.fix, rewrite ? ["--rewrite", itPath] : [itPath], { FINDINGS_FILE: "automation/.gate-report.md", GATE_MODEL });
}

// author -> (gate -> fix)* -> gate. Returns {passed, entry}.
function gateFixLoop(kind, itPath) {
  let last = { ok: false, entry: null };
  for (let r = 0; r <= FIX_ROUNDS; r++) {
    last = gate(kind, itPath);
    if (last.ok) return { passed: true, entry: last.entry };
    if (r === FIX_ROUNDS) break;
    fix(kind, itPath, r >= FIX_ROUNDS - 1); // escalate to a full rewrite on the last round
  }
  return { passed: false, entry: last.entry };
}

// Flip draft:true -> draft:false and stamp the gate provenance, on IT + EN.
function publish(itPath, enPath, entry) {
  const iso = new Date().toISOString();
  const lenses = (entry?.lenses || []).map((l) => `    - { name: ${JSON.stringify(l.name)}, score: ${Number(l.score) || 0}, pass: ${!!l.pass} }`);
  const stamp = ["gates:", `  passedAt: ${iso}`, `  model: ${JSON.stringify(GATE_MODEL)}`, "  lenses:", ...lenses, "draft: false"].join("\n");
  for (const p of [itPath, enPath]) {
    if (!p || !existsSync(p)) continue;
    let src = readFileSync(p, "utf8");
    if (!/^draft:\s*true\s*$/m.test(src)) continue; // already published or unexpected shape
    src = src.replace(/^draft:\s*true\s*$/m, stamp);
    writeFileSync(p, src);
  }
}

const rm = (p) => { try { if (p && existsSync(p)) unlinkSync(p); } catch {} };

// Fill one calendar slot: try up to EXTRA_ATTEMPTS+1 topics until one passes the gates.
function fillSlot(kind, date) {
  for (let attempt = 0; attempt <= EXTRA_ATTEMPTS; attempt++) {
    const paths = author(kind, date);
    if (!paths) return { status: "backlog-empty" };
    const { passed, entry } = gateFixLoop(kind, paths.itPath);
    if (passed) {
      publish(paths.itPath, paths.enPath, entry);
      return { status: "published", slug: paths.itPath.split("/").pop().replace(/\.md$/, "") };
    }
    // Failed all rounds: drop this draft (author already marked its topic `drafted`, so the
    // next attempt picks the following topic) and re-roll.
    rm(paths.itPath); rm(paths.enPath);
    log(`  ↻ gates unmet after ${FIX_ROUNDS} rounds; dropped ${paths.itPath}, re-rolling (attempt ${attempt + 1}/${EXTRA_ATTEMPTS + 1})`);
  }
  return { status: "gates-failed" };
}

// ---- shortfall alert (Brevo) -------------------------------------------------
async function alertShortfall(monthLabel, misses) {
  const key = process.env.BREVO_API_KEY;
  const to = process.env.ALERT_EMAIL || "daniel.levis@soraia.io";
  const from = process.env.LEAD_FROM_EMAIL || "noreply@soraia.io";
  if (!key) { log("(no BREVO_API_KEY; skipping shortfall email)"); return; }
  const rows = misses.map((m) => `<li>${m.date} · ${m.kind} · ${m.status}</li>`).join("");
  const html = `<p>Il calendario contenuti di ${monthLabel} ha ${misses.length} slot non riempiti:</p><ul>${rows}</ul>` +
    `<p>Cause tipiche: backlog topic esaurito (aggiungi topic) o gate non superati. I pezzi non pubblicati restano <code>draft:true</code>.</p>`;
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ sender: { email: from, name: "Soraia Content Bot" }, to: [{ email: to }], subject: `⚠️ Contenuti ${monthLabel}: ${misses.length} slot scoperti`, htmlContent: html }),
    });
    log(res.ok ? "✓ shortfall alert sent" : `✗ shortfall alert failed: HTTP ${res.status}`);
  } catch (e) { log("✗ shortfall alert error: " + (e?.message || e)); }
}

// ---- main --------------------------------------------------------------------
const { y, m, slots } = calendar();
const monthLabel = `${y}-${pad(m + 1)}`;
const nBlog = slots.filter((s) => s.kind === "blog").length;
const nConf = slots.filter((s) => s.kind === "confronto").length;
log(`Monthly content plan for ${monthLabel}: ${slots.length} weekdays → ${nBlog} blog + ${nConf} confronti`);

if (SELF_TEST) {
  // Every full Mon-Fri week must be 3 blog + 2 confronti; assert the mapping is intact.
  const byWeek = {};
  for (const s of slots) { const wk = new Date(s.date).getDay(); byWeek[wk] = (byWeek[wk] || 0) + 1; }
  const okMap = [1, 3, 5].every((d) => (DOW_KIND[d] === "blog")) && [2, 4].every((d) => DOW_KIND[d] === "confronto");
  if (!okMap) die("weekday→kind map is not 3 blog + 2 confronto");
  for (const s of slots.slice(0, 10)) log(`  ${s.date}  ${s.kind}`);
  log(`self-test OK: map is 3 blog (Mon/Wed/Fri) + 2 confronti (Tue/Thu), ${slots.length} slots total`);
  process.exit(0);
}

const occ = { blog: occupied("blog"), confronto: occupied("confronto") };
const published = [];
const misses = [];

for (const s of slots) {
  if (occ[s.kind].has(s.date)) { log(`= ${s.date} ${s.kind}: already occupied, skipping`); continue; }
  if (DRY) { log(`~ ${s.date} ${s.kind}: would generate (dry-run)`); continue; }
  log(`→ ${s.date} ${s.kind}: generating…`);
  const r = fillSlot(s.kind, s.date);
  if (r.status === "published") { published.push({ ...s, slug: r.slug }); occ[s.kind].add(s.date); log(`✓ ${s.date} ${s.kind}: ${r.slug} (scheduled)`); }
  else { misses.push({ ...s, status: r.status }); log(`✗ ${s.date} ${s.kind}: ${r.status}`); }
}

if (DRY) { log(`\nDry run complete. ${slots.length} slots planned (${nBlog} blog / ${nConf} confronti).`); process.exit(0); }

const summary = `### Monthly content: ${monthLabel}\n- Scheduled: **${published.length}** (${published.filter((p) => p.kind === "blog").length} blog, ${published.filter((p) => p.kind === "confronto").length} confronti)\n- Shortfall: **${misses.length}**\n` +
  published.map((p) => `- ✓ ${p.date} · ${p.kind} · \`${p.slug}\``).join("\n") + (misses.length ? "\n" + misses.map((mm) => `- ✗ ${mm.date} · ${mm.kind} · ${mm.status}`).join("\n") : "");
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
log("\n" + summary);

if (misses.length) await alertShortfall(monthLabel, misses);
log(`\n✓ Orchestration done: ${published.length} scheduled, ${misses.length} short for ${monthLabel}.`);
