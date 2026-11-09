/**
 * Copy for the Revival Research case study (`/case-study/revival-research`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (❌ / ✔ /
 * 📈 🔎 📞 🏆 💰 📱) are rendered as brand icons in the UI instead of emoji —
 * the wording itself is untouched.
 */

import type { LucideIcon } from 'lucide-react';
import {
  Award,
  DollarSign,
  PhoneCall,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react';

import revivalResearchImg from '../assets/images/revival_research.png';

export const REVIVAL_IMAGE = revivalResearchImg;

export const REVIVAL = {
  eyebrow: 'Revival Research · Case Study',
  /** `How We Helped…` line — the page h1 and the index-card title. */
  title:
    'How We Helped a Clinical Research Organization Scale Patient Recruitment Through Digital Growth',
  meta: {
    industry: 'Clinical Research / Healthcare',
    timeline: '8 Months',
    channels: ['SEO', 'Google Ads', 'Web Development', 'Content Writing', 'Social Media'],
    objectiveLabel: 'Objective',
    objective:
      'Help a clinical research organization improve its digital presence, rank for trial-specific keywords, and generate consistent patient sign-ups across multiple study locations.',
  },
} as const;

export const REVIVAL_CHALLENGE = {
  heading: 'The Challenge',
  intro: [
    'Revival Research runs multiple active clinical trials across several states, connecting patients with treatment opportunities for conditions ranging from dermatological disorders to chronic illness. Despite strong clinical credibility, their digital presence didn’t reflect it.',
    'Their outdated website made it hard for patients to find relevant trials, their content wasn’t structured around how people actually search for medical studies, and they had no paid strategy to drive recruitment for time-sensitive trials.',
  ],
  problems: [
    'Website not optimized for patient navigation or mobile use',
    'No keyword strategy around specific conditions or trial locations',
    'No PPC campaigns to support urgent recruitment timelines',
    'Inconsistent content, with no clear authority in search results',
    'No tracking system to measure patient sign-ups by channel',
    'Minimal social media presence despite an engaged patient community',
  ],
  closing:
    'Each new trial launch meant scrambling for visibility instead of drawing from an existing, reliable pipeline of interested patients.',
};

export const REVIVAL_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface RevivalPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
  note: string;
}

export const REVIVAL_PHASES: RevivalPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro: 'We began by studying the clinical research space specifically, not general healthcare marketing.',
    checks: [
      'Researched condition-specific and location-specific search behavior (e.g., "psoriasis clinical trials in [state]")',
      'Audited competitor CROs and how they structured trial recruitment pages',
      "Reviewed the existing website's technical SEO health and page speed",
      'Identified gaps in content covering trial eligibility, compensation, and process',
    ],
    note:
      "This revealed a major opportunity: patients were actively searching for trials by condition and location, but Revival's site had no pages built to capture that intent.",
  },
  {
    number: '02',
    name: 'Design',
    intro: 'We planned a site structure built around patient trust and clarity, since medical decisions require both.',
    checks: [
      'Individual landing pages for each active trial and condition',
      'Clear eligibility criteria and compensation details up front',
      'Simple, accessible design compliant with healthcare marketing standards',
      'Mobile-first layout for patients searching on the go',
      'Trust elements: physician credentials, patient testimonials, accreditation badges',
    ],
    note: "Every page was designed to answer a patient's first question: do I qualify, and what happens next?",
  },
  {
    number: '03',
    name: 'Develop',
    intro: 'With the strategy set, we built out the full system.',
    checks: [
      'Rebuilt the website on a fast, responsive platform',
      'Wrote condition-specific content optimized for search and readability',
      'Built PPC campaigns segmented by condition and location',
      'Set up conversion tracking for every sign-up form',
      'Developed social content calendars for organic and paid posts',
      'Created graphics and infographics explaining trial participation in plain language',
    ],
    note:
      'Every asset connected back to a single tracking system so we could see exactly which channel brought in which patient inquiry.',
  },
  {
    number: '04',
    name: 'Deploy',
    intro: 'Once built and tested, we launched across channels.',
    checks: [
      'Google Ads campaigns targeting condition and location-specific searches',
      'Meta Ads for broader awareness and retargeting',
      'Organic content published consistently across the blog and social channels',
      'Local and national SEO pushed live simultaneously across all trial pages',
    ],
    note:
      'Campaigns were structured so each trial location had its own targeted push, avoiding wasted spend on patients outside eligible areas.',
  },
  {
    number: '05',
    name: 'Detect',
    intro: 'We treated launch as the starting point, not the finish line.',
    checks: [
      'Weekly review of cost per patient sign-up by campaign',
      'Keyword ranking tracking across all condition pages',
      'Landing page conversion rate analysis',
      'Search term reports to catch new high-intent queries',
      'Budget reallocation toward top-performing trials and locations',
    ],
    note:
      'Underperforming ad sets were paused quickly, and budget shifted toward the trials generating the most qualified sign-ups.',
  },
];

export const REVIVAL_RESULTS_HEADING = 'Results';

export interface RevivalResult {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const REVIVAL_RESULTS: RevivalResult[] = [
  {
    value: '312%',
    label: 'Increase in organic website traffic within 8 months',
    icon: TrendingUp,
  },
  {
    value: '9,800',
    label: 'Organic keywords ranked, up from under 700',
    icon: Search,
  },
  {
    value: '2,150',
    label: 'Patient sign-ups generated through paid and organic channels combined',
    icon: PhoneCall,
  },
  {
    value: 'Top 3',
    label: 'Rankings for 40+ condition-and-location keyword combinations',
    icon: Award,
  },
  {
    value: '27%',
    label: 'Lower cost per patient sign-up after campaign optimization',
    icon: DollarSign,
  },
  {
    value: '185%',
    label: 'Growth in social media engagement across platforms',
    icon: Users,
  },
];

export const REVIVAL_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'The biggest shift wasn’t just more traffic to the website, it was a complete recruitment system that connected patients to the right trial, in the right location, at the right time.',
    'Before this project, every trial launch meant starting from scratch, with no existing audience and no reliable way to track where sign-ups came from. Now, Revival Research has moved from reactive, trial-by-trial scrambling to a predictable digital pipeline that supports every new study launch, with condition-specific content and location-targeted campaigns already in place before a trial even opens.',
  ],
};

export const REVIVAL_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    'Healthcare and clinical research marketing requires precision, compliance, and trust, not just traffic. Patients researching a trial are making a real decision about their health, so every page and campaign had to earn that trust rather than just attract clicks.',
    'By connecting research, design, development, and continuous optimization through our 5D Growth Framework, we built a system tailored to how patients actually search for and choose clinical trials, matching real search intent with clear answers, then continuously refining what worked based on real results.',
  ],
};

export const REVIVAL_CTA = {
  title: 'Ready to Build a Digital System That Connects Patients to Real Care?',
  body: "Whether you're running one clinical trial or managing recruitment across multiple locations, our 5D Growth Framework helps healthcare and research organizations generate qualified leads, build trust, and grow with confidence.",
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const REVIVAL_INDEX_SUMMARY = REVIVAL.meta.objective;
export const REVIVAL_MODAL_CHALLENGES = REVIVAL_CHALLENGE.problems;
export const REVIVAL_MODAL_APPROACH = REVIVAL_PHASES.map((p) => p.intro);
export const REVIVAL_INDEX_RESULTS = REVIVAL_RESULTS.map((r) => ({ value: r.value, label: r.label }));
