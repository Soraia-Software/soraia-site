---
title: "Perché falliscono i progetti di automazione nelle PMI"
description: "I progetti di automazione nelle PMI raramente falliscono per la tecnologia. Ecco i 4 anti-pattern di change management che vediamo sempre, e come evitarli."
pubDate: 2026-07-02
author: "Daniel Levis"
tags:
  - "automazione"
  - "change-management"
  - "ai agents"
  - "opinion"
keywords:
  - "perché falliscono progetti automazione"
  - "change management automazione PMI"
  - "anti-pattern automazione"
readMinutes: 6
featured: false
h1: "Perché i progetti di automazione falliscono nelle PMI (4 anti-pattern)"
faq:
  - q: "Perché la maggior parte dei progetti di automazione fallisce?"
    a: "Raramente per la tecnologia. Falliscono per motivi di change management: nessuna baseline misurata, sponsor assente, scope elastico e nessuno che possiede il processo dopo il go-live. La parte tecnica è quasi sempre la meno rischiosa."
  - q: "Chi deve essere lo sponsor di un progetto di automazione?"
    a: "Una persona sola, con potere di dire di no. Deve essere abbastanza senior da difendere lo scope quando arrivano richieste extra, e abbastanza vicino al processo da riconoscere se l'agente sta lavorando. Se lo sponsor delega e sparisce, il progetto muore lento."
  - q: "Quanto tempo serve per capire se un'automazione funziona?"
    a: "Servono almeno 30 giorni dopo il go-live. Misurare prima significa misurare il rumore: la curva di adozione deve stabilizzarsi. Noi in Soraia includiamo 30 giorni di hypercare proprio per questo."
  - q: "Cosa fare prima di iniziare un progetto di automazione?"
    a: "Misurare la baseline. Cronometrare 10-20 task reali, capire dove va il tempo oggi, scegliere un solo metric primario. Senza questo non puoi sapere se l'automazione ha senso, né dimostrarlo dopo."
lang: "it"
draft: false
---

Ogni volta che un progetto di automazione fallisce, la prima cosa che sento è: *"la tecnologia non era pronta"*.

Quasi mai è vero. Nel 90% dei casi che vediamo, il motivo per cui falliscono i progetti di automazione è organizzativo, non tecnico. Sono sempre gli stessi 4 anti-pattern.

**In breve:**
- I progetti di automazione nelle PMI falliscono per change management, non per la tecnologia: la parte tecnica è la meno rischiosa.
- Senza una baseline cronometrata prima di partire, non puoi dimostrare se l'agente ha funzionato: ogni claim resta un'opinione.
- Lo scope elastico uccide più progetti di qualsiasi bug: ogni "già che ci siamo" allontana il go-live.
- Un progetto senza uno sponsor interno unico e presente muore lento, indipendentemente dalla qualità del software.
- La misurazione reale arriva a 30 giorni dal go-live, non prima: la curva di adozione ha bisogno di stabilizzarsi.

## Anti-pattern 1. Nessuna baseline (il peccato originale)

"I nostri ragazzi passano metà del tempo su questo task." Ok. Quanto è metà? Su quanti task? Con quanti errori?

Se non hai una risposta cronometrata, non hai una baseline, hai un'impressione. E su un'impressione non puoi né decidere se automatizzare, né dimostrare dopo che è servito.

Una baseline reale è una settimana di lavoro: cronometri 10-20 task veri, distribuisci il tempo tra le fasi, misuri gli outcome. Noi in Soraia questa la facciamo prima di ogni sprint, ed è il motivo per cui possiamo scrivere il target nel contratto con la garanzia "ore recuperate o rimborso". Senza baseline, quella garanzia non esisterebbe.

## Anti-pattern 2. Lo scope che si allarga ("già che ci siamo")

Parti per automatizzare lo screening dei CV. Alla terza call qualcuno dice: "già che ci siamo, facciamo anche il calendario colloqui". Poi il parsing delle job description. Poi il follow-up ai candidati.

Ogni "già che ci siamo" è ragionevole preso da solo. Sommati, spostano il go-live di mesi e trasformano un progetto misurabile in un cantiere infinito.

La regola che usiamo: un agente fa **una** cosa nel primo sprint, con un perimetro scritto. Cosa è dentro, cosa è fuori, quali eccezioni gestisce l'agente e quali passano a un umano. Il resto va in backlog, non nel primo sprint. Questo è il cuore del nostro approccio agli [agenti IA](/ai-agents): consegnare qualcosa di vivo in 4 settimane, poi allargare.

## Anti-pattern 3. Lo sponsor fantasma

Ogni progetto di automazione ha bisogno di una persona interna che lo possiede. Non un comitato. Una persona.

Deve essere abbastanza senior da dire no quando arriva l'ennesima richiesta extra (vedi anti-pattern 2), e abbastanza vicina al processo da accorgersi se l'agente sta davvero lavorando.

Quando lo sponsor delega a un collega e sparisce, succede questo: le decisioni si impantanano, nessuno difende lo scope, e al go-live nessuno si sente responsabile del risultato. Il software funziona, il progetto no.

Questo è il motivo per cui il nostro lavoro non è solo tecnico. La parte di [AI adoption](/ai-adoption) esiste apposta: portare il team a usare davvero quello che costruiamo, con uno sponsor che rimane nel loop.

## Anti-pattern 4. Nessuno possiede il processo dopo il go-live

L'agente va live. Il team esulta. Due mesi dopo, un fornitore cambia il formato dei PDF, l'agente inizia a sbagliare, e nessuno se ne accorge per settimane.

L'automazione non è un progetto con una data di fine, è un processo che va manutenuto. Serve qualcuno che guarda i log, valuta le escalation, decide quando aggiornare le regole.

Con [LIFTT](/case-studies/liftt), holding VC deep tech, abbiamo automatizzato archiviazione, dedupe delle email e report mensile auto-generato. Il valore non è stato solo far partire gli agenti: è stato definire chi controlla che continuino a girare. Un agente che gira senza owner degrada in silenzio.

## La misurazione arriva a 30 giorni, non prima

Un ultimo errore, collegato: misurare troppo presto. La prima settimana dopo il go-live è rumore. La gente si abitua, corregge, dà feedback. La curva di adozione si stabilizza solo dopo qualche settimana.

Per questo i nostri sprint includono 30 giorni di hypercare: la finestra reale per capire se il metric primario è stato raggiunto. Prima di allora, ogni numero è prematuro.

## Quando NON automatizzare

Te lo dico chiaro, come lo dico ai clienti in call:

- **Processo che cambia tra 3 mesi** → non automatizzarlo ora, costruiresti su sabbia.
- **Nessuno sponsor disponibile a metterci tempo** → rimanda, non partire.
- **Zero baseline e zero voglia di misurarla** → salta il progetto, non saprai mai se è servito.

Se invece hai un processo stabile, ad alto volume, e una persona che lo possiede: allora la tecnologia è la parte facile.

[Parliamone in 20 minuti](/parliamone) o [fai il check-up](/check-up), ti dico onestamente se ci sono le condizioni.
