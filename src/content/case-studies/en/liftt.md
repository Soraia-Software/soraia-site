---
title: "LIFTT, an AI Agent that manages deal flow autonomously"
client: "LIFTT"
clientLogo: "/logos/clients/liftt.webp"
industry: "finance-vc"
sector: "Venture Capital · Tech transfer"
service: "AI deal flow agent"
lang: "en"
pubDate: 2026-03-10
dimensioni: "11-50"
featured: false
stakeholder:
  name: "Alberto Burzio"
  role: "IT Manager"
  photo: "/testimonials/alberto-burzio-liftt.webp"
heroQuote: "The AI agent autonomously handles archiving, deduplication, and deal flow reporting. We're back to doing deals."
shortQuote: "Archiving, deduplication, and reports handled by AI. We're back to doing deals."
teaser:
  problem: "Deal pipeline fragmented across CRM, email, and local files. Manual deduplication, hand-built monthly reports, non-compliant email archiving."
  action: "An AI agent that monitors emails, archives eml files and attachments with metadata on OneDrive, merges duplicate deals in the CRM, and auto-generates monthly reports with charts."
  resultMetric: "From weekly to monthly cadence: the agent runs the deal flow"
  resultBody: "The LIFTT team focused on deal making, not data management."
stats:
  - value: "Weekly → Monthly"
    label: "Sync cadence reduced"
    sub: "agent runs autonomously"
  - value: "100%"
    label: "Emails archived"
    sub: "with attachments + metadata"
  - value: "0 hours"
    label: "Manual deduplication"
    sub: "agent detects and merges"
timeline: "Initial sprint 2x €5k, now maintenance + targeted sprints"
stack:
  - "CRM (deal flow)"
  - "Make (orchestration)"
  - "GPT-4o (deduplication + classification agent)"
  - "OneDrive (compliant email archive)"
  - "Outlook integration"
related:
  - "stars-be-original"
  - "cxl"
---

## The context

LIFTT is a **Venture Capital holding company focused on deep tech**, with an operational, multi-vertical approach geared toward creating impact.

LIFTT's edge lies in the **quality of its deal pipeline**: seeing the right deals first, deciding fast, and maintaining consistent relationships with founders.

## The real problem

Deal flow had outgrown the processes managing it. The team was living across:

- **CRM** as the central system, riddled with duplicate records from multiple ingestion sources
- **Outlook email** as the primary channel with founders and deal teams, but with no structured archiving
- **OneDrive files** for pitch decks, attachments, and term sheets, with no automatic link to CRM records
- **A monthly report compiled by hand** at the start of each month (hours of human work)

The fallout: time-consuming manual deduplication (has this person been contacted? Have they not?), emails that couldn't be found when due diligence required them (compliance issue), and a monthly report that everyone dreaded.

## What the AI agent did

Soraia built an AI agent that **autonomously runs the backbone of the deal flow**:

1. **Monitors incoming emails** across deal team mailboxes
2. **Identifies deal-related contexts** (vs. spam, newsletters, internal communications)
3. **Automatically archives** eml files and attachments to OneDrive with structured metadata (deal name, founder, date, attachment type)
4. **Merges duplicate deals** in the CRM: recognises that "Mario Rossi - Startup A" and "M. Rossi (CEO StartupA)" are the same record, and proposes the merge to the team
5. **Generates the monthly report** with auto-updated charts: deal pipeline, conversion rate by stage, activity by deal team, alerts on stagnant deals
6. **Sends alerts** on deals that need attention (no contact in X days, term sheet pending, etc.)

The human team only steps in for decisions that require judgment: approving a merge, deciding whether to advance a deal to the next stage, writing a personal message to a founder.

## The results

**100% of emails archived** with attachments and metadata on OneDrive, ready for any due diligence.

**Zero hours of manual deduplication**: the agent detects and merges duplicates; humans approve the merge in one click.

**Monthly report auto-generated** at the start of each month, complete with charts and operational recommendations.
