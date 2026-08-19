"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const TICKS = 30;
const HIT_THROUGH = 25;

const SLEEVES = [
  { name: "Domestic equity", kind: "ETFs" },
  { name: "International", kind: "ETFs" },
  { name: "Fixed income", kind: "ETFs" },
  { name: "Alternative assets", kind: "" },
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
      { threshold: 0.35, rootMargin: "0px 0px -16% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

/**
 * Implementation instrument — same grammar as The record on Why Fairview.
 */
export default function ImBookSleeves() {
  const { ref, inView } = useOnceInView<HTMLElement>();

  return (
    <figure
      ref={ref}
      className={["fv-im-instrument", inView ? "is-in" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="fv-im-instrument__mast">
        <p className="fv-im-instrument__lede">
          Depending on your profile, needs, and objectives, we allocate funds
          across:
        </p>
        <p className="fv-im-instrument__book">
          <span className="fv-im-instrument__num fv-nums">
            25<span className="fv-im-instrument__dash">–</span>30
          </span>
          <span className="fv-im-instrument__name">Our core stock holdings</span>
        </p>
        <div className="fv-im-instrument__dots" aria-hidden>
          {Array.from({ length: TICKS }, (_, i) => (
            <span
              key={i}
              className={[
                "fv-im-instrument__dot",
                i < HIT_THROUGH ? "is-hit" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ "--fv-dial-i": i } as CSSProperties}
            />
          ))}
        </div>
      </header>
      <div className="fv-im-instrument__panel">
        <ul className="fv-im-instrument__sleeves">
          {SLEEVES.map((sleeve, i) => (
            <li
              key={sleeve.name}
              style={{ "--fv-eq-i": i } as CSSProperties}
            >
              <span className="fv-im-instrument__idx" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="fv-im-instrument__name">{sleeve.name}</span>
              {sleeve.kind ? (
                <span className="fv-im-instrument__kind">{sleeve.kind}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
