"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";

/** What a polymorphic `as` resolves to once React's per-tag prop unions are
 *  collapsed. Without this, TS intersects every intrinsic element's props and
 *  lands on `never` for `ref`, `className` and `children`. */
type PolymorphicTag = ComponentType<
  HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }
>;

/**
 * The site's single entrance motion: an 18px rise into place, once, on first
 * intersection. Every section on every page uses this and nothing else, which
 * is what makes six pages read as one system.
 *
 * Two deliberate choices:
 *  - The hidden state is applied by CSS (`[data-reveal]`) but only after mount
 *    sets the attribute. If JS never runs, no attribute is written and the
 *    content is simply visible.
 *  - Reduced motion is handled in CSS rather than here, so there is one place
 *    to check when auditing.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  className,
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger, in milliseconds. Keep under ~240ms — beyond that it reads as lag. */
  delay?: number;
  className?: string;
  id?: string;
}) {
  const Tag = as as PolymorphicTag;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.setAttribute("data-reveal", "");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-reveal={shown ? "shown" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
