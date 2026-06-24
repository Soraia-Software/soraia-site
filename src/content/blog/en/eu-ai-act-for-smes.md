---
title: "EU AI Act 2026 for SMEs: What Actually Changes in Practice"
description: "The EU AI Regulation is in force. For most European SMEs the direct obligations are limited, but there are 4 things you need to do. A practical guide."
pubDate: 2026-04-22
author: "Daniel Levis"
lang: "en"
tags: ["ai act", "compliance", "gdpr", "guides"]
readMinutes: 7
featured: false
---

The EU AI Act is now in force. European SMEs are being flooded with AI consultancy emails waving the spectre of fines up to 7% of turnover.

The operational reality is far calmer. For **90% of SMEs**, the direct obligations are few and manageable.

Here is the honest map.

## The 4 Categories of the Regulation

The AI Act classifies AI systems into 4 risk levels:

1. **Unacceptable risk**: prohibited (China-style social scoring, child exploitation, etc.). This does not apply to you.
2. **High risk**: credit scoring, automated recruitment, healthcare systems, etc. Heavy obligations.
3. **Limited risk**: client-facing chatbots. Main obligation: transparency.
4. **Minimal risk**: everything else. Residual obligations.

**The key question** for your SME: do your AI agents fall under level 2 (high) or levels 3–4 (limited/minimal)?

## Recruitment & HR: Pay Attention

If you use AI to **decide or significantly influence** hiring, promotions, or performance evaluations, the AI Act classifies you under **high risk**. Obligations:

- Documented risk assessment
- Full logging of decisions
- Human oversight on borderline cases
- Communication to candidates that AI is involved in the process
- Record retention for 6 years

In practice, in Soraia's recruitment sprints:
- The agent **filters and ranks** candidates, but a human recruiter always signs off on the final decision
- We maintain an immutable audit log for every decision
- DPIA documents generated as a deliverable
- The agent does not produce legally binding output

This keeps us **between high risk (AI-assisted) and limited risk (human always in the loop)**. To stay safe, we treat all recruitment projects as high risk.

## Finance & Accounting: Minimal Risk When Done Right

Agents that read invoices, run OCR, validate VAT, generate reports, **minimal risk**. No autonomous decisions impacting people; purely internal automation.

Main obligation: internal transparency (the team must know the agent is AI-driven).

## Sales & Marketing: Limited

Agents handling personalised outreach, lead scoring, email drafting, **limited risk**. If the output goes to an external contact (e.g. an automated follow-up email), you need:

- An indication that it was generated with AI assistance (where appropriate)
- The ability for the recipient to request human intervention

## Customer Support: It Depends

Frontline chatbot → **limited risk**; you must inform the user they are talking to an AI.

Internal routing + response drafting (with a human approving and sending) → **minimal risk**.

## The 4 Concrete Steps for SMEs

Regardless of risk level, here are the 4 practical things to do:

### 1. Internal AI Policy One-Pager

A one-page document stating: what is permitted, what is prohibited, how to flag issues. It supports governance and is an implicit best-practice requirement.

### 2. Agent Decision Log

Every agent in production must log every decision, with a timestamp, input, output, and escalation flag. For high-risk use cases it is mandatory. For others it is still smart practice (debugging, accountability).

### 3. Human Oversight on Critical Cases

Define upfront: when the agent decides autonomously, and when it escalates to a human. For recruitment: always a human on the final offer. For accounting: human review on anomalies above €10k. For support: human on negative escalations.

### 4. DPA with Your Vendor

If you use an external provider (Soraia, OpenAI, Anthropic, any other), you need a **Data Processing Agreement under GDPR Art. 28**. We include this in every sprint as standard.

## The Soraia Compliance Advantage

Our sprints include by default:
- **Immutable audit log** of every decision
- **DPIA template** pre-filled for recruitment / finance use cases
- **AI safe use policy one-pager** customised for your team
- **EU hosting** (no unauthorised data transfers outside the EU)
- **Art. 28 DPA** pre-included in the contract

Not because we are heroic, but because without these we cannot operate in regulated sectors at all.

---

**Want an assessment of your specific situation?** We cover it in the [AI Readiness Assessment €2,000](/en/ai-agents) ([download an anonymised sample report](/en/downloads/ai-assessment-sample)). We tell you honestly which risk level you fall under and what needs to be done. Or start with the [3-minute check-up](/en/check-up).
