---
title: "Migrare da una piattaforma agenti IA a un agente su misura"
description: "Guida operativa alla migrazione da una piattaforma agenti IA a un agente su misura: segnali, checklist tecnica, dati da esportare e sequenza senza fermo."
pubDate: 2026-07-29
author: "Daniel Levis"
tags:
  - "ai agents"
  - "migrazione"
  - "operations"
keywords:
  - "migrazione piattaforma agenti ia"
  - "da piattaforma ad agente su misura"
  - "esportare dati agente ia"
  - "lock-in piattaforma ia"
readMinutes: 7
featured: false
h1: "Migrare da una piattaforma agenti IA a un agente su misura: la checklist operativa"
faq:
  - q: "Quali segnali dicono che devo migrare dalla piattaforma al custom?"
    a: "Tre segnali concreti: il canone cresce oltre il costo marginale di un agente tuo, la piattaforma non espone via API un dato o un audit trail che ti serve, oppure il vendor cambia roadmap o prezzi su un processo diventato core. Se ne vedi due su tre su un processo ad alto volume, avvia la migrazione."
  - q: "Cosa devo esportare prima di lasciare una piattaforma agenti IA?"
    a: "Sei cose: prompt e istruzioni, definizioni dei workflow, mapping delle integrazioni, dati storici delle transazioni, log delle decisioni e le regole di routing. Se un elemento non esce via export o API, quello e' il tuo vero costo di uscita: mettilo a budget prima di firmare la migrazione."
  - q: "La migrazione ferma l'operativita' del processo?"
    a: "Non deve. Si migra in parallelo: l'agente su misura gira in shadow mode sugli stessi trigger della piattaforma finche' l'output non coincide. In Soraia la prima delivery e' in <strong>4 settimane</strong> con 30 giorni di hypercare, poi si sposta il traffico un flusso alla volta."
  - q: "Come verifico che l'agente su misura sia allineato prima del cutover?"
    a: "Parti da una baseline misurata sulla piattaforma (tempo, volumi, costo per task, tasso di errore) e la usi come test di accettazione. Il cutover avviene solo quando l'agente su misura eguaglia o supera quella baseline su un campione reale, non su una demo."
  - q: "Cosa cambia sul controllo dei dati dopo la migrazione?"
    a: "Con un agente su misura il <strong>codice e' tuo dal primo giorno</strong>, con hosting UE, DPA art. 28 e audit log immutabile inclusi. I dati e i log delle decisioni restano nei tuoi sistemi, non dentro un ambiente multi-tenant di terzi."
lang: "it"
gates:
  passedAt: 2026-07-16T14:47:12.995Z
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

Hai gia' un agente IA che gira su una piattaforma pronta. Funziona. Ma il canone cresce, il vendor ha cambiato la roadmap, o ti serve un dato che l'interfaccia non espone. La domanda ora non e' "build o buy", e' un'altra: **come esco senza fermare il processo?**

Questa e' la parte che nessun venditore di piattaforme mette nella slide: la meccanica reale della migrazione. Ecco la checklist che usiamo con COO e CTO quando un processo validato su una piattaforma e' diventato core e va portato su un agente su misura.

**In breve:**
- Migra solo quando il processo si e' dimostrato **core e ad alto volume**. Se non l'hai ancora validato, non e' il momento: prima misura.
- I tre segnali di uscita: **canone che supera il costo marginale**, **dato o audit trail non esportabile**, **cambio di roadmap o prezzi del vendor**.
- Il vero costo di uscita non e' il canone: e' cio' che **non riesci a esportare**. Mappa i sei artefatti prima di firmare.
- Si migra in **shadow mode**: l'agente su misura gira in parallelo sugli stessi trigger finche' l'output non coincide con la baseline.
- Con Soraia la prima delivery e' in **4 settimane** con 30 giorni di hypercare, e il traffico si sposta un flusso alla volta, senza fermo.

## Prima domanda: e' davvero il momento di migrare?

Migrare un processo che tra 3 mesi cambiera' e' uno spreco. La piattaforma pronta esiste apposta per i workflow ancora fluidi: li riconfiguri in giorni. Se sei ancora in fase di validazione, resta dove sei.

Se invece hai gia' fatto il lavoro di framing build-vs-buy e il processo e' risultato core, questo articolo e' il passo dopo. Se non l'hai fatto, parti dalla [guida agli agenti IA per aziende](/guide/agenti-ai-aziende) e torna qui quando hai una baseline.

## I tre segnali che ti dicono di uscire

Non si migra per principio. Si migra quando i numeri o il rischio lo impongono.

1. **Il canone ha superato il costo marginale di un agente tuo.** Le piattaforme prezzano per utente, per task o per volume. A volumi alti la curva morde. Quando il canone annuo si avvicina o supera il costo di infrastruttura e token di un agente su misura, stai pagando un markup per ogni task.
2. **Ti serve un dato o un audit trail che l'interfaccia non espone.** Compliance GDPR e AI Act (in vigore da agosto 2026) richiedono spesso un audit log granulare. Se la piattaforma non lo esporta, non e' un dettaglio, e' un blocco.
3. **Il vendor ha cambiato roadmap o prezzi su un processo core.** Il tuo processo piu' importante non puo' dipendere dalle decisioni commerciali di qualcun altro.

**Cut-off**: due segnali su tre su un processo ad alto volume, avvia la migrazione.

## Cosa esportare: i sei artefatti

Qui sta il costo di uscita vero. Prima di firmare qualsiasi migrazione, verifica cosa esce via export o API e cosa no:

- **Prompt e istruzioni** dell'agente.
- **Definizioni dei workflow** (trigger, step, condizioni).
- **Mapping delle integrazioni** (quali sistemi, quali campi).
- **Dati storici delle transazioni** processate.
- **Log delle decisioni** (chi/cosa ha deciso, quando, perche').
- **Regole di routing** verso il team umano.

Ogni elemento che non esce pulito e' il tuo lock-in reale. Va ricostruito a mano, e va messo a budget. Su una piattaforma multi-tenant almeno un paio di questi vivono solo dentro il vendor: e' li' che si nasconde il costo che non era nella slide.

## Come si migra senza fermare l'operativita'

Non si spegne la piattaforma il venerdi' e si accende l'agente il lunedi'. Si migra in parallelo.

1. **Baseline di accettazione.** Misuri il processo sulla piattaforma: tempo, volumi, costo per task, tasso di errore. Questo diventa il test che l'agente su misura deve superare.
2. **Shadow mode.** L'agente su misura riceve gli stessi trigger della piattaforma e produce output, ma senza agire. Confronti i due output su un campione reale, non su una demo.
3. **Cutover per flusso.** Quando l'agente eguaglia o supera la baseline su un flusso, sposti solo quel flusso. Poi il successivo. La piattaforma resta accesa come rete di sicurezza finche' l'ultimo flusso non e' migrato.
4. **Hypercare.** 30 giorni di monitoraggio ravvicinato dopo ogni cutover, con rollback pronto.

Con un agente su misura il **codice e' tuo dal primo giorno**, con hosting UE, DPA art. 28 e audit log immutabile inclusi: gli stessi vincoli che la piattaforma non ti dava. E' lo stesso modello che applichiamo allo [sviluppo software su misura](/software-development).

## Quando NON migrare

Te lo diciamo in faccia:

- **Processo non ancora validato** -> resta sulla piattaforma, misura, decidi dopo.
- **Volumi bassi e generici** -> il canone e' irrisorio, migrare non ripaga.
- **Zero baseline misurata** -> senza sapere cosa costa oggi il processo non puoi ne' pianificare la migrazione ne' testarne l'esito. Prima misura.

---

**Vuoi capire se il tuo processo e' pronto per uscire dalla piattaforma?** Lo mettiamo nero su bianco nell'[AI Readiness Assessment €2.000](/ai-agents) (rimborsato se procedi) oppure inizia con il [check-up di 3 minuti](/check-up).
