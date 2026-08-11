"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

type Mode = "typical" | "fairview";

/** Ownership layers above the advisor — these collapse on Fairview. */
const OWNERSHIP_LAYERS = [
  { id: "board", label: "Board" },
  { id: "parent", label: "Parent company / bank" },
  { id: "shareholders", label: "Outside shareholders" },
] as const;

/**
 * Ownership chain: middle layers collapse away — the motion is the argument.
 * Plain CSS transitions; no animation library.
 */
export default function OwnershipDiagram() {
  const id = useId();
  const typicalRef = useRef<HTMLButtonElement>(null);
  const fairviewRef = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<Mode>("typical");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const fairview = mode === "fairview";
  const rootClass = [
    "fv-own",
    fairview ? "fv-own--fairview" : "fv-own--typical",
    reducedMotion ? "fv-own--reduced" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const summary = fairview
    ? "Fairview ownership: advisor-owner connected directly to the client. Zero layers between you and the decision."
    : "Typical firm ownership: Board, parent company or bank, and outside shareholders sit above the advisor, with the client at the bottom. Three layers between you and the decision.";

  function select(next: Mode) {
    setMode(next);
    queueMicrotask(() => {
      (next === "fairview" ? fairviewRef : typicalRef).current?.focus();
    });
  }

  function onToggleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select("fairview");
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select("typical");
    }
  }

  return (
    <div className={rootClass} aria-labelledby={`${id}-title`}>
      <div className="fv-own__head">
        <p id={`${id}-title`} className="fv-own__eyebrow">
          Who owns your advisor?
        </p>
        <div
          className="fv-own__toggle"
          role="radiogroup"
          aria-label="Ownership structure"
          onKeyDown={onToggleKeyDown}
        >
          <button
            ref={typicalRef}
            type="button"
            role="radio"
            aria-checked={!fairview}
            tabIndex={!fairview ? 0 : -1}
            className={
              !fairview ? "fv-own__opt fv-own__opt--active" : "fv-own__opt"
            }
            onClick={() => setMode("typical")}
          >
            Typical firm
          </button>
          <button
            ref={fairviewRef}
            type="button"
            role="radio"
            aria-checked={fairview}
            tabIndex={fairview ? 0 : -1}
            className={
              fairview ? "fv-own__opt fv-own__opt--active" : "fv-own__opt"
            }
            onClick={() => setMode("fairview")}
          >
            Fairview
          </button>
        </div>
        <p
          className={
            fairview
              ? "fv-own__metric fv-own__metric--accent"
              : "fv-own__metric"
          }
          aria-hidden
        >
          {fairview ? (
            <>
              <span className="fv-own__metric-num fv-nums">0</span>
              <span className="fv-own__metric-text"> layers</span>
            </>
          ) : (
            <>
              <span className="fv-own__metric-num fv-nums">3</span>
              <span className="fv-own__metric-text">
                {" "}
                layers between you and the decision
              </span>
            </>
          )}
        </p>
      </div>

      <p className="sr-only" aria-live="polite">
        {summary}
      </p>

      <div className="fv-own__body" aria-hidden>
        <div className="fv-own__chain">
          <div className="fv-own__stack">
            {OWNERSHIP_LAYERS.map((layer) => (
              <div key={layer.id} className="fv-own__mid">
                <div className="fv-own__node fv-own__node--mid">
                  <span className="fv-own__label">{layer.label}</span>
                </div>
                <div className="fv-own__spine">
                  <span className="fv-own__line" />
                </div>
              </div>
            ))}
          </div>

          <div className="fv-own__node fv-own__node--full">
            <span className="fv-own__label">
              {fairview ? "Advisor-owner" : "Advisor"}
            </span>
          </div>

          <div className="fv-own__spine fv-own__spine--bridge">
            <span className="fv-own__line" />
            <span className="fv-own__join">↔</span>
          </div>

          <div
            className={
              fairview
                ? "fv-own__node fv-own__node--client fv-own__node--full"
                : "fv-own__node fv-own__node--client fv-own__node--dim"
            }
          >
            <span className="fv-own__label">Client</span>
          </div>
        </div>
      </div>
    </div>
  );
}
