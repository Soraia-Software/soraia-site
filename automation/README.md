# Automated content engine

A `generate → gate → schedule → drip` pipeline that fills every **weekday** with one genuinely
useful, bilingual (IT/EN) piece: **blog on Mon/Wed/Fri, confronto (A-vs-B comparison) on
Tue/Thu → 3 blog + 2 confronti per week.** **Quality and safety over volume.** A whole month
is generated in one scheduled run, then revealed one day at a time.

## The model: generate monthly, drip daily
1. **`monthly-content.yml`** (25th of each month) tops up the topic backlogs (radars), then runs
   `monthly-orchestrator.mjs` for the upcoming month. For every weekday slot the orchestrator runs
   the full pipeline — author → quality-gates → fix-gates (bounded) — and **only on an all-gates
   pass** stamps the gate provenance and flips `draft:false` with `pubDate` set to that weekday.
   It commits the whole month to `main` in one batch.
2. Each piece is committed `draft:false` **but future-dated**. The pages ship a piece only once
   its date arrives: the filter is `(import.meta.env.DEV || (!draft && pubDate <= new Date()))`,
   so a future `pubDate` stays hidden in prod (and out of the sitemap) until its day.
3. **`scheduled-publish.yml`** (every weekday morning) re-triggers `deploy.yml`. The fresh build
   re-evaluates `pubDate <= now`, so exactly that day's piece goes live. No new content is
   generated at drip time — it just reveals what was already scheduled.

A piece that never passes the gates after the fix budget stays `draft:true` (dormant) and is
reported; unfilled slots (empty backlog or persistent gate failures) trigger a shortfall email
via Brevo so the backlog can be topped up.

## Pieces in this folder
- `blog-topics.json` / `confronto-topics.json` — versioned topic backlogs. Status flow: `parked → todo → drafted → published` (or `rejected`). The orchestrator promotes `todo` first, then (backlog empty) the top-scored `parked` candidate.
- `system-prompt.md` / `confronto-system-prompt.md` — canonical generation prompts (brand voice, verifiable-metric corpus, structure, anti-duplication). Edit voice rules here only.
- `author.mjs` / `confronto-author.mjs` — pick the first `todo` topic, write the bilingual `draft:true` files, register the slug pair in `BLOG_SLUG_MAP` / `CONFRONTO_SLUG_MAP`, mark the topic `drafted`. Honor `TARGET_PUBDATE` (the orchestrator sets each piece's scheduled weekday).
- `quality-gates.mjs` / `confronto-quality-gates.mjs` — 1 deterministic check (`house-style`: ASCII-hyphen only) + adversarial LLM judges (fact-check, originality, brand-voice, seo-structure, geo-citability; confronto adds `balance`). Write `.gate-report.md` and, when `GATE_REPORT_JSON` is set, a machine-readable per-piece report the orchestrator reads.
- `fix-gates.mjs` / `confronto-fix-gates.mjs` — the autofix: when gates fail, Claude applies minimal targeted edits (escalating to a full `--rewrite` once minimal fixes oscillate), written back dash-normalized. Refuse to drop `draft:true`.
- `house-style.mjs` — single source of truth for the punctuation house style (`FANCY_DASH` detector + `normalizeDashes`), shared by gate, author and autofix so the rule can't drift.
- `topic-radar.mjs` / `confronto-radar.mjs` — discovery agents: Claude + web search find recent news/keywords/questions, score + dedupe candidates, append survivors as `status:"parked"`. Run as the backlog-refill step inside `monthly-content.yml`.
- `monthly-orchestrator.mjs` — the conductor (see above). Flags: `--self-test` (calendar math only), `--dry-run` (plan, no API), `--month=YYYY-MM`. Env: `FIX_ROUNDS` (default 3), `EXTRA_ATTEMPTS` (topic re-rolls per slot, default 1).

## Operative guides engine (`/guide/`) — FROZEN
A third fork (`guide-*.mjs`, `guide-topics.json`, `guide-system-prompt.md`) previously auto-published
one operative guide per week. **Its generation is now frozen: the standalone guide workflows were
removed.** All published guides stay live and unchanged; the scripts remain on disk so guide
generation can be re-enabled later (wire them into a workflow) without rebuilding them. The guides
collection keeps its `draft` filter; existing guides are past-dated so they render normally.

## Workflows (`.github/workflows/`)
- `deploy.yml` — build + `wrangler pages deploy` on every push to `main` (and on dispatch). Unchanged.
- `monthly-content.yml` — monthly generate + gate + schedule + commit (see above).
- `scheduled-publish.yml` — weekday drip: re-triggers `deploy.yml` so the day's scheduled piece appears.

## Secrets & variables (GitHub → Settings → Secrets and variables → Actions)
- `CLOUDFLARE_API_TOKEN` — scoped **Account › Cloudflare Pages › Edit** (never the Global key).
- `CLOUDFLARE_ACCOUNT_ID` — `7accb3afddfafa68d9fcaad27a128222`.
- `ANTHROPIC_API_KEY` — author, gates, fix, radar (web search is billed).
- `BLOG_BOT_TOKEN` — scoped PAT so the monthly batch can push to `main`.
- `BREVO_API_KEY` (secret) + `LEAD_FROM_EMAIL` / `ALERT_EMAIL` (vars) — shortfall alert email.
- `AUTHOR_MODEL` / `GATE_MODEL` (vars) — model overrides (default author `claude-opus-4-8`, gate `claude-sonnet-4-6`).

## Guardrails (non-negotiable)
- `draft:false` is stamped **only after all gates pass**, so a piece that fails stays hidden in prod even though it was committed. Future `pubDate` keeps a passed piece hidden until its scheduled day.
- Cadence is one piece per weekday (3 blog + 2 confronti/week), topics only from the gap-list backlog — avoids Google "scaled content abuse".
- Every Soraia/client number must trace to `public/llms.txt` or a published case study. Never link or cite `oggi-lavoro` or `aegis` (draft, pending client approval).
