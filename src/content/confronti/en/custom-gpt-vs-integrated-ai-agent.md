---
titolo: "ChatGPT plugins (formerly custom GPTs) or integrated AI agent"
sottotitolo: "OpenAI retires custom GPTs on 11 December 2026 and replaces them with plugins. What they do, and when you need an agent integrated into your systems instead."
description: "Custom GPTs retire on 11 December 2026: ChatGPT plugins or an AI agent integrated into your systems? What each does, cost and data compared, honestly."
inBreve: "OpenAI retires custom GPTs on 11 December 2026 (11 February 2027 for some Enterprise workspaces with a deferral) and replaces them with ChatGPT plugins, which bring together instructions, reference files and connected apps. A plugin works well to assist people inside ChatGPT, including actions on connected apps. An agent integrated via API costs more and needs development, but it runs the process in your systems, with your own rules and logs. If you use a custom GPT today: migrate it and test the plugin before the retirement, then consider an integrated agent where you need to automate a process end-to-end."
categoria: "Build depth"
author: "Daniel Levis"
keywords:
  - "Custom GPT vs custom integrated AI agent"
  - "custom GPT retirement ChatGPT plugins"
  - "ChatGPT plugin or API agent"
  - "integrated AI agent CRM SME"
optionA:
  nome: "ChatGPT plugin (formerly custom GPT)"
  descrizione: "With custom GPTs retiring, instructions and knowledge files move into a plugin: skills, reference files and connected apps, used inside ChatGPT."
  pro:
    - "Quick start: a custom GPT's instructions can be migrated into a plugin"
    - "Built by whoever knows the process, including with Plugin Creator, without writing code"
    - "Connected apps let it read and act on external services, within the account's permissions"
    - "Low marginal cost if you already have ChatGPT Business or Enterprise"
  contro:
    - "Custom GPT actions do not carry over to the plugin: an internal system may need an MCP server"
    - "Lives inside ChatGPT: features and availability depend on plan, workspace and region"
    - "Depends on OpenAI's choices, as the custom GPT retirement shows"
    - "Controls and logs are those ChatGPT provides for your plan"
  idealePer:
    - "Those using custom GPTs today who must migrate them before the retirement"
    - "Assistants on instructions and internal documents, used inside ChatGPT"
    - "Teams wanting a helper that never touches core systems"
optionB:
  nome: "AI agent integrated via API into your processes"
  descrizione: "An agent built on your process, connected via API to CRM, ERP and tools, that reads, decides and executes actions autonomously."
  pro:
    - "It acts in your systems: updates the CRM, sends communications, runs the process end-to-end"
    - "Integrated with your data in real time, including ERPs without ready-made apps"
    - "Your own governance: immutable audit log, data control, on-premise possible"
    - "Model-agnostic: not locked to a single LLM vendor"
    - "Client-owned code from day one, versionable and testable"
  contro:
    - "Requires development and integration: not ready in a few hours"
    - "Upfront cost on the company, plus model usage via API"
    - "Needs an internal owner and access to the systems to integrate"
    - "Oversized if the use case is only answering questions"
  idealePer:
    - "Repetitive processes where value is in execution, not chat"
    - "Those who need to write to systems, not just read"
    - "Companies with compliance and data-audit requirements"
tabella:
  - criterio: "What it does"
    valoreA: "Assists in ChatGPT, acts on connected apps"
    valoreB: "Runs the process in your systems"
  - criterio: "Data integration"
    valoreA: "Reference files and connected apps; MCP for internal systems"
    valoreB: "API to CRM and ERP in real time"
  - criterio: "Time to launch"
    valoreA: "Hours or days"
    valoreB: "First delivery in 4 weeks"
  - criterio: "Governance and audit"
    valoreA: "Those of your ChatGPT plan"
    valoreB: "Immutable audit log, your data"
  - criterio: "Lock-in"
    valoreA: "ChatGPT ecosystem"
    valoreB: "Client-owned code, model-agnostic"
  - criterio: "Cost"
    valoreA: "Low (inside ChatGPT Business or Enterprise)"
    valoreB: "Sprint from 8,000 € a month, plus model usage via API"
verdetto: "The custom GPT retirement does not change the underlying question, it makes it more urgent. If you use a custom GPT to answer, summarise and reason over documents, migrate it to a plugin and test it before 11 December 2026: to assist people inside ChatGPT it remains the fastest route. If the value is in execution instead, that is updating the CRM, sending communications and closing the process in your systems with your own rules and logs, you need an agent integrated via API. The sensible sequence for many SMEs: plugins to assist people, an integrated agent where the return justifies it."
faq:
  - q: "What happens to custom GPTs?"
    a: "OpenAI retires them on <strong>11 December 2026</strong>; some Enterprise workspaces with an approved deferral get until 11 February 2027. Until then they remain usable. Their creators can migrate them into a plugin: instructions become a skill, knowledge files become reference files and connected apps move to the plugin. Custom actions do not transfer and must be rebuilt, sometimes with an MCP server (<a href='https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq'>OpenAI</a>)."
  - q: "Can a ChatGPT plugin update my CRM or send emails?"
    a: "Yes, if your CRM or email has an app you can connect to ChatGPT: apps link accounts, information and actions, always within the account and workspace permissions (<a href='https://help.openai.com/en/articles/20001256-plugins-in-chatgpt'>OpenAI</a>). An internal ERP with no app needs a custom integration. Either way the process stays inside ChatGPT, under your plan's rules: to run it in a stable, auditable way in your systems you need an <a href='/en/ai-agents'>integrated agent</a>."
  - q: "So is a plugin useless?"
    a: "No. It is <strong>great for fast validation</strong>: you quickly learn whether an assistant on instructions and documents delivers value, before investing in development. It is often the right first step precisely because it costs little and never touches core systems."
  - q: "How much does moving to an integrated agent cost?"
    a: "With Soraia you start from <strong>8,000 € per month</strong>: three dedicated people (Account Manager, Project Manager and AI Engineer) and one release in production every month, with first delivery in 4 weeks. Model usage via API comes on top. The code is yours from day one, no lock-in. For an estimate on your case, <a href='/en/contact'>let's talk</a>."
  - q: "With an integrated agent, am I tied to OpenAI?"
    a: "No. A custom-built agent is <strong>model-agnostic</strong>: you can switch LLM without rebuilding everything. With a plugin you live inside the ChatGPT ecosystem, and the custom GPT retirement shows that OpenAI sets the rules. See also <a href='/en/software-development'>custom software development</a>."
  - q: "What about data compliance?"
    a: "With a plugin your plan's rules apply: on ChatGPT Business, for example, OpenAI does not train models on workspace data (<a href='https://help.openai.com/en/articles/8542115-chatgpt-business-general-faq'>OpenAI</a>). An integrated agent allows an <strong>immutable audit log, European infrastructure and on-premise</strong> when needed: relevant if you have strict GDPR or AI Act requirements."
  - q: "Why was this page updated?"
    a: "We rewrote it on 7 November 2026: the previous version recommended starting from a custom GPT, which OpenAI retires on 11 December 2026. The comparison is now with the ChatGPT plugins that replace them."
fonti:
  - titolo: "OpenAI, custom GPT retirement and migration FAQ"
    url: "https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq"
  - titolo: "OpenAI, plugins in ChatGPT"
    url: "https://help.openai.com/en/articles/20001256-plugins-in-chatgpt"
  - titolo: "OpenAI, ChatGPT Business general FAQ"
    url: "https://help.openai.com/en/articles/8542115-chatgpt-business-general-faq"
related: []
featured: false
pubDate: 2026-10-13
updatedDate: 2026-11-07
lang: "en"
gates:
  passedAt: 2026-09-25T08:57:38.248Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 9, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
    - { name: "balance", score: 9, pass: true }
draft: false
---
