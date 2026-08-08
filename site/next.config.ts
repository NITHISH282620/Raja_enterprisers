import type { NextConfig } from "next";

/**
 * The live WordPress URLs are indexed. `/creative-agency/` and
 * `/home-portfolio/` are poor slugs, but dropping them would throw away the
 * existing search equity — so they redirect rather than 404 (plan §A).
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/creative-agency", destination: "/capabilities", permanent: true },
      { source: "/home-portfolio", destination: "/work", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/portfolios/:slug", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
