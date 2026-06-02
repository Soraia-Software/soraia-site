-- Schema for soraia-leads D1 database
-- Apply with: npx wrangler d1 execute soraia-leads --remote --file=./migrations/0001_create_leads.sql

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT,
  email TEXT NOT NULL,
  team_size TEXT,        -- ex "recruiters" nel form: 1-10, 11-50, 51-200, 200+
  message TEXT,
  source TEXT,           -- pagina di origine
  lang TEXT,             -- it/en
  user_agent TEXT,
  ip TEXT,
  email_sent INTEGER DEFAULT 0,   -- 1 se la mail di notifica è andata a buon fine, 0 altrimenti
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
