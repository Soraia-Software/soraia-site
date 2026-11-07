---
titolo: "Il piano di produzione a capacità finita al posto del foglio Excel"
title: "Schedulazione della produzione a capacità finita"
description: "Per un costruttore di macchine abbiamo progettato uno schedulatore che legge gestionale e MES, considera operatori, assenze e terzisti e propone il piano."
settore: "manifattura"
perChi: "Un costruttore di macchine per l'edilizia"
inBreve: "Lo schedulatore legge ordini e avanzamento da gestionale e MES, tiene conto di competenze, assenze, turni e lavorazioni presso terzi e propone un piano di montaggio realistico. Chi pianifica confronta gli scenari e approva."
problema: "Il piano di produzione viveva in un foglio Excel aggiornato a mano ogni giorno. Gestionale e MES non si parlavano, quindi assenze, turni straordinari e lavorazioni presso terzi entravano nel piano solo quando qualcuno se ne ricordava. Bastava il ritardo di un fornitore per rifare tutto."
soluzione:
  - "Piano per centro di lavoro e per operatore, con le competenze di ciascuno"
  - "Assenze, turni straordinari e lavorazioni presso terzisti dentro il calcolo"
  - "Scenari a confronto (lotti, calendari) prima di approvare il piano"
  - "Ritardi e criticità evidenziati ordine per ordine"
  - "Aggiornamento automatico dai dati del gestionale e del MES"
ia: "Qui l'IA non è il centro del progetto: il valore sta nelle regole di pianificazione, scritte insieme a chi pianifica ogni giorno. È un esempio di come partiamo dal problema e non dalla tecnologia."
copertina:
  src: "/casi-d-uso/img/uc-36.webp"
  alt: "Linea di montaggio con bracci robotici arancioni in un capannone"
  fonte: "https://unsplash.com/photos/a-factory-filled-with-lots-of-orange-machines-8gr6bObQLOI"
articoli:
  - "/blog/schedulazione-produzione-capacita-finita-pmi/"
crmId: 36
ordine: 10
pubDate: 2026-11-07
---

## Da dove si parte

Si parte dal montaggio, senza toccare gli ordini di produzione che il gestionale genera già. Lo schedulatore prende quegli ordini come dato di partenza e decide solo in che sequenza lavorarli, su quale centro di lavoro e con quali persone.

## Per chi ha senso

Per un'azienda manifatturiera che pianifica ancora su Excel, con un gestionale e un MES che non si parlano tra loro. Se il piano cambia ogni volta che manca una persona o arriva in ritardo un componente, una schedulazione a capacità finita fa risparmiare ogni giorno il tempo di chi pianifica e rende affidabili le date promesse ai clienti.
