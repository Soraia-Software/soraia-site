---
title: "Navily, AI Agent for Review Moderation + Nautical Data Enrichment"
client: "Navily"
clientLogo: "/logos/clients/navily.webp"
industry: "customer-support"
lang: "en"
sector: "Consumer mobile · Travel & nautical"
service: "AI moderation + enrichment agent"
pubDate: 2026-03-08
dimensioni: "11-50"
featured: true
stakeholder:
  name: "Edouard Fiess"
  role: "CEO & Co-Founder"
  photo: "/testimonials/edouard-fiess-navily.webp"
heroQuote: "The AI moderates reviews, images, and enriches data: -70% operational time, high precision. The team is back building product, not doing manual triage."
shortQuote: "-70% operational time on moderation and enrichment. The team is back building product."
teaser:
  problem: "Thousands of user reviews and images to moderate before publication, incomplete data on marinas and anchorages, and hours of operations burned on repetitive tasks."
  action: "An AI agent that moderates reviews and images against Navily's editorial criteria, automatically enriches nautical data (marinas, anchorages, services) from public sources, and escalates only edge cases to the human team."
  resultMetric: "70%+ reduction in operational time · high precision maintained"
  resultBody: "The product team can scale the community without scaling moderation hours."
stats:
  - value: "70%+"
    label: "Operational time reduced"
    sub: "on moderation + enrichment"
  - value: "High precision"
    label: "Validated in production"
    sub: "with human escalation"
  - value: "Multi-domain"
    label: "Reviews · images · data"
    sub: "same agent"
timeline: "Agent in production, continuous scaling"
stack:
  - "OpenAI / Anthropic (moderation + extraction)"
  - "Vision API (image moderation)"
  - "Custom enrichment pipeline"
  - "Navily backend integration"
screenshots:
  - src: "/case-studies/navily/01.webp"
    caption: "Navily app: Mediterranean tourist marinas"
    alt: "Navily app: Mediterranean tourist marinas"
  - src: "/case-studies/navily/02.webp"
    caption: "User reviews and images moderated by the agent"
    alt: "User reviews and images moderated by the agent"
  - src: "/case-studies/navily/03.webp"
    caption: "Marina detail view with enriched data"
    alt: "Marina detail view with enriched data"
  - src: "/case-studies/navily/04.webp"
    caption: "Berth booking flow"
    alt: "Berth booking flow"
related:
  - "storywonder"
  - "stars-be-original"
  - "talent-match"
---

## Context

Navily is **Europe's leading app for booking tourist marinas and nautical anchorages**. Sailors, skippers, and charter operators use it to find berths, read reviews, browse marina photos, and book moorings along Mediterranean and Atlantic coastlines.

Navily's value depends entirely on **community quality**: trustworthy reviews, real and up-to-date images, accurate nautical data (depth, services, pricing, marina contacts). Every piece of user-generated content must be validated before going live.

## The Real Problem

The app scaled fast. As the community grew, manual triage became unsustainable:

- **User reviews** arriving every day: some genuine and useful, others fake or spam, others containing inappropriate content (offensive language, personal attacks, off-topic posts). Every one had to be read, assessed, and approved or rejected.
- **Images uploaded** by sailors: most showed the marina or anchorage, but mixed in were inappropriate selfies, blurry shots, and irrelevant photos. All requiring moderation.
- **Incomplete nautical data**: every new marina or anchorage added to the database required manual enrichment (depth, seabed type, available services, contacts, average pricing) by cross-referencing multiple sources — marina websites, nautical charts, public databases.

The operational result: hours of the product team's time burned daily on low-value, repetitive tasks instead of product development, marina partnerships, and geographic expansion.

## What the AI Agent Did

Soraia built a **multi-task AI agent** that handles three workflows in parallel:

1. **Review moderation** — the agent reads each new review, evaluates it against Navily's editorial criteria (authenticity signals, language quality, community guidelines compliance, prohibited content), and proposes approve/reject with a confidence score. The team only reviews borderline cases.
2. **Image moderation** — the agent analyzes each uploaded image: it detects inappropriate content (NSFW, identifiable faces without consent, irrelevant photos like selfies), assesses quality (blur, framing, lighting), and classifies by type (marina, mooring, service, panoramic view).
3. **Nautical data enrichment** — when a new marina or anchorage is added, the agent automatically cross-references public sources (nautical charts, official marina websites, public databases) to fill in missing fields: depth, seabed type, available services, contacts, price ranges.

Across all three workflows, the agent **never autonomously approves borderline content**: cases with intermediate confidence are passed to the human team. Above a clear threshold (obvious authenticity), it approves directly; below a clear threshold (obvious inappropriate content), it rejects directly; anything in between triggers an escalation.

## The Results

**70%+ reduction in operational time** on review and image triage and data enrichment. A figure publicly stated by CEO Edouard Fiess.

**High precision maintained**: Navily's community quality has not degraded with the introduction of the agent — in fact it has improved, thanks to the consistency of applied criteria (the agent doesn't get tired, doesn't have off days, and applies the same standards to the first piece of content of the day as to the thousandth).

**Scalability unlocked**: Navily can grow its community and marina inventory without growing its moderation team. The hours freed up go toward high-value work — product, partnerships, market expansion.
