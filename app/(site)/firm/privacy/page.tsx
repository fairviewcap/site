import type { Metadata } from "next";
import ContinueBar from "@/components/ContinueBar";
import PageEnter from "@/components/PageEnter";
import PrivacyTheme from "@/components/PrivacyTheme";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Confidentiality | Fairview Capital",
  description:
    "Good advice requires the whole truth. The whole truth requires privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="fv-frame fv-privacy-page pt-10 pb-20 sm:pt-14 sm:pb-28">
      <PrivacyTheme />
      <PageEnter>
        <div className="fv-privacy">
          <div className="fv-privacy__above">
            <header className="fv-privacy__intro" data-enter="0">
              <p className="fv-privacy__eyebrow">Confidentiality</p>
              <h1 className="fv-privacy__title">
                <span className="fv-privacy__line">
                  Good advice requires the whole truth.
                </span>
                <span className="fv-privacy__line">
                  The whole truth requires privacy.
                </span>
              </h1>
            </header>

            <div className="fv-privacy__body" data-enter="1">
              <p>
                Even when we work with multiple generations of the same family,
                each relationship is treated as its own. We don’t share your
                information unless you ask us to, or the law requires it.
              </p>
              <p>
                We understand that financial matters are inherently sensitive.
                That’s why we safeguard your personal and financial information
                with the same rigor we safeguard your wealth.
              </p>
              <p className="fv-privacy__close">
                Simple, discreet, and unwavering: since 1995, we’ve treated
                your privacy as part of the work.
              </p>
            </div>
          </div>

          <div data-enter="2">
            <ContinueBar
              items={[
                {
                  href: "/answers",
                  prompt:
                    "More on how we protect clients and keep things straight?",
                },
                {
                  href: "/privacy-policy",
                  prompt: "Want the full privacy policy?",
                },
                {
                  href: FIRM.contactHref,
                  prompt: "Ready to talk through your situation?",
                },
              ]}
            />
          </div>
        </div>
      </PageEnter>
    </main>
  );
}
