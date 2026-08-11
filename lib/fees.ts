/** Published advisory fee schedule — keep in sync with Form ADV. */

export type FeeTier = {
  /** Digits before the decimal (may be "0" or "1"). */
  whole: string;
  /** Digits after the decimal. */
  fraction: string;
  /** Sentence lead before the first called-out amount. */
  assetsLead: string;
  /** Dollar figures called out in the assets sentence. */
  assetsValues: string[];
  /** Word between two values, e.g. "through". */
  assetsJoin?: string;
};

export const FEE_SCHEDULE: FeeTier[] = [
  {
    whole: "1",
    fraction: "00",
    assetsLead: "On assets up to and including",
    assetsValues: ["$5,000,000"],
  },
  {
    whole: "0",
    fraction: "75",
    assetsLead: "On assets above",
    assetsValues: ["$5,000,000", "$10,000,000"],
    assetsJoin: "through",
  },
  {
    whole: "0",
    fraction: "50",
    assetsLead: "On assets above",
    assetsValues: ["$10,000,000"],
  },
];

/** What the advisory fee covers — keep aligned with Form ADV / client materials. */
export const FEE_INCLUDES = [
  "Financial planning",
  "Investment research",
  "Portfolio construction",
  "Ongoing guidance and reviews",
  "Coordination across family accounts",
] as const;

/** Marginal bands used by the illustrative fee estimator. */
export const FEE_BANDS = [
  { upTo: 5_000_000, rate: 0.01, label: "1.00%" },
  { upTo: 10_000_000, rate: 0.0075, label: "0.75%" },
  { upTo: Infinity, rate: 0.005, label: "0.50%" },
] as const;

export type FeeEstimateBand = {
  label: string;
  assets: number;
  fee: number;
};

export type FeeEstimate = {
  aum: number;
  annual: number;
  effectiveRate: number;
  bands: FeeEstimateBand[];
};

/** Blended annual advisory fee from the published schedule (illustrative). */
export function estimateAdvisoryFee(aum: number): FeeEstimate {
  const assets = Math.max(0, Math.min(aum, 100_000_000));
  const bands: FeeEstimateBand[] = [];
  let remaining = assets;
  let priorCap = 0;
  let annual = 0;

  for (const band of FEE_BANDS) {
    if (remaining <= 0) break;
    const bandWidth =
      band.upTo === Infinity ? remaining : Math.max(0, band.upTo - priorCap);
    const slice = Math.min(remaining, bandWidth);
    if (slice > 0) {
      const fee = slice * band.rate;
      bands.push({ label: band.label, assets: slice, fee });
      annual += fee;
      remaining -= slice;
    }
    priorCap = band.upTo === Infinity ? priorCap : band.upTo;
  }

  return {
    aum: assets,
    annual,
    effectiveRate: assets > 0 ? annual / assets : 0,
    bands,
  };
}

export function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPct(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`;
}
