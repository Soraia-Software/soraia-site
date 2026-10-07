/* Sezione 8, piano d'azione + percorso di sviluppo (timeline sprint, montagna, riordino). */
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ACTION_CARDS, ROADMAP } from "./data";
import { Icon, RevealButton } from "./shared";

const STEP_POS = [
  { x: 110, y: 232 },
  { x: 390, y: 176 },
  { x: 650, y: 120 },
  { x: 880, y: 70 },
];

export default function ActionPlan() {
  const [revised, setRevised] = useState(false);
  const reduce = useReducedMotion();
  const list = revised ? ROADMAP.revised : ROADMAP.planned;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.75rem, 4vh, 3rem)" }}>
      {/* PARTE A, 3 card numerate */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {ACTION_CARDS.map((c) => (
          <motion.div key={c.n} className="ap-card"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.45, delay: c.n * 0.08 }}
            style={{ padding: "22px 22px 24px" }}>
            <div className="ap-head" style={{ fontSize: 44, color: "var(--ap-viola-bd)", lineHeight: 1 }}>{c.n}</div>
            <h3 className="ap-head" style={{ fontSize: "clamp(18px,1.5vw,22px)", color: "var(--color-ink)", margin: "6px 0 8px" }}>{c.title}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.45, color: "var(--ap-ink-soft)", margin: 0 }}>{c.goal}</p>
          </motion.div>
        ))}
      </div>

      {/* PARTE B, montagna + timeline sprint */}
      <div>
        <div style={{ position: "relative", width: "100%", maxWidth: 1000, margin: "0 auto" }}>
          <svg viewBox="0 0 1000 300" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden="true">
            <defs>
              <linearGradient id="ap-mtn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#efe2f3" />
                <stop offset="1" stopColor="#f8f3fa" />
              </linearGradient>
            </defs>
            {/* silhouette montagna che sale verso destra */}
            <path d="M0 290 L150 210 L300 240 L470 150 L640 185 L820 80 L1000 120 L1000 300 L0 300 Z" fill="url(#ap-mtn)" />
            <path d="M0 290 L150 210 L300 240 L470 150 L640 185 L820 80 L1000 120" fill="none" stroke="rgba(137,45,156,0.3)" strokeWidth="2" />
            {/* percorso a tappe */}
            <motion.path d={`M ${STEP_POS.map((p) => `${p.x} ${p.y}`).join(" L ")} L 930 46`}
              fill="none" stroke="var(--ap-accent)" strokeWidth="2.5" strokeDasharray="7 7"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }} whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.1, ease: "easeInOut" }} />
            {/* bandiera in cima */}
            <g>
              <line x1="930" y1="46" x2="930" y2="16" stroke="var(--ap-purple)" strokeWidth="2.5" />
              <path d="M930 18 L958 25 L930 32 Z" fill="var(--ap-accent)" />
            </g>
          </svg>

          {/* marker tappe (HTML, posizionati in % dello stesso viewBox 1000x300) */}
          {ROADMAP.steps.map((s, i) => {
            const p = STEP_POS[i];
            return (
              <motion.div key={s.id}
                initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.3 + i * 0.22, type: "spring", stiffness: 260, damping: 20 }}
                style={{ position: "absolute", left: `${p.x / 1000 * 100}%`, top: `${p.y / 300 * 100}%`, transform: "translate(-50%,-50%)", textAlign: "center", width: 150 }}>
                <span style={{ display: "inline-block", width: 15, height: 15, borderRadius: 999, background: i === 0 ? "var(--ap-purple)" : "var(--ap-accent)", boxShadow: "0 0 0 4px rgba(255,255,255,0.9)" }} />
                <div className="ap-head" style={{ fontSize: "clamp(13px,1.1vw,16px)", color: "var(--color-ink)", marginTop: 4, lineHeight: 1.1 }}>{s.label}</div>
                <div style={{ fontSize: "clamp(10px,0.85vw,12px)", color: "var(--ap-ink-soft)", lineHeight: 1.15 }}>{s.note}</div>
              </motion.div>
            );
          })}
          <span className="ap-head" style={{ position: "absolute", left: "88%", top: "2%", fontSize: "clamp(11px,0.9vw,13px)", color: "var(--color-ink)", width: 120, lineHeight: 1.15 }}>
            Obiettivo: lo strumento completo
          </span>
        </div>

        <p className="ap-lead" style={{ maxWidth: "62ch", margin: "clamp(1.5rem,3vh,2.25rem) auto 0", textAlign: "center" }}>{ROADMAP.mountainCaption}</p>

        {/* riordino priorità */}
        <div className="ap-card" style={{ marginTop: 20, padding: "18px 20px", maxWidth: 760, marginInline: "auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <strong className="ap-head" style={{ fontSize: "clamp(15px,1.2vw,18px)", color: "var(--color-ink)" }}>
              {revised ? "Dopo il primo rilascio, in base all'uso reale" : "L'ordine previsto delle attività"}
            </strong>
            <RevealButton active={revised} onClick={() => setRevised((v) => !v)}>Aggiorna le priorità</RevealButton>
          </div>
          <LayoutGroup>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <AnimatePresence>
                {list.map((item, i) => (
                  <motion.div key={item.id} layout layoutId={"plan-" + item.id}
                    initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 14 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(63,21,72,0.04)", borderRadius: 12, padding: "11px 14px" }}>
                    <span className="ap-head" style={{ width: 26, height: 26, borderRadius: 8, background: "var(--ap-purple)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, flex: "0 0 auto" }}>{item.id}</span>
                    <span style={{ fontSize: 16, fontWeight: 600, color: "var(--ap-ink)" }}>{item.label}</span>
                    {"tag" in item && item.tag && (
                      <span style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 700, color: "var(--ap-accent)", background: "var(--ap-viola-bg)", borderRadius: 999, padding: "3px 10px" }}>{item.tag}</span>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </LayoutGroup>
        </div>
      </div>
    </div>
  );
}
