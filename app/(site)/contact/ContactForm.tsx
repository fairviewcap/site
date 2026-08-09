"use client";

import { useActionState, useEffect } from "react";
import {
  submitContact,
  type ContactState,
} from "@/app/(site)/contact/actions";
import { FIRM } from "@/lib/firm";

const initial: ContactState = { ok: false };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  useEffect(() => {
    if (state.ok && state.mailto) {
      window.location.href = state.mailto;
    }
  }, [state]);

  if (state.ok) {
    return (
      <div className="fv-contact__form">
        <p className="m-0 text-[16px] leading-[1.55] tracking-[-0.015em] text-[var(--fv-fg)]">
          Thank you. Your note is ready to send — if your mail client
          didn&apos;t open, write us at{" "}
          <a
            href={`mailto:${FIRM.email}`}
            className="underline underline-offset-[5px] decoration-[var(--fv-rule-strong)] hover:decoration-[var(--fv-fg)]"
          >
            {FIRM.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="fv-contact__form">
      <label className="fv-contact__field">
        <span className="fv-contact__label">Name</span>
        <input name="name" type="text" required autoComplete="name" />
      </label>
      <label className="fv-contact__field">
        <span className="fv-contact__label">Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className="fv-contact__field">
        <span className="fv-contact__label">Message</span>
        <textarea name="message" required rows={5} />
      </label>

      {state.error ? (
        <p className="fv-contact__error">{state.error}</p>
      ) : null}

      <div className="fv-contact__footer">
        <p className="fv-contact__privacy">
          Your message is private and secure.
        </p>
        <button type="submit" disabled={pending} className="fv-contact__send">
          {pending ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}
