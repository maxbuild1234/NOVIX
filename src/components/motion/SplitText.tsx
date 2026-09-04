"use client";

import { motion, useReducedMotion } from "framer-motion";
import { accentColorAt } from "@/lib/color";
import { EASE_OUT_EXPO } from "@/lib/motion";

type SplitTextProps = {
  /** One entry per visual line. Lines are not re-flowed, so write them as you want them broken. */
  lines: string[];
  className?: string;
  /** Zero-based index of the line that carries the white-to-purple ramp. */
  accentLine?: number;
  delay?: number;
  /** Seconds between each character. */
  stagger?: number;
};

/**
 * Character-by-character reveal out of an overflow-hidden mask.
 *
 * Always aria-hidden: the caller exposes the real string once, so nobody
 * hears a headline spelled out one letter at a time and two responsive
 * copies do not read twice.
 */
export function SplitText({
  lines,
  className,
  accentLine,
  delay = 0,
  stagger = 0.018,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  let charIndex = -1;

  return (
    <span aria-hidden="true" className={className}>
      {lines.map((line, lineIndex) => {
        const chars = Array.from(line);
        const isAccent = lineIndex === accentLine;

        return (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <span className="inline-block">
              {chars.map((char, i) => {
                charIndex += 1;
                const color = isAccent
                  ? accentColorAt(chars.length > 1 ? i / (chars.length - 1) : 1)
                  : undefined;

                if (reduced) {
                  return (
                    <span key={`${lineIndex}-${i}`} className="whitespace-pre" style={{ color }}>
                      {char}
                    </span>
                  );
                }

                return (
                  <motion.span
                    key={`${lineIndex}-${i}`}
                    className="inline-block whitespace-pre will-change-transform"
                    style={{ color }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 1.1,
                      ease: EASE_OUT_EXPO,
                      delay: delay + charIndex * stagger,
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          </span>
        );
      })}
    </span>
  );
}
