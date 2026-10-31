import { site as en } from "./en/site";
import { site as et } from "./et/site";
import { site as pl } from "./pl/site";
import { clients as enClients } from "./en/clients";
import { clients as etClients } from "./et/clients";
import { clients as plClients } from "./pl/clients";
import { labels as enPlatformLabels, pages as enPlatforms } from "./en/platforms";
import { labels as etPlatformLabels, pages as etPlatforms } from "./et/platforms";
import { labels as plPlatformLabels, pages as plPlatforms } from "./pl/platforms";
import type { PlatformId, PlatformLabels, PlatformPage } from "../platforms";
import type { ClientText, SiteText } from "./types";

export type Locale = "en" | "et" | "pl";
export type { ClientText, SiteText };

const SITE: Record<Locale, SiteText> = { en, et, pl };
const CLIENTS: Record<Locale, Record<string, ClientText>> = { en: enClients, et: etClients, pl: plClients };

const norm = (locale: string): Locale => (locale === "et" || locale === "pl" ? locale : "en");

/** All wording for one language. */
export const getText = (locale: string) => SITE[norm(locale)];
export const getClientText = (locale: string, id: string): ClientText => CLIENTS[norm(locale)][id] ?? CLIENTS.en[id];

const PLATFORMS: Record<Locale, { labels: PlatformLabels; pages: Record<PlatformId, PlatformPage> }> = {
  en: { labels: enPlatformLabels, pages: enPlatforms },
  et: { labels: etPlatformLabels, pages: etPlatforms },
  pl: { labels: plPlatformLabels, pages: plPlatforms },
};

/** One search page (GoHighLevel, n8n, RevOps…) and its labels, in one language. */
export const getPlatform = (locale: string, id: PlatformId) => {
  const p = PLATFORMS[norm(locale)];
  return { page: p.pages[id], labels: p.labels };
};

/** Fills {name}-style placeholders. */
export function fmt(s: string, vars: Record<string, string | number>) {
  return s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}
