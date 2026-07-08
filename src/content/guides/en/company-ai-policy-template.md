---
title: "Company AI policy: operational template for SMEs"
h1: "Company AI policy: how to write one (operational template for SMEs)"
description: "How to write a useful company AI policy: who can use what, which data, approvals, logs. An operational 9-section template for SMEs, ready to adapt."
pubDate: 2026-07-08
author: "Daniel Levis"
readMinutes: 11
keywords:
  - "company AI policy"
  - "employee AI usage policy"
  - "internal AI rules SME"
  - "AI policy template"
related:
  - "ai-act-for-business"
  - "corporate-ai-training"
  - "ai-agents-for-business"
faq:
  - q: "Is my SME required to have an AI policy?"
    a: "There is no generic, direct obligation to write an \"AI policy\" for every company in Regulation EU 2024/1689 (the AI Act). But if your employees use AI tools on personal data, the GDPR accountability principle (art. 5(2)) requires you to demonstrate you have adequate organisational measures: a written policy is the simplest proof. For your specific case, ask Soraia for an honest read."
  - q: "What is the difference between an AI policy and the AI Act?"
    a: "The <strong>AI Act</strong> (Regulation EU 2024/1689) is the European law that classifies AI systems by risk and imposes obligations on providers and deployers. A <strong>company AI policy</strong> is your internal document telling your team how to use AI in practice. The policy helps you comply with the AI Act, but they are different things: the law is covered in the <a href='/en/guide/ai-act-for-business'>AI Act guide</a>."
  - q: "Can I just ban ChatGPT instead of writing a policy?"
    a: "You can, but it usually backfires. A total ban pushes usage underground (shadow AI): the team uses personal accounts on company data and you lose all control. A policy that states <strong>what is allowed, with which tools and on which data</strong> is safer than an ignored ban."
  - q: "How long should an SME AI policy be?"
    a: "Three to six pages. A 40-page policy copied from a multinational gets read by no one and applied by no one. Better a short document, in plain language, with concrete examples of the tools you actually use and the data categories you actually handle."
  - q: "Is the policy enough on its own, or do I also need training?"
    a: "A policy without training is a file in the drive nobody opens. You need a short session to explain the why behind the rules, with real examples. See the <a href='/en/guide/corporate-ai-training'>corporate AI training guide</a>. This is general guidance, not advice for your company: for an honest read on your case, <a href='/en/contact'>talk to us</a>."
featured: false
lang: "en"
draft: false
---

A company AI policy is not about covering yourself with a document nobody reads. It is about telling your team, in plain language, who can use which AI tools, on which data, with which approvals and with what traceability. Done well, it cuts the risk of a data leak and gives you concrete proof of accountability. Done badly, it is a 40-page PDF copied from a multinational that stays locked in a drive.

This guide is the operational template: 9 sections, what to write in each, and the mistakes to avoid. It is built for a 10-200 person SME that already has employees using ChatGPT or similar tools, often without rules.

## What an AI policy is (and is not)

A **company AI policy** is the internal document that governs how your employees and collaborators use artificial intelligence tools. It answers four operational questions: who can use what, on which data, who approves the sensitive cases, and how you keep a trail.

It is not the AI Act. **Regulation EU 2024/1689 (the AI Act)** is the European law that classifies AI systems by risk and imposes obligations on providers and deployers; its provisions apply in stages, with most obligations starting from August 2026 (source: Regulation EU 2024/1689, art. 113). The policy is your internal tool for complying with that law in daily practice. For the map of the law, see the [AI Act for business guide](/en/guide/ai-act-for-business).

It is also not a ban. Banning ChatGPT with no alternative pushes usage underground: the team opens personal accounts and pastes company data into them. "Shadow AI" is the biggest risk, and a clear policy is the best way to bring it back into the light.

## Does my SME actually need one? (the honest answer)

There is no generic obligation in the AI Act to write an "AI policy" for every company. But if your employees use AI tools while handling personal data (candidates, clients, employees), the **GDPR accountability principle** kicks in (Regulation EU 2016/679, art. 5(2)): you must be able to demonstrate you have adequate organisational measures. A written, applied policy is the cheapest proof you can produce.

When it is NOT the priority: if you are a 5-person company using AI only for internal text drafts, with no sensitive personal data, half a page of shared rules can be enough. You do not need a formal document before you understand which data you actually touch.

**This is general guidance, not legal advice for your company.** The scope depends on the data you handle, your sector and how your tools are configured. For an honest read on your specific case, [talk to Soraia](/en/contact).

## The operational template: the 9 sections

A useful SME policy fits in 3-6 pages. Here is what to put in each.

### 1. Purpose and scope

One line on why the document exists and who it applies to: employees, collaborators, interns, external suppliers accessing your systems. Make clear it covers **all AI tools**, not just company-approved ones.

### 2. Approved and prohibited tools

The most useful part. List in a table the tools the team may use, for which purposes, and with which account (company, not personal).

| Tool | Permitted use | Account | Allowed data |
|---|---|---|---|
| ChatGPT (Team/Enterprise plan) | Drafts, summaries, brainstorming | Company | No personal data of clients/candidates |
| Business software AI assistant | As configured | Company | As per supplier DPA |
| AI tool not on the list | Request from IT before use | - | - |

Golden rule: **no personal accounts on company data**. The free tier of many tools may use inputs to train models; business plans usually do not, but this must be verified in the supplier's terms.

### 3. Data classification (what you never paste)

The section that prevents data leaks. Define 3 categories with concrete examples of your real data:

- **Never paste**: personal data of clients and candidates, health data, credentials, trade secrets, proprietary code, non-public financials.
- **Allowed with caution**: internal non-confidential text, drafts to rework, already-public data.
- **Free**: already-public information, generic content with no company references.

Use real examples from your company, not abstract categories. "Do not paste a candidate's CV" works better than "do not process personal data".

### 4. Cases requiring approval

Define when a manager's sign-off is needed before using AI: decisions that affect people (candidate screening, evaluations), use on special categories of data, integrating a new AI tool into a process. The AI Act pays particular attention to systems used in the workplace, including recruitment (source: Regulation EU 2024/1689, Annex III): these deserve explicit approval.

### 5. The human oversight principle

Write it in black and white: **AI output is never a final automatic decision** on matters affecting people. A human reviews, corrects and takes responsibility. This applies to rejecting a candidate, answering a complaint, classifying a client.

### 6. Output verification and responsibility

Whoever uses AI stays responsible for what they produce. LLMs can generate plausible but false statements ("hallucinations"). The rule: **verify facts, numbers and citations before using them** externally or in operational decisions.

### 7. Logs and traceability

For processes where an AI agent takes actions (not just drafts), require an **audit log**: who did what, when, with which input and output. In our projects an immutable audit log on every agent decision is a standard, precisely because it is the concrete proof of how AI was used.

### 8. Roles and AI point of contact

Name an internal contact (often the COO or Head of Ops) the team asks when in doubt: whether a tool is fine, whether a given data type can be used. A clear point of contact prevents everyone deciding at random.

### 9. Violations, updates and sign-off

Explain what happens if the policy is not followed, proportionately. Set a **review every 6 months**: tools and rules change fast. And have it signed (digitally is fine) as acknowledgement: this is what turns the policy into proof of accountability.

## The most common mistakes (and how to avoid them)

1. **Copying a multinational's policy.** 40 pages of legalese nobody reads protect nothing. Write short, in plain language, with your real tools.
2. **Writing it and not explaining it.** A policy without a training session is a dead file. 45 minutes is enough to explain the why with examples.
3. **Banning everything.** A total ban breeds shadow AI. Better to give safe, approved alternatives.
4. **Never updating it.** An 18-month-old policy does not know the tools your team uses today.
5. **Forgetting external suppliers.** If an agency or freelancer accesses your data, the policy applies to them too.

## Policy, training and adoption go together

A policy only works if the team understands why it exists and how to use the right tools. That is why rules and training should be built together: rules without skill create paralysis, skill without rules creates risk. This is the approach of our [AI Adoption](/en/ai-adoption) work, where policy, training and real use cases move in parallel. If you are also introducing [AI agents into processes](/en/guide/ai-agents-for-business), the policy becomes the document that governs how they are used.

## In short, and how to get an honest read

An SME AI policy is a short, living document: who uses what, on which data, who approves, how you keep a trail. 3-6 pages in plain language beat 40 pages of ignored legalese. Its value is not formal but practical: it cuts data-leak risk and gives you proof of accountability towards GDPR.

This guide is a general starting point, not legal or compliance advice for your specific situation. The right scope depends on the data you handle, your sector and how your tools are configured. For an honest read on your case, no pitch and no surprise quotes, [talk to Soraia for 20 minutes](/en/contact). If you want to gauge your AI maturity first, take the [3-minute check-up](/check-up).
