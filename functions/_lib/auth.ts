// Shared auth helpers for the Soraia admin (Cloudflare Pages Functions runtime, Web Crypto).
// Underscore-prefixed dir => not routed; imported by the auth/admin endpoints + middleware.
//
// Security model:
// - OTP: 6-digit CSPRNG, stored ONLY as SHA-256("email:code") hex, TTL 10 min, max 5 attempts.
// - Session: stateless, HMAC-SHA256-signed cookie {email, role, exp}. No session table.
// - SESSION_SECRET from env; if missing, verify/sign fail closed (no access granted).

export interface AdminEnv {
  soraia_leads: D1Database;
  SESSION_SECRET: string;
  BREVO_API_KEY: string;
  LEAD_FROM_EMAIL?: string; // reused as the OTP "From"; defaults to noreply@soraia.io
}

export interface SessionUser { email: string; role: "admin" | "editor"; exp: number; }

export const SESSION_COOKIE = "soraia_session";
const SESSION_TTL_S = 60 * 60 * 24 * 30; // 30 days
const enc = new TextEncoder();

// ---- base64url ----
export function b64uEncode(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export function b64uEncodeStr(str: string): string { return b64uEncode(enc.encode(str)); }
function b64uDecodeToStr(s: string): string {
  const pad = s.length % 4 ? "=".repeat(4 - (s.length % 4)) : "";
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  return decodeURIComponent(escape(bin));
}

// ---- constant-time compare (equal-length hex/ascii strings) ----
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

// ---- SHA-256 hex ----
export async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", enc.encode(input));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
export const otpHash = (email: string, code: string) => sha256Hex(`${email.toLowerCase()}:${code}`);

// ---- OTP: 6-digit CSPRNG via rejection sampling (uniform, no modulo bias) ----
export function generateOtp(): string {
  let code = "";
  const buf = new Uint8Array(1);
  while (code.length < 6) {
    crypto.getRandomValues(buf);
    if (buf[0] < 250) code += (buf[0] % 10).toString(); // 250 = floor(256/10)*10
  }
  return code;
}

// ---- HMAC session ----
async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
}
async function hmacHex(secret: string, msg: string): Promise<string> {
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(secret), enc.encode(msg));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
export async function createSession(secret: string, email: string, role: "admin" | "editor"): Promise<string> {
  if (!secret) throw new Error("SESSION_SECRET missing");
  const payload = JSON.stringify({ email: email.toLowerCase(), role, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_S });
  const p = b64uEncodeStr(payload);
  const sig = await hmacHex(secret, p);
  return `${p}.${sig}`;
}
export async function verifySession(secret: string, token: string | undefined | null): Promise<SessionUser | null> {
  if (!secret || !token || !token.includes(".")) return null;
  const [p, sig] = token.split(".");
  if (!p || !sig) return null;
  const expected = await hmacHex(secret, p);
  if (!timingSafeEqual(sig, expected)) return null;
  let payload: SessionUser;
  try { payload = JSON.parse(b64uDecodeToStr(p)); } catch { return null; }
  if (!payload.email || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

// ---- cookies ----
export function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  (header || "").split(";").forEach((p) => { const i = p.indexOf("="); if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim()); });
  return out;
}
export function sessionCookie(token: string): string {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_S}`;
}
export function clearCookie(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

// ---- users (D1) ----
export async function getActiveUser(db: D1Database, email: string): Promise<{ email: string; role: "admin" | "editor" } | null> {
  const r = await db.prepare("SELECT email, role, active FROM users WHERE email = ?").bind(email.toLowerCase()).first<{ email: string; role: "admin" | "editor"; active: number }>();
  return r && r.active ? { email: r.email, role: r.role } : null;
}

// ---- Brevo transactional email (same provider the lead endpoint uses) ----
export async function sendOtpEmail(env: AdminEnv, to: string, code: string): Promise<boolean> {
  const from = env.LEAD_FROM_EMAIL || "noreply@soraia.io";
  const body = {
    sender: { name: "Soraia", email: from },
    to: [{ email: to }],
    subject: `Codice di accesso Soraia: ${code}`,
    htmlContent: `<div style="font-family:Inter,Arial,sans-serif;color:#1A1A1A"><p>Il tuo codice di accesso all'area riservata Soraia:</p><p style="font-size:28px;font-weight:700;letter-spacing:4px;color:#4A1E5C">${code}</p><p style="color:#5F5E5A;font-size:13px">Scade tra 10 minuti. Se non hai richiesto l'accesso, ignora questa email.</p></div>`,
    textContent: `Codice di accesso Soraia: ${code} (scade tra 10 minuti).`,
  };
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch { return false; }
}

export const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...headers } });
