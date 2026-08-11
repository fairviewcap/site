import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type IntentKind = "search" | "view";

type IntentEvent = {
  id: string;
  kind: IntentKind;
  query: string;
  slug?: string;
  matches: number;
  unmatched: boolean;
  createdAt: string;
};

const LOG_PATH = path.join(process.cwd(), "data", "answer-searches.json");

async function appendEvent(event: IntentEvent): Promise<void> {
  let list: IntentEvent[] = [];
  try {
    const raw = await fs.readFile(LOG_PATH, "utf8");
    list = JSON.parse(raw) as IntentEvent[];
    if (!Array.isArray(list)) list = [];
  } catch {
    list = [];
  }

  const last = list[0];
  const sameSearch =
    event.kind === "search" &&
    last &&
    last.kind === "search" &&
    last.query === event.query &&
    Date.now() - Date.parse(last.createdAt) < 30_000;
  const sameView =
    event.kind === "view" &&
    last &&
    last.kind === "view" &&
    last.slug === event.slug &&
    Date.now() - Date.parse(last.createdAt) < 60_000;

  if (sameSearch || sameView) {
    list[0] = { ...event, id: last.id };
  } else {
    list.unshift(event);
  }

  if (list.length > 2000) list = list.slice(0, 2000);

  await fs.mkdir(path.dirname(LOG_PATH), { recursive: true });
  await fs.writeFile(LOG_PATH, JSON.stringify(list, null, 2) + "\n", "utf8");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const obj =
    typeof body === "object" && body ? (body as Record<string, unknown>) : {};

  const kind: IntentKind = obj.kind === "view" ? "view" : "search";

  const slug =
    typeof obj.slug === "string" ? obj.slug.trim().slice(0, 120) : undefined;

  const query =
    typeof obj.query === "string"
      ? obj.query.trim().slice(0, 120)
      : kind === "view" && slug
        ? `view:${slug}`
        : "";

  const matches =
    typeof obj.matches === "number"
      ? Math.max(0, Math.min(500, Math.floor(obj.matches)))
      : kind === "view"
        ? 1
        : 0;

  if (kind === "search" && query.length < 2) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (kind === "view" && !slug) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    await appendEvent({
      id: crypto.randomUUID(),
      kind,
      query,
      slug,
      matches,
      unmatched: kind === "search" && matches === 0,
      createdAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ ok: true, logged: false });
  }

  return NextResponse.json({ ok: true, logged: true });
}
