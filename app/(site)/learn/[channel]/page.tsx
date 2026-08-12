import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LettersCarousel from "@/components/LettersCarousel";
import {
  estimateReadMinutes,
  formatLearnDate,
  getArticlesByChannel,
  isLearnNote,
  listChannels,
} from "@/lib/learn/store";
import type { LearnArticle, LearnChannel } from "@/lib/learn/types";

export const revalidate = 3600;

type Props = { params: Promise<{ channel: string }> };

export async function generateStaticParams() {
  const channels = await listChannels();
  return channels.map((c) => ({ channel: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { channel: slug } = await params;
  const channels = await listChannels();
  const channel = channels.find((c) => c.slug === slug);
  if (!channel) return {};
  return {
    title: `${channel.title} | Fairview Capital`,
    description: channel.summary,
    openGraph: {
      title: `${channel.title} | Fairview Capital`,
      description: channel.summary,
    },
  };
}

function LettersIndex({
  channel,
  articles,
}: {
  channel: LearnChannel;
  articles: LearnArticle[];
}) {
  return (
    <div className="fv-letters">
      <header className="fv-letters__mast">
        <nav className="fv-learn-index__crumb" aria-label="Breadcrumb">
          <Link href="/learn">Learn</Link>
          <span aria-hidden>/</span>
          <span>{channel.label}</span>
        </nav>
        <h1 className="fv-letters__title">Quarterly Letters</h1>
      </header>

      <LettersCarousel channelSlug={channel.slug} articles={articles} />
    </div>
  );
}

function InsightsIndex({
  channel,
  articles,
}: {
  channel: LearnChannel;
  articles: LearnArticle[];
}) {
  const count = articles.length;

  return (
    <div className="fv-insights">
      <nav className="fv-learn-index__crumb" aria-label="Breadcrumb">
        <Link href="/learn">Learn</Link>
        <span aria-hidden>/</span>
        <span>{channel.label}</span>
      </nav>

      <header className="fv-insights__mast">
        <h1 className="fv-insights__title">{channel.headline}</h1>
        <p className="fv-insights__lede">{channel.dek}</p>
        {count > 0 ? (
          <p className="fv-insights__file">
            <span>{String(count).padStart(2, "0")} entries</span>
          </p>
        ) : null}
      </header>

      <ol className="fv-insights__grid">
        {articles.map((article, i) => {
          const issueNo = String(i + 1).padStart(2, "0");
          const minutes = estimateReadMinutes(article.body);
          const longTitle = article.title.length > 42;
          return (
            <li key={article.slug} className="fv-insights__card">
              <Link
                href={`/learn/${channel.slug}/${article.slug}`}
                className="fv-insights__link"
              >
                <div
                  className={
                    longTitle
                      ? "fv-insights__plate fv-insights__plate--long"
                      : "fv-insights__plate"
                  }
                >
                  <span className="fv-insights__issue" aria-hidden>
                    {issueNo}
                  </span>
                  <h2 className="fv-insights__headline">{article.title}</h2>
                  <div className="fv-insights__plate-foot">
                    <span className="fv-insights__mins">{minutes} min</span>
                  </div>
                </div>
                <div className="fv-insights__below">
                  <p className="fv-insights__excerpt">{article.excerpt}</p>
                  {isLearnNote(article) ? (
                    <span className="fv-insights__tier">Note</span>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      {articles.length === 0 ? (
        <p className="fv-learn-index__empty">Pieces are on the way.</p>
      ) : null}
    </div>
  );
}

function PlanningIndex({
  channel,
  articles,
}: {
  channel: LearnChannel;
  articles: LearnArticle[];
}) {
  return (
    <div className="fv-planning">
      <nav className="fv-learn-index__crumb" aria-label="Breadcrumb">
        <Link href="/learn">Learn</Link>
        <span aria-hidden>/</span>
        <span>{channel.label}</span>
      </nav>

      <header className="fv-planning__mast">
        <h1 className="fv-planning__title">{channel.headline}</h1>
        <p className="fv-planning__lede">{channel.dek}</p>
      </header>

      <ol className="fv-planning__list">
        {articles.map((article) => {
          const minutes = estimateReadMinutes(article.body);
          return (
            <li key={article.slug} className="fv-planning__row">
              <Link
                href={`/learn/${channel.slug}/${article.slug}`}
                className="fv-planning__link"
              >
                <div className="fv-planning__meta">
                  <span className="fv-planning__read">{minutes} min read</span>
                </div>
                <div className="fv-planning__copy">
                  <h2 className="fv-planning__headline">{article.title}</h2>
                  <p className="fv-planning__excerpt">{article.excerpt}</p>
                  {isLearnNote(article) ? (
                    <span className="fv-planning__tier">Note</span>
                  ) : null}
                </div>
              </Link>
            </li>
          );
        })}
      </ol>

      {articles.length === 0 ? (
        <p className="fv-learn-index__empty">Pieces are on the way.</p>
      ) : null}
    </div>
  );
}

function DefaultIndex({
  channel,
  articles,
}: {
  channel: LearnChannel;
  articles: LearnArticle[];
}) {
  return (
    <div className="fv-learn-index">
      <nav className="fv-learn-index__crumb" aria-label="Breadcrumb">
        <Link href="/learn">Learn</Link>
        <span aria-hidden>/</span>
        <span>{channel.label}</span>
      </nav>

      <header className="fv-learn-index__intro">
        <h1 className="fv-learn-index__title">{channel.title}</h1>
        <p className="fv-learn-index__lede">{channel.summary}</p>
      </header>

      <div
        className={`fv-learn-index__band fv-learn-index__band--${channel.tone}`}
        aria-hidden
      />

      <ol className="fv-learn-index__list">
        {articles.map((article) => (
          <li key={article.slug} className="fv-learn-index__row">
            <Link
              href={`/learn/${channel.slug}/${article.slug}`}
              className="fv-learn-index__link"
            >
              <div className="fv-learn-index__meta">
                <time dateTime={article.date} className="fv-learn-index__date">
                  {formatLearnDate(article.date)}
                </time>
                {article.issue ? (
                  <span className="fv-learn-index__issue">{article.issue}</span>
                ) : null}
              </div>
              <h2 className="fv-learn-index__headline">{article.title}</h2>
              <p className="fv-learn-index__excerpt">{article.excerpt}</p>
              <span className="fv-learn-index__read">Read</span>
            </Link>
          </li>
        ))}
      </ol>

      {articles.length === 0 ? (
        <p className="fv-learn-index__empty">Pieces are on the way.</p>
      ) : null}
    </div>
  );
}

export default async function LearnChannelPage({ params }: Props) {
  const { channel: slug } = await params;
  const channels = await listChannels();
  const channel = channels.find((c) => c.slug === slug);
  if (!channel) notFound();

  const articles = await getArticlesByChannel(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: channel.title,
    description: channel.summary,
    url: `https://www.fairviewcap.com/learn/${channel.slug}`,
    hasPart: articles.map((article) => ({
      "@type": "Article",
      headline: article.title,
      datePublished: article.date,
      description: article.excerpt,
      url: `https://www.fairviewcap.com/learn/${channel.slug}/${article.slug}`,
    })),
  };

  return (
    <main
      className={
        channel.slug === "letters"
          ? "fv-letters-page bg-[var(--fv-bg)]"
          : "fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28"
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {channel.slug === "letters" ? (
        <LettersIndex channel={channel} articles={articles} />
      ) : channel.slug === "insights" ? (
        <InsightsIndex channel={channel} articles={articles} />
      ) : channel.slug === "planning" ? (
        <PlanningIndex channel={channel} articles={articles} />
      ) : (
        <DefaultIndex channel={channel} articles={articles} />
      )}
    </main>
  );
}
