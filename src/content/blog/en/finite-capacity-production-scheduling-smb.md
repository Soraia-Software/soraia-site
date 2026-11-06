---
title: "Finite capacity scheduling: production planning off Excel"
description: "Finite capacity scheduling for manufacturing SMEs: the scheduler reads ERP and MES, accounts for people, absences and subcontractors, and compares scenarios."
pubDate: 2026-12-02
author: "Daniel Levis"
tags:
  - "manufacturing"
  - "production"
  - "custom software"
  - "how-to"
keywords:
  - "finite capacity scheduling"
  - "production scheduler SME"
  - "production planning Excel"
  - "APS ERP MES"
readMinutes: 6
featured: false
h1: "Finite capacity scheduling: a production plan that updates itself"
faq:
  - q: "Do we have to change our ERP or MES?"
    a: "No. The scheduler reads data from the ERP and the MES and returns the sequence and the expected dates, without changing the MRP orders. It is an extra layer, not a replacement."
  - q: "Does it account for absences and subcontractors?"
    a: "Yes: absences, overtime shifts and subcontracted operations go into the calculation, together with each operator’s skills. Those are exactly the surprises that force you to rebuild the plan in Excel today."
  - q: "Can we compare different plans?"
    a: "Yes. The scheduler compares scenarios, for instance on batch sizes and calendars, and shows delays and critical orders before the plan is approved."
  - q: "Where does AI come in?"
    a: "It is not the core of the project. The value lies in the planning rules written down with the planners, because a scheduler has to produce results you can explain and repeat."
  - q: "How long does it take to get started?"
    a: "The first release goes into production in <strong>4 weeks</strong>. We start with one department, such as assembly, and extend to the others once the rules have proved themselves."
lang: "en"
draft: true
---

In many workshops the production plan is born from ERP and MES exports pasted into Excel. It works as long as nothing happens. Then an operator calls in sick, a subcontractor is late, a rush order jumps the queue, and the plan has to be rebuilt from scratch, often by the one person who knows how.

Finite capacity scheduling plans production on the real capacity of machines and people, rather than on a theoretical unlimited capacity. For a manufacturing SME it means a plan that survives surprises and updates itself.

**In brief:**
- Finite capacity scheduling assigns orders to work centres and operators based on real capacity, taking skills, shifts and absences into account.
- MRP works out what is needed and by when, but assumes unlimited capacity: that is why the operational plan so often ends up in Excel.
- A custom scheduler reads the ERP and MES by itself, accounts for operators, absences and subcontracted work, and compares scenarios before the plan is approved.
- You can start with one department, such as assembly, without touching the MRP orders.
- The value is not AI: it is the planning rules written down with the people who plan.

## Finite capacity or MRP: what is the difference?

Your ERP's MRP answers one question: what to make and buy, and by when, given demand. It doesn't ask whether the department actually has the hours to do it. Finite capacity scheduling starts from the other end: how many hours each work centre and each operator really has this week, and in which order to run the orders so the dates hold.

The two don't compete. MRP remains the engine for requirements; the scheduler decides the operational sequence and flags early which orders are at risk.

## Why the Excel plan stops working

The planning spreadsheet has three limits that grow with the company:

- **it is updated by hand**, so it is out of date as soon as something changes on the floor;
- **it lives in the head of whoever builds it**: the rules, such as who can do what and which operations go together, are not written down anywhere;
- **it can't compare alternatives**: rebuilding the plan twice to see which works better takes hours.

## What the scheduler we designed does

For an earthmoving machinery manufacturer, we designed a finite capacity scheduler that takes over from the Excel plan:

- **a plan per work centre and per operator**, including each person's skills;
- **absences, overtime shifts and subcontracted operations** included in the calculation;
- **scenarios side by side**, for instance different batch sizes and calendars, before the plan is approved;
- **delays and critical issues per order**, visible before they become problems;
- **automatic updates** from ERP and MES data.

AI is not central here. The value lies in the planning rules, coded together with the planners: the rules that today exist only in their experience.

## How it connects to ERP and MES

The scheduler replaces neither the ERP nor the MES: it reads them. This is the boundary described by the [ISA-95](https://www.isa.org/standards-and-publications/isa-standards/isa-95-standard) standard, also known as [IEC 62264](https://webstore.iec.ch/en/publication/6675), which deals precisely with the interface between business systems and manufacturing operations systems. In practice:

- the **ERP** provides orders and requested dates;
- the **MES** provides progress and actual times;
- the **scheduler** returns the sequence and the expected dates, without changing the MRP orders.

Whether your ERP is TeamSystem, Zucchetti, Odoo or an older system, the approach is the same: we cover it in [AI agents and Italian ERP integration](/en/blog/ai-agents-italian-erp-integration/).

## Where to start without risk

The project we designed starts with assembly, without touching the MRP orders. That choice keeps the risk low: the scheduler runs alongside the existing systems, the department uses it on the real plan, and only once the rules hold does it extend to other departments.

## When you don't need a custom scheduler

- **Repetitive, stable production**: if orders are few and always alike, a good calendar is enough.
- **Your ERP already has a scheduling module** that respects your real constraints: configure it before building anything.
- **You don't know your real operation times**: without reliable data from the MES or the floor, any scheduler plans badly. Measure first.

## Timeline and cost

We work at a fixed price: an optional **€3,000 Analysis** to write the planning rules with the planners, then the **Sprint from €8,000 a month**, with the first production release in **4 weeks** and our **first month satisfied or refunded** guarantee. In Italy, production software can fall under grants and incentives: the open ones are in our [grants list](/bandi/) (in Italian), and you can see how we work on our [software development](/en/software-development/) page.

## Next step

If your production plan lives in a spreadsheet only one person knows how to update, [let's talk for 20 minutes](/en/contact/): I'll show you a finite capacity scheduler running on a workshop's data. If your problem is forecasting what to produce, start with [AI demand forecasting and inventory](/en/blog/ai-demand-forecasting-inventory/).
