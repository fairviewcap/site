import Link from "next/link";
import { listMembers } from "@/lib/team/store";
import { tenureCaption } from "@/lib/team/types";
import TeamVideoReel from "@/components/TeamVideoReel";

/**
 * Horizontal cast rail — faces + tenure, no cards.
 * Optional portrait-video poster opens a modal of short intros.
 */
export default async function TeamRail() {
  const members = await listMembers({ publishedOnly: true, railOnly: true });
  const clips = await listMembers({ publishedOnly: true, withVideo: true });

  if (members.length === 0) return null;

  const reelClips = clips
    .filter((m) => !m.board)
    .map((m) => ({
      id: m.id,
      name: m.name,
      slug: m.slug,
      role: m.role,
      since: m.since,
      image: m.image,
      videoUrl: m.videoUrl,
    }));

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="m-0 font-sans text-[15px] sm:text-[16px] tracking-[-0.015em] text-[var(--fv-fg)]">
          The people you&apos;ll actually work with.
        </p>
        <Link
          href="/team"
          className="font-sans text-[13px] font-medium tracking-[-0.01em] text-[var(--fv-fg)] underline underline-offset-[5px] decoration-[var(--fv-rule-strong)] hover:decoration-[var(--fv-fg)] transition-colors"
        >
          Meet everyone
        </Link>
      </div>

      <div
        className="fv-team-rail fv-bleed-right mt-6 flex gap-4 overflow-x-auto pb-2 sm:gap-5"
        role="list"
        aria-label="Team"
      >
        {reelClips.length > 0 ? (
          <div role="listitem" className="shrink-0">
            <TeamVideoReel
              clips={reelClips}
              posterImage={reelClips[0]?.image}
            />
          </div>
        ) : null}

        {members.map((member) => (
          <figure
            key={member.id}
            role="listitem"
            className="m-0 w-[7.5rem] shrink-0 sm:w-[8.75rem]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--fv-radius-media)] bg-[var(--fv-team-plate)] [filter:grayscale(1)_contrast(1.06)]">
              {member.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.image}
                  alt=""
                  className="absolute inset-0 block h-full w-full object-cover object-center"
                />
              ) : null}
            </div>
            <figcaption className="mt-2.5">
              <p className="m-0 font-sans text-[13px] font-medium tracking-[-0.01em] text-[var(--fv-fg)]">
                {member.name}
              </p>
              <p className="mt-0.5 m-0 font-sans text-[12px] text-[var(--fv-muted)] fv-nums">
                {tenureCaption(member)}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
