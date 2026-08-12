import { Fragment, type ReactNode } from "react";
import { classifyLearnBody } from "@/lib/learn/boilerplate";

export default function LearnArticleBody({
  body,
  pullQuote,
}: {
  body: string[];
  pullQuote?: string | null;
}) {
  const blocks = classifyLearnBody(body);
  if (blocks.length === 0) return null;

  const pull = pullQuote?.trim() || null;
  let placedPull = false;

  return (
    <div className="fv-learn-prose">
      {blocks.map((block, i) => {
        const key = `${block.type}-${i}`;
        let el: ReactNode = null;

        if (block.type === "heading") {
          el = <h2 className="fv-learn-prose__h">{block.text}</h2>;
        } else if (block.type === "figure") {
          el = <p className="fv-learn-prose__figure">{block.text}</p>;
        } else if (block.type === "list") {
          el = (
            <ul className="fv-learn-prose__list">
              {block.items.map((item, j) => (
                <li key={`${j}-${item.slice(0, 24)}`}>{item}</li>
              ))}
            </ul>
          );
        } else {
          el = (
            <p className={i === 0 ? "fv-learn-prose__lead" : undefined}>
              {block.text}
            </p>
          );
        }

        const showPull =
          pull && !placedPull && block.type === "paragraph" && i === 0;
        if (showPull) placedPull = true;

        return (
          <Fragment key={key}>
            {el}
            {showPull ? (
              <blockquote className="fv-learn-prose__pull">
                <p>{pull}</p>
              </blockquote>
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}
