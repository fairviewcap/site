import type { Metadata } from "next";
import ContinueBar from "@/components/ContinueBar";
import LearnStage from "@/components/LearnStage";
import LearnTheme from "@/components/LearnTheme";
import ReviewSpot from "@/components/review/ReviewSpot";
import { FIRM } from "@/lib/firm";
import { listChannels } from "@/lib/learn/store";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Learn | Fairview Capital",
  description:
    "Not content. Not noise. Quarterly letters and investment insights. Thoughtful reporting on wealth and markets.",
  openGraph: {
    title: "What we think | Fairview Capital",
    description:
      "Quarterly letters and investment insights from Fairview Capital.",
  },
};

export default async function LearnPage() {
  const channels = await listChannels();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "What we think",
    description:
      "Quarterly letters and investment insights from Fairview Capital.",
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
          <h1 className="fv-learn__title">What we think.</h1>
          <p className="fv-learn__lede">
            Not content. Not noise.
            <br />
            Just thoughtful reporting on wealth, markets, and life.
          </p>
        </div>
      </header>

      <LearnStage channels={channels} />

      <div className="fv-frame pt-12 pb-20 sm:pt-16 sm:pb-24">
        <ContinueBar
          items={[
            {
              href: "/team",
              prompt: "Want to meet the people who do the work?",
            },
            {
              href: "/work/wealth-management",
              prompt: "Curious how the day-to-day work actually runs?",
            },
            {
              href: FIRM.contactHref,
              prompt: "Ready to talk through your situation?",
            },
          ]}
        />
      </div>
    </main>
  );
}
