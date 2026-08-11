"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/**
 * Shared nav link — aria-current when the route matches.
 * Exact for `/`; prefix match for everything else.
 */
export default function NavLink({
  href,
  children,
  className = "",
  activeClassName = "",
  ...rest
}: Props) {
  const pathname = usePathname();
  const active =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={[className, active ? activeClassName : ""].filter(Boolean).join(" ")}
      aria-current={active ? "page" : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}
