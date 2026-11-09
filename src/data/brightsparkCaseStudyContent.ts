/**
 * Copy for the BrightSpark Electrical case study (`/case-study/brightspark-electrical`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (✔ / ❌ /
 * 📊  👀  📞 📈) are rendered as brand icons in the UI instead of emoji —
 * the wording itself is untouched.
 *
 * Note: the client doc's "Snapshot" heading arrived WITH four headline stats,
 * so they render as an insights strip in the hero. The doc's "Results" section
 * carries no text — the four Google Business Profile screenshots supplied with
 * the brief ARE the results, so they render as an evidence board
 * (BSP_RESULTS_SHOTS). There is no client brand visual; the listing
 * screenshot doubles as the index-card image.
 */

import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  Eye,
  PhoneCall,
  TrendingUp,
} from 'lucide-react';

import brightsparkCallsImg from '../assets/images/brightspark_calls.png';
import brightsparkListingImg from '../assets/images/brightspark_listing.png';
import brightsparkPhotoViewsImg from '../assets/images/brightspark_photo_views.png';
import brightsparkProfileViewsImg from '../assets/images/brightspark_profile_views.png';

/** Index-card / homepage-carousel visual. */
export const BSP_IMAGE = brightsparkListingImg;

export const BSP = {
  eyebrow: 'BrightSpark Electrical · Case Study',
  /** Page h1 and index-card title. */
  title:
    'How Google Business Profile Optimization Turned Local Searches Into Booked Electricians',
  meta: {
    industry: 'Electrical Services',
    timeline: '6 Months',
    channels: ['Google Business Profile (GMB) Optimization'],
    objectiveLabel: 'Objective',
    objective:
      'Strengthen local visibility and turn Google Business Profile views into calls, direction requests, and booked jobs for a local electrical services company.',
  },
} as const;

export interface BspSnapshotStat {
  value: string;
  label: string;
  icon: LucideIcon;
}

/** The client doc's "Snapshot" block — four headline stats. */
export const BSP_SNAPSHOT: BspSnapshotStat[] = [
  { value: '15,582', label: 'Business Profile Views', icon: BarChart3 },
  { value: '6.95K', label: 'Photo Views (vs. 551 for similar businesses)', icon: Eye },
  { value: '222', label: 'Business Profile Interactions', icon: PhoneCall },
  { value: '+91.4%', label: 'Year-over-Year Growth in Interactions', icon: TrendingUp },
];

export const BSP_SERVICES = {
  heading: 'Services We Provided',
  items: ['Google Business Profile (GMB) Optimization'],
};

export const BSP_OVERVIEW = {
  heading: 'Project Overview',
  paras: [
    'BrightSpark Electrical is a local electrical contractor offering residential and commercial electrical services. Like many local trades, their reputation was strong on the ground but their Google Business Profile was incomplete, inconsistent, and barely optimized, meaning they were missing local pack visibility exactly when nearby customers searched for an electrician.',
    'Digivibz focused entirely on rebuilding and optimizing their Google Business Profile, turning it from a bare listing into an active driver of calls, direction requests, and website visits.',
  ],
};

export const BSP_CHALLENGE = {
  heading: 'The Challenge',
  intro:
    'When someone needs an electrician, they almost always search locally, often comparing two or three listings before making a call. BrightSpark’s profile wasn’t competitive in that moment.',
  problems: [
    'Incomplete profile missing categories, hours, and service details',
    'Few photos, giving customers little reason to trust the listing',
    'No consistent posting or updates to keep the profile active',
    'Falling behind competitors in the local map pack for key searches',
    'No tracking of how customers were finding or interacting with the profile',
  ],
};

export const BSP_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface BspPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
}

export const BSP_PHASES: BspPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro:
      'We started by auditing BrightSpark’s existing profile against local competitors to see exactly where they were losing visibility. A quick look showed the profile wasn’t just incomplete, it was actively losing ground to competitors who had invested more time into theirs, even with fewer years in business.',
    checks: [
      'Full audit of profile completeness, categories, and service listings',
      'Competitor comparison for local pack rankings and review volume',
      'Review of existing photos, posts, and customer engagement',
      'Analysis of how customers were finding the profile, search vs. maps, mobile vs. desktop',
    ],
  },
  {
    number: '02',
    name: 'Design',
    intro:
      'With that audit complete, we planned a profile strategy built to compete for the local pack and convert views into action. Every decision here was guided by one question: what makes a customer choose this listing over the next one down the page?',
    checks: [
      'Complete profile structure covering every relevant service category',
      'Photo and content strategy to build trust at a glance',
      'Posting cadence to keep the profile active and favored by Google’s algorithm',
      'Clear calls to action across calls, directions, and website clicks',
    ],
  },
  {
    number: '03',
    name: 'Develop',
    intro:
      'With the strategy locked in, we rebuilt the profile from the ground up. Nothing was left as a placeholder, every field, photo, and description was treated as an opportunity to either build trust or get skipped over.',
    checks: [
      'Filled in every profile field: categories, service areas, hours, and attributes',
      'Uploaded a full set of high-quality photos across the business',
      'Set up regular Google Posts to keep the profile fresh',
      'Structured service descriptions around how customers actually search',
    ],
  },
  {
    number: '04',
    name: 'Deploy',
    intro:
      'Once rebuilt, we published the optimized profile and began actively managing it. A profile isn’t a one-time setup, so we treated launch as the start of ongoing management, not a final step.',
    checks: [
      'Updated profile published live across Search and Maps',
      'Photo uploads and posts rolled out on a consistent schedule',
      'Review requests activated to build social proof',
      'Profile monitored across both desktop and mobile placements',
    ],
  },
  {
    number: '05',
    name: 'Detect',
    intro:
      'Optimization didn’t stop at publishing. We tracked performance closely and adjusted based on what was actually driving interactions, not just what looked good on paper.',
    checks: [
      'Profile views tracked by platform and device',
      'Photo view performance monitored against similar businesses',
      'Calls, direction requests, and website clicks tracked monthly',
      'Posting and photo strategy refined based on what drove the most engagement',
    ],
  },
];

export const BSP_RESULTS_HEADING = 'Results';

export interface BspResultShot {
  src: string;
  title: string;
  stat: string;
  alt: string;
}

/**
 * The client doc's "Results" section arrived empty — the four Google Business
 * Profile screenshots supplied with the brief are the results themselves.
 */
export const BSP_RESULTS_SHOTS: BspResultShot[] = [
  {
    src: brightsparkCallsImg,
    title: 'Profile Calls',
    stat: '327 total calls',
    alt: 'Google Business Profile insights showing 327 total calls with direct and discovery call breakdown',
  },
  {
    src: brightsparkListingImg,
    title: 'Optimized Listing',
    stat: '4.9 rating · 285 reviews',
    alt: 'Optimized Google Business Profile listing for BrightSpark Electrical with categories, hours, photos, and a 4.9 rating across 285 reviews',
  },
  {
    src: brightsparkPhotoViewsImg,
    title: 'Photo Views',
    stat: '6.95K vs 551',
    alt: 'Google Business Profile insights showing 6.95K photo views against 551 for similar businesses',
  },
  {
    src: brightsparkProfileViewsImg,
    title: 'Profile Views',
    stat: '15,582 views',
    alt: 'Google Business Profile insights showing 15,582 profile views broken down by Google Search and Maps on desktop and mobile',
  },
];

export const BSP_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'BrightSpark’s Google Business Profile went from an afterthought to an active lead source, turning local searches into calls and booked jobs without a single dollar spent on ads.',
    'Before this project, the profile sat mostly untouched, missing categories, thin on photos, and easy for nearby customers to scroll past in favor of a competitor with a fuller listing. Now, it’s one of the most active parts of BrightSpark’s entire digital presence, generating consistent calls, direction requests, and website visits every month.',
    'This mattered because for a local trade, this single listing often carries more weight than the website itself. A fully optimized profile meant BrightSpark stopped losing nearby customers to competitors who simply looked more established at a glance.',
  ],
};

export const BSP_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    'For a local trade like electrical services, the Google Business Profile often is the first impression, before a website, before a phone call. By fully optimizing every part of the profile through our 5D Growth Framework, we made sure BrightSpark stood out the moment a nearby customer started searching.',
    'A homeowner comparing electricians on their phone doesn’t dig deep, they glance at ratings, photos, and hours, then pick from whoever looks most credible in those first few seconds. That’s why photos, complete service categories, and consistent posting mattered as much as the phone number itself. Every part of the profile was built to earn that first glance and turn it into a call.',
  ],
};

export const BSP_CTA = {
  title: 'Ready to Turn Your Google Business Profile Into a Lead Generator?',
  body: 'Whether you’re a solo electrician or a growing team, our 5D Growth Framework helps local businesses maximize visibility and interactions through Google Business Profile optimization.',
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const BSP_INDEX_SUMMARY = BSP.meta.objective;
export const BSP_MODAL_CHALLENGES = BSP_CHALLENGE.problems;
/** Modal "what we did": the phase intros. */
export const BSP_MODAL_APPROACH = BSP_PHASES.map((p) => p.intro);
/** Index/modal results — numeric highlights first (row slices to 3). */
export const BSP_INDEX_RESULTS = [
  { value: '15,582', label: 'Business Profile views' },
  { value: '6.95K', label: 'Photo views vs 551 for similar businesses' },
  { value: '222', label: 'Business Profile interactions' },
  { value: '+91.4%', label: 'Year-over-year growth in interactions' },
];
