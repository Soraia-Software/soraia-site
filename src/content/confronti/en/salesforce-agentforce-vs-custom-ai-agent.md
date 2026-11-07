---
titolo: "Agentforce or custom AI agent"
sottotitolo: "Turn on the ready-made agents inside Salesforce, or build a custom agent you own. What actually suits an SME."
description: "Salesforce Agentforce vs custom AI agent: cost, time, control and lock-in compared, with an honest verdict on when each one wins for an SME."
inBreve: "If your SME already lives inside Salesforce and the use cases are standard (ticket deflection, lead qualification, FAQs), Agentforce wins: you start fast and stay in the ecosystem. A custom AI agent (built and owned by you) wins when the process is specific, touches systems beyond the CRM, or you want to own code that does not depend on a platform. The real question is not 'which is better', but 'how close is my process to Salesforce's standard case'."
categoria: "Platform vs Custom (build-vs-buy)"
author: "Daniel Levis"
keywords:
  - "Salesforce Agentforce vs custom AI agent"
  - "Agentforce for SMEs"
  - "custom AI agent vs Agentforce"
  - "build vs buy AI agents"
optionA:
  nome: "Salesforce Agentforce"
  descrizione: "The ready-to-use AI agents inside the Salesforce platform, configured with data, flows and permissions already present in the CRM."
  pro:
    - "Fast activation if you already use Salesforce: data and permissions are there"
    - "Native integration with CRM, Service Cloud and Sales Cloud"
    - "Governance, audit and security handled by the platform"
    - "No development team needed for standard use cases"
  contro:
    - "Consumption pricing (for example €2 per conversation) grows with volume and is hard to forecast"
    - "Works best when Salesforce is already the central CRM and the data is in order"
    - "Beyond standard cases you need configuration, integrations (for example MuleSoft) and usage-based credits"
    - "The agent runs only inside Salesforce: if you change platform it has to be rebuilt"
  idealePer:
    - "SMEs that already use Salesforce as their central CRM"
    - "Standard use cases: ticket deflection, FAQs, lead qualification"
    - "Those who want to start without building anything internally"
optionB:
  nome: "Custom AI agent (build)"
  descrizione: "An agent built on your real process, integrating Salesforce and your other systems, with code and data that stay yours."
  pro:
    - "Built on your specific process, not adapted to a template"
    - "Integrates systems beyond the CRM (ERP, email, documents, DB)"
    - "Client's code and data from day one, no platform lock-in"
    - "Sprint cost known up front; model usage via API is estimated separately"
  contro:
    - "Upfront development cost borne by the company"
    - "Needs an internal owner to follow the project"
    - "Maintenance stays with you (or the partner) over time"
    - "For trivial use cases it can be more work than needed"
  idealePer:
    - "Specific processes or ones that touch systems beyond Salesforce"
    - "SMEs not on Salesforce or that prefer not to pay per conversation or per action"
    - "Those who want full ownership of code and data"
tabella:
  - criterio: "Time to first result"
    valoreA: "Fast if Salesforce is already configured"
    valoreB: "First release in production in 4 weeks"
  - criterio: "Cost model"
    valoreA: "Consumption or per-user licence"
    valoreB: "Sprint from 8,000 € a month, plus model usage via API"
  - criterio: "Ownership"
    valoreA: "Configuration inside Salesforce"
    valoreB: "Client's code and data from day one"
  - criterio: "Process flexibility"
    valoreA: "High on standard cases, limited beyond"
    valoreB: "Built on the real process"
  - criterio: "Multi-system integration"
    valoreA: "Excellent inside the Salesforce ecosystem"
    valoreB: "Integrates CRM + other company systems"
  - criterio: "Prerequisites"
    valoreA: "Salesforce as CRM, including the SME Suites"
    valoreB: "An internal owner and a process to map"
verdetto: "This is not an ideological choice, it depends on where you are. If Salesforce is already the heart of your CRM and the use cases are standard, Agentforce gets you started fast and the platform handles governance: the risk is consumption cost growing with volume and the fact that the agent runs only inside Salesforce. If the process is specific, touches systems beyond the CRM, or you want full ownership without lock-in, a custom agent wins: Sprint cost known up front, your code, built on your real work. Many SMEs end up using both, Agentforce where it is enough and a custom agent where the process is genuinely particular."
faq:
  - q: "When does Agentforce make sense over a custom agent?"
    a: "When your company already lives inside Salesforce, the use cases are standard (ticket deflection, FAQs, lead qualification) and you want to start without building anything. In that context the native integration and platform governance are worth the consumption cost. If you use the Starter or Pro Suites, the Employee Agent, which summarises records, drafts messages and logs activities, is included at no extra cost (<a href='https://www.salesforce.com/blog/small-business/agentforce-in-salesforce-suites/'>Salesforce</a>)."
  - q: "Is Agentforce's consumption cost really a problem?"
    a: "It depends on volume. Salesforce offers consumption pricing, <strong>€2 per conversation</strong> or Flex Credits at €500 per 100,000 credits with 20 credits per action (€0.10 per action), and per-user licences at €125 a month with unmetered use for employees (<a href='https://www.salesforce.com/agentforce/pricing/'>Agentforce pricing</a>). At low volume consumption is manageable; across many conversations or actions per month the cost <strong>grows and needs careful estimating</strong>. With a custom agent the Sprint cost is known up front; model usage via API remains, paid per token and also growing with volume, so it needs estimating in the same way."
  - q: "With a custom agent, do I lose the Salesforce integration?"
    a: "No. A <a href='/en/ai-agents'>custom AI agent</a> can integrate Salesforce like any other system, along with the ERP, email and documents. Agentforce can also reach internal systems, for example by exposing company APIs through MuleSoft with the MCP protocol (<a href='https://www.mulesoft.com/platform/ai/model-context-protocol/announcement'>MuleSoft</a>): the difference is where the agent lives and who owns the code."
  - q: "What if one day I want to leave Salesforce?"
    a: "Your data goes with you: the <a href='https://eur-lex.europa.eu/eli/reg/2023/2854/oj'>Data Act</a> requires cloud service providers, subscription software included, to enable switching to another provider, and from 12 January 2027 it bans charging for it. The agent's configuration, though, works only on the platform and has to be rebuilt elsewhere. With a custom agent the code is yours from day one."
  - q: "How much does it cost to start with a custom agent?"
    a: "With Soraia you start from <strong>8,000 € per month</strong> with a Sprint, three dedicated people and a release in production at the end of the month. The <strong>first release is in production in 4 weeks</strong> and the code is yours from day one. For an estimate on your case, <a href='/en/contact'>let's talk</a>."
  - q: "What if it does not work?"
    a: "With Soraia the <strong>first month satisfied or refunded</strong> guarantee applies: we set a measurable target during analysis and, if the first month does not convince you, we refund or keep working for free until you are satisfied."
fonti:
  - titolo: "Salesforce, Agentforce pricing"
    url: "https://www.salesforce.com/agentforce/pricing/"
  - titolo: "Salesforce, Agentforce in the Salesforce Suites for small business (17 March 2026)"
    url: "https://www.salesforce.com/blog/small-business/agentforce-in-salesforce-suites/"
  - titolo: "MuleSoft, MCP support to connect company APIs to agents"
    url: "https://www.mulesoft.com/platform/ai/model-context-protocol/announcement"
  - titolo: "Data Act, Regulation (EU) 2023/2854 (EUR-Lex)"
    url: "https://eur-lex.europa.eu/eli/reg/2023/2854/oj"
related: []
featured: false
pubDate: 2026-11-03
updatedDate: 2026-11-07
lang: "en"
gates:
  passedAt: 2026-10-25T08:27:49.612Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 9, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
    - { name: "balance", score: 8, pass: true }
draft: false
---
