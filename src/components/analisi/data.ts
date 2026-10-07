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
  title: "Non sai da dove partire? Partiamo da come lavorate oggi.",
  subtitle:
    "L'analisi serve a capire dove l'automazione e l'intelligenza artificiale portano più valore, prima di spendere in sviluppo.",
  clientTypes: [
    {
      highlight: false,
      title: "Avete già un progetto chiaro",
      body: "Sapete cosa volete costruire. Si parte direttamente dallo sviluppo.",
    },
    {
      highlight: true,
      title: "Sapete di essere inefficienti, ma non sapete da dove partire",
      body: "Si parte dall'analisi dei processi: prima capiamo come lavorate, poi decidiamo cosa costruire.",
    },
  ],
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
  { id: "crm-fatt", label: "Integrazione CRM-fatturazione", x: 84, y: 72, type: "automazione",
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
