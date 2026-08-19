"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ContinueBar from "@/components/ContinueBar";
import HeroPhoto from "@/components/HeroPhoto";
import ReviewSpot from "@/components/review/ReviewSpot";
import { FIRM } from "@/lib/firm";

const REEL = ["Computers", "Internet", "Cloud", "Mobile", "AI"] as const;

const DWELL_MS = [420, 180, 180, 380] as const;

type Phase = "reel" | "headline" | "line2" | "hero" | "rest";

function fitFontSize(
  measure: HTMLElement,
  maxW: number,
  maxH: number,
): number {
  let lo = 12;
  let hi = Math.min(Math.max(maxW, maxH) * 1.35, 520);
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    measure.style.fontSize = `${mid}px`;
    if (measure.scrollWidth <= maxW && measure.scrollHeight <= maxH) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return lo;
}

/**
 * Full-bleed tool reel → Tools change. → Relationships last. → hero → body.
 */
export default function TechReveal() {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("reel");
  const [reelOut, setReelOut] = useState(false);
  const [fontSize, setFontSize] = useState(48);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);

  const word = REEL[wordIndex];
  const label = `${word}.`;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setWordIndex(REEL.length - 1);
      setReelOut(true);
      setPhase("rest");
      return;
    }

    const timers: number[] = [];
    let t = 0;

    for (let i = 0; i < DWELL_MS.length; i++) {
      t += DWELL_MS[i];
      const next = i + 1;
      timers.push(window.setTimeout(() => setWordIndex(next), t));
    }

    timers.push(window.setTimeout(() => setReelOut(true), t + 480));
    timers.push(window.setTimeout(() => setPhase("headline"), t + 780));
    timers.push(window.setTimeout(() => setPhase("line2"), t + 1180));
    timers.push(window.setTimeout(() => setPhase("hero"), t + 1580));
    timers.push(window.setTimeout(() => setPhase("rest"), t + 1980));

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const measure = measureRef.current;
    if (!stage || !measure || reelOut) return;

    const run = () => {
      const styles = getComputedStyle(stage);
      const maxW =
        stage.clientWidth -
        parseFloat(styles.paddingLeft) -
        parseFloat(styles.paddingRight);
      const maxH =
        stage.clientHeight -
        parseFloat(styles.paddingTop) -
        parseFloat(styles.paddingBottom);
      if (maxW < 8 || maxH < 8) return;
      measure.textContent = label;
      setFontSize(fitFontSize(measure, maxW, maxH));
    };

    run();
    const ro = new ResizeObserver(run);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [label, reelOut]);

  const showReel = phase === "reel";
  const headlineIn =
    phase === "headline" ||
    phase === "line2" ||
    phase === "hero" ||
    phase === "rest";
  const line2In = phase === "line2" || phase === "hero" || phase === "rest";
  const heroIn = phase === "hero" || phase === "rest";
  const restIn = phase === "rest";

  return (
    <>
      <div
        ref={stageRef}
        className={
          reelOut
            ? "fv-tech-b-stage fv-tech-b-stage--out"
            : "fv-tech-b-stage"
        }
        aria-hidden={!showReel}
        {...(!showReel ? { inert: true } : {})}
      >
        <span ref={measureRef} className="fv-tech-b-measure" aria-hidden />
        <div
          className="fv-tech-b-stage__word"
          key={word}
          style={{ fontSize: `${fontSize}px` }}
        >
          <span className="fv-tech-b-ghost fv-tech-b-ghost--a">{label}</span>
          <span className="fv-tech-b-ghost fv-tech-b-ghost--b">{label}</span>
          <span className="fv-tech-b-main">{label}</span>
        </div>
      </div>

      <header
        className={
          headlineIn
            ? "fv-tech-hero fv-tech-b-mast fv-tech__fade fv-tech__fade--in"
            : "fv-tech-hero fv-tech-b-mast fv-tech__fade"
        }
        aria-hidden={!headlineIn}
      >
        <div className="fv-tech-hero__mast">
          <ReviewSpot id="technology" />
          <p className="fv-tech__eyebrow">Technology</p>
          <h1
            className="fv-tech__title"
            aria-label="Tools change. Relationships last."
          >
            <span className="fv-tech__line">Tools change.</span>
            <br />
            <span
              className={
                line2In
                  ? "fv-tech__line fv-tech__fade fv-tech__fade--in"
                  : "fv-tech__line fv-tech__fade"
              }
              aria-hidden={!line2In}
            >
              Relationships last.
            </span>
          </h1>
          <p
            className={
              restIn
                ? "fv-tech__lede fv-tech__fade fv-tech__fade--in"
                : "fv-tech__lede fv-tech__fade"
            }
          >
            No machine can understand your values, weigh your trade-offs, or
            guide your family through life&apos;s most personal decisions.
          </p>
        </div>

        <figure
          className={
            heroIn
              ? "fv-tech-hero__media fv-tech__fade fv-tech__fade--in"
              : "fv-tech-hero__media fv-tech__fade"
          }
          aria-hidden={!heroIn}
        >
          <div className="fv-tech-hero__plane">
            <HeroPhoto id="college" priority imgClassName="fv-hero-photo" />
          </div>
        </figure>
      </header>

      <div className="fv-frame pt-12 pb-4 sm:pt-16">
        <div className="fv-tech">
          <div
            className={
              restIn
                ? "fv-tech__body fv-tech__fade fv-tech__fade--in"
                : "fv-tech__body fv-tech__fade"
            }
          >
            <p>
              We use technology — including AI — to run deeper analysis,
              stress-test more scenarios, and cut friction that used to slow
              planning down. It helps us see further.
            </p>
            <p>
              What it can&apos;t do is replace judgment. A model can show you
              the range of outcomes. It can&apos;t tell you which one is right
              for your family, or sit with you when the decision actually gets
              made.
            </p>
            <p className="fv-tech__close">
              Since 1995: use whatever helps us see further — never let it
              decide for you.
            </p>
          </div>

          <div
            className={
              restIn
                ? "fv-tech__continue fv-tech__fade fv-tech__fade--in fv-tech__fade--late"
                : "fv-tech__continue fv-tech__fade"
            }
            aria-hidden={!restIn}
            {...(!restIn ? { inert: true } : {})}
          >
            <ContinueBar
              items={[
                {
                  href: "/answers",
                  prompt:
                    "Curious how we talk about AI and the tools clients use?",
                },
                {
                  href: "/work/wealth-management",
                  prompt: "Want to see how the day-to-day work actually runs?",
                },
                {
                  href: FIRM.contactHref,
                  prompt: "Ready to talk through your situation?",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
