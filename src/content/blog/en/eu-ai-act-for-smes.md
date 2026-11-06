---
title: "EU AI Act 2026 for SMEs: What Actually Changes in Practice"
description: "The EU AI Regulation is in force. For most European SMEs the direct obligations are limited, but there are 4 things you need to do. A practical guide."
pubDate: 2026-04-22
updatedDate: 2026-11-06
author: "Daniel Levis"
lang: "en"
tags: ["ai act", "compliance", "gdpr", "guides"]
readMinutes: 7
featured: false
---

The EU [AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) has been in force since 1 August 2024. European SMEs are being flooded with AI consultancy emails waving the spectre of fines up to 7% of turnover.

The operational reality is far calmer. For **most SMEs**, the direct obligations are few and manageable.

Here is the honest map.

## The 4 Categories of the Regulation

The AI Act classifies AI systems into [4 risk levels](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai):

1. **Unacceptable risk**: prohibited (China-style social scoring, exploiting the vulnerabilities of minors or vulnerable people, emotion recognition at work, etc.). It usually doesn't apply to you, but watch out for HR tools that infer employees' emotions.
2. **High risk**: credit scoring, automated recruitment, healthcare systems, etc. Heavy obligations, which apply from 2 December 2027 after the postponement agreed in the [Digital Omnibus](https://eur-lex.europa.eu/eli/reg/2026/1744/oj).
3. **Limited risk**: client-facing chatbots. Main obligation: transparency.
4. **Minimal risk**: everything else. No specific obligations, except training the people who use AI (Article 4), which applies to everyone.

**The key question** for your SME: do your AI agents fall under level 2 (high) or levels 3-4 (limited/minimal)?

## Recruitment & HR: Pay Attention

If you use AI to **select, filter or evaluate** candidates, or to decide on promotions and performance reviews, the AI Act classifies you under **high risk**. From 2 December 2027, whoever uses these systems must:

- Follow the provider's instructions
- Assign human oversight to competent people
- Keep the system's logs for at least six months
- Inform workers and their representatives before use, and candidates that they are subject to the system

These are the Article 26 obligations; the DPIA required by the GDPR comes on top.

In practice, in Soraia's recruitment sprints:
- The agent **filters and ranks** candidates, but a human recruiter always signs off on the final decision
- We maintain an immutable audit log for every decision
- DPIA documents generated as a deliverable
- The agent does not produce legally binding output

Even with the recruiter signing off, filtering and ranking candidates stays **high risk**: it is profiling, which the AI Act always treats as high risk (Article 6). That's why we treat all recruitment projects as high risk.

## Finance & Accounting: Minimal Risk When Done Right

Agents that read invoices, run OCR, validate VAT, generate reports, **minimal risk**. No autonomous decisions impacting people; purely internal automation.

Main obligation: internal transparency (the team must know the agent is AI-driven).

## Sales & Marketing: Minimal or Limited

Agents handling personalised outreach, lead scoring, email drafting are usually **minimal risk**. They become **limited risk** if the agent converses with customers on its own (e.g. automated follow-ups that carry the conversation forward). In that case:

- You must make clear, at the first interaction, that there's an AI on the other side (Article 50)
- It's worth letting the recipient ask for a person

If AI writes the email but a person reviews and sends it, there is no labelling obligation.

## Customer Support: It Depends

Frontline chatbot → **limited risk**; you must inform the user they are talking to an AI, clearly and at the first interaction.

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

If you use an external provider (Soraia, OpenAI, Anthropic, any other), you need a **Data Processing Agreement** ([GDPR Article 28](https://eur-lex.europa.eu/eli/reg/2016/679/oj)). We include this in every sprint as standard.

## The Soraia Compliance Advantage

Our sprints include by default:
- **Immutable audit log** of every decision
- **DPIA template** pre-filled for recruitment / finance use cases
- **AI safe use policy one-pager** customised for your team
- **EU hosting** (no unauthorised data transfers outside the EU)
- **Art. 28 DPA** pre-included in the contract

Not because we are heroic, but because without these we cannot operate in regulated sectors at all.

---

**Want an assessment of your specific situation?** We cover it in the [process audit](/en/contact). We tell you honestly which risk level you fall under and what needs to be done. Or start with the [3-minute check-up](/en/check-up).
