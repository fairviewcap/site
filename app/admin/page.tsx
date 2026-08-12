import { redirect } from "next/navigation";
import { LoginForm } from "@/app/admin/LoginForm";
import { adminConfigured, isAdminAuthed } from "@/lib/team/auth";
import { supabaseConfigured } from "@/lib/supabase/server";

export default async function AdminPage() {
  if (await isAdminAuthed()) redirect("/admin/team");

  return (
    <div className="max-w-sm">
      <h1 className="m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
        Admin
      </h1>
      <p className="mt-2 m-0 text-[14px] text-[var(--fv-muted)] leading-relaxed">
        Team, Learn, Answers, and contact inquiries.{" "}
        {adminConfigured()
          ? "Sign in with the admin password."
          : "Add ADMIN_PASSWORD to .env.local, then restart the dev server."}
      </p>
      {!supabaseConfigured() ? (
        <p className="mt-3 m-0 text-[13px] text-red-800/80 leading-relaxed">
          Supabase env vars are missing — content will fall back to local files.
        </p>
      ) : null}
      {adminConfigured() ? <LoginForm /> : null}
    </div>
  );
}
