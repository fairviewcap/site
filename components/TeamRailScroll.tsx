"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Horizontal team rail. Arrows appear on larger screens; touch still swipes.
 */
export default function TeamRailScroll({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setCanPrev(rail.scrollLeft > 6);
    setCanNext(max > 6 && rail.scrollLeft < max - 6);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    update();
    rail.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(rail);
    return () => {
      rail.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const scrollByPage = (dir: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>("figure");
    const styles = getComputedStyle(rail);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const cardStep = card ? card.getBoundingClientRect().width + gap : 0;
    const page = Math.max(cardStep, rail.clientWidth * 0.72);
    rail.scrollBy({ left: dir * page, behavior: "smooth" });
  };

  return (
    <div className="fv-team-rail-wrap">
      <div
        ref={railRef}
        className="fv-team-rail mt-6 flex gap-4 overflow-x-auto pb-2 sm:gap-5 lg:gap-6"
        role="list"
        aria-label="Team"
      >
        {children}
      </div>
      <button
        type="button"
        className="fv-team-rail__arrow fv-team-rail__arrow--prev"
        aria-label="Previous team members"
        disabled={!canPrev}
        onClick={() => scrollByPage(-1)}
      >
        <ArrowLeft size={16} strokeWidth={2} aria-hidden />
      </button>
      <button
        type="button"
        className="fv-team-rail__arrow fv-team-rail__arrow--next"
        aria-label="Next team members"
        disabled={!canNext}
        onClick={() => scrollByPage(1)}
      >
        <ArrowRight size={16} strokeWidth={2} aria-hidden />
      </button>
    </div>
  );
}
