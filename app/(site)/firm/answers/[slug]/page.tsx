import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContinueBar from "@/components/ContinueBar";
import LinkArrow from "@/components/LinkArrow";
import {
  allAnswerRecords,
  getAnswerBySlug,
  getRelatedAnswers,
} from "@/lib/answers";
import { FIRM } from "@/lib/firm";
import AnswerViewLogger from "./AnswerViewLogger";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allAnswerRecords().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getAnswerBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.question} | Straight Answers | Fairview Capital`,
    description: item.answer,
    openGraph: {
      title: item.question,
      description: item.answer,
      type: "article",
    },
  };
}

export default async function AnswerSlugPage({ params }: Props) {
  const { slug } = await params;
  const item = getAnswerBySlug(slug);
  if (!item) notFound();

  const related = getRelatedAnswers(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      },
    ],
  };

  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnswerViewLogger slug={slug} />

      <article className="fv-answer">
        <nav className="fv-answer__crumb" aria-label="Breadcrumb">
          <Link href="/firm/answers">Straight Answers</Link>
          <span aria-hidden>/</span>
          <span>{item.categoryTitle}</span>
        </nav>

        <p className="fv-answer__category">{item.categoryTitle}</p>
        <h1 className="fv-answer__q">{item.question}</h1>
        <p className="fv-answer__a">{item.answer}</p>

        {item.more ? (
          <p className="fv-answer__more">
            <Link href={item.more.href}>
              {item.more.label}
              <LinkArrow />
            </Link>
          </p>
        ) : null}

        {related.length > 0 ? (
          <section
            className="fv-answer__related"
            aria-labelledby="answer-related"
          >
            <h2 id="answer-related" className="fv-answer__related-title">
              Related questions
            </h2>
            <ul className="fv-answer__related-list">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/firm/answers/${r.slug}`}>{r.question}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="fv-answer__all">
          <Link href="/firm/answers">All Straight Answers</Link>
        </p>

        <ContinueBar
          items={[
            {
              href: "/firm/fees",
              prompt: "Want the fee schedule in plain numbers?",
            },
            {
              href: FIRM.contactHref,
              prompt: "Still wondering something we didn’t cover?",
            },
          ]}
        />
      </article>
    </main>
  );
}
