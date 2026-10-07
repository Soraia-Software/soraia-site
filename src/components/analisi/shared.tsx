/* Primitivi condivisi della pagina /analisi-processi:
   icone inline, guscio Sezione, marchio Soraia, pulsante "rivela", rail laterale. */
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SECTIONS } from "./data";

/* ----------------------------------- icone ---------------------------------- */
const I = (p: React.SVGProps<SVGSVGElement>) => ({
  width: 28, height: 28, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, ...p,
});
export const Icon: Record<string, (p?: React.SVGProps<SVGSVGElement>) => JSX.Element> = {
  eye: (p) => (<svg {...I(p)}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>),
  friction: (p) => (<svg {...I(p)}><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>),
  filter: (p) => (<svg {...I(p)}><path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" /></svg>),
  exit: (p) => (<svg {...I(p)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>),
  report: (p) => (<svg {...I(p)}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8M8 17h5" /></svg>),
  map: (p) => (<svg {...I(p)}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></svg>),
  matrix: (p) => (<svg {...I(p)}><path d="M3 3v18h18" /><circle cx="9" cy="14" r="1.6" /><circle cx="16" cy="8" r="1.6" /><circle cx="18" cy="16" r="1.6" /></svg>),
  plan: (p) => (<svg {...I(p)}><path d="M9 11l3 3 8-8" /><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9" /></svg>),
  arrow: (p) => (<svg {...I(p)}><path d="M5 12h14M13 5l7 7-7 7" /></svg>),
  check: (p) => (<svg {...I(p)}><path d="M20 6 9 17l-5-5" /></svg>),
  spark: (p) => (<svg {...I(p)}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" /></svg>),
};

/* -------------------------------- marchio Soraia ---------------------------- */
export function SoraiaMark() {
  return (
    <span className="ap-mark" aria-hidden="true">
      <img src="/logos/soraia-mark.svg" alt="" width={18} height={18} style={{ height: 18, width: "auto" }} />
      Soraia
    </span>
  );
}

/* ------------------------------- guscio Sezione ----------------------------- */
export function Section({
  id, eyebrow, title, titleMax, children, center = false,
}: {
  id: string; eyebrow?: string; title?: React.ReactNode; titleMax?: number;
  children?: React.ReactNode; center?: boolean;
}) {
  return (
    <section id={id} className="ap-section" data-ap-section data-ap-label={id}>
      <div className="ap-wrap" style={center ? { textAlign: "center" } : undefined}>
        {eyebrow && <p className="ap-eyebrow">{eyebrow}</p>}
        {title && (
          <h2 className="ap-head ap-title" style={{ maxWidth: titleMax, marginInline: center ? "auto" : undefined }}>
            {title}
          </h2>
        )}
        {children && <div style={{ marginTop: title ? "clamp(1.5rem, 3vh, 2.5rem)" : 0 }}>{children}</div>}
      </div>
      <SoraiaMark />
    </section>
  );
}

/* ------------------------- pulsante "rivela" (controllo) -------------------- */
export function RevealButton({
  active, onClick, children, color = "viola",
}: {
  active: boolean; onClick: () => void; children: React.ReactNode;
  color?: "viola" | "arancio";
}) {
  const on = color === "arancio"
    ? { bg: "var(--ap-dec)", tx: "#3a2608", bd: "var(--ap-dec)" }
    : { bg: "var(--ap-purple)", tx: "#fff", bd: "var(--ap-purple)" };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontSize: 16, fontWeight: 600, lineHeight: 1,
        padding: "11px 18px", borderRadius: 999,
        border: `1.5px solid ${on.bd}`,
        background: active ? on.bg : "transparent",
        color: active ? on.tx : (color === "arancio" ? "var(--ap-dec-tx)" : "var(--ap-purple)"),
        cursor: "pointer", transition: "background .18s, color .18s",
      }}
    >
      <span style={{
        width: 18, height: 18, borderRadius: 999, flex: "0 0 auto",
        border: `2px solid ${active ? "transparent" : on.bd}`,
        background: active ? "#ffffff" : "transparent",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        {active && <span style={{ width: 8, height: 8, borderRadius: 999, background: on.bg }} />}
      </span>
      {children}
    </button>
  );
}

/* --------------------------------- rail laterale ---------------------------- */
export function ProgressRail({ active, onJump }: { active: number; onJump: (i: number) => void }) {
  return (
    <nav className="ap-rail" aria-label="Sezioni">
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 4 }}>
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onJump(i)}
              className={"ap-rail-item" + (i === active ? " active" : "")}
              aria-current={i === active ? "true" : undefined}
              title={s.label}
            >
              <span className="lbl">{s.label}</span>
              <span className="dot" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* --------------------------- hook: sezione attiva --------------------------- */
export function useActiveSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-ap-section]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = els.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/* ------------------------- hook: navigazione tastiera ----------------------- */
export function useKeyboardNav(active: number) {
  const activeRef = useRef(active);
  activeRef.current = active;
  useEffect(() => {
    const scrollTo = (i: number) => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-ap-section]"));
      const clamped = Math.max(0, Math.min(els.length - 1, i));
      els[clamped]?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) { e.preventDefault(); scrollTo(activeRef.current + 1); }
      else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); scrollTo(activeRef.current - 1); }
      else if (e.key === "Home") { e.preventDefault(); scrollTo(0); }
      else if (e.key === "End") { e.preventDefault(); scrollTo(99); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

/* reveal-on-view: variante motion comune */
export function useReveal() {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };
}

export { motion };
