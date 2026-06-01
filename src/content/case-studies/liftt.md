---
title: "LIFTT, Agente IA che gestisce il deal flow in autonomia"
client: "LIFTT"
clientLogo: "/logos/clients/liftt.webp"
industry: "finance-vc"
sector: "Venture Capital · Tech transfer"
service: "Agente IA deal flow"
pubDate: 2026-03-10
dimensioni: "11-50"
featured: false
stakeholder:
  name: "Alberto Burzio"
  role: "IT Manager"
  photo: "/testimonials/alberto-burzio-liftt.webp"
heroQuote: "L'agente IA gestisce in autonomia archiving, dedupe e reportistica del deal flow. Noi siamo tornati a fare deal."
shortQuote: "Archiving, dedupe e report gestiti dall'IA. Noi torniamo a fare deal."
teaser:
  problem: "Pipeline deal frammentata tra CRM, email e file locali. Dedupe manuale, monthly report fatti a mano, email archiving non conforme."
  action: "Agente IA che monitora le email, archivia eml + allegati con metadata su OneDrive, unifica i deal duplicati nel CRM, genera il monthly report con charts in autonomia."
  resultMetric: "Dalla cadenza weekly a quella monthly: l'agente gestisce il deal flow"
  resultBody: "Team LIFTT focused sul deal making, non sul data management."
stats:
  - value: "Weekly → Monthly"
    label: "Cadenza sync ridotta"
    sub: "agente in autonomia"
  - value: "100%"
    label: "Email archiviate"
    sub: "con allegati + metadata"
  - value: "0 ore"
    label: "Dedupe manuale"
    sub: "agente riconosce e unifica"
timeline: "Sprint iniziale 2x €5k, oggi maintenance + sprint puntuali"
stack:
  - "CRM (deal flow)"
  - "Make (orchestrazione)"
  - "GPT-4o (agente di dedupe + classification)"
  - "OneDrive (email archive conforme)"
  - "Outlook integration"
related:
  - "stars-be-original"
  - "cxl"
---

## Il contesto

LIFTT è una **holding di Venture Capital focalizzata sulle tecnologie deep tech**, con un approccio operativo e multi-verticale orientato alla creazione di impatto.

Il valore di LIFTT è nella **qualità della pipeline deal**: vedere prima i deal giusti, decidere veloce, mantenere relazioni costanti con i founder.

## Il problema reale

Il deal flow era cresciuto più velocemente dei processi che lo gestivano. Il team viveva su:

- **CRM** come sistema centrale, con record duplicati dovuti a diverse fonti di ingest
- **Email Outlook** come canale primario con i founder e i deal team, ma senza archiving strutturato
- **File su OneDrive** per pitch deck, allegati, term sheet, senza link automatico al record CRM
- **Monthly report compilato a mano** ogni inizio mese (ore di lavoro umano)

La conseguenza: dedupe manuale time-consuming (chi è già stato contattato? chi non lo è?), email che non risultavano archiviate quando serviva la due diligence (compliance issue), monthly report che era un compito da sospirare.

## Cosa ha fatto l'agente IA

Soraia ha costruito un agente IA che **gestisce il backbone del deal flow in autonomia**:

1. **Monitora le email in arrivo** sui mailbox dei deal team
2. **Riconosce i contesti deal-related** (vs spam, newsletter, comunicazioni interne)
3. **Archivia automaticamente** eml + allegati su OneDrive, con metadata strutturati (deal name, founder, data, tipo allegato)
4. **Unifica i deal duplicati** nel CRM: riconosce che "Mario Rossi - Startup A" e "M. Rossi (CEO StartupA)" sono lo stesso record, propone il merge al team
5. **Genera il monthly report** con charts auto-aggiornati: deal pipeline, conversion rate per stage, attività per deal team, alert su deal stagnanti
6. **Manda gli alert** su deal che richiedono attenzione (no contatto da X giorni, term sheet pending, etc.)

Il team umano interviene solo sui passaggi che richiedono giudizio: approvare un merge, decidere se passare un deal a stage successivo, scrivere una comunicazione personale al founder.

## I risultati

**100% email archiviate** con allegati e metadata su OneDrive, pronta per qualsiasi due diligence.

**Zero ore di dedupe manuale**: l'agente riconosce e unifica i duplicati, l'umano approva il merge in un click.

**Monthly report auto-generato** ogni inizio mese, con charts e raccomandazioni operative.
