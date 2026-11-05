---
title: "Amazon settlement reconciliation: when payouts don't match"
description: "Amazon settlement reconciliation: match settlement reports to your ERP orders, classify refunds, fees and reserves, and propose journal entries for approval."
pubDate: 2026-12-03
author: "Daniel Levis"
tags:
  - "e-commerce"
  - "finance"
  - "accounting"
  - "how-to"
keywords:
  - "Amazon settlement reconciliation"
  - "Amazon settlement report accounting"
  - "marketplace payout reconciliation"
  - "Amazon reconciliation ERP"
readMinutes: 6
featured: false
h1: "Amazon settlement reconciliation: why the payout doesn't match"
faq:
  - q: "Do we need access to Amazon’s APIs?"
    a: "It is the best route: with the seller’s authorization the system downloads settlement reports by itself. Alternatively you can start from files downloaded from Seller Central, with one extra manual step."
  - q: "Does it work with an old ERP such as an AS400?"
    a: "Yes. The system works on the order export and returns a file of journal entries to import, so you don’t need to change your ERP or touch its code."
  - q: "Are journal entries posted automatically?"
    a: "No. The system proposes them, with the cause of each difference, and a person approves them. Only after approval is the file ready to import into the ERP."
  - q: "What are reserves in a settlement report?"
    a: "They are amounts Amazon holds back in one settlement and releases in a later one. If you don’t track them they look like shortfalls; the system recognises them and keeps them apart from real differences."
  - q: "Does it work for other marketplaces?"
    a: "The principle does: settlement, orders, explained differences and entries to approve. But every marketplace has its own reports and descriptions, so each one has to be mapped separately."
lang: "en"
draft: true
---

Every Amazon settlement mixes sales, returns, fees and reserves, and the finance team spends hours working out why the payout that hit the bank doesn't match the orders in the ERP. Every period the same scene, and every time someone rebuilds the difference by hand.

Amazon settlement reconciliation can be automated almost entirely: settlement reports are structured files, and the orders are in your ERP. What you need is a system that compares them, explains every difference and leaves the person only the approval.

**In brief:**
- An Amazon settlement report nets sales, returns, refunds, fees and reserves into a single payout: that is why the bank transfer doesn't match the order total.
- Amazon generates settlement reports automatically and they can't be requested: you retrieve them through the Selling Partner API, in the V2 format with the columns amount-type, amount-description and amount.
- A reconciliation system compares the settlement with the orders in your ERP, even an AS400, classifies each difference by cause and proposes the journal entries to approve.
- AI classifies the differences and proposes, a person approves; fees to dispute go into a separate list.
- The first production release ships in 4 weeks.

## Why doesn't the Amazon payout match your ERP?

Your ERP holds the orders. The Amazon settlement holds much more, netted into a single transfer:

- the **sales** of the period, with prices and shipping;
- **returns and refunds**, which subtract amounts from orders, sometimes from earlier periods;
- **selling and service fees**;
- **discounts and promotions**;
- **reserves**, amounts Amazon holds back in one settlement and releases in a later one.

The result is a payout that matches no number in your ERP. Reconciling it by hand means going through the lines one by one and asking, every time, where the difference comes from.

## Where the data comes from

Amazon generates settlement reports automatically: according to the [Selling Partner API documentation](https://developer-docs.amazon/sp-api/docs/report-type-values-settlement) they can't be requested or scheduled, you look them up among the available reports. The current format, the V2 flat file, condenses amounts into three general columns, amount-type, amount-description and amount, and that is what makes the file machine-readable.

To see transactions without waiting for the settlement to close, the [Finances API](https://developer-docs.amazon/sp-api/docs/finances-api) returns financial events by order or by date range.

## What the system we designed does

For a company that sells to consumers on Amazon as well, running an AS400 ERP, we designed a system that:

1. **downloads settlement reports via API**, with no manual downloads;
2. **compares them with the order export** from the ERP;
3. **classifies differences by cause**: return, discount, fee, reserve;
4. **proposes the journal entries** to approve, with the file ready to import into the ERP;
5. **keeps the list of disputes**, the fees that don't add up and should be challenged with Amazon.

Finance no longer rebuilds the difference: it finds it already explained, and approves.

## Where AI helps

AI does the classification: it reads the settlement lines, matches them to orders and attributes each difference to its cause. Then it proposes the entry. The decision stays with the person: no accounting entry goes through without approval.

It is the same principle as [automated bank reconciliation](/en/blog/automated-bank-reconciliation-ai-agent/): the system does the matching, the person only sees the doubtful cases and the proposals to confirm.

## When you don't need it

- **Few Amazon orders a month**: reconciling by hand costs less than the project.
- **Your ERP or an e-commerce connector already reconciles settlements** reliably: use that.
- **Recording the transfer is enough for you** without per-order detail: there is no problem, until the first fee you need to dispute.

## Timeline and cost

We work at a fixed price: an optional **€3,000 Analysis** to map settlements, descriptions and entries, then the **Sprint from €8,000 a month**, with the first production release in **4 weeks** and our **first month satisfied or refunded** guarantee. See how we work on finance processes on our [Finance](/en/finance/) page.

## Next step

If every Amazon settlement costs you hours of reconstruction, [let's talk for 20 minutes](/en/contact/): I'll show you a reconciled settlement with every difference already explained. For other custom processes, see how we work on our [software development](/en/software-development/) page.
