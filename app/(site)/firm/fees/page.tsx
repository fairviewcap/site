import type { Metadata } from "next";
import Link from "next/link";
import { FEE_SCHEDULE } from "@/lib/fees";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Fees | Fairview Capital",
  description:
    "Clear advisory fees. A percentage of assets under management — no commissions, no separate planning fees.",
};

export default function FeesPage() {
  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <div className="fv-fees max-w-3xl">
        <header className="fv-fees__intro">
          <p className="fv-fees__eyebrow">Fees</p>
          <h1 className="fv-fees__title">
            Clear fees.
            <br />
            Nothing hidden.
          </h1>
          <p className="fv-fees__lede">What you pay. What&apos;s included.</p>
        </header>

        <div
          className="fv-fees__schedule"
          role="table"
          aria-label="Fee schedule"
        >
          <div className="fv-fees__head" role="row">
            <span className="fv-fees__col-fee" role="columnheader">
              Fee
            </span>
            <span className="fv-fees__rule" aria-hidden />
            <span className="fv-fees__col-band" role="columnheader">
              Assets
            </span>
            <span className="fv-fees__col-amt" role="columnheader">
              <span className="sr-only">Amount</span>
            </span>
          </div>

          {FEE_SCHEDULE.map((tier) => (
            <div
              key={`${tier.whole}.${tier.fraction}`}
              className="fv-fees__row"
              role="row"
            >
              <div
                className="fv-fees__rate"
                role="cell"
                aria-label={`${tier.whole}.${tier.fraction} percent`}
              >
                <span className="fv-fees__whole">{tier.whole}</span>
                <span className="fv-fees__dot">.</span>
                <span className="fv-fees__frac">{tier.fraction}</span>
                <span className="fv-fees__unit" aria-hidden>
                  %
                </span>
              </div>
              <span className="fv-fees__rule" aria-hidden />
              <div className="fv-fees__band" role="cell">
                {tier.band}
              </div>
              <div className="fv-fees__amount" role="cell">
                {tier.amount}
              </div>
            </div>
          ))}
        </div>

        <p className="fv-fees__note">
          Our fee is a percentage of assets under management. Planning,
          research, portfolio construction, and ongoing guidance are all
          included. As assets increase, the percentage declines, and we combine
          assets across families, which can further reduce fees. Fees are billed
          quarterly. No commissions. No separate planning fees. We are a
          Registered Investment Advisor and act as a fiduciary.
        </p>

        <Link href={FIRM.contactHref} className="fv-fees__cta">
          Let&apos;s talk
        </Link>
      </div>
    </main>
  );
}
