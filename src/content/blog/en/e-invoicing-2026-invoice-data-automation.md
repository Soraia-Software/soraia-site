---
title: "E-invoicing 2026: stop re-typing invoice data by hand"
description: "Since 2024 e-invoicing has covered all flat-rate taxpayers in Italy too. Here is how to automate invoice data extraction and reconciliation with AI agents."
pubDate: 2026-07-06
updatedDate: 2026-11-05
author: "Daniel Levis"
tags:
  - "finance"
  - "automation"
  - "e-invoicing"
  - "how-to"
keywords:
  - "invoice data automation"
  - "e-invoicing 2026"
  - "invoice data extraction"
  - "automated reconciliation"
readMinutes: 6
featured: false
faq:
  - q: "Is e-invoicing mandatory for flat-rate taxpayers in Italy too?"
    a: "Yes: since 1 January 2024 the e-invoicing obligation via the SdI exchange system has applied to all flat-rate (forfettario) taxpayers as well, under <a href='https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2022-04-30;36'>Article 18 of Decree-Law 36/2022</a>. In practice almost all your suppliers and clients issue XML invoices: the volume of structured data to handle is high, and so is the chance to automate it without manual re-entry."
  - q: "Doesn't the invoice XML already remove the data entry?"
    a: "No. The XML is structured, but it rarely lands clean in your accounting system: ledger codes, cost centres and matching against orders and contracts stay manual. An AI agent reads the XML, applies your coding rules and proposes reconciliation, leaving only exceptions to a human."
  - q: "Does an agent that touches invoices count as high-risk under the AI Act?"
    a: "No, if it stays internal. An agent that extracts data, validates VAT and proposes reconciliations is minimal risk under the AI Act: it makes no autonomous decisions affecting people. The main duty is internal transparency. You still need a GDPR art. 28 DPA and an audit log, which we include by default."
  - q: "How long until a first invoice agent is live?"
    a: "The first production release ships in 4 weeks, and one month of change requests is included after release. We spend the first week on a timed baseline: without knowing what processing one invoice costs today, we cannot guarantee the saving."
lang: "en"
draft: false
---

> **What is invoice data automation?** It is the use of an AI agent that reads the invoice XML and does the work done by hand today: re-entering data into the accounting system, coding to accounts and cost centres, and three-way matching between invoice, order and bank movement. The human moves from re-typing everything to handling only the exceptions.

Since 1 January 2024 the Italian e-invoicing obligation via the SdI exchange system has applied to all flat-rate (forfettario) taxpayers too, under [Article 18 of Decree-Law 36/2022](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2022-04-30;36); the operating rules are on the [Italian Revenue Agency's portal](https://www.agenziaentrate.gov.it/portale/web/guest/aree-tematiche/fatturazione-elettronica). Operational translation for whoever runs your admin: almost every inbound and outbound invoice is a structured XML file.

Sounds like good news. It only is if you stop treating that XML like a PDF to re-type.

**Key takeaways:**
- Since 2024 e-invoicing has been mandatory for all flat-rate taxpayers too: almost every invoice is structured XML, and the monthly volume to handle stays high.
- Structured XML does NOT remove data entry: ledger codes, cost centres and order matching stay manual work.
- **Invoice data automation** with an AI agent moves the human from re-entry to handling exceptions only.
- An internal agent for extraction and reconciliation is minimal risk under the [AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj): no autonomous decisions about people.
- With [Numeraria](/en/case-studies/numeraria), a payroll and accounting firm, AI agents gave management back roughly half a month.

## Why the XML alone won't save you from data entry

The most common mistake is thinking that because the invoice already arrives electronic, the manual work disappears. It doesn't.

The XML says what is in the invoice. It does not say:
- Which **cost centre** or project the line should be charged to.
- Which **order or contract** it matches (three-way matching).
- Which **accounting code** to apply under your internal rules.
- Whether the amount is **consistent** with what was agreed or is an anomaly to flag.

This is the work eating your admin team's days today. Extending the obligation to flat-rate taxpayers did not reduce it: it multiplied it, because the number of counterparties issuing in structured format grew.

## What an AI agent actually does with invoices

Here the difference between ChatGPT answering and an agent executing matters. An agent receives a trigger (new invoice in a folder or via SdI), does the task, acts on your accounting system and notifies only when a human is needed.

An **invoice data automation** agent does three things:

### 1. Structured extraction
It reads the XML (and attached PDFs or leftover paper invoices via OCR), extracts lines, VAT, withholdings, order references. It normalises everything into the format your accounting system (TeamSystem, Zucchetti, Odoo) expects.

### 2. Coding with your rules
It applies your posting rules: supplier X, line with this description, always goes to this account and this cost centre. Not generic best-practice rules, yours.

### 3. Reconciliation and flags
It matches the invoice against the order and the bank movement. If everything ties out, it proposes the entry. If there is an anomaly (wrong amount, missing order, duplicate invoice), it queues it for a human with the explanation.

The human no longer re-types. They review exceptions. It is the same principle we apply across the [Finance & Document Automation](/en/finance) cluster: reconciliations, extraction, recurring reports.

## The Numeraria case: half a month given back

[Numeraria](/en/case-studies/numeraria) is a payroll and accounting firm. The problem was exactly this: too much management time absorbed by repetitive tasks on quotes, hours and reconciliations.

With AI agents built on their real processes, the published result is roughly **half a month given back to management**. No magic: measured baseline, clear scope, one primary metric, reconciliation automated where the rules were stable.

## When NOT to automate invoices

I'll tell you before selling you a sprint:
- **Low volumes** (a few dozen invoices a month) → a good import into the accounting system plus a few rules is enough. No agent needed.
- **Posting rules that change every quarter** → building logic on unstable rules is waste. Stabilise the process first.
- **Zero baseline** → if you don't know what processing an invoice costs today, you can't measure whether the agent makes sense. That's week one of our sprint, not an extra.

## How to start, in practice

1. Time a sample of 10-20 real invoices: how long between extraction, coding and reconciliation.
2. Isolate the stable perimeter: recurring suppliers with clear rules, which usually make up most of the volume.
3. Build an agent on that perimeter, with the human on exceptions.
4. Measure at 30 days against the baseline.

First delivery is in 4 weeks, with a ["first month satisfied or refunded" guarantee](/en/pricing): if the first month doesn't convince you, we refund it or keep working for free until you're satisfied.

---

**Want to know if your invoices can be automated?** [Let's talk](/en/contact) for 20 minutes with the CEO, or [take the check-up](/en/check-up) in 3 minutes.
