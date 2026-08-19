"use client";

import { useId, useMemo, useState, type CSSProperties } from "react";
import {
  estimateAdvisoryFee,
  formatPct,
  formatUsd,
} from "@/lib/fees";

const PRESETS = [
  { label: "$2M", value: 2_000_000 },
  { label: "$5M", value: 5_000_000 },
  { label: "$10M", value: 10_000_000 },
  { label: "$25M", value: 25_000_000 },
] as const;

const MIN = 1_000_000;
const MAX = 50_000_000;
const STEP = 500_000;

/**
 * Illustrative blended fee from the published schedule — inspect economics,
 * not a quote. Families may combine accounts; actual fees follow the ADV.
 */
export default function FeeEstimator() {
  const id = useId();
  const [aum, setAum] = useState(5_000_000);
  const estimate = useMemo(() => estimateAdvisoryFee(aum), [aum]);

  return (
    <div className="fv-fee-est">
      <div className="fv-fee-est__copy">
        <header className="fv-fee-est__intro">
          <p className="fv-fee-est__eyebrow">Your number</p>
          <h2 id={`${id}-title`} className="fv-fee-est__title">
            See it on your assets
          </h2>
          <p className="fv-fee-est__lede">
            Drag to a level that feels like yours. The schedule is marginal — as
            assets rise, the rate on the next dollar falls. Illustrative, not a
            quote.
          </p>
        </header>

        <div className="fv-fee-est__presets" role="group" aria-label="Presets">
          {PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              className={
                aum === p.value
                  ? "fv-fee-est__preset fv-fee-est__preset--active"
                  : "fv-fee-est__preset"
              }
              onClick={() => setAum(p.value)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <label className="fv-fee-est__slider-label" htmlFor={id}>
          Assets under management
          <span className="fv-fee-est__aum fv-nums">{formatUsd(aum)}</span>
        </label>
        <input
          id={id}
          className="fv-fee-est__slider"
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={aum}
          onChange={(e) => setAum(Number(e.target.value))}
          aria-valuetext={formatUsd(aum)}
          style={
            {
              "--fv-est-progress": `${((aum - MIN) / (MAX - MIN)) * 100}%`,
            } as CSSProperties
          }
        />
      </div>

      <div className="fv-fee-est__visual">
        <div className="fv-fee-est__readout" aria-live="polite">
          <div className="fv-fee-est__stat">
            <span className="fv-fee-est__stat-label">
              Illustrative annual fee
            </span>
            <span className="fv-fee-est__stat-value fv-fee-est__stat-value--hit fv-nums">
              {formatUsd(estimate.annual)}
            </span>
          </div>
          <div className="fv-fee-est__stat">
            <span className="fv-fee-est__stat-label">Effective rate</span>
            <span className="fv-fee-est__stat-value fv-nums">
              {formatPct(estimate.effectiveRate)}
            </span>
          </div>
        </div>

        <ul className="fv-fee-est__bands">
          {estimate.bands.map((band) => (
            <li key={band.label}>
              <span className="fv-fee-est__band-rate fv-nums">{band.label}</span>
              <span className="fv-fee-est__band-assets fv-nums">
                on {formatUsd(band.assets)}
              </span>
              <span className="fv-fee-est__band-fee fv-nums">
                {formatUsd(band.fee)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="fv-fee-est__note">
        Illustrative only — not a quote or offer. Billed quarterly. We combine
        assets across families where appropriate, which can further reduce the
        blended rate. See Form ADV for the governing schedule.
      </p>
    </div>
  );
}
