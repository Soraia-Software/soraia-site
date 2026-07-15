---
title: "Assessment AI aziendale: la guida operativa interna"
h1: "Assessment AI interno: cosa mappare prima di chiamare un fornitore"
description: "Come fare un assessment AI aziendale interno prima di sentire un fornitore: mappa processi, dati, ore perse e baseline. Guida operativa per CEO e COO di PMI."
pubDate: 2026-07-15
author: "Daniel Levis"
readMinutes: 11
keywords:
  - "assessment AI aziendale"
  - "AI readiness PMI"
  - "mappare processi AI"
  - "baseline automazione"
related:
  - "consulenza-ai-italia"
  - "costi-consulenza-ai"
  - "agenti-ai-aziende"
faq:
  - q: "Cos'è un assessment AI aziendale interno?"
    a: "È un esercizio di 1-2 settimane in cui mappi <strong>processi, dati, ore perse e vincoli</strong> prima di parlare con qualunque fornitore. Non serve a decidere la tecnologia: serve a capire dove l'IA ha senso, dove non ne ha, e a costruire una <strong>baseline misurabile</strong> per giudicare i preventivi che riceverai."
  - q: "Devo farlo io o pagare un consulente?"
    a: "La versione leggera la fai internamente in 1-2 settimane, a costo zero, con questa guida. Ti serve solo tempo del management e dei responsabili di reparto. Un <strong>assessment pagato</strong> (tipicamente €1.500-3.000, spesso rimborsato se procedi) ha senso dopo, quando vuoi un piano operativo dettagliato con baseline cronometrata da chi poi costruisce."
  - q: "Come calcolo le ore perse su un processo?"
    a: "Prendi il processo, contane le esecuzioni al mese, cronometra 3-5 esecuzioni reali (non stime a memoria), moltiplica. Poi separa la parte <strong>ripetitiva e a regole</strong> (candidata all'IA) dalla parte che richiede giudizio umano. La prima è il tuo potenziale recuperabile, la seconda no."
  - q: "Quali dati servono per capire se un processo è automatizzabile?"
    a: "Tre cose: dove vivono i dati (gestionale, email, PDF, fogli Excel sparsi), in che formato, e se sono accessibili via API o export. Un processo che gira su dati strutturati e accessibili è <strong>molto più economico</strong> da automatizzare di uno che dipende da PDF non standard o da conoscenza in testa alle persone."
  - q: "Come faccio a sapere se il mio caso è davvero pronto per l'IA?"
    a: "Questa guida ti dà il metodo per capirlo da solo, ma ogni azienda ha vincoli che sulla carta non si vedono (governance, cash flow, qualità dati reale). Per un parere onesto sul tuo caso specifico, senza pitch e senza preventivo a sorpresa, <a href='/parliamone'>parlane 20 minuti con noi</a>: se la risposta è \"non adesso\", te lo diciamo."
featured: false
lang: "it"
draft: false
---

Prima di chiamare un fornitore, la cosa più costosa che puoi fare è non aver fatto i compiti. Un assessment AI aziendale interno, fatto in casa in 1-2 settimane, ti mette in una posizione completamente diversa: sai dove l'IA ha senso, dove non ne ha, e hai i numeri per giudicare i preventivi invece di subirli.

Questa guida è il metodo operativo per farlo da solo, a costo zero, prima di spendere un euro. Non sostituisce l'assessment pagato di un partner (quello arriva dopo), ma decide se ha senso farlo, e su cosa.

## Perché fare l'assessment interno prima

La maggior parte delle PMI italiane chiama un fornitore chiedendo "consulenza AI" in astratto. È l'errore più caro: senza un caso d'uso definito e una baseline, non hai metro per valutare nulla. Ti ritrovi a confrontare preventivi da €10k e da €50k "per lo stesso scope sulla carta" senza sapere quale è giusto.

Un assessment interno risolve tre problemi:

1. **Ti dà un caso d'uso concreto** invece di "vogliamo fare AI". Un fornitore serio non riesce nemmeno a preventivare senza questo.
2. **Ti dà una baseline misurabile** (ore, costi, volumi), il numero contro cui giudicherai il risultato promesso.
3. **Ti smaschera i processi non pronti** prima di pagarli. Un processo che gira su dati sparsi in Excel e conoscenza in testa alle persone costa molto di più da automatizzare, e a volte non vale.

È lo stesso lavoro che un buon partner farebbe nel suo assessment pagato. Farlo prima, in versione leggera, ti fa risparmiare tempo e ti rende un cliente molto più difficile da fregare. Sul come poi scegliere il partner, la [guida sulla consulenza AI in Italia](/guide/consulenza-ai-italia) copre criteri e red flag.

## Cosa ti serve (e cosa NON ti serve)

**Ti serve**: 1-2 settimane di tempo diffuso (non a tempo pieno), il coinvolgimento dei responsabili di reparto, e la disponibilità a cronometrare processi reali invece di fidarti delle stime a memoria.

**Non ti serve**: un tech lead, un budget, o conoscenza tecnica di IA. Questo è un esercizio di operations e management, non di ingegneria. La domanda non è "quale modello usiamo", è "dove stiamo bruciando ore su lavoro ripetitivo e a regole".

**Quando NON farlo tu**: se sei un'azienda con processi molto complessi, multi-reparto, e vuoi partire subito su scala, salta alla versione pagata. L'assessment interno è per chi vuole chiarezza prima di impegnarsi, non per chi ha già deciso e ha budget per un piano dettagliato.

## I 5 passi dell'assessment interno

### Passo 1: Mappa i processi candidati

Elenca i processi ripetitivi della tua azienda, reparto per reparto. Non i progetti creativi, non le decisioni strategiche: i **processi che si ripetono con regole prevedibili**. Esempi tipici in una PMI:

- Screening CV e primo contatto candidati (recruitment)
- Estrazione dati da fatture e riconciliazioni bancarie (finance)
- Qualifica lead in arrivo e risposta primo livello (sales)
- Triage ticket e risposte ricorrenti (customer support)

Per ognuno annota: chi lo fa, quante volte al mese, quanto tempo a esecuzione.

### Passo 2: Cronometra la baseline (numeri veri, non stime)

Qui si separano i seri dai velleitari. Per i 3-4 processi più promettenti, **cronometra 3-5 esecuzioni reali**. Non chiedere "quanto ci metti?" (la risposta è sempre sbagliata di ±50%). Osserva, o fai loggare i tempi per una settimana.

Poi calcola: `esecuzioni/mese × tempo medio = ore/mese`. Questa è la tua baseline. È il numero che un fornitore dovrà impegnarsi a migliorare, ed è il numero contro cui misurerai il ROI.

### Passo 3: Verifica i dati sotto ogni processo

Un processo è automatizzabile a basso costo solo se i dati sono accessibili. Per ogni candidato, rispondi:

- **Dove vivono i dati?** Gestionale (TeamSystem, Zucchetti, Odoo), email, PDF, fogli Excel sparsi?
- **In che formato?** Strutturato (database, API) o non strutturato (PDF non standard, foto, testo libero)?
- **Sono accessibili?** C'è un'API, un export, o dipende dalla conoscenza in testa a una persona?

Regola pratica: dati strutturati e accessibili = automazione economica. Dati sparsi, PDF non standard, o conoscenza tacita = costo alto e più rischio. Questo non uccide il progetto, ma cambia il preventivo, ed è meglio saperlo prima.

### Passo 4: Separa la parte a regole dalla parte a giudizio

Dentro ogni processo c'è una parte **ripetitiva e a regole** (candidata all'IA) e una parte che richiede **giudizio umano** (resta alle persone). Un buon agente IA fa la prima e passa la seconda in escalation.

Esempio: nello screening CV, l'IA può leggere 100k+ candidati e filtrare su criteri oggettivi (come nel caso [APraise](/case-studies/apraise), dove l'agente gestisce 100k+ candidati, equivalente a circa 4 recruiter aggiuntivi), ma la decisione finale sul candidato borderline resta al recruiter. Stimare questa percentuale ti dice quanto del tuo tempo perso è realmente recuperabile.

### Passo 5: Prioritizza con la matrice impatto/fattibilità

Metti i processi su due assi: **ore recuperabili** (impatto) e **accessibilità dati + % a regole** (fattibilità). Parti da un solo processo nel quadrante alto-alto.

| Processo | Ore/mese | Dati accessibili | % a regole | Priorità |
|---|---|---|---|---|
| Screening CV | 60 | Sì (ATS) | 70% | Alta |
| Riconciliazioni | 40 | Parziale (PDF) | 80% | Media |
| Report mensili | 20 | Sì (gestionale) | 90% | Media |
| Qualifica lead | 30 | Sì (CRM) | 60% | Media |

Non partire con più di un processo. La [guida sui costi della consulenza AI](/guide/costi-consulenza-ai) spiega perché lo scope ristretto è quasi sempre la scelta giusta per il primo agente.

## Il documento finale: 1 pagina

Alla fine dell'assessment interno dovresti avere **una pagina** che contiene:

1. Il processo prioritario scelto (uno).
2. La baseline cronometrata (ore/mese, esecuzioni, tempo medio).
3. Dove vivono i dati e in che formato.
4. La % stimata di lavoro a regole vs giudizio umano.
5. Il target che vorresti raggiungere (es. "recuperare 40 delle 60 ore/mese").

Con questa pagina in mano, la conversazione con un fornitore cambia natura. Non chiedi più "cosa potete fare per noi": presenti un problema definito con numeri, e vedi chi ti risponde con un piano serio e chi con slide di marketing.

Se vuoi una versione ancora più rapida per capire la maturità AI della tua azienda prima di iniziare, il nostro [check-up in 3 minuti](/check-up) è un buon punto di partenza. E se poi vuoi affidare l'assessment approfondito a chi costruisce, i nostri [agenti IA](/ai-agents) partono da un assessment pagato (rimborsato se procedi) con baseline cronometrata dal team.

## Nota importante

Questa è guida operativa generale, non un'analisi del tuo caso specifico. Ogni azienda ha vincoli che sulla carta non si vedono: qualità reale dei dati, governance, cash flow, resistenza interna al cambiamento. Un assessment interno leggero ti porta lontano, ma non sostituisce un parere di chi ha visto decine di casi simili.

Se vuoi un parere onesto sul tuo caso, senza pitch e senza preventivo a sorpresa, [parlane 20 minuti con noi](/parliamone). Se dopo aver visto i tuoi numeri pensiamo che la risposta giusta sia "non adesso" o "basta un tool già pronto", te lo diciamo. Preferiamo dirti la verità che venderti uno sprint che non serve.
