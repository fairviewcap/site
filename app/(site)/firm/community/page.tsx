import type { Metadata } from "next";
import ContinueBar from "@/components/ContinueBar";
import { FIRM } from "@/lib/firm";

export const metadata: Metadata = {
  title: "Community | Fairview Capital",
  description:
    "We're neighbors first. We don't just write checks in Marin. We live here.",
};

export default function CommunityPage() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0">
      <header className="fv-community-hero">
        <div className="fv-community-hero__mast">
          <p className="fv-community__eyebrow">Community</p>
          <h1 className="fv-community__title">
            We&apos;re neighbors first.
          </h1>
          <p className="fv-community__lede">
            We don&apos;t just write checks in Marin. We live here.
          </p>
        </div>

        <figure className="fv-community-hero__media">
          <div
            className="fv-community-hero__plane"
            role="img"
            aria-label="Hero. Local Marin life — neighbors, not a charity gala"
          />
          <figcaption className="fv-community__media-cap">
            <span className="fv-community__media-label">Hero</span>
            <span className="fv-community__media-hint">
              Local life in Marin — neighbors, not a charity-gala stock shot
            </span>
          </figcaption>
        </figure>
      </header>

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
