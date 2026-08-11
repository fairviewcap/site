import Link from "next/link";

export type ContinueItem = {
  href: string;
  /** Full sentence or question — the link text. */
  prompt: string;
};

function ContinueMark() {
  return (
    <svg
      className="fv-continue__mark"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/**
 * End-of-page continue bar — 2–3 contextual sentence links, not a sitemap.
 * Lives above the site footer inside the page frame.
 */
export default function ContinueBar({
  items,
  label = "Continue",
}: {
  items: ContinueItem[];
  label?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav className="fv-continue" aria-label={label}>
      <p className="fv-continue__label">
        <ContinueMark />
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
