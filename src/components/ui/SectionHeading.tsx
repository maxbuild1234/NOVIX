import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-eyebrow uppercase text-gray-2 ${className ?? ""}`}>
      {index ? <span className="text-gray-2">({index}) </span> : null}
      {children}
    </p>
  );
}

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  /** Written with the line breaks you want; each entry is one line. */
  title: string[];
  lede?: string;
  className?: string;
  id?: string;
};

/**
 * The shared section lead: eyebrow, large display title, optional lede
 * set against it. This is the only scroll reveal most sections get.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal>
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
      </Reveal>

      <div className="mt-8 grid gap-x-12 gap-y-8 lg:grid-cols-12">
        <Reveal delay={0.05} className="lg:col-span-7">
          <h2 id={id} className="text-display-1 text-white">
            {title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </Reveal>

        {lede ? (
          <Reveal delay={0.12} className="measure self-end lg:col-span-5">
            <p className="text-body-lg text-gray-3">{lede}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
