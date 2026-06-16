import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default("Soraia"),
    tags: z.array(z.string()).default([]),
    readMinutes: z.number().optional(),
    featured: z.boolean().default(false),
    lang: z.enum(["it", "en"]).default("it"),  // EN entries live in the en/ subfolder
    draft: z.boolean().default(false),          // hidden in prod (kill-switch + staging); visible in dev
    h1: z.string().optional(),                  // visible H1, defaults to title
    updatedDate: z.coerce.date().optional(),    // → JSON-LD dateModified (freshness signal)
    keywords: z.array(z.string()).default([]),  // 2-5 target keywords
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),  // → FAQPage schema (GEO)
    ogImage: z.string().optional(),             // per-post OG image; falls back to /og/default.png
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    clientLogo: z.string().optional(),         // path to /logos/clients/<x>.webp
    sector: z.string(),
    service: z.string(),                       // e.g. "Agente IA candidature"
    industry: z.enum([
      "recruitment-hr",
      "finance-vc",
      "sales-marketing",
      "customer-support",
      "real-estate",
      "event-management",
    ]).default("recruitment-hr"),
    additionalIndustries: z.array(z.enum([
      "recruitment-hr",
      "finance-vc",
      "sales-marketing",
      "customer-support",
      "real-estate",
      "event-management",
    ])).default([]),  // case che ricadono in più Ops cluster (es. ILTEC: sales-marketing + customer-support)
    pubDate: z.coerce.date(),
    featured: z.boolean().default(false),
    stakeholder: z.object({
      name: z.string(),
      role: z.string(),
      photo: z.string(),
    }),
    heroQuote: z.string(),                     // longer quote shown in case-study hero
    teaser: z.object({
      problem: z.string(),
      action: z.string(),
      resultMetric: z.string(),
      resultBody: z.string().optional(),
    }),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
      sub: z.string().optional(),
    })).default([]),
    timeline: z.string().optional(),           // e.g. "4 settimane go-live + sprint mensili"
    stack: z.array(z.string()).default([]),
    dimensioni: z.enum(["1-10", "11-50", "51-250", "250-1000", "1000+"]).optional(),
    videoTestimonial: z.object({
      provider: z.enum(["youtube", "vimeo"]),
      id: z.string(),
      poster: z.string().optional(),
    }).optional(),
    shortQuote: z.string().optional(),         // card-friendly shorter version of heroQuote
    cardImage: z.string().optional(),          // photo used as card background (fallback: stakeholder photo)
    screenshots: z.array(z.object({
      src: z.string(),
      caption: z.string().optional(),
      alt: z.string().optional(),
    })).default([]),
    related: z.array(z.string()).default([]),  // bare slugs of related case studies (same in IT/EN)
    lang: z.enum(["it", "en"]).default("it"),  // EN entries live in the en/ subfolder
    draft: z.boolean().default(false),         // hidden everywhere when true (e.g. awaiting client approval)
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/guides" }),
  schema: z.object({
    title: z.string(),                       // <title> tag
    h1: z.string().optional(),               // visible H1 (defaults to title if omitted)
    description: z.string(),                 // <meta description>
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Soraia"),
    readMinutes: z.number(),
    keywords: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).default([]),
    featured: z.boolean().default(false),
    lang: z.enum(["it", "en"]).default("it"),  // EN entries live in the en/ subfolder
  }),
});

export const collections = { blog, caseStudies, guides };
