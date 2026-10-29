---
title: "Who owns your AI agent? Code ownership & lock-in"
description: "Before signing an AI agent contract, ask who owns the code and data. The 5 questions to avoid vendor lock-in, from the founder of an AI agency."
pubDate: 2026-11-02
author: "Daniel Levis"
tags:
  - "vendor lock-in"
  - "custom software"
  - "ai agents"
  - "contracts"
keywords:
  - "vendor lock-in ai software"
  - "software code ownership"
  - "ai agent ownership"
  - "ai lock-in"
readMinutes: 6
featured: false
h1: "Who owns your AI agent? Code ownership and vendor lock-in"
faq:
  - q: "Who owns the code of a custom-built AI agent?"
    a: "It depends entirely on what the contract says. By default, absent a clause, the code stays with the vendor under copyright law. You must demand an explicit clause transferring ownership of both code and data. At Soraia, <strong>code and data stay with the client from day one</strong>."
  - q: "What happens to my data if I switch vendors?"
    a: "If your data lives only on the vendor's infrastructure and you have no export clause, you risk being unable to take it with you. Before signing, ask: export format, delivery timeline, and a reversibility clause that forces the vendor to hand everything over if you leave."
  - q: "Is a monthly fee automatically vendor lock-in?"
    a: "No. A fee is lock-in only if, by stopping payment, you lose access to code and data. A fee for development and maintenance hours is fine, as long as you can stop it <strong>after just one month</strong> and still own what was built. Separate the service-fee from the hostage-fee."
  - q: "How do I check there's no lock-in before signing?"
    a: "Read three clauses: intellectual property (who gets the code), reversibility (data export and documentation on exit), and technical dependencies (which proprietary platforms the system needs to run). If any of these is missing or vague, it's a lock-in signal."
lang: "en"
gates:
  passedAt: 2026-10-25T08:24:36.275Z
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

The question almost no CEO asks before signing an AI agent contract is also the most expensive to get wrong: *who owns the code you're paying for?*

It always surfaces later, usually 18 months in, when you want to switch vendors or bring it in-house and find out you can't. That's the moment **vendor lock-in** stops being an abstract word and becomes an invoice.

**Key takeaways:**

- By legal default (copyright law), the code of custom software stays with the vendor: client ownership has to be written down, never assumed.
- Lock-in isn't the monthly fee itself, it's being unable to walk away with your code and data in hand. Separate the service-fee from the hostage-fee.
- Three clauses to read before signing: intellectual property, reversibility (data export), and technical dependencies on proprietary platforms.
- At Soraia, **code and data stay with the client from day one**, and the first month is satisfied-or-refunded, even for just one month.
- An AI agent built on proprietary no-code platforms you can't export is lock-in dressed up as speed.

## Why "custom" code isn't automatically yours

Counterintuitive but legally clear: if you pay a vendor to develop software and the contract has no explicit transfer clause, **the intellectual property stays with the developer**. Copyright law protects whoever writes the code, not whoever commissions it, unless agreed otherwise in writing.

That means you may have spent tens of thousands of euros and, on paper, hold only a usage license. Not the source code. Not the right to have someone else modify it.

The clause to demand reads like this: *"all intellectual property rights in the developed code and processed data are transferred to the Client."* If the vendor hesitates, you have your answer.

## The fee isn't the enemy, the hostage-fee is

Let's clear this up, because the confusion here is costly. A monthly fee **is not** vendor lock-in by itself.

We ourselves work in monthly Sprints with a fixed quota (from €5,000/month). It's a service-fee: you pay for development, maintenance and continuous improvement. You can stop even after one month and still own everything built so far.

The hostage-fee is something else: you stop paying and the system shuts down, the data sits on the vendor's server, you've never seen the code. That's lock-in.

The question that separates the two: **"if I stop paying you tomorrow, what's left in my hands?"** If the answer is "source code, exported data, documentation," it's a healthy fee. If it's "nothing," run.

## No-code platforms: speed today, cage tomorrow

Here I'm touching a raw nerve, our own included. Many AI agents get built fast on proprietary no-code platforms. You launch quickly, it's cheap at first.

The trouble comes later: that automation logic **lives only inside that platform**. You can't export it, can't take it away, can't run it elsewhere. You built on rented land.

For an agent touching core processes (candidate screening, reconciliations, ticket triage) that's a structural risk. If the platform changes pricing, gets acquired or shuts down, your process stops. That's why, when the process is critical, you need code that runs on your own (or portable) infrastructure, not a flow trapped in a third-party tool. It's one of the reasons we shifted our center of gravity toward [custom software development](/en/software-development) with owned code.

## The 5 questions to ask before signing

1. **Who gets the intellectual property of the code?** There must be an explicit transfer clause to the client.
2. **Where does the data live and how do I export it?** Demand format, timing and a reversibility clause.
3. **Which proprietary platforms does the system run on?** More non-exportable dependencies, more lock-in.
4. **If I stop paying, what stays mine?** The answer must be "everything that was built."
5. **Who can maintain the code after you?** If only the original vendor can touch it, you're tied for life.

If even one answer is vague, it's not a detail to fix later. It's a signal.

## When lock-in is an acceptable risk

To be honest: total code ownership isn't always the priority. If you're using a standard vertical SaaS (a CRM, an ERP), lock-in is implicit and often reasonable, you pay to maintain nothing. That's fine, as long as you know it and can export your data.

It changes when the AI agent embeds **your specific process**, your operational edge. There, handing ownership to the vendor means handing over your know-how. Our model for [custom AI agents](/en/ai-agents) exists precisely for this: we automate your process, but the result stays yours.

Before weighing all this, you need to know what you're actually buying: our [guide to AI consulting costs](/en/guide/ai-consulting-costs) explains how to read a quote without being surprised by hidden line items.

## In practice

Vendor lock-in isn't fought with suspicion, it's fought with three clauses read carefully before signing. Ownership, reversibility, dependencies. Ask them out loud in the first call: how the vendor reacts is already half the answer.

**Want an honest take on your case?** [Let's talk for 20 minutes](/en/contact), no pitch. Or take the [3-minute check-up](/check-up).
