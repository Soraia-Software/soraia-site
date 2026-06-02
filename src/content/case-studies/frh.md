---
title: "French Riviera Househunting, agenti IA per lead enrichment e sourcing immobili"
client: "French Riviera Househunting"
clientLogo: "/logos/clients/frh.webp"
industry: "real-estate"
sector: "Real estate boutique · Costa Azzurra"
service: "Agenti IA enrichment lead + sourcing immobili"
pubDate: 2026-02-15
dimensioni: "11-50"
featured: false
stakeholder:
  name: "Fabricio Carminati"
  role: "Founder"
  photo: "/testimonials/fabricio-carminati-frh.webp"
heroQuote: "Due agenti IA: uno arricchisce e qualifica ogni lead, l'altro mi permette di catturare con un click gli immobili in target e assegnarli al cliente che li vede sul portale."
shortQuote: "Due agenti IA: lead qualificati + immobili catturati con 1 click e assegnati al cliente sul portale."
teaser:
  problem: "Lead da eBook download e form contatti che arrivavano con dati minimi. Ricerca immobili dispersa tra siti diversi, salvataggi manuali e fogli condivisi col cliente, ore di profilazione + curation prima del primo contatto."
  action: "Due agenti IA collegati. Il primo arricchisce e qualifica i lead in ingresso, costruisce il dossier nel CRM. Il secondo, via estensione Chrome, cattura con 1 click gli immobili in target durante la ricerca, li classifica e li assegna direttamente al cliente che li visualizza nel client portal."
  resultMetric: "Lead qualificati in autonomia · immobili catturati con 1 click e assegnati al cliente"
  resultBody: "Fabricio riceve dossier pronti e cura solo selezione + relazione. Il cliente vede sul portale gli immobili che gli vengono assegnati in tempo reale."
stats:
  - value: "End-to-end"
    label: "Lead → dossier qualificato"
    sub: "in autonomia"
  - value: "1 click"
    label: "Immobile in target → DB"
    sub: "via Chrome extension"
  - value: "Client portal"
    label: "Vista personalizzata"
    sub: "immobili assegnati per cliente"
timeline: "Sistema in maintenance, sprint puntuali su nuove integrazioni"
stack:
  - "Airtable (CRM lead + immobili)"
  - "Make (orchestrazione)"
  - "OpenAI (enrichment + qualifica)"
  - "Chrome extension custom (sourcing immobili)"
  - "Client portal custom"
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

Il workflow boutique soffriva su **due fronti distinti**.

**Sui lead in ingresso**, dati minimi da diverse fonti:

- **eBook download** dal sito (guida sull'acquisto in Costa Azzurra), il visitatore lasciava email e nome, niente di più.
- **Form contatti** del sito, qualche campo opzionale (budget, area di interesse), ma spesso lasciato vuoto.
- **Referral inbound** via WhatsApp o email, testi liberi con dati incompleti.

Per ogni nuovo lead, Fabricio faceva **research manuale individuale** prima del primo contatto: search LinkedIn, paese di residenza, segnali di liquidità, matching tra profilo e price point. Ore per ogni lead, su 50-100 lead/mese, equivaleva a una persona dedicata a tempo pieno solo per profilazione.

**Sulla ricerca immobili**, la curation per ogni cliente era altrettanto manuale:

- Navigazione tra siti immobiliari, portali high-end, agenzie locali Costa Azzurra.
- Salvataggio screenshot / link / note in fogli dedicati al cliente.
- Condivisione via email o WhatsApp dei candidati selezionati.
- Nessuna vista unificata che il cliente potesse esplorare in autonomia.

## Cosa abbiamo costruito

Soraia ha costruito **due agenti IA collegati** che coprono entrambi i lati del workflow:

### Agente 1, Enrichment e qualifica lead

1. **Riceve il lead** dal trigger eBook download / form / WhatsApp.
2. **Enrichment cross-source**, scansiona LinkedIn, ricerche pubbliche, dati social pubblicamente accessibili per costruire il profilo del lead (ruolo professionale, paese, segnali di seniority).
3. **Classificazione intent + budget**, sulla base dell'eBook scaricato (ognuno ha price point implicito), pattern di interazione, profilo professionale, l'agente stima il tier (browse / qualified / hot).
4. **Crea dossier strutturato** nel CRM Airtable con tutti i campi pre-compilati: profilo, intent, score, suggested approach.
5. **Attiva sequenza email** via MailerLite/Brevo, personalizzata per il tier del lead.

Fabricio riceve dossier già qualificati sui lead "hot" e cura solo l'approccio finale (apertura conversazione, proposta visita).

### Agente 2, Sourcing immobili via Chrome extension

1. **Estensione Chrome custom**: mentre Fabricio (o il team) naviga su portali immobiliari, agenzie locali, listing high-end, ogni immobile potenzialmente in target ha un pulsante "Aggiungi".
2. **1 click** cattura tutto: foto, prezzo, metratura, indirizzo, dettagli, link sorgente, classificandolo automaticamente nel DB Airtable.
3. **Assegnazione al cliente**: durante il click, Fabricio sceglie a quale cliente (o clienti) della pipeline assegnare l'immobile. L'agente arricchisce la scheda con il match score sul profilo cliente.
4. **Client portal**: ogni cliente high-end accede al proprio portale personalizzato e vede in tempo reale gli immobili che gli sono stati assegnati, con tutti i dettagli e i link sorgente. Può commentare, salvare preferiti, richiedere visita.

Il risultato: **dalla scoperta dell'immobile alla visione del cliente sul portale passano secondi**, non ore.

## I risultati

**Lead pronti al primo contatto in autonomia**: Fabricio non fa più research manuale individuale. L'agente gli consegna il dossier strutturato.

**Immobili catturati con 1 click**: l'estensione Chrome elimina lo screenshot/copia-incolla/email. La pipeline immobili è sempre aggiornata, sempre nel CRM, sempre assegnata.

**Client portal sempre vivo**: il cliente high-end vede gli immobili che gli vengono assegnati man mano, senza aspettare l'email del giorno dopo. Esperienza premium, niente attesa.

**Pipeline boutique scalata senza assumere**: capacity di gestione lead + immobili cresciuta senza personale dedicato. Tempo qualificato re-investito su selezione finale, visite, negoziazione.
