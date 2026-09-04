"use client";

import { useSyncExternalStore } from "react";

/**
 * matchMedia as a subscription. Renders `false` on the server, which means
 * layouts that gate on a wide viewport must have a sensible narrow default —
 * the narrow layout is what gets server-rendered.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
