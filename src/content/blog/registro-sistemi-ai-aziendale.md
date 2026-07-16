---
title: "Registro sistemi AI aziendale: template entro agosto 2026"
description: "Come costruire il registro dei sistemi IA che l'AI Act ti chiede entro agosto 2026: template, classificazione del rischio e primo passo operativo per COO e DPO."
pubDate: 2026-07-22
author: "Daniel Levis"
tags:
  - "ai act"
  - "compliance"
  - "gdpr"
  - "how-to"
keywords:
  - "registro sistemi ai aziendale"
  - "inventario sistemi ai"
  - "ai act pmi"
  - "classificazione rischio ai"
readMinutes: 7
featured: false
h1: "Il registro dei sistemi IA che ti serve entro agosto 2026"
faq:
  - q: "Il registro dei sistemi AI è obbligatorio per la mia PMI?"
    a: "L'AI Act non impone un \"registro\" generico a tutte le imprese, ma per i sistemi ad alto rischio richiede documentazione tecnica, logging e gestione del rischio. In pratica un registro interno è il modo più semplice per dimostrare di sapere cosa usi e in che livello ricade. Serve anche per l'obbligo di alfabetizzazione AI, già in vigore dal febbraio 2025."
  - q: "Cosa devo includere nel registro?"
    a: "Per ogni sistema: nome e fornitore, cosa fa, chi lo usa, quali dati tratta, se prende o influenza decisioni su persone, il livello di rischio AI Act e il DPA art. 28 GDPR con il vendor. Bastano queste colonne per partire, un foglio di calcolo è sufficiente."
  - q: "Come classifico il rischio di ogni sistema?"
    a: "L'AI Act usa 4 livelli: inaccettabile (vietato), alto (recruiting decisionale, credit scoring), limitato (chatbot client-facing, obbligo di trasparenza) e minimo (tutto il resto). La domanda decisiva: il sistema decide o influenza significativamente qualcosa su una persona? Se sì, tratti alto. Se no, quasi sempre limitato o minimo."
  - q: "ChatGPT e Copilot usati dal team vanno nel registro?"
    a: "Sì. Anche gli strumenti generalisti adottati dai dipendenti sono sistemi IA \"in uso\" e vanno mappati, almeno per sapere chi li usa su quali dati. È rischio minimo nella maggior parte dei casi, ma censirli chiude il buco più comune: lo shadow AI di cui nessuno sa niente."
  - q: "Entro quando devo averlo pronto?"
    a: "Gli obblighi sui sistemi ad alto rischio dell'AI Act scattano dal 2 agosto 2026. Costruire l'inventario ora, mesi prima, ti dà il tempo di rimediare (aggiungere logging, supervisione umana, DPA) senza fretta. Il registro è il primo passo, non l'ultimo."
lang: "it"
gates:
  passedAt: 2026-07-16T14:29:55.712Z
  model: "claude-sonnet-4-6"
  lenses:
    - { name: "house-style", score: 10, pass: true }
    - { name: "fact-check", score: 10, pass: true }
    - { name: "originality", score: 8, pass: true }
    - { name: "brand-voice", score: 8, pass: true }
    - { name: "seo-structure", score: 9, pass: true }
    - { name: "geo-citability", score: 8, pass: true }
draft: false
---

Ogni PMI che sta ricevendo email allarmiste sull'AI Act si fa la domanda sbagliata: *"quanto rischio di multa?"*.

La domanda giusta è: **so esattamente quali sistemi IA girano dentro la mia azienda oggi?** Perché il primo obbligo operativo, prima di ogni altro, è sapere cosa hai. E quasi nessuno lo sa.

**In breve:**
- Dal **2 agosto 2026** scattano gli obblighi AI Act sui sistemi ad alto rischio: il primo passo per prepararsi è un registro/inventario dei sistemi IA in uso.
- Il registro non è un documento legale complesso: è un foglio con 7-8 colonne che risponde a "cosa uso, chi lo usa, su quali dati, in che livello di rischio".
- La classificazione del rischio si riduce a una domanda: **il sistema decide o influenza significativamente qualcosa su una persona?** Se sì, alto rischio; se no, quasi sempre limitato o minimo.
- Il buco più comune è lo **shadow AI**: ChatGPT, Copilot e tool adottati dai singoli reparti senza che nessuno li abbia censiti.
- Costruire il registro ora, mesi prima della scadenza, ti dà il tempo di rimediare senza fretta.

## Cos'è il registro dei sistemi IA (e cosa non è)

Un **registro dei sistemi IA aziendale** è l'inventario di tutti i sistemi di intelligenza artificiale che la tua impresa usa o mette in servizio, con per ciascuno la funzione, i dati trattati, il responsabile interno e il livello di rischio secondo l'AI Act. Non è una certificazione né un adempimento formale da notaio: è lo strumento di governance che ti permette di sapere cosa devi presidiare.

L'AI Act non chiede a ogni PMI un "registro" con quel nome. Ma per i sistemi ad alto rischio impone documentazione tecnica, gestione del rischio e logging. E l'obbligo di **alfabetizzazione AI** è già in vigore dal febbraio 2025. Senza un inventario, non puoi né dimostrare né gestire nulla. Il registro è il modo più economico per non arrivare impreparato ad agosto 2026.

## I 4 passi per costruirlo

### 1. Censisci tutto, anche lo shadow AI

Gira per i reparti e chiedi cosa usano davvero. Non fidarti dell'organigramma ufficiale.

Troverai tre categorie:
- **Strumenti generalisti** adottati dai team: ChatGPT, Copilot, Claude, Gemini, Perplexity.
- **Feature AI dentro SaaS esistenti**: il tuo gestionale (TeamSystem, Zucchetti), il CRM, l'ATS, spesso hanno già moduli AI attivi.
- **Agenti e automazioni custom**: quelli costruiti da voi o da un fornitore su processi specifici.

Il 90% dei buchi di compliance nasce qui: qualcuno in marketing usa un tool che tratta dati clienti e nessuno lo sa. Se non lo mappi, non esiste, fino a quando non diventa un problema.

### 2. Compila le colonne minime

Un foglio di calcolo basta. Per ogni sistema:

- **Nome e fornitore**
- **Cosa fa** (in una riga)
- **Chi lo usa** (reparto / responsabile)
- **Dati trattati** (personali? sensibili? di clienti terzi?)
- **Decide o influenza persone?** (sì/no)
- **Livello di rischio AI Act** (vedi passo 3)
- **DPA art. 28 GDPR** presente col vendor? (sì/no/link)
- **Note su logging e supervisione umana**

Otto colonne. Nient'altro serve per partire.

### 3. Classifica il rischio

L'AI Act usa 4 livelli. Per una PMI la mappa pratica è questa:

1. **Inaccettabile** (vietato): social scoring, manipolazione. Non ti riguarda.
2. **Alto**: recruiting che decide o filtra in modo determinante, credit scoring, sistemi che impattano diritti delle persone. Obblighi pesanti: risk assessment, logging, supervisione umana.
3. **Limitato**: chatbot client-facing. Obbligo principale: dire all'utente che parla con un'AI.
4. **Minimo**: tutto il resto. Automazioni interne, OCR fatture, drafting con umano che approva.

**La domanda che risolve il 95% dei casi**: il sistema *decide o influenza significativamente qualcosa su una persona*? Se sì, trattalo come alto rischio finché non dimostri il contrario. Se no, quasi sempre sei in limitato o minimo. Approfondiamo la logica per use case nella [guida all'AI Act per aziende](/guide/ai-act-aziende).

### 4. Assegna un owner e una data di revisione

Un registro fotografato una volta e dimenticato è inutile. Assegna un responsabile (spesso il DPO o il COO) e una revisione trimestrale. Ogni nuovo tool adottato entra nel registro *prima* di andare in produzione, non dopo.

## Un limite onesto: il registro non basta da solo

Qui va detta la cosa scomoda. Il registro è il **primo passo**, non la compliance. Ti dice *cosa* hai e *dove* stai rischiando. Non aggiunge da solo il logging che manca, la supervisione umana sui casi limite, o il DPA che il vendor non ti ha mai firmato.

È esattamente per questo che serve farlo ora: mappare a luglio 2026 lascia un mese per rimediare. Mapparlo oggi ne lascia molti. Se scopri di avere sistemi ad alto rischio senza audit trail, hai il tempo di sistemarli, e questo vale soprattutto per i flussi di [customer & compliance automation](/customer-support), dove chatbot e triage toccano dati di clienti terzi.

## Dal registro alla policy

Una volta che sai cosa usi, il passo naturale è scrivere le regole d'uso. Non serve un tomo: basta un documento di una pagina che dica cosa è permesso, cosa è proibito e come si segnala un problema. Trovi il modello nella nostra [AI policy aziendale template](/guide/ai-policy-aziendale-template). Registro + policy coprono la parte di governance che l'AI Act si aspetta da una PMI seria.

## FAQ

Le risposte rapide alle domande che ci fanno i COO e i DPO sono nel box qui sotto.

---

**Vuoi una valutazione del tuo caso specifico?** Nell'[AI Readiness Assessment €2.000](/ai-agents) mappiamo i tuoi sistemi IA e ti diciamo onestamente in quale livello ricadono e cosa serve fare, senza allarmismi. Oppure inizia dal [check-up 3 minuti](/check-up).
