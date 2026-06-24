---
title: "AI Act Chatbot Transparency: What to Do Before Aug 2026"
description: "From 2 August 2026 every chatbot must disclose it's AI (Art. 50 AI Act): what changes for customer support — disclosure, watermarking and audit trail."
pubDate: 2026-06-24
author: "Daniel Levis"
tags:
  - "ai act"
  - "compliance"
  - "customer-support"
  - "chatbot"
keywords:
  - "ai act chatbot transparency"
  - "article 50 ai act"
  - "chatbot disclosure"
  - "ai disclosure customer support"
readMinutes: 6
featured: false
h1: "From 2 August 2026 your chatbot must say it's AI: what really changes"
faq:
  - q: "From 2 August 2026, must my chatbot say it's an AI?"
    a: "Yes. <strong>Article 50 of the AI Act</strong> requires anyone operating a public-facing conversational system to inform the user, clearly and promptly, that they are interacting with an AI. It applies to support chatbots, voicebots and agents that reply to customers."
  - q: "What changes for AI-generated content?"
    a: "Text, images, audio and video generated or manipulated by AI must be marked in a machine-readable way (watermarking / metadata) and flagged to the user when the content is meant to inform the public. Disclosure in the interface alone isn't enough: it must be technically verifiable."
  - q: "Is a simple 'you're talking to a virtual assistant' label enough?"
    a: "For the limited-risk tier, often yes, as long as the disclosure is visible at the start of the interaction and the user can request a human. But without an <strong>audit trail</strong> proving when and how the notice was shown, you have no evidence in an inspection. Disclosure must be logged, not just displayed."
  - q: "Does the AI Digital Omnibus change the deadlines?"
    a: "The AI Digital Omnibus, approved by the European Parliament in June 2026, aims to cut documentation burdens for SMEs, but Article 50 transparency obligations remain the baseline. Plan against the firm date (2 August 2026) and adjust if and when official derogations land, not before."
  - q: "Who's responsible, me or the chatbot vendor?"
    a: "Both, on different levels. The vendor must make disclosure and watermarking possible; you, as the deployer, are responsible for turning them on and keeping the evidence. Make sure your contract and <strong>GDPR Art. 28 DPA</strong> spell out who does what."
lang: "en"
draft: true
---

From **2 August 2026** Article 50 of the AI Act kicks in: anyone running a public-facing chatbot must tell the user they're talking to an AI. It sounds like a formality. For anyone with automated customer support, it isn't.

The part few people mention: writing it on screen isn't enough. You have to be able to *prove* it.

**In short:**

- From **2 August 2026** every public-facing chatbot, voicebot or conversational agent must inform the user it's an AI (Art. 50 AI Act, limited risk).
- AI-generated content (text, images, audio, video) meant to inform the public must be marked in a machine-readable way (watermarking / metadata).
- Disclosure isn't just a label in the interface: without an **audit trail** proving when it was shown, you have no evidence in an inspection.
- The **AI Digital Omnibus** (approved by the European Parliament in June 2026) aims to simplify documentation burdens for SMEs, but Art. 50 stays the baseline: plan against the firm date.
- Shared responsibility: the vendor enables disclosure and watermarking, you as deployer turn them on and keep the evidence.

## What Article 50 actually says

The AI Act places client-facing chatbots in the **limited-risk** tier. The main obligation is one: transparency. Three concrete things.

1. **Conversational disclosure.** The user must know, clearly and at the start of the interaction, that they're talking to an AI. In practice: a notice in the bot's first message (not buried in the T&Cs), a persistent label in the chat header, and a visible option to switch to a human operator.
2. **Marking synthetic content.** Text, images, audio or video generated or manipulated by AI, when it informs the public, must be flagged and marked with machine-readable metadata.
3. **Reasonable exceptions.** You don't need to repeat the notice if it's obvious from context, but the burden of proving obviousness is on you.

Breaching the transparency obligations falls in the tier up to EUR 15 million or 3% of worldwide annual turnover (Art. 99, Regulation (EU) 2024/1689) — not the top ceiling, which is reserved for prohibited practices. But for SMEs the real risk isn't the penalty: it's reaching an inspection (or a customer complaint) with no proof of what the bot showed and when.

## The typical mistake: disclosure with no proof

Most teams add a line like *"You're talking to our virtual assistant"* and consider it done. It isn't.

If tomorrow a customer claims they never knew they were talking to an AI, or an authority asks for evidence, you need a **log** showing:

- when the disclosure notice was presented;
- at which point in the conversation;
- whether and when the user requested a human operator;
- which content was AI-generated and with what marking.

In practice every interaction produces an append-only record with fixed fields — `timestamp`, `session_id`, `disclosure_shown`, `disclosure_text_version`, `human_handoff_requested`, `ai_generated_content_ids`, `watermark_method`. That's what becomes evidence before an authority or a customer, not an interface screenshot. The screenshot shows how it looks today; the log proves how it looked that day, to that user.

This is exactly the same immutable audit trail we put by default on our [customer & compliance automation](/en/customer-support) agents. Not because we're heroic: without it, we can't work on regulated processes.

## Content watermarking: the underrated part

All the attention goes to the chatbot, but Article 50 also hits the **synthetic content** you publish. Generated replies sent by email, automated summaries, support materials: if they inform the public and are AI-generated, they must be marked.

"Machine-readable" marking isn't a label: it's provenance metadata inside the file, at the source. The reference standard is **C2PA / Content Credentials** (adopted by Adobe, Microsoft, OpenAI): it embeds who generated the media — "AI-generated", model, timestamp — verifiable by a machine even after download or sharing. For text and automated emails, the signal must be set at the system level (headers, CMS or ERP metadata), not stuck on by hand message by message.

## A concrete case: moderation and content

When we built the agents for [Navily](/en/case-studies/navily) (boating community), the task was moderation and enrichment of UGC, with a **−70% operational time**. There, transparency isn't optional: every automatic action by the agent is logged and traceable, so whoever runs the community can answer "who/what decided this" with a record, not an opinion.

It's the same principle as Article 50: the agent can do the work, but it must leave a verifiable trace.

## When you DON'T need anything special

Operational honesty: not every case needs a project.

- **Internal routing + reply drafting** (human approves and sends) → minimal risk, no end-user disclosure.
- **Internal bot for employees** → disclosure is good practice, not an Art. 50 obligation.
- **Existing frontline chatbot with a decent vendor** → often you just enable native disclosure and check the log is kept. Don't rebuild everything.

If your bot is frontline and takes decisions or sends content to customers, however, tracked disclosure and watermarking become operational by 2 August 2026.

## What to do before August 2026 (4 moves)

1. **Map the AI-customer touchpoints**: chatbots, voicebots, automated emails, generated content.
2. **Enable and log disclosure** at the start of every conversational interaction.
3. **Set up watermarking** of synthetic content at the system level.
4. **Check the Art. 28 DPA** with your vendor: who enables what, who keeps the evidence.

For the full picture of AI Act obligations by risk tier, start with the [AI Act guide for SMEs](/en/guide/ai-act-for-business). If instead you already have a support agent in production and want to know whether it's compliant, let's look at it together.

---

**Want a check on your chatbot before August 2026?** [Let's talk](/en/contact) (20 minutes, no pitch) or see how we build agents with an audit trail on [AI Agents](/en/ai-agents).
