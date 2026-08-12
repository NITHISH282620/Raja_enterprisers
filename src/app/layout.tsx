import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/**
 * Font stack — premium serif + modern sans pairing.
 *
 * Cormorant Garamond for display headlines: elegant, high-contrast serif
 * that reads as "established" and "prestigious" — exactly right for a
 * company founded in 1977 that builds for state ceremonies.
 *
 * Inter for body and UI: clean, highly legible, contemporary. The contrast
 * between the two sets makes the headlines authoritative and the body
 * effortlessly readable.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raja Enterprises",
  description: "Event infrastructure since 1977.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
