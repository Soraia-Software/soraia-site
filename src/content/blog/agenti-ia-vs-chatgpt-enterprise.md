---
title: "Agenti IA custom vs ChatGPT Enterprise — quando conviene cosa"
description: "Tre criteri concreti per capire se al tuo team serve una licenza ChatGPT Enterprise condivisa o un agente IA custom sui processi. Senza FOMO, senza vendite."
pubDate: 2026-05-08
author: "Daniel Levis"
tags: ["ai agents", "chatgpt", "buying-guide", "strategy"]
readMinutes: 5
featured: true
---

La domanda arriva quasi sempre alla seconda call: *"ma allora, perché non basta darli a tutti ChatGPT Enterprise?"*

Risposta onesta: **a volte basta**. E in quel caso, lo dico al cliente. Soraia non vince vendendo agenti dove non servono.

Ma servono spesso. Ecco i 3 criteri che usiamo per decidere.

## Criterio 1 — Chi deve eseguire il task

ChatGPT (anche Enterprise) **risponde** a una persona che gli fa una domanda. La persona deve leggere, valutare, agire.

Un agente **fa** il task. Riceve un trigger (nuovo CV in ATS, nuova fattura in cartella, nuovo ticket in helpdesk), esegue, agisce, notifica solo quando serve attenzione umana.

Se il task ha alto volume e l'output va sempre nei tuoi sistemi (CRM, ATS, ERP), ChatGPT non basta. Stai pagando perché qualcuno copi/incolli avanti-indietro.

**Cut-off pratico**: oltre i 20-30 task ripetitivi/settimana per persona, conviene un agente.

## Criterio 2 — Quanto è specifico il contesto

ChatGPT è generalista. Conosce tutto, non conosce il tuo business.

Un agente custom conosce:
- I tuoi prodotti / il tuo settore / il tuo brand voice
- I tuoi clienti specifici e la loro storia
- I tuoi processi reali, non quelli "best practice generici"

**Se il task richiede contesto domain-specific per essere fatto bene**, ChatGPT brucia 30-50% del valore in genericità. Un agente con accesso al tuo Brain (cartella di knowledge interna) elimina quel gap.

**Cut-off pratico**: se serve riformulare ogni prompt con 5+ righe di contesto (chi sei, cosa fai, regole del tuo settore), conviene un agente custom.

## Criterio 3 — Governance e auditabilità

ChatGPT Enterprise ha audit log, ma a livello di chat. Sai *che* qualcuno ha chiesto qualcosa, non *come è stata presa la decisione*.

Per settori regolamentati (recruitment con GDPR sui candidati, finance con audit trail richiesti, govtech con compliance gov-grade), questo non basta.

Un agente custom log:
- L'input ricevuto (anonimizzato dove serve)
- Le regole applicate (prompt + skill)
- L'output prodotto
- Chi/cosa ha attivato il trigger
- Se c'è stata escalation umana

**Cut-off pratico**: se devi rispondere "perché l'AI ha deciso X" davanti a un revisore o un cliente, ChatGPT da solo è insufficiente.

## La risposta media reale

Per il 60% delle PMI italiane, la risposta migliore è: **entrambi**.

- **ChatGPT/Copilot/Claude business** per il 70% del team su task variabili: ricerca, drafting, sintesi, analisi.
- **2-3 agenti custom** sui processi ad alto volume con output strutturato.

È esattamente quello che facciamo in Soraia: il tuo team usa l'LLM aziendale che già hai. Costruiamo agenti sopra quello stack, non ti chiediamo di cambiare provider.

## Quando NON costruire agenti

Te lo dico in faccia se mi chiami:
- **Team < 10 persone** con task molto vari → ChatGPT Enterprise + 1-2 automazioni Make
- **Processi cambieranno a breve** → costruire un agente custom su workflow che cambia tra 3 mesi è uno spreco
- **Zero baseline misurata** → senza sapere quanto costa oggi un task, non puoi misurare se l'agente ha senso

Per il resto: [parliamone](/parliamone) o [fai lo scorecard](/scorecard).
