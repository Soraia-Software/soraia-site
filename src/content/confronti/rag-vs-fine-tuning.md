---
titolo: "RAG o fine-tuning: come dare i tuoi dati all'AI"
sottotitolo: "Due modi per far usare all'AI aziendale la tua conoscenza interna: recuperare i documenti al volo (RAG) oppure riaddestrare il modello (fine-tuning). Cosa conviene a una PMI."
description: "RAG vs fine-tuning per l'AI aziendale: costi, aggiornamento dei dati, controllo e privacy a confronto, con un verdetto onesto su quando serve l'uno o l'altro."
inBreve: "Per la maggior parte delle PMI il punto di partenza giusto è il RAG: collega l'AI ai tuoi documenti senza riaddestrare nulla, aggiorni la conoscenza in tempo reale e tieni i dati sotto controllo. Il fine-tuning conviene quando ti serve un tono, un formato o un comportamento molto specifico e ripetuto, non per iniettare fatti che cambiano spesso. Nella pratica i due approcci non si escludono: spesso si parte da RAG e si aggiunge fine-tuning solo dove serve davvero."
categoria: "Architettura AI"
author: "Daniel Levis"
keywords:
  - "rag vs fine-tuning"
  - "rag o fine-tuning"
  - "dati aziendali AI"
  - "architettura AI PMI"
optionA:
  nome: "RAG (Retrieval-Augmented Generation)"
  descrizione: "L'AI recupera al volo i documenti aziendali rilevanti (manuali, contratti, policy) e risponde basandosi su quelli, senza modificare il modello."
  pro:
    - "Conoscenza sempre aggiornata: cambi un documento e la risposta cambia subito"
    - "Costo di avvio più basso, nessun ciclo di addestramento"
    - "Fonti tracciabili: puoi mostrare da quale documento arriva la risposta"
    - "I dati restano nel tuo archivio e non entrano nel modello: a ogni domanda passano al fornitore solo i brani recuperati"
  contro:
    - "Qualità legata alla qualità dei documenti: dati disordinati = risposte mediocri"
    - "Richiede una pipeline di indicizzazione e ricerca da mantenere"
    - "Le risposte molto lunghe o il contesto frammentato possono degradare la precisione"
    - "Non cambia il tono o lo stile di base del modello"
    - "Anche le citazioni vanno controllate: i modelli possono inventarle, avverte il NIST"
  idealePer:
    - "Chi ha molta documentazione che cambia spesso"
    - "Assistenti su manuali, policy, knowledge base interne"
    - "Chi vuole fonti citabili e controllo sui dati"
optionB:
  nome: "Fine-tuning del modello"
  descrizione: "Riaddestri un modello su esempi tuoi, così impara un comportamento, un tono o un formato specifico in modo stabile."
  pro:
    - "Ottimo per imporre uno stile, un formato o un comportamento ripetitivo"
    - "Può ridurre la lunghezza del prompt a parità di risultato"
    - "Buono per compiti ristretti e ad alto volume (classificazione, estrazione)"
    - "Una volta fatto, il comportamento è coerente senza istruzioni ripetute"
  contro:
    - "I fatti restano congelati al momento dell'addestramento: aggiornare = riaddestrare"
    - "Costo e competenze più alti: servono dataset puliti ed etichettati"
    - "Rischio di allucinazioni se gli chiedi fatti non presenti nel training"
    - "Meno tracciabilità: difficile sapere da dove arriva una risposta"
    - "Offerta in calo sui modelli di punta: OpenAI l'ha chiuso ai nuovi clienti e dal 6 gennaio 2027 non accetta nuovi addestramenti; resta su Google e sui modelli open"
  idealePer:
    - "Compiti ripetitivi con output dal formato fisso"
    - "Casi dove conta lo stile più della freschezza dei dati"
    - "Volumi alti dove un prompt più corto o un modello più piccolo fanno risparmiare"
tabella:
  - criterio: "Dati che cambiano spesso"
    valoreA: "Ideale, aggiornamento in tempo reale"
    valoreB: "Scomodo, richiede riaddestramento"
  - criterio: "Costo e competenze di avvio"
    valoreA: "Più bassi"
    valoreB: "Più alti (dataset, training)"
  - criterio: "Tracciabilità delle fonti"
    valoreA: "Alta (cita i documenti, da verificare)"
    valoreB: "Bassa"
  - criterio: "Controllo stile e comportamento"
    valoreA: "Limitato"
    valoreB: "Forte"
  - criterio: "Privacy dei dati"
    valoreA: "Nell'archivio; i brani recuperati vanno al fornitore a ogni domanda"
    valoreB: "Dati nel training set"
  - criterio: "Compiti ripetitivi ad alto volume"
    valoreA: "Buono"
    valoreB: "Ottimo"
verdetto: "Non è una scelta o l'uno o l'altro. Per quasi tutte le PMI il punto di partenza giusto è il RAG: dai all'AI i tuoi documenti senza riaddestrare nulla, li aggiorni quando vuoi e mostri da dove arriva ogni risposta. Il fine-tuning entra in gioco dopo, quando ti serve un comportamento stabile e specifico su compiti ripetitivi, non per iniettare fatti che cambiano. La domanda giusta non è 'RAG o fine-tuning', ma 'il mio problema è dare all'AI la conoscenza giusta (RAG) o insegnarle un modo di lavorare fisso (fine-tuning)?'."
faq:
  - q: "Posso usarli insieme?"
    a: "Sì, ed è spesso la scelta migliore. Si parte dal <strong>RAG</strong> per la conoscenza che cambia e si aggiunge il <strong>fine-tuning</strong> solo dove serve un comportamento o un formato stabile. Nei progetti di <a href='/ai-agents'>agenti IA</a> capita spesso di combinarli."
  - q: "Qual è più economico per iniziare?"
    a: "Di norma il <strong>RAG</strong>: non richiede un ciclo di addestramento né un dataset etichettato, quindi il costo e i tempi di avvio sono più bassi. Attenzione però a dove si risparmia: a parità di modello, quello addestrato costa di più per token. Su OpenAI, per esempio, <a href='https://developers.openai.com/api/docs/models/gpt-4.1'>GPT-4.1</a> costa 2 $ in ingresso e 8 $ in uscita per milione di token, la sua versione addestrata <a href='https://developers.openai.com/api/docs/pricing'>3 $ e 12 $</a>. Il fine-tuning fa risparmiare solo se accorcia molto i prompt o se permette di usare un modello più piccolo."
  - q: "Con il fine-tuning i miei dati finiscono dentro il modello?"
    a: "Con il fine-tuning gli esempi entrano nel training del modello; con il RAG restano nel tuo archivio e vengono solo recuperati al momento della risposta. I brani recuperati passano però al fornitore del modello: OpenAI, per esempio, via API non li usa per l'addestramento ma li conserva fino a 30 giorni nei <a href='https://developers.openai.com/api/docs/guides/your-data'>log antiabuso</a>, quindi serve un DPA ai sensi dell'art. 28 del GDPR. In Soraia, in entrambi i casi, <strong>non addestriamo LLM sui dati del cliente</strong> senza accordo e codice e dati restano tuoi."
  - q: "Come capisco quale serve al mio caso?"
    a: "Dipende dal problema: se devi dare all'AI documenti e conoscenza che cambiano, pensa RAG; se devi imporre uno stile o un comportamento ripetuto, pensa fine-tuning. Se non sei sicuro, <a href='/parliamone'>parliamone</a>: in 20 minuti capiamo da dove ha senso partire."
fonti:
  - titolo: "OpenAI, deprecazioni dell'API (fine-tuning)"
    url: "https://developers.openai.com/api/docs/deprecations"
  - titolo: "OpenAI, prezzi dell'API (modelli addestrati)"
    url: "https://developers.openai.com/api/docs/pricing"
  - titolo: "OpenAI, scheda del modello GPT-4.1"
    url: "https://developers.openai.com/api/docs/models/gpt-4.1"
  - titolo: "OpenAI, uso e conservazione dei dati dell'API"
    url: "https://developers.openai.com/api/docs/guides/your-data"
  - titolo: "Google Cloud, fine-tuning dei modelli Gemini"
    url: "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/tuning"
  - titolo: "NIST AI 600-1, profilo di rischio dell'IA generativa"
    url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
related: []
featured: false
pubDate: 2026-11-26
lang: "it"
gates:
  passedAt: 2026-10-25T09:32:08.061Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 10, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 9, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
    - { name: "balance", score: 8, pass: true }
draft: false
---
