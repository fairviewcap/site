import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContinueBar from "@/components/ContinueBar";
import LinkArrow from "@/components/LinkArrow";
import {
  allAnswerRecords,
  getAnswerBySlug,
  getRelatedAnswers,
} from "@/lib/answers/store";
import AnswerViewLogger from "./AnswerViewLogger";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const records = await allAnswerRecords();
  return records.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getAnswerBySlug(slug);
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
  const item = await getAnswerBySlug(slug);
  if (!item) notFound();

  const related = await getRelatedAnswers(slug);

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
          <Link href="/answers">Straight Answers</Link>
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
          <ContinueBar
            className="fv-answer__related"
            label="Related questions"
            items={related.map((r) => ({
              href: `/answers/${r.slug}`,
              prompt: r.question,
            }))}
          />
        ) : null}

        <p className="fv-answer__all">
          <Link href="/answers">All Straight Answers</Link>
        </p>
      </article>
    </main>
  );
}
