# Loghi università / aziende dei founder

Metti qui i file ufficiali dei loghi (mono o a colori, va bene lo stesso: sul
sito vengono resi in grigio e passano a colori al passaggio del mouse).

Ogni file deve chiamarsi come lo **slug** del nome, con estensione `.svg`
(preferita), `.png`, `.webp` o `.avif`. Se un file manca, la card mostra il
nome testuale al posto del logo (nessuna immagine rotta).

Nomi file attesi:

- `politecnico-di-torino.svg`
- `escp.svg`
- `reply.svg`
- `accenture.svg`
- `alten.svg`
- `satispay.svg`
- `simon-kucher.svg`
- `amazon.svg`
- `dott.svg`

Consiglio: usa SVG mono/neri su trasparente, larghezza libera, altezza resa a 24px.
Usati in `src/pages/chi-siamo.astro` e `src/pages/en/about.astro` via `import.meta.glob`.
