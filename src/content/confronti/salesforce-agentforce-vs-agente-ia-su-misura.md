---
titolo: "Agentforce o agente IA su misura"
sottotitolo: "Attivare gli agenti pronti dentro Salesforce, oppure costruire un agente custom di proprieta'. Cosa conviene davvero a una PMI."
description: "Salesforce Agentforce vs agente IA su misura: costi, tempi, controllo e lock-in a confronto, con un verdetto onesto su quando conviene l'uno o l'altro."
inBreve: "Se la tua PMI vive gia' dentro Salesforce e i casi d'uso sono standard (deflection ticket, qualifica lead, FAQ), Agentforce conviene: parti in fretta e resti nell'ecosistema. Un agente IA su misura (costruito e di tua proprieta') conviene quando il processo e' specifico, tocca piu' sistemi oltre al CRM, o vuoi codice e dati di proprieta' senza costi a consumo che crescono col volume. La domanda giusta non e' 'quale e' meglio', ma 'quanto il mio processo somiglia al caso standard di Salesforce'."
categoria: "Platform vs Custom (build-vs-buy)"
author: "Daniel Levis"
keywords:
  - "Salesforce Agentforce vs agente IA su misura"
  - "Agentforce PMI"
  - "agente IA custom vs Agentforce"
  - "build vs buy agenti IA"
optionA:
  nome: "Salesforce Agentforce"
  descrizione: "Gli agenti IA pronti all'uso dentro la piattaforma Salesforce, configurabili con dati, flussi e permessi gia' presenti nel CRM."
  pro:
    - "Attivazione rapida se usi gia' Salesforce: dati e permessi sono gia' li'"
    - "Integrazione nativa con CRM, Service Cloud e Sales Cloud"
    - "Governance, audit e sicurezza gestiti dalla piattaforma"
    - "Nessun team di sviluppo necessario per i casi d'uso standard"
  contro:
    - "Costo a consumo (per conversazione/azione) che cresce col volume e diventa difficile da prevedere"
    - "Richiede gia' un investimento Salesforce maturo e ben configurato"
    - "Flessibilita' limitata fuori dai casi d'uso previsti dalla piattaforma"
    - "Lock-in: l'agente vive dentro Salesforce, non e' tuo e non lo porti via"
  idealePer:
    - "PMI che usano gia' Salesforce come CRM centrale"
    - "Casi d'uso standard: deflection ticket, FAQ, qualifica lead"
    - "Chi vuole partire senza costruire nulla internamente"
optionB:
  nome: "Agente IA su misura (build custom)"
  descrizione: "Un agente costruito sul tuo processo reale, che integra Salesforce e gli altri tuoi sistemi, con codice e dati che restano tuoi."
  pro:
    - "Costruito sul tuo processo specifico, non adattato a un template"
    - "Integra piu' sistemi oltre al CRM (gestionale, email, documenti, DB)"
    - "Codice e dati del cliente dal primo giorno, nessun lock-in di piattaforma"
    - "Costo prevedibile a sprint invece che a consumo per volume"
  contro:
    - "Costo iniziale di sviluppo a carico dell'azienda"
    - "Serve un referente interno che segua il progetto"
    - "La manutenzione resta tua (o del partner) nel tempo"
    - "Per casi d'uso banali puo' essere piu' lavoro del necessario"
  idealePer:
    - "Processi specifici o che toccano piu' sistemi oltre a Salesforce"
    - "PMI che non usano Salesforce o che vogliono evitare il consumo a volume"
    - "Chi vuole proprieta' piena di codice e dati"
tabella:
  - criterio: "Tempo al primo risultato"
    valoreA: "Veloce se Salesforce e' gia' configurato"
    valoreB: "Primo rilascio in produzione in 4 settimane"
  - criterio: "Modello di costo"
    valoreA: "A consumo (cresce col volume)"
    valoreB: "A Sprint da 8.000 € al mese, prevedibile"
  - criterio: "Proprieta'"
    valoreA: "Dentro Salesforce, nessuna"
    valoreB: "Codice e dati del cliente dal primo giorno"
  - criterio: "Flessibilita' sul processo"
    valoreA: "Alta nei casi standard, limitata fuori"
    valoreB: "Costruito sul processo reale"
  - criterio: "Integrazione multi-sistema"
    valoreA: "Ottima dentro l'ecosistema Salesforce"
    valoreB: "Integra CRM + altri sistemi aziendali"
  - criterio: "Prerequisiti"
    valoreA: "Salesforce gia' in uso e maturo"
    valoreB: "Un referente interno e un processo da mappare"
verdetto: "Non e' una scelta ideologica, dipende da dove sei. Se Salesforce e' gia' il cuore del tuo CRM e i casi d'uso sono standard, Agentforce ti fa partire in fretta e la governance e' gestita dalla piattaforma: il rischio e' il costo a consumo che cresce col volume e il fatto che l'agente non e' tuo. Se il processo e' specifico, tocca sistemi oltre al CRM o vuoi proprieta' piena senza lock-in, un agente su misura conviene: costo prevedibile, codice tuo, costruito sul tuo lavoro reale. Molte PMI finiscono per usare entrambi, Agentforce dove basta e un agente custom dove il processo e' davvero particolare."
faq:
  - q: "Quando ha senso Agentforce invece di un agente su misura?"
    a: "Quando la tua azienda vive gia' dentro Salesforce, i casi d'uso sono standard (deflection ticket, FAQ, qualifica lead) e vuoi partire senza costruire nulla. In quel contesto l'integrazione nativa e la governance della piattaforma valgono il costo a consumo."
  - q: "Il costo a consumo di Agentforce e' davvero un problema?"
    a: "Dipende dai volumi. A basso volume e' gestibile, ma su molte conversazioni o azioni al mese il costo <strong>cresce in modo difficile da prevedere</strong>. Un agente su misura ha un costo a Sprint noto in anticipo, indipendente dal volume."
  - q: "Con un agente su misura perdo l'integrazione con Salesforce?"
    a: "No. Un <a href='/ai-agents'>agente IA su misura</a> puo' integrare Salesforce come qualsiasi altro sistema, e in piu' il gestionale, l'email e i documenti che Agentforce non tocca. La differenza e' che il codice resta tuo, non vive dentro la piattaforma."
  - q: "Quanto costa partire con un agente su misura?"
    a: "Con Soraia si parte da <strong>8.000 € al mese</strong> con uno Sprint, tre persone dedicate e un rilascio in produzione a fine mese. Il <strong>primo rilascio e' in produzione in 4 settimane</strong> e il codice e' tuo dal primo giorno. Per una stima sul tuo caso, <a href='/parliamone'>parliamone</a>."
  - q: "E se non funziona?"
    a: "Con Soraia vale la garanzia <strong>primo mese soddisfatti o rimborsati</strong>: si fissa un obiettivo misurabile in analisi e, se il primo mese non convince, rimborsiamo oppure lavoriamo gratis finche' non sei soddisfatto."
related: []
featured: false
pubDate: 2026-11-03
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
