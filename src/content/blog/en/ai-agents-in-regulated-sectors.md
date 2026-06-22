---
title: "AI Agents in Regulated Sectors: What's Allowed"
description: "Banking, insurance, healthcare: what you can actually do with AI agents in a regulated sector. An operational AI Act + GDPR map, without the scaremongering."
pubDate: 2026-06-22
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
    a: "No, not on decisions that affect people (granting credit, pricing policies, claims). The AI Act classifies these as <strong>high risk</strong>: documented human oversight on the final decision is mandatory. The agent can pre-process, score, prepare the file, but the sign-off stays human."
  - q: "What changes with the AI Act in force from August 2026?"
    a: "Obligations for high-risk systems (credit scoring, life/health insurance systems, clinical triage) become fully applicable. That means documented risk assessment, full decision logging, human oversight and record retention. See our <a href=\"/en/guide/ai-act-for-business\">AI Act guide</a> for the full picture."
  - q: "Can I use an AI agent for document automation in a regulated sector?"
    a: "Yes, and it's usually the safest starting point. OCR on invoices, reconciliations, PDF data extraction, recurring reports are <strong>minimal risk</strong>: they don't decide on people. That's the Numeraria case, where automation gave back roughly half a month to management."
  - q: "Where do the data need to live to stay compliant?"
    a: "For GDPR you need a <strong>DPA under art. 28</strong> with every vendor and, for sensitive data (healthcare, finance), EU hosting or on-premise. We include the DPA and EU hosting by default, and the LLMs are never trained on client data."
  - q: "When does an AI agent NOT make sense in a regulated sector?"
    a: "When the process requires a legally binding decision with no room for human oversight, or when the data needed can't leave a closed perimeter without a proper DPIA. In those cases you fix governance first, then automate. Never the other way around."
lang: "en"
draft: false
---

Every month the same email lands from a CFO at a bank or an insurer: *"We want to use AI agents, but our compliance officer says no to everything."*

Honest answer: the compliance officer is right about some things and wrong about others. The problem is nobody drew them the operational map. Here it is.

**In short:**

- In a regulated sector what matters isn't *what the technology does*, it's *who the decision affects*: internal document automation is minimal risk, credit scoring or clinical triage is high risk.
- From August 2026 the AI Act obligations for high-risk systems (credit scoring, life/health policies, healthcare systems) are fully applicable: risk assessment, logging, human oversight, multi-year records.
- The practical rule we use: the AI agent *prepares and instructs*, the human *signs off*. This keeps most processes out of the banned autonomous-decision zone.
- The safest starting point is almost always document automation (minimal risk). At Numeraria, a payroll and accounting firm, it gave back roughly half a month to management.
- DPA under GDPR art. 28, EU hosting, immutable audit log, no LLM training on client data: without these foundations you don't even start.

## What "AI agent in a regulated sector" means

An AI agent in a regulated sector is a software system that runs tasks autonomously (reads, evaluates, acts) inside an organization subject to sector-specific rules — banking, insurance, healthcare — where automated decisions are constrained by the AI Act, GDPR and supervisory regulation. The key distinction isn't technical: it's who bears the effect of the decision.

Put bluntly: the exact same agent can be perfectly legal or banned, depending on what it decides and on whom.

## The question that decides everything: who bears the output?

The AI Act sorts systems into four risk levels (we mapped them in detail in our [AI Act guide for businesses](/en/guide/ai-act-for-business)). For regulated sectors the operational boundary is a single one.

**If the agent decides or significantly influences a person** — granting a mortgage, setting a policy premium, accepting a claim, triaging a patient — you're in **high risk**. Full stop. No shortcuts.

**If the agent works on documents, data and internal processes** without deciding on people — reconciliations, invoice extraction, reports, archiving — you're in **minimal risk**.

This single criterion settles 80% of the compliance officer's doubts.

## Banking: where you can, where you can't

**You can (minimal/limited risk):**
- Bank reconciliations, data extraction from statements, recurring regulatory reports
- Pre-filling KYC files (with final human verification)
- Internal triage and routing of requests, drafting responses (human approves and sends)

**You can't without heavy obligations (high risk):**
- Automated credit scoring that decides the outcome of a credit request
- Credit-limit decisions without documented human oversight

The viable path: the agent prepares the score and the file, the analyst signs the decision. The agent produces no legally binding output.

## Insurance: the pricing trap

In insurance, high risk kicks in on two fronts that are often underestimated: **life/health policy pricing** and the **assessment of claims** that affect the policyholder's rights.

What's safe to do:
- Extracting and validating policy and claim documents
- Preparing the file for the adjuster (who decides)
- Detecting anomalies and potential fraud *to flag to a human*, not to block automatically

The rule: the agent flags, the human disposes.

## Healthcare: the highest level of caution

Here the data is sensitive under GDPR and many diagnostic-support systems fall into high risk. The safely automatable part is almost all **back-office and document work**: record management, report extraction, scheduling, documentary compliance. Anything touching diagnosis or clinical triage requires medical oversight and a serious DPIA before a single line of code is written.

## The practical case: where safe automation always starts

The lowest-risk entry point, in any regulated sector, is internal document automation — exactly the ground our [finance and document automation](/en/finance) work covers.

At [Numeraria](/en/case-studies/numeraria), a payroll and accounting firm working inside tight compliance constraints, AI agents handle quotes, hours and reconciliations. Result: roughly **half a month given back to management**. No decisions on people, no binding output to third parties: minimal risk, immediate value.

That's the model we recommend: start from low-risk document automation, build the governance, and only then — if needed — assess the high-risk level with all the safeguards.

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
