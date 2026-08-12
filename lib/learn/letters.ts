import type { LearnArticle } from "@/lib/learn/types";
import {
  isLearnDisclaimer,
  learnBodyContent,
} from "@/lib/learn/boilerplate";

export { isLearnDisclaimer, learnBodyContent };

export function quarterFromArticle(article: LearnArticle): 1 | 2 | 3 | 4 {
  const fromIssue = article.issue?.match(/Q([1-4])/i);
  if (fromIssue) return Number(fromIssue[1]) as 1 | 2 | 3 | 4;
  const month = Number(article.date.slice(5, 7));
  if (month <= 3) return 1;
  if (month <= 6) return 2;
  if (month <= 9) return 3;
  return 4;
}

export function formatLetterMonth(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

export function formatLetterMonthYear(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** Split body text into sentences without breaking on decimals / abbreviations. */
function sentencesFrom(text: string): string[] {
  const parts = text.match(/[^.!?]+[.!?]+(?:["”']+)?/g);
  if (!parts) return [];
  return parts.map((s) => s.trim()).filter(Boolean);
}

function scoreSentence(s: string): number {
  const len = s.length;
  if (len < 70 || len > 230) return -1;
  if (isLearnDisclaimer(s)) return -1;
  if (/^\d/.test(s)) return -1;
  return 100 - Math.abs(len - 140);
}

/** Auto-pick a pull line from body paragraphs (sentence-aware). */
export function pickLetterPullQuoteFromBody(body: string[]): string | null {
  const content = learnBodyContent(body);
  const scored: { s: string; score: number }[] = [];

  for (const p of content) {
    if (p.length >= 90 && p.length <= 240 && !isLearnDisclaimer(p)) {
      scored.push({ s: p, score: scoreSentence(p) + 5 });
    }
    for (const s of sentencesFrom(p)) {
      scored.push({ s, score: scoreSentence(s) });
    }
  }

  const best = scored
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score)[0];
  return best?.s ?? null;
}

/** Prefer editorial pullQuote; fall back to a body sentence. */
export function resolveLetterPullQuote(article: LearnArticle): string | null {
  const editorial = article.pullQuote?.trim();
  if (editorial) return editorial;
  return pickLetterPullQuoteFromBody(article.body);
}

/** @deprecated use pickLetterPullQuoteFromBody */
export function pickLetterPullQuote(body: string[]): string | null {
  return pickLetterPullQuoteFromBody(body);
}

export function letterNeighbors(
  letters: LearnArticle[],
  slug: string,
): { prev: LearnArticle | null; next: LearnArticle | null } {
  const sorted = [...letters].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : 0,
  );
  const i = sorted.findIndex((a) => a.slug === slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: sorted[i - 1] ?? null,
    next: sorted[i + 1] ?? null,
  };
}
