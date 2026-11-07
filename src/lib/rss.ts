// Feed RSS 2.0 del blog (IT su /blog/rss.xml, EN su /en/blog/rss.xml), senza dipendenze.
// Serve ai lettori di feed, agli aggregatori e ai motori che scoprono i contenuti dai feed
// (Google li accetta anche come sitemap). Stesso filtro dell'indice del blog: niente bozze
// e niente articoli programmati prima della loro data, così il rebuild giornaliero li aggiunge.
import { getCollection } from "astro:content";
import { SITE } from "./schema";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export async function blogFeed(lang: "it" | "en"): Promise<Response> {
  const posts = (await getCollection("blog"))
    .filter((p) => p.data.lang === lang && !p.data.draft && p.data.pubDate <= new Date())
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const base = lang === "en" ? `${SITE}/en/blog/` : `${SITE}/blog/`;
  const self = `${base}rss.xml`;
  const items = posts
    .map((p) => {
      const url = `${base}${p.id.replace(/^en\//, "")}/`;
      const categories = p.data.tags.map((t) => `<category>${esc(t)}</category>`).join("");
      return `<item><title>${esc(p.data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${esc(p.data.description)}</description><pubDate>${p.data.pubDate.toUTCString()}</pubDate><dc:creator>${esc(p.data.author)}</dc:creator>${categories}</item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>${
    lang === "en" ? "Soraia blog: AI agents and automation for SMEs" : "Blog di Soraia: agenti IA e automazione per le PMI"
  }</title><link>${base}</link><atom:link href="${self}" rel="self" type="application/rss+xml"/><description>${
    lang === "en"
      ? "Practical articles on AI agents, automation and the AI Act for SMEs, from 40+ real projects."
      : "Articoli pratici su agenti IA, automazione e AI Act per le PMI italiane, da oltre 40 progetti reali."
  }</description><language>${lang === "en" ? "en" : "it-IT"}</language>${
    posts[0] ? `<lastBuildDate>${(posts[0].data.updatedDate ?? posts[0].data.pubDate).toUTCString()}</lastBuildDate>` : ""
  }${items}</channel></rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
