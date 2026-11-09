/**
 * Copy + data for the Portfolio page (`/portfolio`) and the
 * case-study detail route (`/case-study/<slug>`).
 *
 * NOTE: Atlas / Northbridge entries are PREVIEWS — dedicated case-study
 * pages will be fleshed out with full assets in a later pass. The slugs
 * below are the future page URLs, so links work today and slot straight
 * into that pass.
 */

/** Hero intro paragraph (client brief). */
export const PORTFOLIO_INTRO =
  'When businesses work with Digivibz, their digital presence becomes a growth engine. These projects highlight how our 5D Growth Framework helps drive more customers, leads, and revenue.';

/** The four proof metrics (client brief). */
export const PORTFOLIO_STATS = [
  { value: '250+', label: 'businesses generating consistent leads with our system', red: false },
  { value: '4X', label: 'average revenue growth for clients in the last 12 months', red: true },
  { value: '1000+', label: 'AI-driven campaigns optimising sales and conversions', red: false },
  { value: '95%', label: 'client satisfaction rate with measurable business results', red: false },
] as const;

/**
 * Ranking data for the hero "Results Board" chart —
 * growth multiple per project (max 4X sets the axis).
 */
export const RESULTS_BOARD = [
  { label: 'Healthcare', value: 4.0 },
  { label: 'Home Services', value: 4.0 },
  { label: 'Fitness', value: 4.0 },
  { label: 'E-commerce', value: 3.5 },
  { label: 'Atlas Financial', value: 2.3 },
  { label: 'Northbridge Legal', value: 1.9 },
] as const;

export interface PortfolioProject {
  /** Future case-study page: `/case-study/<slug>` */
  slug: string;
  name: string;
  industry: string;
  metric: { value: string; label: string };
  description: string;
  /** Which ProjectMockup layout to render (no photography yet). */
  variant: 'finance' | 'legal';
}

/** Featured client projects — previews for future case-study pages. */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    slug: 'atlas-financial-consulting',
    name: 'Atlas Financial Consulting',
    industry: 'Financial Consulting',
    metric: { value: '2.3X', label: 'growth in qualified inbound leads' },
    description:
      'Atlas Financial Consulting partnered with Digivibz to turn their digital presence into a reliable source of qualified business leads. Using our 5D Growth Framework, we optimized their website, refined their messaging, and built a conversion-focused digital marketing system. As a result, Atlas Financial saw a significant increase in qualified inquiries and consistent lead generation from their online channels.',
    variant: 'finance',
  },
  {
    slug: 'northbridge-legal-advisors',
    name: 'Northbridge Legal Advisors',
    industry: 'Legal Advisory',
    metric: { value: '1.9X', label: 'increase in client inquiries' },
    description:
      'Northbridge Legal Advisors partnered with Digivibz to transform their online presence into a consistent client acquisition channel. Through our 5D Growth Framework, we restructured their website, improved service positioning, and implemented a high-converting lead generation funnel supported by targeted digital marketing efforts. This resulted in a steady flow of qualified case inquiries and improved client conversion rates.',
    variant: 'legal',
  },
];

/** "How We Drive Consistent Business Growth" — the 5D system (client brief). */
export const GROWTH_SYSTEM_STEPS = [
  {
    name: 'Discover',
    description:
      'We identify what’s holding your business back by analyzing your market, funnel, and customer journey.',
  },
  {
    name: 'Design',
    description:
      'We create a tailored growth strategy built around your goals, audience, and positioning.',
  },
  {
    name: 'Develop',
    description:
      'We build the assets your business needs, from high-converting pages to campaigns and content systems.',
  },
  {
    name: 'Deploy',
    description:
      'We launch everything with precision, ensuring every channel works together to drive results.',
  },
  {
    name: 'Detect',
    description:
      'We continuously track performance, optimize what’s working, and scale what drives revenue.',
  },
] as const;

/** "What Working With Digivibz Feels Like" — client brief paragraphs. */
export const WORKING_STYLE_PARAS = [
  'Working with us means having a team that treats your business like a growth system, not just a project.',
  'We don’t rely on assumptions or one-size-fits-all solutions. Every decision is backed by strategy, data, and a clear understanding of your goals.',
  'You can expect structured communication, complete transparency, and a process where you always know what’s happening and why.',
  'From planning to execution and optimization, everything is handled with focus, accountability, and attention to results.',
] as const;

/**
 * The "Project Pulse" board — the three phases from the brief
 * (planning → execution → optimization) with what each one shows you.
 */
export const WORKING_STYLE_PHASES = [
  {
    phase: 'Planning',
    items: ['Strategy backed by your goals', 'Clear scope, timeline, and ownership'],
  },
  {
    phase: 'Execution',
    items: ['Structured communication at every step', 'Complete transparency — no black boxes'],
  },
  {
    phase: 'Optimization',
    items: ['Every action measured', 'Every outcome tied to real business growth'],
  },
] as const;

/** Closing line under the 5D system (client brief). */
export const GROWTH_SYSTEM_CLOSER =
  'This isn’t guesswork. It’s a repeatable system designed to help businesses grow with clarity, consistency, and measurable results.';

/** Final CTA copy (client brief). */
export const PORTFOLIO_CTA = {
  title: 'Ready to Turn Your Marketing Into Predictable Revenue?',
  body: 'Stop guessing your marketing results. Share your details, and we’ll provide a free, personalised Growth Audit to uncover opportunities, fix gaps, and boost revenue.',
} as const;
