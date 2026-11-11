import ContinueBar from "@/components/ContinueBar";
import HeroPhoto from "@/components/HeroPhoto";
import PageEnter from "@/components/PageEnter";
import ReviewSpot from "@/components/review/ReviewSpot";
import TeamRail from "@/components/TeamRail";
import { FIGURES } from "@/lib/figures";
import { FIRM } from "@/lib/firm";

/**
 * Home — mast → plane → directory → team rail.
 */
export default function Home() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <PageEnter>
      <section className="fv-hero">
        <div className="fv-hero__mast">
          <div className="fv-review-spots">
            <ReviewSpot id="argument" align="center" />
            <ReviewSpot id="voice-and-tone" align="center" />
            <ReviewSpot id="home" align="center" />
          </div>
          <h1 className="fv-hero__title" data-enter="0">
            We answer only to&nbsp;you.
          </h1>
          <p className="fv-hero__sub" data-enter="1">
            Most firms answer to a board, a bank, or an investor, so they have
            two mouths to feed: shareholders, then you. We built Fairview so we
            only have one boss.&nbsp;You.
          </p>
        </div>

        <div className="fv-hero__metrics" data-enter="2">
          <dl className="fv-hero__proof">
            <div className="fv-hero__proof-item">
              <dt className="fv-hero__proof-value fv-nums">
                {FIGURES.established.value}
              </dt>
              <dd className="fv-hero__proof-label">Founded</dd>
            </div>
            <div className="fv-hero__proof-item">
              <dt className="fv-hero__proof-value fv-nums">100%</dt>
              <dd className="fv-hero__proof-label">Employee-owned</dd>
            </div>
            <div className="fv-hero__proof-item">
              <dt
                className="fv-hero__proof-value fv-nums"
                aria-describedby="hero-aum-note"
              >
                {FIGURES.aum.value}
                <sup className="fv-hero__proof-star" aria-hidden="true">
                  *
                </sup>
              </dt>
              <dd className="fv-hero__proof-label">Client assets</dd>
            </div>
          </dl>
          <p id="hero-aum-note" className="fv-hero__proof-note">
            <span aria-hidden="true">* </span>
            Assets under management as of Sept 30, 2026.
          </p>
        </div>

        <div className="fv-hero__media" data-enter="3">
          <ReviewSpot id="photography" />
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
        </div>

        <div className="fv-home-rail">
          <TeamRail />
        </div>
      </div>
      </PageEnter>
    </main>
  );
}
