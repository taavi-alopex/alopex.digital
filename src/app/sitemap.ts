import type { MetadataRoute } from "next";

const locales = ["en", "et", "pl"];
const baseUrl = "https://alopex.digital";

// Case studies slugs
const caseStudies = [
  "ovision-invoicing",
  "gemoss-sales-kpis",
  "ovision-production",
  "swa-poland-recruitment",
  "ovision-quotes-costing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/services",
    "/process",
    "/contact",
    "/case-studies",
    "/health-check",
    "/privacy-policy",
    "/terms",
  ];

  // GEO landing pages (not in navigation, for AI/search discovery)
  const geoPages = [
    "/gohighlevel-agency-europe",
    "/gohighlevel-expert",
    "/n8n-automation-agency",
    "/revops-agency-europe",
  ];

  // Add all static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1 : page === "/services" ? 0.9 : 0.8,
      });
    }
  }

  // Add case studies
  for (const locale of locales) {
    for (const slug of caseStudies) {
      routes.push({
        url: `${baseUrl}/${locale}/case-studies/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Add GEO landing pages
  for (const locale of locales) {
    for (const page of geoPages) {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }
  }

  // Polish-specific landing page for quote follow-up campaign
  routes.push({
    url: `${baseUrl}/pl/automatyczny-follow-up`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  });

  return routes;
}
