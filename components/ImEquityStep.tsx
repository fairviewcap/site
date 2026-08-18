"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

export type EquityStepId = "assess" | "project" | "research" | "value";

export default function ImEquityStep({ id }: { id: EquityStepId }) {
  if (id === "project") return <ProjectPlate />;
  if (id === "research") return <ResearchPlate />;
  if (id === "value") return <ValuePlate />;
  return <AssessPlate />;
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
      { threshold: 0.35, rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

const ASSESS_FIGS = [
  { label: "Revenue", value: "$4.2B" },
  { label: "EBIT", value: "18%" },
  { label: "FCF", value: "$612M" },
] as const;

const ASSESS_QUALITY = ["Moat", "Mgmt", "Markets"] as const;

function AssessPlate() {
  const { ref, inView } = useOnceInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={["fv-im-eq", "fv-im-eq--assess", inView ? "is-in" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <p className="fv-im-eq__note">Research note</p>
      <ul className="fv-im-eq__figs">
        {ASSESS_FIGS.map((fig, i) => (
          <li
            key={fig.label}
            className="fv-im-eq__fig"
            style={{ "--fv-eq-i": i } as CSSProperties}
          >
            <span className="fv-im-eq__fig-lab">{fig.label}</span>
            <span className="fv-im-eq__fig-val fv-nums">{fig.value}</span>
          </li>
        ))}
      </ul>
      <ul className="fv-im-eq__qual">
        {ASSESS_QUALITY.map((item, i) => (
          <li
            key={item}
            className="fv-im-eq__qual-item"
            style={{ "--fv-eq-i": i + 3 } as CSSProperties}
          >
            <span className="fv-im-eq__qual-mark" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectPlate() {
  const { ref, inView } = useOnceInView<HTMLDivElement>();
  const clipId = useId().replace(/:/g, "");

  const W = 320;
  const H = 180;
  const pad = { l: 18, r: 14, t: 16, b: 28 };
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
      ref={ref}
      className={["fv-im-eq", "fv-im-eq--project", inView ? "is-in" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id={`${clipId}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--fv-green)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--fv-green)" stopOpacity="0.04" />
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
        {xs.map((x, i) => (
          <g key={x}>
            <line
              className="fv-im-eq__tick"
              x1={x}
              y1={H - pad.b}
              x2={x}
              y2={H - pad.b + 4}
            />
            <text
              className="fv-im-eq__yr"
              x={x}
              y={H - 8}
              textAnchor="middle"
            >
              Y{i + 1}
            </text>
          </g>
        ))}
        <line
          className="fv-im-eq__axis"
          x1={pad.l}
          y1={H - pad.b}
          x2={W - pad.r}
          y2={H - pad.b}
        />
        <g clipPath={`url(#${clipId})`}>
          <path className="fv-im-eq__fan" d={fan} fill={`url(#${clipId}-fill)`} />
          <path className="fv-im-eq__ghost" d={toLine(high)} />
          <path className="fv-im-eq__ghost fv-im-eq__ghost--low" d={toLine(low)} />
          <path className="fv-im-eq__line" d={toLine(base)} pathLength={1} />
        </g>
        <circle
          className="fv-im-eq__dot"
          cx={xs[4]}
          cy={base[4]}
          r={2.6}
        />
      </svg>
    </div>
  );
}

const RESEARCH_LOG = [
  { when: "12 Mar", who: "Management" },
  { when: "04 Apr", who: "Industry expert" },
  { when: "21 Apr", who: "Sell-side" },
] as const;

function ResearchPlate() {
  const { ref, inView } = useOnceInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={["fv-im-eq", "fv-im-eq--research", inView ? "is-in" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <p className="fv-im-eq__note">Work log</p>
      <ul className="fv-im-eq__log">
        {RESEARCH_LOG.map((row, i) => (
          <li
            key={row.who}
            className="fv-im-eq__log-row"
            style={{ "--fv-eq-i": i } as CSSProperties}
          >
            <span className="fv-im-eq__log-when fv-nums">{row.when}</span>
            <span className="fv-im-eq__log-who">{row.who}</span>
            <span className="fv-im-eq__log-mark" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ValuePlate() {
  const { ref, inView } = useOnceInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={["fv-im-eq", "fv-im-eq--value", inView ? "is-in" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <div
        className="fv-im-eq__scale-row"
        style={{ "--fv-eq-i": 0 } as CSSProperties}
      >
        <span className="fv-im-eq__val-lab">Price</span>
        <span className="fv-im-eq__scale">
          <span className="fv-im-eq__scale-fill fv-im-eq__scale-fill--price" />
        </span>
        <span className="fv-im-eq__val-num fv-nums">84</span>
      </div>
      <div
        className="fv-im-eq__scale-row"
        style={{ "--fv-eq-i": 1 } as CSSProperties}
      >
        <span className="fv-im-eq__val-lab">Worth</span>
        <span className="fv-im-eq__scale">
          <span className="fv-im-eq__scale-fill fv-im-eq__scale-fill--worth" />
        </span>
        <span className="fv-im-eq__val-num fv-im-eq__val-num--key fv-nums">
          112
        </span>
      </div>
      <p className="fv-im-eq__wait">Wait</p>
    </div>
  );
}
