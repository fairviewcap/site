import { displayRole, type TeamMember } from "@/lib/team/types";

type Props = {
  member: Pick<TeamMember, "role" | "since">;
  className?: string;
};

export default function TeamMeta({ member, className }: Props) {
  return (
    <p className={className}>
      <span className="fv-team-meta__role">{displayRole(member.role)}</span>
      {member.since ? (
        <span className="fv-team-meta__since">
          At Fairview since {member.since}
        </span>
      ) : null}
    </p>
  );
}
