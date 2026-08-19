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
    root.dataset.whyField = "cine";

    const update = () => {
      const cine = document.querySelector(".fv-why-cine");
      const paper =
        cine instanceof HTMLElement &&
        cine.getBoundingClientRect().bottom <= 72;
      root.dataset.whyField = paper ? "paper" : "cine";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      delete root.dataset.shell;
      delete root.dataset.whyField;
      window.setTimeout(() => {
        if (root.dataset.shell !== "why") {
          root.classList.remove("fv-shell-tween");
        }
      }, TWEEN_MS);
    };
  }, []);

  return null;
}
