import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import { isAdminAuthed } from "@/lib/team/auth";
import { listMembers } from "@/lib/team/store";
import { tenureCaption } from "@/lib/team/types";

export default async function AdminTeamPage() {
  if (!(await isAdminAuthed())) redirect("/admin");
  const members = await listMembers();

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
            Team
          </h1>
          <p className="mt-1 m-0 text-[13px] text-[var(--fv-muted)]">
            {members.length} people · Supabase{" "}
            <code className="text-[12px]">team_members</code>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/team/new"
            className="font-sans text-[13px] font-medium tracking-[-0.01em] text-[var(--fv-fg)] underline underline-offset-[5px] decoration-[var(--fv-rule-strong)] hover:decoration-[var(--fv-fg)] transition-colors"
          >
            Add person
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="fv-btn--quiet">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <ul className="mt-8 m-0 p-0 list-none divide-y divide-[var(--fv-rule)] border-y border-[var(--fv-rule)]">
        {members.map((m) => (
          <li key={m.id}>
            <Link
              href={`/admin/team/${m.id}`}
              className="flex items-center gap-4 py-3 hover:bg-black/[0.02]"
            >
              <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-[3px] bg-black/5">
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-top grayscale"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="m-0 text-[14px] font-medium truncate">{m.name}</p>
                <p className="m-0 text-[12px] text-[var(--fv-muted)] truncate">
                  {tenureCaption(m)}
                </p>
              </div>
              <div className="shrink-0 text-[11px] text-[var(--fv-muted)] text-right">
                {!m.published || m.draft ? <div>Draft</div> : null}
                {m.showOnRail ? <div>Rail</div> : null}
                {m.leadership ? <div>Leadership</div> : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-[12px] leading-relaxed text-[var(--fv-muted)] max-w-md">
        Edits save to Supabase and revalidate the public team pages. Keep{" "}
        <code className="text-[11px]">data/team.json</code> as a local backup
        seed source.
      </p>
    </div>
  );
}
