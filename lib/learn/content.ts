import type { LearnArticle, LearnChannel } from "@/lib/learn/types";

export const LEARN_CHANNELS: LearnChannel[] = [
  {
    slug: "letters",
    label: "Quarterly Letters",
    title: "Quarterly Letters",
    dek: "Plainspoken notes on money, markets, and life.",
    summary:
      "Fairview Capital quarterly letters to clients — market commentary, portfolio context, and how we’re thinking about the months ahead.",
    tone: "ink",
  },
  {
    slug: "insights",
    label: "Investment Insights",
    title: "Investment Insights",
    dek: "Transparent thinking on companies, risk, and research.",
    summary:
      "Investment insights from Fairview Capital’s research team — how we evaluate businesses, manage risk, and show our work.",
    tone: "green",
  },
  {
    slug: "planning",
    label: "Planning",
    title: "Planning",
    dek: "Practical guidance for families, cash flow, tax, and legacy.",
    summary:
      "Wealth planning content from Fairview Capital — decisions families face around cash flow, taxes, real estate, and preparing the next generation.",
    tone: "paper",
  },
];

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "first-quarter-2026",
    channel: "letters",
    title: "First Quarter 2026",
    issue: "Q1 2026",
    date: "2026-03-31",
    excerpt:
      "A quarter that began with rotation and AI jitters ended under the weight of geopolitics — and left valuations still elevated.",
    body: [
      "Ending 2025, US equity markets had enjoyed three consecutive strong years and were poised for continued upside. The economy showed resilience, absorbing tariffs and a government shutdown, while inflation remained relatively muted and on a downtrend. Corporate earnings growth accelerated, fueling expectations for mid-teens growth in the first quarter. The Fed signaled additional rate cuts, bolstering the case for ongoing market strength.",
      "Equity markets experienced a notable rotation in the first quarter as the market navigated AI-driven concerns and private credit issues before the Iran conflict delivered an unforeseen disruption in late February. A rotation out of the tech sector into defensive stocks left the markets flat going into the war.",
      "The Iran conflict has negatively impacted equity and bond markets due to spiking oil prices and fears of stagflationary impacts on the global economy. For the first quarter the S&P 500 index total return was down 4.4%, the NASDAQ declined 7.0% and the Bloomberg US Aggregate Bond Index generated a slightly negative return. As we reach mid-April, the equity markets have turned positive for the year.",
      "Entering the second quarter, several issues — AI disruption and a possible bubble, private credit contagion, unsettled tariff policy and global economic stress resulting from the oil shock — are presenting challenges to the bull market’s staying power. Equity market valuations remain high at 19.7x forward earnings estimates relative to the 30-year average of 17.2x.",
      "From a macro perspective, divergent scenarios — a strong economy and moderating inflation vs. stagflation — have reasonably high probabilities. We continue to position for more than one path.",
    ],
  },
  {
    slug: "fourth-quarter-2025",
    channel: "letters",
    title: "Fourth Quarter 2025",
    issue: "Q4 2025",
    date: "2025-12-31",
    excerpt:
      "Resilient earnings and digitization carried markets higher — while AI narrative vs. reality started to sort winners from noise.",
    body: [
      "Heading into 2026, sustained economic resilience, accelerated earnings growth, and the possibility of both fiscal and monetary stimulus could lead to further market appreciation. Issues that could derail markets or cause increased volatility remain historically high valuations, a soft labor market, fiscal excess, and geopolitical tensions.",
      "Recent headlines about an AI bubble are constructive. Volatility between AI winners and losers is encouraging — we believe any bubble may deflate rather than pop. AI is transformative and not going away, but narrative versus reality has led to some extreme near-term stock price activity.",
      "We see AI as a commoditizing tool facilitated by mass digitization, with the greatest benefits accruing to companies that implement it into workflows to drive revenue and profit growth. Our strategy remains to participate in upside while positioning to navigate uncertainty — pricing power, selective international exposure, and fixed income to mitigate volatility.",
    ],
  },
  {
    slug: "second-quarter-2025",
    channel: "letters",
    title: "Second Quarter 2025",
    issue: "Q2 2025",
    date: "2025-06-30",
    excerpt:
      "From Liberation Day tariffs to all-time highs — a reminder of how quickly equity markets can shift.",
    body: [
      "A volatile and historic quarter closed at all-time highs for the S&P 500 and NASDAQ Composite. The quarter began with tariffs that sent markets tumbling. After bottoming in early April, equity markets moved steadily higher supported by tariff easing, solid earnings, and resilient macroeconomic reads.",
      "The plunge and rapid recovery reminds us how quickly equity markets can shift. Entering the third quarter, markets navigate concerns over tariffs, geopolitics, and fiscal policy — while valuations sit at historically high levels.",
      "We continue to expect a high level of share-price volatility. Our posture is unchanged: best-in-class businesses, discipline on price, and room to adapt as the facts do.",
    ],
  },
  {
    slug: "quality-over-narrative",
    channel: "insights",
    title: "Quality Over Narrative",
    date: "2025-11-12",
    excerpt:
      "When a story runs ahead of the business, we wait for the business to catch up — or we pass.",
    body: [
      "Markets love a clean story. Research prefers a durable one. The gap between those two is where a lot of capital gets hurt.",
      "Our work starts with the business: cash generation, reinvestment, competitive position, and the price we pay for that stream of outcomes. Narrative can open a door. It cannot substitute for those fundamentals.",
      "When AI, policy, or fashion compresses that discipline, we slow down. Showing our work means saying what we own, why we own it, and what would make us change our minds.",
    ],
  },
  {
    slug: "risk-is-not-volatility",
    channel: "insights",
    title: "Risk Is Not Volatility",
    date: "2025-08-04",
    excerpt:
      "Price swings are uncomfortable. Permanent loss of capital is the risk that matters.",
    body: [
      "Volatility is the language of screens. Risk is the language of families who need their capital to fund a life.",
      "We manage portfolios so that temporary price declines do not force permanent mistakes — selling good businesses at the wrong time, or owning fragile ones that cannot survive a hard year.",
      "That is why allocation, tax awareness, and position sizing sit beside stock selection. The research note is only half the job.",
    ],
  },
  {
    slug: "cash-flow-before-complexity",
    channel: "planning",
    title: "Cash Flow Before Complexity",
    date: "2025-10-20",
    excerpt:
      "Before estate diagrams and product shelves, we map how money actually moves through your life.",
    body: [
      "Most planning anxiety is cash-flow anxiety in costume. Once income, spending, taxes, and liquidity are clear, many “complex” decisions get smaller.",
      "We start there — then layer estate, education, philanthropy, and concentrated positions only as they serve the plan you actually live.",
      "Technology helps us stress-test the picture. Judgment decides which levers matter for your family this year.",
    ],
  },
  {
    slug: "preparing-heirs-without-the-speech",
    channel: "planning",
    title: "Preparing Heirs Without the Speech",
    date: "2025-06-18",
    excerpt:
      "Legacy work is less a lecture than a series of small, honest conversations — timed to the family, not the calendar.",
    body: [
      "Wealth transitions fail quietly: unclear intent, unready heirs, advisors who never met each other. The fix is rarely a thicker binder.",
      "We help families stage the conversations — who needs context now, what can wait, and how to keep privacy intact across generations.",
      "The goal is continuity of values and decision-making, not a single dramatic reveal.",
    ],
  },
];

export function getChannel(slug: string): LearnChannel | undefined {
  return LEARN_CHANNELS.find((c) => c.slug === slug);
}

export function getArticlesByChannel(slug: string): LearnArticle[] {
  return LEARN_ARTICLES.filter((a) => a.channel === slug).sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}

export function getArticle(
  channel: string,
  slug: string,
): LearnArticle | undefined {
  return LEARN_ARTICLES.find((a) => a.channel === channel && a.slug === slug);
}

export function formatLearnDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}
