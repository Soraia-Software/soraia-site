# Soraia Site — Style Guide

Canonical rules for soraia.io. Source of truth for tokens is
[src/styles/globals.css](src/styles/globals.css); this file explains **how to use them
consistently** so every page reads as one site. When in doubt, match an existing
section rather than inventing a new treatment.

---

## 1. Voice & copy

- **Register: "tu"** everywhere, Italian and English. Never "voi"/"Lei". A new page or
  edit that slips into "voi" is a regression.
- **No em-dash (`—`) in any text.** Rewrite with a comma, a colon, or two sentences.
  En-dash (`–`) is allowed only inside numeric ranges (`43–200 ore`).
- **Never the "Non è X. È Y." pattern** (and its variants: "Il problema non è X, è Y",
  "Non serve X. Serve Y"). It is the most recognizable LLM tell. Write it as plain prose.
- **Primary CTA label: "20 min con Daniel"** (IT) for the main booking action. Secondary
  CTAs point into the page (`#come-iniziare`, `#prezzi`) or to a form.
- Guarantee wording: "soddisfatti o rimborsati" / "il primo mese, anche solo per un mese".
  The "anche solo per un mese" line is deliberate: "al mese" alone scares.

### 1b. Facts the copy must not contradict (as of 2026-10-18)

- **Two services, and only two in the Servizi menu**: *Analisi dei processi* (the on-site
  audit: desk-side interviews, process map in the field, priorities, action plan; the
  `/analisi-processi` deck is noindex, the service is requested from `/parliamone`) and
  *AI Engineering* (sprint-based development, first release in production in 4 weeks).
  "Da dove partire dipende da te."
- **Pricing lives on `/prezzi` only**: **three fixed-price services plus optional one-off
  add-ons**, and **hour packages** for small jobs. Services: **Analisi 3.000 €** one-off
  (**optional**: say so; deducted from the first Sprint if the client starts within 30 days),
  **Sprint from 8.000 €/month** (always "da"/"from"; framed as a continuous team, "mese dopo
  mese", **but still bookable for a single month with no lock-in**) and **Hypercare from
  500 €/month** (optional, annual contract from go-live; it maintains rather than builds, so
  new features, modules and integrations go into a Sprint). Hypercare **absorbed AI Quality**
  on 2026-10-31: monthly test of the agents' answers on real cases, instruction tuning, API
  cost control. Add-ons are **one-off** and attach to **one** service only. With the Sprint:
  **Compliance & Audit 4.000 €**, **Pentest 4.000 €**, **Formazione e adozione 3.000 €**. With
  the Analisi: **Supporto bandi 2.000 €, paid only if the grant is won**. **Hour packages**:
  **50 ore 4.000 €** and **100 ore 7.500 €**, for small self-contained jobs with no continuous
  team. All prices VAT excluded.
  **The Sprint itself includes** encryption of sensitive fields, audit logs, retention and
  deletion policy, load testing, monitoring and availability SLA, historical data import and
  migration, and three months of change requests after release. **Compliance & Audit does not
  add security, it adds the proof**: documents for whoever asks (auditors, certification bodies,
  DPO, clients). It is **both GDPR and AI Act**: art. 32 measures, DPIA support and data-flow
  map on one side, risk classification, technical documentation, user-facing transparency and
  human oversight on the other, citing Regolamento (UE) 2024/1689, plus a compliance dossier.
  The legal judgement always stays with the client's lawyer, never claimed as ours.
  **Three dedicated people, one per role: Account Manager, Project Manager, AI Engineer**,
  one release in production every Sprint. The pages say "Anche un solo mese, senza vincolo" /
  "Even a single month, no lock-in" in a hero chip and under the Sprint price. Guarantee:
  **primo mese soddisfatti o rimborsati**.
- **Team**: "più di 10 persone" (never a fixed 10 or 11), **distributed in Italy**, 100%
  remote, registered office in Biella. The response-time line is always "Daniel, Veronica e Paolo ti rispondono entro 24 ore." (EN "Daniel, Veronica and Paolo reply within 24 hours."), never a Daniel-only version.
- **Stats**: "40+ progetti consegnati". Never "in 11 paesi".
- **Retired old-site concepts** (do not reintroduce): AI Readiness Assessment, "assessment
  iniziale 1-2 settimane", AI Adoption workshop as a pillar, Co-Building Sprint, the week-by-week
  sprint timeline, "Stack agnostic", the Xano/WeWeb featured row, "se non funziona non paghi",
  "rimborsiamo lo sprint", "due figure dedicate", "Nessun vincolo di durata", 43 ore, and the
  **old hour-package model** retired on 2026-10-29: "45 ore", "195 ore", "67 €/ora",
  "scaglioni da 1.000 €", "monte ore combinato", the "a corpo" fixed-price alternative and the
  hours slider. Hour packages came back on 2026-10-31 in a different form (50 ore 4.000 €,
  100 ore 7.500 €, for small jobs only): use those numbers, never the old ones. Also retired:
  the tiers **"Sprint Pro"** and **"Partner"** (2026-10-30) and the add-on **"AI Quality"**
  (2026-10-31, folded into Hypercare). The portal shows Sprint progress, not hours per person.
  `/downloads/ai-assessment-sample` still exists but is noindex, out of the sitemap and unlinked.
- `public/llms.txt` and `public/llms-full.txt` restate all of the above for AI answer engines:
  update them whenever one of these facts changes.

## 2. Typography

One typeface: **Inter** (`--font-sans`), self-hosted. Mono is **JetBrains Mono**
(`--font-mono`) for tabular numbers / tags only. No Google Fonts CDN.

- **Headings: `font-medium` (weight 500) + `tracking-tight`.** Never `font-semibold` for
  headings. The pairing `font-semibold tracking-tight` is the old signature and must not
  come back; the whole site was swept to `font-medium tracking-tight`.
- Weights available: 400 / 500 / 600 / 700. Body is 400; emphasis in body is 600
  (`font-semibold`) on short spans, not on headings.
- Big stats / prices use `.bignum` (weight 500, `clamp(2.5rem, 5vw, 3.25rem)`,
  `letter-spacing: -0.03em`). Do not hand-roll large numbers.
- Eyebrows use the `.eyebrow` class: 11px / weight 500 / `0.15em` / uppercase /
  `--color-ink-soft`. On dark heroes add `.eyebrow-light` (renders `--color-violet-200`
  lilac). Do **not** inline `rgba(216,180,232,…)` for the lilac — that was unified to the
  `--color-violet-200` token.

## 3. Color

Brand primary is **`--color-brand` = `#4A1E5C`** (deep aubergine). Accent is
**`--color-brand-accent` = `#892D9C`**, used sparingly for pops only.

- Reference colors through tokens (`var(--color-brand)`, `text-brand`,
  `bg-[var(--color-violet-700)]`), not raw hex, in new code.
- Surfaces: `--color-bg` `#FAFAF8` (default), `--color-surface` `#F2F1ED` (alternate
  sections). Ink: `--color-ink` `#1A1A1A`, `--color-ink-muted`, `--color-ink-soft`.
- Hairlines: `--color-line` (default), `--color-line-strong` (hover/emphasis),
  `--color-line-dark` (on dark).
- Dark hero background: `.bg-hero-dark`. Light hero: `.bg-violet-mesh`. **Both carry the
  site's signature contour lines** (faint large arcs, inline SVG in the background), so every
  hero gets them with no markup. Add the lines to other sections with `.bg-lines-light` /
  `.bg-lines-dark` (image-only, layer on your own colour).
- "Più colorato ogni tanto": `.bg-tech-grid` (lilac base + thin line grid + glows + arcs) for
  one standout band per page, and `.glow-tr` / `.glow-br` for a soft violet corner glow
  (container needs `relative overflow-hidden`). Use sparingly, as rhythm, not everywhere.
- Dark rhythm bands (home "Dopo il nostro intervento", chi-siamo "Cosa ci muove", careers
  hiring steps) reuse `.bg-hero-dark` with the global translucent cards `.dk-card` + icon
  chip `.dk-chip` (white 5% fill, 12% white border, lilac icon). Pair with
  `SectionHeader variant="dark"`. The `/analisi-processi` cover uses the same class.
- **No pink/gradient backgrounds behind team photos.** Photos sit on their natural
  background. (The pink team gradient was removed.)
- `/analisi-processi` has its own scoped palette in
  [src/components/analisi/data.ts](src/components/analisi/data.ts) (`SEM` semantic
  colors) layered on the global tokens; keep it there, don't leak it into global CSS.

## 4. Buttons & CTAs

Use the `.btn` classes, never ad-hoc button styling:

- `.btn .btn-primary` — filled aubergine, white text. The main action.
- `.btn .btn-secondary` — outline, ink text. Alternative action.
- `.btn .btn-ghost` — text-only, for tertiary links.
- Add `.btn-arrow` + an inline arrow `svg` for the sliding-arrow hover.
- Buttons are **pills** (`border-radius: 999px`), with a soft lift on hover. The old 8px
  radius is gone; don't reintroduce square-ish buttons.

## 5. Layout & spacing

- Wrap vertical rhythm with `.section` (5rem mobile / 8rem ≥768px). Don't hand-set
  section padding.
- Section intros use the `SectionHeader` component (eyebrow + title + optional lead),
  so eyebrow/heading treatment stays uniform.
- Cards: `.card` (hairline, **22px radius**, 1.75rem padding) or `.card-editorial`
  (2rem padding). Interactive cards (`.card-hover`, `.card-editorial`) lift 3px with a
  shadow on hover. Equal-height card rows use `items-stretch`.
- Max content width and gutters follow the existing container; keep a 16px side gutter
  on mobile and no horizontal scroll.

## 6. Navigation (IA)

- **Nav order (both languages): Servizi · Casi studio · Chi siamo · Prezzi.** "Prodotti" is
  footer-only. Decided 2026-10-17; don't reshuffle.
- **Servizi dropdown = exactly two items: "Analisi dei processi" + "AI Engineering"**
  (IT) / "Process audit" + "AI Engineering" (EN). All other pages live in the footer only. EN
  pages mirror the IT ones one to one (home, about, case studies, pricing, contact,
  `/en/ai-engineering`, `/en/process-audit` = the deck, copy from `getDeckData("en")` in
  `src/components/analisi/data.ts`); IT-only pages (`/careers`, `/bando`, `/demo-portale`) pass
  `hideLangSwitch`.
- Chi-siamo: centered hero header with the events/retreat marquee right below it; the
  "Lavora con noi" dark band carries the bento **team mosaic** (6 rounded-square tiles that
  *slide* in loop, horizontal or vertical per tile, through the 10 people and five AI-agent
  tiles: Security, Sales, Accounting, Marketing, Development Agent). The agent tiles are the
  Soraia mark on the portrait background plus a domain badge, `public/team/agent-*.svg`
  (generated, professional, no faces). Founder photos are rounded squares (`rounded-2xl`).
- Primary nav CTA: "20 min con Daniel".
- `/case-studies` opens with the **video testimonials** (vertical 9:16 tiles, YouTube
  `oar2.jpg` thumbnail with photo fallback, name + role below, one click = inline autoplay).
  They come from the collection field `videoTestimonial` (`provider`, `id`, optional
  `poster`, `speaker`, `role`); order is the `videoOrder` list in the page.
- `/analisi-processi` and `/en/process-audit` are **noindex** (`noindex` prop on `Layout`,
  driven from `data.ts`). Keep them out of indexes and sitemaps: `astro.config.mjs` filters
  `/analisi-processi`, `/process-audit`, `/demo-portale`, `/downloads/*` and `/admin/*` out of
  the sitemap.
- Client logos: one source, `src/data/clientLogos.ts`; `ProofBar` with just a `label`.

## 7. Components to reuse (don't re-implement)

- `SectionHeader` — every section intro.
- `PathBuilder` — the "costruisci il tuo percorso" island on `/prezzi` and `/en/pricing`
  (it replaced `PricingCalculator`, deleted 2026-10-29; rewritten for the add-on model
  2026-10-30 and 2026-10-31). Three blocks: Analisi (a toggle, **on by default but switchable
  off**, since the Analisi is not compulsory, with Supporto bandi under it), Sprint (1 to 6
  months, 8.000€ each, with Compliance & Audit, Pentest and Formazione as one-off toggles) and
  Hypercare. **Totale progetto** sums the one-off items and the Sprint months; **Hypercare is
  recurring and never enters that total**. The 3.000€ credit line shows only when the Analisi
  is on. Default state is Analisi + 3 mesi + Compliance & Audit + Pentest = 35.000€. Hour
  packages are **not** in the builder: they are an alternative for small jobs, shown in their
  own section. Real `<button>`s with `aria-pressed`, and `aria-label` on +/−. Thousands are
  grouped manually, as everywhere else.
- `SprintRoadmap` — the mountain + sprint timeline + "aggiorna le priorità" reorder,
  shared by `/analisi-processi` and `/ai-engineering`.
- `PricingTwoSteps` — the "Da dove partire dipende da te" two-card block (01 Analisi dei
  processi / 02 AI Engineering, or Discovery & Scoping / Build Sprint with `variant="software"`),
  used on `/ai-agents` and `/software-development`. Pricing tail: three dedicated people, from
  8.000 €/month, even for a single month.
- Team row (homepage "Il tuo team") — one slow looping **row of cards** (photo 4:5, name and
  surname, role in accent) on a `.bg-tech-grid` band; pure CSS marquee (set duplicated,
  `translateX(-50%)`, pause on hover, respects reduced-motion). Roles are data in the page.
  Team photos are branded purple-background portraits in `public/team/` (webp+avif, source
  PNGs in `_team-image-sources/`, gitignored). Bump the `?v=N` query on the image URLs
  whenever a photo is replaced at the same filename (CDN caches by URL).
- `ProofBar` — client logos in **two rows scrolling in opposite directions** (row A is seen
  first and runs right→left, row B left→right). **Call it with just a `label`**: the rows come
  from `src/data/clientLogos.ts`, the single source for the whole site (home, contact, EN,
  resources). A page with its own selection passes `logos` (short lists stay on one row, no
  two-logo loops) or `rowA`/`rowB`.
- Faces belong in more than one place: hero (overlapping avatar row + "Ti rispondiamo entro
  24 ore"), the PMI band, the 3-person journey, the final CTA (3 faces) and the chi-siamo
  "Lavora con noi" band (all 10). Prefer this over a single founder photo.

## 8. i18n

- IT at `/`, EN under `/en/`. Keep both in sync when editing shared sections.
- `Layout` props: `noindex`, `hideLangSwitch` where relevant.
- Number formatting is deterministic (manual thousands grouping: `.` for IT, `,` for EN)
  so it doesn't depend on the build host's ICU locale.

## 9. Before you ship

1. `find .git \( -name "* 2" -o -name "* 3" \) -delete` (iCloud dupes corrupt `.git`).
2. `gh auth switch --user danlevsoraia94` (gh reverts to IltecSRL and the push is denied).
3. `npm run build` must pass.
4. `git push` to `main` → GitHub Actions `deploy.yml` deploys to Cloudflare Pages (~45s).
   HTML is edge-cached ~7 days, so hidden/renamed URLs linger unless purged.
