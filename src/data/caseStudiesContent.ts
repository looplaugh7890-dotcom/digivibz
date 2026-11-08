/**
 * Copy + data for the case-study index page (`#/case-studies`).
 *
 * The four study entries themselves (title, summary, results, cover image)
 * live in `data/content.ts` as `CASE_STUDIES` — this file only carries the
 * page-level copy around them, so the index and the detail pages can never
 * drift apart.
 */

import { CASE_STUDIES } from './content';

/** All studies, in library order. Every one has a detail page. */
export const CASE_STUDY_LIBRARY = CASE_STUDIES;

export const CASE_STUDIES_INTRO =
  'Four industries, four complete breakdowns — what was broken, what we changed, and exactly what the numbers did afterwards. No projections, no vanity metrics: every figure below was measured on the client account.';

/** Hero floating chips — headline results drawn from the studies themselves. */
export const HERO_RESULT_CHIPS: { value: string; label: string }[] = [
  { value: '4×', label: 'Qualified Leads' },
  { value: '3×', label: 'Monthly Revenue' },
  { value: '65%', label: 'Lower Cost Per Lead' },
];

/** Black stats band under the hero. */
export const INDEX_STATS: { value: string; label: string }[] = [
  { value: String(CASE_STUDIES.length), label: 'Full case studies' },
  { value: String(CASE_STUDIES.reduce((n, s) => n + s.results.length, 0)), label: 'Measured results' },
  { value: String(new Set(CASE_STUDIES.map((s) => s.industry)).size), label: 'Industries covered' },
  { value: '4×', label: 'Top-line growth delivered' },
];

/** The three things every case study documents, in reading order. */
export const INSIDE_EVERY_STUDY: { number: string; title: string; body: string }[] = [
  {
    number: '01',
    title: 'The Challenge',
    body: 'Where the leaks were — weak leads, thin visibility, seasonal dips, or ad spend that never paid back.',
  },
  {
    number: '02',
    title: 'What We Did',
    body: 'The 5D Growth Framework work itself: the site, the funnels, the SEO, the ads, and the automation as one system.',
  },
  {
    number: '03',
    title: 'The Measured Results',
    body: 'The numbers after launch — leads, revenue, conversion, and cost per acquisition, tracked on the client account.',
  },
];

export const CASE_STUDIES_CTA = {
  title: 'Your Case Study Starts With One Audit',
  body: 'The same process behind these four studies starts with a free look at your funnel — where growth is leaking, what it is costing you, and what fixing it could return.',
};
