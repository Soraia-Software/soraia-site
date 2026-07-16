// POST /api/auth/request-otp  { email }
// Sends a 6-digit OTP via Brevo, ONLY to emails present in `users` with active=1.
// Generic 200 response either way (no account enumeration). 30s resend cooldown.
import { AdminEnv, getActiveUser, generateOtp, otpHash, sendOtpEmail, json } from "../../_lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost: PagesFunction<AdminEnv> = async ({ request, env }) => {
  let email = "";
  try { const b = await request.json<{ email?: string }>(); email = (b.email || "").trim().toLowerCase(); }
  catch { return json({ error: "Invalid JSON" }, 400); }
  if (!EMAIL_RE.test(email)) return json({ error: "Email non valida" }, 400);

  const db = env.soraia_leads;
  const user = await getActiveUser(db, email);
  if (!user) return json({ ok: true }); // generic: don't reveal whether the email is authorized

  // 30s resend cooldown
  const last = await db.prepare("SELECT created_at FROM otp_codes WHERE email=? ORDER BY created_at DESC LIMIT 1")
    .bind(email).first<{ created_at: string }>();
  if (last && Date.now() - Date.parse(last.created_at) < 30_000)
    return json({ error: "Attendi qualche secondo prima di richiedere un nuovo codice." }, 429);

  if (!env.SESSION_SECRET) return json({ error: "Server non configurato (SESSION_SECRET mancante)." }, 500);

  const code = generateOtp();
  const hash = await otpHash(email, code);
  const now = new Date();
  const expires = new Date(now.getTime() + 10 * 60 * 1000).toISOString();
  await db.prepare("DELETE FROM otp_codes WHERE email=?").bind(email).run();
  await db.prepare("INSERT INTO otp_codes (email, code_hash, expires_at, attempts, created_at) VALUES (?,?,?,0,?)")
    .bind(email, hash, expires, now.toISOString()).run();

  const sent = await sendOtpEmail(env, email, code);
  if (!sent) return json({ error: "Invio email fallito, riprova tra poco." }, 502);
  return json({ ok: true });
};
