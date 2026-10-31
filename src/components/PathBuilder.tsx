import { useState } from "react";

// Costruttore del percorso. Modello a tre servizi più add-on:
// Analisi 3.000€ una tantum (facoltativa), Sprint da 8.000€/mese, Hypercare da 500€/mese.
// Gli add-on si agganciano a un solo servizio e sono tutti una tantum. Hypercare è
// ricorrente e resta fuori dal totale del progetto.
const P_ANALISI = 3000;
const P_BANDI = 2000;
const P_SPRINT = 8000;
const P_COMPLIANCE = 4000;
const P_PENTEST = 4000;
const P_TRAINING = 3000;
const MIN_MONTHS = 1;
const MAX_MONTHS = 6;
const brand = "#4A1E5C";

type Lang = "it" | "en";

const T = {
  it: {
    s1: "Analisi",
    s1Note: "3.000€, il primo passo consigliato",
    s2: "Sprint",
    s2Note: "da 8.000€ al mese",
    s3: "Hypercare",
    s3Note: "facoltativa, dopo il go-live",
    analisi: "Includi l’Analisi",
    analisiPrice: "3.000€ una tantum",
    bandi: "Supporto bandi",
    bandiPrice: "2.000€, e lo paghi solo se il bando è vinto",
    compliance: "Compliance & Audit",
    compliancePrice: "4.000€ una tantum",
    pentest: "Pentest",
    pentestPrice: "4.000€ una tantum",
    training: "Formazione e adozione",
    trainingPrice: "3.000€ una tantum",
    hyper: "Attiva Hypercare",
    hyperPrice: "da 500€/mese, contratto annuale",
    minusAria: "Un mese di Sprint in meno",
    plusAria: "Un mese di Sprint in più",
    months: (n: number) => `${n} ${n === 1 ? "mese" : "mesi"}`,
    sprLabel: (n: number) => `${n} ${n === 1 ? "mese" : "mesi"} di team dedicato`,
    lineAnalisi: "Analisi",
    lineBandi: "+ Supporto bandi",
    lineSprint: (m: string, rate: string) => `${m} di Sprint × ${rate}`,
    lineCompliance: "+ Compliance & Audit",
    linePentest: "+ Pentest",
    lineTraining: "+ Formazione e adozione",
    summaryTag: "Il tuo percorso",
    totalLabel: "Totale progetto",
    credit: (n: string) => `Se parti entro 30 giorni dall’Analisi, i 3.000€ vengono scalati: ${n}.`,
    recTitle: "Hypercare, dopo il go-live",
    recHyper: "Hypercare",
    recHyperPrice: "da 500€/mese",
    iva: "Prezzi IVA esclusa. Sprint pagati a inizio mese.",
    cta: "Parliamone in 20 minuti",
    ctaHref: "/parliamone",
  },
  en: {
    s1: "Analysis",
    s1Note: "€3,000, the recommended first step",
    s2: "Sprint",
    s2Note: "from €8,000 a month",
    s3: "Hypercare",
    s3Note: "optional, after go-live",
    analisi: "Include the Analysis",
    analisiPrice: "€3,000 one-off",
    bandi: "Grant support",
    bandiPrice: "€2,000, and you pay only if the grant is won",
    compliance: "Compliance & Audit",
    compliancePrice: "€4,000 one-off",
    pentest: "Pentest",
    pentestPrice: "€4,000 one-off",
    training: "Training and adoption",
    trainingPrice: "€3,000 one-off",
    hyper: "Turn on Hypercare",
    hyperPrice: "from €500/month, annual contract",
    minusAria: "One Sprint month less",
    plusAria: "One Sprint month more",
    months: (n: number) => `${n} ${n === 1 ? "month" : "months"}`,
    sprLabel: (n: number) => `${n} ${n === 1 ? "month" : "months"} of a dedicated team`,
    lineAnalisi: "Analysis",
    lineBandi: "+ Grant support",
    lineSprint: (m: string, rate: string) => `${m} of Sprint × ${rate}`,
    lineCompliance: "+ Compliance & Audit",
    linePentest: "+ Pentest",
    lineTraining: "+ Training and adoption",
    summaryTag: "Your path",
    totalLabel: "Project total",
    credit: (n: string) => `If you start within 30 days of the Analysis, the €3,000 is deducted: ${n}.`,
    recTitle: "Hypercare, after go-live",
    recHyper: "Hypercare",
    recHyperPrice: "from €500/month",
    iva: "Prices exclude VAT. Sprints paid at the start of the month.",
    cta: "Let’s talk, 20 minutes",
    ctaHref: "/en/contact",
  },
} as const;

type ToggleProps = {
  on: boolean;
  onClick: () => void;
  label: string;
  price: string;
};

function Toggle({ on, onClick, label, price }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className="text-left"
      style={{
        minHeight: 44,
        padding: "12px 16px",
        borderRadius: 14,
        border: `1.5px solid ${on ? brand : "var(--color-line-strong)"}`,
        background: on ? "var(--color-violet-50)" : "#fff",
        color: "var(--color-ink)",
        fontSize: 15,
        cursor: "pointer",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        width: "100%",
        transition: "border-color .18s, background .18s",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 20,
          height: 20,
          flex: "0 0 20px",
          marginTop: 1,
          borderRadius: 6,
          border: `1.5px solid ${brand}`,
          background: on ? brand : "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {on && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </span>
      <span className="min-w-0">
        <strong className="font-semibold">{label}</strong>
        <br />
        <span style={{ color: "var(--color-ink-muted)" }}>{price}</span>
      </span>
    </button>
  );
}

function StepHead({ n, title, note }: { n: string; title: string; note: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        aria-hidden="true"
        className="shrink-0 font-semibold"
        style={{
          width: 26,
          height: 26,
          borderRadius: 8,
          background: "var(--color-violet-50)",
          color: brand,
          fontSize: 14,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "translateY(3px)",
        }}
      >
        {n}
      </span>
      <span>
        <span className="text-[17px] font-semibold" style={{ color: "var(--color-ink)" }}>{title}</span>
        <span className="text-[14px] ml-2" style={{ color: "var(--color-ink-soft)" }}>{note}</span>
      </span>
    </div>
  );
}

export default function PathBuilder({ lang = "it" }: { lang?: Lang }) {
  const [analisi, setAnalisi] = useState(true);
  const [bandi, setBandi] = useState(false);
  const [sprints, setSprints] = useState(3);
  const [compliance, setCompliance] = useState(true);
  const [pentest, setPentest] = useState(true);
  const [training, setTraining] = useState(false);
  const [hyper, setHyper] = useState(true);

  const C = T[lang];
  // Raggruppamento manuale delle migliaia: deterministico, non dipende dall'ICU dell'host.
  const group = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, lang === "en" ? "," : ".");
  const eur = (n: number) => (lang === "en" ? `€${group(n)}` : `${group(n)}€`);

  const mesi = C.months(sprints);

  const lines: { label: string; amount: string }[] = [];
  let total = 0;
  if (analisi) {
    lines.push({ label: C.lineAnalisi, amount: eur(P_ANALISI) });
    total += P_ANALISI;
    if (bandi) {
      lines.push({ label: C.lineBandi, amount: eur(P_BANDI) });
      total += P_BANDI;
    }
  }
  lines.push({ label: C.lineSprint(mesi, eur(P_SPRINT)), amount: eur(sprints * P_SPRINT) });
  total += sprints * P_SPRINT;
  if (compliance) {
    lines.push({ label: C.lineCompliance, amount: eur(P_COMPLIANCE) });
    total += P_COMPLIANCE;
  }
  if (pentest) {
    lines.push({ label: C.linePentest, amount: eur(P_PENTEST) });
    total += P_PENTEST;
  }
  if (training) {
    lines.push({ label: C.lineTraining, amount: eur(P_TRAINING) });
    total += P_TRAINING;
  }

  const stepStyle: React.CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: 12,
    border: "1.5px solid var(--color-line-strong)",
    background: "#fff",
    fontSize: 22,
    lineHeight: 1,
    color: "var(--color-ink)",
    cursor: "pointer",
    transition: "border-color .18s, opacity .18s",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
      {/* ===== CONTROLLI ===== */}
      <div className="card lg:col-span-3 !p-7 md:!p-9 flex flex-col gap-7">
        {/* 1 · ANALISI */}
        <div className="flex flex-col gap-3">
          <StepHead n="1" title={C.s1} note={C.s1Note} />
          <Toggle on={analisi} onClick={() => setAnalisi((v) => !v)} label={C.analisi} price={C.analisiPrice} />
          {analisi && (
            <Toggle on={bandi} onClick={() => setBandi((v) => !v)} label={C.bandi} price={C.bandiPrice} />
          )}
        </div>

        {/* 2 · SPRINT */}
        <div className="flex flex-col gap-3" style={{ borderTop: "1px solid var(--color-line)", paddingTop: 24 }}>
          <StepHead n="2" title={C.s2} note={C.s2Note} />
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSprints((m) => Math.max(MIN_MONTHS, m - 1))}
              disabled={sprints <= MIN_MONTHS}
              aria-label={C.minusAria}
              style={{ ...stepStyle, opacity: sprints <= MIN_MONTHS ? 0.35 : 1, cursor: sprints <= MIN_MONTHS ? "not-allowed" : "pointer" }}
            >
              &minus;
            </button>
            <span className="bignum text-center" style={{ fontSize: "clamp(2rem, 4vw, 2.25rem)", minWidth: 40 }} aria-live="polite">
              {sprints}
            </span>
            <button
              type="button"
              onClick={() => setSprints((m) => Math.min(MAX_MONTHS, m + 1))}
              disabled={sprints >= MAX_MONTHS}
              aria-label={C.plusAria}
              style={{ ...stepStyle, opacity: sprints >= MAX_MONTHS ? 0.35 : 1, cursor: sprints >= MAX_MONTHS ? "not-allowed" : "pointer" }}
            >
              +
            </button>
            <span className="text-[14px]" style={{ color: "var(--color-ink-soft)" }}>{C.sprLabel(sprints)}</span>
          </div>
          <Toggle on={compliance} onClick={() => setCompliance((v) => !v)} label={C.compliance} price={C.compliancePrice} />
          <Toggle on={pentest} onClick={() => setPentest((v) => !v)} label={C.pentest} price={C.pentestPrice} />
          <Toggle on={training} onClick={() => setTraining((v) => !v)} label={C.training} price={C.trainingPrice} />
        </div>

        {/* 3 · HYPERCARE */}
        <div className="flex flex-col gap-3" style={{ borderTop: "1px solid var(--color-line)", paddingTop: 24 }}>
          <StepHead n="3" title={C.s3} note={C.s3Note} />
          <Toggle on={hyper} onClick={() => setHyper((v) => !v)} label={C.hyper} price={C.hyperPrice} />
        </div>
      </div>

      {/* ===== RIEPILOGO ===== */}
      <div
        className="lg:col-span-2 rounded-[1.375rem] p-7 md:p-9 flex flex-col gap-3 bg-lines-dark"
        style={{ backgroundColor: "#1A0820", color: "#fff" }}
      >
        <p className="eyebrow eyebrow-light">{C.summaryTag}</p>

        {lines.map((l) => (
          <div
            key={l.label}
            className="flex justify-between gap-3 text-[15px] pb-3"
            style={{ borderBottom: "1px solid var(--color-line-dark)" }}
          >
            <span style={{ color: "rgba(255,255,255,0.72)" }}>{l.label}</span>
            <span className="font-semibold whitespace-nowrap">{l.amount}</span>
          </div>
        ))}

        <div className="flex justify-between items-baseline gap-3 mt-1">
          <span className="font-semibold">{C.totalLabel}</span>
          <span className="bignum" style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 2.5rem)" }} aria-live="polite">
            {eur(total)}
          </span>
        </div>

        {analisi && (
          <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.68)" }}>{C.credit(eur(total - P_ANALISI))}</p>
        )}

        {hyper && (
          <div className="mt-2 pt-3" style={{ borderTop: "1px solid var(--color-line-dark)" }}>
            <p className="text-[13px] mb-2" style={{ color: "rgba(255,255,255,0.55)" }}>{C.recTitle}</p>
            <div className="flex justify-between gap-3 text-[15px] py-1">
              <span style={{ color: "rgba(255,255,255,0.72)" }}>{C.recHyper}</span>
              <span className="font-semibold whitespace-nowrap">{C.recHyperPrice}</span>
            </div>
          </div>
        )}

        <p className="text-[12.5px] mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>{C.iva}</p>

        <a href={C.ctaHref} className="btn !bg-white !text-violet-900 hover:!bg-violet-50 mt-auto justify-center">
          {C.cta}
        </a>
      </div>
    </div>
  );
}
