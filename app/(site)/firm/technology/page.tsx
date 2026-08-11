import type { Metadata } from "next";
import ContinueBar from "@/components/ContinueBar";
import HeroPhoto from "@/components/HeroPhoto";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Technology | Fairview Capital",
  description:
    "Tools change. Judgment doesn't. We use technology — including AI — to see further, never to decide for you.",
};

export default function TechnologyPage() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <header className="fv-tech-hero">
        <div className="fv-tech-hero__mast">
          <p className="fv-tech__eyebrow">Technology</p>
          <h1 className="fv-tech__title">
            Tools change.
            <br />
            Judgment doesn&apos;t.
          </h1>
          <p className="fv-tech__lede">
            No machine can understand your values, weigh your trade-offs, or
            guide your family through life&apos;s most personal decisions.
          </p>
        </div>

        <figure className="fv-tech-hero__media">
          <div className="fv-tech-hero__plane">
            <HeroPhoto id="zoom" priority imgClassName="fv-hero-photo" />
          </div>
        </figure>
      </header>

      <div className="fv-frame pt-12 pb-20 sm:pt-16 sm:pb-28">
        <article className="fv-tech">
          <div className="fv-tech__body">
            <p>
              We use technology — including AI — to run deeper analysis,
              stress-test more scenarios, and give you a clearer picture of
              where you stand. It saves time and cuts out friction that used to
              slow planning down.
            </p>
            <p>
              What it can&apos;t do is replace judgment. A model can show you
              the range of outcomes. It can&apos;t tell you which one is right
              for your family, or sit across the table when the decision
              actually gets made.
            </p>
            <p>
              We&apos;ve held to the same principle since 1995: use whatever
              helps us see further, never let it decide for you.
            </p>
          </div>

          <ContinueBar
            items={[
              {
                href: "/firm/answers",
                prompt: "Curious how we talk about AI and the tools clients use?",
              },
              {
                href: "/work/wealth-management",
                prompt: "Want to see how the day-to-day work actually runs?",
              },
              {
                href: FIRM.contactHref,
                prompt: "Ready to talk through your situation?",
              },
            ]}
          />
        </article>
      </div>
    </main>
  );
}
