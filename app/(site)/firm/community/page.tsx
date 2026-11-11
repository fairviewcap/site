import type { Metadata } from "next";
import CommunityHero from "@/components/CommunityHero";
import ContinueBar from "@/components/ContinueBar";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Community | Fairview Capital",
  description:
    "Invested in Marin. We’ve been part of this community since 1995.",
};

export default function CommunityPage() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <CommunityHero />

      <div className="fv-frame pt-12 pb-20 sm:pt-16 sm:pb-28">
        <article className="fv-community">
          <div className="fv-community__body">
            <p>
              We give back with both time and money, through local
              sponsorships, volunteering, and the causes our team cares about.
              It’s not a marketing program, just part of being here.
            </p>
          </div>

          <ContinueBar
            items={[
              {
                href: "/team",
                prompt: "Want to meet the people who do the work?",
              },
              {
                href: "/firm/why-fairview",
                prompt: "Curious why the firm is still independent?",
              },
              {
                href: FIRM.contactHref,
                prompt: "Ready to talk through your situation?",
              },
            ]}
          />
        </article>
      </div>
    </main>
  );
}
