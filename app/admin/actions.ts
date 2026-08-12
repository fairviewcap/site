"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  adminConfigured,
  isAdminAuthed,
  loginAdmin,
  logoutAdmin,
  requireAdmin,
} from "@/lib/team/auth";
import {
  deleteMember,
  getMember,
  listMembers,
  upsertMember,
} from "@/lib/team/store";
import { slugify, type TeamMember } from "@/lib/team/types";

export type ActionState = { ok: boolean; error?: string };

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!adminConfigured()) {
    return {
      ok: false,
      error: "Set ADMIN_PASSWORD in .env.local first.",
    };
  }
  const password = String(formData.get("password") ?? "");
  const ok = await loginAdmin(password);
  if (!ok) return { ok: false, error: "Wrong password." };
  redirect("/admin/team");
}

export async function logoutAction(): Promise<void> {
  await logoutAdmin();
  redirect("/admin");
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function memberFromForm(formData: FormData, existing?: TeamMember): TeamMember {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || name);
  const sinceRaw = String(formData.get("since") ?? "").trim();
  const since = sinceRaw ? Number(sinceRaw) : null;
  const sortOrder = Number(formData.get("sortOrder") ?? existing?.sortOrder ?? 0);
  const draft = bool(formData, "draft");
  const published = bool(formData, "published") && !draft;

  return {
    id: existing?.id ?? slug,
    name,
    lastName: String(formData.get("lastName") ?? "").trim(),
    slug,
    role: String(formData.get("role") ?? "").trim(),
    teaser: String(formData.get("teaser") ?? "").trim(),
    bioHtml: String(formData.get("bioHtml") ?? "").trim(),
    bioText: String(formData.get("bioText") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    videoUrl: String(formData.get("videoUrl") ?? "").trim() || null,
    email: String(formData.get("email") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    leadership: bool(formData, "leadership"),
    board: bool(formData, "board"),
    published,
    draft,
    since: Number.isFinite(since as number) ? since : null,
    showOnRail: bool(formData, "showOnRail"),
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
  };
}

export async function saveMemberAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }

  const id = String(formData.get("id") ?? "").trim();
  const existing = id ? await getMember(id) : null;
  const member = memberFromForm(formData, existing ?? undefined);

  if (!member.name || !member.role) {
    return { ok: false, error: "Name and role are required." };
  }

  // New member: put at end if sortOrder unset
  if (!existing) {
    const all = await listMembers();
    if (!formData.get("sortOrder")) {
      member.sortOrder = all.length;
    }
    member.id = member.slug;
  }

  await upsertMember(member);
  revalidatePath("/");
  revalidatePath("/team");
  revalidatePath("/admin/team");
  redirect(`/admin/team/${member.id}`);
}

export async function deleteMemberAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteMember(id);
  revalidatePath("/");
  revalidatePath("/team");
  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function ensureAdminOrRedirect(): Promise<boolean> {
  return isAdminAuthed();
}
