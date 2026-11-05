---
title: "Safety data sheets vs ECHA lists: automatic monitoring"
description: "Dye houses and textile finishers: check safety data sheets against ECHA lists, CLP and REACH every day, and know at once which products contain a substance."
pubDate: 2026-11-27
author: "Daniel Levis"
tags:
  - "textiles"
  - "compliance"
  - "documents"
  - "how-to"
keywords:
  - "safety data sheets ECHA lists"
  - "SDS monitoring Candidate List"
  - "REACH compliance textile finishing"
  - "safety data sheet software"
readMinutes: 6
featured: false
h1: "Safety data sheets and ECHA lists: the check that runs itself"
faq:
  - q: "Does the system replace the REACH consultant?"
    a: "No. It does the repetitive part: it keeps the safety data sheet archive aligned with the ECHA lists and raises an alert when something changes. Deciding what to do about a newly listed substance stays with the person in charge or the consultant, who now finds out the same day."
  - q: "Does it work with scanned sheets or other languages?"
    a: "Yes. AI reads the sheets as suppliers send them and extracts substances and CAS numbers from sections 2 and 3. When a reading is uncertain, the case goes to a person instead of entering the archive with the wrong data."
  - q: "Which lists are the substances checked against?"
    a: "The Candidate List of substances of very high concern, the CLP classification inventory and the REACH annexes on authorisation and restriction. The check runs every day, so a list update does not wait for the next periodic review."
  - q: "Do we have to change our ERP?"
    a: "No. The system works on the safety data sheet archive and links each sheet to the product code you already use. Whoever answers a customer looks up the product and sees its status, without learning another system."
  - q: "Can a grant fund it?"
    a: "It can fall under Italian digitalization vouchers that cover software and consulting: you will find the open ones in our <a href='/bandi/'>grants list</a> (in Italian). With Grant Support at <strong>€2,000</strong> we prepare the application, and you only pay if the grant is awarded."
lang: "en"
draft: true
---

Every time ECHA updates a list, someone at a dye house has to reopen the safety data sheets one by one to see whether the change affects the dyes and auxiliaries they use. With hundreds of sheets from dozens of suppliers, that check takes days, while brands keep asking for REACH compliance declarations.

Checking safety data sheets against ECHA lists is a control you can automate almost entirely: the substances and their CAS numbers are already written in the sheets, and the lists are public. All that is missing is something that compares the two every day.

**In brief:**
- A dye house or textile finisher manages hundreds of safety data sheets (SDS), and every ECHA list update means checking them again.
- The check can be automated by extracting substances and CAS numbers from sections 2 and 3 of each SDS and comparing them daily with the Candidate List, the CLP inventory and the REACH annexes.
- When a substance enters the Candidate List, specific duties start: for articles containing it above 0.1% by weight, information to customers and an answer to consumers within 45 days, according to ECHA.
- AI is there to read sheets in different formats and languages; the comparison with the lists is a rule, and it should stay one.
- The first production release of a system like this ships in 4 weeks.

## Why are ECHA lists an operational problem, not just a regulatory one?

A dye house works with dyes, auxiliaries, surfactants and finishing products from many suppliers. Each product comes with a safety data sheet whose format is set by Annex II of the [REACH Regulation](https://eur-lex.europa.eu/eli/reg/2006/1907/oj): section 2 covers the hazards, section 3 the composition, with each substance and its CAS number.

The trouble is that the lists that matter change over time:

- the [Candidate List](https://echa.europa.eu/candidate-list-table) of substances of very high concern (SVHC), which ECHA updates as new substances are identified;
- the **CLP classification inventory**, which includes the harmonised classifications of the [CLP Regulation](https://eur-lex.europa.eu/eli/reg/2008/1272/oj);
- **REACH Annexes XIV and XVII**, covering authorisation and restriction.

For textiles, restrictions are not theoretical. Since 3 February 2021, nonylphenol ethoxylates may not exceed 0.01% by weight in textile articles that are washed in water: entry 46a of Annex XVII, added by [Regulation (EU) 2016/26](https://eur-lex.europa.eu/eli/reg/2016/26/oj). An auxiliary that contains them becomes a problem for every batch that uses it.

When a list changes, the question is always the same: which of our products contain this substance? If the answer lives in a folder of PDFs, it takes days.

## What the system does, step by step

For a dye house, we designed a system that does this work every day, without anyone having to remember it:

1. **Loads the safety data sheet archive** as it is: supplier PDFs, scans, versions in other languages.
2. **Extracts substances and CAS numbers** from sections 2 and 3 of each sheet and links them to the product.
3. **Compares those substances every day** with the Candidate List, the CLP inventory and the REACH annexes.
4. **Alerts the people in charge** when a substance enters a list, naming the product, the substance and the list.
5. **Makes the status of every product searchable** across the company: by whoever answers a customer, buys the chemicals or decides the recipes.

Once the archive is in order, the next step is questions in plain language, such as "which auxiliaries we use contain a Candidate List substance?", answered with the list of matching sheets.

## What happens when a substance enters the Candidate List?

Inclusion is not news to file away: it starts duties with precise deadlines. According to [ECHA's summary of obligations](https://echa.europa.eu/candidate-list-obligations), for anyone who produces, imports or supplies articles, such as a finished fabric:

- if the article contains the substance **above 0.1% by weight**, professional customers must receive the information needed for safe use;
- if a consumer asks, the answer is due **within 45 days**, free of charge;
- producers and importers must **notify ECHA within six months** of inclusion if the substance exceeds 0.1% and one tonne per year;
- since **5 January 2021**, the same articles must also be notified to the SCIP database.

Knowing on day one changes how you respond: you talk to the supplier, assess an alternative and prepare the customer communication before they ask for it.

## Where AI helps, and where it does not

AI handles the messy part: reading sheets written by different suppliers, with different layouts, sometimes scanned or in another language, and extracting substances and CAS numbers in a structured way. Where a reading is uncertain, the case goes to a person instead of entering the archive with wrong data.

The comparison with the lists, on the other hand, should not be "intelligent": it is a match between codes, and it must always give the same answer. Keeping the two parts separate is what makes the system defensible in front of a customer or an inspector. We cover this in [AI agents in regulated sectors](/en/blog/ai-agents-in-regulated-sectors/).

One thing to know before you start: some sheets list confidential components without a CAS number. The system flags them as such, and the missing information has to be requested from the supplier.

## When you don't need a custom system

Straight talk, before you spend anything:

- **A few dozen sheets and few suppliers**: a well-organised periodic check, perhaps with your chemical consultant, costs less.
- **Your suppliers already alert you** reliably and in writing: the value shrinks to internal search.
- **Your sheet archive is out of date**: it has to be rebuilt first. The system helps, but budget for the work.

If you manage hundreds of sheets, work for brands that ask for REACH declarations, and every list update costs you days, the numbers add up quickly.

## Timeline and cost

We build systems like this at a fixed price: an optional **€3,000 Analysis** to map the archive, the lists and the people involved, then the **Sprint from €8,000 a month**, with the first production release in **4 weeks** and our **first month satisfied or refunded** guarantee.

In Italy it can fall under regional and Chamber of Commerce digitalization vouchers: the open ones are in our [grants list](/bandi/) (in Italian).

## Next step

If every ECHA list update costs you days of reopening sheets by hand, [let's talk for 20 minutes](/en/contact/): we look at your archive together and I tell you honestly how much of the check can be automated. For other custom processes, see how we work on our [software development](/en/software-development/) page.
