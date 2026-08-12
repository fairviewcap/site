import { promises as fs } from "fs";
import path from "path";
import { createServiceClient } from "@/lib/supabase/server";
import type { TeamDatabase, TeamMember } from "@/lib/team/types";

const DATA_PATH = path.join(process.cwd(), "data", "team.json");

type TeamRow = {
  id: string;
  name: string;
  last_name: string;
  slug: string;
  role: string;
  teaser: string;
  bio_html: string;
  bio_text: string;
  image: string;
  video_url: string | null;
  email: string | null;
  phone: string | null;
  leadership: boolean;
  board: boolean;
  published: boolean;
  draft: boolean;
  since: number | null;
  show_on_rail: boolean;
  sort_order: number;
};

function fromRow(row: TeamRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    lastName: row.last_name,
    slug: row.slug,
    role: row.role,
    teaser: row.teaser,
    bioHtml: row.bio_html,
    bioText: row.bio_text,
    image: row.image ?? "",
    videoUrl: row.video_url,
    email: row.email,
    phone: row.phone,
    leadership: row.leadership,
    board: row.board,
    published: row.published,
    draft: row.draft,
    since: row.since,
    showOnRail: row.show_on_rail,
    sortOrder: row.sort_order,
  };
}

function toRow(member: TeamMember): TeamRow {
  return {
    id: member.id,
    name: member.name,
    last_name: member.lastName,
    slug: member.slug,
    role: member.role,
    teaser: member.teaser,
    bio_html: member.bioHtml,
    bio_text: member.bioText,
    image: member.image,
    video_url: member.videoUrl,
    email: member.email,
    phone: member.phone,
    leadership: member.leadership,
    board: member.board,
    published: member.published,
    draft: member.draft,
    since: member.since,
    show_on_rail: member.showOnRail,
    sort_order: member.sortOrder,
  };
}

async function readTeamDbFile(): Promise<TeamDatabase> {
  const raw = await fs.readFile(DATA_PATH, "utf8");
  return JSON.parse(raw) as TeamDatabase;
}

async function writeTeamDbFile(db: TeamDatabase): Promise<void> {
  const next: TeamDatabase = {
    ...db,
    version: db.version ?? 1,
    updatedAt: new Date().toISOString(),
    members: [...db.members].sort((a, b) => a.sortOrder - b.sortOrder),
  };
  await fs.writeFile(DATA_PATH, JSON.stringify(next, null, 2) + "\n", "utf8");
}

async function listFromDb(): Promise<TeamMember[] | null> {
  const sb = createServiceClient();
  if (!sb) return null;

  const { data, error } = await sb
    .from("team_members")
    .select(
      "id,name,last_name,slug,role,teaser,bio_html,bio_text,image,video_url,email,phone,leadership,board,published,draft,since,show_on_rail,sort_order",
    )
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("team_members:", error.message);
    return null;
  }
  if (!data?.length) return null;
  return (data as TeamRow[]).map(fromRow);
}

export async function readTeamDb(): Promise<TeamDatabase> {
  const fromDb = await listFromDb();
  if (fromDb) {
    return {
      version: 1,
      updatedAt: new Date().toISOString(),
      members: fromDb,
    };
  }
  return readTeamDbFile();
}

export async function writeTeamDb(db: TeamDatabase): Promise<void> {
  const sb = createServiceClient();
  if (!sb) {
    await writeTeamDbFile(db);
    return;
  }

  const rows = [...db.members]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(toRow);

  const { error } = await sb.from("team_members").upsert(rows, {
    onConflict: "id",
  });
  if (error) throw new Error(error.message);
}

export type TeamFilter = "all" | "leadership" | "board";

export async function listMembers(opts?: {
  publishedOnly?: boolean;
  railOnly?: boolean;
  withVideo?: boolean;
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
  if (opts?.withVideo) {
    members = members.filter((m) => Boolean(m.videoUrl));
  }
  if (opts?.filter === "leadership") {
    members = members.filter((m) => m.leadership);
  } else if (opts?.filter === "board") {
    members = members.filter((m) => m.board);
  }
  return members;
}

export async function getMemberBySlug(slug: string): Promise<TeamMember | null> {
  const members = await listMembers({ publishedOnly: true });
  return members.find((m) => m.slug === slug) ?? null;
}

export async function getMember(id: string): Promise<TeamMember | null> {
  const db = await readTeamDb();
  return db.members.find((m) => m.id === id) ?? null;
}

export async function upsertMember(member: TeamMember): Promise<TeamMember> {
  const sb = createServiceClient();
  if (sb) {
    const { error } = await sb.from("team_members").upsert(toRow(member), {
      onConflict: "id",
    });
    if (error) throw new Error(error.message);
    return member;
  }

  const db = await readTeamDbFile();
  const i = db.members.findIndex((m) => m.id === member.id);
  if (i >= 0) db.members[i] = member;
  else db.members.push(member);
  await writeTeamDbFile(db);
  return member;
}

export async function deleteMember(id: string): Promise<void> {
  const sb = createServiceClient();
  if (sb) {
    const { error } = await sb.from("team_members").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return;
  }

  const db = await readTeamDbFile();
  db.members = db.members.filter((m) => m.id !== id);
  await writeTeamDbFile(db);
}

export async function reorderMembers(ids: string[]): Promise<void> {
  const members = await listMembers();
  const byId = new Map(members.map((m) => [m.id, m]));
  const next: TeamMember[] = [];
  ids.forEach((id, index) => {
    const m = byId.get(id);
    if (m) {
      next.push({ ...m, sortOrder: index });
      byId.delete(id);
    }
  });
  for (const m of byId.values()) {
    next.push({ ...m, sortOrder: next.length });
  }

  const sb = createServiceClient();
  if (sb) {
    for (const m of next) {
      const { error } = await sb
        .from("team_members")
        .update({ sort_order: m.sortOrder })
        .eq("id", m.id);
      if (error) throw new Error(error.message);
    }
    return;
  }

  await writeTeamDbFile({
    version: 1,
    updatedAt: new Date().toISOString(),
    members: next,
  });
}
