"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/** Midpoint of the published 25–30 book — marks, not a performance series. */
const OURS = 28;
const THEIRS = 120;

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
      { threshold: 0.45, rootMargin: "0px 0px -22% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

/**
 * Two books: a typical fund stack washes in, then our names land one by one.
 */
export default function WhyResearchBook() {
  const { ref, inView } = useOnceInView<HTMLElement>();

  return (
    <figure
      ref={ref}
      className={["fv-why__book", inView ? "is-in" : ""].filter(Boolean).join(" ")}
    >
      <div className="fv-why__book-plane" aria-hidden>
        <div className="fv-why__book-pair">
          <div className="fv-why__book-side">
            <p className="fv-why__book-kicker">
              <span className="fv-why__book-idx">01</span>
              Our book
            </p>
            <div className="fv-why__book-grid fv-why__book-grid--ours">
              {Array.from({ length: OURS }, (_, i) => (
                <span
                  key={i}
                  className="fv-why__book-dot"
                  style={{ "--fv-book-i": i } as CSSProperties}
                />
              ))}
            </div>
            <p className="fv-why__book-stat">
              <span className="fv-why__book-num fv-nums">25–30</span>
              companies
            </p>
          </div>
          <div className="fv-why__book-side fv-why__book-side--theirs">
            <p className="fv-why__book-kicker">
              <span className="fv-why__book-idx">02</span>
              A typical book
            </p>
            <div className="fv-why__book-grid fv-why__book-grid--theirs">
              {Array.from({ length: THEIRS }, (_, i) => (
                <span
                  key={i}
                  className="fv-why__book-dot"
                  style={{ "--fv-book-i": i } as CSSProperties}
                />
              ))}
            </div>
            <p className="fv-why__book-stat fv-why__book-stat--quiet">
              Other people&apos;s funds
            </p>
          </div>
        </div>
      </div>
      <figcaption className="fv-why__book-cap">
        We can name every one.
      </figcaption>
    </figure>
  );
}
