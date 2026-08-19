"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type PostureId = "conservative" | "balanced" | "growth";

type Series = {
  high: number[];
  median: number[];
  low: number[];
};

const POSTURES: {
  id: PostureId;
  label: string;
  highEnd: number;
  medianEnd: number;
  lowEnd: number;
  success: number;
  wobble: number;
}[] = [
  {
    id: "conservative",
    label: "Conservative",
    highEnd: 16.4,
    medianEnd: 12.1,
    lowEnd: 9.2,
    success: 99,
    wobble: 0.22,
  },
  {
    id: "balanced",
    label: "Balanced",
    highEnd: 26.1,
    medianEnd: 14.65,
    lowEnd: 7.4,
    success: 96,
    wobble: 0.45,
  },
  {
    id: "growth",
    label: "Growth",
    highEnd: 34.8,
    medianEnd: 17.9,
    lowEnd: 5.6,
    success: 91,
    wobble: 0.7,
  },
];

const START = 9.4;
const MAX_SCALE = 40;
const YEAR_GRID = Array.from({ length: 13 }, (_, i) => i / 12);
const N = 48;
const W = 720;
const H = 240;
const PAD = { l: 0, r: 0, t: 6, b: 6 };
const MORPH_MS = 820;

function easeOut(t: number) {
  return 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 4);
}

function curves(mode: (typeof POSTURES)[number]): Series {
  const high: number[] = [];
  const median: number[] = [];
  const low: number[] = [];
  for (let i = 0; i < N; i++) {
    const p = i / (N - 1);
    const g = 1 - Math.pow(1 - p, 1.12);
    high.push(
      START + g * (mode.highEnd - START) + Math.sin(p * Math.PI * 2.05) * mode.wobble,
    );
    median.push(
      START + g * (mode.medianEnd - START) + Math.sin(p * Math.PI * 1.55) * mode.wobble * 0.45,
    );
    low.push(
      START +
        g * (mode.lowEnd - START) -
        Math.sin(p * Math.PI * 1.2) * mode.wobble * 0.35,
    );
  }
  return { high, median, low };
}

function xy(vals: number[]) {
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  return vals.map((v, i) => ({
    x: PAD.l + (i / (N - 1)) * plotW,
    y: PAD.t + plotH - (v / MAX_SCALE) * plotH,
  }));
}

function linePath(pts: { x: number; y: number }[]) {
  return pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
}

function bandPath(
  top: { x: number; y: number }[],
  bot: { x: number; y: number }[],
) {
  const down = linePath(top);
  const back = bot
    .slice()
    .reverse()
    .map((p) => `L${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  return `${down} ${back} Z`;
}

function money(n: number, digits = 1) {
  return `$${n.toFixed(digits)}M`;
}

function yOf(val: number) {
  const plotH = H - PAD.t - PAD.b;
  return PAD.t + plotH - (val / MAX_SCALE) * plotH;
}

function yPct(val: number) {
  const y = yOf(val);
  return `${((y - PAD.t) / (H - PAD.t - PAD.b)) * 100}%`;
}

function lerpSeries(from: Series, to: Series, t: number): Series {
  const mix = (a: number[], b: number[]) =>
    a.map((v, i) => v + (b[i]! - v) * t);
  return {
    high: mix(from.high, to.high),
    median: mix(from.median, to.median),
    low: mix(from.low, to.low),
  };
}

function useMorph(target: Series, enabled: boolean) {
  const [series, setSeries] = useState(target);
  const liveRef = useRef(target);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      setSeries(target);
      liveRef.current = target;
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setSeries(target);
      liveRef.current = target;
      return;
    }
    const from = liveRef.current;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / MORPH_MS);
      const next = lerpSeries(from, target, easeOut(p));
      liveRef.current = next;
      setSeries(next);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, enabled]);

  return series;
}

const Y_GRID = [0, 5, 10, 15, 20, 25, 30, 35, 40];
const Y_LABELS = [0, 10, 20, 30, 40];

export default function WmTwoFutures() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const clipId = useId().replace(/:/g, "");
  const hiId = `${clipId}-hi`;
  const loId = `${clipId}-lo`;
  const [postureId, setPostureId] = useState<PostureId>("balanced");
  const [drawn, setDrawn] = useState(false);
  const [successShown, setSuccessShown] = useState(96);
  const inView = useRef(false);
  const successFrom = useRef(96);

  const mode = POSTURES.find((v) => v.id === postureId) ?? POSTURES[1];
  const target = useMemo(() => curves(mode), [mode]);
  const series = useMorph(target, drawn);
  const hiPts = xy(series.high);
  const midPts = xy(series.median);
  const loPts = xy(series.low);
  const last = midPts[midPts.length - 1]!;
  const hiLast = series.high[series.high.length - 1]!;
  const midLast = series.median[series.median.length - 1]!;
  const loLast = series.low[series.low.length - 1]!;
  const segIndex = POSTURES.findIndex((p) => p.id === postureId);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        inView.current = true;
        setDrawn(true);
        io.disconnect();
      },
      { threshold: 0.35, rootMargin: "0px 0px -16% 0px" },
    );
    if (reduced) {
      inView.current = true;
      setDrawn(true);
      return;
    }
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const to = mode.success;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!drawn || reduced) {
      setSuccessShown(to);
      successFrom.current = to;
      return;
    }
    const from = successFrom.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / MORPH_MS);
      const e = easeOut(p);
      setSuccessShown(Math.round(from + (to - from) * e));
      if (p < 1) raf = requestAnimationFrame(tick);
      else successFrom.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode.success, drawn]);

  const ends = [
    {
      key: "hi",
      value: money(hiLast),
      top: yPct(hiLast),
      tone: "hi" as const,
    },
    {
      key: "mid",
      value: money(midLast),
      top: yPct(midLast),
      tone: "mid" as const,
    },
    {
      key: "lo",
      value: money(loLast),
      top: yPct(loLast),
      tone: "lo" as const,
    },
  ];

  const yearNow = new Date().getFullYear();

  return (
    <div
      ref={wrapRef}
      className={["fv-wm-mc", drawn ? "is-drawn" : ""].filter(Boolean).join(" ")}
    >
      <div className="fv-wm-mc__head">
        <p className="fv-wm-mc__title">Projected value over 35 years</p>
        <p className="fv-wm-mc__cap">
          A reporting view — the stress test, not just the summary.
        </p>
        <div className="fv-wm-mc__bar">
          <div
            className="fv-wm-mc__seg"
            role="tablist"
            aria-label="Investment posture"
            style={{ ["--fv-seg-i" as string]: String(segIndex) }}
          >
            <span className="fv-wm-mc__seg-pill" aria-hidden />
            {POSTURES.map((v) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={v.id === postureId}
                className={
                  v.id === postureId ? "fv-wm-mc__seg-btn is-on" : "fv-wm-mc__seg-btn"
                }
                onClick={() => setPostureId(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
          <p className="fv-wm-mc__hint">Same plan. Different mix.</p>
        </div>
      </div>

      <div
        className={["fv-wm-mc__frame", drawn ? "is-drawn" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="fv-wm-mc__y" aria-hidden>
          {Y_LABELS.slice()
            .reverse()
            .map((v) => (
              <span key={v} style={{ top: yPct(v) }}>
                {v <= 0 ? "$0" : `$${v}M`}
              </span>
            ))}
        </div>

        <div className="fv-wm-mc__plane">
          <svg
            className="fv-wm-mc__svg"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id={hiId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#49CC8A" stopOpacity="0.38" />
                <stop offset="100%" stopColor="#49CC8A" stopOpacity="0.06" />
              </linearGradient>
              <linearGradient id={loId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6A86A8" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#6A86A8" stopOpacity="0.32" />
              </linearGradient>
              <mask
                id={clipId}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={W}
                height={H}
              >
                <rect
                  className="fv-wm-mc__reveal"
                  x={0}
                  y={0}
                  width={W}
                  height={H}
                  fill="#fff"
                />
              </mask>
            </defs>
            <g className="fv-wm-mc__grid">
              {Y_GRID.map((v) => {
                const y = yOf(v);
                return <line key={`h${v}`} x1={0} y1={y} x2={W} y2={y} />;
              })}
              {YEAR_GRID.map((t) => {
                const x = t * W;
                return (
                  <line
                    key={`v${t}`}
                    x1={x}
                    y1={PAD.t}
                    x2={x}
                    y2={H - PAD.b}
                  />
                );
              })}
            </g>
            <g mask={`url(#${clipId})`}>
              <path d={bandPath(hiPts, midPts)} fill={`url(#${hiId})`} />
              <path d={bandPath(midPts, loPts)} fill={`url(#${loId})`} />
              <path
                className="fv-wm-mc__line fv-wm-mc__line--mid"
                d={linePath(midPts)}
                strokeLinejoin="round"
                strokeLinecap="butt"
              />
            </g>
            <circle className="fv-wm-mc__dot" cx={last.x} cy={last.y} r={2.4} />
          </svg>
          <div className="fv-wm-mc__ends" aria-hidden>
            {ends.map((e) => (
              <span
                key={e.key}
                className={`fv-wm-mc__end is-${e.tone}`}
                style={{ top: e.top }}
              >
                {e.value}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="fv-wm-mc__x">
        <span className="is-now">{yearNow}</span>
        <span>{yearNow + 18}</span>
        <span>{yearNow + 35}</span>
      </div>

      <div className="fv-wm-mc__foot">
        <p className="fv-wm-mc__kpi">
          <span className="fv-wm-mc__kpi-n">{successShown}%</span>
          <span className="fv-wm-mc__kpi-l">chance the plan holds</span>
        </p>
        <ul className="fv-wm-mc__legend">
          <li>
            <span className="fv-wm-mc__swatch fv-wm-mc__swatch--hi" />
            Above average market
            <em>(80%)</em>
          </li>
          <li>
            <span className="fv-wm-mc__swatch fv-wm-mc__swatch--mid" />
            Average market
            <em>(50%)</em>
          </li>
          <li>
            <span className="fv-wm-mc__swatch fv-wm-mc__swatch--lo" />
            Below average market
            <em>(20%)</em>
          </li>
        </ul>
        <p className="fv-wm-mc__note">
          Illustration only—not a forecast, a guarantee, or anyone&apos;s
          results. Past performance does not predict future returns.
        </p>
      </div>
    </div>
  );
}
