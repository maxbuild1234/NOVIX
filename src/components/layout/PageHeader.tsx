import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

type PageHeaderProps = {
  eyebrow: string;
  /** One entry per visual line. */
  title: string[];
  lede?: string;
  children?: ReactNode;
};

/** The shared masthead for every page other than the home page. */
export function PageHeader({ eyebrow, title, lede, children }: PageHeaderProps) {
  return (
    <header className="shell pt-40 pb-16 lg:pt-48 lg:pb-24">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="mt-8 text-display-1 text-white">
          {title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
      </Reveal>

      {lede ? (
        <Reveal delay={0.1}>
          <p className="measure mt-10 text-body-lg text-gray-3">{lede}</p>
        </Reveal>
      ) : null}

      {children}
    </header>
  );
}
