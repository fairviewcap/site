"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { TeamMember } from "@/lib/team/types";

type Clip = Pick<
  TeamMember,
  "id" | "name" | "slug" | "role" | "since" | "image" | "videoUrl"
>;

type Props = {
  clips: Clip[];
  /** Face used on the rail poster. */
  posterImage?: string;
};

/**
 * Home rail poster → modal card carousel of portrait intros.
 * One person at a time; arrows + dots; auto-advances when a clip ends.
 */
export default function TeamVideoReel({ clips, posterImage }: Props) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);

  indexRef.current = index;

  const close = useCallback(() => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setPlaying(false);
    setOpen(false);
    setIndex(0);
  }, []);

  const goTo = useCallback((next: number) => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setPlaying(false);
    setIndex(((next % clips.length) + clips.length) % clips.length);
  }, [clips.length]);

  const playCurrent = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      await el.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Load + autoplay whenever the open card changes
  useEffect(() => {
    if (!open) return;
    const el = videoRef.current;
    if (!el) return;
    el.load();
    if (reduced) return;
    void playCurrent();
  }, [open, index, reduced, playCurrent]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goTo(indexRef.current + 1);
      if (e.key === "ArrowLeft") goTo(indexRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, goTo]);

  if (clips.length === 0) return null;

  const clip = clips[index]!;
  const poster = posterImage || clips[0]?.image || "";
  const roleLine = clip.since
    ? `${clip.role}, since ${clip.since}`
    : clip.role;

  return (
    <>
      <button
        type="button"
        className="fv-team-reel__poster"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="fv-team-reel__poster-frame">
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt="" className="fv-team-reel__poster-img" />
          ) : null}
          <span className="fv-team-reel__poster-play" aria-hidden />
        </span>
        <span className="fv-team-reel__poster-cap">
          <span className="fv-team-reel__poster-title">Short introductions</span>
          <span className="fv-team-reel__poster-meta">
            {clips.length} on camera
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="fv-team-reel__dialog"
        aria-labelledby={titleId}
        onClose={close}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        onKeyDown={(e: KeyboardEvent<HTMLDialogElement>) => {
          if (e.key === "Escape") close();
        }}
      >
        <div className="fv-team-reel__card">
          <header className="fv-team-reel__head">
            <h2 id={titleId} className="fv-team-reel__title">
              Short introductions
            </h2>
            <button
              type="button"
              className="fv-team-reel__close"
              onClick={close}
            >
              Close
            </button>
          </header>

          <div className="fv-team-reel__stage">
            {clips.length > 1 ? (
              <button
                type="button"
                className="fv-team-reel__arrow fv-team-reel__arrow--prev"
                onClick={() => goTo(index - 1)}
                aria-label="Previous introduction"
              >
                ‹
              </button>
            ) : null}

            <div className="fv-team-reel__media">
              <video
                key={clip.id}
                ref={videoRef}
                className="fv-team-reel__video"
                poster={clip.image || undefined}
                src={clip.videoUrl ?? undefined}
                playsInline
                preload="auto"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => {
                  if (clips.length <= 1) {
                    setPlaying(false);
                    return;
                  }
                  goTo(indexRef.current + 1);
                }}
                aria-label={`${clip.name} introduction`}
              />
              {!playing ? (
                <button
                  type="button"
                  className="fv-team-reel__play"
                  onClick={() => void playCurrent()}
                  aria-label={`Play ${clip.name}`}
                >
                  <span className="fv-team-reel__play-mark" aria-hidden />
                </button>
              ) : null}
            </div>

            {clips.length > 1 ? (
              <button
                type="button"
                className="fv-team-reel__arrow fv-team-reel__arrow--next"
                onClick={() => goTo(index + 1)}
                aria-label="Next introduction"
              >
                ›
              </button>
            ) : null}
          </div>

          <div className="fv-team-reel__info">
            <Link href={`/team/${clip.slug}`} className="fv-team-reel__name">
              {clip.name}
            </Link>
            <p className="fv-team-reel__role fv-nums">{roleLine}</p>
          </div>

          {clips.length > 1 ? (
            <div
              className="fv-team-reel__dots"
              role="tablist"
              aria-label="Introductions"
            >
              {clips.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${c.name} (${i + 1} of ${clips.length})`}
                  className={
                    i === index
                      ? "fv-team-reel__dot fv-team-reel__dot--on"
                      : "fv-team-reel__dot"
                  }
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
