---
title: "Beyond Excel: digitising business processes"
description: "That one spreadsheet running half your company is sometimes the right call. Here is when it starts costing you, and how to know it is time to digitise."
pubDate: 2026-06-17
author: "Daniel Levis"
tags:
  - "business process automation"
  - "excel"
  - "digitisation"
  - "opinion"
  - "sme"
keywords:
  - "digitise business processes excel"
  - "running business on spreadsheets"
  - "when to leave excel"
  - "sme process automation"
readMinutes: 7
featured: false
h1: "The spreadsheet running half your company: when it works and when it's costing you"
faq:
  - q: "Should you always replace Excel as a company grows?"
    a: "No. A spreadsheet stays the right call as long as the process keeps changing, one person owns it, and an error isn't expensive. It becomes a problem when several people share it, it feeds decisions or invoicing, and a single wrong row creates downstream rework. That's when it's worth <a href=\"/en/software-development\">digitising the process</a>, not before."
  - q: "How do I know if a spreadsheet is costing me?"
    a: "Measure three things for two weeks: how many hours/week the team spends keeping it current, how many errors land downstream (wrong invoices, duplicate data, redone reconciliations), and how many different people touch it. If those are recurring hours and not a seasonal spike, you have a baseline that justifies acting."
  - q: "Off-the-shelf system or custom software?"
    a: "It depends on the process. If it's standard (accounting, basic inventory), an off-the-shelf system like TeamSystem, Zucchetti or Odoo is almost always the right answer. If the spreadsheet encodes rules that are your competitive edge, and no SaaS replicates them without contortions, a <a href=\"/en/software-development\">custom build</a> or an agent working inside your systems makes sense."
  - q: "Can an AI agent just read my spreadsheet?"
    a: "Yes, and it's often the most sensible first step. An agent can pull data from the sheet, validate it, reconcile it and push it into your downstream systems without you rebuilding everything. That's the <a href=\"/en/case-studies/numeraria\">Numeraria</a> pattern: agents handle quotes, hours and reconciliations, and the team uses the system without even noticing."
  - q: "How long does it take to get off the spreadsheet?"
    a: "With our model the first useful delivery lands in 4 weeks, not six months. We start with a roughly €2,000 scoping (refunded if you proceed) to check the case holds, then a build sprint. And if the agreed target isn't hit 30 days after go-live, we work for free until it is, or we refund."
lang: "en"
draft: false
---

Almost every SME I meet has one Excel spreadsheet holding up a critical chunk of the business. The pricing. The jobs. The team's hours. The commissions. One person built it years ago, and now ten people live off it.

The reflex of the average consultant is: "it needs digitising." Mine, after 40+ projects, is more boring: **it depends**. Sometimes that spreadsheet is the smartest tool you own. Sometimes it's quietly bleeding hours and you can't see it because the cost is spread thin.

This piece is here to tell you which side you're on.

**In short:**
- Excel isn't the enemy. It's the best process prototype ever invented: zero cost, zero IT wait, editable by anyone. It only becomes a problem when it stops being a prototype and turns into infrastructure.
- The spreadsheet is costing you when several people share it, it feeds decisions or invoicing, and one wrong row creates hours of downstream rework.
- Before replacing it, measure: hours/week to keep it current, downstream errors, people who touch it. Without that baseline, "let's digitise" is an opinion, not a decision.
- Often the right move isn't binning the sheet but putting an AI agent on top that reads it, validates it and pushes it into your downstream systems. That's the [Numeraria](/en/case-studies/numeraria) pattern: quotes, hours and reconciliations handled autonomously, half a month handed back to management.
- The question isn't "Excel or not." It's: does this process still change every week, or has it settled down enough to deserve a real system?

## Why Excel wins so often (and is right to)

Excel has three superpowers no off-the-shelf system beats early on: it costs nothing, it waits on no IT department, and anyone who can write a formula can change it. When a process is young and shifts every week, that flexibility is worth more than any software.

That's why I tell clients **not** to digitise a process they don't yet understand. If the rules change every month, a spreadsheet is exactly where they should change. Building custom software on an unstable workflow is one of the fastest ways to waste €20,000.

So: as long as one person owns the sheet, the process is still evolving, and an error costs little, leave it where it is. It's a prototype. It's doing its job.

## The three signs the sheet has become a cost

The problem isn't Excel. It's when the sheet quietly stops being a prototype and becomes **infrastructure** without anyone deciding it should. Three concrete signs:

**1. Lots of people touch it.** A sheet shared by five people isn't a sheet anymore, it's a database with no controls. Duplicate versions, vanishing columns, overwritten formulas. Every "who has the latest one?" is lost time that shows up in no report.

**2. It feeds decisions or invoicing.** As long as the sheet just helps you think, imperfect is fine. The moment client invoices, sales commissions or billable hours come out of it, a wrong row isn't an annoyance, it's a lost receivable or a dispute. The risk has changed in kind.

**3. One wrong row triggers rework.** This is the most reliable economic signal. If fixing one error in the sheet means redoing three downstream steps by hand, you're paying compound interest on imperfection. That cost never shows up on a P&L, but it's real.

If you recognise two out of three, the sheet is costing you. How much, only the baseline tells you.

## Before touching anything: measure

Here I'll repeat what we say on every sprint: without a baseline, "the sheet wastes us tons of time" is corridor opinion, not data. For two weeks, measure three numbers:

- **Hours/week** the team spends keeping it current (timed, not estimated).
- **Downstream errors** it causes: invoices corrected, duplicate data, redone reconciliations.
- **How many** different people touch it and how often they ask "which one's the good version?".

If those are recurring hours and not a seasonal spike, you have a case. If it's three hours a quarter, leave it alone: you're about to spend more on software than you'll recover. Honesty here saves you a pointless project.

## The three exits (in rising order of cost)

Getting off Excel doesn't automatically mean "let's build software." There are three routes, and the right one is almost always the cheapest.

**A SaaS or off-the-shelf system.** If the process is standard, the best answer is almost always a system like TeamSystem, Zucchetti or Odoo. I'll say it even though I don't profit from it: paying for a custom build to cover a flow a SaaS already handles is a waste. We dig into that fork in our [custom software](/en/software-development) work.

**An agent that works inside the sheet.** Often the smartest move isn't binning the sheet but putting an AI agent on it that reads it, validates the data, reconciles it and pushes it into downstream systems, without the team changing its habits. That's exactly what happened at [Numeraria](/en/case-studies/numeraria): agents handle quotes, hours and reconciliations end-to-end, and the team uses the system without even noticing. The result: half a month of work handed back to management. At [Navily](/en/case-studies/navily) the same approach on moderation and enrichment removed 70%+ of manual operational time.

**A custom build.** This is justified when the sheet encodes rules that are your competitive edge, and no SaaS replicates them without contortions. Here a custom system or agent makes sense, built around your process, not the other way round. We cover the integration patterns on [AI Agents](/en/ai-agents).

## The bit almost everyone forgets: people

Even the best system fails if the team keeps a "backup" Excel on the side. I've seen it dozens of times: the system gets bought, and six months later half the company is still working off the shadow sheet because "it's faster."

That's why digitising a process is half technology, half adoption. The system has to be more convenient than the sheet, not just more correct. And the team needs to be brought along, not just trained. That's the work we do with [AI Adoption](/en/ai-adoption): we don't kill Excel by decree, we make it useless by making the new flow easier.

## CTA

If you've had a specific spreadsheet in mind while reading this, do two things. First, [the check-up](/en/check-up): three minutes, no email, it tells you where your process maturity stands. Then, if you want an honest read on which of the three exits holds for your case, [let's talk](/en/contact): twenty minutes, no pitch. Sometimes the answer is "keep the spreadsheet." We'll tell you anyway.
