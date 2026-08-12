"use client";

import { useActionState } from "react";
import {
  deleteAnswerAction,
  saveAnswerAction,
  type ActionState,
} from "@/app/admin/cms-actions";

const initial: ActionState = { ok: false };

type Category = { id: string; title: string };

type Props = {
  categories: Category[];
  item?: {
    id: string;
    categoryId: string;
    question: string;
    slug: string;
    answer: string;
    moreHref?: string | null;
    moreLabel?: string | null;
    sortOrder: number;
    published: boolean;
  };
};

export function AnswerForm({ categories, item }: Props) {
  const [state, action, pending] = useActionState(saveAnswerAction, initial);

  return (
    <form action={action} className="mt-8 flex flex-col gap-5">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--fv-muted)]">
          Category
        </span>
        <select
          name="categoryId"
          required
          defaultValue={item?.categoryId ?? categories[0]?.id}
          className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--fv-muted)]">
          Question
        </span>
        <input
          name="question"
          required
          defaultValue={item?.question}
          className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--fv-muted)]">
          Slug
        </span>
        <input
          name="slug"
          defaultValue={item?.slug ?? ""}
          placeholder="auto from question"
          className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--fv-muted)]">
          Answer
        </span>
        <textarea
          name="answer"
          required
          rows={6}
          defaultValue={item?.answer}
          className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-[var(--fv-muted)]">
            More link href
          </span>
          <input
            name="moreHref"
            defaultValue={item?.moreHref ?? ""}
            className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-[var(--fv-muted)]">
            More link label
          </span>
          <input
            name="moreLabel"
            defaultValue={item?.moreLabel ?? ""}
            className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--fv-muted)]">
          Sort order
        </span>
        <input
          name="sortOrder"
          type="number"
          defaultValue={item?.sortOrder ?? 0}
          className="w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px]"
        />
      </label>

      <label className="flex items-center gap-2 text-[13px]">
        <input
          type="checkbox"
          name="published"
          defaultChecked={item?.published !== false}
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
        {item ? (
          <button
            type="submit"
            formAction={deleteAnswerAction}
            className="fv-btn--danger"
            onClick={(e) => {
              if (!confirm("Delete this answer?")) e.preventDefault();
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
