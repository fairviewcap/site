import type { Metadata } from "next";
import Link from "next/link";
import ContinueBar from "@/components/ContinueBar";
import HeroPhoto from "@/components/HeroPhoto";
import ImBookSleeves from "@/components/ImBookSleeves";
import ImEquityStep, {
  ImEquitySteps,
  type EquityStepId,
} from "@/components/ImEquityStep";
import PageEnter from "@/components/PageEnter";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Investment Management | Fairview Capital",
  description:
    "A ticker is just a string of letters. We buy what's underneath it — 25 to 30 deeply researched companies built on five-year models, direct due diligence, and simple arithmetic.",
};

const EQUITY_PROCESS: {
  index: string;
  title: string;
  diagram: EquityStepId;
  body: string;
}[] = [
  {
    index: "01",
    title: "In-house assessment",
    diagram: "assess",
    body: "Before investing, we conduct extensive assessments of each company's business, management, and markets.",
  },
  {
    index: "02",
    title: "Five-year projections",
    diagram: "project",
    body: "We build detailed five-year financial projections for every holding. We continuously monitor and update them, aiming to understand how the company will be competing and performing far into the future.",
  },
  {
    index: "03",
    title: "Direct research",
    diagram: "research",
    body: "Our research includes meetings with company management, industry experts, and other research analysts.",
  },
  {
    index: "04",
    title: "Disciplined valuation",
    diagram: "value",
    body: "We undertake a rigorous valuation analysis of each company, comparing it against the overall market and its peers, with a focus on current prices relative to earnings and cash flow quality and growth.",
  },
];

const THEMES: { title: string; photo: string }[] = [
  {
    title: "Artificial Intelligence",
    photo: "/photography/investment-themes/artificial-intelligence.avif",
  },
  {
    title: "Electrification of the economy",
    photo: "/photography/investment-themes/electrification.avif",
  },
  {
    title: "Climate trends",
    photo: "/photography/investment-themes/climate-trends.avif",
  },
  {
    title: "Aging demographics",
    photo: "/photography/investment-themes/aging-demographics.avif",
  },
  {
    title: "Water infrastructure",
    photo: "/photography/investment-themes/water-infrastructure.avif",
  },
  {
    title: "Live and unique media content",
    photo: "/photography/investment-themes/live-media.avif",
  },
];

export default function InvestmentManagementPage() {
  return (
    <main className="fv-im-page bg-[var(--fv-bg)] pt-0">
      <PageEnter>
        <header className="fv-wm-hero">
          <div className="fv-wm-hero__mast">
            <p className="fv-wm__eyebrow" data-enter="0">
              Investment Management
            </p>
            <h1 className="fv-wm__title" data-enter="1">
              A ticker is just a string of letters. We buy what&apos;s
              underneath it.
            </h1>
            <p className="fv-wm__lede" data-enter="2">
              25 to 30 deeply researched companies—built on five-year financial
              models, direct due diligence, and simple arithmetic, not
              short-term market guesses.
            </p>
          </div>

          <figure className="fv-wm-hero__media" data-enter="3">
            <div className="fv-wm-hero__plane">
              <HeroPhoto id="piano" priority imgClassName="fv-hero-photo" />
            </div>
          </figure>
        </header>

        <div className="fv-frame pt-12 pb-20 sm:pt-16 sm:pb-28">
          <article className="fv-wm">
            <section
              className="fv-wm__section fv-wm__section--first fv-wm__section--center"
              aria-labelledby="im-equity"
              data-enter="4"
            >
            <h2
              id="im-equity"
              className="fv-wm__section-title fv-wm__section-title--center"
            >
              Our core equity strategy
            </h2>
            <div className="fv-wm__prose">
              <p>
                Our objective is simple: grow and preserve capital by generating
                long-term compounded returns that exceed broad equity market
                averages. We do this by participating in rising markets and
                outperforming when markets decline. Every account is
                custom-tailored to align with your time horizon, risk profile,
                and unique circumstances and needs.
              </p>
              <p>
                Our model equity portfolio is a diversified collection of
                deeply researched, best-in-class businesses with visible and
                durable strengths.
              </p>
            </div>

            <ImEquitySteps>
              {EQUITY_PROCESS.map((step, i) => (
                <li key={step.index} className="fv-im-step">
                  <figure className="fv-im-step__media">
                    <div className="fv-im-step__plane">
                      <ImEquityStep id={step.diagram} index={i} />
                    </div>
                  </figure>
                  <div className="fv-im-step__copy">
                    <p className="fv-wm__pillar-index" aria-hidden>
                      {step.index}
                    </p>
                    <h3 className="fv-wm__pillar-title">{step.title}</h3>
                    <p className="fv-wm__pillar-body">{step.body}</p>
                  </div>
                </li>
              ))}
            </ImEquitySteps>
          </section>

          <section
            className="fv-wm__section fv-wm__section--center"
            aria-labelledby="im-macro"
          >
            <h2
              id="im-macro"
              className="fv-wm__section-title fv-wm__section-title--center"
            >
              Macro trends &amp; economic scenarios
            </h2>
            <div className="fv-wm__prose">
              <p>
                We study and assess the broader economic and geopolitical
                environment to shape our outlook on key investment
                factors—including GDP, inflation, employment, interest rates,
                currency, monetary policy, and fiscal trends.
              </p>
              <p>
                We recognize that this is an inexact science, and that most
                economists are more often wrong than right. At any point in
                time, divergent outcomes can carry reasonably high
                probabilities. Accordingly, we seek to identify and understand
                all possible scenarios—positioning our portfolios to diversify
                and benefit from opportunities, while also mitigating risks.
              </p>
            </div>

            <figure className="fv-im-macro__media">
              <div className="fv-im-macro__plane">
                <picture>
                  <source
                    media="(min-width: 768px)"
                    srcSet="/photography/investment-management/macro-h.avif"
                    type="image/avif"
                    width={2400}
                    height={1200}
                  />
                  <img
                    src="/photography/investment-management/macro-v.avif"
                    alt="A cargo ship on open water, storm to one side and light to the other."
                    width={1600}
                    height={2000}
                    className="fv-hero-photo"
                    decoding="async"
                    loading="lazy"
                  />
                </picture>
              </div>
            </figure>
          </section>

          <section
            className="fv-wm__section fv-wm__section--center"
            aria-labelledby="im-themes"
          >
            <h2
              id="im-themes"
              className="fv-wm__section-title fv-wm__section-title--center"
            >
              Long-term investment themes
            </h2>
            <div className="fv-wm__prose">
              <p>
                We also focus on major trends in the economy and society to find
                attractive, sustainable investment themes. We invest in
                companies well positioned to address and benefit from themes
                such as:
              </p>
            </div>

            <ul className="fv-im-themes">
              {THEMES.map((theme, i) => {
                const index = String(i + 1).padStart(2, "0");
                return (
                  <li key={theme.title} className="fv-im-themes__card">
                    <figure className="fv-im-themes__face">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={theme.photo}
                        alt=""
                        width={1200}
                        height={1200}
                        className="fv-im-themes__img"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="fv-im-themes__shade" aria-hidden />
                      <figcaption className="fv-im-themes__meta">
                        <span className="fv-im-themes__index">{index}</span>
                        <span className="fv-im-themes__title">{theme.title}</span>
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>

            <div className="fv-wm__prose fv-wm__prose--follow">
              <p>
                We also consider the need to preserve purchasing power for
                dollar-denominated clients, investing in companies with hard
                assets, pricing power, and significant exports.
              </p>
            </div>
          </section>

          <section
            className="fv-wm__section fv-wm__section--center"
            aria-labelledby="im-impl"
          >
            <h2
              id="im-impl"
              className="fv-wm__section-title fv-wm__section-title--center"
            >
              Portfolio implementation
            </h2>
            <div className="fv-wm__prose">
              <p>
                Guided by our macro research and relative valuations, we form an
                investment view and set strategic weightings for each of the
                eleven S&amp;P 500 industry sectors, and many sub-sectors. We
                then identify and select only the best companies within each
                sector, based on long-term risk and return profile, for
                inclusion in our model portfolio. Ultimately, all client
                portfolios are diversified and positioned to generate
                attractive, risk-adjusted returns over the long term.
              </p>
            </div>

            <ImBookSleeves />
          </section>

          <section
            className="fv-wm__section fv-wm__section--close fv-wm__section--center"
            aria-labelledby="im-close"
          >
            <h2
              id="im-close"
              className="fv-wm__section-title fv-wm__section-title--center"
            >
              Several futures.
              <br />
              One careful portfolio.
            </h2>
            <figure className="fv-im-impl__media">
              <div className="fv-wm-hero__plane">
                <HeroPhoto id="zoom" imgClassName="fv-hero-photo" />
              </div>
            </figure>
            <div className="fv-wm__prose fv-im-impl__close">
              <p>
                If you want research that prepares for more than one
                outcome—we&apos;re easy to reach.
              </p>
            </div>
            <Link href={FIRM.contactHref} className="fv-wm__cta">
              Let&apos;s talk
            </Link>
          </section>

          <ContinueBar
            items={[
              {
                href: "/work/wealth-management",
                prompt: "Curious how planning and portfolio fit together?",
              },
              {
                href: "/firm/fees",
                prompt: "Want the fee schedule in plain numbers?",
              },
              {
                href: FIRM.contactHref,
                prompt: "Ready to talk through your family's situation?",
              },
            ]}
          />
          </article>
        </div>
      </PageEnter>
    </main>
  );
}
