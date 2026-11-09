/**
 * Copy for the Plumbex case study (`/case-study/plumbex`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (❌ / ✔ /
 * 📊  🏆  📈 ) are rendered as brand icons in the UI instead of emoji —
 * the wording itself is untouched.
 *
 * Note: the client doc's "Snapshot" heading arrived WITH four headline stats,
 * so they render as a gauge panel in the hero. The "35% lower cost per lead"
 * bullet arrived after the CTA in the source doc; it belongs to the measured
 * results and is rendered as the final Results row. The doc carries no
 * "Project Overview" section, so the page opens with The Challenge.
 */

import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  PhoneCall,
  PiggyBank,
  Star,
  TrendingUp,
  Trophy,
} from 'lucide-react';

import plumbexImg from '../assets/images/plumbex.png';

export const PLX_IMAGE = plumbexImg;

export const PLX = {
  eyebrow: 'Plumbex · Case Study',
  /** Page h1 and index-card title. */
  title:
    'How We Helped a Plumbing Company Turn Emergency Searches Into Booked Jobs',
  meta: {
    industry: 'Plumbing Services',
    timeline: '6 Months',
    channels: [
      'Web Design & Development',
      'Local SEO',
      'Google Ads',
      'Google Business Profile (GMB)',
      'Online Reputation Management (ORM)',
      'Content Writing',
    ],
    objectiveLabel: 'Objective',
    objective:
      'Help a plumbing company capture high-intent, urgent searches and convert them into booked jobs, while building the local trust homeowners need before calling a plumber.',
  },
} as const;

export interface PlxSnapshotStat {
  value: string;
  label: string;
  icon: LucideIcon;
  /** Decorative gauge fill (0–1) for the snapshot dial. */
  gauge: number;
}

/** The client doc's "Snapshot" block — four headline stats. */
export const PLX_SNAPSHOT: PlxSnapshotStat[] = [
  { value: '165%', label: 'Increase in Organic Traffic', icon: BarChart3, gauge: 0.82 },
  { value: '52', label: 'Qualified Leads per Month', icon: PhoneCall, gauge: 0.66 },
  { value: 'Top 3', label: 'Rankings for 15 Local Keywords', icon: Trophy, gauge: 0.9 },
  { value: '35%', label: 'Lower Cost Per Lead', icon: PiggyBank, gauge: 0.72 },
];

export const PLX_CHALLENGE = {
  heading: 'The Challenge',
  intro:
    'Plumbing emergencies don’t wait, and neither do the homeowners searching for help. Plumbex had reliable technicians and years of service history, but almost none of that showed up when someone searched "plumber near me" at 11pm with a burst pipe.',
  problems: [
    'No local SEO visibility for emergency or high-intent searches',
    'No paid advertising strategy to capture urgent, ready-to-call searches',
    'Outdated website with no clear pricing or service information',
    'Incomplete Google Business Profile missing key service categories',
    'No system for collecting or responding to reviews',
    'No content answering common plumbing questions before they called',
  ],
};

export const PLX_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface PlxPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
}

export const PLX_PHASES: PlxPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro:
      'We started by understanding exactly how homeowners search in a plumbing emergency, since that moment looks nothing like a typical purchase decision.',
    checks: [
      'Keyword research across emergency, repair, and installation searches',
      'Competitor audit across local SEO, ads, and reviews',
      'Google Business Profile audit for missing categories and service areas',
      'Review of pricing transparency and trust signals on the existing site',
    ],
  },
  {
    number: '02',
    name: 'Design',
    intro:
      'With that research done, we planned a system built around speed and trust, since a homeowner mid-emergency won’t wait around for a slow, confusing website.',
    checks: [
      'Website structure built around clear pricing and fast contact options',
      'Local SEO and GMB architecture targeting emergency and service-area searches',
      'Reputation management workflow to build review volume quickly',
      'Content plan answering common plumbing questions before the call',
    ],
  },
  {
    number: '03',
    name: 'Develop',
    intro:
      'With the strategy locked in, we built every piece of the system so it worked together from day one.',
    checks: [
      'Fast-loading, mobile-first website with clear calls to action',
      'SEO-optimized content for emergency, repair, and installation services',
      'Google Ads campaigns targeting high-urgency, ready-to-call searches',
      'Fully optimized Google Business Profile across all service areas',
      'ORM workflow to request and respond to reviews',
      'Call and form tracking across every channel',
    ],
  },
  {
    number: '04',
    name: 'Deploy',
    intro:
      'Once built and tested, we launched everything together so Plumbex showed up consistently, whether someone searched, clicked an ad, or checked reviews first.',
    checks: [
      'New website live with SEO content across all service pages',
      'Google Ads campaigns launched, geo-targeted to the service area',
      'Optimized GMB profile published across service zones',
      'ORM system turned on to begin managing reviews',
    ],
  },
  {
    number: '05',
    name: 'Detect',
    intro:
      'Launch was the starting point, not the finish line. We tracked performance weekly and shifted focus toward what was actually converting into booked jobs.',
    checks: [
      'Cost per lead and call quality tracked weekly',
      'Keyword rankings and GMB performance monitored',
      'Review volume and sentiment reviewed regularly',
      'Budget reallocated toward top-performing keywords and service areas',
    ],
  },
];

export const PLX_RESULTS_HEADING = 'Results';

export interface PlxResult {
  text: string;
  icon: LucideIcon;
}

export const PLX_RESULTS: PlxResult[] = [
  {
    text: '165% increase in organic website traffic within 6 months',
    icon: TrendingUp,
  },
  {
    text: '52 qualified leads generated every month',
    icon: PhoneCall,
  },
  {
    text: 'Top 3 rankings for 15 high-value local keywords',
    icon: Trophy,
  },
  {
    text: 'Stronger online reputation through active review management',
    icon: Star,
  },
  {
    text: '35% lower cost per lead after optimization',
    icon: PiggyBank,
  },
];

export const PLX_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'Plumbex went from being invisible during the exact moments homeowners needed a plumber most, to showing up consistently across search, local, paid, and reviews. Emergency searches now reliably turn into booked jobs instead of calls to a competitor who simply showed up first.',
    'Before this project, a burst pipe at midnight meant Plumbex was competing against whoever happened to rank higher or run an ad, with no say in the outcome. Now, whether someone searches organically, clicks a paid ad, or checks reviews first, Plumbex shows up as the trustworthy, available option at every one of those touchpoints.',
  ],
};

export const PLX_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    'Plumbing decisions happen under real pressure, often at inconvenient hours, so visibility in just one channel isn’t enough. By connecting SEO, paid ads, local search, and reputation through our 5D Growth Framework, we made sure Plumbex was the trustworthy, available option the moment someone searched, not just eventually.',
    'A homeowner with a flooding bathroom doesn’t have time to compare five plumbers, they call whoever looks credible and reachable right now. Paid ads captured real-time searches, local SEO and GMB kept Plumbex visible on the map, and steady review management gave homeowners the confidence to trust that first click.',
  ],
};

export const PLX_CTA = {
  title: 'Ready to Capture Every Emergency Call Before Your Competitors Do?',
  body: 'Whether you’re a solo operation or a multi-truck team, our 5D Growth Framework helps plumbing companies show up, look trustworthy, and convert urgent searches into booked jobs.',
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const PLX_INDEX_SUMMARY = PLX.meta.objective;
export const PLX_MODAL_CHALLENGES = PLX_CHALLENGE.problems;
/** Modal "what we did": the phase intros. */
export const PLX_MODAL_APPROACH = PLX_PHASES.map((p) => p.intro);
/** Index/modal results — numeric highlights first (row slices to 3). */
export const PLX_INDEX_RESULTS = [
  { value: '165%', label: 'Increase in organic traffic' },
  { value: '52', label: 'Qualified leads per month' },
  { value: 'Top 3', label: 'Rankings for 15 local keywords' },
  { value: '35%', label: 'Lower cost per lead' },
];
