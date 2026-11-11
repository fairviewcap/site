"use client";

import { useEffect, useRef, useState } from "react";

const PARAS = [
  "We charge one fee based on the assets we manage for you. No commissions for steering you into specific investments, no shareholders asking why margins weren't higher this quarter.",
  "That's not corporate altruism. It's simple arithmetic. When the people managing your money own the firm, they don't need to squeeze the client to hit a quarterly target.",
  "It also means the advisor who builds your portfolio today is often the same one reviewing it with your kids fifteen years from now. And that your whole family's assets sit under one fee, not billed account by account like six separate relationships.",
] as const;

export default function WhyOneFee() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { threshold: 0.6, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="ownership"
      className={shown ? "fv-why-one is-in" : "fv-why-one"}
      aria-labelledby="why-ownership"
    >
      <h2 ref={titleRef} id="why-ownership" className="fv-why-one__title">
        One fee.
        <br />
        Zero conflicts.
      </h2>

      <div className="fv-why-one__copy">
        {PARAS.map((text) => (
          <p key={text.slice(0, 24)} className="fv-why-one__p">
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
