import { Hero } from "@/components/hero/Hero";
import { CapabilityBar } from "@/components/home/CapabilityBar";
import { CredibilityBand } from "@/components/home/CredibilityBand";
import { InventoryField } from "@/components/inventory/InventoryField";
import { SelectedWork } from "@/components/home/SelectedWork";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityBar />
      <CredibilityBand />
      <InventoryField />
      <SelectedWork />
    </>
  );
}
