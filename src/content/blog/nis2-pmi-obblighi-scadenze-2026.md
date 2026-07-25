---
title: "NIS2 e PMI: obblighi 2026 (anche di riflesso)"
description: "La tua PMI non e' un soggetto NIS2 diretto ma e' nella catena di fornitura di uno? Ecco cosa cambia nel 2026, cosa ti chiederanno e dove entra l'IA."
pubDate: 2026-08-31
author: "Daniel Levis"
tags:
  - "nis2"
  - "compliance"
  - "cybersecurity"
  - "gdpr"
  - "ai-governance"
keywords:
  - "nis2 pmi obblighi 2026"
  - "nis2 catena di fornitura"
  - "nis2 supply chain"
  - "obblighi nis2"
readMinutes: 7
featured: false
h1: "NIS2 e la tua PMI nel 2026: sei nella catena di fornitura di un obbligato?"
faq:
  - q: "La mia PMI e' obbligata NIS2?"
    a: "Direttamente, solo se rientri nei settori e nelle soglie dimensionali della direttiva (media o grande impresa in ambiti come energia, trasporti, sanita', digitale, manifatturiero critico). Ma anche se NON sei un soggetto diretto, se fornisci un obbligato ti arrivano requisiti di sicurezza <strong>a cascata dai suoi contratti</strong>. Nel 2026 e' questo il canale piu' frequente per una PMI."
  - q: "Cosa mi chiedera' un cliente NIS2?"
    a: "Tipicamente: policy di sicurezza scritte, gestione degli accessi, log delle attivita', un piano di risposta agli incidenti con tempi di notifica, e clausole contrattuali che estendono i suoi obblighi a te. Spesso sotto forma di questionario di sicurezza fornitori o di allegato al contratto. Rispondere richiede documentazione, non solo buona volonta'."
  - q: "Che c'entra l'IA con NIS2?"
    a: "Due cose. Prima: se usi agenti IA sui processi, quegli agenti accedono a dati e sistemi, quindi entrano nel perimetro di sicurezza che il tuo cliente NIS2 vuole vedere governato. Serve <strong>audit log, controllo accessi e supervisione umana</strong>. Seconda: l'IA aiuta a sostenere gli obblighi (triage automatico degli alert, documentazione, monitoraggio), non li crea da sola."
  - q: "Rischio sanzioni se sono solo un fornitore?"
    a: "Le sanzioni NIS2 colpiscono i soggetti obbligati, non i loro fornitori. Ma il tuo rischio reale e' contrattuale e commerciale: <strong>perdere la fornitura</strong> se non passi la due diligence di sicurezza del cliente. Per una PMI questo pesa piu' di una multa astratta."
lang: "it"
gates:
  passedAt: 2026-07-25T07:05:11.702Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 8, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

La NIS2 non e' l'AI Act. Ma sta arrivando sulla scrivania delle PMI dallo stesso canale: un cliente piu' grande che ti gira i suoi obblighi.

Molte PMI italiane pensano "non e' roba mia, sono troppo piccolo". Nel 2026 questo e' spesso falso, non perche' sei un soggetto obbligato, ma perche' **sei nella catena di fornitura di uno che lo e'**.

**In breve:**

- La maggior parte delle PMI NON e' un soggetto NIS2 diretto (servono settore critico + soglie dimensionali da media/grande impresa).
- Ma se fornisci un obbligato, i suoi requisiti di sicurezza ti arrivano **via contratto**: questionari fornitori, clausole, richieste di log e piani di incident response.
- Il rischio per te non e' la multa NIS2 (colpisce l'obbligato), e' **perdere la fornitura** se non passi la due diligence.
- Se usi agenti IA sui processi, quegli agenti accedono a dati e sistemi: entrano nel perimetro di sicurezza che il cliente vuole vedere governato.
- La preparazione utile non e' un progetto da 6 mesi: e' policy scritte, controllo accessi, log, un piano incidenti. Documentazione, non eroismo.

## Sei un soggetto NIS2 diretto o "di riflesso"?

La direttiva classifica soggetti **essenziali** e **importanti** in una lista di settori (energia, trasporti, banche, sanita', infrastrutture digitali, PA, manifatturiero critico, gestione rifiuti, alimentare, e altri), con soglie dimensionali che tipicamente escludono le micro e piccole imprese.

Traduzione operativa: se sei una PMI da 10-200 persone fuori da quei settori, **quasi certamente non sei un obbligato diretto**.

Il punto e' il secondo canale. La NIS2 impone agli obbligati di gestire la **sicurezza della catena di fornitura**. Quindi il tuo cliente obbligato deve garantire che anche i suoi fornitori (tu) abbiano un livello di sicurezza adeguato. E lo fa nel modo piu' semplice per lui: **te lo mette nel contratto**.

## Cosa ti chiedera' concretamente un cliente obbligato

Non riceverai una lettera dallo Stato. Riceverai un questionario di sicurezza fornitori, o un allegato contrattuale, con richieste tipo:

- Policy di sicurezza e gestione degli accessi documentate.
- Log delle attivita' sui sistemi che toccano i suoi dati.
- Un piano di risposta agli incidenti con **tempi di notifica** (la NIS2 impone all'obbligato tempi stretti: se l'incidente parte da te, deve saperlo in fretta).
- Clausole che estendono i suoi obblighi a te.

Se non sai rispondere, non prendi una multa. Rischi di uscire dalla shortlist fornitori. Per una PMI questo e' il costo vero.

## Dove entra (davvero) l'IA

Due collegamenti concreti, senza hype.

**Primo: i tuoi agenti IA sono nel perimetro.** Se hai automatizzato triage ticket, riconciliazioni o screening con agenti che accedono a dati e sistemi, quegli agenti fanno parte della tua superficie di sicurezza. Un cliente NIS2 attento chiedera' come li governi. Ecco perche' negli sprint Soraia includiamo di default **audit log immutabile su ogni decisione dell'agente**, controllo accessi e supervisione umana sui casi critici: non e' un vezzo, e' esattamente cio' che serve mostrare in una due diligence. Ne parliamo anche nella nostra pagina [Customer & Compliance Automation](/customer-support).

**Secondo: l'IA aiuta a sostenere gli obblighi, non li inventa.** Triage automatico degli alert di sicurezza, documentazione generata e tenuta aggiornata, monitoraggio: sono task ripetitivi dove un agente riduce il carico. Ma la responsabilita' resta umana. L'IA che "gestisce la compliance da sola" e' una scorciatoia che non esiste.

## Quando NON serve un progetto

Te lo dico chiaro: se nessuno dei tuoi clienti e' un soggetto NIS2, e non lo prevedi, **non partire con un cantiere di cybersecurity in nome di una direttiva che non ti tocca**. Fai l'igiene di base (backup, accessi, MFA, un piano incidenti minimo) e concentrati sul business.

Il progetto ha senso quando un cliente obbligato ti sta gia' mandando il questionario, o quando stai costruendo agenti IA su dati sensibili e vuoi che la governance regga a un audit. In quel caso ha senso trattare la sicurezza degli agenti come parte del build, non come toppa dopo. E' lo stesso principio con cui affrontiamo lo [sviluppo software su misura](/software-development): sicurezza e log dentro il progetto, codice del cliente dal primo giorno.

Se stai formando il team a usare l'IA in modo sicuro e tracciabile, e' il tipo di governance che copriamo anche nei percorsi di [AI Adoption](/ai-adoption).

## Il prossimo passo

Non serve una consulenza da 6 mesi per capire dove sei. Serve una mappa onesta: sei obbligato, sei nella catena di uno, o non ti tocca? E se usi agenti IA, reggono a una richiesta di due diligence?

[Parliamone](/parliamone) in 20 minuti, oppure fai il [check-up](/check-up). Ti diciamo in che scenario ricadi, senza vendere un progetto che non ti serve.
