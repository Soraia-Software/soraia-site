---
title: "Why automation projects fail in SMEs"
description: "Automation projects in SMEs rarely fail because of the technology. Here are the 4 change-management anti-patterns we see every time, and how to avoid them."
pubDate: 2026-07-02
author: "Daniel Levis"
tags:
  - "automation"
  - "change-management"
  - "ai agents"
  - "opinion"
keywords:
  - "why automation projects fail"
  - "change management automation SME"
  - "automation anti-patterns"
readMinutes: 6
featured: false
h1: "Why automation projects fail in SMEs (4 anti-patterns)"
faq:
  - q: "Why do most automation projects fail?"
    a: "Rarely because of the technology. They fail for change-management reasons: no measured baseline, an absent sponsor, elastic scope, and nobody owning the process after go-live. The technical part is almost always the least risky."
  - q: "Who should sponsor an automation project?"
    a: "One single person with the power to say no. Senior enough to defend the scope when extra requests arrive, and close enough to the process to notice whether the agent is actually working. If the sponsor delegates and disappears, the project dies slowly."
  - q: "How long does it take to know if an automation works?"
    a: "At least 30 days after go-live. Measuring earlier means measuring noise: the adoption curve needs to stabilise. At Soraia we include 30 days of hypercare for exactly this reason."
  - q: "What should you do before starting an automation project?"
    a: "Measure the baseline. Time 10-20 real tasks, understand where the time goes today, pick one single primary metric. Without it you can't know whether automation makes sense, nor prove it afterwards."
lang: "en"
draft: true
---

Every time an automation project fails, the first thing I hear is: *"the technology wasn't ready"*.

It's almost never true. In 90% of the cases we see, the reason automation projects fail is organisational, not technical. It's always the same 4 anti-patterns.

**Key takeaways:**
- Automation projects in SMEs fail for change-management reasons, not technology: the technical part is the least risky one.
- Without a timed baseline before you start, you can't prove whether the agent worked: every claim stays an opinion.
- Elastic scope kills more projects than any bug: every "while we're at it" pushes go-live further away.
- A project without one single, present internal sponsor dies slowly, regardless of software quality.
- Real measurement lands 30 days after go-live, not before: the adoption curve needs time to stabilise.

## Anti-pattern 1. No baseline (the original sin)

"Our people spend half their time on this task." Fine. How much is half? Across how many tasks? With how many errors?

If you don't have a timed answer, you don't have a baseline, you have an impression. And on an impression you can neither decide whether to automate, nor prove afterwards that it helped.

A real baseline is one week of work: you time 10-20 real tasks, split the time across phases, measure the outcomes. At Soraia we do this before every sprint, and it's why we can write the target into the contract with the "hours recovered or refund" guarantee. Without a baseline, that guarantee wouldn't exist.

## Anti-pattern 2. Scope that creeps ("while we're at it")

You start out to automate CV screening. By the third call someone says: "while we're at it, let's do interview scheduling too". Then job-description parsing. Then candidate follow-ups.

Each "while we're at it" is reasonable on its own. Added up, they push go-live back by months and turn a measurable project into an endless building site.

The rule we use: an agent does **one** thing in the first sprint, with a written perimeter. What's in, what's out, which exceptions the agent handles and which go to a human. The rest goes into a backlog, not into the first sprint. This is the core of our approach to [AI agents](/en/ai-agents): ship something live in 4 weeks, then expand.

## Anti-pattern 3. The ghost sponsor

Every automation project needs one internal person who owns it. Not a committee. One person.

Senior enough to say no when yet another extra request arrives (see anti-pattern 2), and close enough to the process to notice whether the agent is really working.

When the sponsor delegates to a colleague and disappears, this is what happens: decisions get stuck, nobody defends the scope, and at go-live nobody feels accountable for the result. The software works, the project doesn't.

That's why our work isn't purely technical. The [AI adoption](/en/ai-adoption) piece exists on purpose: getting the team to actually use what we build, with a sponsor who stays in the loop.

## Anti-pattern 4. Nobody owns the process after go-live

The agent goes live. The team cheers. Two months later a vendor changes the PDF format, the agent starts making mistakes, and nobody notices for weeks.

Automation isn't a project with an end date, it's a process that needs maintenance. You need someone who watches the logs, reviews the escalations, decides when to update the rules.

With [LIFTT](/en/case-studies/liftt), a deep-tech VC holding, we automated archiving, email dedupe and an auto-generated monthly report. The value wasn't just getting the agents running: it was defining who checks they keep running. An agent that runs without an owner degrades silently.

## Measurement lands at 30 days, not before

One last mistake, related: measuring too early. The first week after go-live is noise. People adjust, correct, give feedback. The adoption curve only stabilises after a few weeks.

That's why our sprints include 30 days of hypercare: the real window to see whether the primary metric was hit. Before then, any number is premature.

## When NOT to automate

I'll say it plainly, the same way I say it to clients on a call:

- **A process that changes in 3 months** → don't automate it now, you'd be building on sand.
- **No sponsor willing to spend time on it** → postpone, don't start.
- **Zero baseline and no appetite to measure one** → skip the project, you'll never know if it helped.

But if you have a stable, high-volume process and a person who owns it: then the technology is the easy part.

[Let's talk for 20 minutes](/en/contact) or [take the check-up](/check-up), and I'll tell you honestly whether the conditions are there.
