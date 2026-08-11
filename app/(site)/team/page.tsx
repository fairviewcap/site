import type { Metadata } from "next";
import { Suspense } from "react";
import TeamDirectory from "@/components/TeamDirectory";
import { listMembers } from "@/lib/team/store";

export const metadata: Metadata = {
  title: "Team | Fairview Capital",
  description:
    "Smart, and honest. The first one's useless without the second. That's the bar for everyone on this page.",
};

export default async function TeamPage() {
  const members = await listMembers({ publishedOnly: true });

  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <header className="fv-team__intro max-w-xl">
        <p className="fv-team__eyebrow">Team</p>
        <h1 className="fv-team__title">
          Smart, and honest. The first one&apos;s useless without the second.
        </h1>
        <p className="fv-team__lede">
          That&apos;s the bar for everyone on this page.
        </p>
      </header>

      <Suspense fallback={null}>
        <TeamDirectory members={members} />
      </Suspense>
    </main>
  );
}
