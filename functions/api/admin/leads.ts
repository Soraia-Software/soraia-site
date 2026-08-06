// GET /api/admin/leads  -> the website-form contacts (any active admin/editor session).
import { AdminEnv, parseCookies, verifySession, getActiveUser, SESSION_COOKIE, json } from "../../_lib/auth";

export const onRequestGet: PagesFunction<AdminEnv> = async ({ request, env }) => {
  const c = parseCookies(request.headers.get("Cookie"));
  const s = await verifySession(env.SESSION_SECRET, c[SESSION_COOKIE]);
  if (!s) return json({ error: "Forbidden" }, 403);
  const u = await getActiveUser(env.soraia_leads, s.email);
  if (!u) return json({ error: "Forbidden" }, 403);
  const { results } = await env.soraia_leads.prepare(
    "SELECT id, name, company, role, email, team_size, message, source, lang, email_sent, created_at, utm_source, utm_medium, utm_campaign, referrer, landing_page FROM leads ORDER BY created_at DESC LIMIT 500"
  ).all();
  return json({ leads: results });
};
