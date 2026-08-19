import { get } from "@vercel/blob";
import { getReviewClip } from "@/lib/review/clips";

/**
 * Streams private Blob MP4s to the review modal.
 * Locally, Blob OIDC is off — fall back to /review/{id}.mp4.
 */
export async function GET(
  request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  if (!getReviewClip(id)) {
    return new Response("Not found", { status: 404 });
  }

  const range = request.headers.get("range");
  const names = [`${id}.mp4`, `review/${id}.mp4`];

  for (const pathname of names) {
    try {
      const result = await get(pathname, {
        access: "private",
        headers: range ? { Range: range } : undefined,
      });
      if (!result || result.statusCode !== 200 || !result.stream) continue;

      const headers = new Headers();
      headers.set("Content-Type", result.blob.contentType || "video/mp4");
      headers.set("Accept-Ranges", "bytes");
      headers.set("Cache-Control", "private, max-age=3600");
      if (result.blob.size) {
        headers.set("Content-Length", String(result.blob.size));
      }
      const contentRange = result.headers.get("content-range");
      if (contentRange) headers.set("Content-Range", contentRange);

      return new Response(result.stream, {
        status: range && contentRange ? 206 : 200,
        headers,
      });
    } catch {
      /* try the next name */
    }
  }

  return Response.redirect(new URL(`/review/${id}.mp4`, request.url), 307);
}
