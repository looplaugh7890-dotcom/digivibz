/**
 * Copy for the Lung-N-Sleep case study (`/case-study/lung-n-sleep`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (❌ / ✔ /
 * 📊  🎯 🏆 📈 📝 📍 ⭐) are rendered as brand icons in the UI instead of
 * emoji — the wording itself is untouched.
 *
 * Note: the client doc's "Snapshot" heading arrived WITH four headline stats,
 * so they render as a vitals-monitor strip in the hero. The blank line under
 * "Results" carries no extra copy beyond the measured list below it.
 */

import type { LucideIcon } from 'lucide-react';
import {
  Award,
  BarChart3,
  FileText,
  MapPin,
  Star,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

import lungNSleepImg from '../assets/images/lung_n_sleep.png';

export const LNS_IMAGE = lungNSleepImg;

export const LNS = {
  eyebrow: 'Lung-N-Sleep · Case Study',
  /** Page h1 and index-card title. */
  title:
    'Building a Complete Digital Presence for a Multi-Specialty Pulmonology & Sleep Clinic',
  meta: {
    industry: 'Pulmonology & Sleep Medicine',
    timeline: '6 Months',
    channels: [
      'Web Design & Development',
      'SEO',
      'Content Writing',
      'Creative Design',
      'Google Business Profile (GMB)',
      'Online Reputation Management (ORM)',
      'Google Ads',
    ],
    objectiveLabel: 'Objective',
    objective:
      'Build a complete digital identity for a board-certified pulmonology and sleep disorder clinic, helping local patients discover, trust, and choose the practice online.',
  },
} as const;

export interface LnsSnapshotStat {
  value: string;
  label: string;
  icon: LucideIcon;
}

/** The client doc's "Snapshot" block — four headline stats. */
export const LNS_SNAPSHOT: LnsSnapshotStat[] = [
  { value: '1.2M', label: 'Annual Website Impressions', icon: BarChart3 },
  { value: '45K', label: 'Annual Website Traffic', icon: Users },
  { value: '4.6%', label: 'Average CTR', icon: Target },
  { value: '2.4', label: 'Average Keyword Position', icon: Award },
];

export const LNS_OVERVIEW = {
  heading: 'Project Overview',
  paras: [
    'Lung-N-Sleep Disorder Center is a multi-specialty clinic treating chronic lung and sleep disorders, led by a triple board-certified physician. The clinic had strong clinical credibility but relied almost entirely on its physical location and referrals to bring in patients, with no digital presence built to support that reputation.',
    'Digivibz built an intuitive, trust-focused website and connected it to local search, paid ads, reputation management, and content, so patients searching for lung and sleep care in their area could find, trust, and choose Lung-N-Sleep at every stage of that search.',
  ],
};

export const LNS_CHALLENGE = {
  heading: 'The Challenge',
  intro:
    'A patient dealing with breathing issues or sleep disruptions rarely knows which type of specialist they need, they just know something is wrong and start searching. Lung-N-Sleep wasn’t showing up in any of those searches, and every day without a digital presence meant losing patients to clinics that were easier to find, both in organic search and on the map.',
  problems: [
    'No website patients could use to learn about conditions or the clinic',
    'Zero visibility for local searches related to lung and sleep specialists',
    'No content explaining complex conditions in patient-friendly language',
    'No consistent visual identity across digital touchpoints',
    'Incomplete Google Business Profile, so the clinic barely appeared in local map results',
    'No system for managing patient reviews, leaving reputation to chance',
    'No paid presence to capture patients searching with urgent, immediate need',
    'Reliance on referrals alone, with no way to reach patients searching independently',
  ],
};

export const LNS_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface LnsPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
}

export const LNS_PHASES: LnsPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro:
      'We began by understanding how patients actually search when dealing with lung and sleep symptoms. Most don’t type a specialist’s name first, they search the symptom itself, often in confusing medical terms they found somewhere else, before they even know what kind of doctor they need or where to find one nearby.',
    checks: [
      'Keyword research across specific conditions and symptoms',
      'Competitor audit of local pulmonology and sleep clinics',
      'Patient search behavior, from symptoms to direct specialist searches',
      'Google Business Profile audit, revealing missing categories and photos',
      'Review and reputation gaps compared to local competitors',
      'Content gaps around complex conditions patients were searching to understand',
    ],
  },
  {
    number: '02',
    name: 'Design',
    intro:
      'With that research in place, we planned a system built around clarity and local visibility. Patients searching while anxious or confused don’t want to dig through pages of content or scroll past unclear map listings, they want clear answers and an obvious next step, so every design decision prioritized that.',
    checks: [
      'Clean website navigation structured around conditions and services',
      'Local SEO and GMB structure to strengthen map visibility',
      'Reputation management workflow to build review volume and trust',
      'Google Ads structure targeting urgent, high-intent local searches',
      'Visual identity system for consistent branding across every channel',
    ],
  },
  {
    number: '03',
    name: 'Develop',
    intro:
      'With the strategy locked in, we moved into building every piece of the system. This wasn’t just about launching a website, it was about giving Lung-N-Sleep a complete local presence that could rank well, appear on the map, build trust through reviews, and still make sense to a patient who’s anxious and searching for answers.',
    checks: [
      'Responsive website across mobile, tablet, and desktop',
      'Patient-friendly content on lung and sleep conditions',
      'On-page and technical SEO, including meta tags and headers',
      'Fully optimized Google Business Profile with updated categories and photos',
      'ORM workflow to request and respond to patient reviews',
      'Google Ads campaigns targeting urgent, symptom-based searches',
      'Creative assets for a consistent visual identity',
    ],
  },
  {
    number: '04',
    name: 'Deploy',
    intro:
      'Once everything was built and tested, we launched it all together rather than rolling pieces out over time. For a healthcare practice, a half-finished digital presence can undermine trust just as much as no presence at all, so patients needed to land on a complete, credible experience from their very first visit or search.',
    checks: [
      'New website live with all condition and service pages',
      'SEO content activated sitewide, on-page and off-page',
      'Optimized Google Business Profile published',
      'ORM system turned on to begin managing reviews',
      'Google Ads campaigns launched, geo-targeted to the clinic’s service area',
      'Creative assets rolled out across digital touchpoints',
    ],
  },
  {
    number: '05',
    name: 'Detect',
    intro:
      'Launch was the starting point, not the finish line. Medical search behavior shifts constantly as new symptoms, conditions, and questions trend, so we kept a close eye on what was actually working across every channel and adjusted based on real patient behavior rather than guesswork.',
    checks: [
      'Keyword rankings tracked across conditions and symptoms',
      'GMB performance and review sentiment monitored',
      'Google Ads performance reviewed for cost per lead and call quality',
      'Content performance reviewed for patient engagement',
      'Local search visibility monitored over time',
      'Strategy refined based on what gained traction across channels',
    ],
  },
];

export const LNS_RESULTS_HEADING = 'Results';

export interface LnsResult {
  text: string;
  icon: LucideIcon;
}

export const LNS_RESULTS: LnsResult[] = [
  {
    text: 'Strong growth in impressions and organic traffic within 6 months',
    icon: TrendingUp,
  },
  {
    text: 'Top 2 rankings across highly specific medical search terms',
    icon: Award,
  },
  {
    text: 'Multiple blog posts featured in Google’s AI Overview',
    icon: FileText,
  },
  {
    text: 'Stronger local visibility through GMB optimization',
    icon: MapPin,
  },
  {
    text: 'Improved online reputation through active review management',
    icon: Star,
  },
  {
    text: 'Solid average CTR, reflecting strong-matching search intent',
    icon: Target,
  },
];

export const LNS_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'Lung-N-Sleep went from relying entirely on referrals to becoming a visible, trusted source of information and care for patients searching complex lung and sleep symptoms, showing up in organic search, local map results, paid ads, and reviews, not just one channel.',
  ],
};

export const LNS_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    'Patients searching for answers about confusing medical symptoms need clarity and credibility everywhere they look, not visibility in just one place. By connecting SEO, content, design, local search, reputation, and paid ads through our 5D Growth Framework, we built a digital presence that met patients at every stage of their search and gave them reasons to trust Lung-N-Sleep with their care.',
  ],
};

export const LNS_CTA = {
  title: 'Ready to Be Found by the Patients Searching for You?',
  body: 'Whether you’re a specialty clinic or a multi-physician practice, our 5D Growth Framework connects every channel patients use, search, local, reviews, and ads, into one system built to earn their trust.',
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const LNS_INDEX_SUMMARY = LNS.meta.objective;
export const LNS_MODAL_CHALLENGES = LNS_CHALLENGE.problems;
/** Modal "what we did": the phase intros. */
export const LNS_MODAL_APPROACH = LNS_PHASES.map((p) => p.intro);
/** Index/modal results — numeric highlights first (row slices to 3). */
export const LNS_INDEX_RESULTS = [
  { value: '1.2M', label: 'Annual website impressions' },
  { value: '45K', label: 'Annual website traffic' },
  { value: '4.6%', label: 'Average CTR across search results' },
  { value: '2.4', label: 'Average keyword position' },
  { value: 'Top 2', label: 'Rankings across highly specific medical search terms' },
];
