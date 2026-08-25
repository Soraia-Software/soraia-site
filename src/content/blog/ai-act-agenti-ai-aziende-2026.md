---
title: "Audit log agenti AI: la prova che regge all'AI Act"
description: "L'audit log e' cio' che rende difendibile un agente AI davanti a un revisore. Come progettarlo per decisioni tracciabili, non per la sola compliance formale."
pubDate: 2026-09-11
author: "Daniel Levis"
tags:
  - "audit log"
  - "ai agents"
  - "observability"
  - "gdpr"
keywords:
  - "audit log agenti ai"
  - "tracciabilita decisioni ai"
  - "logging agenti ai"
readMinutes: 7
featured: false
h1: "Audit log per agenti AI: progettare la prova"
faq:
  - q: "Che cosa deve contenere l'audit log di un agente AI?"
    a: "Cinque campi minimi per ogni decisione: input ricevuto, contesto e dati recuperati, regole o prompt applicati, output prodotto, ed eventuale escalation umana con esito. Se manca uno di questi, non puoi ricostruire perche' l'agente ha deciso X quando qualcuno te lo chiede."
  - q: "Loggare le decisioni rallenta l'agente?"
    a: "No, se lo scrivi in modo asincrono. Il costo vero non e' la latenza ma la disciplina: decidere prima cosa loggare e renderlo immutabile. Noi lo includiamo di default in ogni sprint di agenti AI, non come modulo extra."
  - q: "Immutabile vuol dire blockchain?"
    a: "No. Immutabile significa append-only e a prova di manomissione: nessuno riscrive un record dopo. Bastano storage write-once, hashing e permessi separati. La blockchain e' sovradimensionata per la maggior parte delle PMI."
  - q: "A cosa serve l'audit log oltre alla compliance?"
    a: "E' lo strumento di debug e di fiducia. Quando un agente sbaglia, il log ti dice se e' un problema di dati, di regola o di prompt. Ed e' la prova che mostri a un cliente, un candidato o un revisore per difendere una decisione automatica."
lang: "it"
gates:
  passedAt: 2026-08-25T05:10:00.229Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8.2, pass: true }
    - { name: "brand-voice", score: 8, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

Quando un agente AI decide qualcosa, la domanda che arriva prima o poi e' sempre la stessa: "perche' ha deciso X?". Se non hai un audit log, non hai una risposta. Hai una scusa.

## In sintesi

L'audit log e' il registro immutabile di come un agente AI arriva a ogni output. Non e' un requisito burocratico: e' cio' che rende una decisione automatica difendibile e debuggabile. Un log utile registra cinque cose per decisione: input, contesto recuperato, regole o prompt applicati, output, escalation umana. Progettato cosi', serve tre scopi in uno: prova di conformita', strumento di debug, base di fiducia con clienti e revisori. Progettato male, e' un file di testo che nessuno riesce a leggere quando serve.

Questo pezzo non parla di normativa in astratto. Parla di come si costruisce la prova, campo per campo, dentro un agente in produzione.

**In breve:**
- L'audit log risponde a una domanda operativa, non legale: **come ha deciso l'agente**. Chi non lo tiene parte gia' in ritardo su ogni contestazione.
- Servono cinque campi per decisione: **input, contesto, regole/prompt, output, escalation**. Meno di cosi' e non ricostruisci nulla.
- Immutabile significa **append-only e a prova di manomissione**, non blockchain. Storage write-once e permessi separati bastano.
- Il log e' anche uno **strumento di debug**: distingue un errore di dati da un errore di regola da un errore di prompt.
- Va abbinato al **DPA art. 28 GDPR** col fornitore: il log dice come ha deciso l'agente, il DPA dice chi tratta i dati e come.

## Perche' un log utile parte dalla decisione, non dal sistema

Molti team loggano tutto e non ricostruiscono niente. Il trucco e' invertire la logica: non "cosa produce il sistema", ma "cosa mi serve per difendere questa singola decisione".

Per ogni decisione dell'agente, registra:

- **Input ricevuto**: il trigger e i dati in ingresso, cosi' come sono arrivati.
- **Contesto e dati recuperati**: cosa ha letto l'agente prima di decidere (documenti, record, risultati di ricerca).
- **Regole o prompt applicati**: la versione del prompt o della logica, non solo "il modello".
- **Output prodotto**: la decisione o il draft, con eventuale punteggio o motivazione.
- **Escalation umana**: se e quando e' passato a una persona, e cosa ha deciso quella persona.

Con questi cinque campi rispondi a "perche' X" in trenta secondi. Senza, apri un'indagine.

## Immutabile senza esagerare

"Immutabile" spaventa perche' evoca infrastrutture pesanti. Non serve. Immutabile vuol dire tre cose concrete:

1. **Append-only**: si aggiungono record, non si riscrivono.
2. **A prova di manomissione**: hashing dei record cosi' un'alterazione si vede.
3. **Permessi separati**: chi opera l'agente non e' chi puo' toccare i log.

Storage write-once, un hash per riga, ruoli distinti. La blockchain e' sovradimensionata per la maggior parte delle PMI: risolve un problema di fiducia tra parti che non si fidano, non il tuo problema di tracciabilita' interna.

## Il log come strumento di debug, non solo di prova

Qui sta il valore che i venditori di paura non ti raccontano. Quando un agente sbaglia, il log ben progettato ti dice **dove** ha sbagliato:

- Dati sbagliati in ingresso, e' un problema di **input**.
- Ha letto la cosa giusta ma ha concluso male, e' un problema di **prompt o regola**.
- Ha deciso da solo quando doveva passare a un umano, e' un problema di **escalation**.

Senza i cinque campi separati, questi tre casi sembrano lo stesso bug e ci perdi giorni. Con il log giusto, e' una lettura. E' per questo che lo includiamo di default in ogni sprint di [agenti AI](/ai-agents): non e' un modulo compliance opzionale, e' come si tiene un agente sotto controllo.

## Dove il log fa la differenza davvero

Sugli agenti interni di [finance](/finance), il log e' quello che fa passare una riconciliazione automatica da "il computer dice cosi'" a "ecco la regola applicata su questi dati". Sul [recruitment](/recruitment), dove trattiamo i progetti con la massima cautela, il log e' la condizione per poter promettere volumi come i 100k+ candidati gestiti dall'agente di [APraise](/case-studies/apraise) senza che una singola valutazione resti inspiegabile.

Il log da solo non basta. Serve abbinarlo al **DPA art. 28 GDPR** col fornitore: il log spiega come ha deciso l'agente, il DPA stabilisce chi tratta i dati, dove e con quali garanzie. Due strumenti diversi, stesso obiettivo: una decisione automatica che regge quando qualcuno la mette in discussione.

## Quando NON ti serve loggare tutto

Te lo dico in faccia: se un agente riassume un documento interno e non decide su nessuno, non ti serve un sistema di audit da 30k. Ti serve un log minimo e leggibile. Chi ti vende observability enterprise su un caso banale sta vendendo complessita', non tracciabilita'. Il costo del log deve scalare con l'impatto della decisione, non con la moda del momento.

Vuoi capire quale livello di logging serve ai tuoi agenti e come integrarlo senza appesantirli? [Parliamone](/parliamone), 20 minuti, senza pitch.
