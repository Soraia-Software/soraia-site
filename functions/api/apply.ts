// Cloudflare Pages Function: POST /api/apply  (multipart/form-data)
// Riceve una candidatura (campi + CV) da ApplicationForm.tsx, applica le stesse difese
// anti-bot di /api/lead (fail-closed su Turnstile + rate-limit per IP), verifica la presa
// visione dell'informativa, e invia la candidatura via Brevo AI FOUNDER con il CV in
// allegato. Il CV non viene persistito su D1: vive solo nell'email (minimizzazione).
// Base giuridica del trattamento: misure precontrattuali (art. 6.1.b) + legittimo
// interesse alla selezione (art. 6.1.f), NON consenso.
//
// Config: secrets BREVO_API_KEY + TURNSTILE_SECRET (obbligatorio), var LEAD_FROM_EMAIL,
//   var APPLY_TO_EMAILS (destinatari separati da virgola; default = solo Daniel finche
//   l'indirizzo di Davide non e confermato). Binding D1 soraia_leads per il rate-limit.

interface Env {
  BREVO_API_KEY: string;
  LEAD_FROM_EMAIL?: string;
  APPLY_TO_EMAILS?: string;
  TURNSTILE_SECRET?: string;
  soraia_leads?: D1Database;
}

// Solo l'indirizzo confermato. Davide (o altri) si aggiungono via APPLY_TO_EMAILS
// nell'env di Pages una volta verificato che la casella riceve davvero.
const DEFAULT_TO = "daniel.levis@soraia.io";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BYTES = 8 * 1024 * 1024;                 // CV max 8 MB
const MAX_CONTENT_LENGTH = 10 * 1024 * 1024;       // pre-parse guard (8 MB + overhead multipart)
const MIN_FILL_MS = 2500;
const ALLOWED_EXT = /\.(pdf|docx?)$/i;
const RATE_MAX = 5;                                // candidature per IP...
const RATE_WINDOW = "-1 hour";                     // ...in questa finestra

const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json" } });

const ALLOWED_HOSTS = new Set(["soraia.io", "www.soraia.io"]);
function hostOk(u: string | null): boolean {
  if (!u) return false;
  try { const h = new URL(u).hostname; return ALLOWED_HOSTS.has(h) || h.endsWith(".pages.dev"); } catch { return false; }
}
function fromOurSite(req: Request): boolean {
  const o = req.headers.get("origin");
  if (o) return hostOk(o);
  const r = req.headers.get("referer");
  if (r) return hostOk(r);
  return false;
}

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    return !!((await r.json()) as { success?: boolean }).success;
  } catch { return false; }
}

function esc(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]!));
}
// Strip control chars (incl. CR/LF) + collapse whitespace: for subject and attachment name.
function clean(s: string): string {
  return String(s).replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim();
}
function base64(bytes: Uint8Array): string {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(bin);
}
// Magic-byte check: real content must match the allowed types, not just the extension.
function magicOk(b: Uint8Array): boolean {
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) return true; // %PDF
  if (b[0] === 0x50 && b[1] === 0x4b) return true;                                   // PK.. (docx/zip)
  if (b[0] === 0xd0 && b[1] === 0xcf && b[2] === 0x11 && b[3] === 0xe0) return true; // legacy .doc
  return false;
}
const cut = (s: string | null, n: number) => (s || "").toString().slice(0, n);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const ip = request.headers.get("cf-connecting-ip");

  // 1) Allowlist Origin/Referer (defense-in-depth)
  if (!fromOurSite(request)) return json({ error: "Forbidden" }, 403);

  // 2) Pre-parse body-size guard: reject before buffering a huge multipart body
  const cl = Number(request.headers.get("content-length") || 0);
  if (cl && cl > MAX_CONTENT_LENGTH) return json({ error: "CV troppo grande" }, 413);

  let form: FormData;
  try { form = await request.formData(); } catch { return json({ error: "Invalid form" }, 400); }
  const f = (k: string) => (typeof form.get(k) === "string" ? (form.get(k) as string) : "");

  // 3) Honeypot -> finto successo
  if (f("company_website").trim() !== "") return json({ ok: true });

  // 4) Time-trap
  const rt = Number(f("rt"));
  if (Number.isFinite(rt) && rt > 0) {
    const el = Date.now() - rt;
    if (el >= 0 && el < MIN_FILL_MS) return json({ ok: true });
  }

  // 5) Turnstile: FAIL CLOSED. Senza secret configurato l'endpoint non accetta nulla.
  if (!env.TURNSTILE_SECRET) { console.error("apply: TURNSTILE_SECRET missing"); return json({ error: "Server misconfigured" }, 500); }
  if (!(await verifyTurnstile(env.TURNSTILE_SECRET, f("turnstileToken"), ip))) return json({ error: "Verifica anti-bot non superata" }, 403);

  // 6) Rate-limit per IP (D1, resiliente: se non disponibile non blocca)
  if (env.soraia_leads && ip) {
    try {
      const r = await env.soraia_leads
        .prepare(`SELECT COUNT(*) AS c FROM apply_ratelimit WHERE ip = ? AND created_at > datetime('now', ?)`)
        .bind(ip, RATE_WINDOW).first<{ c: number }>();
      if (r && Number(r.c) >= RATE_MAX) return json({ error: "Troppe candidature. Riprova più tardi." }, 429);
      await env.soraia_leads.prepare(`INSERT INTO apply_ratelimit (ip) VALUES (?)`).bind(ip).run();
    } catch (e) { console.error("apply rate-limit skipped:", e); }
  }

  // 7) Validazione campi + presa visione informativa (NON consenso: base giuridica art. 6.1.b/f)
  const name = clean(cut(f("name"), 120));
  const email = cut(f("email"), 160).trim();
  const presaVisione = f("presa_visione");
  if (!name || !email) return json({ error: "Nome ed email sono obbligatori" }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: "Email non valida" }, 400);
  if (!presaVisione || presaVisione === "false") return json({ error: "Conferma di aver letto l'informativa privacy per i candidati." }, 400);

  // 8) CV: presenza + dimensione + estensione + contenuto (magic bytes)
  const cv = form.get("cv");
  if (!(cv instanceof File) || cv.size === 0) return json({ error: "CV mancante" }, 400);
  if (cv.size > MAX_BYTES) return json({ error: "CV troppo grande" }, 413);
  if (!ALLOWED_EXT.test(cv.name)) return json({ error: "Formato CV non valido (PDF, DOC, DOCX)" }, 400);
  const bytes = new Uint8Array(await cv.arrayBuffer());
  if (!magicOk(bytes)) return json({ error: "Il file non sembra un PDF/DOC/DOCX valido" }, 400);

  if (!env.BREVO_API_KEY) { console.error("Missing BREVO_API_KEY"); return json({ error: "Server misconfigured" }, 500); }

  const roleTitle = clean(cut(f("roleTitle") || f("role") || "Candidatura spontanea", 120));
  const phone = clean(cut(f("phone"), 60));
  const linkedin = clean(cut(f("linkedin"), 300));
  const message = cut(f("message"), 2000);
  const channel = f("utm_source") ? clean(`${cut(f("utm_source"), 80)}${f("utm_campaign") ? " · " + cut(f("utm_campaign"), 80) : ""}`) : (clean(cut(f("referrer"), 200)) || "diretto");
  const fromEmail = env.LEAD_FROM_EMAIL || "noreply@soraia.io";
  const to = (env.APPLY_TO_EMAILS || DEFAULT_TO).split(",").map((e) => e.trim()).filter((e) => EMAIL_RE.test(e)).map((e) => ({ email: e }));
  if (!to.length) { console.error("apply: no valid recipient"); return json({ error: "Server misconfigured" }, 500); }

  // Attachment name from a sanitized base + allowlisted extension (never the raw filename).
  const ext = (cv.name.match(ALLOWED_EXT)?.[0] || ".pdf").toLowerCase();
  const attName = `CV-${(name.replace(/[^\p{L}\p{N}\-]+/gu, "_").slice(0, 40) || "candidato")}${ext}`;

  const row = (l: string, v: string) => v ? `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;width:140px"><b>${l}</b></td><td style="padding:6px 0;color:#1a1a1a">${esc(v)}</td></tr>` : "";
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a">
      <h2 style="margin:0 0 4px;font-size:22px;font-weight:500">Nuova candidatura</h2>
      <p style="margin:0 0 20px;color:#666;font-size:14px">Ruolo: <b>${esc(roleTitle)}</b> · ${esc(clean(cut(f("ts"), 40)) || new Date().toISOString())}</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;line-height:1.5">
        ${row("Nome", name)}
        ${row("Email", email)}
        ${row("Telefono", phone)}
        ${row("LinkedIn", linkedin)}
        ${row("Canale", channel)}
        ${row("Messaggio", message)}
      </table>
      <p style="margin:24px 0 0;color:#666;font-size:13px">CV in allegato. Informativa privacy per i candidati: presa visione confermata. Rispondi a questa email per scrivere a <a href="mailto:${esc(email)}">${esc(email)}</a>.</p>
    </div>`;

  let sent = false;
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-key": env.BREVO_API_KEY, accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "Soraia Careers", email: fromEmail },
        to,
        replyTo: { email, name },
        subject: clean(`Candidatura: ${roleTitle} - ${name}`),
        htmlContent: html,
        attachment: [{ name: attName, content: base64(bytes) }],
      }),
    });
    sent = res.ok;
    if (!res.ok) console.error("Brevo apply send failed:", res.status, await res.text());
  } catch (e) { console.error("apply send threw:", e); }

  if (!sent) return json({ error: "Invio non riuscito" }, 502);
  return json({ ok: true });
};
