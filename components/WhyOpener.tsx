"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import LinkArrow from "@/components/LinkArrow";

type WhyOpenerProps = {
  title: string;
  lede: ReactNode;
  children?: ReactNode;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

/**
 * Sticky green lockup. Scroll cuts the type, a white ball drops
 * from the top of the frame and bounces, then the next line lands.
 */
export default function WhyOpener({ title, lede, children }: WhyOpenerProps) {
  const pinRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dropped, setDropped] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [cover, setCover] = useState(160);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) {
      setEntered(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, [reduced]);

  useEffect(() => {
    const measure = () => {
      setCover(Math.hypot(window.innerWidth, window.innerHeight) / 10);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }

    const update = () => {
      const el = pinRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = -el.getBoundingClientRect().top;
      const next = clamp(scrolled / total, 0, 1);
      setProgress(next);
      setDropped((was) => (next >= 0.2 ? true : next < 0.12 ? false : was));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduced]);

  const liftT = reduced ? 0 : smoothstep(clamp((progress - 0.07) / 0.12, 0, 1));
  const cut = reduced ? false : liftT >= 1;
  const drop = reduced ? false : dropped;
  const fillT = reduced ? 1 : clamp((progress - 0.38) / 0.24, 0, 1);
  const filling = !reduced && fillT > 0.01;
  const white = reduced || fillT > 0.92;
  const ballScale = 1 + fillT * cover * 1.2;

  return (
    <section
      ref={pinRef}
      className={[
        "fv-why-cine",
        entered ? "is-in" : "",
        reduced ? "is-static" : "",
        cut ? "is-cut" : "",
        drop ? "is-drop" : "",
        filling ? "is-fill" : "",
        white ? "is-white" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Why Fairview"
    >
      <div className="fv-why-cine__sticky">
        <div className="fv-why-cine__field" />
        <div
          className="fv-why-cine__copy"
          style={
            liftT > 0
              ? {
                  opacity: 1 - liftT,
                  transform: `translateY(${-1.4 * liftT}rem)`,
                }
              : undefined
          }
        >
          <p className="fv-why-cine__folio">Why Fairview</p>
          <h1 className="fv-why-cine__title">{title}</h1>
          <p className="fv-why-cine__lede">{lede}</p>
          <span className="fv-why-cine__readon">
            Read on
            <LinkArrow direction="down" size={14} />
          </span>
        </div>
        <span
          className="fv-why-cine__ball"
          style={
            filling
              ? { transform: `translate(-50%, -50%) scale(${ballScale})` }
              : undefined
          }
          aria-hidden
        />
        <h2 className="fv-why-cine__beat">
          Every firm has a founding story. Most of them are marketing.
        </h2>
        <div id="letter" className="fv-why-cine__letter">
          {children}
        </div>
      </div>
    </section>
  );
}
