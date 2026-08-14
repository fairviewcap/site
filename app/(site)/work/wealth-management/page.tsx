import type { Metadata } from "next";
import Link from "next/link";
import ContinueBar from "@/components/ContinueBar";
import HeroPhoto from "@/components/HeroPhoto";
import LinkArrow from "@/components/LinkArrow";
import PageEnter from "@/components/PageEnter";
import WmAssetUnify from "@/components/WmAssetUnify";
import WmDomainsRail from "@/components/WmDomainsRail";
import WmIphoneMedia from "@/components/WmIphoneMedia";
import WmHorizonSwitch from "@/components/WmHorizonSwitch";
import WmLifeHorizon from "@/components/WmLifeHorizon";
import WmTwoFutures from "@/components/WmTwoFutures";
import WmPillarVisual, {
  type PillarDiagramId,
} from "@/components/WmPillarVisual";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Wealth Management | Fairview Capital",
  description:
    "Wealth used to mean well-being. Somewhere along the way, Wall Street redefined it to mean casino. Managing wealth isn't a series of bets and fees.",
};

const PILLARS: {
  index: string;
  title: string;
  diagram: PillarDiagramId;
  body: string;
}[] = [
  {
    index: "01",
    title: "Your Plan",
    diagram: "plan",
    body: "We start with your actual arithmetic: what you own, what you owe, what comes in, what goes out, what you give away, and what you intend to leave behind. That covers insurance, account titling, retirement, and education funding along the way — not separate projects, just part of the same picture. We don't use cookie-cutter templates. We build a practical blueprint, and we adjust it as your life changes.",
  },
  {
    index: "02",
    title: "Your Portfolio",
    diagram: "portfolio",
    body: "The plan comes first; the portfolio follows — a mix of stocks, bonds, alternative investments, and cash built around your plan, not a model. Every trade we make accounts for taxes, every company or fund we select is researched by our own team, and every account is reviewed by real people—never left on autopilot.",
  },
  {
    index: "03",
    title: "Your World",
    diagram: "world",
    body: "Your tax accountant, your estate lawyer, your trustee, and your philanthropic advisors shouldn't be operating in isolation. We coordinate directly with the professionals you already trust, so nothing falls through the cracks between them.",
  },
];

/** Planning domains — poster rail with art-directed heroes. */
const PLANNING_DOMAINS = [
  {
    title: "Investment Strategy",
    hero: "piano" as const,
    items: [
      "Investment selection",
      "Asset allocation",
      "Risk management",
      "Asset location",
    ],
  },
  {
    title: "Retirement Planning",
    hero: "grandma" as const,
    items: [
      "Retirement income planning",
      "Cash flow projections",
      "Benefits + Social Security",
      "Business succession planning",
    ],
  },
  {
    title: "Income & Tax",
    hero: "zoom" as const,
    items: [
      "Tax-efficient investing",
      "Withdrawal strategy",
      "Stock option advice",
      "Coordination with CPA",
    ],
  },
  {
    title: "Family",
    hero: "travel" as const,
    items: [
      "Family dynamics",
      "Life events",
      "Education funding",
      "Assisting parents + children",
      "Annual gifting",
    ],
  },
  {
    title: "Estate Planning",
    hero: "college" as const,
    items: [
      "Trusts",
      "Wills",
      "Intergenerational wealth transfer",
      "Coordination with estate attorney",
      "Philanthropic planning",
    ],
  },
  {
    title: "Insurance",
    hero: "hospital" as const,
    items: [
      "Insurance review",
      "Life",
      "Disability",
      "Long-term care",
      "Coordination with insurance specialist",
    ],
  },
] as const;

export default function WealthManagementPage() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <PageEnter>
        <header className="fv-wm-hero">
          <div className="fv-wm-hero__mast">
            <p className="fv-wm__eyebrow" data-enter="0">
              Wealth Management
            </p>
            <h1 className="fv-wm__title" data-enter="1">
              Wealth used to mean well-being. Somewhere along the way, Wall Street
              redefined it to mean casino.
            </h1>
            <p className="fv-wm__lede" data-enter="2">
              Managing wealth isn&apos;t a series of bets and fees. It&apos;s your
              entire financial life—your business, your taxes, your family, and
              your philanthropic legacy—all pulling in the same direction.
            </p>
          </div>

          <figure className="fv-wm-hero__media" data-enter="3">
            <div className="fv-wm-hero__plane">
              <HeroPhoto id="belongings" priority imgClassName="fv-hero-photo" />
            </div>
          </figure>
        </header>

        <div className="fv-frame pt-12 pb-20 sm:pt-16 sm:pb-28">
          <article className="fv-wm">
            <section
              className="fv-wm__section fv-wm__section--first"
              aria-labelledby="wm-pillars"
              data-enter="4"
            >
              <h2 id="wm-pillars" className="fv-wm__section-title">
                A balance sheet is a snapshot. We turn it into a plan.
              </h2>
              <p className="fv-wm__domains-lede">
                Planning, portfolios, and coordination — one picture, not three
                separate products.
              </p>

              <ul className="fv-wm__pillars">
                {PILLARS.map((pillar) => (
                  <li key={pillar.title} className="fv-wm__pillar">
                    <figure className="fv-wm__pillar-media">
                      <div className="fv-wm__pillar-plane">
                        <WmPillarVisual
                          id={pillar.diagram}
                          className="fv-wm__pillar-svg"
                        />
                      </div>
                    </figure>
                    <div className="fv-wm__pillar-copy">
                      <p className="fv-wm__pillar-index" aria-hidden>
                        {pillar.index}
                      </p>
                      <h3 className="fv-wm__pillar-title">{pillar.title}</h3>
                      <p className="fv-wm__pillar-body">{pillar.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section
              className="fv-wm__section fv-wm__section--domains"
              aria-labelledby="wm-domains"
            >
              <h2 id="wm-domains" className="fv-wm__section-title">
                Wealth planning is complex — and unique to every family.
              </h2>
              <p className="fv-wm__domains-lede">
                We guide the questions and the coordination that help a family
                reach its goals — across investments, taxes, estate, and the
                people in the middle.
              </p>
              <WmDomainsRail domains={PLANNING_DOMAINS} />
            </section>

            <section
              className="fv-wm__section"
              aria-labelledby="wm-relationship"
            >
              <h2 id="wm-relationship" className="fv-wm__section-title">
                The heavy lifting happens upfront. The judgment happens over
                decades.
              </h2>

              <WmHorizonSwitch />

              <div className="fv-wm__pair">
                <div className="fv-wm__pair-col">
                  <p className="fv-wm__pair-mark">Onboarding</p>
                  <p>
                    When you join Fairview, we take the paperwork, account
                    transfers, and administrative mess off your plate first. If
                    you arrive with existing holdings, we audit them
                    carefully—unwinding positions over time so you aren&apos;t
                    hit with an unnecessary tax bill. Our job is to give you
                    immediate clarity, not another chore to manage.
                  </p>
                </div>
                <div className="fv-wm__pair-col">
                  <p className="fv-wm__pair-mark">Stewardship</p>
                  <p>
                    After that, our job is staying close. As markets fluctuate,
                    families grow, and priorities shift, we keep track of the
                    details so you don&apos;t have to. We work with multiple
                    generations of your family — inheritance decisions, tax
                    strategy, a piece of real estate nobody wants to be the one
                    to sell — to ensure smooth transitions across decades.
                    Sometimes that means months of quiet research; sometimes
                    it&apos;s a five-minute phone call. Either way, you&apos;ll
                    always know where you stand.
                  </p>
                </div>
              </div>
            </section>

            <section className="fv-wm__section" aria-labelledby="wm-tech">
              <h2 id="wm-tech" className="fv-wm__section-title">
                Computers draw straight lines into the future. Real markets
                don&apos;t.
              </h2>
              <div className="fv-wm__prose">
                <p>
                  We use software to stress-test your plan against bad markets,
                  rising taxes, and unexpected events—not to draw straight lines
                  pointing upward. Through a secure portal, you can view — and
                  update — your entire financial picture in real time, including
                  the assets we don&apos;t manage.
                </p>
                <p>
                  Some of our clients like to inspect every line item and stress
                  test. Others just want the summary. We design your reporting
                  around what you actually want to see.
                </p>
              </div>

              <WmTwoFutures />

              <p className="fv-wm__tech-more">
                <Link href="/firm/technology" className="fv-wm__more">
                  More on how we use technology
                  <LinkArrow />
                </Link>
              </p>
            </section>

            <section className="fv-wm__section" aria-labelledby="wm-outside">
              <h2 id="wm-outside" className="fv-wm__section-title">
                If it affects your financial life, we advise on it—whether we bill
                on it or not.
              </h2>
              <div className="fv-wm__prose">
                <p>
                  Real estate, a concentrated business stake, an old 401(k),
                  private holdings, or a racehorse—if you own assets outside of
                  Fairview, we include them in your overall plan at no extra
                  charge. You have one financial life; you shouldn&apos;t have six
                  disconnected plans.
                </p>
              </div>

              <WmAssetUnify />
            </section>

            <section
              className="fv-wm__section fv-wm-reach"
              aria-labelledby="wm-reach"
            >
              <div className="fv-wm-reach__media">
                <WmIphoneMedia />
              </div>
              <div className="fv-wm-reach__copy">
                <h2 id="wm-reach" className="fv-wm__section-title">
                  We meet on your terms, not ours.
                </h2>
                <div className="fv-wm__prose">
                  <p>
                    We review your progress regularly, but we are available
                    whenever life happens—by phone, email, video, or in person.
                    Some of our most productive conversations happen over lunch or
                    at a kitchen table, not across a corporate boardroom. If
                    it&apos;s easier for you, we&apos;ll come to you.
                  </p>
                </div>
              </div>
            </section>

            <section
              className="fv-wm__section fv-wm__section--close"
              aria-labelledby="wm-path"
            >
              <h2 id="wm-path" className="fv-wm__section-title">
                Life doesn&apos;t happen in a straight line.
              </h2>
              <p className="fv-wm__domains-lede">
                We build plans resilient enough for both your ambitions and the
                unexpected.
              </p>

              <WmLifeHorizon />

              <div className="fv-wm__prose fv-wm__prose--follow">
                <p>
                  Cash flow needs this year. Estate planning the next. A business
                  sale, a move, or a child stepping into the family business.
                  Whatever changes, your plan adapts with it—and so do we.
                </p>
              </div>
              <Link href={FIRM.contactHref} className="fv-wm__cta">
                Let&apos;s talk
              </Link>
            </section>

            <ContinueBar
              items={[
                {
                  href: "/firm/fees",
                  prompt: "Curious what this costs in plain numbers?",
                },
                {
                  href: "/work/investment-management",
                  prompt: "Want to see how we manage portfolios in-house?",
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
