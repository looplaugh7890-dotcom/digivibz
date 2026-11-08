/**
 * Copy for the CupsNChai case study (`#/case-study/cups-n-chai`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (❌ / ✔ /
 * 📈 🔎 🏆 📝 🎯) are rendered as brand icons in the UI instead of emoji —
 * the wording itself is untouched.
 *
 * Note: the client doc's "Snapshot" and "Creative & Social Media" headings
 * arrived with no content under them; they are not rendered here (flagged
 * to the client for follow-up images/copy).
 */

import type { LucideIcon } from 'lucide-react';
import { Award, FileText, Search, Target, TrendingUp } from 'lucide-react';

import cupsnchaiImg from '../assets/images/cupsnchai.jpg';

export const CUPS_IMAGE = cupsnchaiImg;

export const CUPS = {
  eyebrow: 'CupsNChai · Case Study',
  /** Page h1 and index-card title. */
  title: 'Building a Local Brand Presence for a South Asian Chai Café',
  meta: {
    industry: 'Restaurant / Food & Beverage (South Asian Café)',
    timeline: '6 Months',
    channels: [
      'Web Design & Development',
      'Local SEO',
      'Content Writing',
      'Creative Design',
      'Social Media',
    ],
    objectiveLabel: 'Objective',
    objective:
      'Build a strong local brand presence and drive foot traffic and online engagement for a South Asian chai café through a complete digital overhaul.',
  },
} as const;

export const CUPS_OVERVIEW = {
  heading: 'Project Overview',
  paras: [
    'CupsNChai is a South Asian café serving authentic desi chai, herbal blends, and traditional snacks like samosa chaat, bringing the flavors and culture of South Asia to its local community. Despite a loyal in-person following, the café had no digital presence to match its reputation, and had never invested in a website, content, or local SEO.',
    'We worked with CupsNChai to build their brand from the ground up online, connecting them with chai lovers and desi food enthusiasts across their region.',
  ],
};

export const CUPS_CHALLENGE = {
  heading: 'The Challenge',
  intro:
    'CupsNChai had strong word-of-mouth and a devoted local customer base, but almost nothing online reflected the experience people had in person.',
  problems: [
    'No website, customers couldn’t find their menu, hours, or location online',
    'Zero visibility in local search for chai or South Asian food searches',
    'No content strategy or blog presence',
    'Inconsistent, unbranded social media',
    'No way to promote events or seasonal specials digitally',
  ],
  closing:
    'Local competitors with even modest websites were outranking CupsNChai for searches happening right in their own neighborhood.',
};

export const CUPS_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface CupsPhase {
  number: string;
  name: string;
  /** Only DISCOVER and DESIGN arrive with an intro in the client copy. */
  intro?: string;
  checks: string[];
}

export const CUPS_PHASES: CupsPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro: 'We researched how local customers search for South Asian food and chai specifically.',
    checks: [
      'Identified high-intent local searches like "chai near me" and "best desi chai in [city]"',
      "Audited local competitors' SEO and content presence",
      'Reviewed customer behavior around food discovery and reviews',
      "Found zero existing content targeting CupsNChai’s actual specialties",
    ],
  },
  {
    number: '02',
    name: 'Design',
    intro:
      "We planned a brand-first website and content structure built to reflect the café's atmosphere and culture.",
    checks: [
      "Vibrant, mobile-friendly website design reflecting the café's identity",
      'Menu and location pages built for easy browsing',
      'Local SEO architecture targeting neighborhood-level searches',
      'Visual direction for social and print materials',
    ],
  },
  {
    number: '03',
    name: 'Develop',
    checks: [
      'Built a fully responsive website with online menu and contact integration',
      'Wrote SEO-optimized content around the café’s specialties and local search terms',
      'Designed social media templates and promotional graphics',
      'Set up tracking for local search performance and site engagement',
      'Prepared marketing materials for in-person events',
    ],
  },
  {
    number: '04',
    name: 'Deploy',
    checks: [
      'Launched the new website with local SEO content live across all pages',
      'Rolled out consistent social media posting with branded templates',
      'Supported a local event/pop-up appearance with branded materials',
      'Began publishing blog content targeting local, chai-specific search terms',
    ],
  },
  {
    number: '05',
    name: 'Detect',
    checks: [
      'Tracked keyword rankings weekly for local search terms',
      'Monitored website traffic and impressions via Search Console and Analytics',
      'Reviewed which blog content was gaining traction or featured in search results',
      'Adjusted content topics based on what local customers were actually searching for',
    ],
  },
];

export const CUPS_RESULTS_HEADING = 'Results';

export interface CupsResult {
  text: string;
  icon: LucideIcon;
}

export const CUPS_RESULTS: CupsResult[] = [
  {
    text: 'Significant growth in impressions and organic traffic within 6 months',
    icon: TrendingUp,
  },
  {
    text: '4,500 organic keywords ranked, up from a near-zero starting point',
    icon: Search,
  },
  {
    text: 'Top 1 rankings for 10+ hyper-local chai and café keywords',
    icon: Award,
  },
  {
    text: 'Multiple blog posts featured in Google’s AI Overview',
    icon: FileText,
  },
  {
    text: 'Strong average CTR driven by locally relevant, high-intent content',
    icon: Target,
  },
];

export const CUPS_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'CupsNChai’s biggest shift wasn’t just having a website, it was going from completely invisible online to owning local search for chai and South Asian food in their area. Customers who once found them only by word-of-mouth can now find them the moment they search for chai nearby.',
    'The brand didn’t just gain traffic. It gained a consistent presence across search, social, and content that keeps bringing new customers in, month after month, without relying on foot traffic alone.',
  ],
};

export const CUPS_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    "We didn't treat this as a simple website project. We built a complete local brand identity from the ground up search visibility, content that reflected the culture and flavors CupsNChai represents, consistent social media, and support for real-world events, all working together through our 5D Growth Framework.",
    'Each phase fed into the next: research shaped the content strategy, the content strategy shaped what ranked, and what ranked kept bringing new customers back to a brand that finally matched its reputation online.',
  ],
};

export const CUPS_CTA = {
  title: 'Ready to Build a Local Brand That Shows Up Where It Matters?',
  body: "Whether you're launching your first website or trying to grow local visibility, our 5D Growth Framework helps local businesses build a brand customers can find, trust, and choose.",
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const CUPS_INDEX_SUMMARY = CUPS.meta.objective;
export const CUPS_MODAL_CHALLENGES = CUPS_CHALLENGE.problems;
/** Modal "what we did": phase intros, falling back to the first check. */
export const CUPS_MODAL_APPROACH = CUPS_PHASES.map((p) => p.intro ?? p.checks[0]);
/** Index/modal results — numeric highlights first (row slices to 3). */
export const CUPS_INDEX_RESULTS = [
  { value: '4,500', label: 'Organic keywords ranked, up from a near-zero starting point' },
  { value: 'Top 1', label: 'Rankings for 10+ hyper-local chai and café keywords' },
  { value: 'AI Overview', label: 'Multiple blog posts featured in Google’s AI Overview' },
  { value: '6 Months', label: 'Significant growth in impressions and organic traffic within 6 months' },
  { value: 'CTR', label: 'Strong average CTR driven by locally relevant, high-intent content' },
];
