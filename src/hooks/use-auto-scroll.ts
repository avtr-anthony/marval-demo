"use client";

import { useEffect, useRef } from "react";

/**
 * Provides an anchor ref that auto-scrolls into view whenever dependencies change.
 */
export function useAutoScroll(dependencies: ReadonlyArray<unknown>) {
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollToAnchor = () => {
      anchorRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    scrollToAnchor();
    const animationFrameId = requestAnimationFrame(scrollToAnchor);
    const timeoutId = window.setTimeout(scrollToAnchor, 140);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.clearTimeout(timeoutId);
    };
  }, dependencies);

  return anchorRef;
}
