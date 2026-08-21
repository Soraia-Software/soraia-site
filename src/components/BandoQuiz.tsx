import { useState, useMemo } from "react";
import LeadForm from "./LeadForm";

type Effect = "pass" | "blocker" | "fixable" | "info";
interface Opt { label: string; value: string; effect: Effect; action?: string }
interface Q { id: string; question: string; help: string; options: Opt[] }

// Question text, help ("?") and effects are the correctness-critical data. They were
// adversarially verified against the official bando rules (Unioncamere Piemonte, art.4)
// so the tool never tells a firm it is "idoneo" when a rule would actually exclude it.
const QUESTIONS: Q[] = [
  {
    id: "dimensione",
    question: "Che dimensione ha la tua impresa?",
    help: "PMI secondo l'UE (Allegato I Reg. 651/2014). ULA (Unità Lavorative Annue) = numero medio di dipendenti a tempo pieno nell'anno, inclusi i soci che lavorano. Attenzione: se fai parte di un gruppo, ai tuoi numeri si aggiungono anche quelli delle altre società. Per intero se una società ti controlla oltre il 50% (o tu controlli lei); solo in proporzione alla quota se la partecipazione è tra il 25% e il 50%. Così una piccola srl dentro un gruppo grande può risultare esclusa.",
    options: [
      { label: "Micro: meno di 10 persone (ULA) e fatturato o attivo fino a 2 mln €", value: "micro", effect: "pass" },
      { label: "Piccola: meno di 50 persone e fino a 10 mln €", value: "piccola", effect: "pass" },
      { label: "Media: meno di 250 persone e fatturato fino a 50 mln € (o attivo fino a 43)", value: "media", effect: "pass" },
      { label: "Grande impresa (o parte di un gruppo grande)", value: "grande", effect: "blocker", action: "Le grandi imprese non sono ammesse dal bando" },
      { label: "Non so", value: "nonso", effect: "info", action: "Verificare la dimensione d'impresa (occupati e dati finanziari)" },
    ],
  },
  {
    id: "aggregazione",
    question: "La tua impresa fa parte di un gruppo? (controllata oltre il 50%, o partecipazioni tra il 25% e il 50%)",
    help: "Conta per stabilire la dimensione reale. Se un'altra impresa ti controlla oltre il 50% (o tu controlli lei), i suoi numeri si sommano per intero ai tuoi. Se la partecipazione è tra il 25% e il 50%, si somma solo la quota proporzionale. Sommando, una PMI dentro un gruppo grande può diventare 'grande impresa' e uscire dal bando.",
    options: [
      { label: "No, siamo autonomi", value: "autonomi", effect: "pass" },
      { label: "Sì, ma sommando i numeri restiamo sotto le soglie PMI", value: "sotto", effect: "info", action: "Verificare la dimensione aggregata col gruppo (collegate e associate)" },
      { label: "Sì, e sommando diventiamo grande impresa", value: "grande", effect: "blocker", action: "Con l'aggregazione del gruppo si supera la soglia PMI" },
      { label: "Non so", value: "nonso", effect: "info", action: "Verificare l'assetto proprietario e la dimensione aggregata" },
    ],
  },
  {
    id: "piemonte",
    question: "Hai sede legale o un'unità operativa attiva in Piemonte, dove faresti il progetto?",
    help: "Serve una sede o una filiale operativa reale e attiva in Piemonte, dove realizzi l'intervento. La sola sede legale altrove non basta se l'attività è fuori regione.",
    options: [
      { label: "Sì", value: "si", effect: "pass" },
      { label: "No", value: "no", effect: "blocker", action: "Serve una sede o unità operativa attiva in Piemonte" },
    ],
  },
  {
    id: "polizza",
    question: "Hai la polizza assicurativa contro le catastrofi naturali (CAT NAT) attiva?",
    help: "CAT NAT = polizza obbligatoria per legge (L. 213/2023) che copre i danni da eventi naturali come alluvioni, terremoti e frane. Il bando la richiede attiva. È il requisito che blocca più aziende: se non ce l'hai, va stipulata prima di presentare la domanda, e di solito si fa in tempo.",
    options: [
      { label: "Sì, è attiva", value: "si", effect: "pass" },
      { label: "No, non ancora", value: "no", effect: "fixable", action: "Stipulare la polizza catastrofale (CAT NAT) prima della domanda" },
      { label: "Non so cos'è", value: "nonso", effect: "fixable", action: "Verificare e, se manca, stipulare la polizza catastrofale (CAT NAT)" },
    ],
  },
  {
    id: "durc",
    question: "Sei in regola con i contributi (DURC regolare)?",
    help: "DURC = Documento Unico di Regolarità Contributiva: certifica che sei in regola con INPS e INAIL. È gratuito, lo scarichi online (o lo fa il tuo consulente del lavoro) in pochi minuti e vale 120 giorni. Se sei una società di persone (snc, sas), devono essere in regola anche i soci, non solo l'impresa.",
    options: [
      { label: "Sì", value: "si", effect: "pass" },
      { label: "No / ho irregolarità", value: "no", effect: "fixable", action: "Regolarizzare il DURC prima di concessione ed erogazione" },
      { label: "Non so", value: "nonso", effect: "info", action: "Verificare il DURC (gratis, online)" },
    ],
  },
  {
    id: "diritto",
    question: "Hai pagato il diritto annuale della Camera di Commercio negli ultimi 3 anni?",
    help: "Il diritto annuale è la quota annua dovuta alla Camera di Commercio. Una morosità superiore a 100€ negli ultimi 3 anni comporta il rigetto automatico della domanda. Si sana solo pagando gli arretrati PRIMA della presentazione.",
    options: [
      { label: "Sì, tutto pagato", value: "si", effect: "pass" },
      { label: "No / ho arretrati sopra 100€", value: "no", effect: "fixable", action: "Pagare gli arretrati del diritto annuale (morosità oltre 100€ = domanda respinta)" },
      { label: "Non so", value: "nonso", effect: "info", action: "Verificare di non essere moroso oltre 100€ sul diritto annuale" },
    ],
  },
  {
    id: "voucher_precedente",
    question: "Hai già ricevuto un voucher digitalizzazione di Unioncamere Piemonte nel 2023 o 2024?",
    help: "Chi ha già ottenuto uno di questi specifici voucher camerali nel 2023 o 2024 non può richiederlo di nuovo. Altri incentivi (crediti d'imposta, altri bandi) non contano per questa domanda.",
    options: [
      { label: "No", value: "no", effect: "pass" },
      { label: "Sì", value: "si", effect: "blocker", action: "Hai già usato il voucher digitalizzazione 2023/2024 di Unioncamere Piemonte" },
      { label: "Non so", value: "nonso", effect: "info", action: "Verificare di non aver già ricevuto il voucher 2023/2024" },
    ],
  },
  {
    id: "deminimis",
    question: "Hai ancora spazio nel de minimis? (meno di 300.000€ di questi piccoli aiuti pubblici negli ultimi 3 anni, sommando anche le imprese collegate)",
    help: "De minimis = il tetto di aiuti pubblici minori che un'impresa può ricevere: 300.000€ in 3 anni (Reg. UE 2831/2023). Con margine residuo il voucher viene solo ridotto al residuo; con plafond pieno l'aiuto non è concedibile. Contano anche crediti d'imposta e garanzie, e il tetto è sull'impresa unica (somma delle collegate). Si verifica gratis sul Registro Nazionale Aiuti, rna.gov.it.",
    options: [
      { label: "Sì / credo di sì", value: "si", effect: "pass" },
      { label: "No, quasi esaurito", value: "quasi", effect: "info", action: "Verificare il residuo de minimis: se basso, il voucher viene ridotto" },
      { label: "Ho già usato circa 300.000€ / plafond pieno", value: "pieno", effect: "blocker", action: "Plafond de minimis esaurito: l'aiuto non è concedibile" },
      { label: "Non so", value: "nonso", effect: "info", action: "Verificare lo spazio de minimis su rna.gov.it" },
    ],
  },
  {
    id: "ateco",
    question: "Il tuo settore rientra tra quelli ammessi? (Esclusi di solito agricoltura primaria e pesca)",
    help: "Il bando ammette la gran parte dei settori: industria, servizi, commercio, artigianato. Sono tipicamente esclusi l'agricoltura primaria e la pesca. Il codice ATECO è la sigla che identifica la tua attività: se hai dubbi, lo verifichiamo noi.",
    options: [
      { label: "Sì (non agricoltura/pesca)", value: "si", effect: "pass" },
      { label: "Agricoltura primaria o pesca", value: "no", effect: "blocker", action: "Il tuo settore (ATECO) è tra quelli esclusi" },
      { label: "Non so", value: "nonso", effect: "info", action: "Verificare che il codice ATECO sia ammissibile" },
    ],
  },
  {
    id: "selfi",
    question: "Hai già compilato il test SELFI4.0 (autovalutazione digitale) negli ultimi 12 mesi?",
    help: "SELFI4.0 è un test online gratuito delle Camere di Commercio che misura quanto è digitale la tua azienda. È obbligatorio per la domanda (report firmato digitalmente, fatto negli ultimi 12 mesi) ma si compila subito e gratis. È anche il primo passo del nostro servizio Misurare.",
    options: [
      { label: "Sì", value: "si", effect: "pass" },
      { label: "No / non ancora", value: "no", effect: "fixable", action: "Compilare il test SELFI4.0 (gratuito) e firmare il report" },
      { label: "Non so cos'è", value: "nonso", effect: "fixable", action: "Compilare il test SELFI4.0 (gratuito): serve per la domanda" },
    ],
  },
  {
    id: "dichiarazioni",
    question: "Puoi confermare tutti questi punti?",
    help: "Sono cause di esclusione o revoca previste dal bando, in gran parte NON sanabili: 1) l'impresa e i suoi amministratori non hanno condanne penali definitive rilevanti, interdittive antimafia o misure interdittive ex D.Lgs 231/2001; 2) se hai 15 o più dipendenti, sei in regola con l'assunzione di persone con disabilità (L. 68/99); 3) non hai forniture in essere con Unioncamere Piemonte e non hai delocalizzato (né prevedi di farlo); 4) non hai cartelle esattoriali sopra 5.000€ non pagate né rateizzate (potrebbero sospendere l'erogazione). Se anche solo uno non è chiaro, lo verifichiamo insieme.",
    options: [
      { label: "Sì, confermo tutti i punti", value: "si", effect: "pass" },
      { label: "No / non sono certo di uno di questi", value: "no", effect: "info", action: "Verificare insieme condanne/antimafia/231, L.68/99 (15+ dipendenti), delocalizzazione e cartelle esattoriali" },
    ],
  },
];

const DIMENSION_INFO: Record<string, { pct: string; min: string }> = {
  micro: { pct: "65%", min: "6.153,85€" },
  piccola: { pct: "60%", min: "8.333,33€" },
  media: { pct: "50%", min: "10.000€" },
};

const brand = "#4A1E5C";
type Kind = "idoneo" | "idoneoAzioni" | "daVerificare" | "nonIdoneo";

export default function BandoQuiz() {
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Opt>>({});
  const [helpOpen, setHelpOpen] = useState(false);

  const total = QUESTIONS.length;
  const done = started && Object.keys(answers).length === total;

  const verdict = useMemo(() => {
    if (!done) return null;
    const chosen = QUESTIONS.map((q) => ({ q, opt: answers[q.id] }));
    const blockers = chosen.filter((c) => c.opt.effect === "blocker");
    const infos = chosen.filter((c) => c.opt.effect === "info");
    const fixables = chosen.filter((c) => c.opt.effect === "fixable");
    // Precedence: a hard blocker excludes; otherwise uncertainty ("info") must surface as
    // "da verificare" and never as a confident "idoneo"; only clean, known gaps are "azioni".
    let kind: Kind;
    if (blockers.length) kind = "nonIdoneo";
    else if (infos.length) kind = "daVerificare";
    else if (fixables.length) kind = "idoneoAzioni";
    else kind = "idoneo";
    const dim = answers["dimensione"]?.value;
    return {
      kind,
      reasons: blockers.map((b) => b.opt.action).filter(Boolean) as string[],
      toVerify: infos.map((c) => c.opt.action).filter(Boolean) as string[],
      actions: fixables.map((c) => c.opt.action).filter(Boolean) as string[],
      dim: dim && DIMENSION_INFO[dim] ? DIMENSION_INFO[dim] : null,
    };
  }, [done, answers]);

  const summary = useMemo(() => {
    if (!verdict) return "";
    const label = { idoneo: "IDONEO", idoneoAzioni: "IDONEO CON AZIONI", daVerificare: "DA VERIFICARE", nonIdoneo: "NON IDONEO" }[verdict.kind];
    const risposte = QUESTIONS.map((q) => `${q.id}: ${answers[q.id]?.value}`).join("; ");
    const extra = verdict.reasons.length ? ` | Motivi: ${verdict.reasons.join("; ")}`
      : [...verdict.toVerify, ...verdict.actions].length ? ` | Da fare/verificare: ${[...verdict.actions, ...verdict.toVerify].join("; ")}` : "";
    return `[Prequalifica bando Piemonte - Esito: ${label}] ${risposte}${extra}`;
  }, [verdict, answers]);

  function choose(opt: Opt) {
    const q = QUESTIONS[i];
    setAnswers((a) => ({ ...a, [q.id]: opt }));
    setHelpOpen(false);
    if (i < total - 1) setI(i + 1);
  }
  function back() { if (i > 0) { setI(i - 1); setHelpOpen(false); } }
  function restart() { setAnswers({}); setI(0); setStarted(false); setHelpOpen(false); }

  // ---- intro / start ----
  if (!started) {
    return (
      <div className="card !p-8 md:!p-10 shadow-lg text-center">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase mb-3" style={{ color: brand }}>Questionario di idoneità</p>
        <h3 className="text-2xl md:text-3xl font-bold text-ink-900 tracking-tight">Scopri se puoi accedere al bando</h3>
        <p className="mt-3 text-ink-600 leading-relaxed max-w-md mx-auto">{total} domande, circa 3 minuti. Ogni termine tecnico ha una spiegazione: ti basta toccare il "?".</p>
        <button onClick={() => setStarted(true)} className="btn btn-primary mt-7">
          Inizia il questionario
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
        </button>
      </div>
    );
  }

  // ---- verdict + capture ----
  if (done && verdict) {
    const v = verdict;
    const meta = {
      idoneo: { tag: "Idoneo", tagColor: "#17803D", dot: "#20A44D", heading: "Ottimo: hai i requisiti base" },
      idoneoAzioni: { tag: "Idoneo, con azioni", tagColor: "#17803D", dot: "#20A44D", heading: "Ci sei quasi: sistemiamo un paio di cose" },
      daVerificare: { tag: "Da verificare", tagColor: "#9A6A00", dot: "#C88A00", heading: "Dobbiamo verificare un paio di cose" },
      nonIdoneo: { tag: "Requisiti da verificare", tagColor: "#9A6A00", dot: "#C88A00", heading: "Da questo bando, probabilmente no" },
    }[v.kind];
    const captureSub = v.kind === "nonIdoneo"
      ? "Lascia la mail: verifichiamo se c'è comunque margine e, in ogni caso, ci sono altre strade per digitalizzare con l'AI."
      : "Lascia la mail: verifichiamo la tua idoneità documenti alla mano e ti diciamo esattamente come muoverti prima del 22 ottobre.";
    const listItems = v.kind === "nonIdoneo" ? v.reasons : [...v.actions, ...v.toVerify];
    const listColor = v.kind === "nonIdoneo" ? "#C0392B" : "#C88A00";
    const listGlyph = v.kind === "nonIdoneo" ? "x" : "!";
    return (
      <div className="space-y-6">
        <div className="card !p-8 shadow-lg">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase mb-4" style={{ color: meta.tagColor }}>
            <span className="w-2 h-2 rounded-full" style={{ background: meta.dot }}></span>{meta.tag}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-ink-900 tracking-tight">{meta.heading}</h3>

          {v.kind === "idoneo" && v.dim && (
            <p className="mt-4 text-ink-700 leading-relaxed">
              Per la tua dimensione il bando copre il <b>{v.dim.pct}</b> della spesa (fino a 25.000€), con un investimento minimo di circa <b>{v.dim.min}</b>. Il prossimo passo è la verifica ufficiale sui documenti e la domanda prima del click day.
            </p>
          )}
          {v.kind === "idoneoAzioni" && (
            <p className="mt-4 text-ink-700 leading-relaxed">Sembri idoneo. Prima della domanda va completato questo, tutte cose che si fanno in tempo se ci muoviamo ora:</p>
          )}
          {v.kind === "daVerificare" && (
            <p className="mt-4 text-ink-700 leading-relaxed">Sei sulla buona strada, ma un paio di punti non sono ancora chiari: li verifichiamo insieme, documenti alla mano, prima di procedere.</p>
          )}
          {v.kind === "nonIdoneo" && (
            <p className="mt-4 text-ink-700 leading-relaxed">Da una o più risposte sembra mancare un requisito di base:</p>
          )}

          {listItems.length > 0 && (
            <ul className="mt-4 space-y-2">
              {listItems.map((a, k) => (
                <li key={k} className="flex items-start gap-2.5 text-[15px] text-ink-800">
                  <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center text-white text-[11px]" style={{ background: listColor }}>{listGlyph}</span>
                  {a}
                </li>
              ))}
            </ul>
          )}
          {(v.kind === "idoneoAzioni" || v.kind === "daVerificare") && v.dim && (
            <p className="mt-4 text-[14px] text-ink-600">Per la tua dimensione il contributo copre il <b>{v.dim.pct}</b> della spesa (min. circa {v.dim.min}).</p>
          )}

          <button onClick={restart} className="mt-6 text-[13px] font-medium underline underline-offset-4" style={{ color: "var(--color-ink-soft)" }}>Rifai il questionario</button>
        </div>

        <LeadForm
          lang="it"
          variant="magnet"
          source="bando-eligibilita"
          hiddenMessage={summary}
          heading="Verifica la tua idoneità con noi"
          subheading={captureSub}
          submitLabel="Voglio la verifica"
          successText="Ricevuto. Ti scriviamo a breve con l'esito della verifica e i prossimi passi."
        />
      </div>
    );
  }

  // ---- a question ----
  const q = QUESTIONS[i];
  const pct = Math.round((i / total) * 100);
  return (
    <div className="card !p-8 md:!p-10 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <span className="text-[12px] font-medium whitespace-nowrap" style={{ color: "var(--color-ink-soft)" }}>Domanda {i + 1} di {total}</span>
        <div className="flex-1 ml-4 h-1.5 rounded-full overflow-hidden" style={{ background: "#ECEAE6" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: brand }}></div>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-ink-900 tracking-tight leading-snug">{q.question}</h3>

      <button onClick={() => setHelpOpen((h) => !h)} aria-expanded={helpOpen}
              className="mt-3 inline-flex items-center gap-2 rounded-full pl-1.5 pr-3.5 py-1.5 text-[13.5px] font-medium transition-colors"
              style={{ background: helpOpen ? brand : "var(--color-violet-50, #F5EEF7)", color: helpOpen ? "#fff" : brand }}>
        <span className="inline-flex w-6 h-6 rounded-full items-center justify-center text-[13px] font-bold"
              style={{ background: helpOpen ? "rgba(255,255,255,0.22)" : brand, color: "#fff" }}>?</span>
        {helpOpen ? "Nascondi la spiegazione" : "Spiegami cosa vuol dire la domanda"}
      </button>

      {helpOpen && (
        <div className="mt-3 rounded-xl p-4 text-[14px] leading-relaxed" style={{ background: "var(--color-violet-50, #F5EEF7)", color: "var(--color-ink)" }}>
          {q.help}
        </div>
      )}

      <div className="mt-6 space-y-3">
        {q.options.map((o) => {
          const selected = answers[q.id]?.value === o.value;
          return (
            <button key={o.value} onClick={() => choose(o)}
              className="w-full text-left px-5 py-4 rounded-xl border transition-all hover:border-ink-400"
              style={{ borderColor: selected ? brand : "#E2DFDA", background: selected ? "var(--color-violet-50, #F5EEF7)" : "#fff", color: "var(--color-ink)" }}>
              <span className="text-[15px] font-medium">{o.label}</span>
            </button>
          );
        })}
      </div>

      {i > 0 && (
        <button onClick={back} className="mt-6 text-[13px] font-medium inline-flex items-center gap-1.5" style={{ color: "var(--color-ink-soft)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          Indietro
        </button>
      )}
    </div>
  );
}
