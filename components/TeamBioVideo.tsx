"use client";

import { useRef, useState } from "react";

type Props = {
  name: string;
  image: string;
  videoUrl: string;
};

/**
 * Bio media column — still as poster; tap plays the portrait clip.
 * Same 4:5 slot whether or not video exists (page chooses which to render).
 */
export default function TeamBioVideo({ name, image, videoUrl }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
    } else {
      el.pause();
    }
  };

  return (
    <div className="fv-team-bio__photo fv-team-bio__photo--video">
      <video
        ref={ref}
        className="fv-team-bio__video"
        poster={image || undefined}
        src={videoUrl}
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        aria-label={`${name} introduction`}
      />
      <button
        type="button"
        className={
          playing
            ? "fv-team-bio__play fv-team-bio__play--on"
            : "fv-team-bio__play"
        }
        onClick={toggle}
        aria-label={playing ? `Pause ${name}` : `Play ${name} introduction`}
      >
        <span className="fv-team-bio__play-mark" aria-hidden />
      </button>
    </div>
  );
}
