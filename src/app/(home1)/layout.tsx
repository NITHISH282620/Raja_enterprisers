import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/nav/SiteFooter";

export default function Home1Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-paper text-ink">
      <a
        href="#main"
        className="t-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
    </div>
  );
}
