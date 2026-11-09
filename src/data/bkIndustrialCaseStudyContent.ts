/**
 * Copy for the BK Industrial Coatings case study (`/case-study/bk-industrial-coatings`).
 *
 * Client-supplied copy, used verbatim. The original bullet markers (✔ / ❌ /
 * 🖥️  📱 🎯 📅) are rendered as brand icons in the UI instead of emoji —
 * the wording itself is untouched.
 *
 * Note: the client doc's "Snapshot" heading arrived WITH four headline stats,
 * so they render as a riveted spec plate in the hero. The Results section
 * carries four measured outcomes plus the delivered-site board, which reuses
 * the same hero image at the client's request. The services-page screenshot
 * appears once as a layered inset in the hero board.
 */

import type { LucideIcon } from 'lucide-react';
import {
  CalendarCheck,
  Monitor,
  Smartphone,
  Target,
} from 'lucide-react';

import bkIndustrialSpreadImg from '../assets/images/bk_industrial_spread.png';
import bkIndustrialServicesImg from '../assets/images/bk_industrial_services.png';

/** Hero board + delivered-site results board + index-card visual. */
export const BKI_IMAGE = bkIndustrialSpreadImg;
/** Layered inset in the hero board. */
export const BKI_IMAGE_INSET = bkIndustrialServicesImg;

export const BKI = {
  eyebrow: 'BK Industrial Coatings · Case Study',
  /** Page h1 and index-card title. */
  title: 'A Complete Website Rebuild for a Heavy Equipment Ceramic Coating Company',
  meta: {
    industry: 'Industrial & Agricultural Equipment Coatings',
    timeline: '5 Months',
    channels: ['Website Design & Development'],
    objectiveLabel: 'Objective',
    objective:
      'Build a modern, conversion-focused website that reflects the quality of BK Industrial’s work and makes it easy for equipment owners to understand services and book appointments.',
  },
} as const;

export interface BkiSnapshotStat {
  value: string;
  label: string;
  icon: LucideIcon;
}

/** The client doc's "Snapshot" block — four headline stats. */
export const BKI_SNAPSHOT: BkiSnapshotStat[] = [
  { value: '7', label: 'Core Pages Designed and Built', icon: Monitor },
  { value: '100%', label: 'Mobile-Responsive Design', icon: Smartphone },
  { value: '4', label: 'Service Categories Clearly Structured', icon: Target },
  { value: '1', label: 'Integrated Booking Form for Equipment Appointments', icon: CalendarCheck },
];

export const BKI_SERVICES = {
  heading: 'Services We Provided',
  items: ['Website Design & Development'],
};

export const BKI_OVERVIEW = {
  heading: 'Project Overview',
  paras: [
    'BK Industrial Coatings specializes in ceramic coating, polishing, and protective treatments for heavy agricultural and industrial equipment, tractors, sprayers, combines, and trucks. Their craftsmanship spoke for itself in person, but their website didn’t reflect the same level of quality, making it hard for potential customers to understand their services or trust the brand before calling.',
    'Digivibz designed and built a completely new website from the ground up, one built to educate, build trust, and convert equipment owners into booked appointments.',
  ],
};

export const BKI_CHALLENGE = {
  heading: 'The Challenge',
  intro:
    'Equipment owners considering a ceramic coating service want to understand exactly what they’re paying for before committing, especially on expensive machinery. BK Industrial’s previous site didn’t give them that confidence.',
  problems: [
    'Outdated design that didn’t reflect the quality of the actual work',
    'No clear breakdown of services (coating, polishing, decal work, etc.)',
    'No visual proof of past projects or equipment types serviced',
    'No easy way to request an appointment or consultation',
    'No mobile-friendly experience for on-the-go equipment owners',
  ],
};

export const BKI_FRAMEWORK_HEADING = 'Our 5D Growth Framework';

export interface BkiPhase {
  number: string;
  name: string;
  intro: string;
  checks: string[];
}

export const BKI_PHASES: BkiPhase[] = [
  {
    number: '01',
    name: 'Discover',
    intro:
      'We started by understanding how equipment owners research a coating service before trusting their machinery to someone. This isn’t an impulse purchase, it’s a considered decision involving real investment.',
    checks: [
      'Research into how customers evaluate coating and equipment service providers',
      'Audit of the existing website’s structure and conversion gaps',
      'Review of service offerings to identify what needed its own dedicated page',
      'Assessment of visual assets and project photos available for use',
    ],
  },
  {
    number: '02',
    name: 'Design',
    intro:
      'With that research in place, we planned a site structure built to educate first and convert second, since trust has to come before a booking on equipment this valuable.',
    checks: [
      'Homepage structure leading with quality and trust signals',
      'Dedicated pages for each service: ceramic coating, Alumicoat, polishing, decal replacement',
      'Visual equipment showcase organized by type: tractors, sprayers, combines, trucks',
      'Clear path from browsing to booking an appointment',
    ],
  },
  {
    number: '03',
    name: 'Develop',
    intro: 'With the strategy locked in, we built out every page and component of the new site.',
    checks: [
      'Custom homepage with hero section, trust signals, and featured project photos',
      'Individual service pages explaining each coating and protection option in detail',
      'Equipment category pages showcasing the types of machinery serviced',
      'Service area section with map integration for coverage regions',
      'Testimonial section to reinforce credibility with real customer feedback',
      'FAQ section addressing common coating and maintenance questions',
      'Appointment request form connected to the booking workflow',
    ],
  },
  {
    number: '04',
    name: 'Deploy',
    intro: 'Once built and tested, we launched the complete site across all pages and devices.',
    checks: [
      'New website published with all core pages live',
      'Mobile-responsive design tested across devices',
      'Booking form activated and connected for lead capture',
      'Service and equipment pages linked throughout the site for easy navigation',
    ],
  },
  {
    number: '05',
    name: 'Detect',
    intro:
      'Launch was the starting point, not the finish line. We monitored how visitors interacted with the new site and refined based on real behavior.',
    checks: [
      'Page engagement reviewed to see which services drew the most interest',
      'Booking form submissions tracked and monitored',
      'Site performance and load speed checked across devices',
      'Content refined based on the questions customers actually asked',
    ],
  },
];

export const BKI_RESULTS_HEADING = 'Results';

export interface BkiResult {
  text: string;
  icon: LucideIcon;
}

export const BKI_RESULTS: BkiResult[] = [
  { text: 'Complete website rebuild across 7 core pages', icon: Monitor },
  { text: 'Fully responsive design across mobile, tablet, and desktop', icon: Smartphone },
  { text: 'Clear service structure replacing a single, confusing service list', icon: Target },
  {
    text: 'Streamlined booking path from homepage to appointment request',
    icon: CalendarCheck,
  },
];

export const BKI_TAKEAWAYS = {
  heading: 'Key Takeaways',
  paras: [
    'BK Industrial’s website finally matched the quality of their actual work, giving equipment owners the clarity and confidence they needed before trusting their machinery to the team.',
    'Before this project, a potential customer landing on the old site had no easy way to understand what BK Industrial actually offered or whether the team could be trusted with expensive equipment. Now, every service has its own clear explanation, every equipment type has its own showcase, and every visitor has an obvious next step toward booking.',
    'This mattered because equipment owners aren’t making a quick decision, they’re trusting someone with machinery that costs real money to repair or replace if something goes wrong. A confusing or outdated website made that trust harder to earn, no matter how good the actual work was.',
  ],
};

export const BKI_WHY_WORKED = {
  heading: 'Why This Worked',
  paras: [
    'For a service this specialized, the website has to do the convincing before the phone call happens. By focusing entirely on clear service breakdowns, real project visuals, and an easy path to booking through our 5D Growth Framework, we gave BK Industrial a site that builds trust the same way their craftsmanship does in person.',
    'A tractor owner comparing coating providers isn’t just looking for a price, they’re looking for proof that whoever touches their equipment knows what they’re doing.',
  ],
};

export const BKI_CTA = {
  title: 'Ready for a Website That Reflects the Quality of Your Work?',
  body: 'Whether you’re in industrial services, equipment care, or another specialized trade, our 5D Growth Framework helps you build a website that educates, builds trust, and converts visitors into booked customers.',
  button: 'Book Your Free Strategy Session Today',
};

/** Compact entries for the generic index card / homepage modal. */
export const BKI_INDEX_SUMMARY = BKI.meta.objective;
export const BKI_MODAL_CHALLENGES = BKI_CHALLENGE.problems;
/** Modal "what we did": the phase intros. */
export const BKI_MODAL_APPROACH = BKI_PHASES.map((p) => p.intro);
/** Index/modal results — numeric highlights first (row slices to 3). */
export const BKI_INDEX_RESULTS = [
  { value: '7', label: 'Core pages designed and built' },
  { value: '100%', label: 'Mobile-responsive design' },
  { value: '4', label: 'Service categories clearly structured' },
  { value: '1', label: 'Integrated booking form for equipment appointments' },
];
