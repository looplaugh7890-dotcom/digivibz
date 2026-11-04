import {
  Activity,
  Archive,
  Baby,
  Cookie,
  Database,
  Heart,
  Lock,
  Mail,
  RotateCw,
  ScanEye,
  Share2,
  ShieldCheck,
  UserCheck,
  UserRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Copy + structure for the Privacy Policy page (`#/privacy-policy`).
 * Every statement here mirrors the client-provided policy text verbatim;
 * the page only decides how each block is presented. The signed personal
 * note is the one addition — it is clearly marked as a note, not policy.
 */

/** Sticky table-of-contents entries — also drive the section numbering. */
export interface PrivacySectionMeta {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const PRIVACY_SECTIONS: PrivacySectionMeta[] = [
  { id: 'information-we-collect', label: 'Information We Collect', icon: Database },
  { id: 'how-we-use', label: 'How We Use Your Information', icon: Activity },
  { id: 'cookies', label: 'Cookies', icon: Cookie },
  { id: 'how-we-share', label: 'How We Share Your Information', icon: Share2 },
  { id: 'data-security', label: 'Data Security', icon: ShieldCheck },
  { id: 'data-retention', label: 'Data Retention', icon: Archive },
  { id: 'your-rights', label: 'Your Privacy Rights', icon: UserCheck },
  { id: 'childrens-privacy', label: "Children's Privacy", icon: Baby },
  { id: 'policy-changes', label: 'Changes to This Privacy Policy', icon: RotateCw },
  { id: 'contact-us', label: 'Contact Us', icon: Mail },
];

/** Hero intro — shown under the page title. */
export const PRIVACY_INTRO = {
  lead: 'At Digivibz, your privacy matters to us. This Privacy Policy explains how we collect, use, protect, and share information when you visit our website or use our digital marketing services, including SEO, Google Ads, Meta Ads, AI automation, web design and development, content writing, social media management, video editing, ORM, GMB management, influencer marketing, and app development.',
  sub: 'By using our website or services, you agree to the practices described in this policy.',
} as const;

/** Quick-glance figures surfaced in the hero (all drawn from the policy body). */
export const PRIVACY_STATS = [
  { value: '0', label: 'Personal data sold to third parties' },
  { value: '100%', label: 'Data handled by our in-house team' },
  { value: '2', label: 'Types of cookies in use' },
  { value: '18+', label: 'Age requirement for our services' },
] as const;

/** The one non-policy addition — a signed human note, styled as a note. */
export const PERSONAL_NOTE = {
  text: 'We wrote this page in plain language on purpose — no legal gymnastics, no hidden clauses. If anything here feels unclear, write to us and a real person from our team will walk you through it.',
  signature: '— The Digivibz Team',
} as const;

/** Three-card summary strip echoing the policy's core promises. */
export const PROMISE_CARDS = [
  { title: 'Never sold', body: 'Your personal information is not sold or shared with third parties.' },
  { title: 'In-house only', body: 'Your data is handled exclusively by our in-house team.' },
  { title: 'Lawful disclosure', body: 'Shared only when required by law or to protect our rights and users.' },
] as const;

/** Section 1 — three data-collection categories presented as cards. */
export interface CollectBlock {
  title: string;
  body: string;
  icon: LucideIcon;
}

export const COLLECT_BLOCKS: CollectBlock[] = [
  {
    title: 'Personal Data',
    body: 'When you fill out a contact form, request a quote, book a consultation, or subscribe to our newsletter, we may collect information such as your name, email address, phone number, business name, and any project details you share with us.',
    icon: UserRound,
  },
  {
    title: 'Usage Data',
    body: 'We automatically collect certain information when you visit our website, including your IP address, browser type and version, device information, pages visited, and time spent on our site. This data helps us understand how visitors interact with our website so we can improve performance and user experience.',
    icon: ScanEye,
  },
  {
    title: 'Cookies and Tracking Data',
    body: 'We use cookies and similar tracking technologies to monitor website activity and store certain preferences. See the Cookies section below for details.',
    icon: Cookie,
  },
];

/** Section 2 — the six stated uses of collected information. */
export const USE_LEAD = 'We use the information we collect to:';

export const USE_ITEMS = [
  'Respond to your inquiries and provide quotes for our services',
  'Deliver, maintain, and improve our digital marketing services',
  'Send project updates, offers, or relevant service information',
  'Contact you by email, phone, or WhatsApp regarding your account or project',
  'Analyze website traffic and user behavior to improve our content and services',
  'Comply with legal obligations where applicable',
] as const;

/** Section 3 — cookies intro + the two cookie types. */
export const COOKIES_INTRO =
  'Our website uses cookies, small files placed on your device, to track activity and improve your browsing experience. You can set your browser to refuse cookies, though this may limit some features of our website.';

export const COOKIES_LEAD = 'We use two types of cookies:';

export interface CookieType {
  index: string;
  name: string;
  /** Full sentence with the cookie name kept bold inside it (verbatim). */
  sentence: string;
}

export const COOKIE_TYPES: CookieType[] = [
  {
    index: '01',
    name: 'Persistent Cookies',
    sentence: 'Persistent Cookies remain on your device until they expire or are deleted, even after you close your browser',
  },
  {
    index: '02',
    name: 'Session Cookies',
    sentence: 'Session Cookies are automatically deleted once you close your browser',
  },
];

/** Section 4 — the no-selling promise (black statement box) + lawful-disclosure line. */
export const SHARE_MAIN =
  'Digivibz does not sell or share your personal information with third parties. Your data is handled exclusively by our in-house team to deliver and manage your services.';

export const SHARE_LAW =
  'We may only disclose your information if required by law or to protect our rights and the safety of our users.';

/** Sections 5–6. */
export const SECURITY_COPY =
  'We apply industry-standard security measures, including secure data storage and restricted access, to protect your personal information from unauthorized access, disclosure, or misuse. While no method of transmission over the internet is completely secure, we work continuously to safeguard your data.';

export const RETENTION_COPY =
  'We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law.';

/** Section 7 — rights list + closing line. */
export const RIGHTS_LEAD = 'Depending on your location, you may have the right to:';

export const RIGHTS_ITEMS = [
  'Request access to the personal data we hold about you',
  'Request correction or deletion of your data',
  'Opt out of marketing communications at any time',
  'Withdraw consent for data processing, where applicable',
] as const;

export const RIGHTS_CLOSING =
  'To exercise any of these rights, contact us using the details below.';

/** Sections 8–9. */
export const CHILDREN_COPY =
  'Our services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If we become aware that we have inadvertently collected such data, we will take steps to delete it.';

export const CHANGES_COPY =
  'Digivibz may update this Privacy Policy from time to time to reflect changes in our practices or for legal and regulatory reasons. If we make significant changes, we will notify you via email. We encourage you to review this page periodically, as changes take effect once posted.';

/** Section 10 — contact sentence pieces (the `[email]` placeholder becomes our address). */
export const CONTACT_BEFORE = 'If you have any questions about this Privacy Policy or how we handle your data, please contact us at';
export const CONTACT_EMAIL = 'hello@digivibz.com';
export const CONTACT_AFTER = 'or through our website';
export const CONTACT_FORM_LABEL = 'contact form';
