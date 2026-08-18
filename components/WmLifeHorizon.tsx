"use client";

import { useEffect, useRef, useState } from "react";
import { HEROES, type HeroId } from "@/lib/heroes";
import PlayPauseIcon from "@/components/PlayPauseIcon";

type ScenePhoto = { desktop: string; mobile: string };

const LIFE = "/photography/life-paths";

const heroPair = (id: HeroId): ScenePhoto => ({
  desktop: HEROES[id].desktop,
  mobile: HEROES[id].mobile,
});

const lifePair = (slug: string): ScenePhoto => ({
  desktop: `${LIFE}/${slug}-h.avif`,
  mobile: `${LIFE}/${slug}-v.avif`,
});

const SCENES: {
  q: string;
  fill: string;
  photo: ScenePhoto;
}[] = [
  { q: "Selling a business?", fill: "#3d4a43", photo: heroPair("sellbusiness") },
  {
    q: "Funding a grandchild's trust?",
    fill: "#5a6b5e",
    photo: heroPair("fundgrandkids"),
  },
  { q: "Building a legacy?", fill: "#2f3632", photo: lifePair("legacy") },
  { q: "Buying a first home?", fill: "#333a2f", photo: heroPair("firsthome") },
  { q: "Dream travel?", fill: "#4a5c62", photo: heroPair("travel2") },
  {
    q: "Assisting adult children?",
    fill: "#6b6358",
    photo: lifePair("adult-children"),
  },
  { q: "Philanthropy?", fill: "#44554a", photo: lifePair("philanthropy") },
  { q: "Retirement?", fill: "#8a8478", photo: lifePair("retirement") },
  {
    q: "An inheritance arrives?",
    fill: "#55635a",
    photo: lifePair("inheritance"),
  },
  { q: "Assisted living?", fill: "#3a4540", photo: heroPair("hospital") },
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
          <div className="fv-wm-horizon__clip">
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
              >
                <picture>
                  <source
                    media="(min-width: 768px)"
                    srcSet={s.photo.desktop}
                    type="image/avif"
                    width={2400}
                    height={1200}
                  />
                  <img
                    src={s.photo.mobile}
                    alt=""
                    width={1600}
                    height={2000}
                    className="fv-wm-horizon__photo"
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </picture>
              </span>
            ))}
          </div>

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
              <PlayPauseIcon playing={playing} />
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
