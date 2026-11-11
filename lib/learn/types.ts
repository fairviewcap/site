export type LearnChannelSlug = "letters" | "insights";

export type LearnChannel = {
  slug: LearnChannelSlug;
  /** Nav / short label */
  label: string;
  /** Hub card title */
  title: string;
  /** Channel index H1 — Buffett / site voice */
  headline: string;
  /** One-line dek */
  dek: string;
  /** Longer SEO / AI-readable summary */
  summary: string;
  /** Visual tone for the hub plate */
  tone: "ink" | "green" | "paper";
  /** Hub poster plate. Letters is the Q4 art; insights is a full-bleed engraving. */
  poster?: string;
  /** Poster image fills the plate. Otherwise it sits as the mark under the title. */
  cover?: boolean;
  /** Figure laid on the poster, between the type and the bottom edge. */
  figure?: string;
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
  /** Optional editorial pull quote for letter articles */
  pullQuote?: string | null;
};
