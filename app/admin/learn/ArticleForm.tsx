"use client";

import { useActionState } from "react";
import {
  deleteArticleAction,
  saveArticleAction,
  type ActionState,
} from "@/app/admin/cms-actions";
import type { LearnArticle } from "@/lib/learn/types";

const initial: ActionState = { ok: false };

type Props = {
  article?: LearnArticle & { published?: boolean };
  channels: { slug: string; label: string }[];
};

export function ArticleForm({ article, channels }: Props) {
  const [state, action, pending] = useActionState(saveArticleAction, initial);

  return (
    <form action={action} className="mt-8 flex flex-col gap-5">
      {article ? (
        <>
          <input type="hidden" name="channel" value={article.channel} />
          <input type="hidden" name="slug" value={article.slug} />
        </>
      ) : null}

      {!article ? (
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-[var(--fv-muted)]">
            Channel
          </span>
          <select
            name="channel"
            required
            defaultValue="insights"
            className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
          >
            {channels.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p className="m-0 text-[13px] text-[var(--fv-muted)]">
          Channel: <strong>{article.channel}</strong>
        </p>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--fv-muted)]">
          Title
        </span>
        <input
          name="title"
          required
          defaultValue={article?.title}
          className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
        />
      </label>

      {!article ? (
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-[var(--fv-muted)]">
            Slug
          </span>
          <input
            name="slug"
            defaultValue=""
            placeholder="auto from title"
            className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
          />
        </label>
      ) : null}

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-[var(--fv-muted)]">
            Date
          </span>
          <input
            name="date"
            type="date"
            required
            defaultValue={article?.date}
            className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-[var(--fv-muted)]">
            Issue label
          </span>
          <input
            name="issue"
            defaultValue={article?.issue ?? ""}
            placeholder="Q1 2026"
            className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--fv-muted)]">
          Excerpt
        </span>
        <textarea
          name="excerpt"
          rows={3}
          defaultValue={article?.excerpt}
          className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--fv-muted)]">
          Image URL (optional)
        </span>
        <input
          name="image"
          defaultValue={article?.image ?? ""}
          placeholder="https://… or /photography/…"
          className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--fv-muted)]">
          Body (paragraphs separated by blank lines)
        </span>
        <textarea
          name="body"
          rows={16}
          defaultValue={article?.body.join("\n\n") ?? ""}
          className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px] font-mono leading-relaxed"
        />
      </label>

      <label className="flex items-center gap-2 text-[13px]">
        <input
          type="checkbox"
          name="published"
          defaultChecked={article?.published !== false}
        />
        Published
      </label>

      {state.error ? (
        <p className="m-0 text-[13px] text-red-800">{state.error}</p>
      ) : null}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={pending} className="fv-btn">
          {pending ? "Saving…" : "Save"}
        </button>
        {article ? (
          <button
            type="submit"
            formAction={deleteArticleAction}
            className="fv-btn--danger"
            onClick={(e) => {
              if (!confirm("Delete this article?")) e.preventDefault();
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
