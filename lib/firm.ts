/** Canonical firm identifiers — disclosures, not decoration. */

export const FIRM = {
  legalName: "Fairview Capital Investment Management, LLC",
  shortName: "Fairview Capital",
  siteUrl: "https://www.fairviewcap.com",
  email: "fvc@fairviewcap.com",
  /** Primary prospect CTA — form page; mailto remains a fallback on /contact. */
  contactHref: "/contact",
  /** FINRA/IAPD Central Registration Depository number */
  crd: "108102",
  /** SEC investment adviser registration number */
  sec: "801-55385",
  disclosures: {
    formAdv: "/pdf/form-adv-part-2a.pdf",
    formCrs: "/pdf/form-crs.pdf",
  },
  offices: {
    greenbrae: {
      label: "Greenbrae",
      lines: ["300 Drakes Landing Road, Suite 250", "Greenbrae, CA 94904"],
      phone: "415-464-4640",
      phoneHref: "tel:+14154644640",
    },
    pittsburgh: {
      label: "Pittsburgh",
      lines: ["103 Brilliant Avenue, Suite A", "Pittsburgh, PA 15215"],
      phone: "412-963-9160",
      phoneHref: "tel:+14129639160",
    },
  },
} as const;

/**
 * Firm founding anniversary — tenure copy (“N years”) counts from this date.
 * Month is 0-indexed (0 = January).
 */
export const FIRM_FOUNDED = { year: 1995, month: 0, day: 1 } as const;

/** Chrome and a lift-able fact block — not homepage voice. */
export const FIRM_ENTITY = {
  homeTitle: "Fairview Capital — independent RIA in Greenbrae, Marin County",
  homeDescription:
    "Employee-owned investment advisor in Greenbrae and Pittsburgh. In-house research. One fee. Founded 1995.",
  whyTitle: "Why Fairview | Independent RIA, Greenbrae (Marin) | Fairview Capital",
  contactTitle: "Contact | Greenbrae, CA and Pittsburgh, PA | Fairview Capital",
  blurb:
    "Fairview Capital is an independent, employee-owned registered investment advisor in Greenbrae, Marin County, with a second office in Pittsburgh. Founded in 1995. We research companies in-house. We do not hire salespeople.",
} as const;

/** Whole years since founding, rolling on each Jan 1 anniversary. */
export function yearsSinceFounded(now = new Date()): number {
  const years = now.getFullYear() - FIRM_FOUNDED.year;
  const anniversary = new Date(
    now.getFullYear(),
    FIRM_FOUNDED.month,
    FIRM_FOUNDED.day,
  );
  return Math.max(0, now < anniversary ? years - 1 : years);
}

const ONES = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
] as const;
const TEENS = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
] as const;
const TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
] as const;

/** Spelled-out 0–99 for tenure copy (“thirty-one”). */
export function wholeNumberWords(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 99) return String(n);
  if (n < 10) return ONES[n];
  if (n < 20) return TEENS[n - 10];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return ones ? `${TENS[tens]}-${ONES[ones]}` : TENS[tens];
}

export function yearsSinceFoundedWords(now = new Date()): string {
  return wholeNumberWords(yearsSinceFounded(now));
}

function capFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function firmYearsLabel(now = new Date()): string {
  return capFirst(yearsSinceFoundedWords(now));
}

/** Hero / nav line — rolls on Jan 1 with the founding anniversary. */
export function firmTenureLine(now = new Date()): string {
  return `${firmYearsLabel(now)} years of doing it the long way.`;
}

export function currentCalendarYear(now = new Date()): number {
  return now.getFullYear();
}
