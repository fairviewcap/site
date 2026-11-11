"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import LinkArrow from "@/components/LinkArrow";
import type { AnswerCategory } from "@/lib/answers";

export default function AnswersExplorer({
  categories,
}: {
  categories: AnswerCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return categories;
    return categories.filter((category) => category.id === activeCategory);
  }, [categories, activeCategory]);

  let n = 0;

  return (
    <>
      <nav
        className="fv-answers__jump"
        aria-label="Filter by topic"
        data-enter="1"
      >
        <ul className="fv-answers__jump-list" role="list">
          <li>
            <button
              type="button"
              className={`fv-answers__jump-chip${activeCategory === null ? " is-active" : ""}`}
              aria-pressed={activeCategory === null}
              onClick={() => setActiveCategory(null)}
            >
              All
            </button>
          </li>
          {categories.map((category) => {
            const active = activeCategory === category.id;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  className={`fv-answers__jump-chip${active ? " is-active" : ""}`}
                  aria-pressed={active}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="fv-answers__schedule" data-enter="2">
        {filtered.map((category) => (
          <section
            key={category.id}
            className="fv-answers__group"
            aria-labelledby={`answers-${category.id}`}
          >
            <h2
              id={`answers-${category.id}`}
              className="fv-answers__group-title"
            >
              {category.title}
            </h2>

            <ol className="fv-answers__qa">
              {category.items.map((item) => {
                n += 1;
                const index = String(n).padStart(2, "0");
                return (
                  <li
                    key={item.slug}
                    id={item.slug}
                    className="fv-answers__row"
                  >
                    <span className="fv-answers__index" aria-hidden>
                      {index}
                    </span>
                    <span className="fv-answers__rule" aria-hidden />
                    <div className="fv-answers__body">
                      <h3 className="fv-answers__q">
                        <Link href={`/answers/${item.slug}`}>
                          {item.question}
                        </Link>
                      </h3>
                      <p className="fv-answers__a">{item.answer}</p>
                      {item.more ? (
                        <p className="fv-answers__more">
                          <Link href={item.more.href}>
                            {item.more.label}
                            <LinkArrow />
                          </Link>
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}
