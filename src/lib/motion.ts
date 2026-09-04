import type { Transition, Variants } from "framer-motion";

/**
 * Shared easing and variants. These mirror the CSS tokens in globals.css
 * so a JS-driven and a CSS-driven animation never feel like two systems.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT_Q = [0.76, 0, 0.24, 1] as const;

export const DURATION = {
  fast: 0.2,
  base: 0.5,
  slow: 0.9,
} as const;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT_EXPO,
};

/** Standard scroll reveal: a short rise, never a bounce. */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

/** Parent for staggered children. */
export function staggerVariants(stagger = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** A line of display type rising out of an overflow-hidden mask. */
export const maskLineVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
};

/** Applied when the visitor asks for reduced motion: everything is already there. */
export const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};
