"use client";

import { useEffect, useState } from "react";
import HeroPhoto from "@/components/HeroPhoto";
import ReviewSpot from "@/components/review/ReviewSpot";

/**
 * Community mast. Fade-up, then the photo.
 * Instant final state when prefers-reduced-motion.
 */
export default function CommunityHero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setReady(true);
      return;
    }
    const id = window.setTimeout(() => setReady(true), 40);
    return () => window.clearTimeout(id);
  }, []);

  const fade = (delay: string) =>
    ready
      ? `fv-community__fade fv-community__fade--in ${delay}`
      : "fv-community__fade";

  return (
    <header className="fv-community-hero">
      <div className="fv-community-hero__mast">
        <ReviewSpot id="community" />
        <p className={`fv-community__eyebrow ${fade("")}`}>Community</p>

        <h1 className={`fv-community__title ${fade("fv-community__fade--1")}`}>
          Invested in Marin.
        </h1>

        <p className={`fv-community__lede ${fade("fv-community__fade--2")}`}>
          We’ve been part of this community since 1995.
        </p>
      </div>

      <figure
        className={`fv-community-hero__media ${fade("fv-community__fade--3")}`}
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
