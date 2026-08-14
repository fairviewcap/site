"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

const RAIL_Y = 36;
const R = 9;
const X0 = 18;
const STEP = 30;
const MANAGED_N = 3;
const PAD = 7;

/** Managed: even green on the rail. Outside: uneven size + subtle Y drift; settle on hit. */
const ASSETS = [
  { id: "equities", kind: "managed" as const, color: "var(--fv-green)", scale: 1, dy: 0 },
  { id: "bonds", kind: "managed" as const, color: "var(--fv-green)", scale: 1, dy: 0 },
  { id: "cash", kind: "managed" as const, color: "var(--fv-green)", scale: 1, dy: 0 },
  { id: "re", kind: "outside" as const, color: "#e33f84", scale: 0.72, dy: -4 },
  { id: "stake", kind: "outside" as const, color: "#a62b9a", scale: 1.55, dy: 5 },
  { id: "k401", kind: "outside" as const, color: "#6816b0", scale: 1.68, dy: -3 },
  { id: "other", kind: "outside" as const, color: "#4211a2", scale: 0.34, dy: 6 },
  { id: "art", kind: "outside" as const, color: "#3e37c2", scale: 0.52, dy: -5 },
  { id: "collectible", kind: "outside" as const, color: "#4a60e6", scale: 1.28, dy: 3 },
  { id: "alt", kind: "outside" as const, color: "#71c7ec", scale: 0.9, dy: -2 },
].map((a, i) => ({ ...a, x: X0 + STEP * i, i }));

const TOTAL = ASSETS.length;

const PILL_X = X0 - R - PAD;
const PILL_Y = RAIL_Y - R - PAD;
const PILL_H = (R + PAD) * 2;
const PILL_RX = PILL_H / 2;
const PILL_W_IDLE = STEP * (MANAGED_N - 1) + (R + PAD) * 2;
const PILL_W_FULL = STEP * (TOTAL - 1) + (R + PAD) * 2;
const VIEW_W = PILL_X + PILL_W_FULL + 12;
const Y_PAD = Math.max(...ASSETS.map((a) => Math.abs(a.dy)));
const VIEW_H = PILL_Y + PILL_H + Y_PAD + 12;

/** When the extending pill edge reaches each outside dot (0–1 of extend duration). */
function hitAt(outsideIndex: number) {
  // Lead the center slightly so capture starts as the edge arrives, not after.
  const x = X0 + STEP * (MANAGED_N + outsideIndex) - R * 0.65;
  const edgeIdle = PILL_X + PILL_W_IDLE;
  const edgeFull = PILL_X + PILL_W_FULL;
  const t = (x - edgeIdle) / (edgeFull - edgeIdle);
  return Math.max(0, Math.min(1, t));
}

/** Matches CSS --fv-unify-ease on the pill width animation. */
const EXTEND_EASE = [0.4, 0.0, 0.2, 1] as const;

function bezierComp(t: number, a: number, b: number) {
  const mt = 1 - t;
  return 3 * mt * mt * t * a + 3 * mt * t * t * b + t * t * t;
}

function bezierDeriv(t: number, a: number, b: number) {
  const mt = 1 - t;
  return 3 * mt * mt * a + 6 * mt * t * (b - a) + 3 * t * t * (1 - b);
}

/** CSS cubic-bezier progress at time u ∈ [0,1]. */
function cssBezierProgress(
  u: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  let t = u;
  for (let i = 0; i < 8; i++) {
    const x = bezierComp(t, x1, x2);
    const dx = bezierDeriv(t, x1, x2);
    if (Math.abs(dx) < 1e-6) break;
    t -= (x - u) / dx;
    t = Math.max(0, Math.min(1, t));
  }
  return bezierComp(t, y1, y2);
}

/** Time u where eased progress ≈ spatial progress p (keeps hits locked to the edge). */
function timeForProgress(p: number, ease: readonly [number, number, number, number]) {
  const [x1, y1, x2, y2] = ease;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    if (cssBezierProgress(mid, x1, y1, x2, y2) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

const EXTEND_MS = 2200;
const EXTEND_DELAY_MS = 180;
const SETTLE_MS = 820;
const COLOR_MS = 980;
const PLAY_MS = EXTEND_DELAY_MS + EXTEND_MS + SETTLE_MS + 280;

function PlayIcon() {
  return (
    <svg
      className="fv-wm-unify__icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M8.2 5.1c0-.95.98-1.57 1.8-1.12l9.7 5.35a1.3 1.3 0 0 1 0 2.24l-9.7 5.35c-.82.45-1.8-.17-1.8-1.12V5.1z"
      />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg
      className="fv-wm-unify__icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden
    >
      <path
        d="M12 5a7 7 0 1 0 6.6 4.55"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19.2 4.2v4.2h-4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Interactive consolidation — pill expands to include outside assets.
 */
export default function WmAssetUnify() {
  const id = useId();
  const timerRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<"idle" | "playing" | "done">("idle");
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const startPlay = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setPhase("playing");
    timerRef.current = window.setTimeout(() => setPhase("done"), PLAY_MS);
  };

  const onClick = () => {
    if (phase === "playing") return;

    if (phase === "done") {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setPhase("idle");
      setRunKey((k) => k + 1);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          startPlay();
        });
      });
      return;
    }

    startPlay();
  };

  return (
    <div
      className={
        phase === "playing"
          ? "fv-wm-unify is-playing"
          : phase === "done"
            ? "fv-wm-unify is-playing is-done"
            : "fv-wm-unify"
      }
      style={
        {
          "--fv-unify-pill-w-idle": `${PILL_W_IDLE}`,
          "--fv-unify-pill-w-full": `${PILL_W_FULL}`,
          "--fv-unify-extend-ms": `${EXTEND_MS}ms`,
          "--fv-unify-extend-delay": `${EXTEND_DELAY_MS}ms`,
          "--fv-unify-settle-ms": `${SETTLE_MS}ms`,
          "--fv-unify-color-ms": `${COLOR_MS}ms`,
          "--fv-unify-ease": "cubic-bezier(0.4, 0, 0.2, 1)",
        } as CSSProperties
      }
    >
      <div className="fv-wm-unify__meta">
        <button
          type="button"
          id={id}
          className="fv-wm-unify__btn"
          onClick={onClick}
          disabled={phase === "playing"}
          aria-label={
            phase === "done" ? "Replay asset consolidation" : "Unify assets"
          }
        >
          {phase === "done" ? <ReplayIcon /> : <PlayIcon />}
          <span>{phase === "done" ? "Replay" : "Unify assets"}</span>
        </button>
      </div>

      <div className="fv-wm-unify__stage">
      <svg
        key={runKey}
        className="fv-wm-unify__svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        width={VIEW_W}
        height={VIEW_H}
        preserveAspectRatio="xMinYMid meet"
        role="img"
        aria-labelledby={`${id}-desc`}
      >
        <title id={`${id}-desc`}>
          A shell expands to include outside holdings with managed assets
        </title>

        <rect
          className="fv-wm-unify__rail"
          x={PILL_X}
          y={PILL_Y}
          height={PILL_H}
          rx={PILL_RX}
          ry={PILL_RX}
        />

        {ASSETS.map((a) =>
          a.kind === "managed" ? (
            <circle
              key={a.id}
              className="fv-wm-unify__dot fv-wm-unify__dot--managed"
              cx={a.x}
              cy={RAIL_Y}
              r={R}
            />
          ) : (
            <circle
              key={a.id}
              className="fv-wm-unify__dot fv-wm-unify__dot--outside"
              cx={a.x}
              cy={RAIL_Y + a.dy}
              r={R}
              style={
                {
                  "--fv-unify-color": a.color,
                  "--fv-unify-scale": `${a.scale}`,
                  "--fv-unify-y0": RAIL_Y + a.dy,
                  "--fv-unify-y1": RAIL_Y,
                  "--fv-unify-hit": `${timeForProgress(hitAt(a.i - MANAGED_N), EXTEND_EASE)}`,
                } as CSSProperties
              }
            />
          ),
        )}
      </svg>
      </div>

      <p className="fv-wm-unify__status" aria-live="polite">
        <span className="fv-wm-unify__pulse" aria-hidden />
        100% unified at no extra charge
      </p>
    </div>
  );
}
