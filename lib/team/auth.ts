import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "fv_admin";

function secret(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD is not set");
  }
  return password;
}

function tokenFor(password: string): string {
  return createHmac("sha256", password).update("fairview-admin").digest("hex");
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export async function isAdminAuthed(): Promise<boolean> {
  if (!adminConfigured()) return false;
  const jar = await cookies();
  const value = jar.get(COOKIE)?.value;
  if (!value) return false;
  const expected = tokenFor(secret());
  try {
    const a = Buffer.from(value);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthed())) {
    throw new Error("Unauthorized");
  }
}

export async function loginAdmin(password: string): Promise<boolean> {
  if (!adminConfigured()) return false;
  const expected = secret();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  const jar = await cookies();
  jar.set(COOKIE, tokenFor(expected), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return true;
}

export async function logoutAdmin(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}
