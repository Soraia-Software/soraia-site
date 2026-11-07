// Percorso dell'immagine di anteprima (Open Graph) di una pagina: /blog/foo/ → /og/blog/foo.png,
// / → /og/index.png, /en/ → /og/en.png. Lo usano sia Layout.astro (og:image, JSON-LD) sia
// scripts/og-images.mjs, che dopo `astro build` genera i PNG: un solo posto, così i due nomi
// non possono divergere.
export function ogImagePath(pathname) {
  const clean = String(pathname || "/")
    .replace(/\/index\.html$/, "/")
    .replace(/\.html$/, "")
    .replace(/\/+$/, "");
  return `/og${clean || "/index"}.png`;
}
