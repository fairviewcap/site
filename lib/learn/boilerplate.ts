import type { LearnArticle } from "@/lib/learn/types";

export function isLearnDisclaimer(p: string): boolean {
  return (
    /information contained in this communication/i.test(p) ||
    /past performance does not guarantee/i.test(p) ||
    /investment management and advisory services/i.test(p) ||
    /please see fairview capital/i.test(p)
  );
}

/** Content paragraphs only — strips legal boilerplate. */
export function learnBodyContent(body: string[]): string[] {
  return body.filter((p) => !isLearnDisclaimer(p) && p.trim().length > 0);
}

export function contentWordCount(body: string[]): number {
  const text = learnBodyContent(body).join(" ").trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

/** Rough reading time from content paragraphs only. */
export function estimateReadMinutes(body: string[]): number {
  const words = contentWordCount(body);
  return Math.max(1, Math.round(words / 220));
}

/** Short pieces shown as Notes rather than full essays. */
export function isLearnNote(article: Pick<LearnArticle, "body">): boolean {
  return contentWordCount(article.body) < 160;
}

export type LearnBodyBlock =
  | { type: "heading"; text: string }
  | { type: "figure"; text: string }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string };

function isFigureCaption(p: string): boolean {
  return /^fig\.?\s*\d+/i.test(p.trim());
}

function isSectionHeading(p: string): boolean {
  const t = p.trim();
  if (t.length > 90) return false;
  if (isFigureCaption(t)) return false;
  // Numbered tips / section labels: "1. Evaluate…" or "3. Convert your…"
  if (/^\d{1,2}\.\s+\S/.test(t) && !/[.!?]$/.test(t)) return true;
  // Short title-like lines without sentence punctuation
  if (
    t.length <= 70 &&
    !/[.!?]$/.test(t) &&
    /^[A-Z0-9]/.test(t) &&
    t.split(/\s+/).length <= 12
  ) {
    // Avoid treating normal short sentences without terminal punct as headings
    // unless they look like labels (Title Case / numbered / How… / Why…)
    if (/^\d+\./.test(t)) return true;
    if (/^(how|why|what|when|where)\b/i.test(t) && t.includes("?")) return true;
    if (/^[A-Z][\w'’\-]*(?:\s+[A-Z][\w'’\-]*)+$/.test(t) && t.length < 60)
      return true;
  }
  return false;
}

function isListItem(p: string): boolean {
  const t = p.trim();
  return /^[-•]\s+\S/.test(t) || /^\d+\.\s+\S/.test(t);
}

/** Classify body paragraphs into editorial blocks (headings, figures, lists, paras). */
export function classifyLearnBody(body: string[]): LearnBodyBlock[] {
  const paras = learnBodyContent(body);
  const blocks: LearnBodyBlock[] = [];
  let listBuf: string[] = [];

  const flushList = () => {
    if (listBuf.length) {
      blocks.push({ type: "list", items: listBuf });
      listBuf = [];
    }
  };

  for (const p of paras) {
    if (isFigureCaption(p)) {
      flushList();
      blocks.push({ type: "figure", text: p.trim() });
      continue;
    }
    if (isSectionHeading(p)) {
      flushList();
      blocks.push({ type: "heading", text: p.trim() });
      continue;
    }
    // Only treat bullet-style as list items; numbered section heads already caught
    if (/^[-•]\s+\S/.test(p.trim())) {
      listBuf.push(p.trim().replace(/^[-•]\s+/, ""));
      continue;
    }
    flushList();
    blocks.push({ type: "paragraph", text: p });
  }
  flushList();
  return blocks;
}
