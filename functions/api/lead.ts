// Cloudflare Pages Function: POST /api/lead
// Riceve il form LeadForm.tsx e manda mail di notifica via Brevo.
// Configurazione: secrets BREVO_API_KEY + env LEAD_TO_EMAIL su Cloudflare Pages dashboard.

interface Env {
  BREVO_API_KEY: string;
  LEAD_TO_EMAIL: string;
  LEAD_FROM_EMAIL?: string;
  soraia_leads: D1Database;
}

interface LeadPayload {
  name?: string;
  company?: string;
  role?: string;
  email?: string;
  recruiters?: string;  // legacy field name, in realtà è "dimensione team"
  message?: string;
  source?: string;
  lang?: string;
  ts?: string;
}

const REQUIRED_FIELDS: (keyof LeadPayload)[] = ["name", "company", "email"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[c]!));
}

function row(label: string, value: string | undefined): string {
  const v = value && value.trim() ? escapeHtml(value) : "<em style='color:#999'>-</em>";
  return `<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;width:140px"><b>${label}</b></td><td style="padding:6px 0;color:#1a1a1a">${v}</td></tr>`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Parse JSON
  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Validate required
  for (const f of REQUIRED_FIELDS) {
    if (!data[f] || typeof data[f] !== "string" || !(data[f] as string).trim()) {
      return new Response(JSON.stringify({ error: `Missing field: ${f}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  if (!EMAIL_RE.test(data.email!)) {
    return new Response(JSON.stringify({ error: "Invalid email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Env check
  if (!env.BREVO_API_KEY || !env.LEAD_TO_EMAIL) {
    console.error("Missing env: BREVO_API_KEY or LEAD_TO_EMAIL");
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
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
          request.headers.get("cf-connecting-ip") || null,
          emailSent ? 1 : 0
        )
        .run();
    } catch (dbErr) {
      console.error("D1 insert failed:", dbErr);
      // Don't fail the request if just the DB write fails. La mail conta.
    }
  }

  if (!emailSent) {
    return new Response(JSON.stringify({ error: "Email send failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
