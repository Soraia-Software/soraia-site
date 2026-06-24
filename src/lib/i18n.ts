// Centralized i18n helpers for the bilingual site (IT default on /, EN on /en/).
// Single source of truth for slug mapping, used by Header switcher, Footer,
// CTAs, hreflang and content routes.

export const LANGS = ["it", "en"] as const;
export type Lang = (typeof LANGS)[number];

// IT canonical first-path-segment -> EN segment, for the routes whose slug
// actually differs between languages. Everything else is identical (already
// English: recruitment, finance, ai-agents, case-studies, ...).
export const IT_TO_EN_SLUG: Record<string, string> = {
  prodotti: "products",
  "chi-siamo": "about",
  parliamone: "contact",
  "offerta-team-dedicato": "dedicated-team-offer",
};
export const EN_TO_IT_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(IT_TO_EN_SLUG).map(([it, en]) => [en, it]),
);

// Content-collection slug maps (IT slug -> EN slug). Case studies share the
// same slug across languages (brand names) so they need no map.
export const GUIDE_SLUG_MAP: Record<string, string> = {
  "agenti-ai-aziende": "ai-agents-for-business",
  "ai-act-aziende": "ai-act-for-business",
  "consulenza-ai-italia": "ai-consulting-italy",
  "costi-consulenza-ai": "ai-consulting-costs",
  "formazione-ai-aziendale": "corporate-ai-training",
};
export const BLOG_SLUG_MAP: Record<string, string> = {
  "costo-nascosto-gestionale-obsoleto": "hidden-cost-of-legacy-business-software",
  "outbound-b2b-2026-agente-ia-qualifica-lead": "b2b-outbound-2026-ai-agent-lead-qualification",
  "farsi-citare-da-chatgpt-perplexity-pmi-geo": "geo-get-cited-by-ai-search-smb",
  "ai-act-recruiting-selezione-personale-alto-rischio": "ai-act-recruitment-high-risk-compliance",
  "agenti-ia-settori-regolamentati": "ai-agents-in-regulated-sectors",
  "5-segnali-processo-da-automatizzare": "5-signs-a-process-is-ready-to-automate",
  "agenti-ia-vs-chatgpt-enterprise": "ai-agents-vs-chatgpt-enterprise",
  "ai-act-pmi-italiane": "eu-ai-act-for-smes",
  "come-misurare-roi-agente-ia": "how-to-measure-ai-agent-roi",
  "software-su-misura-o-saas": "custom-software-vs-saas",
  "agenti-ia-gestionali-teamsystem-zucchetti-odoo": "ai-agents-italian-erp-integration",
  "smettere-di-gestire-i-processi-su-excel": "stop-running-your-business-on-spreadsheets",
};

export function reverseMap(map: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
}

export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "it";
}

/** Normalize to the canonical IT path: strip any /en prefix and map EN slugs back to IT. */
function toItPath(pathname: string): string {
  let p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/en") return "/";
  if (p.startsWith("/en/")) {
    p = p.slice(3); // drop "/en"
    const seg = p.split("/"); // ["", "<slug>", ...]
    if (seg[1] && EN_TO_IT_SLUG[seg[1]]) seg[1] = EN_TO_IT_SLUG[seg[1]];
    p = seg.join("/");
  }
  return p || "/";
}

/**
 * Map any current pathname to its equivalent in `target` language, applying
 * the top-level slug map. NOTE: for content detail pages whose slug differs
 * across languages (guides, blog), pass an explicit `altHref` instead, those
 * routes compute it from the content slug maps.
 */
export function localizePath(pathname: string, target: Lang): string {
  const itPath = toItPath(pathname);
  if (target === "it") return itPath;
  if (itPath === "/") return "/en/";
  const seg = itPath.split("/"); // ["", "<slug>", ...]
  if (seg[1] && IT_TO_EN_SLUG[seg[1]]) seg[1] = IT_TO_EN_SLUG[seg[1]];
  return "/en" + seg.join("/");
}

/** Convenience: localize a known IT path (e.g. "/parliamone") for the given lang. */
export function path(itPath: string, lang: Lang): string {
  return lang === "it" ? itPath : localizePath(itPath, "en");
}
