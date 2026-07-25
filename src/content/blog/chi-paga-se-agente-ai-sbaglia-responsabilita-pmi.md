---
title: "Se l'agente IA sbaglia, chi paga? Responsabilita' PMI"
description: "Quando un agente IA allucina o sbaglia, la responsabilita' resta tua. Contratti, DPA e polizze che le PMI ignorano prima di andare in produzione."
pubDate: 2026-08-10
author: "Daniel Levis"
tags:
  - "compliance"
  - "ai agents"
  - "liability"
  - "ai act"
keywords:
  - "responsabilita azienda errori agente ai"
  - "agente ai allucinazione"
  - "polizza ai pmi"
  - "contratto ai act"
readMinutes: 7
featured: false
h1: "Se il tuo agente IA sbaglia (o allucina), chi paga davvero?"
faq:
  - q: "Se l'agente IA sbaglia, la colpa e' del fornitore o mia?"
    a: "Verso il cliente finale o l'ente, la responsabilita' resta quasi sempre della tua azienda: sei tu il titolare del rapporto. Il fornitore risponde solo nei limiti scritti nel contratto e nel <strong>DPA art. 28 GDPR</strong>. Se il contratto tace, il rischio ricade su di te."
  - q: "Le polizze RC professionale coprono gli errori di un agente IA?"
    a: "Spesso no. Molte polizze tradizionali escludono o non contemplano i danni da sistemi automatizzati e allucinazioni. Prima di andare in produzione, chiedi per iscritto al broker se il tuo uso specifico dell'IA e' coperto."
  - q: "Cosa devo mettere nel contratto col vendor AI?"
    a: "Minimo: perimetro esatto dell'agente, limiti di autonomia, obbligo di <strong>audit log immutabile</strong>, DPA art. 28, e chi risponde di cosa. In Soraia questi punti sono nel contratto di sprint per default, non un extra."
  - q: "Un disclaimer 'output generato da AI' mi mette al sicuro?"
    a: "Riduce il rischio sui contenuti informativi client-facing, come richiede l'AI Act per i sistemi a rischio limitato, ma non ti esonera dai danni. Se l'agente prende una decisione operativa sbagliata, il disclaimer non basta: serve supervisione umana sui casi critici."
lang: "it"
gates:
  passedAt: 2026-07-25T06:23:18.250Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 9, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

> **Risposta diretta: chi e' responsabile quando un agente IA sbaglia?** Quando un agente IA usato dalla tua azienda causa un danno a un cliente o a un terzo, la parte responsabile e' la tua azienda, sia sul piano contrattuale sia in base all'AI Act. Il provider del modello (OpenAI, Anthropic) scarica la responsabilita' nei propri termini d'uso; la responsabilita' del vendor AI e' limitata da contratto. Come deployer, sei tu l'ultima linea di esposizione legale, a prescindere da quale sistema abbia generato l'errore.

La domanda arriva sempre dopo la prima demo, quando il CEO capisce che l'agente andra' davvero in produzione: *"e se sbaglia? Se dice una cavolata a un cliente, chi paga?"*

Risposta onesta e scomoda: **quasi sempre paghi tu**. Non il modello, non OpenAI, spesso nemmeno il fornitore. Sei tu il titolare del rapporto col cliente finale.

La buona notizia: il rischio si governa. Ma va fatto *prima* del go-live, non dopo il primo danno.

**In breve:**
- Verso il cliente finale, la responsabilita' per un errore o un'allucinazione dell'agente IA resta della tua azienda, non del fornitore del modello.
- Molte polizze RC professionale tradizionali non coprono i danni da sistemi automatizzati: va verificato per iscritto col broker prima della produzione.
- Il contratto col vendor AI deve fissare perimetro, limiti di autonomia, audit log immutabile e DPA art. 28 GDPR. Se tace, il rischio e' tuo.
- L'AI Act (in vigore, piena applicazione da agosto 2026) impone trasparenza sui sistemi a rischio limitato e supervisione umana su quelli ad alto rischio.
- La difesa piu' efficace non e' una clausola: e' la supervisione umana sui casi critici e un log che ricostruisce ogni decisione.

## La catena di responsabilita' che le PMI non vedono

Quando un agente sbaglia, ci sono tre soggetti nella stanza: tu (che usi l'agente), il fornitore che l'ha costruito (es. Soraia), e il provider del modello (OpenAI, Anthropic). L'istinto e' pensare che la colpa risalga la catena. Nella pratica succede il contrario.

Verso il tuo cliente finale, il fornitore o l'ente pubblico, **il responsabile sei tu**. Sei tu ad aver mandato quella email, quel preventivo sbagliato, quella risposta di supporto che ha promesso un rimborso inesistente. L'agente e' un tuo strumento, come lo sarebbe un dipendente junior.

Il fornitore AI risponde solo di quello che c'e' scritto nel contratto. Il provider del modello, praticamente di nulla: i loro termini d'uso scaricano quasi tutto il rischio a valle.

Morale: se il contratto tra te e il tuo fornitore AI e' vago, il rischio resta appeso a te.

## L'allucinazione non e' un bug esotico, e' un caso operativo

Smettiamo di trattare le allucinazioni come fantascienza. Un agente di [customer support](/customer-support) puo' inventare una policy di reso che non esiste. Un agente commerciale puo' citare uno sconto mai approvato. Un agente di [finance](/finance) puo' leggere male un importo su una fattura.

Nessuno di questi e' un evento raro. Sono il rumore di fondo di qualunque sistema probabilistico. Il punto non e' "come elimino le allucinazioni" (non puoi al 100%), ma "**cosa succede quando accade, e chi ne risponde**".

Due leve reali:

1. **Perimetro stretto.** Un agente che *propone* e fa firmare a un umano ha un profilo di rischio completamente diverso da uno che *agisce* in autonomia. Meno autonomia sui casi ad alto danno, meno esposizione.
2. **Tracciabilita'.** Se non puoi ricostruire perche' l'agente ha detto X, non puoi difenderti ne' col cliente ne' con un revisore. Per questo in ogni nostro sprint c'e' un **audit log immutabile** su ogni decisione: input, regole applicate, output, trigger, eventuale escalation.

## Cosa dice l'AI Act (in vigore, piena applicazione agosto 2026)

L'AI Act non ti dice "chi paga", ma alza gli obblighi che, se ignorati, ti mettono in torto.

- **Rischio limitato** (chatbot client-facing): obbligo di trasparenza. L'utente deve sapere che parla con un'IA.
- **Rischio alto** (recruitment automatico, scoring, decisioni su persone): risk assessment, logging, supervisione umana, conservazione record.

Se usi un agente ad alto rischio senza supervisione umana documentata e succede un danno, non stai solo pagando il danno: stai anche violando il Regolamento. Abbiamo scritto la mappa completa degli obblighi per settore nella [guida all'AI Act per le PMI](/guide/ai-act-aziende).

## Le 4 cose da sistemare prima del go-live

### 1. Il contratto col vendor
Deve fissare perimetro dell'agente, limiti di autonomia, obbligo di logging, DPA art. 28 GDPR e chi risponde di cosa. Se il tuo fornitore non vuole metterlo per iscritto, e' un segnale.

### 2. La polizza
Chiama il broker e chiedi **per iscritto**: la mia RC professionale copre danni causati da un sistema IA automatizzato? Molte polizze tradizionali non lo prevedono. Meglio scoprirlo ora che dopo.

### 3. La supervisione umana sui casi critici
Definisci upfront dove l'agente decide da solo e dove passa a un umano. Regola pratica: piu' alto e' il danno potenziale di un errore, piu' l'umano deve essere nel loop.

### 4. Il log
Senza tracciabilita' non hai difesa. Ogni decisione in produzione va loggata in modo immutabile.

## Quando NON serve tutta questa struttura

Te lo dico chiaro: se il tuo agente riordina la tua casella email interna o sintetizza documenti per il tuo team, gran parte di questo e' overkill. Il rischio legale scatta quando l'output **esce verso terzi** o **decide su persone**. Per l'automazione puramente interna e a basso danno, un buon log e una policy interna bastano.

Noi non vendiamo paura. Costruiamo agenti dove servono, con il perimetro e i controlli proporzionati al rischio reale, non a quello raccontato nelle email di marketing.

---

**Vuoi capire in quale categoria di rischio ricade il tuo caso, e cosa serve davvero?** Lo mappiamo insieme: [parliamone in 20 minuti](/parliamone) o dai un'occhiata a come costruiamo gli [agenti IA](/ai-agents) con log e DPA inclusi di default.
