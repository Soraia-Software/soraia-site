---
title: "GDPR and AI agents on company data: what to fix first"
description: "An AI agent reading customer or candidate data processes personal data. Legal basis, art. 28 DPA and DPIA: the GDPR checklist to close before you switch it on."
pubDate: 2026-09-14
author: "Daniel Levis"
tags:
  - "gdpr"
  - "compliance"
  - "ai agents"
  - "how-to"
keywords:
  - "gdpr ai agent company data"
  - "art 28 dpa ai"
  - "data protection ai agents"
  - "dpia ai agent"
readMinutes: 7
featured: false
h1: "An AI agent reads your customer data: what GDPR wants before you switch it on"
faq:
  - q: "Does an AI agent that reads customer emails process personal data?"
    a: "Yes. The moment the agent accesses names, emails, phone numbers, CVs, tickets or invoices tied to individuals, it processes personal data under GDPR. You need a documented <strong>legal basis</strong> (usually legitimate interest or contract performance) and an up-to-date record of processing."
  - q: "Do I need a DPA if I use an external provider for the AI agent?"
    a: "Yes. If the provider (Soraia, OpenAI, Anthropic or others) processes data on your behalf, it is a processor and you need a <strong>Data Processing Agreement under art. 28 GDPR</strong>. At Soraia the DPA is included in every sprint contract, along with a commitment not to use your data to train the LLMs."
  - q: "When do I need a DPIA for an AI agent?"
    a: "When processing is large-scale, involves special categories of data, or has a significant effect on people, for example automated CV screening. In those cases a data protection impact assessment (DPIA) is mandatory and must be done before go-live."
  - q: "Can the regulator shut down an AI agent in production?"
    a: "Yes: the supervisory authority can order suspension of the processing under art. 58(2)(f) GDPR. The practical risk, though, is not the theoretical maximum fine: it is having to switch the agent off because you cannot explain which legal basis covers it, where the data goes, and who supervises the decisions. Closing those three points first removes the main exposure."
lang: "en"
gates:
  passedAt: 2026-08-25T05:12:40.427Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8.5, pass: true }
    - { name: "brand-voice", score: 9, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

On the first call the technical question is always the same: *"can the agent read the customer inbox?"*. The right question comes later, and the DPO asks it: *"and are we GDPR-compliant if it does?"*.

Honest answer: almost always yes, but only if you close three things before you switch the agent on. Not after. Leave them open and the agent stays a risk that someone eventually asks you to shut down.

The EU AI Act (covered in our [dedicated guide](/en/guide/ai-act-for-business)) answers "what kind of system is this". GDPR answers "can you process this data with this system". Two different lenses. This post is about the second.

## What GDPR requires before switching on an AI agent

- An AI agent that reads emails, CVs, tickets or invoices tied to individuals **is processing personal data**: full GDPR applies.
- Before go-live you need three things: a documented **legal basis**, an **art. 28 DPA** with every provider that touches the data, and a **DPIA** where the processing is high-impact (e.g. CV screening).
- The agent provider (including whoever supplies the LLM) is a **data processor**: without a DPA you are exposed.
- The real risk is not the theoretical maximum fine, it is having to **switch the agent off** because you cannot explain legal basis, data flow and human oversight.
- At Soraia the art. 28 DPA, an immutable audit log and a no-training LLM commitment are included by default in every sprint, because without them we could not work in regulated sectors.

## Step 1. Establish whether the agent processes personal data (almost always yes)

The moment the agent accesses a name, an email, a phone number, a CV, a ticket or an invoice tied to an individual, it is processing personal data. It does not matter that it is "read only" or that the output stays internal.

So the practical question is not *whether* GDPR applies, but *which* processing you are doing. Map three things:

- **Which data** the agent touches (customer emails, candidate data, payment data).
- **For what purpose** (ticket triage, CV screening, invoice reconciliation).
- **Where** input and output end up (in your CRM, in a log, sent to the provider's LLM).

This goes into your record of processing activities. It is the foundation for everything else.

## Step 2. Choose and document the legal basis

No processing without a legal basis. For AI agents in SMEs the two most common are:

- **Contract performance**: e.g. a [customer support](/en/customer-support) agent handling tickets from active customers.
- **Legitimate interest**: e.g. lead enrichment or internal triage, backed by a written legitimate interest assessment.

Consent is rarely the right basis and best avoided where alternatives exist, because it is revocable and fragile. For candidate screening the basis is usually pre-contractual measures, but a transparency duty kicks in: the candidate must know an automated system is involved.

**Rule of thumb**: if you cannot state the legal basis of a given processing activity in one line to an auditor, the agent is not ready for production.

## Step 3. Close the art. 28 DPA with every provider

If an external provider processes data on your behalf, it is a data processor. This applies both to whoever builds the [agent](/en/ai-agents) and to whoever supplies the underlying LLM.

You need a **Data Processing Agreement under art. 28 GDPR** covering at least:

- purpose and duration of the processing;
- security measures;
- any sub-processors (LLM providers are sub-processors);
- **no training of the models on your data**;
- data localisation (EU where required).

At Soraia the art. 28 DPA is included in every sprint contract, with an explicit commitment not to use client data to train LLMs and EU hosting where needed. It is not a favour: without it we could not even take on recruitment or finance projects.

## Step 4. Run the DPIA where the impact is high

A data protection impact assessment (DPIA) is mandatory when processing is large-scale, involves special categories of data, or has a significant effect on people. **CV screening** almost always qualifies. An agent reconciling internal invoices usually does not.

The DPIA must be done **before** go-live and kept alive. In our sprints for regulated sectors we deliver it as a deliverable, together with the immutable audit log of every agent decision, which is what lets you answer "why did the system do X".

## When GDPR tells you NOT to switch the agent on (yet)

We say it on the call, no dancing around it:

- **You cannot state the legal basis** for that processing: stop and fix it first.
- **The LLM provider offers no acceptable DPA**, or trains on your data: change the setup, do not switch it on.
- **Special categories of data** (health, opinions, sensitive data) without reinforced safeguards: that needs a longer path, not a standard sprint.

In these cases the correct answer is not "let's sell anyway". It is fix the foundations or wait.

If you want to know which scenario you fall into, we check it case by case: [let's talk](/en/contact) for 20 minutes, or start with the 3-minute [check-up](/en/check-up).
