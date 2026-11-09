/**
 * Copy for the RapidRestore case study (`/case-study/rapidrestore`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (❌ / ✔ /
 * 🤖 🔍 📈 🏆) are rendered as brand icons in the UI instead of emoji — the
 * wording itself is untouched.
 *
 * Note: the client doc's "Snapshot" heading arrived WITH four headline stats
 * AND a matching snapshot graphic (the first supplied image), so that graphic
 * renders as the hero snapshot board and the four stats power the index card
 * results. The doc's "Results" section carries no text — the AI-referred
 * traffic chart, the citations-by-platform chart and the AEO/GEO dashboard
 * supplied with the brief ARE the results, so they render as an evidence
 * board (RR_RESULTS_SHOTS).
 */

import rapidrestoreSnapshotImg from '../assets/images/rapidrestore_snapshot.png';
import rapidrestoreTrafficImg from '../assets/images/rapidrestore_traffic.png';
import rapidrestoreCitationsImg from '../assets/images/rapidrestore_citations.png';
import rapidrestoreDashboardImg from '../assets/images/rapidrestore_dashboard.png';

/** Hero snapshot board visual: the client's own campaign snapshot. */
export const RR_IMAGE = rapidrestoreSnapshotImg;

export const RR = {
  eyebrow: 'RapidRestore · Case Study',
  /** Page h1 and index-card title. */
  title: 'Getting Found in AI Overviews and Answer Engines During Water Damage Emergencies',
  meta: {
    industry: 'Water Damage Restoration',
    timeline: '6 Months',
    channels: [
      'Answer Engine Optimization (AEO)',
      'Generative Engine Optimization (GEO)',
      'Technical SEO',
    ],
    objectiveLabel: 'Objective',
    objective:
      'Get RapidRestore’s content surfaced in Google’s AI Overviews, ChatGPT, and other AI-driven answer engines when homeowners search for help during a water damage emergency.',
  },
} as const;

export const RR_OVERVIEW = {
  heading: 'Project Overview',
  paras: [
    'RapidRestore provides emergency water damage restoration, from burst pipes to flood cleanup, for homeowners across their service area. As more people started asking AI tools like Google’s AI Overview, ChatGPT, and Perplexity direct questions in a crisis ("what do I do if my basement floods") instead of clicking through ten blue links, RapidRestore had no presence in those AI-generated answers at all.',
    'Digivibz built a content and technical strategy specifically designed to get RapidRestore’s expertise pulled into AI-generated answers, not just traditional search rankings, positioning them as the trusted source when homeowners needed guidance immediately.',
  ],
};

export const RR_CHALLENGE = {
  heading: 'The Challenge',
  intro:
    'Search behavior has shifted. Homeowners in a water damage emergency increasingly ask an AI assistant directly instead of scanning search results, and if a company’s content isn’t structured in a way AI tools can understand and trust, it simply doesn’t get mentioned.',
  problems: [
    'No content structured to be pulled into AI Overviews or chatbot answers',
    'Existing blog content written for search rankings, not for direct AI citation',
    'No clear, extractable answers to common emergency questions',
    'Competitors’ content being cited by AI tools instead of RapidRestore’s',
    'No visibility into which questions AI engines were even being asked',
  ],
};

export const RR_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface RrPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
}

export const RR_PHASES: RrPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro:
      'We started by understanding which water damage questions people were actually asking AI tools, and why competitors were getting cited instead of RapidRestore.',
    checks: [
      'Research into common AI prompts and questions around water damage emergencies',
      'Testing existing AI Overview, ChatGPT, and Perplexity responses for target queries',
      'Competitor analysis of which sources were being cited and why',
      'Audit of RapidRestore’s existing content for AI-readability and structure',
    ],
  },
  {
    number: '02',
    name: 'Design',
    intro:
      'With that research done, we planned a content structure built specifically around how AI engines extract and cite information, not just how search engines rank pages.',
    checks: [
      'Direct-answer content format: clear question, immediate answer, supporting detail',
      'Structured data and schema markup to help AI tools parse content accurately',
      'Content organized around real emergency scenarios and decision points',
      'Authority-building elements (credentials, experience, clear sourcing) AI tools favor when selecting citations',
    ],
  },
  {
    number: '03',
    name: 'Develop',
    intro: 'With the strategy locked in, we built out the content and technical foundation.',
    checks: [
      'Rewrote and restructured key pages with direct, extractable answers up front',
      'Added structured data (FAQ schema, HowTo schema) to support AI parsing',
      'Created new content directly addressing emergency decision-point questions',
      'Built clear authorship and credential markers to strengthen AI trust signals',
      'Optimized page speed and technical SEO to support crawlability',
    ],
  },
  {
    number: '04',
    name: 'Deploy',
    intro: 'Once built and tested, we published the new and restructured content across the site.',
    checks: [
      'Restructured content published with direct-answer formatting live',
      'Schema markup implemented and validated across all target pages',
      'New emergency-scenario content published and internally linked',
      'Content submitted for re-indexing to prompt faster AI re-evaluation',
    ],
  },
  {
    number: '05',
    name: 'Detect',
    intro:
      'AI citation isn’t static, it shifts as models update and competitors adjust. We monitored consistently and refined based on what was actually getting cited.',
    checks: [
      'Regular testing of target queries across Google AI Overview, ChatGPT, and Perplexity',
      'Tracking of which pages were being cited or featured, and which weren’t',
      'Traffic from AI-referral sources monitored separately from traditional organic',
      'Content refined and expanded based on new questions AI tools were surfacing',
    ],
  },
];

export const RR_RESULTS_HEADING = 'Results';

export interface RrResultShot {
  src: string;
  title: string;
  stat: string;
  alt: string;
}

/**
 * The client doc's "Results" section arrived empty — the traffic chart, the
 * citations-by-platform chart and the AEO/GEO dashboard supplied with the
 * brief are the results themselves.
 */
export const RR_RESULTS_SHOTS: RrResultShot[] = [
  {
    src: rapidrestoreTrafficImg,
    title: 'AI-Referred Traffic',
    stat: '210% increase',
    alt: 'Area line chart of RapidRestore AI-referred sessions per month rising from about 180 in month one to a peak of 610 in month five and 560 in month six, a 210 percent increase',
  },
  {
    src: rapidrestoreCitationsImg,
    title: 'Citations by AI Platform',
    stat: '14 · 4 · 2',
    alt: 'Bar chart of RapidRestore content citations by AI platform: Google AI Overview 14, ChatGPT 4 and Perplexity 2',
  },
  {
    src: rapidrestoreDashboardImg,
    title: 'AEO/GEO Dashboard',
    stat: '14 features · 8 top-cited queries',
    alt: 'RapidRestore AEO/GEO performance dashboard for the last six months showing 14 AI Overview features, 6 answer engine citations, 210 percent AI traffic growth and 8 top-cited queries, with a traffic trend, citations by platform, featured content by topic donut and a query-to-citation funnel',
  },
];

export const RR_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'RapidRestore moved from being invisible in AI-generated answers to becoming one of the cited sources homeowners see the moment they ask an AI tool what to do in a water damage emergency.',
    'This mattered because that moment, the direct question to an AI assistant during a crisis, is exactly when trust and speed matter most. Being the cited source in that answer put RapidRestore in front of homeowners before they even reached a traditional search results page.',
  ],
};

export const RR_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    'AI answer engines don’t reward keyword density, they reward clear, direct, trustworthy answers structured in a way they can confidently extract and cite. By restructuring content specifically for AI extraction and reinforcing authority signals through our 5D Growth Framework, we positioned RapidRestore as a source AI tools could confidently point to during exactly the moments that matter most.',
  ],
};

export const RR_CTA = {
  title: 'Ready to Show Up in the Answers AI Tools Are Already Giving?',
  body: 'Whether your customers are searching Google or asking ChatGPT directly, our 5D Growth Framework helps your business become the trusted source AI engines cite first.',
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const RR_INDEX_SUMMARY = RR.meta.objective;
export const RR_MODAL_CHALLENGES = RR_CHALLENGE.problems;
/** Modal "what we did": the phase intros. */
export const RR_MODAL_APPROACH = RR_PHASES.map((p) => p.intro);
/** Index/modal results — the four snapshot stats (row slices to 3). */
export const RR_INDEX_RESULTS = [
  { value: '14', label: 'Featured in Google AI Overview' },
  { value: '6', label: 'Topics cited by ChatGPT/Perplexity' },
  { value: '210%', label: 'Increase in AI-referred traffic' },
  { value: '#1', label: 'Cited source for 8 key queries' },
];
