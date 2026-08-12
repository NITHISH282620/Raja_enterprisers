import type { NextConfig } from "next";

/**
 * Review deployment routing.
 *
 * Three design directions are served side by side for client review, each
 * under its own path prefix so all three stay reachable at once:
 *   /home1 — dark editorial direction (3D hanger hero), five pages
 *   /home2 — photographic direction (Halle G hero), single page
 *   /home3 — approved direction, built out as the full six-page system
 *
 * home1 was previously a route group and therefore occupied the root, which
 * both hid it from /home1 and put its sub-pages (/about, /work, …) in direct
 * conflict with the legacy WordPress redirects below — redirects win over
 * pages in Next, so those pages were unreachable. It is now a real segment.
 *
 * The root redirects rather than rendering, so there is exactly one canonical
 * URL per page. These redirects are temporary (307) because the signed-off
 * direction will move to the root once review closes.
 */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      // No variant owns the root during review; send it to the direction
      // currently being demoed.
      { source: "/", destination: "/home1", permanent: false },

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
