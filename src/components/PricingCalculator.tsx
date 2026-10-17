import { useState } from "react";

// Due modelli:
//  - a pacchetti di ore: 43h/mese = 3.000€, 70€ per ora aggiuntiva.
//  - a corpo: rilascio a prezzo fisso, da 3.000€.
const BASE_HOURS = 43;
const BASE_PRICE = 3000;
const RATE = 70; // € per ora aggiuntiva
const MAX_HOURS = 200;
const brand = "#4A1E5C";

type Lang = "it" | "en";
type Mode = "ore" | "corpo";

const T = {
  it: {
    toggleOre: "A pacchetti di ore",
    toggleCorpo: "A corpo, prezzo fisso",
    oreTag: "Compri le ore",
    oreLead: "Compri un pacchetto di ore al mese e vedi esattamente cosa produciamo nelle ore che ti allochiamo. Due figure dedicate: Project Manager e AI Engineer.",
    hoursLabel: (h: number) => `${h} ore al mese`,
    maxLabel: `fino a ${MAX_HOURS} ore al mese`,
    sliderAria: "Ore al mese",
    perMonth: "al mese",
    oreLine: (h: number) => `${h} ore al mese, due figure dedicate sul tuo progetto.`,
    badge: "Anche solo per un mese, senza vincoli di durata.",
    oreMin: "Pacchetto minimo: 43 ore, 3.000€ al mese.",
    corpoTag: "Compri il risultato",
    corpoTitle: "Un rilascio preciso, a prezzo fisso.",
    corpoLead: "Concordiamo insieme un rilascio chiaro e lavoriamo a sprint fino a raggiungerlo. Paghi il risultato approvato, non le ore: il modo migliore per vedere quanto siamo veloci.",
    corpoFrom: "da",
    corpoPrice: "3.000€",
    corpoPriceNote: "per un primo rilascio chiaro",
    corpoPoints: [
      "Lo scope del rilascio si concorda prima di partire",
      "Avanzamento tracciato nella dashboard in tempo reale",
      "I rilasci successivi si quotano a corpo, uno alla volta",
    ],
    guaranteeTitle: "Primo mese soddisfatti o rimborsati",
    guarantee: "Se il primo mese non ti convince, ti rimborsiamo. In alternativa lavoriamo gratis finché non sei soddisfatto.",
    trackTitle: "Tutto tracciato, in tempo reale",
    track: "Si lavora a sprint, con metodo iterativo. Ogni ora e ogni attività sono registrate nella dashboard a cui hai accesso: chi, quando e cosa ha fatto, oltre al lavoro in corso.",
    trackCorpoTitle: "Avanzamento in tempo reale",
    trackCorpo: "Si lavora a sprint, con metodo iterativo. Nella dashboard vedi l'avanzamento del progetto e il lavoro in corso in tempo reale, rilascio per rilascio.",
    iva: "Tutti i prezzi sono IVA esclusa.",
  },
  en: {
    toggleOre: "Hour packages",
    toggleCorpo: "Fixed price",
    oreTag: "Buy the hours",
    oreLead: "Buy a package of hours per month and see exactly what we ship in the hours we allocate to you. Two dedicated people: a Project Manager and an AI Engineer.",
    hoursLabel: (h: number) => `${h} hrs/month`,
    maxLabel: `up to ${MAX_HOURS} hrs/month`,
    sliderAria: "Hours per month",
    perMonth: "per month",
    oreLine: (h: number) => `${h} hours a month, two dedicated people on your project.`,
    badge: "Even for a single month, no lock-in.",
    oreMin: "Minimum package: 43 hours, €3,000 per month.",
    corpoTag: "Buy the outcome",
    corpoTitle: "A precise release, at a fixed price.",
    corpoLead: "We agree on a clear release and work in sprints until we reach it. You pay for the approved result, not the hours: the best way to see how fast we are.",
    corpoFrom: "from",
    corpoPrice: "€3,000",
    corpoPriceNote: "for a first clear release",
    corpoPoints: [
      "The release scope is agreed before we start",
      "Progress tracked in the dashboard in real time",
      "Later releases are quoted fixed-price, one at a time",
    ],
    guaranteeTitle: "First month, satisfied or refunded",
    guarantee: "If the first month doesn't convince you, we refund it. Or we work for free until you're satisfied.",
    trackTitle: "Everything tracked, in real time",
    track: "We work in sprints, iteratively. Every hour and every task is logged in the dashboard you have access to: who did what and when, plus the work in progress.",
    trackCorpoTitle: "Progress in real time",
    trackCorpo: "We work in sprints, iteratively. In the dashboard you see the project's progress and the work in progress in real time, release by release.",
    iva: "All prices exclude VAT.",
  },
} as const;

export default function PricingCalculator({ lang = "it" }: { lang?: Lang }) {
  const [mode, setMode] = useState<Mode>("ore");
  const [hours, setHours] = useState(BASE_HOURS);
  const price = BASE_PRICE + (hours - BASE_HOURS) * RATE;
  const pct = ((hours - BASE_HOURS) / (MAX_HOURS - BASE_HOURS)) * 100;
  const C = T[lang];
  const fmt = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, lang === "en" ? "," : ".");

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: "11px 18px", borderRadius: 999, border: "none", cursor: "pointer",
    fontSize: 15, fontWeight: 600, lineHeight: 1,
    background: active ? brand : "transparent",
    color: active ? "#fff" : "var(--color-ink-muted)",
    transition: "background .18s, color .18s",
  });

  return (
    <div className="max-w-3xl mx-auto">
      {/* MODE TOGGLE */}
      <div className="mx-auto mb-8 flex gap-1.5 p-1.5 rounded-full" style={{ maxWidth: 440, background: "var(--color-ink-100, #F2F1ED)", border: "1px solid var(--color-line)" }}>
        <button type="button" onClick={() => setMode("ore")} aria-pressed={mode === "ore"} style={tabStyle(mode === "ore")}>{C.toggleOre}</button>
        <button type="button" onClick={() => setMode("corpo")} aria-pressed={mode === "corpo"} style={tabStyle(mode === "corpo")}>{C.toggleCorpo}</button>
      </div>

      {mode === "ore" ? (
        /* ===== A PACCHETTI DI ORE ===== */
        <div className="card !p-7 md:!p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: brand }}>{C.oreTag}</p>
          <p className="text-[16px] leading-relaxed text-pretty mb-8" style={{ color: "var(--color-ink-muted)", maxWidth: "56ch" }}>{C.oreLead}</p>

          <div className="flex items-baseline justify-between mb-3">
            <span className="text-[13px] font-medium" style={{ color: "var(--color-ink-soft)" }}>{C.hoursLabel(hours)}</span>
            <span className="text-[13px] font-medium" style={{ color: "var(--color-ink-soft)" }}>{C.maxLabel}</span>
          </div>
          <input
            type="range" min={BASE_HOURS} max={MAX_HOURS} step={1} value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            aria-label={C.sliderAria}
            className="pricing-range"
            style={{ backgroundImage: `linear-gradient(to right, ${brand} 0%, #a855f7 ${pct}%, #E7E4DF ${pct}%, #E7E4DF 100%)` }}
          />

          <div className="text-center mt-9">
            <div className="flex items-baseline justify-center gap-2">
              <span style={{ fontSize: "clamp(2.75rem, 6vw, 4rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>€ {fmt(price)}</span>
              <span className="text-[15px]" style={{ color: "var(--color-ink-soft)" }}>{C.perMonth}</span>
            </div>
            <p className="mt-3 text-[15px]" style={{ color: "var(--color-ink)" }}>{C.oreLine(hours)}</p>
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5" style={{ background: "var(--color-violet-50, #F5EEF7)", border: "1px solid var(--color-violet-200, #E9D5F0)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              <span className="text-[14px] font-semibold" style={{ color: brand }}>{C.badge}</span>
            </div>
            <p className="mt-4 text-[12.5px]" style={{ color: "var(--color-ink-soft)" }}>{C.oreMin}</p>
          </div>
        </div>
      ) : (
        /* ===== A CORPO ===== */
        <div className="card !p-7 md:!p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-3" style={{ color: brand }}>{C.corpoTag}</p>
          <h3 className="font-semibold tracking-tight mb-3" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "var(--color-ink)" }}>{C.corpoTitle}</h3>
          <p className="text-[16px] leading-relaxed text-pretty mb-7" style={{ color: "var(--color-ink-muted)", maxWidth: "58ch" }}>{C.corpoLead}</p>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-[15px]" style={{ color: "var(--color-ink-soft)" }}>{C.corpoFrom}</span>
            <span style={{ fontSize: "clamp(2.5rem, 5.5vw, 3.5rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>{C.corpoPrice}</span>
            <span className="text-[15px]" style={{ color: "var(--color-ink-soft)" }}>{C.corpoPriceNote}</span>
          </div>

          <ul className="space-y-3">
            {C.corpoPoints.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[15px]" style={{ color: "var(--color-ink)" }}>
                <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center" style={{ background: "var(--color-violet-50, #F5EEF7)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* GARANZIA + TRACCIABILITÀ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="rounded-2xl p-6" style={{ background: brand, color: "#fff" }}>
          <div className="flex items-center gap-2.5 mb-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4B842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/></svg>
            <strong className="text-[16px] font-semibold">{C.guaranteeTitle}</strong>
          </div>
          <p className="text-[14.5px] leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>{C.guarantee}</p>
        </div>
        <div className="rounded-2xl p-6 border border-line" style={{ background: "#FAFAF8" }}>
          <div className="flex items-center gap-2.5 mb-2.5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>
            <strong className="text-[16px] font-semibold" style={{ color: "var(--color-ink)" }}>{mode === "corpo" ? C.trackCorpoTitle : C.trackTitle}</strong>
          </div>
          <p className="text-[14.5px] leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>{mode === "corpo" ? C.trackCorpo : C.track}</p>
        </div>
      </div>

      <p className="text-center mt-6 text-[12.5px]" style={{ color: "var(--color-ink-soft)" }}>{C.iva}</p>
    </div>
  );
}
