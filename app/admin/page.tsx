import { redirect } from "next/navigation";
import { LoginForm } from "@/app/admin/LoginForm";
import { adminConfigured, isAdminAuthed } from "@/lib/team/auth";

export default async function AdminPage() {
  if (await isAdminAuthed()) redirect("/admin/team");

  return (
    <div className="max-w-sm">
      <h1 className="m-0 font-tight text-2xl font-bold tracking-[-0.03em]">
        Admin
      </h1>
      <p className="mt-2 m-0 text-[14px] text-[var(--fv-muted)] leading-relaxed">
        Team roster for the site.{" "}
        {adminConfigured()
          ? "Sign in with the admin password."
          : "Add ADMIN_PASSWORD to .env.local, then restart the dev server."}
      </p>
      {adminConfigured() ? <LoginForm /> : null}
    </div>
  );
}
