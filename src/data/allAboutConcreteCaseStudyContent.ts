/**
 * Copy for the All About Concrete case study (`/case-study/all-about-concrete`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (❌ / ✔ /
 * 📈 🏆 📝 🎯) are rendered as brand icons in the UI instead of emoji —
 * the wording itself is untouched.
 *
 * Note: the client doc's "Snapshot" and "SEO Performance" headings arrived
 * with no content under them; they are not rendered here (flagged to the
 * client for follow-up images/copy).
 */

import type { LucideIcon } from 'lucide-react';
import { Award, FileText, Target, TrendingUp } from 'lucide-react';

import allAboutConcreteImg from '../assets/images/all_about_concrete.png';

export const AAC_IMAGE = allAboutConcreteImg;

export const AAC = {
  eyebrow: 'All About Concrete · Case Study',
  /** Page h1 and index-card title. */
  title: 'Strengthening Digital Visibility for a Family-Owned Concrete Contractor',
  meta: {
    industry: 'Concrete Contracting (Commercial & Residential)',
    timeline: '6 Months',
    channels: ['Web Design & Development', 'SEO', 'Content Writing'],
    objectiveLabel: 'Objective',
    objective:
      'Modernize the online presence of a long-established concrete contractor and improve search visibility to reach a broader base of commercial and residential clients.',
  },
} as const;

export const AAC_OVERVIEW = {
  heading: 'Project Overview',
  paras: [
    'All About Concrete is a family-owned concrete contractor that has served commercial and residential clients across Indiana for decades, known for quality workmanship, safety, and reliability. Despite this reputation, their digital presence hadn’t kept pace with their growth. They partnered with Digivibz to modernize their website, strengthen search visibility, and build content that reflected their expertise and long-standing reputation.',
  ],
};

export const AAC_CHALLENGE = {
  heading: 'The Challenge',
  problems: [
    'Outdated website that didn’t reflect the quality of their actual work',
    'Weak search visibility for commercial and residential concrete searches',
    'No content explaining their range of services (decorative concrete, infrastructure work, etc.)',
    'Limited differentiation from newer competitors online despite decades of experience',
  ],
};

export const AAC_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface AacPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
  /** Closing line under the phase checks, where the client copy supplies one. */
  note?: string;
}

export const AAC_PHASES: AacPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro:
      'Before redesigning anything, we studied how commercial and residential clients search for concrete contractors in Indiana.',
    checks: [
      'Researched keywords across both commercial and residential concrete services',
      "Audited competitor contractors' websites and search rankings",
      "Reviewed the existing site's structure, load speed, and mobile experience",
      'Identified missing content around decorative concrete and infrastructure project types',
    ],
    note:
      'This surfaced a clear gap: decades of real project experience weren’t reflected anywhere in their online content or service pages.',
  },
  {
    number: '02',
    name: 'Design',
    intro:
      'We planned a website that presented All About Concrete’s full range of expertise clearly to two different audiences, commercial and residential clients.',
    checks: [
      'Modern, responsive layout structured around service type',
      'Dedicated pages for decorative concrete, infrastructure, and general contracting work',
      'Trust-building content highlighting their decades in business',
      'Local SEO architecture targeting Indiana service areas',
    ],
  },
  {
    number: '03',
    name: 'Develop',
    intro: 'With the strategy locked in, we moved into building every piece of the system.',
    checks: [
      'Built a fully responsive, modern website using a fast, mobile-optimized framework',
      'Wrote SEO-optimized service pages for each concrete specialty — decorative concrete, infrastructure work, commercial slabs, and residential driveways',
      'Developed clear, informative content explaining project processes, materials, and what clients could expect at each stage',
      'Implemented on-page SEO across every page, including meta tags, header structure, and internal linking between related services',
      'Integrated project galleries and service descriptions that highlighted decades of completed work',
      'Set up basic performance tracking to measure page-level engagement once live',
    ],
    note:
      'By the end of this phase, every service All About Concrete offered had a dedicated, search-optimized page instead of being buried in a single generic services list.',
  },
  {
    number: '04',
    name: 'Deploy',
    intro: 'Once development and testing were complete, we launched the full system.',
    checks: [
      'Published the redesigned website with all service and project pages live',
      'Rolled out SEO content simultaneously across commercial and residential service pages, so both audiences saw improvements at the same time',
      'Applied technical SEO improvements sitewide, including image optimization, schema markup, and improved page speed',
      'Ensured local business information was consistent and accurate across the site to support local search visibility',
    ],
    note:
      'Because commercial and residential clients search differently, we made sure both sets of pages went live together rather than prioritizing one audience over the other.',
  },
  {
    number: '05',
    name: 'Detect',
    intro: 'Launch marked the beginning of ongoing optimization, not the end of the project.',
    checks: [
      'Tracked keyword rankings weekly across commercial and residential search terms separately, since the two audiences behaved differently',
      'Monitored which service pages generated the most organic engagement and time on page',
      'Reviewed search console data to catch new ranking opportunities and underperforming pages',
      'Refined page content and internal linking based on which pages were gaining traction and which needed strengthening',
      'Adjusted messaging on lower-performing pages to better match actual search intent',
    ],
  },
];

export const AAC_RESULTS_HEADING = 'Results';

export interface AacResult {
  text: string;
  icon: LucideIcon;
}

export const AAC_RESULTS: AacResult[] = [
  {
    text: 'Strong growth in impressions and organic traffic within 6 months',
    icon: TrendingUp,
  },
  {
    text: 'Improved rankings across commercial and residential concrete search terms',
    icon: Award,
  },
  {
    text: 'Clear, service-specific content now representing decades of real expertise',
    icon: FileText,
  },
  {
    text: 'Solid average CTR, reflecting stronger-matching search intent',
    icon: Target,
  },
];

export const AAC_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'All About Concrete’s decades of reputation and craftsmanship finally had a digital presence to match, one that reflects their real expertise to both commercial and residential clients searching online.',
    'Before this project, none of that history showed up where it mattered most: in search results. Newer competitors with basic websites were outranking a contractor with far more real-world experience, simply because their online presence was stronger. Now, each service area, from decorative concrete to large-scale infrastructure work, has its own dedicated page built around how clients actually search and decide.',
    'This shift meant All About Concrete stopped competing on visibility alone and started competing on what actually set them apart: decades of completed projects, consistency, and trust built over time, now finally visible to the people searching for it.',
  ],
};

export const AAC_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    'A modern website paired with SEO and content built specifically around All About Concrete’s real services gave long-standing credibility a digital home, using our 5D Growth Framework to connect research, strategy, and execution into one system.',
    'Research uncovered exactly how commercial and residential clients search differently. Strategy shaped a site structure that spoke to both audiences instead of blending them into one generic pitch. And execution turned decades of hands-on experience into content and pages that could actually be found, rather than leaving that reputation to word-of-mouth alone.',
  ],
};

export const AAC_CTA = {
  title: 'Ready to Give Your Reputation the Digital Presence It Deserves?',
  body: 'Whether you’re a longtime contractor or a growing concrete business, our 5D Growth Framework helps you build search visibility and content that reflects the quality of your real work.',
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const AAC_INDEX_SUMMARY = AAC.meta.objective;
export const AAC_MODAL_CHALLENGES = AAC_CHALLENGE.problems;
/** Modal "what we did": the phase intros. */
export const AAC_MODAL_APPROACH = AAC_PHASES.map((p) => p.intro);
/** Index/modal results — row slices to 3. */
export const AAC_INDEX_RESULTS = [
  { value: '6 Months', label: 'Strong growth in impressions and organic traffic' },
  { value: 'Rankings', label: 'Improved across commercial and residential concrete searches' },
  { value: 'CTR', label: 'Solid average CTR from stronger-matching search intent' },
  { value: 'Content', label: 'Service-specific pages representing decades of expertise' },
];
