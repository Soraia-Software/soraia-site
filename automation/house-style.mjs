// Single source of truth for Soraia's punctuation house style: the whole site (pages, blog,
// prompts, llms.txt) uses the ASCII hyphen "-" only, never a typographic dash. AI models love
// em dashes; we don't. The author and the autofix normalize on write so drafts are born clean;
// the quality gate detects any that slip through (hand-written posts, normalization gaps).
//
// \u escapes (not literal glyphs) so these patterns can't be corrupted by a normalization pass.

// en dash (U+2013), em dash (U+2014), horizontal bar (U+2015), minus sign (U+2212)
export const FANCY_DASH = /[–—―−]/u;

// Replace every typographic dash with house-style ASCII: numeric ranges -> hyphen (10-50k),
// prose dashes -> comma, stray minus -> hyphen. Whitespace around a prose dash is collapsed to
// a single trailing space. Idempotent and newline-safe (only spaces/tabs are touched).
export function normalizeDashes(s) {
  return String(s)
    .replace(/(\d)[ \t]*[–—−][ \t]*(\d)/gu, "$1-$2") // numeric range -> hyphen
    .replace(/[ \t]*[—―][ \t]*/gu, ", ")                  // em dash / horizontal bar -> comma
    .replace(/[ \t]*–[ \t]*/gu, ", ")                          // remaining en dash -> comma
    .replace(/−/gu, "-");                                      // stray minus sign -> hyphen
}
