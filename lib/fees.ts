/** Published advisory fee schedule — keep in sync with Form ADV. */

export type FeeTier = {
  /** Digits before the decimal (may be "0" or "1"). */
  whole: string;
  /** Digits after the decimal. */
  fraction: string;
  /** Qualifier left of the amount column. */
  band: string;
  /** Upper / threshold amount, right-aligned in the ledger. */
  amount: string;
};

export const FEE_SCHEDULE: FeeTier[] = [
  {
    whole: "1",
    fraction: "00",
    band: "Up to and including",
    amount: "$5,000,000",
  },
  {
    whole: "0",
    fraction: "75",
    band: "Above $5,000,000 to",
    amount: "$10,000,000",
  },
  {
    whole: "0",
    fraction: "50",
    band: "Above",
    amount: "$10,000,000",
  },
];
