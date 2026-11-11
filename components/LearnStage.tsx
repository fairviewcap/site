import Link from "next/link";
import type { LearnChannel } from "@/lib/learn/types";

const ORDER = ["letters", "insights"];

/**
 * Quarterly Letters and Investment Insights, side by side.
 */
export default function LearnStage({
  channels,
}: {
  channels: LearnChannel[];
}) {
  const posters = [...channels].sort(
    (a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug),
  );
  if (!posters.length) return null;

  return (
    <div className="fv-learn__stage">
      {posters.map((item) => (
        <Link
          key={item.slug}
          href={`/learn/${item.slug}`}
          className={`fv-learn__poster fv-learn__poster--${item.tone}`}
        >
          {(item.cover || item.figure) && item.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.poster}
              alt=""
              className="fv-learn__poster-bg"
              draggable={false}
            />
          ) : null}
          <span className="fv-learn__poster-copy">
            <span className="fv-learn__poster-title">{item.label}</span>
            <span className="fv-learn__poster-dek">{item.dek}</span>
          </span>
          {!item.cover && (item.figure || item.poster) ? (
            <span className="fv-learn__poster-figure-slot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.figure ?? item.poster}
                alt=""
                className={
                  item.figure
                    ? "fv-learn__poster-figure"
                    : "fv-learn__poster-mark"
                }
                draggable={false}
              />
            </span>
          ) : !item.poster ? (
            <span className="fv-learn__poster-ph" aria-hidden>
              Photograph
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
