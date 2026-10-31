// Structure shared by every language: logos, menu routes, the order of things on Home.

export type ClientLogo = {
  name: string;
  /** image in /public/clients, or a text wordmark when we don't have the file yet */
  src?: string;
  height?: number;
  /** white logos need inverting on the light background */
  invert?: boolean;
  /** wordmark shown next to a logo that is only a symbol */
  text?: string;
  /** client's own website: quotes link here; the logo row uses it only when there is no case page */
  href?: string;
};

export const LOGOS: Record<string, ClientLogo> = {
  packtailor: { name: "Packtailor", src: "/clients/packtailor-s.png", height: 18 },
  woodnest: { name: "Woodnest", src: "/clients/woodnest.png", height: 22 },
  ovision: { name: "Ovision", src: "/clients/ovision-logo.svg", height: 22, href: "https://ovision.ee/" },
  gemoss: { name: "Gemoss", src: "/clients/gemoss-logo.svg", height: 19, href: "https://www.gemoss.ee/" },
  moso: { name: "MOSO", src: "/clients/moso.png", height: 28 },
  koduaken: { name: "Koduaken", src: "/clients/koduaken.png", height: 24 },
  swa: { name: "SWA Poland", src: "/clients/swa.svg", height: 34, invert: true },
  kastoram: { name: "Kastoram", src: "/clients/kastoram.svg", height: 24 },
  consolis: { name: "Consolis", src: "/clients/consolis.png", height: 15 },
  spetselektroodi: { name: "Spetselektroodi", src: "/clients/spetselektroodi.svg", height: 11 },
  security: { name: "Dial Security", src: "/clients/dial-security.png", height: 30 },
  nerva: { name: "Nerva", src: "/clients/nerva.svg", height: 28 },
  chanet: { name: "Chanet Coaching", src: "/clients/chanet.png", height: 28, text: "Chanet Coaching", href: "https://www.chanet.ee/" },
};

/** The logo row on Home, in this order. Consolis stays on Work but not here: it was a pilot. Nerva has no case page yet, so it is not linked; Chanet links to her own site. */
export const LOGO_ROW = ["packtailor", "woodnest", "ovision", "gemoss", "moso", "koduaken", "swa", "kastoram", "security", "spetselektroodi", "nerva", "chanet"];

/** What we do on Home: illustration and link per card, same order as home.what.cards. */
export const WHAT_WE_DO = [
  { art: "custom", href: "/services", main: true },
  { art: "ai", href: "/services#ai", main: false },
  { art: "products", href: "/products", main: false },
];

export const MENU = [
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/products", key: "products" },
  { href: "/process", key: "process" },
  { href: "/about", key: "about" },
] as const;

/** Clients shown on Home under Recent projects. */
export const RECENT = ["packtailor", "woodnest"];

/** Services page: which clients prove custom work. */
export const CUSTOM_CLIENTS = ["packtailor", "woodnest", "ovision", "security", "gemoss"];
