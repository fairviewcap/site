import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-[var(--fv-bg)] text-[var(--fv-fg)]">
      <div className="fv-frame py-10">
        <div className="max-w-3xl">{children}</div>
      </div>
    </div>
  );
}
