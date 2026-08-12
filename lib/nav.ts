/** Primary navigation — shared by top bar and home rail prototype. */

export type MenuKey = "work" | "firm";

export const MENUS: Record<
  MenuKey,
  {
    label: string;
    items: { href: string; label: string; short?: string }[];
  }
> = {
  work: {
    label: "Work",
    items: [
      { href: "/work/wealth-management", label: "Wealth Management" },
      {
        href: "/work/investment-management",
        label: "Investment Management",
      },
    ],
  },
  firm: {
    label: "Firm",
    items: [
      { href: "/firm/why-fairview", label: "Why Fairview", short: "Why" },
      { href: "/team", label: "Team" },
      { href: "/firm/fees", label: "Fees" },
      { href: "/firm/privacy", label: "Confidentiality" },
      { href: "/firm/technology", label: "Technology" },
      { href: "/firm/community", label: "Community" },
    ],
  },
};

export const PRIMARY_LINKS = [
  { href: "/team", label: "Team" },
  { href: "/answers", label: "Answers" },
  { href: "/learn", label: "Learn" },
] as const;
