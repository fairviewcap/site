"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

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
  { label: "Rev", value: "$4.2B" },
  { label: "EBIT", value: "18%" },
  { label: "FCF", value: "$612M" },
] as const;

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
      <span className="fv-im-eq__ticker">XYZ</span>
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
    </div>
  );
}

function ProjectPlate() {
  const { ref, inView } = useOnceInView<HTMLDivElement>();

  const W = 240;
  const H = 240;
  const xs = [24, 70, 120, 170, 216];
  const base = [168, 148, 122, 98, 72];
  const alt = [168, 156, 142, 128, 112];

  const toPath = (ys: number[]) =>
    ys
      .map((y, i) => `${i === 0 ? "M" : "L"}${xs[i]} ${y}`)
      .join(" ");

  return (
    <div
      ref={ref}
      className={["fv-im-eq", "fv-im-eq--project", inView ? "is-in" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <line
          className="fv-im-eq__axis"
          x1={16}
          y1={196}
          x2={224}
          y2={196}
        />
        {xs.map((x, i) => (
          <g key={x}>
            <line className="fv-im-eq__tick" x1={x} y1={192} x2={x} y2={200} />
            <text className="fv-im-eq__yr" x={x} y={222} textAnchor="middle">
              Y{i + 1}
            </text>
          </g>
        ))}
        <path className="fv-im-eq__ghost" d={toPath(alt)} />
        <path
          className="fv-im-eq__line"
          d={toPath(base)}
          pathLength={1}
        />
        <circle className="fv-im-eq__dot" cx={xs[4]} cy={base[4]} r={3} />
      </svg>
    </div>
  );
}

function ResearchPlate() {
  const { ref, inView } = useOnceInView<HTMLDivElement>();
  const rows = ["Management", "Experts", "Analysts"] as const;

  return (
    <div
      ref={ref}
      className={["fv-im-eq", "fv-im-eq--research", inView ? "is-in" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <ul className="fv-im-eq__meet">
        {rows.map((label, i) => (
          <li
            key={label}
            className="fv-im-eq__meet-row"
            style={{ "--fv-eq-i": i } as CSSProperties}
          >
            <span className="fv-im-eq__meet-lab">{label}</span>
            <span className="fv-im-eq__meet-rule" />
          </li>
        ))}
      </ul>
      <span className="fv-im-eq__meet-dot" />
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
      <span
        className="fv-im-eq__val-lab"
        style={{ "--fv-eq-i": 0 } as CSSProperties}
      >
        Price
      </span>
      <span
        className="fv-im-eq__val-num fv-nums"
        style={{ "--fv-eq-i": 1 } as CSSProperties}
      >
        84
      </span>
      <span className="fv-im-eq__val-rule" />
      <span
        className="fv-im-eq__val-lab"
        style={{ "--fv-eq-i": 2 } as CSSProperties}
      >
        FCF
      </span>
      <span
        className="fv-im-eq__val-num fv-im-eq__val-num--key fv-nums"
        style={{ "--fv-eq-i": 3 } as CSSProperties}
      >
        112
      </span>
    </div>
  );
}
