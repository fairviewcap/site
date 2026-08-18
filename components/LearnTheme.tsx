"use client";

import { useLayoutEffect } from "react";

const TWEEN_MS = 420;

/**
 * Learn home wash — paper + tan on the whole shell (nav through to the footer).
 */
export default function LearnTheme() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("fv-shell-tween");
    root.dataset.shell = "learn";

    return () => {
      delete root.dataset.shell;
      window.setTimeout(() => {
        if (root.dataset.shell !== "learn") {
          root.classList.remove("fv-shell-tween");
        }
      }, TWEEN_MS);
    };
  }, []);

  return null;
}
