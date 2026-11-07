// Accesso a settori e casi d'uso (src/content/settori, src/content/casi-d-uso), condiviso dalle pagine
// /settori/ e /casi-d-uso/. Stessa regola del blog: niente bozze, niente contenuti con data futura.
import { getCollection, type CollectionEntry } from "astro:content";

export type Settore = CollectionEntry<"settori">;
export type CasoUso = CollectionEntry<"casiUso">;
export type CaseStudy = CollectionEntry<"caseStudies">;

const visibile = (d: { draft?: boolean; pubDate: Date }) => import.meta.env.DEV || (!d.draft && d.pubDate <= new Date());

export async function settori(): Promise<Settore[]> {
  return (await getCollection("settori")).filter((s) => visibile(s.data)).sort((a, b) => a.data.ordine - b.data.ordine);
}

export async function casiUso(): Promise<CasoUso[]> {
  return (await getCollection("casiUso")).filter((c) => visibile(c.data)).sort((a, b) => a.data.ordine - b.data.ordine);
}

/** Case study pubblici (con il nome del cliente), versione italiana. */
export async function caseStudyIt(): Promise<CaseStudy[]> {
  return (await getCollection("caseStudies")).filter((c) => c.data.lang === "it" && !c.data.draft);
}

/** Variante più leggera della copertina (le copertine esistono a 1600 e a 960 px). */
export const piccola = (src: string) => src.replace(/\.webp$/, "-960.webp");
export const srcsetCopertina = (src: string) => `${piccola(src)} 960w, ${src} 1600w`;

/** Foto del case study pubblico da usare come copertina della scheda. */
export const fotoCaseStudy = (c: CaseStudy) => c.data.cardImage || c.data.stakeholder.photo;

/** Titoli degli articoli e delle guide collegati, solo se già pubblicati (niente link a pagine future). */
export async function articoliPubblicati(percorsi: string[]): Promise<{ href: string; titolo: string }[]> {
  const blog = (await getCollection("blog")).filter((p) => p.data.lang === "it" && visibile(p.data));
  const guide = (await getCollection("guides")).filter((g) => g.data.lang === "it" && visibile(g.data));
  const titoli = new Map<string, string>([
    ...blog.map((p) => [`/blog/${p.id}/`, p.data.h1 || p.data.title] as [string, string]),
    ...guide.map((g) => [`/guide/${g.id}/`, g.data.h1 || g.data.title] as [string, string]),
  ]);
  return percorsi.map((href) => ({ href, titolo: titoli.get(href) ?? "" })).filter((a) => a.titolo);
}
