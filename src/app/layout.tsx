import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
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

/**
 * Instrument Serif — the display face for /home4 only.
 *
 * Cormorant (above) stays exactly as it is for home1–home3; this is additive.
 * The two are both serifs but read very differently: Cormorant is high-contrast
 * and fashion-adjacent, with hairlines that thin out badly at hero scale over a
 * photograph. Instrument Serif keeps weight in the stem, so a 100px headline
 * sitting on a stadium plate stays solid rather than sparkling.
 *
 * One weight only. The scale does the work, not the weight axis.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display-alt",
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
    <html
      lang="en"
      className={`${cormorant.variable} ${instrumentSerif.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
