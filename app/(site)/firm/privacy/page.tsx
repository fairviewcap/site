import type { Metadata } from "next";
import ContinueBar from "@/components/ContinueBar";
import PrivacyReveal from "@/components/PrivacyReveal";
import PrivacyTheme from "@/components/PrivacyTheme";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Confidentiality | Fairview Capital",
  description:
    "30 years. 0 leaks. Good advice requires the whole truth. The whole truth requires privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="fv-frame fv-privacy-page pt-10 pb-20 sm:pt-14 sm:pb-28">
      <PrivacyTheme />
      <div className="fv-privacy">
        <div className="fv-privacy__above">
          <PrivacyReveal />
        </div>

        <ContinueBar
          items={[
            {
              href: "/firm/answers",
              prompt: "More on how we protect clients and keep things straight?",
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
    </main>
  );
}
