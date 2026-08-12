"use client";

import { useLayoutEffect } from "react";

const TWEEN_MS = 420;

/**
 * Page-scoped dark shell — rail/main/footer via CSS vars on <html>.
 * Tweens out on leave so the cream shell doesn’t hard-cut.
 */
export default function PrivacyTheme() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("fv-shell-tween");
    root.dataset.shell = "privacy";

    return () => {
      delete root.dataset.shell;
      window.setTimeout(() => {
        // Only clear if nothing re-entered privacy in the meantime
        if (root.dataset.shell !== "privacy") {
          root.classList.remove("fv-shell-tween");
        }
      }, TWEEN_MS);
    };
  }, []);

  return null;
}
