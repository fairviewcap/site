import type { Metadata } from "next";
import Link from "next/link";
import { LEARN_CHANNELS } from "@/lib/learn/content";

export const metadata: Metadata = {
  title: "Learn | Fairview Capital",
  description:
    "Not content. Not noise. Quarterly letters, investment insights, and planning — thoughtful reporting on wealth, markets, and life.",
  openGraph: {
    title: "What We Think | Fairview Capital",
    description:
      "Quarterly letters, investment insights, and planning content from Fairview Capital.",
  },
};

const INDEX = ["01", "02", "03"] as const;

export default function LearnPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "What We Think",
    description:
      "Quarterly letters, investment insights, and planning content from Fairview Capital.",
    url: "https://www.fairviewcap.com/learn",
    isPartOf: {
      "@type": "WebSite",
      name: "Fairview Capital",
      url: "https://www.fairviewcap.com",
    },
    hasPart: LEARN_CHANNELS.map((channel) => ({
      "@type": "CollectionPage",
      name: channel.title,
      description: channel.summary,
      url: `https://www.fairviewcap.com/learn/${channel.slug}`,
    })),
  };

  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="fv-learn-hero">
        <div className="fv-learn-hero__mast">
          <p className="fv-learn__eyebrow">Learn</p>
          <h1 className="fv-learn__title">What We Think.</h1>
          <p className="fv-learn__lede">
            Not content. Not noise. Just thoughtful reporting on wealth,
            markets, and life.
          </p>
        </div>
      </header>

      <div className="fv-frame pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="fv-learn">
          <ol className="fv-learn__channels">
            {LEARN_CHANNELS.map((channel, i) => (
              <li
                key={channel.slug}
                className={`fv-learn__channel fv-learn__channel--${channel.tone}`}
              >
                <Link
                  href={`/learn/${channel.slug}`}
                  className="fv-learn__channel-link"
                >
                  <div className="fv-learn__channel-copy">
                    <span className="fv-learn__channel-index" aria-hidden>
                      {INDEX[i]}
                    </span>
                    <div>
                      <h2 className="fv-learn__channel-title">
                        {channel.title}
                      </h2>
                      <p className="fv-learn__channel-dek">{channel.dek}</p>
                      <span className="fv-learn__channel-cta">Explore</span>
                    </div>
                  </div>
                  <div className="fv-learn__channel-plate" aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}
