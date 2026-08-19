import type { Metadata } from "next";
import Link from "next/link";
import LearnTheme from "@/components/LearnTheme";
import ReviewSpot from "@/components/review/ReviewSpot";
import { listChannels } from "@/lib/learn/store";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Learn | Fairview Capital",
  description:
    "Not content. Not noise. Quarterly letters, investment insights, and planning — thoughtful reporting on wealth, markets, and life.",
  openGraph: {
    title: "What we think | Fairview Capital",
    description:
      "Quarterly letters, investment insights, and planning content from Fairview Capital.",
  },
};

export default async function LearnPage() {
  const channels = await listChannels();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "What we think",
    description:
      "Quarterly letters, investment insights, and planning content from Fairview Capital.",
    url: "https://www.fairviewcap.com/learn",
    isPartOf: {
      "@type": "WebSite",
      name: "Fairview Capital",
      url: "https://www.fairviewcap.com",
    },
    hasPart: channels.map((channel) => ({
      "@type": "CollectionPage",
      name: channel.title,
      description: channel.summary,
      url: `https://www.fairviewcap.com/learn/${channel.slug}`,
    })),
  };

  return (
    <main className="fv-learn-page pt-0">
      <LearnTheme />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="fv-learn-hero">
        <div className="fv-learn-hero__mast">
          <ReviewSpot id="learn" />
          <p className="fv-learn__folio">Learn</p>
          <h1 className="fv-learn__title">What we think.</h1>
          <p className="fv-learn__lede">
            Not content. Not noise. Just thoughtful reporting on wealth,
            markets, and life.
          </p>
        </div>
      </header>

      <ol className="fv-learn__posters">
        {channels.map((channel) => (
          <li
            key={channel.slug}
            className={`fv-learn__poster fv-learn__poster--${channel.tone}`}
          >
            <Link
              href={`/learn/${channel.slug}`}
              className="fv-learn__poster-link"
            >
              {channel.poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={channel.poster}
                  alt=""
                  className="fv-learn__poster-art"
                />
              ) : (
                <span className="fv-learn__poster-ph" aria-hidden>
                  Photograph
                </span>
              )}
              <span className="fv-learn__poster-copy">
                <h2 className="fv-learn__poster-title">{channel.label}</h2>
                <p className="fv-learn__poster-dek">{channel.dek}</p>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
