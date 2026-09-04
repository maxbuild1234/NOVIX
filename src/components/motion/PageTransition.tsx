"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_IN_OUT_Q } from "@/lib/motion";

/**
 * Route transition: the outgoing page dims and lifts, the incoming one
 * settles. Keyed on pathname. With reduced motion the children render
 * straight through with no AnimatePresence in the tree at all.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: EASE_IN_OUT_Q }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
