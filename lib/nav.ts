/** Primary navigation — top bar + desktop mega. */

import type { HeroId } from "@/lib/heroes";

export type MenuKey = "work" | "firm";

export type MenuItem = {
  href: string;
  label: string;
  short?: string;
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
        hero: "redwoods",
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
        hero: "grandma",
      },
      { href: "/team", label: "Team", hero: "zoom" },
      { href: "/firm/fees", label: "Fees", hero: "sellbusiness" },
      { href: "/firm/privacy", label: "Confidentiality", hero: "hospital" },
      { href: "/firm/technology", label: "Technology", hero: "piano" },
      { href: "/firm/community", label: "Community", hero: "community" },
    ],
  },
};

export const PRIMARY_LINKS = [
  { href: "/team", label: "Team" },
  { href: "/answers", label: "Answers" },
  { href: "/learn", label: "Learn" },
] as const;
