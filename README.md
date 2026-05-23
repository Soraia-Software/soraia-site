# Soraia Site — v2

Sito Soraia v2, Astro 5 + Tailwind v4 + React islands, deploy target Cloudflare Pages.

**Scope blocco 1 (current)**: landing high-converting `/recruitment` per la campagna outbound (1000 prospect agenzie recruitment IT). Home `/` placeholder, EN stub e Cloudflare Worker `/api/lead` arrivano nel blocco 2.

---

## Quickstart

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # dist/ static output
npm run preview   # serve dist/ locally
```

---

## Stack

- **Astro 5** — SSG, zero JS by default
- **Tailwind v4** — design tokens in `src/styles/globals.css` via `@theme`
- **React island** — solo `LeadForm.tsx`, caricato con `client:load` solo nella sezione contatto
- **@astrojs/sitemap** — `sitemap-index.xml` generato in build
- **i18n nativo** — IT default su `/`, EN su `/en/` (stub da popolare)

## Design tokens (palette Soraia)

Estratti da soraia.io. Definiti in `src/styles/globals.css`:

| Token | Hex | Uso |
|-------|-----|-----|
| `violet-700` | `#892D9C` | Primary deep |
| `violet-600` | `#9F1AB1` | Primary vivid |
| `violet-400` | `#CFA0D8` | Light accent |
| `violet-50` | `#FDF4FF` | Background tint |
| `amber` | `#FEC84B` | Highlight / garanzia badge |
| `ink-900` | `#0A0A0A` | Testo primary |
| `ink-600` | `#414651` | Testo secondary |

Font: **Inter** da Google Fonts come placeholder. Da sostituire con il font brand Soraia quando disponibile (cambia `--font-sans` in `globals.css`).

## Struttura

```
src/
├── layouts/Layout.astro          # Head, SEO meta, OG, JSON-LD slot
├── pages/
│   ├── index.astro               # Home placeholder
│   └── recruitment.astro         # Landing outbound (high converting)
├── components/
│   ├── Header.astro              # Sticky nav + lang switcher
│   ├── Footer.astro
│   ├── ProofBar.astro            # Logos clienti
│   ├── CaseStudyCard.astro       # Card case study con metric grande
│   ├── ProcessCard.astro         # Card per i 5 processi
│   ├── ComparisonTable.astro     # Tabella comparativa
│   ├── FAQ.astro                 # Accordion FAQ
│   ├── SectionHeader.astro       # Eyebrow + h2 + subtitle
│   ├── CheckIcon.astro
│   └── LeadForm.tsx              # React island, POST /api/lead
└── styles/globals.css            # @theme tokens + utilities
```

## Prossimi passi (blocco 2)

- [ ] Home generalist completa (`/` con 5 case study cross-industry)
- [ ] Versioni EN `/en/` + `/en/recruitment`
- [ ] Cloudflare Worker `workers/lead-api/` con KV storage + webhook
- [ ] GitHub Actions deploy → Cloudflare Pages
- [ ] DNS cutover soraia.io → CF Pages
- [ ] Loghi SVG clienti (sostituire placeholder testuali in `ProofBar`)
- [ ] Font brand Soraia (sostituire Inter)
- [ ] OG image generata per `/recruitment`
- [ ] Pagine legali `/privacy` e `/terms`

## Lead form (current state)

Il form in `LeadForm.tsx` invia `POST` a `/api/lead` con payload JSON. **L'endpoint non esiste ancora** — finché non deployamo il Worker, il submit dà errore visibile all'utente (gestito gracefully nel componente). Per testare il form in locale senza errore, mocka temporaneamente la risposta o stubba l'endpoint.

## Note

- Il sito è completamente statico (`output: "static"`). Nessun SSR runtime.
- Lighthouse target: ≥95 su Performance/SEO/Accessibility. Inter caricato da Google Fonts con `display=swap` per evitare CLS.
- L'animazione `fade-up` è puro CSS (no JS library), `IntersectionObserver` solo per trigger su scroll.
