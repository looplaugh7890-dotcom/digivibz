import {
  BadgeCheck,
  Ban,
  Building2,
  Copyright,
  ExternalLink,
  Globe,
  HandCoins,
  Handshake,
  ListChecks,
  Lock,
  Mail,
  RotateCw,
  Scale,
  ShieldAlert,
  Stamp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Copy + structure for the Legal Notice page (`/legal-notice`).
 * Every statement here mirrors the client-provided legal notice text
 * verbatim; the page only decides how each block is presented.
 */

/** Sticky table-of-contents entries — also drive the section numbering. */
export interface LegalNoticeSectionMeta {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const LEGAL_NOTICE_SECTIONS: LegalNoticeSectionMeta[] = [
  { id: 'company-information', label: 'Company Information', icon: Building2 },
  { id: 'purpose-of-website', label: 'Purpose of This Website', icon: Globe },
  { id: 'intellectual-property', label: 'Intellectual Property', icon: Copyright },
  { id: 'accuracy-of-information', label: 'Accuracy of Information', icon: BadgeCheck },
  { id: 'external-links', label: 'External Links', icon: ExternalLink },
  { id: 'limitation-of-liability', label: 'Limitation of Liability', icon: ShieldAlert },
  { id: 'governing-law', label: 'Governing Law', icon: Scale },
  { id: 'related-policies', label: 'Related Policies', icon: ListChecks },
  { id: 'changes-to-notice', label: 'Changes to This Notice', icon: RotateCw },
  { id: 'contact-us', label: 'Contact Us', icon: Mail },
];

/** Hero intro — single paragraph, verbatim. */
export const LEGAL_NOTICE_INTRO =
  'This Legal Notice provides official information about Digivibz in accordance with standard business transparency practices. It is intended to identify who operates this website and the services offered, and to outline the legal terms governing its use.';

/** Quick-glance figures surfaced in the hero (all drawn from the notice body). */
export const LEGAL_NOTICE_STATS = [
  { value: 'Digivibz', label: 'Trading name of the business' },
  { value: '4', label: 'Related policies governed together' },
  { value: '0', label: 'Liability for damages from site use' },
  { value: 'Any time', label: 'We may update this notice' },
] as const;

/* ------------------------------------------------------------------ 01 */

export interface CompanyField {
  label: string;
  value: string;
}

export const COMPANY_FIELDS: CompanyField[] = [
  { label: 'Trading Name', value: 'Digivibz' },
  {
    label: 'Nature of Business',
    value:
      'Full-service digital marketing agency offering SEO, Google Ads, Meta Ads, AI automation, web design and development, content writing, social media management, video editing, ORM, GMB management, influencer marketing, and app development',
  },
  { label: 'Business Address', value: '[Insert registered business address]' },
  { label: 'Email', value: 'hello@digivibz.com' },
  { label: 'Phone', value: '+1 (800) 555-DIGI' },
  { label: 'Website', value: 'digivibz.com' },
];

/** Fields the page turns into live links (placeholders resolved like the legal pages). */
export const COMPANY_LINKS = {
  email: 'hello@digivibz.com',
  phone: '+1 (800) 555-DIGI',
  phoneHref: 'tel:+18005553444',
  website: 'digivibz.com',
} as const;

/* ------------------------------------------------------------------ 02 */
export const PURPOSE_COPY = [
  'This website is published to present Digivibz\u2019s services, share information about our work, and allow prospective and existing clients to get in touch with our team.',
  'It is not intended to serve as legal, financial, or professional advice of any kind.',
] as const;

/* ------------------------------------------------------------------ 03 */
export const IP_COPY =
  'All content on this website, including text, graphics, logos, images, videos, and design elements, is the property of Digivibz unless otherwise credited, and is protected under applicable copyright and trademark laws.';

export const IP_NOTICE =
  'No content may be copied, reproduced, or distributed without prior written permission from Digivibz.';

/* ------------------------------------------------------------------ 04 */
export const ACCURACY_COPY =
  'Digivibz takes reasonable steps to ensure the information published on this website is accurate and up to date.';

export const ACCURACY_NOTICE =
  'However, we do not guarantee that all content is free from errors or omissions, and we reserve the right to update or correct information at any time without prior notice.';

/* ------------------------------------------------------------------ 05 */
export const EXTERNAL_COPY =
  'This website may contain links to third-party websites for reference or convenience.';

export const EXTERNAL_NOTICE =
  'Digivibz does not control these websites and is not responsible for their content, accuracy, or privacy practices. Visiting linked sites is at your own discretion.';

/* ------------------------------------------------------------------ 06 */
export const LIABILITY_COPY =
  'Digivibz is not liable for any direct, indirect, or incidental damages arising from the use of this website or reliance on the information it contains.';

export const LIABILITY_RISK = 'Use of this website is at your own risk.';

/* ------------------------------------------------------------------ 07 */
export const GOVERNING_COPY =
  'This Legal Notice and your use of this website are governed by the laws applicable in the jurisdiction where Digivibz operates, without regard to conflict of law principles.';

/* ------------------------------------------------------------------ 08 */
export const RELATED_COPY =
  'This Legal Notice should be read alongside our Privacy Policy, Terms and Conditions, Refund and Return Policy, and Marketing Results Disclaimer, which together govern your relationship with Digivibz.';

/** Cross-links shown as chips in section 08 and as nodes in the governance map. */
export const POLICY_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy', icon: Lock },
  { label: 'Terms and Conditions', href: '/terms', icon: Handshake },
  { label: 'Refund and Return Policy', href: '/refund-policy', icon: HandCoins },
  { label: 'Marketing Results Disclaimer', href: '/marketing-disclaimer', icon: Ban },
] as const;

/* ------------------------------------------------------------------ 09 */
export const CHANGES_COPY = [
  'Digivibz reserves the right to update this Legal Notice at any time to reflect changes in our business or applicable regulations.',
  'Continued use of this website after updates are posted constitutes acceptance of the revised notice.',
] as const;

/* ------------------------------------------------------------------ 10 */
export const LEGAL_CONTACT_BEFORE =
  'For questions regarding this Legal Notice or Digivibz\u2019s company information, please contact us at';
export const LEGAL_CONTACT_EMAIL = 'hello@digivibz.com';
export const LEGAL_CONTACT_AFTER = 'or through our website';
export const LEGAL_CONTACT_FORM_LABEL = 'contact form';

/* --------------------------------------------------- governance-map visual */

/**
 * Signature visual — hub-and-spoke "governance map": the relationship with
 * Digivibz at the center, the four related policies hanging off a dashed bus.
 * Labels are condensed visual captions; the verbatim sentence lives in
 * section 08.
 */
export const GOVERNANCE_MAP = {
  seal: 'Official',
  hub: { eyebrow: 'Governed together', title: 'Your relationship with Digivibz' },
  busLabel: 'Read together',
  captionRight: 'Four policies, one relationship',
  icon: Stamp,
} as const;
