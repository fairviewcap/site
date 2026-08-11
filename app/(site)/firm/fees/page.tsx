import type { Metadata } from "next";
import ContinueBar from "@/components/ContinueBar";
import FeeEstimator from "@/components/FeeEstimator";
import { FEE_INCLUDES, FEE_SCHEDULE, type FeeTier } from "@/lib/fees";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Fees | Fairview Capital",
  description:
    "A hidden fee is a fee with something to hide. Ours aren't. Every fee we charge is fully disclosed.",
};

function AssetsSentence({ tier }: { tier: FeeTier }) {
  const [first, second] = tier.assetsValues;

  return (
    <>
      {tier.assetsLead}{" "}
      <span className="fv-fees__value fv-nums">{first}</span>
      {second && tier.assetsJoin ? (
        <>
          {" "}
          {tier.assetsJoin}{" "}
          <span className="fv-fees__value fv-nums">{second}</span>
        </>
      ) : null}
    </>
  );
}

function includesProse(items: readonly string[]) {
  const lower = items.map((item) => item.charAt(0).toLowerCase() + item.slice(1));
  if (lower.length === 0) return "";
  if (lower.length === 1) return lower[0];
  if (lower.length === 2) return `${lower[0]} and ${lower[1]}`;
  return `${lower.slice(0, -1).join(", ")}, and ${lower[lower.length - 1]}`;
}

export default function FeesPage() {
  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <div className="fv-fees">
        <header className="fv-fees__intro">
          <p className="fv-fees__eyebrow">
            Fees
            <span className="fv-fees__asof">Updated Mar 2026</span>
          </p>
          <h1 className="fv-fees__title">
            A hidden fee is a fee with something to hide.
          </h1>
          <p className="fv-fees__lede">
            Ours aren&apos;t. Every fee we charge is clear, simple, and fully disclosed, right here.
          </p>
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
                <AssetsSentence tier={tier} />
              </div>
            </div>
          ))}
        </div>

        <p className="fv-fees__note fv-fees__note--includes">
          The fee covers {includesProse(FEE_INCLUDES)}.
        </p>

        <p className="fv-fees__note fv-fees__note--follow">
          Billed quarterly. As assets increase, the percentage declines — and we
          combine assets across families, which can further reduce fees. No
          commissions. No separate planning fees. We are a Registered Investment
          Advisor and act as a fiduciary.
        </p>

        <FeeEstimator />

        <ContinueBar
          items={[
            {
              href: "/work/wealth-management",
              prompt:
                "Want to see how wealth management actually works here?",
            },
            {
              href: "/firm/answers",
              prompt: "Still have questions about what the fee covers?",
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
