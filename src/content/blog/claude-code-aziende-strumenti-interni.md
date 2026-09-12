---
title: "Claude Code in azienda: strumenti interni in giorni"
description: "Come un coding agent tipo Claude Code costruisce i tuoi strumenti interni in giorni. Cosa fa bene, dove serve un umano, e quando conviene affidarlo a un team."
pubDate: 2026-09-04
author: "Daniel Levis"
tags:
  - "claude code"
  - "custom software"
  - "coding agent"
  - "how-to"
keywords:
  - "claude code aziende"
  - "coding agent"
  - "strumenti interni"
  - "software custom"
readMinutes: 6
featured: false
h1: "Claude Code in azienda: come un coding agent costruisce i tuoi strumenti interni in giorni"
faq:
  - q: "Claude Code può sostituire uno sviluppatore?"
    a: "No. Accelera chi sa già cosa costruire e sa leggere il codice che produce. Per uno strumento interno che tocca dati sensibili o si integra con il gestionale, serve una persona che imposti architettura, permessi e testing. Il coding agent riduce le ore, non elimina il giudizio tecnico."
  - q: "È sicuro dare a un coding agent accesso al nostro codice?"
    a: "Dipende dalla configurazione. Va usato in un ambiente isolato, con permessi limitati e senza credenziali di produzione. Per settori con obblighi GDPR serve un <strong>DPA art. 28</strong> con il vendor e nessun training dei modelli sui tuoi dati. In Soraia questo è preincluso nel contratto."
  - q: "Quanto costa costruire uno strumento interno con Claude Code?"
    a: "Il coding agent abbatte le ore di scrittura, non l'intero costo. In Soraia si parte da <strong>3.000 € al mese</strong> (IVA esclusa), con due figure dedicate (Project Manager e AI Engineer) e primo rilascio in 4 settimane. Il codice è tuo dal primo giorno."
  - q: "Meglio Claude Code o un SaaS già pronto?"
    a: "Se esiste un SaaS che copre il processo a un costo ragionevole a 2-3 anni, compralo. Un coding agent conviene quando il processo è core, specifico e mal servito dagli strumenti sul mercato. La scelta build vs buy resta la prima domanda."
lang: "it"
gates:
  passedAt: 2026-08-25T04:39:23.727Z
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

Ogni CTO ha una lista di strumenti interni che servirebbero ieri: una dashboard che unisce due sistemi, un tool di riconciliazione, un piccolo pannello per il team ops. Restano in fondo al backlog perché il team di sviluppo è occupato sul prodotto.

Un coding agent come Claude Code cambia l'economia di quella lista. Ma non nel modo in cui te lo raccontano su LinkedIn.

**In breve:**
- Un coding agent scrive, testa e itera codice a partire da istruzioni in linguaggio naturale: comprime giorni di lavoro in ore su strumenti interni ben definiti.
- Non sostituisce uno sviluppatore. Accelera chi sa cosa costruire e sa leggere il codice prodotto.
- Il guadagno vero è sugli strumenti interni a basso rischio (dashboard, tool di riconciliazione, script) più che sul software client-facing.
- Il collo di bottiglia si sposta: da "scrivere codice" a "definire bene lo scope, i permessi e i test".
- Con dati sensibili serve ambiente isolato, permessi limitati e <strong>DPA art. 28</strong> col vendor. Non è un dettaglio.

## Cosa fa davvero un coding agent

Claude Code non è un chatbot che ti suggerisce snippet. È un agente che opera sul filesystem: legge il tuo repository, scrive file, esegue comandi, lancia i test, legge gli errori e corregge. Tu descrivi cosa vuoi, lui itera.

Su uno strumento interno ben definito, questo comprime giorni in ore. Un pannello che legge due API, incrocia i dati e li mostra in tabella filtrabile: un lavoro che occupava una settimana part-time diventa un pomeriggio, se chi guida sa cosa vuole.

La parola chiave è **strumento interno**. Basso rischio, utenti noti, nessuna esposizione a clienti esterni. È lì che il rapporto valore/rischio è migliore.

## Dove il coding agent brilla, e dove no

Dove funziona bene:
- Dashboard che uniscono dati da sistemi diversi (CRM + ERP + fogli)
- Script di riconciliazione, pulizia dati, migrazione una tantum
- Tool interni per il team ops (approvazioni, code, notifiche)
- Prototipi da validare prima di un build serio

Dove serve cautela:
- Software che tocca dati di clienti o candidati (GDPR, AI Act)
- Integrazioni con il gestionale in produzione (TeamSystem, Zucchetti, Odoo)
- Qualsiasi cosa con logica di pagamento o output legalmente vincolante

La regola: più il codice si avvicina a produzione e a dati sensibili, più il coding agent va tenuto in un ambiente isolato e supervisionato da qualcuno che legge quello che produce.

## Il collo di bottiglia si sposta, non sparisce

Ecco la parte che nessuno dice. Quando scrivere codice costa poco, il costo si sposta su tre cose:

1. **Definire lo scope.** Un coding agent esegue alla lettera un'istruzione ambigua e produce lo strumento sbagliato molto in fretta. Lo scope vago è il nemico numero uno, esattamente come in un progetto di [software su misura](/software-development).
2. **Permessi e sicurezza.** Credenziali, accessi ai dati, cosa può toccare l'agente. Va deciso prima, non dopo.
3. **Test e manutenzione.** Il codice generato va testato e mantenuto come qualsiasi altro. Un tool che nessuno capisce tra sei mesi è debito, non risparmio.

È lo stesso principio dei nostri [agenti IA](/ai-agents): l'esecuzione automatica è potente solo quando il perimetro è chiaro e c'è un umano che valida i casi limite.

## Come lo usiamo in Soraia

Lo stack tecnico è strumentale: quello che consegniamo è un risultato misurabile, non il tool con cui lo costruiamo. Un coding agent è una delle leve che ci permette di consegnare il primo rilascio in **4 settimane** invece di mesi.

Il modello resta lo stesso dello sviluppo custom: si parte da 3.000 € al mese (IVA esclusa), con due figure dedicate (Project Manager e AI Engineer), codice tuo dal primo giorno, nessun lock-in. Il coding agent taglia le ore di scrittura. Non taglia lo scoping, i test, la governance dei dati, e la garanzia "paghi solo se funziona".

## Quando NON serve un team esterno

Te lo dico chiaro:
- Se hai già uno sviluppatore capace e uno strumento interno semplice, dagli Claude Code e lascialo lavorare. Non ti serviamo per un tool da un pomeriggio.
- Se esiste un SaaS che copre il processo a un costo ragionevole a 2-3 anni, compralo. La [scelta build vs buy](/blog/software-su-misura-o-saas/) viene prima di tutto.
- Se il processo cambierà tra tre mesi, non congelarlo nel codice.

Serve un team esterno quando lo strumento tocca dati sensibili, si integra col gestionale in produzione, o quando internamente non hai chi imposti architettura e sicurezza.

---

Hai una lista di strumenti interni ferma nel backlog? [Parliamone](/parliamone): 20 minuti, ti diciamo onestamente cosa puoi costruire da solo con un coding agent e cosa ha senso affidarci.
