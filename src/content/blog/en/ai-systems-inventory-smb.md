---
title: "AI systems inventory for SMBs: your August 2026 register"
description: "How to build the AI systems register the EU AI Act expects by August 2026: template, risk classification and the first operational step for every COO and DPO."
pubDate: 2026-07-22
author: "Daniel Levis"
tags:
  - "ai act"
  - "compliance"
  - "gdpr"
  - "how-to"
keywords:
  - "ai systems inventory"
  - "ai systems register"
  - "ai act smb"
  - "ai risk classification"
readMinutes: 7
featured: false
h1: "The AI systems register you need by August 2026"
faq:
  - q: "Is an AI systems register mandatory for my SMB?"
    a: "The AI Act doesn't impose a generic \"register\" on every company, but for high-risk systems it requires technical documentation, logging and risk management. In practice an internal register is the simplest way to prove you know what you run and which tier it falls into. It also supports the AI literacy obligation, in force since February 2025."
  - q: "What should the register include?"
    a: "For each system: name and vendor, what it does, who uses it, which data it processes, whether it makes or significantly influences decisions about people, the AI Act risk tier and the art. 28 GDPR DPA with the vendor. Those columns are enough to start, a spreadsheet does the job."
  - q: "How do I classify the risk of each system?"
    a: "The AI Act uses 4 tiers: unacceptable (banned), high (decision-making recruiting, credit scoring), limited (client-facing chatbots, transparency duty) and minimal (everything else). The decisive question: does the system decide or significantly influence something about a person? If yes, treat it as high. If no, it's almost always limited or minimal."
  - q: "Do ChatGPT and Copilot used by the team belong in the register?"
    a: "Yes. Even general-purpose tools adopted by employees are AI systems \"in use\" and must be mapped, at least to know who uses them on which data. It's minimal risk in most cases, but listing them closes the most common gap: shadow AI that nobody knows about."
  - q: "By when do I need it ready?"
    a: "The AI Act obligations on high-risk systems apply from 2 August 2026. Building the inventory now, months ahead, gives you time to remediate (add logging, human oversight, DPAs) without rushing. The register is the first step, not the last."
lang: "en"
gates:
  passedAt: 2026-07-16T14:29:55.712Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 10, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 8, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

Every SMB getting alarmist emails about the AI Act asks the wrong question: *"how big is my fine risk?"*.

The right question is: **do I know exactly which AI systems run inside my company today?** Because the first operational duty, before anything else, is to know what you have. And almost nobody does.

**Key takeaways:**
- From **2 August 2026** the AI Act obligations on high-risk systems kick in: the first step to prepare is a register/inventory of the AI systems in use.
- The register isn't a complex legal document: it's a sheet with 7-8 columns answering "what do I use, who uses it, on which data, at which risk tier".
- Risk classification boils down to one question: **does the system decide or significantly influence something about a person?** If yes, high risk; if no, almost always limited or minimal.
- The most common gap is **shadow AI**: ChatGPT, Copilot and tools adopted by individual departments that nobody ever logged.
- Building the register now, months before the deadline, gives you time to remediate calmly.

## What the AI systems register is (and isn't)

A **company AI systems register** is the inventory of every AI system your business uses or puts into service, with, for each one, its function, the data it processes, the internal owner and the risk tier under the AI Act. It's not a certification or a notarised formality: it's the governance tool that lets you know what you must oversee.

The AI Act doesn't ask every SMB for a "register" by that name. But for high-risk systems it mandates technical documentation, risk management and logging. And the **AI literacy** obligation has been in force since February 2025. Without an inventory, you can neither prove nor manage anything. The register is the cheapest way not to arrive unprepared at August 2026.

## The 4 steps to build it

### 1. Census everything, including shadow AI

Walk the departments and ask what they actually use. Don't trust the official org chart.

You'll find three categories:
- **General-purpose tools** adopted by teams: ChatGPT, Copilot, Claude, Gemini, Perplexity.
- **AI features inside existing SaaS**: your ERP, CRM or ATS often already have AI modules switched on.
- **Custom agents and automations**: those built by you or a vendor on specific processes.

90% of compliance gaps start here: someone in marketing uses a tool that processes client data and nobody knows. If you don't map it, it doesn't exist, until it becomes a problem.

### 2. Fill the minimum columns

A spreadsheet is enough. For each system:

- **Name and vendor**
- **What it does** (one line)
- **Who uses it** (department / owner)
- **Data processed** (personal? sensitive? third-party clients'?)
- **Decides or influences people?** (yes/no)
- **AI Act risk tier** (see step 3)
- **Art. 28 GDPR DPA** with the vendor? (yes/no/link)
- **Notes on logging and human oversight**

Eight columns. Nothing else is needed to start.

### 3. Classify the risk

The AI Act uses 4 tiers. For an SMB the practical map is this:

1. **Unacceptable** (banned): social scoring, manipulation. Not your concern.
2. **High**: recruiting that decides or filters decisively, credit scoring, systems affecting people's rights. Heavy duties: risk assessment, logging, human oversight.
3. **Limited**: client-facing chatbots. Main duty: tell the user they're talking to an AI.
4. **Minimal**: everything else. Internal automations, invoice OCR, drafting with a human who approves.

**The question that resolves 95% of cases**: does the system *decide or significantly influence something about a person*? If yes, treat it as high risk until you prove otherwise. If no, you're almost always in limited or minimal. We break down the logic by use case in our [AI Act for companies guide](/en/guide/ai-act-for-business).

### 4. Assign an owner and a review date

A register snapped once and forgotten is useless. Assign an owner (often the DPO or COO) and a quarterly review. Every new tool adopted enters the register *before* going into production, not after.

## An honest limit: the register alone isn't enough

Here's the uncomfortable part. The register is the **first step**, not compliance. It tells you *what* you have and *where* you're exposed. It doesn't add the missing logging, the human oversight on edge cases, or the DPA your vendor never signed.

That's exactly why you should do it now: mapping in July 2026 leaves one month to fix things. Mapping today leaves many. If you discover high-risk systems with no audit trail, you have time to sort them out, and that's especially true for [customer & compliance automation](/en/customer-support) flows, where chatbots and triage touch third-party client data.

## From register to policy

Once you know what you use, the natural next step is writing the usage rules. You don't need a tome: a one-page document stating what's allowed, what's forbidden and how to flag a problem. You'll find the model in our [company AI policy template](/en/guide/company-ai-policy-template). Register plus policy cover the governance a serious SMB is expected to have under the AI Act.

## FAQ

The quick answers to the questions COOs and DPOs ask us are in the box below.

---

**Want an assessment of your specific case?** In the [AI Readiness Assessment €2,000](/en/ai-agents) we map your AI systems and tell you honestly which tier they fall into and what to do, without scaremongering. Or start with the [3-minute check-up](/en/check-up).
