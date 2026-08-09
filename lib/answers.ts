export type AnswerItem = {
  question: string;
  slug: string;
  answer: string;
};

export type AnswerCategory = {
  id: string;
  title: string;
  dek: string;
  items: AnswerItem[];
};

/** Short answers — plain English, grouped like the original design. */
export const ANSWER_CATEGORIES: AnswerCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    dek: "What to expect in the beginning.",
    items: [
      {
        question: "How do we begin?",
        slug: "how-do-we-begin",
        answer:
          "With a conversation. We’ll talk about your goals, your investments, and the questions keeping you up at night. If it feels like a good fit, we’ll map out a plan for moving forward.",
      },
      {
        question: "What kind of clients do you work with?",
        slug: "what-kind-of-clients-do-you-work-with",
        answer:
          "Mostly individuals and families who want thoughtful guidance around meaningful wealth. Many are entrepreneurs, professionals, or retirees who prefer a long-term partner rather than a transactional advisor.",
      },
      {
        question: "Do you have a minimum to work with you?",
        slug: "do-you-have-a-minimum-to-work-with-you",
        answer:
          "In most cases, clients have around $2M or more in investable assets. The number matters less than whether we can truly help you.",
      },
      {
        question: "What happens in the first few meetings?",
        slug: "what-happens-in-the-first-few-meetings",
        answer:
          "We learn your full financial story—investments, taxes, estate planning, family priorities, and future goals. Then we build a plan that connects the pieces.",
      },
      {
        question: "How long does it take to get everything set up?",
        slug: "how-long-does-it-take-to-get-everything-set-up",
        answer:
          "Usually a few weeks. Enough time to understand your situation and implement things carefully—never rushed.",
      },
    ],
  },
  {
    id: "how-we-work",
    title: "How We Work",
    dek: "How decisions are made.",
    items: [
      {
        question: "What exactly do you do for clients?",
        slug: "what-exactly-do-you-do-for-clients",
        answer:
          "We help people make good financial decisions over long periods of time. That includes planning, investment management, tax awareness, and ongoing advice.",
      },
      {
        question: "How involved are you in managing investments?",
        slug: "how-involved-are-you-in-managing-investments",
        answer:
          "Very. Fairview does its own research and builds portfolios internally rather than outsourcing investment decisions.",
      },
      {
        question: "Do you only manage investments?",
        slug: "do-you-only-manage-investments",
        answer:
          "No. Investments are just one piece. We also help clients think through taxes, retirement, inheritance decisions, real estate, philanthropy, and other major financial choices.",
      },
      {
        question: "Will I only work with one advisor?",
        slug: "will-i-only-work-with-one-advisor",
        answer:
          "You’ll have a primary relationship, but you benefit from the entire Fairview team—advisors, analysts, and operations professionals working together.",
      },
      {
        question: "How often will we talk?",
        slug: "how-often-will-we-talk",
        answer:
          "Typically a few times a year, plus anytime something important comes up. Financial life rarely moves on a quarterly schedule.",
      },
    ],
  },
  {
    id: "trust-safety",
    title: "Trust & Safety",
    dek: "How we protect you.",
    items: [
      {
        question: "Where is my money actually held?",
        slug: "where-is-my-money-actually-held",
        answer:
          "Your assets are held at independent custodians like Schwab or Fidelity. Fairview manages the investments but never holds the money itself.",
      },
      {
        question: "Are you legally required to act in my best interest?",
        slug: "are-you-legally-required-to-act-in-my-best-interest",
        answer:
          "Yes. As a Registered Investment Advisor, Fairview has a fiduciary duty to put clients’ interests first.",
      },
      {
        question: "Can you move money without my approval?",
        slug: "can-you-move-money-without-my-approval",
        answer: "No. Any withdrawals or transfers require your authorization.",
      },
      {
        question: "How transparent is the investment process?",
        slug: "how-transparent-is-the-investment-process",
        answer:
          "Completely. You’ll know what you own, why you own it, how it’s performing, and what you’re paying.",
      },
      {
        question: "How long do clients usually stay with Fairview?",
        slug: "how-long-do-clients-usually-stay-with-fairview",
        answer:
          "Many relationships last decades and often span multiple generations of a family.",
      },
    ],
  },
  {
    id: "philosophy",
    title: "Philosophy",
    dek: "What guides how we think.",
    items: [
      {
        question: "What’s your basic investment philosophy?",
        slug: "whats-your-basic-investment-philosophy",
        answer:
          "Own high-quality businesses and hold them for a long time. Markets move around in the short term, but strong companies tend to grow over time.",
      },
      {
        question: "Do you try to predict the market?",
        slug: "do-you-try-to-predict-the-market",
        answer:
          "No. We focus more on understanding businesses than predicting headlines.",
      },
      {
        question: "Why do you use individual stocks instead of only funds?",
        slug: "why-do-you-use-individual-stocks-instead-of-only-funds",
        answer:
          "Owning a stock means owning part of a business. Fairview researches companies deeply and builds portfolios of carefully selected businesses expected to grow over time.",
      },
      {
        question: "How diversified are your portfolios?",
        slug: "how-diversified-are-your-portfolios",
        answer:
          "We typically own a focused group of companies rather than hundreds of holdings—paired with other investments where appropriate.",
      },
      {
        question: "What matters most for long-term investing?",
        slug: "what-matters-most-for-long-term-investing",
        answer:
          "Patience. Staying invested through the ups and downs usually matters more than trying to be clever.",
      },
    ],
  },
  {
    id: "technology",
    title: "Technology",
    dek: "Tools that support the work.",
    items: [
      {
        question: "How do I track my portfolio and plan?",
        slug: "how-do-i-track-my-portfolio-and-plan",
        answer:
          "Clients have access to a secure portal where they can see their investments, financial plan, and important documents anytime.",
      },
      {
        question: "Can I see my entire financial life in one place?",
        slug: "can-i-see-my-entire-financial-life-in-one-place",
        answer:
          "Yes. The planning platform can integrate outside accounts—banking, retirement plans, and brokerage accounts—so you can see everything together.",
      },
      {
        question: "How does Fairview use technology in the investment process?",
        slug: "how-does-fairview-use-technology-in-the-investment-process",
        answer:
          "Technology helps us analyze data, monitor portfolios, and stay organized. But investment decisions ultimately come from human judgment and experience.",
      },
      {
        question: "Do you use artificial intelligence?",
        slug: "do-you-use-artificial-intelligence",
        answer:
          "Like many firms, we use modern analytical tools—including some AI—to help process information and improve efficiency. But decisions about your money are always made by people.",
      },
      {
        question: "Will AI replace financial advisors?",
        slug: "will-ai-replace-financial-advisors",
        answer:
          "AI can analyze data. It can’t understand families, goals, or the emotions that come with money. Good advice still requires human judgment.",
      },
      {
        question: "Is my financial information secure?",
        slug: "is-my-financial-information-secure",
        answer:
          "Yes. The systems we use rely on encrypted connections, multi-factor authentication, and institutional custodians to protect your information.",
      },
    ],
  },
];

export function allAnswerItems(): AnswerItem[] {
  return ANSWER_CATEGORIES.flatMap((c) => c.items);
}
