---
title: "Human oversight in AI agents: where the human goes"
description: "How much autonomy should an AI agent get without killing your time savings? Where to place human checkpoints and approval gates, with a real case."
pubDate: 2026-07-27
author: "Daniel Levis"
tags:
  - "ai agents"
  - "governance"
  - "human-in-the-loop"
  - "strategy"
keywords:
  - "human oversight ai agents"
  - "human in the loop"
  - "agent approval gate"
  - "ai agent autonomy"
readMinutes: 6
featured: false
h1: "How much autonomy to give an AI agent: where the human goes in the loop"
faq:
  - q: "What is human-in-the-loop oversight in an AI agent?"
    a: "It's the choice of which decisions the agent makes alone and which pass to a human before they take effect. The point isn't a human everywhere, it's a human <strong>only on the few high-risk or irreversible steps</strong>. Everywhere else, the agent runs and logs."
  - q: "Does the AI Act require human oversight?"
    a: "For <strong>high-risk</strong> systems (recruitment, credit scoring, healthcare), Article 14 requires effective human oversight. For limited or minimal risk the obligation is lighter, but an audit log and a checkpoint on critical cases stay good practice. See our AI Act guide."
  - q: "Won't a human in the loop kill all my time savings?"
    a: "Only if you put the checkpoint in the wrong place. If a human must approve 100% of outputs, yes, you've rebuilt manual work. Good design lets 80-90% of standard cases pass autonomously and stops only for exceptions, anomalies and irreversible actions."
  - q: "How do I decide where to put the checkpoints?"
    a: "Two axes: <strong>reversibility</strong> and <strong>impact</strong>. Reversible and low impact (draft, tag, data enrichment): full autonomy. Irreversible or high impact (send to a client, payment, decision about a person): human approval gate."
lang: "en"
gates:
  passedAt: 2026-07-16T14:38:59.292Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8.2, pass: true }
    - { name: "brand-voice", score: 8, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 7.8, pass: true }
draft: false
---

The question usually lands right after go-live: *"how much do we let this agent decide on its own?"*

It's the right question. But most teams answer it badly, at the two extremes. Either they give the agent zero autonomy (so a human approves everything, and the time savings vanish). Or they give it full autonomy (and sooner or later it sends the wrong thing to a client or authorises a payment it shouldn't have).

The operational answer is in the middle, but not by accident. You design it.

**Key takeaways:**
- Human-in-the-loop oversight belongs on the few high-risk or irreversible steps, NOT everywhere. If a human approves 100% of outputs, you've rebuilt manual work.
- Decide where to place a checkpoint with two axes: reversibility and impact. Reversible + low impact → autonomy. Irreversible or high impact → human approval gate.
- The AI Act (Article 14) mandates effective human oversight only for high-risk systems (e.g. recruitment); for the rest it's good practice, not a legal duty.
- Good design lets 80-90% of standard cases pass autonomously and stops only for exceptions and anomalies.
- With Rainplan we handle hundreds of parcels and multi-stakeholder approvals autonomously, with the human placed only at the final decision gate.

## The real cost of a mis-placed checkpoint

Every human checkpoint is a tax on throughput. It isn't free. If a human has to look at every output before it goes out, you have two problems: you've re-inserted a human bottleneck, and the human gets used to clicking "approve" without reading (rubber-stamping, which is worse than no oversight because it gives you the illusion of control).

So rule number one: **put the human where their judgement actually changes the outcome**, not where it makes you feel comfortable.

## The matrix: reversibility × impact

We use two axes to decide every single step of a workflow.

**Reversibility**: if the action goes wrong, how costly is it to undo? Updating a tag in the CRM is reversible in 10 seconds. Emailing 400 clients isn't. Authorising a bank transfer isn't.

**Impact**: who does the error touch? A wrong internal data point is operational annoyance. A wrong decision about a person (a candidate unfairly rejected) or a client is real damage, often reputational or legal.

From this, four quadrants:
- **Reversible + low impact** (drafts, tags, enrichment, classification): full autonomy, the agent runs and logs.
- **Reversible + high impact** (a report that goes to management, internal scoring): autonomy with notification, a human sees it but doesn't need to pre-approve.
- **Irreversible + low impact** (archiving, dedupe): autonomy with a threshold, the agent stops only ambiguous cases.
- **Irreversible + high impact** (send to a client, payment, decision about a person): **mandatory human approval gate**.

It's a table we fill in with the client during assessment, row by row on the real workflow. This isn't philosophy: it's where the boundary sits between what the [agent runs](/en/ai-agents) alone and what waits for a signature.

## A concrete case: multi-stakeholder approvals at Rainplan

[Rainplan](/en/case-studies/rainplan) runs stormwater management: hundreds of parcels, each with several stakeholders who must approve. Exactly the kind of process where the temptation is "let's automate everything" and then you end up with wrong, irreversible approvals.

The design choice: the agent autonomously does everything reversible and low-impact, parcel capture, data enrichment, dossier preparation, routing to the right stakeholder. Hundreds of parcels handled with no human intervention.

But the **final decision gate**, the approval that triggers real-world effects, stays human. Not because the agent couldn't decide it, but because it's irreversible and involves multiple parties. There a human signs, always. And they sign on a ready dossier, not a blank page: which is why the time savings stay huge even with the checkpoint active.

This is the point teams get wrong most often: **a human checkpoint doesn't kill the savings if the agent reaches the gate with the work already done.** The human decides, they don't compile.

## What the AI Act says (without the scaremongering)

Article 14 of the European AI Regulation mandates *effective* human oversight for **high-risk** systems. For an SME that typically means recruitment and scoring about people. For the rest, agents on finance, internal support, sales, the direct obligation is lighter.

But "lighter" doesn't mean "nothing". Even outside high risk, a [customer support agent](/en/customer-support) that replies to a client or a [finance agent](/en/finance) that touches amounts still wants an audit log and a gate on critical cases. Not for compliance: for accountability. If one day you have to explain "why the agent did X", the log and the oversight point are your answer. We break the risk levels down in our AI Act guide.

## When you do NOT need a checkpoint

Let me be blunt, because the opposite risk is real:
- **Repetitive, reversible, internal task** (classify tickets, tag leads, extract data from PDFs): putting a human to approve is pure waste. Log it and move on.
- **High volume + cheap error**: if fixing an error costs less than approving each case, let the agent run and correct downstream.
- **When the human has no context to decide better than the agent**: if your reviewer would approve everything anyway without adding judgement, the checkpoint is theatre.

Well-designed human oversight isn't "how much control can I add". It's "what's the minimum control that covers the risks that actually matter".

## How we set it up in sprints

During assessment we map the workflow step by step against the reversibility × impact matrix, define the approval gates, and write them into the contract alongside the primary metric. An immutable audit log on every decision is default. So at 30 days after go-live we know not only whether the agent recovered time, but also how often the human was needed, and whether they were really needed.

---

**Want to map the checkpoints on your real process?** [Let's talk](/en/contact) (20 minutes, no pitch) or take the check-up.
