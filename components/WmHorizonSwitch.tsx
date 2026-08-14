"use client";

import { useEffect, useId, useRef, useState } from "react";

const HEIGHT = 280;
const BALL_R = 8;
const RED = "#ef4444";
const LOGO_GREEN = "#0d905a";
const SPEED = 1.35;

function mixHex(a: string, b: string, t: number) {
  const n = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [ar, ag, ab] = n(a);
  const [br, bg, bb] = n(b);
  const u = Math.max(0, Math.min(1, t));
  const ch = (x: number, y: number) => Math.round(x + (y - x) * u);
  return `rgb(${ch(ar, br)}, ${ch(ag, bg)}, ${ch(ab, bb)})`;
}

/** Terrain in world space — same lock as the grid (world = screenX + time). */
function terrainY(worldX: number, centerY: number, amp: number) {
  if (amp < 0.001) return centerY;
  const w = worldX;
  return (
    centerY +
    (Math.sin(w * 0.011) * 22 +
      Math.sin(w * 0.019 + 1.7) * 16 +
      Math.sin(w * 0.033 + 0.4) * 11 +
      Math.sin(w * 0.057 + 2.1) * 7 +
      Math.sin(w * 0.091 + 4.2) * 4 +
      Math.sin(w * 0.007 + 0.9) * 10) *
      amp
  );
}

function pathAt(screenX: number, time: number, centerY: number, amp: number) {
  const y = terrainY(screenX + time, centerY, amp);
  const yL = terrainY(screenX + time - 1, centerY, amp);
  const yR = terrainY(screenX + time + 1, centerY, amp);
  const slope = (yR - yL) / 2;
  const len = Math.hypot(1, slope);
  return {
    y,
    slope,
    nx: slope / len,
    ny: -1 / len,
  };
}

function withAlpha(color: string, a: number) {
  if (color.startsWith("#") && color.length >= 7) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  const m = color.match(/\d+/g);
  if (m && m.length >= 3) {
    return `rgba(${m[0]}, ${m[1]}, ${m[2]}, ${a})`;
  }
  return color;
}

function readColor(el: HTMLElement, name: string, fallback: string) {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  return v || fallback;
}

function PlayGlyph() {
  return (
    <svg className="fv-wm-horizon-sw__glyph" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M8.15 5.05c0-.92.97-1.52 1.77-1.08l10.05 5.5a1.25 1.25 0 0 1 0 2.16l-10.05 5.5c-.8.44-1.77-.16-1.77-1.08V5.05z"
      />
    </svg>
  );
}

function PauseGlyph() {
  return (
    <svg className="fv-wm-horizon-sw__glyph" viewBox="0 0 24 24" aria-hidden>
      <rect x="6.2" y="5" width="4" height="14" rx="1.6" fill="currentColor" />
      <rect x="13.8" y="5" width="4" height="14" rx="1.6" fill="currentColor" />
    </svg>
  );
}
export default function WmHorizonSwitch() {
  const id = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onRef = useRef(false);
  const ampRef = useRef(1);
  const inViewRef = useRef(true);
  const pausedRef = useRef(false);
  const [on, setOn] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    onRef.current = on;
  }, [on]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mq.matches;
    if (reduced) {
      pausedRef.current = true;
      setPlaying(false);
    }
    let raf = 0;
    let time = 0;
    let rotation = 0;
    let last = performance.now();
    let ampVel = 0;
    let followX = 0;
    let followY = 0;
    let followVx = 0;
    let followVy = 0;
    let seeded = false;

    const size = () => {
      const w = root.clientWidth || 800;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(HEIGHT * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${HEIGHT}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return w;
    };

    let width = size();
    const ro = new ResizeObserver(() => {
      width = size();
    });
    ro.observe(root);

    const draw = (now: number) => {
      const dt = Math.min(32, now - last) / 16.67;
      last = now;

      const bg = readColor(root, "--fv-bg", "#f2f1ef");
      const fg = readColor(root, "--fv-fg", "#141414");
      const target = onRef.current ? 0 : 1;
      if (reduced) {
        ampRef.current = target;
        ampVel = 0;
      } else {
        ampVel += (target - ampRef.current) * 0.11 * dt;
        ampVel *= Math.pow(0.84, dt);
        ampRef.current += ampVel * dt;
        if (ampRef.current < 0) {
          ampRef.current = 0;
          ampVel = 0;
        } else if (ampRef.current > 1) {
          ampRef.current = 1;
          ampVel = 0;
        }
      }
      const amp = ampRef.current;
      const tone = mixHex(LOGO_GREEN, RED, amp);

      if (!reduced && inViewRef.current && !pausedRef.current) {
        time += SPEED * dt;
      }

      const path = pathAt(width / 2, time, HEIGHT / 2, amp);
      const targetX = width / 2 + path.nx * BALL_R;
      const targetY = path.y + path.ny * BALL_R;
      if (!seeded) {
        followX = targetX;
        followY = targetY;
        seeded = true;
      }
      if (reduced) {
        followX = targetX;
        followY = targetY;
        followVx = 0;
        followVy = 0;
      } else {
        followVx += (targetX - followX) * 0.16 * dt;
        followVy += (targetY - followY) * 0.16 * dt;
        followVx *= Math.pow(0.78, dt);
        followVy *= Math.pow(0.78, dt);
        followX += followVx * dt;
        followY += followVy * dt;
      }

      if (!reduced && inViewRef.current && !pausedRef.current) {
        rotation += (SPEED * Math.hypot(1, path.slope) * dt) / BALL_R;
      }

      ctx.clearRect(0, 0, width, HEIGHT);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, HEIGHT);

      const centerX = width / 2;
      const centerY = HEIGHT / 2;
      const grid = 40;
      const firstCol = Math.floor(time / grid) - 1;
      const lastCol = Math.ceil((width + time) / grid) + 1;

      ctx.strokeStyle = fg;
      ctx.globalAlpha = 0.07;
      ctx.lineWidth = 1;
      for (let col = firstCol; col <= lastCol; col++) {
        const sx = col * grid - time;
        ctx.beginPath();
        ctx.moveTo(sx, 0);
        ctx.lineTo(sx, HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < HEIGHT; y += grid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.setLineDash([]);
      ctx.strokeStyle = tone;
      for (let x = 0; x <= width; x += 2) {
        const y = terrainY(x + time, centerY, amp);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.save();
      ctx.translate(followX, followY + BALL_R * 0.35);
      ctx.scale(1.15, 0.45);
      ctx.beginPath();
      ctx.arc(0, 0, BALL_R, 0, Math.PI * 2);
      ctx.fillStyle = withAlpha(fg, 0.1);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(followX, followY);

      ctx.beginPath();
      ctx.arc(0, 0, BALL_R, 0, Math.PI * 2);
      ctx.fillStyle = tone;
      ctx.fill();

      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -BALL_R + 1.6);
      ctx.lineTo(0, -1.2);
      ctx.strokeStyle = bg;
      ctx.lineWidth = 1.35;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();

      const fade = ctx.createLinearGradient(0, 0, width, 0);
      fade.addColorStop(0, bg);
      fade.addColorStop(0.055, withAlpha(bg, 0));
      fade.addColorStop(0.945, withAlpha(bg, 0));
      fade.addColorStop(1, bg);
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, width, HEIGHT);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="fv-wm-horizon-sw">
      <div className="fv-wm-horizon-sw__bar">
        <label className="fv-wm-horizon-sw__label" htmlFor={id}>
          Fairview guidance
        </label>
        <button
          type="button"
          id={id}
          className={
            on
              ? "fv-wm-horizon-sw__switch is-on"
              : "fv-wm-horizon-sw__switch"
          }
          role="switch"
          aria-checked={on}
          aria-label="Fairview guidance"
          onClick={() => setOn((v) => !v)}
        >
          <span className="fv-wm-horizon-sw__knob" />
        </button>
        <button
          type="button"
          className={
            playing
              ? "fv-wm-horizon-sw__play is-playing"
              : "fv-wm-horizon-sw__play"
          }
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => {
            pausedRef.current = playing;
            setPlaying((p) => !p);
          }}
        >
          <span className="fv-wm-horizon-sw__play-icon" aria-hidden>
            {playing ? <PauseGlyph /> : <PlayGlyph />}
          </span>
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="fv-wm-horizon-sw__canvas"
        aria-hidden
      />
    </div>
  );
}
