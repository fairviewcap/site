/**
 * Holdings philosophy exhibit — lean visual support for IM copy.
 * No tickers. No performance. Concentration contrast + refusals only.
 */

export const HOLDINGS_CONCENTRATION = {
  index: {
    label: "Broad market index",
    count: "~500",
    note: "Anonymous names",
  },
  fairview: {
    label: "Fairview core equity",
    count: "25–30",
    note: "Businesses we research ourselves",
  },
} as const;

export const HOLDINGS_REFUSALS = [
  "We don’t buy what we haven’t modeled for five years out.",
  "We don’t outsource the investment decision to a fund menu.",
  "We don’t own hundreds of names for diversification theater.",
  "We don’t chase the story of the week.",
] as const;
