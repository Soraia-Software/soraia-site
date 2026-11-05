import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeTrailingSlash from './src/lib/rehype-trailing-slash.mjs';

// lastmod della sitemap = il dateModified che la pagina dichiara nel suo JSON-LD
// (updatedDate || pubDate per articoli, guide e confronti; AGGIORNATO per /bandi).
// Le pagine senza dateModified restano senza lastmod: meglio nessuna data che una inventata.
const dist = new URL('./dist/', import.meta.url);
function lastmodOf(pageUrl) {
  try {
    const html = readFileSync(new URL(`.${new URL(pageUrl).pathname}index.html`, dist), 'utf8');
    return html.match(/"dateModified":"([^"]+)"/)?.[1];
  } catch {
    return undefined;
  }
}

export default defineConfig({
  site: 'https://www.soraia.io',
  integrations: [
    react(),
    sitemap({
      // Fuori dalla sitemap le pagine noindex o di servizio: deck in call, demo portale,
      // report di esempio del vecchio sito, area admin.
      filter: (page) => !/\/(analisi-processi|process-audit|demo-portale|downloads|admin)(\/|$)/.test(page),
      serialize(item) {
        const lastmod = lastmodOf(item.url);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeTrailingSlash],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
