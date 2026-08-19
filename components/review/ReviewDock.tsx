"use client";

import { useReview } from "./ReviewProvider";

export default function ReviewDock() {
  const review = useReview();
  if (!review?.active) return null;

  return (
    <button
      type="button"
      className="fv-review-exit"
      onClick={review.exit}
    >
      Exit review
    </button>
  );
}
