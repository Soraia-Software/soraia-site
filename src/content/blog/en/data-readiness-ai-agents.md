---
title: "Is your company data ready for an AI agent? Checklist"
description: "Before spending a euro on automation: the data readiness checklist (sources, dedupe, permissions, ground truth) that decides whether an AI agent works."
pubDate: 2026-07-24
author: "Daniel Levis"
tags:
  - "ai agents"
  - "data-readiness"
  - "data-quality"
  - "methodology"
keywords:
  - "prepare company data for ai"
  - "data readiness ai agents"
  - "ai data quality"
  - "data ready for artificial intelligence"
readMinutes: 8
featured: false
h1: "Is your company data ready for an AI agent? The checklist"
faq:
  - q: "Why does data matter more than the AI model?"
    a: "An AI agent acts on what it reads. If it reads duplicated, incomplete or contradictory data, it produces wrong output at industrial speed. The model is close to a commodity: the difference between an agent that works and one that doesn't almost always lies in the quality and accessibility of your data, not in the LLM brand."
  - q: "Do I need to clean all my data before I start?"
    a: "No. You only need to prepare the data that falls within the scope of the first agent. Cleaning the entire company archive before starting is an endless project that never kicks off. You isolate the process, tidy up the sources that process touches, build the agent. The rest comes later, if needed."
  - q: "What is ground truth and why does it matter?"
    a: "Ground truth is a set of 20-50 real cases whose correct answer you already know, verified by a person. It lets you test the agent before go-live: you feed it the inputs and compare its output to the known truth. Without ground truth you cannot say whether the agent works, you can only hope."
  - q: "Who should own data readiness, IT or Operations?"
    a: "Operations defines what counts as correct data and where the real data lives. IT provides access and permissions. In practice the COO or Head of Ops leads, because they know the processes and the exceptions. A pure IT project tends to optimise the technical structure and lose the operational context that makes data useful."
  - q: "How long does the data readiness phase take?"
    a: "In our sprints we assess it during the AI Readiness Assessment (~€2,000, refunded if you proceed) and fix it in the first weeks. For a well-scoped process a few days of work are enough. If the data turns out to be in critical shape, it's better to know before signing a €10-50k sprint."
lang: "en"
gates:
  passedAt: 2026-07-16T14:36:08.910Z
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

Is your company data ready for an AI agent? The checklist

Every week someone asks us for an AI agent. The first thing we look at is not the process. It's the data that process touches.

Because that's where 70% of projects die, before they even start.

**Key takeaways:**

- An AI agent doesn't fix dirty data, it propagates it at industrial speed. If the input is duplicated or incomplete, the output is wrong faster.
- You don't need to clean the whole company archive. You only need to prepare the sources the first agent touches. Isolating scope beats big-bang.
- Five prerequisites decide whether an agent works: sources identified, data deduplicated, permissions in order, machine-readable format, and a ground truth to test it against.
- With LIFTT, a deep-tech VC holding, the real work wasn't the model: it was automatic email archiving and dedupe, which made the auto-generated monthly report possible.
- Data readiness must be measured before signing a sprint. It costs a few days. It saves you from spending €10-50k on foundations that won't hold.

## What data readiness means for an AI agent

Data readiness is the state in which the data a process uses is identifiable, accessible, clean and verifiable, to the point where an AI agent can read it, act on it and produce reliable output without constant supervision. It's not a question of data volume. It's a question of quality, structure and permissions over the subset of data a single agent needs.

Put bluntly: you can have the best model on the market and a useless agent, if you feed it a CRM full of duplicate customers and half-empty fields.

## Why data matters more than the model

The most common mental error is thinking the agent's intelligence lives in the LLM. It doesn't. The model is close to a commodity: switching from one to another moves a few percentage points.

The real difference between an agent that works and one that doesn't almost always lies in the data you feed it.

An agent **does** a task: it receives a trigger, reads data, applies rules, acts in your systems. If the data it reads is contradictory, the agent doesn't notice. It executes anyway, getting it wrong, on every single case, tirelessly. A slow human at least spots the anomaly. The agent doesn't.

That's why the data preparation phase always comes before building. Skip this step and you're automating the chaos.

## The checklist: 5 prerequisites before spending a euro

### 1. Sources identified (where the data actually lives)

The question: for the process you want to automate, **where does the real data sit**? Not where it should sit. Where it sits.

Almost always the answer is embarrassing: half in the ERP, half in an Excel file on someone's desktop, a chunk in a colleague's emails, a bit in the head of the person who's done the job for ten years.

If you can't list the sources in one line each, you're not ready. The agent needs to know where to read from.

### 2. Data deduplicated (one truth, not three)

The silent killer. The same customer written three ways. The same email archived four times. The same candidate with two profiles.

An agent reading duplicates produces duplicate output, miscounts, contacts the same person twice. With **LIFTT**, a deep-tech VC holding, the decisive work wasn't generative AI: it was building automatic email archiving and dedupe, so the monthly report could be auto-generated without noise. Before dedupe, the report wasn't reliable. After, it was.

### 3. Permissions and legal basis (GDPR is not optional)

The agent accesses data. Who allows it, and on what basis?

If it processes personal data (candidates, customers, employees), you need a legal basis, and with an external vendor a **GDPR art. 28 DPA**. If the data contains sensitive information, you need to understand what can leave the EU perimeter and what can't. This is decided before, not after an incident.

We treat it as a starting constraint: art. 28 DPA included in the contract, EU hosting when required, no LLM training on client data.

### 4. Machine-readable format

A crooked scanned PDF isn't readable data, it's an image. An Excel file with merged cells, colours used as code and notes hidden in comments isn't a table, it's a puzzle.

Before building, check: is the data in a format a machine can parse deterministically? If not, the first part of the sprint will be extraction (OCR, parsing), not automation. That's fine, but it has to be budgeted for, in cost and time.

### 5. Ground truth (how you'll know it works)

This is the one almost nobody prepares. Before go-live you need a set of **20-50 real cases whose correct answer you already know**, verified by a person.

You feed the inputs to the agent in shadow mode, compare the output to the known truth, measure the error. Without ground truth you cannot say whether the agent works: you can only hope, and hope is not a metric. It's the same principle as a baseline: without a measured yardstick, every claim is an opinion.

## When you're NOT ready (and what to do)

We'll tell you to your face, as always:

- **Data scattered across 8 places with no primary source** → you need to consolidate first, not automate. An agent doesn't bring order, it crashes into the disorder.
- **Zero legal basis for personal data** → fix the DPA and the policy before touching anything.
- **Nobody in the company can say which is the "right" data** → you're missing ground truth and ownership. Solve it first, it's an Operations problem, not an IT one.
- **The process will change in two months** → preparing data for a workflow that's about to die is waste. Wait for it to stabilise.

The good news: you almost never need to clean everything. You need to prepare the subset the first agent touches. That's days of work, not months.

## How we handle it at Soraia

We assess data readiness in the [AI Readiness Assessment](/en/ai-agents) (~€2,000, refunded if you proceed): we map the sources, measure quality across the first agent's scope, check permissions and format, build the ground truth. If gaps show up, you see them before signing a €10-50k sprint, not after.

When the data is weak but the process is right, the first delivery in 4 weeks often includes exactly the dedupe and structuring work, as we did with [LIFTT](/en/case-studies/liftt). And if the team doesn't yet have a clean-data culture, [AI Adoption](/en/ai-adoption) exists to build it, because an agent only survives if the people around it keep the sources in order.

If you want to figure out where you stand, the [internal AI assessment guide](/en/guide/internal-ai-assessment-guide) gives you the method to do it yourself.

---

**Want to know if your data can support an agent?** [Let's talk for 20 minutes](/en/contact) or [take the check-up](/en/check-up) (3 minutes, no email). We'll tell you honestly whether you're ready or what's missing.
