import type { Metadata } from "next";
import ContinueBar from "@/components/ContinueBar";
import FeeEstimator from "@/components/FeeEstimator";
import FeesHero from "@/components/FeesHero";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Fees | Fairview Capital",
  description:
    "A hidden fee is a fee with something to hide. Ours aren't. Every fee we charge is fully disclosed.",
};

export default function FeesPage() {
  return (
    <main className="fv-fees-page bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <FeesHero />

      <div className="fv-frame">
        <div className="fv-fees">
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
      </div>
    </main>
  );
}
