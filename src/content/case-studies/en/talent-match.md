---
title: "Talent Match, AI Agent for Candidate Matching in Spanish Recruitment"
client: "Talent Match"
clientLogo: "/logos/clients/talentmatch.webp"
industry: "recruitment-hr"
sector: "Recruitment · Spain"
service: "AI candidate matching agent"
pubDate: 2026-04-02
dimensioni: "51-250"
lang: "en"
videoTestimonial:
  provider: youtube
  id: "9WQi2BS3eAA"
featured: true
stakeholder:
  name: "Guillem Llacuna"
  role: "Founder"
  photo: "/testimonials/guillem-llacuna-talent-match.webp"
heroQuote: "150,000+ candidates previously scattered across off-the-shelf ATS, CRM, and Excel. Today, a single platform with an AI agent that surfaces the top 5–10, not 200 to scroll through."
shortQuote: "150k+ candidates on one platform. The AI surfaces the top 5–10, not 200 to scroll through."
teaser:
  problem: "Fragmented stack (off-the-shelf ATS and CRM + sourcing tools + Excel), zero automated matching, recruiters manually reviewing 200+ candidates per role."
  action: "Custom ATS/CRM with an AI matching agent that ranks candidates against every job description, a Chrome Web Clipper for LinkedIn capture, and a Kanban CRM view."
  resultMetric: "6 months dev → production · Potential Match v2 algorithm shipped autonomously"
  resultBody: "The team now works from a shortlist of 5–10 top candidates per role instead of 200, with scored reasoning from the agent."
stats:
  - value: "200 → 10"
    label: "Candidates to review"
    sub: "per open position"
  - value: "6 months"
    label: "From kick-off"
    sub: "to full production"
  - value: "v2"
    label: "Matching algorithm"
    sub: "refined autonomously"
timeline: "6-month dev sprint (€30k), now ongoing maintenance + targeted sprints"
stack:
  - "Xano (backend)"
  - "WeWeb (recruiter frontend)"
  - "OpenAI / Anthropic (matching agent)"
  - "Custom Chrome Web Clipper"
related:
  - "stars-be-original"
  - "cxl"
---

## Context

Talent Match is a Catalan recruitment boutique founded by Jordi Valenzuela and Guillem Llacuna. The model is classic headhunting: a focused number of open roles, high quality, fixed fees per closed placement.

Talent Match's value depends on **how quickly it identifies the right candidates for each mandate**. The longer it takes, the more client confidence erodes, and the higher the risk of losing the role to a competitor.

## The Real Problem

The team was operating across three separate stacks:

- **Off-the-shelf ATS and CRM** as the primary system, but with limited JD↔candidate matching (manual Boolean filters, no AI scoring).
- **External sourcing tools** (LinkedIn Recruiter, job boards), with data living outside the CRM and copied in by hand.
- **Excel** for shortlists presented to clients.

In practice: for every new role, a recruiter spent **5–8 hours scanning 150–250 candidates** from the CRM and LinkedIn, copy-pasting information, and building the shortlist manually. The genuinely valuable part, the final 30 minutes spent on the top 10, was the only thing that moved the needle. The 7+ hours before it were glorified data entry.

On top of that, there were no metrics on which candidates actually worked out long-term (successful placements, 12-month retention), so the matching criteria never improved.

## What the AI Agent Did

Soraia built **Braint**, a custom ATS/CRM that replaces the entire previous stack and includes a dedicated AI matching agent:

1. **Automatic ingestion**, CVs arrive via application forms, email, and LinkedIn (through a custom Chrome Web Clipper that captures a full profile in one click). OCR and structured parsing run automatically.
2. **AI matching agent (Potential Match)**, for every open JD, the agent reads the requirements, scans the candidate database, and produces a **scored shortlist** (0–100) with the reasoning behind each match.
3. **Boolean filters + geographic proximity** for location-feasible matching.
4. **Kanban CRM view**, a visual pipeline per open role.
5. **Algorithm v2**, after the first 6 months in production, the Potential Match algorithm was refined with sharper criteria and cost optimization (a lighter model for the first pass, a more powerful model only for borderline cases).

The human recruiter steps in only for the **top 5–10 candidates** the agent ranks first. The 7 hours of data entry are gone.

## Results

**From 200 to 10 candidates to review per role**: the recruiter focuses on the agent's top-scored matches with clear reasoning, no more manual scrolling.

**6 months from kick-off to production go-live**: discovery, design, and development spread across monthly sprints, with the Talent Match team involved at every iteration.

**Potential Match v2 algorithm shipped autonomously**: after six months of team feedback, Soraia refined the algorithm for higher precision and lower compute cost per call. The agent now costs less per query and returns more relevant matches.

**System in maintenance** with monthly sprints for new features requested by the team (e.g. integration with additional sourcing tools, new placement success metrics).
