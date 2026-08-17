"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { FEE_SCHEDULE, type FeeTier } from "@/lib/fees";

function feePercent(tier: FeeTier): number {
  return Number(`${tier.whole}.${tier.fraction}`);
}

function AssetsSentence({ tier }: { tier: FeeTier }) {
  const [first, second] = tier.assetsValues;

  return (
    <>
      {tier.assetsLead}{" "}
      <span className="fv-fees__value fv-nums">{first}</span>
      {second && tier.assetsJoin ? (
        <>
          {" "}
          {tier.assetsJoin}{" "}
          <span className="fv-fees__value fv-nums">{second}</span>
        </>
      ) : null}
    </>
  );
}

const GROW_MS = 1100;

/**
 * Fee schedule — 100% tracks grow L→R; fill is the advisory fee mark.
 */
export default function FeeSchedule({ active = true }: { active?: boolean }) {
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      return;
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      setProgress(1);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / GROW_MS);
      const eased = 1 - (1 - t) ** 3;
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setProgress(1);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div
      className={
        active
          ? "fv-fees__schedule fv-fees__fade fv-fees__fade--in"
          : "fv-fees__schedule fv-fees__fade"
      }
      role="list"
      aria-label="Fee schedule"
    >
      {FEE_SCHEDULE.map((tier, i) => {
        const target = feePercent(tier);
        const shown = reduced ? target : target * progress;
        const cents = Math.round(shown * 100);
        const whole = Math.floor(cents / 100);
        const fracStr = String(cents % 100).padStart(2, "0");
        const grow = reduced ? 1 : progress;

        return (
          <div
            key={`${tier.whole}.${tier.fraction}`}
            className="fv-fees__tier"
            role="listitem"
            style={
              {
                "--fv-fee-i": i,
                "--fv-fee-pct": `${target}%`,
                "--fv-bar-grow": grow,
              } as CSSProperties
            }
          >
            <p className="fv-fees__band">
              <AssetsSentence tier={tier} />
            </p>

            <div className="fv-fees__bar" aria-hidden>
              <div className="fv-fees__bar-rail">
                <div className="fv-fees__bar-track">
                  <div
                    className="fv-fees__bar-fill"
                    style={{ width: `${target}%` }}
                  />
                </div>
              </div>
            </div>

            <div
              className="fv-fees__rate"
              aria-label={`${tier.whole}.${tier.fraction} percent`}
            >
              <span className="fv-fees__whole fv-nums">{whole}</span>
              <span className="fv-fees__dot">.</span>
              <span className="fv-fees__frac fv-nums">{fracStr}</span>
              <span className="fv-fees__unit" aria-hidden>
                %
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
