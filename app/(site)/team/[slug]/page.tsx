import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TeamBioVideo from "@/components/TeamBioVideo";
import { getMemberBySlug, listMembers } from "@/lib/team/store";
import { tenureCaption, type TeamMember } from "@/lib/team/types";

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

function neighbors(
  roster: TeamMember[],
  current: TeamMember,
): { prev: TeamMember | null; next: TeamMember | null } {
  const i = roster.findIndex((m) => m.id === current.id);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? roster[i - 1]! : null,
    next: i < roster.length - 1 ? roster[i + 1]! : null,
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) notFound();

  const roster = await listMembers({ publishedOnly: true });
  const { prev, next } = neighbors(roster, member);

  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <Link href="/team" className="fv-team-bio__back">
        <ArrowLeft size={15} strokeWidth={2} aria-hidden />
        Team
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
            {member.leadership ? "Leadership" : "Team"}
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

          {(prev || next) && (
            <nav className="fv-team-bio__adjacent" aria-label="More of the team">
              {prev ? (
                <Link
                  href={`/team/${prev.slug}`}
                  className="fv-team-bio__adjacent-link fv-team-bio__adjacent-link--prev"
                >
                  <span className="fv-team-bio__adjacent-dir">Previous</span>
                  <span className="fv-team-bio__adjacent-name">{prev.name}</span>
                </Link>
              ) : (
                <span className="fv-team-bio__adjacent-link fv-team-bio__adjacent-link--empty" />
              )}
              {next ? (
                <Link
                  href={`/team/${next.slug}`}
                  className="fv-team-bio__adjacent-link fv-team-bio__adjacent-link--next"
                >
                  <span className="fv-team-bio__adjacent-dir">Next</span>
                  <span className="fv-team-bio__adjacent-name">{next.name}</span>
                </Link>
              ) : (
                <span className="fv-team-bio__adjacent-link fv-team-bio__adjacent-link--empty" />
              )}
            </nav>
          )}
        </div>
      </article>
    </main>
  );
}
