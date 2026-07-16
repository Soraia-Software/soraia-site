// POST /api/auth/verify-otp  { email, code }  -> sets the signed session cookie on success.
import { AdminEnv, otpHash, timingSafeEqual, getActiveUser, createSession, sessionCookie, json } from "../../_lib/auth";

export const onRequestPost: PagesFunction<AdminEnv> = async ({ request, env }) => {
  let email = "", code = "";
  try { const b = await request.json<{ email?: string; code?: string }>(); email = (b.email || "").trim().toLowerCase(); code = (b.code || "").trim(); }
  catch { return json({ error: "Invalid JSON" }, 400); }
  if (!email || !/^\d{6}$/.test(code)) return json({ error: "Codice non valido" }, 400);
  if (!env.SESSION_SECRET) return json({ error: "Server non configurato." }, 500);

  const db = env.soraia_leads;
  const rec = await db.prepare("SELECT rowid AS rid, code_hash, expires_at, attempts FROM otp_codes WHERE email=? ORDER BY created_at DESC LIMIT 1")
    .bind(email).first<{ rid: number; code_hash: string; expires_at: string; attempts: number }>();
  if (!rec) return json({ error: "Nessun codice attivo, richiedine uno nuovo." }, 400);

  if (rec.attempts >= 5) { await db.prepare("DELETE FROM otp_codes WHERE email=?").bind(email).run(); return json({ error: "Troppi tentativi. Richiedi un nuovo codice." }, 429); }
  if (Date.parse(rec.expires_at) < Date.now()) { await db.prepare("DELETE FROM otp_codes WHERE email=?").bind(email).run(); return json({ error: "Codice scaduto, richiedine uno nuovo." }, 400); }

  await db.prepare("UPDATE otp_codes SET attempts = attempts + 1 WHERE rowid=?").bind(rec.rid).run();
  const hash = await otpHash(email, code);
  if (!timingSafeEqual(hash, rec.code_hash)) return json({ error: "Codice errato." }, 400);

  const user = await getActiveUser(db, email);
  if (!user) return json({ error: "Utente non abilitato." }, 403);

  const token = await createSession(env.SESSION_SECRET, user.email, user.role);
  await db.prepare("DELETE FROM otp_codes WHERE email=?").bind(email).run();
  return json({ ok: true, role: user.role }, 200, { "Set-Cookie": sessionCookie(token) });
};
