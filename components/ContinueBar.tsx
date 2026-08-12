import Link from "next/link";
import LinkArrow from "@/components/LinkArrow";

export type ContinueItem = {
  href: string;
  /** Full sentence or question — the link text. */
  prompt: string;
};

/**
 * End-of-page continue bar — 2–3 contextual sentence links, not a sitemap.
 * Lives above the site footer inside the page frame.
 * Arrow marks the section label only — not each destination link.
 */
export default function ContinueBar({
  items,
  label = "Continue",
  className,
}: {
  items: ContinueItem[];
  label?: string;
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav
      className={className ? `fv-continue ${className}` : "fv-continue"}
      aria-label={label}
    >
      <p className="fv-continue__label">
        <LinkArrow size={14} className="fv-continue__mark" />
        <span>{label}</span>
      </p>
      <ul className="fv-continue__list">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="fv-continue__link">
              {item.prompt}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
