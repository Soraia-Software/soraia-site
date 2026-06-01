---
title: "French Riviera Househunting, Agente IA arricchimento lead immobiliari"
client: "French Riviera Househunting"
clientLogo: "/logos/clients/frh.webp"
industry: "consumer-education"
sector: "Real estate boutique · Costa Azzurra"
service: "Agente IA arricchimento lead"
pubDate: 2026-02-15
dimensioni: "11-50"
featured: false
stakeholder:
  name: "Fabricio Carminati"
  role: "Founder"
  photo: "/testimonials/fabricio-carminati-frh.webp"
heroQuote: "L'agente IA arricchisce il profilo di ogni lead high-end che entra dall'eBook download, lo qualifica e mi prepara il dossier prima ancora che io legga il nome."
shortQuote: "Lead arricchiti, qualificati e dossier pronti prima che apra la mail."
teaser:
  problem: "Lead da eBook download e form contatti che arrivavano con dati minimi (solo email/nome). Profilazione manuale per ogni cliente richiedeva ore di research individuale prima del primo contatto."
  action: "Agente IA che riceve il lead, fa enrichment cross-source (LinkedIn, ricerche pubbliche, social), classifica budget/intent, crea dossier strutturato nel CRM, attiva sequenza email personalizzata."
  resultMetric: "Lead pronto al primo contatto in autonomia · pipeline boutique scalata senza assumere"
  resultBody: "Fabricio riceve direttamente il dossier qualificato e personalizza solo l'approccio finale."
stats:
  - value: "End-to-end"
    label: "Lead → dossier qualificato"
    sub: "in autonomia"
  - value: "Multi-source"
    label: "Enrichment automatico"
    sub: "LinkedIn + ricerche pubbliche"
  - value: "Boutique"
    label: "Capacity scalata"
    sub: "senza assumere"
timeline: "Sistema in maintenance, sprint puntuali su nuove integrazioni"
stack:
  - "Airtable (CRM lead)"
  - "Make (orchestrazione)"
  - "OpenAI (enrichment + qualifica)"
  - "Web Clipper custom"
  - "MailerLite + Brevo (transactional)"
screenshots:
  - src: "/case-studies/frh/01.webp"
    caption: "Pipeline lead immobiliari automatizzata"
related:
  - "navily"
  - "stars-be-original"
---

## Il contesto

French Riviera Househunting è una **boutique real estate agency** specializzata in clienti high-end internazionali che cercano casa sulla Costa Azzurra (Nizza, Cannes, Monaco, Saint-Tropez). Il modello business è quello classico dell'agenzia di nicchia: pochi clienti per anno, ognuno con budget significativo e aspettative alte sul servizio personalizzato.

Il valore di FRH dipende dalla **qualità della relazione con il singolo cliente**, non dal volume. Fabricio Carminati, founder, non vuole assumere un team di operations per gestire ogni nuovo lead in arrivo, vuole concentrarsi sul lavoro a valore aggiunto (selezione case, visite, negoziazione).

## Il problema reale

I lead arrivavano da diverse fonti, ma con dati minimi:

- **eBook download** dal sito (guida sull'acquisto in Costa Azzurra), il visitatore lasciava email e nome, niente di più.
- **Form contatti** del sito, qualche campo opzionale (budget, area di interesse), ma spesso lasciato vuoto.
- **Referral inbound** via WhatsApp o email, testi liberi con dati incompleti.

Risultato operativo: per ogni nuovo lead, Fabricio doveva fare **research manuale individuale** prima del primo contatto:
- Chi è questa persona? (search LinkedIn, ricerche pubbliche per capire profilo professionale, paese di residenza, segnali di liquidità)
- Cosa cerca davvero? (interpretazione dell'eBook scaricato + signal sui social)
- È un lead serio o curioso? (matching tra profilo e price point dell'eBook download)

Ore per ogni lead, su 50-100 lead/mese, equivaleva a una persona dedicata a tempo pieno solo per profilazione.

## Cosa ha fatto l'agente IA

Soraia ha costruito un agente IA di **arricchimento e qualifica lead** che fa il lavoro di profilazione in autonomia:

1. **Riceve il lead** dal trigger eBook download / form / WhatsApp.
2. **Enrichment cross-source**, scansiona LinkedIn, ricerche pubbliche, dati social pubblicamente accessibili per costruire il profilo del lead (ruolo professionale, paese, segnali di seniority).
3. **Classificazione intent + budget**, sulla base dell'eBook scaricato (ognuno ha price point implicito), pattern di interazione, profilo professionale, l'agente stima il tier (browse / qualified / hot).
4. **Crea dossier strutturato** nel CRM Airtable con tutti i campi pre-compilati: profilo, intent, score, suggested approach.
5. **Attiva sequenza email** via MailerLite/Brevo, personalizzata per il tier del lead (browse → nurturing, qualified → invito alla chiamata, hot → diretto a Fabricio).

Fabricio riceve direttamente il dossier qualificato sui lead "hot" e personalizza solo l'approccio finale (la conversazione di apertura, la proposta di visita).

## I risultati

**Lead pronto al primo contatto in autonomia**: Fabricio non fa più research manuale individuale. L'agente gli consegna il dossier strutturato.

**Pipeline boutique scalata senza assumere**: la capacity di gestione lead è cresciuta senza dover aggiungere personale dedicato.

**Tempo qualificato re-investito**: le ore prima spese in research vanno oggi su selezione property, visite con cliente, negoziazione.

## Cosa è incluso oggi

Sistema in maintenance: SLA mensile + sprint puntuali quando emergono nuove fonti di lead o cambi nelle policy dei tool esterni (es. update LinkedIn API). Stack snello e mantenibile.

FRH è un esempio del pattern **"AI augmentation per boutique"**: piccola agenzia, pochi clienti high-value, agente IA che fa il lavoro non differenziante per liberare le ore del founder.
