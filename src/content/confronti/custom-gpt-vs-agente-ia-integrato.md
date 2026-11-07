---
titolo: "Plugin di ChatGPT (ex Custom GPT) o agente IA integrato"
sottotitolo: "OpenAI ritira i Custom GPT l'11 dicembre 2026 e li sostituisce con i plugin. Cosa fanno, e quando serve invece un agente integrato nei tuoi sistemi."
description: "Custom GPT ritirati l'11 dicembre 2026: plugin di ChatGPT o agente IA integrato nei tuoi sistemi? Cosa fanno, costi e dati a confronto, con un verdetto onesto."
inBreve: "OpenAI ritira i Custom GPT l'11 dicembre 2026 (l'11 febbraio 2027 per alcuni workspace Enterprise con proroga) e li sostituisce con i plugin di ChatGPT, che riuniscono istruzioni, file di riferimento e app collegate. Un plugin va bene per assistere le persone dentro ChatGPT, anche con azioni sulle app collegate. Un agente integrato via API costa di più e richiede sviluppo, ma esegue il processo nei tuoi sistemi, con regole e log tuoi. Se oggi usi un Custom GPT: migralo e testa il plugin prima del ritiro, poi valuta l'agente integrato dove serve automatizzare un processo end-to-end."
categoria: "Build depth"
author: "Daniel Levis"
keywords:
  - "Custom GPT vs agente IA su misura integrato"
  - "ritiro Custom GPT plugin ChatGPT"
  - "plugin ChatGPT o agente API"
  - "agente IA integrato CRM PMI"
optionA:
  nome: "Plugin di ChatGPT (ex Custom GPT)"
  descrizione: "Con il ritiro dei Custom GPT, istruzioni e file di conoscenza passano in un plugin: skill, file di riferimento e app collegate, usati dentro ChatGPT."
  pro:
    - "Si parte in fretta: le istruzioni di un Custom GPT si possono migrare in un plugin"
    - "Lo costruisce chi conosce il processo, anche con Plugin Creator, senza scrivere codice"
    - "Le app collegate permettono di leggere e agire su servizi esterni, entro i permessi dell'account"
    - "Costo marginale basso se hai già ChatGPT Business o Enterprise"
  contro:
    - "Le azioni personalizzate dei Custom GPT non passano al plugin: per un sistema interno può servire un server MCP"
    - "Vive dentro ChatGPT: funzioni e disponibilità dipendono da piano, workspace e regione"
    - "Dipende dalle scelte di OpenAI, come mostra il ritiro dei Custom GPT"
    - "Controlli e log sono quelli che ChatGPT prevede per il tuo piano"
  idealePer:
    - "Chi oggi usa Custom GPT e deve migrarli prima del ritiro"
    - "Assistenti su istruzioni e documenti interni, usati dentro ChatGPT"
    - "Team che vogliono un aiuto senza toccare i sistemi core"
optionB:
  nome: "Agente IA integrato via API nei processi"
  descrizione: "Un agente costruito sul tuo processo, connesso via API a CRM, gestionale e strumenti, che legge, decide ed esegue azioni in autonomia."
  pro:
    - "Agisce nei tuoi sistemi: aggiorna il CRM, invia comunicazioni, esegue il processo end-to-end"
    - "Integrato con i tuoi dati in tempo reale, anche su gestionali senza app pronte"
    - "Governance tua: audit log immutabile, controllo dei dati, on-premise possibile"
    - "Model-agnostico: non sei legato a un solo fornitore di LLM"
    - "Codice del cliente dal primo giorno, versionabile e testabile"
  contro:
    - "Richiede sviluppo e integrazione: non è pronto in poche ore"
    - "Costo iniziale a carico dell'azienda, più il consumo dei modelli via API"
    - "Serve un referente interno e accesso ai sistemi da integrare"
    - "Sovradimensionato se il caso d'uso è solo rispondere a domande"
  idealePer:
    - "Processi ripetitivi dove il valore è nell'esecuzione, non nella chat"
    - "Chi ha bisogno di scrivere nei sistemi e non solo leggere"
    - "Aziende con requisiti di compliance e audit sul dato"
tabella:
  - criterio: "Cosa fa"
    valoreA: "Assiste in ChatGPT, agisce sulle app collegate"
    valoreB: "Esegue il processo nei tuoi sistemi"
  - criterio: "Integrazione dati"
    valoreA: "File di riferimento e app collegate; MCP per i sistemi interni"
    valoreB: "API su CRM e gestionale in tempo reale"
  - criterio: "Tempo di avvio"
    valoreA: "Ore o giorni"
    valoreB: "Prima delivery in 4 settimane"
  - criterio: "Governance e audit"
    valoreA: "Quelli del piano ChatGPT"
    valoreB: "Audit log immutabile, dati tuoi"
  - criterio: "Lock-in"
    valoreA: "Ecosistema ChatGPT"
    valoreB: "Codice del cliente, model-agnostico"
  - criterio: "Costo"
    valoreA: "Basso (dentro ChatGPT Business o Enterprise)"
    valoreB: "Sprint da 8.000 € al mese, più il consumo dei modelli via API"
verdetto: "Il ritiro dei Custom GPT non cambia la domanda di fondo, la rende più urgente. Se usi un Custom GPT per rispondere, riassumere e ragionare su documenti, migralo in un plugin e testalo prima dell'11 dicembre 2026: per assistere le persone dentro ChatGPT resta la strada più rapida. Se invece il valore sta nell'esecuzione, cioè aggiornare il CRM, mandare comunicazioni e chiudere il processo nei tuoi sistemi con regole e log tuoi, serve un agente integrato via API. La sequenza sensata per molte PMI: plugin per assistere le persone, agente integrato dove il ritorno lo giustifica."
faq:
  - q: "Cosa succede ai Custom GPT?"
    a: "OpenAI li ritira l'<strong>11 dicembre 2026</strong>; alcuni workspace Enterprise con proroga approvata arrivano all'11 febbraio 2027. Fino ad allora restano utilizzabili. Chi li ha creati può migrarli in un plugin: le istruzioni diventano una skill, i file di conoscenza diventano file di riferimento e le app collegate passano al plugin. Le azioni personalizzate invece non si trasferiscono e vanno ricostruite, a volte con un server MCP (<a href='https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq'>OpenAI</a>)."
  - q: "Un plugin di ChatGPT può aggiornare il mio CRM o mandare email?"
    a: "Sì, se il CRM o la posta hanno un'app collegabile a ChatGPT: le app collegano account, informazioni e azioni, sempre entro i permessi dell'account e del workspace (<a href='https://help.openai.com/en/articles/20001256-plugins-in-chatgpt'>OpenAI</a>). Per un gestionale interno senza app serve un'integrazione su misura. In ogni caso il processo resta dentro ChatGPT, con le regole del tuo piano: per eseguirlo in modo stabile e auditabile nei tuoi sistemi serve un <a href='/ai-agents'>agente integrato</a>."
  - q: "Allora il plugin è inutile?"
    a: "No. È <strong>ottimo per validare in fretta</strong>: capisci in poco tempo se un assistente su istruzioni e documenti porta valore, prima di investire in sviluppo. Spesso è il primo passo giusto proprio perché costa poco e non tocca i sistemi core."
  - q: "Quanto costa passare a un agente integrato?"
    a: "Con Soraia si parte da <strong>8.000 € al mese</strong>: tre persone dedicate (Account Manager, Project Manager e AI Engineer) e un rilascio in produzione ogni mese, con prima delivery in 4 settimane. A parte resta il consumo dei modelli via API. Il codice è tuo dal primo giorno, nessun lock-in. Per una stima sul tuo caso, <a href='/parliamone'>parliamone</a>."
  - q: "Con l'agente integrato resto legato a OpenAI?"
    a: "No. Un agente costruito su misura è <strong>model-agnostico</strong>: puoi cambiare LLM senza rifare tutto. Con un plugin vivi invece dentro l'ecosistema ChatGPT, e il ritiro dei Custom GPT mostra che le regole le decide OpenAI. Vedi anche lo <a href='/software-development'>sviluppo software su misura</a>."
  - q: "E la compliance sui dati?"
    a: "Con un plugin valgono le regole del tuo piano: su ChatGPT Business, per esempio, OpenAI non addestra i modelli sui dati del workspace (<a href='https://help.openai.com/en/articles/8542115-chatgpt-business-general-faq'>OpenAI</a>). Un agente integrato consente <strong>audit log immutabile, infrastruttura europea e on-premise</strong> quando serve: rilevante se hai requisiti GDPR o AI Act stringenti."
  - q: "Perché questa pagina è stata aggiornata?"
    a: "Il 7 novembre 2026 l'abbiamo riscritta: la versione precedente consigliava di partire da un Custom GPT, che OpenAI ritira l'11 dicembre 2026. Ora il confronto è con i plugin di ChatGPT che li sostituiscono."
fonti:
  - titolo: "OpenAI, ritiro e migrazione dei Custom GPT"
    url: "https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq"
  - titolo: "OpenAI, plugin in ChatGPT"
    url: "https://help.openai.com/en/articles/20001256-plugins-in-chatgpt"
  - titolo: "OpenAI, domande frequenti su ChatGPT Business"
    url: "https://help.openai.com/en/articles/8542115-chatgpt-business-general-faq"
related: []
featured: false
pubDate: 2026-10-13
updatedDate: 2026-11-07
lang: "it"
gates:
  passedAt: 2026-09-25T08:57:38.248Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 9, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 9, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
    - { name: "balance", score: 9, pass: true }
draft: false
---
