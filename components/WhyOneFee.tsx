"use client";

import { useEffect, useId, useRef, useState } from "react";

const PARAS = [
  "We charge one fee based on the assets we manage for you. No commissions for steering you into specific investments, no shareholders asking why margins weren't higher this quarter.",
  "That's not corporate altruism—it's simple arithmetic. When the people managing your money own the firm, they don't need to squeeze the client to hit a quarterly target.",
  "It also means the advisor who builds your portfolio today is often the same one reviewing it with your kids fifteen years from now — and that your whole family's assets sit under one fee, not billed account by account like six separate relationships.",
] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

const PEBBLE_RESTS = [-60, -20, 20, 60] as const;
const PEBBLE_HUES = ["clay", "slate", "ochre", "wine"] as const;

const PEBBLE_PHYS = [
  { mass: 1.18, e: 0.42, mu: 0.155, drive: 0.46 },
  { mass: 0.98, e: 0.58, mu: 0.11, drive: 0.76 },
  { mass: 0.8, e: 0.74, mu: 0.068, drive: 1.12 },
  { mass: 0.64, e: 0.9, mu: 0.038, drive: 1.58 },
] as const;

const GREEN_MASS = 14;
const PEBBLE_PEBBLE_E = 0.28;
const ROLL_G = 1650;

function stepSpring(
  pos: number,
  vel: number,
  target: number,
  dt: number,
  omega = 7.2,
  zeta = 1.18,
) {
  const accel = omega * omega * (target - pos) - 2 * zeta * omega * vel;
  const nextVel = vel + accel * dt;
  return { pos: pos + nextVel * dt, vel: nextVel };
}

const GLOBE_TILT = 0.34;
const GLOBE_MERIDIANS = 12;
const GLOBE_PARALLELS = 5;
const GLOBE_STEPS = 48;

type Vec3 = { x: number; y: number; z: number };

function rotX(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}

function rotZ(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c, z: p.z };
}

function projectGlobe(lon: number, lat: number, roll: number): Vec3 {
  const cl = Math.cos(lat);
  return rotZ(
    rotX(
      {
        x: cl * Math.sin(lon),
        y: Math.sin(lat),
        z: cl * Math.cos(lon),
      },
      GLOBE_TILT,
    ),
    roll,
  );
}

function globeCurve(
  samples: { lon: number; lat: number }[],
  roll: number,
) {
  let d = "";
  let drawing = false;
  for (const s of samples) {
    const p = projectGlobe(s.lon, s.lat, roll);
    if (p.z < 0) {
      drawing = false;
      continue;
    }
    d += `${drawing ? "L" : "M"}${p.x.toFixed(3)} ${p.y.toFixed(3)}`;
    drawing = true;
  }
  return d;
}

function globeGrid(roll: number) {
  let meridians = "";
  let parallels = "";
  for (let i = 0; i < GLOBE_MERIDIANS; i++) {
    const lon = (i / GLOBE_MERIDIANS) * Math.PI * 2;
    const samples = Array.from({ length: GLOBE_STEPS + 1 }, (_, s) => ({
      lon,
      lat: -Math.PI / 2 + (s / GLOBE_STEPS) * Math.PI,
    }));
    meridians += globeCurve(samples, roll);
  }
  for (let i = 1; i <= GLOBE_PARALLELS; i++) {
    const lat = -Math.PI / 2 + (i / (GLOBE_PARALLELS + 1)) * Math.PI;
    const samples = Array.from({ length: GLOBE_STEPS + 1 }, (_, s) => ({
      lon: (s / GLOBE_STEPS) * Math.PI * 2,
      lat,
    }));
    parallels += globeCurve(samples, roll);
  }
  return { meridians, parallels };
}

/**
 * One fee. Zero conflicts. — sage sphere rolls in from the card edge.
 */
export default function WhyOneFee() {
  const pinRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLSpanElement>(null);
  const rotRef = useRef<HTMLSpanElement>(null);
  const meridiansRef = useRef<SVGPathElement>(null);
  const parallelsRef = useRef<SVGPathElement>(null);
  const shadowRef = useRef<HTMLSpanElement>(null);
  const pitRef = useRef<HTMLDivElement>(null);
  const floorPat = useId().replace(/:/g, "");
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const ball = ballRef.current;
    const meridians = meridiansRef.current;
    const parallels = parallelsRef.current;
    const shadow = shadowRef.current;
    const pin = pinRef.current;
    const card = cardRef.current;
    if (!ball || !meridians || !parallels || !pin || !card) return;

    const pit = pitRef.current;
    const pebbles = pit
      ? Array.from(pit.querySelectorAll<HTMLElement>("[data-pebble]"))
      : [];
    const pebbleGlobes = pebbles.map((el) => ({
      meridians: el.querySelector<SVGPathElement>("[data-pebble-meridians]"),
      parallels: el.querySelector<SVGPathElement>("[data-pebble-parallels]"),
    }));

    const drawGlobe = (deg: number) => {
      const grid = globeGrid((-deg * Math.PI) / 180);
      meridians.setAttribute("d", grid.meridians);
      parallels.setAttribute("d", grid.parallels);
    };

    const drawPebbleGlobe = (i: number, deg: number) => {
      const g = pebbleGlobes[i];
      if (!g?.meridians || !g?.parallels) return;
      const grid = globeGrid(((deg + i * 32) * Math.PI) / 180);
      g.meridians.setAttribute("d", grid.meridians);
      g.parallels.setAttribute("d", grid.parallels);
    };

    if (reduced) {
      ball.style.transform = "none";
      drawGlobe(0);
      setReady(true);
      return;
    }

    let from = 0;
    let to = 0;
    let spin = 0;
    let scale = 1;
    let greenR = 90;
    let pebbleR = 19;
    let pebbleD = 38;
    let pos = 0;
    let vel = 0;
    let target = 0;
    let raf = 0;
    let last = performance.now();
    const world: {
      rest: number;
      x: number;
      v: number;
      hit: boolean;
      mass: number;
      e: number;
      mu: number;
      drive: number;
    }[] = PEBBLE_RESTS.map((rest, i) => ({
      rest,
      x: rest,
      v: 0,
      hit: false,
      mass: PEBBLE_PHYS[i].mass,
      e: PEBBLE_PHYS[i].e,
      mu: PEBBLE_PHYS[i].mu,
      drive: PEBBLE_PHYS[i].drive,
    }));

    const paint = () => {
      const p = clamp(pos, 0, 1);
      const greenX = from + (to - from) * p;
      ball.style.transform = `translate3d(${greenX}px, 0, 0)`;
      drawGlobe(-spin * p);
      if (shadow) {
        const slip = Math.min(0.22, Math.abs(vel) * 0.09);
        shadow.style.transform = `scaleX(${1 + slip})`;
        shadow.style.filter = `blur(${3.5 + slip * 6}px)`;
      }
      world.forEach((body, i) => {
        const el = pebbles[i];
        if (!el) return;
        el.style.transform = `translate3d(${body.x}px, 0, 0)`;
        const dist = body.x - body.rest * scale;
        drawPebbleGlobe(i, (dist / (Math.PI * Math.max(pebbleD, 1))) * 360);
      });
    };

    const collideGreen = (greenX: number, greenV: number) => {
      const greenRight = greenX + greenR;
      for (const body of world) {
        const left = body.x - pebbleR;
        const overlap = greenRight - left;
        if (overlap < 0) continue;
        const closing = greenV - body.v;
        if (closing <= 12 && body.v > greenV) continue;
        body.x += overlap;
        if (closing > 0) {
          const inv = 1 / GREEN_MASS + 1 / body.mass;
          const j = ((1 + body.e) * closing) / inv;
          body.v += j / body.mass;
        }
        body.hit = true;
        const impact = Math.max(Math.abs(greenV), 110);
        body.v = Math.max(body.v, impact * body.drive);
      }
    };

    const collidePebbles = () => {
      const min = pebbleD + 0.75;
      for (let pass = 0; pass < 4; pass++) {
        for (let i = 0; i < world.length - 1; i++) {
          const a = world[i];
          const b = world[i + 1];
          if (a.hit && b.hit) continue;
          const sep = b.x - a.x;
          if (sep >= min) continue;
          const inv = 1 / a.mass + 1 / b.mass;
          const overlap = min - sep;
          a.x -= overlap * (1 / a.mass) / inv;
          b.x += overlap * (1 / b.mass) / inv;
          const rel = a.v - b.v;
          if (rel > 0) {
            const j = ((1 + PEBBLE_PEBBLE_E) * rel) / inv;
            a.v -= j / a.mass;
            b.v += j / b.mass;
          }
        }
      }
    };

    const stepPebbles = (dt: number, greenX: number, greenV: number) => {
      const firstRestLeft = world[0].rest * scale - pebbleR;
      const rewind = greenX + greenR < firstRestLeft - 10;

      if (rewind) {
        for (const body of world) {
          const home = stepSpring(body.x, body.v, body.rest * scale, dt, 9.4, 1.15);
          body.x = home.pos;
          body.v = home.vel;
          body.hit = false;
          if (Math.abs(body.x - body.rest * scale) < 0.4 && Math.abs(body.v) < 4) {
            body.x = body.rest * scale;
            body.v = 0;
          }
        }
        return;
      }

      collideGreen(greenX, greenV);
      for (const body of world) {
        if (body.hit && greenX - greenR > body.x + pebbleR && body.v < 90) {
          body.v = Math.max(body.v, 260 * body.drive);
        }
        const decel = body.mu * ROLL_G;
        if (Math.abs(body.v) <= decel * dt) body.v = 0;
        else body.v -= Math.sign(body.v) * decel * dt;
        body.x += body.v * dt;
      }
      collideGreen(greenX, greenV);
      collidePebbles();
    };

    const pebblesBusy = () =>
      world.some(
        (body) =>
          Math.abs(body.v) > 2 || Math.abs(body.x - body.rest * scale) > 0.6,
      );

    const placeCard = () => {
      const gutter = 24;
      const room = (window.innerHeight - card.offsetHeight) / 2;
      card.style.top = `${Math.max(gutter, room)}px`;
    };

    const measure = () => {
      const held = pos;
      placeCard();
      ball.style.transform = "none";
      const rest = ball.getBoundingClientRect();
      const clip = card.getBoundingClientRect();
      from = -(rest.left - clip.left + rest.width);
      to = clip.right - rest.left;
      spin = (Math.abs(to - from) / (Math.PI * Math.max(rest.width, 1))) * 360;
      scale = rest.width / 180;
      greenR = rest.width / 2;
      pebbles.forEach((el, i) => {
        const restX = PEBBLE_RESTS[i] * scale;
        el.style.transform = `translate3d(${restX}px, 0, 0)`;
        const box = el.getBoundingClientRect();
        if (i === 0) {
          pebbleD = box.width;
          pebbleR = box.width / 2;
        }
      });
      world.forEach((body, i) => {
        body.rest = PEBBLE_RESTS[i];
        if (Math.abs(body.v) < 2) {
          body.x = body.rest * scale;
          body.v = 0;
        }
      });
      pos = held;
      paint();
      setReady(true);
    };

    const readTarget = () => {
      const total = pin.offsetHeight - window.innerHeight;
      if (total <= 0) {
        target = 1;
        return;
      }
      const p = clamp(-pin.getBoundingClientRect().top / total, 0, 1);
      target = clamp((p - 0.08) / 0.62, 0, 1);
    };

    const tick = (now: number) => {
      const dt = clamp((now - last) / 1000, 0.001, 0.032);
      last = now;
      const next = stepSpring(pos, vel, target, dt);
      pos = next.pos;
      vel = next.vel;
      const p = clamp(pos, 0, 1);
      const greenX = from + (to - from) * p;
      const greenV = (to - from) * vel;
      stepPebbles(dt, greenX, greenV);
      paint();
      const springing = Math.abs(target - pos) > 0.001 || Math.abs(vel) > 0.004;
      if (springing || pebblesBusy()) {
        raf = window.requestAnimationFrame(tick);
      } else {
        pos = target;
        vel = 0;
        paint();
        raf = 0;
      }
    };

    const kick = () => {
      readTarget();
      if (!raf) {
        last = performance.now();
        raf = window.requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      measure();
      kick();
    };

    measure();
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <section
      ref={pinRef}
      id="ownership"
      className={[
        "fv-why-one",
        ready ? "is-ready" : "",
        reduced ? "is-static" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="why-ownership"
    >
      <div ref={cardRef} className="fv-why-one__card">
      <div className="fv-why-one__stage">
        <h2 id="why-ownership" className="fv-why-one__title">
          One fee. Zero conflicts.
        </h2>

        <div className="fv-why-one__copy">
          {PARAS.map((text) => (
            <p key={text.slice(0, 24)} className="fv-why-one__p">
              {text}
            </p>
          ))}
        </div>

        <div className="fv-why-one__ground">
          <div className="fv-why-one__floor" aria-hidden>
            <svg className="fv-why-one__floor-grid">
              <defs>
                <pattern
                  id={floorPat}
                  width="34"
                  height="34"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 34H34M34 0V34"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#${floorPat})`} />
            </svg>
          </div>
          <div ref={pitRef} className="fv-why-one__pit">
          {PEBBLE_RESTS.map((restX, i) => (
            <span
              key={i}
              className={`fv-why-one__pebble fv-why-one__pebble--${PEBBLE_HUES[i]}`}
              data-pebble
              style={{
                transform: `translate3d(${restX}px, 0, 0)`,
              }}
              aria-hidden
            >
              <span className="fv-why-one__pebble-shadow" />
              <span className="fv-why-one__pebble-skin" />
              <span className="fv-why-one__pebble-rot" aria-hidden>
                <svg
                  className="fv-why-one__pebble-globe"
                  viewBox="-1.05 -1.05 2.1 2.1"
                >
                  <path
                    data-pebble-meridians
                    className="fv-why-one__pebble-grid"
                  />
                  <path
                    data-pebble-parallels
                    className="fv-why-one__pebble-grid"
                  />
                </svg>
              </span>
            </span>
          ))}
          <span ref={ballRef} className="fv-why-one__ball">
            <span ref={shadowRef} className="fv-why-one__ball-shadow" />
            <span className="fv-why-one__ball-skin" />
            <span ref={rotRef} className="fv-why-one__ball-rot" aria-hidden>
              <svg
                className="fv-why-one__ball-globe"
                viewBox="-1.05 -1.05 2.1 2.1"
              >
                <path ref={meridiansRef} className="fv-why-one__ball-grid" />
                <path ref={parallelsRef} className="fv-why-one__ball-grid" />
              </svg>
            </span>
          </span>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
