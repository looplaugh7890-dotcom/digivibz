/**
 * Copy for the RoofClaim case study (`/case-study/roof-claim`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (❌ / ✔ /
 * 📊  🏆  📈  🚀) are rendered as brand icons in the UI instead of
 * emoji — the wording itself is untouched.
 *
 * Note: unlike earlier studies, this doc's "Snapshot" heading arrived WITH
 * four headline stats, so they render as a stat strip in the hero. The
 * "Results" heading between DEPLOY and DETECT arrived empty and is not
 * rendered (the measured results live in the Results section below).
 */

import type { LucideIcon } from 'lucide-react';
import {
  Award,
  BarChart3,
  CircleDollarSign,
  PhoneCall,
  Rocket,
  Star,
  TrendingUp,
} from 'lucide-react';

import roofclaimImg from '../assets/images/roofclaim.png';

export const ROOF_IMAGE = roofclaimImg;

export const ROOF = {
  eyebrow: 'RoofClaim · Case Study',
  /** Page h1 and index-card title. */
  title:
    'How We Helped a Roofing Company Replace Referrals With a Predictable, Multi-Channel Lead System',
  meta: {
    industry: 'Roofing Services',
    timeline: '6 Months',
    channels: [
      'Web Design & Development',
      'Local SEO',
      'Google Ads',
      'Google Business Profile (GMB)',
      'Online Reputation Management (ORM)',
      'Social Media Marketing',
      'Content Writing',
    ],
    objectiveLabel: 'Objective',
    objective:
      'Help a roofing company generate consistent, trackable leads across search, local, paid, and social channels instead of relying on referrals and door-to-door outreach.',
  },
} as const;

export interface RoofSnapshotStat {
  value: string;
  label: string;
  icon: LucideIcon;
}

/** The client doc's "Snapshot" block — four headline stats. */
export const ROOF_SNAPSHOT: RoofSnapshotStat[] = [
  { value: '142%', label: 'Increase in Organic Traffic', icon: BarChart3 },
  { value: '38', label: 'Qualified Leads per Month', icon: PhoneCall },
  { value: 'Top 3', label: 'Local Rankings for 12 Keywords', icon: Award },
  { value: '31%', label: 'Lower Cost Per Lead', icon: CircleDollarSign },
];

export const ROOF_CHALLENGE = {
  heading: 'The Challenge',
  intro:
    'This roofing company had experienced crews, quality workmanship, and loyal customers, but nothing digital to turn that reputation into new business. Almost every job came from referrals, which made growth unpredictable, some months fully booked, others quiet with no clear reason why.',
  problems: [
    'No visibility in Google Search or local map results',
    'No paid advertising strategy',
    'Outdated website that didn’t convert visitors',
    'Incomplete, poorly managed Google Business Profile',
    'No system for collecting or responding to reviews',
    'No consistent social presence',
    'No way to track which leads came from which source',
  ],
};

export const ROOF_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface RoofPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
}

export const ROOF_PHASES: RoofPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro:
      'We started by understanding how homeowners search when they need a roofer, often urgently, after storm damage or a sudden leak, with little patience to dig through options.',
    checks: [
      'Keyword research across emergency, replacement, and seasonal roofing searches',
      'Competitor audit across SEO, ads, and local map presence',
      'Google Business Profile and review audit',
      'Website performance and conversion review',
    ],
  },
  {
    number: '02',
    name: 'Design',
    intro:
      'With that research in place, we planned a system built around speed and trust, since roofing decisions often happen under pressure.',
    checks: [
      'Website structure organized around core services and urgency',
      'Local SEO and GMB architecture targeting the service area',
      'Reputation management workflow to build review volume',
      'Social content plan to reinforce credibility before the call',
    ],
  },
  {
    number: '03',
    name: 'Develop',
    intro: 'With the strategy locked in, we built every piece of the system so it could work together from day one.',
    checks: [
      'Responsive, fast-loading website with clear calls to action',
      'SEO-optimized content for each core roofing service',
      'Google Ads campaigns targeting emergency and seasonal searches',
      'Fully optimized Google Business Profile with updated categories and photos',
      'ORM workflow to request and respond to reviews',
      'Social media content calendar and templates',
      'Call and form tracking across every channel',
    ],
  },
  {
    number: '04',
    name: 'Deploy',
    intro:
      'Once built and tested, we launched everything together so homeowners found a consistent, trustworthy presence no matter how they discovered RoofClaim.',
    checks: [
      'New website live with SEO content across all service pages',
      'Google Ads campaigns launched, geo-targeted to the service area',
      'Optimized GMB profile published',
      'ORM system turned on to begin managing reviews',
      'Social media campaigns activated across platforms',
    ],
  },
  {
    number: '05',
    name: 'Detect',
    intro:
      'Launch was the starting point, not the finish line. We tracked performance weekly and shifted focus toward what was actually converting.',
    checks: [
      'Cost per lead and call quality tracked weekly',
      'Keyword rankings and GMB performance monitored',
      'Review volume and sentiment reviewed regularly',
      'Social engagement analyzed for content that resonated',
      'Budget reallocated toward top-performing keywords and channels',
    ],
  },
];

export const ROOF_RESULTS_HEADING = 'Results';

export interface RoofResult {
  text: string;
  icon: LucideIcon;
}

export const ROOF_RESULTS: RoofResult[] = [
  {
    text: '142% increase in organic website traffic within 6 months',
    icon: TrendingUp,
  },
  {
    text: '38 qualified leads generated every month',
    icon: PhoneCall,
  },
  {
    text: 'Top 3 local rankings for 12 high-value roofing keywords',
    icon: Award,
  },
  {
    text: '31% lower cost per lead after optimization',
    icon: CircleDollarSign,
  },
  {
    text: 'Stronger online reputation through active review management',
    icon: Star,
  },
  {
    text: '3X increase in booked roofing jobs',
    icon: Rocket,
  },
];

export const ROOF_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'RoofClaim went from depending entirely on referrals to running a connected system across search, local, paid, and social, where every channel reinforced the others instead of working in isolation.',
    'Before this project, a slow month had no clear explanation and no clear fix, since referrals depend on timing the business couldn’t control. Now, when organic search is quiet, paid ads pick up the slack. When a homeowner isn’t ready to call yet, social and reviews keep RoofClaim top of mind until they are. No single channel carries the business alone anymore.',
    'This mattered most during the unpredictable stretches roofing companies know well: the weeks between storms, the slow season, the months referrals just don’t come through. RoofClaim now has a system built to stay steady through all of it.',
  ],
};

export const ROOF_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    'Roofing decisions happen fast and under pressure, so visibility in just one place isn’t enough. By connecting SEO, ads, local search, reputation, and social through our 5D Growth Framework, we made sure RoofClaim showed up, and looked trustworthy, at every point a homeowner might be searching.',
    'A homeowner dealing with a leak doesn’t methodically compare five contractors, they call whoever looks credible and available right now. That’s why we didn’t rely on ranking well in search alone. Ads captured the urgent, ready-to-call searches. Local SEO and GMB made sure RoofClaim showed up on the map when it mattered. Reviews gave homeowners a reason to trust that first click. And social kept the brand visible even to people who weren’t searching yet but would be soon.',
  ],
};

export const ROOF_CTA = {
  title: 'Ready to Build a Lead System That Works Across Every Channel?',
  body: 'Whether you’re just starting your digital presence or looking to connect scattered efforts into one system, our 5D Growth Framework helps roofing companies generate qualified leads and grow with confidence.',
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const ROOF_INDEX_SUMMARY = ROOF.meta.objective;
export const ROOF_MODAL_CHALLENGES = ROOF_CHALLENGE.problems;
/** Modal "what we did": the phase intros. */
export const ROOF_MODAL_APPROACH = ROOF_PHASES.map((p) => p.intro);
/** Index/modal results — numeric highlights first (row slices to 3). */
export const ROOF_INDEX_RESULTS = [
  { value: '142%', label: 'Increase in organic website traffic within 6 months' },
  { value: '38', label: 'Qualified leads generated every month' },
  { value: 'Top 3', label: 'Local rankings for 12 high-value roofing keywords' },
  { value: '31%', label: 'Lower cost per lead after optimization' },
  { value: '3X', label: 'Increase in booked roofing jobs' },
];
