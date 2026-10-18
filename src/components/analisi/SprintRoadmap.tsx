/* Montagna + timeline sprint + riordino priorità, riutilizzabile.
   Usa i token globali del sito (niente dipendenze da analisi.css) così gira
   anche su /ai-engineering e /en/ai-engineering. Roadmap ed etichette arrivano
   da getDeckData(lang), la stessa fonte del deck /analisi-processi. */
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { getDeckData, type DeckLang } from "./data";

const STEP_POS = [
  { x: 110, y: 232 },
  { x: 390, y: 176 },
  { x: 650, y: 120 },
  { x: 880, y: 70 },
];
const BRAND = "var(--color-brand)";
const ACCENT = "var(--color-brand-accent)";

export default function SprintRoadmap({ lang = "it" }: { lang?: DeckLang }) {
  const [revised, setRevised] = useState(false);
  const reduce = useReducedMotion();
  const { roadmap, ui } = getDeckData(lang);
  const list = revised ? roadmap.revised : roadmap.planned;

  return (
    <div>
      <div style={{ position: "relative", width: "100%", maxWidth: 1000, margin: "0 auto" }}>
        <svg viewBox="0 0 1000 300" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
          <defs>
            <linearGradient id="se-mtn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#efe2f3" />
              <stop offset="1" stopColor="#f8f3fa" />
            </linearGradient>
          </defs>
          <path d="M0 290 L150 210 L300 240 L470 150 L640 185 L820 80 L1000 120 L1000 300 L0 300 Z" fill="url(#se-mtn)" />
          <path d="M0 290 L150 210 L300 240 L470 150 L640 185 L820 80 L1000 120" fill="none" stroke="rgba(137,45,156,0.3)" strokeWidth="2" />
          <motion.path d={`M ${STEP_POS.map((p) => `${p.x} ${p.y}`).join(" L ")} L 930 46`}
            fill="none" stroke={ACCENT} strokeWidth="2.5" strokeDasharray="7 7"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.1, ease: "easeInOut" }} />
          <g>
            <line x1="930" y1="46" x2="930" y2="16" stroke={BRAND} strokeWidth="2.5" />
            <path d="M930 18 L958 25 L930 32 Z" fill={ACCENT} />
          </g>
        </svg>

        {roadmap.steps.map((s, i) => {
          const p = STEP_POS[i];
          return (
            <motion.div key={s.id}
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.3 + i * 0.22, type: "spring", stiffness: 260, damping: 20 }}
              style={{ position: "absolute", left: `${p.x / 1000 * 100}%`, top: `${p.y / 300 * 100}%`, transform: "translate(-50%,-50%)", textAlign: "center", width: 150 }}>
              <span style={{ display: "inline-block", width: 15, height: 15, borderRadius: 999, background: i === 0 ? BRAND : ACCENT, boxShadow: "0 0 0 4px rgba(255,255,255,0.9)" }} />
              <div style={{ fontSize: "clamp(13px,1.1vw,16px)", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-ink)", marginTop: 4, lineHeight: 1.1 }}>{s.label}</div>
              <div style={{ fontSize: "clamp(10px,0.85vw,12px)", color: "var(--color-ink-soft)", lineHeight: 1.15 }}>{s.note}</div>
            </motion.div>
          );
        })}
        <span style={{ position: "absolute", left: "88%", top: "2%", fontSize: "clamp(11px,0.9vw,13px)", fontWeight: 600, color: "var(--color-ink)", width: 120, lineHeight: 1.15 }}>
          {ui.goal}
        </span>
      </div>

      <p style={{ maxWidth: "62ch", margin: "clamp(1.5rem,3vh,2.25rem) auto 0", textAlign: "center", fontSize: "clamp(1.0625rem,1.3vw,1.25rem)", lineHeight: 1.6, color: "var(--color-ink-muted)" }}>
        {roadmap.mountainCaption}
      </p>

      <div className="card" style={{ marginTop: 20, padding: "18px 20px", maxWidth: 760, marginInline: "auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <strong style={{ fontSize: "clamp(15px,1.2vw,18px)", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-ink)" }}>
            {revised ? ui.revised : ui.planned}
          </strong>
          <button type="button" onClick={() => setRevised((v) => !v)} aria-pressed={revised}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600, lineHeight: 1,
              padding: "10px 16px", borderRadius: 999, border: `1.5px solid ${BRAND}`,
              background: revised ? BRAND : "transparent", color: revised ? "#fff" : BRAND,
              cursor: "pointer", transition: "background .18s, color .18s",
            }}>
            <span style={{ width: 16, height: 16, borderRadius: 999, flex: "0 0 auto", border: `2px solid ${revised ? "transparent" : BRAND}`, background: revised ? "#fff" : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {revised && <span style={{ width: 7, height: 7, borderRadius: 999, background: BRAND }} />}
            </span>
            {ui.toggle}
          </button>
        </div>
        <LayoutGroup>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <AnimatePresence>
              {list.map((item) => (
                <motion.div key={item.id} layout layoutId={"se-plan-" + item.id}
                  initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 14 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(74,30,92,0.045)", borderRadius: 12, padding: "11px 14px" }}>
                  <span style={{ width: 26, height: 26, borderRadius: 8, background: BRAND, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, flex: "0 0 auto" }}>{item.id}</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "var(--color-ink)" }}>{item.label}</span>
                  {"tag" in item && item.tag && (
                    <span style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 700, color: ACCENT, background: "var(--color-brand-soft, #FDF4FF)", borderRadius: 999, padding: "3px 10px" }}>{item.tag}</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
