import { Home2Nav } from "@/components/home2/Home2Nav";
import { Home2Footer } from "@/components/home2/Home2Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raja Enterprises — Prototype",
  description: "Client presentation prototype.",
};

export default function Home2Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-white text-ink antialiased">
      <Home2Nav />
      <main id="main">{children}</main>
      <Home2Footer />
    </div>
  );
}
