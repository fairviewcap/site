import { redirect } from "next/navigation";
import { ArticleForm } from "@/app/admin/learn/ArticleForm";
import { isAdminAuthed } from "@/lib/team/auth";
import { listChannels } from "@/lib/learn/store";

export default async function AdminLearnNewPage() {
  if (!(await isAdminAuthed())) redirect("/admin");
  const channels = await listChannels();

  return (
    <div>
      <h1 className="m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
        New article
      </h1>
      <ArticleForm channels={channels} />
    </div>
  );
}
