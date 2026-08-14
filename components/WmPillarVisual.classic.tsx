"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

type DiagramProps = {
  className?: string;
};

export type PillarDiagramId = "plan" | "portfolio" | "world";

/** Previous pillar cards — restore via WM_PILLAR_VISUAL = "classic". */
export default function WmPillarVisualClassic({
  id,
  className,
}: {
  id: PillarDiagramId;
  className?: string;
}) {
  if (id === "portfolio") return <PortfolioDiagram className={className} />;
  if (id === "world") return <WorldDiagram className={className} />;
  return <PlanDiagram className={className} />;
}

function PlanDiagram({ className }: DiagramProps) {
  return <PlanFigures className={className} />;
}

const PLAN_COLS = [
  {
    delay: 0,
    values: [
      "$2,480,000",
      "$18,400",
      "$412,000",
      "$6,240",
      "$1,095,000",
      "$94,800",
      "$327,500",
      "$12,060",
      "$58,900",
      "$3,410,000",
      "$7,820",
    ],
  },
  {
    delay: 70,
    values: [
      "$54,200",
      "$8,760",
      "$210,000",
      "$1,640,000",
      "$22,900",
      "$7,180",
      "$445,000",
      "$31,250",
      "$9,180",
      "$672,000",
      "$4,350",
    ],
  },
  {
    delay: 130,
    values: [
      "$9,400",
      "$276,000",
      "$41,800",
      "$3,120",
      "$890,000",
      "$16,750",
      "$62,400",
      "$128,000",
      "$2,760",
      "$519,000",
      "$11,400",
    ],
  },
  {
    delay: 40,
    values: [
      "$14,200",
      "$508,000",
      "$2,040",
      "$73,600",
      "$1,280,000",
      "$19,900",
      "$4,860",
      "$236,000",
      "$81,200",
      "$5,940",
      "$1,020,000",
    ],
  },
];

function PlanFigures({ className }: DiagramProps) {
  const ref = useRef<HTMLDivElement | null>(null);
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
      { threshold: 0.5, rootMargin: "0px 0px -32% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "fv-wm__plan-wrap",
        className,
        inView ? "is-in" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      {PLAN_COLS.map((col, i) => (
        <div
          key={i}
          className="fv-wm__plan-col"
          style={{ "--fv-plan-delay": `${col.delay}ms` } as CSSProperties}
        >
          <div className="fv-wm__plan-track">
            {[...col.values, ...col.values].map((v, j) => (
              <span
                key={`${v}-${j}`}
                className={
                  j % 5 === 2
                    ? "fv-wm__plan-fig is-key"
                    : "fv-wm__plan-fig"
                }
                style={{ "--fv-plan-i": j } as CSSProperties}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function WorldDiagram({ className }: DiagramProps) {
  return <GridDiagram className={className} />;
}

function PortfolioDiagram({ className }: DiagramProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const clipId = useId().replace(/:/g, "");
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDrawn(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -32% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const W = 320;
  const H = 180;
  const pad = { l: 0, r: 0, t: 26, b: 0 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const n = 96;
  const pts: { x: number; y: number }[] = [];

  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = pad.l + t * plotW;
    const climb = pad.t + plotH * (0.86 - t * 0.72);
    const chop =
      Math.sin(t * 41.3) * 6.5 +
      Math.sin(t * 19.7 + 1.2) * 5 +
      Math.sin(t * 73.1 + 0.4) * 2.4;
    pts.push({ x, y: climb + chop * (0.45 + (1 - t) * 0.55) });
  }

  const line = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const last = pts[pts.length - 1];
  const area = `${line} L${last.x.toFixed(1)} ${H} L${pad.l} ${H} Z`;

  const labels = [
    { t: 0, text: "10Y" },
    { t: 0.5, text: "5Y" },
    { t: 0.85, text: "1Y" },
    { t: 1, text: "Today" },
  ];

  return (
    <div
      ref={ref}
      className={["fv-wm__portfolio-wrap", drawn ? "is-drawn" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <svg
        className={className}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <mask
            id={clipId}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={W}
            height={H}
          >
            <rect
              className="fv-wm__portfolio-reveal"
              x={0}
              y={0}
              width={W}
              height={H}
              fill="#fff"
            />
          </mask>
        </defs>
        <g mask={`url(#${clipId})`}>
          <path className="fv-wm__portfolio-fill" d={area} />
          <path
            className="fv-wm__portfolio-line"
            d={line}
            strokeLinejoin="round"
            strokeLinecap="butt"
          />
        </g>
        {labels.map((lab) => {
          const x = pad.l + lab.t * plotW;
          const anchor =
            lab.t === 0 ? "start" : lab.t === 1 ? "end" : "middle";
          return (
            <text
              key={lab.text}
              className="fv-wm__portfolio-label"
              x={lab.t === 0 ? 10 : lab.t === 1 ? W - 10 : x}
              y={16}
              textAnchor={anchor}
            >
              {lab.text}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function LineGrid() {
  const cols = 22;
  const rows = 16;
  const x0 = 0;
  const y0 = 0;
  const x1 = 300;
  const y1 = 200;
  const gw = (x1 - x0) / cols;
  const gh = (y1 - y0) / rows;

  return (
    <>
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line
          key={`v${i}`}
          x1={x0 + i * gw}
          y1={y0}
          x2={x0 + i * gw}
          y2={y1}
          stroke="#B8B8B2"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line
          key={`h${i}`}
          x1={x0}
          y1={y0 + i * gh}
          x2={x1}
          y2={y0 + i * gh}
          stroke="#B8B8B2"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </>
  );
}

function GridDiagram({ className }: DiagramProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 300 200"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <LineGrid />
    </svg>
  );
}
