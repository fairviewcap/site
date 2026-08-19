"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

const REST = [0.78, 0.32, 0.62] as const;
const FLAT = REST.map(() => 0.5);

function clamp(n: number) {
  return Math.min(1, Math.max(0, n));
}

function useOnceInView<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) return;
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
      { threshold: 0.4, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return { ref, inView };
}

export default function ImPrecisionMixer({
  compact = false,
  play,
}: {
  compact?: boolean;
  play?: boolean;
}) {
  const own = useOnceInView<HTMLDivElement>(play === undefined);
  const ref = own.ref;
  const inView = play ?? own.inView;
  const [levels, setLevels] = useState(() => [...FLAT]);
  const [held, setHeld] = useState<number | null>(null);
  const [live, setLive] = useState(false);
  const drag = useRef<{ i: number; el: HTMLElement } | null>(null);
  const touched = useRef(false);

  useEffect(() => {
    if (!inView) return;
    const id = window.requestAnimationFrame(() => {
      if (!touched.current) setLevels([...REST]);
    });
    const done = window.setTimeout(() => setLive(true), 1100);
    return () => {
      window.cancelAnimationFrame(id);
      window.clearTimeout(done);
    };
  }, [inView]);

  const read = useCallback((el: HTMLElement, clientY: number) => {
    const box = el.getBoundingClientRect();
    return clamp(1 - (clientY - box.top) / box.height);
  }, []);

  function release() {
    drag.current = null;
    setHeld(null);
  }

  function onPointerDown(i: number, e: ReactPointerEvent<HTMLButtonElement>) {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    touched.current = true;
    drag.current = { i, el };
    setHeld(i);
    setLive(true);
    setLevels((prev) => prev.map((v, j) => (j === i ? read(el, e.clientY) : v)));
  }

  function onPointerMove(e: ReactPointerEvent<HTMLButtonElement>) {
    const d = drag.current;
    if (!d) return;
    const t = read(d.el, e.clientY);
    setLevels((prev) => prev.map((v, j) => (j === d.i ? t : v)));
  }

  function onKeyDown(i: number, e: KeyboardEvent<HTMLButtonElement>) {
    const step = e.shiftKey ? 0.12 : 0.04;
    if (e.key === "ArrowUp" || e.key === "ArrowRight") {
      e.preventDefault();
      touched.current = true;
      setLive(true);
      setLevels((prev) => prev.map((v, j) => (j === i ? clamp(v + step) : v)));
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      e.preventDefault();
      touched.current = true;
      setLive(true);
      setLevels((prev) => prev.map((v, j) => (j === i ? clamp(v - step) : v)));
    }
  }

  return (
    <figure
      className={["fv-im-mix", compact ? "fv-im-mix--plate" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-label="A custom mix. Drag a fader to set it."
    >
      <div
        ref={ref}
        className={[
          "fv-im-mix__plane",
          inView ? "is-in" : "",
          live ? "is-live" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {levels.map((level, i) => (
          <button
            key={i}
            type="button"
            className={[
              "fv-im-mix__ch",
              i === REST.length - 1 ? "is-lock" : "",
              held === i ? "is-held" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              "--fv-mix-i": i,
              "--fv-mix-lvl": level,
            } as React.CSSProperties}
            role="slider"
            aria-label={`Level ${i + 1}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(level * 100)}
            onPointerDown={(e) => onPointerDown(i, e)}
            onPointerMove={onPointerMove}
            onPointerUp={release}
            onPointerCancel={release}
            onKeyDown={(e) => onKeyDown(i, e)}
            onKeyUp={release}
          >
            <span className="fv-im-mix__track" />
            <span className="fv-im-mix__cap" />
          </button>
        ))}
      </div>
    </figure>
  );
}
