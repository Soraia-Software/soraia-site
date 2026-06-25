# Automated blog engine

A `generate → gate → publish` pipeline that produces 1–2 genuinely useful, bilingual
(IT/EN) posts per week from a documented content-gap backlog. **Quality and safety over
volume.** Publishing mode is controlled by the `AUTOPUBLISH` repo variable (see Guardrails):
off = human reviews + merges each draft PR; on = a post that passes ALL gates auto-merges
and goes live with no human step (a failed gate still holds the PR for a human).

## Pieces in this folder
- `blog-topics.json` — the versioned topic backlog. Status flow: `parked → todo → drafted → published` (or `rejected`). Only `todo` items get written; the author never reuses `drafted`/`published` (anti-duplication).
- `system-prompt.md` — the canonical generation prompt (brand voice, the verifiable-metric corpus, structure, anti-duplication rules, self-grade). Used by the author script **and** for any post written by hand. Edit voice rules here only.
- `author.mjs` — picks the first `todo` topic, generates the bilingual draft (`draft:true`), opens a "Draft: …" PR. Run by `draft.yml` (Mon & Thu cron → 2 posts/week).
- `quality-gates.mjs` — 1 deterministic check (house-style: ASCII-hyphen only, no typographic/em dashes) + 5 adversarial judges (fact-check, originality, brand-voice, seo-structure, geo-citability) that score a draft PR. Run by `quality-gates.yml`.
- `house-style.mjs` — single source of truth for the punctuation house style (`FANCY_DASH` detector + `normalizeDashes`), shared by the gate, the author and the autofix so the rule can't drift.
- `fix-gates.mjs` — the autofix: when gates fail, Claude applies minimal targeted edits and the result is written back dash-normalized. Run by the `autofix` job in `quality-gates.yml`.
- `topic-radar.mjs` — Phase 3 discovery agent: Claude + web search finds recent news/keywords/questions, scores + dedupes candidate topics, appends survivors as `status:"parked"`. Run by `topic-radar.yml` (bi-weekly cron, 1st & 15th; `RADAR_MAX_TOPICS=6` → up to 12 candidates/month, ≥8 floor, to sustain 2 posts/week). **Refills the backlog so the queue never silently runs dry.** Never writes posts, never sets `todo` — a human reviews the PR and promotes a candidate to `todo`.

## How a post goes live
1. Pick a `todo` topic from `blog-topics.json`.
2. Generate IT + EN drafts with `system-prompt.md` → write `src/content/blog/<slug>.md` (`draft: true`) and `src/content/blog/en/<slug-en>.md` (`draft: true`, native rewrite).
3. Add the IT/EN pair to `BLOG_SLUG_MAP` in `src/lib/i18n.ts`. For cornerstone posts, append the `llms.txt` line in both locales.
4. **Human review** in `astro dev` (drafts render in dev, are stripped from prod builds & sitemap). Verify every metric against `public/llms.txt` / published case studies, check voice, flip `draft: true → false` in BOTH files.
5. Commit/merge to `main` → the `deploy.yml` Action builds + `wrangler pages deploy`s. (Until the Cloudflare secrets exist, deploy with `npm run build && npx wrangler pages deploy dist --project-name=soraia-site --branch=main`.)

## Operative guides engine (parallel pipeline, `/guide/`)

A second, isolated fork of the same machinery publishes **1 long-form operative guide per week
on Wednesday** (a different day than the blog's Mon & Thu) under `/guide/` and `/en/guide/`.
Guides are thought-leadership + practical content on regulations and news (AI Act, GDPR, NIS2,
Garante Privacy, incentivi), written to position Soraia as the honest operational expert. The
guide fork shares `house-style.mjs` and the `deploy.yml` backstop, but uses its own backlog,
prompt, scripts, branch prefix (`guide/`), and workflows so it can never destabilize the blog.

- `guide-topics.json` — guide backlog (same status flow `parked → todo → drafted → published`), separate from `blog-topics.json` so blog and guide drafters never fight over the same `todo`.
- `guide-system-prompt.md` — guide generation prompt: factual + attributed, archetype decides length (practical how-to ~1200-1500w, regulatory-update/opinion/news ~800-1300w), and **every guide MUST close by inviting an honest expert opinion from Soraia** (`/parliamone` / `/en/contact`).
- `guide-author.mjs` — picks the first `todo` guide topic, writes IT+EN `draft:true` under `src/content/guides{,/en}`, registers the pair in `GUIDE_SLUG_MAP`. Run by `guide-draft.yml` (Wednesday cron).
- `guide-quality-gates.mjs` — **2 deterministic checks** (`house-style`; `expert-cta`: the `/parliamone` // `/en/contact` link must be present) + **6 LLM gates** (fact-check, originality, brand-voice, seo-structure, geo-citability, **honesty**). Because guides auto-publish hands-off, `honesty` (every external regulatory/fiscal claim attributed to a named source; general guidance, not advice; routes to Soraia for a tailored opinion) + `expert-cta` are the safety net. Run by `guide-quality-gates.yml`.
- `guide-fix-gates.mjs` — the guide autofix (same loop as the blog, guide constraints + keeps the CTA). Run by the `autofix` job in `guide-quality-gates.yml`.
- `guide-radar.mjs` — discovery for regulatory/news/operative angles; dedupes against the guide backlog, published guides **and** the blog (no cannibalization). Run by `guide-topic-radar.yml` (bi-weekly, 8th & 22nd, offset from the blog radar's 1st & 15th).

Guides use the **same `AUTOPUBLISH` repo variable** as the blog (flipping it affects both). The
guide collection gained a `draft` field (`src/content.config.ts`) + the `(import.meta.env.DEV || !draft)`
filter on all four guide pages, so a `draft:true` guide is hidden in prod (and the sitemap) and
flips live on a green gate run, exactly like the blog.

## Roadmap
- **Phase 0 (done)** — blog schema gains `draft` / `faq` / `keywords` / `updatedDate` / `h1` / `ogImage`; drafts hidden in prod (visible in dev); Article + FAQPage JSON-LD on blog posts; `deploy.yml`.
- **Phase 1 (MVP)** — hand-author the first 2-3 posts from this prompt to lock the voice.
- **Phase 2** — `automation/author.mjs` + `.github/workflows/draft.yml` (weekly cron): generates IT+EN, opens a "Draft: …" PR; five adversarial quality-gate judges (fact/hallucination, originality, brand-voice, structure/SEO/schema, GEO-citability) run in CI on the PR. Human still flips `draft:false`.
- **Phase 3 (done, dependency-light)** — `automation/topic-radar.mjs` + `.github/workflows/topic-radar.yml` (monthly cron): Claude + the `web_search`/`web_fetch` server tools discover recent news/keywords/questions, score candidates against the backlog rubric, dedupe vs the backlog + owned guide themes, validate every `supportingCaseStudy`/link against real published routes, and append survivors as `status:"parked"` via PR. Needs only `ANTHROPIC_API_KEY` (web search is billed). Tune volume with the `RADAR_MAX_TOPICS` repo variable (code default 5; **set to 6** → ×2 bi-weekly runs = up to 12 candidates/month for 2 posts/week).
- **Phase 3+ (later)** — richer signals when keys are provisioned: GSC striking-distance/gap queries + Serper SERP/PAA, plus biweekly GEO-citation measurement.

## Secrets (GitHub → Settings → Secrets and variables → Actions)
- `CLOUDFLARE_API_TOKEN` — scoped **Account › Cloudflare Pages › Edit** (never the Global key).
- `CLOUDFLARE_ACCOUNT_ID` — `7accb3afddfafa68d9fcaad27a128222`.
- `ANTHROPIC_API_KEY` — for Phase 2 (`author.mjs`) only.

## Guardrails (non-negotiable)
- **`AUTOPUBLISH` repo variable** (GitHub → Settings → Secrets and variables → Actions → Variables) is the publishing kill-switch. Unset/`false` → human reviews and merges every draft PR (`draft:true` until a human flips it). `true` → full hands-off: (1) the author auto-promotes the top-scored `parked` topic when the `todo` queue is empty; (2) if the gates **fail**, the `autofix` job has Claude (`fix-gates.mjs`) apply minimal targeted fixes and pushes them, re-running the gates — looping up to `MAX_AUTOFIX` attempts (default 3), then handing the PR to a human if still red (some failures, e.g. topic overlap, aren't fixable by editing); (3) when the gates **pass**, the `autopublish` job flips `draft:false` and squash-merges (explicit subject so `[skip ci]` can't leak and skip deploy) → live. **`draft:false` is set only after all gates pass, so a held/failed PR stays hidden in prod even if merged.**
- Cadence ceiling 1–2 posts/week, topics only from the gap list — avoids Google "scaled content abuse".
- Every number traceable to the site. Never link/cite `oggi-lavoro` or `aegis` (draft, pending client approval).
