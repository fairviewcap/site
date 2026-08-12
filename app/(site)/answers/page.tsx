import type { Metadata } from "next";
import AnswersExplorer from "@/components/AnswersExplorer";
import ContinueBar from "@/components/ContinueBar";
import PageEnter from "@/components/PageEnter";
import {
  allAnswerItems,
  getAnswerCategories,
} from "@/lib/answers/store";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Straight Answers | Fairview Capital",
  description:
    "Quick answers to all kinds of questions. Direct responses regarding fees, custody, strategy, and operations.",
};

type AnswersPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function AnswersPage({ searchParams }: AnswersPageProps) {
  const params = await searchParams;
  const raw = params.q;
  const initialQuery = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";

  const categories = await getAnswerCategories();
  const items = await allAnswerItems();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
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

      <PageEnter>
        <div className="fv-answers">
          <header className="fv-answers__intro" data-enter="0">
            <p className="fv-answers__eyebrow">Straight Answers</p>
            <h1 className="fv-answers__title">
              Quick answers to all kinds of questions.
            </h1>
            <p className="fv-answers__lede">
              Direct responses regarding fees, custody, strategy, and
              operations.
            </p>
          </header>

          <AnswersExplorer
            categories={categories}
            initialQuery={initialQuery}
          />

          <div data-enter="4">
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
        </div>
      </PageEnter>
    </main>
  );
}
