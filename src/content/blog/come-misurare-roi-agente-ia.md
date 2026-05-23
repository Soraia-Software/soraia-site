---
title: "Come misurare il ROI di un agente IA — framework + baseline che funzionano"
description: "Senza baseline, ogni claim 'l'AI ci ha fatto risparmiare X ore' è un'opinione. Il framework che usiamo con i clienti Soraia per misurare ROI con onestà."
pubDate: 2026-05-15
author: "Daniel Levis"
tags: ["ai agents", "roi", "metrics", "methodology"]
readMinutes: 6
featured: true
---

La domanda più importante che fa un CEO prima di firmare un sprint AI non è "quanto costa", è "**come saprò che funziona**".

E qui la maggior parte degli AI integrator scappa, perché misurare ROI di un agente è difficile se non hai messo le fondamenta giuste prima.

Questo è il framework che usiamo in Soraia per ogni sprint. Quattro pezzi: baseline, perimetro, metric, finestra.

## 1. La baseline che NON funziona

"I miei recruiter passano metà del tempo a leggere CV." — questa NON è una baseline.

È un'opinione raccontata in riunione. Non è misurata. Non è ripetibile. Non è confutabile.

Una baseline reale richiede:
- **Tempo cronometrato** su un sample di 10-20 task reali
- **Distribuzione del tempo** tra fasi (lettura, valutazione, data entry)
- **Outcome misurato** (CV scartati / promossi / errori segnalati)

Questa l'abbiamo fatta su 8-12 clienti di Soraia. Costa una settimana. Sblocca tutto.

## 2. Il perimetro chiaro

L'agente fa una cosa, non tutte. Definisci:

- **Cosa è dentro lo scope**: es. "screening CV inbound da Bullhorn"
- **Cosa è fuori**: es. "no executive search (richiede senior touch)", "no candidati referenziati"
- **Quali eccezioni gestisce l'agente** vs quali escalation a umano

Sembra ovvio. Non lo è. Il 70% dei progetti AI falliscono perché lo scope diventa elastico.

## 3. Il metric primario (uno solo)

**Un solo metric primario** per sprint. Tutto il resto è secondario.

Esempi reali Soraia:
- Recruitment: **ore/recruiter/settimana recuperate** su screening
- Accounting: **% fatture processate senza intervento umano**
- Customer Support: **first-response-time in minuti**

Multipli metric = nessun metric. Scegli uno, misura prima e dopo, decidi se ha funzionato.

## 4. La finestra di misurazione

- **Pre-sprint (1 settimana)**: baseline cronometrata
- **Settimana 1 dopo deploy**: shadow mode, l'agente lavora ma umano controlla
- **Settimana 2-4**: live, con escalation
- **30 giorni di hypercare**: finestra reale per la misurazione finale

Misurare prima del 30° giorno = misurare il rumore. La curva di adoption ha bisogno di tempo per stabilizzarsi.

## La garanzia che ne discende

Quando i 4 pezzi sopra sono chiari, puoi promettere ROI in modo concreto. Ed è esattamente quello che facciamo con la **garanzia "ore recuperate o rimborso"**: il target del metric primario è scritto nel contratto, misurato sulla baseline definita insieme, valutato a 30gg dal go-live.

Se non raggiungiamo il target, lavoriamo gratis o rimborsiamo lo sprint. Non perché siamo eroici — perché abbiamo costruito il sistema di misurazione che lo rende verificabile.

---

**Vuoi vedere come funziona sul tuo caso?** [Fai lo scorecard](/scorecard) (3 minuti, no email) o [parlami direttamente](/parliamone).
