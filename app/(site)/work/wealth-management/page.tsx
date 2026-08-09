import type { Metadata } from "next";
import Link from "next/link";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Wealth Management | Fairview Capital",
  description:
    "We manage legacies, not just ledgers — planning, portfolios, and coordination for families.",
};

const PILLARS = [
  {
    index: "01",
    title: "Your Plan",
    body: "Every client’s situation is unique. We take the time to understand your family, your needs, and your goals, then build a dynamic plan that adapts as life changes — assets, liabilities, cash flow, insurance, estate, retirement, education, and giving as needed.",
  },
  {
    index: "02",
    title: "Your Portfolio",
    body: "Your plan guides your portfolio. We build and adjust asset allocation to match your goals and timeline — tax-sensitive from the first trade, carefully researched, and reviewed as a team.",
  },
  {
    index: "03",
    title: "Your World",
    body: "We coordinate with your other trusted advisors — accountants, estate attorneys, trustees, and philanthropic consultants — so everything works together. We serve the whole family across generations.",
  },
] as const;

export default function WealthManagementPage() {
  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <article className="fv-wm">
        <header className="fv-wm__intro">
          <p className="fv-wm__eyebrow">Wealth Management</p>
          <h1 className="fv-wm__title">
            We manage legacies,
            <br />
            not just ledgers.
          </h1>
          <p className="fv-wm__lede">
            We&apos;re here to help families live well today and tomorrow.
          </p>
        </header>

        <div className="fv-wm__plane" aria-hidden />

        <p className="fv-wm__lead">
          We help you manage your wealth in a way that reflects your goals, your
          family, and your future. That means more than investments — it&apos;s
          planning, portfolios, and coordination.
        </p>

        <section className="fv-wm__pillars" aria-labelledby="wm-pillars-heading">
          <h2 id="wm-pillars-heading" className="fv-wm__section-title">
            Wealth management as it should feel.
          </h2>

          <ol className="fv-wm__schedule">
            {PILLARS.map((pillar) => (
              <li key={pillar.index} className="fv-wm__row">
                <span className="fv-wm__index" aria-hidden>
                  {pillar.index}
                </span>
                <span className="fv-wm__rule" aria-hidden />
                <div className="fv-wm__row-body">
                  <h3 className="fv-wm__pillar-title">{pillar.title}</h3>
                  <p className="fv-wm__pillar-body">{pillar.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="fv-wm__block" aria-labelledby="wm-proactive">
          <h2 id="wm-proactive" className="fv-wm__section-title">
            Always proactive.
            <br />
            Always personal.
            <br />
            Always on your side.
          </h2>
          <div className="fv-wm__prose">
            <p>
              The start is simple. We take on the heavy lifting — paperwork,
              transfers, coordination — so you get clarity, not complexity. Then
              your plan takes shape, built around your goals and ready to adapt
              as life does.
            </p>
            <p>
              The real story is what happens after. Markets shift. Families grow.
              Priorities change. And we stay close through it all — checking in,
              adjusting, guiding. Sometimes it&apos;s deep research. Sometimes
              it&apos;s a quick call.
            </p>
          </div>
        </section>

        <section className="fv-wm__block" aria-labelledby="wm-clarity">
          <h2 id="wm-clarity" className="fv-wm__section-title">
            See it all, clearly.
          </h2>
          <div className="fv-wm__prose">
            <p>
              We use financial planning software to model realistic scenarios,
              stress-test assumptions, and give you a clear view of your complete
              financial picture — all your assets, not just what we manage.
              Through your secure client portal, you can see everything in one
              place.
            </p>
            <p>
              Some clients like to dive into every detail. Others prefer the big
              picture. Either way, you&apos;ll have the clarity you need, and
              we&apos;ll stay in close communication.
            </p>
            <p>
              For more on how we use technology — and where we don&apos;t — see{" "}
              <Link href="/firm/technology">our Technology philosophy</Link>.
            </p>
          </div>
        </section>

        <section className="fv-wm__block" aria-labelledby="wm-assets">
          <h2 id="wm-assets" className="fv-wm__section-title">
            All your assets, one plan.
          </h2>
          <div className="fv-wm__prose">
            <p>
              If you own holdings we don&apos;t directly manage — real estate,
              concentrated stock, or outside investments — we&apos;ll still
              advise on how best to integrate them into your overall strategy,
              and we consider them in planning without a separate charge.
            </p>
          </div>
        </section>

        <section className="fv-wm__block" aria-labelledby="wm-reach">
          <h2 id="wm-reach" className="fv-wm__section-title">
            Always within reach.
          </h2>
          <div className="fv-wm__prose">
            <p>
              We review portfolios regularly, adjust as needed, and stay
              accessible however you prefer — face-to-face, phone, email, or
              video. Many of our best conversations happen outside the office:
              over lunch, around a kitchen table, or where families actually
              live and work.
            </p>
          </div>
        </section>

        <section className="fv-wm__close-block" aria-labelledby="wm-close">
          <h2 id="wm-close" className="fv-wm__section-title">
            Because wealth isn&apos;t just money.
          </h2>
          <div className="fv-wm__prose">
            <p>
              It&apos;s how you live today — and the story you carry forward.
              Right now, it means making better decisions, cutting through the
              noise, and finding clarity in big moments. Cash flow. Tax strategy.
              Real estate. We take away the stress so you can focus on what
              matters most.
            </p>
            <p>
              And tomorrow, it means more than preserving assets. It means
              preserving values. Preparing heirs. Creating clarity in change.
              Making sure your wealth reflects what matters most to your family.
            </p>
            <p className="fv-wm__close">
              Because in the end, wealth is personal — and so is our work with
              you.
            </p>
          </div>
        </section>

        <nav className="fv-wm__next" aria-label="Related">
          <Link href="/work/investment-management">Investment Management</Link>
          <Link href="/firm/fees">Fees</Link>
          <Link href="/firm/why-fairview">Why Fairview</Link>
          <Link href={FIRM.contactHref} className="fv-wm__cta">
            Let&apos;s talk
          </Link>
        </nav>
      </article>
    </main>
  );
}
