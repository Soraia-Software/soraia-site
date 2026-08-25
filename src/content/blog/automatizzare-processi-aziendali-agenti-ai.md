---
title: "Automazione a regole o agente AI: come scegliere"
description: "Automazione a regole (RPA, Make, Zapier) o agente AI? La checklist decisionale per COO e Head of Ops su quale processo dare a quale livello."
pubDate: 2026-09-07
author: "Davide Silvestri"
tags:
  - "process-automation"
  - "ai agents"
  - "how-to"
  - "operations"
keywords:
  - "automazione a regole o agente ai"
  - "rpa vs agenti ai"
  - "automazione a regole"
  - "process automation"
readMinutes: 6
featured: false
faq:
  - q: "RPA, Make e Zapier: quando bastano e quando no?"
    a: "Bastano quando l'input è strutturato e il flusso è stabile: se X, allora Y. Un bonifico con IBAN corrispondente, un lead da form a CRM, un promemoria. Non bastano quando l'input è testo libero (email, PDF, note) o quando le eccezioni superano i casi standard. Lì la regola si moltiplica in decine di if e diventa ingestibile."
  - q: "Come capisco se un processo va a regole o a un agente AI?"
    a: "Guarda due numeri: la percentuale di casi che segue lo schema pulito e il tempo che il team spende sulle eccezioni. Se l'80% è pulito, resta sulle regole: costano meno. Se il team passa più tempo sulle eccezioni che sui casi standard, la coda va data a un agente AI che gestisce input non strutturato e giudizio contestuale."
  - q: "Devo scegliere fra regole e agente, o convivono?"
    a: "Convivono. Le regole restano il livello base, economico e prevedibile, sui casi puliti. L'agente si aggancia sopra solo dove il flusso diventa fuzzy. Non butti via le automazioni che hai: è più economico mantenerle sui casi standard e usare l'agente dove serve giudizio."
  - q: "Chi decide il confine dovrebbe misurare qualcosa prima?"
    a: "Sì. Cronometra 10-20 task reali e calcola quanto costa il processo oggi, per fase. Senza baseline non sai se spostare la coda a un agente conviene, e non puoi verificare a posteriori se ha funzionato. La decisione regole-vs-agente si prende sui dati, non a sensazione."
lang: "it"
gates:
  passedAt: 2026-08-25T04:47:03.224Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 7.8, pass: true }
    - { name: "brand-voice", score: 9, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

Ogni COO che conosco ha già automazioni a regole in casa. Un flusso Make che sposta dati, una RPA che compila un gestionale come TeamSystem o Zucchetti, uno Zapier che manda notifiche.

La domanda non è "agente AI sì o no". È: **quale processo dare a quale livello**. Sbagliare questo confine è il modo più veloce per pagare troppo o automatizzare male.

Questa è una checklist decisionale, non un'introduzione agli agenti. Se vuoi capire cosa sono e come funzionano nel dettaglio, c'è la [guida agli agenti AI per aziende](/guide/agenti-ai-aziende). Qui parliamo solo del confine tra le regole che già usi e quando serve altro.

**In breve:**
- Il confine si decide su due numeri: percentuale di casi puliti e tempo speso sulle eccezioni.
- Regole (RPA, Make, Zapier) per input strutturato e prevedibile. Costano meno, tienile.
- Agente AI solo sulla coda: input non strutturato, eccezioni, giudizio contestuale.
- Segnale di soglia: il team passa più tempo sulle eccezioni che sui casi standard.
- Se l'80% dei casi è pulito, non ti serve un agente. Resta sulle regole.

## I due livelli, in una riga

L'automazione a regole è deterministica: se X, allora Y. Perfetta per input puliti e ripetibili. Riconciliare un bonifico con un IBAN corrispondente. Spostare un lead da un form al CRM. Mandare un promemoria.

Un agente interpreta un input anche disordinato, decide come agire nel contesto, scrive il risultato nei tuoi sistemi e chiama una persona solo quando serve. Sono due strumenti diversi per due tipi di lavoro diversi. Il punto non è quale sia "meglio": è quale processo sta su quale.

## Dove le regole smettono di convenire

Le regole si rompono su tre cose, e sono i tre segnali che un pezzo del processo va spostato:

- **Input non strutturati**: un'email che descrive un problema con parole diverse ogni volta, un PDF con layout che cambia, una nota scritta di fretta.
- **Eccezioni**: il caso limite che nessuno aveva previsto quando ha scritto la regola. E le eccezioni si moltiplicano nel tempo, finché la regola diventa un albero di if ingestibile.
- **Giudizio contestuale**: capire *cosa* intende davvero il cliente, non solo *cosa* ha scritto.

Quando il team passa più tempo a gestire le eccezioni che i casi standard, quella coda ha smesso di essere lavoro da regole.

## La checklist per assegnare un processo

Per ogni processo che stai valutando, rispondi in ordine. Ti dice a quale livello sta.

### 1. Misura, non stimare

Non "il team perde tanto tempo". Cronometra 10-20 task reali. Quanto costa il processo oggi, per fase. Senza questo numero non puoi decidere niente, e non potrai verificare dopo se la scelta ha pagato.

### 2. Calcola la quota di casi puliti

Guarda i dati. Che percentuale segue lo schema standard, con input strutturato? Se è alta (indicativamente 80%+), quella parte resta sulle regole. Punto. Non c'è agente che la giustifichi.

### 3. Isola la coda

Eccezioni e input non strutturati sono il perimetro dell'agente. Ed è un perimetro stretto per definizione: "classifica e instrada le email che le regole non sanno smistare", non "gestisci il customer support". Il perimetro elastico è la causa numero uno dei fallimenti nei progetti AI.

### 4. Decidi il confine, non spostare tutto

Le regole restano dove funzionano. L'agente prende solo la coda. È più economico così: paghi giudizio solo dove serve giudizio.

## Come si vede in pratica

Due esempi dai nostri progetti, dove il confine è stato tracciato così.

Su [Navily](/case-studies/navily) la moderazione e l'enrichment erano fatti di testo libero e casi ambigui che nessuna regola fissa copriva: quella coda è passata a un agente, con **-70% di tempo operativo**. I flussi puliti a monte sono rimasti automazioni normali.

Su [Numeraria](/case-studies/numeraria), studio paghe e contabilità, i casi ripetitivi restavano su regole; preventivi, ore e riconciliazioni con input variabile sono andati agli agenti, restituendo **circa metà mese al management**.

In entrambi i casi nessuno ha buttato via l'esistente. Si è spostata solo la parte che le regole non reggevano più.

## Il confine si sposta nel tempo

Un processo non sta per sempre allo stesso livello. Man mano che le eccezioni crescono, la quota di casi puliti scende e il confine si abbassa: pezzi che erano da regole diventano da agente. Per questo la baseline non è un esercizio una tantum. Rimisura ogni tanto: il punto di equilibrio cambia.

E quando sposti la coda a un agente, il team che prima gestiva quelle eccezioni deve fidarsi dell'agente e sapere quando riprenderselo. Per questo il confine tecnico va accompagnato dall'[adozione AI](/ai-adoption): senza, l'agente resta inutilizzato e il ROI non arriva.

Lavoriamo con la garanzia **"paghi solo se funziona"**: se le ore non tornano, non paghi. Se vuoi tracciare il confine sui tuoi processi (quali restano a regole, quali passano a un agente), [parliamone](/parliamone): 20 minuti, senza pitch.
