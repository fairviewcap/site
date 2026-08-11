import type { Metadata } from "next";
import ContinueBar from "@/components/ContinueBar";
import { allAnswerItems, ANSWER_CATEGORIES } from "@/lib/answers";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Straight Answers | Fairview Capital",
  description:
    "There's no such thing as a dumb question. There's such a thing as a bad answer. So we try not to give any.",
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
          <p className="fv-answers__eyebrow">Straight Answers</p>
          <h1 className="fv-answers__title">
            There&apos;s no such thing as a dumb question. There&apos;s such a
            thing as a bad answer.
          </h1>
          <p className="fv-answers__lede">So we try not to give any.</p>

          <nav className="fv-answers__jump" aria-label="Jump to section">
            <ul className="fv-answers__jump-list">
              {ANSWER_CATEGORIES.map((category) => (
                <li key={category.id}>
                  <a
                    className="fv-answers__jump-chip"
                    href={`#answers-${category.id}`}
                  >
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
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

        <ContinueBar
          items={[
            {
              href: "/firm/fees",
              prompt: "Want the fee schedule in plain numbers?",
            },
            {
              href: "/work/wealth-management",
              prompt: "Curious how the day-to-day work actually runs?",
            },
            {
              href: FIRM.contactHref,
              prompt: "Still wondering something we didn’t cover?",
            },
          ]}
        />
      </div>
    </main>
  );
}
