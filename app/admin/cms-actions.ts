"use server";

import { upsertAnswerItem, deleteAnswerItem } from "@/lib/answers/store";
import { deleteArticle, upsertArticle } from "@/lib/learn/store";
import type { LearnChannelSlug } from "@/lib/learn/types";
import { createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/team/auth";
import { slugify } from "@/lib/team/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ActionState = { ok: boolean; error?: string };

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function revalidateLearn() {
  revalidatePath("/learn");
  revalidatePath("/admin/learn");
}

function revalidateAnswers() {
  revalidatePath("/answers");
  revalidatePath("/admin/answers");
}

export async function saveArticleAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }

  const channel = String(formData.get("channel") ?? "").trim() as LearnChannelSlug;
  const slugInput = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const slug = slugify(slugInput || title);
  const date = String(formData.get("date") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const pullQuote = String(formData.get("pullQuote") ?? "").trim() || null;
  const issue = String(formData.get("issue") ?? "").trim() || undefined;
  const image = String(formData.get("image") ?? "").trim() || null;
  const bodyRaw = String(formData.get("body") ?? "");
  const body = bodyRaw
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const published = bool(formData, "published");

  if (!channel || !title || !date) {
    return { ok: false, error: "Channel, title, and date are required." };
  }

  try {
    await upsertArticle({
      channel,
      slug,
      title,
      date,
      excerpt,
      body,
      issue,
      image,
      pullQuote,
      published,
    });
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Save failed",
    };
  }

  revalidateLearn();
  revalidatePath(`/learn/${channel}`);
  revalidatePath(`/learn/${channel}/${slug}`);
  redirect(`/admin/learn/${channel}/${slug}`);
}

export async function deleteArticleAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const channel = String(formData.get("channel") ?? "");
  const slug = String(formData.get("slug") ?? "");
  if (channel && slug) await deleteArticle(channel, slug);
  revalidateLearn();
  redirect("/admin/learn");
}

export async function saveAnswerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, error: "Unauthorized" };
  }

  const id = String(formData.get("id") ?? "").trim() || undefined;
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const question = String(formData.get("question") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugify(slugInput || question);
  const answer = String(formData.get("answer") ?? "").trim();
  const moreHref = String(formData.get("moreHref") ?? "").trim() || null;
  const moreLabel = String(formData.get("moreLabel") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const published = bool(formData, "published");

  if (!categoryId || !question || !answer) {
    return { ok: false, error: "Category, question, and answer are required." };
  }

  try {
    await upsertAnswerItem({
      id,
      categoryId,
      question,
      slug,
      answer,
      moreHref,
      moreLabel,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
      published,
    });
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Save failed",
    };
  }

  revalidateAnswers();
  redirect("/admin/answers");
}

export async function deleteAnswerAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await deleteAnswerItem(id);
  revalidateAnswers();
  redirect("/admin/answers");
}

export async function listContactInquiries() {
  await requireAdmin();
  const sb = createServiceClient();
  if (!sb) return [];
  const { data, error } = await sb
    .from("contact_inquiries")
    .select("id,name,email,phone,message,created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listAnswerIntentEvents() {
  await requireAdmin();
  const sb = createServiceClient();
  if (!sb) return [];
  const { data, error } = await sb
    .from("answer_intent_events")
    .select("id,kind,query,slug,matches,unmatched,created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw new Error(error.message);
  return data ?? [];
}
