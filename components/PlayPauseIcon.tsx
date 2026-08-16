/**
 * Shared play / pause glyph — rounded triangle, rounded bars.
 */
export default function PlayPauseIcon({
  playing,
  className = "fv-play-icon",
}: {
  playing: boolean;
  className?: string;
}) {
  if (playing) {
    return (
      <svg className={className} viewBox="0 0 24 24" aria-hidden>
        <rect x="6.2" y="5" width="4" height="14" rx="1.8" fill="currentColor" />
        <rect x="13.8" y="5" width="4" height="14" rx="1.8" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M8.2 5.2c0-.85.9-1.4 1.65-1.02l9.7 5.35a1.2 1.2 0 0 1 0 2.1l-9.7 5.35c-.75.38-1.65-.17-1.65-1.02V5.2z"
      />
    </svg>
  );
}
