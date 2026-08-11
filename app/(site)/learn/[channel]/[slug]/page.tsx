import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatLearnDate,
  getArticle,
  getChannel,
  LEARN_ARTICLES,
} from "@/lib/learn/content";
import { FIRM } from "@/lib/firm";

type Props = { params: Promise<{ channel: string; slug: string }> };

export async function generateStaticParams() {
  return LEARN_ARTICLES.map((a) => ({
    channel: a.channel,
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { channel, slug } = await params;
  const article = getArticle(channel, slug);
  if (!article) return {};
  return {
    title: `${article.title} | Fairview Capital`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Fairview Capital`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function LearnArticlePage({ params }: Props) {
  const { channel: channelSlug, slug } = await params;
  const channel = getChannel(channelSlug);
  const article = getArticle(channelSlug, slug);
  if (!channel || !article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    description: article.excerpt,
    author: {
      "@type": "Organization",
      name: FIRM.legalName,
    },
    publisher: {
      "@type": "Organization",
      name: FIRM.legalName,
    },
    mainEntityOfPage: `https://www.fairviewcap.com/learn/${channel.slug}/${article.slug}`,
  };

  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="fv-learn-article">
        <nav className="fv-learn-index__crumb" aria-label="Breadcrumb">
          <Link href="/learn">Learn</Link>
          <span aria-hidden>/</span>
          <Link href={`/learn/${channel.slug}`}>{channel.label}</Link>
          <span aria-hidden>/</span>
          <span>{article.issue ?? article.title}</span>
        </nav>

        <header className="fv-learn-article__header">
          <p className="fv-learn__eyebrow">{channel.label}</p>
          <h1 className="fv-learn-article__title">{article.title}</h1>
          <p className="fv-learn-article__meta">
            <time dateTime={article.date}>{formatLearnDate(article.date)}</time>
            {article.issue ? (
              <>
                <span className="fv-footer__sep" aria-hidden>
                  ·
                </span>
                <span>{article.issue}</span>
              </>
            ) : null}
          </p>
        </header>

        <div className="fv-learn-article__body">
          {article.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <footer className="fv-learn-article__footer">
          <p className="fv-learn-article__disclaimer">
            For general informational purposes only. Not investment, tax, or
            legal advice. Past performance does not guarantee future results.
            See our{" "}
            <a
              href={FIRM.disclosures.formAdv}
              target="_blank"
              rel="noopener noreferrer"
            >
              Form ADV
            </a>{" "}
            and{" "}
            <a
              href={FIRM.disclosures.formCrs}
              target="_blank"
              rel="noopener noreferrer"
            >
              Form CRS
            </a>
            .
          </p>
          <Link href={`/learn/${channel.slug}`} className="fv-learn-article__back">
            All {channel.label.toLowerCase()}
          </Link>
        </footer>
      </article>
    </main>
  );
}
