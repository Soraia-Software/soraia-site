-- Add first-touch attribution to leads so we know which channel produced each lead.
-- Apply: npx wrangler d1 execute soraia-leads --remote --file=./migrations/0003_lead_attribution.sql
ALTER TABLE leads ADD COLUMN utm_source TEXT;
ALTER TABLE leads ADD COLUMN utm_medium TEXT;
ALTER TABLE leads ADD COLUMN utm_campaign TEXT;
ALTER TABLE leads ADD COLUMN utm_content TEXT;
ALTER TABLE leads ADD COLUMN utm_term TEXT;
ALTER TABLE leads ADD COLUMN referrer TEXT;
ALTER TABLE leads ADD COLUMN landing_page TEXT;
