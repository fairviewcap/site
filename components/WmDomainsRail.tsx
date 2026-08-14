"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type PlanningDomainPoster = {
  title: string;
  items: readonly string[];
  src: string;
};

/**
 * Horizontal poster rail — flush left, bleeds right.
 * Click fades to black with white scope list. Arrows scroll the rail.
 */
export default function WmDomainsRail({
  domains,
}: {
  domains: readonly PlanningDomainPoster[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const labelId = useId();

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
  }, [domains, updateScrollState]);

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".fv-wm-posters__card");
    if (!card) return;
    const styles = getComputedStyle(rail);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = card.getBoundingClientRect().width + gap;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  return (
    <div className="fv-wm-posters" aria-labelledby={labelId}>
      <p id={labelId} className="sr-only">
        Planning domains
      </p>

      <div ref={railRef} className="fv-wm-posters__rail">
        {domains.map((domain, i) => {
          const src = domain.src;
          const index = String(i + 1).padStart(2, "0");
          const isOpen = open === i;
          const panelId = `${labelId}-panel-${i}`;

          return (
            <article
              key={domain.title}
              className={
                isOpen
                  ? "fv-wm-posters__card is-open"
                  : "fv-wm-posters__card"
              }
            >
              <button
                type="button"
                className="fv-wm-posters__hit"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="fv-wm-posters__media" aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    width={1200}
                    height={1680}
                    className="fv-wm-posters__img"
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </span>
                <span className="fv-wm-posters__shade" aria-hidden />

                <span className="fv-wm-posters__meta">
                  <span className="fv-wm-posters__index">{index}</span>
                  <span className="fv-wm-posters__title">{domain.title}</span>
                </span>

                <span
                  id={panelId}
                  className="fv-wm-posters__panel"
                  aria-hidden={!isOpen}
                >
                  <span className="fv-wm-posters__panel-top">
                    <span className="fv-wm-posters__index">{index}</span>
                    <span className="fv-wm-posters__title">{domain.title}</span>
                  </span>
                  <ul className="fv-wm-posters__list">
                    {domain.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </span>

                <span className="fv-wm-posters__plus" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </article>
          );
        })}
      </div>

      <nav className="fv-wm-posters__nav" aria-label="Planning domains">
        <button
          type="button"
          className="fv-wm-posters__step"
          aria-label="Previous domain"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden />
        </button>
        <button
          type="button"
          className="fv-wm-posters__step"
          aria-label="Next domain"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden />
        </button>
      </nav>
    </div>
  );
}
