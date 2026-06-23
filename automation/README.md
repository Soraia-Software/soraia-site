# Automated blog engine

A `generate → gate → human-review → publish` pipeline that produces 1–2 genuinely
useful, bilingual (IT/EN) posts per week from a documented content-gap backlog.
**Quality and safety over volume.** Nothing auto-publishes today.

## Pieces in this folder
- `blog-topics.json` — the versioned topic backlog. Status flow: `parked → todo → drafted → published` (or `rejected`). Only `todo` items get written; the author never reuses `drafted`/`published` (anti-duplication).
- `system-prompt.md` — the canonical generation prompt (brand voice, the verifiable-metric corpus, structure, anti-duplication rules, self-grade). Used by the author script **and** for any post written by hand. Edit voice rules here only.
- `author.mjs` — picks the first `todo` topic, generates the bilingual draft (`draft:true`), opens a "Draft: …" PR. Run by `draft.yml` (weekly Mon cron).
- `quality-gates.mjs` — 5 adversarial judges (fact-check, originality, brand-voice, seo-structure, geo-citability) that score a draft PR. Run by `quality-gates.yml`.
- `topic-radar.mjs` — Phase 3 discovery agent: Claude + web search finds recent news/keywords/questions, scores + dedupes candidate topics, appends survivors as `status:"parked"`. Run by `topic-radar.yml` (monthly cron). **Refills the backlog so the queue never silently runs dry.** Never writes posts, never sets `todo` — a human reviews the PR and promotes a candidate to `todo`.

## How a post goes live
1. Pick a `todo` topic from `blog-topics.json`.
2. Generate IT + EN drafts with `system-prompt.md` → write `src/content/blog/<slug>.md` (`draft: true`) and `src/content/blog/en/<slug-en>.md` (`draft: true`, native rewrite).
3. Add the IT/EN pair to `BLOG_SLUG_MAP` in `src/lib/i18n.ts`. For cornerstone posts, append the `llms.txt` line in both locales.
4. **Human review** in `astro dev` (drafts render in dev, are stripped from prod builds & sitemap). Verify every metric against `public/llms.txt` / published case studies, check voice, flip `draft: true → false` in BOTH files.
5. Commit/merge to `main` → the `deploy.yml` Action builds + `wrangler pages deploy`s. (Until the Cloudflare secrets exist, deploy with `npm run build && npx wrangler pages deploy dist --project-name=soraia-site --branch=main`.)

## Roadmap
- **Phase 0 (done)** — blog schema gains `draft` / `faq` / `keywords` / `updatedDate` / `h1` / `ogImage`; drafts hidden in prod (visible in dev); Article + FAQPage JSON-LD on blog posts; `deploy.yml`.
- **Phase 1 (MVP)** — hand-author the first 2-3 posts from this prompt to lock the voice.
- **Phase 2** — `automation/author.mjs` + `.github/workflows/draft.yml` (weekly cron): generates IT+EN, opens a "Draft: …" PR; five adversarial quality-gate judges (fact/hallucination, originality, brand-voice, structure/SEO/schema, GEO-citability) run in CI on the PR. Human still flips `draft:false`.
- **Phase 3 (done, dependency-light)** — `automation/topic-radar.mjs` + `.github/workflows/topic-radar.yml` (monthly cron): Claude + the `web_search`/`web_fetch` server tools discover recent news/keywords/questions, score candidates against the backlog rubric, dedupe vs the backlog + owned guide themes, validate every `supportingCaseStudy`/link against real published routes, and append survivors as `status:"parked"` via PR. Needs only `ANTHROPIC_API_KEY` (web search is billed). Tune volume with the optional `RADAR_MAX_TOPICS` repo variable (default 5).
- **Phase 3+ (later)** — richer signals when keys are provisioned: GSC striking-distance/gap queries + Serper SERP/PAA, plus biweekly GEO-citation measurement.

## Secrets (GitHub → Settings → Secrets and variables → Actions)
- `CLOUDFLARE_API_TOKEN` — scoped **Account › Cloudflare Pages › Edit** (never the Global key).
- `CLOUDFLARE_ACCOUNT_ID` — `7accb3afddfafa68d9fcaad27a128222`.
- `ANTHROPIC_API_KEY` — for Phase 2 (`author.mjs`) only.

## Guardrails (non-negotiable)
- Human flips `draft:false`; nothing publishes unreviewed in MVP. In Phase 2, "auto-publish" = publish only if ALL five quality gates pass, else hold for a human.
- Cadence ceiling 1–2 posts/week, topics only from the gap list — avoids Google "scaled content abuse".
- Every number traceable to the site. Never link/cite `oggi-lavoro` or `aegis` (draft, pending client approval).
