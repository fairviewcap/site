"use client";

import { useLayoutEffect } from "react";

const TWEEN_MS = 420;

/**
 * Why Fairview — nav sits on the green opener instead of a paper strip.
 */
export default function WhyTheme() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("fv-shell-tween");
    root.dataset.shell = "why";

    return () => {
      delete root.dataset.shell;
      window.setTimeout(() => {
        if (root.dataset.shell !== "why") {
          root.classList.remove("fv-shell-tween");
        }
      }, TWEEN_MS);
    };
  }, []);

  return null;
}
