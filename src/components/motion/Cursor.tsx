"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * A dot that trails the pointer and swells into an inverted disc over
 * anything interactive. Purely decorative, so it is aria-hidden, is not
 * mounted for reduced-motion visitors, and is not mounted on touch
 * devices where there is no cursor to replace.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    if (reduced) return;
    // Only where a real pointer exists.
    const fine = window.matchMedia("(pointer: fine)");
    setEnabled(fine.matches);

    const onChange = (event: MediaQueryListEvent) => setEnabled(event.matches);
    fine.addEventListener("change", onChange);
    return () => fine.removeEventListener("change", onChange);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    const interactive = 'a, button, [role="button"], input, textarea, select, [data-cursor="grow"]';

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest?.(interactive)));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="rounded-full"
        animate={{
          width: active ? 56 : 10,
          height: active ? 56 : 10,
          opacity: visible ? 1 : 0,
          backgroundColor: active ? "#ffffff" : "#7c3aed",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
          // Not animated: blend modes are discrete, so switching it here
          // keeps Framer from trying to tween between keywords.
          mixBlendMode: active ? "difference" : "normal",
        }}
      />
    </motion.div>
  );
}
