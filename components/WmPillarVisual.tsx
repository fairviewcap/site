"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import WmPillarVisualClassic, {
  type PillarDiagramId as ClassicId,
} from "@/components/WmPillarVisual.classic";

export type PillarDiagramId = ClassicId;

/**
 * Flip to `"classic"` to restore the previous Plan / Portfolio / World cards.
 */
export const WM_PILLAR_VISUAL: "proto" | "classic" = "proto";

type DiagramProps = {
  className?: string;
};

export default function WmPillarVisual({
  id,
  className,
}: {
  id: PillarDiagramId;
  className?: string;
}) {
  if (WM_PILLAR_VISUAL === "classic") {
    return <WmPillarVisualClassic id={id} className={className} />;
  }
  if (id === "portfolio") return <PortfolioProto className={className} />;
  if (id === "world") return <WorldProto className={className} />;
  return <PlanProto className={className} />;
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
      { threshold: 0.5, rootMargin: "0px 0px -32% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

const PLAN_HERO = { label: "Own", value: 8_240_000 };
const PLAN_REST = [
  { label: "Owe", value: 412_000 },
  { label: "In", value: 31_250 },
  { label: "Leave", value: 1_020_000 },
] as const;

const PLAN_COUNT_MS = 1400;

const usd0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function PlanProto({ className }: DiagramProps) {
  const { ref, inView } = useOnceInView<HTMLDivElement>();
  const [shown, setShown] = useState(0);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(PLAN_HERO.value);
      setSettled(true);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / PLAN_COUNT_MS);
      const eased = 1 - (1 - t) ** 3;
      setShown(Math.round(PLAN_HERO.value * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      setShown(PLAN_HERO.value);
      setSettled(true);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={[
        "fv-wm__plan2",
        className,
        inView ? "is-in" : "",
        settled ? "is-settled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden
    >
      <span className="fv-wm__plan2-kicker">{PLAN_HERO.label}</span>
      <p className="fv-wm__plan2-hero">{usd0.format(shown)}</p>
      <ul className="fv-wm__plan2-rest">
        {PLAN_REST.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>
            <strong>{usd0.format(item.value)}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PortfolioProto({ className }: DiagramProps) {
  const { ref, inView } = useOnceInView<HTMLDivElement>();
  const clipId = useId().replace(/:/g, "");
  const fillId = `${clipId}-fill`;

  const W = 320;
  const H = 180;
  const pad = { l: 0, r: 0, t: 28, b: 0 };
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
      className={["fv-wm__port2", inView ? "is-drawn" : ""]
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
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--fv-wm-accent)"
              stopOpacity="0.34"
            />
            <stop
              offset="38%"
              stopColor="var(--fv-wm-accent)"
              stopOpacity="0.1"
            />
            <stop
              offset="100%"
              stopColor="var(--fv-wm-accent)"
              stopOpacity="0"
            />
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
              className="fv-wm__port2-fill-reveal"
              x={0}
              y={0}
              width={W}
              height={H}
              fill="#fff"
            />
          </mask>
        </defs>
        <g mask={`url(#${clipId})`}>
          <path className="fv-wm__port2-fill" d={area} fill={`url(#${fillId})`} />
          <path
            className="fv-wm__port2-line"
            d={line}
            strokeLinejoin="round"
            strokeLinecap="butt"
          />
        </g>
        <circle
          className="fv-wm__port2-dot"
          cx={Math.min(last.x, W - 4)}
          cy={last.y}
          r={2.4}
        />
        {labels.map((lab) => {
          const x = pad.l + lab.t * plotW;
          const anchor =
            lab.t === 0 ? "start" : lab.t === 1 ? "end" : "middle";
          return (
            <text
              key={lab.text}
              className={
                lab.t === 1
                  ? "fv-wm__port2-label is-now"
                  : "fv-wm__port2-label"
              }
              x={lab.t === 0 ? 10 : lab.t === 1 ? W - 10 : x}
              y={16}
              textAnchor={anchor}
              style={{ "--fv-port-t": lab.t } as CSSProperties}
            >
              {lab.text}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function WorldProto({ className }: DiagramProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = ref.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const greens = [
      "#b7c4b8",
      "#9aab9b",
      "#7a8b7b",
      "#657766",
      "#516252",
      "#3e4e3f",
    ];
    const n = 6;
    const cols = 12;
    const rows = 7;
    const dropX = [0.22, 0.78, 0.28, 0.72, 0.34, 0.66];

    type Ball = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      fill: string;
      state: "wait" | "fall" | "home" | "seated";
    };

    let w = 0;
    let h = 0;
    let r = 0;
    let padW = 0;
    let padH = 0;
    let paddleX = 0;
    let balls: Ball[] = [];
    let started = reduced;
    let done = reduced;
    let raf = 0;
    let last = 0;
    let visible = false;

    const pageVisible = () => document.visibilityState === "visible";

    const restOf = (i: number) => ({
      x: ((i + 3.5) / cols) * w,
      y: h / 2,
    });

    const paddleY = () => h - padH * 0.5 - 5;

    const spawn = (i: number) => {
      const b = balls[i];
      if (!b || b.state !== "wait") return;
      b.x = dropX[i]! * w;
      b.y = -r;
      b.vx = 0;
      b.vy = 80;
      b.state = "fall";
    };

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const prevW = w;
      const prevH = h;
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      r = Math.min(w, h) * 0.034;
      padW = Math.max(42, w * 0.22);
      padH = Math.max(7, r * 0.72);
      if (balls.length === 0) {
        balls = greens.map((fill) => ({
          x: 0,
          y: -40,
          vx: 0,
          vy: 0,
          fill,
          state: "wait" as const,
        }));
        paddleX = w / 2;
      } else if (prevW > 0 && prevH > 0) {
        const sx = w / prevW;
        const sy = h / prevH;
        paddleX *= sx;
        for (const b of balls) {
          b.x *= sx;
          b.y *= sy;
        }
      }
      if (done || reduced) {
        balls.forEach((b, i) => {
          const rest = restOf(i);
          b.x = rest.x;
          b.y = rest.y;
          b.vx = 0;
          b.vy = 0;
          b.state = "seated";
        });
        paddleX = w / 2;
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = "#c5c5bf";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols) * w;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let j = 0; j <= rows; j++) {
        const y = (j / rows) * h;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    };

    const drawPaddle = () => {
      const y = paddleY();
      const x = paddleX;
      const hw = padW / 2;
      const hh = padH / 2;
      ctx.beginPath();
      ctx.roundRect(x - hw, y - hh, padW, padH, hh);
      ctx.fillStyle = "#7a8b7b";
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      drawGrid();
      for (const b of balls) {
        if (b.state === "wait") continue;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = b.fill;
        ctx.fill();
      }
      drawPaddle();
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;

      if (visible) started = true;

      if (reduced) {
        done = true;
        draw();
        return;
      }

      if (!started || done || !visible || !pageVisible()) {
        draw();
        if (done) return;
        last = 0;
        return;
      }

      if (balls.every((b) => b.state === "wait")) spawn(0);

      const falling = balls.find((b) => b.state === "fall");
      const nextWait = balls.findIndex((b) => b.state === "wait");
      const aim = falling
        ? falling.x
        : nextWait >= 0
          ? dropX[nextWait]! * w
          : w / 2;
      const maxX = w - padW / 2 - 4;
      const minX = padW / 2 + 4;
      const target = Math.max(minX, Math.min(maxX, aim));
      paddleX += (target - paddleX) * Math.min(1, (falling ? 16 : 10) * dt);

      const py = paddleY();
      const half = padW / 2;
      const omega = 15.8;
      const zeta = 0.82;
      const stiff = omega * omega;
      const damp = 2 * zeta * omega;

      balls.forEach((b, i) => {
        if (b.state === "fall") {
          b.vy += 1680 * dt;
          b.vy = Math.min(b.vy, 640);
          b.y += b.vy * dt;
          b.x += b.vx * dt;

          const hit =
            b.vy > 0 &&
            b.y + r >= py - padH / 2 &&
            b.y + r <= py + padH / 2 + r * 1.4 &&
            b.x >= paddleX - half - r * 0.25 &&
            b.x <= paddleX + half + r * 0.25;

          if (hit) {
            const rest = restOf(i);
            b.state = "home";
            b.y = py - padH / 2 - r;
            b.vy = -260;
            b.vx = (rest.x - b.x) * 2.8;
            const nxt = balls.findIndex((x) => x.state === "wait");
            if (nxt >= 0) spawn(nxt);
          } else if (b.y - r > h + 20) {
            b.state = "wait";
            spawn(i);
          }
        } else if (b.state === "home") {
          const rest = restOf(i);
          b.vx += ((rest.x - b.x) * stiff - b.vx * damp) * dt;
          b.vy += ((rest.y - b.y) * stiff - b.vy * damp) * dt;
          b.x += b.vx * dt;
          b.y += b.vy * dt;
          const dist = Math.hypot(rest.x - b.x, rest.y - b.y);
          const spd = Math.hypot(b.vx, b.vy);
          if (dist < 0.85 && spd < 18) {
            b.x = rest.x;
            b.y = rest.y;
            b.vx = 0;
            b.vy = 0;
            b.state = "seated";
          }
        }
      });

      if (balls.every((b) => b.state === "seated")) done = true;

      draw();
      if (done) return;
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (raf || done) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        kick();
      },
      { threshold: 0.5, rootMargin: "0px 0px -32% 0px" },
    );
    io.observe(wrap);
    document.addEventListener("visibilitychange", kick);

    size();
    const ro = new ResizeObserver(() => {
      size();
      draw();
    });
    ro.observe(wrap);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", kick);
    };
  }, []);

  return (
    <div ref={ref} className="fv-wm__world2" aria-hidden>
      <canvas ref={canvasRef} className={className} />
    </div>
  );
}
