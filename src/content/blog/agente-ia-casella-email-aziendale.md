---
title: "Agente AI per email aziendale: smista info@ in automatico"
description: "Come un agente AI legge, categorizza e assegna le email di una casella condivisa info@ o amministrazione@, con bozze pronte e audit trail. Guida per COO."
pubDate: 2026-11-25
author: "Davide Silvestri"
tags:
  - "ai agents"
  - "process-automation"
  - "how-to"
  - "ops"
keywords:
  - "agente ai email aziendale"
  - "casella email condivisa"
  - "smistamento email automatico"
  - "automazione posta aziendale"
readMinutes: 6
featured: false
h1: "La casella info@ che nessuno smaltisce: come un agente AI smista, risponde e assegna le email"
faq:
  - q: "Un agente AI per l'email aziendale sostituisce il mio team?"
    a: "No. Un <strong>agente AI per email aziendale</strong> fa il lavoro di smistamento, categorizzazione e bozza, ma la persona giusta resta nel loop: approva, modifica, invia. L'obiettivo è togliere le 2-3 ore al giorno di triage manuale, non eliminare il giudizio umano sui casi delicati."
  - q: "Quante email servono per giustificare un agente sulla casella condivisa?"
    a: "La soglia pratica che usiamo è circa <strong>20-30 email ripetitive a settimana per persona</strong> che richiedono smistamento o risposta standard. Sotto quel volume, una regola di Outlook o un paio di template bastano. Sopra, il copia-incolla avanti-indietro costa più dell'agente."
  - q: "L'agente può rispondere da solo ai clienti?"
    a: "Dipende da cosa vuoi. Per le risposte client-facing conviene la modalità bozza-più-approvazione: l'agente prepara, l'umano invia. L'invio completamente autonomo lo attiviamo solo su categorie a basso rischio e misurate, con audit log su ogni decisione per l'AI Act."
  - q: "Come funziona la privacy su una casella piena di dati personali?"
    a: "La casella condivisa contiene dati personali, quindi serve <strong>DPA art. 28 GDPR</strong> con il fornitore, hosting UE quando richiesto e nessun training degli LLM sui tuoi dati. In Soraia sono inclusi di default nel contratto, altrimenti non potremmo lavorare su caselle amministrative."
  - q: "Quanto tempo serve per avere il primo agente live sull'inbox?"
    a: "Il primo rilascio in produzione sui tuoi processi reali è in <strong>4 settimane</strong>. In genere la prima settimana è baseline e categorizzazione, poi shadow mode dove l'agente lavora ma qualcuno controlla, poi live con escalation."
lang: "it"
gates:
  passedAt: 2026-10-25T09:30:10.169Z
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

La casella info@ (o amministrazione@, ordini@, support@) è il buco nero operativo di quasi ogni PMI. Arrivano 150 email al giorno. Nessuno la "possiede". Le cose urgenti si perdono tra newsletter, fatture, candidature spontanee e clienti arrabbiati.

Un **agente AI per email aziendale** non risponde a tutto al posto tuo. Fa la parte noiosa: legge, categorizza, assegna alla persona giusta e prepara la bozza. Ecco come, senza hype.

**In breve:**
- Un agente AI su una casella condivisa fa 3 cose misurabili: categorizza, assegna, scrive bozze. Non sostituisce il giudizio umano sui casi delicati.
- La soglia pratica per costruirlo: oltre 20-30 email ripetitive a settimana per persona. Sotto, bastano regole e template.
- La casella info@ è piena di dati personali: serve DPA art. 28 GDPR, hosting UE e audit log su ogni decisione per l'AI Act.
- Il primo agente live sull'inbox è in produzione in 4 settimane, con una settimana di baseline cronometrata prima.
- Modalità consigliata per iniziare: bozza-più-approvazione. L'invio autonomo solo su categorie a basso rischio e misurate.

## Cosa fa davvero un agente su una casella condivisa

Tre task, in ordine di rischio crescente.

### 1. Categorizzazione (rischio zero, valore immediato)

L'agente legge ogni email in arrivo e la etichetta: *fattura fornitore*, *richiesta commerciale*, *candidatura*, *reclamo cliente*, *spam/newsletter*, *amministrativa*. Niente invii, niente azioni verso l'esterno. Solo ordine.

Questo da solo smaltisce metà del dolore: il team smette di aprire 150 email per capire quali 20 contano.

### 2. Assegnazione (rischio basso)

Una volta categorizzata, l'email va alla persona o al team giusto: le fatture ad amministrazione, i reclami al support, le richieste di preventivo al commerciale. L'agente può creare un ticket, taggare in un thread o spostare in una cartella condivisa.

Qui l'audit trail conta: ogni assegnazione è loggata, quindi sai *perché* un'email è finita dove è finita.

### 3. Bozze pronte (rischio da gestire)

Per le categorie ricorrenti, l'agente prepara una bozza di risposta usando il contesto aziendale: listini, FAQ interne, policy. La persona legge, corregge in 20 secondi, invia.

Non partire con l'invio autonomo. Si inizia sempre in modalità bozza-più-approvazione. L'invio automatico lo si attiva solo dopo, su categorie a basso rischio e con numeri alla mano.

## Quando conviene, e quando NO

Non costruire un agente se:

- **La casella riceve meno di 20-30 email ripetitive a settimana per persona.** Qui una regola di Outlook o 3 template fanno lo stesso lavoro a costo zero.
- **Non hai mai misurato quanto tempo costa oggi il triage.** Senza baseline non sai se l'agente ha senso. Si cronometra una settimana di smistamento su un campione reale, poi si decide.
- **Le categorie cambiano ogni mese.** Costruire regole su un flusso instabile è spreco.

Conviene quando il triage è un lavoro fisso, prevedibile, e sta rubando ore a persone pagate per fare altro. Lo stesso principio vale per gli [agenti sui processi ad alto volume](/ai-agents): alto volume, output strutturato, contesto ripetibile.

## La parte che tutti saltano: privacy e AI Act

Una casella condivisa è un archivio di dati personali: nomi, email, a volte documenti. Non è un dettaglio.

Prima di mettere un agente sopra, servono:

- **DPA art. 28 GDPR** con il fornitore (in Soraia è incluso nel contratto).
- **Hosting UE** quando richiesto, nessun training degli LLM sui tuoi dati.
- **Audit log su ogni decisione** dell'agente: cosa è arrivato, come è stato categorizzato, dove è stato assegnato. Per le caselle di [amministrazione e finance](/finance) questo non è opzionale.

Se l'agente risponde direttamente a clienti esterni, siamo in territorio [customer e compliance automation](/customer-support): trasparenza verso il destinatario e possibilità di parlare con un umano.

## Come lo costruiamo, in pratica

Il modello è lo stesso di ogni nostro sprint. Primo rilascio in produzione in **4 settimane**:

1. **Settimana 1**: baseline cronometrata del triage attuale + mappa delle categorie reali.
2. **Settimana 2-3**: l'agente categorizza e assegna in shadow mode. Lavora, ma una persona controlla.
3. **Settimana 4**: live con escalation. Un solo metric primario, ad esempio *ore/settimana recuperate sul triage* oppure *tempo di prima assegnazione*.

Il target del metric è scritto nel contratto. Primo mese soddisfatti o rimborsati: se non ti convince, rimborsiamo oppure lavoriamo gratis finché non è a posto.

## Il punto onesto

L'agente sulla casella info@ non è magia. È una macchina che fa una cosa noiosa in modo prevedibile, lascia la decisione finale a chi deve prenderla, e si fa misurare. Se la tua casella condivisa è un buco nero, probabilmente vale la pena. Se sono 15 email al giorno, no.

Vuoi capire da che parte stai? [Parliamone in 20 minuti](/parliamone) oppure [fai il check-up in 3 minuti](/check-up).
