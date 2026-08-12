/**
 * Seed answer_categories + answer_items from data/answers.json
 * Usage: node --env-file=.env.local scripts/seed/answers.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });
const categories = JSON.parse(
  readFileSync(join(__dirname, "../../data/answers.json"), "utf8"),
);

const catRows = categories.map((c, i) => ({
  id: c.id,
  title: c.title,
  dek: c.dek ?? "",
  sort_order: i,
}));

const { error: catErr } = await sb.from("answer_categories").upsert(catRows, {
  onConflict: "id",
});
if (catErr) {
  console.error("categories:", catErr.message);
  process.exit(1);
}

const itemRows = [];
for (const [ci, c] of categories.entries()) {
  for (const [ii, item] of c.items.entries()) {
    itemRows.push({
      category_id: c.id,
      question: item.question,
      slug: item.slug,
      answer: item.answer,
      more_href: item.more?.href ?? null,
      more_label: item.more?.label ?? null,
      sort_order: ci * 100 + ii,
      published: true,
    });
  }
}

const { error: itemErr } = await sb.from("answer_items").upsert(itemRows, {
  onConflict: "slug",
});
if (itemErr) {
  console.error("items:", itemErr.message);
  process.exit(1);
}

console.log(
  `upserted ${catRows.length} categories, ${itemRows.length} answers`,
);
