---
title: "When your AI agent fails, who pays? SMB liability"
description: "When an AI agent hallucinates or errs, the liability stays with you. Contracts, DPAs and insurance policies SMBs ignore before going to production."
pubDate: 2026-08-10
author: "Daniel Levis"
tags:
  - "compliance"
  - "ai agents"
  - "liability"
  - "ai act"
keywords:
  - "company liability ai agent errors"
  - "ai agent hallucination"
  - "ai insurance smb"
  - "ai act contract"
readMinutes: 7
featured: false
h1: "When your AI agent fails (or hallucinates), who actually pays?"
faq:
  - q: "If the AI agent errs, is it the vendor's fault or mine?"
    a: "Toward your end client or a public body, liability almost always stays with your company: you own the relationship. The vendor only answers within the limits written into the contract and the <strong>art. 28 GDPR DPA</strong>. If the contract is silent, the risk lands on you."
  - q: "Do professional liability policies cover AI agent errors?"
    a: "Often no. Many traditional policies exclude or simply don't contemplate damages from automated systems and hallucinations. Before going to production, ask your broker in writing whether your specific AI use is covered."
  - q: "What should I put in the contract with an AI vendor?"
    a: "At minimum: exact agent scope, autonomy limits, an <strong>immutable audit log</strong> obligation, an art. 28 DPA, and who answers for what. At Soraia these points are in the sprint contract by default, not an add-on."
  - q: "Does an 'AI-generated output' disclaimer keep me safe?"
    a: "It reduces risk on informational client-facing content, as the AI Act requires for limited-risk systems, but it doesn't exempt you from damages. If the agent makes a wrong operational decision, the disclaimer isn't enough: you need human oversight on critical cases."
lang: "en"
gates:
  passedAt: 2026-07-25T06:23:18.250Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 9, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

> **Direct answer: who is liable when an AI agent makes a mistake?** When an AI agent deployed by your company causes damage to a client or a third party, your company is the liable party, both under contract law and under the AI Act. The model provider (OpenAI, Anthropic) disclaims liability in their terms of use; the AI vendor's liability is capped by contract. As deployer, you are the last line of legal exposure, regardless of which system caused the error.

The question always comes after the first demo, once the CEO realises the agent will actually go live: *"and if it's wrong? If it tells a customer nonsense, who pays?"*

Honest, uncomfortable answer: **you almost always pay**. Not the model, not OpenAI, often not even the vendor. You own the relationship with the end client.

The good news: the risk is governable. But it has to be done *before* go-live, not after the first damage.

**Key takeaways:**
- Toward the end client, liability for an AI agent's error or hallucination stays with your company, not with the model provider.
- Many traditional professional liability policies don't cover damages from automated systems: verify it in writing with your broker before production.
- The vendor contract must fix scope, autonomy limits, an immutable audit log and an art. 28 GDPR DPA. If it's silent, the risk is yours.
- The AI Act (in force, full application from August 2026) requires transparency on limited-risk systems and human oversight on high-risk ones.
- The most effective defence isn't a clause: it's human oversight on critical cases plus a log that reconstructs every decision.

## The liability chain SMBs don't see

When an agent errs, three parties are in the room: you (who use the agent), the vendor who built it (e.g. Soraia), and the model provider (OpenAI, Anthropic). Instinct says the blame climbs the chain. In practice, the opposite happens.

Toward your end client, supplier or public body, **you are responsible**. You sent that email, that wrong quote, that support reply promising a refund that doesn't exist. The agent is your tool, just as a junior employee would be.

The AI vendor answers only for what's written in the contract. The model provider, for almost nothing: their terms of use push most of the risk downstream.

Bottom line: if the contract between you and your AI vendor is vague, the risk hangs on you.

## A hallucination isn't an exotic bug, it's an operational case

Let's stop treating hallucinations as science fiction. A [customer support](/en/customer-support) agent can invent a return policy that doesn't exist. A sales agent can quote a discount that was never approved. A [finance](/en/finance) agent can misread an amount on an invoice.

None of these is rare. They're the background noise of any probabilistic system. The point isn't "how do I eliminate hallucinations" (you can't, 100%), but "**what happens when it does, and who answers for it**".

Two real levers:

1. **Tight scope.** An agent that *proposes* and lets a human sign off has a completely different risk profile than one that *acts* autonomously. Less autonomy on high-damage cases, less exposure.
2. **Traceability.** If you can't reconstruct why the agent said X, you can't defend yourself, with the client or an auditor. That's why every sprint of ours ships an **immutable audit log** on each decision: input, rules applied, output, trigger, any escalation.

## What the AI Act says (in force, full application August 2026)

The AI Act doesn't tell you "who pays", but it raises the obligations that, if ignored, put you in the wrong.

- **Limited risk** (client-facing chatbots): transparency obligation. The user must know they're talking to an AI.
- **High risk** (automated recruitment, scoring, decisions on people): risk assessment, logging, human oversight, record keeping.

If you run a high-risk agent without documented human oversight and damage occurs, you're not just paying for the damage: you're also breaching the Regulation. We mapped the full per-sector obligations in the [AI Act guide for SMBs](/en/guide/ai-act-for-business).

## The 4 things to fix before go-live

### 1. The vendor contract
Must fix agent scope, autonomy limits, logging obligation, art. 28 GDPR DPA and who answers for what. If your vendor won't put it in writing, that's a signal.

### 2. The insurance
Call the broker and ask **in writing**: does my professional liability cover damages caused by an automated AI system? Many traditional policies don't. Better to find out now than after.

### 3. Human oversight on critical cases
Define upfront where the agent decides alone and where it hands off to a human. Practical rule: the higher the potential damage of an error, the more the human stays in the loop.

### 4. The log
Without traceability you have no defence. Every production decision must be logged immutably.

## When you DON'T need all this structure

Straight talk: if your agent tidies your internal inbox or summarises documents for your team, most of this is overkill. Legal risk kicks in when output **goes to third parties** or **decides on people**. For purely internal, low-damage automation, a good log and an internal policy are enough.

We don't sell fear. We build agents where they're needed, with scope and controls proportionate to real risk, not the one described in marketing emails.

---

**Want to understand which risk category your case falls into, and what you actually need?** We map it together: [let's talk for 20 minutes](/en/contact) or look at how we build [AI agents](/en/ai-agents) with logs and DPA included by default.
