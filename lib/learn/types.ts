export type LearnChannelSlug = "letters" | "insights" | "planning";

export type LearnChannel = {
  slug: LearnChannelSlug;
  /** Nav / short label */
  label: string;
  /** Hub card title */
  title: string;
  /** One-line dek */
  dek: string;
  /** Longer SEO / AI-readable summary */
  summary: string;
  /** Visual tone for the hub plate */
  tone: "ink" | "green" | "paper";
};

export type LearnArticle = {
  slug: string;
  channel: LearnChannelSlug;
  title: string;
  /** ISO date */
  date: string;
  /** Short excerpt for indexes + meta */
  excerpt: string;
  /** Body paragraphs */
  body: string[];
  /** Optional display label (e.g. Q1 2026) */
  issue?: string;
  /** Optional hero / article photo URL; omit or null when none */
  image?: string | null;
};
