import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MemberForm } from "@/app/admin/team/MemberForm";
import { isAdminAuthed } from "@/lib/team/auth";
import { getMember } from "@/lib/team/store";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthed())) redirect("/admin");
  const { id } = await params;
  const member = await getMember(id);
  if (!member) notFound();

  return (
    <div>
      <Link
        href="/admin/team"
        className="text-[13px] text-[var(--fv-muted)] hover:text-[var(--fv-fg)]"
      >
        ← Team
      </Link>
      <h1 className="mt-4 m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
        {member.name}
      </h1>
      <div className="mt-8">
        <MemberForm member={member} />
      </div>
    </div>
  );
}
