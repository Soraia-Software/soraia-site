---
title: "Claude Code for business: internal tools in days"
description: "How a coding agent like Claude Code builds your internal tools in days. What it does well, where a human is needed, and when to hand it to a team."
pubDate: 2026-09-04
author: "Daniel Levis"
tags:
  - "claude code"
  - "custom software"
  - "coding agent"
  - "how-to"
keywords:
  - "claude code business"
  - "coding agent"
  - "internal tools"
  - "custom software"
readMinutes: 6
featured: false
h1: "Claude Code for business: how a coding agent builds your internal tools in days"
faq:
  - q: "Can Claude Code replace a developer?"
    a: "No. It speeds up someone who already knows what to build and can read the code it produces. For an internal tool touching sensitive data or integrating with your ERP, you need a person to set architecture, permissions and testing. The coding agent cuts hours, not judgment."
  - q: "Is it safe to give a coding agent access to our code?"
    a: "It depends on the setup. Use it in an isolated environment, with limited permissions and no production credentials. For GDPR-bound sectors you need a <strong>DPA under art. 28</strong> with the vendor and no model training on your data. At Soraia this is included in the contract."
  - q: "How much does an internal tool built with Claude Code cost?"
    a: "The coding agent slashes writing hours, not the whole cost. At Soraia Scoping is ~<strong>€2,000</strong> (refunded if you proceed) and a Build Sprint runs <strong>€10-50k</strong>, with first release in 4 weeks. The code is yours from day one."
  - q: "Claude Code or an off-the-shelf SaaS?"
    a: "If a SaaS covers the process at a reasonable 2-3 year cost, buy it. A coding agent wins when the process is core, specific and poorly served by market tools. Build vs buy is still the first question."
lang: "en"
gates:
  passedAt: 2026-08-25T04:39:23.727Z
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

Every CTO has a list of internal tools they needed yesterday: a dashboard joining two systems, a reconciliation tool, a small panel for the ops team. They stay at the bottom of the backlog because the dev team is busy on the product.

A coding agent like Claude Code changes the economics of that list. But not the way LinkedIn tells you.

**Key takeaways:**
- A coding agent writes, tests and iterates code from plain-language instructions: it compresses days of work into hours on well-defined internal tools.
- It does not replace a developer. It speeds up someone who knows what to build and can read the code it produces.
- The real gain is on low-risk internal tools (dashboards, reconciliation tools, scripts) more than on client-facing software.
- The bottleneck shifts: from "writing code" to "defining scope, permissions and tests well".
- With sensitive data you need an isolated environment, limited permissions and a <strong>DPA under art. 28</strong> with the vendor. Not a detail.

## What a coding agent actually does

Claude Code is not a chatbot suggesting snippets. It is an agent that operates on the filesystem: it reads your repository, writes files, runs commands, launches tests, reads errors and fixes them. You describe what you want, it iterates.

On a well-defined internal tool, this compresses days into hours. A panel that reads two APIs, cross-references the data and shows it in a filterable table: a week of part-time work becomes an afternoon, if whoever drives it knows what they want.

The keyword is **internal tool**. Low risk, known users, no exposure to external customers. That is where the value/risk ratio is best.

## Where a coding agent shines, and where it does not

Where it works well:
- Dashboards joining data from different systems (CRM + ERP + spreadsheets)
- Reconciliation, data-cleaning and one-off migration scripts
- Internal tools for the ops team (approvals, queues, notifications)
- Prototypes to validate before a serious build

Where caution is needed:
- Software touching customer or candidate data (GDPR, AI Act)
- Integrations with the production ERP (TeamSystem, Zucchetti, Odoo)
- Anything with payment logic or legally binding output

The rule: the closer the code gets to production and sensitive data, the more the coding agent must stay in an isolated environment supervised by someone who reads what it produces.

## The bottleneck moves, it does not disappear

Here is the part nobody says. When writing code becomes cheap, the cost shifts onto three things:

1. **Defining scope.** A coding agent executes an ambiguous instruction to the letter and builds the wrong tool very fast. Vague scope is enemy number one, exactly as in a [custom software](/en/software-development) project.
2. **Permissions and security.** Credentials, data access, what the agent may touch. Decide it upfront, not after.
3. **Testing and maintenance.** Generated code must be tested and maintained like any other. A tool nobody understands in six months is debt, not savings.

It is the same principle behind our [AI agents](/en/ai-agents): automatic execution is powerful only when the perimeter is clear and a human validates the edge cases.

## How we use it at Soraia

The tech stack is instrumental: what we deliver is a measurable result, not the tool we build it with. A coding agent is one of the levers that lets us ship the first release in **4 weeks** instead of months.

The model stays the same as custom development: Scoping ~€2,000 (refunded if you proceed), Build Sprint €10-50k, your code from day one, no lock-in. The coding agent cuts writing hours. It does not cut scoping, testing, data governance, or the "you pay only if it works" guarantee.

## When you do NOT need an external team

Straight talk:
- If you already have a capable developer and a simple internal tool, hand them Claude Code and let them work. You do not need us for an afternoon's tool.
- If a SaaS covers the process at a reasonable 2-3 year cost, buy it. The [build vs buy choice](/en/software-development) comes first.
- If the process will change in three months, do not freeze it in code.

You need an external team when the tool touches sensitive data, integrates with the production ERP, or when you do not have someone in-house to set architecture and security.

---

Got a list of internal tools stuck in the backlog? [Let's talk](/en/contact): 20 minutes, we honestly tell you what you can build yourself with a coding agent and what makes sense to hand us.
