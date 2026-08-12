/**
 * Seed learn_channels + learn_articles from scripts/seed/learn-articles.json
 * Usage: node --env-file=.env.local scripts/seed/learn.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });

const CHANNELS = [
  {
    slug: "letters",
    label: "Quarterly Letters",
    title: "Quarterly Letters",
    dek: "Plainspoken notes on money, markets, and life.",
    summary:
      "Fairview Capital quarterly letters to clients — market commentary, portfolio context, and how we’re thinking about the months ahead.",
    tone: "ink",
    sort_order: 0,
  },
  {
    slug: "insights",
    label: "Investment Insights",
    title: "Investment Insights",
    dek: "Transparent thinking on companies, risk, and research.",
    summary:
      "Investment insights from Fairview Capital’s research team — how we evaluate businesses, manage risk, and show our work.",
    tone: "green",
    sort_order: 1,
  },
  {
    slug: "planning",
    label: "Planning",
    title: "Planning",
    dek: "Practical guidance for families, cash flow, tax, and legacy.",
    summary:
      "Wealth planning content from Fairview Capital — decisions families face around cash flow, taxes, real estate, and preparing the next generation.",
    tone: "paper",
    sort_order: 2,
  },
];

const articles = JSON.parse(
  readFileSync(join(__dirname, "learn-articles.json"), "utf8"),
);

function sortOrderFor(channel, date) {
  // Higher = newer within channel (date as YYYYMMDD)
  return Number(String(date).replaceAll("-", ""));
}

async function main() {
  const { error: chErr } = await sb.from("learn_channels").upsert(CHANNELS, {
    onConflict: "slug",
  });
  if (chErr) {
    console.error("channels:", chErr.message);
    process.exit(1);
  }
  console.log(`upserted ${CHANNELS.length} channels`);

  const rows = articles.map((a) => ({
    slug: a.slug,
    channel: a.channel,
    title: a.title,
    date: a.date,
    excerpt: a.excerpt ?? "",
    body: a.body ?? [],
    issue: a.issue ?? null,
    image: a.image ?? null,
    published: a.published !== false,
    sort_order: sortOrderFor(a.channel, a.date),
  }));

  let { error: artErr } = await sb.from("learn_articles").upsert(rows, {
    onConflict: "channel,slug",
  });

  if (artErr && /image/i.test(artErr.message)) {
    console.warn(
      "image column missing — seeding without it. Run supabase/migrations/20260812120000_learn_articles_image.sql in the SQL editor, then re-run this script.",
    );
    const withoutImage = rows.map(({ image: _i, ...rest }) => rest);
    ({ error: artErr } = await sb.from("learn_articles").upsert(withoutImage, {
      onConflict: "channel,slug",
    }));
  }

  if (artErr) {
    console.error("articles:", artErr.message);
    process.exit(1);
  }

  const { count } = await sb
    .from("learn_articles")
    .select("*", { count: "exact", head: true });
  console.log(`upserted ${rows.length} articles (table count: ${count})`);
  for (const a of rows) {
    console.log(`  [${a.channel}] ${a.date} ${a.title}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
