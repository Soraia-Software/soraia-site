---
title: "Migrating from an AI agent platform to a custom agent"
description: "Operational guide to migrating from an AI agent platform to a custom agent: exit signals, technical checklist, data to export and a no-downtime sequence."
pubDate: 2026-07-29
author: "Daniel Levis"
tags:
  - "ai agents"
  - "migration"
  - "operations"
keywords:
  - "ai agent platform migration"
  - "platform to custom ai agent"
  - "export ai agent data"
  - "ai platform lock-in"
readMinutes: 7
featured: false
h1: "Migrating from an AI agent platform to a custom agent: the operational checklist"
faq:
  - q: "What signals tell me it's time to migrate from platform to custom?"
    a: "Three concrete signals: the fee grows past the marginal cost of your own agent, the platform won't expose a data point or audit trail you need via API, or the vendor changes roadmap or pricing on a process that has become core. If you see two of three on a high-volume process, start the migration."
  - q: "What must I export before leaving an AI agent platform?"
    a: "Six things: prompts and instructions, workflow definitions, integration mappings, historical transaction data, decision logs and routing rules. If any item won't come out via export or API, that's your real exit cost: budget for it before you sign off the migration."
  - q: "Does the migration stall the process?"
    a: "It shouldn't. You migrate in parallel: the custom agent runs in shadow mode on the same triggers as the platform until the output matches. At Soraia first delivery is in <strong>4 weeks</strong> with 30 days of hypercare, then you shift traffic one flow at a time."
  - q: "How do I verify the custom agent is aligned before cutover?"
    a: "Start from a baseline measured on the platform (time, volume, cost per task, error rate) and use it as an acceptance test. Cutover happens only when the custom agent matches or beats that baseline on a real sample, not on a demo."
  - q: "What changes about data control after migration?"
    a: "With a custom agent the <strong>code is yours from day one</strong>, with EU hosting, art. 28 DPA and an immutable audit log included. Data and decision logs stay in your systems, not inside a third party's multi-tenant environment."
lang: "en"
gates:
  passedAt: 2026-07-16T14:47:12.995Z
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

You already have an AI agent running on a ready-made platform. It works. But the fee is climbing, the vendor changed the roadmap, or you need a data point the UI won't expose. The question now isn't "build or buy", it's a different one: **how do I get out without stopping the process?**

This is the part no platform seller puts on the slide: the actual mechanics of migration. Here's the checklist we use with COOs and CTOs when a process validated on a platform has become core and needs to move to a custom agent.

**Key takeaways:**
- Migrate only once the process has proven **core and high-volume**. If you haven't validated it yet, it's not the moment: measure first.
- The three exit signals: **fee exceeding marginal cost**, **a data point or audit trail you can't export**, **vendor roadmap or pricing change**.
- The real exit cost isn't the fee: it's what you **can't export**. Map the six artefacts before you sign.
- You migrate in **shadow mode**: the custom agent runs in parallel on the same triggers until its output matches the baseline.
- With Soraia first delivery is in **4 weeks** with 30 days of hypercare, and traffic shifts one flow at a time, with no downtime.

## First question: is it really time to migrate?

Migrating a process that will change in 3 months is a waste. The ready-made platform exists precisely for workflows still in flux: you reconfigure them in days. If you're still validating, stay where you are.

If instead you've already done the build-vs-buy framing and the process came out core, this article is the next step. If you haven't, start from the [guide to AI agents for companies](/en/guide/ai-agents-for-business) and come back once you have a baseline.

## The three signals that tell you to leave

You don't migrate on principle. You migrate when the numbers or the risk force it.

1. **The fee has passed the marginal cost of your own agent.** Platforms price per user, per task or per volume. At high volumes the curve bites. When the annual fee approaches or exceeds the infrastructure-and-tokens cost of a custom agent, you're paying a markup on every task.
2. **You need a data point or audit trail the UI won't expose.** GDPR and AI Act compliance (in force from August 2026) often require a granular audit log. If the platform won't export it, that's not a detail, it's a blocker.
3. **The vendor changed roadmap or pricing on a core process.** Your most important process can't depend on someone else's commercial decisions.

**Cut-off**: two of three signals on a high-volume process, start the migration.

## What to export: the six artefacts

Here's where the real exit cost lives. Before signing off any migration, check what comes out via export or API and what doesn't:

- **Prompts and instructions** for the agent.
- **Workflow definitions** (triggers, steps, conditions).
- **Integration mappings** (which systems, which fields).
- **Historical transaction data** processed.
- **Decision logs** (who/what decided, when, why).
- **Routing rules** to the human team.

Every item that won't come out clean is your real lock-in. It has to be rebuilt by hand, and it has to go in the budget. On a multi-tenant platform at least a couple of these live only inside the vendor: that's where the cost that wasn't on the slide hides.

## How to migrate without stopping operations

You don't switch the platform off on Friday and switch the agent on Monday. You migrate in parallel.

1. **Acceptance baseline.** Measure the process on the platform: time, volume, cost per task, error rate. This becomes the test the custom agent must pass.
2. **Shadow mode.** The custom agent receives the same triggers as the platform and produces output, but without acting. You compare the two outputs on a real sample, not a demo.
3. **Cutover per flow.** When the agent matches or beats the baseline on a flow, you move only that flow. Then the next. The platform stays on as a safety net until the last flow is migrated.
4. **Hypercare.** 30 days of close monitoring after each cutover, with rollback ready.

With a custom agent the **code is yours from day one**, with EU hosting, art. 28 DPA and an immutable audit log included: the same controls the platform didn't give you. It's the same model we apply to [custom software development](/en/software-development).

## When NOT to migrate

We'll say it straight:

- **Process not yet validated** -> stay on the platform, measure, decide later.
- **Low, generic volume** -> the fee is trivial, migrating doesn't pay off.
- **No measured baseline** -> without knowing what the process costs today you can't plan the migration or test its outcome. Measure first.

---

**Want to work out if your process is ready to leave the platform?** We put it in writing in the [AI Readiness Assessment €2.000](/en/ai-agents) (refunded if you proceed) or start with the [3-minute check-up](/en/check-up).
