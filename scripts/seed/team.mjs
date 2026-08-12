/**
 * Seed team_members from data/team.json
 * Usage: node --env-file=.env.local scripts/seed/team.mjs
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
const db = JSON.parse(
  readFileSync(join(__dirname, "../../data/team.json"), "utf8"),
);

const rows = db.members.map((m) => ({
  id: m.id,
  name: m.name,
  last_name: m.lastName ?? "",
  slug: m.slug,
  role: m.role ?? "",
  teaser: m.teaser ?? "",
  bio_html: m.bioHtml ?? "",
  bio_text: m.bioText ?? "",
  image: m.image ?? "",
  video_url: m.videoUrl ?? null,
  email: m.email ?? null,
  phone: m.phone ?? null,
  leadership: Boolean(m.leadership),
  board: Boolean(m.board),
  published: Boolean(m.published),
  draft: Boolean(m.draft),
  since: m.since ?? null,
  show_on_rail: Boolean(m.showOnRail),
  sort_order: Number(m.sortOrder ?? 0),
  updated_at: new Date().toISOString(),
}));

const { error } = await sb.from("team_members").upsert(rows, {
  onConflict: "id",
});
if (error) {
  console.error(error.message);
  process.exit(1);
}
console.log(`upserted ${rows.length} team members`);
