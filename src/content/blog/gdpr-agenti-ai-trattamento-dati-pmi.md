---
title: "GDPR e agente IA sui dati aziendali: cosa fare prima"
description: "Un agente IA che legge dati di clienti o candidati tratta dati personali. Base giuridica, DPA art. 28 e DPIA: la checklist GDPR da chiudere prima di accenderlo."
pubDate: 2026-09-14
author: "Daniel Levis"
tags:
  - "gdpr"
  - "compliance"
  - "ai agents"
  - "how-to"
keywords:
  - "gdpr agente ai dati aziendali"
  - "dpa art 28 ai"
  - "garante privacy agenti ai"
  - "dpia agente ia"
readMinutes: 7
featured: false
h1: "Un agente IA legge i dati dei tuoi clienti: cosa vuole il Garante prima di accenderlo"
faq:
  - q: "Un agente IA che legge le email dei clienti tratta dati personali?"
    a: "Sì. Nel momento in cui l'agente accede a nomi, email, numeri di telefono, CV, ticket o fatture con dati riferibili a persone fisiche, tratta dati personali ai sensi del GDPR. Serve una <strong>base giuridica</strong> documentata (di norma il legittimo interesse o l'esecuzione di un contratto) e un registro dei trattamenti aggiornato."
  - q: "Serve un DPA se uso un fornitore esterno per l'agente IA?"
    a: "Sì. Se il fornitore (Soraia, OpenAI, Anthropic o altri) tratta dati per tuo conto, è un responsabile del trattamento e serve un <strong>Data Processing Agreement ex art. 28 GDPR</strong>. In Soraia il DPA è incluso nel contratto di ogni sprint, insieme all'impegno a non usare i tuoi dati per addestrare gli LLM."
  - q: "Quando devo fare una DPIA per un agente IA?"
    a: "Quando il trattamento è su larga scala, riguarda categorie particolari di dati o produce effetti significativi sulle persone: per esempio uno screening CV automatizzato. In questi casi la valutazione d'impatto (DPIA) è obbligatoria e va fatta prima di andare live."
  - q: "Il Garante può bloccare un agente IA in produzione?"
    a: "Sì: l'autorità di controllo può ordinare la sospensione del trattamento ai sensi dell'art. 58(2)(f) GDPR. Il rischio pratico però non è la sanzione massima teorica: è dover spegnere l'agente perché non sai spiegare quale base giuridica lo copre, dove finiscono i dati e chi supervisiona le decisioni. Chiudere questi tre punti prima elimina l'esposizione principale."
lang: "it"
gates:
  passedAt: 2026-08-25T05:12:40.427Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8.5, pass: true }
    - { name: "brand-voice", score: 9, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

Alla prima call la domanda tecnica è sempre la stessa: *"l'agente può leggere la casella clienti?"*. La domanda giusta arriva dopo, e la fa il DPO: *"e a norma GDPR possiamo?"*.

La risposta onesta: quasi sempre sì, ma solo se chiudi tre cose prima di accendere l'agente. Non dopo. Se le lasci aperte, l'agente resta un rischio che qualcuno prima o poi ti chiede di spegnere.

L'AI Act (ne parliamo nella [guida dedicata](/guide/ai-act-aziende)) risponde a "che tipo di sistema è". Il GDPR risponde a "puoi trattare questi dati con questo sistema". Sono due lenti diverse. Qui parliamo della seconda.

## Cosa chiede il GDPR prima di accendere un agente IA

- Un agente IA che legge email, CV, ticket o fatture con dati riferibili a persone fisiche **tratta dati personali**: si applica il GDPR per intero.
- Prima di andare live servono tre cose: **base giuridica** documentata, **DPA art. 28** con ogni fornitore che tratta i dati, e **DPIA** dove il trattamento è ad alto impatto (es. screening CV).
- Il fornitore dell'agente (incluso chi fornisce l'LLM) è un **responsabile del trattamento**: senza DPA sei scoperto.
- Il rischio reale non è la multa massima teorica, è dover **spegnere l'agente** perché non sai spiegare base giuridica, flusso dei dati e supervisione umana.
- In Soraia DPA art. 28, audit log immutabile e no-training sugli LLM sono inclusi di default in ogni sprint, perché senza non potremmo lavorare su settori regolamentati.

## Passo 1. Stabilisci se l'agente tratta dati personali (quasi sempre sì)

Nel momento in cui l'agente accede a un nome, una email, un numero di telefono, un CV, un ticket o una fattura con dati riferibili a una persona fisica, sta trattando dati personali. Non conta che sia "solo lettura" o che l'output resti interno.

Quindi la domanda pratica non è *se* si applica il GDPR, ma *quale* trattamento stai facendo. Mappa tre cose:

- **Quali dati** tocca l'agente (email clienti, dati candidati, dati di pagamento).
- **Per quale finalità** (triage ticket, screening CV, riconciliazione fatture).
- **Dove finiscono** input e output (nel tuo CRM, in un log, verso l'LLM del provider).

Questo va aggiornato nel registro dei trattamenti. È la base di tutto il resto.

## Passo 2. Scegli e documenta la base giuridica

Nessun trattamento senza base giuridica. Per gli agenti IA nelle PMI le due più comuni sono:

- **Esecuzione di un contratto**: es. un agente di [customer support](/customer-support) che gestisce ticket di clienti attivi.
- **Legittimo interesse**: es. arricchimento lead o triage interno, con un LIA (bilanciamento di interessi) scritto.

Il consenso serve raramente e va evitato dove ci sono alternative, perché è revocabile e fragile. Per lo screening candidati la base è di norma le misure precontrattuali, ma scatta l'obbligo di trasparenza: il candidato deve sapere che un sistema automatizzato è coinvolto.

**Regola pratica**: se davanti a un revisore non sai indicare in una riga la base giuridica di quel trattamento, l'agente non è pronto per la produzione.

## Passo 3. Chiudi il DPA art. 28 con ogni fornitore

Se un fornitore esterno tratta i dati per tuo conto, è un responsabile del trattamento. Questo vale sia per chi costruisce l'[agente](/ai-agents), sia per chi fornisce l'LLM sottostante.

Serve un **Data Processing Agreement ex art. 28 GDPR** che copra almeno:

- finalità e durata del trattamento;
- misure di sicurezza;
- eventuali sub-responsabili (i provider LLM lo sono);
- **niente addestramento dei modelli sui tuoi dati**;
- localizzazione dei dati (UE quando richiesto).

In Soraia il DPA art. 28 è incluso nel contratto di ogni sprint, con impegno esplicito a non usare i dati cliente per addestrare gli LLM e hosting UE dove serve. Non è un favore: senza, non potremmo nemmeno accettare progetti recruitment o finance.

## Passo 4. Fai la DPIA dove l'impatto è alto

La valutazione d'impatto (DPIA) è obbligatoria quando il trattamento è su larga scala, tocca categorie particolari di dati o produce effetti significativi sulle persone. Lo **screening CV** rientra quasi sempre. Un agente che riconcilia fatture interne, di norma no.

La DPIA va fatta **prima** del go-live e va tenuta viva. Nei nostri sprint su settori regolamentati la consegniamo come deliverable, insieme all'audit log immutabile di ogni decisione dell'agente, che è ciò che ti permette di rispondere "perché il sistema ha fatto X".

## Quando il GDPR ti dice di NON accendere l'agente (per ora)

Te lo diciamo in call, senza girarci intorno:

- **Non sai indicare la base giuridica** di quel trattamento: fermati e chiudila prima.
- **Il fornitore LLM non offre un DPA accettabile** o addestra sui tuoi dati: cambia setup, non accendere.
- **Categorie particolari di dati** (salute, opinioni, dati sensibili) senza le garanzie rafforzate: serve un percorso più lungo, non uno sprint standard.

In questi casi la risposta corretta non è "vendiamo comunque". È sistemare le fondamenta o rimandare.

Se vuoi capire in quale scenario ricadi, lo verifichiamo caso per caso: [parliamone](/parliamone) 20 minuti, oppure inizia dal [check-up](/check-up) di 3 minuti.
