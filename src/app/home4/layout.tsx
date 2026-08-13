import type { Metadata } from "next";
import { Header } from "@/components/home4/Header";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Raja Enterprises — event infrastructure since 1977",
  description:
    "Clear-span German hangers, staging, flooring and exhibition systems for India's largest public events. 5 Lakh Sft of owned hangers, 460 in-house personnel. Bengaluru, established 1977.",
};

export default function Home4Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-paper text-ink">
      <a
        href="#main"
        className="h4-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
