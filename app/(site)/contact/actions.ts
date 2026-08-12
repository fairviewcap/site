"use server";

import { FIRM } from "@/lib/firm";
import { createServiceClient } from "@/lib/supabase/server";

export type ContactState = {
  ok: boolean;
  error?: string;
  mailto?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and a short note are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  try {
    const sb = createServiceClient();
    if (sb) {
      const { error } = await sb.from("contact_inquiries").insert({
        id,
        name,
        email,
        phone,
        message,
      });
      if (error) console.error("contact_inquiries:", error.message);
    }
  } catch (err) {
    console.error("contact_inquiries:", err);
  }

  const subject = encodeURIComponent(`Fairview inquiry from ${name}`);
  const body = encodeURIComponent(
    [message, "", "—", name, email, phone || undefined]
      .filter(Boolean)
      .join("\n"),
  );

  return {
    ok: true,
    mailto: `mailto:${FIRM.email}?subject=${subject}&body=${body}`,
  };
}
