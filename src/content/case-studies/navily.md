---
title: "Navily, Agente IA moderazione recensioni + enrichment dati nautici"
client: "Navily"
clientLogo: "/logos/clients/navily.webp"
industry: "consumer-education"
sector: "Consumer mobile · Travel & nautical"
service: "Agente IA moderazione + enrichment"
pubDate: 2026-03-08
dimensioni: "11-50"
featured: true
stakeholder:
  name: "Edouard Fiess"
  role: "CEO & Co-Founder"
  photo: "/testimonials/edouard-fiess-navily.webp"
heroQuote: "L'IA modera recensioni, immagini e arricchisce i dati: -70% di tempo operativo, alta precisione. Il team torna sul prodotto, non sul triage manuale."
shortQuote: "-70% tempo operativo su moderation ed enrichment. Il team torna sul prodotto."
teaser:
  problem: "Migliaia di recensioni e immagini utente da moderare prima della pubblicazione, dati su porti e ancoraggi spesso incompleti, ore di operations bruciate su task ripetitivi."
  action: "Agente IA che modera recensioni e immagini sui criteri editoriali Navily, fa enrichment automatico dei dati nautici (porti, ancoraggi, servizi) da fonti pubbliche, fa escalation umana solo sui casi limite."
  resultMetric: "70%+ di riduzione del tempo operativo · alta precisione mantenuta"
  resultBody: "Il team prodotto può scalare la community senza moltiplicare le ore di moderazione."
stats:
  - value: "70%+"
    label: "Tempo operativo ridotto"
    sub: "su moderazione + enrichment"
  - value: "Alta precisione"
    label: "Validata in produzione"
    sub: "con escalation umana"
  - value: "Multi-dominio"
    label: "Recensioni · immagini · dati"
    sub: "stesso agente"
timeline: "Agente in produzione, scaling continuo"
stack:
  - "OpenAI / Anthropic (moderation + extraction)"
  - "Vision API (image moderation)"
  - "Pipeline custom enrichment"
  - "Integrazione backend Navily"
screenshots:
  - src: "/case-studies/navily/01.webp"
    caption: "App Navily: porti turistici Mediterraneo"
  - src: "/case-studies/navily/02.webp"
    caption: "Recensioni e immagini utente moderate dall'agente"
  - src: "/case-studies/navily/03.webp"
    caption: "Dettaglio porto con dati arricchiti"
  - src: "/case-studies/navily/04.webp"
    caption: "Flusso prenotazione ormeggio"
related:
  - "storywonder"
  - "stars-be-original"
  - "talent-match"
---

## Il contesto

Navily è **la principale app europea per la prenotazione di porti turistici e ancoraggi nautici**. Diportisti, capitani e charter usano l'app per trovare ormeggi, leggere recensioni, vedere immagini di porti, prenotare posti barca lungo le coste mediterranee e atlantiche.

Il valore di Navily dipende dalla **qualità della community**: recensioni affidabili, immagini reali e aggiornate, dati nautici accurati (profondità, servizi, prezzi, contatti del marina). Ogni contenuto user-generated deve essere validato prima della pubblicazione.

## Il problema reale

L'app ha scalato velocemente. Con la crescita della community, il triage manuale è diventato insostenibile:

- **Recensioni utente** che arrivano ogni giorno: alcune autentiche e utili, altre fake/spam, altre con contenuti inappropriati (volgarità, attacchi personali, off-topic). Tutte da leggere, valutare, approvare o rifiutare.
- **Immagini caricate** dai diportisti: la maggior parte foto del porto/ancoraggio, ma anche selfie inappropriati, immagini sfocate, foto non pertinenti. Tutte da moderare.
- **Dati nautici incompleti**: ogni nuovo porto/ancoraggio aggiunto al database richiedeva enrichment manuale (profondità, tipo di fondale, servizi disponibili, contatti, prezzi medi) consultando fonti diverse (siti dei marina, mappe nautiche, database pubblici).

Risultato operativo: ore di lavoro umano del team prodotto bruciate ogni giorno su task ripetitivi a basso valore, invece che su evoluzione del prodotto, partnership con marina, espansione geografica.

## Cosa ha fatto l'agente IA

Soraia ha costruito un **agente IA multi-task** che gestisce tre flussi in parallelo:

1. **Moderazione recensioni**, l'agente legge ogni nuova recensione, la valuta sui criteri editoriali Navily (autenticità segnali, qualità linguistica, conformità community guidelines, presenza di contenuti vietati), e propone approve/reject con score di confidence. Il team rivede solo i borderline.
2. **Moderazione immagini**, l'agente analizza ogni immagine caricata: rileva contenuti inappropriati (NSFW, volti riconoscibili senza consenso, foto non pertinenti come selfie), valuta la qualità (sfocatura, framing, illuminazione), classifica per tipo (porto, ormeggio, servizio, vista panoramica).
3. **Enrichment dati nautici**, quando un nuovo porto/ancoraggio viene aggiunto, l'agente cross-referenzia automaticamente fonti pubbliche (mappe nautiche, siti ufficiali dei marina, database pubblici) per completare i campi mancanti: profondità, tipo di fondale, servizi disponibili, contatti, range prezzi.

In tutti e tre i flussi, l'agente **non approva mai contenuti borderline in autonomia**: passa al team umano i casi a confidence intermedia. Sopra una certa soglia (chiara autenticità) approva direttamente; sotto una certa soglia (chiaro contenuto inappropriato) rigetta direttamente; in mezzo, escalation.

## I risultati

**70%+ di riduzione del tempo operativo** sul triage di recensioni, immagini ed enrichment. Numero dichiarato pubblicamente dal CEO Edouard Fiess.

**Alta precisione mantenuta**: la qualità della community Navily non si è degradata con l'introduzione dell'agente, anzi, è migliorata grazie alla consistenza dei criteri applicati (l'agente non si stanca, non ha "giornate storte", applica gli stessi criteri al primo come al millesimo contenuto della giornata).

**Scalabilità sbloccata**: Navily può crescere la community e l'inventario porti senza moltiplicare il team di moderazione. Le ore liberate vanno su lavoro a valore aggiunto (prodotto, partnership, espansione mercati).

## Cosa è incluso oggi

Sistema in produzione con scaling continuo: nuovi flussi di moderazione vengono integrati nell'agente man mano che Navily espande feature (es. moderazione contenuti video, validation di check-in geo-locati, anti-fraud sui pagamenti).

Navily è un esempio del pattern **"agente multi-task in produzione consumer-grade"**: stesso agente, multipli flussi, alta volume, qualità mantenuta.
