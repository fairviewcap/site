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

    let intersecting = false;
    const sync = () => {
      if (!video) return;
      const show = !document.hidden && intersecting;
      if (show) void video.play().catch(() => {});
      else video.pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        intersecting = Boolean(entry?.isIntersecting);
        sync();
      },
      { threshold: 0.35 },
    );

    io.observe(root);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
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
          autoPlay
          loop
          preload="metadata"
          aria-hidden
        />
        <picture>
          <source
            srcSet="/photography/devices/iphone-vert.avif"
            type="image/avif"
          />
          <img
            className="fv-wm-iphone__frame"
            src="/photography/devices/iphone-vert.png"
            alt=""
            width={478}
            height={585}
            decoding="async"
          />
        </picture>
      </div>
    </figure>
  );
}
