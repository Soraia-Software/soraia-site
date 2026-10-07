/* Sezione 4, mappatura dei processi: diagramma a corsie con due toggle. */
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { COMPANY, FLOW, type FlowNode } from "./data";
import { RevealButton } from "./shared";

const W = 1180, H = 468;
const LANE_X = 120, COL_W = 100, LANE_TOP = 30, LANE_H = 104;
const BOX_W = 96, BOX_H = 60;

const cx = (col: number) => LANE_X + col * COL_W + 53;
const cy = (lane: number) => LANE_TOP + lane * LANE_H + LANE_H / 2;

type P = { x: number; y: number };
function edgePoint(n: P, tx: number, ty: number): P {
  const hw = BOX_W / 2 + 2, hh = BOX_H / 2 + 2;
  const dx = tx - n.x, dy = ty - n.y;
  const sx = dx === 0 ? Infinity : hw / Math.abs(dx);
  const sy = dy === 0 ? Infinity : hh / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: n.x + dx * s, y: n.y + dy * s };
}

export default function ProcessMap() {
  const [showBottle, setShowBottle] = useState(false);
  const [showAuto, setShowAuto] = useState(false);

  const nodes = useMemo(() => {
    const m: Record<string, FlowNode & P> = {};
    FLOW.nodes.forEach((n) => { m[n.id] = { ...n, x: cx(n.col), y: cy(n.lane) }; });
    return m;
  }, []);

  return (
    <div>
      {/* controlli */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
        <RevealButton color="arancio" active={showBottle} onClick={() => setShowBottle((v) => !v)}>
          Mostra i colli di bottiglia
        </RevealButton>
        <RevealButton color="viola" active={showAuto} onClick={() => setShowAuto((v) => !v)}>
          Mostra cosa si può automatizzare
        </RevealButton>
      </div>

      {/* diagramma */}
      <div style={{ position: "relative", width: "100%", maxWidth: W, aspectRatio: `${W} / ${H}`, margin: "0 auto" }}>
        {/* corsie + archi (SVG stirato esattamente sul contenitore) */}
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
          <defs>
            <marker id="ap-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#9b8aa3" />
            </marker>
          </defs>
          {COMPANY.departments.map((_, l) => (
            <rect key={l} x={8} y={LANE_TOP + l * LANE_H} width={W - 16} height={LANE_H - 10}
              rx={14} fill={l % 2 ? "rgba(63,21,72,0.035)" : "rgba(63,21,72,0.015)"}
              stroke="rgba(63,21,72,0.07)" />
          ))}
          {FLOW.edges.map(([from, to], i) => {
            const a = nodes[from], b = nodes[to];
            if (!a || !b) return null;
            const p1 = edgePoint(a, b.x, b.y), p2 = edgePoint(b, a.x, a.y);
            const mx = (p1.x + p2.x) / 2;
            const d = `M ${p1.x} ${p1.y} C ${mx} ${p1.y}, ${mx} ${p2.y}, ${p2.x} ${p2.y}`;
            return <path key={i} d={d} fill="none" stroke="#9b8aa3" strokeWidth={1.8} markerEnd="url(#ap-arrow)" />;
          })}
        </svg>

        {/* etichette corsie */}
        {COMPANY.departments.map((d, l) => (
          <div key={d} style={{
            position: "absolute", left: 0, top: `${(LANE_TOP + l * LANE_H) / H * 100}%`,
            height: `${(LANE_H - 10) / H * 100}%`, width: `${LANE_X / W * 100}%`,
            display: "flex", alignItems: "center", paddingLeft: "1.1%",
            fontSize: "clamp(11px, 0.95vw, 14px)", fontWeight: 700, color: "var(--ap-purple)", lineHeight: 1.1,
          }}>{d}</div>
        ))}

        {/* etichette sì/no della decisione */}
        {FLOW.edges.filter((e) => e[2]).map(([from, to, label], i) => {
          const a = nodes[from], b = nodes[to];
          const x = (a.x + b.x) / 2, y = (a.y + b.y) / 2;
          return (
            <span key={i} style={{
              position: "absolute", left: `${x / W * 100}%`, top: `${y / H * 100}%`,
              transform: "translate(-50%,-50%)", background: "#fff", border: "1px solid rgba(63,21,72,0.15)",
              borderRadius: 6, padding: "1px 7px", fontSize: "clamp(10px,0.85vw,12.5px)", fontWeight: 700,
              color: "var(--ap-dec-tx)",
            }}>{label}</span>
          );
        })}

        {/* nodi */}
        {Object.values(nodes).map((n) => {
          const isDecision = n.type === "decision";
          const isEnd = n.type === "end";
          const lit = showAuto && n.automate;
          return (
            <div key={n.id} style={{
              position: "absolute", left: `${n.x / W * 100}%`, top: `${n.y / H * 100}%`,
              width: `${BOX_W / W * 100}%`, height: `${BOX_H / H * 100}%`,
              transform: `translate(-50%,-50%) ${isDecision ? "rotate(45deg)" : ""}`,
              borderRadius: isDecision ? 10 : 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              textAlign: "center", padding: "4px 6px",
              background: isDecision ? "var(--ap-dec-bg)"
                : isEnd ? "#f3f1f4"
                : lit ? "var(--ap-viola-bg)" : "#ffffff",
              border: `1.5px solid ${isDecision ? "var(--ap-dec-bd)" : isEnd ? "rgba(0,0,0,0.1)" : lit ? "var(--ap-accent)" : "rgba(63,21,72,0.16)"}`,
              boxShadow: lit ? "0 8px 22px -10px rgba(137,45,156,0.5)" : "0 6px 16px -12px rgba(63,21,72,0.4)",
              transition: "background .25s, border-color .25s, box-shadow .25s",
            }}>
              <span style={{
                transform: isDecision ? "rotate(-45deg)" : undefined,
                fontSize: "clamp(10px, 0.92vw, 13px)", lineHeight: 1.12,
                fontWeight: isEnd ? 500 : 600, color: isEnd ? "var(--ap-ink-soft)" : "var(--ap-ink)",
              }}>{n.label}</span>
            </div>
          );
        })}

        {/* overlay: chip automazione (angolo in alto a destra del nodo, resta dentro il diagramma) */}
        <AnimatePresence>
          {showAuto && Object.values(nodes).filter((n) => n.automate).map((n) => {
            const below = n.lane >= 2; // bottleneck sta sopra per queste corsie: chip sotto
            return (
              <motion.span key={"a-" + n.id}
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                style={{
                  position: "absolute", left: `${n.x / W * 100}%`,
                  top: `${(n.y + (below ? BOX_H / 2 + 7 : -(BOX_H / 2 + 7))) / H * 100}%`,
                  transform: below ? "translate(-50%,0)" : "translate(-50%,-100%)",
                  background: "var(--ap-accent)", color: "#fff", borderRadius: 999,
                  padding: "2px 9px", fontSize: "clamp(9px,0.8vw,11.5px)", fontWeight: 700, whiteSpace: "nowrap",
                  boxShadow: "0 6px 14px -8px rgba(137,45,156,0.7)", zIndex: 6,
                }}>{n.automate!.kind}</motion.span>
            );
          })}
        </AnimatePresence>

        {/* overlay: post-it colli di bottiglia */}
        <AnimatePresence>
          {showBottle && Object.values(nodes).filter((n) => n.bottleneck).map((n) => {
            const above = n.lane >= 2; // corsie basse: callout sopra (resta dentro il diagramma)
            const topPct = (n.y + (above ? -(BOX_H / 2 + 72) : (BOX_H / 2 + 14))) / H * 100;
            const px = n.x / W;
            const ptx = px > 0.7 ? "-88%" : px < 0.12 ? "-12%" : "-50%";
            return (
              <motion.div key={"b-" + n.id}
                initial={{ opacity: 0, scale: 0.9, y: above ? 6 : -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                style={{
                  position: "absolute", left: `${px * 100}%`, top: `${topPct}%`,
                  transform: `translate(${ptx},0)`, width: "15%", minWidth: 140, zIndex: 5,
                  background: "var(--ap-dec-bg)", border: "1.5px solid var(--ap-dec-bd)",
                  borderRadius: 10, padding: "8px 10px", boxShadow: "0 10px 22px -12px rgba(181,114,14,0.6)",
                }}>
                <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 15, lineHeight: 1 }}>⚠️</span>
                  <span style={{ fontSize: "clamp(10px,0.85vw,12.5px)", lineHeight: 1.22, color: "var(--ap-dec-tx)", fontWeight: 600 }}>
                    {n.bottleneck}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
