import type { Metadata } from "next";
import TechRevealInline from "@/components/TechRevealInline";

export const metadata: Metadata = {
  title: "Technology (inline reel) | Fairview Capital",
  description:
    "Tools change. Relationships last. Prototype — inline Tools: reel headline.",
  robots: { index: false, follow: false },
};

export default function TechnologyInlinePrototypePage() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0 pb-20 sm:pb-28">
      <TechRevealInline />
    </main>
  );
}
