---
title: "Startup GovTech, Agente IA per la diplomazia internazionale (NDA)"
client: "Startup GovTech"
industry: "public-sector"
sector: "Diplomazia · Eventi governativi"
service: "Agente IA gestione eventi diplomatici"
pubDate: 2026-03-25
dimensioni: "1-10"
featured: false
stakeholder:
  name: "Founder"
  role: "Cliente sotto NDA"
  photo: "/testimonials/govtech-startup.webp"
heroQuote: "La reattività di Soraia ci ha permesso di consegnare la piattaforma ai nostri partner governativi nei tempi stretti che la diplomazia richiede. L'agente IA per le note verbali ha tolto giorni di lavoro al nostro team, mantenendo la precisione formale che il settore impone."
teaser:
  problem: "Gestire eventi diplomatici multi-paese richiedeva coordinamento su sistemi separati per ogni governo cliente, con redazione manuale delle note verbali (documenti formali con regole strette) e archiviazione frammentata."
  action: "Piattaforma multi-tenant con agente IA per la generazione delle note verbali (rispetto del protocollo diplomatico), gestione utenti restricted, archive integration, SSO/OTP, supporto multi-stato."
  resultMetric: "Scaling a più Stati clienti senza moltiplicare le ore del team"
  resultBody: "Reattività esplicitamente elogiata dal cliente nel settore più formale del mondo."
stats:
  - value: "Multi-tenant"
    label: "Stati gestiti"
    sub: "su un'unica piattaforma"
  - value: "Note verbali"
    label: "Generate dall'agente"
    sub: "con protocollo diplomatico"
  - value: "SSO/OTP"
    label: "Sicurezza enterprise"
    sub: "su utenti restricted"
timeline: "Cliente storico Soraia dal 2024, sprint continuativi"
stack:
  - "Xano (backend multi-tenant)"
  - "WeWeb (frontend restricted)"
  - "OpenAI (note verbali generation)"
  - "SSO + OTP custom"
  - "Archive integration"
related:
  - "aegis"
  - "liftt"
---

> **Nota**: nome del cliente, founder, denominazione del prodotto e dettagli identificativi sono coperti da NDA. Quanto segue descrive in modo anonimizzato il caso reale.

## Il contesto

Il cliente è una società europea che fornisce strumenti software per la gestione di eventi diplomatici internazionali. Il cliente finale a sua volta è un attore istituzionale (ministero degli esteri, ambasciata, organizzazione internazionale) che deve coordinare riunioni, missioni, scambi formali tra Stati.

È uno dei clienti storici Soraia: la collaborazione è iniziata nel 2024 ed è oggi uno dei rapporti più intensi del portfolio in termini di volume sprint.

## Il problema reale

La diplomazia ha regole molto strette che il software generalista non rispetta:

- **Note verbali**, documenti formali scambiati tra Stati, con sintassi, intestazioni e formule rituali precise. Una virgola fuori posto può cambiare il significato politico.
- **User restricted**, non tutti possono vedere tutto. Diversi livelli di accesso per consoli, ambasciatori, staff, controparti.
- **Archive compliance**, ogni documento generato deve essere archiviato secondo le regole di conservazione documentale del settore (anni, formato, metadata).
- **Multi-tenant per Stato cliente**, ogni governo cliente deve avere il proprio environment isolato, con i propri dati, le proprie regole, i propri utenti.
- **Customer support tool**, il team del cliente deve poter supportare ogni Stato finale senza accedere a dati cross-tenant.

Tutto questo è ben oltre ciò che un CRM generico o un SaaS off-the-shelf può fornire. Serviva una piattaforma custom.

## Cosa ha fatto l'agente IA

Soraia ha costruito una **piattaforma multi-tenant** per la gestione di eventi diplomatici, con un agente IA dedicato alla generazione delle note verbali:

1. **Agente IA note verbali generator**, riceve in input il contesto dell'evento (Stati coinvolti, data, oggetto, lingua) e genera la nota verbale rispettando rigorosamente il protocollo diplomatico. Il team del cliente rivede, l'agente non firma mai documenti finali.
2. **Multi-tenant architecture**, ogni Stato cliente ha il proprio environment isolato, con i propri utenti, dati, regole di accesso. Zero data leakage cross-tenant.
3. **User restricted con SSO + OTP**, autenticazione enterprise-grade, livelli di accesso granulari (read-only, edit, admin), 2FA obbligatorio sui ruoli sensibili.
4. **Archive integration**, ogni documento prodotto viene archiviato secondo le policy di retention del cliente, con metadata strutturati per audit e ricerca successiva.
5. **Customer support tool**, il team del cliente può supportare ogni Stato finale da una console centralizzata, senza vedere dati che non gli spettano.

L'AI è uno strumento di **acceleration**, mai di sostituzione del giudizio diplomatico. Il funzionario rivede e firma, l'agente fa il drafting.

## I risultati

**Scaling a multipli Stati clienti** senza moltiplicare le ore del team: ogni nuovo Stato si aggiunge come tenant senza richiedere un nuovo deployment dedicato.

**Reattività esplicitamente elogiata** dal founder: in un settore (la diplomazia) dove i tempi sono spesso lunghi e i fornitori lenti, la velocità di Soraia è stata segnalata come differenziatore.

**Riduzione del tempo per nota verbale** dal lavoro manuale al drafting AI-assistito: ore di tempo qualificato del team risparmiate per ogni evento gestito.

**DPA amendment per nuovi Stati** gestiti come standard di onboarding: la compliance GDPR e settoriale è strutturata, non improvvisata.

## Cosa è incluso oggi

Sistema in produzione, status ACTIVE con uno dei volumi sprint più alti del portfolio Soraia (top-3 per intensità mensile).

Il cliente è un esempio di partnership tech-as-a-service di lungo periodo: Soraia non ha consegnato un progetto chiuso, ma è il **partner tecnologico permanente**, che evolve la piattaforma in funzione delle esigenze dei nuovi Stati clienti.
