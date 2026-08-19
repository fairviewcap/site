"use client";

import { useEffect, useRef, useState } from "react";
import { FIRM_ENTITY } from "@/lib/firm";
import { FIGURES, formatAsOf } from "@/lib/figures";
import { WHY_FIGURES, WHY_FIGURES_QUIET } from "@/lib/why-fairview";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

const SLIDES = [
  { kind: "title" as const },
  ...WHY_FIGURES.map((fig) => ({ kind: "figure" as const, ...fig })),
];

/**
 * The record — one figure per viewport, settled through a fixed slot.
 */
export default function WhyFigures() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [leave, setLeave] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  const primed = useRef(false);
  const n = SLIDES.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = pinRef.current;
    if (!el) return;

    const update = () => {
      const total = el.offsetHeight - window.innerHeight;
      const next =
        total <= 0
          ? 0
          : clamp(Math.floor(clamp(-el.getBoundingClientRect().top / total, 0, 1) * n), 0, n - 1);
      setIndex((cur) => {
        if (next === cur) {
          primed.current = true;
          return cur;
        }
        if (primed.current) setLeave(cur);
        primed.current = true;
        return next;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced, n]);

  useEffect(() => {
    if (leave === null) return;
    const t = window.setTimeout(() => setLeave(null), 580);
    return () => window.clearTimeout(t);
  }, [leave, index]);

  const asOf = FIGURES.aum.asOf ? formatAsOf(FIGURES.aum.asOf) : null;

  if (reduced) {
    return (
      <section
        id="numbers"
        className="fv-why-figs is-static"
        aria-labelledby="why-numbers"
      >
        <header className="fv-why-figs__intro">
          <p className="fv-why-figs__eyebrow">The record</p>
          <h2 id="why-numbers" className="fv-why-figs__h2">
            The numbers,
            <br />
            not the adjectives.
          </h2>
          {asOf ? <p className="fv-why-figs__asof">{asOf}</p> : null}
        </header>
        <dl className="fv-why-figs__list">
          {WHY_FIGURES.map((fig) => (
            <div key={fig.label} className="fv-why-figs__row">
              <dt className="fv-why-figs__value fv-nums">{fig.value}</dt>
              <dd className="fv-why-figs__label">{fig.label}</dd>
            </div>
          ))}
        </dl>
        <QuietRow />
      </section>
    );
  }

  return (
    <section id="numbers" className="fv-why-figs" aria-labelledby="why-numbers">
      <div
        ref={pinRef}
        className="fv-why-figs__pin"
        style={{ height: `${n * 100}vh` }}
      >
        <div className="fv-why-figs__sticky">
          <p className="fv-why-figs__eyebrow">The record</p>
          <h2 id="why-numbers" className="sr-only">
            The numbers,
            <br />
            not the adjectives.
          </h2>

          <div className="fv-why-figs__stage">
            {SLIDES.map((slide, i) => {
              const on = i === index;
              const out = i === leave;
              return (
                <div
                  key={slide.kind === "title" ? "title" : slide.label}
                  className={[
                    "fv-why-figs__slide",
                    on ? "is-on" : "",
                    out ? "is-leave" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden={!on}
                >
                  {slide.kind === "title" ? (
                    <>
                      <p className="fv-why-figs__h2" aria-hidden>
                        The numbers,
            <br />
            not the adjectives.
                      </p>
                      {asOf ? <p className="fv-why-figs__asof">{asOf}</p> : null}
                    </>
                  ) : (
                    <>
                      <p className="fv-why-figs__value fv-nums">{slide.value}</p>
                      <p className="fv-why-figs__label">{slide.label}</p>
                      {slide.note ? (
                        <p className="fv-why-figs__asof">{slide.note}</p>
                      ) : null}
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <p className="fv-why-figs__count fv-nums" aria-hidden>
            <span className="fv-why-figs__idx" key={index}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span> / {String(n).padStart(2, "0")}</span>
          </p>
        </div>
      </div>
      <QuietRow />
    </section>
  );
}

function QuietRow() {
  return (
    <div className="fv-why-figs__foot">
      <dl className="fv-why-figs__quiet">
        {WHY_FIGURES_QUIET.map((fig) => (
          <div key={fig.label} className="fv-why-figs__quiet-item">
            <dt className="fv-why-figs__quiet-value fv-nums">{fig.value}</dt>
            <dd className="fv-why-figs__quiet-label">{fig.label}</dd>
          </div>
        ))}
      </dl>
      <p className="fv-why-figs__entity">{FIRM_ENTITY.blurb}</p>
    </div>
  );
}
