"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import LinkArrow from "@/components/LinkArrow";
import type { AnswerCategory } from "@/lib/answers";
import { FIRM } from "@/lib/firm";

function matchesQuery(
  question: string,
  answer: string,
  needle: string,
): boolean {
  const q = needle.toLowerCase();
  return (
    question.toLowerCase().includes(q) || answer.toLowerCase().includes(q)
  );
}

export default function AnswersExplorer({
  categories,
  initialQuery = "",
}: {
  categories: AnswerCategory[];
  initialQuery?: string;
}) {
  const inputId = useId();
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const deferred = useDeferredValue(query.trim());
  const searching = deferred.length > 0;

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filtered = useMemo(() => {
    let next = categories;

    if (!searching && activeCategory) {
      next = next.filter((category) => category.id === activeCategory);
    }

    if (!searching) return next;

    return next
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          matchesQuery(item.question, item.answer, deferred),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [categories, deferred, searching, activeCategory]);

  const matchCount = useMemo(
    () => filtered.reduce((n, c) => n + c.items.length, 0),
    [filtered],
  );

  useEffect(() => {
    if (deferred.length < 2) return;

    const timer = window.setTimeout(() => {
      void fetch("/api/answers/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: deferred,
          matches: matchCount,
          kind: "search",
        }),
        keepalive: true,
      }).catch(() => {
        /* ignore network errors — search still works locally */
      });
    }, 750);

    return () => window.clearTimeout(timer);
  }, [deferred, matchCount]);

  let n = 0;

  return (
    <>
      <div className="fv-answers__search" data-enter="1">
        <label className="fv-answers__search-field" htmlFor={inputId}>
          <Search
            className="fv-answers__search-icon"
            size={16}
            strokeWidth={2}
            aria-hidden
          />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions — try “minimum” or “fees”"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        {searching ? (
          <p className="fv-answers__search-meta" aria-live="polite">
            {matchCount === 0
              ? "No matches"
              : `${matchCount} match${matchCount === 1 ? "" : "es"}`}
          </p>
        ) : null}
      </div>

      {!searching ? (
        <nav
          className="fv-answers__jump"
          aria-label="Filter by topic"
          data-enter="2"
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
      ) : null}

      <div className="fv-answers__schedule" data-enter="3">
        {filtered.length === 0 ? (
          <div className="fv-answers__empty">
            <p>
              Nothing matched “{deferred}”. If it&apos;s a real question, we
              want it — ask us.
            </p>
            <Link href={FIRM.contactHref} className="fv-answers__cta">
              Ask Fairview
            </Link>
          </div>
        ) : (
          filtered.map((category) => (
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
          ))
        )}
      </div>
    </>
  );
}
