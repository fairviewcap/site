"use client";

import { useActionState } from "react";
import {
  deleteMemberAction,
  saveMemberAction,
  type ActionState,
} from "@/app/admin/actions";
import type { TeamMember } from "@/lib/team/types";

const initial: ActionState = { ok: false };

type Props = {
  member?: TeamMember;
};

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  multiline,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const className =
    "w-full px-3 py-2 border border-[var(--fv-rule)] bg-white text-[14px] outline-none focus:border-[var(--fv-fg)]";
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] font-medium text-[var(--fv-muted)]">
        {label}
      </span>
      {multiline ? (
        <textarea
          name={name}
          rows={6}
          defaultValue={defaultValue ?? ""}
          className={className}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ""}
          className={className}
        />
      )}
    </label>
  );
}

function Check({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-[13px]">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="accent-[var(--fv-fg)]"
      />
      {label}
    </label>
  );
}

export function MemberForm({ member }: Props) {
  const [state, action, pending] = useActionState(saveMemberAction, initial);

  return (
    <div>
      <form action={action} className="flex flex-col gap-4">
        {member ? <input type="hidden" name="id" value={member.id} /> : null}

        <Field label="Name" name="name" defaultValue={member?.name} required />
        <Field
          label="Last name"
          name="lastName"
          defaultValue={member?.lastName}
        />
        <Field
          label="Slug"
          name="slug"
          defaultValue={member?.slug}
        />
        <Field label="Role / title" name="role" defaultValue={member?.role} required />
        <Field
          label="Since (year)"
          name="since"
          type="number"
          defaultValue={member?.since}
        />
        <Field
          label="Sort order"
          name="sortOrder"
          type="number"
          defaultValue={member?.sortOrder ?? 0}
        />
        <Field label="Teaser" name="teaser" defaultValue={member?.teaser} />
        <Field
          label="Image URL"
          name="image"
          defaultValue={member?.image}
        />
        <Field
          label="Portrait video URL (optional)"
          name="videoUrl"
          defaultValue={member?.videoUrl}
        />
        <Field label="Email" name="email" defaultValue={member?.email} />
        <Field label="Phone" name="phone" defaultValue={member?.phone} />
        <Field
          label="Bio (HTML)"
          name="bioHtml"
          defaultValue={member?.bioHtml}
          multiline
        />
        <Field
          label="Bio (plain text)"
          name="bioText"
          defaultValue={member?.bioText}
          multiline
        />

        <div className="flex flex-col gap-2 pt-2">
          <Check
            label="Published"
            name="published"
            defaultChecked={member?.published ?? true}
          />
          <Check label="Draft" name="draft" defaultChecked={member?.draft} />
          <Check
            label="Show on home rail"
            name="showOnRail"
            defaultChecked={member?.showOnRail ?? true}
          />
          <Check
            label="Leadership"
            name="leadership"
            defaultChecked={member?.leadership}
          />
          <Check
            label="Board of Advisors"
            name="board"
            defaultChecked={member?.board}
          />
        </div>

        {state.error ? (
          <p className="m-0 text-[13px] text-red-700">{state.error}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="h-10 bg-[var(--fv-fg)] text-white text-[13px] font-semibold disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save"}
        </button>
      </form>

      {member ? (
        <form action={deleteMemberAction} className="mt-6">
          <input type="hidden" name="id" value={member.id} />
          <button
            type="submit"
            className="text-[13px] text-red-700 hover:underline"
          >
            Delete person
          </button>
        </form>
      ) : null}
    </div>
  );
}
