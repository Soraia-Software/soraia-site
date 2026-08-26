-- Per-IP rate limit for /api/apply (bot/DoS control). Stores only IP + timestamp,
-- no candidate PII. Apply: npx wrangler d1 execute soraia-leads --remote --file=./migrations/0004_apply_ratelimit.sql
CREATE TABLE IF NOT EXISTS apply_ratelimit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_apply_rl ON apply_ratelimit (ip, created_at);
