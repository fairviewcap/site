import type { CSSProperties } from "react";
import { HEROES, type HeroId } from "@/lib/heroes";

type HeroPhotoProps = {
  id: HeroId;
  /** Override default alt from the catalog. */
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /**
   * ladder — art-directed h/v for full-bleed heroes (default)
   * wide — same art direction; for in-body wide planes
   * tall — vertical only (portrait/in-letter slots)
   */
  variant?: "ladder" | "wide" | "tall";
  /** object-position hint for the img */
  objectPosition?: string;
};

/**
 * Art-directed hero: vertical AVIF on small screens, horizontal from 768px up.
 * Already optimized on disk — served as static files, no Next Image pipeline.
 */
export default function HeroPhoto({
  id,
  alt,
  className,
  imgClassName = "fv-hero-photo",
  priority = false,
  variant = "ladder",
  objectPosition,
}: HeroPhotoProps) {
  const hero = HEROES[id];
  const label = alt ?? hero.alt;
  const style: CSSProperties | undefined = objectPosition
    ? { objectPosition }
    : undefined;

  if (variant === "tall") {
    return (
      <img
        src={hero.mobile}
        alt={label}
        width={1600}
        height={2000}
        className={[imgClassName, className].filter(Boolean).join(" ")}
        style={style}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    );
  }

  return (
    <picture className={className}>
      <source
        media="(min-width: 768px)"
        srcSet={hero.desktop}
        type="image/avif"
        width={2400}
        height={1200}
      />
      <img
        src={hero.mobile}
        alt={label}
        width={1600}
        height={2000}
        className={imgClassName}
        style={style}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </picture>
  );
}
