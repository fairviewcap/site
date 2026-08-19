"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { WhyTimelineEntry } from "@/lib/why-fairview";

/**
 * Crisis cycle rail — arrows step one card.
 */
export default function WhyCrisisRail({
  timeline,
}: {
  timeline: WhyTimelineEntry[];
}) {
  const railRef = useRef<HTMLOListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setCanPrev(rail.scrollLeft > 6);
    setCanNext(rail.scrollLeft < max - 6);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(rail);
    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [timeline, updateScrollState]);

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".fv-why__card");
    if (!card) return;
    const styles = getComputedStyle(rail);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = card.getBoundingClientRect().width + gap;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const showNav = canPrev || canNext;

  return (
    <div className="fv-why__rail-wrap">
      <ol ref={railRef} className="fv-why__rail">
        {timeline.map((entry) => (
          <li key={entry.when} className="fv-why__card">
            <figure className="fv-why__card-figure">
              <div className="fv-why__card-plate">
                <img
                  src={entry.photo}
                  alt=""
                  width={1600}
                  height={2000}
                  className="fv-why__card-art"
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <figcaption className="fv-why__card-copy">
                <p className="fv-why__card-when">
                  <span className="fv-why__card-year fv-nums">
                    {entry.when}
                  </span>
                  {entry.era ? (
                    <span className="fv-why__card-era">{entry.era}</span>
                  ) : null}
                </p>
                <p className="fv-why__card-what">{entry.what}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>

      {showNav ? (
        <nav className="fv-why__rail-nav" aria-label="Crisis timeline">
          <button
            type="button"
            className="fv-why__rail-step"
            aria-label="Previous crisis"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
          >
            <ArrowLeft size={16} strokeWidth={2} aria-hidden />
          </button>
          <button
            type="button"
            className="fv-why__rail-step"
            aria-label="Next crisis"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
          >
            <ArrowRight size={16} strokeWidth={2} aria-hidden />
          </button>
        </nav>
      ) : null}
    </div>
  );
}
