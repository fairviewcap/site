import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import { isAdminAuthed } from "@/lib/team/auth";
import { formatLearnDate, listArticles } from "@/lib/learn/store";

export default async function AdminLearnPage() {
  if (!(await isAdminAuthed())) redirect("/admin");
  const articles = await listArticles({ publishedOnly: false });

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
            Learn
          </h1>
          <p className="mt-1 m-0 text-[13px] text-[var(--fv-muted)]">
            {articles.length} articles · Supabase{" "}
            <code className="text-[12px]">learn_articles</code>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/learn/new"
            className="font-sans text-[13px] font-medium tracking-[-0.01em] text-[var(--fv-fg)] underline underline-offset-[5px] decoration-[var(--fv-rule-strong)] hover:decoration-[var(--fv-fg)] transition-colors"
          >
            Add article
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="fv-btn--quiet">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <ul className="mt-8 m-0 p-0 list-none divide-y divide-[var(--fv-rule)] border-y border-[var(--fv-rule)]">
        {articles.map((a) => (
          <li key={`${a.channel}/${a.slug}`}>
            <Link
              href={`/admin/learn/${a.channel}/${a.slug}`}
              className="flex items-baseline justify-between gap-4 py-3 hover:bg-black/[0.02]"
            >
              <div className="min-w-0">
                <p className="m-0 text-[14px] font-medium truncate">{a.title}</p>
                <p className="m-0 text-[12px] text-[var(--fv-muted)]">
                  {a.channel} · {formatLearnDate(a.date)}
                </p>
              </div>
              {!a.image ? (
                <span className="shrink-0 text-[11px] text-[var(--fv-muted)]">
                  no photo
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
