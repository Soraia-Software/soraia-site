// JSON-LD di tutte le pagine, montato in un solo @graph da Layout.astro.
//
// Ogni pagina continua a passare i suoi nodi (Article, Service, FAQPage, BreadcrumbList…);
// qui si aggiungono quelli comuni e si collegano tra loro (audit SEO/GEO del 7/11/2026):
// - WebSite e Organization su ogni pagina, con un @id fisso. Prima l'Organization c'era solo
//   in home e altrove «Soraia» era un nome qualsiasi: per Google e per i motori IA erano
//   entità scollegate. WebSite serve anche a Google per il nome del sito nei risultati.
// - Ogni «Organization Soraia» dentro i nodi delle pagine (publisher, author, provider…)
//   diventa un riferimento all'@id; gli autori noti diventano Person con @id.
// - Gli Article prendono image (l'anteprima di scripts/og-images.mjs), url,
//   mainEntityOfPage e inLanguage: il Rich Results Test segnalava «Missing field image».
// - Un nodo WebPage per pagina (o quello che la pagina dichiara già: ContactPage,
//   CollectionPage…), collegato al sito, all'immagine e alle briciole di pane.
// - Gli array annidati ([[…]]) diventano un @graph piatto.

export const SITE = "https://www.soraia.io";
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const LOGO_URL = `${SITE}/logos/soraia-logo-512.png`;
export const LINKEDIN_COMPANY = "https://www.linkedin.com/company/soraia-srl/";

type Lang = "it" | "en";
type Node = Record<string, any>;

const PEOPLE: Record<string, { id: string; jobTitle: string; sameAs: string[] }> = {
  "Daniel Levis": { id: `${SITE}/#daniel-levis`, jobTitle: "CEO", sameAs: ["https://www.linkedin.com/in/daniel-levis/"] },
  "Davide Silvestri": { id: `${SITE}/#davide-silvestri`, jobTitle: "CTO", sameAs: ["https://www.linkedin.com/in/davide-silvestri/"] },
};

const PAGE_TYPES = new Set(["WebPage", "ContactPage", "AboutPage", "CollectionPage", "ProfilePage", "SearchResultsPage", "ItemPage", "CheckoutPage"]);
const ARTICLE_TYPES = new Set(["Article", "BlogPosting", "NewsArticle", "TechArticle"]);

const ORG_TEXT: Record<Lang, { description: string; knowsAbout: string[] }> = {
  it: {
    description:
      "Mettiamo ordine nei processi della tua PMI e li automatizziamo con agenti IA che restano tuoi. Da 8.000 € al mese, primo mese soddisfatti o rimborsati.",
    knowsAbout: ["Analisi dei processi aziendali", "Agenti IA", "AI Engineering", "Automazione dei processi per PMI"],
  },
  en: {
    description:
      "We bring order to your SME's processes and automate them with AI agents that stay yours. From €8,000 a month, first month satisfied or refunded.",
    knowsAbout: ["Business process audit", "AI agents", "AI Engineering", "Process automation for SMEs"],
  },
};

export function organizationNode(lang: Lang): Node {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Soraia",
    legalName: "Soraia S.r.l.",
    url: `${SITE}/`,
    logo: { "@type": "ImageObject", "@id": `${SITE}/#logo`, url: LOGO_URL, width: 512, height: 512, caption: "Soraia" },
    image: { "@id": `${SITE}/#logo` },
    description: ORG_TEXT[lang].description,
    email: "info@soraia.io",
    vatID: "IT02820060024",
    foundingDate: "2023",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10 },
    knowsAbout: ORG_TEXT[lang].knowsAbout,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Losana 13",
      addressLocality: "Biella",
      postalCode: "13900",
      addressRegion: "BI",
      addressCountry: "IT",
    },
    geo: { "@type": "GeoCoordinates", latitude: 45.5648864, longitude: 8.0542568 },
    areaServed: ["IT", "EU"],
    founder: Object.entries(PEOPLE).map(([name, p]) => ({ "@type": "Person", "@id": p.id, name, jobTitle: p.jobTitle, sameAs: p.sameAs })),
    memberOf: { "@type": "Organization", name: "Unione Industriale Biellese", url: "https://www.ui.biella.it/" },
    sameAs: [LINKEDIN_COMPANY, "https://github.com/Soraia-Software"],
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE}/`,
    name: "Soraia",
    alternateName: ["Soraia S.r.l.", "soraia.io"],
    inLanguage: ["it-IT", "en"],
    publisher: { "@id": ORG_ID },
  };
}

const isSoraiaOrg = (n: any) =>
  n && typeof n === "object" && !Array.isArray(n) && n["@type"] === "Organization" && (n.name === "Soraia" || n["@id"] === ORG_ID);

/** Sostituisce in profondità ogni «Organization Soraia» con il riferimento all'@id e dà un @id alle persone note. */
function link(value: any): any {
  if (Array.isArray(value)) return value.map(link);
  if (!value || typeof value !== "object") return value;
  if (isSoraiaOrg(value)) return { "@id": ORG_ID };
  const out: Node = {};
  for (const [k, v] of Object.entries(value)) {
    if (k === "@context") continue;
    out[k] = link(v);
  }
  if (out["@type"] === "Person" && PEOPLE[out.name] && !out["@id"]) {
    const p = PEOPLE[out.name];
    out["@id"] = p.id;
    out.jobTitle ??= p.jobTitle;
    out.sameAs ??= p.sameAs;
    if (out.worksFor === undefined) out.worksFor = { "@id": ORG_ID };
  }
  return out;
}

function flatten(input: any): Node[] {
  if (!input) return [];
  if (Array.isArray(input)) return input.flatMap(flatten);
  if (typeof input === "object" && Array.isArray(input["@graph"])) return flatten(input["@graph"]);
  return [input];
}

interface PageCtx {
  url: string; // canonical
  lang: Lang;
  title: string;
  description: string;
  image: string; // absolute og:image URL
  noindex?: boolean;
}

/** Il @graph completo della pagina, pronto per <script type="application/ld+json">. */
export function buildGraph(jsonLd: any, ctx: PageCtx): Node {
  const inLanguage = ctx.lang === "it" ? "it-IT" : "en";
  const pageId = `${ctx.url}#webpage`;
  const breadcrumbId = `${ctx.url}#breadcrumb`;
  const imageId = `${ctx.url}#primaryimage`;

  // Il nodo Organization completo lo mette il layout: quelli passati dalle pagine si scartano.
  const nodes = flatten(jsonLd)
    .filter((n) => n && !isSoraiaOrg(n))
    .map(link);

  let page = nodes.find((n) => PAGE_TYPES.has(n["@type"]));
  if (!page) {
    page = { "@type": "WebPage" };
    nodes.unshift(page);
  }
  Object.assign(page, {
    "@id": pageId,
    url: ctx.url,
    name: page.name ?? ctx.title,
    description: page.description ?? ctx.description,
    inLanguage: page.inLanguage ?? inLanguage,
    isPartOf: { "@id": WEBSITE_ID },
    primaryImageOfPage: { "@id": imageId },
  });

  const breadcrumb = nodes.find((n) => n["@type"] === "BreadcrumbList");
  if (breadcrumb) {
    breadcrumb["@id"] = breadcrumbId;
    page.breadcrumb = { "@id": breadcrumbId };
  }

  for (const n of nodes) {
    if (ARTICLE_TYPES.has(n["@type"])) {
      n["@id"] ??= `${ctx.url}#article`;
      n.url ??= ctx.url;
      n.mainEntityOfPage ??= { "@id": pageId };
      n.isPartOf ??= { "@id": pageId };
      n.inLanguage ??= inLanguage;
      n.image ??= { "@id": imageId };
      n.publisher = { "@id": ORG_ID };
      n.author ??= { "@id": ORG_ID };
      if (!n.dateModified && n.datePublished) n.dateModified = n.datePublished;
    }
    if (n["@type"] === "Service" && !n.provider) n.provider = { "@id": ORG_ID };
    // Google Jobs vuole nome e logo dentro l'annuncio: qui il riferimento da solo non basta.
    if (n["@type"] === "JobPosting") {
      n.hiringOrganization = { "@type": "Organization", "@id": ORG_ID, name: "Soraia", sameAs: `${SITE}/`, logo: LOGO_URL };
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode(),
      organizationNode(ctx.lang),
      { "@type": "ImageObject", "@id": imageId, url: ctx.image, contentUrl: ctx.image, width: 1200, height: 630, inLanguage },
      ...nodes,
    ],
  };
}

/** Il primo Article del grafo, per og:type=article e le date di article:published_time. */
export function mainArticle(graph: Node): Node | undefined {
  return (graph["@graph"] as Node[]).find((n) => ARTICLE_TYPES.has(n["@type"]));
}
