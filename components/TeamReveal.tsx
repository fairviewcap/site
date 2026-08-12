"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Team page entrance: headline → lede → filters → staggered cards.
 * Instant final state when prefers-reduced-motion.
 */
export default function TeamReveal({ children }: { children: ReactNode }) {
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
    <div className={ready ? "fv-team-reveal is-ready" : "fv-team-reveal"}>
      {children}
    </div>
  );
}
