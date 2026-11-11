import type { LearnArticle, LearnChannel } from "@/lib/learn/types";

export const LEARN_CHANNELS: LearnChannel[] = [
  {
    slug: "letters",
    label: "Quarterly Letters",
    title: "Quarterly Letters",
    headline: "We write what we saw. Not what sells.",
    dek: "Plain talk on markets, portfolios, and the months ahead.",
    summary:
      "Fairview Capital quarterly letters to clients. Market commentary, portfolio context, and how we’re thinking about the months ahead.",
    tone: "ink",
    poster: "/photography/learn/quarterly.avif",
  },
  {
    slug: "insights",
    label: "Investment Insights",
    title: "Investment Insights",
    headline: "Investment Insights",
    dek: "We buy what’s underneath. Research, risk, and the work we show.",
    summary:
      "Investment insights from Fairview Capital’s research team. How we evaluate businesses, manage risk, and show our work.",
    tone: "green",
    poster: "/photography/learn/insights-eye.jpg",
    cover: true,
  },
];

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "first-quarter-2026",
    channel: "letters",
    title: "Rotation, Then Shock",
    issue: "Q1 2026",
    date: "2026-03-31",
    excerpt:
      "Ending 2025, US equity markets had enjoyed three consecutive strong years and were poised for continued upside. The economy showed resilience, absorbing tariffs and a government shutdown, while inflation remained…",
    pullQuote:
      "From a macro perspective, divergent scenarios – a strong economy and moderating inflation vs. stagflation (recession and high inflation) – have reasonably high probabilities.",
    body: [
      "Ending 2025, US equity markets had enjoyed three consecutive strong years and were poised for continued upside. The economy showed resilience, absorbing tariffs and a government shutdown, while inflation remained relatively muted and on a downtrend. Corporate earnings growth accelerated, fueling expectations for mid-teens growth in the first quarter. The Fed signaled additional rate cuts, bolstering the case for ongoing market strength.",
      "Equity markets experienced a notable rotation in the first quarter as the market navigated AI-driven concerns and private credit issues before the Iran conflict delivered an unforeseen disruption in late February. A rotation out of the tech sector into defensive stocks left the markets flat going into the war.",
      "The Iran conflict has negatively impacted equity and bond markets due to spiking oil prices and fears of stagflationary impacts on the global economy. For the first quarter the S&P 500 index total return was down 4.4%, the NASDAQ declined 7.0% and the Bloomberg US Aggregate Bond Index generated a slightly negative return. As we reach mid-April, the equity markets have turned positive for the year.",
      "Entering the second quarter, several issues – AI disruption and a possible bubble, private credit contagion, unsettled tariff policy and global economic stress resulting from the oil shock – are presenting challenges to the bull market’s staying power. Equity market valuations remain high at 19.7x forward earnings estimates relative to the 30-year average of 17.2x.",
      "From a macro perspective, divergent scenarios – a strong economy and moderating inflation vs. stagflation (recession and high inflation) – have reasonably high probabilities.",
    ],
  },
  {
    slug: "fourth-quarter-2025",
    channel: "letters",
    title: "A Third Year of Gains",
    issue: "Q4 2025",
    date: "2025-12-31",
    excerpt:
      "Equity markets enjoyed a third consecutive year of gains, with the S&P 500 index advancing 17.9%. After the tariff shock in early April amid concerns of stagflationary impacts, the market rallied from April 8th lows and…",
    pullQuote:
      "Recent headlines about an AI bubble are constructive and volatility in the space between AI winners and losers is encouraging, leading us to believe any AI bubble may deflate rather than pop.",
    body: [
      "Equity markets enjoyed a third consecutive year of gains, with the S&P 500 index advancing 17.9%. After the tariff shock in early April amid concerns of stagflationary impacts, the market rallied from April 8th lows and appreciated throughout the year. Gains were fueled by resilient GDP growth, strong consumer spending, robust corporate earnings, relatively muted inflation and interest rate cuts.",
      "Heading into the sustained economic resilience of 2026, accelerated earnings growth with the possibility of both fiscal and monetary stimulus could lead to further market appreciation. Issues that could derail markets or cause increased volatility are historically high valuations, the soft labor market, fiscal excess (which at some point will pressure long-term interest rates and further pressure the dollar) and geopolitical tensions.",
      "Recent headlines about an AI bubble are constructive and volatility in the space between AI winners and losers is encouraging, leading us to believe any AI bubble may deflate rather than pop. There is no question that AI is transformative and not going away, but the AI narrative versus reality has led to some extreme and unsustainable near-term stock price activity. We see AI itself as a commoditizing tool facilitated by mass digitization, with the greatest benefits accruing to those companies throughout the economy that implement it into work flows to drive revenue and profit growth. The market is beginning to look beyond the AI narrative to reality as it sorts out long-term winners and losers in the space.",
      "The current administration has been implementing aggressive policies while pursuing their objectives of accelerating economic growth and vibrancy of the domestic manufacturing base. Their playbook to “run the economy hot” would lead to an accelerating cyclical recovery along with the potential for higher inflation.",
      "Amid the foregoing opportunities and risks, our investment strategy is to participate in market upside while positioning to navigate the uncertainties. To mitigate inflation and currency risks our portfolio includes many investments with pricing power/flexibility and hard assets, as well as selective international exposure. Fixed income remains an asset to mitigate volatility.",
    ],
  },
  {
    slug: "third-quarter-2025",
    channel: "letters",
    title: "Resilience, Then the First Cut",
    issue: "Q3 2025",
    date: "2025-09-30",
    excerpt:
      "We entered the third quarter amidst tariff uncertainties and concerns for a slowing economy. The economy has remained resilient, with quarterly GDP growth exceeding 3%. Consumer spending and income growth have outpaced…",
    pullQuote:
      "We believe rising inflation remains a major risk to financial asset valuations.",
    body: [
      "We entered the third quarter amidst tariff uncertainties and concerns for a slowing economy. The economy has remained resilient, with quarterly GDP growth exceeding 3%. Consumer spending and income growth have outpaced inflation thus far. Corporate earnings continue to meet or even beat expectations, and we anticipate this trend to continue as third quarter earnings reports start coming in. Inflation has edged higher but remains in check, albeit nearly 1% higher than the Fed’s 2% inflation target.",
      "Further boosting equities, on September 17 the Fed initiated a new rate cutting cycle with a 25-basis point cut to the Fed Funds rate and clear signals that two more cuts are likely this year. New job growth has been weak while the unemployment rate remains stable.",
      "Against this backdrop equity market returns have been robust, with the S&P 500 advancing 8.1% and 14.8% for the third quarter and year to date respectively. Corporate operating fundamentals are strong heading into the fourth quarter, while valuations remain at historically high levels. These valuations are at odds with ongoing issues such as tariff and trade policies, directives impacting Fed independence, the government shutdown, geopolitical tensions and the Federal Deficit.",
      "The advent of Artificial Intelligence (AI) is driving equity markets and impacting the economy in new, and thus far, positive ways. Massive capital spending on AI infrastructure has been embraced by financial markets, however the timing, feasibility and expected return on this multi trillion-dollar investment has recently been called into question. Parallels to the late nineties dotcom boom – and eventual bust – have been surfacing.",
      "We are evaluating other grounded AI beneficiaries based on proven use cases to drive growth and margins. We are closely monitoring implementation of AI in areas such as software and digital advertising to identify favorable and unfavorable impacts. We will avoid excessive valuations and/or speculative business models that lack clarity. Inevitable surprises and exogenous factors will occur, and we are mindful of the risks.",
      "Befitting solid economic and stock market fundamentals, equities closed the third quarter near all-time highs. Economic growth in the coming year will likely be driven by tax, trade and policy initiatives, but a fractured Congress could limit meaningful legislation. We believe rising inflation remains a major risk to financial asset valuations.",
    ],
  },
  {
    slug: "second-quarter-2025",
    channel: "letters",
    title: "From Liberation Day to New Highs",
    issue: "Q2 2025",
    date: "2025-06-30",
    excerpt:
      "A volatile and historic quarter closed at all-time highs for the S&P 500 and NASDAQ Composite, which advanced 10.9% and 18.0% respectively. The quarter began with “Liberation Day” tariffs which sent markets tumbling.…",
    pullQuote:
      "The market plunge and rapid recovery reminds us how quickly equity markets can shift.",
    body: [
      "A volatile and historic quarter closed at all-time highs for the S&P 500 and NASDAQ Composite, which advanced 10.9% and 18.0% respectively. The quarter began with “Liberation Day” tariffs which sent markets tumbling. After bottoming on April 8 (at which point the S&P 500 and NASDAQ were down 15.0% and 20.8% for the year), equity markets moved steadily higher supported by tariff easing, solid first quarter earnings, bottoming consumer sentiment and resilient macroeconomic reads for inflation and the economy. The market plunge and rapid recovery reminds us how quickly equity markets can shift.",
      "Much of the second quarter, appreciation was fueled by digitization and Artificial Intelligence (AI) themes. Among the “Magnificent 7”, Meta, Microsoft and NVIDIA advanced 35.6% on average. Amazon, Google, Apple and Tesla were up 11.0% due to perception that they are less well positioned for AI and/or have greater exposure to trade policy.",
      "Entering the third quarter, equity and bond markets are navigating concerns over the economic and inflationary impacts of tariffs, geopolitical disruptions and U.S. fiscal policy. Leading economists and the Federal Reserve bank are signaling stagflationary conditions (slowing economic growth paired with rising inflation), while equity markets are anticipating continued growth with modest pressure on inflation.",
      "Expected earnings growth for 2025 began the year at 14.3% and has been revised down to 9.4% currently, with 13.7% growth expected for 2026. Amidst a high level of uncertainty, the equity markets sit at historically high valuations. The S&P 500 index trades at a forward price to earnings multiple of 22x as compared to the past ten-year historical average of 18.7x.",
      "A significant decline in equities is possible. However, if the economy holds up and inflation does not materialize, corporate earnings will accelerate and would likely be boosted by Fed rate cuts. This could bring cautious capital into the market and propel equities higher from here. In sum, we continue to expect a high level of volatility of share prices during the second half of 2025.",
    ],
  },
  {
    slug: "first-quarter-2025",
    channel: "letters",
    title: "The Streak Breaks",
    issue: "Q1 2025",
    date: "2025-03-31",
    excerpt:
      "After six consecutive quarterly gains, the S&P 500 index declined 4.3% and the NASDAQ index dropped 10.3% in this year’s first quarter. The year started with gains in January and February, navigating a rotation out of…",
    pullQuote:
      "Far more damaging to equity markets than the tech rotation and downdraft has been the new administration’s aggressive and unpredictable tariff policies.",
    body: [
      "After six consecutive quarterly gains, the S&P 500 index declined 4.3% and the NASDAQ index dropped 10.3% in this year’s first quarter. The year started with gains in January and February, navigating a rotation out of the Tech sector and into lagging sectors, most notably consumer staples, healthcare and energy. March saw a broad sell-off as the S&P 500 index declined 5.6%, including an 8.5% drop from the mid-February market peak. April thus far has seen further selling amidst increasing levels of volatility.",
      "Far more damaging to equity markets than the tech rotation and downdraft has been the new administration’s aggressive and unpredictable tariff policies. We expect higher tariffs will create inflationary and economic headwinds. The uncertainty and ever-changing headlines impair economic activity, spending decisions and erode consumer confidence and sentiment.",
      "Although the economy has been resilient and growing, recent macro-economic data points demonstrate increased concerns. Sentiment indexes have fallen sharply, with consumer confidence hitting a 12-year low in the quarter. The Fed’s projection of 2025 gross domestic product (GDP) growth declined from 2.1% at the beginning of the year to 1.7% last month.",
      "The probability of stagflation (a recession combined with inflation, last seen in the decade of the 1970s) will increase with the implementation of tariffs. A global trade war would further impede the Fed’s best efforts to engineer a soft landing (moderating GDP growth and low inflation) that seemed possible at the start of the new administration.",
      "With the government debt now at $36 trillion and growing, the current administration is focusing on reducing interest rates. A tariff induced recession might succeed in achieving further rate declines and stability but if high inflation accompanies the recession, a continued downtrend and the malaise of a bear market could be in store.",
      "Fairview’s investment strategy is to position for multiple scenarios by holding best-in-class stocks at reasonable valuations across the sector spectrum. We are invested in several companies addressing market niches that are less exposed to the broader economic cycle. In these dynamic and challenging times, we are monitoring developments closely.",
    ],
  },
  {
    slug: "fourth-quarter-2024",
    channel: "letters",
    title: "A 25% Year, Narrowly Won",
    issue: "Q4 2024",
    date: "2024-12-31",
    excerpt:
      "Despite a soft December, the U.S. equity markets closed the fourth quarter with a solid 2.4% gain. The benchmark S&P 500 generated a 25% return for the year. Slightly more than 1/5th of this return came from the…",
    pullQuote:
      "By some measures the stock market is trading at such historically high valuations that these levels are surpassed by only the peak of the dotcom bubble in the late nineties.",
    body: [
      "Despite a soft December, the U.S. equity markets closed the fourth quarter with a solid 2.4% gain. The benchmark S&P 500 generated a 25% return for the year. Slightly more than 1/5th of this return came from the semi-conductor design firm NVIDIA, which rode the artificial intelligence boom to grow into the second largest company in the index, trailing only Apple.",
      "Like the comparably high equity returns seen in calendar 2023, the largest contributors to the S&P 500 index returns were the mega-cap technology stocks branded as “the Magnificent Seven”: Apple, NVIDIA, Microsoft, Google, Amazon, META and Tesla. These stocks grew faster than their underlying operating fundamentals as many of these companies are seen as major beneficiaries of the expected growth of artificial intelligence.",
      "The past two years continued the strong trend of equities outperforming fixed income by a considerable and nearly unprecedented degree. These disproportionate gains leave equities trading at unusually high multiples of revenues, earnings and cash flow. By some measures the stock market is trading at such historically high valuations that these levels are surpassed by only the peak of the dotcom bubble in the late nineties.",
      "We expect to see a high degree of volatility in financial asset pricing in the year ahead. Data relating to economic growth, job growth and inflation remains mixed; most recently data on both economic and job growth surprised to the upside while the Producer and Consumer Pricing Indexes came in below expectations. Bond yields have risen substantially since the Federal Reserve commenced rate cuts this past September, leaving investors questioning the need for further rate cuts.",
      "Volatility is also likely given the potential policy changes floated by the incoming administration. Bond investors are anxious regarding fiscal, trade, and immigration policies articulated thus far. Such worries are exacerbated by the prospects of much higher public borrowings and persistent inflation owing to deficit-financed domestic demand, possible tariffs and rising import prices. Geopolitical concerns and the costs of dealing with increasingly volatile weather could also weigh heavily on global financial markets.",
      "Given these concerns, we expect to mitigate risk by maintaining investments in high-quality companies with solid balance sheets and stable cash flows. In balanced portfolios we will hold fixed income securities in short and intermediate maturities.",
    ],
  },
  {
    slug: "quality-over-narrative",
    channel: "insights",
    title: "Quality Over Narrative",
    date: "2025-11-12",
    excerpt: "Markets love a clean story. We buy the business underneath the ticker. Or we wait.",
    body: [
      "Markets love a clean story. A ticker is just a string of letters. We buy what is underneath it.",
      "Narratives move prices faster than balance sheets do. Artificial intelligence, policy shifts, fashion, fear. Each can open a door worth walking through. None of them is a substitute for understanding cash generation, reinvestment needs, competitive position, and the price you are asked to pay for that stream of outcomes.",
      "Most wealth managers are middlemen. They collect a fee to hand capital to someone else’s process or a model that never met the management team. We built an in-house research team to do the slower work: study the business, build a view of how it competes years out, and wait until the arithmetic makes sense. We often track a company for years before we own a share.",
      "When a story runs ahead of the business, we wait for the business to catch up. Or we pass. Showing our work means saying what we own, why we own it, and what would make us change our minds. That is not theater. It is how you avoid confusing a popular plot with a durable franchise.",
      "It is a much slower way to operate than chasing whatever is fashionable on Wall Street. It is also the only way we know how to be sure of what we own.",
    ],
  },
  {
    slug: "risk-is-not-volatility",
    channel: "insights",
    title: "Risk Is Not Volatility",
    date: "2025-08-04",
    excerpt:
      "Price swings are uncomfortable. Permanent loss of capital is the risk that funds, or fails, a life.",
    body: [
      "Volatility is the language of screens. Risk is the language of families who need capital to fund a life. Tuition, a business transition, a long retirement, a gift that still means something after inflation.",
      "A temporary decline in a good business is not the same thing as owning a fragile one that cannot survive a hard year. The first is uncomfortable. The second is how permanent loss sneaks in while everyone is watching the wrong number.",
      "We do not predict the future. We prepare for several of them. That means position sizing, cash reserves, tax-aware trading, and an allocation built around your plan. Not a model portfolio that ignores the year you actually need money. Stock selection matters. So does not being forced to sell the right company at the wrong time.",
      "Computers draw straight lines into the future. Real markets do not. We use software to stress-test plans against bad markets and rising taxes, not to pretend certainty. The research note is only half the job. The other half is making sure a rough quarter does not become a permanent mistake.",
      "Crises come and go. Discipline is staying invested in businesses we understand, at prices we can defend, inside a plan that still works when the tape looks ugly.",
    ],
  },
  {
    slug: "the-reality-of-banking",
    channel: "insights",
    title: "The Reality of Banking",
    date: "2023-04-19",
    excerpt:
      "SVB looked fine until it wasn’t. Banking still runs on confidence. And confidence is not a free lunch.",
    body: [
      "In March 2023, Silicon Valley Bank went from “well capitalized, no asset-quality problems” to FDIC receivership in a matter of days. A smaller crypto lender had failed just before and been dismissed as a crypto story. SVB was not. Signature Bank followed over the weekend. By Monday, investors were asking the only question that matters in a panic: who is next?",
      "The authorities moved fast. Broader deposit backstops, easier emergency borrowing, pressure for rescues abroad. Deposit money shifted from smaller banks toward larger ones. Contagion, for the moment, was contained. That was not luck alone. It was a reminder that modern banking still depends on someone catching the plate before it hits the floor.",
      "SVB was also an unusual bank. Its customers were a tight circle of venture firms and startups. Uninsured deposits made up the overwhelming share of funding. Pandemic-era inflows had nowhere useful to lend, so management parked cash in long-duration Treasuries. When rates rose, the paper losses were larger than at banks whose assets float with rates. When those interconnected depositors smelled trouble, they did the rational thing all at once: they asked for their money back.",
      "Management deserved blame too. Risk systems had been flagged for years. Warnings sat unanswered. For a stretch, there was no chief risk officer. You can call SVB a special case. Concentrated funding, weak controls, the sharpest rate rise in a generation. And you would not be wrong. Special cases are still how systems learn what they forgot.",
      "After a scare, bankers relearn interest-rate risk the way they relearned asset quality after 2008. Emergency facilities, lower uninsured-deposit concentrations at most peers, and talk of tighter rules for mid-sized banks all lower the odds of an identical rerun. They do not rewrite the basic math: banks borrow short, lend long, and keep only a fraction on hand. If everyone wants cash at 9 a.m. on a Tuesday, even a strong bank is in trouble by noon. Confidence is the product. It has always been.",
      "For investors and depositors, the lesson is dull and durable. Watch diversification of assets and liabilities. Ask how rate risk is controlled. Respect insurance limits even when rules got stretched once and will likely get stretched again. We study banks the way we study any business. Balance sheet, incentives, and what breaks when the story turns. Fashionable calm after a rescue is not the same thing as risk having gone to zero.",
    ],
  },
  {
    slug: "the-pitfalls-of-interpreting-economic-data",
    channel: "insights",
    title: "When Good News Is Bad News",
    date: "2023-03-21",
    excerpt: "Strong jobs numbers can send stocks down. Headline data lies by omission. Bring a shovel.",
    body: [
      "On a Friday in early 2023, the jobs report landed hot: hundreds of thousands more payrolls than expected. Equities fell. Bond yields jumped. An observer could be forgiven for wondering what, exactly, counted as good news anymore.",
      "Ordinarily, more jobs mean more spending, more growth, and better earnings. And stocks like that story. Sometimes the tape flips the logic. When inflation is already a problem, strong data can mean the Fed stays higher for longer, recession risk rises, and “good” becomes “bad” before lunch. Knowing which regime you are in matters more than memorizing the headline.",
      "The data itself is slippery. Seasonal adjustments can turn a raw decline in January hiring into a soaring seasonally adjusted print. First releases are estimates; later benchmarks revise them. Catch-up hiring in industries still climbing out of a shock can look like boom-time strength until the catch-up ends. First impressions of economic releases mislead often enough that treating them as gospel is a hobby, not a process.",
      "Indicators also quarrel. A tight unemployment rate can sit beside cooling wage growth. Measures of labor-market “slack” that only count the officially unemployed miss people returning to the workforce. Participation can rise quietly in the background and change the whole story about wage pressure. Wall Street likes tidy chains of cause and effect. The economy is under no obligation to provide them.",
      "We do not pretend to predict every print. We prepare for several futures: watch inflation and policy, read past the seasonally adjusted theater, and ask what a number implies for cash flows and valuations. Not what it implies for tomorrow’s open. Macro work is an inexact science. Most forecasts are wrong. Probabilities and second looks are the job.",
      "Interpretation of economic data should come with caution and a large shovel. Dig once. Then decide whether anything in the portfolio should actually change.",
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

/** Ledger-style date: 2025.11.12 */
export function formatLearnDateDot(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${y}.${m}.${d}`;
}

/** Dossier plate date: 19 APR 2023 */
export function formatLearnDatePlate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(new Date(Date.UTC(y, m - 1, d)))
    .toUpperCase();
}

/** Rough reading time from body paragraphs. */
export function estimateReadMinutes(body: string[]): number {
  const words = body
    .filter(
      (p) =>
        !/information contained in this communication/i.test(p) &&
        !/past performance does not guarantee/i.test(p) &&
        !/investment management and advisory services/i.test(p),
    )
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
