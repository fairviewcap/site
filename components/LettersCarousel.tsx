"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { quarterFromArticle } from "@/lib/learn/letters";
import type { LearnArticle } from "@/lib/learn/types";

type Slide = {
  article: LearnArticle;
  year: number;
  q: 1 | 2 | 3 | 4;
  subhead: string;
  marker: string;
};

function buildSlides(articles: LearnArticle[]): Slide[] {
  return [...articles]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((article) => {
      const year = Number(article.date.slice(0, 4));
      const q = quarterFromArticle(article);
      const excerpt = article.excerpt.trim();
      const subhead =
        excerpt || article.body.slice(0, 2).join(" ").trim();
      return {
        article,
        year,
        q,
        subhead,
        marker: `Q${q}/${String(year).slice(2)}`,
      };
    });
}

export default function LettersCarousel({
  channelSlug,
  articles,
}: {
  channelSlug: string;
  articles: LearnArticle[];
}) {
  const slides = useMemo(() => buildSlides(articles), [articles]);
  const railRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const labelId = useId();
  const count = slides.length;
  const atStart = active <= 0;
  const atEnd = active >= Math.max(0, count - 1);

  const goTo = useCallback((i: number) => {
    const rail = railRef.current;
    const slide = slideRefs.current[i];
    if (!rail || !slide || i < 0 || i >= slideRefs.current.length) return;

    // Distance from rail content origin to this slide (ignores page scroll).
    const left = slide.offsetLeft;
    rail.scrollTo({ left, behavior: "smooth" });
    setActive(i);
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      const next = active + dir;
      if (next < 0 || next >= count) return;
      goTo(next);
    },
    [active, count, goTo],
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || count === 0) return;

    const nodes = slideRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const ratios = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }
        let bestIdx = 0;
        let bestRatio = -1;
        nodes.forEach((node, i) => {
          const ratio = ratios.get(node) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = i;
          }
        });
        if (bestRatio > 0) {
          setActive((prev) => (prev === bestIdx ? prev : bestIdx));
        }
      },
      {
        root: rail,
        threshold: [0.2, 0.4, 0.6, 0.8],
      },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [count, slides]);

  const onRailKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(count - 1);
    }
  };

  if (count === 0) {
    return <p className="fv-learn-index__empty">Pieces are on the way.</p>;
  }

  return (
    <section
      className="fv-letters-carousel"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
    >
      <p id={labelId} className="sr-only">
        Quarterly letters rail
      </p>

      <div
        ref={railRef}
        className="fv-letters-carousel__rail"
        tabIndex={0}
        onKeyDown={onRailKeyDown}
      >
        {slides.map((slide, i) => {
          const issue = slide.article.issue ?? `Q${slide.q} ${slide.year}`;
          return (
            <Link
              key={slide.article.slug}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              href={`/learn/${channelSlug}/${slide.article.slug}`}
              className="fv-letters-carousel__slide"
              aria-label={`${issue}: ${slide.article.title}`}
            >
              <span className="fv-letters-carousel__q" aria-hidden>
                Q{slide.q}
              </span>
              <p className="fv-letters-carousel__year">{slide.year}</p>
              <h2 className="fv-letters-carousel__headline">
                {slide.article.title}
              </h2>
              <p className="fv-letters-carousel__subhead">{slide.subhead}</p>
            </Link>
          );
        })}
      </div>

      <nav className="fv-letters-carousel__nav" aria-label="Letter index">
        <button
          type="button"
          className="fv-letters-carousel__step"
          aria-label="Previous letter"
          disabled={atStart}
          onClick={() => go(-1)}
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden />
        </button>

        <div className="fv-letters-carousel__markers">
          {slides.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.article.slug}
                type="button"
                aria-current={isActive ? "true" : undefined}
                aria-label={`${s.marker}: ${s.article.title}`}
                className={
                  isActive
                    ? "fv-letters-carousel__marker fv-letters-carousel__marker--active"
                    : "fv-letters-carousel__marker"
                }
                onClick={() => goTo(i)}
              >
                {s.marker}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="fv-letters-carousel__step"
          aria-label="Next letter"
          disabled={atEnd}
          onClick={() => go(1)}
        >
          <ArrowRight size={16} strokeWidth={2} aria-hidden />
        </button>
      </nav>
    </section>
  );
}
