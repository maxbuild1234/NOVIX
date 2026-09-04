"use client";

import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { riseVariants, staggerVariants, staticVariants } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  /** Fraction of the element that must be in view before it plays. */
  amount?: number;
};

/**
 * A single scroll reveal. Used sparingly and on section leads only, not
 * on every element, so the page does not read as one long fade-up.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  amount = 0.35,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={reduced ? staticVariants : riseVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay: reduced ? 0 : delay }}
    >
      {children}
    </MotionTag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  stagger?: number;
  amount?: number;
};

/** Parent that staggers `RevealItem` children. */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
  amount = 0.2,
}: RevealGroupProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={reduced ? staticVariants : staggerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag className={className} variants={reduced ? staticVariants : riseVariants}>
      {children}
    </MotionTag>
  );
}
