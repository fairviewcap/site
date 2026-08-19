import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { isAdminAuthed } from "@/lib/team/auth";

export const metadata: Metadata = {
  title: "Admin | Fairview Capital",
  description: "Fairview Capital admin",
};

const NAV = [
  { href: "/admin/team", label: "Team" },
  { href: "/admin/learn", label: "Learn" },
  { href: "/admin/answers", label: "Answers" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/searches", label: "Searches" },
] as const;

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdminAuthed();

  return (
    <div className="min-h-dvh bg-[var(--fv-bg)] text-[var(--fv-fg)]">
      <div className="fv-frame py-10">
        <div className="max-w-3xl">
          <Link
            href={authed ? "/admin/team" : "/admin"}
            className="inline-flex mb-8"
            aria-label="Fairview Capital admin"
          >
            <Image
              src="/fairview-capital-black.png"
              alt="Fairview Capital"
              width={165}
              height={15}
              priority
              className="h-[13px] w-auto"
            />
          </Link>

          {authed ? (
            <nav className="mb-8 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="underline underline-offset-4 text-[var(--fv-muted)] hover:text-[var(--fv-fg)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}
