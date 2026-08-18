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
  /** 4:5 AVIF in /photography/crises, named to the year. */
  photo: string;
};

const crisisPhoto = (when: string) => `/photography/crises/${when}.avif`;

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

/** Cycle markers — card rail, one photograph per year. */
export const WHY_TIMELINE: WhyTimelineEntry[] = [
  {
    when: "1995",
    era: "Marin County",
    what: "Fairview founded",
    photo: crisisPhoto("1995"),
  },
  {
    when: "2000–02",
    era: "Dot-com",
    what: "Crash hit Bay Area wealth harder than almost anywhere",
    photo: crisisPhoto("2000–02"),
  },
  {
    when: "2007–09",
    era: "Lehman",
    what: "Global Financial Crisis",
    photo: crisisPhoto("2007–09"),
  },
  {
    when: "2011",
    what: "U.S. credit rating downgraded for the first time in history",
    photo: crisisPhoto("2011"),
  },
  {
    when: "2020",
    era: "COVID",
    what: "Fastest bear market on record — then the fastest recovery",
    photo: crisisPhoto("2020"),
  },
  {
    when: "2023",
    what: "Silicon Valley Bank collapses, a few miles from our office",
    photo: crisisPhoto("2023"),
  },
  {
    when: "2023–25",
    what: "Private equity buys up independent RIAs. Fairview doesn’t sell",
    photo: crisisPhoto("2023–25"),
  },
  {
    when: "2026",
    what: "$2.14B under management. Same firm since 1995",
    photo: crisisPhoto("2026"),
  },
];
