/**
 * Copy for the Lumière Fine Jewelry case study (`/case-study/lumiere-fine-jewelry`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (❌ / ✔ /
 * 📈  ❤️ 🎯) are rendered as brand icons in the UI instead of emoji — the
 * wording itself is untouched.
 *
 * Note: the client doc's "Snapshot" heading arrived WITH four headline stats
 * AND a matching snapshot graphic (the first supplied image), so that graphic
 * renders as the hero snapshot board and the four stats power the index card
 * results. The doc's "Results" section carries no text — the remaining
 * supplied screenshots (Meta campaign table + two ad-creative triptychs) ARE
 * the results, so they render as an evidence board (LUM_RESULTS_SHOTS). The
 * "[Image: Lumière Fine Jewelry Logo Mockup]" placeholder line in the overview
 * is skipped: no logo asset was supplied with the brief.
 */

import lumiereSnapshotImg from '../assets/images/lumiere_snapshot.png';
import lumiereCampaignsImg from '../assets/images/lumiere_campaigns.png';
import lumiereCreativesAImg from '../assets/images/lumiere_creatives_a.png';
import lumiereCreativesBImg from '../assets/images/lumiere_creatives_b.png';

/** Hero snapshot board visual: the client's own campaign snapshot. */
export const LUM_IMAGE = lumiereSnapshotImg;

export const LUM = {
  eyebrow: 'Lumière Fine Jewelry · Case Study',
  /** Page h1 and index-card title. */
  title:
    'Turning Instagram and Facebook Into a Primary Sales Channel for a Luxury Jewelry Retailer',
  meta: {
    industry: 'Jewelry & Luxury Retail',
    timeline: '6 Months',
    channels: ['Social Media Marketing (Organic & Paid)', 'Facebook', 'Instagram'],
    objectiveLabel: 'Objective',
    objective:
      'Grow audience and engagement across Facebook and Instagram, and turn social content into a consistent driver of in-store visits and coupon redemptions for a luxury jewelry retailer.',
  },
} as const;

export const LUM_OVERVIEW = {
  heading: 'Project Overview',
  paras: [
    'Lumière Fine Jewelry is a luxury jewelry retailer specializing in custom diamond pieces, engagement rings, and statement watches. Their in-store product quality was undeniable, but their social presence didn’t reflect it, inconsistent posting, low engagement, and no clear strategy for turning followers into store visits.',
    'Digivibz rebuilt Lumière’s Facebook and Instagram presence from the ground up, focused on showcasing their most striking pieces and pairing that content with offer campaigns that gave followers a reason to visit the store.',
  ],
};

export const LUM_CHALLENGE = {
  heading: 'The Challenge',
  intro:
    'Jewelry is a highly visual, aspirational purchase, exactly the kind of product social media is built to sell. Lumière wasn’t taking advantage of that.',
  problems: [
    'Inconsistent posting with no content strategy',
    'Low engagement relative to the quality of their actual product photography',
    'No paid social strategy to expand reach beyond existing followers',
    'No coupon or offer campaigns to convert social interest into store visits',
    'Underused Instagram, despite it being the more natural fit for their product',
  ],
};

export const LUM_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface LumPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
}

export const LUM_PHASES: LumPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro:
      'We started by understanding what actually drove engagement for jewelry brands on social, and where Lumière’s current content was falling short of that.',
    checks: [
      'Audit of existing Facebook and Instagram performance',
      'Competitor research across luxury jewelry social accounts',
      'Analysis of which product types and content styles drove the strongest reactions',
      'Review of past offer performance and redemption behavior',
    ],
  },
  {
    number: '02',
    name: 'Design',
    intro:
      'With that research in place, we planned a content and campaign strategy built around Lumière’s strongest visual asset, their product itself.',
    checks: [
      'Content calendar built around close-up, high-detail product photography',
      'Platform-specific strategy, video-forward on Facebook, image-forward on Instagram',
      'Paid social plan to extend reach beyond the existing follower base',
      'Coupon offer campaigns designed to convert engagement into store visits',
    ],
  },
  {
    number: '03',
    name: 'Develop',
    intro: 'With the strategy locked in, we built out the full content and campaign system.',
    checks: [
      'Product-focused photo and video content highlighting craftsmanship and detail',
      'Paid social campaigns targeting local, high-intent luxury shoppers',
      'Coupon offer creative and landing experience for redemption tracking',
      'Posting cadence and engagement response workflow across both platforms',
    ],
  },
  {
    number: '04',
    name: 'Deploy',
    intro: 'Once built and tested, we launched content and campaigns consistently across both channels.',
    checks: [
      'Organic content published on a consistent schedule across Facebook and Instagram',
      'Paid social campaigns activated to expand reach',
      'Coupon offer campaigns launched with trackable redemption codes',
      'Engagement actively monitored and responded to in real time',
    ],
  },
  {
    number: '05',
    name: 'Detect',
    intro: 'Launch was the starting point, not the finish line. We tracked what was resonating and shifted focus toward it.',
    checks: [
      'Audience growth tracked by channel',
      'Engagement totals and engagement change monitored weekly',
      'Offer redemption rates tracked against campaign spend',
      'Content style and posting cadence refined based on what performed best',
    ],
  },
];

export const LUM_RESULTS_HEADING = 'Results';

export interface LumResultShot {
  src: string;
  title: string;
  stat: string;
  alt: string;
}

/**
 * The client doc's "Results" section arrived empty — the Meta campaign table
 * and the two ad-creative triptychs supplied with the brief are the results
 * themselves. The first shot renders full width; the pair below sit side by
 * side.
 */
export const LUM_RESULTS_SHOTS: LumResultShot[] = [
  {
    src: lumiereCampaignsImg,
    title: 'Meta Campaign Performance',
    stat: '70,195 results · $91,743.50 spent',
    alt: 'Meta Ads Manager campaigns table for Lumière Fine Jewelry from 1 Jan 2024 to 30 Jun 2024 showing six campaigns totalling 70,195 results, 3,549,456 reach, 7,826,890 impressions and $91,743.50 spent',
  },
  {
    src: lumiereCreativesAImg,
    title: 'Ad Creatives · Set One',
    stat: 'Rings · Bracelets · Watches',
    alt: 'Three Lumière Fine Jewelry ad creatives: a solitaire engagement ring on navy silk, stacked gold diamond bracelets on stone, and a two-tone luxury watch with bracelet',
  },
  {
    src: lumiereCreativesBImg,
    title: 'Ad Creatives · Set Two',
    stat: 'Necklaces · Bands · Bracelets',
    alt: 'Three Lumière Fine Jewelry ad creatives: a halo diamond necklace on navy silk, paired rose gold and silver wedding bands, and a gold diamond bracelet on dark green stone',
  },
];

export const LUM_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'Lumière’s social presence went from an underused afterthought to one of the brand’s strongest channels for both engagement and measurable in-store impact.',
    'Before this project, posting was sporadic and reactive, with no real strategy behind it, and engagement reflected that inconsistency. Now, content follows a clear rhythm built around Lumière’s actual strength: close-up, detail-rich photography of pieces that are striking on their own.',
    'This mattered beyond vanity metrics too. Growth on Instagram meant Lumière was reaching new audiences actively interested in luxury jewelry, not just re-engaging the same existing followers. And the coupon offer campaigns proved something even more valuable: that this engagement could be tracked all the way to an actual store visit, not just a like or a follow.',
  ],
};

export const LUM_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    'Luxury jewelry sells on desire and detail, exactly what strong visual content on Instagram and Facebook is built to capture. By pairing consistent, high-quality product content with paid reach and trackable offers through our 5D Growth Framework, we turned social media from a brand awareness afterthought into a measurable sales channel.',
    'A diamond ring or a custom watch doesn’t need clever copy to sell itself, it needs to be seen clearly and often. That’s why the content strategy leaned into detail shots and craftsmanship rather than generic lifestyle posts. Paid social extended that content beyond people who already followed the brand, reaching new local audiences with genuine intent, while coupon offers gave those newly engaged followers a specific reason to walk into the store.',
  ],
};

export const LUM_CTA = {
  title: 'Ready to Turn Your Social Media Into a Sales Channel?',
  body: 'Whether you’re a jewelry brand or another visually-driven retailer, our 5D Growth Framework helps you build engaging content and campaigns that convert followers into customers.',
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const LUM_INDEX_SUMMARY = LUM.meta.objective;
export const LUM_MODAL_CHALLENGES = LUM_CHALLENGE.problems;
/** Modal "what we did": the phase intros. */
export const LUM_MODAL_APPROACH = LUM_PHASES.map((p) => p.intro);
/** Index/modal results — the four snapshot stats (row slices to 3). */
export const LUM_INDEX_RESULTS = [
  { value: '9,200+', label: 'Net audience growth across channels' },
  { value: '48%', label: 'Overall audience growth rate' },
  { value: '45,000+', label: 'Total engagement actions' },
  { value: '280%+', label: 'Engagement growth on Instagram' },
];
