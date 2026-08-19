"use client";

import { useEffect, useState } from "react";
import HeroPhoto from "@/components/HeroPhoto";
import ReviewSpot from "@/components/review/ReviewSpot";

type Phase = "boot" | "neighbors" | "converge" | "first" | "rest";

const CONVERGE_MS = 1100;

/**
 * Community mast: Neighbors forms → “first.” lands → lede + photo.
 * Instant final state when prefers-reduced-motion.
 */
export default function CommunityHero() {
  const [phase, setPhase] = useState<Phase>("boot");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("rest");
      return;
    }

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase("neighbors"), 40));
    timers.push(window.setTimeout(() => setPhase("converge"), 320));
    timers.push(
      window.setTimeout(() => setPhase("first"), 320 + CONVERGE_MS),
    );
    timers.push(
      window.setTimeout(() => setPhase("rest"), 320 + CONVERGE_MS + 320),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  const eyebrowIn = phase !== "boot";
  const neighborsIn = phase !== "boot";
  const tight =
    phase === "converge" ||
    phase === "first" ||
    phase === "rest";
  const firstIn = phase === "first" || phase === "rest";
  const restIn = phase === "rest";

  return (
    <header className="fv-community-hero">
      <div className="fv-community-hero__mast">
        <ReviewSpot id="community" />
        <p
          className={
            eyebrowIn
              ? "fv-community__eyebrow fv-community__fade fv-community__fade--in"
              : "fv-community__eyebrow fv-community__fade"
          }
        >
          Community
        </p>

        <h1 className="fv-community__title">
          <span
            className={[
              "fv-community__neighbors",
              neighborsIn ? "fv-community__fade fv-community__fade--in" : "fv-community__fade",
              tight ? "is-tight" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            Neighbors
          </span>{" "}
          <span
            className={
              firstIn
                ? "fv-community__first fv-community__fade fv-community__fade--in"
                : "fv-community__first fv-community__fade"
            }
          >
            first.
          </span>
        </h1>

        <p
          className={
            restIn
              ? "fv-community__lede fv-community__fade fv-community__fade--in"
              : "fv-community__lede fv-community__fade"
          }
        >
          We don&apos;t just write checks in Marin. We live here.
        </p>
      </div>

      <figure
        className={
          restIn
            ? "fv-community-hero__media fv-community__fade fv-community__fade--in"
            : "fv-community-hero__media fv-community__fade"
        }
      >
        <div className="fv-community-hero__plane">
          <HeroPhoto id="community" priority imgClassName="fv-hero-photo" />
        </div>
        <figcaption className="fv-community__media-cap">
          Fairview Capital is a proud sponsor of Marin FC.
        </figcaption>
      </figure>
    </header>
  );
}
