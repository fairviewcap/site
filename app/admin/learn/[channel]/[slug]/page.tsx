import { notFound, redirect } from "next/navigation";
import { ArticleForm } from "@/app/admin/learn/ArticleForm";
import { isAdminAuthed } from "@/lib/team/auth";
import { getArticleAdmin, listChannels } from "@/lib/learn/store";

type Props = { params: Promise<{ channel: string; slug: string }> };

export default async function AdminLearnEditPage({ params }: Props) {
  if (!(await isAdminAuthed())) redirect("/admin");
  const { channel, slug } = await params;
  const article = await getArticleAdmin(channel, slug);
  if (!article) notFound();
  const channels = await listChannels();

  return (
    <div>
      <h1 className="m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
        Edit article
      </h1>
      <ArticleForm article={article} channels={channels} />
    </div>
  );
}
