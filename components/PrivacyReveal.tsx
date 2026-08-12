"use client";

import { useEffect, useState } from "react";

const YEARS_TARGET = 30;
const COUNT_MS = 1400;
const HOLD_MS = 700;
const LEAKS_TO_REST_MS = 520;
const REST_TO_DONE_MS = 700;

type Phase = "counting" | "hold" | "leaks" | "rest" | "done";

function formatYears(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Confidentiality mast: count years → hold → fade “0 leaks.” → reveal the rest.
 * Instant final state when prefers-reduced-motion.
 */
export default function PrivacyReveal() {
  const [years, setYears] = useState(0);
  const [phase, setPhase] = useState<Phase>("counting");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setYears(YEARS_TARGET);
      setPhase("done");
      return;
    }

    let raf = 0;
    const timers: number[] = [];
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - (1 - t) ** 3;
      setYears(Math.round(YEARS_TARGET * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setYears(YEARS_TARGET);
        setPhase("hold");
        timers.push(
          window.setTimeout(() => setPhase("leaks"), HOLD_MS),
        );
        timers.push(
          window.setTimeout(
            () => setPhase("rest"),
            HOLD_MS + LEAKS_TO_REST_MS,
          ),
        );
        timers.push(
          window.setTimeout(
            () => setPhase("done"),
            HOLD_MS + LEAKS_TO_REST_MS + REST_TO_DONE_MS,
          ),
        );
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const showLeaks = phase === "leaks" || phase === "rest" || phase === "done";
  const showRest = phase === "rest" || phase === "done";

  return (
    <>
      <header className="fv-privacy__intro">
        <p className="fv-privacy__eyebrow">Confidentiality</p>
        <h1 className="fv-privacy__title">
          <span className="fv-privacy__years fv-nums">
            <span className="fv-privacy__count">{formatYears(years)}</span>{" "}
            years.
          </span>
          <br />
          <span
            className={
              showLeaks
                ? "fv-privacy__leaks fv-privacy__leaks--in"
                : "fv-privacy__leaks"
            }
          >
            0 leaks.
          </span>
        </h1>
        <p
          className={
            showRest
              ? "fv-privacy__lede fv-privacy__fade fv-privacy__fade--in"
              : "fv-privacy__lede fv-privacy__fade"
          }
        >
          Good advice requires the whole truth. The whole truth requires
          privacy.
        </p>
      </header>

      <div
        className={
          showRest
            ? "fv-privacy__body fv-privacy__fade fv-privacy__fade--in fv-privacy__fade--late"
            : "fv-privacy__body fv-privacy__fade"
        }
      >
        <p>
          Even when we work with multiple generations of the same family, each
          relationship is treated as its own — information is never shared
          unless you ask us to.
        </p>
        <p>
          We understand that financial matters are inherently sensitive.
          That&apos;s why we safeguard your personal and financial information
          with the same rigor we safeguard your wealth.
        </p>
        <p className="fv-privacy__close">
          Simple, discreet, and unwavering: your privacy is always protected.
        </p>
      </div>
    </>
  );
}
