---
title: "Environmental lab sampling: from the phone to the LIMS"
description: "Environmental testing labs: record field sampling on a phone with photos, GPS and live calculations, and send the same data to the LIMS and the report."
pubDate: 2026-11-30
author: "Daniel Levis"
tags:
  - "laboratories"
  - "field technicians"
  - "custom software"
  - "how-to"
keywords:
  - "environmental lab sampling LIMS"
  - "field sampling app"
  - "digital sampling record"
  - "ISO 17025 sampling records"
readMinutes: 6
featured: false
h1: "Environmental lab sampling and LIMS: record the data once"
faq:
  - q: "Do we have to replace our LIMS?"
    a: "No. The platform takes the jobs to plan from the LIMS and sends the field data back, so it reaches sample acceptance and the test report. The LIMS remains the lab’s system of record."
  - q: "What does the technician record on the phone?"
    a: "The sample with its readings, photos, GPS position and the calculations done on site, such as flue gas flow rates. The platform can make the fields the standard requires mandatory, so a sampling record cannot be closed incomplete."
  - q: "How is validation handled?"
    a: "The validator signs in the platform and the measurement log stays linked to the data. The same information then feeds the final report, with no hand-offs in between."
  - q: "Where does AI come in?"
    a: "In this project it is not central. The value is in data recorded once, where it is measured; AI can help later, for instance to read incoming documents, but it is not the foundation of the system."
  - q: "How long does it take to get started?"
    a: "The first release goes into production in <strong>4 weeks</strong>. We first map the real flow, from sampling to report, and decide which calculations and records move to the phone first."
lang: "en"
draft: false
---

In many environmental testing labs, the technician fills in the field sheet by hand, on a factory roof or next to a stack, and back at the office someone retypes it into the LIMS. The risk of error sits right on the data that ends up in the test report, the document the lab signs.

Recording environmental lab sampling straight from a phone, and getting that data into the LIMS without retyping, is simpler than it sounds. The value is not in the technology but in one rule: data is written once, where it is measured.

**In brief:**
- In environmental testing labs, field data on emissions, waste, water and air is often born on paper and retyped into the LIMS: that is where errors creep in.
- A field platform records the sample on a phone with photos and GPS, runs the calculations live and passes the same data to sample acceptance and the test report.
- Under ISO/IEC 17025, sampling followed by testing is a laboratory activity, and its records must be complete.
- AI is not the centrepiece here: what matters is data recorded once, at the point where it is measured.
- The LIMS is not replaced: the platform takes jobs from it and sends the data back.

## Where does the data get lost between the stack and the test report?

Take air emissions, which in Italy are regulated by Part Five of [Legislative Decree 152/2006](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2006-04-03;152). A sampling job passes through many hands:

1. the office plans the job, the vehicles and the protective equipment;
2. the technician takes the sample and notes readings, conditions and times on the field sheet;
3. back at the lab, someone retypes the sheet for sample acceptance;
4. field data and lab results meet in the LIMS;
5. the test report is compiled, validated and signed.

Every retyping is a chance for error: a mistyped value, a missing time, a forgotten signature. And field calculations such as flue gas flow rates, redone at the office by hand or in a spreadsheet, double the work.

## What the field platform does

For an accredited environmental testing lab working on stack emissions, waste, water and air, we are building a platform that follows the job from planning to signed report:

- **planning** of jobs, vehicles and protective equipment from data already in the LIMS;
- **sampling recorded on the phone**, with photos and GPS position;
- **live calculations** on site: flue gas flow rates, gravimetric dust, total organic carbon, solvents;
- **validator sign-off** and a measurement log;
- **one data point** that feeds both sample acceptance and the final report.

The technician no longer fills in a sheet that someone else retypes: they enter the data that will reach the report unchanged.

## What does accreditation require for sampling?

In Italy, testing laboratories are accredited by [Accredia](https://www.accredia.it/accreditamento/come-accreditarsi/), the national accreditation body, against [ISO/IEC 17025](https://www.iso.org/standard/66912.html). Under the standard, sampling followed by testing is part of the laboratory's activities: it does not come before the lab, it is already the lab.

The standard asks for complete sampling records: the method used, date and time, sample identification, who took the sample, the equipment, environmental or transport conditions where relevant, the sampling location and any deviations from the plan. Accredia's requirements for testing laboratories are set out in document [RT-08](https://accredia.it/wp-content/uploads/2021/12/RT-08-rev.05-_EC-10-02-2022.pdf).

A paper sheet can hold all of this, but only if nobody forgets anything. A platform can make it mandatory: it will not close a sampling record without time, signature and location, and it attaches photos and coordinates as evidence.

## Why isn't a generic tablet form enough?

A fillable form removes the paper, not the retyping. In a lab, three things make the difference:

- the **sampling-specific calculations** done on site, not redone at the office;
- the **link to the LIMS**, inbound for jobs and outbound for data;
- **validation** with signature and measurement log, inside the same flow.

Without those three pieces you digitize the sheet, but the office work stays the same. We wrote about this in [stop running your business on spreadsheets](/en/blog/stop-running-your-business-on-spreadsheets/).

## When it doesn't pay off

- **Few sampling jobs a month**: the savings on retyping don't cover the build.
- **Your LIMS vendor already has a field module** that covers your calculations: use it and invest elsewhere.
- **Your LIMS can't import or export data**: without a way to exchange it, the link becomes fragile and the value drops.

## Timeline and cost

We work at a fixed price: an optional **€3,000 Analysis** to map the flow from sampling to report, then the **Sprint from €8,000 a month**, with the first production release in **4 weeks** and our **first month satisfied or refunded** guarantee.

In Italy, a platform like this can fall under digitalization vouchers: the open ones are in our [grants list](/bandi/) (in Italian).

## Next step

If your lab still retypes field sheets, [let's talk for 20 minutes](/en/contact/): I'll show you the flow from phone to report. For other custom processes, see how we work on our [software development](/en/software-development/) page.
