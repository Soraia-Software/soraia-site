---
title: "French Riviera Househunting, AI agents for lead enrichment and property sourcing"
client: "French Riviera Househunting"
clientLogo: "/logos/clients/frh.webp"
lang: "en"
industry: "real-estate"
sector: "Boutique real estate · French Riviera"
service: "AI agents for lead enrichment + property sourcing"
pubDate: 2026-02-15
dimensioni: "11-50"
featured: false
stakeholder:
  name: "Fabricio Carminati"
  role: "Founder"
  photo: "/testimonials/fabricio-carminati-frh.webp"
heroQuote: "Two AI agents: one enriches and qualifies every lead, the other lets me capture target properties with a single click and assign them to the right client, who sees them instantly on the portal."
shortQuote: "Two AI agents: qualified leads + properties captured in 1 click and assigned to the client on the portal."
teaser:
  problem: "Leads from eBook downloads and contact forms arriving with minimal data. Property research scattered across multiple sites, manual saves, and shared spreadsheets with clients, hours of profiling and curation before the first conversation."
  action: "Two connected AI agents. The first enriches and qualifies incoming leads, building a structured dossier in the CRM. The second, via a Chrome extension, captures target properties in 1 click during browsing, classifies them, and assigns them directly to the client, who views them in their own client portal."
  resultMetric: "Leads qualified autonomously · properties captured in 1 click and assigned to the client"
  resultBody: "Fabricio receives ready-made dossiers and focuses only on selection and relationship. The client sees assigned properties on their portal in real time."
stats:
  - value: "End-to-end"
    label: "Lead → qualified dossier"
    sub: "autonomously"
  - value: "1 click"
    label: "Target property → DB"
    sub: "via Chrome extension"
  - value: "Client portal"
    label: "Personalised view"
    sub: "properties assigned per client"
timeline: "System in maintenance, targeted sprints for new integrations"
stack:
  - "Airtable (lead + property CRM)"
  - "Make (orchestration)"
  - "OpenAI (enrichment + qualification)"
  - "Custom Chrome extension (property sourcing)"
  - "Custom client portal"
  - "MailerLite + Brevo (transactional)"
screenshots:
  - src: "/case-studies/frh/01.webp"
    caption: "Automated real estate lead pipeline"
related:
  - "navily"
  - "stars-be-original"
---

## The context

French Riviera Househunting is a **boutique real estate agency** specialising in high-end international clients searching for property on the French Riviera (Nice, Cannes, Monaco, Saint-Tropez). The business model is that of a niche agency: a handful of clients per year, each with a significant budget and high expectations for personalised service.

FRH's value rests on **the quality of the individual client relationship**, not volume. Fabricio Carminati, the founder, has no intention of hiring an operations team to handle every incoming lead, he wants to focus on high-value work: property selection, viewings, negotiation.

## The real problem

The boutique workflow was straining on **two separate fronts**.

**On incoming leads**, data was thin across every source:

- **eBook downloads** from the site (a buyer's guide to the French Riviera), visitors left an email and a name, nothing more.
- **Contact forms** on the site, a few optional fields (budget, area of interest), usually left blank.
- **Inbound referrals** via WhatsApp or email, free-text messages with incomplete information.

For every new lead, Fabricio did **individual manual research** before the first contact: LinkedIn search, country of residence, liquidity signals, profile-to-price-point matching. Hours per lead, across 50–100 leads per month, the equivalent of a full-time person doing nothing but profiling.

**On property research**, curation for each client was equally manual:

- Browsing property websites, high-end portals, and local French Riviera agencies.
- Saving screenshots, links, and notes in per-client spreadsheets.
- Sharing shortlisted properties via email or WhatsApp.
- No unified view that the client could explore independently.

## What we built

Soraia built **two connected AI agents** covering both sides of the workflow:

### Agent 1: Lead enrichment and qualification

1. **Receives the lead** from the eBook download / form / WhatsApp trigger.
2. **Cross-source enrichment**, scans LinkedIn, public records, and publicly accessible social data to build the lead's profile (professional role, country, seniority signals).
3. **Intent + budget classification**, based on the downloaded eBook (each one carries an implicit price point), interaction patterns, and professional profile, the agent estimates the tier (browse / qualified / hot).
4. **Creates a structured dossier** in Airtable CRM with all fields pre-filled: profile, intent, score, suggested approach.
5. **Triggers an email sequence** via MailerLite/Brevo, personalised to the lead's tier.

Fabricio receives pre-qualified dossiers for "hot" leads and handles only the final step: opening the conversation and proposing a viewing.

### Agent 2: Property sourcing via Chrome extension

1. **Custom Chrome extension**, while Fabricio (or his team) browses property portals, local agencies, and high-end listings, every potentially relevant property gets an "Add" button.
2. **1 click** captures everything: photos, price, floor area, address, details, source link, automatically classified in the Airtable database.
3. **Client assignment**, at the moment of capture, Fabricio selects which client (or clients) in the pipeline to assign the property to. The agent enriches the record with a match score against the client's profile.
4. **Client portal**, each high-end client logs into their own personalised portal and sees assigned properties in real time, complete with full details and source links. They can comment, save favourites, and request a viewing.

The result: **from property discovery to the client seeing it on the portal takes seconds, not hours**.

## The results

**Leads ready for first contact, autonomously**: Fabricio no longer does individual manual research. The agent delivers a structured dossier directly.

**Properties captured in 1 click**: the Chrome extension eliminates screenshot/copy-paste/email. The property pipeline is always up to date, always in the CRM, always assigned.

**A client portal that's always live**: the high-end client sees newly assigned properties as they're added, no waiting for next-day emails. A premium experience, zero lag.

**Boutique pipeline scaled without hiring**: lead and property management capacity has grown without dedicated headcount. Qualified time reinvested in final selection, viewings, and negotiation.
