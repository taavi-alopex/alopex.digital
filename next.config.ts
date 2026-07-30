import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
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
