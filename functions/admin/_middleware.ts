// Pages Functions middleware SCOPED to /admin/* only (so a bug here can never touch the
// public site or /api/lead). Gates admin pages by session: anonymous -> redirect to login.
// The /api/admin/* and /api/auth/* endpoints self-gate; this only guards the admin pages.
import { AdminEnv, parseCookies, verifySession, getActiveUser, SESSION_COOKIE } from "../_lib/auth";

export const onRequest: PagesFunction<AdminEnv> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const p = url.pathname.replace(/\/$/, "");
  // The login page must be reachable while anonymous.
  if (p === "/admin/login") return next();

  const c = parseCookies(request.headers.get("Cookie"));
  const sess = await verifySession(env.SESSION_SECRET, c[SESSION_COOKIE]);
  const user = sess ? await getActiveUser(env.soraia_leads, sess.email) : null; // re-check active in DB
  if (!user) {
    const to = new URL("/admin/login", url.origin);
    to.searchParams.set("next", url.pathname);
    return Response.redirect(to.toString(), 302);
  }
  return next();
};
