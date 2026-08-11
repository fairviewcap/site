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
  /** Optional cultural beat under the year — keep short. */
  era?: string;
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

/** Cycle markers — years stacked left for skimming. */
export const WHY_TIMELINE: WhyTimelineEntry[] = [
  {
    when: "1995",
    era: "Marin County",
    what: "Fairview founded",
  },
  {
    when: "2000–02",
    era: "Dot-com",
    what: "Crash hit Bay Area wealth harder than almost anywhere",
  },
  {
    when: "2007–09",
    era: "Lehman",
    what: "Global Financial Crisis",
  },
  {
    when: "2011",
    what: "U.S. credit rating downgraded for the first time in history",
  },
  {
    when: "2020",
    era: "COVID",
    what: "Fastest bear market on record — then the fastest recovery",
  },
  {
    when: "2023",
    what: "Silicon Valley Bank collapses, a few miles from our office",
  },
  {
    when: "2023–25",
    what: "Private equity buys up independent RIAs. Fairview doesn’t sell",
  },
  {
    when: "2026",
    what: "$2.14B under management. Same firm since 1995",
  },
];
