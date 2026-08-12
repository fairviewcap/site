import { notFound, redirect } from "next/navigation";
import { AnswerForm } from "@/app/admin/answers/AnswerForm";
import {
  getAnswerCategories,
  getAnswerItemAdmin,
} from "@/lib/answers/store";
import { isAdminAuthed } from "@/lib/team/auth";

type Props = { params: Promise<{ id: string }> };

export default async function AdminAnswersEditPage({ params }: Props) {
  if (!(await isAdminAuthed())) redirect("/admin");
  const { id } = await params;
  const row = await getAnswerItemAdmin(id);
  if (!row) notFound();
  const categories = await getAnswerCategories({ publishedOnly: false });

  return (
    <div>
      <h1 className="m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
        Edit answer
      </h1>
      <AnswerForm
        categories={categories.map((c) => ({ id: c.id, title: c.title }))}
        item={{
          id: row.id,
          categoryId: row.category_id,
          question: row.question,
          slug: row.slug,
          answer: row.answer,
          moreHref: row.more_href,
          moreLabel: row.more_label,
          sortOrder: row.sort_order,
          published: row.published,
        }}
      />
    </div>
  );
}
