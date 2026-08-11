/** Content for /firm/why-fairview — keep claims aligned with Form ADV / figures. */

export type WhyFigure = {
  value: string;
  label: string;
  /** Optional provenance shown under the value. */
  note?: string;
};

export type WhyTimelineEntry = {
  when: string;
  what: string;
};

/** Instrument readout — omit unverified retention until confirmed. */
export const WHY_FIGURES: WhyFigure[] = [
  {
    value: "1995",
    label: "Founded in Marin County, California",
  },
  {
    value: "$2.14B",
    label: "Client assets under management",
    note: "As of Q1 2026",
  },
  {
    value: "100%",
    label: "Owned by the advisors working here",
  },
  {
    value: "$2M",
    label: "Typical minimum account size",
  },
  {
    value: "17",
    label: "People running the entire firm",
  },
  {
    value: "0",
    label: "Salespeople on staff",
  },
];

/** Strongest cycle markers — full archive lives in the copy draft if needed. */
export const WHY_TIMELINE: WhyTimelineEntry[] = [
  {
    when: "1995",
    what: "Fairview founded, Marin County",
  },
  {
    when: "2000–02",
    what: "Dot-com crash — hit Bay Area wealth harder than almost anywhere",
  },
  {
    when: "2007–09",
    what: "Global Financial Crisis, Lehman Brothers collapse",
  },
  {
    when: "2011",
    what: "U.S. credit rating downgraded for the first time in history",
  },
  {
    when: "2020",
    what: "COVID crash — the fastest bear market on record, then the fastest recovery",
  },
  {
    when: "2023",
    what: "Silicon Valley Bank collapses, a few miles from our own office",
  },
  {
    when: "2023–25",
    what: "Private equity buys up independent RIAs nationwide. Fairview doesn’t sell",
  },
  {
    when: "2026",
    what: "$2.14B under management. Same firm since 1995",
  },
];
