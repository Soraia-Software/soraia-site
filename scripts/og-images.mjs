#!/usr/bin/env node
// Immagini di anteprima (Open Graph, 1200x630) per ogni pagina, generate dopo `astro build`.
//
// Perché: og:image puntava a /og/default.png, un file mai esistito, quindi su LinkedIn,
// WhatsApp e Slack ogni link di soraia.io usciva senza immagine (audit del 7/11/2026).
// Adesso Layout.astro dichiara /og/<percorso>.png (src/lib/og-path.mjs) e questo script
// scrive proprio quel file per ogni dist/**/index.html, con l'H1 della pagina, la sezione
// (Blog, Guida, Confronto…) e il marchio. Lo stesso file è l'`image` del JSON-LD degli articoli.
//
// Gira dentro `npm run build`, quindi anche nei rebuild giornalieri degli articoli programmati.
// Non blocca mai la build: una pagina che fallisce prende l'immagine generica.
//
// Uso: node scripts/og-images.mjs [cartella dist]

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import satori from "satori";
import sharp from "sharp";
import { ogImagePath } from "../src/lib/og-path.mjs";

const DIST = process.argv[2] || "dist";
const W = 1200;
const H = 630;
const FONT_DIR = "node_modules/@fontsource/inter/files";
const font = (file, weight) => ({ name: "Inter", data: readFileSync(join(FONT_DIR, file)), weight, style: "normal" });
const FONTS = [
  font("inter-latin-500-normal.woff", 500),
  font("inter-latin-600-normal.woff", 600),
  font("inter-latin-ext-500-normal.woff", 500),
  font("inter-latin-ext-600-normal.woff", 600),
];
const MARK = `data:image/svg+xml;base64,${readFileSync("public/logos/soraia-mark.svg").toString("base64")}`;
// Le stesse curve dello sfondo .bg-hero-dark (src/styles/globals.css), ridisegnate su 1200x630.
const LINES = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 1600 840" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1.6"><circle cx="1400" cy="-60" r="520"/><circle cx="1400" cy="-60" r="790"/><circle cx="90" cy="980" r="480"/><path d="M-80 720 C 380 520, 920 790, 1700 400"/></svg>`,
).toString("base64")}`;

const SECTIONS = {
  it: { blog: "Blog", guide: "Guida", confronto: "Confronto", "case-studies": "Caso studio", careers: "Lavora con noi", bandi: "Bandi", risorse: "Risorse", settori: "Settori", "casi-d-uso": "Caso d'uso" },
  en: { blog: "Blog", guide: "Guide", confronto: "Comparison", "case-studies": "Case study", careers: "Careers" },
};
const FALLBACK_KICKER = { it: "AI agency per le PMI", en: "AI agency for SMEs" };
const TAGLINE = { it: "Agenti IA per le PMI italiane", en: "AI agents for Italian SMEs" };

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
const text = (html) => decode(html.replace(/<br\b[^>]*>/gi, " ").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

function pagesIn(dir, base = "") {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (!base && ["_astro", "og", "admin"].includes(e.name)) continue;
      out.push(...pagesIn(join(dir, e.name), `${base}/${e.name}`));
    } else if (e.name === "index.html") {
      out.push({ file: join(dir, e.name), pathname: `${base}/` });
    } else if (!base && e.name === "404.html") {
      out.push({ file: join(dir, e.name), pathname: "/404" });
    }
  }
  return out;
}

function card({ lang, kicker, headline }) {
  const size = headline.length <= 40 ? 76 : headline.length <= 60 ? 66 : headline.length <= 85 ? 58 : headline.length <= 110 ? 50 : 44;
  const shown = headline.length > 150 ? `${headline.slice(0, 147).replace(/\s+\S*$/, "")}…` : headline;
  return {
    type: "div",
    props: {
      style: {
        width: W, height: H, display: "flex", position: "relative", fontFamily: "Inter", color: "#fff",
        backgroundColor: "#1A0820",
        backgroundImage: "radial-gradient(ellipse 70% 60% at 15% 0%, rgba(107,44,126,0.50) 0%, rgba(26,8,32,0) 70%), linear-gradient(135deg, #0A0510 0%, #1A0820 38%, #2A1438 100%)",
      },
      children: [
        { type: "img", props: { src: LINES, width: W, height: H, style: { position: "absolute", top: 0, left: 0 } } },
        {
          type: "div",
          props: {
            // Margini e non padding: con height fissa il padding si sommerebbe all'altezza.
            style: { display: "flex", flexDirection: "column", justifyContent: "space-between", width: W - 144, height: H - 116, margin: "60px 72px 56px" },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "center", gap: 16 },
                  children: [
                    { type: "img", props: { src: MARK, width: 42, height: 46 } },
                    { type: "div", props: { style: { fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }, children: "Soraia" } },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column", gap: 22 },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: { display: "flex", alignItems: "center", gap: 12, fontSize: 21, fontWeight: 600, letterSpacing: 3.5, textTransform: "uppercase", color: "#DAB5D1" },
                        children: [
                          { type: "div", props: { style: { width: 9, height: 9, borderRadius: 9999, backgroundColor: "#E8B3F0", display: "flex" } } },
                          { type: "div", props: { children: kicker } },
                        ],
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: { display: "flex", fontSize: size, fontWeight: 500, lineHeight: 1.1, letterSpacing: -1.6, maxWidth: 1040 },
                        children: shown,
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "rgba(255,255,255,0.62)",
                    borderTop: "1px solid rgba(255,255,255,0.14)", paddingTop: 24 },
                  children: [
                    { type: "div", props: { children: TAGLINE[lang] } },
                    { type: "div", props: { style: { color: "rgba(255,255,255,0.85)", fontWeight: 600 }, children: "soraia.io" } },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

async function render(data, outFile) {
  const svg = await satori(card(data), { width: W, height: H, fonts: FONTS });
  const png = await sharp(Buffer.from(svg)).png({ palette: true, quality: 90, effort: 8, compressionLevel: 9, dither: 0 }).toBuffer();
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, png);
}

function describe({ file, pathname }) {
  const html = readFileSync(file, "utf8");
  const lang = /<html[^>]*\blang="en"/.test(html) ? "en" : "it";
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i);
  const headline = (h1 && text(h1[1])) || (title && text(title[1]).replace(/\s*[|·]\s*(Case study )?Soraia$/, "")) || "Soraia";
  const segs = pathname.split("/").filter(Boolean);
  const section = segs[0] === "en" ? segs[1] : segs[0];
  const kicker = SECTIONS[lang][section] || FALLBACK_KICKER[lang];
  return { lang, kicker, headline };
}

const started = Date.now();
const pages = pagesIn(DIST);
const failed = [];
for (const page of pages) {
  try {
    await render(describe(page), join(DIST, ogImagePath(page.pathname)));
  } catch (err) {
    failed.push({ pathname: page.pathname, error: err.message });
  }
}
// Immagine generica: per chi la cita esplicitamente e come ripiego per le pagine fallite.
const fallback = join(DIST, "og/default.png");
try {
  await render({ lang: "it", kicker: FALLBACK_KICKER.it, headline: "Portiamo gli Agenti IA nelle PMI Italiane." }, fallback);
} catch (err) {
  console.warn(`::warning::Anteprima OG generica non generata: ${err.message}`);
}
for (const { pathname, error } of failed) {
  const out = join(DIST, ogImagePath(pathname));
  if (existsSync(fallback)) {
    mkdirSync(dirname(out), { recursive: true });
    copyFileSync(fallback, out);
  }
  console.warn(`::warning::Anteprima OG generica per ${pathname}: ${error}`);
}
console.log(`OG: ${pages.length - failed.length}/${pages.length} anteprime in ${((Date.now() - started) / 1000).toFixed(1)} s`);
