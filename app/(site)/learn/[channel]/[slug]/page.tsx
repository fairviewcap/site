import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LearnArticleBody from "@/components/LearnArticleBody";
import {
  estimateReadMinutes,
  formatLearnDate,
  getArticle,
  getArticlesByChannel,
  getChannel,
  isLearnNote,
  listArticles,
} from "@/lib/learn/store";
import {
  learnBodyContent,
  letterNeighbors,
  resolveLetterPullQuote,
  quarterFromArticle,
} from "@/lib/learn/letters";
import { FIRM } from "@/lib/firm";
import type { LearnArticle, LearnChannel } from "@/lib/learn/types";

export const revalidate = 3600;

type Props = { params: Promise<{ channel: string; slug: string }> };

export async function generateStaticParams() {
  const articles = await listArticles({ publishedOnly: true });
  return articles.map((a) => ({
    channel: a.channel,
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { channel, slug } = await params;
  const article = await getArticle(channel, slug);
  if (!article) return {};
  return {
    title: `${article.title} | Fairview Capital`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Fairview Capital`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      ...(article.image ? { images: [{ url: article.image }] } : {}),
    },
  };
}

function DisclaimerFooter({
  backHref,
  backLabel,
}: {
  backHref: string;
  backLabel: string;
}) {
  return (
    <footer className="fv-learn-article__footer">
      <p className="fv-learn-article__disclaimer">
        For general informational purposes only. Not investment, tax, or legal
        advice. Past performance does not guarantee future results. See our{" "}
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
      <Link href={backHref} className="fv-learn-article__back">
        {backLabel}
      </Link>
    </footer>
  );
}

function SeriesNav({
  channel,
  prev,
  next,
  label,
}: {
  channel: LearnChannel;
  prev: LearnArticle | null;
  next: LearnArticle | null;
  label: string;
}) {
  if (!prev && !next) return null;
  return (
    <nav className="fv-learn-series" aria-label={label}>
      {prev ? (
        <Link
          href={`/learn/${channel.slug}/${prev.slug}`}
          className="fv-learn-series__link fv-learn-series__link--prev"
        >
          <span className="fv-learn-series__dir">Previous</span>
          <span className="fv-learn-series__title">{prev.title}</span>
        </Link>
      ) : (
        <span className="fv-learn-series__link fv-learn-series__link--empty" />
      )}
      {next ? (
        <Link
          href={`/learn/${channel.slug}/${next.slug}`}
          className="fv-learn-series__link fv-learn-series__link--next"
        >
          <span className="fv-learn-series__dir">Next</span>
          <span className="fv-learn-series__title">{next.title}</span>
        </Link>
      ) : (
        <span className="fv-learn-series__link fv-learn-series__link--empty" />
      )}
    </nav>
  );
}

function LetterArticle({
  channel,
  article,
  prev,
  next,
}: {
  channel: LearnChannel;
  article: LearnArticle;
  prev: LearnArticle | null;
  next: LearnArticle | null;
}) {
  const q = quarterFromArticle(article);
  const year = Number(article.date.slice(0, 4));
  const pull = resolveLetterPullQuote(article);
  const body = learnBodyContent(article.body);

  return (
    <article className="fv-letter">
      <nav className="fv-learn-index__crumb fv-letter__crumb" aria-label="Breadcrumb">
        <Link href="/learn">Learn</Link>
        <span aria-hidden>/</span>
        <Link href={`/learn/${channel.slug}`}>{channel.label}</Link>
        <span aria-hidden>/</span>
        <span>{article.issue ?? `Q${q}`}</span>
      </nav>

      <header className="fv-letter__mast">
        <p className="fv-letter__q" aria-hidden>
          <span className="fv-letter__q-mark">Q{q}</span>
          <span className="fv-letter__yy">{String(year).slice(2)}</span>
        </p>
        <h1 className="fv-letter__title">{article.title}</h1>
      </header>

      <div className="fv-letter__body">
        {body.flatMap((paragraph, i) => {
          const nodes = [
            <p key={`p-${i}-${paragraph.slice(0, 24)}`}>{paragraph}</p>,
          ];
          if (pull && i === 0) {
            nodes.push(
              <blockquote key="pull" className="fv-letter__pull">
                <p>{pull}</p>
              </blockquote>,
            );
          }
          return nodes;
        })}
      </div>

      <SeriesNav
        channel={channel}
        prev={prev}
        next={next}
        label="Adjacent letters"
      />

      <DisclaimerFooter
        backHref={`/learn/${channel.slug}`}
        backLabel="All quarterly letters"
      />
    </article>
  );
}

function EssayArticle({
  channel,
  article,
  prev,
  next,
  backLabel,
}: {
  channel: LearnChannel;
  article: LearnArticle;
  prev: LearnArticle | null;
  next: LearnArticle | null;
  backLabel: string;
}) {
  const minutes = estimateReadMinutes(article.body);
  const note = isLearnNote(article);

  return (
    <article className="fv-essay">
      <nav className="fv-learn-index__crumb fv-essay__crumb" aria-label="Breadcrumb">
        <Link href="/learn">Learn</Link>
        <span aria-hidden>/</span>
        <Link href={`/learn/${channel.slug}`}>{channel.label}</Link>
      </nav>

      <header className="fv-essay__header">
        <p className="fv-essay__eyebrow">
          {note ? <span>Note</span> : null}
          {note ? <span aria-hidden>·</span> : null}
          <time dateTime={article.date}>{formatLearnDate(article.date)}</time>
          <span aria-hidden>·</span>
          <span>{minutes} min read</span>
        </p>
        <h1 className="fv-essay__title">{article.title}</h1>
      </header>

      {article.image ? (
        <div className="fv-essay__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.image} alt="" className="fv-essay__image" />
        </div>
      ) : null}

      <LearnArticleBody body={article.body} pullQuote={article.pullQuote} />

      <SeriesNav
        channel={channel}
        prev={prev}
        next={next}
        label={`More ${channel.label.toLowerCase()}`}
      />

      <DisclaimerFooter
        backHref={`/learn/${channel.slug}`}
        backLabel={backLabel}
      />
    </article>
  );
}

export default async function LearnArticlePage({ params }: Props) {
  const { channel: channelSlug, slug } = await params;
  const channel = await getChannel(channelSlug);
  const article = await getArticle(channelSlug, slug);
  if (!channel || !article) notFound();

  const series = await getArticlesByChannel(channel.slug);
  const { prev, next } = letterNeighbors(series, article.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    description: article.excerpt,
    ...(article.image ? { image: article.image } : {}),
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

      {channel.slug === "letters" ? (
        <LetterArticle
          channel={channel}
          article={article}
          prev={prev}
          next={next}
        />
      ) : (
        <EssayArticle
          channel={channel}
          article={article}
          prev={prev}
          next={next}
          backLabel={
            channel.slug === "insights"
              ? "All investment insights"
              : `All ${channel.label.toLowerCase()}`
          }
        />
      )}
    </main>
  );
}
