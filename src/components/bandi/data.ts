/* =============================================================================
   BANDI E INCENTIVI per la digitalizzazione, mostrati su /bandi.

   Ogni scheda va verificata sulla fonte ufficiale (`fonte`) e porta la data
   della verifica (`verificato`). Lo stato NON si scrive a mano: lo calcola la
   pagina dalle date, così un bando scaduto passa a "chiuso" da solo.
   - `apertura` / `scadenza`: date ISO (AAAA-MM-GG). Senza `scadenza` il bando
     è a sportello o strutturale e resta aperto finché non lo chiudi tu.
   - `chiusoIl`: chiusura anticipata (fondi esauriti prima della scadenza).
   - `periodico`: misure che si ripetono ogni anno con date diverse.
   Aggiornamento: vedi STYLE-GUIDE, sezione "Bandi".
   ============================================================================= */

export type Tipo = "fondo-perduto" | "finanziamento" | "misto" | "fiscale";
export type Ambito = "nazionale" | "regionale" | "camerale";
export type Beneficiario = "micro" | "piccole" | "medie" | "grandi" | "startup" | "professionisti" | "under35";
export type Copertura = "software" | "ia" | "consulenza" | "formazione" | "cloud";

export interface Bando {
  id: string;
  nome: string;
  ente: string;
  ambito: Ambito;
  /** Regioni coperte. Vuoto = tutta Italia. */
  regioni: string[];
  /** Territorio più ristretto della regione (province, per le Camere di commercio). */
  area?: string;
  tipo: Tipo;
  beneficiari: Beneficiario[];
  copre: Copertura[];
  /** Quanto vale, in una riga. */
  aiuto: string;
  sintesi: string;
  /** Cosa sapere prima di candidarsi, in particolare sui fornitori ammessi. */
  daSapere: string;
  apertura?: string;
  scadenza?: string;
  chiusoIl?: string;
  /** Testo da mostrare quando non c'è una scadenza (sportello, misura strutturale). */
  senzaScadenza?: string;
  periodico?: boolean;
  fonte: string;
  verificato: string;
}

export const AGGIORNATO = "2026-10-31";

export const REGIONI = [
  "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli-Venezia Giulia",
  "Lazio", "Liguria", "Lombardia", "Marche", "Molise", "Piemonte", "Puglia", "Sardegna",
  "Sicilia", "Toscana", "Trentino-Alto Adige", "Umbria", "Valle d’Aosta", "Veneto",
];

const SUD = ["Abruzzo", "Basilicata", "Calabria", "Campania", "Molise", "Puglia", "Sardegna", "Sicilia"];
const CENTRO_NORD = REGIONI.filter((r) => !SUD.includes(r));

export const BANDI: Bando[] = [
  /* ------------------------------------------------------------ NAZIONALI */
  {
    id: "voucher-cloud-cybersecurity",
    nome: "Voucher Cloud e Cybersecurity",
    ente: "MIMIT, gestito da Invitalia",
    ambito: "nazionale",
    regioni: [],
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie", "professionisti"],
    copre: ["cloud", "software"],
    aiuto: "50% a fondo perduto, fino a 20.000€ (spesa minima 4.000€)",
    sintesi:
      "Contributo per abbonamenti a servizi cloud, come gestionali, ERP, CRM ed e-commerce in SaaS, e per servizi di cybersecurity. Dotazione di 150 milioni, con una quota riservata al Mezzogiorno. Le domande si precompilano dal 20 ottobre 2026 e si esaminano in ordine di arrivo.",
    daSapere:
      "Sono ammessi solo i fornitori iscritti all’elenco del MIMIT, le cui iscrizioni si sono chiuse il 27 maggio 2026. Non copre lo sviluppo di software su misura. Serve una connessione da almeno 30 Mbps.",
    apertura: "2026-11-10",
    scadenza: "2027-01-20",
    fonte: "https://www.invitalia.it/incentivi-e-strumenti/voucher-cloud-e-cybersecurity",
    verificato: "2026-10-31",
  },
  {
    id: "nuova-sabatini",
    nome: "Nuova Sabatini",
    ente: "MIMIT, tramite banche e società di leasing convenzionate",
    ambito: "nazionale",
    regioni: [],
    tipo: "misto",
    beneficiari: ["micro", "piccole", "medie"],
    copre: ["software"],
    aiuto: "Finanziamento da 20.000€ a 4 milioni in 5 anni, più un contributo del Ministero sugli interessi",
    sintesi:
      "Finanzia l’acquisto di beni strumentali nuovi, compresi software e tecnologie digitali. Il contributo è calcolato su un tasso del 2,75%, che sale al 3,575% per gli investimenti 4.0 e green. Rifinanziata dalla Legge di Bilancio 2026.",
    daSapere:
      "Non c’è un elenco di fornitori: il bene si acquista da chi scegli. Il software deve essere un bene nuovo, acquistato e iscritto a bilancio. La domanda si presenta in banca o alla società di leasing.",
    senzaScadenza: "Misura strutturale, sempre attiva",
    fonte: "https://www.mimit.gov.it/it/incentivi/beni-strumentali-nuova-sabatini",
    verificato: "2026-10-31",
  },
  {
    id: "iperammortamento-2026",
    nome: "Iperammortamento 2026",
    ente: "Legge di Bilancio 2026, comunicazioni al GSE",
    ambito: "nazionale",
    regioni: [],
    tipo: "fiscale",
    beneficiari: ["micro", "piccole", "medie", "grandi"],
    copre: ["software"],
    aiuto: "Maggiorazione del costo ammortizzabile per i beni 4.0, con aliquote decrescenti per fasce di investimento",
    sintesi:
      "Deduzione fiscale maggiorata per investimenti in beni materiali e immateriali 4.0 fatti dal 1° gennaio 2026 al 30 settembre 2028, compreso il software elencato negli allegati alla legge. Sostituisce i crediti d’imposta Transizione 4.0 e 5.0. Si gestisce con una serie di comunicazioni al GSE.",
    daSapere:
      "Nessun vincolo sul fornitore. Il software deve essere capitalizzato: gli abbonamenti cloud a canone sono esclusi. Le fonti non concordano sull’aliquota per il software, quindi va confermata con il commercialista.",
    apertura: "2026-01-01",
    scadenza: "2028-09-30",
    fonte: "https://www.mimit.gov.it/it/incentivi/piano-transizione-5-0",
    verificato: "2026-10-31",
  },
  {
    id: "simest-transizione-digitale",
    nome: "SIMEST, Transizione digitale o ecologica",
    ente: "SIMEST (Gruppo CDP), Fondo 394/81",
    ambito: "nazionale",
    regioni: [],
    tipo: "misto",
    beneficiari: ["micro", "piccole", "medie", "startup"],
    copre: ["software", "ia"],
    aiuto: "Finanziamento a tasso agevolato in 6 anni, con una quota a fondo perduto fino al 10% (massimo 100.000€)",
    sintesi:
      "Per imprese che esportano o lavorano in una filiera internazionale. Almeno metà del finanziamento va a spese per la transizione digitale o ecologica. La quota a fondo perduto del 10% spetta anche a chi destina tutto il finanziamento all’intelligenza artificiale, e sale al 20% per le imprese energivore.",
    daSapere:
      "Non c’è un elenco di fornitori: contano le spese ammissibili. Le condizioni attuali sul fondo perduto valgono per le domande presentate entro il 31 dicembre 2026. L’importo massimo dipende dai ricavi e dalla dimensione dell’impresa.",
    scadenza: "2026-12-31",
    fonte: "https://www.simest.it/en/simest-offer/soft-loans/facilitated-financing-for-internationalization/digital-or-ecological-transition/",
    verificato: "2026-10-31",
  },
  {
    id: "smart-start-italia",
    nome: "Smart&Start Italia",
    ente: "Invitalia per il MIMIT",
    ambito: "nazionale",
    regioni: [],
    tipo: "finanziamento",
    beneficiari: ["startup"],
    copre: ["software", "consulenza"],
    aiuto: "Finanziamento a tasso zero dell’80% delle spese (90% per team femminili o under 36), su piani da 100.000€ a 1,5 milioni",
    sintesi:
      "Per startup innovative costituite da non più di 60 mesi, o per team che vogliono costituirne una. Nelle regioni del Mezzogiorno e nel cratere sismico del Centro Italia, il 30% del finanziamento non va restituito.",
    daSapere:
      "Non c’è un elenco di fornitori. Le domande si esaminano in ordine di arrivo, senza scadenze né graduatorie.",
    senzaScadenza: "A sportello, senza scadenza",
    fonte: "https://www.invitalia.it/incentivi-e-strumenti/smartstart-italia/agevolazioni",
    verificato: "2026-10-31",
  },
  {
    id: "resto-al-sud-2",
    nome: "Resto al Sud 2.0",
    ente: "Invitalia",
    ambito: "nazionale",
    regioni: SUD,
    tipo: "fondo-perduto",
    beneficiari: ["under35"],
    copre: ["software"],
    aiuto: "Voucher a fondo perduto fino a 40.000€, elevabile a 50.000€, oppure contributo del 75% fino a 120.000€ di investimento",
    sintesi:
      "Per chi ha tra 18 e 35 anni ed è inattivo, inoccupato o disoccupato, e vuole avviare un’attività d’impresa o professionale nel Mezzogiorno. Sopra i 120.000€ e fino a 200.000€ il contributo è del 70%.",
    daSapere:
      "La scheda Invitalia non dice in chiaro se il software rientra tra le spese: va verificato sulle spese ammissibili prima di inserirlo nel programma.",
    senzaScadenza: "A sportello, aperto dal 15 ottobre 2025",
    fonte: "https://www.invitalia.it/incentivi-e-strumenti/resto-al-sud-20",
    verificato: "2026-10-31",
  },
  {
    id: "autoimpiego-centro-nord",
    nome: "Autoimpiego Centro-Nord",
    ente: "Invitalia",
    ambito: "nazionale",
    regioni: CENTRO_NORD,
    tipo: "fondo-perduto",
    beneficiari: ["under35"],
    copre: ["software"],
    aiuto: "Voucher a fondo perduto fino a 30.000€, elevabile a 40.000€, oppure contributo del 65% fino a 120.000€ di investimento",
    sintesi:
      "Per chi ha tra 18 e 35 anni ed è inattivo, inoccupato o disoccupato, e vuole avviare un’attività d’impresa o professionale nel Centro-Nord. Sopra i 120.000€ e fino a 200.000€ il contributo è del 60%.",
    daSapere:
      "La scheda Invitalia non dice in chiaro se il software rientra tra le spese: va verificato sulle spese ammissibili prima di inserirlo nel programma.",
    senzaScadenza: "A sportello, aperto dal 15 ottobre 2025",
    fonte: "https://www.invitalia.it/incentivi-e-strumenti/autoimpiego-centro-nord",
    verificato: "2026-10-31",
  },
  {
    id: "competenze-specialistiche-pmi",
    nome: "Sviluppo competenze specialistiche delle PMI",
    ente: "MIMIT, gestito da Invitalia",
    ambito: "nazionale",
    regioni: ["Basilicata", "Calabria", "Campania", "Molise", "Puglia", "Sardegna", "Sicilia"],
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie"],
    copre: ["formazione"],
    aiuto: "50% dei costi dei progetti formativi, con una maggiorazione per i progetti integrati tra più regioni",
    sintesi:
      "Formazione dei dipendenti su innovazione tecnologica e transizione digitale e verde, per le PMI del Mezzogiorno. È il secondo sportello del 2026, su una dotazione complessiva di 50 milioni, con valutazione a graduatoria.",
    daSapere:
      "Il progetto lo presenta una PMI capofila, unico referente verso Invitalia. Prima di proporti come formatore verifica nel decreto chi può erogare i corsi.",
    apertura: "2026-09-10",
    scadenza: "2026-12-21",
    fonte: "https://www.invitalia.it/incentivi-e-strumenti/sviluppo-competenze-specialistiche-delle-pmi",
    verificato: "2026-10-31",
  },
  {
    id: "fondimpresa-4-2026",
    nome: "Fondimpresa, Avviso 4/2026",
    ente: "Fondimpresa",
    ambito: "nazionale",
    regioni: [],
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie", "grandi"],
    copre: ["formazione", "ia"],
    aiuto: "Piani formativi finanziati, su una dotazione di 30 milioni",
    sintesi:
      "Per le aziende aderenti a Fondimpresa: corsi su competenze avanzate, compresa l’alfabetizzazione sull’intelligenza artificiale, insieme alla sicurezza obbligatoria. Priorità ai dipendenti di micro e piccole imprese.",
    daSapere:
      "Si possono usare solo corsi di cataloghi qualificati entro il 30 settembre 2026. I piani si presentano dal 1° al 22 dicembre 2026.",
    apertura: "2026-12-01",
    scadenza: "2026-12-22",
    fonte: "https://www.fondimpresa.it/i-canali-di-finanziamento/conto-di-sistema/avviso-4-2026-competenze-avanzate-e-sicurezza",
    verificato: "2026-10-31",
  },
  {
    id: "conto-formazione",
    nome: "Conto formazione dei fondi interprofessionali",
    ente: "Fondimpresa, For.Te., Fondirigenti e gli altri fondi",
    ambito: "nazionale",
    regioni: [],
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie", "grandi"],
    copre: ["formazione", "ia"],
    aiuto: "Usi i contributi che l’azienda versa già sulle retribuzioni per pagare la formazione dei dipendenti",
    sintesi:
      "Se l’azienda aderisce a un fondo interprofessionale, ha un conto in cui si accumulano i suoi contributi e può usarlo per i corsi dei dipendenti, anche sull’uso dell’intelligenza artificiale.",
    daSapere:
      "Le regole su chi può erogare la formazione e su come si presenta il piano cambiano da fondo a fondo.",
    senzaScadenza: "Sempre disponibile per le aziende aderenti",
    fonte: "https://www.fondimpresa.it/",
    verificato: "2026-10-31",
  },

  /* ------------------------------------------------------------ REGIONALI */
  {
    id: "piemonte-linea-a-digitalizzazione",
    nome: "Digitalizzazione delle imprese, Linea A",
    ente: "Regione Piemonte, gestito da Finpiemonte",
    ambito: "regionale",
    regioni: ["Piemonte"],
    tipo: "misto",
    beneficiari: ["micro", "piccole", "medie", "professionisti"],
    copre: ["software", "ia"],
    aiuto: "Per le PMI: finanziamento al 70% a tasso zero e al 30% bancario, più una quota a fondo perduto",
    sintesi:
      "Investimenti in digitalizzazione, compresi intelligenza artificiale, IoT, ERP, MES e CRM. La Linea A ha 37 milioni di dotazione. Aperta anche alle imprese a media capitalizzazione, che però ricevono solo il finanziamento.",
    daSapere:
      "Non c’è un elenco di fornitori. Importi minimi e massimi e spese ammissibili sono negli allegati del bando. Lo sportello chiude prima del 2028 se la dotazione si esaurisce.",
    apertura: "2026-10-13",
    scadenza: "2028-10-29",
    fonte: "https://bandi.regione.piemonte.it/contributi-finanziamenti/digitalizzazione-efficientamento-produttivo-imprese-2026",
    verificato: "2026-10-31",
  },
  {
    id: "piemonte-voucher-digitalizzazione-2026",
    nome: "Voucher digitalizzazione PMI 2026",
    ente: "Regione Piemonte e Unioncamere Piemonte",
    ambito: "regionale",
    regioni: ["Piemonte"],
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie", "professionisti"],
    copre: ["software", "ia", "consulenza", "formazione"],
    aiuto: "Da 4.000€ a 25.000€, dal 50% al 65% delle spese secondo la dimensione",
    sintesi:
      "Lo sportello ha aperto alle 11 del 22 ottobre 2026 e ha chiuso alle 17 dello stesso giorno, perché le domande avevano superato il 120% della dotazione di 19,2 milioni. Le domande arrivate oltre la dotazione restano in lista d’attesa, se si liberano fondi.",
    daSapere:
      "Consulenza e formazione erano ammesse fino al 30% delle spese. Non era cumulabile con la Linea A sullo stesso intervento.",
    apertura: "2026-10-22",
    scadenza: "2026-12-15",
    chiusoIl: "2026-10-22",
    fonte: "https://bandi.regione.piemonte.it/contributi-finanziamenti/voucher-digitalizzazione-pmi-2026",
    verificato: "2026-10-31",
  },
  {
    id: "lazio-voucher-digitalizzazione-2026",
    nome: "Voucher Digitalizzazione PMI 2026",
    ente: "Regione Lazio, gestito da Lazio Innova",
    ambito: "regionale",
    regioni: ["Lazio"],
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie"],
    copre: ["software", "cloud", "consulenza"],
    aiuto: "Importi fissi per intervento, fino a 50.000€ per le micro, 100.000€ per le piccole e 150.000€ per le medie",
    sintesi:
      "Interventi predefiniti: postazioni di lavoro digitali, commercio digitale, migrazione al cloud e cybersecurity, con un contributo minimo di 14.000€. L’avviso non cita l’intelligenza artificiale. Scadenza prorogata al 5 novembre 2026.",
    daSapere:
      "Per piccole e medie imprese è obbligatoria una diagnosi digitale firmata da un Innovation Manager indipendente. Sono esclusi i beneficiari dei voucher precedenti.",
    apertura: "2026-09-30",
    scadenza: "2026-11-05",
    fonte: "https://www.lazioinnova.it/bandi/voucher-digitalizzazione-pmi-2026/",
    verificato: "2026-10-31",
  },
  {
    id: "puglia-trasformazioni",
    nome: "Trasformazioni",
    ente: "Regione Puglia",
    ambito: "regionale",
    regioni: ["Puglia"],
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie", "professionisti"],
    copre: ["software", "ia", "consulenza", "cloud"],
    aiuto: "45% delle spese, più 5 punti con i requisiti premiali, su investimenti da 10.000€ a 360.000€",
    sintesi:
      "Consulenza e tecnologie per la trasformazione digitale: cloud, big data, intelligenza artificiale, IoT e cybersecurity. Dotazione di 23,5 milioni, con progetti fino a 540.000€ per le aggregazioni di imprese.",
    daSapere:
      "Sono ammessi licenze e sviluppo di software e servizi di consulenza per l’innovazione. Lo sportello resta aperto fino al 31 dicembre salvo esaurimento dei fondi: controlla lo stato sul portale Sistema Puglia.",
    scadenza: "2026-12-31",
    fonte: "https://galattica.regione.puglia.it/opportunita/misure-regionali/la-regione-puglia-a-sostegno-dellinnovazione-digitale-delle-mpmi",
    verificato: "2026-10-31",
  },
  {
    id: "bolzano-digitalizzazione-microimprese",
    nome: "Digitalizzazione delle microimprese",
    ente: "Provincia autonoma di Bolzano",
    ambito: "regionale",
    regioni: ["Trentino-Alto Adige"],
    area: "Provincia di Bolzano",
    tipo: "fondo-perduto",
    beneficiari: ["micro"],
    copre: ["software", "cloud"],
    aiuto: "60% su investimenti da 2.000€ a 15.000€",
    sintesi:
      "Per le imprese con meno di 10 addetti: licenze software, gestionali, ERP e CRM, anche in SaaS. Il regime vale dal 2025 al 2028, con domande ogni anno entro il 30 settembre: la finestra del 2026 è chiusa, la prossima è quella del 2027.",
    daSapere: "Serve la sede legale o operativa in provincia di Bolzano.",
    scadenza: "2026-09-30",
    periodico: true,
    fonte: "https://sostenibilita.provincia.bz.it/it/news/digitalizzazione-piu-agevolazioni-in-favore-delle-microimprese",
    verificato: "2026-10-31",
  },

  /* ------------------------------------------------- CAMERE DI COMMERCIO */
  {
    id: "camere-voucher-digitali",
    nome: "Voucher digitali delle Camere di commercio",
    ente: "Camere di commercio, rete Punto Impresa Digitale",
    ambito: "camerale",
    regioni: [],
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie"],
    copre: ["software", "ia", "consulenza", "formazione"],
    aiuto: "Di solito dal 50% al 70% delle spese, con massimali di qualche migliaio di euro",
    sintesi:
      "Quasi ogni Camera di commercio pubblica ogni anno un voucher per il digitale o la doppia transizione. Nel 2026 molti hanno aperto tra settembre e ottobre e hanno chiuso in pochi giorni per esaurimento dei fondi.",
    daSapere:
      "Ogni Camera ha regole, date e massimali suoi. Spesso serve l’autovalutazione SELFI4.0 e sono esclusi i fornitori con legami societari con l’impresa.",
    senzaScadenza: "Ogni Camera apre il suo, in date diverse",
    periodico: true,
    fonte: "https://www.puntoimpresadigitale.camcom.it/bandi-incentivi/voucher-digitali",
    verificato: "2026-10-31",
  },
  {
    id: "como-lecco-voucher-ai-2026",
    nome: "Voucher AI 2026",
    ente: "Camera di Commercio di Como-Lecco",
    ambito: "camerale",
    regioni: ["Lombardia"],
    area: "Province di Como e Lecco",
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie"],
    copre: ["consulenza", "ia"],
    aiuto: "La Camera copre il 70% del percorso: 2.800€ su 4.000€ per le micro, 4.200€ su 6.000€ per le piccole, 8.400€ su 12.000€ per le medie",
    sintesi:
      "Un percorso di consulenza per adottare l’intelligenza artificiale: analisi dello stato digitale, blueprint tecnologico, analisi di rischi e conformità, studio di fattibilità con roadmap. Dotazione di 200.000€, fino a esaurimento.",
    daSapere:
      "Verifica nell’avviso chi può erogare il percorso: la Camera ha pubblicato anche una selezione di fornitori di servizi digitali.",
    apertura: "2026-04-15",
    scadenza: "2026-12-31",
    fonte: "https://www.comolecco.camcom.it/archivio27_bandi-ed-opportunita_0_189.html",
    verificato: "2026-10-31",
  },
  {
    id: "frosinone-latina-doppia-transizione-2026",
    nome: "Voucher Doppia Transizione 2026",
    ente: "Camera di Commercio di Frosinone-Latina",
    ambito: "camerale",
    regioni: ["Lazio"],
    area: "Province di Frosinone e Latina",
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie"],
    copre: ["software", "ia", "cloud", "consulenza", "formazione"],
    aiuto: "Fino al 70% delle spese, massimo 10.000€, con un investimento minimo di 4.000€",
    sintesi:
      "Tecnologie digitali, tra cui intelligenza artificiale, cloud, cybersecurity e software CRM ed ERP, oltre a consulenza e formazione. Dotazione di 500.000€, in ordine di arrivo.",
    daSapere: "I requisiti dei fornitori sono nel bando camerale.",
    apertura: "2026-09-25",
    scadenza: "2026-11-10",
    fonte: "https://www.puntoimpresadigitale.camcom.it/voucher/bando-voucher-doppia-transizione-anno-2026-1",
    verificato: "2026-10-31",
  },
  {
    id: "marche-doppia-transizione-2026",
    nome: "Voucher per la Doppia Transizione 2026",
    ente: "Camera di Commercio delle Marche",
    ambito: "camerale",
    regioni: ["Marche"],
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie"],
    copre: ["software", "ia", "consulenza"],
    aiuto: "70% fino a 8.000€ per micro e piccole imprese, 50% fino a 6.000€ per le medie",
    sintesi:
      "Dotazione di 1,5 milioni per tecnologie digitali e sostenibilità. Lo sportello ha chiuso in anticipo, alle 13 del 30 settembre 2026, per esaurimento dei fondi.",
    daSapere: "Di solito riapre ogni anno: tienilo d’occhio dall’estate.",
    apertura: "2026-09-30",
    chiusoIl: "2026-09-30",
    periodico: true,
    fonte: "https://www.marche.camcom.it/fai-crescere-la-tua-impresa/bandi-e-contributi/voucher-per-la-doppia-transizione-2026",
    verificato: "2026-10-31",
  },
  {
    id: "arezzo-siena-doppia-transizione-2026",
    nome: "Voucher doppia transizione digitale ed ecologica 2026",
    ente: "Camera di Commercio di Arezzo-Siena",
    ambito: "camerale",
    regioni: ["Toscana"],
    area: "Province di Arezzo e Siena",
    tipo: "fondo-perduto",
    beneficiari: ["micro", "piccole", "medie"],
    copre: ["software", "consulenza"],
    aiuto: "50% delle spese, fino a 3.500€, con un investimento minimo di 2.000€",
    sintesi:
      "Chiuso in anticipo per esaurimento dei fondi: il 20 luglio 2026 per la provincia di Arezzo, il 5 agosto per quella di Siena. Alcune pagine riportano ancora la vecchia scadenza del 15 dicembre.",
    daSapere: "La Camera si riserva di riaprire i termini se avanzano risorse.",
    chiusoIl: "2026-08-05",
    periodico: true,
    fonte: "https://www.as.camcom.it/notizie/bando-voucher-doppia-transizione-digitale-ed-ecologica-2026-arezzo",
    verificato: "2026-10-31",
  },
];
