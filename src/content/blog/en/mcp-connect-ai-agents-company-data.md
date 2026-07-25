---
title: "Model Context Protocol (MCP): AI agents and company data"
description: "What the Model Context Protocol is, why it matters for your company, and how to connect an AI agent to your data without opening holes. Non-technical guide."
pubDate: 2026-08-28
author: "Davide Silvestri"
tags:
  - "ai agents"
  - "mcp"
  - "security"
  - "integration"
  - "how-to"
keywords:
  - "model context protocol company"
  - "MCP AI agents"
  - "connect AI agent company data"
  - "AI agent security"
readMinutes: 7
featured: false
h1: "Model Context Protocol (MCP): how to connect an AI agent to your data without opening holes"
faq:
  - q: "What is the Model Context Protocol in plain terms?"
    a: "It is an open standard that defines <strong>how an AI agent talks to your systems</strong> (CRM, ERP, database, files). Instead of writing a custom integration for each system, you expose an MCP server that declares what the agent can read and what it can do. It is the equivalent of a standard socket instead of a thousand different adapters."
  - q: "Is MCP safe for company data?"
    a: "MCP itself is neither safe nor unsafe: it moves the problem to the right layer. Safety depends on what you expose in the MCP server, with which permissions and which audit. Done right, an MCP server gives <strong>less</strong> attack surface than ten hand-written integrations, because it centralises authentication, scope and logging in one place."
  - q: "Do I have to use MCP to build an AI agent?"
    a: "No. For an agent with 1-2 simple, stable integrations, a direct connector works fine and costs less. MCP pays off when you expect <strong>multiple agents accessing the same systems</strong>, or multiple systems connected to the same agent. It is an architecture choice, not an obligation."
  - q: "Is MCP compatible with GDPR and the AI Act?"
    a: "MCP is a technical protocol, compliance depends on how you implement it. The advantage is that by centralising access it becomes easier to apply data minimisation, an art. 28 DPA with the vendor, and an immutable audit log, three things GDPR and the AI Act (in force since August 2026) require you to demonstrate."
lang: "en"
gates:
  passedAt: 2026-07-25T07:02:12.416Z
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

You have been told the AI agent "connects to your data". Fine, but *how*? And more to the point: who decides what that agent can read, what it can change, and who answers if it reads something it should not have?

The **Model Context Protocol** (MCP) is the emerging standard that answers these questions. Let me explain it without jargon, because it is an architecture and security decision, not a detail to leave "to the developers".

**Key takeaways:**
- MCP is an open standard that defines **how an AI agent accesses your systems** (CRM, ERP, database, files), replacing ad-hoc integrations with a common "socket".
- It is neither safe nor unsafe on its own: it moves security to **one central point** where you decide permissions, scope and audit once instead of ten times.
- It pays off when you have **multiple agents on the same data** or multiple systems connected to the same agent. For 1-2 simple integrations, a direct connector costs less.
- The hole is never the protocol: it is **exposing too much** (write access where only read was needed, no logging, broad credentials).
- Done right, an MCP server gives **less attack surface** and makes it easier to demonstrate GDPR and AI Act compliance.

## What MCP is, without the jargon

Imagine each of your systems (the ERP, the CRM, the invoices folder) has a door. Until now, to let an AI agent in, you built a custom key for each door: one piece of code for the ERP, one for the CRM, one for the file server. Ten doors, ten keys, ten points that can break or be forced.

MCP says: let us put a **standard lock** on every door. The agent speaks one language; each system exposes a small "MCP server" that declares two things: **which data the agent can read** and **which actions it can perform**. Nothing more.

It is an open protocol, so you are not locked into a single AI vendor. The same MCP server you use today with a Soraia agent works tomorrow with another model or another agent.

## Why it matters for your company

Three concrete reasons, in order of importance.

**1. You reduce the attack surface.** Ten hand-written integrations mean ten places where someone copied a credential into a file, granted more permissions than needed, forgot to log. An MCP server centralises authentication, scope and logging. One place to guard, not ten.

**2. You scale without rewriting.** The second agent you want to build (maybe on finance after the one on recruitment) reuses the same MCP servers. You do not pay for the integration from scratch again.

**3. You make compliance demonstrable.** GDPR requires data minimisation and traceability; the AI Act, in force since August 2026, requires knowing *how* a system arrived at an output. With access centralised in MCP, applying these principles becomes a configuration, not archaeology across ten different codebases.

## How to connect an agent to data without opening holes

The hole is never MCP itself. It is **exposing too much**. Here are the four principles we apply in every [AI agents sprint](/en/ai-agents).

### 1. Least privilege, always

The agent gets the minimum permissions for its task. If it must read invoices to generate a report, it has **read-only** access to the invoices folder. That is it. No write access, no access to other folders. Every extra permission is an extra hole.

### 2. Explicit scope, not "the whole database"

A badly built MCP server exposes the entire ERP and lets the agent decide. A well-built one exposes only the **entities and fields that are needed**: "invoices from the last 90 days", not "the full customer table with IBANs and sensitive data". Scope is defined upfront, during scoping.

### 3. Immutable audit log on every call

Every time the agent reads or writes via MCP, a trace remains: what it asked, what it received, when. It is the same immutable audit log we include by default and that you need to answer an auditor or a client on "why the AI did X".

### 4. Human in the loop on actions that count

Read via MCP: the agent proceeds on its own. Write that impacts something (send, approve, change an accounting record): it goes to a human or stays under a defined threshold. As we do in [finance](/en/finance) agents, where the agent extracts and reconciles but the human validates anomalies.

## When you do NOT need MCP

I will say it plainly, because we do not sell complexity where it is not needed.

- **Agent with 1-2 simple, stable integrations** → a direct connector works fine and costs less. MCP would be over-engineering.
- **Systems that will not change** → if you connect a single system you have not touched in years, the standard adds a layer that does not pay off.
- **No intention to scale to more agents** → the value of MCP is in reuse. A single agent, forever, does not justify it.

MCP pays off when you expect **multiple agents on the same data** or multiple connected systems. That is exactly the case of someone starting with one agent and adding two or three more over the following 12 months. If you are in this scenario, the right architecture today saves you months tomorrow, and it is the kind of decision we assess during scoping alongside [custom software development](/en/software-development).

## The point

MCP is not magic and it is not an obligation. It is a standard lock that, used well, gives you fewer holes and more room to scale. Used badly (broad access, no log), it is as dangerous as any integration built in a hurry. The difference is made by whoever defines the scope, not by the protocol.

**Want to know if it makes sense for your case?** [Let's talk](/en/contact) for 20 minutes, or start with the 3-minute [check-up](/check-up).
