---
title: "AI assistant for families in home care agencies"
description: "Home care agencies: an AI assistant in the family portal answers questions on hours, invoices and legal duties, with sensitive data protected."
pubDate: 2026-12-10
author: "Daniel Levis"
tags:
  - "customer support"
  - "gdpr"
  - "ai agents"
  - "how-to"
keywords:
  - "ai assistant home care"
  - "family portal chatbot"
  - "home care staffing agency"
  - "health data and AI"
readMinutes: 6
featured: false
h1: "AI assistant for home care agencies: families ask, your own data answers"
faq:
  - q: "Does the assistant replace the call centre?"
    a: "No. It answers repetitive questions with data from the management system, FAQs and the rules, and leaves operators the cases that need a person: a problem with the caregiver, a delicate situation, a complaint. The call centre stops reading out invoices over the phone and handles those instead."
  - q: "How is health data protected?"
    a: "Under the GDPR it is a special category (Article 9). In the project, sensitive data is encrypted and anonymised before it reaches the model, which receives only what it needs to answer. The contract includes a data processing agreement under Article 28 of the GDPR."
  - q: "Do families know they are writing to an AI?"
    a: "They must. Since 2 August 2026, Article 50 of the AI Act requires people interacting with an AI system to be informed, unless it is obvious. In practice: a clear sentence at the start of the conversation and an easy way to ask for an operator."
  - q: "Where do the answers on legal obligations come from?"
    a: "From a collection of rules and the agency’s FAQs, not from what the model remembers. For agency work in Italy the reference is Legislative Decree 81/2015. If a question falls outside what the collection covers, the right answer is to pass it to an operator."
  - q: "Can a grant fund it?"
    a: "It can fall under Italian digitalization vouchers that cover software and consulting: you will find the open ones in our <a href='/bandi/'>grants list</a> (in Italian). With Grant Support at <strong>€2,000</strong> we prepare the application, and you only pay if the grant is awarded."
lang: "en"
draft: true
---

In home care, an agency's call centre spends the day answering the same questions from families: how many hours the caregiver worked this month, why the invoice differs from the last one, whether the payment arrived, who pays the social security contributions. The answers already exist, in the management system, in the FAQs and in the rules.

An AI assistant in the family portal can give them straight away, at any hour, and leave operators the cases that need a person.

**In brief:**
- In home care, families keep asking the same things: hours and attendance, invoices, payments and reminders, the rules of the employment relationship.
- An AI assistant in the family portal answers with data from the management system, FAQs and a collection of rules, and leaves the delicate cases to operators.
- Under Italian agency work rules, the family is the user and is jointly liable with the agency for wages and contributions (Article 35 of Legislative Decree 81/2015): questions like these need exact answers.
- Health data is a special category under Article 9 of the GDPR: it has to be encrypted and anonymised before reaching the model.
- Since 2 August 2026, Article 50 of the AI Act requires people writing to an AI system to be told so.

## The questions that clog the call centre

Families' questions fall into three groups:

- **numbers**: the caregiver's hours and attendance, invoices, payments, reminders;
- **rules**: how the employment relationship works, holidays, sick leave, replacements, who is entitled to what;
- **situations**: a problem with the caregiver, a change of hours, a relative getting worse.

The first two groups have answers that already live somewhere. The third does not: that is where an operator is needed, and where their time should go, instead of reading out invoices over the phone.

## What we designed

For a staffing agency that supplies caregivers to families through agency work, we designed a conversational assistant in the family portal:

1. **Answers on hours and attendance, invoices, payments and reminders**, reading data through the management system's APIs: the answers are that family's, not generic ones.
2. **Explains the employment relationship and legal obligations**, starting from the agency's FAQs and a collection of rules on agency work and home care.
3. **Protects sensitive data**: it is encrypted and anonymised before it reaches the model.

The goal is to lighten the call centre's load, not to replace it: delicate cases stay with people. How to build an assistant that does not feel like an answering machine is covered in [automating customer service without the robot feel](/en/blog/automate-customer-service-without-robot-feel/).

## Agency work: answers have to be exact

On some questions a rough answer does harm, and agency work is one of them.

Italy's [Legislative Decree 81/2015](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2015-06-15;81~art30) defines it in Article 30: an authorised agency places its own employees at the disposal of a user, here the family, and for the whole assignment they work in the user's interest and under the user's direction and control.

[Article 35](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2015-06-15;81~art35) adds a point worth explaining well: the user is jointly liable with the agency for paying wages and social security contributions, with a right of recourse against the agency.

That is why answers about the rules have to start from the text of the collected rules and the agency's FAQs, not from what the model remembers. If a question falls outside that scope, it goes to an operator.

## Health data and transparency

When the person being cared for at home is elderly, health data comes up sooner or later. [Article 9 of the GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj) lists it among the special categories: processing it is prohibited, except in the cases the article lists, such as explicit consent. That is why, in the project, sensitive data is encrypted and anonymised before it reaches the model. The general rules are in [GDPR and AI agents](/en/blog/gdpr-ai-agents-data-processing-smb/).

Then there is transparency. Since 2 August 2026, [Article 50 of the AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) requires people who interact with an AI system to be informed, unless it is obvious. In a portal also used by elderly people, it is worth saying so every time, clearly, and offering an easy way to reach an operator.

## When you don't need an AI assistant

Straight talk, before you spend anything:

- **Few repetitive questions**: if the call centre mostly handles one-off cases, a good FAQ page and a clear portal do more.
- **The management system has no APIs, or the data is unreliable**: the assistant would repeat the errors with more confidence. Fix the data first.
- **Families don't use the portal**: if everything goes through the phone, the starting point is different, for example an [AI voice agent on your phone line](/en/blog/ai-voice-agent-phone-business/).

If your call centre spends its days reading out invoices and attendance over the phone, the numbers add up quickly.

## Timeline and cost

We work at a fixed price: an optional **€3,000 Analysis** to map questions, sources and data protection rules, then the **Sprint from €8,000 a month**, with the first production release in **4 weeks** and our **first month satisfied or refunded** guarantee. Encryption of sensitive fields and audit logs are included in the Sprint.

To prove compliance to whoever asks for it, for example with documentation for your DPO and support with the DPIA, there is the **€4,000 Compliance & Audit** add-on.

## Next step

If your call centre answers the same family questions every day, [let's talk for 20 minutes](/en/contact/): we go through your most frequent questions together and I tell you how many can be closed with the data you already have. For other customer support projects, see how we work on our [customer support](/en/customer-support/) page.
