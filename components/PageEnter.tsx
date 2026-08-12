"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Light page-load stagger: children with data-enter fade up in order.
 * Instant final state when prefers-reduced-motion.
 */
export default function PageEnter({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setReady(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div className={ready ? "fv-enter is-ready" : "fv-enter"}>{children}</div>
  );
}
