import { useState } from "react";

// Base: 45h combined = €3,000/month. Each step adds 3h and €200 (constant
// ~€66.7/h). 61 steps -> fluid slider, clean prices. step 0 = 45h/€3,000 ...
// step 60 = 225h/€15,000.
const STEPS = 61; // 0..60
const BASE_HOURS = 45;
const BASE_PRICE = 3000;
const STEP_HOURS = 3;
const STEP_PRICE = 200;
const MAX_HOURS = BASE_HOURS + (STEPS - 1) * STEP_HOURS; // 225
const brand = "#4A1E5C";

type Lang = "it" | "en";

const T = {
  it: {
    hoursShort: (h: number) => `${h} ore/mese`,
    maxLabel: `fino a ${MAX_HOURS} ore/mese`,
    sliderAria: "Ore al mese",
    perMonth: "al mese",
    hoursLineBold: (h: number) => `${h} ore al mese`,
    hoursLineRest: ", due figure dedicate sul tuo progetto.",
    badge: "Anche solo per un mese, senza vincoli di durata.",
    iva: (p: string) => `Tutti i prezzi sono IVA esclusa. Si parte da € ${p} al mese.`,
    pmTitle: "Project Manager",
    pmIntro: "Unico riferimento per tutta la fornitura. Garantisce quattro cose:",
    pmBullets: [
      ["Comunicazione", "un punto di avanzamento settimanale e un referente sempre raggiungibile"],
      ["Budget", "controllo rispetto al perimetro quotato e segnalazione preventiva di ogni scostamento"],
      ["Tempistica", "il piano a fasi, sempre aggiornato"],
      ["Qualità", "il collaudo di ogni consegna"],
    ] as [string, string][],
    pmNote: "Tiene il registro delle ore e del lavoro nella dashboard di progetto, a cui hai accesso in ogni momento, e a ogni milestone porta la consegna da verificare: il punto in cui approvi o chiedi correzioni prima di proseguire.",
    aiTitle: "AI Engineer",
    aiDesc: "Responsabile dell'intera realizzazione tecnica: modello dati e anagrafica unica, integrazioni, sviluppo della piattaforma e progettazione, orchestrazione e ottimizzazione degli agenti di intelligenza artificiale.",
    aiBullets: [
      "Progettazione e design UX/UI",
      "Sviluppo full-stack e architettura",
      "Ottimizzazione degli agenti AI: controlli sull'output, qualità documentale, meno costo di elaborazione",
      "Quality assurance e test massivi di sforzo",
      "DevOps in ambienti sicuri, deployment e rilasci in produzione controllati",
    ],
    aiNote: "L'ottimizzazione degli agenti non è un dettaglio: si mette a punto il sistema perché ometta l'informazione che non possiede anziché stimarla, e si prosegue fino al collaudo sui casi reali portati dall'uso.",
    combinedPre: "Due figure dedicate per l'intera durata del progetto, con responsabilità separate. ",
    combinedBold: (h: number) => `${h} ore al mese combinate fra le due.`,
    combinedPost: " Il ritmo mensile è indicativo: le ore non consumate si recuperano nei mesi successivi, quelle in eccesso si scontano sui mesi seguenti. Le milestone e i rilasci restano l'obbligo di risultato.",
  },
  en: {
    hoursShort: (h: number) => `${h} hrs/month`,
    maxLabel: `up to ${MAX_HOURS} hrs/month`,
    sliderAria: "Hours per month",
    perMonth: "per month",
    hoursLineBold: (h: number) => `${h} hrs/month`,
    hoursLineRest: ", two dedicated people on your project.",
    badge: "Even for a single month, no lock-in.",
    iva: (p: string) => `All prices exclude VAT. Starting at € ${p}/month.`,
    pmTitle: "Project Manager",
    pmIntro: "Your single point of contact for the whole engagement. It guarantees four things:",
    pmBullets: [
      ["Communication", "a weekly progress check-in and someone always reachable"],
      ["Budget", "control against the quoted scope and an early warning on any deviation"],
      ["Timeline", "the phased plan, always up to date"],
      ["Quality", "sign-off on every delivery"],
    ] as [string, string][],
    pmNote: "Keeps the record of hours and work in the project dashboard, which you can access at any time, and at each milestone brings the delivery to review: the point where you approve or request changes before moving on.",
    aiTitle: "AI Engineer",
    aiDesc: "Responsible for the entire technical build: data model and single source of truth, integrations, platform development and design, orchestration and optimisation of the AI agents.",
    aiBullets: [
      "UX/UI design",
      "Full-stack development and architecture",
      "AI agent optimisation: output checks, document quality, lower processing cost",
      "Quality assurance and heavy load testing",
      "DevOps in secure environments, controlled deployment and production releases",
    ],
    aiNote: "Agent optimisation is not a side detail: the system is tuned to omit the information it does not have rather than guess it, and it is refined until it is validated on the real cases that come up in use.",
    combinedPre: "Two dedicated people for the whole duration of the project, with separate responsibilities. ",
    combinedBold: (h: number) => `${h} hrs/month combined across the two.`,
    combinedPost: " The monthly pace is indicative: unused hours roll forward to later months, excess hours are discounted on the following ones. Milestones and releases remain the obligation of result.",
  },
} as const;

export default function PricingCalculator({ lang = "it" }: { lang?: Lang }) {
  const [step, setStep] = useState(0);
  const hours = BASE_HOURS + step * STEP_HOURS;
  const price = BASE_PRICE + step * STEP_PRICE;
  const pct = (step / (STEPS - 1)) * 100;
  const C = T[lang];
  const fmt = (n: number) => n.toLocaleString(lang === "en" ? "en-US" : "it-IT");

  return (
    <div>
      {/* TWO ROLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Project Manager */}
        <div className="card !p-7 md:!p-8 flex flex-col">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex w-11 h-11 rounded-full items-center justify-center mb-4" style={{ background: "var(--color-violet-50, #F5EEF7)", color: brand }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
            </span>
            <p style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.2, color: brand }}>{C.pmTitle}</p>
          </div>
          <p className="mt-4 text-[14.5px] leading-relaxed text-pretty" style={{ color: "var(--color-ink-muted)" }}>
            {C.pmIntro}
          </p>
          <ul className="mt-4 space-y-2.5">
            {C.pmBullets.map(([k, v]) => (
              <li key={k} className="flex items-start gap-2.5 text-[14px]" style={{ color: "var(--color-ink)" }}>
                <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center" style={{ background: "var(--color-violet-50, #F5EEF7)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
                <span><b>{k}:</b> {v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] leading-relaxed text-pretty" style={{ color: "var(--color-ink-muted)" }}>
            {C.pmNote}
          </p>
        </div>

        {/* AI Engineer */}
        <div className="card !p-7 md:!p-8 flex flex-col">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex w-11 h-11 rounded-full items-center justify-center mb-4" style={{ background: "var(--color-violet-50, #F5EEF7)", color: brand }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 8l-4 4 4 4"/><path d="M17 8l4 4-4 4"/><path d="M14 4l-4 16"/></svg>
            </span>
            <p style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.2, color: brand }}>{C.aiTitle}</p>
          </div>
          <p className="mt-4 text-[14.5px] leading-relaxed text-pretty" style={{ color: "var(--color-ink-muted)" }}>
            {C.aiDesc}
          </p>
          <ul className="mt-4 space-y-2.5">
            {C.aiBullets.map((v) => (
              <li key={v} className="flex items-start gap-2.5 text-[14px]" style={{ color: "var(--color-ink)" }}>
                <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center" style={{ background: "var(--color-violet-50, #F5EEF7)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] leading-relaxed text-pretty" style={{ color: "var(--color-ink-muted)" }}>
            {C.aiNote}
          </p>
        </div>
      </div>

      {/* COMBINED NOTE */}
      <div className="mt-8 rounded-2xl border border-line p-6 md:p-7 max-w-3xl mx-auto" style={{ background: "#FAFAF8" }}>
        <p className="text-[15px] leading-relaxed text-pretty" style={{ color: "var(--color-ink)" }}>
          {C.combinedPre}<b>{C.combinedBold(hours)}</b>{C.combinedPost}
        </p>
      </div>

      {/* SLIDER */}
      <div className="max-w-2xl mx-auto mt-14">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[13px] font-medium" style={{ color: "var(--color-ink-soft)" }}>{C.hoursShort(hours)}</span>
          <span className="text-[13px] font-medium" style={{ color: "var(--color-ink-soft)" }}>{C.maxLabel}</span>
        </div>
        <input
          type="range" min={0} max={STEPS - 1} step={1} value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          aria-label={C.sliderAria}
          className="pricing-range"
          style={{ backgroundImage: `linear-gradient(to right, ${brand} 0%, #a855f7 ${pct}%, #E7E4DF ${pct}%, #E7E4DF 100%)` }}
        />
      </div>

      {/* PRICE */}
      <div className="text-center mt-10">
        <div className="flex items-baseline justify-center gap-2">
          <span style={{ fontSize: "clamp(2.75rem, 6vw, 4rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
            € {fmt(price)}
          </span>
          <span className="text-[15px]" style={{ color: "var(--color-ink-soft)" }}>{C.perMonth}</span>
        </div>
        <p className="mt-3 text-[15px]" style={{ color: "var(--color-ink)" }}><b>{C.hoursLineBold(hours)}</b>{C.hoursLineRest}</p>
        <div className="mt-5 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5" style={{ background: "var(--color-violet-50, #F5EEF7)", border: "1px solid var(--color-violet-200, #E9D5F0)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          <span className="text-[14px] font-semibold" style={{ color: brand }}>{C.badge}</span>
        </div>
        <p className="mt-4 text-[12.5px]" style={{ color: "var(--color-ink-soft)" }}>{C.iva(fmt(BASE_PRICE))}</p>
      </div>
    </div>
  );
}
