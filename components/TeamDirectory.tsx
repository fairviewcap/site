import Link from "next/link";
import type { CSSProperties } from "react";
import { displayRole, type TeamMember } from "@/lib/team/types";

type Props = {
  members: TeamMember[];
};

export default function TeamDirectory({ members }: Props) {
  if (members.length === 0) {
    return <p className="fv-team__empty">No people in this view.</p>;
  }

  return (
    <ul className="fv-team__list">
      {members.map((member, i) => (
        <li
          key={member.id}
          className="fv-team__item"
          style={{ "--fv-team-i": i } as CSSProperties}
        >
          <Link href={`/team/${member.slug}`} className="fv-team__card">
            <div className="fv-team__copy">
              <h2 className="fv-team__name">{member.name}</h2>
              <p className="fv-team__role">{displayRole(member.role)}</p>
              {member.teaser ? (
                <p className="fv-team__teaser">{member.teaser}</p>
              ) : null}
              {member.since ? (
                <p className="fv-team__since">
                  At Fairview since {member.since}
                </p>
              ) : null}
            </div>
            <div className="fv-team__photo">
              {member.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={member.image} alt="" className="fv-team__img" />
              ) : null}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
