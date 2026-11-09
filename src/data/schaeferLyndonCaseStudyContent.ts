/**
 * Copy for the Schaefer Lyndon case study (`/case-study/schaefer-lyndon`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (❌ / ✔ /
 * 📈 🏆 📞 💰 📱) are rendered as brand icons in the UI instead of emoji —
 * the wording itself is untouched.
 *
 * Note: the client doc's "Snapshot", "SEO Performance" and "Creative & Social
 * Media" headings arrived with no content under them; they are not rendered
 * here (flagged to the client for follow-up images/copy).
 */

import type { LucideIcon } from 'lucide-react';
import {
  Award,
  CircleDollarSign,
  PhoneCall,
  Smartphone,
  TrendingUp,
} from 'lucide-react';

import schaeferLyndonImg from '../assets/images/schaefer_lyndon.jpg';

export const SCHAEFER_IMAGE = schaeferLyndonImg;

export const SCHAEFER = {
  eyebrow: 'Schaefer Lyndon · Case Study',
  /** Page h1 and index-card title. */
  title: 'Driving Digital Growth for a Local Self-Storage Provider',
  meta: {
    industry: 'Self-Storage',
    timeline: '6 Months',
    channels: [
      'Web Design & Development',
      'SEO',
      'Social Media Marketing',
      'Content Writing',
      'Graphic Design',
      'Email Marketing',
    ],
    objectiveLabel: 'Objective',
    objective:
      'Improve online visibility, drive qualified web traffic, and boost customer engagement across digital platforms for a local self-storage provider.',
  },
} as const;

export const SCHAEFER_OVERVIEW = {
  heading: 'Project Overview',
  paras: [
    'Schaefer Lyndon is a self-storage provider offering secure, convenient storage units across the Detroit area. Despite a solid local reputation, the business had limited online visibility and struggled to reach customers actively searching for storage solutions. Digivibz designed a multi-faceted strategy combining SEO, social media, website development, and content creation to expand their digital footprint and drive measurable growth.',
  ],
};

export const SCHAEFER_CHALLENGE = {
  heading: 'The Challenge',
  problems: [
    'Outdated website with poor navigation and slow load times',
    'Minimal local search visibility for storage-related keywords',
    'Inconsistent social media presence with low engagement',
    'No content strategy educating potential customers',
    'No email marketing system to nurture leads',
  ],
};

export const SCHAEFER_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface SchaeferPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
  /** The closing line the client copy places under each phase's checks. */
  note: string;
}

export const SCHAEFER_PHASES: SchaeferPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro:
      'Before touching the website or launching any ads, we studied how people in Detroit actually search for storage.',
    checks: [
      'Researched high-intent local keywords like "10x15 storage unit in Detroit" and "affordable self storage near me"',
      'Audited competitor storage facilities to see how they structured pricing pages and ran ads',
      "Reviewed the existing website's technical health, load speed, and mobile usability",
      'Analyzed customer search behavior around unit sizing, pricing, and contract terms',
      'Identified content gaps, especially around unit size guides and cost comparisons',
    ],
    note:
      'This research surfaced a clear opportunity: customers were actively searching by unit size and price, but Schaefer Lyndon’s website had no pages built to answer those specific questions.',
  },
  {
    number: '02',
    name: 'Design',
    intro:
      'With research complete, we planned a website and content structure built around how customers actually decide on a storage facility.',
    checks: [
      'Mapped a new site structure with dedicated pages for each unit size and storage type (personal, business, vehicle)',
      'Designed a local SEO architecture targeting neighborhood- and size-specific searches',
      'Planned a mobile-first layout, since most storage searches happen on the go',
      'Built a visual identity system to keep social posts, flyers, and email consistent',
      'Positioned trust elements, security features, access hours, pricing transparency, prominently on key pages',
    ],
    note:
      'Every page was designed around one question a renter would be asking: does this unit fit what I need, and what does it cost?',
  },
  {
    number: '03',
    name: 'Develop',
    intro: 'With the strategy locked in, we built out every piece of the system.',
    checks: [
      'Built a responsive, fast-loading website with clear CTAs on every service page',
      'Wrote SEO-optimized content for each unit-size and storage-type page',
      'Developed Google Ads campaigns targeting high-intent size and pricing searches',
      'Designed graphics for social posts, flyers, and email campaigns',
      'Set up call tracking and lead form tracking so every inquiry could be traced to its source',
      "Built out an email nurture sequence for leads who inquired but hadn't booked yet",
    ],
    note:
      'By the end of this phase, every touchpoint (website, ads, social, and email) was connected to a single tracking system.',
  },
  {
    number: '04',
    name: 'Deploy',
    intro: 'Once built and tested, we launched across every channel at once.',
    checks: [
      'Published the redesigned website with local SEO content live across all unit and location pages',
      'Activated Google Ads campaigns geo-targeted to Detroit and surrounding service areas',
      'Rolled out organic and paid social media across Facebook, Instagram, and LinkedIn',
      'Began sending email campaigns to nurture existing leads toward booking',
    ],
    note:
      "Campaigns were tightly geo-targeted so ad spend went only toward customers within a realistic drive of Schaefer Lyndon's facilities.",
  },
  {
    number: '05',
    name: 'Detect',
    intro: 'Launch was the starting point, not the finish line.',
    checks: [
      'Tracked keyword rankings weekly across all unit-size and location pages',
      'Monitored cost per lead and call quality from Google Ads',
      'Reviewed social media engagement and follower growth by platform',
      'Analyzed which blog and service pages were driving the most organic traffic',
      'Reallocated ad budget toward the highest-converting keywords and unit types',
    ],
    note:
      'Underperforming ads were paused or rewritten quickly, while budget shifted toward the searches and unit types generating the most qualified leads.',
  },
];

export const SCHAEFER_RESULTS_HEADING = 'Results';

export interface SchaeferResult {
  text: string;
  icon: LucideIcon;
}

export const SCHAEFER_RESULTS: SchaeferResult[] = [
  {
    text: 'Strong growth in impressions and traffic within 6 months',
    icon: TrendingUp,
  },
  {
    text: 'Top 5 rankings for 8+ high-value storage keywords',
    icon: Award,
  },
  {
    text: '65+ calls generated directly from ad campaigns',
    icon: PhoneCall,
  },
  {
    text: '$81 cost per lead, an efficient rate for the local storage market',
    icon: CircleDollarSign,
  },
  {
    text: 'Significant increase in social media followers and engagement',
    icon: Smartphone,
  },
];

export const SCHAEFER_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'Schaefer Lyndon moved from limited digital visibility to a fully connected system driving qualified traffic, leads, and brand recognition across search, social, and paid channels.',
    'Before this project, the business relied mostly on people already knowing where to find them. Anyone searching online for storage by size, price, or location had little chance of discovering Schaefer Lyndon over competitors with a stronger digital presence. Now, every unit type and location has its own optimized page, ads are reaching people actively searching with intent, and social channels keep the brand visible even outside active ad campaigns.',
    'This shift meant more than a traffic increase. It gave Schaefer Lyndon a system that keeps generating calls and leads consistently, rather than depending on seasonal spikes or one-off promotions to fill units.',
  ],
};

export const SCHAEFER_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    "By combining local SEO, targeted ads, consistent content and social media through our 5D Growth Framework, we built a system that kept Schaefer Lyndon visible at every stage of a customer's storage search from the first search for unit sizes and pricing, to comparing local options, to actually picking up the phone.",
    "No single channel did this alone. SEO brought in people already searching with intent. Ads captured high-urgency searches SEO hadn't reached yet. Social and email kept the brand top of mind for people who weren't ready to book right away. Together, these pieces created consistent visibility instead of relying on any one channel to carry the results.",
  ],
};

export const SCHAEFER_CTA = {
  title: 'Ready to Fill Your Storage Units with Qualified Leads?',
  body: 'Whether you manage one facility or several, our 5D Growth Framework helps self-storage businesses increase visibility, generate leads, and grow with confidence.',
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const SCHAEFER_INDEX_SUMMARY = SCHAEFER.meta.objective;
export const SCHAEFER_MODAL_CHALLENGES = SCHAEFER_CHALLENGE.problems;
/** Modal "what we did": the phase intros. */
export const SCHAEFER_MODAL_APPROACH = SCHAEFER_PHASES.map((p) => p.intro);
/** Index/modal results — numeric highlights first (row slices to 3). */
export const SCHAEFER_INDEX_RESULTS = [
  { value: '65+', label: 'Calls generated directly from ad campaigns' },
  { value: '$81', label: 'Cost per lead, an efficient rate for the local storage market' },
  { value: 'Top 5', label: 'Rankings for 8+ high-value storage keywords' },
  { value: '6 Months', label: 'Strong growth in impressions and traffic' },
  { value: 'Social', label: 'Significant increase in followers and engagement' },
];
