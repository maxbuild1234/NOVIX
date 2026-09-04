"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

/**
 * Lenis smooth scroll. Never initialised when the visitor has asked for
 * reduced motion, so there is no wasted JS and native scrolling is
 * untouched.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors have to go through Lenis or they fight each other.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"], a[href*="/#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const hash = anchor.href.split("#")[1];
      if (!hash) return;

      const target = document.getElementById(hash);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
      // Keep the URL honest without triggering a navigation.
      window.history.pushState(null, "", `#${hash}`);
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  // A route change should land at the top, not wherever the last page was.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
