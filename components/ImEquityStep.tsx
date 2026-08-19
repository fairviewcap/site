"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import ImPrecisionMixer from "@/components/ImPrecisionMixer";

export type EquityStepId = "assess" | "project" | "research" | "value";

const BEAT_MS = 480;

const EquityPlay = createContext(false);

export function ImEquitySteps({ children }: { children: ReactNode }) {
  const { ref, inView } = useOnceInView<HTMLOListElement>();

  return (
    <ol ref={ref} className="fv-im-steps">
      <EquityPlay.Provider value={inView}>{children}</EquityPlay.Provider>
    </ol>
  );
}

export default function ImEquityStep({
  id,
  index = 0,
}: {
  id: EquityStepId;
  index?: number;
}) {
  const play = useStaggeredPlay(index);
  if (id === "project") return <ProjectPlate play={play} />;
  if (id === "research") return <ResearchPlate play={play} />;
  if (id === "value") return <ValuePlate play={play} />;
  return <AssessPlate play={play} />;
}

function useOnceInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -16% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

function useStaggeredPlay(index: number) {
  const rowIn = useContext(EquityPlay);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!rowIn) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPlay(true);
      return;
    }
    const t = window.setTimeout(() => setPlay(true), index * BEAT_MS);
    return () => window.clearTimeout(t);
  }, [rowIn, index]);

  return play;
}

function AssessPlate({ play }: { play: boolean }) {
  return (
    <div className="fv-im-eq fv-im-eq--assess">
      <ImPrecisionMixer compact play={play} />
    </div>
  );
}

function ProjectPlate({ play }: { play: boolean }) {
  const clipId = useId().replace(/:/g, "");

  const W = 320;
  const H = 240;
  const pad = { l: 28, r: 28, t: 40, b: 40 };
  const xs = [0, 0.25, 0.5, 0.75, 1].map(
    (t) => pad.l + t * (W - pad.l - pad.r),
  );
  const plotH = H - pad.t - pad.b;
  const yOf = (n: number) => pad.t + plotH * (1 - n);

  const high = [0.22, 0.34, 0.5, 0.68, 0.86].map(yOf);
  const base = [0.22, 0.3, 0.42, 0.56, 0.7].map(yOf);
  const low = [0.22, 0.26, 0.32, 0.38, 0.44].map(yOf);

  const toLine = (ys: number[]) =>
    ys.map((y, i) => `${i === 0 ? "M" : "L"}${xs[i]!.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  const fan = `${toLine(high)} ${low
    .slice()
    .reverse()
    .map((y, i) => `L${xs[4 - i]!.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ")} Z`;

  return (
    <div
      className={["fv-im-eq", "fv-im-eq--project", play ? "is-in" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" fill="none">
        <defs>
          <linearGradient id={`${clipId}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--fv-im-hit)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--fv-im-hit)" stopOpacity="0.02" />
          </linearGradient>
          <clipPath id={clipId}>
            <rect
              className="fv-im-eq__fan-reveal"
              x="0"
              y="0"
              width={W}
              height={H}
            />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <path className="fv-im-eq__fan" d={fan} fill={`url(#${clipId}-fill)`} />
          <path className="fv-im-eq__ghost" d={toLine(high)} />
          <path className="fv-im-eq__ghost fv-im-eq__ghost--low" d={toLine(low)} />
          <path className="fv-im-eq__line" d={toLine(base)} pathLength={1} />
        </g>
        {xs.map((x, i) => (
          <circle
            key={x}
            className={i === 4 ? "fv-im-eq__dot" : "fv-im-eq__tick-dot"}
            cx={x}
            cy={base[i]}
            r={2.2}
            style={{ "--fv-eq-i": i } as CSSProperties}
          />
        ))}
      </svg>
    </div>
  );
}

function ResearchPlate({ play }: { play: boolean }) {
  return (
    <div
      className={["fv-im-eq", "fv-im-eq--research", play ? "is-in" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <span className="fv-im-eq__orb" />
    </div>
  );
}

const GATE_DOTS = [
  { x: 14, y: 22 },
  { x: 18, y: 62 },
  { x: 32, y: 18 },
  { x: 38, y: 48 },
  { x: 42, y: 78 },
  { x: 56, y: 28, pass: true },
  { x: 64, y: 68 },
  { x: 78, y: 20 },
  { x: 84, y: 52 },
] as const;

function ValuePlate({ play }: { play: boolean }) {
  return (
    <div
      className={["fv-im-eq", "fv-im-eq--value", play ? "is-in" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      {GATE_DOTS.map((dot, i) => (
        <span
          key={i}
          className={[
            "fv-im-eq__gate-dot",
            "pass" in dot && dot.pass ? "is-pass" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={
            {
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              "--fv-scan": dot.x / 100,
            } as CSSProperties
          }
        />
      ))}
      <span className="fv-im-eq__scan" />
    </div>
  );
}
