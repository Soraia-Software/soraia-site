import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.soraia.io',
  integrations: [
    react(),
    sitemap({
      // Fuori dalla sitemap le pagine noindex o di servizio: deck in call, demo portale,
      // report di esempio del vecchio sito, area admin.
      filter: (page) => !/\/(analisi-processi|process-audit|demo-portale|downloads|admin)(\/|$)/.test(page),
    }),
  ],
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
