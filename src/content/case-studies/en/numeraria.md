---
title: "Numeraria, AI agents that automate end-to-end studio management"
client: "Numeraria"
clientLogo: "/logos/clients/numeraria.webp"
industry: "finance-vc"
sector: "Payroll & accounting firm"
service: "AI agent for quote and hours management"
pubDate: 2026-03-15
dimensioni: "11-50"
featured: true
lang: "en"
stakeholder:
  name: "Elisa Gnan"
  role: "Consultant"
  photo: "/testimonials/elisa-gnan-numeraria.webp"
heroQuote: "Half the month used to disappear into quotes, hours, and reconciliations. Today AI agents handle everything autonomously — the team uses the system without even noticing it's there."
shortQuote: "Quotes, hours, and reconciliations run by AI agents. The team uses the system effortlessly."
teaser:
  problem: "Granular tracking of quotes, assignments, and multi-division work hours managed manually — with specific line items (travel, remote, on-site) costing management hours every month."
  action: "AI agents embedded in the platform manage the full end-to-end flow: generating quotes from templates, tracking client assignments, reconciling team-entered hours, and producing billing-ready reports. Zero manual data entry."
  resultMetric: "Half a month handed back to management · end-to-end automation"
  resultBody: "Time recovered by management goes toward new clients and strategic consulting — not reconciling spreadsheets."
stats:
  - value: "Half a month"
    label: "Time freed up"
    sub: "for management"
  - value: "Multi-division"
    label: "Line items tracked"
    sub: "travel · remote · on-site"
  - value: "End-to-end"
    label: "Quotes → hours → billing"
    sub: "automated by AI agents"
timeline: "Initial dev sprint, now live in production + maintenance"
stack:
  - "Xano (backend)"
  - "WeWeb (management frontend)"
  - "OpenAI (quote generation)"
  - "Accounting export to existing systems"
related:
  - "cxl"
  - "liftt"
  - "stars-be-original"
---

## Context

Numeraria is an Italian multi-division payroll and accounting firm. Their business model is typical of the sector: a lean internal team managing a portfolio of corporate clients, billing granularly for time spent on each engagement (payslips, filings, tax consulting, audits, travel).

Numeraria's value depends on **precisely tracking time spent per client** and on turning around accurate quotes quickly for new requests.

## The real problem

The operational workflow lived on a patchwork of spreadsheets and legacy tools:

- **Quotes** prepared manually for every client request, with different line items across divisions (payroll processing, full accounting, simplified accounting, tax consulting, etc.).
- **Assignments** tracked by hand in shared sheets: who was assigned to which client, for how many projected hours, at which billing rate.
- **Team hours** logged across multiple places with fragmented categories (travel to client vs. remote vs. in-office, work on a specific file vs. general overhead).
- **Monthly reconciliation** between logged hours, projected assignments, and client billing: hours of senior management time consumed at the start of every month.

The result: firm management — senior, expensive people — was spending a **significant share of their time** on data wrangling instead of client consulting.

## What we built

Soraia built a custom platform with **multiple AI agents embedded in the operational flow**, covering the full quote → assignment → hours → billing cycle:

1. **Quote agent** reads the client request, proposes the correct line items from the Numeraria catalogue, and calculates a structured quote at the right billing rate for each division. Management approves or adjusts — they never write from scratch.
2. **Assignment agent** tracks in real time who is assigned to which client, against which part of the quote, giving management full visibility into team capacity.
3. **Hours agent** validates team-logged hours with precise categories (travel to client site, remote work, in-office, special items) and reconciles them automatically.
4. **Billing agent** produces an end-of-month client-by-client report, line-item detail included, ready for invoicing.

The design prioritises **maximum usability**: consultants log hours in a few taps, agents do the heavy lifting in the background. Management steps in only where judgment is needed — approving non-standard quotes, handling urgent reassignments, signing off the monthly report.

## The results

**Half a month handed back to management**: time that used to go into data management is now invested in client acquisition, strategic consulting, and quality oversight.

**A system the team actually uses**: consultants don't experience the platform as a burden. Agent automation makes data entry nearly invisible — logging hours becomes a habit that takes seconds.

**Multi-division managed in a single unified system**: payroll, full accounting, simplified accounting, consulting — all in one place, with the correct billing rates for each division.

**Granular hour tracking** that previously required parallel spreadsheets: now a single source of truth, in real time.

## Where we're headed

System is live in production. Ongoing maintenance plus focused sprints as new needs emerge (new service line items, specific accounting integrations, custom dashboards). We keep iterating to bring in additional AI agents that absorb more of the operations — and free up even more of the team's time.
