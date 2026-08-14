"use client";

import { useEffect, useRef } from "react";

/**
 * iPhone device frame with screen video (temp clip until final reel lands).
 */
export default function WmIphoneMedia() {
  const rootRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;
        if (entry?.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={rootRef} className="fv-wm-iphone">
      <div className="fv-wm-iphone__stage">
        <video
          ref={videoRef}
          className="fv-wm-iphone__screen"
          src="/video/devices/iphone-temp.mp4"
          muted
          playsInline
          loop
          preload="metadata"
          aria-hidden
        />
        <img
          className="fv-wm-iphone__frame"
          src="/photography/devices/iphone-vert.avif"
          alt=""
          width={478}
          height={585}
          decoding="async"
        />
      </div>
    </figure>
  );
}
