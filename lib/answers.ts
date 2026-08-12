import answersData from "@/data/answers.json";

export type AnswerMoreLink = {
  href: string;
  label: string;
};

export type AnswerItem = {
  question: string;
  slug: string;
  answer: string;
  /** Optional quiet link to a deeper page. */
  more?: AnswerMoreLink;
};

export type AnswerCategory = {
  id: string;
  title: string;
  dek: string;
  items: AnswerItem[];
};

export type AnswerRecord = AnswerItem & {
  categoryId: string;
  categoryTitle: string;
};

/** Local fallback when Supabase is empty / unavailable. */
export const ANSWER_CATEGORIES_FALLBACK: AnswerCategory[] =
  answersData as AnswerCategory[];

/** @deprecated Prefer getAnswerCategories() from store — kept for transitional imports. */
export const ANSWER_CATEGORIES = ANSWER_CATEGORIES_FALLBACK;

export function allAnswerItemsFrom(
  categories: AnswerCategory[],
): AnswerItem[] {
  return categories.flatMap((c) => c.items);
}

export function allAnswerRecordsFrom(
  categories: AnswerCategory[],
): AnswerRecord[] {
  return categories.flatMap((c) =>
    c.items.map((item) => ({
      ...item,
      categoryId: c.id,
      categoryTitle: c.title,
    })),
  );
}

export function getAnswerBySlugFrom(
  categories: AnswerCategory[],
  slug: string,
): AnswerRecord | undefined {
  return allAnswerRecordsFrom(categories).find((item) => item.slug === slug);
}

export function getRelatedAnswersFrom(
  categories: AnswerCategory[],
  slug: string,
  limit = 4,
): AnswerRecord[] {
  const current = getAnswerBySlugFrom(categories, slug);
  if (!current) return [];

  const records = allAnswerRecordsFrom(categories).filter(
    (r) => r.slug !== slug,
  );
  const same = records.filter((r) => r.categoryId === current.categoryId);
  const other = records.filter((r) => r.categoryId !== current.categoryId);
  return [...same, ...other].slice(0, limit);
}

/** Sync helpers over the local fallback (build-time / offline). */
export function allAnswerItems(): AnswerItem[] {
  return allAnswerItemsFrom(ANSWER_CATEGORIES_FALLBACK);
}

export function allAnswerRecords(): AnswerRecord[] {
  return allAnswerRecordsFrom(ANSWER_CATEGORIES_FALLBACK);
}

export function getAnswerBySlug(slug: string): AnswerRecord | undefined {
  return getAnswerBySlugFrom(ANSWER_CATEGORIES_FALLBACK, slug);
}

export function getRelatedAnswers(slug: string, limit = 4): AnswerRecord[] {
  return getRelatedAnswersFrom(ANSWER_CATEGORIES_FALLBACK, slug, limit);
}
