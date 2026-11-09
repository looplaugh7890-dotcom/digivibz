import {
  Activity,
  BadgeCheck,
  Ban,
  BookOpen,
  Clock,
  Mail,
  Network,
  RotateCw,
  Scale,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Copy + structure for the Marketing Results Disclaimer page
 * (`/marketing-disclaimer`). Every statement here mirrors the
 * client-provided disclaimer text verbatim; the page only decides how each
 * block is presented.
 */

/** Sticky table-of-contents entries — also drive the section numbering. */
export interface DisclaimerSectionMeta {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const DISCLAIMER_SECTIONS: DisclaimerSectionMeta[] = [
  { id: 'no-guaranteed-results', label: 'No Guaranteed Results', icon: Ban },
  { id: 'case-studies', label: 'Case Studies and Portfolio Examples', icon: BookOpen },
  { id: 'timeframes', label: 'Timeframes', icon: Clock },
  { id: 'third-party-platforms', label: 'Third-Party Platforms and Algorithms', icon: Network },
  { id: 'client-dependent-factors', label: 'Client-Dependent Factors', icon: Users },
  { id: 'compliance-responsibility', label: 'Compliance Responsibility', icon: BadgeCheck },
  { id: 'no-financial-advice', label: 'No Financial or Investment Advice', icon: Scale },
  { id: 'changes-to-disclaimer', label: 'Changes to This Disclaimer', icon: RotateCw },
  { id: 'contact-us', label: 'Contact Us', icon: Mail },
];

/** Hero intro — lead + acknowledgement line (verbatim). */
export const DISCLAIMER_INTRO = {
  lead: 'At Digivibz, we are committed to delivering strategic, data-driven digital marketing services across SEO, Google Ads, Meta Ads, AI automation, web design and development, content writing, social media, video editing, ORM, GMB, influencer marketing, and app development. This Marketing Results Disclaimer explains how we communicate expected outcomes and the factors that influence campaign performance.',
  sub: 'By using our website or engaging our services, you acknowledge and agree to the terms outlined below.',
} as const;

/** Quick-glance figures surfaced in the hero (all drawn from the terms body). */
export const DISCLAIMER_STATS = [
  { value: '0', label: 'Specific outcomes guaranteed' },
  { value: '5D', label: 'Framework applied to every project' },
  { value: 'Varies', label: 'Actual results vs. estimates' },
  { value: 'None', label: 'Control over platform changes' },
] as const;

/**
 * Results-influence-map visual — three spheres that shape campaign
 * performance, feeding an output range-meter. Labels are condensed visual
 * captions; the verbatim sentences live in the sections below.
 */
export const INFLUENCE_SOURCES = [
  {
    eyebrow: '01 · Digivibz drives',
    title: 'Strategy & execution',
    chips: ['5D Growth Framework', 'Proven strategies', 'Campaign optimization'],
  },
  {
    eyebrow: '02 · Your side',
    title: 'Client-dependent',
    chips: ['Website infrastructure', 'Product quality', 'Pricing', 'Budget allocation', 'Feedback speed'],
  },
  {
    eyebrow: '03 · Platforms & market',
    title: 'Third-party & external',
    chips: ['Algorithms', 'Policies & approvals', 'Seasonality', 'Competition'],
  },
] as const;

export const INFLUENCE_BRIDGE = 'Shapes your results';

export const INFLUENCE_OUTPUT = {
  eyebrow: 'Your campaign results',
  leftEnd: 'May take longer',
  center: 'Estimate',
  rightEnd: 'May take shorter',
  chip: 'No guaranteed outcomes',
} as const;

/* ------------------------------------------------------------------ 01 */
export const NO_GUARANTEE_INTRO =
  'Digital marketing results depend on a wide range of variables, including industry, competition, budget, market conditions, seasonality, and platform algorithm changes.';

export const NO_GUARANTEE_ALERT =
  'While Digivibz applies proven strategies and our 5D Growth Framework to every project, we cannot guarantee specific outcomes such as exact rankings, traffic volume, lead counts, conversion rates, or revenue figures.';

/* ------------------------------------------------------------------ 02 */
export const CASE_STUDIES_COPY =
  'Case studies, testimonials, and portfolio results shared on our website or in proposals reflect past performance for specific clients under specific conditions.';

export const CASE_STUDIES_NOTICE =
  'They are provided for illustration only and do not represent a guarantee of similar results for any other business.';

/* ------------------------------------------------------------------ 03 */
export const TIMEFRAMES_COPY =
  'Any timelines we share, whether for SEO progress, ad campaign optimization, or other services, are estimates based on industry experience and prior client outcomes.';

export const TIMEFRAMES_NOTICE =
  'Actual results may take longer or shorter to materialize depending on your industry, competition level, and the platforms involved.';

/* ------------------------------------------------------------------ 04 */
export const PLATFORMS_COPY =
  'Many of our services rely on third-party platforms such as Google, Meta, and other search engines and social networks.';

export const PLATFORMS_NOTICE =
  'Digivibz does not control these platforms and is not responsible for changes to their algorithms, policies, ad approval processes, or pricing that may affect campaign performance.';

/* ------------------------------------------------------------------ 05 */
export const CLIENT_FACTORS_COPY =
  'Campaign performance is also influenced by factors outside Digivibz\u2019s control, including your website infrastructure, product or service quality, pricing, market reputation, budget allocation, and the speed of feedback or approvals provided during the project.';

export const CLIENT_FACTORS_NOTICE =
  'Delays or limitations on the client\u2019s side may directly affect outcomes.';

/* ------------------------------------------------------------------ 06 */
export const COMPLIANCE_COPY =
  'Clients are responsible for ensuring that their products, services, and business practices comply with applicable laws and platform advertising policies.';

export const COMPLIANCE_ALERT =
  'Digivibz is not liable for account suspensions, ad disapprovals, or penalties resulting from a client\u2019s non-compliant business practices.';

/* ------------------------------------------------------------------ 07 */
export const NO_ADVICE_SENTENCE =
  'Nothing on our website or in our marketing materials should be interpreted as financial, legal, or investment advice. Any figures, projections, or examples shared are for informational purposes only.';

/* ------------------------------------------------------------------ 08 */
export const CHANGES_COPY = [
  'Digivibz reserves the right to update this Marketing Results Disclaimer at any time to reflect changes in our practices or industry standards.',
  'Continued use of our services after updates are posted constitutes acceptance of the revised terms.',
] as const;

/* ------------------------------------------------------------------ 09 */
export const DISCLAIMER_CONTACT_BEFORE =
  'If you have any questions about this Marketing Results Disclaimer, please contact us at';
export const DISCLAIMER_CONTACT_EMAIL = 'hello@digivibz.com';
export const DISCLAIMER_CONTACT_AFTER = 'or through our website';
export const DISCLAIMER_CONTACT_FORM_LABEL = 'contact form';
