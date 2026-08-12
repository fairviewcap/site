import type { Metadata } from "next";
import CommunityHero from "@/components/CommunityHero";
import ContinueBar from "@/components/ContinueBar";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Community | Fairview Capital",
  description:
    "Neighbors first. We don't just write checks in Marin. We live here.",
};

export default function CommunityPage() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <CommunityHero />

      <div className="fv-frame pt-12 pb-20 sm:pt-16 sm:pb-28">
        <article className="fv-community">
          <div className="fv-community__body">
            <p>
              Brian coaches youth soccer. Peter coaches lacrosse in Pittsburgh.
              Andy raises puppies for Guide Dogs for the Blind. Annie plays
              goalie in the local women&apos;s soccer league on Saturdays. None
              of this belongs on a corporate resume—it&apos;s just what we do
              when we aren&apos;t in the office.
            </p>
            <p>
              As a firm, we back a few local efforts directly: a youth soccer
              club, a guide-dog training program, and a Marin lecture series
              that brings thoughtful writers to town. We don&apos;t do it for
              public relations. We do it because this is where we raise our
              families, and we like being good neighbors.
            </p>
          </div>

          <ContinueBar
            items={[
              {
                href: "/team",
                prompt: "Want to meet the neighbors who do the work?",
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
