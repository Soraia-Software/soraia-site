---
title: "How to measure the ROI of an AI agent: a framework and baselines that actually work"
description: "Without a baseline, every claim that 'AI saved us X hours' is just an opinion. The framework Soraia uses with clients to measure ROI honestly."
pubDate: 2026-05-15
author: "Daniel Levis"
tags: ["ai agents", "roi", "metrics", "methodology"]
readMinutes: 6
featured: true
lang: "en"
---

The most important question a CEO asks before signing off on an AI sprint isn't "how much does it cost", it's "**how will I know it's working**".

And this is where most AI integrators go quiet, because measuring the ROI of an agent is genuinely hard if you haven't laid the right groundwork first.

This is the framework we use at Soraia on every sprint. Four pieces: baseline, scope, metric, window.

## 1. The baseline that does NOT work

"My recruiters spend half their time reading CVs." That is NOT a baseline.

It's an opinion shared in a meeting. It hasn't been measured. It can't be replicated. It can't be disproved.

A real baseline requires:
- **Timed observation** across a sample of 10–20 real tasks
- **Time distribution** broken down by phase (reading, evaluation, data entry)
- **Measured outcome** (CVs rejected / advanced / errors flagged)

We've done this across 8–12 Soraia clients. It takes one week. It unlocks everything.

## 2. A clear scope

The agent does one thing, not everything. Define:

- **What's in scope**: e.g. "inbound CV screening from Bullhorn"
- **What's out of scope**: e.g. "no executive search (requires senior judgement)", "no referred candidates"
- **Which exceptions the agent handles** vs. which ones escalate to a human

Seems obvious. It isn't. 70% of AI projects fail because scope turns elastic.

## 3. The primary metric (one only)

**One primary metric** per sprint. Everything else is secondary.

Real Soraia examples:
- Recruitment: **hours/recruiter/week recovered** on screening
- Accounting: **% of invoices processed without human intervention**
- Customer Support: **first-response time in minutes**

Multiple metrics = no metric. Pick one, measure before and after, decide whether it worked.

## 4. The measurement window

- **Pre-sprint (1 week)**: timed baseline
- **Week 1 after deploy**: shadow mode, the agent runs but a human reviews everything
- **Weeks 2–4**: live, with escalation paths active
- **30-day hypercare period**: the real window for the final measurement

Measuring before day 30 means measuring noise. The adoption curve needs time to stabilise.

## The guarantee that follows from all this

When the four pieces above are in place, you can make a concrete ROI commitment. That's exactly what we do with our **"hours recovered or your money back" guarantee**: the primary metric target is written into the contract, measured against the baseline we define together, and evaluated 30 days after go-live.

If we don't hit the target, we work for free or refund the sprint. Not because we're being heroic, because we've built the measurement system that makes it verifiable.

---

**Want to see how this plays out for your situation?** [Take the check-up](/en/check-up) (3 minutes, no email required) or [talk to us directly](/en/contact).
