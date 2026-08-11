"use client";

import { useEffect } from "react";

/** Logs a deep-link view into the answers intent loop (best-effort). */
export default function AnswerViewLogger({ slug }: { slug: string }) {
  useEffect(() => {
    void fetch("/api/answers/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `view:${slug}`,
        matches: 1,
        kind: "view",
        slug,
      }),
      keepalive: true,
    }).catch(() => {
      /* ignore */
    });
  }, [slug]);

  return null;
}
