---
title: "Previsione domanda e scorte con un agente IA"
description: "Smettere di rincorrere ordini e rotture di stock: come un agente IA fa previsione della domanda e riordino scorte nelle PMI manifatturiere. Guida pratica."
pubDate: 2026-11-23
author: "Davide Silvestri"
tags:
  - "ai agents"
  - "supply chain"
  - "manifatturiero"
  - "how-to"
  - "automazione"
keywords:
  - "previsione domanda scorte ai"
  - "riordino automatico scorte"
  - "demand forecasting PMI"
  - "agente IA magazzino"
readMinutes: 7
featured: false
faq:
  - q: "Un agente IA sostituisce il mio ERP per la gestione scorte?"
    a: "No. L'agente <strong>legge</strong> i dati dal tuo gestionale (TeamSystem, Zucchetti, Odoo) e ci <strong>scrive</strong> le proposte di riordino. Non lo rimpiazza: lo rende proattivo invece che un registro passivo. L'ERP resta la fonte di verità, l'agente aggiunge la previsione e il trigger."
  - q: "Quanti dati storici servono per fare previsione della domanda?"
    a: "Come regola pratica servono almeno 18-24 mesi di storico ordini per codice, per catturare la stagionalità. Con meno dati la previsione è possibile ma il margine di errore cresce, e lo diciamo prima di partire invece di promettere accuratezza che non esiste."
  - q: "L'agente ordina da solo dai fornitori?"
    a: "Dipende da come lo configuri. Il default consigliato è: l'agente propone il riordino, un umano approva sopra una certa soglia di valore. Sotto soglia e per codici a basso rischio può emettere l'ordine in autonomia. La regola la decidi tu e resta nell'audit log."
  - q: "Quando NON ha senso un agente di previsione della domanda?"
    a: "Se vendi pochi codici con domanda stabile, un foglio Excel ben fatto basta. Se il tuo storico è sotto i 12 mesi o pieno di buchi, prima si sistemano i dati. E se non hai misurato quanto ti costano oggi rotture di stock e sovrascorte, non puoi dimostrare che l'agente abbia funzionato."
lang: "it"
gates:
  passedAt: 2026-10-25T09:23:12.715Z
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

# Previsione domanda e scorte con un agente IA

**Cos'è la previsione della domanda con un agente IA per le PMI?** La previsione domanda scorte ai è l'uso di un agente IA che legge in automatico lo storico ordini dal gestionale (ERP), calcola la domanda attesa per ogni codice e genera o esegue le proposte di riordino. Sostituisce il riordino reattivo a sensazione con un segnale guidato dai dati, che gira ogni notte senza intervento umano. Il risultato è una finestra più stretta tra problema e azione: dal "quando qualcuno se ne accorge" al "quando i dati lo indicano".

Il responsabile operations passa metà giornata a rincorrere due cose opposte: i codici finiti (vendite perse, clienti arrabbiati) e i codici fermi a magazzino da mesi (cassa immobilizzata). Entrambi costano. Entrambi sono prevedibili.

La **previsione domanda scorte ai** non è magia: è prendere lo storico che hai già, trasformarlo in un segnale di riordino, e farlo lavorare da un agente invece che dalla memoria del magazziniere.

**In breve:**

- La previsione della domanda con un agente IA funziona bene sopra i 18-24 mesi di storico ordini per codice: meno dati, più errore, lo diciamo prima di partire.
- L'agente non sostituisce l'ERP: legge i dati dal gestionale e ci riscrive le proposte di riordino, l'ERP resta la fonte di verità.
- Il default sicuro è riordino proposto + approvazione umana sopra soglia; sotto soglia e per codici a basso rischio l'agente può ordinare da solo.
- Senza una baseline misurata di rotture di stock e sovrascorte, nessun claim di risparmio è verificabile.
- In Soraia il primo rilascio gira sui tuoi processi reali in 4 settimane, poi migliora un rilascio alla volta.

## Il problema vero: non è previsione, è reazione

Nella maggior parte delle PMI manifatturiere il riordino è reattivo. Qualcuno guarda il magazzino, nota che un codice sta finendo, ordina. La previsione esiste solo nella testa di una persona, e sparisce quando quella persona è in ferie.

Il risultato sono i due errori classici:

- **Rottura di stock**: il codice finisce, la commessa si ferma, il cliente aspetta o compra altrove.
- **Sovrascorta**: ordini per sicurezza, il materiale resta fermo, la cassa è bloccata e rischi l'obsolescenza.

Un agente IA non elimina gli errori. Riduce la finestra in cui ti accorgi del problema: da "quando qualcuno lo nota" a "quando i dati lo indicano".

## Come lavora un agente di previsione della domanda

Non è un singolo modello: è una catena di passaggi che un agente esegue in automatico, ogni notte o ogni settimana.

### 1. Legge lo storico dal gestionale

L'agente si collega al tuo ERP (TeamSystem, Zucchetti, Odoo o il gestionale che hai) e tira fuori lo storico ordini per codice, le giacenze attuali, i lead time fornitore. Niente estrazioni manuali in Excel.

### 2. Calcola la previsione

Sulla base dello storico, della stagionalità e dei trend, stima la domanda attesa nelle prossime settimane per ogni codice. Qui serve storico pulito: con 18-24 mesi la stagionalità emerge, con 6 mesi è un indovinello statistico.

### 3. Confronta con le giacenze e il lead time

Incrocia la domanda prevista con quello che hai a magazzino e con quanto ci mette il fornitore a consegnare. Da qui nasce la proposta: cosa riordinare, quanto, entro quando.

### 4. Propone (o esegue) il riordino

L'agente genera la proposta di riordino e la scrive nel gestionale o la manda a chi approva. La regola di escalation la decidi tu: sopra una soglia di valore, umano sempre nel loop; sotto soglia e per codici a basso rischio, ordine in autonomia.

Ogni decisione finisce in un **audit log**: cosa ha previsto l'agente, su quali dati, cosa ha proposto, chi ha approvato. Serve per fidarsi e per il debugging.

## La parte che nessuno ti dice: prima vengono i dati

Questa è la verità scomoda. Un agente di previsione vale quanto i dati che legge.

Se il tuo storico ordini ha codici duplicati, unità di misura incoerenti, lead time fornitore mai aggiornati, la previsione sarà precisa nel modo sbagliato. Prima di promettere accuratezza, in Soraia guardiamo lo stato dei dati. A volte il primo sprint non è l'agente, è mettere ordine nel gestionale: è esattamente quello che facciamo in un'[analisi dei processi](/parliamone) o in uno sprint di [software su misura](/software-development) sul gestionale.

È lo stesso principio della [misurazione del ROI](/finance): senza una baseline, ogni numero è un'opinione.

## Un caso concreto nel manifatturiero

Il manifatturiero IoT è uno dei settori dove abbiamo lavorato. Per [40Factory](/case-studies/40factory), industrial IoT, abbiamo costruito 5 agenti IA su capture, enrichment, qualifica, attivazione CRM e follow-up per la lead generation da fiere B2B. Logica identica a quella del riordino scorte: dati grezzi in ingresso, agenti che li arricchiscono e li trasformano in azioni, umano che approva dove conta.

Lo stesso schema a catena, orchestrato con [agenti IA](/ai-agents), si applica alla supply chain: ogni passaggio è un agente, il risultato è un flusso che non dipende dalla memoria di una persona.

## Quando NON serve un agente

Te lo diciamo in faccia, come sempre:

- **Pochi codici, domanda stabile**: un Excel fatto bene basta e costa zero.
- **Storico sotto i 12 mesi o pieno di buchi**: prima si sistemano i dati, poi si parla di previsione.
- **Nessuna baseline misurata**: se non sai quanto ti costano oggi rotture e sovrascorte, non potrai dimostrare che l'agente abbia senso.

Per tutto il resto, la previsione della domanda è uno dei casi d'uso più misurabili che esistano: il magazzino parla in euro, e gli euro si contano.

## Il prossimo passo

Se il tuo problema è rincorrere ordini e scorte, partiamo dalla cosa giusta: capire se i dati che hai sono sufficienti. [Parliamone](/parliamone) in 20 minuti, oppure [fai il check-up](/check-up) in 3 minuti.
