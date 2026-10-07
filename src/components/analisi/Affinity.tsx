/* Sezione 5, affinity diagram: post-it sparsi -> raggruppati per tema. */
import { useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { AFFINITY_COLUMNS, POSTITS, POSTIT_COLOR, SEM } from "./data";
import { RevealButton } from "./shared";

function rot(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 97;
  return (h % 9) - 4; // -4..4 gradi
}

function PostIt({ id, text, color }: { id: string; text: string; color: "rosso" | "blu" | "verde" }) {
  const s = SEM[POSTIT_COLOR[color]];
  return (
    <motion.div
      layoutId={id}
      layout
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="ap-postit"
      style={{ background: s.bg, borderColor: s.border, color: s.text, fontWeight: 600 }}
    >
      {text}
    </motion.div>
  );
}

export default function Affinity() {
  const [grouped, setGrouped] = useState(false);
  const reduce = useReducedMotion();

  const legend = [
    { c: SEM.criticita, label: "Criticità" },
    { c: SEM.osservazione, label: "Osservazioni" },
    { c: SEM.desiderio, label: "Desideri" },
  ];

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        {/* legenda */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {legend.map((l) => (
            <span key={l.label} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14.5, fontWeight: 600, color: "var(--ap-ink-soft)" }}>
              <span style={{ width: 13, height: 13, borderRadius: 4, background: l.c.bg, border: `1.5px solid ${l.c.border}` }} />
              {l.label}
            </span>
          ))}
        </div>
        <RevealButton active={grouped} onClick={() => setGrouped((v) => !v)}>Raggruppa per temi</RevealButton>
      </div>

      <LayoutGroup>
        {!grouped ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", alignContent: "flex-start", minHeight: 420 }}>
            {POSTITS.map((p) => (
              <div key={p.id} style={{ transform: reduce ? undefined : `rotate(${rot(p.id)}deg)`, maxWidth: 210 }}>
                <PostIt id={p.id} text={p.text} color={p.color} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, alignItems: "start" }}>
            {AFFINITY_COLUMNS.map((col, ci) => (
              <div key={col}>
                <h3 className="ap-head" style={{ fontSize: "clamp(15px,1.3vw,19px)", color: "var(--ap-purple)", marginBottom: 10, textAlign: "center" }}>{col}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {POSTITS.filter((p) => p.theme === ci).map((p) => (
                    <PostIt key={p.id} id={p.id} text={p.text} color={p.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </LayoutGroup>
    </div>
  );
}
