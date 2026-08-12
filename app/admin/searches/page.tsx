import Link from "next/link";
import { redirect } from "next/navigation";
import { listAnswerIntentEvents } from "@/app/admin/cms-actions";
import { logoutAction } from "@/app/admin/actions";
import { isAdminAuthed } from "@/lib/team/auth";

export default async function AdminSearchesPage() {
  if (!(await isAdminAuthed())) redirect("/admin");
  const events = await listAnswerIntentEvents();

  const searches = events.filter((e) => e.kind === "search").length;
  const views = events.filter((e) => e.kind === "view").length;
  const unmatched = events.filter((e) => e.unmatched).length;

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
            Searches
          </h1>
          <p className="mt-1 m-0 text-[13px] text-[var(--fv-muted)]">
            {events.length} recent · {searches} search · {views} view ·{" "}
            {unmatched} unmatched ·{" "}
            <code className="text-[12px]">answer_intent_events</code>
          </p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="fv-btn--quiet">
            Sign out
          </button>
        </form>
      </div>

      {events.length === 0 ? (
        <p className="mt-8 text-[14px] text-[var(--fv-muted)]">
          No Straight Answers searches or views logged yet. They appear after
          someone uses the search on{" "}
          <Link href="/firm/answers" className="underline underline-offset-4">
            /firm/answers
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-8 m-0 p-0 list-none divide-y divide-[var(--fv-rule)] border-y border-[var(--fv-rule)]">
          {events.map((event) => (
            <li key={event.id} className="py-3 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="m-0 text-[14px] font-medium truncate">
                  {event.kind === "view"
                    ? event.slug
                      ? `Viewed: ${event.slug}`
                      : event.query
                    : event.query}
                </p>
                <p className="mt-1 m-0 text-[12px] text-[var(--fv-muted)]">
                  {new Date(event.created_at).toLocaleString()}
                  {event.kind === "search" ? (
                    <>
                      {" "}
                      · {event.matches} match
                      {event.matches === 1 ? "" : "es"}
                      {event.unmatched ? " · unmatched" : ""}
                    </>
                  ) : event.slug ? (
                    <>
                      {" "}
                      ·{" "}
                      <Link
                        href={`/firm/answers/${event.slug}`}
                        className="underline underline-offset-4"
                      >
                        open
                      </Link>
                    </>
                  ) : null}
                </p>
              </div>
              <span className="shrink-0 text-[11px] uppercase tracking-wide text-[var(--fv-muted)]">
                {event.kind}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
