"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PORTALS } from "@/lib/portals";

type CustodianLink = (typeof PORTALS.custodians.links)[number];

export default function CustodianDoor() {
  const [active, setActive] = useState<CustodianLink | null>(null);
  const shown = useRef<CustodianLink | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  if (active) shown.current = active;
  const notice = active ?? shown.current;
  const titleId = useId();
  const bodyId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  return (
    <div className="fv-portals__door fv-portals__door--custodians" data-enter="3">
      <div className="fv-portals__door-head">
        <span className="fv-portals__door-index">03</span>
        <span className="fv-portals__door-seal">Custodian login</span>
      </div>
      <div className="fv-portals__door-main">
        <p className="fv-portals__door-name">{PORTALS.custodians.label}</p>
        <p className="fv-portals__door-desc">{PORTALS.custodians.description}</p>
      </div>
      <div className="fv-portals__door-foot">
        <ul className="fv-portals__door-actions">
          {PORTALS.custodians.links.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                className="fv-portals__door-go"
                onClick={() => setActive(link)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className="fv-leave"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setActive(null);
        }}
      >
        {notice ? (
          <div className="fv-leave__panel">
            <p className="fv-leave__eyebrow">Important notice</p>
            <h2 id={titleId} className="fv-leave__title">
              {notice.lead}
            </h2>
            <p id={bodyId} className="fv-leave__body">
              {notice.body}
            </p>
            <div className="fv-leave__actions">
              <a
                className="fv-leave__continue"
                href={notice.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setActive(null)}
              >
                Continue
              </a>
              <button
                type="button"
                className="fv-leave__cancel"
                onClick={() => setActive(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
