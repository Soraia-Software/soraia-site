/* Sezione 7, matrice delle priorità: 4 quadranti, bolle a comparsa, dettaglio nel pannello laterale. */
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MATRIX, MATRIX_NOTE, type Bubble } from "./data";

function BubbleDot({ b, selected, onClick }: { b: Bubble; selected: boolean; onClick: () => void }) {
  const color = b.type === "IA" ? "var(--ap-accent)" : "var(--ap-purple-700)";
  const alignRight = b.x > 60;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1 } }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        position: "absolute", left: `${b.x}%`, top: `${b.y}%`, transform: "translate(-50%,-50%)",
        display: "flex", flexDirection: alignRight ? "row-reverse" : "row", alignItems: "center", gap: 7,
        background: "none", border: 0, cursor: "pointer", zIndex: selected ? 6 : 3,
      }}
    >
      <span style={{
        width: 19, height: 19, borderRadius: 999, background: color, flex: "0 0 auto",
        boxShadow: selected ? `0 0 0 5px ${b.type === "IA" ? "rgba(137,45,156,0.25)" : "rgba(74,30,92,0.22)"}` : "0 4px 10px -4px rgba(63,21,72,0.6)",
        transition: "box-shadow .2s",
      }} />
      <span style={{
        fontSize: "clamp(11px,0.95vw,13.5px)", fontWeight: 600, lineHeight: 1.1, color: "var(--ap-ink)",
        background: "rgba(255,255,255,0.9)", borderRadius: 6, padding: "2px 6px", boxShadow: "0 1px 4px rgba(63,21,72,0.12)",
        maxWidth: 132, textAlign: alignRight ? "right" : "left",
      }}>{b.label}</span>
    </motion.button>
  );
}

export default function PriorityMatrix() {
  const [sel, setSel] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const selected = MATRIX.find((b) => b.id === sel) || null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 18 }}>
      <div className="ap-matrix-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 288px", gap: 20, alignItems: "start" }}>
        {/* chart */}
        <div style={{ position: "relative", paddingLeft: 30, paddingBottom: 28 }}>
          <div style={{ position: "absolute", left: -4, top: "48%", transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "center",
            fontSize: 12.5, fontWeight: 700, color: "var(--ap-ink-soft)", whiteSpace: "nowrap" }}>Sforzo di sviluppo</div>
          <span style={{ position: "absolute", left: 16, top: 6, fontSize: 11, fontWeight: 600, color: "var(--ap-ink-soft)", background: "rgba(252,251,253,0.85)", padding: "0 3px" }}>moderato</span>
          <span style={{ position: "absolute", left: 16, bottom: 58, fontSize: 11, fontWeight: 600, color: "var(--ap-ink-soft)", background: "rgba(252,251,253,0.85)", padding: "0 3px" }}>elevato</span>

          <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: 16,
            border: "1px solid rgba(63,21,72,0.12)", background: "#fff", boxShadow: "0 12px 34px -20px rgba(63,21,72,0.3)" }}>
            <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ background: "rgba(63,21,72,0.015)" }} />
              <div style={{ background: "var(--ap-viola-bg)", position: "relative" }}>
                <span className="ap-head" style={{ position: "absolute", top: 10, right: 14, fontSize: "clamp(12px,1vw,15px)", color: "var(--ap-purple)", fontWeight: 700 }}>Da qui si parte</span>
              </div>
              <div style={{ background: "rgba(63,21,72,0.015)" }} />
              <div style={{ background: "rgba(63,21,72,0.03)" }} />
            </div>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(63,21,72,0.18)" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(63,21,72,0.18)" }} />

            <motion.div style={{ position: "absolute", inset: 0 }}
              initial={reduce ? "show" : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.4 }}
              variants={{ show: { transition: { staggerChildren: 0.15 } } }}>
              {MATRIX.map((b) => (
                <BubbleDot key={b.id} b={b} selected={sel === b.id} onClick={() => setSel(sel === b.id ? null : b.id)} />
              ))}
            </motion.div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12.5, fontWeight: 600, color: "var(--ap-ink-soft)" }}>
            <span>Impatto basso</span>
            <span style={{ fontWeight: 700 }}>Impatto →</span>
            <span>Impatto alto</span>
          </div>
        </div>

        {/* pannello dettaglio */}
        <div className="ap-card" style={{ padding: "18px 18px 20px", minHeight: 220, alignSelf: "stretch" }}>
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <strong className="ap-head" style={{ fontSize: 19, color: "var(--ap-purple)", lineHeight: 1.15, display: "block", marginBottom: 10 }}>{selected.label}</strong>
                <p style={{ fontSize: 15, lineHeight: 1.45, color: "var(--ap-ink)", margin: "0 0 12px" }}>{selected.problem}</p>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ap-ink-soft)", marginBottom: 6 }}>Reparti coinvolti</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {selected.departments.map((d) => (
                    <span key={d} style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ap-ink-soft)", background: "rgba(63,21,72,0.06)", borderRadius: 999, padding: "3px 10px" }}>{d}</span>
                  ))}
                </div>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700,
                  color: selected.type === "IA" ? "var(--ap-accent)" : "var(--ap-purple)",
                  background: selected.type === "IA" ? "var(--ap-viola-bg)" : "rgba(74,30,92,0.08)",
                  borderRadius: 999, padding: "4px 12px",
                }}>{selected.type === "IA" ? "Soluzione con IA" : "Automazione semplice"}</span>
              </motion.div>
            ) : (
              <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 14, fontWeight: 600, color: "var(--ap-ink)" }}>
                    <span style={{ width: 16, height: 16, borderRadius: 999, background: "var(--ap-purple-700)" }} /> Automazione semplice
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 14, fontWeight: 600, color: "var(--ap-ink)" }}>
                    <span style={{ width: 16, height: 16, borderRadius: 999, background: "var(--ap-accent)" }} /> Soluzione con IA
                  </span>
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.45, color: "var(--ap-ink-soft)", margin: 0 }}>
                  Clicca una bolla per vedere il problema che risolve, i reparti coinvolti e il tipo di soluzione.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="ap-lead" style={{ maxWidth: "64ch" }}>{MATRIX_NOTE}</p>
    </div>
  );
}
