import { redirect } from "next/navigation";
import { AnswerForm } from "@/app/admin/answers/AnswerForm";
import { getAnswerCategories } from "@/lib/answers/store";
import { isAdminAuthed } from "@/lib/team/auth";

export default async function AdminAnswersNewPage() {
  if (!(await isAdminAuthed())) redirect("/admin");
  const categories = await getAnswerCategories({ publishedOnly: false });

  return (
    <div>
      <h1 className="m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
        New answer
      </h1>
      <AnswerForm
        categories={categories.map((c) => ({ id: c.id, title: c.title }))}
      />
    </div>
  );
}
