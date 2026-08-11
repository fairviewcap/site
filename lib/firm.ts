/** Canonical firm identifiers — disclosures, not decoration. */

export const FIRM = {
  legalName: "Fairview Capital Investment Management, LLC",
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
