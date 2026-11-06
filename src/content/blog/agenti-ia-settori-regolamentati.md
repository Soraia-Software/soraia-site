---
title: "Agenti IA in settori regolamentati: cosa è permesso"
description: "Banking, insurance, sanità: cosa puoi davvero fare con gli agenti IA in un settore regolamentato. Mappa operativa AI Act + GDPR, senza allarmismi."
pubDate: 2026-06-22
updatedDate: 2026-11-06
author: "Daniel Levis"
tags:
  - "ai agents"
  - "compliance"
  - "ai act"
  - "finance"
  - "governance"
keywords:
  - "agenti ia settori regolamentati"
  - "ai act settori regolamentati"
  - "compliance agenti ia"
  - "ai banking insurance sanità"
readMinutes: 8
featured: false
h1: "Agenti IA in settori regolamentati: cosa è permesso davvero"
faq:
  - q: "Un agente IA può prendere decisioni autonome in banking o assicurazioni?"
    a: "Non sulle decisioni che riguardano le persone. Valutare il merito di credito e fissare rischio e prezzo delle polizze vita e salute sono casi ad <strong>alto rischio</strong> per l'AI Act: dal 2 dicembre 2027 chi li usa deve affidarne la sorveglianza a persone competenti. Già oggi, inoltre, l'art. 22 del GDPR dà alle persone il diritto di non subire decisioni basate unicamente su un trattamento automatizzato, salvo eccezioni. L'agente può istruire la pratica, fare lo scoring e preparare il dossier, ma la firma resta umana."
  - q: "Da quando valgono gli obblighi dell'AI Act per l'alto rischio?"
    a: "Dal 2 dicembre 2027 per i sistemi dell'allegato III, come lo scoring del credito, le polizze vita e salute e il triage di emergenza, dopo il rinvio deciso con il Digital Omnibus; dal 2 agosto 2028 per quelli dentro prodotti regolati, come i dispositivi medici. Per una banca o un'assicurazione che li usa significa: usarli secondo le istruzioni del fornitore, affidare la sorveglianza a persone competenti, conservare i log per almeno sei mesi e, per credito e polizze vita e salute, fare una valutazione d'impatto sui diritti fondamentali prima dell'uso. Vedi la nostra <a href=\"/guide/ai-act-aziende\">guida AI Act</a> per il quadro generale."
  - q: "Posso usare un agente IA per l'automazione documentale in un settore regolamentato?"
    a: "Sì, e di solito è il punto di partenza più sicuro. OCR su fatture, riconciliazioni, estrazione dati da PDF, report ricorrenti sono <strong>rischio minimo</strong>: non decidono su persone. È il caso Numeraria, dove l'automazione ha restituito circa metà mese al management."
  - q: "Dove devono stare i dati per essere compliant?"
    a: "Il GDPR non impone l'hosting in Europa. Chiede un <strong>DPA ai sensi dell'art. 28</strong> con ogni fornitore che tratta dati per tuo conto e, se i dati escono dall'UE, le garanzie previste per i trasferimenti (art. 44). I dati sanitari sono una categoria particolare (art. 9) e richiedono più cautele. Per semplificare includiamo DPA e hosting europeo di default, e gli LLM non vengono mai addestrati sui dati del cliente."
  - q: "Quando NON conviene un agente IA in un settore regolamentato?"
    a: "Quando il processo richiede una decisione legalmente vincolante senza margine di supervisione umana, o quando il dato necessario non può uscire da un perimetro chiuso senza una DPIA seria. In quei casi prima si sistema la governance, poi si automatizza. Mai il contrario."
lang: "it"
draft: false
---

Ogni mese arriva la stessa email da un CFO di una banca o di un'assicurazione: *"Vogliamo usare gli agenti IA, ma il nostro compliance officer dice di no a tutto."*

Risposta onesta: il compliance officer ha ragione su alcune cose e torto su altre. Il problema è che nessuno gli ha fatto la mappa operativa. Eccola.

**In breve:**

- In un settore regolamentato non conta *cosa fa la tecnologia*, conta *su chi impatta la decisione*: automazione documentale interna è rischio minimo, scoring del credito o triage sanitario di emergenza è rischio alto.
- Gli obblighi dell'AI Act per i sistemi ad alto rischio (scoring del credito, polizze vita e salute, triage di emergenza) si applicano dal 2 dicembre 2027, dopo il rinvio del Digital Omnibus. Per chi li usa: sorveglianza umana, log conservati almeno sei mesi e, per credito e polizze, una valutazione d'impatto sui diritti fondamentali.
- La regola pratica che usiamo: l'agente IA *istruisce e prepara*, l'umano *firma*. Questo tiene la maggior parte dei processi fuori dalle decisioni basate unicamente su un trattamento automatizzato, che l'art. 22 del GDPR limita.
- Il punto di partenza più sicuro è quasi sempre l'automazione documentale (rischio minimo). Su Numeraria, studio paghe e contabilità, ha restituito circa metà mese al management.
- DPA art. 28 GDPR, hosting UE, audit log immutabile, nessun training degli LLM sui dati cliente: senza queste fondamenta non si parte nemmeno.

## Cosa significa "agente IA in settore regolamentato"

Un agente IA in settore regolamentato è un sistema software che esegue task in autonomia (legge, valuta, agisce) dentro un'organizzazione soggetta a regole specifiche di settore, banking, insurance, sanità, dove le decisioni automatizzate sono vincolate da AI Act, GDPR e normativa di vigilanza. La distinzione chiave non è tecnica: è chi subisce l'effetto della decisione.

Detto in modo brutale: lo stesso identico agente può essere libero da obblighi o soggetto ai più pesanti dell'AI Act, a seconda di cosa decide e su chi.

## La domanda che decide tutto: chi subisce l'output?

L'[AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) classifica i sistemi in [quattro livelli di rischio](https://digital-strategy.ec.europa.eu/it/policies/regulatory-framework-ai) (li abbiamo mappati in dettaglio nella [guida AI Act per aziende](/guide/ai-act-aziende)). Per i settori regolamentati il confine operativo è uno solo.

**Se l'agente decide o influenza significativamente una persona** in uno dei casi elencati dall'allegato III, valutare il merito di credito per un mutuo, fissare rischio e premio di una polizza vita o salute, fare il triage di un paziente in emergenza, sei in **rischio alto**. Punto. Niente scorciatoie.

**Se l'agente lavora su documenti, dati e processi interni** senza decidere su persone, riconciliazioni, estrazione fatture, report, archiviazione, sei in **rischio minimo**.

Questo unico criterio risolve la maggior parte dei dubbi del compliance officer. Gli obblighi per l'alto rischio si applicano dal 2 dicembre 2027, dopo il rinvio deciso con il [Digital Omnibus](https://eur-lex.europa.eu/eli/reg/2026/1744/oj): c'è tempo per prepararsi, ma il confine è già questo.

## Banking: dove si può, dove no

**Si può (rischio minimo/limitato):**
- Riconciliazioni bancarie, estrazione dati da estratti conto, report regolatori ricorrenti
- Pre-compilazione dossier KYC (con verifica umana finale)
- Triage e routing interno di richieste, drafting risposte (umano approva e invia)

**Non si può senza obblighi pesanti (rischio alto):**
- Credit scoring automatico che decide l'esito di una richiesta di credito
- Decisioni su limiti di fido senza supervisione umana documentata

La via percorribile: l'agente prepara lo scoring e il dossier, l'analista firma la decisione. L'agente non produce output legalmente vincolante. È anche la strada più semplice rispetto all'[art. 22 del GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj), che limita le decisioni basate unicamente su un trattamento automatizzato.

## Insurance: la trappola del pricing

In assicurazione il rischio alto scatta su un fronte preciso: la **valutazione del rischio e il prezzo delle polizze vita e salute** (allegato III, punto 5). La gestione dei sinistri non è nell'elenco, ma un rifiuto deciso solo in automatico ricade comunque nell'art. 22 del GDPR: anche lì conviene che decida una persona.

Cosa si fa in sicurezza:
- Estrazione e validazione documenti di polizza e sinistro
- Preparazione del fascicolo per il liquidatore (che decide)
- Rilevazione di anomalie e potenziali frodi *da segnalare a un umano*, non da bloccare in automatico

La regola: l'agente segnala, l'umano dispone.

Per banche e assicurazioni c'è un obbligo in più, dal 2 dicembre 2027: prima di usare un sistema ad alto rischio per il merito di credito o per le polizze vita e salute, devono fare una valutazione d'impatto sui diritti fondamentali (art. 27 dell'AI Act).

## Sanità: il livello più alto di attenzione

Qui i dati sanitari sono una categoria particolare per il GDPR (art. 9) e molti sistemi di supporto diagnostico sono dispositivi medici che ricadono in rischio alto: per loro gli obblighi dell'AI Act si applicano dal 2 agosto 2028. La parte automatizzabile in sicurezza è quasi tutta **back-office e documentale**: gestione cartelle, estrazione referti, prenotazioni, compliance documentale. Tutto ciò che tocca diagnosi o triage clinico richiede supervisione medica e una valutazione d'impatto sulla protezione dei dati (DPIA, art. 35 del GDPR) prima ancora di scrivere una riga di codice.

## Il caso pratico: dove parte sempre l'automazione sicura

Il punto di ingresso meno rischioso, in qualsiasi settore regolamentato, è l'automazione documentale interna, esattamente il terreno del nostro lavoro su [finance e document automation](/finance).

Su [Numeraria](/case-studies/numeraria), studio di paghe e contabilità che lavora dentro vincoli di compliance stringenti, gli agenti IA gestiscono preventivi, ore e riconciliazioni. Risultato: circa **metà mese restituito al management**. Nessuna decisione su persone, nessun output vincolante verso terzi: rischio minimo, valore immediato.

È il modello che consigliamo: si parte dall'automazione documentale a basso rischio, si costruisce la governance, e solo dopo, se serve, si valuta il livello alto con tutte le tutele.

## Le fondamenta non negoziabili

Indipendentemente dal settore, un agente IA in ambiente regolamentato richiede:

1. **DPA art. 28 GDPR** con ogni fornitore della catena.
2. **Hosting UE o on-premise** per dati sensibili.
3. **Audit log immutabile** su ogni decisione: input, regole applicate, output, trigger, eventuale escalation umana.
4. **Supervisione umana** definita upfront sui casi critici.
5. **Nessun training degli LLM sui dati cliente.**

Noi le includiamo di default nei nostri sprint [AI Agents](/ai-agents), non per eroismo: senza queste cose, su un settore regolamentato, non puoi nemmeno cominciare.

## Quando NON costruire un agente (te lo diciamo in faccia)

- Quando il processo richiede una decisione legalmente vincolante senza margine di supervisione umana → prima cambia il processo, poi automatizza.
- Quando il dato non può uscire da un perimetro chiuso e non c'è una DPIA → si sistema la governance prima.
- Quando non hai una baseline misurata → senza sapere quanto costa oggi il task, non puoi sapere se l'agente ha senso.

Vuoi sapere in quale livello ricade il tuo caso specifico? [Parliamone](/parliamone) (20 minuti, senza pitch) o fai il [check-up in 3 minuti](/check-up).
