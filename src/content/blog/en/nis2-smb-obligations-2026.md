---
title: "NIS2 and your SMB in 2026: are you in the chain?"
description: "Your SMB isn't a direct NIS2 entity but you supply one? Here's what changes in 2026, what they'll ask you for, and where AI actually fits in."
pubDate: 2026-08-31
author: "Daniel Levis"
tags:
  - "nis2"
  - "compliance"
  - "cybersecurity"
  - "gdpr"
  - "ai-governance"
keywords:
  - "nis2 smb obligations 2026"
  - "nis2 supply chain"
  - "nis2 requirements"
  - "nis2 suppliers"
readMinutes: 7
featured: false
h1: "NIS2 and your SMB in 2026: are you in a regulated entity's supply chain?"
faq:
  - q: "Is my SMB a direct NIS2 entity?"
    a: "Directly, only if you fall within the directive's sectors and size thresholds (medium or large enterprise in areas like energy, transport, health, digital infrastructure, critical manufacturing). But even if you're NOT a direct entity, if you supply one you get security requirements passed <strong>down through its contracts</strong>. In 2026 that's the most common channel for an SMB."
  - q: "What will a NIS2 client ask me for?"
    a: "Typically: written security policies, access management, activity logs, an incident response plan with notification timelines, and contract clauses that extend its obligations to you. Often as a supplier security questionnaire or a contract annex. Answering takes documentation, not just goodwill."
  - q: "What does AI have to do with NIS2?"
    a: "Two things. First: if you run AI agents on your processes, those agents access data and systems, so they enter the security perimeter your NIS2 client wants governed. You need <strong>audit logs, access control and human oversight</strong>. Second: AI helps sustain the obligations (alert triage, documentation, monitoring), it doesn't create compliance on its own."
  - q: "Do I risk fines if I'm just a supplier?"
    a: "NIS2 fines hit the regulated entities, not their suppliers. But your real risk is contractual and commercial: <strong>losing the contract</strong> if you fail the client's security due diligence. For an SMB that hurts more than an abstract fine."
lang: "en"
gates:
  passedAt: 2026-07-25T07:05:11.702Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 8, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

NIS2 is not the AI Act. But it's landing on SMB desks through the same channel: a bigger client passing down its obligations.

Many Italian and European SMBs assume "not my problem, I'm too small". In 2026 that's often false, not because you're a regulated entity, but because **you're in the supply chain of one who is**.

**Key takeaways:**

- Most SMBs are NOT direct NIS2 entities (it takes a critical sector plus medium/large-enterprise size thresholds).
- But if you supply a regulated entity, its security requirements reach you **through the contract**: supplier questionnaires, clauses, requests for logs and incident response plans.
- Your risk isn't the NIS2 fine (that hits the regulated entity), it's **losing the contract** if you fail the due diligence.
- If you run AI agents on your processes, those agents access data and systems: they enter the security perimeter the client wants governed.
- The useful prep isn't a 6-month project: it's written policies, access control, logs, an incident plan. Documentation, not heroics.

## Are you a direct NIS2 entity, or one "by reflection"?

The directive classifies **essential** and **important** entities across a list of sectors (energy, transport, banking, health, digital infrastructure, public admin, critical manufacturing, waste, food, and others), with size thresholds that typically exclude micro and small firms.

Operational translation: if you're a 10-200 person SMB outside those sectors, **you're almost certainly not a direct entity**.

The point is the second channel. NIS2 requires regulated entities to manage **supply-chain security**. So your regulated client must ensure its suppliers (you) have an adequate security level too. And it does so the easiest way for itself: **it writes it into the contract**.

## What a regulated client will actually ask for

You won't get a letter from the State. You'll get a supplier security questionnaire, or a contract annex, with requests like:

- Documented security and access-management policies.
- Activity logs on the systems touching its data.
- An incident response plan with **notification timelines** (NIS2 imposes tight timelines on the regulated entity: if an incident starts with you, it needs to know fast).
- Clauses that extend its obligations to you.

Fail to answer and you don't get a fine. You risk dropping off the supplier shortlist. For an SMB, that's the real cost.

## Where AI actually fits

Two concrete links, no hype.

**First: your AI agents are in the perimeter.** If you've automated ticket triage, reconciliations or screening with agents that access data and systems, those agents are part of your security surface. A careful NIS2 client will ask how you govern them. That's why Soraia sprints include by default an **immutable audit log on every agent decision**, access control and human oversight on critical cases: not a flourish, exactly what you need to show in due diligence. We cover this on our [Customer & Compliance Automation](/en/customer-support) page.

**Second: AI helps sustain the obligations, it doesn't invent them.** Automatic triage of security alerts, generated and maintained documentation, monitoring: these are repetitive tasks where an agent cuts the load. But accountability stays human. "AI that handles compliance by itself" is a shortcut that doesn't exist.

## When you do NOT need a project

Straight talk: if none of your clients is a NIS2 entity, and you don't expect one, **don't launch a cybersecurity programme in the name of a directive that doesn't touch you**. Do the basics (backups, access, MFA, a minimal incident plan) and focus on the business.

The project makes sense when a regulated client is already sending you the questionnaire, or when you're building AI agents on sensitive data and want the governance to survive an audit. Then it's worth treating agent security as part of the build, not a patch afterwards. Same principle we apply to [custom software development](/en/software-development): security and logs inside the project, your code from day one.

If you're training the team to use AI in a safe, traceable way, that's the kind of governance we also cover in [AI Adoption](/en/ai-adoption) programmes.

## Next step

You don't need a 6-month consultancy to know where you stand. You need an honest map: are you a regulated entity, in the chain of one, or out of scope? And if you use AI agents, do they hold up to a due-diligence request?

[Let's talk](/en/contact) for 20 minutes, or take the [check-up](/check-up). We'll tell you which scenario you're in, without selling a project you don't need.
