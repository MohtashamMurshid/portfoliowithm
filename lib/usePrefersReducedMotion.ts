"use client";

import { useSyncExternalStore } from "react";

export const reducedMotionMediaQuery = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionMediaQuery);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(reducedMotionMediaQuery).matches;
}

function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
