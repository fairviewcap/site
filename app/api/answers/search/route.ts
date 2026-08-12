import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type IntentKind = "search" | "view";

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
    const sb = createServiceClient();
    if (!sb) {
      return NextResponse.json({ ok: true, logged: false });
    }

    const { error } = await sb.from("answer_intent_events").insert({
      kind,
      query,
      slug: slug ?? null,
      matches,
      unmatched: kind === "search" && matches === 0,
    });
    if (error) {
      console.error("answer_intent_events:", error.message);
      return NextResponse.json({ ok: true, logged: false });
    }
  } catch {
    return NextResponse.json({ ok: true, logged: false });
  }

  return NextResponse.json({ ok: true, logged: true });
}
