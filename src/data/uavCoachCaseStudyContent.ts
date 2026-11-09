/**
 * Copy for the UAV Coach Academy case study (`/case-study/uav-coach-academy`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (❌ / ✔ /
 * 📈  🔑 👥 🎯 ⏱️ 🌐) are rendered as brand icons in the UI instead of
 * emoji — the wording itself is untouched. (One obvious keystroke typo in the
 * CTA body, "vfirsisibility", is corrected to "visibility".)
 *
 * Note: the client doc's "Snapshot" heading arrived WITH seven headline stats,
 * so they render as a telemetry strip in the hero (the seventh tile spans two
 * columns to keep both rows flush). The doc's "Results" section carries no
 * text — the five ranking/SERP screenshots supplied with the brief ARE the
 * results, so they render as an evidence board (UAV_RESULTS_SHOTS). The first
 * supplied image (the pillar guide header) is the hero visual.
 */

import type { LucideIcon } from 'lucide-react';
import {
  Globe,
  KeyRound,
  Target,
  Timer,
  Trophy,
  TrendingUp,
  Users,
} from 'lucide-react';

import uavGuideImg from '../assets/images/uav_guide.png';
import uavPositionsImg from '../assets/images/uav_positions.png';
import uavSnippetQuadImg from '../assets/images/uav_snippet_quad.png';
import uavRankDroneImg from '../assets/images/uav_rank_drone.png';
import uavSnippetCircleImg from '../assets/images/uav_snippet_circle.png';
import uavAhrefsImg from '../assets/images/uav_ahrefs.png';

/** Hero board + index-card visual: the pillar guide itself. */
export const UAV_IMAGE = uavGuideImg;

export const UAV = {
  eyebrow: 'UAV Coach Academy · Case Study',
  /** Page h1 and index-card title. */
  title:
    'Ranking #1 for Competitive Drone Certification Keywords Through Strategic Pillar Content',
  meta: {
    industry: 'Drone Training & Aviation Education',
    timeline: '6 Months',
    channels: ['SEO'],
    objectiveLabel: 'Objective',
    objective:
      'Build a comprehensive SEO content strategy establishing UAV Coach as an authority on FAA drone certification, rank for competitive search terms, earn Featured Snippets, and generate sustainable organic traffic from people preparing for their Part 107 exam.',
  },
} as const;

export interface UavSnapshotStat {
  value: string;
  label: string;
  icon: LucideIcon;
  /** Seventh tile spans two columns so both grid rows stay flush. */
  wide?: boolean;
}

/** The client doc's "Snapshot" block — seven headline stats. */
export const UAV_SNAPSHOT: UavSnapshotStat[] = [
  { value: '#1', label: 'Ranking for multiple high-volume certification keywords', icon: TrendingUp },
  { value: 'Featured Snippets', label: 'Earned for several exam-related searches', icon: Trophy },
  { value: '34', label: 'Organic Keywords Ranking on Page One', icon: KeyRound },
  { value: '19,400', label: 'Pageviews Generated', icon: Users },
  { value: '16,200', label: 'Unique Pageviews', icon: Target },
  { value: '6 Minutes 10 Seconds', label: 'Average Time on Page', icon: Timer },
  {
    value: '14,800',
    label: 'Visits Generated Through Google Organic Search',
    icon: Globe,
    wide: true,
  },
];

export const UAV_OVERVIEW = {
  heading: 'Project Overview',
  paras: [
    'UAV COACH Academy helps aspiring commercial drone pilots prepare for and pass the FAA Part 107 certification exam. Their existing content on certification requirements was scattered across several short blog posts, none of which ranked competitively for the terms people actually searched when starting their certification journey.',
    'Instead of publishing more short posts targeting individual keywords, Digivibz developed an SEO-first pillar content strategy centered on one comprehensive guide: "How to Fly a Quadcopter, The Ultimate Guide":  The goal was to answer every question a prospective commercial pilot might have, from eligibility to test day, in a single authoritative resource.',
  ],
};

export const UAV_CHALLENGE = {
  heading: 'The Challenge',
  intro:
    'The drone certification space is dominated by a handful of well-established training providers, all competing for the same high-value searches from people ready to invest in commercial certification.',
  problems: [
    'Highly competitive search terms with strong established competitors',
    'Certification content scattered across multiple thin, underperforming posts',
    'No Featured Snippet presence despite strong search intent match',
    'Need to rank for dozens of related exam and eligibility questions, not just one phrase',
    'Not enough topical authority for Google to trust the content over bigger competitors',
  ],
};

export const UAV_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface UavPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
}

export const UAV_PHASES: UavPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro:
      'Every successful SEO campaign starts with understanding search intent rather than simply targeting keywords. Our research showed that people researching Part 107 certification weren’t searching for one isolated question, they wanted a complete path from "am I eligible" to "how do I pass the test."',
    checks: [
      'Comprehensive keyword research across certification, eligibility, and exam prep terms',
      'Search intent analysis to understand where people were in their certification journey',
      'Competitor content audit against existing top-ranking certification guides',
      'SERP analysis for Featured Snippet opportunities',
      'Identification of high-value long-tail keyword clusters',
    ],
  },
  {
    number: '02',
    name: 'Design',
    intro:
      'With the keyword strategy finalized, we structured the guide around Google’s understanding of topical authority rather than writing a simple article.',
    checks: [
      'SEO-friendly page architecture with logical content hierarchy',
      'Table of Contents for improved navigation',
      'Keyword clustering by topic: eligibility, exam prep, application process, renewal',
      'Optimized headings (H1–H4) throughout',
      'Featured Snippet-focused formatting for common exam questions',
    ],
  },
  {
    number: '03',
    name: 'Develop',
    intro: 'With the strategy complete, we built an in-depth resource designed to outperform competing certification guides.',
    checks: [
      'Comprehensive pillar content covering eligibility, application steps, and exam content',
      'Semantic keyword optimization throughout',
      'Internal linking strategy connecting to related training resources',
      'Optimized metadata across the page',
      'Rich visuals, including eligibility checklists and exam breakdowns',
      'FAQ section optimized for common certification questions',
    ],
  },
  {
    number: '04',
    name: 'Deploy',
    intro: 'After extensive optimization, the guide was published and fully integrated into the UAV Coach website.',
    checks: [
      'Page published and indexed via Search Console',
      'Internal links updated sitewide to point to the new guide',
      'Mobile optimization verified',
      'Technical SEO validation completed',
    ],
  },
  {
    number: '05',
    name: 'Detect',
    intro:
      'Publishing the content was only the beginning. We continuously monitored keyword rankings, traffic growth, and engagement to refine the page over time.',
    checks: [
      'Organic keyword tracking across all target terms',
      'Featured Snippet monitoring for exam-related questions',
      'User engagement analysis, including time on page and scroll depth',
      'Traffic growth monitoring month over month',
      'Continuous content refinement based on new FAA rule updates',
    ],
  },
];

export const UAV_RESULTS_HEADING = 'Results';

export interface UavResultShot {
  src: string;
  title: string;
  stat: string;
  alt: string;
}

/**
 * The client doc's "Results" section arrived empty — the five ranking and SERP
 * screenshots supplied with the brief are the results themselves.
 */
export const UAV_RESULTS_SHOTS: UavResultShot[] = [
  {
    src: uavPositionsImg,
    title: 'Keyword Rankings',
    stat: '1,314 organic positions',
    alt: 'Rank tracker table showing organic search positions 1-100 of 1,314, with multiple keywords at position 1',
  },
  {
    src: uavSnippetQuadImg,
    title: 'Featured Snippet',
    stat: '"how to fly a quadcopter"',
    alt: 'Google featured snippet for "how to fly a quadcopter" pulled from the UAV Coach guide',
  },
  {
    src: uavRankDroneImg,
    title: 'Ranking #1',
    stat: '"how to fly a drone"',
    alt: 'Google search results for "how to fly a drone" with the UAV Coach guide in the number one position',
  },
  {
    src: uavSnippetCircleImg,
    title: 'Snippet + #1',
    stat: '"how to fly a quadcopter in a circle"',
    alt: 'Google featured snippet and organic result for "how to fly a quadcopter in a circle" both pointing to the UAV Coach guide',
  },
  {
    src: uavAhrefsImg,
    title: 'Ahrefs Overview',
    stat: '23 keywords · 1 SERP feature',
    alt: 'Ahrefs organic keywords overview for the guide showing 23 US keywords and one SERP feature with a rising traffic graph',
  },
];

export const UAV_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'This campaign demonstrated the power of building one exceptional, comprehensive resource instead of several average blog posts. Rather than chasing individual keywords, we built a guide that answered virtually every question a prospective commercial drone pilot might have about certification. Google rewarded that depth by ranking the page for dozens of related terms, awarding Featured Snippets, and driving consistent organic traffic.',
    'The campaign also reinforced that user experience and SEO work together. Clear navigation, logical structure, and genuinely helpful information helped both search engines and real people understand and trust the page.',
  ],
};

export const UAV_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    'Modern SEO isn’t about keyword stuffing or publishing endless short articles. This project succeeded because it aligned with how Google evaluates high-quality content: comprehensive coverage, clear search intent, topical authority, and genuinely helpful information.',
    'By combining strategic keyword research, structured content, Featured Snippet optimization, and continuous performance monitoring through our 5D Growth Framework, we transformed a single guide into a long-term organic growth engine, ranking for an entire topic instead of just one keyword.',
  ],
};

export const UAV_CTA = {
  title: 'Ready to Grow Your Organic Traffic?',
  body: 'Whether you’re in education, training, SaaS, or professional services, our 5D Growth Framework helps businesses increase search visibility, earn higher rankings, and generate sustainable organic traffic through strategic SEO.',
  button: 'Book Your Free SEO Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const UAV_INDEX_SUMMARY = UAV.meta.objective;
export const UAV_MODAL_CHALLENGES = UAV_CHALLENGE.problems;
/** Modal "what we did": the phase intros. */
export const UAV_MODAL_APPROACH = UAV_PHASES.map((p) => p.intro);
/** Index/modal results — numeric highlights first (row slices to 3). */
export const UAV_INDEX_RESULTS = [
  { value: '#1', label: 'Ranking for high-volume certification keywords' },
  { value: '34', label: 'Organic keywords ranking on page one' },
  { value: '19,400', label: 'Pageviews generated' },
  { value: '14,800', label: 'Visits generated through Google organic search' },
];
