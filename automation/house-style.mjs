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

// Italian accents typed as an apostrophe: the bare word followed by ' instead of the accented
// letter, a keyboard habit that AI drafts copy from older text. Applied to Italian files only.
// A closed list of words, fixed only when the apostrophe ends the word: elisions (l'agente),
// "un po'" and words between single quotes are left alone, and so is inline code. When that
// apostrophe also closes a single quote opened earlier on the line, the quote stays. Each list
// holds the bare words and the accent their last vowel takes, so no misspelled form appears in
// this file. Idempotent and newline-safe.
const ACCENTS = [
  ["\u00e8", "e cioe"], // è
  ["\u00e9", "perche poiche finche purche affinche nonche benche anziche giacche sicche ne se"], // é
  ["\u00ec", "cosi si li lunedi martedi mercoledi giovedi venerdi"], // ì
  ["\u00f2", "puo cio pero"], // ò
  ["\u00f9", "piu giu"], // ù
  ["\u00e0", // à: gia, da (verb), meta, nouns in -ita, futures
    "gia da meta " +
    "qualita disponibilita responsabilita attivita conformita tracciabilita proprieta velocita " +
    "produttivita priorita complessita creativita autorita operativita sanita contabilita visibilita " +
    "opportunita flessibilita profondita funzionalita ambiguita capacita prevedibilita portabilita " +
    "parita continuita scalabilita vulnerabilita centralita variabilita ripetibilita stabilita " +
    "curiosita comodita identita trovabilita leggibilita connettivita maturita probabilita " +
    "multimodalita sensibilita unita verificabilita verita fragilita reversibilita facilita " +
    "affidabilita modalita realta volonta liberta societa citta eta novita necessita possibilita " +
    "semplicita sostenibilita integrita compatibilita usabilita accessibilita redditivita " +
    "competitivita criticita specificita personalita quantita intensita rapidita validita utilita " +
    "fedelta difficolta umanita comunita universita eventualita finalita legalita liquidita mobilita " +
    "neutralita originalita potenzialita praticita professionalita puntualita regolarita serieta " +
    "solidita tempestivita unicita varieta notorieta autenticita modularita interoperabilita " +
    "manutenibilita osservabilita applicabilita adattabilita estensibilita configurabilita " +
    "granularita governabilita controllabilita scarsita pubblicita specialita totalita imparzialita " +
    "impossibilita instabilita irreversibilita imprevedibilita " +
    "sara avra fara potra dovra andra verra vorra dara stara sapra cambiera chiedera costera " +
    "servira funzionera arrivera diventera restera rimarra usera paghera trovera partira finira " +
    "ricevera rispondera gestira ridurra portera tocchera contera bastera aumentera migliorera " +
    "crescera scendera uscira entrera applichera scattera valutera decidera richiedera"],
];
const ACCENTED = new Map(ACCENTS.flatMap(([accent, words]) =>
  words.split(/\s+/).map((w) => [w, w.slice(0, -1) + accent])));

// A word + apostrophe, either free-standing or after an elision (c' + e, l' + attivita); else a
// bare apostrophe that opens a quote (after a non-letter, before a letter) or closes one (after
// a word or punctuation, as in a question that ends with ?' but not after = in an attribute).
const APOSTROPHE = /(?<![\p{L}'])([A-Za-z]+)'(?![\p{L}'])|(?<=\p{L}')([A-Za-z]+)'(?![\p{L}'])|(?<![\p{L}\p{N}])(')(?=\p{L})|(?<=[^\s'=(\[{\u00ab\u201c])'(?![\p{L}\p{N}])/gu;

function accentWord(w) {
  const acc = ACCENTED.get(w.toLowerCase());
  if (!acc) return null;
  if (w.length > 1 && w === w.toUpperCase()) return acc.toUpperCase();
  return w[0] === w[0].toUpperCase() ? acc[0].toUpperCase() + acc.slice(1) : acc;
}

// Inside an open quote, the accent word whose apostrophe also closes it: none when another word
// ends with an apostrophe before the next opening quote (that one closes it), else the first
// accent word followed by punctuation or the end of the line, else the last one.
function quoteEnd(text, marks, i) {
  const run = [];
  for (let j = i; j < marks.length && !marks[j].opening; j++) {
    if (!marks[j].fixed) return -1;
    run.push(j);
  }
  const ends = run.find((j) => {
    const after = text[marks[j].m.index + marks[j].m[0].length];
    return after === undefined || ").,;:!?]".includes(after);
  });
  return ends ?? run[run.length - 1];
}

function accentText(text) {
  const marks = [...text.matchAll(APOSTROPHE)].map((m) => ({
    m, opening: !!m[3], fixed: m[3] ? null : accentWord(m[1] ?? m[2] ?? ""),
  }));
  let out = "", last = 0, open = false;
  marks.forEach(({ m, opening, fixed }, i) => {
    if (opening) { open = true; return; }
    if (!fixed) { open = false; return; } // any other apostrophe ending a word closes the quote
    const closes = open && quoteEnd(text, marks, i) === i;
    if (closes) open = false;
    out += text.slice(last, m.index) + fixed + (closes ? "'" : "");
    last = m.index + m[0].length;
  });
  return out + text.slice(last);
}

export function normalizeAccents(s) {
  return String(s).split("\n").map((line) =>
    line.split("`").map((part, i) => (i % 2 ? part : accentText(part))).join("`")).join("\n");
}
