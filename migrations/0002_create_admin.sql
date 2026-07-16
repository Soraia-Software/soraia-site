-- Admin area schema, added to the existing soraia-leads D1 database.
-- Apply with: npx wrangler d1 execute soraia-leads --remote --file=./migrations/0002_create_admin.sql
--
-- `users`   = the source of truth for WHO may enter the admin (OTP login only).
-- `otp_codes` = short-lived one-time codes, stored HASHED only (never in clear).

CREATE TABLE IF NOT EXISTS users (
  email       TEXT PRIMARY KEY,            -- lowercase
  role        TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin','editor')),
  active      INTEGER NOT NULL DEFAULT 1,  -- 1 = may log in; 0 = revoked
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  created_by  TEXT
);

CREATE TABLE IF NOT EXISTS otp_codes (
  email       TEXT NOT NULL,
  code_hash   TEXT NOT NULL,               -- SHA-256 of "email:code", hex; never the code itself
  expires_at  TEXT NOT NULL,               -- ISO; TTL 10 min
  attempts    INTEGER NOT NULL DEFAULT 0,  -- verify attempts, max 5
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_otp_email ON otp_codes (email);

-- Seed the first admin. Change the email in-app (Utenti) after the first login.
INSERT OR IGNORE INTO users (email, role, active, created_by)
VALUES ('daniel.levis@soraia.io', 'admin', 1, 'migration');
