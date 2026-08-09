export type TeamMember = {
  id: string;
  name: string;
  lastName: string;
  slug: string;
  role: string;
  teaser: string;
  bioHtml: string;
  bioText: string;
  image: string;
  email: string | null;
  phone: string | null;
  leadership: boolean;
  /** Board of Advisors (separate from staff roster). */
  board: boolean;
  /** Visible on public team page / site. */
  published: boolean;
  draft: boolean;
  /** Year joined — caption proof point. Null if unknown. */
  since: number | null;
  /** Include in the home cast rail. */
  showOnRail: boolean;
  sortOrder: number;
};

export type TeamDatabase = {
  version: number;
  updatedAt: string;
  members: TeamMember[];
};

export function tenureCaption(member: TeamMember): string {
  if (member.since) {
    return `${member.role}, since ${member.since}`;
  }
  return member.role;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
