/**
 * Copy for the KeyGuard Locksmith case study (`/case-study/keyguard-locksmith`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (❌ / ✔ /
 * 📞  🎯  🔍) are rendered as brand icons in the UI instead of emoji —
 * the wording itself is untouched.
 *
 * Note: the client doc's "Snapshot" heading arrived WITH four headline stats
 * AND a matching snapshot graphic (the first supplied image), so that graphic
 * renders as the hero snapshot board and the four stats power the index card
 * results. The doc's "Results" section carries five highlight bullets (rendered
 * as a dispatch log) plus three supplied screenshots — the calls/cost trend
 * chart, the keyword-type table and the Google Ads dashboard — which render
 * as an evidence board (KG_RESULTS_SHOTS).
 */

import type { LucideIcon } from 'lucide-react';
import {
  CalendarCheck,
  CircleDollarSign,
  MousePointerClick,
  Phone,
  Search,
} from 'lucide-react';

import keyguardSnapshotImg from '../assets/images/keyguard_snapshot.png';
import keyguardTrendImg from '../assets/images/keyguard_trend.png';
import keyguardKeywordsImg from '../assets/images/keyguard_keywords.png';
import keyguardDashboardImg from '../assets/images/keyguard_dashboard.png';

/** Hero snapshot board visual: the client's own campaign snapshot. */
export const KG_IMAGE = keyguardSnapshotImg;

export const KG = {
  eyebrow: 'KeyGuard Locksmith · Case Study',
  /** Page h1 and index-card title. */
  title: 'Turning Emergency Searches Into Booked Locksmith Jobs Through Google Ads',
  meta: {
    industry: 'Locksmith Services',
    timeline: '6 Months',
    channels: ['Google Ads'],
    objectiveLabel: 'Objective',
    objective:
      'Capture high-intent, emergency locksmith searches through Google Ads and convert them into booked jobs at an efficient cost per lead.',
  },
} as const;

export const KG_OVERVIEW = {
  heading: 'Project Overview',
  paras: [
    'KeyGuard Locksmith offers 24/7 residential, commercial, and automotive locksmith services. Their business depended almost entirely on being found the moment someone locked themselves out or needed emergency entry, but they had no paid search presence, meaning every one of those urgent searches went to a competitor already running ads.',
    'Digivibz built and managed a Google Ads system designed specifically around how locksmith searches actually happen, urgent, immediate, and rarely researched in advance.',
  ],
};

export const KG_CHALLENGE = {
  heading: 'The Challenge',
  intro:
    'A locksmith search is almost always urgent. Someone locked out of their car or home doesn’t compare five companies, they call whoever shows up first and looks trustworthy. KeyGuard wasn’t in that conversation at all.',
  problems: [
    'No Google Ads presence despite highly searchable, urgent demand',
    'Competitors dominating the top ad positions for emergency searches',
    'No call tracking to know which searches were actually converting',
    'Website not built to convert an anxious, time-pressured visitor quickly',
    'No way to measure cost per lead or return on ad spend',
  ],
};

export const KG_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface KgPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
}

export const KG_PHASES: KgPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro:
      'We began by understanding exactly how people search in a locksmith emergency, since that search behavior looks nothing like a planned purchase.',
    checks: [
      'Keyword research across emergency, residential, commercial, and automotive locksmith searches',
      'Competitor ad audit to see who was winning top positions and how',
      'Review of call volume patterns and peak search times',
      'Assessment of the existing website’s speed and mobile conversion path',
    ],
  },
  {
    number: '02',
    name: 'Design',
    intro:
      'With that research done, we planned a campaign structure built for speed, since a locksmith ad that takes too long to load or explain has already lost the click.',
    checks: [
      'Campaign structure segmented by service type and urgency level',
      'Ad copy built around immediacy: response time, availability, and trust',
      'Landing pages designed to load fast and convert with minimal scrolling',
      'Call tracking plan to measure real lead quality, not just clicks',
    ],
  },
  {
    number: '03',
    name: 'Develop',
    intro: 'With the strategy locked in, we built out the full campaign system.',
    checks: [
      'Google Ads campaigns targeting emergency, residential, commercial, and auto locksmith terms',
      'Ad copy variations tested for response-time and trust-based messaging',
      'Mobile-optimized landing pages with a prominent click-to-call button',
      'Call tracking and conversion tracking set up across every ad group',
      'Negative keyword list built to filter out DIY and unrelated searches',
    ],
  },
  {
    number: '04',
    name: 'Deploy',
    intro: 'Once built and tested, we launched campaigns geo-targeted to KeyGuard’s actual service area.',
    checks: [
      'Campaigns launched across all service categories',
      'Call tracking activated to attribute every lead to its source',
      'Landing pages published and connected to matching ad groups',
      'Budget allocated toward the highest-intent, highest-urgency keywords first',
    ],
  },
  {
    number: '05',
    name: 'Detect',
    intro:
      'Launch was the starting point, not the finish line. We monitored performance closely, since locksmith ad performance can shift quickly based on time of day and local competition.',
    checks: [
      'Cost per lead and call quality tracked weekly',
      'Keyword performance reviewed to identify top and underperforming terms',
      'Ad copy refined based on which messaging drove the most calls',
      'Budget reallocated toward the times and keywords generating real bookings, not just clicks',
    ],
  },
];

export const KG_RESULTS_HEADING = 'Results';

export interface KgResultLine {
  text: string;
  icon: LucideIcon;
}

/** The client doc's "Results" bullets — rendered as a dispatch log. */
export const KG_RESULTS: KgResultLine[] = [
  { text: '68 calls generated per month, up from a near-zero starting point', icon: Phone },
  { text: '$24 average cost per lead, an efficient rate for the locksmith industry', icon: CircleDollarSign },
  { text: '4,900 clicks across all campaigns over 6 months', icon: MousePointerClick },
  { text: '312 booked jobs directly attributed to Google Ads', icon: CalendarCheck },
  { text: 'Clear visibility into which keywords and times of day drove real bookings', icon: Search },
];

export interface KgResultShot {
  src: string;
  title: string;
  stat: string;
  alt: string;
}

/** The three performance screenshots supplied with the brief. */
export const KG_RESULTS_SHOTS: KgResultShot[] = [
  {
    src: keyguardTrendImg,
    title: 'Calls vs Cost Per Lead',
    stat: '22 → 68 calls · $42 → $24',
    alt: 'Dual-axis line chart showing calls per month rising from 22 to 68 while cost per lead falls from $42 to $24 across months one to six',
  },
  {
    src: keyguardKeywordsImg,
    title: 'Keyword Type Performance',
    stat: '4 service categories',
    alt: 'Table of locksmith keyword types: emergency locksmith near me with the highest volume and strongest conversion, car key replacement with strong volume and moderate cost per lead, residential lock change with steady lower-cost conversions, and commercial locksmith services with lower volume higher-value jobs',
  },
  {
    src: keyguardDashboardImg,
    title: 'Google Ads Dashboard',
    stat: '4,900 clicks · 312 booked jobs',
    alt: 'KeyGuard Locksmith Google Ads dashboard for the last six months showing 4,900 total clicks, 68 calls per month, $24 cost per lead and 312 booked jobs, with calls and cost charts, a clicks-by-service-category donut and a conversion funnel',
  },
];

export const KG_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'KeyGuard went from being invisible during the exact moments people needed a locksmith most, to consistently capturing those urgent searches and converting them into real, trackable bookings.',
    'Before this campaign, every emergency search was a coin flip, whichever competitor happened to rank or advertise better got the call. Now, KeyGuard shows up reliably for the searches that matter most, with a system that keeps improving as more data comes in.',
  ],
};

export const KG_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    'Locksmith searches happen under pressure, so speed and trust matter more than almost anything else. By building campaigns, landing pages, and tracking specifically around how people search in these urgent moments through our 5D Growth Framework, we made sure KeyGuard was the fast, trustworthy option the instant someone needed one.',
  ],
};

export const KG_CTA = {
  title: 'Ready to Get More Leads Without Guessing at Your Ad Spend?',
  body: 'Whether you’re a solo locksmith or managing a team across multiple service areas, our 5D Growth Framework helps you turn urgent, high-intent searches into booked jobs.',
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const KG_INDEX_SUMMARY = KG.meta.objective;
export const KG_MODAL_CHALLENGES = KG_CHALLENGE.problems;
/** Modal "what we did": the phase intros. */
export const KG_MODAL_APPROACH = KG_PHASES.map((p) => p.intro);
/** Index/modal results — the four snapshot stats (row slices to 3). */
export const KG_INDEX_RESULTS = [
  { value: '68', label: 'Calls generated per month' },
  { value: '$24', label: 'Average cost per lead' },
  { value: '4,900', label: 'Clicks over 6 months' },
  { value: '312', label: 'Total booked jobs from ads' },
];
