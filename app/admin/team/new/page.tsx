import Link from "next/link";
import { redirect } from "next/navigation";
import { MemberForm } from "@/app/admin/team/MemberForm";
import { isAdminAuthed } from "@/lib/team/auth";

export default async function NewMemberPage() {
  if (!(await isAdminAuthed())) redirect("/admin");

  return (
    <div>
      <Link
        href="/admin/team"
        className="text-[13px] text-[var(--fv-muted)] hover:text-[var(--fv-fg)]"
      >
        ← Team
      </Link>
      <h1 className="mt-4 m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
        Add person
      </h1>
      <div className="mt-8">
        <MemberForm />
      </div>
    </div>
  );
}
