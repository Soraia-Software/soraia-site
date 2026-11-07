---
title: "Riconciliazione incassi Amazon: le distinte che non tornano"
description: "Riconciliazione incassi Amazon: confronta le distinte con il gestionale, classifica resi, commissioni e riserve e prepara le registrazioni da approvare."
pubDate: 2026-12-03
author: "Daniel Levis"
tags:
  - "e-commerce"
  - "finance"
  - "contabilità"
  - "how-to"
keywords:
  - "riconciliazione incassi Amazon"
  - "distinte Amazon contabilità"
  - "settlement report Amazon"
  - "riconciliazione marketplace"
readMinutes: 6
featured: false
h1: "Riconciliazione degli incassi Amazon: perché la distinta non torna"
faq:
  - q: "Serve l’accesso alle API di Amazon?"
    a: "È la via migliore: con l’autorizzazione del venditore il sistema scarica le distinte da solo. In alternativa si può partire dai file scaricati da Seller Central, con un passaggio manuale in più."
  - q: "Funziona con un gestionale datato come l’AS400?"
    a: "Sì. Il sistema lavora sull’export degli ordini e restituisce un file di registrazioni da importare, quindi non serve cambiare gestionale né toccarne il codice."
  - q: "Le registrazioni contabili partono da sole?"
    a: "No. Il sistema le propone con la causa di ogni differenza, e la persona le approva. Solo dopo l’approvazione il file è pronto per l’importazione nel gestionale."
  - q: "Cosa sono le riserve nella distinta?"
    a: "Sono importi che Amazon trattiene in una distinta e rilascia in una successiva. Se non si tracciano sembrano ammanchi; il sistema le riconosce e le tiene separate dalle differenze vere."
  - q: "Vale anche per altri marketplace?"
    a: "Il principio sì: distinta, ordini, differenze spiegate e registrazioni da approvare. Ogni marketplace ha però i suoi report e le sue causali, quindi va mappato a parte."
lang: "it"
draft: false
---

Ogni distinta di Amazon mescola vendite, resi, commissioni e riserve, e l'amministrazione passa ore a capire perché l'incasso arrivato in banca non coincide con gli ordini nel gestionale. A ogni periodo la stessa scena, e ogni volta qualcuno ricostruisce la differenza a mano.

La riconciliazione degli incassi Amazon si automatizza quasi del tutto: le distinte sono file strutturati, gli ordini stanno nel gestionale. Serve un sistema che li confronti, spieghi ogni differenza e lasci alla persona solo l'approvazione.

**In breve:**
- La distinta di Amazon (settlement report) raggruppa in un unico incasso vendite, resi, rimborsi, commissioni e riserve: per questo il bonifico non coincide con il totale degli ordini.
- Amazon genera le distinte in automatico e non si possono richiedere: si scaricano via Selling Partner API, nel formato V2 con le colonne amount-type, amount-description e amount.
- Un sistema di riconciliazione confronta la distinta con gli ordini del gestionale, anche un AS400, classifica ogni differenza per causa e propone le registrazioni da approvare.
- L'intelligenza artificiale classifica le differenze e propone, la persona approva; le commissioni da contestare finiscono in un elenco a parte.
- Il primo rilascio in produzione arriva in 4 settimane.

## Perché l'incasso Amazon non torna con il gestionale?

Nel gestionale ci sono gli ordini. Nella distinta di Amazon c'è molto di più, compensato in un unico bonifico:

- le **vendite** del periodo, con prezzi e spedizioni;
- i **resi e i rimborsi**, che sottraggono importi di ordini anche di periodi precedenti;
- le **commissioni** di vendita e di servizio;
- gli **sconti e le promozioni**;
- le **riserve**, cioè importi che Amazon trattiene in una distinta e rilascia in una successiva.

Il risultato è un incasso che non corrisponde a nessun numero del gestionale. Riconciliarlo a mano vuol dire scorrere le righe una per una e chiedersi ogni volta da dove viene la differenza.

## Da dove arrivano i dati

Le distinte le genera Amazon, in automatico: secondo la [documentazione della Selling Partner API](https://developer-docs.amazon/sp-api/docs/report-type-values-settlement) non si possono richiedere né programmare, si cercano tra i report disponibili. Il formato attuale, il flat file V2, raccoglie gli importi in tre colonne generali, amount-type, amount-description e amount, ed è questo che rende il file leggibile da un sistema.

Per vedere i movimenti senza aspettare la chiusura della distinta, la [Finances API](https://developer-docs.amazon/sp-api/docs/finances-api) restituisce gli eventi finanziari per ordine o per periodo.

## Cosa fa il sistema che abbiamo progettato

Per un'azienda che vende ai consumatori anche su Amazon, con un gestionale AS400, abbiamo progettato un sistema che:

1. **scarica le distinte via API**, senza download manuali;
2. **le confronta con l'export degli ordini** del gestionale;
3. **classifica le differenze per causa**: reso, sconto, commissione, riserva;
4. **propone le registrazioni** da approvare, con il file pronto da importare nel gestionale;
5. **tiene l'elenco delle contestazioni**, cioè delle commissioni che non tornano e vanno contestate ad Amazon.

L'amministrazione non ricostruisce più la differenza: la trova già spiegata, e approva.

## Dove serve l'intelligenza artificiale

L'IA lavora sulla classificazione: legge le righe della distinta, le abbina agli ordini e attribuisce ogni differenza alla sua causa. Poi propone la registrazione. La decisione resta alla persona: nessuna scrittura contabile parte senza approvazione.

È lo stesso principio della [riconciliazione bancaria automatica](/blog/riconciliazione-bancaria-automatica-agente-ia/): il sistema fa l'abbinamento, la persona vede solo i casi dubbi e le proposte da confermare.

## Quando non serve

- **Pochi ordini al mese su Amazon**: la riconciliazione a mano costa meno del progetto.
- **Il gestionale o un connettore e-commerce riconcilia già le distinte** in modo affidabile: usa quello.
- **Ti basta registrare il bonifico** senza il dettaglio per ordine: il problema non c'è, finché non arriva la prima commissione da contestare.

## Tempi e costi

Lavoriamo a prezzo fisso: un'**Analisi da 3.000 €**, facoltativa, per mappare distinte, causali e registrazioni, poi lo **Sprint da 8.000 € al mese**, con il primo rilascio in produzione in **4 settimane** e la garanzia **primo mese soddisfatti o rimborsati**. Come lavoriamo sui processi amministrativi lo trovi nella pagina [Finance](/finance/).

## Il prossimo passo

Se ogni distinta Amazon ti costa ore di ricostruzione, [parliamone in 20 minuti](/parliamone/): ti mostro come si presenta una distinta riconciliata, con ogni differenza già spiegata. Per altri processi su misura, trovi come lavoriamo nella pagina [sviluppo software](/software-development/).
