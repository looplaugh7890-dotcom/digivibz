import {
  Archive,
  BadgeCheck,
  Ban,
  CircleX,
  ClipboardList,
  Copyright,
  FileText,
  HandCoins,
  Mail,
  Package,
  RefreshCw,
  RotateCw,
  Scale,
  ShieldCheck,
  UserX,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Copy + structure for the Refund & Return Policy page (`/refund-policy`).
 * Every statement here mirrors the client-provided policy text verbatim;
 * the page only decides how each block is presented.
 */

/** Sticky table-of-contents entries — also drive the section numbering. */
export interface PolicySectionMeta {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const POLICY_SECTIONS: PolicySectionMeta[] = [
  { id: 'general-overview', label: 'General Overview', icon: FileText },
  { id: 'revision-policy', label: 'Revision Policy', icon: RefreshCw },
  { id: 'refund-eligibility', label: 'Refund Eligibility', icon: ShieldCheck },
  { id: 'no-refund-after-delivery', label: 'No Refund After Initial Delivery', icon: CircleX },
  { id: 'non-refundable-situations', label: 'Non-Refundable Situations', icon: Ban },
  { id: 'refund-request-procedure', label: 'Refund Request Procedure', icon: ClipboardList },
  { id: 'refund-amount', label: 'Refund Amount & Deductions', icon: HandCoins },
  { id: 'ownership-copyright', label: 'Ownership & Copyright', icon: Copyright },
  { id: 'quality-assurance', label: 'Quality Assurance', icon: BadgeCheck },
  { id: 'delivery-policy', label: 'Delivery Policy', icon: Package },
  { id: 'project-inactivity', label: 'Project Inactivity & Reactivation', icon: UserX },
  { id: 'record-maintenance', label: 'Record Maintenance', icon: Archive },
  { id: 'limitation-liability', label: 'Limitation of Liability', icon: Scale },
  { id: 'policy-updates', label: 'Policy Updates', icon: RotateCw },
  { id: 'contact-us', label: 'Contact Us', icon: Mail },
];

/** Hero intro — shown under the page title. */
export const POLICY_INTRO = {
  lead: 'Transparency is our promise. This Refund & Return Policy outlines the terms under which refunds, revisions, and returns are processed for all services provided by Digivibz.',
  sub: 'By engaging with our website or purchasing our services, you acknowledge and agree to the terms outlined below.',
} as const;

/** Quick-glance figures surfaced in the hero (all drawn from the policy body). */
export const POLICY_STATS = [
  { value: '90%', label: 'Maximum refund before work begins' },
  { value: '48h', label: 'Standard revision turnaround' },
  { value: '3–5', label: 'Business days to review a request' },
  { value: '5–10', label: 'Business days to process a refund' },
] as const;

export const GENERAL_OVERVIEW = [
  'Digivibz delivers custom digital marketing, branding, and web development solutions tailored to your business goals. Our team operates with transparency, dedication, and accountability at every stage of your project.',
  'Because our services involve significant creative, technical, and strategic effort, refund and revision requests are subject to the conditions listed in this policy. Please review this page carefully before placing an order.',
] as const;

export const REVISION_INTRO =
  'Revisions are a core part of our creative process. Digivibz provides revisions based on the package selected at the time of order.';

export const REVISION_RULES = [
  'Clients receive free revisions within the scope of the original concept and brief.',
  'Major revisions that alter the original project scope, strategy, or approved design will be treated as a new order and billed accordingly.',
  'Standard revision turnaround time is 48 business hours, depending on the nature of the request.',
  'Unlimited revisions, where included in a package, apply only if the core concept remains unchanged.',
  'Revision requests made after project delivery has been approved will not be entertained.',
] as const;

export const ELIGIBILITY_INTRO =
  'Because every project is custom-tailored, Digivibz cannot offer unconditional refunds once work has begun. Refunds apply only before the delivery of the initial concept or first draft. Once that stage is reached, the client is eligible for revisions, not refunds.';

export const ELIGIBILITY_LEAD = 'A refund request may be considered only if:';

export const ELIGIBILITY_RULES = [
  'The project has not yet reached the initial concept or first delivery stage.',
  'The request is submitted within 24 to 48 hours of order placement.',
  'No work, concept, or strategy presentation has been shared.',
  'The reason for the refund is valid and approved through Digivibz’s internal review process (for example, a duplicate payment or a service that was never initiated).',
] as const;

export const NO_REFUND_DELIVERY =
  'Once the initial concept, first draft, or any deliverable has been presented, the project enters the revision phase and is no longer eligible for a refund. Clients may instead request revisions based on their purchased package. This approach protects the time and creative effort invested in your project while keeping room for improvements.';

export const NON_REFUNDABLE_LEAD = 'Refunds will not be granted if:';

export const NON_REFUNDABLE_RULES = [
  'The client has approved or requested changes to the initial concept.',
  'The client’s reason for the request is subjective, such as a change of mind.',
  'The client has been unresponsive for more than 14 days after project initiation.',
  'The client has engaged another service provider for the same project.',
  'The client delays or fails to provide required feedback, information, or materials.',
  'The issue arises from factors outside Digivibz’s control, such as hosting or third-party platform issues.',
] as const;

export const PROCEDURE_LEAD = 'To request a refund:';

export const PROCEDURE_STEPS = [
  'Contact us by email, phone, or live chat on our website.',
  'Include your Order ID, service type, and the reason for your request.',
  'Our team will review your case and respond within 3 to 5 business days.',
  'Once approved, the refund is processed through your original payment method, with a confirmation email sent to you.',
  'Processing time typically ranges from 5 to 10 business days, depending on your bank or payment provider.',
] as const;

export const AMOUNTS_INTRO =
  'Approved refunds are calculated based on total project value, excluding applicable taxes or transaction fees, as follows:';

/** Refund tiers — the headline data visual of the page. */
export interface RefundTier {
  percent: number;
  title: string;
  window: string;
  detail: string;
}

export const REFUND_TIERS: RefundTier[] = [
  {
    percent: 90,
    title: 'Before Project Initiation',
    window: 'Cancelled within 24 to 48 hours of finalization',
    detail:
      '90% refund, with 10% retained as an administrative and processing fee.',
  },
  {
    percent: 60,
    title: 'After Initiation, Before First Delivery',
    window: '48 hours or later, before the initial concept',
    detail:
      '60% refund, to account for time and creative labor already invested.',
  },
  {
    percent: 0,
    title: 'After Initial Concept or First Delivery',
    window: 'Once any deliverable has been presented',
    detail:
      'No refund applies. The project instead qualifies for revisions under the client’s purchased package.',
  },
];

export const AMOUNTS_NOTE =
  'Approved refunds are processed within 10 business days of internal approval.';

export const OWNERSHIP_COPY =
  'Upon issuing a refund, all design, development, and content rights revert to Digivibz. Clients may not retain, use, or claim ownership of any files, drafts, or materials shared before or during the project. If such materials are used after a refund has been processed, Digivibz reserves the right to pursue action under applicable copyright and intellectual property laws.';

export const QUALITY_COPY =
  'Every Digivibz project is built with precision, research, and strategic alignment to the client’s brief. We stand by our commitment to originality, quality, and professionalism, and we address any deviation from agreed requirements through our revision process. This satisfaction guarantee does not entitle a client to a refund once a project has been approved or completed.';

export const DELIVERY_RULES = [
  'Deliverables are shared via email or through your client dashboard.',
  'Delivery timelines depend on the selected service package and the client’s responsiveness in providing required inputs.',
  'Rush delivery is available at an additional cost for urgent needs.',
  'A project is considered complete once final deliverables are shared and approved by the client.',
] as const;

export const INACTIVITY_COPY =
  'If a client is unresponsive for more than 30 days, the project will be marked as closed. Reopening a closed project may require a reactivation fee, and prior work and timelines may be reassessed at that point.';

export const RECORDS_COPY =
  'Digivibz retains project archives for up to six months after delivery. Files can be requested at no cost within that period; requests made afterward may incur a nominal administrative fee.';

export const LIABILITY_COPY =
  'Digivibz is not liable for delays caused by client unresponsiveness, losses arising from third-party platform issues, or indirect or consequential damages. Our maximum liability in any case will not exceed the total amount paid for the specific service.';

export const UPDATES_COPY =
  'Digivibz reserves the right to amend this policy at any time. Updates will be posted on this page, and clients are encouraged to review it periodically.';

export const CONTACT_INTRO =
  'If you have questions about our Refund & Return Policy, our team is here to help.';

export const CONTACT_CARDS = [
  { label: 'Email', value: 'hello@digivibz.com', href: 'mailto:hello@digivibz.com' },
  { label: 'Phone', value: '+1 (800) 555-DIGI', href: 'tel:+18005553444' },
  { label: 'Support Hours', value: 'Monday to Friday, 9:00 AM to 6:00 PM (CST)', href: null },
] as const;

export const CONTACT_RESPONSE =
  'We aim to respond to all refund and support requests within 2 to 3 business days. All refund, revision, or dispute-related correspondence should be made in writing for record-keeping purposes.';

export const CONTACT_ACKNOWLEDGMENT =
  'By placing an order with Digivibz, you acknowledge that you have read, understood, and agreed to the terms of this Refund & Return Policy.';
