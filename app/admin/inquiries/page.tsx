import { redirect } from "next/navigation";
import { listContactInquiries } from "@/app/admin/cms-actions";
import { logoutAction } from "@/app/admin/actions";
import { isAdminAuthed } from "@/lib/team/auth";

export default async function AdminInquiriesPage() {
  if (!(await isAdminAuthed())) redirect("/admin");
  const inquiries = await listContactInquiries();

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
            Inquiries
          </h1>
          <p className="mt-1 m-0 text-[13px] text-[var(--fv-muted)]">
            {inquiries.length} recent · Supabase{" "}
            <code className="text-[12px]">contact_inquiries</code>
          </p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="fv-btn--quiet">
            Sign out
          </button>
        </form>
      </div>

      {inquiries.length === 0 ? (
        <p className="mt-8 text-[14px] text-[var(--fv-muted)]">
          No inquiries yet.
        </p>
      ) : (
        <ul className="mt-8 m-0 p-0 list-none divide-y divide-[var(--fv-rule)] border-y border-[var(--fv-rule)]">
          {inquiries.map((inq) => (
            <li key={inq.id} className="py-4">
              <p className="m-0 text-[14px] font-medium">
                {inq.name}{" "}
                <a
                  href={`mailto:${inq.email}`}
                  className="font-normal text-[var(--fv-muted)] underline underline-offset-4"
                >
                  {inq.email}
                </a>
              </p>
              <p className="mt-1 m-0 text-[12px] text-[var(--fv-muted)]">
                {new Date(inq.created_at).toLocaleString()}
                {inq.phone ? ` · ${inq.phone}` : ""}
              </p>
              <p className="mt-2 m-0 text-[14px] leading-relaxed whitespace-pre-wrap">
                {inq.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
