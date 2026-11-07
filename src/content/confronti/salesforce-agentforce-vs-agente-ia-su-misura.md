---
titolo: "Agentforce o agente IA su misura"
sottotitolo: "Attivare gli agenti pronti dentro Salesforce, oppure costruire un agente custom di proprietà. Cosa conviene davvero a una PMI."
description: "Salesforce Agentforce vs agente IA su misura: costi, tempi, controllo e lock-in a confronto, con un verdetto onesto su quando conviene l'uno o l'altro."
inBreve: "Se la tua PMI vive già dentro Salesforce e i casi d'uso sono standard (deflection ticket, qualifica lead, FAQ), Agentforce conviene: parti in fretta e resti nell'ecosistema. Un agente IA su misura (costruito e di tua proprietà) conviene quando il processo è specifico, tocca più sistemi oltre al CRM, o vuoi un codice di tua proprietà che non dipende da una piattaforma. La domanda giusta non è 'quale è meglio', ma 'quanto il mio processo somiglia al caso standard di Salesforce'."
categoria: "Platform vs Custom (build-vs-buy)"
author: "Daniel Levis"
keywords:
  - "Salesforce Agentforce vs agente IA su misura"
  - "Agentforce PMI"
  - "agente IA custom vs Agentforce"
  - "build vs buy agenti IA"
optionA:
  nome: "Salesforce Agentforce"
  descrizione: "Gli agenti IA pronti all'uso dentro la piattaforma Salesforce, configurabili con dati, flussi e permessi già presenti nel CRM."
  pro:
    - "Attivazione rapida se usi già Salesforce: dati e permessi sono già lì"
    - "Integrazione nativa con CRM, Service Cloud e Sales Cloud"
    - "Governance, audit e sicurezza gestiti dalla piattaforma"
    - "Nessun team di sviluppo necessario per i casi d'uso standard"
  contro:
    - "Il prezzo a consumo (per esempio 2 € a conversazione) cresce col volume ed è difficile da prevedere"
    - "Rende di più se Salesforce è già il CRM centrale e i dati sono in ordine"
    - "Fuori dai casi standard servono configurazione, integrazioni (per esempio MuleSoft) e crediti a consumo"
    - "L'agente gira solo dentro Salesforce: se cambi piattaforma va rifatto"
  idealePer:
    - "PMI che usano già Salesforce come CRM centrale"
    - "Casi d'uso standard: deflection ticket, FAQ, qualifica lead"
    - "Chi vuole partire senza costruire nulla internamente"
optionB:
  nome: "Agente IA su misura (build custom)"
  descrizione: "Un agente costruito sul tuo processo reale, che integra Salesforce e gli altri tuoi sistemi, con codice e dati che restano tuoi."
  pro:
    - "Costruito sul tuo processo specifico, non adattato a un template"
    - "Integra più sistemi oltre al CRM (gestionale, email, documenti, DB)"
    - "Codice e dati del cliente dal primo giorno, nessun lock-in di piattaforma"
    - "Costo dello Sprint noto in anticipo; il consumo dei modelli via API si stima a parte"
  contro:
    - "Costo iniziale di sviluppo a carico dell'azienda"
    - "Serve un referente interno che segua il progetto"
    - "La manutenzione resta tua (o del partner) nel tempo"
    - "Per casi d'uso banali può essere più lavoro del necessario"
  idealePer:
    - "Processi specifici o che toccano più sistemi oltre a Salesforce"
    - "PMI che non usano Salesforce o preferiscono non pagare a conversazione o ad azione"
    - "Chi vuole proprietà piena di codice e dati"
tabella:
  - criterio: "Tempo al primo risultato"
    valoreA: "Veloce se Salesforce è già configurato"
    valoreB: "Primo rilascio in produzione in 4 settimane"
  - criterio: "Modello di costo"
    valoreA: "A consumo o licenza per utente"
    valoreB: "Sprint da 8.000 € al mese, più il consumo dei modelli via API"
  - criterio: "Proprietà"
    valoreA: "Configurazione dentro Salesforce"
    valoreB: "Codice e dati del cliente dal primo giorno"
  - criterio: "Flessibilità sul processo"
    valoreA: "Alta nei casi standard, limitata fuori"
    valoreB: "Costruito sul processo reale"
  - criterio: "Integrazione multi-sistema"
    valoreA: "Ottima dentro l'ecosistema Salesforce"
    valoreB: "Integra CRM + altri sistemi aziendali"
  - criterio: "Prerequisiti"
    valoreA: "Salesforce come CRM, anche nelle Suites per PMI"
    valoreB: "Un referente interno e un processo da mappare"
verdetto: "Non è una scelta ideologica, dipende da dove sei. Se Salesforce è già il cuore del tuo CRM e i casi d'uso sono standard, Agentforce ti fa partire in fretta e la governance è gestita dalla piattaforma: il rischio è il costo a consumo che cresce col volume e il fatto che l'agente gira solo dentro Salesforce. Se il processo è specifico, tocca sistemi oltre al CRM o vuoi proprietà piena senza lock-in, un agente su misura conviene: costo dello Sprint noto in anticipo, codice tuo, costruito sul tuo lavoro reale. Molte PMI finiscono per usare entrambi, Agentforce dove basta e un agente custom dove il processo è davvero particolare."
faq:
  - q: "Quando ha senso Agentforce invece di un agente su misura?"
    a: "Quando la tua azienda vive già dentro Salesforce, i casi d'uso sono standard (deflection ticket, FAQ, qualifica lead) e vuoi partire senza costruire nulla. In quel contesto l'integrazione nativa e la governance della piattaforma valgono il costo a consumo. Se usi le Starter o Pro Suites, l'Employee Agent, che riassume i record, scrive bozze e registra le attività, è incluso senza costi aggiuntivi (<a href='https://www.salesforce.com/blog/small-business/agentforce-in-salesforce-suites/'>Salesforce</a>)."
  - q: "Il costo a consumo di Agentforce è davvero un problema?"
    a: "Dipende dai volumi. Salesforce offre prezzi a consumo, <strong>2 € a conversazione</strong> oppure Flex Credits a 500 € ogni 100.000 crediti con 20 crediti per azione (0,10 € ad azione), e licenze per utente da 125 € al mese con uso illimitato per i dipendenti (<a href='https://www.salesforce.com/agentforce/pricing/'>prezzi di Agentforce</a>). A basso volume il consumo è gestibile; su molte conversazioni o azioni al mese il costo <strong>cresce e va stimato con attenzione</strong>. Con un agente su misura il costo dello Sprint è noto in anticipo; resta il consumo dei modelli via API, che si paga a token e cresce anch'esso con il volume, quindi va stimato allo stesso modo."
  - q: "Con un agente su misura perdo l'integrazione con Salesforce?"
    a: "No. Un <a href='/ai-agents'>agente IA su misura</a> può integrare Salesforce come qualsiasi altro sistema, insieme a gestionale, email e documenti. Anche Agentforce può arrivare ai sistemi interni, per esempio esponendo le API aziendali con MuleSoft tramite il protocollo MCP (<a href='https://www.mulesoft.com/platform/ai/model-context-protocol/announcement'>MuleSoft</a>): la differenza è dove vive l'agente e di chi è il codice."
  - q: "E se un giorno voglio lasciare Salesforce?"
    a: "I dati li porti con te: il <a href='https://eur-lex.europa.eu/eli/reg/2023/2854/oj'>Data Act</a> obbliga i fornitori di servizi cloud, compresi i software in abbonamento, a consentire il passaggio a un altro fornitore, e dal 12 gennaio 2027 vieta di farlo pagare. La configurazione dell'agente invece funziona solo sulla piattaforma e va ricostruita altrove. Con un agente su misura il codice è tuo dal primo giorno."
  - q: "Quanto costa partire con un agente su misura?"
    a: "Con Soraia si parte da <strong>8.000 € al mese</strong> con uno Sprint, tre persone dedicate e un rilascio in produzione a fine mese. Il <strong>primo rilascio è in produzione in 4 settimane</strong> e il codice è tuo dal primo giorno. Per una stima sul tuo caso, <a href='/parliamone'>parliamone</a>."
  - q: "E se non funziona?"
    a: "Con Soraia vale la garanzia <strong>primo mese soddisfatti o rimborsati</strong>: si fissa un obiettivo misurabile in analisi e, se il primo mese non convince, rimborsiamo oppure lavoriamo gratis finché non sei soddisfatto."
fonti:
  - titolo: "Salesforce, prezzi di Agentforce"
    url: "https://www.salesforce.com/agentforce/pricing/"
  - titolo: "Salesforce, Agentforce nelle Suites per le piccole imprese (17 marzo 2026)"
    url: "https://www.salesforce.com/blog/small-business/agentforce-in-salesforce-suites/"
  - titolo: "MuleSoft, supporto MCP per collegare le API aziendali agli agenti"
    url: "https://www.mulesoft.com/platform/ai/model-context-protocol/announcement"
  - titolo: "Data Act, Regolamento (UE) 2023/2854 (EUR-Lex)"
    url: "https://eur-lex.europa.eu/eli/reg/2023/2854/oj"
related: []
featured: false
pubDate: 2026-11-03
updatedDate: 2026-11-07
lang: "it"
gates:
  passedAt: 2026-10-25T08:27:49.612Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 9, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
    - { name: "balance", score: 8, pass: true }
draft: false
---
