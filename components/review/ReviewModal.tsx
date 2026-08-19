"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  adjacentClip,
  clipIndex,
  REVIEW_CLIPS,
  reviewMediaSrc,
} from "@/lib/review/clips";
import { useReview } from "./ReviewProvider";

export default function ReviewModal() {
  const review = useReview();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasFile, setHasFile] = useState(false);
  const [showScript, setShowScript] = useState(false);

  const clip = review?.openClip ?? null;

  useEffect(() => {
    setHasFile(false);
    setShowScript(false);
    const el = videoRef.current;
    if (!el || !clip) return;
    el.src = reviewMediaSrc(clip);
    el.load();
  }, [clip]);

  useEffect(() => {
    if (!clip) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") review?.close();
      if (e.key === "ArrowRight") review?.go(1);
      if (e.key === "ArrowLeft") review?.go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clip, review]);

  useEffect(() => {
    if (!clip) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [clip]);

  if (!review?.active || !clip) return null;

  const i = clipIndex(clip.id);
  const total = REVIEW_CLIPS.length;
  const hasPrev = Boolean(adjacentClip(clip.id, -1));
  const hasNext = Boolean(adjacentClip(clip.id, 1));
  const paras = clip.script.split(/\n\n+/);

  return (
    <div className="fv-review-modal" role="presentation">
      <button
        type="button"
        className="fv-review-modal__backdrop"
        aria-label="Close player"
        onClick={review.close}
      />
      <div
        className="fv-review-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fv-review-modal-title"
      >
        <header className="fv-review-modal__top">
          <p className="fv-review-modal__kicker">
            Review
            <span className="fv-nums">
              {String(i + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </p>
          <h2 id="fv-review-modal-title" className="fv-review-modal__title">
            {clip.title}
          </h2>
          <button
            type="button"
            className="fv-review-modal__close"
            onClick={review.close}
            aria-label="Close player"
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </header>

        <video
          ref={videoRef}
          className={
            hasFile
              ? "fv-review-modal__video is-on"
              : "fv-review-modal__video"
          }
          controls={hasFile}
          playsInline
          autoPlay={hasFile}
          preload="metadata"
          onLoadedData={() => {
            setHasFile(true);
            void videoRef.current?.play();
          }}
          onError={() => setHasFile(false)}
        />
        {!hasFile ? (
          <p className="fv-review-modal__missing">
            Missing {clip.id}.mp4 in public/review/
          </p>
        ) : null}

        <div className="fv-review-modal__nav">
          <button
            type="button"
            className="fv-review-modal__step"
            disabled={!hasPrev}
            onClick={() => review.go(-1)}
          >
            <ChevronLeft size={16} strokeWidth={2.2} />
            Prev
          </button>
          <button
            type="button"
            className="fv-review-modal__textbtn"
            onClick={() => setShowScript((v) => !v)}
          >
            {showScript ? "Hide script" : "Show script"}
          </button>
          <button
            type="button"
            className="fv-review-modal__step"
            disabled={!hasNext}
            onClick={() => review.go(1)}
          >
            Next
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>

        {showScript
          ? paras.map((para) => (
              <p
                key={para.slice(0, 48)}
                className={
                  para.startsWith("[")
                    ? "fv-review-modal__script is-cue"
                    : "fv-review-modal__script"
                }
              >
                {para}
              </p>
            ))
          : null}
      </div>
    </div>
  );
}
