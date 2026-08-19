"use client";

import { clipIndex, getReviewClip } from "@/lib/review/clips";
import { useReview } from "./ReviewProvider";

export default function ReviewSpot({
  id,
  align = "start",
  tone = "light",
}: {
  id: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
}) {
  const review = useReview();
  const clip = getReviewClip(id);
  if (!review?.active || !clip) return null;

  const n = clipIndex(id) + 1;
  const live = review.openId === id;

  return (
    <button
      id={`review-${id}`}
      type="button"
      className={[
        "fv-review-spot",
        `fv-review-spot--${align}`,
        `fv-review-spot--${tone}`,
        live ? "is-live" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`Play clip ${n}: ${clip.title}`}
      aria-pressed={live}
      onClick={() => review.open(id)}
    >
      <span className="fv-review-spot__n fv-nums">
        {String(n).padStart(2, "0")}
      </span>
      <span className="fv-review-spot__icon" aria-hidden>
        <PlayMark />
      </span>
      <span className="fv-review-spot__label">{clip.title}</span>
    </button>
  );
}

function PlayMark() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
      <path d="M2.2 1.15v8.7L9.6 5.5 2.2 1.15Z" />
    </svg>
  );
}
