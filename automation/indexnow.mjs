#!/usr/bin/env node
// IndexNow: after each deploy, tell Bing (and the other IndexNow engines) which pages changed, so
// new and updated posts get crawled the same day. Bing also feeds Copilot and ChatGPT search.
// "Changed" = sitemap lastmod within the last 3 days: the weekday drip publishes each post on its
// pubDate, and updatedDate marks real updates (see astro.config.mjs). Pages without a lastmod are
// never sent. The key is public by design: Bing checks it at https://www.soraia.io/<key>.txt.
// Never fails the deploy: problems become workflow warnings.
//
// Usage (after `npm run build`): node automation/indexnow.mjs [--dry-run]

import { readFileSync } from "node:fs";

const HOST = "www.soraia.io";
const KEY = "031cb8c96df92ffebf73d394f88d25ef"; // = public/031cb8c96df92ffebf73d394f88d25ef.txt
const DAYS = 3;

const xml = readFileSync("dist/sitemap-0.xml", "utf8");
const since = Date.now() - DAYS * 864e5;
const urls = [...xml.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)]
  .filter(([, , lastmod]) => Date.parse(lastmod) >= since && Date.parse(lastmod) <= Date.now())
  .map(([, loc]) => loc);

if (!urls.length) {
  console.log(`IndexNow: no page changed in the last ${DAYS} days, nothing to send.`);
  process.exit(0);
}
if (process.argv.includes("--dry-run")) {
  console.log(`IndexNow dry run: would send ${urls.length} URL(s)`);
  urls.forEach((u) => console.log("  " + u));
  process.exit(0);
}

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
  });
  console.log(`IndexNow: sent ${urls.length} URL(s), response ${res.status}`);
  urls.forEach((u) => console.log("  " + u));
  if (!res.ok) console.log(`::warning::IndexNow answered ${res.status}: ${(await res.text()).slice(0, 300)}`);
} catch (e) {
  console.log(`::warning::IndexNow unreachable: ${e?.message || e}`);
}
