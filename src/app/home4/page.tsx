import { Hero } from "@/components/home4/Hero";
import {
  Capabilities,
  Closing,
  Positioning,
  Scale,
  SelectedWork,
} from "@/components/home4/Sections";
import { Structure } from "@/components/home4/Structure";
import { ClientMarquee } from "@/components/site/ClientMarquee";

/**
 * /home4 — the approved redesign.
 *
 * Eight sections, and the discipline is in what is *not* here. The previous
 * homepage carried a flagship card, an inventory schedule and a four-up card
 * grid inside a single band; the schedule now lives on the inventory page and
 * the cards became full-width editorial rows. Fewer containers, larger
 * photographs, more air.
 *
 * The spine — a hairline at the left gutter — runs from the positioning
 * statement to the organisations strip, tying the middle of the page into one
 * composition rather than a stack of panels. It stops at the hero and the
 * closing band, both of which are full-bleed and own their own edges.
 */
export default function Home4() {
  return (
    <>
      <Hero />

      <div className="h4-spine">
        <Positioning />
        <Capabilities />
        <SelectedWork />
        <Scale />
        <Structure />
        <ClientMarquee />
      </div>

      <Closing />
    </>
  );
}
