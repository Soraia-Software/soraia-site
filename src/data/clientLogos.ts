/* Loghi clienti della barra "Si fidano di noi" (ProofBar), unica fonte per tutto il sito.
   Due file che scorrono in direzioni opposte: la fila A è quella che si vede per prima
   (ordine deciso il 2026-10-17), la fila B porta gli altri. Le pagine che vogliono una
   selezione diversa (es. /recruitment) passano la loro lista a ProofBar. */

export interface ClientLogo {
  name: string;
  src?: string;
  detail?: string;
}

export const CLIENT_LOGOS_ROW_A: ClientLogo[] = [
  { name: "APraise", src: "/logos/clients/apraise.webp" },
  { name: "Beta Imprese", src: "/logos/clients/betaimprese.webp" },
  { name: "Lanificio TG", src: "/logos/clients/lanificio-tg.webp" },
  { name: "Banca Sella", src: "/logos/clients/banca-sella.webp" },
  { name: "ESCP", src: "/logos/clients/escp.webp" },
  { name: "Liftt", src: "/logos/clients/liftt.webp" },
  { name: "Stars Be Original", src: "/logos/clients/starsbeoriginal.webp" },
  { name: "Numeraria", src: "/logos/clients/numeraria.webp" },
];

export const CLIENT_LOGOS_ROW_B: ClientLogo[] = [
  { name: "Talent Match", src: "/logos/clients/talentmatch.webp" },
  { name: "Rainplan", src: "/logos/clients/rainplan.webp" },
  { name: "KB&B", src: "/logos/clients/kbb.webp" },
  { name: "StoryWonder", src: "/logos/clients/storywonder.webp" },
  { name: "CXL", src: "/logos/clients/cxl.webp" },
  { name: "Navily", src: "/logos/clients/navily.webp" },
  { name: "French Riviera Househunting", src: "/logos/clients/frh.webp" },
  { name: "ILTEC", src: "/logos/clients/iltec.webp" },
  { name: "Lyra", src: "/logos/clients/logo-lyra.webp" },
  { name: "Por Tier", src: "/logos/clients/por-tier-logo.webp" },
];
