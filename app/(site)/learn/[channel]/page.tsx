import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatLearnDate,
  getArticlesByChannel,
  getChannel,
  listChannels,
} from "@/lib/learn/store";

type Props = { params: Promise<{ channel: string }> };

export async function generateStaticParams() {
  const channels = await listChannels();
  return channels.map((c) => ({ channel: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { channel: slug } = await params;
  const channel = await getChannel(slug);
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

export default async function LearnChannelPage({ params }: Props) {
  const { channel: slug } = await params;
  const channels = await listChannels();
  const channel = channels.find((c) => c.slug === slug);
  if (!channel) notFound();

  const articles = await getArticlesByChannel(slug);
  const index = String(channels.findIndex((c) => c.slug === slug) + 1).padStart(
    2,
    "0",
  );

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
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="fv-learn-index">
        <nav className="fv-learn-index__crumb" aria-label="Breadcrumb">
          <Link href="/learn">Learn</Link>
          <span aria-hidden>/</span>
          <span>{channel.label}</span>
        </nav>

        <header className="fv-learn-index__intro">
          <p className="fv-learn__eyebrow">
            <span className="fv-learn-index__num">{index}</span> {channel.label}
          </p>
          <h1 className="fv-learn-index__title">{channel.title}</h1>
          <p className="fv-learn-index__lede">{channel.summary}</p>
        </header>

        <div
          className={`fv-learn-index__band fv-learn-index__band--${channel.tone}`}
          aria-hidden
        >
          {channel.slug === "insights" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/photography/learn/fv-bad-ben.avif"
              alt=""
              width={614}
              height={614}
              className="fv-learn-index__band-art"
              decoding="async"
            />
          ) : null}
        </div>

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
    </main>
  );
}
