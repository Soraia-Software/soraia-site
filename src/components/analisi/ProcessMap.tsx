/* Sezione 4, mappatura dei processi: diagramma a corsie con due toggle.
   Posizioni esplicite per evitare sovrapposizioni; il rombo della decisione
   è disegnato come poligono SVG (bordo pulito, testo dritto). */
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { COMPANY, FLOW, type FlowNode } from "./data";
import { RevealButton } from "./shared";

const W = 1180, H = 500;
const LANE_X = 132, LANE_TOP = 38, LANE_H = 112;
const BOX_W = 112, BOX_H = 64;
const DW = 68, DH = 44; // semi-assi del rombo decisione

const LY = (lane: number) => LANE_TOP + lane * LANE_H + LANE_H / 2;

// Posizioni esplicite (x in unità viewBox); la y deriva dalla corsia.
const POS: Record<string, number> = {
  contatto: 210, sopralluogo: 340, preventivo: 470, accetta: 612, archivia: 772,
  "ordine-tec": 612, fornitori: 744, installazione: 876,
  comunica: 876, fattura: 1008,
  assistenza: 1008,
};

type Node = FlowNode & { x: number; y: number };
type P = { x: number; y: number };

function halfOf(n: Node) {
  return n.type === "decision" ? { hw: DW, hh: DH } : { hw: BOX_W / 2 + 2, hh: BOX_H / 2 + 2 };
}
function edgePoint(n: Node, tx: number, ty: number): P {
  const { hw, hh } = halfOf(n);
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
    const m: Record<string, Node> = {};
    FLOW.nodes.forEach((n) => { m[n.id] = { ...n, x: POS[n.id] ?? 200, y: LY(n.lane) }; });
    return m;
  }, []);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
        <RevealButton color="arancio" active={showBottle} onClick={() => setShowBottle((v) => !v)}>
          Mostra i colli di bottiglia
        </RevealButton>
        <RevealButton color="viola" active={showAuto} onClick={() => setShowAuto((v) => !v)}>
          Mostra cosa si può automatizzare
        </RevealButton>
      </div>

      <div style={{ position: "relative", width: "100%", maxWidth: W, aspectRatio: `${W} / ${H}`, margin: "0 auto" }}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
          <defs>
            <marker id="ap-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
              <path d="M0 0 L10 5 L0 10 z" fill="#8c7a95" />
            </marker>
          </defs>

          {/* corsie */}
          {COMPANY.departments.map((_, l) => (
            <rect key={l} x={8} y={LANE_TOP + l * LANE_H} width={W - 16} height={LANE_H - 12}
              rx={16} fill={l % 2 ? "rgba(63,21,72,0.045)" : "rgba(63,21,72,0.02)"}
              stroke="rgba(63,21,72,0.08)" />
          ))}

          {/* archi */}
          {FLOW.edges.map(([from, to], i) => {
            const a = nodes[from], b = nodes[to];
            if (!a || !b) return null;
            const p1 = edgePoint(a, b.x, b.y), p2 = edgePoint(b, a.x, a.y);
            const sameX = Math.abs(a.x - b.x) < 2;
            const d = sameX
              ? `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`
              : `M ${p1.x} ${p1.y} C ${(p1.x + p2.x) / 2} ${p1.y}, ${(p1.x + p2.x) / 2} ${p2.y}, ${p2.x} ${p2.y}`;
            return <path key={i} d={d} fill="none" stroke="#8c7a95" strokeWidth={2} markerEnd="url(#ap-arrow)" vectorEffect="non-scaling-stroke" />;
          })}

          {/* rombo decisione */}
          {Object.values(nodes).filter((n) => n.type === "decision").map((n) => (
            <polygon key={n.id}
              points={`${n.x},${n.y - DH} ${n.x + DW},${n.y} ${n.x},${n.y + DH} ${n.x - DW},${n.y}`}
              fill="var(--ap-dec-bg)" stroke="var(--ap-dec-bd)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        {/* etichette corsie */}
        {COMPANY.departments.map((d, l) => (
          <div key={d} style={{
            position: "absolute", left: 0, top: `${(LANE_TOP + l * LANE_H) / H * 100}%`,
            height: `${(LANE_H - 12) / H * 100}%`, width: `${LANE_X / W * 100}%`,
            display: "flex", alignItems: "center", paddingLeft: "1.1%",
            fontSize: "clamp(11px, 0.95vw, 14px)", fontWeight: 700, color: "var(--ap-purple)", lineHeight: 1.1,
          }}>{d}</div>
        ))}

        {/* nodi */}
        {Object.values(nodes).map((n) => {
          const isDecision = n.type === "decision";
          const isEnd = n.type === "end";
          const lit = showAuto && n.automate;
          const w = isDecision ? DW * 2 * 0.74 : BOX_W;
          const h = isDecision ? DH * 2 : BOX_H;
          return (
            <div key={n.id} style={{
              position: "absolute", left: `${n.x / W * 100}%`, top: `${n.y / H * 100}%`,
              width: `${w / W * 100}%`, height: `${h / H * 100}%`,
              transform: "translate(-50%,-50%)",
              borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "center",
              textAlign: "center", padding: isDecision ? 0 : "4px 7px",
              background: isDecision ? "transparent"
                : isEnd ? "#f3f1f4"
                : lit ? "var(--ap-viola-bg)" : "#ffffff",
              border: isDecision ? "none"
                : `1.5px solid ${isEnd ? "rgba(0,0,0,0.1)" : lit ? "var(--ap-accent)" : "rgba(63,21,72,0.16)"}`,
              boxShadow: isDecision ? "none" : lit ? "0 8px 22px -10px rgba(137,45,156,0.5)" : "0 6px 16px -12px rgba(63,21,72,0.4)",
              transition: "background .25s, border-color .25s, box-shadow .25s",
              zIndex: 2,
            }}>
              <span style={{
                fontSize: "clamp(10px, 0.92vw, 13px)", lineHeight: 1.14,
                fontWeight: isEnd ? 500 : isDecision ? 700 : 600,
                color: isEnd ? "var(--ap-ink-soft)" : isDecision ? "var(--ap-dec-tx)" : "var(--ap-ink)",
              }}>{n.label}</span>
            </div>
          );
        })}

        {/* etichette sì/no */}
        {FLOW.edges.filter((e) => e[2]).map(([from, to, label], i) => {
          const a = nodes[from], b = nodes[to];
          const x = (a.x + b.x) / 2, y = (a.y + b.y) / 2;
          return (
            <span key={i} style={{
              position: "absolute", left: `${x / W * 100}%`, top: `${y / H * 100}%`,
              transform: "translate(-50%,-50%)", background: "#fff", border: "1px solid var(--ap-dec-bd)",
              borderRadius: 7, padding: "1px 9px", fontSize: "clamp(10px,0.85vw,12.5px)", fontWeight: 700,
              color: "var(--ap-dec-tx)", zIndex: 4, boxShadow: "0 2px 6px rgba(63,21,72,0.12)",
            }}>{label}</span>
          );
        })}

        {/* chip automazione */}
        <AnimatePresence>
          {showAuto && Object.values(nodes).filter((n) => n.automate).map((n) => {
            const below = n.lane >= 2;
            return (
              <motion.span key={"a-" + n.id}
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                style={{
                  position: "absolute", left: `${n.x / W * 100}%`,
                  top: `${(n.y + (below ? BOX_H / 2 + 7 : -(BOX_H / 2 + 7))) / H * 100}%`,
                  transform: below ? "translate(-50%,0)" : "translate(-50%,-100%)",
                  background: "var(--ap-accent)", color: "#fff", borderRadius: 999,
                  padding: "2px 10px", fontSize: "clamp(9px,0.8vw,11.5px)", fontWeight: 700, whiteSpace: "nowrap",
                  boxShadow: "0 6px 14px -8px rgba(137,45,156,0.7)", zIndex: 6,
                }}>{n.automate!.kind}</motion.span>
            );
          })}
        </AnimatePresence>

        {/* post-it colli di bottiglia */}
        <AnimatePresence>
          {showBottle && Object.values(nodes).filter((n) => n.bottleneck).map((n) => {
            const above = n.lane >= 2;
            const topPct = (n.y + (above ? -(BOX_H / 2 + 74) : (BOX_H / 2 + 14))) / H * 100;
            const px = n.x / W;
            const ptx = px > 0.72 ? "-88%" : px < 0.14 ? "-12%" : "-50%";
            return (
              <motion.div key={"b-" + n.id}
                initial={{ opacity: 0, scale: 0.9, y: above ? 6 : -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                style={{
                  position: "absolute", left: `${px * 100}%`, top: `${topPct}%`,
                  transform: `translate(${ptx},0)`, width: "15%", minWidth: 150, zIndex: 5,
                  background: "var(--ap-dec-bg)", border: "1.5px solid var(--ap-dec-bd)",
                  borderRadius: 11, padding: "9px 11px", boxShadow: "0 10px 22px -12px rgba(181,114,14,0.6)",
                }}>
                <div style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 15, lineHeight: 1 }}>⚠️</span>
                  <span style={{ fontSize: "clamp(10px,0.85vw,12.5px)", lineHeight: 1.25, color: "var(--ap-dec-tx)", fontWeight: 600 }}>
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
