"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SplitText } from "@/components/motion/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { plans } from "@/content/plans";
import { site } from "@/content/site";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Two line sets. At 360px the desktop break would run off the screen, so
 * narrow viewports get shorter lines. Both are aria-hidden; the h1 owns
 * the one string assistive tech reads.
 */
const HEADLINE = "We build websites that stay built.";
const LINES_SM = ["We build", "websites", "that stay", "built."];
const LINES_LG = ["We build", "websites that", "stay built."];

const entryPrice = Math.min(...plans.map((plan) => plan.price));

/**
 * The one orchestrated load sequence on the site. Everything after this
 * is scroll-driven. Timings run in sequence: eyebrow, headline characters,
 * the rule drawing, then subline, CTA and status bar.
 */
export function Hero() {
  const reduced = useReducedMotion();

  // With reduced motion every delay collapses to zero and nothing moves.
  const fade = (delay: number) =>
    reduced
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay },
        };

  return (
    <section className="relative flex min-h-svh flex-col justify-between pt-28 pb-8 lg:pt-24">
      <div className="shell flex flex-1 flex-col justify-center">
        <motion.p {...fade(0.1)} className="text-eyebrow uppercase text-gray-2">
          <span aria-hidden="true">(01) </span>
          {site.address.locality}, {site.address.region}
          <span className="ml-3 hidden sm:inline">12&deg;31&prime;N 70&deg;02&prime;W</span>
        </motion.p>

        <h1 className="mt-6 text-display-hero text-white lg:mt-8">
          <span className="sr-only">{HEADLINE}</span>
          <SplitText lines={LINES_SM} accentLine={3} delay={0.35} className="block md:hidden" />
          <SplitText
            lines={LINES_LG}
            accentLine={2}
            delay={0.35}
            className="hidden md:block"
          />
        </h1>

        <motion.div
          {...(reduced
            ? { initial: false as const, animate: { scaleX: 1 } }
            : {
                initial: { scaleX: 0 },
                animate: { scaleX: 1 },
                transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.9 },
              })}
          className="mt-10 h-px w-full origin-left bg-gray-1"
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div {...fade(1.2)} className="lg:col-span-5 lg:row-start-1">
            <ButtonLink href="/contact">Start a project</ButtonLink>
          </motion.div>

          <motion.p
            {...fade(1.1)}
            className="text-body-lg text-gray-3 lg:col-span-5 lg:col-start-7 lg:row-start-1"
            style={{ maxWidth: "46ch" }}
          >
            We are a small studio in Aruba. We design and build your site with AI
            in the loop, then keep it fast, secure and current from{" "}
            <span className="text-white">${entryPrice} a month</span>.
          </motion.p>
        </div>
      </div>

      <motion.div
        {...fade(1.35)}
        className="shell mt-12 flex flex-col gap-2 border-t border-gray-1 pt-5 text-caption text-gray-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="flex items-center gap-2">
          <span aria-hidden="true">&darr;</span> Scroll
        </span>
        <span>Booked into November</span>
        <span>4 sites under care this month</span>
      </motion.div>
    </section>
  );
}
