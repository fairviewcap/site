"use server";

import { promises as fs } from "fs";
import path from "path";
import { FIRM } from "@/lib/firm";

export type ContactState = {
  ok: boolean;
  error?: string;
  mailto?: string;
};

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

const INQUIRIES_PATH = path.join(process.cwd(), "data", "contact-inquiries.json");

async function appendInquiry(inquiry: Inquiry): Promise<void> {
  let list: Inquiry[] = [];
  try {
    const raw = await fs.readFile(INQUIRIES_PATH, "utf8");
    list = JSON.parse(raw) as Inquiry[];
  } catch {
    list = [];
  }
  list.unshift(inquiry);
  await fs.writeFile(INQUIRIES_PATH, JSON.stringify(list, null, 2) + "\n", "utf8");
}

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

  const inquiry: Inquiry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    phone,
    message,
    createdAt: new Date().toISOString(),
  };

  try {
    await appendInquiry(inquiry);
  } catch {
    // Local/prod filesystem may be read-only — still offer mailto fallback.
  }

  const subject = encodeURIComponent(`Fairview inquiry from ${name}`);
  const body = encodeURIComponent(
    [
      message,
      "",
      "—",
      name,
      email,
      phone || undefined,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return {
    ok: true,
    mailto: `mailto:${FIRM.email}?subject=${subject}&body=${body}`,
  };
}
