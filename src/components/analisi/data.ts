/* =============================================================================
   ANALISI DEI PROCESSI, dati dell'azienda di esempio.
   -----------------------------------------------------------------------------
   TUTTO il contenuto modificabile della pagina /analisi-processi vive qui.
   Per cambiare azienda di esempio, post-it, bolle della matrice o prezzo
   NON serve toccare i componenti: basta modificare questo file.

   Azienda fittizia: "Rossi Impianti Srl".
   I colori semantici sono fissi in tutta la pagina (vedi SEM).
   ============================================================================= */

/* ----------------------------------------------------------------------------
   COLORI SEMANTICI (fissi, non cambiarli senza motivo)
   - rosso   = criticità (punti dolenti)
   - blu     = osservazioni neutre
   - verde   = desideri ("in un mondo ideale vorrei...")
   - arancio = punti di decisione e colli di bottiglia nei flussi
   - viola   = Soraia / soluzioni / "da qui si parte"
---------------------------------------------------------------------------- */
export const SEM = {
  criticita: { bg: "#FBE9E9", border: "#E8A9A9", text: "#A8353B", dot: "#D65560" },
  osservazione: { bg: "#E9F1FB", border: "#A9C6ED", text: "#2A5E9E", dot: "#4A82C8" },
  desiderio: { bg: "#E7F5EC", border: "#A6D8BA", text: "#2A7D4F", dot: "#43A96E" },
  decisione: { bg: "#FDEFD9", border: "#F2C27E", text: "#B5720E", dot: "#F0A32E" },
  viola: { bg: "#F4E9F6", border: "#C99BD4", text: "#5E2168", dot: "#892D9C" },
} as const;

export type SemKey = keyof typeof SEM;

/* Mappatura colore post-it -> chiave semantica */
export const POSTIT_COLOR: Record<"rosso" | "blu" | "verde", SemKey> = {
  rosso: "criticita",
  blu: "osservazione",
  verde: "desiderio",
};

/* ----------------------------------------------------------------------------
   PREZZO (facile da mostrare / nascondere / modificare)
---------------------------------------------------------------------------- */
export const PRICING = {
  show: true, // false = nasconde del tutto il blocco prezzo
  from: "3.000 euro",
  note: "fino a 10 interviste",
  standalone:
    "L'analisi si può acquistare da sola oppure come primo passo di un progetto di sviluppo.",
};

/* ----------------------------------------------------------------------------
   ROBOTS / INDICIZZAZIONE
   La pagina è pensata per l'uso in call, non per la SEO.
   Metti false per renderla indicizzabile.
---------------------------------------------------------------------------- */
export const NOINDEX = true;

/* ----------------------------------------------------------------------------
   AZIENDA DI ESEMPIO
---------------------------------------------------------------------------- */
export const COMPANY = {
  name: "Rossi Impianti Srl",
  size: "12 persone",
  what: "Vende, installa e assiste impianti presso clienti aziendali e privati.",
  departments: ["Commerciale", "Ufficio tecnico", "Amministrazione", "Assistenza"],
  tools: [
    "Un CRM poco usato",
    "Tanti file Excel",
    "Teams usato solo come chat",
    "Fatturazione in cloud",
    "Richieste di assistenza su un foglio Excel",
  ],
};

/* ----------------------------------------------------------------------------
   SEZIONI (per il rail laterale di navigazione)
---------------------------------------------------------------------------- */
export const SECTIONS = [
  { id: "apertura", label: "Apertura" },
  { id: "obiettivi", label: "Obiettivi" },
  { id: "metodo", label: "Come funziona" },
  { id: "mappatura", label: "Mappatura" },
  { id: "temi", label: "Temi" },
  { id: "emerge", label: "Cosa emerge" },
  { id: "priorita", label: "Priorità" },
  { id: "piano", label: "Piano d'azione" },
  { id: "ricevete", label: "Cosa ricevete" },
  { id: "chiusura", label: "Chiusura" },
] as const;

/* ----------------------------------------------------------------------------
   1. APERTURA
---------------------------------------------------------------------------- */
export const OPENING = {
  eyebrow: "Analisi dei processi",
  title: "Non sapete da dove partire? Partiamo da come lavorate oggi.",
  subtitle:
    "L'analisi dei processi serve a capire dove l'automazione e l'intelligenza artificiale portano più valore, prima di spendere in sviluppo.",
};

/* ----------------------------------------------------------------------------
   2. OBIETTIVI DELL'ANALISI
---------------------------------------------------------------------------- */
export const OBJECTIVES = [
  {
    icon: "eye",
    title: "Come lavorate davvero oggi",
    body: "Capire l'uso reale degli strumenti nelle attività quotidiane.",
  },
  {
    icon: "friction",
    title: "Dove nascono le inefficienze",
    body: "Individuare i punti di attrito nei processi.",
  },
  {
    icon: "filter",
    title: "Cosa non porta valore",
    body: "Trovare funzioni e passaggi poco utili o poco usati.",
  },
  {
    icon: "exit",
    title: "Dove il lavoro esce dal sistema",
    body: "Capire quando e perché si finisce su Excel, WhatsApp o telefono.",
  },
];

/* ----------------------------------------------------------------------------
   3. COME FUNZIONA (metodo)
---------------------------------------------------------------------------- */
export const METHOD = {
  steps: [
    {
      n: 1,
      title: "Interviste",
      body: "Una persona per reparto racconta la sua giornata tipo. Fino a 10 interviste, registrate.",
    },
    {
      n: 2,
      title: "Estrazione degli spunti",
      body: "Dalle interviste estraiamo criticità, desideri e osservazioni neutre, con le parole esatte delle persone.",
    },
    {
      n: 3,
      title: "Mappatura dei processi",
      body: "Disegniamo nel dettaglio tutti i flussi di lavoro.",
    },
    {
      n: 4,
      title: "Raggruppamento per temi",
      body: "Organizziamo gli spunti per aree (affinity diagram) e troviamo i problemi principali.",
    },
  ],
  note: "A volte serve l'intelligenza artificiale, a volte basta un'automazione semplice, a volte basta cambiare il modo di lavorare.",
};

/* ----------------------------------------------------------------------------
   4. MAPPATURA DEI PROCESSI (flusso a corsie)
   lane: indice della corsia (0..3) = COMPANY.departments
   col:  posizione orizzontale (ordine nel flusso)
   type: "activity" (rettangolo) | "decision" (rombo arancione)
---------------------------------------------------------------------------- */
export type FlowNode = {
  id: string;
  lane: number;
  col: number;
  type: "activity" | "decision" | "end";
  label: string;
  /** collo di bottiglia mostrato col toggle "Mostra i colli di bottiglia" */
  bottleneck?: string;
  /** evidenziazione col toggle "Mostra cosa si può automatizzare" */
  automate?: { kind: "IA" | "senza IA"; note: string };
};

export const FLOW: { nodes: FlowNode[]; edges: [string, string, string?][] } = {
  nodes: [
    { id: "contatto", lane: 0, col: 0, type: "activity", label: "Contatto del cliente",
      bottleneck: "Clienti con nomi simili vengono confusi.",
      automate: { kind: "senza IA", note: "Anagrafica clienti unica" } },
    { id: "sopralluogo", lane: 0, col: 1, type: "activity", label: "Sopralluogo" },
    { id: "preventivo", lane: 0, col: 2, type: "activity", label: "Preventivo su Excel",
      automate: { kind: "IA", note: "Assistente al dimensionamento" } },
    { id: "accetta", lane: 0, col: 3, type: "decision", label: "Il cliente accetta?" },
    { id: "archivia", lane: 0, col: 4, type: "end", label: "Trattativa chiusa" },
    { id: "ordine-tec", lane: 1, col: 4, type: "activity", label: "Ordine all'ufficio tecnico via Teams",
      bottleneck: "L'ordine passa a voce o via chat, si perdono informazioni.",
      automate: { kind: "senza IA", note: "Passaggio ordine strutturato" } },
    { id: "fornitori", lane: 1, col: 5, type: "activity", label: "Ordine ai fornitori" },
    { id: "installazione", lane: 1, col: 6, type: "activity", label: "Installazione" },
    { id: "comunica", lane: 2, col: 7, type: "activity", label: "Comunicazione all'amministrazione" },
    { id: "fattura", lane: 2, col: 8, type: "activity", label: "Fattura",
      bottleneck: "L'amministrazione reinserisce a mano i dati del preventivo." },
    { id: "assistenza", lane: 3, col: 9, type: "activity", label: "Richiesta di assistenza su Excel",
      bottleneck: "Non si sa quanto è costato ogni intervento di assistenza.",
      automate: { kind: "senza IA", note: "Richieste di assistenza tracciate" } },
  ],
  // [from, to, label?]
  edges: [
    ["contatto", "sopralluogo"],
    ["sopralluogo", "preventivo"],
    ["preventivo", "accetta"],
    ["accetta", "ordine-tec", "sì"],
    ["accetta", "archivia", "no"],
    ["ordine-tec", "fornitori"],
    ["fornitori", "installazione"],
    ["installazione", "comunica"],
    ["comunica", "fattura"],
    ["fattura", "assistenza"],
  ],
};

/* ----------------------------------------------------------------------------
   5. RAGGRUPPAMENTO PER TEMI (affinity diagram)
   color: rosso | blu | verde (vedi POSTIT_COLOR)
   theme: indice della colonna (0..3) = AFFINITY_COLUMNS
---------------------------------------------------------------------------- */
export const AFFINITY_COLUMNS = ["Commerciale", "Tecnico", "Amministrazione", "Assistenza"];

export type PostIt = { id: string; color: "rosso" | "blu" | "verde"; text: string; theme: number };

export const POSTITS: PostIt[] = [
  // Commerciale (0)
  { id: "c1", color: "rosso", text: "Ogni commerciale ha il suo file Excel", theme: 0 },
  { id: "c2", color: "rosso", text: "Nel CRM non riesco a filtrare per prodotto", theme: 0 },
  { id: "c3", color: "rosso", text: "I preventivi li rifaccio ogni volta da zero", theme: 0 },
  { id: "c4", color: "rosso", text: "Non so a che punto è una trattativa se non chiedo", theme: 0 },
  { id: "c5", color: "blu", text: "Il lunedì facciamo una riunione per allinearci", theme: 0 },
  { id: "c6", color: "blu", text: "Le offerte le mandiamo via email", theme: 0 },
  { id: "c7", color: "verde", text: "Vorrei vedere in un posto solo a che punto è ogni cliente", theme: 0 },
  { id: "c8", color: "verde", text: "Vorrei ritrovare i preventivi vecchi in due secondi", theme: 0 },
  // Tecnico (1)
  { id: "t1", color: "rosso", text: "Chi prende l'ordine non parla con chi lo realizza", theme: 1 },
  { id: "t2", color: "rosso", text: "Gli ordini arrivano via chat e a volte si perdono", theme: 1 },
  { id: "t3", color: "rosso", text: "Rincorro il commerciale per capire cosa ha promesso", theme: 1 },
  { id: "t4", color: "rosso", text: "Non ho una lista chiara di cosa installare", theme: 1 },
  { id: "t5", color: "blu", text: "Usiamo Teams solo per mandarci i file", theme: 1 },
  { id: "t6", color: "verde", text: "Vorrei ricevere l'ordine già completo di tutto", theme: 1 },
  { id: "t7", color: "verde", text: "Vorrei sapere quali materiali ordinare senza telefonare", theme: 1 },
  // Amministrazione (2)
  { id: "a1", color: "rosso", text: "Reinserisco a mano dati che sono già nel preventivo", theme: 2 },
  { id: "a2", color: "rosso", text: "A volte fatturo e scopro dopo che mancava un dato", theme: 2 },
  { id: "a3", color: "rosso", text: "Gli stessi clienti sono scritti in tre modi diversi", theme: 2 },
  { id: "a4", color: "blu", text: "La fatturazione in cloud funziona", theme: 2 },
  { id: "a5", color: "verde", text: "Vorrei che i dati del preventivo arrivassero già pronti", theme: 2 },
  { id: "a6", color: "verde", text: "Vorrei smettere di copiare dati tra un file e l'altro", theme: 2 },
  // Assistenza (3)
  { id: "s1", color: "rosso", text: "Le chiamate le scriviamo su un foglio e poi non si ritrovano", theme: 3 },
  { id: "s2", color: "rosso", text: "Non si sa quanto è costato ogni intervento", theme: 3 },
  { id: "s3", color: "rosso", text: "Se il cliente richiama, ripartiamo da zero", theme: 3 },
  { id: "s4", color: "rosso", text: "Non sappiamo quali macchine abbiamo installato e da chi", theme: 3 },
  { id: "s5", color: "blu", text: "Ci passiamo le urgenze a voce", theme: 3 },
  { id: "s6", color: "verde", text: "Vorrei che la richiesta di assistenza arrivasse già completa", theme: 3 },
  { id: "s7", color: "verde", text: "Vorrei lo storico interventi per ogni cliente", theme: 3 },
];

/* ----------------------------------------------------------------------------
   6. COSA EMERGE (ciclo che si autoalimenta)
---------------------------------------------------------------------------- */
export const INSIGHTS = [
  {
    title: "Il gestionale non è il centro del lavoro",
    body: "Si usa per registrare, ma il lavoro vero avviene su Excel, chat e telefonate.",
  },
  {
    title: "Dati duplicati e sparsi",
    body: "Strumenti paralleli creano doppioni e inserimenti manuali: il database diventa poco affidabile.",
  },
  {
    title: "La conoscenza resta nelle persone, non nel sistema",
    body: "Diventa difficile avere visibilità, coordinarsi e rendere i processi uguali per tutti.",
  },
];

/* ----------------------------------------------------------------------------
   7. MATRICE DELLE PRIORITÀ
   x: impatto 0 (basso, sinistra) .. 100 (alto, destra)
   y: sforzo 0 (moderato, alto) .. 100 (elevato, basso)
   type: "IA" | "automazione"
---------------------------------------------------------------------------- */
export type Bubble = {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "IA" | "automazione";
  problem: string;
  departments: string[];
};

export const MATRIX: Bubble[] = [
  // Alto impatto, sforzo moderato (in alto a destra, "da qui si parte")
  { id: "anagrafica", label: "Anagrafica clienti unica", x: 83, y: 20, type: "automazione",
    problem: "Gli stessi clienti scritti in modi diversi, dati sparsi tra file.",
    departments: ["Commerciale", "Amministrazione", "Assistenza"] },
  { id: "assistenza", label: "Richieste di assistenza tracciate", x: 66, y: 33, type: "automazione",
    problem: "Le richieste su un foglio Excel non si ritrovano, costi non visibili.",
    departments: ["Assistenza"] },
  { id: "ordine", label: "Passaggio ordine strutturato", x: 88, y: 45, type: "automazione",
    problem: "L'ordine passa a voce o via chat tra commerciale e tecnico.",
    departments: ["Commerciale", "Ufficio tecnico"] },
  // Basso impatto, sforzo moderato (in alto a sinistra)
  { id: "report", label: "Report e indicatori", x: 27, y: 24, type: "automazione",
    problem: "Nessuna visione d'insieme su vendite e interventi.",
    departments: ["Tutti i reparti"] },
  { id: "agenda", label: "Agenda attività", x: 19, y: 40, type: "automazione",
    problem: "Le attività di installazione e assistenza non sono pianificate in un posto solo.",
    departments: ["Ufficio tecnico", "Assistenza"] },
  // Alto impatto, sforzo elevato (in basso a destra)
  { id: "crm-fatt", label: "Integrazione CRM-fatturazione", x: 62, y: 60, type: "automazione",
    problem: "I dati del preventivo vengono reinseriti a mano in fattura.",
    departments: ["Commerciale", "Amministrazione"] },
  { id: "pulizia", label: "Pulizia dei dati storici", x: 66, y: 83, type: "automazione",
    problem: "Anni di doppioni e dati incompleti nei file e nel CRM.",
    departments: ["Amministrazione"] },
  // Basso impatto, sforzo elevato (in basso a sinistra)
  { id: "ia-dim", label: "Assistente IA per il dimensionamento", x: 25, y: 78, type: "IA",
    problem: "Dimensionare un impianto richiede esperienza e tempo del tecnico.",
    departments: ["Commerciale", "Ufficio tecnico"] },
];

export const MATRIX_NOTE =
  "Non significa che il resto non si farà. Significa che sappiamo da dove conviene iniziare: meno sforzo, più risultato.";

/* ----------------------------------------------------------------------------
   8. PIANO D'AZIONE + PERCORSO DI SVILUPPO
---------------------------------------------------------------------------- */
export const ACTION_CARDS = [
  {
    n: 1,
    title: "Anagrafica clienti unica",
    goal: "Un solo posto dove trovare tutto su ogni cliente.",
  },
  {
    n: 2,
    title: "Passaggio ordine strutturato",
    goal: "Dall'ordine firmato all'ufficio tecnico senza informazioni perse.",
  },
  {
    n: 3,
    title: "Assistenza tracciata",
    goal: "Ogni richiesta registrata, con tempi e costi visibili.",
  },
];

export const ROADMAP = {
  steps: [
    { id: "analisi", label: "Analisi dei processi", note: "il punto di partenza" },
    { id: "s1", label: "Sprint 1", note: "primo rilascio in uso dopo 4 settimane" },
    { id: "s2", label: "Sprint 2", note: "si costruisce sul primo rilascio" },
    { id: "s3", label: "Sprint 3", note: "si avvicina all'obiettivo" },
  ],
  // L'animazione mostra che l'ordine previsto può cambiare dopo il primo rilascio.
  planned: [
    { id: "A", label: "Anagrafica clienti unica" },
    { id: "B", label: "Report e indicatori" },
    { id: "C", label: "Passaggio ordine strutturato" },
    { id: "D", label: "Agenda attività" },
  ],
  revised: [
    { id: "A", label: "Anagrafica clienti unica", tag: "fatto" },
    { id: "C", label: "Passaggio ordine strutturato", tag: "sale: serve subito" },
    { id: "E", label: "Richieste di assistenza tracciate", tag: "nuova priorità" },
    { id: "D", label: "Agenda attività", tag: "rimandata" },
  ],
  mountainCaption:
    "La cima è l'obiettivo finale, lo strumento completo. Ogni sprint è un passo. Dopo ogni rilascio le priorità si aggiornano in base all'uso reale.",
};

/* ----------------------------------------------------------------------------
   9. COSA RICEVETE
---------------------------------------------------------------------------- */
export const DELIVERABLES = [
  { icon: "report", title: "Report finale", body: "I risultati dell'analisi, spiegati." },
  { icon: "map", title: "Mappa completa dei processi", body: "Tutti i flussi di lavoro disegnati." },
  { icon: "matrix", title: "Matrice delle priorità", body: "Dove conviene iniziare, e perché." },
  { icon: "plan", title: "Piano d'azione", body: "Con il percorso di sviluppo consigliato." },
];

/* ----------------------------------------------------------------------------
   10. CHIUSURA
---------------------------------------------------------------------------- */
export const CLOSING = "Il primo passo è capire come lavorate. Il resto viene da lì.";

/* =============================================================================
   ETICHETTE DI INTERFACCIA (occhielli, titoli di sezione, pulsanti, legende,
   assi della matrice). Vivono qui e non nei componenti, così la stessa pagina
   gira in italiano (/analisi-processi) e in inglese (/en/process-audit).
   Le chiavi semantiche dei dati (kind "IA" / "senza IA", type "IA" /
   "automazione") restano identiche nelle due lingue: qui c'è solo come si
   mostrano.
   ============================================================================= */
export type DeckLang = "it" | "en";

export type DeckUI = {
  /* occhielli + titoli delle sezioni montate dall'orchestratore */
  objectivesEyebrow: string; objectivesTitle: string;
  methodEyebrow: string; methodTitle: string;
  mapEyebrow: string; mapTitle: string;
  themesEyebrow: string; themesTitle: string;
  insightsEyebrow: string; insightsTitle: string; insightsLoop: string;
  priorityEyebrow: string; priorityTitle: string;
  planEyebrow: string; planTitle: string;
  deliverablesEyebrow: string; deliverablesTitle: string;
  /* blocco prezzo: etichetta e prefisso (il prefisso tiene lo spazio finale) */
  pricingLabel: string; pricingFrom: string;
  /* rail laterale */
  railLabel: string;
  /* 4. mappatura */
  showBottlenecks: string; showAutomation: string;
  automateKind: Record<NonNullable<FlowNode["automate"]>["kind"], string>;
  /* 5. temi */
  legendCriticita: string; legendOsservazioni: string; legendDesideri: string; groupByTheme: string;
  /* 7. matrice */
  effortAxis: string; startHere: string; effortLow: string; effortHigh: string;
  impactLow: string; impactAxis: string; impactHigh: string;
  departmentsInvolved: string; solutionAI: string; solutionAuto: string; matrixHint: string;
  /* 8. piano / SprintRoadmap */
  goal: string; planned: string; revised: string; toggle: string;
};

export const UI_IT: DeckUI = {
  objectivesEyebrow: "Obiettivi dell'analisi", objectivesTitle: "Cosa andiamo a capire",
  methodEyebrow: "Come funziona", methodTitle: "Il metodo, in quattro passaggi",
  mapEyebrow: "Mappatura dei processi", mapTitle: "Dalla richiesta del cliente alla fattura",
  themesEyebrow: "Raggruppamento per temi", themesTitle: "Le parole delle interviste, messe in ordine",
  insightsEyebrow: "Cosa emerge dall'analisi", insightsTitle: "Tre problemi che si alimentano a vicenda",
  insightsLoop: "il ciclo si autoalimenta",
  priorityEyebrow: "Matrice delle priorità", priorityTitle: "Da dove conviene iniziare",
  planEyebrow: "Piano d'azione e percorso di sviluppo", planTitle: "I primi passi, e come cresce nel tempo",
  deliverablesEyebrow: "Cosa ricevete", deliverablesTitle: "Alla fine dell'analisi, in mano avete questo",
  pricingLabel: "Analisi dei processi", pricingFrom: "a partire da ",
  railLabel: "Sezioni",
  showBottlenecks: "Mostra i colli di bottiglia", showAutomation: "Mostra cosa si può automatizzare",
  automateKind: { IA: "IA", "senza IA": "senza IA" },
  legendCriticita: "Criticità", legendOsservazioni: "Osservazioni", legendDesideri: "Desideri",
  groupByTheme: "Raggruppa per temi",
  effortAxis: "Sforzo di sviluppo", startHere: "Da qui si parte", effortLow: "moderato", effortHigh: "elevato",
  impactLow: "Impatto basso", impactAxis: "Impatto →", impactHigh: "Impatto alto",
  departmentsInvolved: "Reparti coinvolti", solutionAI: "Soluzione con IA", solutionAuto: "Automazione semplice",
  matrixHint: "Clicca una bolla per vedere il problema che risolve, i reparti coinvolti e il tipo di soluzione.",
  goal: "Obiettivo: lo strumento completo",
  planned: "L'ordine previsto delle attività",
  revised: "Dopo il primo rilascio, in base all'uso reale",
  toggle: "Aggiorna le priorità",
};

export const UI_EN: DeckUI = {
  objectivesEyebrow: "Objectives of the audit", objectivesTitle: "What we set out to understand",
  methodEyebrow: "How it works", methodTitle: "The method, in four steps",
  mapEyebrow: "Process map", mapTitle: "From the customer's request to the invoice",
  themesEyebrow: "Grouping by theme", themesTitle: "The words from the interviews, put in order",
  insightsEyebrow: "What the audit reveals", insightsTitle: "Three problems that feed each other",
  insightsLoop: "the cycle feeds itself",
  priorityEyebrow: "Priority matrix", priorityTitle: "Where it pays to start",
  planEyebrow: "Action plan and development path", planTitle: "The first steps, and how it grows over time",
  deliverablesEyebrow: "What you get", deliverablesTitle: "At the end of the audit, this is what you have in hand",
  pricingLabel: "Process audit", pricingFrom: "from ",
  railLabel: "Sections",
  showBottlenecks: "Show the bottlenecks", showAutomation: "Show what can be automated",
  automateKind: { IA: "AI", "senza IA": "without AI" },
  legendCriticita: "Pain points", legendOsservazioni: "Observations", legendDesideri: "Wishes",
  groupByTheme: "Group by theme",
  effortAxis: "Development effort", startHere: "Start here", effortLow: "moderate", effortHigh: "high",
  impactLow: "Low impact", impactAxis: "Impact →", impactHigh: "High impact",
  departmentsInvolved: "Departments involved", solutionAI: "AI solution", solutionAuto: "Simple automation",
  matrixHint: "Click a bubble to see the problem it solves, the departments involved and the type of solution.",
  goal: "Goal: the complete tool",
  planned: "The planned order of work",
  revised: "After the first release, based on real usage",
  toggle: "Update priorities",
};

/* =============================================================================
   ENGLISH TWIN of every text-bearing constant above (for /en/process-audit).
   Same ids, same FLOW geometry (lane/col), same post-it colours and themes,
   same matrix coordinates and types: only the words change. The fictional
   client keeps its Italian name on purpose (it is an Italian SME example).
   Register: "you". No em-dash.
   ============================================================================= */
export const PRICING_EN: typeof PRICING = {
  show: PRICING.show,
  from: "€3,000",
  note: "up to 10 interviews",
  standalone:
    "You can buy the audit on its own or as the first step of a development project.",
};

export const COMPANY_EN: typeof COMPANY = {
  name: COMPANY.name,
  size: "12 people",
  what: "Sells, installs and services systems for business and private customers.",
  departments: ["Sales", "Technical office", "Administration", "Support"],
  tools: [
    "A CRM that is barely used",
    "Lots of Excel files",
    "Teams used only as a chat",
    "Cloud invoicing",
    "Support requests on an Excel sheet",
  ],
};

export type DeckSection = { id: (typeof SECTIONS)[number]["id"]; label: string };

export const SECTIONS_EN: readonly DeckSection[] = [
  { id: "apertura", label: "Opening" },
  { id: "obiettivi", label: "Objectives" },
  { id: "metodo", label: "How it works" },
  { id: "mappatura", label: "Process map" },
  { id: "temi", label: "Themes" },
  { id: "emerge", label: "What emerges" },
  { id: "priorita", label: "Priorities" },
  { id: "piano", label: "Action plan" },
  { id: "ricevete", label: "What you get" },
  { id: "chiusura", label: "Closing" },
];

export const OPENING_EN: typeof OPENING = {
  eyebrow: "Process audit",
  title: "Not sure where to start? Let's start with how you work today.",
  subtitle:
    "The process audit shows where automation and artificial intelligence bring the most value, before you spend on development.",
};

export const OBJECTIVES_EN: typeof OBJECTIVES = [
  {
    icon: "eye",
    title: "How you really work today",
    body: "Understand how your tools are actually used in day-to-day work.",
  },
  {
    icon: "friction",
    title: "Where inefficiencies come from",
    body: "Pinpoint the friction points in your processes.",
  },
  {
    icon: "filter",
    title: "What adds no value",
    body: "Find features and steps that are rarely used or barely useful.",
  },
  {
    icon: "exit",
    title: "Where work leaves the system",
    body: "Understand when and why things end up on Excel, WhatsApp or the phone.",
  },
];

export const METHOD_EN: typeof METHOD = {
  steps: [
    {
      n: 1,
      title: "Interviews",
      body: "One person per department walks us through a typical day. Up to 10 interviews, recorded.",
    },
    {
      n: 2,
      title: "Extracting the insights",
      body: "From the interviews we pull out pain points, wishes and neutral observations, in people's exact words.",
    },
    {
      n: 3,
      title: "Process mapping",
      body: "We draw every workflow in detail.",
    },
    {
      n: 4,
      title: "Grouping by theme",
      body: "We organise the insights by area (affinity diagram) and find the main problems.",
    },
  ],
  note: "Sometimes it takes artificial intelligence, sometimes a simple automation is enough, sometimes all it takes is a change in the way you work.",
};

export const FLOW_EN: typeof FLOW = {
  nodes: [
    { id: "contatto", lane: 0, col: 0, type: "activity", label: "Customer enquiry",
      bottleneck: "Customers with similar names get mixed up.",
      automate: { kind: "senza IA", note: "Single customer master data" } },
    { id: "sopralluogo", lane: 0, col: 1, type: "activity", label: "Site survey" },
    { id: "preventivo", lane: 0, col: 2, type: "activity", label: "Quote on Excel",
      automate: { kind: "IA", note: "Sizing assistant" } },
    { id: "accetta", lane: 0, col: 3, type: "decision", label: "Customer accepts?" },
    { id: "archivia", lane: 0, col: 4, type: "end", label: "Negotiation closed" },
    { id: "ordine-tec", lane: 1, col: 4, type: "activity", label: "Order to the technical office via Teams",
      bottleneck: "The order is passed on verbally or by chat, and information gets lost.",
      automate: { kind: "senza IA", note: "Structured order handover" } },
    { id: "fornitori", lane: 1, col: 5, type: "activity", label: "Order to suppliers" },
    { id: "installazione", lane: 1, col: 6, type: "activity", label: "Installation" },
    { id: "comunica", lane: 2, col: 7, type: "activity", label: "Notification to administration" },
    { id: "fattura", lane: 2, col: 8, type: "activity", label: "Invoice",
      bottleneck: "Administration re-enters the quote data by hand." },
    { id: "assistenza", lane: 3, col: 9, type: "activity", label: "Support request on Excel",
      bottleneck: "Nobody knows what each support job cost.",
      automate: { kind: "senza IA", note: "Tracked support requests" } },
  ],
  edges: [
    ["contatto", "sopralluogo"],
    ["sopralluogo", "preventivo"],
    ["preventivo", "accetta"],
    ["accetta", "ordine-tec", "yes"],
    ["accetta", "archivia", "no"],
    ["ordine-tec", "fornitori"],
    ["fornitori", "installazione"],
    ["installazione", "comunica"],
    ["comunica", "fattura"],
    ["fattura", "assistenza"],
  ],
};

export const AFFINITY_COLUMNS_EN: string[] = ["Sales", "Technical", "Administration", "Support"];

export const POSTITS_EN: PostIt[] = [
  // Sales (0)
  { id: "c1", color: "rosso", text: "Every salesperson has their own Excel file", theme: 0 },
  { id: "c2", color: "rosso", text: "I can't filter by product in the CRM", theme: 0 },
  { id: "c3", color: "rosso", text: "I rebuild every quote from scratch", theme: 0 },
  { id: "c4", color: "rosso", text: "I don't know where a deal stands unless I ask", theme: 0 },
  { id: "c5", color: "blu", text: "On Mondays we hold a meeting to get aligned", theme: 0 },
  { id: "c6", color: "blu", text: "We send offers by email", theme: 0 },
  { id: "c7", color: "verde", text: "I'd like to see where every customer stands, in one place", theme: 0 },
  { id: "c8", color: "verde", text: "I'd like to find old quotes in two seconds", theme: 0 },
  // Technical (1)
  { id: "t1", color: "rosso", text: "Whoever takes the order doesn't talk to whoever delivers it", theme: 1 },
  { id: "t2", color: "rosso", text: "Orders come in by chat and sometimes get lost", theme: 1 },
  { id: "t3", color: "rosso", text: "I chase the salesperson to find out what was promised", theme: 1 },
  { id: "t4", color: "rosso", text: "I don't have a clear list of what to install", theme: 1 },
  { id: "t5", color: "blu", text: "We only use Teams to send each other files", theme: 1 },
  { id: "t6", color: "verde", text: "I'd like to receive the order already complete", theme: 1 },
  { id: "t7", color: "verde", text: "I'd like to know which materials to order without phoning", theme: 1 },
  // Administration (2)
  { id: "a1", color: "rosso", text: "I re-enter by hand data that's already in the quote", theme: 2 },
  { id: "a2", color: "rosso", text: "Sometimes I invoice and find out later that data was missing", theme: 2 },
  { id: "a3", color: "rosso", text: "The same customers are written three different ways", theme: 2 },
  { id: "a4", color: "blu", text: "Cloud invoicing works", theme: 2 },
  { id: "a5", color: "verde", text: "I'd like the quote data to arrive ready to use", theme: 2 },
  { id: "a6", color: "verde", text: "I'd like to stop copying data from one file to another", theme: 2 },
  // Support (3)
  { id: "s1", color: "rosso", text: "We write calls down on a sheet and then can't find them", theme: 3 },
  { id: "s2", color: "rosso", text: "Nobody knows what each job cost", theme: 3 },
  { id: "s3", color: "rosso", text: "If the customer calls back, we start from scratch", theme: 3 },
  { id: "s4", color: "rosso", text: "We don't know which units we installed, or who installed them", theme: 3 },
  { id: "s5", color: "blu", text: "We pass urgent jobs on by word of mouth", theme: 3 },
  { id: "s6", color: "verde", text: "I'd like support requests to arrive already complete", theme: 3 },
  { id: "s7", color: "verde", text: "I'd like a service history for every customer", theme: 3 },
];

export const INSIGHTS_EN: typeof INSIGHTS = [
  {
    title: "The management system isn't where the work gets done",
    body: "People use it to record things, while the real work happens on Excel, in chats and on the phone.",
  },
  {
    title: "Duplicated, scattered data",
    body: "Parallel tools create duplicates and manual entry: the database becomes unreliable.",
  },
  {
    title: "Knowledge lives in people's heads instead of the system",
    body: "It becomes hard to get visibility, coordinate and make processes the same for everyone.",
  },
];

export const MATRIX_EN: Bubble[] = [
  // High impact, moderate effort (top right, "start here")
  { id: "anagrafica", label: "Single customer master data", x: 83, y: 20, type: "automazione",
    problem: "The same customers written in different ways, data scattered across files.",
    departments: ["Sales", "Administration", "Support"] },
  { id: "assistenza", label: "Tracked support requests", x: 66, y: 33, type: "automazione",
    problem: "Requests on an Excel sheet can't be found, and costs aren't visible.",
    departments: ["Support"] },
  { id: "ordine", label: "Structured order handover", x: 88, y: 45, type: "automazione",
    problem: "The order passes verbally or by chat between sales and the technical office.",
    departments: ["Sales", "Technical office"] },
  // Low impact, moderate effort (top left)
  { id: "report", label: "Reports and KPIs", x: 27, y: 24, type: "automazione",
    problem: "No overview of sales and jobs.",
    departments: ["All departments"] },
  { id: "agenda", label: "Activity schedule", x: 19, y: 40, type: "automazione",
    problem: "Installation and support activities aren't planned in one place.",
    departments: ["Technical office", "Support"] },
  // High impact, high effort (bottom right)
  { id: "crm-fatt", label: "CRM-invoicing integration", x: 62, y: 60, type: "automazione",
    problem: "Quote data is re-entered by hand into the invoice.",
    departments: ["Sales", "Administration"] },
  { id: "pulizia", label: "Historical data clean-up", x: 66, y: 83, type: "automazione",
    problem: "Years of duplicates and incomplete data in files and in the CRM.",
    departments: ["Administration"] },
  // Low impact, high effort (bottom left)
  { id: "ia-dim", label: "AI sizing assistant", x: 25, y: 78, type: "IA",
    problem: "Sizing a system takes experience and a technician's time.",
    departments: ["Sales", "Technical office"] },
];

export const MATRIX_NOTE_EN =
  "The rest still gets done. What this tells us is where it pays to start: less effort, more results.";

export const ACTION_CARDS_EN: typeof ACTION_CARDS = [
  {
    n: 1,
    title: "Single customer master data",
    goal: "One place to find everything about every customer.",
  },
  {
    n: 2,
    title: "Structured order handover",
    goal: "From the signed order to the technical office without losing information.",
  },
  {
    n: 3,
    title: "Tracked support",
    goal: "Every request recorded, with time and costs visible.",
  },
];

/* Same strings that /en/ai-engineering already shows through SprintRoadmap. */
export const ROADMAP_EN: typeof ROADMAP = {
  steps: [
    { id: "analisi", label: "Process audit", note: "the starting point" },
    { id: "s1", label: "Sprint 1", note: "first release in use after 4 weeks" },
    { id: "s2", label: "Sprint 2", note: "builds on the first release" },
    { id: "s3", label: "Sprint 3", note: "gets closer to the goal" },
  ],
  planned: [
    { id: "A", label: "Single customer master data" },
    { id: "B", label: "Reports and KPIs" },
    { id: "C", label: "Structured order handover" },
    { id: "D", label: "Activity schedule" },
  ],
  revised: [
    { id: "A", label: "Single customer master data", tag: "done" },
    { id: "C", label: "Structured order handover", tag: "moves up: needed now" },
    { id: "E", label: "Tracked support requests", tag: "new priority" },
    { id: "D", label: "Activity schedule", tag: "postponed" },
  ],
  mountainCaption:
    "The summit is the final goal, the complete tool. Each sprint is a step. After every release, priorities are updated based on real usage.",
};

export const DELIVERABLES_EN: typeof DELIVERABLES = [
  { icon: "report", title: "Final report", body: "The results of the audit, explained." },
  { icon: "map", title: "Complete process map", body: "Every workflow, drawn out." },
  { icon: "matrix", title: "Priority matrix", body: "Where it pays to start, and why." },
  { icon: "plan", title: "Action plan", body: "With the recommended development path." },
];

export const CLOSING_EN = "The first step is understanding how you work. Everything else follows from there.";

/* =============================================================================
   ACCESSORE UNICO. I componenti leggono solo da qui: getDeckData("it") è
   esattamente l'insieme delle costanti italiane sopra (stessi oggetti, nessuna
   copia), getDeckData("en") il gemello inglese. Le parti neutre (SEM,
   POSTIT_COLOR, NOINDEX, geometria) restano export diretti.
   ============================================================================= */
export type DeckData = {
  lang: DeckLang;
  ui: DeckUI;
  pricing: typeof PRICING;
  company: typeof COMPANY;
  sections: readonly DeckSection[];
  opening: typeof OPENING;
  objectives: typeof OBJECTIVES;
  method: typeof METHOD;
  flow: typeof FLOW;
  affinityColumns: string[];
  postits: PostIt[];
  insights: typeof INSIGHTS;
  matrix: Bubble[];
  matrixNote: string;
  actionCards: typeof ACTION_CARDS;
  roadmap: typeof ROADMAP;
  deliverables: typeof DELIVERABLES;
  closing: string;
};

const DECK_IT: DeckData = {
  lang: "it",
  ui: UI_IT,
  pricing: PRICING,
  company: COMPANY,
  sections: SECTIONS,
  opening: OPENING,
  objectives: OBJECTIVES,
  method: METHOD,
  flow: FLOW,
  affinityColumns: AFFINITY_COLUMNS,
  postits: POSTITS,
  insights: INSIGHTS,
  matrix: MATRIX,
  matrixNote: MATRIX_NOTE,
  actionCards: ACTION_CARDS,
  roadmap: ROADMAP,
  deliverables: DELIVERABLES,
  closing: CLOSING,
};

const DECK_EN: DeckData = {
  lang: "en",
  ui: UI_EN,
  pricing: PRICING_EN,
  company: COMPANY_EN,
  sections: SECTIONS_EN,
  opening: OPENING_EN,
  objectives: OBJECTIVES_EN,
  method: METHOD_EN,
  flow: FLOW_EN,
  affinityColumns: AFFINITY_COLUMNS_EN,
  postits: POSTITS_EN,
  insights: INSIGHTS_EN,
  matrix: MATRIX_EN,
  matrixNote: MATRIX_NOTE_EN,
  actionCards: ACTION_CARDS_EN,
  roadmap: ROADMAP_EN,
  deliverables: DELIVERABLES_EN,
  closing: CLOSING_EN,
};

export function getDeckData(lang: DeckLang = "it"): DeckData {
  return lang === "en" ? DECK_EN : DECK_IT;
}
