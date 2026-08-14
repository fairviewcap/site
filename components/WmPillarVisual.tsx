"use client";

import { useEffect, useRef, useState } from "react";

type DiagramProps = {
  className?: string;
};

export type PillarDiagramId = "plan" | "portfolio" | "world";

/** Pick the right pillar visual — keeps client lookups off the server page. */
export default function WmPillarVisual({
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
  return <GridDiagram className={className} />;
}

function WorldDiagram({ className }: DiagramProps) {
  return <GridDiagram className={className} />;
}

/**
 * Live market line — short-term volatility, long-term climb.
 * Draws once on scroll into view (3.5s ease-out).
 */
function PortfolioDiagram({ className }: DiagramProps) {
  const ref = useRef<HTMLDivElement | null>(null);
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
      { threshold: 0.35 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const line =
    "M0 176 " +
    "L4 174 L8 171 L12 173 L16 168 L20 170 L24 165 L28 167 L32 160 " +
    "L36 163 L40 158 L44 161 L48 152 L52 156 L56 149 L60 153 L64 145 " +
    "L68 148 L72 142 L76 146 L80 138 L84 141 L88 134 L92 139 L96 131 " +
    "L100 135 L104 128 L108 133 L112 124 L116 129 L120 120 L124 126 " +
    "L128 118 L132 123 L136 114 L140 119 L144 110 L148 116 L152 106 " +
    "L156 112 L160 102 L164 108 L168 98 L172 104 L176 94 L180 99 " +
    "L184 90 L188 96 L192 86 L196 92 L200 82 L204 88 L208 78 L212 84 " +
    "L216 74 L220 80 L224 70 L228 76 L232 66 L236 72 L240 62 L244 68 " +
    "L248 58 L252 64 L256 54 L260 60 L264 50 L268 56 L272 46 L276 52 " +
    "L280 42 L284 48 L288 38 L292 44 L296 34 L300 28";

  return (
    <div
      ref={ref}
      className={["fv-wm__portfolio-wrap", drawn ? "is-drawn" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <svg
        className={className}
        viewBox="0 0 300 200"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <LineGrid />
        <path
          className="fv-wm__portfolio-line"
          d={line}
          pathLength={1}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <span className="fv-wm__portfolio-fig">FIG 2.4</span>
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
