---
title: "Construction estimating and bills of quantities with AI"
description: "How an AI agent helps construction firms and technical offices prepare estimates and bills of quantities in hours, not days. Practical method, limits included."
pubDate: 2026-11-16
author: "Daniel Levis"
tags:
  - "ai agents"
  - "construction"
  - "estimating"
  - "how-to"
keywords:
  - "ai construction estimating"
  - "construction ai agent"
  - "automated bill of quantities"
  - "builder estimating software"
readMinutes: 6
featured: false
h1: "Estimates and bills of quantities in hours, not days"
faq:
  - q: "Does an AI agent replace the surveyor or technical director?"
    a: "No. The agent prepares the draft bill of quantities and links items to price lists, but the technician validates quantities, overheads and margins before signing the offer. It removes the transcription work, not the technical responsibility."
  - q: "How long until the first agent is operational?"
    a: "Soraia's first release runs on real processes in <strong>4 weeks</strong>, then improves one release at a time. Before starting you need a baseline: how long a typical estimate takes you today."
  - q: "Does the agent read my price lists and rate books?"
    a: "Yes, if you give them to it. Load your price list, regional rate books and past job history, and the agent links each item to that data. Without your updated price lists it only produces useless generic estimates."
  - q: "What happens if the specification is messy or incomplete?"
    a: "The agent flags ambiguous or missing items instead of inventing them. It is built to escalate doubtful cases to the technician: better one extra question than an error in the bill of quantities."
lang: "en"
gates:
  passedAt: 2026-10-25T09:05:36.111Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 8, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 7, pass: true }
draft: false
---

The estimate is the bottleneck of every construction firm. The request comes in, the specification, the drawings. Then the technical director spends two or three days reading, measuring, linking price-list items, typing numbers into a spreadsheet. While doing that, they are not on site.

The problem is not a lack of estimating software. You already have it. The problem is the manual work *around* the bill of quantities: transcribing quantities, hunting for the right price, redoing everything when a spec version changes.

This is where an AI agent genuinely helps. Let's look at how, and where it doesn't.

**Key takeaways:**

- An AI agent for construction estimating does not replace the bill of quantities: it removes the transcription and item-lookup work that costs you 2-3 days per offer today.
- It only works if you feed it your updated price lists, regional rate books and past job history. Without your data it produces useless generic estimates.
- The technician always signs: the agent prepares the draft and flags ambiguous items, but responsibility for quantities and margins stays human.
- Before building it you need a timed baseline of how long an estimate takes you today. Without that number you can't say the agent worked.
- At Soraia the first agent runs on real processes in 4 weeks, with a first-month satisfied-or-refunded guarantee.

## What an AI agent does (and doesn't) for construction estimates

An agent doesn't "make the estimate". It does the repetitive parts of it. Concretely:

- Reads the specification and tender documents (PDFs, exported DWGs, measurement sheets) and extracts the required works.
- Links each work item to your price list or regional rate book, with the unit price.
- Pre-fills the estimative bill of quantities as a draft, ready for the technician's review.
- Flags ambiguous or missing items instead of inventing them.
- Regenerates the draft when a new spec version arrives, without starting from scratch.

What it does **not** do: it doesn't set margins, assess the labour incidence of a specific site, or sign the offer. That stays technical-director work. The agent gives you back the time to do it well.

## Why you need a custom agent, not generic ChatGPT

ChatGPT knows construction in general. It doesn't know *your* price list, *your* supply prices, *your* site history. A bill of quantities built on generic numbers is worthless: if the per-square-metre price of a screed is off by 15%, you either lose the tender or lose money on it.

A custom agent works on top of your real data:

- Your updated price list and the national or regional rate books you use.
- The history of closed jobs (what it actually cost, not what the price list said).
- Your internal margin rules by type of work.

It's the same logic we explain in [custom AI agents vs generic ChatGPT](/en/ai-agents): below 20-30 repetitive tasks a week ChatGPT is enough, above that a custom agent that *does* the task inside your systems is worth it. A firm preparing 5-10 offers a week is well inside that threshold.

## The method: baseline first, agent second

We build nothing without a starting number. It's the same discipline we apply to every project.

1. **Timed baseline.** Take 5-10 typical estimates from recent months. Measure how long they actually took: reading the spec, the bill of quantities, price research, revisions. Not "by feel": timed.
2. **Clear scope.** The agent does one thing: e.g. "estimative bill of quantities for residential renovations from a supplied specification". Out of scope: complex public tenders, special works that require the technician's site visit.
3. **One primary metric.** For estimates it's almost always: **hours saved per estimate**. You measure it before and after. No dashboard with ten numbers.
4. **Shadow mode.** In the first weeks the agent prepares the draft and the technician corrects it. You learn where it errs before you trust it.

If you want the full framework, it's in our guide on [how to measure the ROI of an AI agent](/en/guide): it applies identically to construction.

## Where NOT to build the agent

I'll tell you before selling you something you don't need:

- **You do 1-2 estimates a month.** Not worth it. A good Excel template plus ChatGPT for the text parts is enough.
- **Your price lists aren't updated.** Garbage in, garbage out. Clean up the prices first, then automate. Without clean price lists the agent makes things worse.
- **Every job is one of a kind.** If 90% of your work is bespoke and unrepeatable, the agent has little to learn from. Better to use custom software on the admin side, not on the bill of quantities.

For the admin cases, from client records to connecting your ERP, it's a different story: that's [custom software](/en/software-development), not the estimating agent.

## From draft to won offer

An estimate prepared fast only matters if the offer then reaches the client at the right moment with the right follow-up. The estimating agent connects naturally to the [sales and marketing automation](/en/sales-marketing) side: sending the offer, reminders, scoring leads by probability of closing.

It's not magic. It's taking the transcription hours off the technical director and giving them back on site and in negotiation.

## FAQ

The questions owners and technical directors ask us are in the FAQ block above. If yours isn't there, ask us on a call.

## The next step

If you do more than 3-4 estimates a week and your price lists are in order, it's worth a [20-minute call with Daniel](/en/contact): we'll tell you honestly whether an agent makes sense for your volume or whether fixing the process is enough. Or take the 3-minute [check-up](/en/check-up) first.
