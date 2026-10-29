import { useState } from "react";

// Costruttore del percorso, sostituisce il vecchio PricingCalculator a ore.
// Modello: Sprint 5.000€/mese, Sprint Pro 8.000€/mese, un rilascio per mese.
// Hypercare è ricorrente (da 500€/mese) e resta fuori dal totale del progetto.
const RATE_BASE = 5000;
const RATE_PRO = 8000;
const MIN_MONTHS = 1;
const MAX_MONTHS = 6;
const brand = "#4A1E5C";

type Lang = "it" | "en";

const T = {
  it: {
    levelLabel: "Livello",
    base: "Sprint · 5.000€/mese",
    pro: "Sprint Pro · 8.000€/mese",
    monthsLabel: "Mesi di sviluppo",
    monthsHint: "Uno Sprint al mese",
    minusAria: "Un mese di sviluppo in meno",
    plusAria: "Un mese di sviluppo in più",
    careTitle: "Aggiungi Hypercare dopo il go-live",
    careBody: "Software monitorato, sicuro e aggiornato. Da 500€/mese, contratto annuale.",
    proNote:
      "Con Sprint Pro sono inclusi il pentest esterno prima del rilascio, la documentazione tecnica per DPO e legale e il CTO a tempo parziale. Posti limitati.",
    summaryTag: "Il tuo percorso",
    lineLevel: (m: number, pro: boolean, rate: string) =>
      `${m} ${m === 1 ? "mese" : "mesi"} di ${pro ? "Sprint Pro" : "Sprint"} × ${rate}`,
    linePentest: "Pentest esterno prima del rilascio",
    included: "Incluso",
    totalLabel: "Totale progetto",
    duration: (m: number) =>
      `Durata: ${m} ${m === 1 ? "mese" : "mesi"} a prezzo fisso, ${m} ${m === 1 ? "rilascio" : "rilasci"} in produzione.`,
    careLine: "Poi Hypercare dal go-live",
    carePrice: "da 500€/mese",
    iva: "Prezzi IVA esclusa. Pagamento a inizio di ogni mese.",
    cta: "Parliamone in 20 minuti",
    ctaHref: "/parliamone",
  },
  en: {
    levelLabel: "Level",
    base: "Sprint · €5,000/month",
    pro: "Sprint Pro · €8,000/month",
    monthsLabel: "Months of development",
    monthsHint: "One Sprint a month",
    minusAria: "One month of development less",
    plusAria: "One month of development more",
    careTitle: "Add Hypercare after go-live",
    careBody: "Software monitored, secure and up to date. From €500/month, annual contract.",
    proNote:
      "Sprint Pro includes the external pentest before release, the technical documentation for your DPO and legal team, and the part-time CTO. Limited slots.",
    summaryTag: "Your path",
    lineLevel: (m: number, pro: boolean, rate: string) =>
      `${m} ${m === 1 ? "month" : "months"} of ${pro ? "Sprint Pro" : "Sprint"} × ${rate}`,
    linePentest: "External pentest before release",
    included: "Included",
    totalLabel: "Project total",
    duration: (m: number) =>
      `Duration: ${m} ${m === 1 ? "month" : "months"} at a fixed price, ${m} ${m === 1 ? "release" : "releases"} in production.`,
    careLine: "Then Hypercare from go-live",
    carePrice: "from €500/month",
    iva: "Prices exclude VAT. Payment at the start of each month.",
    cta: "Let’s talk, 20 minutes",
    ctaHref: "/en/contact",
  },
} as const;

export default function PathBuilder({ lang = "it" }: { lang?: Lang }) {
  const [pro, setPro] = useState(true);
  const [months, setMonths] = useState(3);
  const [care, setCare] = useState(true);

  const C = T[lang];
  // Raggruppamento manuale delle migliaia: deterministico, non dipende dall'ICU dell'host.
  const group = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, lang === "en" ? "," : ".");
  const eur = (n: number) => (lang === "en" ? `€${group(n)}` : `${group(n)}€`);

  const rate = pro ? RATE_PRO : RATE_BASE;
  const total = months * rate;

  const levelStyle = (active: boolean): React.CSSProperties => ({
    minHeight: 44,
    padding: "10px 18px",
    borderRadius: 999,
    border: `1.5px solid ${brand}`,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    background: active ? brand : "#fff",
    color: active ? "#fff" : brand,
    transition: "background .18s, color .18s",
  });

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
      <div className="card lg:col-span-3 !p-7 md:!p-9 flex flex-col gap-8">
        <div>
          <p className="text-[15px] font-semibold mb-3" style={{ color: "var(--color-ink)" }}>{C.levelLabel}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setPro(false)} aria-pressed={!pro} style={levelStyle(!pro)}>
              {C.base}
            </button>
            <button type="button" onClick={() => setPro(true)} aria-pressed={pro} style={levelStyle(pro)}>
              {C.pro}
            </button>
          </div>
        </div>

        <div>
          <p className="text-[15px] font-semibold" style={{ color: "var(--color-ink)" }}>{C.monthsLabel}</p>
          <p className="text-[13.5px]" style={{ color: "var(--color-ink-soft)" }}>{C.monthsHint}</p>
          <div className="flex items-center gap-4 mt-3">
            <button
              type="button"
              onClick={() => setMonths((m) => Math.max(MIN_MONTHS, m - 1))}
              disabled={months <= MIN_MONTHS}
              aria-label={C.minusAria}
              style={{ ...stepStyle, opacity: months <= MIN_MONTHS ? 0.35 : 1, cursor: months <= MIN_MONTHS ? "not-allowed" : "pointer" }}
            >
              &minus;
            </button>
            <span
              className="bignum text-center"
              style={{ fontSize: "clamp(2rem, 4vw, 2.25rem)", minWidth: 40 }}
              aria-live="polite"
            >
              {months}
            </span>
            <button
              type="button"
              onClick={() => setMonths((m) => Math.min(MAX_MONTHS, m + 1))}
              disabled={months >= MAX_MONTHS}
              aria-label={C.plusAria}
              style={{ ...stepStyle, opacity: months >= MAX_MONTHS ? 0.35 : 1, cursor: months >= MAX_MONTHS ? "not-allowed" : "pointer" }}
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCare((c) => !c)}
          aria-pressed={care}
          className="text-left"
          style={{
            minHeight: 44,
            padding: "14px 18px",
            borderRadius: 14,
            border: `1.5px solid ${care ? brand : "var(--color-line-strong)"}`,
            background: care ? "var(--color-violet-50)" : "#fff",
            color: "var(--color-ink)",
            fontSize: 15,
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            transition: "border-color .18s, background .18s",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 20,
              height: 20,
              flex: "0 0 20px",
              marginTop: 2,
              borderRadius: 6,
              border: `1.5px solid ${brand}`,
              background: care ? brand : "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            {care && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </span>
          <span>
            <strong className="font-semibold">{C.careTitle}</strong>
            <br />
            <span style={{ color: "var(--color-ink-muted)" }}>{C.careBody}</span>
          </span>
        </button>

        {pro && (
          <p
            className="text-[14px] leading-relaxed text-pretty"
            style={{ background: "var(--color-violet-50)", color: brand, borderRadius: 12, padding: "14px 16px" }}
          >
            {C.proNote}
          </p>
        )}
      </div>

      {/* ===== RIEPILOGO ===== */}
      <div
        className="lg:col-span-2 rounded-[1.375rem] p-7 md:p-9 flex flex-col gap-4 bg-lines-dark"
        style={{ backgroundColor: "#1A0820", color: "#fff" }}
      >
        <p className="eyebrow eyebrow-light">{C.summaryTag}</p>

        <div className="flex justify-between gap-3 text-[15px] pb-3" style={{ borderBottom: "1px solid var(--color-line-dark)" }}>
          <span style={{ color: "rgba(255,255,255,0.72)" }}>{C.lineLevel(months, pro, eur(rate))}</span>
          <span className="font-semibold whitespace-nowrap">{eur(total)}</span>
        </div>

        {pro && (
          <div className="flex justify-between gap-3 text-[15px] pb-3" style={{ borderBottom: "1px solid var(--color-line-dark)" }}>
            <span style={{ color: "rgba(255,255,255,0.72)" }}>{C.linePentest}</span>
            <span className="font-semibold whitespace-nowrap">{C.included}</span>
          </div>
        )}

        <div className="flex justify-between items-baseline gap-3 mt-1">
          <span className="font-semibold">{C.totalLabel}</span>
          <span className="bignum" style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 2.5rem)" }} aria-live="polite">
            {eur(total)}
          </span>
        </div>
        <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.68)" }}>{C.duration(months)}</p>

        {care && (
          <div className="flex justify-between gap-3 text-[15px] pt-3" style={{ borderTop: "1px solid var(--color-line-dark)" }}>
            <span style={{ color: "rgba(255,255,255,0.72)" }}>{C.careLine}</span>
            <span className="font-semibold whitespace-nowrap">{C.carePrice}</span>
          </div>
        )}

        <p className="text-[12.5px]" style={{ color: "rgba(255,255,255,0.55)" }}>{C.iva}</p>

        <a href={C.ctaHref} className="btn !bg-white !text-violet-900 hover:!bg-violet-50 mt-auto justify-center">
          {C.cta}
        </a>
      </div>
    </div>
  );
}
