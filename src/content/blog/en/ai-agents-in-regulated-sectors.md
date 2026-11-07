---
title: "AI Agents in Regulated Sectors: What's Allowed"
description: "Banking, insurance, healthcare: what you can actually do with AI agents in a regulated sector. An operational AI Act and GDPR map, no scaremongering."
pubDate: 2026-06-22
updatedDate: 2026-11-06
author: "Daniel Levis"
tags:
  - "ai agents"
  - "compliance"
  - "ai act"
  - "finance"
  - "governance"
keywords:
  - "ai agents regulated sectors"
  - "ai act regulated sectors"
  - "ai agents compliance"
  - "ai banking insurance healthcare"
readMinutes: 8
featured: false
h1: "AI Agents in Regulated Sectors: What's Actually Allowed"
faq:
  - q: "Can an AI agent make autonomous decisions in banking or insurance?"
    a: "Not on decisions about people. Assessing creditworthiness and setting risk and price for life and health insurance are <strong>high-risk</strong> cases under the AI Act: from 2 December 2027 whoever uses them must assign oversight to competent people. Already today, Article 22 of the GDPR gives people the right not to be subject to decisions based solely on automated processing, with some exceptions. The agent can pre-process, score and prepare the file, but the sign-off stays human."
  - q: "When do the AI Act high-risk obligations apply?"
    a: "From 2 December 2027 for Annex III systems such as credit scoring, life and health insurance and emergency triage, after the postponement agreed in the Digital Omnibus; from 2 August 2028 for those built into regulated products, such as medical devices. For a bank or an insurer using them it means: using them according to the provider's instructions, assigning oversight to competent people, keeping logs for at least six months and, for credit and life and health insurance, carrying out a fundamental rights impact assessment before use. See our <a href=\"/en/guide/ai-act-for-business\">AI Act guide</a> for the full picture."
  - q: "Can I use an AI agent for document automation in a regulated sector?"
    a: "Yes, and it's usually the safest starting point. OCR on invoices, reconciliations, PDF data extraction, recurring reports are <strong>minimal risk</strong>: they don't decide on people. That's the Numeraria case, where automation gave back roughly half a month to management."
  - q: "Where do the data need to live to stay compliant?"
    a: "The GDPR doesn't require EU hosting. It requires a <strong>DPA under Article 28</strong> with every vendor processing data on your behalf and, if data leaves the EU, the safeguards set for transfers (Article 44). Health data is a special category (Article 9) and calls for extra care. To keep things simple we include the DPA and EU hosting by default, and the LLMs are never trained on client data."
  - q: "When does an AI agent NOT make sense in a regulated sector?"
    a: "When the process requires a legally binding decision with no room for human oversight, or when the data needed can't leave a closed perimeter without a proper DPIA. In those cases you fix governance first, then automate. Never the other way around."
lang: "en"
draft: false
---

Every month the same email lands from a CFO at a bank or an insurer: *"We want to use AI agents, but our compliance officer says no to everything."*

Honest answer: the compliance officer is right about some things and wrong about others. The problem is nobody drew them the operational map. Here it is.

**In short:**

- In a regulated sector what matters isn't *what the technology does*, it's *who the decision affects*: internal document automation is minimal risk, credit scoring or emergency patient triage is high risk.
- The AI Act obligations for high-risk systems (credit scoring, life and health insurance, emergency triage) apply from 2 December 2027, after the Digital Omnibus postponement. For whoever uses them: human oversight, logs kept for at least six months and, for credit and insurance, a fundamental rights impact assessment.
- The practical rule we use: the AI agent *prepares and instructs*, the human *signs off*. This keeps most processes out of decisions based solely on automated processing, which Article 22 of the GDPR restricts.
- The safest starting point is almost always document automation (minimal risk). At Numeraria, a payroll and accounting firm, it gave back roughly half a month to management.
- DPA under GDPR art. 28, EU hosting, immutable audit log, no LLM training on client data: without these foundations you don't even start.

## What "AI agent in a regulated sector" means

An AI agent in a regulated sector is a software system that runs tasks autonomously (reads, evaluates, acts) inside an organization subject to sector-specific rules, banking, insurance, healthcare, where automated decisions are constrained by the AI Act, GDPR and supervisory regulation. The key distinction isn't technical: it's who bears the effect of the decision.

Put bluntly: the exact same agent can be free of obligations or subject to the AI Act's heaviest ones, depending on what it decides and on whom.

## The question that decides everything: who bears the output?

The [AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) sorts systems into [four risk levels](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) (we mapped them in detail in our [AI Act guide for businesses](/en/guide/ai-act-for-business)). For regulated sectors the operational boundary is a single one.

**If the agent decides or significantly influences a person** in one of the cases listed in Annex III, assessing creditworthiness for a mortgage, setting the risk and premium of a life or health policy, triaging a patient in an emergency, you're in **high risk**. Full stop. No shortcuts.

**If the agent works on documents, data and internal processes** without deciding on people, reconciliations, invoice extraction, reports, archiving, you're in **minimal risk**.

This single criterion settles most of the compliance officer's doubts. The high-risk obligations apply from 2 December 2027, after the postponement agreed in the [Digital Omnibus](https://eur-lex.europa.eu/eli/reg/2026/1744/oj): there's time to prepare, but the boundary is already this one.

## Banking: where you can, where you can't

**You can (minimal/limited risk):**
- Bank reconciliations, data extraction from statements, recurring regulatory reports
- Pre-filling KYC files (with final human verification)
- Internal triage and routing of requests, drafting responses (human approves and sends)

**You can't without heavy obligations (high risk):**
- Automated credit scoring that decides the outcome of a credit request
- Credit-limit decisions without documented human oversight

The viable path: the agent prepares the score and the file, the analyst signs the decision. The agent produces no legally binding output. It's also the simplest path under [Article 22 of the GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj), which restricts decisions based solely on automated processing.

## Insurance: the pricing trap

In insurance, high risk kicks in on one precise front: **risk assessment and pricing of life and health policies** (Annex III, point 5). Claims handling isn't on the list, but a rejection decided only automatically still falls under Article 22 of the GDPR: there too, it's better to let a person decide.

What's safe to do:
- Extracting and validating policy and claim documents
- Preparing the file for the adjuster (who decides)
- Detecting anomalies and potential fraud *to flag to a human*, not to block automatically

The rule: the agent flags, the human disposes.

Banks and insurers have one more obligation, from 2 December 2027: before using a high-risk system for creditworthiness or for life and health insurance, they must carry out a fundamental rights impact assessment (Article 27 of the AI Act).

## Healthcare: the highest level of caution

Here health data is a special category under the GDPR (Article 9) and many diagnostic-support systems are medical devices that fall into high risk: for them the AI Act obligations apply from 2 August 2028. The safely automatable part is almost all **back-office and document work**: record management, report extraction, scheduling, documentary compliance. Anything touching diagnosis or clinical triage requires medical oversight and a data protection impact assessment (DPIA, Article 35 of the GDPR) before a single line of code is written.

## The practical case: where safe automation always starts

The lowest-risk entry point, in any regulated sector, is internal document automation, exactly the ground our [finance and document automation](/en/finance) work covers.

At [Numeraria](/en/case-studies/numeraria), a payroll and accounting firm working inside tight compliance constraints, AI agents handle quotes, hours and reconciliations. Result: roughly **half a month given back to management**. No decisions on people, no binding output to third parties: minimal risk, immediate value.

That's the model we recommend: start from low-risk document automation, build the governance, and only then, if needed, assess the high-risk level with all the safeguards.

## The non-negotiable foundations

Whatever the sector, an AI agent in a regulated environment requires:

1. **DPA under GDPR art. 28** with every vendor in the chain.
2. **EU hosting or on-premise** for sensitive data.
3. **Immutable audit log** on every decision: input, rules applied, output, trigger, any human escalation.
4. **Human oversight** defined upfront on critical cases.
5. **No LLM training on client data.**

We include these by default in our [AI Agents](/en/ai-agents) sprints, not out of heroism: without them, in a regulated sector, you can't even begin.

## When NOT to build an agent (we'll tell you straight)

- When the process requires a legally binding decision with no room for human oversight → change the process first, then automate.
- When the data can't leave a closed perimeter and there's no DPIA → fix governance first.
- When you have no measured baseline → without knowing what the task costs today, you can't know whether the agent makes sense.

Want to know which level your specific case falls into? [Let's talk](/en/contact) (20 minutes, no pitch) or take the [3-minute check-up](/en/check-up).
