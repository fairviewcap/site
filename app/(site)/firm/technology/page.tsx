import type { Metadata } from "next";
import TechReveal from "@/components/TechReveal";

export const metadata: Metadata = {
  title: "Technology | Fairview Capital",
  description:
    "Tools change. Judgment doesn't. We use technology — including AI — to see further, never to decide for you.",
};

export default function TechnologyPage() {
  return (
    <main className="bg-[var(--fv-bg)] pt-0 pb-20 sm:pb-28">
      <TechReveal />
    </main>
  );
}
