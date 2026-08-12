import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";
import { company } from "@/content/home1/company";

export const metadata: Metadata = {
  title: "About — Raja Enterprises",
  description:
    "Established 1977 in Bengaluru. A turnkey event management and infrastructure provider with 460 in-house personnel.",
};

export default function AboutPage() {
  return (
    <PageStub index="03" name="About" title="Since 1977.">
      <p className="t-body text-steel-700">{company.positioning}</p>
      <p className="t-body mt-6 text-steel-700">
        Raja Enterprises is based in {company.city}. Catering is delivered
        through sister concern {company.sisterConcern}.
      </p>
    </PageStub>
  );
}
