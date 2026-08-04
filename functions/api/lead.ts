// Cloudflare Pages Function: POST /api/lead
// Riceve il form LeadForm.tsx, valida, difende dal bot-spam e manda la mail di notifica via Brevo.
//
// Difese anti-abuso (in ordine, dalla più economica alla più forte):
//   1. Allowlist Origin/Referer  → blocca i POST diretti fuori dal sito (fuzzer/scanner).
//   2. Honeypot (company_website) → campo nascosto: se compilato è un bot → finto 200, niente insert.
//   3. Time-trap (rt)             → submit troppo veloce dopo il render = bot → finto 200.
//   4. Cloudflare Turnstile       → se TURNSTILE_SECRET è configurato, il token è OBBLIGATORIO.
//   5. Validazione + limiti lunghezza sui campi.
//   6. Rate-limit per IP (D1)     → max N invii / 10 minuti dallo stesso IP.
//
// I payload SQLi/XSS restano innocui: D1 usa prepared statement (.bind) e la mail fa escapeHtml.
// Config: secrets BREVO_API_KEY (+ TURNSTILE_SECRET opzionale), var LEAD_TO_EMAIL / LEAD_FROM_EMAIL.

interface Env {
  BREVO_API_KEY: string;
  LEAD_TO_EMAIL: string;
  LEAD_FROM_EMAIL?: string;
  TURNSTILE_SECRET?: string; // se presente, il token Turnstile diventa obbligatorio
  soraia_leads: D1Database;
}

interface LeadPayload {
  name?: string;
  company?: string;
  role?: string;
  email?: string;
  recruiters?: string; // legacy field name, in realtà è "dimensione team"
  message?: string;
  source?: string;
  lang?: string;
  ts?: string;
  rt?: number;                 // epoch ms in cui il form è stato renderizzato (time-trap)
  company_website?: string;    // honeypot: i browser umani lo lasciano vuoto
  turnstileToken?: string;     // token Cloudflare Turnstile
}

const REQUIRED_FIELDS: (keyof LeadPayload)[] = ["name", "company", "email"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Limiti di lunghezza per campo: un form umano non li supera; tagliano i payload-bomba.
const MAX_LEN: Record<string, number> = {
  name: 120, company: 120, role: 120, email: 160, recruiters: 40, message: 2000, source: 60, lang: 8,
};
const MIN_FILL_MS = 2500; // sotto questa soglia dopo il render è quasi certamente un bot
const RATE_MAX = 5;       // invii massimi per IP...
const RATE_WINDOW = "-10 minutes"; // ...in questa finestra

const json = (obj: unknown, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });

const ALLOWED_HOSTS = new Set(["soraia.io", "www.soraia.io"]);
function hostAllowed(u: string | null): boolean {
  if (!u) return false;
  try {
    const h = new URL(u).hostname;
    return ALLOWED_HOSTS.has(h) || h.endsWith(".pages.dev"); // .pages.dev = anteprime deploy
  } catch {
    return false;
  }
}
// Il form del sito invia sempre Origin (o almeno Referer) verso soraia.io; uno scanner
// che fa POST diretto di solito no. Blocca chi non proviene dal sito.
function fromOurSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (origin) return hostAllowed(origin);
  const referer = request.headers.get("referer");
  if (referer) return hostAllowed(referer);
  return false;
}

async function verifyTurnstile(secret: string, token: string | undefined, ip: string | null): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const out = (await res.json()) as { success?: boolean };
    return !!out.success;
  } catch {
    return false;
  }
}

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  }[c]!));
}

function row(label: string, value: string | undefined): string {
  const v = value && value.trim() ? escapeHtml(value) : "<em style='color:#999'>-</em>";
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;width:140px"><b>${label}</b></td><td style="padding:6px 0;color:#1a1a1a">${v}</td></tr>`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const ip = request.headers.get("cf-connecting-ip");

  // 1) Allowlist Origin/Referer — blocca i POST che non arrivano dal sito.
  if (!fromOurSite(request)) {
    return json({ error: "Forbidden" }, 403);
  }

  // Parse JSON
  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  // 2) Honeypot — campo nascosto compilato = bot. Fingi successo, non scrivere nulla.
  if (data.company_website && String(data.company_website).trim() !== "") {
    return json({ ok: true });
  }

  // 3) Time-trap — invio troppo rapido dopo il render = bot. Fingi successo.
  if (typeof data.rt === "number" && Number.isFinite(data.rt)) {
    const elapsed = Date.now() - data.rt;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
      return json({ ok: true });
    }
  }

  // 4) Turnstile — se il secret è configurato, il token è obbligatorio e deve verificare.
  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET, data.turnstileToken, ip);
    if (!ok) return json({ error: "Verifica anti-bot non superata" }, 403);
  }

  // 5) Validazione campi obbligatori + email + limiti di lunghezza.
  for (const f of REQUIRED_FIELDS) {
    if (!data[f] || typeof data[f] !== "string" || !(data[f] as string).trim()) {
      return json({ error: `Missing field: ${f}` }, 400);
    }
  }
  if (!EMAIL_RE.test(data.email!)) {
    return json({ error: "Invalid email" }, 400);
  }
  for (const [f, max] of Object.entries(MAX_LEN)) {
    const val = (data as Record<string, unknown>)[f];
    if (typeof val === "string" && val.length > max) {
      return json({ error: `Field too long: ${f}` }, 400);
    }
  }

  // Env check
  if (!env.BREVO_API_KEY || !env.LEAD_TO_EMAIL) {
    console.error("Missing env: BREVO_API_KEY or LEAD_TO_EMAIL");
    return json({ error: "Server misconfigured" }, 500);
  }

  // 6) Rate-limit per IP: non più di RATE_MAX invii andati a buon fine nella finestra.
  if (env.soraia_leads && ip) {
    try {
      const r = await env.soraia_leads
        .prepare(`SELECT COUNT(*) AS c FROM leads WHERE ip = ? AND created_at > datetime('now', ?)`)
        .bind(ip, RATE_WINDOW)
        .first<{ c: number }>();
      if (r && Number(r.c) >= RATE_MAX) {
        return json({ error: "Troppe richieste. Riprova tra qualche minuto." }, 429);
      }
    } catch (e) {
      console.error("rate-limit query failed:", e);
      // in caso di errore query non blocchiamo il lead legittimo
    }
  }

  const fromEmail = env.LEAD_FROM_EMAIL || "noreply@soraia.io";
  const subject = `Nuovo lead soraia.io: ${data.name} - ${data.company}`;
  const htmlContent = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#1a1a1a">
      <h2 style="margin:0 0 8px;font-size:22px;font-weight:500;letter-spacing:-0.01em">Nuovo lead da soraia.io</h2>
      <p style="margin:0 0 24px;color:#666;font-size:14px">Form compilato il ${escapeHtml(data.ts || new Date().toISOString())}</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;line-height:1.5">
        ${row("Nome", data.name)}
        ${row("Azienda", data.company)}
        ${row("Ruolo", data.role)}
        ${row("Email", data.email)}
        ${row("Dimensione team", data.recruiters)}
        ${row("Messaggio", data.message)}
        ${row("Source", data.source)}
        ${row("Lingua", data.lang)}
      </table>
      <p style="margin:32px 0 0;padding-top:16px;border-top:1px solid #eee;color:#666;font-size:13px">
        Rispondi direttamente a questa email per scrivere a <b>${escapeHtml(data.name!)}</b>: il Reply-To è impostato su <a href="mailto:${escapeHtml(data.email!)}" style="color:#4A1E5C">${escapeHtml(data.email!)}</a>.
      </p>
    </div>
  `;

  // Send via Brevo
  let emailSent = false;
  try {
    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": env.BREVO_API_KEY,
        "accept": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Soraia Lead Form", email: fromEmail },
        to: [{ email: env.LEAD_TO_EMAIL }],
        replyTo: { email: data.email, name: data.name },
        subject,
        htmlContent,
      }),
    });
    if (brevoRes.ok) {
      emailSent = true;
    } else {
      const errText = await brevoRes.text();
      console.error("Brevo send failed:", brevoRes.status, errText);
    }
  } catch (err) {
    console.error("Brevo fetch threw:", err);
  }

  // Persist to D1 (anche se la mail fallisce, così il lead non si perde)
  if (env.soraia_leads) {
    try {
      await env.soraia_leads
        .prepare(
          `INSERT INTO leads (name, company, role, email, team_size, message, source, lang, user_agent, ip, email_sent)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          data.name!,
          data.company!,
          data.role || null,
          data.email!,
          data.recruiters || null,
          data.message || null,
          data.source || null,
          data.lang || null,
          request.headers.get("user-agent") || null,
          ip || null,
          emailSent ? 1 : 0
        )
        .run();
    } catch (dbErr) {
      console.error("D1 insert failed:", dbErr);
      // Don't fail the request if just the DB write fails. La mail conta.
    }
  }

  if (!emailSent) {
    return json({ error: "Email send failed" }, 502);
  }

  return json({ ok: true });
};
