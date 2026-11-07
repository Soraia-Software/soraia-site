// Dove lavorano i clienti di Soraia, per la mappa di home e chi siamo (IT ed EN).
// Dato ufficiale dal 7/11/2026 (Daniel): più di 50 clienti in 11 paesi. I vecchi conteggi
// per paese (41 in tutto) non tornavano più con il totale, quindi la mappa mostra solo
// regioni e paesi. Se tornano i numeri veri, `total` e `count` sono ancora supportati.
type Lang = "it" | "en";

export const CLIENTS_SUMMARY: Record<Lang, string> = {
  it: "più di 50 clienti in 11 paesi",
  en: "more than 50 clients in 11 countries",
};

export function getWorldRegions(lang: Lang) {
  const t = (it: string, en: string) => (lang === "it" ? it : en);
  return [
    {
      x: 50.5, y: 36,
      label: t("Europa", "Europe"),
      flag: "🇪🇺",
      countries: [
        { flag: "🇮🇹", name: t("Italia", "Italy") },
        { flag: "🇨🇭", name: t("Svizzera", "Switzerland") },
        { flag: "🇫🇷", name: t("Francia", "France") },
        { flag: "🇬🇧", name: t("Regno Unito", "United Kingdom") },
        { flag: "🇪🇸", name: t("Spagna", "Spain") },
        { flag: "🇳🇱", name: t("Paesi Bassi", "Netherlands") },
        { flag: "🇩🇪", name: t("Germania", "Germany") },
        { flag: "🇵🇹", name: t("Portogallo", "Portugal") },
      ],
      align: "right" as const,
    },
    {
      x: 23, y: 40,
      label: t("Stati Uniti", "United States"),
      flag: "🇺🇸",
      countries: [{ flag: "🇺🇸", name: t("Stati Uniti", "United States") }],
      align: "left" as const,
    },
    {
      x: 60, y: 49,
      label: t("Emirati Arabi Uniti", "United Arab Emirates"),
      flag: "🇦🇪",
      countries: [{ flag: "🇦🇪", name: t("Emirati Arabi Uniti", "United Arab Emirates") }],
    },
    {
      x: 84, y: 71,
      label: "Australia",
      flag: "🇦🇺",
      countries: [{ flag: "🇦🇺", name: "Australia" }],
      align: "right" as const,
    },
  ];
}
