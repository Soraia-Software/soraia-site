/* Orchestratore della pagina /analisi-processi (e del gemello /en/process-audit).
   Monta le 10 sezioni, il rail laterale, la navigazione da tastiera e lo scroll-snap.
   Le sezioni semplici (1,2,3,6,9,10) sono qui; quelle interattive sono componenti dedicati.
   Tutto il testo arriva da getDeckData(lang): nessuna stringa visibile vive qui. */
import { motion, useReducedMotion } from "motion/react";
import { getDeckData, type DeckData, type DeckLang } from "./data";
import {
  Section, Icon, useReveal,
} from "./shared";
import ProcessMap from "./ProcessMap";
import Affinity from "./Affinity";
import PriorityMatrix from "./PriorityMatrix";
import ActionPlan from "./ActionPlan";

type P = { data: DeckData };

/* --------------------------------- 1. Apertura ------------------------------ */
function Opening({ data }: P) {
  const r = useReveal();
  const { opening } = data;
  return (
    <Section id="apertura" className="bg-hero-dark">
      <motion.p {...r} className="ap-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 4, height: 4, borderRadius: 999, background: "var(--color-amber)", flex: "0 0 auto" }} />
        {opening.eyebrow}
      </motion.p>
      <motion.h1 className="ap-head" {...r} transition={{ ...r.transition, delay: 0.05 }} style={{ fontSize: "clamp(2.25rem, 5vw + 1rem, 4rem)", letterSpacing: "-0.025em", lineHeight: 1.05, color: "#fff", maxWidth: "18ch" }}>
        {opening.title}
      </motion.h1>
      <motion.p {...r} transition={{ ...r.transition, delay: 0.12 }} className="ap-lead" style={{ marginTop: 20, maxWidth: "56ch" }}>
        {opening.subtitle}
      </motion.p>
    </Section>
  );
}

/* ------------------------------- 2. Obiettivi ------------------------------- */
function Objectives({ data }: P) {
  const { ui, objectives } = data;
  return (
    <Section id="obiettivi" eyebrow={ui.objectivesEyebrow} title={ui.objectivesTitle} titleMax={720}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {objectives.map((o, i) => {
          const Ico = Icon[o.icon];
          return (
            <motion.div key={o.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.1 }} className="ap-card" style={{ padding: "22px 20px 24px" }}>
              <span style={{ display: "inline-flex", width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", background: "var(--ap-viola-bg)", color: "var(--ap-accent)", marginBottom: 16 }}>
                <Ico width={26} height={26} />
              </span>
              <h3 className="ap-head" style={{ fontSize: "clamp(16px,1.35vw,20px)", color: "var(--color-ink)", marginBottom: 8, lineHeight: 1.15 }}>{o.title}</h3>
              <p style={{ fontSize: 16, lineHeight: 1.45, color: "var(--ap-ink-soft)", margin: 0 }}>{o.body}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ------------------------------- 3. Come funziona --------------------------- */
function Method({ data }: P) {
  const { ui, method } = data;
  return (
    <Section id="metodo" eyebrow={ui.methodEyebrow} title={ui.methodTitle} titleMax={720}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, position: "relative" }}>
        {method.steps.map((s, i) => (
          <motion.div key={s.n}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.22 }}
            style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span className="ap-head" style={{ width: 40, height: 40, borderRadius: 999, background: "var(--ap-purple)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18, flex: "0 0 auto" }}>{s.n}</span>
              {i < method.steps.length - 1 && (
                <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.22 + 0.2 }}
                  style={{ height: 2, flex: 1, background: "var(--ap-viola-bd)", transformOrigin: "left" }} />
              )}
            </div>
            <h3 className="ap-head" style={{ fontSize: "clamp(16px,1.35vw,20px)", color: "var(--color-ink)", marginBottom: 8, lineHeight: 1.15 }}>{s.title}</h3>
            <p style={{ fontSize: 15.5, lineHeight: 1.45, color: "var(--ap-ink-soft)", margin: 0 }}>{s.body}</p>
          </motion.div>
        ))}
      </div>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 }}
        style={{ marginTop: "clamp(1.75rem,4vh,2.5rem)", fontSize: "clamp(17px,1.5vw,21px)", fontWeight: 600, color: "var(--color-ink)", maxWidth: "60ch", lineHeight: 1.4 }}>
        {method.note}
      </motion.p>
    </Section>
  );
}

/* ------------------------------- 6. Cosa emerge ----------------------------- */
function InsightsCycle({ data }: P) {
  const { ui, insights } = data;
  return (
    <Section id="emerge" eyebrow={ui.insightsEyebrow} title={ui.insightsTitle} titleMax={820}>
      <div style={{ position: "relative", paddingBottom: 72 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, alignItems: "stretch" }}>
          {insights.map((n, i) => (
            <div key={i} style={{ position: "relative", display: "flex" }}>
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.18 }} className="ap-card" style={{ padding: "22px 22px", width: "100%" }}>
                <span className="ap-head" style={{ fontSize: 30, color: "var(--ap-viola-bd)" }}>{i + 1}</span>
                <h3 className="ap-head" style={{ fontSize: "clamp(16px,1.35vw,20px)", color: "var(--color-ink)", margin: "4px 0 8px", lineHeight: 1.18 }}>{n.title}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.45, color: "var(--ap-ink-soft)", margin: 0 }}>{n.body}</p>
              </motion.div>
              {i < insights.length - 1 && (
                <span aria-hidden="true" style={{ position: "absolute", right: -16, top: "50%", transform: "translateY(-50%)", color: "var(--ap-accent)", zIndex: 2, background: "#fcfbfd", borderRadius: 999 }}>
                  <Icon.arrow width={26} height={26} />
                </span>
              )}
            </div>
          ))}
        </div>
        {/* arco di ritorno: il ciclo si autoalimenta */}
        <svg viewBox="0 0 1000 80" preserveAspectRatio="none" style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: 72 }} aria-hidden="true">
          <defs>
            <marker id="ap-loop" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--ap-accent)" />
            </marker>
          </defs>
          <path d="M 940 2 C 940 60, 60 60, 60 8" fill="none" stroke="var(--ap-accent)" strokeWidth="2" strokeDasharray="6 6" markerEnd="url(#ap-loop)" />
        </svg>
        <span style={{ position: "absolute", left: "50%", bottom: 10, transform: "translateX(-50%)", fontSize: 14.5, fontWeight: 700, color: "var(--ap-accent)", background: "#fcfbfd", padding: "0 10px" }}>
          {ui.insightsLoop}
        </span>
      </div>
    </Section>
  );
}

/* ------------------------------- 9. Cosa ricevete --------------------------- */
function Deliverables({ data }: P) {
  const { ui, deliverables, pricing } = data;
  return (
    <Section id="ricevete" eyebrow={ui.deliverablesEyebrow} title={ui.deliverablesTitle} titleMax={880}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {deliverables.map((d, i) => {
          const Ico = Icon[d.icon];
          return (
            <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: i * 0.1 }} className="ap-card" style={{ padding: "22px 20px 24px" }}>
              <span style={{ display: "inline-flex", width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", background: "var(--ap-viola-bg)", color: "var(--ap-accent)", marginBottom: 16 }}>
                <Ico width={26} height={26} />
              </span>
              <h3 className="ap-head" style={{ fontSize: "clamp(16px,1.35vw,19px)", color: "var(--color-ink)", marginBottom: 6, lineHeight: 1.18 }}>{d.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.4, color: "var(--ap-ink-soft)", margin: 0 }}>{d.body}</p>
            </motion.div>
          );
        })}
      </div>

      <div style={{ marginTop: "clamp(1.75rem,4vh,2.5rem)", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: "clamp(16px,1.4vw,19px)", fontWeight: 600, color: "var(--color-ink)", maxWidth: "40ch", margin: 0, lineHeight: 1.4 }}>
          {pricing.standalone}
        </p>
        {pricing.show && (
          <div className="ap-card" style={{ padding: "16px 24px", background: "var(--ap-viola-bg)", border: "1.5px solid var(--ap-viola-bd)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ap-accent)" }}>{ui.pricingLabel}</div>
            <div className="ap-head" style={{ fontSize: "clamp(24px,2.4vw,34px)", color: "var(--color-ink)", lineHeight: 1.1, marginTop: 2 }}>
              {ui.pricingFrom}{pricing.from}
            </div>
            <div style={{ fontSize: 15, color: "var(--ap-ink-soft)", marginTop: 2 }}>{pricing.note}</div>
          </div>
        )}
      </div>
    </Section>
  );
}

/* --------------------------------- 10. Chiusura ----------------------------- */
function Closing({ data }: P) {
  return (
    <Section id="chiusura" center>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}
        className="ap-head" style={{ fontSize: "clamp(1.75rem,3.4vw,2.9rem)", color: "var(--color-ink)", maxWidth: "20ch", marginInline: "auto", lineHeight: 1.18 }}>
        {data.closing}
      </motion.p>
    </Section>
  );
}

/* ------------------------------- orchestratore ------------------------------ */
export default function AnalisiProcessi({ lang = "it" }: { lang?: DeckLang }) {
  const data = getDeckData(lang);
  const { ui, company } = data;
  return (
    <div className="ap-root">
      <Opening data={data} />
      <Objectives data={data} />
      <Method data={data} />
      <Section id="mappatura" eyebrow={`${ui.mapEyebrow} · ${company.name}`} title={ui.mapTitle} titleMax={980}>
        <ProcessMap data={data} />
      </Section>
      <Section id="temi" eyebrow={ui.themesEyebrow} title={ui.themesTitle} titleMax={900}>
        <Affinity data={data} />
      </Section>
      <InsightsCycle data={data} />
      <Section id="priorita" eyebrow={ui.priorityEyebrow} title={ui.priorityTitle} titleMax={720}>
        <PriorityMatrix data={data} />
      </Section>
      <Section id="piano" eyebrow={ui.planEyebrow} title={ui.planTitle} titleMax={900}>
        <ActionPlan data={data} />
      </Section>
      <Deliverables data={data} />
      <Closing data={data} />
    </div>
  );
}
