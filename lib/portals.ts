/** External client portals — leave Fairview site. */

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
        label: "Schwab",
        href: "https://client.schwab.com/Login/SignOn/CustomerCenterLogin",
      },
      {
        label: "Fidelity",
        href: "https://www.fidelity.com/",
      },
    ],
  },
} as const;
