---
title: "Assistente AI sui documenti aziendali: come costruirlo"
description: "Vuoi un assistente AI che risponda sui tuoi documenti interni senza mandare i dati in giro? Ecco come si costruisce, cosa serve e quando NON farlo."
pubDate: 2026-11-09
author: "Davide Silvestri"
tags:
  - "ai agents"
  - "knowledge base"
  - "rag"
  - "how-to"
keywords:
  - "assistente ai documenti aziendali"
  - "chatbot interno documenti"
  - "knowledge base aziendale"
  - "rag"
readMinutes: 6
featured: false
h1: "Un assistente IA che risponde sui documenti interni, senza mandare i dati in giro"
faq:
  - q: "I nostri documenti finiscono per addestrare un modello esterno?"
    a: "No, se lo imposti bene. In Soraia <strong>nessun LLM viene addestrato sui dati del cliente</strong>: i documenti restano nel tuo storage, il modello li legge al momento della domanda e li dimentica. Puoi usare infrastruttura europea o on-premise quando serve, con DPA art. 28 nel contratto."
  - q: "Che differenza c'è tra questo e dare ChatGPT a tutti?"
    a: "ChatGPT non conosce i tuoi contratti, le tue procedure o le tue policy interne. Un assistente sui documenti aziendali (RAG) risponde citando la fonte esatta dentro i tuoi file. ChatGPT generalista brucia valore in genericità e inventa risposte dove non sa."
  - q: "Quanto tempo serve per avere qualcosa di usabile?"
    a: "In Soraia il primo rilascio gira sui processi reali del cliente in <strong>4 settimane</strong>. Non parte già perfetto: parte su un perimetro chiaro (es. solo il manuale HR o solo i contratti fornitori) e migliora un rilascio alla volta."
  - q: "E se le risposte sono sbagliate?"
    a: "Un assistente ben costruito cita sempre la fonte, così l'utente verifica. Se i documenti sono disordinati o contraddittori, l'assistente erediterà quel disordine: per questo la prima fase è mettere ordine nella knowledge base, non solo collegarci un modello."
lang: "it"
gates:
  passedAt: 2026-10-25T08:44:30.481Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 8, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

Il COO lo chiede quasi sempre così: *"I miei ragazzi perdono mezz'ora a cercare la procedura giusta in SharePoint. Non possiamo mettere un'AI che risponde?"*

Risposta onesta: sì, si può, e spesso vale la pena. Ma un **assistente AI sui documenti aziendali** non è "caricare i PDF in ChatGPT". Ci sono tre decisioni che determinano se funziona o se diventa l'ennesimo tool che nessuno usa dopo due settimane.

**In breve:**
- Un assistente AI sui documenti aziendali (RAG) risponde alle domande dei dipendenti citando la fonte esatta dentro procedure, contratti, manuali e policy, senza che la persona debba cercare a mano.
- I dati NON devono uscire dalla tua azienda: in Soraia nessun LLM viene addestrato sui dati del cliente e puoi usare infrastruttura europea o on-premise.
- Il valore vero non è il modello, è l'ordine nella knowledge base: un assistente ereditato da documenti disordinati dà risposte disordinate.
- Si parte su un perimetro stretto (un dominio, non tutta l'azienda), con primo rilascio in produzione in 4 settimane.
- NON costruirlo se hai pochi documenti o se cambiano ogni settimana: in quel caso basta una buona ricerca interna.

## Cos'è davvero un assistente sui documenti aziendali

È un agente che, quando un dipendente fa una domanda in linguaggio naturale ("quanti giorni di permesso ho per il lutto?", "qual è la clausola di recesso col fornitore X?"), cerca dentro i tuoi documenti interni, trova il passaggio giusto e risponde **citando la fonte**. La tecnica si chiama RAG (Retrieval-Augmented Generation): il modello non "sa" la risposta, la recupera dai tuoi file e la riformula.

La differenza con ChatGPT è semplice: ChatGPT conosce tutto tranne il tuo business. Questo conosce solo il tuo business.

## Le tre decisioni che contano

### 1. Dove vivono i dati

Questa è la prima domanda del COO, ed è giusta. I tuoi contratti e le tue policy HR non devono finire ad addestrare un modello di terzi.

Come lo gestiamo in Soraia:
- I documenti restano nel **tuo storage**. L'assistente li legge al momento della domanda, non li copia dentro il modello.
- **Nessun training degli LLM sui dati del cliente**. Mai.
- Infrastruttura europea quando richiesto, on-premise quando serve.
- **DPA art. 28 GDPR** incluso nel contratto, con audit log su ogni risposta.

Questo non è eroismo: su documenti HR e contratti senza queste garanzie non potremmo nemmeno iniziare.

### 2. Il perimetro, non tutto subito

L'errore classico è: "colleghiamo tutto, SharePoint, Drive, le email, il gestionale". Risultato: l'assistente pesca da fonti contraddittorie e perde credibilità alla terza risposta sbagliata.

Si parte da **un dominio**: solo il manuale HR, oppure solo i contratti fornitori, oppure solo le procedure di qualità. Un perimetro stretto si misura, si corregge, si fa fidare le persone. Poi si allarga un rilascio alla volta. È lo stesso principio che usiamo per [gli agenti IA](/ai-agents): primo rilascio in produzione in 4 settimane, poi iterazione.

### 3. L'ordine nella knowledge base

Questa è la parte che nessuno vuole sentirsi dire: se i tuoi documenti sono disordinati, duplicati o contraddittori, l'assistente erediterà quel disordine. Non è magia, è un amplificatore.

Spesso la fase più utile non è tecnica: è mettere ordine. Capire quale versione della procedura è quella buona, archiviare i doppioni, segnare le fonti autorevoli. È lavoro che fa parte dello [sviluppo software su misura](/software-development), perché l'assistente è solo l'ultimo strato sopra una base ordinata.

## Dove conviene di più

Tre casi dove vediamo il ritorno più chiaro:
- **Onboarding**: i nuovi assunti chiedono all'assistente invece di interrompere i colleghi. Il tempo che gli esperti dedicano a rispondere alle stesse domande si riduce in modo misurabile.
- **Customer support interno**: chi risponde ai clienti trova la policy giusta in secondi invece di cercare. Si incastra bene con la [customer & compliance automation](/customer-support), dove l'agente suggerisce e l'umano approva.
- **Procedure operative e compliance**: dove la risposta sbagliata costa, la citazione della fonte è ciò che rende l'assistente usabile davvero.

## Quando NON costruirlo

Te lo diciamo in faccia:
- **Pochi documenti** (sotto qualche centinaio di pagine) → una buona ricerca interna basta e costa meno.
- **Documenti che cambiano ogni settimana** → manterrai l'assistente più di quanto lo userai.
- **Nessuno possiede la knowledge base** → senza un owner che tiene i documenti puliti, l'assistente degrada in fretta.

Se invece hai un corpus stabile, cercato spesso e importante da azzeccare, è uno dei progetti con il ROI più leggibile che esistano.

---

**Vuoi capire se il tuo caso regge?** [Parliamone in 20 minuti](/parliamone) oppure [fai il check-up](/check-up): ti diciamo onestamente se serve un assistente o se basta sistemare la ricerca che hai già.
