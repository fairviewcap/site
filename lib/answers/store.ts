import {
  ANSWER_CATEGORIES_FALLBACK,
  allAnswerItemsFrom,
  allAnswerRecordsFrom,
  getAnswerBySlugFrom,
  getRelatedAnswersFrom,
  type AnswerCategory,
  type AnswerItem,
  type AnswerRecord,
} from "@/lib/answers";
import { createServiceClient } from "@/lib/supabase/server";

type CategoryRow = {
  id: string;
  title: string;
  dek: string;
  sort_order: number;
};

type ItemRow = {
  id: string;
  category_id: string;
  question: string;
  slug: string;
  answer: string;
  more_href: string | null;
  more_label: string | null;
  sort_order: number;
  published: boolean;
};

function itemFromRow(row: ItemRow): AnswerItem {
  const item: AnswerItem = {
    question: row.question,
    slug: row.slug,
    answer: row.answer,
  };
  if (row.more_href && row.more_label) {
    item.more = { href: row.more_href, label: row.more_label };
  }
  return item;
}

async function fetchCategoriesFromDb(
  publishedOnly: boolean,
): Promise<AnswerCategory[] | null> {
  const sb = createServiceClient();
  if (!sb) return null;

  const { data: cats, error: catErr } = await sb
    .from("answer_categories")
    .select("id,title,dek,sort_order")
    .order("sort_order", { ascending: true });

  if (catErr) {
    console.error("answer_categories:", catErr.message);
    return null;
  }
  if (!cats?.length) return null;

  let itemQuery = sb
    .from("answer_items")
    .select(
      "id,category_id,question,slug,answer,more_href,more_label,sort_order,published",
    )
    .order("sort_order", { ascending: true });

  if (publishedOnly) {
    itemQuery = itemQuery.eq("published", true);
  }

  const { data: items, error: itemErr } = await itemQuery;
  if (itemErr) {
    console.error("answer_items:", itemErr.message);
    return null;
  }

  const byCat = new Map<string, AnswerItem[]>();
  for (const row of (items ?? []) as ItemRow[]) {
    const list = byCat.get(row.category_id) ?? [];
    list.push(itemFromRow(row));
    byCat.set(row.category_id, list);
  }

  return (cats as CategoryRow[]).map((c) => ({
    id: c.id,
    title: c.title,
    dek: c.dek,
    items: byCat.get(c.id) ?? [],
  }));
}

export async function getAnswerCategories(opts?: {
  publishedOnly?: boolean;
}): Promise<AnswerCategory[]> {
  const publishedOnly = opts?.publishedOnly !== false;
  const fromDb = await fetchCategoriesFromDb(publishedOnly);
  if (fromDb && fromDb.some((c) => c.items.length > 0)) return fromDb;
  return ANSWER_CATEGORIES_FALLBACK;
}

export async function allAnswerItems(opts?: {
  publishedOnly?: boolean;
}): Promise<AnswerItem[]> {
  return allAnswerItemsFrom(await getAnswerCategories(opts));
}

export async function allAnswerRecords(opts?: {
  publishedOnly?: boolean;
}): Promise<AnswerRecord[]> {
  return allAnswerRecordsFrom(await getAnswerCategories(opts));
}

export async function getAnswerBySlug(
  slug: string,
): Promise<AnswerRecord | undefined> {
  return getAnswerBySlugFrom(await getAnswerCategories(), slug);
}

export async function getRelatedAnswers(
  slug: string,
  limit = 4,
): Promise<AnswerRecord[]> {
  return getRelatedAnswersFrom(await getAnswerCategories(), slug, limit);
}

export async function upsertAnswerItem(input: {
  id?: string;
  categoryId: string;
  question: string;
  slug: string;
  answer: string;
  moreHref?: string | null;
  moreLabel?: string | null;
  sortOrder?: number;
  published?: boolean;
}): Promise<void> {
  const sb = createServiceClient();
  if (!sb) throw new Error("Supabase is not configured");

  const row = {
    category_id: input.categoryId,
    question: input.question,
    slug: input.slug,
    answer: input.answer,
    more_href: input.moreHref || null,
    more_label: input.moreLabel || null,
    sort_order: input.sortOrder ?? 0,
    published: input.published !== false,
  };

  if (input.id) {
    const { error } = await sb.from("answer_items").update(row).eq("id", input.id);
    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await sb.from("answer_items").upsert(row, {
    onConflict: "slug",
  });
  if (error) throw new Error(error.message);
}

export async function deleteAnswerItem(id: string): Promise<void> {
  const sb = createServiceClient();
  if (!sb) throw new Error("Supabase is not configured");
  const { error } = await sb.from("answer_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function listAnswerItemsAdmin(): Promise<
  (AnswerRecord & { id: string; published: boolean; sortOrder: number })[]
> {
  const sb = createServiceClient();
  if (!sb) {
    return allAnswerRecordsFrom(ANSWER_CATEGORIES_FALLBACK).map((r, i) => ({
      ...r,
      id: r.slug,
      published: true,
      sortOrder: i,
    }));
  }

  const { data, error } = await sb
    .from("answer_items")
    .select(
      "id,category_id,question,slug,answer,more_href,more_label,sort_order,published,answer_categories(title)",
    )
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => {
    const rawCat = row.answer_categories as
      | { title: string }
      | { title: string }[]
      | null;
    const cat = Array.isArray(rawCat) ? rawCat[0] : rawCat;
    const item = itemFromRow(row as ItemRow);
    return {
      ...item,
      id: row.id as string,
      categoryId: row.category_id as string,
      categoryTitle: cat?.title ?? "",
      published: Boolean(row.published),
      sortOrder: Number(row.sort_order ?? 0),
    };
  });
}

export async function getAnswerItemAdmin(id: string) {
  const sb = createServiceClient();
  if (!sb) return null;
  const { data, error } = await sb
    .from("answer_items")
    .select(
      "id,category_id,question,slug,answer,more_href,more_label,sort_order,published",
    )
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
