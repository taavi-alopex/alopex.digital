import type { MetadataRoute } from "next";
import { CLIENT_DATA } from "@/content/v2/clients";
import { ALL_PRODUCTS } from "@/content/v2/pages";
import { PLATFORM_IDS } from "@/content/v2/platforms";

const locales = ["en", "et", "pl"];
const baseUrl = "https://alopex.digital";

const pages = [
  "",
  "/services",
  "/work",
  "/products",
  "/process",
  "/about",
  "/contact",
  "/health-check",
  "/privacy-policy",
  "/terms",
  ...CLIENT_DATA.map((c) => `/work/${c.id}`),
  ...ALL_PRODUCTS.map((p) => `/products/${p.id}`),
  // Search pages, not in the menu.
  ...PLATFORM_IDS.map((id) => `/${id}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: MetadataRoute.Sitemap = [];
  for (const page of pages) {
    for (const locale of locales) {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : page.split("/").length > 2 ? 0.6 : 0.8,
        alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}${page}`])) },
      });
    }
  }
  return routes;
}
