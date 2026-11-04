/**
 * All copy + structured data for the About Us page.
 * Kept separate from components so content stays editable in one place.
 */

/* -------------------------------------------------------------------------- */
/* Founder                                                                     */
/* -------------------------------------------------------------------------- */

export const FOUNDER_STATS = [
  { value: '5+', label: 'Years engineering growth systems' },
  { value: '1000+', label: 'Projects across startups & enterprises' },
  { value: '250+', label: 'US businesses scaled with the system' },
];

/** Horizontal story flow under the founder quote. */
export const STORY_FLOW = [
  { from: 'Frustration', to: 'Philosophy', note: 'Great products, broken strategies, zero consistent growth.' },
  { from: 'Philosophy', to: '5D Growth Framework', note: 'Hope isn’t a strategy — growth should be engineered.' },
  { from: '5D Growth Framework', to: 'Measurable Revenue', note: 'Every campaign built, tracked, and scaled as a system.' },
];

/* -------------------------------------------------------------------------- */
/* Principles: Belief / Mission / Vision / Approach                            */
/* -------------------------------------------------------------------------- */

export const PRINCIPLE_TABS = ['Our Belief', 'Our Mission', 'Our Vision', 'Our Approach'] as const;
export type PrincipleTab = (typeof PRINCIPLE_TABS)[number];

export const BELIEFS = [
  {
    title: 'Revenue First',
    body: 'Every decision, strategy, and campaign is designed to grow your business.',
  },
  {
    title: 'Systems Over Luck',
    body: 'Our 5D Growth Framework ensures every campaign scales predictably for US businesses.',
  },
];

/** The 5D mission pipeline — rendered as an animated flow rail. */
export const MISSION_PIPELINE = [
  { step: 'Discover', body: 'Find Scaling Opportunities' },
  { step: 'Design', body: 'Plan Predictable strategy' },
  { step: 'Develop', body: 'Build Your Growth system' },
  { step: 'Deploy', body: 'Launch And Track ROI' },
  { step: 'Detect', body: 'Optimize And Scale' },
];

export const VISION_POINTS = [
  'More qualified leads flowing in consistently — not in bursts',
  'Higher ROI on every marketing dollar spent',
  'Market share gained while competitors fall behind',
  'Predictable revenue growth you can plan and build on',
];

export const APPROACH_PILLARS = [
  {
    num: '01',
    title: 'Strategy Before Tactics',
    body: 'We don’t jump into execution. Every strategy is aligned with your business goals first.',
  },
  {
    num: '02',
    title: 'Revenue-Focused Execution',
    body: 'Campaigns, funnels, and content are built to generate results and not just engagement or impressions.',
  },
  {
    num: '03',
    title: 'Data-Led Optimization',
    body: 'Every decision is backed by insights. We monitor, refine, and improve ROI continuously.',
  },
  {
    num: '04',
    title: 'Growth Partnership',
    body: 'We don’t work as vendors. We operate as your strategic growth partner.',
  },
];

/* -------------------------------------------------------------------------- */
/* 5D Framework in practice                                                    */
/* -------------------------------------------------------------------------- */

export interface AboutProcessStep {
  num: string;
  name: string;
  title: string;
  body: string;
  /** "You get:" / "This includes:" style list header — omitted when none. */
  listLabel?: string;
  items?: string[];
  closing?: string;
  color: string;
  tint: string;
}

export const PROCESS_STEPS: AboutProcessStep[] = [
  {
    num: '01',
    name: 'Discover',
    title: 'Find What’s Limiting Your Revenue',
    body: 'We audit everything: website, funnels, social platforms, Google Business Profile, competitors, and full customer journey.',
    listLabel: 'You get:',
    items: ['Revenue Leak Report', 'Competitor Intelligence Brief', 'Dream Customer DNA Profile'],
    closing: 'Before we scale, we fix what’s broken.',
    color: '#18181B',
    tint: '#F4F4F5',
  },
  {
    num: '02',
    name: 'Design',
    title: 'Architect Your Growth Strategy',
    body: 'We build a custom strategy aligned with your business goals.',
    listLabel: 'This includes:',
    items: [
      'Complete Customer Journey Map',
      'Platform-specific content strategy',
      'Paid media architecture with budget allocation',
      'Brand positioning refinement',
    ],
    closing: 'Nothing generic. Everything engineered for your revenue goals.',
    color: '#18181B',
    tint: '#F4F4F5',
  },
  {
    num: '03',
    name: 'Develop',
    title: 'Build the Revenue Engine',
    body: 'Execution begins. We build your complete marketing infrastructure:',
    items: [
      'High-converting landing pages',
      'Scroll-stopping ad creatives',
      'SEO-optimized content',
      'Email and SMS automation',
      'Funnel systems built for conversion',
    ],
    closing: 'By the end of this phase, you have a fully operational growth system.',
    color: '#18181B',
    tint: '#F4F4F5',
  },
  {
    num: '04',
    name: 'Deploy',
    title: 'Launch With Full Tracking',
    body: 'As a US-based full-service digital marketing agency, we activate your strategy across all channels with clear performance benchmarks.',
    items: ['Meta Ads', 'Google Ads', 'Social', 'Email', 'SMS', 'SEO', 'Funnels', 'Landing Pages'],
    closing: 'Everything is live and tracked.',
    color: '#18181B',
    tint: '#F4F4F5',
  },
  {
    num: '05',
    name: 'Detect',
    title: 'Optimize and Scale What Works',
    body: 'Growth doesn’t stop at launch. We track:',
    items: ['Leads', 'Conversions', 'Cost efficiency', 'ROI'],
    closing: 'Underperformers get cut. Winners get scaled. Rinse. Refine. Repeat.',
    color: '#C61A1A',
    tint: '#FEF2F2',
  },
];

/* -------------------------------------------------------------------------- */
/* AI + Human                                                                  */
/* -------------------------------------------------------------------------- */

export const AI_BENEFITS = [
  {
    title: 'Precision Targeting',
    body: 'We find high-intent audiences based on real data, not guesses.',
    icon: 'target' as const,
  },
  {
    title: 'Performance Forecasting',
    body: 'We spot trends and fix problems before they cost you money.',
    icon: 'forecast' as const,
  },
  {
    title: 'Real-Time Optimization',
    body: 'We monitor and adjust continuously to improve ROI and lead quality.',
    icon: 'pulse' as const,
  },
  {
    title: 'Smarter Spending',
    body: 'Every dollar is guided by data. Less waste. More return.',
    icon: 'coin' as const,
  },
];

/* -------------------------------------------------------------------------- */
/* Team                                                                        */
/* -------------------------------------------------------------------------- */

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  initials: string;
  /** Flat background color — founder in brand red, team in near-black. */
  color: string;
  /** Focus chips shown on the team slider cards. */
  tags: string[];
}

export const TEAM: TeamMember[] = [
  {
    name: 'Muhammad Ahsan Akmal',
    role: 'Founder & CEO',
    specialty: 'Strategy & Business Growth',
    initials: 'MA',
    color: '#C61A1A',
    tags: ['Growth Strategy', 'Business Systems', 'Brand Direction'],
  },
  {
    name: 'James R. Mitchell',
    role: 'Head of Paid Media',
    specialty: 'Meta Ads & Google Ads',
    initials: 'JM',
    color: '#18181B',
    tags: ['Meta Ads', 'Google Ads', 'Budget Scaling'],
  },
  {
    name: 'Sarah L. Thompson',
    role: 'SEO & Content Strategist',
    specialty: 'SEO & Content Marketing',
    initials: 'ST',
    color: '#18181B',
    tags: ['Technical SEO', 'Content Systems', 'Rankings'],
  },
  {
    name: 'David K. Harris',
    role: 'Funnel & Conversion Specialist',
    specialty: 'Funnel Building & Conversion Optimization',
    initials: 'DH',
    color: '#18181B',
    tags: ['Funnels', 'CRO', 'Landing Pages'],
  },
  {
    name: 'Emily J. Carter',
    role: 'Social Media & Brand Strategist',
    specialty: 'Social Media & Brand Strategy',
    initials: 'EC',
    color: '#18181B',
    tags: ['Social Strategy', 'Brand Voice', 'Community'],
  },
  {
    name: 'Ryan T. Collins',
    role: 'AI & Analytics Lead',
    specialty: 'AI Integration & Performance Analytics',
    initials: 'RC',
    color: '#18181B',
    tags: ['AI Integration', 'Analytics', 'Attribution'],
  },
];

/* -------------------------------------------------------------------------- */
/* Who we work with                                                            */
/* -------------------------------------------------------------------------- */

export const IDEAL_CLIENTS = [
  'View marketing as an investment, not an expense',
  'Value clarity, data, and accountability',
  'Want systems that scale — not random tactics',
  'Are ready to build long-term revenue, not chase vanity metrics',
];

/* -------------------------------------------------------------------------- */
/* Results + achievements                                                      */
/* -------------------------------------------------------------------------- */

export const RESULTS_METRICS = [
  { value: '250+', label: 'businesses generating consistent leads with our system', bar: 62 },
  { value: '4X', label: 'average revenue growth for clients in the last 12 months', bar: 84 },
  { value: '1000+', label: 'AI-driven campaigns optimising sales and conversions', bar: 96 },
  { value: '95%', label: 'client satisfaction rate with measurable business results', bar: 95 },
];

export const ACHIEVEMENTS = [
  {
    num: '01',
    title: 'Predictable Revenue Growth',
    body: 'With the right strategies in place, your business can move from inconsistent sales to predictable, scalable US revenue growth. Instead of guessing each month\'s performance, you gain clarity, structure, and measurable financial growth driven by proven strategies.',
    color: '#18181B',
  },
  {
    num: '02',
    title: 'Consistent Flow of Qualified Leads & Sales',
    body: 'As a US-based results-focused agency, we build systems that attract high-intent prospects, not just traffic. That means better-quality leads, higher engagement, and a sales pipeline that supports long-term growth.',
    color: '#18181B',
  },
  {
    num: '03',
    title: 'Stronger Market Position & Authority',
    body: 'Strategic positioning and smart execution help your business stand out in competitive US markets. With the right strategies, you don’t just compete, you lead your industry with confidence and credibility.',
    color: '#18181B',
  },
  {
    num: '04',
    title: 'Long-Term Business Growth',
    body: 'True success isn\'t short-term spikes. It\'s building systems that scale year after year. With structured growth strategies and continuous optimisation, your business becomes a long-term revenue asset, not an expense.',
    color: '#18181B',
  },
];
