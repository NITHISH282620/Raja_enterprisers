import type { Metadata } from "next";
import { Jost, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Raja Enterprises",
  description: "Event infrastructure since 1977.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jost.variable} ${plexMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
