import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TeamBioVideo from "@/components/TeamBioVideo";
import { getMemberBySlug, listMembers } from "@/lib/team/store";
import { tenureCaption } from "@/lib/team/types";
import { FIRM } from "@/lib/firm";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const members = await listMembers({ publishedOnly: true });
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) return { title: "Team | Fairview Capital" };
  return {
    title: `${member.name} | Fairview Capital`,
    description: member.teaser || tenureCaption(member),
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) notFound();

  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <Link href="/team" className="fv-team-bio__back">
        ← Team
      </Link>

      <article className="fv-team-bio">
        {member.videoUrl ? (
          <TeamBioVideo
            name={member.name}
            image={member.image}
            videoUrl={member.videoUrl}
          />
        ) : (
          <div className="fv-team-bio__photo">
            {member.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={member.image}
                alt=""
                className="fv-team-bio__img"
              />
            ) : null}
          </div>
        )}

        <div className="fv-team-bio__body">
          <p className="fv-team-bio__eyebrow">
            {member.board
              ? "Board of Advisors"
              : member.leadership
                ? "Leadership"
                : "Team"}
          </p>
          <h1 className="fv-team-bio__name">{member.name}</h1>
          <p className="fv-team-bio__role">{tenureCaption(member)}</p>
          {member.teaser ? (
            <p className="fv-team-bio__teaser">{member.teaser}</p>
          ) : null}

          <div
            className="fv-team-bio__html"
            dangerouslySetInnerHTML={{ __html: member.bioHtml }}
          />

          <div className="fv-team-bio__actions">
            <Link href={FIRM.contactHref} className="fv-team-bio__cta">
              Let&apos;s talk
            </Link>
            <Link href="/team" className="fv-team-bio__more">
              Meet everyone
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
