/** External client portals — leave Fairview site. */

const LEAVE_LEAD =
  'You are now leaving the Fairview Capital Investment Management, LLC ("Fairview Capital") website and will be entering';

export const PORTALS = {
  planning: {
    label: "Planning",
    description: "Your entire financial story, all in one place.",
    href: "https://wealth.emaplan.com/ema/ria/fairviewcapital",
    poweredBy: "eMoney",
    logo: "/logos/eMoney-logo.svg",
  },
  investments: {
    label: "Investments",
    description: "A secure space to track and review your portfolio.",
    href: "https://fairviewcapital.portal.tamaracinc.com/",
  },
  custodians: {
    label: "Custodians",
    description: "Direct access to statements, tax docs, and records.",
    links: [
      {
        id: "schwab",
        label: "Schwab",
        href: "https://client.schwab.com/Areas/Access/Login",
        lead: `${LEAVE_LEAD} the Charles Schwab & Co., Inc. ("Schwab") website.`,
        body: "Schwab is a registered broker-dealer, and is not affiliated with Fairview Capital or any advisor(s) whose name(s) appear(s) on this website. Fairview Capital is independently owned and operated. Regardless of any referral or recommendation, Schwab does not endorse or recommend the investment strategy of any advisor. Schwab has agreements with Fairview Capital under which Schwab provides Fairview Capital with services related to your account. Schwab does not review the Fairview Capital website, and makes no representation regarding information contained in the Fairview Capital website which should not be considered to be either a recommendation by Schwab or a solicitation of any offer to purchase or sell any securities.",
      },
      {
        id: "fidelity",
        label: "Fidelity",
        href: "https://www.fidelity.com/",
        lead: `${LEAVE_LEAD} the Fidelity Brokerage Services LLC ("Fidelity Investments") website.`,
        body: "Fidelity Investments is a registered broker-dealer, and is not affiliated with Fairview Capital or any advisor(s) whose name(s) appear(s) on this website. Fairview Capital is independently owned and operated. Regardless of any referral or recommendation, Fidelity Investments does not endorse or recommend the investment strategy of any advisor. Fidelity Investments has agreements with Fairview Capital under which Fidelity Investments provides Fairview Capital with services related to your account. Fidelity Investments does not review the Fairview Capital website, and makes no representation regarding information contained in the Fairview Capital website which should not be considered to be either a recommendation by Fidelity Investments or a solicitation of any offer to purchase or sell any securities.",
      },
    ],
  },
} as const;
