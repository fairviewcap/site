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
  /** Optional short portrait intro (phone vertical). Null if none yet. */
  videoUrl: string | null;
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

/** Public title. Older records say Administrator for this role. */
export function displayRole(role: string): string {
  return role
    .replaceAll("Client Service Administrator", "Client Service Associate")
    .replaceAll("Client Service Associate (CSA)", "Client Service Associate");
}

const BY_NAME = new Intl.Collator("en", { sensitivity: "base" });

export function compareTeamByLastName(a: TeamMember, b: TeamMember): number {
  const last = BY_NAME.compare(a.lastName, b.lastName);
  if (last !== 0) return last;
  return BY_NAME.compare(a.name, b.name);
}

export function tenureCaption(member: TeamMember): string {
  const role = displayRole(member.role);
  if (member.since) {
    return `${role}. At Fairview since ${member.since}`;
  }
  return role;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
