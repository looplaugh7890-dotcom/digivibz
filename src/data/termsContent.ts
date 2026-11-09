import {
  Banknote,
  Copyright,
  Flag,
  HandCoins,
  Handshake,
  ListChecks,
  Lock,
  Mail,
  Network,
  PenLine,
  RefreshCw,
  RotateCw,
  ShieldAlert,
  ThumbsUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Copy + structure for the Terms & Conditions page (`/terms`).
 * Every statement here mirrors the client-provided terms text verbatim;
 * the page only decides how each block is presented.
 */

/** Sticky table-of-contents entries — also drive the section numbering. */
export interface TermsSectionMeta {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const TERMS_SECTIONS: TermsSectionMeta[] = [
  { id: 'services-provided', label: 'Services Provided', icon: Handshake },
  { id: 'payment-terms', label: 'Payment Terms', icon: Banknote },
  { id: 'confidentiality', label: 'Confidentiality', icon: Lock },
  { id: 'intellectual-property', label: 'Intellectual Property', icon: Copyright },
  { id: 'third-party-tools', label: 'Third-Party Tools and Platforms', icon: Network },
  { id: 'client-responsibilities', label: 'Client Responsibilities', icon: ListChecks },
  { id: 'contract-termination', label: 'Contract Termination', icon: Flag },
  { id: 'revision-policy', label: 'Revision Policy', icon: RefreshCw },
  { id: 'refund-policy', label: 'Refund Policy', icon: HandCoins },
  { id: 'marketing-permissions', label: 'Marketing Permissions', icon: ThumbsUp },
  { id: 'service-modifications', label: 'Service Modifications', icon: PenLine },
  { id: 'force-majeure', label: 'Force Majeure', icon: ShieldAlert },
  { id: 'amendments', label: 'Amendments', icon: RotateCw },
  { id: 'contact-us', label: 'Contact Us', icon: Mail },
];

/** Hero intro — shown under the page title (single paragraph, verbatim). */
export const TERMS_INTRO =
  'Welcome to Digivibz. By accessing or using our services, you agree to comply with the following Terms and Conditions. These terms form an agreement between you and Digivibz to ensure our working relationship is clear, fair, and built on mutual understanding.';

/** Quick-glance figures surfaced in the hero (all drawn from the terms body). */
export const TERMS_STATS = [
  { value: '30d', label: 'Written notice to terminate a project' },
  { value: '100%', label: 'Ownership transfers after full payment' },
  { value: '0', label: 'Project details shared without consent' },
  { value: 'Advance', label: 'Notice before service changes' },
] as const;

/* ------------------------------------------------------------------ 01 */
export const SERVICES_SENTENCES = [
  'Digivibz is a full-service digital marketing agency offering SEO, Google Ads, Meta Ads, AI automation, web design and development, content writing, social media management, video editing, ORM, GMB management, influencer marketing, and app development.',
  'The specific scope, deliverables, and timelines for your project will be outlined in your individual service agreement.',
] as const;

/* ------------------------------------------------------------------ 02 */
export const PAYMENT_INTRO = [
  'Payments must be made on time as agreed in your invoice or payment schedule. We accept bank transfer and other mutually agreed payment methods.',
] as const;

export const PAYMENT_ALERT =
  'Delayed payments may result in a pause or termination of services until the outstanding balance is settled.';

/* ------------------------------------------------------------------ 03 */
export const CONFIDENTIALITY_COPY =
  'Both parties agree to keep proprietary information confidential, including project plans, reports, strategies, and client data. Digivibz will not share this information with any third party without your consent.';

/* ------------------------------------------------------------------ 04 */
export const IP_COPY =
  'All work delivered by Digivibz, including custom strategies, designs, and content, remains the property of Digivibz until full payment is received. Once payment is complete, ownership transfers to the client, with the exception of any third-party tools or software used in the creation process.';

/** Ownership-flow visual labels (condensed — full text lives in section 04). */
export const OWNERSHIP_FLOW = {
  from: { eyebrow: 'Until full payment', title: 'Property of Digivibz', detail: 'Custom strategies, designs & content' },
  bridge: 'On full payment',
  to: { eyebrow: 'After payment is complete', title: 'Ownership to client', detail: 'Transfer to the client' },
  exception: 'Except third-party tools & software',
} as const;

/* ------------------------------------------------------------------ 05 */
export const THIRD_PARTY_INTRO =
  'To deliver effective digital marketing results, Digivibz may use third-party platforms such as Google Ads, Meta Ads, and various social media tools.';

export const THIRD_PARTY_CHIPS = ['Google Ads', 'Meta Ads', 'Social media tools'] as const;

export const THIRD_PARTY_NOTICE =
  'While we take every precaution to ensure smooth performance, we are not liable for downtime, errors, or policy changes on these platforms that may affect service outcomes.';

/* ------------------------------------------------------------------ 06 */
export const RESPONSIBILITIES_COPY =
  'Clients are expected to provide accurate information, timely feedback, and access to any resources required to carry out the agreed services.';

export const RESPONSIBILITIES_NOTICE =
  'Delays in communication or information from the client\u2019s side may affect project timelines.';

/* ------------------------------------------------------------------ 07 */
export const TERMINATION_FIGURE = '30';
export const TERMINATION_FIGURE_LABEL = 'Days\u2019 written notice';

export const TERMINATION_COPY = [
  'Clients may terminate a project by providing 30 days\u2019 written notice. Termination does not waive the client\u2019s responsibility to pay for services rendered up to the termination date.',
] as const;

/* ------------------------------------------------------------------ 08 */
export const REVISION_COPY = [
  'Each service package includes a set number of revisions, as specified in your service agreement. Additional revisions beyond this limit may incur extra charges, which will be communicated before any extra work begins.',
] as const;

/* ------------------------------------------------------------------ 09 */
export const TERMS_REFUND_COPY = [
  'Refunds, where applicable, will be issued according to the terms outlined in your service agreement. Refunds are not provided for services that have been completed in full.',
] as const;

/* ------------------------------------------------------------------ 10 */
export const MARKETING_COPY =
  'Digivibz may request permission to feature your project in our portfolio or case studies.';

export const MARKETING_PROMISE =
  'We will never share project details publicly without your prior consent.';

/* ------------------------------------------------------------------ 11 */
export const MODIFICATIONS_COPY =
  'Digivibz reserves the right to update, modify, or suspend any of our services to stay aligned with evolving market trends and platform changes.';

export const MODIFICATIONS_NOTICE =
  'Clients will be notified in advance of any changes that affect their ongoing services.';

/* ------------------------------------------------------------------ 12 */
export const FORCE_MAJEURE_COPY =
  'Digivibz is not liable for delays or service interruptions caused by events beyond our reasonable control, including natural disasters, internet outages, or third-party platform failures.';

/* ------------------------------------------------------------------ 13 */
export const AMENDMENTS_COPY =
  'Digivibz reserves the right to update these Terms and Conditions at any time. Clients will be notified of any changes, and continued use of our services after such updates constitutes acceptance of the revised terms.';

/* ------------------------------------------------------------------ 14 */
export const TERMS_CONTACT_BEFORE =
  'If you have any questions about these Terms and Conditions, please contact us at';
export const TERMS_CONTACT_EMAIL = 'hello@digivibz.com';
export const TERMS_CONTACT_AFTER = 'or through our website';
export const TERMS_CONTACT_FORM_LABEL = 'contact form';
