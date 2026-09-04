"use client";

import { useReducedMotion } from "framer-motion";

const ITEMS = [
  "Hosting",
  "Security patching",
  "Daily backups",
  "Content edits",
  "Uptime monitoring",
  "Monthly reports",
  "Four languages",
  "Someone who answers",
];

/**
 * A slow marquee of what a plan actually covers. CSS-driven, duplicated
 * once so the loop is seamless. With reduced motion it renders as a single
 * static row and stops.
 */
export function Marquee() {
  const reduced = useReducedMotion();

  const row = (
    <ul
      className="flex shrink-0 items-center gap-12 pr-12"
      style={
        reduced
          ? undefined
          : { animation: "aruweb-marquee 48s linear infinite" }
      }
    >
      {ITEMS.map((item) => (
        // gray-1 would be 1.19:1 here — not subtle, invisible.
        <li key={item} className="flex items-center gap-12 text-display-2 text-gray-2">
          <span>{item}</span>
          <span aria-hidden="true" className="text-purple">
            &bull;
          </span>
        </li>
      ))}
    </ul>
  );

  if (reduced) {
    return (
      <section aria-label="What every plan covers" className="overflow-hidden border-y border-gray-1 py-8">
        <div className="shell">
          <p className="text-body text-gray-3">{ITEMS.join(" · ")}</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="What every plan covers" className="overflow-hidden border-y border-gray-1 py-8">
      <div className="flex w-max" aria-hidden="true">
        {row}
        {row}
      </div>
      <p className="sr-only">{ITEMS.join(", ")}</p>

      <style>{`
        @keyframes aruweb-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-100%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="aruweb-marquee"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
