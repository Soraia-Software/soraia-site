import { useState } from "react";

// Base: 45 ore combinate = 3.000 euro/mese, split 80% AI Engineer / 20% Project Manager.
// Ogni step aggiunge 15 ore (12 AI + 3 PM) e 1.000 euro. Numeri sempre interi.
const STEPS = 10; // 0..9  -> 45h/3.000 ... 180h/12.000
const BASE_HOURS = 45;
const BASE_PRICE = 3000;
const STEP_HOURS = 15;
const STEP_PRICE = 1000;
const brand = "#4A1E5C";

const fmt = (n: number) => n.toLocaleString("it-IT");

export default function PricingCalculator() {
  const [step, setStep] = useState(0);
  const hours = BASE_HOURS + step * STEP_HOURS;
  const price = BASE_PRICE + step * STEP_PRICE;
  const pct = (step / (STEPS - 1)) * 100;

  return (
    <div>
      {/* SLIDER */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[13px] font-medium" style={{ color: "var(--color-ink-soft)" }}>{hours} ore/mese</span>
          <span className="text-[13px] font-medium" style={{ color: "var(--color-ink-soft)" }}>fino a 180 ore/mese</span>
        </div>
        <input
          type="range" min={0} max={STEPS - 1} step={1} value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          aria-label="Ore al mese"
          className="pricing-range"
          style={{ background: `linear-gradient(to right, ${brand} 0%, #a855f7 ${pct}%, #E7E4DF ${pct}%, #E7E4DF 100%)` }}
        />
      </div>

      {/* PRICE */}
      <div className="text-center mt-10">
        <div className="flex items-baseline justify-center gap-2">
          <span style={{ fontSize: "clamp(2.75rem, 6vw, 4rem)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>
            € {fmt(price)}
          </span>
          <span className="text-[15px]" style={{ color: "var(--color-ink-soft)" }}>al mese</span>
        </div>
        <p className="mt-3 text-[15px]" style={{ color: "var(--color-ink)" }}><b>{hours} ore al mese</b>, due figure dedicate sul tuo progetto.</p>
        <div className="mt-5 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5" style={{ background: "var(--color-violet-50, #F5EEF7)", border: "1px solid var(--color-violet-200, #E9D5F0)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
          <span className="text-[14px] font-semibold" style={{ color: brand }}>Anche solo per un mese, senza vincoli di durata.</span>
        </div>
        <p className="mt-4 text-[12.5px]" style={{ color: "var(--color-ink-soft)" }}>Tutti i prezzi sono IVA esclusa. Si parte da € 3.000 al mese.</p>
      </div>

      {/* TWO ROLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
        {/* Project Manager */}
        <div className="card !p-7 md:!p-8 flex flex-col">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex w-11 h-11 rounded-full items-center justify-center mb-4" style={{ background: "var(--color-violet-50, #F5EEF7)", color: brand }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="M22 4 12 14.01l-3-3"/></svg>
            </span>
            <p style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.2, color: brand }}>Project Manager</p>
          </div>
          <p className="mt-4 text-[14.5px] leading-relaxed text-pretty" style={{ color: "var(--color-ink-muted)" }}>
            Unico riferimento per tutta la fornitura. Garantisce quattro cose:
          </p>
          <ul className="mt-4 space-y-2.5">
            {[
              ["Comunicazione", "un punto di avanzamento settimanale e un referente sempre raggiungibile"],
              ["Budget", "controllo rispetto al perimetro quotato e segnalazione preventiva di ogni scostamento"],
              ["Tempistica", "il piano a fasi, sempre aggiornato"],
              ["Qualità", "il collaudo di ogni consegna"],
            ].map(([k, v]) => (
              <li key={k} className="flex items-start gap-2.5 text-[14px]" style={{ color: "var(--color-ink)" }}>
                <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center" style={{ background: "var(--color-violet-50, #F5EEF7)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
                <span><b>{k}:</b> {v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] leading-relaxed text-pretty" style={{ color: "var(--color-ink-muted)" }}>
            Tiene il registro delle ore e del lavoro nella dashboard di progetto, a cui hai accesso in ogni momento, e a ogni milestone porta la consegna da verificare: il punto in cui approvi o chiedi correzioni prima di proseguire.
          </p>
        </div>

        {/* AI Engineer */}
        <div className="card !p-7 md:!p-8 flex flex-col">
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex w-11 h-11 rounded-full items-center justify-center mb-4" style={{ background: "var(--color-violet-50, #F5EEF7)", color: brand }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M7 8l-4 4 4 4"/><path d="M17 8l4 4-4 4"/><path d="M14 4l-4 16"/></svg>
            </span>
            <p style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.2, color: brand }}>AI Engineer</p>
          </div>
          <p className="mt-4 text-[14.5px] leading-relaxed text-pretty" style={{ color: "var(--color-ink-muted)" }}>
            Responsabile dell'intera realizzazione tecnica: modello dati e anagrafica unica, integrazioni, sviluppo della piattaforma e progettazione, orchestrazione e ottimizzazione degli agenti di intelligenza artificiale.
          </p>
          <ul className="mt-4 space-y-2.5">
            {[
              "Progettazione e design UX/UI",
              "Sviluppo full-stack e architettura",
              "Ottimizzazione degli agenti AI: controlli sull'output, qualità documentale, meno costo di elaborazione",
              "Quality assurance e test massivi di sforzo",
              "DevOps in ambienti sicuri, deployment e rilasci in produzione controllati",
            ].map((v) => (
              <li key={v} className="flex items-start gap-2.5 text-[14px]" style={{ color: "var(--color-ink)" }}>
                <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full flex items-center justify-center" style={{ background: "var(--color-violet-50, #F5EEF7)" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={brand} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] leading-relaxed text-pretty" style={{ color: "var(--color-ink-muted)" }}>
            L'ottimizzazione degli agenti non è un dettaglio: si mette a punto il sistema perché ometta l'informazione che non possiede anziché stimarla, e si prosegue fino al collaudo sui casi reali portati dall'uso.
          </p>
        </div>
      </div>

      {/* COMBINED NOTE */}
      <div className="mt-8 rounded-2xl border border-line p-6 md:p-7 max-w-3xl mx-auto" style={{ background: "#FAFAF8" }}>
        <p className="text-[15px] leading-relaxed text-pretty" style={{ color: "var(--color-ink)" }}>
          Due figure dedicate per l'intera durata del progetto, con responsabilità separate. <b>{hours} ore al mese combinate fra le due.</b> Il ritmo mensile è indicativo: le ore non consumate si recuperano nei mesi successivi, quelle in eccesso si scontano sui mesi seguenti. Le milestone e i rilasci restano l'obbligo di risultato.
        </p>
      </div>
    </div>
  );
}
