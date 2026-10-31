import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  // Booking keys are read at build time (from .env.production.local, written by the deploy) and baked into
  // the server code, so the running container needs no extra settings. Only the /api/booking routes use them.
  env: {
    GHL_API_TOKEN: process.env.GHL_API_TOKEN ?? "",
    GHL_LOCATION_ID: process.env.GHL_LOCATION_ID ?? "",
  },
  // The 2026 redesign moved case studies to /work (one page per client).
  async redirects() {
    return [
      { source: "/:locale(en|et|pl)/case-studies/ovision-:rest", destination: "/:locale/work/ovision", permanent: true },
      { source: "/:locale(en|et|pl)/case-studies/gemoss-:rest", destination: "/:locale/work/gemoss", permanent: true },
      { source: "/:locale(en|et|pl)/case-studies/swa-poland-:rest", destination: "/:locale/work/swa", permanent: true },
      { source: "/:locale(en|et|pl)/case-studies/:path*", destination: "/:locale/work", permanent: true },
      // Old campaign landings, removed 31.10.2026.
      { source: "/:locale(en|et|pl)/automate-sales", destination: "/:locale", permanent: true },
      { source: "/:locale(en|et|pl)/automatyczny-follow-up", destination: "/:locale/work/koduaken", permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/pricing",
        destination: "/pricing.html",
      },
      {
        source: "/sample-dashboard",
        destination: "/sample-dashboard.html",
      },
      // Teataja lead magnet. A static file rather than a route so it stays outside the
      // next-intl [locale] tree — /teataja must NOT redirect to /en/teataja, the article
      // in print gives the bare Estonian address.
      {
        source: "/teataja",
        destination: "/teataja.html",
      },
    ];
  },
};

export default withNextIntl(nextConfig);
