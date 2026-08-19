import {
  LEARN_ARTICLES as FALLBACK_ARTICLES,
  LEARN_CHANNELS as FALLBACK_CHANNELS,
  estimateReadMinutes,
  formatLearnDate,
  formatLearnDateDot,
  formatLearnDatePlate,
} from "@/lib/learn/content";
import { isLearnNote } from "@/lib/learn/boilerplate";
import type { LearnArticle, LearnChannel, LearnChannelSlug } from "@/lib/learn/types";
import { createServiceClient } from "@/lib/supabase/server";

export {
  estimateReadMinutes,
  formatLearnDate,
  formatLearnDateDot,
  formatLearnDatePlate,
  isLearnNote,
};

const ARTICLE_SELECT =
  "slug,channel,title,date,excerpt,body,issue,image,pull_quote,published,sort_order";
const ARTICLE_SELECT_LEGACY =
  "slug,channel,title,date,excerpt,body,issue,image,published,sort_order";

type ChannelRow = {
  slug: string;
  label: string;
  title: string;
  dek: string;
  summary: string;
  tone: "ink" | "green" | "paper";
  sort_order: number;
};

type ArticleRow = {
  slug: string;
  channel: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[] | null;
  issue: string | null;
  image: string | null;
  pull_quote?: string | null;
  published: boolean;
  sort_order: number;
};

function channelFromRow(row: ChannelRow): LearnChannel {
  const fallback = FALLBACK_CHANNELS.find((c) => c.slug === row.slug);
  return {
    slug: row.slug as LearnChannelSlug,
    label: row.label,
    title: row.title,
    headline: fallback?.headline ?? row.title,
    dek: row.dek,
    summary: row.summary,
    tone: row.tone,
    poster: fallback?.poster,
  };
}

function articleFromRow(row: ArticleRow): LearnArticle {
  const fallback = FALLBACK_ARTICLES.find(
    (a) => a.channel === row.channel && a.slug === row.slug,
  );
  return {
    slug: row.slug,
    channel: row.channel as LearnChannelSlug,
    title: row.title,
    date: row.date,
    excerpt: row.excerpt,
    body: row.body ?? [],
    issue: row.issue ?? undefined,
    image: row.image ?? fallback?.image ?? null,
    pullQuote: row.pull_quote ?? fallback?.pullQuote ?? undefined,
  };
}

export async function listChannels(): Promise<LearnChannel[]> {
  const sb = createServiceClient();
  if (!sb) return FALLBACK_CHANNELS;

  const { data, error } = await sb
    .from("learn_channels")
    .select("slug,label,title,dek,summary,tone,sort_order")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("learn_channels:", error.message);
    return FALLBACK_CHANNELS;
  }
  if (!data?.length) return FALLBACK_CHANNELS;
  return (data as ChannelRow[]).map(channelFromRow);
}

export async function getChannel(
  slug: string,
): Promise<LearnChannel | undefined> {
  const channels = await listChannels();
  return channels.find((c) => c.slug === slug);
}

export async function listArticles(opts?: {
  channel?: string;
  publishedOnly?: boolean;
}): Promise<LearnArticle[]> {
  const sb = createServiceClient();
  const publishedOnly = opts?.publishedOnly !== false;

  if (!sb) {
    let articles = [...FALLBACK_ARTICLES];
    if (opts?.channel) {
      articles = articles.filter((a) => a.channel === opts.channel);
    }
    return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  const run = async (cols: string) => {
    let query = sb
      .from("learn_articles")
      .select(cols)
      .order("date", { ascending: false });
    if (opts?.channel) query = query.eq("channel", opts.channel);
    if (publishedOnly) query = query.eq("published", true);
    return query;
  };

  let { data, error } = await run(ARTICLE_SELECT);
  if (error && /pull_quote/i.test(error.message)) {
    ({ data, error } = await run(ARTICLE_SELECT_LEGACY));
  }

  if (error) {
    console.error("learn_articles:", error.message);
    return FALLBACK_ARTICLES.filter((a) =>
      opts?.channel ? a.channel === opts.channel : true,
    ).sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  if (!data?.length) {
    return FALLBACK_ARTICLES.filter((a) =>
      opts?.channel ? a.channel === opts.channel : true,
    ).sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  return (data as unknown as ArticleRow[]).map(articleFromRow);
}

export async function getArticlesByChannel(
  slug: string,
): Promise<LearnArticle[]> {
  return listArticles({ channel: slug, publishedOnly: true });
}

export async function getArticle(
  channel: string,
  slug: string,
): Promise<LearnArticle | undefined> {
  const sb = createServiceClient();
  if (!sb) {
    return FALLBACK_ARTICLES.find(
      (a) => a.channel === channel && a.slug === slug,
    );
  }

  let { data, error } = await sb
    .from("learn_articles")
    .select(ARTICLE_SELECT)
    .eq("channel", channel)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error && /pull_quote/i.test(error.message)) {
    ({ data, error } = await sb
      .from("learn_articles")
      .select(ARTICLE_SELECT_LEGACY)
      .eq("channel", channel)
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle());
  }

  if (error) {
    console.error("learn_articles get:", error.message);
    return FALLBACK_ARTICLES.find(
      (a) => a.channel === channel && a.slug === slug,
    );
  }
  if (!data) {
    return FALLBACK_ARTICLES.find(
      (a) => a.channel === channel && a.slug === slug,
    );
  }
  return articleFromRow(data as unknown as ArticleRow);
}

export async function getArticleAdmin(
  channel: string,
  slug: string,
): Promise<(LearnArticle & { published: boolean }) | null> {
  const sb = createServiceClient();
  if (!sb) {
    const a = FALLBACK_ARTICLES.find(
      (x) => x.channel === channel && x.slug === slug,
    );
    return a ? { ...a, published: true } : null;
  }

  let { data, error } = await sb
    .from("learn_articles")
    .select(ARTICLE_SELECT)
    .eq("channel", channel)
    .eq("slug", slug)
    .maybeSingle();

  if (error && /pull_quote/i.test(error.message)) {
    ({ data, error } = await sb
      .from("learn_articles")
      .select(ARTICLE_SELECT_LEGACY)
      .eq("channel", channel)
      .eq("slug", slug)
      .maybeSingle());
  }

  if (error) throw new Error(error.message);
  if (!data) return null;
  const article = articleFromRow(data as unknown as ArticleRow);
  return { ...article, published: Boolean(data.published) };
}

export async function upsertArticle(
  article: LearnArticle & { published?: boolean },
): Promise<void> {
  const sb = createServiceClient();
  if (!sb) throw new Error("Supabase is not configured");

  const row = {
    slug: article.slug,
    channel: article.channel,
    title: article.title,
    date: article.date,
    excerpt: article.excerpt,
    body: article.body,
    issue: article.issue ?? null,
    image: article.image ?? null,
    pull_quote: article.pullQuote ?? null,
    published: article.published !== false,
    sort_order: Number(String(article.date).replaceAll("-", "")),
    updated_at: new Date().toISOString(),
  };

  let { error } = await sb
    .from("learn_articles")
    .upsert(row, { onConflict: "channel,slug" });

  if (error && /pull_quote/i.test(error.message)) {
    const { pull_quote: _p, ...without } = row;
    ({ error } = await sb
      .from("learn_articles")
      .upsert(without, { onConflict: "channel,slug" }));
  }

  if (error) throw new Error(error.message);
}

export async function deleteArticle(
  channel: string,
  slug: string,
): Promise<void> {
  const sb = createServiceClient();
  if (!sb) throw new Error("Supabase is not configured");
  const { error } = await sb
    .from("learn_articles")
    .delete()
    .eq("channel", channel)
    .eq("slug", slug);
  if (error) throw new Error(error.message);
}
