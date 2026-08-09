import type { Metadata } from "next";
import { Suspense } from "react";
import TeamDirectory from "@/components/TeamDirectory";
import { listMembers } from "@/lib/team/store";

export const metadata: Metadata = {
  title: "Team | Fairview Capital",
  description:
    "When you work with Fairview, you don’t just get one of us. You get all of us.",
};

export default async function TeamPage() {
  const members = await listMembers({ publishedOnly: true });

  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <header className="fv-team__intro max-w-xl">
        <h1 className="fv-team__title">You get everyone.</h1>
        <p className="fv-team__lede">
          When you work with Fairview, you don&apos;t just get one of us. You
          get all of us. We listen together, think together, and bring every
          perspective to the table — so the advice you hear is the firm&apos;s,
          not a single voice.
        </p>
      </header>

      <Suspense fallback={null}>
        <TeamDirectory members={members} />
      </Suspense>
    </main>
  );
}
