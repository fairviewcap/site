import type { Metadata } from "next";
import AnswersExplorer from "@/components/AnswersExplorer";
import ContinueBar from "@/components/ContinueBar";
import { allAnswerItems, ANSWER_CATEGORIES } from "@/lib/answers";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Straight Answers | Fairview Capital",
  description:
    "There's no such thing as a dumb question. There's such a thing as a bad answer. So we try not to give any.",
};

type AnswersPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function AnswersPage({ searchParams }: AnswersPageProps) {
  const params = await searchParams;
  const raw = params.q;
  const initialQuery = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";

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
        </header>

        <AnswersExplorer
          categories={ANSWER_CATEGORIES}
          initialQuery={initialQuery}
        />

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
