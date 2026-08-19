/** Site-review — Loom walkthroughs. Argument plays in the home hero. */

export type ReviewClip = {
  id: string;
  path: string;
  title: string;
  script: string;
  kind?: "audio" | "video";
  note?: string;
  pinEnd?: string;
  /** Plays in the home review hero stage, not the dock. */
  hero?: boolean;
};

export const REVIEW_CLIPS: ReviewClip[] = [
  {
    id: "argument",
    path: "/",
    title: "Strategy & positioning",
    kind: "video",
    hero: true,
    note: "Hero on home. Record as argument.mp4 (or hero-strategy.m4a).",
    script: `I want to share the exact strategy behind why I chose these words for the hero screen:

“Most firms answer to a board, a bank, or a buyer. Ours answers to the phone ringing. We built Fairview so we only have one boss. You.”

When I sat down to look at the competitive landscape, I realized almost every RIA website looks and sounds identical. They all use the exact same vocabulary—fiduciary, holistic, personalized, boutique, long-term. When everyone says the exact same thing, those words stop meaning anything to a prospective client.

Now, a lot of firms fall into the trap of focusing exclusively on wealth growth. But when you’re talking to a family with ten or twenty million dollars, wealth growth is assumed—character and culture are not. High-net-worth clients already take it for granted that a firm with over two billion dollars in assets knows how to manage a portfolio. What they don’t take for granted—and what they’re actually testing when they open three tabs at ten o’clock at night—is trust, character, and alignment.

They want to know: When push comes to shove, who actually owns this firm, and whose interests come first?

That’s why the hero screen leads with ownership rather than generic promises. While half the industry has quietly sold out to private equity, rolled up into national aggregators, or pushed proprietary products to hit corporate quotas, Fairview stayed independent. You turned down those buyouts. You helped your own team become partners. You do your own stock research in-house.

Your competitors can hire marketing agencies and buy all the nice adjectives they want—fiduciary, boutique, personalized, expert.

But what they can’t buy is 1995. They can’t buy your in-house research book. They can’t buy a seventeen-person team where the people doing the work are actual owners. And they can’t buy a founder who turned down private equity buyouts because he’d rather say no to a check than compromise the firm.

In five seconds, this headline takes your 30-year operational history and turns it into your biggest commercial advantage. It tells a serious family that Fairview isn’t just another asset manager—it’s an owner-operated shop built to protect them for the next thirty years.`,
  },
  {
    id: "voice-and-tone",
    path: "/",
    title: "Voice and tone",
    kind: "video",
    hero: true,
    note: "Hero on home. Drop voice-and-tone.mp4 in public/review/.",
    script: `[Home hero]
On the home hero — the headline, the three numbers, the way the page speaks.

Voice and tone. Paste the spoken script here when you have it.`,
  },
  {
    id: "home",
    path: "/",
    title: "Home",
    kind: "video",
    script: `[Hero Screen / Opening]
On the main hero screen showing the numbers 1995, 100% Employee-Owned, and $2.14 Billion.

Once we anchored the firm’s positioning, the next step was making sure the homepage design actually matched Andy’s voice: honest, elevated, and plainspoken. Look at the old opening line: “Expert, Ethical, Effective. Striving to provide the highest level of service.” There’s nothing wrong with those words—Fairview is all of those things. But when every RIA on the West Coast uses that exact phrase, it becomes noise. More than that, Andy doesn’t speak in stacked adjectives; he speaks in plain facts. So I swapped out the fluff for three hard numbers right up front: 1995. 100% Employee-Owned. $2.14 Billion. Instead of promising independence, I wanted to just prove it.

[Scroll to “Start Here” List]
Scroll down to the clean “Start Here” list.

A lot of design agencies would build a trendy “Bento box” grid full of SaaS graphics and stock photos. I killed all of that. Fairview isn’t a software startup; it’s a 30-year-old institution. Instead, I built a quiet “Start Here” list. When a family lands on the page, they don’t want to get lost in a maze of marketing cards. They just want a clear path to answer their big questions—who owns the place, who does the research, and what it costs.

[Interactive Search Bar]
Hover over and click into the Search bar.

Right below that, I put a Search Field that connects directly to our new Questions & Answers page. A lot of your clients visit with one specific question in mind—custody, fee schedules, or ADV details. Letting them search right away—or jump straight to those direct Q&As—makes the site feel like a useful, transparent tool instead of a passive brochure.

[Scroll to Team Rail & Video Card]
Scroll down to the horizontal Team Rail and hover over the first featured video card.

Finally, your analytics show the Team page is historically the most visited page on the site. People don’t hire a logo; they hire the person on the other end of the phone. So I brought a Team Rail right onto the homepage to put everyone front and center immediately. Notice the first card on that rail—I reserved that specifically for featured video content. Think of it like Dicky Fox, the mentor from Jerry Maguire—short, unscripted clips of team members sharing real wisdom. It humanizes the team instantly and lets a prospect feel the character of the room before they ever step foot in the office.`,
  },
  {
    id: "photography",
    path: "/",
    title: "Photography direction",
    kind: "video",
    script: `[Hero Photograph]
Hovering over the candid black-and-white frame on the homepage under the primary metrics—then slowly scrolling through the secondary photo placements across the site.

Photography is one of the most clichéd parts of the RIA industry. You know the look: a silver-haired couple on a sailboat, a handshake in a glass conference room, a family laughing on a white couch nobody actually owns. Stock. Posed. Interchangeable. Swap the logo and it could be any firm in the county.

We worked hard to get away from that.

Every photograph here is black-and-white documentary work—candid, unposed, photojournalism rather than advertising. Grainy 35mm film texture. Everyday moments that feel caught, not staged. The point isn’t lifestyle aspiration. It’s to feel timeless and emotional—closer to a family album or a newspaper than a brochure.

A serious family can tell the difference in two seconds. If the pictures look rented, they assume the rest is rented too.`,
  },
  {
    id: "wealth",
    path: "/work/wealth-management",
    title: "Wealth management",
    kind: "video",
    script: `[Hero Screen]
On the Wealth Management hero screen addressing Wall Street.

On the old site, wealth management was spread across three separate sub-pages filled with corporate brochure language like “achieving your life goals.” Making a family click through three tabs just to figure out how you work forces them to hunt. I consolidated all of it into one single, cohesive page. The hero headline calls out how Wall Street redefined wealth to mean “casino.” That’s a sharp critique of an industry habit that serious families are tired of—not a promise about market returns.

[Scroll to Services Rail]
Scroll down to the Services Rail and click through photo cards like Estate Planning, Family, and Income & Tax.

Instead of describing “capabilities,” I laid out the entire engagement as scenes in a family’s life: starting with actual arithmetic on your plan, tax-aware trading, and getting your CPA, estate lawyer, and trustee in the same room. To keep the page from turning into a wall of dense text, I built an interactive Services Rail. Clicking any photo card expands the specific services underneath without overwhelming the reader.

[Onboarding Path Toggle]
Scroll down to the onboarding section and click the path toggle so the route turns green.

Further down, I introduced an interactive path toggle to show your onboarding and stewardship process. When you switch Fairview guidance on, the path turns green, true, and smooth. It visually demonstrates how you remove administrative friction, unwind legacy positions to avoid unnecessary tax hits, and manage multi-generational transitions quietly over decades.

[Scroll to Technology & Outside Assets Widget]
Scroll to the Technology card and interact with the outside assets widget.

I also added a dedicated Technology section. Clients want to know how their data is analyzed, so we show how you use technology to stress-test their plan against bad markets and rising taxes—including an interactive widget demonstrating how you advise on outside, unbilled assets. If it affects a family’s financial life, you advise on it whether you bill on it or not.

[Scroll to FAQ Carousel & Next Steps]
Scroll down past the kitchen table graphic to the Q&A carousel at the bottom.

Finally, I closed the page showing that you meet on their terms—over Zoom, on the phone, or at a kitchen table—followed by a visual carousel answering common family questions. By pulling three fragmented tabs into one continuous story, a prospective family can see their entire financial life reflected on a single page.`,
  },
  {
    id: "investment",
    path: "/work/investment-management",
    title: "Investment management",
    kind: "video",
    script: `[Hero Screen / Core Thesis]
On the Investment hero screen showing “A ticker is just a string of letters. We buy what’s underneath it.”

On the old site, the investment process was buried across three separate pages—Philosophy, Process, and Risk—filled with academic terms. I consolidated all of it onto a single page, leading with a plainspoken thesis: “A ticker is just a string of letters. We buy what’s underneath it.” I took Carl’s original copy and brought it directly into the firm’s plain voice—taking extreme care not to change a single underlying fact. We still outline the four steps of our equity strategy, our focus on five-year models, direct company meetings, and disciplined valuation.

[Scroll to Macro Section]
Scroll down to the macro philosophy block.

If you scroll down to the macro section, instead of claiming we can predict interest rates or GDP, we state the honest truth: most economists are more often wrong than right. We acknowledge macro as an inexact science, which shows intellectual humility and gives a prospect a line they can actually repeat at dinner.

[Scroll to Long-Term Themes & Holdings Callout]
Scroll down to the theme cards like AI, Electrification, Water, and hover over the 25–30 Holdings stat.

Further down, we highlight our long-term investment themes—like AI, electrification, and water infrastructure—and show our portfolio implementation. Notice the 25 to 30 core holdings callout. The old site said 15 to 25, so I updated that range to reflect how the team talks today—we just need to confirm that number with Carl and the research team.

[Closing Headline]
Scroll to the bottom of the page showing “Several futures. One careful portfolio.”

From a compliance perspective, there are no cherry-picked return charts, no backtested models, and no performance promises. The page ends with a clean headline: “Several futures. One careful portfolio.” By moving from three abstract pages into one direct narrative, we give prospective families a clear reason to trust who’s picking their stocks.`,
  },
  {
    id: "fees",
    path: "/firm/fees",
    title: "Fees",
    kind: "video",
    script: `[Hero Screen / Published Fee Schedule]
On the main Fees screen displaying the clean 1.00%, 0.75%, and 0.50% tiers.

The old site showed your 1.00%, 0.75%, and 0.50% tiers as a static graphic. We kept those exact published numbers right up front, but modernized the layout so it’s effortless to read.

[Interactive Asset Calculator]
Scroll down to the dark card titled “See it on your assets” and drag the asset slider across $5M, $10M, and $25M.

The main addition is the dark card at the bottom: “See it on your assets.” I know Marcia might pause on this from a compliance angle, but here’s why it works and why it’s safe: It doesn’t create new math or make fee promises. It uses your exact published rate schedule, includes clear disclaimers, and explicitly notes that Form ADV governs. It’s just transparent arithmetic.

[Closing & Disclaimer Flexibility]
Hover over the disclaimer copy at the bottom of the calculator card.

Instead of forcing a prospect to pull out a calculator to figure out marginal tiering, they can drag a slider to five, ten, or twenty-five million dollars and see their effective rate and dollar amount instantly. It takes a static graphic and turns it into an active tool that proves Fairview has nothing to hide. If counsel wants to tweak the disclaimer text, we can do that in seconds—but keeping the card builds immediate trust.`,
  },
  {
    id: "technology",
    path: "/firm/technology",
    title: "Technology",
    kind: "video",
    script: `[Intro Animation & Hero Screen]
Refresh or load the page to watch the opening animation cycle through “Internet, Computers, Cloud, Software” before landing on “Tools change. Relationships last.”

The old site didn’t have a dedicated Technology page, but prospective clients are constantly asking how modern tools—and specifically AI—fit into our work. Before this hero screen loads, there’s a brief animation that cycles through past tech waves—Internet, Computers, Cloud, Software—which sets up the main payoff headline: “Tools change. Relationships last.”

[Scroll through Scenario Analysis & AI Copy]
Scroll down through the text blocks detailing deeper analysis versus human judgment.

The strategy here is to show that Fairview isn’t afraid of technology, but we know its limits. We use advanced software and AI to run deeper stress tests, analyze scenarios faster, and strip out administrative friction. It lets us see further. What it can’t do is replace human judgment. A model can calculate a range of outcomes, but it can’t weigh family trade-offs, understand your values, or sit with you when a hard decision actually gets made.

[Scroll to Summary Quote]
Scroll to the bottom paragraph featuring the 1995 philosophy quote.

We sum up our philosophy since 1995 in one sentence: Use whatever helps us see further—never let it decide for you. It turns a potential anxiety about AI into a strong statement about our character and judgment.`,
  },
  {
    id: "community",
    path: "/firm/community",
    title: "Community",
    kind: "video",
    script: `[Hero Screen / Hero Photo]
On the main Community screen showing the high-impact Marin FC hero photo.

On the old site, community involvement was structured like a corporate photo gallery. The problem with image grids is that if you don’t have dozens of high-res photos—or if the team isn’t actively updating them every month—the page instantly looks sparse and outdated. I killed the grid on purpose. Instead of trying to chronicle every event like a PR agency, I focused on one high-impact hero photo paired with personal, authentic storytelling.

[Scroll to Personal Narrative Copy]
Scroll down to the copy detailing Brian, Peter, Andy, and Annie’s local involvement.

It shifts the narrative away from corporate virtue-signaling or writing checks for tax write-offs. It shows that community involvement isn’t a marketing initiative at Fairview—it’s just how the team lives their lives in Marin. It makes the firm feel neighborly, grounded, and real, without creating an ongoing operational burden to constantly collect and upload new photo grids.`,
  },
  {
    id: "answers",
    path: "/answers",
    title: "Answers",
    kind: "video",
    script: `[Hero Screen & Search Bar]
On the main Answers page showing the category pills and the interactive search bar.

The old site didn’t have a dedicated FAQ section, but I strongly encouraged adding this new Answers page because it fundamentally changes how prospects interact with the firm. Instead of making people dig through pages of narrative or schedule an intro call just to learn your account minimums, fee schedules, or custody arrangements, this page gives them direct, plainspoken answers right away. It promotes absolute transparency and simplicity, letting prospective families self-qualify on their own terms before they ever reach out.

[Clicking a Dedicated URL Question]
Click on question 03 “Do you have a minimum to work with you?” to show it opening its own dedicated sub-page URL.

Behind the scenes, I built a few key technical features into this section: First, every single question has its own dedicated URL page. This is a huge win for SEO—targeting specific, high-intent queries like “Fairview account minimums”—and it lets your team drop a direct link into an email whenever a client or CPA asks a specific operational question.

[Demonstrating Search Term Logging & Admin CMS]
Type “minimum” into the search bar, then switch tabs briefly to show the backend admin dashboard.

Second, I set up the site admin to log every single search term typed into that search bar. Over time, that gives your team incredible, real-time data on exactly what prospective clients are looking for. Finally, the entire section is built to be fully managed internally through the admin dashboard. The team can easily log in to add new questions, refine answers, or tweak categories whenever they want—no developer needed.`,
  },
  {
    id: "learn",
    path: "/learn",
    title: "Learn",
    kind: "video",
    script: `[Hero Screen & Three Channel Bucket Cards]
On the main Learn landing page showing the three giant vertical cards: Quarterly Letters, Investment Insights, and Planning.

On the old site, Insights was a marketing blog filled with vendor-written listicles designed to rank for local keywords. I replaced that with Learn—turning a blog into a true publishing desk built around three clear channels: Quarterly Letters, Investment Insights, and Planning.

[Clicking into Quarterly Letters vs. Discussing Old Vendor Posts]
Click into the Quarterly Letters bucket card to showcase the Q1 2026 letter layout.

Now, I know the firm recently paid a vendor for those local SEO posts, and the vendor did the exact job they were hired to do. But I still strongly recommend leaving them off. The issue isn’t the vendor; it’s the strategy. Those posts—like “Why Young Professionals Need A Financial Advisor In Marin County”—were search phrases, not clients. The money spent is a sunk cost, but leaving them up actively hurts you. A family walking through a two-million-dollar door reads Andy’s quarterly letter and immediately spots vendor copy. It dilutes your brand, makes Fairview sound like a commodity shop that takes $250k accounts, and reads like a testimonial you didn’t collect.

[Demonstrating “On the Page” Content Quality]
Click through into an individual letter to show the editorial layout and blockquote styling.

A $2 million door doesn’t fail because Fairview was hard to find on Google—it fails if the right family lands on the site and can’t tell you apart from every other advisor in the county. To dominate search in Marin and protect the Fairview brand online, we don’t need listicles—we need a cleaner, two-part strategy: First, on the page, we show real thinking that attaches a body of work to Andy’s name. AI models and Google in 2026 reward a clear, authentic entity. When AI answers “What does Fairview think?”, it quotes real, dated human writing—not vendor boilerplate.

[Highlighting “Chrome”, Schema, and Local Backlinks]
Scroll to the footer showing the Greenbrae & Pittsburgh addresses, then jump back out to the main Learn overview.

Second, in the chrome and local ecosystem—our metadata, schema, Google Business Profile, and real local backlinks. If you want to spend local budget on SEO, spend it supporting Marin FC, Dominican University, Guide Dogs for the Blind, or the Marin Lecture Series. Real backlinks from reputable local institutions in Marin carry massive domain authority with Google. That’s what proves you’re rooted in the community—not vendor blog posts. We win the local map pack by claiming your Google pins and leveraging real local backlinks, without forcing Andy to speak like a marketing robot in an H1 headline. Four real quarterly letters a year do infinitely more to build trust and win search than buying another year of vendor listicles.`,
  },
  {
    id: "why-fairview",
    path: "/firm/why-fairview",
    title: "Why Fairview",
    kind: "video",
    script: `Hey everyone, let’s walk through the new “Why Fairview” page. On the old site, “Our Firm” was just a standard collection of static text blocks. For this new experience, I deliberately broke my site grid to allow for more storytelling design—using dynamic reveals and subtle motion to prove who Fairview is rather than just stating it.

Now, I know modifying a founder’s letter is a sensitive move, but I revised Andy’s note so it weaves seamlessly into our broader narrative voice—specifically bringing in the recent news about transferring firm ownership to the employees. It takes Andy’s original 1995 premise and grounds it in present-day reality: Fairview turned down private equity buyouts to ensure the advisors running the firm are the actual owners.

As we scroll down to our fee section, you’ll see some purposeful visual metaphors driving our core principles home. Watch this animation: the large green sphere rolls in and physically bounces four smaller, separate spheres right out of frame. It’s a clean, symbolic way to show how all family accounts sit under one unified fee rather than being nickel-and-dimed across fragmented accounts.

Right below that, we have an interactive toggle comparing “A typical book” to “Fairview.” When you click Fairview, the grid instantly animates into 25 solid green circles. This visually proves that you hold a concentrated, deeply researched book of 25 to 30 companies instead of hiding behind hundreds of third-party funds.

Next is our sticky dark-green section. As you scroll, it smoothly flips through our key record—1995, $2.14 Billion, and 100% Employee-Owned—giving these massive milestones room to breathe.

Then we hit the Crises Rail. This horizontal timeline shows the major market storms Fairview has weathered alongside its clients—from the Dot-Com crash and the 2008 Financial Crisis to 2020. It proves 30 years of resilience with a simple headline: “Crises come and go. We don’t.”

Finally, we open and close the page with an honest filter: “We aren’t the right firm for everyone.” It immediately self-selects for high-conviction clients, setting Fairview apart from traditional wealth managers who try to be everything to everybody.`,
  },
];

export function getReviewClip(id: string): ReviewClip | undefined {
  return REVIEW_CLIPS.find((clip) => clip.id === id);
}

export function clipsOnPath(path: string): ReviewClip[] {
  return REVIEW_CLIPS.filter((clip) => clip.path === path);
}

export function clipIndex(id: string): number {
  return REVIEW_CLIPS.findIndex((clip) => clip.id === id);
}

export function adjacentClip(
  id: string,
  dir: -1 | 1,
): ReviewClip | undefined {
  const i = clipIndex(id);
  if (i < 0) return undefined;
  return REVIEW_CLIPS[i + dir];
}

export function reviewMediaSrc(clip: ReviewClip): string {
  return `/api/review/${clip.id}`;
}

export function isReviewHeroClip(clip: ReviewClip | null | undefined): boolean {
  return Boolean(clip?.hero);
}
