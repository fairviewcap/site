import type { Metadata } from "next";
import Link from "next/link";
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

const INDEX = ["01", "02", "03"] as const;

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
    <main className="bg-[var(--fv-bg)] pt-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="fv-learn-hero">
        <div className="fv-learn-hero__mast">
          <h1 className="fv-learn__title">What we think.</h1>
          <p className="fv-learn__lede">
            Not content. Not noise. Just thoughtful reporting on wealth,
            markets, and life.
          </p>
        </div>
      </header>

      <div className="fv-frame pt-8 pb-20 sm:pt-10 sm:pb-28">
        <div className="fv-learn">
          <ol className="fv-learn__channels">
            {channels.map((channel, i) => (
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
                  <div className="fv-learn__channel-plate" aria-hidden>
                    {channel.slug === "letters" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="/photography/heroes/fv-hero-redwoods-v.avif"
                        alt=""
                        width={800}
                        height={1000}
                        className="fv-learn__channel-art"
                        decoding="async"
                      />
                    ) : channel.slug === "insights" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="/photography/learn/fv-bad-ben.avif"
                        alt=""
                        width={614}
                        height={614}
                        className="fv-learn__channel-art"
                        decoding="async"
                      />
                    ) : channel.slug === "planning" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="/photography/heroes/fv-hero-grandma-v.avif"
                        alt=""
                        width={800}
                        height={1000}
                        className="fv-learn__channel-art"
                        decoding="async"
                      />
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}
