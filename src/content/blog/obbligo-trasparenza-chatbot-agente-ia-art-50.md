---
title: "Obbligo trasparenza chatbot AI Act: cosa fare entro il 2026"
description: "Dal 2 agosto 2026 ogni chatbot deve dichiararsi IA (Art. 50 AI Act): cosa cambia per l'assistenza clienti tra disclosure, watermarking e audit trail."
pubDate: 2026-06-24
author: "Daniel Levis"
tags:
  - "ai act"
  - "compliance"
  - "customer-support"
  - "chatbot"
keywords:
  - "obbligo trasparenza chatbot ai act"
  - "art 50 ai act"
  - "trasparenza chatbot"
  - "disclosure IA customer support"
readMinutes: 6
featured: false
h1: "Dal 2 agosto 2026 il tuo chatbot deve dichiararsi IA: cosa cambia (davvero)"
faq:
  - q: "Dal 2 agosto 2026 il mio chatbot deve dire che è un'IA?"
    a: "Sì. L'<strong>Art. 50 dell'AI Act</strong> obbliga chi gestisce un sistema conversazionale rivolto al pubblico a informare l'utente, in modo chiaro e tempestivo, che sta interagendo con un'IA. Vale per chatbot di assistenza, voicebot e agenti che rispondono ai clienti."
  - q: "Cosa cambia per i contenuti generati dall'IA?"
    a: "Testi, immagini, audio e video generati o manipolati dall'IA vanno marcati in modo leggibile da una macchina (watermarking / metadata) e segnalati all'utente quando il contenuto è destinato a informare il pubblico. La disclosure non basta solo nell'interfaccia: deve essere tecnicamente verificabile."
  - q: "Una semplice scritta 'parli con un assistente virtuale' è sufficiente?"
    a: "Per il livello a rischio limitato spesso sì, purché la disclosure sia visibile all'inizio dell'interazione e l'utente possa chiedere un operatore umano. Ma senza un <strong>audit trail</strong> che dimostri quando e come l'avviso è stato mostrato, in un controllo non hai prove. La disclosure va loggata, non solo visualizzata."
  - q: "Il Digital Omnibus sull'IA cambia le scadenze?"
    a: "Il Digital Omnibus sull'IA, approvato dal Parlamento europeo a giugno 2026, punta a ridurre gli oneri documentali per le PMI, ma gli obblighi di trasparenza dell'Art. 50 restano la baseline. Pianifica sulla data certa (2 agosto 2026) e adatta se e quando arrivano deroghe ufficiali, non prima."
  - q: "Chi è responsabile, io o il fornitore del chatbot?"
    a: "Entrambi, su piani diversi. Il fornitore deve rendere possibile la disclosure e il watermarking; tu, come deployer, sei responsabile di attivarli e di conservare l'evidenza. Verifica che nel contratto e nel <strong>DPA art. 28 GDPR</strong> sia chiaro chi fa cosa."
lang: "it"
draft: true
---

Dal **2 agosto 2026** scatta l'Art. 50 dell'AI Act: chi gestisce un chatbot rivolto al pubblico deve dire all'utente che sta parlando con un'IA. Sembra una formalità. Per chi ha l'assistenza clienti automatizzata, non lo è.

La parte che pochi raccontano: non basta scriverlo a schermo. Serve poterlo *dimostrare*.

**In breve:**

- Dal **2 agosto 2026** ogni chatbot, voicebot o agente conversazionale rivolto al pubblico deve informare l'utente che è un'IA (Art. 50 AI Act, rischio limitato).
- I contenuti generati dall'IA (testo, immagini, audio, video) destinati a informare il pubblico vanno marcati in modo leggibile da una macchina (watermarking / metadata).
- La disclosure non è solo una scritta nell'interfaccia: senza **audit trail** che provi quando è stata mostrata, in un controllo non hai evidenza.
- Il **Digital Omnibus sull'IA** (approvato dal Parlamento europeo a giugno 2026) punta a semplificare gli oneri documentali per le PMI, ma l'Art. 50 resta la baseline: pianifica sulla data certa.
- Responsabilità condivisa: il fornitore abilita disclosure e watermarking, tu come deployer li attivi e ne conservi l'evidenza.

## Cosa dice davvero l'Art. 50

L'AI Act mette i chatbot client-facing nel **rischio limitato**. L'obbligo principale è uno: trasparenza. Tre cose concrete.

1. **Disclosure conversazionale.** L'utente deve sapere, in modo chiaro e all'inizio dell'interazione, che parla con un'IA e non con un operatore umano.
2. **Marcatura dei contenuti sintetici.** Testi, immagini, audio o video generati o manipolati dall'IA, quando informano il pubblico, vanno segnalati e marcati con metadata leggibili da una macchina.
3. **Eccezioni ragionevoli.** Non serve ripetere l'avviso se è ovvio dal contesto, ma l'onere di dimostrare l'ovvietà è tuo.

Le violazioni degli obblighi di trasparenza rientrano nella fascia fino a 15 milioni di euro o il 3% del fatturato mondiale annuo (Art. 99 del Regolamento UE 2024/1689) — non il tetto massimo, riservato alle pratiche vietate. Ma per le PMI il rischio reale non è la sanzione: è arrivare al controllo (o al reclamo di un cliente) senza prove di cosa il bot ha mostrato e quando.

## L'errore tipico: disclosure senza prova

La maggior parte dei team aggiunge una frase tipo *"Stai parlando con il nostro assistente virtuale"* e considera chiuso il discorso. Non lo è.

Se domani un cliente sostiene di non aver mai saputo di parlare con un'IA, o un'autorità chiede evidenza, ti serve un **log** che mostri:

- quando l'avviso di disclosure è stato presentato;
- in quale punto della conversazione;
- se e quando l'utente ha chiesto un operatore umano;
- quali contenuti sono stati generati dall'IA e con quale marcatura.

Questo è esattamente lo stesso audit trail immutabile che mettiamo di default sui nostri agenti di [customer & compliance automation](/customer-support). Non perché siamo eroici: senza, non possiamo lavorare su processi regolamentati.

## Watermarking dei contenuti: la parte sottovalutata

L'attenzione va tutta al chatbot, ma l'Art. 50 colpisce anche i **contenuti sintetici** che pubblichi. Risposte generate inviate via email, riepiloghi automatici, materiali di supporto: se informano il pubblico e sono generati dall'IA, vanno marcati.

La marcatura "machine-readable" (metadata, non solo una scritta) è la parte tecnica che la disclosure a schermo non copre. Va impostata a livello di sistema, alla fonte, non aggiunta a mano.

## Un caso concreto: moderazione e contenuti

Quando abbiamo costruito gli agenti per [Navily](/case-studies/navily) (community boating), il task era moderazione ed enrichment di contenuti UGC, con un **−70% di tempo operativo**. Lì la trasparenza non è un'opzione: ogni intervento automatico dell'agente è loggato e tracciabile, così che chi gestisce la community possa rispondere a "chi/cosa ha deciso questo" con un record, non con un'opinione.

È lo stesso principio dell'Art. 50: l'agente può fare il lavoro, ma deve lasciare una traccia verificabile.

## Quando NON ti serve fare nulla di speciale

Onestà operativa: non tutti i casi richiedono un progetto.

- **Routing interno + drafting risposte** (umano che approva e invia) → rischio minimo, niente disclosure all'utente finale.
- **Bot interno per i dipendenti** → la disclosure è una buona pratica, non un obbligo Art. 50.
- **Chatbot frontline già esistente con un buon fornitore** → spesso basta attivare la disclosure nativa e verificare che il log sia conservato. Non rifare tutto.

Se il tuo bot è frontline e prende decisioni o invia contenuti ai clienti, invece, la disclosure tracciata e il watermarking diventano operativi entro il 2 agosto 2026.

## Cosa fare entro agosto 2026 (4 mosse)

1. **Mappa i punti di contatto IA-cliente**: chatbot, voicebot, email automatiche, contenuti generati.
2. **Attiva e logga la disclosure** all'inizio di ogni interazione conversazionale.
3. **Imposta il watermarking** dei contenuti sintetici a livello di sistema.
4. **Verifica il DPA art. 28** col fornitore: chi abilita cosa, chi conserva l'evidenza.

Per il quadro completo degli obblighi AI Act per livello di rischio, parti dalla [guida AI Act per le PMI](/guide/ai-act-aziende). Se invece hai un agente di assistenza già in produzione e vuoi sapere se è a norma, lo vediamo insieme.

---

**Vuoi una verifica del tuo chatbot prima di agosto 2026?** [Parliamone](/parliamone) (20 minuti, senza pitch) o guarda come costruiamo agenti con audit trail su [AI Agents](/ai-agents).
