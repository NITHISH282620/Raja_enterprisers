import type { Metadata } from "next";
import { Jost, IBM_Plex_Mono } from "next/font/google";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/nav/SiteFooter";
import "./globals.css";

/**
 * Jost stands in for the brochure's Futura BT — same geometric lineage, open
 * licence, so brand continuity survives without a type purchase (plan §D).
 */
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // The live site still ships the theme demo title, "Full Page Slider".
  title: "Raja Enterprises — Event infrastructure since 1977",
  description:
    "Imported German hangers, staging, stalls, flooring and power for events at state scale. 460 in-house personnel. Bengaluru, since 1977.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jost.variable} ${plexMono.variable}`}>
      <body className="bg-paper text-ink antialiased">
        <a
          href="#main"
          className="t-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
