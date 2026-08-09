"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition } from "react";
import type { TeamMember } from "@/lib/team/types";
import { tenureCaption } from "@/lib/team/types";

export type TeamFilterKey = "all" | "leadership" | "board";

const FILTERS: { key: TeamFilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "leadership", label: "Leadership" },
  { key: "board", label: "Board of Advisors" },
];

type Props = {
  members: TeamMember[];
};

function matchesFilter(member: TeamMember, filter: TeamFilterKey): boolean {
  if (filter === "leadership") return member.leadership;
  if (filter === "board") return member.board;
  return true;
}

/** “Andrew F. Mathieson” → “Andrew”; “P. Renae Branscum” → “Renae” */
function firstName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2 && /^[A-Z]\.?$/i.test(parts[0])) {
    return parts[1].replace(/,$/, "");
  }
  return parts[0] ?? name;
}

export default function TeamDirectory({ members }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const raw = searchParams.get("filter");
  const filter: TeamFilterKey =
    raw === "leadership" || raw === "board" ? raw : "all";

  const visible = useMemo(
    () => members.filter((m) => matchesFilter(m, filter)),
    [members, filter],
  );

  const setFilter = (key: TeamFilterKey) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "all") params.delete("filter");
    else params.set("filter", key);
    const q = params.toString();
    startTransition(() => {
      router.replace(q ? `/team?${q}` : "/team", { scroll: false });
    });
  };

  return (
    <div className="fv-team">
      <div
        className="fv-team__filters"
        role="tablist"
        aria-label="Filter team"
        data-pending={pending || undefined}
      >
        {FILTERS.map((item) => {
          const active = filter === item.key;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              className={`fv-team__filter${active ? " is-active" : ""}`}
              onClick={() => setFilter(item.key)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="fv-team__empty">
          {filter === "board"
            ? "Board of Advisors will appear here when listed."
            : "No people in this view."}
        </p>
      ) : (
        <ul className="fv-team__list">
          {visible.map((member) => (
            <li key={member.id} className="fv-team__item">
              <Link href={`/team/${member.slug}`} className="fv-team__card">
                <div className="fv-team__copy">
                  <h2 className="fv-team__name">{member.name}</h2>
                  <p className="fv-team__role">{tenureCaption(member)}</p>
                  {member.teaser ? (
                    <p className="fv-team__teaser">{member.teaser}</p>
                  ) : null}
                  <span className="fv-team__more">
                    More on {firstName(member.name)}
                  </span>
                </div>
                <div className="fv-team__photo">
                  {member.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.image}
                      alt=""
                      className="fv-team__img"
                    />
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
