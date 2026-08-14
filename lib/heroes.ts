/** Art-directed hero photography — desktop (h) + mobile (v) AVIF pairs. */

export const HERO_IDS = [
  "acceptance",
  "ballet",
  "belongings",
  "college",
  "community",
  "firsthome",
  "grandma",
  "hospital",
  "piano",
  "redwoods",
  "travel",
  "travel2",
  "zoom",
] as const;

export type HeroId = (typeof HERO_IDS)[number];

export type HeroAsset = {
  id: HeroId;
  /** Horizontal 2400×1200 (2:1) */
  desktop: string;
  /** Vertical 1600×2000 (4:5) */
  mobile: string;
  alt: string;
};

const base = "/photography/heroes";

export const HEROES: Record<HeroId, HeroAsset> = {
  acceptance: {
    id: "acceptance",
    desktop: `${base}/fv-hero-acceptance-h.avif`,
    mobile: `${base}/fv-hero-acceptance-v.avif`,
    alt: "Three generations erupt in joy at a college acceptance on screen.",
  },
  ballet: {
    id: "ballet",
    desktop: `${base}/fv-hero-ballet-h.avif`,
    mobile: `${base}/fv-hero-ballet-v.avif`,
    alt: "A young dancer watches older ballerinas rehearse in a sunlit studio.",
  },
  belongings: {
    id: "belongings",
    desktop: `${base}/fv-hero-belongings-h.avif`,
    mobile: `${base}/fv-hero-belongings-v.avif`,
    alt: "Three generations sort through a box of family photographs together.",
  },
  college: {
    id: "college",
    desktop: `${base}/fv-hero-college-h.avif`,
    mobile: `${base}/fv-hero-college-v.avif`,
    alt: "A parent kisses a young adult’s temple in a close embrace outside the family home.",
  },
  community: {
    id: "community",
    desktop: `${base}/fv-hero-community-h.avif`,
    mobile: `${base}/fv-hero-community-v.avif`,
    alt: "A youth soccer team in Fairview Capital jerseys poses on a Marin field with Mount Tam behind them.",
  },
  firsthome: {
    id: "firsthome",
    desktop: `${base}/fv-hero-firsthome-h.avif`,
    mobile: `${base}/fv-hero-firsthome-v.avif`,
    alt: "A young couple shares a laugh among moving boxes in a new home.",
  },
  grandma: {
    id: "grandma",
    desktop: `${base}/fv-hero-grandma-h.avif`,
    mobile: `${base}/fv-hero-grandma-v.avif`,
    alt: "A grandmother leans in close, telling a story to rapt grandchildren.",
  },
  hospital: {
    id: "hospital",
    desktop: `${base}/fv-hero-hospital-h.avif`,
    mobile: `${base}/fv-hero-hospital-v.avif`,
    alt: "A quiet moment of care in a hospital room lit by a window.",
  },
  piano: {
    id: "piano",
    desktop: `${base}/fv-hero-piano-h.avif`,
    mobile: `${base}/fv-hero-piano-v.avif`,
    alt: "A musician at a grand piano, absorbed in concentrated work.",
  },
  redwoods: {
    id: "redwoods",
    desktop: `${base}/fv-hero-redwoods-h.avif`,
    mobile: `${base}/fv-hero-redwoods-v.avif`,
    alt: "A person and their dog stand among towering California redwoods.",
  },
  travel: {
    id: "travel",
    desktop: `${base}/fv-hero-travel-h.avif`,
    mobile: `${base}/fv-hero-travel-v.avif`,
    alt: "A mother and two children share a joyful hug while traveling.",
  },
  travel2: {
    id: "travel2",
    desktop: `${base}/fv-hero-travel2-h.avif`,
    mobile: `${base}/fv-hero-travel2-v.avif`,
    alt: "Two travelers walk a desert path toward the pyramids.",
  },
  zoom: {
    id: "zoom",
    desktop: `${base}/fv-hero-zoom-h.avif`,
    mobile: `${base}/fv-hero-zoom-v.avif`,
    alt: "An advisor smiles at a laptop during a video conversation.",
  },
};
