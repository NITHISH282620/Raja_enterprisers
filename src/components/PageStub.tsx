import { SectionIndex } from "@/components/primitives/SectionIndex";

/**
 * Route stub. The pitch is scoped to the homepage and capabilities page; these
 * routes exist so navigation is complete and honest rather than dead-ended.
 */
export function PageStub({
  index,
  name,
  title,
  children,
}: {
  index: string;
  name: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-paper pt-32 md:pt-40">
      <div className="shell pb-28">
        <SectionIndex index={index} name={name} />
        <h1 className="t-display-xl mt-10 max-w-[14ch]">{title}</h1>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
