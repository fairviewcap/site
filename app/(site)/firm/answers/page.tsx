import type { Metadata } from "next";
import Link from "next/link";
import { allAnswerItems, ANSWER_CATEGORIES } from "@/lib/answers";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Straight Answers | Fairview Capital",
  description:
    "The questions we hear most — getting started, how we work, trust & safety, philosophy, and technology — in plain English.",
};

export default function AnswersPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allAnswerItems().map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    about: {
      "@type": "Organization",
      name: FIRM.legalName,
    },
  };

  let n = 0;

  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="fv-answers">
        <header className="fv-answers__intro">
          <h1 className="fv-answers__title">Straight Answers.</h1>
          <p className="fv-answers__lede">In plain English.</p>
        </header>

        <div className="fv-answers__schedule">
          {ANSWER_CATEGORIES.map((category) => (
            <section
              key={category.id}
              className="fv-answers__group"
              aria-labelledby={`answers-${category.id}`}
            >
              <h2 id={`answers-${category.id}`} className="fv-answers__group-title">
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
                        <h3 className="fv-answers__q">{item.question}</h3>
                        <p className="fv-answers__a">{item.answer}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>

        <p className="fv-answers__close">
          Still wondering something?{" "}
          <Link href={FIRM.contactHref} className="fv-answers__cta">
            Let&apos;s talk
          </Link>
        </p>
      </div>
    </main>
  );
}
