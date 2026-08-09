"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "@/app/admin/actions";

const initial: ActionState = { ok: false };

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial);

  return (
    <form action={action} className="mt-8 flex flex-col gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="text-[12px] font-medium text-[var(--fv-muted)]">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="h-10 px-3 border border-[var(--fv-rule)] bg-white text-[14px] outline-none focus:border-[var(--fv-fg)]"
        />
      </label>
      {state.error ? (
        <p className="m-0 text-[13px] text-red-700">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="h-10 bg-[var(--fv-fg)] text-white text-[13px] font-semibold disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
