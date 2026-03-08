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
    ];
  },
};

export default withNextIntl(nextConfig);
