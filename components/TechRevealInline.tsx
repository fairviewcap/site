"use client";

import { useEffect, useState } from "react";
import ContinueBar from "@/components/ContinueBar";
import HeroPhoto from "@/components/HeroPhoto";
import { FIRM } from "@/lib/firm";

/** Historical stepping stones → final lock. Periods added in render. */
const REEL = [
  "Fire",
  "Wheel",
  "The Press",
  "Electricity",
  "Radio",
  "Silicon",
  "AI",
  "Change",
] as const;

/**
 * Dwell before advancing to the next word (ms). Last word locks.
 * Fire reads; mid-arc breathes; AI pauses; Change holds longer before line two.
 */
const DWELL_MS = [420, 140, 180, 180, 180, 200, 380] as const;

type Phase = "reel" | "line2" | "hero" | "rest";

/**
 * Inline reel (prototype A): Tools: [archive] → Relationships last. → hero → body.
 */
export default function TechRevealInline() {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("reel");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setWordIndex(REEL.length - 1);
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

    // Change locks after reel; brief hold, then line 2 → hero → body
    timers.push(window.setTimeout(() => setPhase("line2"), t + 420));
    timers.push(window.setTimeout(() => setPhase("hero"), t + 720));
    timers.push(window.setTimeout(() => setPhase("rest"), t + 1020));

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  const line2In = phase === "line2" || phase === "hero" || phase === "rest";
  const heroIn = phase === "hero" || phase === "rest";
  const restIn = phase === "rest";
  const word = REEL[wordIndex];
  const label = `${word}.`;

  return (
    <>
      <header className="fv-tech-hero">
        <div className="fv-tech-hero__mast">
          <p className="fv-tech__eyebrow fv-tech__fade fv-tech__fade--in">
            Technology
          </p>
          <h1
            className="fv-tech__title"
            aria-label="Tools change. Relationships last."
          >
            <span className="fv-tech__line fv-tech__reel" aria-hidden>
              <span className="fv-tech__reel-fixed">Tools:</span>{" "}
              <span className="fv-tech__reel-slot">
                <span className="fv-tech__reel-sizer" aria-hidden>
                  Electricity.
                </span>
                <span className="fv-tech__reel-word" key={word}>
                  <span className="fv-tech__reel-ghost fv-tech__reel-ghost--a">
                    {label}
                  </span>
                  <span className="fv-tech__reel-ghost fv-tech__reel-ghost--b">
                    {label}
                  </span>
                  <span className="fv-tech__reel-main">{label}</span>
                </span>
              </span>
            </span>
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
