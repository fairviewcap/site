"use client";

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const BOOK = 5;
const KEEP = 25;
const GAP = 16;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Stable scatter — random-looking, same points after resize. */
const SCATTER = (() => {
  const rng = mulberry32(1995);
  const pts: { u: number; v: number }[] = [];
  let guard = 0;
  while (pts.length < KEEP && guard < 800) {
    guard += 1;
    const u = 0.06 + rng() * 0.88;
    const v = 0.08 + rng() * 0.84;
    if (pts.some((p) => Math.hypot(p.u - u, p.v - v) < 0.1)) continue;
    pts.push({ u, v });
  }
  while (pts.length < KEEP) pts.push({ u: rng(), v: rng() });
  return pts;
})();

type KeepDot = {
  i: number;
  fx: number;
  fy: number;
  bx: number;
  by: number;
  din: number;
  dout: number;
};

function nearestFree(
  pts: { x: number; y: number; used?: boolean }[],
  x: number,
  y: number,
) {
  let best = -1;
  let bestD = Infinity;
  for (let i = 0; i < pts.length; i++) {
    if (pts[i].used) continue;
    const dist = (pts[i].x - x) ** 2 + (pts[i].y - y) ** 2;
    if (dist < bestD) {
      bestD = dist;
      best = i;
    }
  }
  return best;
}

/** Field intersections; 25 scattered cells gather into a 5×5. */
function layoutKeepers(w: number, h: number): KeepDot[] {
  const cx = w / 2;
  const cy = h / 2;
  const pts: { x: number; y: number; used?: boolean }[] = [];
  const c0 = -Math.floor(cx / GAP);
  const c1 = Math.floor((w - cx) / GAP);
  const r0 = -Math.floor(cy / GAP);
  const r1 = Math.floor((h - cy) / GAP);
  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      pts.push({ x: cx + c * GAP, y: cy + r * GAP });
    }
  }

  const bookGap = Math.min(42, Math.max(26, Math.min(w * 0.052, h * 0.145)));
  const b0x = cx - ((BOOK - 1) * bookGap) / 2;
  const b0y = cy - ((BOOK - 1) * bookGap) / 2;
  const keepers: KeepDot[] = [];

  SCATTER.forEach((spot, n) => {
    const i = nearestFree(pts, spot.u * w, spot.v * h);
    if (i < 0) return;
    pts[i].used = true;
    const bc = n % BOOK;
    const br = Math.floor(n / BOOK);
    const dist = Math.hypot(pts[i].x - cx, pts[i].y - cy);
    keepers.push({
      i: n,
      fx: pts[i].x,
      fy: pts[i].y,
      bx: b0x + bc * bookGap,
      by: b0y + br * bookGap,
      din: 90 + dist * 0.32,
      dout: dist * 0.12,
    });
  });

  return keepers;
}

/**
 * Our book vs a typical book — 25 named companies, gathered from the field.
 */
export default function WhyKnowDots() {
  const id = useId();
  const planeRef = useRef<HTMLDivElement>(null);
  const [ours, setOurs] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [dots, setDots] = useState<KeepDot[]>([]);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMq = () => setReduced(mq.matches);
    applyMq();
    mq.addEventListener("change", applyMq);

    const plane = planeRef.current;
    if (!plane) return;

    const measure = () => {
      const { width, height } = plane.getBoundingClientRect();
      if (width < 8 || height < 8) return;
      setDots(layoutKeepers(width, height));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(plane);
    return () => {
      mq.removeEventListener("change", applyMq);
      ro.disconnect();
    };
  }, []);

  return (
    <figure
      className={[
        "fv-why-know",
        ours ? "is-ours" : "is-theirs",
        reduced ? "is-static" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="fv-why-know__bar"
        role="tablist"
        aria-label="Which book"
      >
        <div className="fv-why-know__pill">
          <span className="fv-why-know__chip" aria-hidden />
          <button
            type="button"
            id={`${id}-ours`}
            role="tab"
            aria-selected={ours}
            className={ours ? "fv-why-know__opt is-on" : "fv-why-know__opt"}
            onClick={() => setOurs(true)}
          >
            Fairview
          </button>
          <button
            type="button"
            id={`${id}-theirs`}
            role="tab"
            aria-selected={!ours}
            className={ours ? "fv-why-know__opt" : "fv-why-know__opt is-on"}
            onClick={() => setOurs(false)}
          >
            A typical book
          </button>
        </div>
      </div>

      <div ref={planeRef} className="fv-why-know__plane" aria-hidden>
        <div className="fv-why-know__mass" />
        {dots.map((d) => {
          const style = {
            "--x": ours ? d.bx : d.fx,
            "--y": ours ? d.by : d.fy,
            "--s": ours ? 1 : 0.28,
            "--d-in": `${reduced ? 0 : d.din}ms`,
            "--d-out": `${reduced ? 0 : d.dout}ms`,
          } as CSSProperties;

          return (
            <span key={d.i} className="fv-why-know__dot is-keep" style={style} />
          );
        })}
      </div>

      <figcaption className="fv-why-know__cap" aria-live="polite">
        {ours ? (
          <>
            <span className="fv-nums">25–30</span> companies
          </>
        ) : (
          <>Other people&apos;s funds</>
        )}
      </figcaption>
    </figure>
  );
}
