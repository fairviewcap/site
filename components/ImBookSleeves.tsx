"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const CORE = 28;

const SLEEVES = [
  { label: "Domestic equity ETFs", weight: 0.78 },
  { label: "International ETFs", weight: 0.62 },
  { label: "Fixed income ETFs", weight: 0.5 },
  { label: "Alternative assets", weight: 0.34 },
] as const;

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

/**
 * Published book (25–30) plus the four sleeves — weight by size, not invented %.
 */
export default function ImBookSleeves() {
  const { ref, inView } = useOnceInView<HTMLElement>();

  return (
    <figure
      ref={ref}
      className={["fv-im-book", inView ? "is-in" : ""].filter(Boolean).join(" ")}
    >
      <div className="fv-im-book__core">
        <p className="fv-im-book__kicker">
          <span className="fv-im-book__num fv-nums">25–30</span>
          Our core stock holdings
        </p>
        <div className="fv-im-book__grid" aria-hidden>
          {Array.from({ length: CORE }, (_, i) => (
            <span
              key={i}
              className="fv-im-book__dot"
              style={{ "--fv-book-i": i } as CSSProperties}
            />
          ))}
        </div>
      </div>
      <ul className="fv-im-book__sleeves">
        {SLEEVES.map((sleeve, i) => (
          <li
            key={sleeve.label}
            className="fv-im-book__sleeve"
            style={
              {
                "--fv-eq-i": i,
                "--fv-sleeve-w": sleeve.weight,
              } as CSSProperties
            }
          >
            <span className="fv-im-book__sleeve-lab">{sleeve.label}</span>
            <span className="fv-im-book__sleeve-track">
              <span className="fv-im-book__sleeve-fill" />
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
