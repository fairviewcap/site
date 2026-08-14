import ContinueBar from "@/components/ContinueBar";
import HeroPhoto from "@/components/HeroPhoto";
import HomeAnswersSearch from "@/components/HomeAnswersSearch";
import PageEnter from "@/components/PageEnter";
import TeamRail from "@/components/TeamRail";
import { FIGURES } from "@/lib/figures";
import { FIRM, yearsSinceFounded } from "@/lib/firm";

/**
 * Home — mast → plane → directory → team rail.
 */
export default function Home() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <PageEnter>
      <section className="fv-hero">
        <div className="fv-hero__mast">
          <h1 className="fv-hero__title" data-enter="0">
            Most firms answer to a board, a bank, or a buyer. Ours answers to
            the phone ringing.
          </h1>
          <p className="fv-hero__sub" data-enter="1">
            When a firm serves outside owners, they have two mouths to
            feed—shareholders, then you. We built Fairview so we only have one
            boss. You.
          </p>
          <p className="fv-hero__proof" data-enter="2">
            We started Fairview in{" "}
            <span className="fv-nums">{FIGURES.established.value}</span>.{" "}
            <span className="fv-nums">{yearsSinceFounded()}</span> years
            later, the people who run the firm own all of it.{" "}
            <span className="fv-nums">{FIGURES.aum.value}</span> under
            management, as of March 2026.
          </p>
        </div>

        <div className="fv-hero__media" data-enter="3">
          <HeroPhoto id="grandma" priority imgClassName="fv-hero__img" />
        </div>
      </section>

      <div className="fv-frame pb-20 sm:pb-28">
        <div className="fv-home-dir" data-enter="4">
          <ContinueBar
            label="Start here"
            items={[
              {
                href: "/firm/why-fairview",
                prompt: "Why Fairview",
              },
              {
                href: "/firm/fees",
                prompt: "What you pay, in plain numbers",
              },
              {
                href: "/work/wealth-management",
                prompt: "How we actually manage your money",
              },
              {
                href: "/work/investment-management",
                prompt: "How we manage portfolios in-house",
              },
              {
                href: "/team",
                prompt: "Who picks up",
              },
              {
                href: FIRM.contactHref,
                prompt: "When you're ready, we're easy to reach",
              },
            ]}
          />

          <HomeAnswersSearch />
        </div>

        <div className="fv-home-rail">
          <TeamRail />
        </div>
      </div>
      </PageEnter>
    </main>
  );
}
