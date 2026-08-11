import { ArrowDown, ArrowRight } from "lucide-react";

type LinkArrowProps = {
  /** Default right; use down for in-page “read on” links. */
  direction?: "right" | "down";
  size?: number;
  className?: string;
};

/**
 * Lucide arrow for selective link affordances — not for every link.
 * Use for: outbound portals, inline “more” handoffs, directional cues.
 * Skip for: filled CTAs, continue destinations, underlined text links, buttons.
 */
export default function LinkArrow({
  direction = "right",
  size = 15,
  className = "fv-link-arrow",
}: LinkArrowProps) {
  const Icon = direction === "down" ? ArrowDown : ArrowRight;
  return <Icon className={className} size={size} strokeWidth={2} aria-hidden />;
}
