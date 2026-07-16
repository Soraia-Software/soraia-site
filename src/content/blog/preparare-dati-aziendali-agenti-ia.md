---
title: "Dati aziendali pronti per un agente IA? La checklist"
description: "Prima di spendere un euro in automazione: la checklist di data readiness (fonti, dedupe, permessi, ground truth) che decide se un agente IA funziona."
pubDate: 2026-07-24
author: "Daniel Levis"
tags:
  - "ai agents"
  - "data-readiness"
  - "data-quality"
  - "methodology"
keywords:
  - "preparare i dati aziendali per l'ai"
  - "data readiness agenti IA"
  - "dati pronti per intelligenza artificiale"
  - "qualità dati AI"
readMinutes: 8
featured: false
h1: "I dati della tua azienda sono pronti per un agente IA? La checklist"
faq:
  - q: "Perché i dati contano più del modello IA?"
    a: "Un agente IA agisce su ciò che legge. Se legge dati duplicati, incompleti o contraddittori, produce output sbagliati a velocità industriale. Il modello è quasi una commodity: la differenza tra un agente che funziona e uno che no sta quasi sempre nella qualità e nell'accessibilità dei tuoi dati, non nella marca dell'LLM."
  - q: "Devo pulire tutti i dati prima di iniziare?"
    a: "No. Devi preparare solo i dati che rientrano nel perimetro del primo agente. Pulire tutto l'archivio aziendale prima di partire è un progetto infinito che non parte mai. Si isola il processo, si mettono in ordine le fonti che quel processo tocca, si costruisce l'agente. Il resto viene dopo, se serve."
  - q: "Cos'è la ground truth e perché serve?"
    a: "La ground truth è un set di 20-50 casi reali di cui conosci già la risposta corretta, verificata da una persona. Serve a testare l'agente prima del go-live: gli dai gli input, confronti l'output con la verità nota. Senza ground truth non puoi dire se l'agente funziona, puoi solo sperare."
  - q: "Chi deve occuparsi della data readiness, IT o Operations?"
    a: "Operations definisce cosa conta come dato corretto e dove vivono i dati reali. L'IT fornisce accessi e permessi. Nella pratica il COO o l'Head of Ops guida, perché conosce i processi e le eccezioni. Un progetto IT puro tende a ottimizzare la struttura tecnica e a perdere il contesto operativo che rende i dati utili."
  - q: "Quanto tempo richiede la fase di data readiness?"
    a: "Nei nostri sprint la valutiamo durante l'AI Readiness Assessment (~€2.000, rimborsato se procedi) e la sistemiamo nelle prime settimane. Per un processo ben delimitato bastano pochi giorni di lavoro. Se emerge che i dati sono in stato critico, è meglio saperlo prima di firmare uno sprint da €10-50k."
lang: "it"
gates:
  passedAt: 2026-07-16T14:36:08.910Z
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

I dati della tua azienda sono pronti per un agente IA? La checklist

Ogni settimana qualcuno ci chiede un agente IA. La prima cosa che guardiamo non è il processo. Sono i dati che quel processo tocca.

Perché è lì che il 70% dei progetti muore, prima ancora di partire.

**In breve:**

- Un agente IA non aggiusta dati sporchi, li propaga a velocità industriale. Se l'input è duplicato o incompleto, l'output è sbagliato più in fretta.
- Non devi pulire tutto l'archivio aziendale. Devi preparare solo le fonti che il primo agente tocca. Isolare il perimetro batte il big-bang.
- Cinque prerequisiti decidono se un agente funziona: fonti identificate, dati deduplicati, permessi in regola, formato leggibile dalla macchina, e una ground truth per testarlo.
- Con LIFTT, holding VC deep tech, il lavoro vero non è stato il modello: è stato archiving e dedupe automatici delle email, che hanno reso possibile il report mensile auto-generato.
- La data readiness va misurata prima di firmare uno sprint. Costa pochi giorni. Ti evita di spendere €10-50k su fondamenta che non reggono.

## Cos'è la data readiness per un agente IA

La data readiness è lo stato in cui i dati che un processo utilizza sono identificabili, accessibili, puliti e verificabili, al punto che un agente IA può leggerli, agire su di essi e produrre output affidabili senza supervisione costante. Non è un problema di quantità di dati. È un problema di qualità, struttura e permessi sul sottoinsieme di dati che serve al singolo agente.

Detto in modo brutale: puoi avere il miglior modello sul mercato e un agente inutile, se lo fai leggere un CRM pieno di clienti duplicati e campi mezzi vuoti.

## Perché i dati contano più del modello

L'errore mentale più comune è pensare che l'intelligenza dell'agente stia nell'LLM. Non è così. Il modello è quasi una commodity: cambiare da uno all'altro sposta pochi punti percentuali.

La differenza reale tra un agente che funziona e uno che no sta quasi sempre nei dati che gli dai in pasto.

Un agente **fa** un task: riceve un trigger, legge dati, applica regole, agisce nei tuoi sistemi. Se i dati che legge sono contraddittori, l'agente non se ne accorge. Esegue lo stesso, sbagliando, su ogni singolo caso, senza stancarsi. Un umano lento almeno nota l'anomalia. L'agente no.

Per questo la fase di preparazione dati viene sempre prima della costruzione. Se salti questo passo, stai automatizzando il caos.

## La checklist: 5 prerequisiti prima di spendere un euro

### 1. Fonti identificate (dove vivono davvero i dati)

La domanda: per il processo che vuoi automatizzare, **dove stanno i dati reali**? Non dove dovrebbero stare. Dove stanno.

Quasi sempre la risposta è imbarazzante: metà nel gestionale (TeamSystem, Zucchetti, Odoo), metà in un Excel sul desktop di una persona, un pezzo nelle email di un collega, un po' nella testa di chi fa il lavoro da dieci anni.

Se non riesci a elencare le fonti in una riga ciascuna, non sei pronto. L'agente ha bisogno di sapere da dove leggere.

### 2. Dati deduplicati (una verità, non tre)

Il killer silenzioso. Lo stesso cliente scritto in tre modi. La stessa email archiviata quattro volte. Lo stesso candidato con due profili.

Un agente che legge duplicati produce doppioni negli output, conta male, contatta due volte la stessa persona. Con **LIFTT**, holding VC deep tech, il lavoro decisivo non è stato l'IA generativa: è stato costruire archiving e dedupe automatici delle email, così che il report mensile potesse essere auto-generato senza rumore. Prima del dedupe, il report non era affidabile. Dopo, sì.

### 3. Permessi e base giuridica (GDPR non è opzionale)

L'agente accede a dati. Chi glielo permette, e su che base?

Se tratta dati personali (candidati, clienti, dipendenti), serve una base giuridica, e con un fornitore esterno un **DPA art. 28 GDPR**. Se i dati contengono informazioni sensibili, serve capire cosa può uscire dal perimetro UE e cosa no. Questo va deciso prima, non dopo un incidente.

Noi lo trattiamo come vincolo di partenza: DPA art. 28 incluso nel contratto, hosting UE quando richiesto, nessun training degli LLM sui dati cliente.

### 4. Formato leggibile dalla macchina

Un PDF scansionato storto non è un dato leggibile, è un'immagine. Un Excel con celle unite, colori come codice e note nei commenti non è una tabella, è un rebus.

Prima di costruire, verifica: i dati sono in un formato che una macchina può parsare in modo deterministico? Se no, la prima parte dello sprint sarà l'estrazione (OCR, parsing), non l'automazione. Va benissimo, ma va messo in conto nel budget e nei tempi.

### 5. Ground truth (come saprai che funziona)

Questo è quello che quasi nessuno prepara. Prima del go-live serve un set di **20-50 casi reali di cui conosci già la risposta corretta**, verificata da una persona.

Gli dai gli input all'agente in shadow mode, confronti l'output con la verità nota, misuri l'errore. Senza ground truth non puoi dire se l'agente funziona: puoi solo sperare, e sperare non è una metrica. È lo stesso principio della baseline: senza un metro di paragone misurato, ogni claim è un'opinione.

## Quando NON sei pronto (e cosa fare)

Te lo diciamo in faccia, come sempre:

- **Dati sparsi in 8 posti senza fonte primaria** → prima serve consolidare, non automatizzare. Un agente non ci mette ordine, ci sbatte contro.
- **Zero base giuridica per i dati personali** → si sistema il DPA e la policy prima di toccare qualsiasi cosa.
- **Nessuno in azienda sa dire qual è il dato "giusto"** → manca la ground truth e manca l'ownership. Va risolto prima, è un problema di Operations, non di IT.
- **Il processo cambierà tra due mesi** → preparare dati per un workflow che muore è spreco. Aspetta che si stabilizzi.

La buona notizia: quasi mai serve pulire tutto. Serve preparare il sottoinsieme che il primo agente tocca. È lavoro di giorni, non di mesi.

## Come lo affrontiamo in Soraia

La data readiness la valutiamo nell'[AI Readiness Assessment](/ai-agents) (~€2.000, rimborsato se procedi): mappiamo le fonti, misuriamo la qualità sul perimetro del primo agente, verifichiamo permessi e formato, costruiamo la ground truth. Se emergono buchi, li vedi prima di firmare uno sprint da €10-50k, non dopo.

Quando i dati sono deboli ma il processo è giusto, spesso la prima delivery in 4 settimane include proprio il lavoro di dedupe e strutturazione, come abbiamo fatto con [LIFTT](/case-studies/liftt). E se il team non ha ancora la cultura del dato pulito, l'[AI Adoption](/ai-adoption) serve a costruirla, perché un agente vive solo se chi gli sta intorno tiene in ordine le fonti.

Se vuoi capire dove sei, la [guida all'assessment AI interno](/guide/assessment-ai-interno-guida-operativa) ti dà il metodo per farlo da solo.

---

**Vuoi sapere se i tuoi dati reggono un agente?** [Parliamone 20 minuti](/parliamone) oppure [fai il check-up](/check-up) (3 minuti, no email). Ti diciamo onestamente se sei pronto o cosa manca.
