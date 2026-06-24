---
title: "Sostituire un gestionale obsoleto: il costo nascosto"
description: "Il gestionale legacy nelle PMI industriali costa più di quanto pensi: onboarding lento, rischio key-person, lock-in. Quando svecchiarlo e quando sostituirlo."
pubDate: 2026-06-24
author: "Daniel Levis"
tags:
  - "custom software"
  - "gestionale"
  - "pmi"
  - "legacy"
  - "strategy"
keywords:
  - "sostituire gestionale obsoleto"
  - "costo software legacy"
  - "gestionale PMI"
  - "lock-in fornitore"
readMinutes: 6
featured: false
h1: "Il costo nascosto del gestionale che nessuno vuole più usare"
faq:
  - q: "Quando conviene sostituire un gestionale obsoleto?"
    a: "Quando il costo nascosto (onboarding lento, rischio key-person, lock-in) supera il costo di sostituzione. Il segnale più forte è il <strong>rischio key-person</strong>: se una sola persona sa usarlo e se ne va sei bloccato. Prima di decidere misura il costo reale di oggi, non quello che il fornitore ti fa in offerta."
  - q: "Sostituire tutto il gestionale o solo svecchiarlo?"
    a: "Quasi mai serve buttare tutto. Spesso conviene tenere il core (anagrafiche, contabilità, fatturazione elettronica) e sostituire o aggiungere i moduli che fanno davvero male: l'interfaccia che il team odia, i report che fai a mano, i passaggi manuali. Si parte da lì, non da un big bang."
  - q: "Quanto costa un nuovo tool custom rispetto al gestionale?"
    a: "Da Soraia lo scoping costa <strong>€2.000 (rimborsato se procedi)</strong> e un build sprint €10-50k, con primo rilascio in 4 settimane e codice tuo dal primo giorno. Non sostituisce per forza il gestionale: spesso costruiamo lo strato che lo rende usabile dal team senza toccare il core."
  - q: "Come riduco il rischio key-person sul gestionale?"
    a: "Documenta i processi, riduci i passaggi che richiedono conoscenza tribale e sposta il sapere dalla testa di una persona a uno strumento usabile da chiunque. Un tool con interfaccia chiara e flussi guidati è il modo più diretto per togliere il single point of failure."
lang: "it"
draft: true
---

Il gestionale c'è da quindici anni. Funziona. Però c'è una sola persona che lo sa usare davvero, l'interfaccia è del 2009 e ogni nuovo assunto ci mette tre mesi a diventare autonomo.

Questo non è un problema IT. È un costo nascosto che non vedi nel bilancio, ma che paghi ogni settimana.

**In breve:**

- Il costo vero di un gestionale legacy non è il canone: è l'onboarding lento, le ore perse in workaround manuali e il **rischio key-person** (se l'unica persona che lo sa usare se ne va, sei bloccato).
- Il lock-in del fornitore si misura in tempo, non solo in soldi: quanto ci metti a esportare i dati e a rifarli girare altrove?
- Non serve quasi mai un big bang. Spesso conviene tenere il core (contabilità, fatturazione elettronica) e sostituire i moduli che fanno male.
- Prima di decidere serve una baseline: quante ore costa oggi quel processo. Senza numero, ogni scelta è un'opinione.
- Da Soraia lo scoping di un tool custom costa €2.000 (rimborsato se procedi), build sprint €10-50k, primo rilascio in 4 settimane, codice tuo dal giorno uno.

## Il costo che non vedi in bilancio

Il canone del gestionale lo vedi. È una riga, la paghi, la dimentichi. Il resto no.

Nelle PMI manifatturiere del distretto biellese vedo sempre gli stessi quattro costi nascosti:

- **Onboarding lento**: un nuovo impiegato ci mette settimane a diventare produttivo su uno strumento che nessuno ha documentato.
- **Workaround manuali**: l'export su Excel perché il report nativo non c'è, il doppio inserimento perché due moduli non si parlano.
- **Errori da interfaccia ostile**: schermate dense, campi ambigui, click sbagliati. Costano correzioni a valle.
- **Rischio key-person**: di questo parlo a parte, perché è il più pericoloso.

Nessuno di questi finisce in una riga di costo. Tutti drenano ore ogni settimana.

## Il rischio key-person è il vero allarme

C'è sempre quella persona. Sa dove cliccare, conosce i bug, sa quale campo non va toccato il martedì. Tutti la chiamano quando il gestionale fa i capricci.

Il giorno che va in pensione o cambia azienda, il sapere se ne va con lei. Non è documentato da nessuna parte: è conoscenza tribale nella testa di una persona.

Questo è il segnale di sostituzione più forte di tutti. Non perché il software sia vecchio — il vecchio funziona — ma perché hai un **single point of failure umano** su un processo core.

## Lock-in: misuralo in giorni, non in euro

"Cambiare fornitore è impossibile" di solito non è vero. È solo costoso in tempo.

La domanda giusta non è "quanto costa il nuovo software". È: **quanto tempo ci metto a tirare fuori i miei dati e a farli funzionare altrove?** Se la risposta è "non lo so" o "mesi", il lock-in è reale e va messo nei conti.

È lo stesso ragionamento build vs buy: l'ho scritto nel pezzo su [software su misura o SaaS](/blog/software-su-misura-o-saas/). I quattro criteri (processo core, costo a 2-3 anni, lock-in, lifecycle) valgono anche qui.

## Quando NON sostituire

Te lo dico chiaro, perché sostituire un gestionale è un progetto serio:

- **Il core funziona e nessuno lo odia** → non toccarlo. Contabilità, fatturazione elettronica, anagrafiche: se girano, restano.
- **Il problema è solo l'interfaccia di un modulo** → non rifare tutto. Costruisci lo strato usabile sopra il core esistente.
- **Non hai misurato il costo di oggi** → fermati. Senza baseline non sai se la sostituzione ha senso o stai solo comprando la cosa nuova lucida.

Il big bang "buttiamo tutto e ricominciamo" è il modo più sicuro per spendere il triplo e bloccare l'operatività per sei mesi.

## Quando sì, e come farlo bene

Sostituisci quando: il rischio key-person è alto, l'onboarding costa più di quanto puoi permetterti, i workaround manuali drenano ore misurate ogni settimana.

E quasi sempre conviene partire da un pezzo, non da tutto. Con [ILTEC](/case-studies/iltec), B2B di office technology a Biella, non abbiamo rifatto i loro sistemi interni: abbiamo aggiunto lo strato che mancava — sito AI search optimized in 3 settimane e un agente commerciale via QR code sul parco macchine. Si parte dal punto che fa più male.

Lo stesso modello vale per un tool interno custom: [scoping](/software-development) €2.000 (rimborsato se procedi), build sprint €10-50k, primo rilascio in 4 settimane, codice tuo dal primo giorno. Niente abbonamento perpetuo, niente nuovo lock-in al posto del vecchio.

E prima di scrivere codice, spesso il guadagno più rapido è togliere la conoscenza tribale dalla testa di una persona: documentare i processi e formare il team. È quello che facciamo con l'[AI Adoption](/ai-adoption).

## Il primo passo concreto

Misura il costo reale del tuo gestionale oggi: ore di onboarding, ore perse in workaround, dipendenza da una persona. Quel numero ti dice se la sostituzione ha senso — o se basta svecchiare un modulo.

Se vuoi un occhio esterno onesto, [parliamone](/parliamone): 20 minuti, niente pitch. Oppure parti dal [check-up](/check-up).
