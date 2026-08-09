import { promises as fs } from "fs";
import path from "path";
import type { TeamDatabase, TeamMember } from "@/lib/team/types";

const DATA_PATH = path.join(process.cwd(), "data", "team.json");

export async function readTeamDb(): Promise<TeamDatabase> {
  const raw = await fs.readFile(DATA_PATH, "utf8");
  return JSON.parse(raw) as TeamDatabase;
}

export async function writeTeamDb(db: TeamDatabase): Promise<void> {
  const next: TeamDatabase = {
    ...db,
    version: db.version ?? 1,
    updatedAt: new Date().toISOString(),
    members: [...db.members].sort((a, b) => a.sortOrder - b.sortOrder),
  };
  await fs.writeFile(DATA_PATH, JSON.stringify(next, null, 2) + "\n", "utf8");
}

export type TeamFilter = "all" | "leadership" | "board";

export async function listMembers(opts?: {
  publishedOnly?: boolean;
  railOnly?: boolean;
  filter?: TeamFilter;
}): Promise<TeamMember[]> {
  const db = await readTeamDb();
  let members = [...db.members].sort((a, b) => a.sortOrder - b.sortOrder);
  if (opts?.publishedOnly) {
    members = members.filter((m) => m.published && !m.draft);
  }
  if (opts?.railOnly) {
    members = members.filter((m) => m.showOnRail && !m.board);
  }
  if (opts?.filter === "leadership") {
    members = members.filter((m) => m.leadership);
  } else if (opts?.filter === "board") {
    members = members.filter((m) => m.board);
  }
  return members;
}

export async function getMemberBySlug(slug: string): Promise<TeamMember | null> {
  const db = await readTeamDb();
  return (
    db.members.find(
      (m) => m.slug === slug && m.published && !m.draft,
    ) ?? null
  );
}

export async function getMember(id: string): Promise<TeamMember | null> {
  const db = await readTeamDb();
  return db.members.find((m) => m.id === id) ?? null;
}

export async function upsertMember(member: TeamMember): Promise<TeamMember> {
  const db = await readTeamDb();
  const i = db.members.findIndex((m) => m.id === member.id);
  if (i >= 0) db.members[i] = member;
  else db.members.push(member);
  await writeTeamDb(db);
  return member;
}

export async function deleteMember(id: string): Promise<void> {
  const db = await readTeamDb();
  db.members = db.members.filter((m) => m.id !== id);
  await writeTeamDb(db);
}

export async function reorderMembers(ids: string[]): Promise<void> {
  const db = await readTeamDb();
  const byId = new Map(db.members.map((m) => [m.id, m]));
  const next: TeamMember[] = [];
  ids.forEach((id, index) => {
    const m = byId.get(id);
    if (m) {
      next.push({ ...m, sortOrder: index });
      byId.delete(id);
    }
  });
  // Keep any missing at the end
  for (const m of byId.values()) {
    next.push({ ...m, sortOrder: next.length });
  }
  db.members = next;
  await writeTeamDb(db);
}
