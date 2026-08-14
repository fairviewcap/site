"use client";

import { useEffect, useRef, useState } from "react";

const SCENES = [
  { q: "Selling a business?", fill: "#3d4a43" },
  { q: "Funding a grandchild's trust?", fill: "#5a6b5e" },
  { q: "Building a legacy?", fill: "#2f3632" },
  { q: "Buying a first home?", fill: "#7a8a7c" },
  { q: "Dream travel?", fill: "#4a5c62" },
  { q: "Assisting adult children?", fill: "#6b6358" },
  { q: "Philanthropy?", fill: "#44554a" },
  { q: "Retirement?", fill: "#8a8478" },
  { q: "An inheritance arrives?", fill: "#55635a" },
  { q: "Assisted living?", fill: "#3a4540" },
] as const;

const HOLD_MS = 2800;
const FADE_MS = 380;

/**
 * Life forks — full-bleed hero plane with question pill overlay.
 */
export default function WmLifeHorizon() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(true);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) setPaused(true);
    const onChange = () => {
      setReduced(mq.matches);
      if (mq.matches) setPaused(true);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.25 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || reduced) return;

    let fadeTimer = 0;
    const tick = window.setInterval(() => {
      setVisible(false);
      fadeTimer = window.setTimeout(() => {
        setIndex((i) => (i + 1) % SCENES.length);
        setVisible(true);
      }, FADE_MS);
    }, HOLD_MS);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(fadeTimer);
    };
  }, [inView, paused, reduced]);

  const scene = SCENES[index];
  const mark = String(index + 1).padStart(2, "0");
  const playing = !paused;

  return (
    <div
      ref={rootRef}
      className="fv-wm-horizon"
      aria-live="polite"
      aria-atomic="true"
    >
      <figure className="fv-wm-horizon__media">
        <div className="fv-wm-horizon__plane">
          {SCENES.map((s, i) => (
            <span
              key={s.q}
              className={
                i === index
                  ? "fv-wm-horizon__fill is-on"
                  : "fv-wm-horizon__fill"
              }
              style={{ background: s.fill }}
              aria-hidden
            />
          ))}

          <div className="fv-wm-horizon__pill">
            <span className="fv-wm-horizon__index" aria-hidden>
              {mark}
              <span className="fv-wm-horizon__index-sep">/</span>
              {String(SCENES.length).padStart(2, "0")}
            </span>
            <div className="fv-wm-horizon__stage">
              <p
                className={
                  visible
                    ? "fv-wm-horizon__question is-in"
                    : "fv-wm-horizon__question"
                }
              >
                {scene.q}
              </p>
            </div>
          </div>

          <button
            type="button"
            className={
              playing
                ? "fv-wm-horizon__toggle is-playing"
                : "fv-wm-horizon__toggle"
            }
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            aria-pressed={playing}
            onClick={() => setPaused((p) => !p)}
          >
            <span className="fv-wm-horizon__toggle-icon" aria-hidden />
          </button>
        </div>
      </figure>
    </div>
  );
}
