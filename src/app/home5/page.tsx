import { Hero } from "@/components/home5/Hero";
import { HomeSections } from "@/components/proto/HomeSections";

/**
 * Hero study 01 — stadium bowl.
 *
 * Everything below the hero is the shared body, identical on /home5–/home9.
 * The only variable on this page is the scene behind the headline.
 */
export default function Home5() {
  return (
    <>
      <Hero />
      <HomeSections />
    </>
  );
}
