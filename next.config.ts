import type { NextConfig } from "next";

/**
 * Review deployment routing.
 *
 * Two design directions are served side by side for client review:
 *   /home2 — earlier photographic direction (Halle G hero)
 *   /home3 — approved direction, built out as the full six-page system
 *
 * The root redirects to /home3 rather than rendering it, so there is exactly
 * one canonical URL per page while both variants stay reachable. These
 * redirects are temporary (307) because the approved direction will move to
 * the root once it is signed off.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Indexed WordPress URLs from the live site. Preserved rather than
      // 404'd, so existing search equity lands on the new page system.
      { source: "/about-us", destination: "/home3/legacy", permanent: false },
      { source: "/about", destination: "/home3/legacy", permanent: false },
      { source: "/creative-agency", destination: "/home3/inventory", permanent: false },
      { source: "/capabilities", destination: "/home3/inventory", permanent: false },
      { source: "/services", destination: "/home3/inventory", permanent: false },
      { source: "/home-portfolio", destination: "/home3/portfolio", permanent: false },
      { source: "/work", destination: "/home3/portfolio", permanent: false },
      { source: "/notable-events", destination: "/home3/portfolio", permanent: false },
      { source: "/portfolios/:slug", destination: "/home3/portfolio", permanent: false },
      { source: "/contact", destination: "/home3/contact", permanent: false },
    ];
  },
};

export default nextConfig;
