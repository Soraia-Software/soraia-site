---
title: "AI Assistant for Internal Documents: How to Build It"
description: "Want an AI assistant that answers on your internal documents without sending your data around? Here is how to build it, what it needs, and when NOT to."
pubDate: 2026-11-09
author: "Davide Silvestri"
tags:
  - "ai agents"
  - "knowledge base"
  - "rag"
  - "how-to"
keywords:
  - "internal knowledge base ai assistant"
  - "internal document chatbot"
  - "company knowledge base"
  - "rag"
readMinutes: 6
featured: false
h1: "An AI assistant that answers on internal documents, without sending your data around"
faq:
  - q: "Do our documents end up training an external model?"
    a: "No, if you set it up right. At Soraia <strong>no LLM is trained on client data</strong>: your documents stay in your storage, the model reads them at query time and forgets them. You can use European infrastructure or on-premise when needed, with an Article 28 DPA in the contract."
  - q: "How is this different from giving everyone ChatGPT?"
    a: "ChatGPT does not know your contracts, procedures or internal policies. An assistant on your company documents (RAG) answers by citing the exact source inside your files. Generic ChatGPT burns value in genericity and makes things up where it does not know."
  - q: "How long until we have something usable?"
    a: "At Soraia the first release runs on the client's real processes in <strong>4 weeks</strong>. It does not start perfect: it starts on a clear scope (e.g. only the HR manual, or only supplier contracts) and improves one release at a time."
  - q: "What if the answers are wrong?"
    a: "A well-built assistant always cites its source, so the user can verify. If the documents are messy or contradictory, the assistant inherits that mess: that is why the first phase is cleaning up the knowledge base, not just plugging a model into it."
lang: "en"
gates:
  passedAt: 2026-10-25T08:44:30.481Z
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

The COO almost always frames it like this: *"My team wastes half an hour hunting for the right procedure in SharePoint. Can't we just put an AI that answers?"*

Honest answer: yes, you can, and it's often worth it. But an **internal knowledge base AI assistant** is not "upload the PDFs into ChatGPT". Three decisions determine whether it works or becomes yet another tool nobody uses after two weeks.

**Key takeaways:**
- An AI assistant on your company documents (RAG) answers employee questions by citing the exact source inside procedures, contracts, manuals and policies, without the person searching by hand.
- Your data must NOT leave your company: at Soraia no LLM is trained on client data, and you can use European infrastructure or on-premise.
- The real value is not the model, it's order in the knowledge base: an assistant fed messy documents gives messy answers.
- Start on a narrow scope (one domain, not the whole company), with the first release in production in 4 weeks.
- Do NOT build it if you have few documents or they change every week: a good internal search is enough.

## What an internal document assistant actually is

It's an agent that, when an employee asks a natural-language question ("how many bereavement leave days do I have?", "what is the termination clause with supplier X?"), searches inside your internal documents, finds the right passage and answers **citing the source**. The technique is called RAG (Retrieval-Augmented Generation): the model doesn't "know" the answer, it retrieves it from your files and rephrases it.

The difference from ChatGPT is simple: ChatGPT knows everything except your business. This one knows only your business.

## The three decisions that matter

### 1. Where the data lives

This is the COO's first question, and rightly so. Your contracts and HR policies must not end up training a third party's model.

How we handle it at Soraia:
- Documents stay in **your storage**. The assistant reads them at query time, it doesn't copy them into the model.
- **No training of LLMs on client data**. Ever.
- European infrastructure when required, on-premise when needed.
- **Article 28 GDPR DPA** included in the contract, with an audit log on every answer.

This isn't heroism: on HR documents and contracts, without these guarantees we couldn't even start.

### 2. The scope, not everything at once

The classic mistake: "let's connect everything, SharePoint, Drive, email, the ERP". Result: the assistant pulls from contradictory sources and loses credibility by the third wrong answer.

Start from **one domain**: only the HR manual, or only supplier contracts, or only quality procedures. A narrow scope can be measured, corrected, and trusted by people. Then you widen it one release at a time. It's the same principle we use for [AI agents](/en/ai-agents): first release in production in 4 weeks, then iterate.

### 3. Order in the knowledge base

This is the part nobody wants to hear: if your documents are messy, duplicated or contradictory, the assistant inherits that mess. It's not magic, it's an amplifier.

Often the most useful phase isn't technical: it's cleaning up. Figuring out which version of a procedure is the right one, archiving duplicates, flagging authoritative sources. That's part of [custom software development](/en/software-development), because the assistant is just the top layer over an ordered base.

## Where it pays off most

Three cases where we see the clearest return:
- **Onboarding**: new hires ask the assistant instead of interrupting colleagues. The time experts spend answering the same questions drops in a measurable way.
- **Internal customer support**: whoever answers clients finds the right policy in seconds instead of searching. It fits well with [customer & compliance automation](/en/customer-support), where the agent suggests and a human approves.
- **Operating procedures and compliance**: where a wrong answer costs, citing the source is what makes the assistant genuinely usable.

## When NOT to build it

We'll say it to your face:
- **Few documents** (under a few hundred pages) → a good internal search is enough and costs less.
- **Documents that change every week** → you'll maintain the assistant more than you use it.
- **Nobody owns the knowledge base** → without an owner keeping documents clean, the assistant degrades fast.

But if you have a stable corpus, searched often and important to get right, it's one of the most readable-ROI projects out there.

---

**Want to know if your case holds up?** [Let's talk for 20 minutes](/en/check-up) or [take the check-up](/en/check-up): we'll tell you honestly whether you need an assistant or whether fixing the search you already have is enough.
