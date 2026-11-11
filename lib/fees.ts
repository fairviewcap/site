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
