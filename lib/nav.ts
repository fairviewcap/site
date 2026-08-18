/** Primary navigation — top bar + desktop mega. */

import type { HeroId } from "@/lib/heroes";

export type MenuKey = "work" | "firm";

export type MenuItem = {
  href: string;
  label: string;
  short?: string;
  /** One line under the name — Firm contents menu. */
  line?: string;
  hero: HeroId;
};

export const MENUS: Record<
  MenuKey,
  {
    label: string;
    items: MenuItem[];
  }
> = {
  work: {
    label: "Work",
    items: [
      {
        href: "/work/wealth-management",
        label: "Wealth Management",
        hero: "belongings",
      },
      {
        href: "/work/investment-management",
        label: "Investment Management",
        hero: "piano",
      },
    ],
  },
  firm: {
    label: "Firm",
    items: [
      {
        href: "/firm/why-fairview",
        label: "Why Fairview",
        short: "Why",
        line: "Thirty years of doing it the long way.",
        hero: "acceptance",
      },
      {
        href: "/team",
        label: "Team",
        line: "Who picks up.",
        hero: "zoom",
      },
      {
        href: "/firm/fees",
        label: "Fees",
        line: "What you pay, in plain numbers.",
        hero: "sellbusiness",
      },
      {
        href: "/firm/privacy",
        label: "Confidentiality",
        line: "Good advice requires the whole truth.",
        hero: "hospital",
      },
      {
        href: "/firm/technology",
        label: "Technology",
        line: "Tools change. Relationships last.",
        hero: "piano",
      },
      {
        href: "/firm/community",
        label: "Community",
        line: "Neighbors first.",
        hero: "community",
      },
    ],
  },
};

export const PRIMARY_LINKS = [
  { href: "/team", label: "Team" },
  { href: "/answers", label: "Answers" },
  { href: "/learn", label: "Learn" },
] as const;
