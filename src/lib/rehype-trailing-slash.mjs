// Internal links in Markdown get the trailing slash of canonical URLs: Cloudflare Pages
// answers "/parliamone" with a 308 to "/parliamone/". Posts written by automation/ keep
// using the bare form, so the fix happens here, at build time, for every post.
export default function rehypeTrailingSlash() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === "element" && node.tagName === "a" && typeof node.properties?.href === "string") {
        node.properties.href = withSlash(node.properties.href);
      }
      // HTML written inside the Markdown (<a href="/prezzi">) arrives as a raw string.
      if (node.type === "raw" && typeof node.value === "string") {
        node.value = node.value.replace(/href=(["'])([^"']*)\1/g, (_, q, href) => `href=${q}${withSlash(href)}${q}`);
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

function withSlash(href) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const [, path, rest = ""] = href.match(/^([^?#]*)(.*)$/);
  if (path.endsWith("/") || /\.[a-z0-9]+$/i.test(path)) return href;
  return `${path}/${rest}`;
}
