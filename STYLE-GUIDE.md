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
  (IT). All other pages live in the footer only. The EN nav keeps its fuller list.
- Primary nav CTA: "20 min con Daniel".
- `/case-studies` opens with the **video testimonials** (vertical 9:16 tiles, YouTube
  `oar2.jpg` thumbnail with photo fallback, name + role below, one click = inline autoplay).
  They come from the collection field `videoTestimonial` (`provider`, `id`, optional
  `poster`, `speaker`, `role`); order is the `videoOrder` list in the page.
- `/analisi-processi` is **noindex** (`noindex` prop on `Layout`, driven from
  `data.ts`). Keep it out of indexes and sitemaps.

## 7. Components to reuse (don't re-implement)

- `SectionHeader` — every section intro.
- `PricingCalculator` — the two-model pricing. **Ore**: base 45h = 3.000€, then steps of
  1.000€ = 15h (slider `step=15`), up to 195h = 13.000€. Real rate is `200/3` =
  66,6667 €/h but **displayed as 67€/ora** so every €1.000 tier lands on a round
  thousand; price is `Math.round(...)`. **A corpo**: from 5.000€/primo rilascio, and the
  client does **not** see the hours worked, keep that invariant.
- `SprintRoadmap` — the mountain + sprint timeline + "aggiorna le priorità" reorder,
  shared by `/analisi-processi` and `/ai-engineering`.
- Team row (homepage "Il tuo team") — one slow looping **row of cards** (photo 4:5, name and
  surname, role in accent) on a `.bg-tech-grid` band; pure CSS marquee (set duplicated,
  `translateX(-50%)`, pause on hover, respects reduced-motion). Roles are data in the page.
  Team photos are branded purple-background portraits in `public/team/` (webp+avif, source
  PNGs in `_team-image-sources/`, gitignored). Bump the `?v=N` query on the image URLs
  whenever a photo is replaced at the same filename (CDN caches by URL).
- `ProofBar` — client logos in **two rows scrolling in opposite directions** (`rowA` is seen
  first and runs right→left, `rowB` left→right). Pass `rowA`/`rowB` explicitly to control the
  order; a single `logos` array is split in half for backwards compatibility.
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
