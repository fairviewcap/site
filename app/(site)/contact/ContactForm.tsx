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
      <div className="fv-contact__form fv-contact__form--done">
        <p className="fv-contact__thanks">
          Thank you. Your note is ready to send — if your mail client
          didn&apos;t open, write us at{" "}
          <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="fv-contact__form">
      <div className="fv-contact__row">
        <label className="fv-contact__field">
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder=" "
          />
          <span className="fv-contact__label">Name</span>
        </label>
        <label className="fv-contact__field">
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder=" "
          />
          <span className="fv-contact__label">Email</span>
        </label>
      </div>

      <label className="fv-contact__field fv-contact__field--area">
        <textarea name="message" required rows={5} placeholder=" " />
        <span className="fv-contact__label">Message</span>
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
