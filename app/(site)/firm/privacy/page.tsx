import type { Metadata } from "next";
import ContinueBar from "@/components/ContinueBar";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Privacy | Fairview Capital",
  description:
    "30 years. 0 leaks. Good advice requires the whole truth. The whole truth requires privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <div className="fv-privacy">
        <div className="fv-privacy__above">
          <header className="fv-privacy__intro">
            <p className="fv-privacy__eyebrow">Privacy</p>
            <h1 className="fv-privacy__title">
              30 years.
              <br />
              0 leaks.
            </h1>
            <p className="fv-privacy__lede">
              Good advice requires the whole truth. The whole truth requires
              privacy.
            </p>
          </header>

          <div className="fv-privacy__body">
            <p>
              Even when we work with multiple generations of the same family,
              each relationship is treated as its own — information is never
              shared unless you ask us to.
            </p>
            <p>
              We understand that financial matters are inherently sensitive.
              That&apos;s why we safeguard your personal and financial
              information with the same rigor we safeguard your wealth.
            </p>
            <p className="fv-privacy__close">
              Simple, discreet, and unwavering: your privacy is always
              protected.
            </p>
          </div>
        </div>

        <ContinueBar
          items={[
            {
              href: "/firm/answers",
              prompt: "More on how we protect clients and keep things straight?",
            },
            {
              href: "/firm/fees",
              prompt: "Want the fee schedule in plain numbers?",
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
