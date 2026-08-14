"use client";

import { useEffect, useRef, useState } from "react";
import { HEROES, type HeroId } from "@/lib/heroes";

const SCENES: {
  q: string;
  fill: string;
  hero?: HeroId;
}[] = [
  { q: "Selling a business?", fill: "#3d4a43" },
  { q: "Funding a grandchild's trust?", fill: "#5a6b5e" },
  { q: "Building a legacy?", fill: "#2f3632" },
  { q: "Buying a first home?", fill: "#7a8a7c", hero: "firsthome" },
  { q: "Dream travel?", fill: "#4a5c62", hero: "travel2" },
  { q: "Assisting adult children?", fill: "#6b6358" },
  { q: "Philanthropy?", fill: "#44554a" },
  { q: "Retirement?", fill: "#8a8478" },
  { q: "An inheritance arrives?", fill: "#55635a" },
  { q: "Assisted living?", fill: "#3a4540", hero: "hospital" },
];

const HOLD_MS = 2800;
const FADE_MS = 380;

/**
 * Life forks — full-bleed hero plane with question pill overlay.
 */
export default function WmLifeHorizon() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
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
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
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
    if (!inView || paused || reduced || !pageVisible) return;

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
  }, [inView, paused, reduced, pageVisible, index]);

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + SCENES.length) % SCENES.length);
    setVisible(true);
  };

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
          {SCENES.map((s, i) => {
            const hero = s.hero ? HEROES[s.hero] : null;
            return (
              <span
                key={s.q}
                className={
                  i === index
                    ? "fv-wm-horizon__fill is-on"
                    : "fv-wm-horizon__fill"
                }
                style={hero ? undefined : { background: s.fill }}
                aria-hidden
              >
                {hero ? (
                  <picture>
                    <source
                      media="(min-width: 768px)"
                      srcSet={hero.desktop}
                      type="image/avif"
                      width={2400}
                      height={1200}
                    />
                    <img
                      src={hero.mobile}
                      alt=""
                      width={1600}
                      height={2000}
                      className="fv-wm-horizon__photo"
                      loading={i === 3 || i === 4 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </picture>
                ) : null}
              </span>
            );
          })}

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

          <div className="fv-wm-horizon__controls">
            <button
              type="button"
              className="fv-wm-horizon__toggle"
              aria-label="Previous question"
              onClick={() => go(-1)}
            >
              <svg
                className="fv-wm-horizon__chevron"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.5 6.5 9 12l5.5 5.5"
                />
              </svg>
            </button>
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
            <button
              type="button"
              className="fv-wm-horizon__toggle"
              aria-label="Next question"
              onClick={() => go(1)}
            >
              <svg
                className="fv-wm-horizon__chevron"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.5 6.5 15 12l-5.5 5.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </figure>
    </div>
  );
}
