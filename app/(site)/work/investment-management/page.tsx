import type { Metadata } from "next";
import Link from "next/link";
import ContinueBar from "@/components/ContinueBar";
import HeroPhoto from "@/components/HeroPhoto";
import HoldingsExhibit from "@/components/HoldingsExhibit";
import { FIRM } from "@/lib/firm";
import type { HeroId } from "@/lib/heroes";

export const metadata: Metadata = {
  title: "Investment Management | Fairview Capital",
  description:
    "We don't predict the future. We prepare for several of them — 25 to 30 deeply researched companies built on five-year models, direct due diligence, and simple arithmetic.",
};

const EQUITY_PROCESS = [
  {
    index: "01",
    title: "In-house assessment",
    body: "Before investing, we conduct extensive assessments of each company’s business, management, and markets.",
  },
  {
    index: "02",
    title: "Five-year projections",
    body: "We build detailed five-year financial projections for every holding. We continuously monitor and update them, aiming to understand how the company will be competing and performing far into the future.",
  },
  {
    index: "03",
    title: "Direct research",
    body: "Our research includes meetings with company management, industry experts, and other research analysts.",
  },
  {
    index: "04",
    title: "Disciplined valuation",
    body: "We undertake a rigorous valuation analysis of each company, comparing it against the overall market and its peers, with a focus on current prices relative to earnings and cash flow quality and growth.",
  },
] as const;

const THEMES = [
  "Artificial Intelligence (AI)",
  "Electrification of the economy",
  "Climate trends",
  "Aging demographics",
  "Water infrastructure",
  "Live and unique media content",
] as const;

const ALLOCATIONS = [
  "Our core stock holdings",
  "Domestic equity ETFs",
  "International ETFs",
  "Fixed income ETFs",
  "Alternative assets",
] as const;

function ImMedia({
  hero,
  label,
  ratio = "wide",
}: {
  hero: HeroId;
  label: string;
  ratio?: "wide" | "tall";
}) {
  return (
    <figure className={`fv-wm__media fv-wm__media--${ratio}`}>
      <div className="fv-wm__media-plane">
        <HeroPhoto
          id={hero}
          variant={ratio === "tall" ? "tall" : "wide"}
          imgClassName="fv-hero-photo"
        />
      </div>
      <figcaption className="fv-wm__media-cap">
        <span className="fv-wm__media-label">{label}</span>
      </figcaption>
    </figure>
  );
}

export default function InvestmentManagementPage() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <header className="fv-wm-hero">
        <div className="fv-wm-hero__mast">
          <p className="fv-wm__eyebrow">Investment Management</p>
          <h1 className="fv-wm__title">
            We don&apos;t predict the future. We prepare for several of them.
          </h1>
          <p className="fv-wm__lede">
            25 to 30 deeply researched companies—built on five-year financial
            models, direct due diligence, and simple arithmetic, not short-term
            market guesses.
          </p>
        </div>

        <figure className="fv-wm-hero__media">
          <div className="fv-wm-hero__plane">
            <HeroPhoto id="piano" priority imgClassName="fv-hero-photo" />
          </div>
        </figure>
      </header>

      <div className="fv-frame pt-12 pb-20 sm:pt-16 sm:pb-28">
        <article className="fv-wm">
          <section
            className="fv-wm__section fv-wm__section--first"
            aria-labelledby="im-how"
          >
            <h2 id="im-how" className="fv-wm__section-title">
              How we invest
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
            </div>

            <figure className="fv-im-ideas" aria-label="Ideas come from everywhere">
              <div className="fv-im-ideas__plane">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photography/im/ideation-rail.png"
                  alt="Research sources we draw on — filings, letters, and long-form reporting"
                  className="fv-im-ideas__img"
                />
              </div>
              <figcaption className="fv-im-ideas__cap">
                <span className="fv-im-ideas__label">Ideation</span>
                <span className="fv-im-ideas__hint">
                  Ideas come from everywhere. Placeholder rail.
                </span>
              </figcaption>
            </figure>
          </section>

          <section className="fv-wm__section" aria-labelledby="im-equity">
            <h2 id="im-equity" className="fv-wm__section-title">
              Our core equity strategy
            </h2>
            <div className="fv-wm__prose">
              <p>
                A ticker is just a string of letters. We buy what&apos;s
                underneath it.
              </p>
              <p>
                Our model equity portfolio is a diversified collection of 25 to
                30 deeply researched, best-in-class businesses with visible and
                durable strengths.
              </p>
            </div>

            <ol className="fv-wm__schedule">
              {EQUITY_PROCESS.map((step) => (
                <li key={step.index} className="fv-wm__row">
                  <span className="fv-wm__index" aria-hidden>
                    {step.index}
                  </span>
                  <span className="fv-wm__rule" aria-hidden />
                  <div className="fv-wm__row-body">
                    <h3 className="fv-wm__pillar-title">{step.title}</h3>
                    <p className="fv-wm__pillar-body">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <HoldingsExhibit />
          </section>

          <section className="fv-wm__section" aria-labelledby="im-macro">
            <h2 id="im-macro" className="fv-wm__section-title">
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

            <ImMedia hero="redwoods" label="Long horizons" />
          </section>

          <section className="fv-wm__section" aria-labelledby="im-themes">
            <h2 id="im-themes" className="fv-wm__section-title">
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

            <ul className="fv-wm__ledger">
              {THEMES.map((theme) => (
                <li key={theme} className="fv-wm__ledger-item">
                  {theme}
                </li>
              ))}
            </ul>

            <div className="fv-wm__prose fv-wm__prose--follow">
              <p>
                We also consider the need to preserve purchasing power for
                dollar-denominated clients, investing in companies with hard
                assets, pricing power, and significant exports.
              </p>
            </div>
          </section>

          <section className="fv-wm__section" aria-labelledby="im-impl">
            <h2 id="im-impl" className="fv-wm__section-title">
              Portfolio implementation
            </h2>
            <div className="fv-wm__prose">
              <p>
                Guided by our macro research and relative valuations, we form an
                investment view and set strategic weightings for each of the
                eleven S&amp;P 500 industry sectors, and many sub-sectors. We
                then identify and select only the best companies within each
                sector, based on long-term risk and return profile, for
                inclusion in our model portfolio.
              </p>
              <p>
                Depending on your profile, needs, and objectives, we allocate
                funds across:
              </p>
            </div>

            <ul className="fv-wm__ledger">
              {ALLOCATIONS.map((item) => (
                <li key={item} className="fv-wm__ledger-item">
                  {item}
                </li>
              ))}
            </ul>

            <div className="fv-wm__prose fv-wm__prose--follow">
              <p>
                Ultimately, all client portfolios are diversified and positioned
                to generate attractive, risk-adjusted returns over the long
                term.
              </p>
            </div>
          </section>

          <section
            className="fv-wm__section fv-wm__section--close"
            aria-labelledby="im-close"
          >
            <h2 id="im-close" className="fv-wm__section-title">
              Several futures. One careful portfolio.
            </h2>
            <div className="fv-wm__prose">
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
    </main>
  );
}
