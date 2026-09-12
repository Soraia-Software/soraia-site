import { useState, useMemo, useEffect } from "react";

/* ============================================================================
   Soraia Client Portal - DEMO
   Faithful, anonymized replica of the real client portal (soraia-pm).
   Same layout, colours (#892d9c), status pills and components; example data.
   ========================================================================== */

/* ── Inline icons (lucide-style, so we don't pull a dependency) ───────────── */
const P: Record<string, string> = {
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  chevrondown: '<polyline points="6 9 12 15 18 9"/>',
  chevronright: '<polyline points="9 18 15 12 9 6"/>',
  paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
};
function Icon({ name, size = 14, style }: { name: string; size?: number; style?: any }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }} dangerouslySetInnerHTML={{ __html: P[name] || "" }} />
  );
}

/* ── Constants (verbatim from the portal) ─────────────────────────────────── */
const STATUS_CONFIG: Record<string, { color: string; bg: string; text: string }> = {
  "Ticket Received":   { color: "#06b6d4", bg: "#cffafe", text: "#155e75" },
  Queue:               { color: "#f97316", bg: "#ffedd5", text: "#9a3412" },
  "In Progress":       { color: "#eab308", bg: "#fef9c3", text: "#854d0e" },
  "Needs Feedback":    { color: "#ec4899", bg: "#fce7f3", text: "#9d174d" },
  Staging:             { color: "#892d9c", bg: "#f5eaf7", text: "#892d9c" },
  "To be Released":    { color: "#e24b4a", bg: "#fcebeb", text: "#a32d2d" },
  "Done – Production": { color: "#639922", bg: "#eaf3de", text: "#3b6d11" },
  "On Hold":           { color: "#888780", bg: "#f1efe8", text: "#5f5e5a" },
};
const STATUS_ORDER = ["Ticket Received", "Queue", "In Progress", "Needs Feedback", "Staging", "To be Released", "Done – Production", "On Hold"];
const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  Critical: { bg: "#f5eaf7", text: "#892d9c" },
  High:     { bg: "#fcebeb", text: "#a32d2d" },
  Medium:   { bg: "#faeeda", text: "#854f0b" },
  Low:      { bg: "#e6f1fb", text: "#185fa5" },
};
const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Incident:   { bg: "#fcebeb", text: "#a32d2d" },
  Feature:    { bg: "#e6f1fb", text: "#185fa5" },
  Change:     { bg: "#faeeda", text: "#854f0b" },
  Design:     { bg: "#fce7f3", text: "#9d174d" },
  Consulting: { bg: "#eaf3de", text: "#3b6d11" },
  Research:   { bg: "#f1efe8", text: "#5f5e5a" },
};
const SPRINT_TYPES: Record<string, any> = { DEVELOPMENT: { label: "Development", dot: "#1d9e75", bg: "#eaf3de", text: "#3b6d11" } };
const SPRINT_STATUS: Record<string, any> = {
  PLANNED:     { label: "Planned",     dot: "#9ca3af", bg: "#f1efe8", text: "#5f5e5a" },
  IN_PROGRESS: { label: "In Progress", dot: "#378add", bg: "#e6f1fb", text: "#185fa5" },
  COMPLETED:   { label: "Completed",   dot: "#1d9e75", bg: "#eaf3de", text: "#3b6d11" },
};
const PRIORITY_RANK: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };

/* ── Helpers ──────────────────────────────────────────────────────────────── */
function fmtDate(iso?: string) {
  if (!iso) return "-";
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
function fmtDay(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
function fmtEnd(iso?: string) { return iso ? fmtDate(iso) : "ongoing"; }
function fmtHours(h?: number) {
  if (h === null || h === undefined) return "0h";
  return `${Number(h).toFixed(1).replace(/\.0$/, "")}h`;
}
function initialsOf(name = "") { return name.split(" ").filter(Boolean).map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "?"; }
function avatarColor(name = "") {
  const palette = ["#892d9c", "#378add", "#1d9e75", "#ef9f27", "#e24b4a", "#5a4fcf"];
  let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
}
function byDeadlineThenPriority(a: any, b: any) {
  const da = a.deadline || "", db = b.deadline || "";
  if (da && db) { if (da !== db) return da.localeCompare(db); }
  else if (da) return -1; else if (db) return 1;
  return (PRIORITY_RANK[a.priority] ?? 99) - (PRIORITY_RANK[b.priority] ?? 99);
}

/* ── Anonymized demo data ─────────────────────────────────────────────────── */
const CLIENT = { name: "Nordica HR", color: "#5a4fcf" };
const ME = { id: "c1", name: "Mario Rossi", initials: "MR", color: "#378add", role: "client" };
const TEAM = [
  { id: "u1", name: "Luca Moretti", role: "PM",    color: "#892d9c" },
  { id: "u2", name: "Sara Bruno",   role: "PM",    color: "#378add" },
  { id: "u3", name: "Elena Costa",  role: "PM",    color: "#e24b4a" },
  { id: "u4", name: "Andrea Conti", role: "Admin", color: "#ef9f27" },
  { id: "u5", name: "Marco Ferrari",role: "Dev",   color: "#1d9e75" },
];
const teamById = (id: string) => TEAM.find((u) => u.id === id);

// Realistic micro-tasks (each ~1-3h). A logged day bundles a few of them, so an
// 8h day shows several tasks and short days show one or two, never 8h on one task.
const TASKS: Record<string, string[]> = {
  PM: [
    "call di allineamento con il cliente sui ticket in attesa di feedback e priorità della settimana",
    "triage dei nuovi ticket in arrivo, assegnazione priorità e stima delle ore per ognuno",
    "aggiornamento del planning di sprint e re-sizing del backlog (stima ~84h sui prossimi due sprint)",
    "review con il team delle consegne su ricerca avanzata aziende e dossier candidato, lista dei fix",
    "stesura delle specifiche e dei criteri di accettazione per il flusso consensi GDPR (privacy e marketing separati)",
    "verifica dello staging con il cliente sul modulo annunci e raccolta del feedback in ticket",
    "preparazione della demo di fine sprint: script, dati di esempio e note di rilascio",
    "risposta ai ticket in attesa di feedback e sollecito delle decisioni aperte lato cliente",
    "coordinamento con gli sviluppatori sull'integrazione MailChimp per l'invio dei dossier",
    "definizione della timeline di go-live (gen 2027) e brief di 7 task per il team",
  ],
  Dev: [
    "sviluppo della ricerca avanzata aziende: filtri per settore, dimensione e area geografica",
    "correzione del bug sul ricalcolo del punteggio di match candidato-vacancy",
    "lavori sulla UI degli accessi utente e sui permessi dell'utente operatore in impostazioni",
    "creazione dello spazio 'staging-cliente' su BE e FE con nuovo branch e datasource dedicato",
    "revisione del codice, merge delle PR e allineamento del branch di sviluppo",
    "test e fix sui casi limite del flag 'non ricontattare' su azienda e candidato",
    "ottimizzazione delle query e paginazione sulla lista candidati (aggiunta indici)",
    "migrazione delle anagrafiche e script di normalizzazione dei dati importati",
    "deploy su staging del modulo dossier e verifica dell'email di conferma colloquio",
    "stesura dei test automatici sul flusso di pubblicazione annunci sui portali",
  ],
  Admin: [
    "gestione degli accessi e dei ruoli per i nuovi operatori del cliente",
    "setup degli ambienti e del datasource di staging, allineamento delle variabili d'ambiente",
    "configurazione della pipeline CI/CD e degli step di deploy automatico su staging",
    "manutenzione, backup del database e verifica dei log di sistema",
    "gestione dell'infrastruttura cloud: monitoraggio risorse e rinnovo certificati",
  ],
};
const DAY_HOURS = [3.5, 6, 4.5, 7.5, 5, 2.5, 6.5, 4, 8, 5.5, 3, 7];

let _eid = 1;
function genLog(role: string, total: number, baseISO: string) {
  const pool = TASKS[role] || TASKS.PM;
  const out: any[] = []; let rem = Math.round(total * 10) / 10;
  let seed = Math.round(total) + role.length; let i = 0;
  const d = new Date(baseISO + "T00:00:00Z");
  while (rem > 0.01 && i < 30) {
    let h = DAY_HOURS[(i + seed) % DAY_HOURS.length];
    if (h > rem) h = rem;
    h = Math.round(h * 10) / 10; rem = Math.round((rem - h) * 10) / 10;
    const nb = h >= 7 ? 4 : h >= 4.5 ? 3 : h >= 2.5 ? 2 : 1;
    const tasks: string[] = [];
    for (let k = 0; k < nb; k++) tasks.push(pool[(seed + i + k) % pool.length]);
    const notes = nb === 1 ? tasks[0] : `<ul>${tasks.map((t) => `<li>${t}</li>`).join("")}</ul>`;
    out.push({ id: _eid++, date: d.toISOString().slice(0, 10), hours: h, notes });
    d.setUTCDate(d.getUTCDate() - 3); seed += nb; i++;
  }
  return out;
}
function splitMembers(total: number, baseISO: string) {
  const parts = [["u1", 0.52], ["u2", 0.16], ["u3", 0.12], ["u4", 0.10], ["u5", 0.10]] as [string, number][];
  let acc = 0; const out: any[] = [];
  parts.forEach(([uid, w], idx) => {
    const t = idx === parts.length - 1 ? Math.round((total - acc) * 10) / 10 : Math.round(total * w * 10) / 10;
    acc += t;
    const role = uid === "u5" ? "Dev" : uid === "u4" ? "Admin" : "PM";
    out.push({ usr_id: uid, total: t, entries: genLog(role, t, baseISO) });
  });
  return out.sort((a, b) => b.total - a.total);
}

const SPRINTS = [
  {
    id: "s7", type: "DEVELOPMENT", status: "IN_PROGRESS", start_date: "2026-08-20", end_date: "2026-09-19", hours_planned: 150,
    members: [
      { usr_id: "u1", total: 75.5, entries: genLog("PM", 75.5, "2026-09-11") },
      { usr_id: "u4", total: 15, entries: genLog("Admin", 15, "2026-09-10") },
      { usr_id: "u2", total: 15, entries: genLog("PM", 15, "2026-09-09") },
      { usr_id: "u3", total: 14, entries: [
        { id: _eid++, date: "2026-09-08", hours: 3, notes: "<ul><li>re-sizing del backlog (84h totali)</li><li>timeline go-live gennaio 2027, brief di 7 task</li><li>ambienti staging definiti (staging-soraia / staging-cliente)</li></ul>" },
        { id: _eid++, date: "2026-09-07", hours: 6, notes: "call con il cliente e apertura ticket" },
        { id: _eid++, date: "2026-09-04", hours: 5, notes: "QA" },
      ] },
      { usr_id: "u5", total: 8, entries: [
        { id: _eid++, date: "2026-09-10", hours: 8, notes: "<ul><li>creazione spazio 'staging-cliente' su BE e FE con nuovo branch e datasource</li><li>ticket sulla ricerca avanzata</li><li>ticket di UI</li><li>ticket accessi utente in impostazioni</li></ul>" },
      ] },
    ],
  },
  { id: "s6", type: "DEVELOPMENT", status: "COMPLETED", start_date: "2026-07-20", end_date: "2026-08-19", hours_planned: 150, members: splitMembers(150, "2026-08-18") },
  { id: "s5", type: "DEVELOPMENT", status: "COMPLETED", start_date: "2026-06-20", end_date: "2026-07-19", hours_planned: 150, members: splitMembers(132.5, "2026-07-18") },
  { id: "s4", type: "DEVELOPMENT", status: "COMPLETED", start_date: "2026-05-20", end_date: "2026-06-19", hours_planned: 150, members: splitMembers(125.5, "2026-06-18") },
  { id: "s3", type: "DEVELOPMENT", status: "COMPLETED", start_date: "2026-04-20", end_date: "2026-05-19", hours_planned: 150, members: splitMembers(169, "2026-05-18") },
  { id: "s2", type: "DEVELOPMENT", status: "COMPLETED", start_date: "2026-03-20", end_date: "2026-04-19", hours_planned: 150, members: splitMembers(155, "2026-04-18") },
  { id: "s1", type: "DEVELOPMENT", status: "COMPLETED", start_date: "2026-02-20", end_date: "2026-03-19", hours_planned: 150, members: splitMembers(148, "2026-03-18") },
];
function sprintUsed(s: any) { return Math.round(s.members.reduce((sum: number, m: any) => sum + m.total, 0) * 10) / 10; }

let _tid = 1;
function TK(title: string, priority: string, type: string, status: string, creator: string, deadline: string, o: any = {}) {
  return { id: _tid++, title, priority, type, status, needs_reply: !!o.reply, deadline, creator_name: creator, attachments_count: o.a || 0, comments_count: o.c || 0, request_text: o.desc || "", comments: o.comments || [] };
}
const INITIAL_TICKETS = [
  TK("Report mensile ore in PDF", "Low", "Change", "Ticket Received", "Giulia B.", "2026-09-20"),
  TK("Filtro per referente commerciale", "Medium", "Feature", "Ticket Received", "Paolo M.", "2026-09-21"),
  TK("Modifica dossier candidato", "High", "Feature", "Queue", "Giulia B.", "2026-09-14", { desc: "<p>Servono più campi editabili nel dossier del candidato: disponibilità, patente, note del recruiter.</p>" }),
  TK("Nuova attività dal profilo candidato", "High", "Feature", "Queue", "Paolo M.", "2026-09-14"),
  TK("Attività massive: telemarketing e door-to-door da lista aziende", "High", "Feature", "Queue", "Giulia B.", "2026-09-14", { c: 3 }),
  TK("Notifiche: segnalazione ad altra linea di business", "High", "Feature", "Queue", "Giulia B.", "2026-09-14" ),
  TK("Competitor: tabella dedicata e analisi territoriale", "High", "Research", "Queue", "Giulia B.", "2026-09-17"),
  TK("Import attività storiche 2018-2026", "Medium", "Change", "Queue", "Paolo M.", "2026-09-12", { reply: true }),
  TK("Annunci (job): prototipo di creazione con AI", "High", "Feature", "In Progress", "Chiara V.", "2026-09-14", { a: 2, desc: "<p>Prototipo per generare bozze di annuncio a partire dalla vacancy, con tono e requisiti coerenti.</p>" }),
  TK("Ricalcolo punteggio di match candidato-vacancy", "Medium", "Incident", "In Progress", "Paolo M.", "2026-09-09", { c: 2 }),
  TK("GDPR: date dei consensi privacy e marketing", "Medium", "Feature", "Needs Feedback", "Giulia B.", "2026-09-03", { reply: true, c: 4, desc: "<p>Vogliamo tracciare data e fonte del consenso privacy e di quello marketing, separati, su azienda e candidato.</p>", comments: [
    { id: 1, author_name: "Sara Bruno", author_role: "SORAIA", created_at: "2026-09-02T10:20:00Z", body: "Ciao, per procedere ci serve conferma: il consenso marketing va richiesto anche ai candidati o solo alle aziende?" },
  ] }),
  TK("Backend, dossier: generazione e invio al cliente", "Low", "Feature", "Needs Feedback", "Giulia B.", "2026-09-04", { reply: true, a: 2, c: 9 }),
  TK("Backend: email di conferma colloquio", "Low", "Feature", "Needs Feedback", "Giulia B.", "2026-09-04", { reply: true, c: 1 }),
  TK("Backend DB: tabelle annuncio e pubblicazioni sui portali", "High", "Feature", "Needs Feedback", "Giulia B.", "2026-09-11", { reply: true }),
  TK("Dashboard: grafico ore per persona", "Low", "Design", "Needs Feedback", "Chiara V.", "2026-09-08"),
  TK('Warning "non ricontattare" su azienda e candidato', "Medium", "Feature", "Staging", "Giulia B.", "2026-09-04", { reply: true, c: 4 }),
  TK("Attività + flag utente + categorie", "Medium", "Feature", "Staging", "Giulia B.", "2026-09-04"),
  TK('Gestione "cliente non idoneo"', "Medium", "Feature", "Staging", "Chiara V.", "2026-09-04", { c: 2 }),
  TK("Utente operatore: permessi e visibilità", "Low", "Incident", "Staging", "Giulia B.", "2026-09-10", { reply: true, a: 1, c: 3 }),
  TK("Ricerca avanzata aziende", "Medium", "Feature", "To be Released", "Chiara V.", "2026-08-12"),
  TK("Candidato: apri scheda in nuovo tab", "Low", "Incident", "To be Released", "Chiara V.", "2026-08-14"),
  TK("Opzione: ordina aziende come i candidati", "Low", "Change", "To be Released", "Giulia B.", "2026-08-14", { c: 4 }),
  TK("Azienda: edit anagrafica", "High", "Incident", "To be Released", "Chiara V.", "2026-08-19", { reply: true }),
  TK("Vacancy: storicizzazione dei passaggi di stato", "High", "Feature", "To be Released", "Giulia B.", "2026-08-19"),
  TK("Import lista aziende da CSV", "Medium", "Feature", "To be Released", "Paolo M.", "2026-08-19"),
  TK("Login SSO per i clienti", "Medium", "Feature", "Done – Production", "Chiara V.", "2026-08-02", { comments: [ { id: 1, author_name: "Luca Moretti", author_role: "SORAIA", created_at: "2026-08-01T09:00:00Z", body: "Rilasciato in produzione, accesso con Google e Microsoft attivo." } ] }),
  TK("Bugfix filtro data sui colloqui", "High", "Incident", "Done – Production", "Paolo M.", "2026-07-28"),
  TK("Notifiche email: digest settimanale", "Low", "Feature", "Done – Production", "Giulia B.", "2026-07-25"),
  TK("Migrazione DB anagrafiche", "Medium", "Change", "Done – Production", "Chiara V.", "2026-07-20"),
  TK("Export CSV dei candidati", "Low", "Feature", "Done – Production", "Paolo M.", "2026-07-15"),
  TK("Fix timezone sul calendario", "Medium", "Incident", "Done – Production", "Giulia B.", "2026-07-10"),
  TK("Ruoli e permessi di base", "High", "Feature", "Done – Production", "Chiara V.", "2026-07-05"),
  TK("Ricerca full-text candidati", "Medium", "Feature", "Done – Production", "Paolo M.", "2026-06-20"),
  TK("Audit log degli accessi", "Medium", "Feature", "Done – Production", "Giulia B.", "2026-06-15"),
  TK("Onboarding operatori", "Low", "Change", "Done – Production", "Chiara V.", "2026-06-10"),
  TK("Integrazione portale esterno (in valutazione)", "Low", "Research", "On Hold", "Paolo M.", ""),
];

/* ── Badges / pills ───────────────────────────────────────────────────────── */
function PriorityBadge({ priority }: any) {
  const c = PRIORITY_COLORS[priority]; if (!c) return null;
  return <span style={{ display: "inline-flex", alignItems: "center", borderRadius: 10, fontWeight: 500, padding: "2px 7px", fontSize: 10, background: c.bg, color: c.text }}>{priority}</span>;
}
function TypeBadge({ type }: any) {
  const c = TYPE_COLORS[type] || { bg: "#f1efe8", text: "#5f5e5a" };
  return <span style={{ display: "inline-flex", alignItems: "center", borderRadius: 10, fontWeight: 500, padding: "2px 7px", fontSize: 10, background: c.bg, color: c.text }}>{type}</span>;
}
function TicketStatusPill({ status }: any) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Ticket Received"];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: cfg.bg, color: cfg.text }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color }} />{status}</span>;
}
function SprintStatusPill({ status }: any) {
  const cfg = SPRINT_STATUS[status];
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: cfg.bg, color: cfg.text }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot }} />{cfg.label}</span>;
}
function SprintTypePill({ type }: any) {
  const cfg = SPRINT_TYPES[type] || SPRINT_TYPES.DEVELOPMENT;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: cfg.bg, color: cfg.text }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot }} />{cfg.label}</span>;
}
function NeedsReplyBadge() {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", background: "#faeeda", color: "#854f0b", border: "1px solid #ef9f27" }}><Icon name="message" size={10} /> Reply</span>;
}
function Avatar({ name, size = 26 }: { name: string; size?: number }) {
  return <div style={{ width: size, height: size, borderRadius: "50%", background: avatarColor(name), display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{initialsOf(name)}</div>;
}

/* ── Topbar + tabs ────────────────────────────────────────────────────────── */
function PortalTopbar() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2" style={{ padding: "10px 16px", minHeight: 56, background: "#fff", borderBottom: "1px solid var(--color-border)", flexShrink: 0 }}>
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex items-center justify-center" style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(160deg, #3d0f4a 0%, #892d9c 100%)", color: "#fff", fontWeight: 800, fontSize: 15, flexShrink: 0 }}>S</div>
        <div className="hidden sm:block" style={{ flexShrink: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.1 }}>Soraia</div>
          <div style={{ fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>Client Portal</div>
        </div>
        <div className="hidden sm:block" style={{ width: 1, height: 28, background: "var(--color-border)", margin: "0 6px", flexShrink: 0 }} />
        <div className="flex items-center gap-2 min-w-0">
          <div style={{ width: 26, height: 26, borderRadius: 6, background: CLIENT.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{initialsOf(CLIENT.name)}</div>
          <div className="truncate min-w-0" style={{ fontSize: 13, fontWeight: 600 }}>{CLIENT.name}</div>
        </div>
      </div>
      <div className="flex items-center gap-2" style={{ flexShrink: 0 }}>
        <div className="flex items-center gap-2">
          <div className="rounded-full flex items-center justify-center" style={{ width: 26, height: 26, background: ME.color, fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{ME.initials}</div>
          <div className="hidden sm:block truncate min-w-0" style={{ fontSize: 12, fontWeight: 500, maxWidth: 120 }}>{ME.name}</div>
        </div>
        <button title="Log out" style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 6, color: "var(--color-text-muted)", display: "flex" }}><Icon name="logout" size={15} /></button>
      </div>
    </div>
  );
}
function PortalTabs({ activeTab, onChange, ticketCount, needsReplyCount }: any) {
  const tabs = [
    { id: "tickets", label: "My Tickets", icon: "ticket", badge: ticketCount, alert: needsReplyCount },
    { id: "sprints", label: "Sprints", icon: "rocket", badge: null, alert: null },
  ];
  return (
    <div className="flex items-center px-6" style={{ height: 44, background: "#fff", borderBottom: "1px solid var(--color-border)", gap: 4, flexShrink: 0 }}>
      {tabs.map((t) => {
        const active = activeTab === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} className="flex items-center gap-2" style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 16px", fontSize: 13, fontWeight: active ? 600 : 500, color: active ? "#892d9c" : "var(--color-text-muted)", borderBottom: active ? "2px solid #892d9c" : "2px solid transparent", marginBottom: -1 }}>
            <Icon name={t.icon} size={14} /> {t.label}
            {t.badge != null && t.badge > 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 20, background: active ? "#892d9c" : "var(--color-border)", color: active ? "#fff" : "var(--color-text-muted)" }}>{t.badge}</span>}
            {t.alert != null && t.alert > 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 20, background: "#ef9f27", color: "#fff" }}>{t.alert} reply</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ── Ticket cards / list / kanban ─────────────────────────────────────────── */
function FilterChip({ label, count, active, onClick, icon, accent }: any) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5" style={{ background: active ? (accent ? "#faeeda" : "#f5eaf7") : "#fff", border: `1px solid ${active ? (accent || "#892d9c") : "var(--color-border)"}`, borderRadius: 999, padding: "5px 11px", fontSize: 12, fontWeight: active ? 600 : 500, color: active ? (accent ? "#854f0b" : "#892d9c") : "var(--color-text-secondary)", cursor: "pointer" }}>
      {icon}<span>{label}</span>
      <span style={{ background: active ? "#fff" : "var(--color-bg)", borderRadius: 999, padding: "0 7px", fontSize: 10, fontWeight: 700 }}>{count}</span>
    </button>
  );
}
function ViewBtn({ active, onClick, icon, label }: any) {
  return <button onClick={onClick} className="flex items-center gap-1" style={{ background: active ? "#f5eaf7" : "transparent", border: "none", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontWeight: active ? 600 : 500, color: active ? "#892d9c" : "var(--color-text-muted)", cursor: "pointer" }}><Icon name={icon} size={13} /> {label}</button>;
}
function KanbanCard({ t, onSelect }: any) {
  return (
    <button onClick={() => onSelect(t)} className="text-left" style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 10, padding: 12, cursor: "pointer", width: "100%" }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 2px 10px rgba(137,45,156,0.08)"; e.currentTarget.style.borderColor = "rgba(137,45,156,0.25)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--color-border)"; }}>
      <div className="flex items-start justify-between gap-2" style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.4, color: "var(--color-text-primary)" }}>{t.title}</div>
        {t.needs_reply && <NeedsReplyBadge />}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap"><PriorityBadge priority={t.priority} /><TypeBadge type={t.type} /></div>
      {t.deadline && <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginTop: 6 }}>Due {fmtDate(t.deadline)}</div>}
      {t.creator_name && <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginTop: 4 }}>Opened by {t.creator_name}</div>}
      {(t.attachments_count > 0 || t.comments_count > 0) && (
        <div className="flex items-center gap-3" style={{ marginTop: 6, fontSize: 10, color: "var(--color-text-muted)" }}>
          {t.attachments_count > 0 && <span className="flex items-center gap-1"><Icon name="paperclip" size={11} />{t.attachments_count}</span>}
          {t.comments_count > 0 && <span className="flex items-center gap-1"><Icon name="message" size={11} />{t.comments_count}</span>}
        </div>
      )}
    </button>
  );
}
function TicketKanban({ grouped, counts, onSelect }: any) {
  return (
    <div className="flex gap-4" style={{ overflowX: "auto", paddingBottom: 8 }}>
      {STATUS_ORDER.map((status) => {
        const cfg = STATUS_CONFIG[status];
        const items = grouped[status] || [];
        return (
          <div key={status} style={{ minWidth: 260, flex: "0 0 260px" }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 8, padding: "4px 4px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.color }} />
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-secondary)" }}>{status}</span>
              <span style={{ fontSize: 10, color: "var(--color-text-muted)", background: "var(--color-border)", borderRadius: 999, padding: "1px 6px", fontWeight: 600 }}>{counts[status] || 0}</span>
            </div>
            <div className="flex flex-col gap-2">
              {items.map((t: any) => <KanbanCard key={t.id} t={t} onSelect={onSelect} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
function TicketList({ tickets, onSelect }: any) {
  return (
    <div className="flex flex-col gap-2">
      {tickets.map((t: any) => (
        <button key={t.id} onClick={() => onSelect(t)} className="w-full text-left" style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 10, padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 2px 10px rgba(137,45,156,0.08)"; e.currentTarget.style.borderColor = "rgba(137,45,156,0.25)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--color-border)"; }}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</span>
              {t.needs_reply && <NeedsReplyBadge />}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <PriorityBadge priority={t.priority} /><TypeBadge type={t.type} /><TicketStatusPill status={t.status} />
              {t.deadline && <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>· due {fmtDate(t.deadline)}</span>}
              {t.creator_name && <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>· opened by {t.creator_name}</span>}
            </div>
          </div>
          <Icon name="chevronright" size={14} style={{ color: "var(--color-text-muted)" }} />
        </button>
      ))}
    </div>
  );
}

/* ── Ticket drawer (read-only + local reply) ──────────────────────────────── */
function CommentBubble({ c }: any) {
  const isClient = (c.author_role || "").toUpperCase() === "CLIENT";
  return (
    <div className="flex items-start gap-2.5">
      <Avatar name={c.author_name} size={26} />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2" style={{ marginBottom: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>{c.author_name}</span>
          <span style={{ fontSize: 9, fontWeight: 600, padding: "1px 6px", borderRadius: 20, background: isClient ? "#e6f1fb" : "#fce7f3", color: isClient ? "#185fa5" : "#9d174d", textTransform: "uppercase", letterSpacing: "0.04em" }}>{isClient ? "Client" : "Soraia"}</span>
        </div>
        <div style={{ padding: "7px 10px", borderRadius: "4px 12px 12px 12px", background: isClient ? "#e6f1fb" : "#fce7f3", fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{c.body}</div>
      </div>
    </div>
  );
}
function TicketDrawer({ ticket, onClose, onReply, onMarkReplied }: any) {
  const [reply, setReply] = useState("");
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 90 }} />
      <aside style={{ position: "fixed", top: 0, right: 0, height: "100%", width: "min(520px, 100%)", background: "#fff", boxShadow: "-8px 0 30px rgba(0,0,0,0.12)", zIndex: 100, display: "flex", flexDirection: "column" }}>
        <div className="px-5 py-4 flex items-start justify-between" style={{ borderBottom: "1px solid var(--color-border)" }}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 8 }}>
              <PriorityBadge priority={ticket.priority} /><TypeBadge type={ticket.type} /><TicketStatusPill status={ticket.status} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>{ticket.title}</div>
            <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 4 }}>{ticket.deadline ? `Due ${fmtDate(ticket.deadline)} · ` : ""}Opened by {ticket.creator_name}</div>
          </div>
          <button onClick={onClose} title="Close" style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 6, color: "var(--color-text-muted)" }}><Icon name="x" size={16} /></button>
        </div>
        <div className="flex-1" style={{ overflowY: "auto" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--color-border)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)", marginBottom: 6 }}>Description</div>
            {ticket.request_text
              ? <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-primary)" }} dangerouslySetInnerHTML={{ __html: ticket.request_text }} />
              : <p style={{ fontSize: 12, color: "var(--color-text-muted)", fontStyle: "italic", margin: 0 }}>Nessuna descrizione.</p>}
          </div>
          <div className="px-5 py-4">
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <div className="flex items-center gap-2">
                <Icon name="message" size={12} style={{ color: "var(--color-text-muted)" }} />
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)" }}>Conversation</span>
                {ticket.comments.length > 0 && <span style={{ fontSize: 10, color: "var(--color-text-muted)" }}>{ticket.comments.length}</span>}
              </div>
              {ticket.needs_reply && (
                <button onClick={() => onMarkReplied(ticket.id)} className="inline-flex items-center gap-1.5" style={{ background: "#fff", border: "1px solid #ef9f27", borderRadius: 999, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: "#854f0b", cursor: "pointer" }}><Icon name="check" size={11} /> Mark as replied</button>
              )}
            </div>
            {ticket.comments.length === 0
              ? <p style={{ fontSize: 12, color: "var(--color-text-muted)", fontStyle: "italic", margin: "0 0 16px" }}>No messages yet.</p>
              : <div className="flex flex-col gap-2" style={{ marginBottom: 16 }}>{ticket.comments.map((c: any) => <CommentBubble key={c.id} c={c} />)}</div>}
            <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: 10, padding: 10 }}>
              <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a message…" rows={3} style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: 13, fontFamily: "var(--font-ui)", resize: "vertical", color: "var(--color-text-primary)" }} />
              <div className="flex justify-end" style={{ marginTop: 6 }}>
                <button disabled={!reply.trim()} onClick={() => { onReply(ticket.id, reply.trim()); setReply(""); }} className="inline-flex items-center gap-1.5" style={{ background: reply.trim() ? "#892d9c" : "#d9c4e0", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: reply.trim() ? "pointer" : "not-allowed" }}><Icon name="send" size={11} /> Send</button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ── New ticket modal ─────────────────────────────────────────────────────── */
function NewTicketModal({ onClose, onSubmit }: any) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Incident");
  const [desc, setDesc] = useState("");
  const valid = title.trim() && desc.trim();
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 110, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 14, width: 460, maxWidth: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
        <div className="flex items-center justify-between px-5" style={{ height: 52, borderBottom: "1px solid var(--color-border)" }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>New Ticket</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", display: "flex" }}><Icon name="x" size={16} /></button>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 5, color: "var(--color-text-secondary)" }}>Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short summary of what you need" style={{ width: "100%", padding: "9px 11px", borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 13, fontFamily: "var(--font-ui)", outline: "none" }} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 5, color: "var(--color-text-secondary)" }}>Type *</label>
            <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: "100%", padding: "9px 11px", borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 13, fontFamily: "var(--font-ui)", background: "#fff", outline: "none" }}>
              {["Incident", "Feature", "Change", "Design", "Research", "Consulting"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 5, color: "var(--color-text-secondary)" }}>Description *</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={5} placeholder="Describe the issue or request in detail…" style={{ width: "100%", padding: "9px 11px", borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 13, fontFamily: "var(--font-ui)", outline: "none", resize: "vertical" }} />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={onClose} className="flex-1" style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 8, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "var(--color-text-secondary)" }}>Cancel</button>
            <button disabled={!valid} onClick={() => onSubmit({ title: title.trim(), type, desc: `<p>${desc.trim().replace(/</g, "&lt;")}</p>` })} className="flex-1" style={{ background: valid ? "#892d9c" : "#d9c4e0", color: "#fff", border: "none", borderRadius: 8, padding: "9px", fontSize: 13, fontWeight: 600, cursor: valid ? "pointer" : "not-allowed" }}>Submit Ticket →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── My Tickets tab ───────────────────────────────────────────────────────── */
function MyTicketsTab({ tickets, onReply, onMarkReplied, onMarkAllReplied, onCreate, toast }: any) {
  const [view, setView] = useState("kanban");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [newOpen, setNewOpen] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    STATUS_ORDER.forEach((s) => { c[s] = tickets.filter((t: any) => t.status === s).length; });
    return c;
  }, [tickets]);
  const totalCount = tickets.length;
  const doneCount = counts["Done – Production"] || 0;
  const openCount = totalCount - doneCount;
  const needsReplyCount = tickets.filter((t: any) => t.needs_reply).length;

  const matches = (t: any) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (t.title.toLowerCase().indexOf(q) < 0 && t.type.toLowerCase().indexOf(q) < 0) return false;
    }
    if (filter === "open") return t.status !== "Done – Production";
    if (filter === "needs_reply") return t.needs_reply;
    if (filter === "done") return t.status === "Done – Production";
    return true;
  };
  const filtered = tickets.filter(matches);
  const grouped = useMemo(() => {
    const g: Record<string, any[]> = {};
    STATUS_ORDER.forEach((s) => { g[s] = filtered.filter((t: any) => t.status === s).slice().sort(byDeadlineThenPriority); });
    return g;
  }, [filtered]);
  const listItems = filtered.slice().sort(byDeadlineThenPriority);
  const selectedLive = selected ? tickets.find((t: any) => t.id === selected.id) : null;

  const goList = () => { setView("list"); setFilter((f) => (f === "all" ? "open" : f)); };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3" style={{ marginBottom: 18 }}>
        <div className="flex items-center gap-2 flex-wrap">
          {view === "kanban" && <FilterChip label="All" count={totalCount} active={filter === "all"} onClick={() => setFilter("all")} />}
          <FilterChip label="Open" count={openCount} active={filter === "open"} onClick={() => setFilter("open")} />
          <FilterChip label="Needs reply" count={needsReplyCount} active={filter === "needs_reply"} onClick={() => setFilter("needs_reply")} icon={<Icon name="message" size={11} />} accent="#ef9f27" />
          <FilterChip label="Completed" count={doneCount} active={filter === "done"} onClick={() => setFilter("done")} />
        </div>
        <div className="relative" style={{ flex: "1 1 220px", maxWidth: 360 }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", display: "flex" }}><Icon name="search" size={13} /></span>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tickets…" style={{ width: "100%", padding: "7px 32px 7px 30px", borderRadius: 8, border: "1px solid var(--color-border)", fontSize: 12, background: "#fff", outline: "none", fontFamily: "var(--font-ui)" }} />
        </div>
        <div className="flex items-center gap-2">
          {needsReplyCount > 0 && (
            <button onClick={onMarkAllReplied} className="inline-flex items-center gap-1.5" style={{ background: "#fff", border: "1px solid #ef9f27", borderRadius: 999, padding: "5px 11px", fontSize: 12, fontWeight: 600, color: "#854f0b", cursor: "pointer" }}><Icon name="check" size={11} /> Mark all as replied</button>
          )}
          <div className="flex items-center" style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 8, padding: 2 }}>
            <ViewBtn active={view === "list"} onClick={goList} icon="list" label="List" />
            <ViewBtn active={view === "kanban"} onClick={() => setView("kanban")} icon="grid" label="Kanban" />
          </div>
          <button onClick={() => setNewOpen(true)} className="inline-flex items-center gap-1.5" style={{ background: "#892d9c", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}><Icon name="plus" size={13} /> New Ticket</button>
        </div>
      </div>

      {view === "list"
        ? (listItems.length === 0
            ? <div className="flex flex-col items-center justify-center" style={{ padding: 60, color: "var(--color-text-muted)", gap: 10 }}><Icon name="ticket" size={32} style={{ opacity: 0.2 }} /><span style={{ fontSize: 13 }}>Nothing matches this filter.</span></div>
            : <TicketList tickets={listItems} onSelect={setSelected} />)
        : <TicketKanban grouped={grouped} counts={counts} onSelect={setSelected} />}

      {selectedLive && <TicketDrawer ticket={selectedLive} onClose={() => setSelected(null)} onReply={onReply} onMarkReplied={onMarkReplied} />}
      {newOpen && <NewTicketModal onClose={() => setNewOpen(false)} onSubmit={(d: any) => { onCreate(d); setNewOpen(false); toast("Ticket inviato"); }} />}
    </div>
  );
}

/* ── Sprints tab ──────────────────────────────────────────────────────────── */
function ClientSprintCard({ sprint, selected, onClick }: any) {
  const used = sprintUsed(sprint);
  const planned = sprint.hours_planned || 0;
  const usedPct = planned > 0 ? Math.min(100, (used / planned) * 100) : 0;
  const overBudget = used > planned && sprint.status !== "PLANNED";
  return (
    <div onClick={onClick} style={{ background: selected ? "#f5eaf7" : "#fff", border: selected ? "1.5px solid rgba(137,45,156,0.35)" : "1px solid var(--color-border)", borderRadius: 12, padding: 14, cursor: "pointer", display: "flex", flexDirection: "column", gap: 10 }}>
      <div className="flex items-center justify-between gap-2"><SprintTypePill type={sprint.type} /><SprintStatusPill status={sprint.status} /></div>
      <div className="flex items-center gap-1.5" style={{ fontSize: 11, color: "var(--color-text-muted)" }}><Icon name="calendar" size={11} /><span>{fmtDate(sprint.start_date)} → {fmtEnd(sprint.end_date)}</span></div>
      <div>
        <div className="flex items-baseline justify-between" style={{ marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}><strong style={{ color: overBudget ? "#a32d2d" : "var(--color-text-primary)", fontWeight: 600 }}>{fmtHours(used)}</strong>{" / "}{fmtHours(planned)}</span>
          <span style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-secondary)" }}>{Math.round(usedPct)}%</span>
        </div>
        <div style={{ height: 5, background: "var(--color-border)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${usedPct}%`, background: overBudget ? "#e24b4a" : sprint.status === "COMPLETED" ? "#1d9e75" : "#892d9c" }} />
        </div>
      </div>
    </div>
  );
}
function MiniStat({ label, value, sub, color, icon }: any) {
  return (
    <div style={{ flex: "1 1 130px", minWidth: 130, background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: 10, padding: 10 }}>
      <div className="flex items-center gap-1.5" style={{ marginBottom: 4 }}>
        <span style={{ color: "var(--color-text-muted)", display: "flex" }}>{icon}</span>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-muted)" }}>{label}</span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: color || "var(--color-text-primary)", lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: "var(--color-text-muted)", marginTop: 3 }}>{sub}</div>}
    </div>
  );
}
function ClientSprintDetail({ sprint, onClose }: any) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const planned = sprint.hours_planned || 0;
  const used = sprintUsed(sprint);
  const remaining = planned - used;
  const usedPct = planned > 0 ? Math.min(100, (used / planned) * 100) : 0;
  const overBudget = used > planned;
  const byUser = sprint.members.slice().sort((a: any, b: any) => b.total - a.total);
  return (
    <div style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 12, padding: 18, position: "sticky", top: 0 }}>
      <div className="flex items-start justify-between gap-3" style={{ marginBottom: 16 }}>
        <div>
          <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: 6 }}><SprintTypePill type={sprint.type} /><SprintStatusPill status={sprint.status} /></div>
          <div className="flex items-center gap-1.5" style={{ fontSize: 13, color: "var(--color-text-secondary)" }}><Icon name="calendar" size={12} /> {fmtDate(sprint.start_date)} → {fmtEnd(sprint.end_date)}</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 6, color: "var(--color-text-muted)" }}><Icon name="x" size={15} /></button>
      </div>
      <div className="flex flex-wrap gap-2" style={{ marginBottom: 14 }}>
        <MiniStat label="Planned" value={fmtHours(planned)} icon={<Icon name="clock" size={11} />} />
        <MiniStat label="Used" value={fmtHours(used)} sub={`${Math.round(usedPct)}% of plan`} color={overBudget ? "#a32d2d" : undefined} icon={<Icon name="clock" size={11} />} />
        <MiniStat label={remaining >= 0 ? "Remaining" : "Over by"} value={fmtHours(Math.abs(remaining))} color={remaining < 0 ? "#a32d2d" : "#1d9e75"} icon={<Icon name="coins" size={11} />} />
      </div>
      <div style={{ height: 6, background: "var(--color-border)", borderRadius: 3, overflow: "hidden", marginBottom: 18 }}>
        <div style={{ height: "100%", width: `${usedPct}%`, background: overBudget ? "#e24b4a" : "#892d9c" }} />
      </div>
      <div style={{ marginBottom: 18 }}>
        <div className="flex items-center gap-1.5" style={{ marginBottom: 8 }}>
          <span style={{ color: "var(--color-text-muted)", display: "flex" }}><Icon name="users" size={12} /></span>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-secondary)" }}>Hours by team member</span>
        </div>
        <div className="flex flex-col gap-2">
          {byUser.map((m: any) => {
            const u = teamById(m.usr_id);
            const open = !!expanded[m.usr_id];
            const userPct = planned > 0 ? (m.total / planned) * 100 : 0;
            return (
              <div key={m.usr_id} style={{ background: "#fff", border: "1px solid var(--color-border)", borderRadius: 10, overflow: "hidden" }}>
                <button onClick={() => setExpanded((p) => ({ ...p, [m.usr_id]: !p[m.usr_id] }))} className="w-full flex items-center gap-3 text-left" style={{ background: "none", border: "none", cursor: "pointer", padding: "10px 12px" }}>
                  <span style={{ display: "flex", color: "var(--color-text-muted)" }}><Icon name={open ? "chevrondown" : "chevronright"} size={13} /></span>
                  <div className="rounded-full flex items-center justify-center" style={{ width: 28, height: 28, background: u?.color || avatarColor(u?.name || ""), fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{initialsOf(u?.name || "??")}</div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{u?.name || "Soraia team member"}</div>
                    <div style={{ fontSize: 10, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{u?.role || "team"}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{fmtHours(m.total)}</div>
                    <div style={{ fontSize: 10, color: "var(--color-text-muted)" }}>{Math.round(userPct)}%</div>
                  </div>
                </button>
                {open && (
                  <div style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg)" }}>
                    {m.entries.map((e: any) => (
                      <div key={e.id} className="flex items-start gap-3 px-4 py-2" style={{ borderBottom: "1px solid var(--color-border)" }}>
                        <span style={{ fontSize: 11, color: "var(--color-text-muted)", width: 64, flexShrink: 0 }}>{fmtDay(e.date)}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, width: 38, flexShrink: 0 }}>{fmtHours(e.hours)}</span>
                        {/<[a-z][\s\S]*>/i.test(e.notes)
                          ? <div className="rte-content" style={{ fontSize: 11, color: "var(--color-text-secondary)", flex: 1, lineHeight: 1.5, minWidth: 0 }} dangerouslySetInnerHTML={{ __html: e.notes }} />
                          : <span style={{ fontSize: 11, color: "var(--color-text-secondary)", flex: 1, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{e.notes}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function SprintsTab() {
  const [selected, setSelected] = useState<string | null>("s7");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const groups = [
    { status: "IN_PROGRESS", items: SPRINTS.filter((s) => s.status === "IN_PROGRESS") },
    { status: "COMPLETED", items: SPRINTS.filter((s) => s.status === "COMPLETED") },
  ].filter((g) => g.items.length > 0);
  const selectedSprint = selected ? SPRINTS.find((s) => s.id === selected) : null;
  return (
    <div className="grid gap-6 sprint-grid" style={{ gridTemplateColumns: selectedSprint ? "minmax(280px, 1fr) 1.6fr" : "1fr" }}>
      <div className="flex flex-col gap-5">
        {groups.map(({ status, items }) => {
          const isCollapsed = !!collapsed[status];
          const cfg = SPRINT_STATUS[status];
          return (
            <div key={status}>
              <button onClick={() => setCollapsed((p) => ({ ...p, [status]: !p[status] }))} className="flex items-center gap-2 w-full text-left" style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 0 10px" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.dot }} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-secondary)" }}>{cfg.label}</span>
                <span style={{ fontSize: 11, color: "var(--color-text-muted)", background: "var(--color-border)", borderRadius: 20, padding: "1px 6px", fontWeight: 500 }}>{items.length}</span>
                <span style={{ marginLeft: 2, color: "var(--color-text-muted)", display: "flex" }}><Icon name={isCollapsed ? "chevronright" : "chevrondown"} size={13} /></span>
              </button>
              {!isCollapsed && (
                <div className="flex flex-col gap-2">
                  {items.map((s) => <ClientSprintCard key={s.id} sprint={s} selected={selected === s.id} onClick={() => setSelected((prev) => (prev === s.id ? null : s.id))} />)}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selectedSprint && <ClientSprintDetail sprint={selectedSprint} onClose={() => setSelected(null)} />}
    </div>
  );
}

/* ── Root ─────────────────────────────────────────────────────────────────── */
export default function PortalDemo() {
  const [tab, setTab] = useState("tickets");
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search).get("tab");
      if (p === "sprints" || p === "tickets") setTab(p);
    } catch { /* no-op */ }
  }, []);
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toast = (m: string) => { setToastMsg(m); window.setTimeout(() => setToastMsg((cur) => (cur === m ? null : cur)), 2600); };

  const ticketCount = tickets.length;
  const needsReplyCount = tickets.filter((t) => t.needs_reply).length;

  const onReply = (id: number, body: string) => {
    setTickets((ts) => ts.map((t) => t.id === id ? { ...t, needs_reply: false, comments: [...t.comments, { id: Date.now(), author_name: ME.name, author_role: "CLIENT", created_at: new Date().toISOString(), body }] } : t));
    toast("Messaggio inviato");
  };
  const onMarkReplied = (id: number) => setTickets((ts) => ts.map((t) => t.id === id ? { ...t, needs_reply: false } : t));
  const onMarkAllReplied = () => { setTickets((ts) => ts.map((t) => ({ ...t, needs_reply: false }))); toast("Tutti i ticket segnati come risposti"); };
  const onCreate = (d: any) => setTickets((ts) => [{ id: Date.now(), title: d.title, priority: "", type: d.type, status: "Ticket Received", needs_reply: false, deadline: "", creator_name: ME.name, attachments_count: 0, comments_count: 0, request_text: d.desc, comments: [] }, ...ts]);

  return (
    <div className="portal-app" style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--color-bg)", color: "var(--color-text-primary)" }}>
      <PortalTopbar />
      <PortalTabs activeTab={tab} onChange={setTab} ticketCount={ticketCount} needsReplyCount={needsReplyCount} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ maxWidth: 1700, margin: "0 auto", padding: "16px 12px" }}>
          {tab === "tickets"
            ? <MyTicketsTab tickets={tickets} onReply={onReply} onMarkReplied={onMarkReplied} onMarkAllReplied={onMarkAllReplied} onCreate={onCreate} toast={toast} />
            : <SprintsTab />}
        </div>
      </div>
      {toastMsg && (
        <div style={{ position: "fixed", bottom: 22, left: "50%", transform: "translateX(-50%)", background: "#1a1a1a", color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 500, zIndex: 200, boxShadow: "0 8px 24px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="check" size={14} /> {toastMsg}
        </div>
      )}
    </div>
  );
}
