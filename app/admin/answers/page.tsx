import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import { listAnswerItemsAdmin } from "@/lib/answers/store";
import { isAdminAuthed } from "@/lib/team/auth";

export default async function AdminAnswersPage() {
  if (!(await isAdminAuthed())) redirect("/admin");
  const items = await listAnswerItemsAdmin();

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
            Answers
          </h1>
          <p className="mt-1 m-0 text-[13px] text-[var(--fv-muted)]">
            {items.length} questions · Supabase{" "}
            <code className="text-[12px]">answer_items</code>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/answers/new"
            className="font-sans text-[13px] font-medium tracking-[-0.01em] text-[var(--fv-fg)] underline underline-offset-[5px] decoration-[var(--fv-rule-strong)] hover:decoration-[var(--fv-fg)] transition-colors"
          >
            Add answer
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="fv-btn--quiet">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <ul className="mt-8 m-0 p-0 list-none divide-y divide-[var(--fv-rule)] border-y border-[var(--fv-rule)]">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/admin/answers/${item.id}`}
              className="flex items-baseline justify-between gap-4 py-3 hover:bg-black/[0.02]"
            >
              <div className="min-w-0">
                <p className="m-0 text-[14px] font-medium truncate">
                  {item.question}
                </p>
                <p className="m-0 text-[12px] text-[var(--fv-muted)]">
                  {item.categoryTitle}
                </p>
              </div>
              {!item.published ? (
                <span className="shrink-0 text-[11px] text-[var(--fv-muted)]">
                  Draft
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
