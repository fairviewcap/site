"use client";

import { useEffect, useState } from "react";
import FeeSchedule from "@/components/FeeSchedule";
import { FEE_INCLUDES } from "@/lib/fees";

type Phase =
  | "boot"
  | "headline"
  | "open-hidden"
  | "open-hide"
  | "body"
  | "notes";

const GROW_MS = 1100;

function includesProse(items: readonly string[]) {
  const lower = items.map((item) => item.charAt(0).toLowerCase() + item.slice(1));
  if (lower.length === 0) return "";
  if (lower.length === 1) return lower[0];
  if (lower.length === 2) return `${lower[0]} and ${lower[1]}`;
  return `${lower.slice(0, -1).join(", ")}, and ${lower[lower.length - 1]}`;
}

/**
 * Fees mast: fade headline → stagger redaction → lede + bars → notes.
 */
export default function FeesHero() {
  const [phase, setPhase] = useState<Phase>("boot");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("notes");
      return;
    }

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("headline"), 40));
    timers.push(window.setTimeout(() => setPhase("open-hidden"), 720));
    timers.push(window.setTimeout(() => setPhase("open-hide"), 980));
    timers.push(window.setTimeout(() => setPhase("body"), 1400));
    timers.push(
      window.setTimeout(() => setPhase("notes"), 1400 + GROW_MS + 120),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  const titleIn = phase !== "boot";
  const openHidden =
    phase === "open-hidden" ||
    phase === "open-hide" ||
    phase === "body" ||
    phase === "notes";
  const openHide =
    phase === "open-hide" || phase === "body" || phase === "notes";
  const bodyIn = phase === "body" || phase === "notes";
  const notesIn = phase === "notes";

  return (
    <>
      <div className="fv-frame">
        <div className="fv-fees">
          <header className="fv-fees__intro">
            <p
              className={
                titleIn
                  ? "fv-fees__eyebrow fv-fees__fade fv-fees__fade--in"
                  : "fv-fees__eyebrow fv-fees__fade"
              }
            >
              Fees
              <span className="fv-fees__asof">Updated Mar 2026</span>
            </p>
            <h1
              className={
                titleIn
                  ? "fv-fees__title fv-fees__fade fv-fees__fade--in"
                  : "fv-fees__title fv-fees__fade"
              }
            >
              A <Redact open={openHidden}>hidden</Redact> fee is a fee with
              something to <Redact open={openHide}>hide</Redact>.
            </h1>
            <p
              className={
                bodyIn
                  ? "fv-fees__lede fv-fees__fade fv-fees__fade--in"
                  : "fv-fees__lede fv-fees__fade"
              }
            >
              Ours aren&apos;t. Every fee we charge is clear, simple, and fully
              disclosed, right here.
            </p>
          </header>
        </div>
      </div>

      <FeeSchedule active={bodyIn} />

      <div className="fv-frame">
        <div className="fv-fees">
          <p
            className={
              notesIn
                ? "fv-fees__note fv-fees__note--includes fv-fees__fade fv-fees__fade--in"
                : "fv-fees__note fv-fees__note--includes fv-fees__fade"
            }
          >
            The fee covers {includesProse(FEE_INCLUDES)}.
          </p>
          <p
            className={
              notesIn
                ? "fv-fees__note fv-fees__note--follow fv-fees__fade fv-fees__fade--in"
                : "fv-fees__note fv-fees__note--follow fv-fees__fade"
            }
          >
            Billed quarterly. As assets increase, the percentage declines — and
            we combine assets across families, which can further reduce fees. No
            commissions. No separate planning fees. We are a Registered
            Investment Advisor and act as a fiduciary.
          </p>
        </div>
      </div>
    </>
  );
}

function Redact({
  children,
  open,
}: {
  children: string;
  open: boolean;
}) {
  return (
    <span
      className={
        open ? "fv-fees__redact fv-fees__redact--open" : "fv-fees__redact"
      }
    >
      {children}
      <span className="fv-fees__redact-bar" aria-hidden />
    </span>
  );
}
