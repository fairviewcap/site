import type { Metadata } from "next";
import { Suspense } from "react";
import TeamDirectory from "@/components/TeamDirectory";
import TeamReveal from "@/components/TeamReveal";
import { listMembers } from "@/lib/team/store";

export const metadata: Metadata = {
  title: "Team | Fairview Capital",
  description:
    "Smart and honest. Intellect means little without integrity. That is the standard for everyone here.",
};

export default async function TeamPage() {
  const members = await listMembers({ publishedOnly: true });

  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <TeamReveal>
        <header className="fv-team__intro max-w-xl">
          <p className="fv-team__eyebrow">Team</p>
          <h1 className="fv-team__title">Smart and honest.</h1>
          <p className="fv-team__lede">
            Intellect means little without integrity. That is the standard for
            everyone here.
          </p>
        </header>

        <Suspense fallback={null}>
          <TeamDirectory members={members} />
        </Suspense>
      </TeamReveal>
    </main>
  );
}
