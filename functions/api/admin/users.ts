// /api/admin/users  (GET list · POST add · PATCH role/active · DELETE remove) — admin only.
import { AdminEnv, parseCookies, verifySession, getActiveUser, SESSION_COOKIE, json } from "../../_lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function requireAdmin(request: Request, env: AdminEnv) {
  const c = parseCookies(request.headers.get("Cookie"));
  const s = await verifySession(env.SESSION_SECRET, c[SESSION_COOKIE]);
  if (!s) return null;
  const u = await getActiveUser(env.soraia_leads, s.email);
  return u && u.role === "admin" ? u : null;
}

export const onRequestGet: PagesFunction<AdminEnv> = async ({ request, env }) => {
  if (!(await requireAdmin(request, env))) return json({ error: "Forbidden" }, 403);
  const { results } = await env.soraia_leads.prepare(
    "SELECT email, role, active, created_at, created_by FROM users ORDER BY created_at DESC"
  ).all();
  return json({ users: results });
};

export const onRequestPost: PagesFunction<AdminEnv> = async ({ request, env }) => {
  const admin = await requireAdmin(request, env);
  if (!admin) return json({ error: "Forbidden" }, 403);
  let email = "", role = "editor";
  try { const b = await request.json<{ email?: string; role?: string }>(); email = (b.email || "").trim().toLowerCase(); role = b.role === "admin" ? "admin" : "editor"; }
  catch { return json({ error: "Invalid JSON" }, 400); }
  if (!EMAIL_RE.test(email)) return json({ error: "Email non valida" }, 400);
  await env.soraia_leads.prepare(
    "INSERT INTO users (email, role, active, created_by) VALUES (?,?,1,?) ON CONFLICT(email) DO UPDATE SET role=excluded.role, active=1"
  ).bind(email, role, admin.email).run();
  return json({ ok: true });
};

export const onRequestPatch: PagesFunction<AdminEnv> = async ({ request, env }) => {
  const admin = await requireAdmin(request, env);
  if (!admin) return json({ error: "Forbidden" }, 403);
  let email = "", role: string | undefined, active: number | undefined;
  try { const b = await request.json<{ email?: string; role?: string; active?: boolean }>(); email = (b.email || "").trim().toLowerCase(); if (b.role) role = b.role === "admin" ? "admin" : "editor"; if (typeof b.active === "boolean") active = b.active ? 1 : 0; }
  catch { return json({ error: "Invalid JSON" }, 400); }
  if (!EMAIL_RE.test(email)) return json({ error: "Email non valida" }, 400);
  if (email === admin.email && (active === 0 || role === "editor")) return json({ error: "Non puoi rimuovere i tuoi permessi di admin (evita il lockout)." }, 400);
  if (role !== undefined) await env.soraia_leads.prepare("UPDATE users SET role=? WHERE email=?").bind(role, email).run();
  if (active !== undefined) await env.soraia_leads.prepare("UPDATE users SET active=? WHERE email=?").bind(active, email).run();
  return json({ ok: true });
};

export const onRequestDelete: PagesFunction<AdminEnv> = async ({ request, env }) => {
  const admin = await requireAdmin(request, env);
  if (!admin) return json({ error: "Forbidden" }, 403);
  let email = "";
  try { const b = await request.json<{ email?: string }>(); email = (b.email || "").trim().toLowerCase(); }
  catch { return json({ error: "Invalid JSON" }, 400); }
  if (email === admin.email) return json({ error: "Non puoi eliminare te stesso." }, 400);
  await env.soraia_leads.prepare("DELETE FROM users WHERE email=?").bind(email).run();
  return json({ ok: true });
};
