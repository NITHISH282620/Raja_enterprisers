import type { Metadata } from "next";
import { ProtoHeader } from "@/components/proto/ProtoHeader";
import { StudySwitcher } from "@/components/proto/StudySwitcher";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Raja Enterprises — hero study 01, stadium bowl",
  description:
    "Raja Enterprises has been delivering experiential event solutions across India for over four decades. Established 1977, Bengaluru.",
};

export default function Home5Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <ProtoHeader home="/home5" />
      <main id="main">{children}</main>
      <SiteFooter />
      <StudySwitcher />
    </div>
  );
}
