"use client";

import { useEffect, useRef } from "react";

const PLATES = [
  "#c3121a",
  "#1c2420",
  "#c5c5bf",
  "#7a8b7b",
  "#3d4a43",
  "#8a8478",
] as const;

const STRIP = [...PLATES, ...PLATES];
const START_SLIDES = 1.15;
const TRAVEL_SLIDES = 3.5;

/**
 * Macro research rail — color plates for now.
 * Full-bleed both edges. Scroll down → left; scroll up → right.
 */
export default function ImSourcesRail() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let from = 0;
    let to = 0;
    let visible = false;
    let raf = 0;

    const measure = () => {
      const plate = track.querySelector<HTMLElement>(".fv-im-sources__plate");
      if (!plate) return;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      const step = plate.getBoundingClientRect().width + gap;
      from = -START_SLIDES * step;
      to = -(START_SLIDES + TRAVEL_SLIDES) * step;
    };

    const apply = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = vh + rect.height;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / span));
      const x = from + (to - from) * p;
      track.style.transform = `translate3d(${x}px,0,0)`;
    };

    const kick = () => {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    };

    measure();

    if (reduced) {
      track.style.transform = `translate3d(${(from + to) / 2}px,0,0)`;
      const ro = new ResizeObserver(measure);
      ro.observe(root);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) kick();
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(root);

    const onScroll = () => {
      if (!visible || document.hidden) return;
      kick();
    };
    const onResize = () => {
      measure();
      kick();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onScroll);

    const ro = new ResizeObserver(onResize);
    ro.observe(root);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className="fv-im-sources" aria-hidden>
      <div ref={trackRef} className="fv-im-sources__track">
        {STRIP.map((color, i) => (
          <span
            key={`${color}-${i}`}
            className="fv-im-sources__plate"
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
