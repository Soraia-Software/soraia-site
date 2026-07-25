---
title: "Preventivi automatici AI: la prima bozza in minuti"
description: "Rispondi tardi e perdi la trattativa. Ecco come un agente IA prepara la prima bozza di preventivo con prezzi, condizioni e margini, senza sballare i conti."
pubDate: 2026-08-12
author: "Davide Silvestri"
tags:
  - "ai agents"
  - "preventivi"
  - "sales"
  - "process-automation"
  - "how-to"
keywords:
  - "preventivi automatici ai"
  - "agente ia preventivi"
  - "speed-to-quote"
  - "automazione commerciale"
readMinutes: 6
featured: false
h1: "Quanti preventivi perdi perché rispondi tardi?"
faq:
  - q: "Un agente IA firma i preventivi al posto mio?"
    a: "No, e non dovrebbe. L'agente prepara la <strong>prima bozza</strong>: prezzi da listino, condizioni standard, margine calcolato. Il commerciale rivede, aggiusta e firma. L'umano resta sempre sul prezzo finale, l'agente toglie i 40 minuti di data entry e ricerca listino."
  - q: "Come fa l'agente a rispettare i margini minimi?"
    a: "Le regole di pricing e i floor di margine sono scritte nel suo perimetro. Se una configurazione scende sotto il margine minimo, l'agente non chiude: segnala e passa all'umano. È lo stesso principio di supervisione che applichiamo su <a href=\"/finance\">finance</a> per le anomalie sopra soglia."
  - q: "Quanto tempo serve per avere il primo agente preventivi live?"
    a: "La prima delivery è in <strong>4 settimane</strong>, con 30 giorni di hypercare dopo il go-live. Prima parte una settimana di baseline cronometrata: quanto tempo passa oggi tra richiesta e preventivo inviato, e quante trattative perdi per ritardo."
  - q: "Serve cambiare il gestionale o il CRM?"
    a: "No. Costruiamo l'agente sopra lo stack che già hai, che sia un CRM, un gestionale come TeamSystem o Zucchetti, o fogli di listino. L'agente legge il listino esistente e scrive la bozza dove la trovi già. Il codice è tuo dal primo giorno."
lang: "it"
gates:
  passedAt: 2026-07-25T06:29:24.348Z
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

Il commerciale riceve la richiesta lunedì. Risponde giovedì, perché prima deve trovare il listino giusto, calcolare il margine, copiare le condizioni dall'ultima offerta simile. Nel frattempo il concorrente ha già mandato la sua.

La velocità di risposta è una leva di ricavo, non un dettaglio operativo. E i **preventivi automatici AI** attaccano esattamente quel ritardo.

**In breve:**
- Un agente IA per preventivi non decide il prezzo: prepara la **prima bozza** (prezzi da listino, condizioni standard, margine calcolato) in minuti, poi il commerciale rivede e firma.
- La leva non è il taglio costi, è lo **speed-to-quote**: rispondere in ore invece che in giorni cambia il tasso di chiusura.
- I floor di margine sono scritti nel perimetro dell'agente: sotto soglia non chiude, segnala e passa all'umano.
- Nessun cambio di gestionale o CRM: l'agente legge il listino che già hai e scrive la bozza dove la trovi già.
- Su [Numeraria](/case-studies/numeraria), gli agenti su preventivi e ore hanno restituito **circa metà mese** di lavoro al management.

## Perché il ritardo sul preventivo costa più del prezzo

Quando un cliente chiede un'offerta è nel picco di intenzione. Ogni giorno che passa quel picco si abbassa e aumenta la probabilità che guardi altrove.

Il problema quasi mai è la pigrizia del commerciale. È il lavoro nascosto prima del preventivo:

- Ritrovare il listino corretto per quel prodotto o servizio
- Applicare gli sconti a scaglione giusti per volume o cliente
- Ricalcolare il margine per non firmare in perdita
- Copiare le condizioni (pagamento, consegna, validità) dall'ultima offerta simile

Sono 30-45 minuti di lavoro noioso e ripetitivo per ogni richiesta. Su un ufficio commerciale che ne riceve decine a settimana, è la ragione per cui si risponde giovedì.

## Cosa fa (e cosa NON fa) un agente IA sui preventivi

Siamo precisi, perché qui è facile promettere magia.

L'agente **fa**:
- Legge la richiesta in arrivo (email, form, CRM) ed estrae prodotti, quantità, cliente
- Pesca i prezzi dal tuo listino esistente
- Applica le regole di sconto e i margini che gli hai scritto
- Compila una bozza completa con condizioni standard
- La deposita dove il commerciale la trova già, in draft, in pochi minuti

L'agente **NON fa**:
- Non firma e non invia da solo il preventivo al cliente
- Non inventa prezzi fuori listino
- Non chiude sotto il margine minimo: segnala ed escala
- Non gestisce trattative complesse o custom (quelle restano umane)

È la stessa logica che descriviamo confrontando [agenti custom e ChatGPT Enterprise](/ai-agents): l'agente **esegue** il task e mette l'output nei tuoi sistemi, non ti fa copiare/incollare avanti e indietro.

## Come si costruisce, in 4 passi

### 1. Baseline (1 settimana)

Misuriamo il ritardo vero. Cronometrato, non a sensazione: quanto tempo passa oggi tra richiesta e preventivo inviato, su un sample di 10-20 richieste reali. E quante trattative si raffreddano per ritardo. Senza questo numero, ogni claim di miglioramento è un'opinione.

### 2. Perimetro dei prezzi e dei margini

Definiamo cosa l'agente può fare da solo: quali listini legge, quali sconti applica, qual è il **margine minimo** sotto cui deve fermarsi. Definiamo anche cosa è fuori scope (offerte custom, prodotti a preventivo negoziato) e va sempre all'umano.

### 3. Regole di pricing come skill

Le regole diventano istruzioni esplicite dell'agente: scaglioni di volume, listini per segmento cliente, condizioni di pagamento standard. Tutto tracciato: input ricevuto, regole applicate, output prodotto. Se domani cambi il listino, cambi la fonte, non l'agente.

### 4. Shadow mode, poi live

La prima settimana l'agente lavora ma il commerciale controlla ogni bozza. Poi passa in produzione con escalation sulle eccezioni. La [prima delivery è in 4 settimane](/ai-agents), con 30 giorni di hypercare per misurare sul serio.

## Il punto di incontro tra finance e sales

Qui c'è la parte interessante. Il preventivo vive a metà strada: il commerciale vuole velocità, l'amministrazione vuole margini corretti. Un agente ben costruito serve entrambi.

È esattamente il territorio dove abbiamo lavorato con [Numeraria](/case-studies/numeraria), studio paghe e contabilità: gli agenti su preventivi, ore e riconciliazioni hanno restituito **circa metà mese** di lavoro al management. Non tagliando teste, ma togliendo il lavoro di preparazione ripetitivo che rubava tempo alle decisioni.

Se l'ufficio commerciale è il tuo collo di bottiglia, guarda anche il cluster [sales & marketing](/sales-marketing); se il problema è la correttezza di prezzi e margini, parti da [finance](/finance).

## Quando NON automatizzare i preventivi

Te lo dico prima che tu spenda:

- **Listino instabile o inesistente**: se ogni preventivo è negoziato da zero, non c'è regola da dare all'agente. Prima struttura il listino.
- **Pochissime richieste**: sotto una manciata di preventivi a settimana, il ritardo lo risolvi con una persona, non con un agente.
- **Zero baseline**: se non sai quanto ti costa oggi la lentezza, non puoi sapere se l'agente ha senso.

Per tutto il resto, lo speed-to-quote è una delle automazioni con ritorno più leggibile.

---

**Vuoi capire quanto ti costa oggi rispondere tardi?** [Fai il check-up](/check-up) (3 minuti, niente email) o [parliamone](/parliamone) in 20 minuti, senza preventivi a sorpresa.
