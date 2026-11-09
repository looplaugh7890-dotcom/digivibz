import { CaseStudy, Testimonial, FAQItem, ServicePhase } from '../types';

// Bundled via ESM imports so Vite fingerprints them into /assets and rewrites
// to relative paths — literal '/src/assets/...' strings only resolve in dev
// and would 404 on static hosting (Hostinger).
import revivalResearchImg from '../assets/images/revival_research.png';
import cupsnchaiImg from '../assets/images/cupsnchai.jpg';
import schaeferLyndonImg from '../assets/images/schaefer_lyndon.jpg';
import allAboutConcreteImg from '../assets/images/all_about_concrete.png';
import roofclaimImg from '../assets/images/roofclaim.png';
import lungNSleepImg from '../assets/images/lung_n_sleep.png';
import plumbexImg from '../assets/images/plumbex.png';
import brightsparkImg from '../assets/images/brightspark_listing.png';
import bkIndustrialImg from '../assets/images/bk_industrial_spread.png';
import uavCoachImg from '../assets/images/uav_guide.png';
import lumiereCreativesImg from '../assets/images/lumiere_creatives_a.png';
import keyguardDashboardImg from '../assets/images/keyguard_dashboard.png';
import rapidrestoreDashboardImg from '../assets/images/rapidrestore_dashboard.png';
import {
  REVIVAL_INDEX_RESULTS,
  REVIVAL_INDEX_SUMMARY,
  REVIVAL_MODAL_APPROACH,
  REVIVAL_MODAL_CHALLENGES,
} from './revivalCaseStudyContent';
import {
  CUPS_INDEX_RESULTS,
  CUPS_INDEX_SUMMARY,
  CUPS_MODAL_APPROACH,
  CUPS_MODAL_CHALLENGES,
} from './cupsnchaiCaseStudyContent';
import {
  SCHAEFER_INDEX_RESULTS,
  SCHAEFER_INDEX_SUMMARY,
  SCHAEFER_MODAL_APPROACH,
  SCHAEFER_MODAL_CHALLENGES,
} from './schaeferLyndonCaseStudyContent';
import {
  AAC_INDEX_RESULTS,
  AAC_INDEX_SUMMARY,
  AAC_MODAL_APPROACH,
  AAC_MODAL_CHALLENGES,
} from './allAboutConcreteCaseStudyContent';
import {
  ROOF_INDEX_RESULTS,
  ROOF_INDEX_SUMMARY,
  ROOF_MODAL_APPROACH,
  ROOF_MODAL_CHALLENGES,
} from './roofclaimCaseStudyContent';
import {
  LNS_INDEX_RESULTS,
  LNS_INDEX_SUMMARY,
  LNS_MODAL_APPROACH,
  LNS_MODAL_CHALLENGES,
} from './lungNSleepCaseStudyContent';
import {
  PLX_INDEX_RESULTS,
  PLX_INDEX_SUMMARY,
  PLX_MODAL_APPROACH,
  PLX_MODAL_CHALLENGES,
} from './plumbexCaseStudyContent';
import {
  BSP_INDEX_RESULTS,
  BSP_INDEX_SUMMARY,
  BSP_MODAL_APPROACH,
  BSP_MODAL_CHALLENGES,
} from './brightsparkCaseStudyContent';
import {
  BKI_INDEX_RESULTS,
  BKI_INDEX_SUMMARY,
  BKI_MODAL_APPROACH,
  BKI_MODAL_CHALLENGES,
} from './bkIndustrialCaseStudyContent';
import {
  UAV_INDEX_RESULTS,
  UAV_INDEX_SUMMARY,
  UAV_MODAL_APPROACH,
  UAV_MODAL_CHALLENGES,
} from './uavCoachCaseStudyContent';
import {
  LUM_INDEX_RESULTS,
  LUM_INDEX_SUMMARY,
  LUM_MODAL_APPROACH,
  LUM_MODAL_CHALLENGES,
} from './lumiereCaseStudyContent';
import {
  KG_INDEX_RESULTS,
  KG_INDEX_SUMMARY,
  KG_MODAL_APPROACH,
  KG_MODAL_CHALLENGES,
} from './keyguardCaseStudyContent';
import {
  RR_INDEX_RESULTS,
  RR_INDEX_SUMMARY,
  RR_MODAL_APPROACH,
  RR_MODAL_CHALLENGES,
} from './rapidRestoreCaseStudyContent';

export const CASE_STUDIES: CaseStudy[] = [
  {
    /* Full bespoke layout at `/case-study/revival-research`
       (RevivalResearchCaseStudyPage) — this entry powers the index card,
       the homepage carousel, and the modal preview. */
    id: 'revival-research',
    category: 'Clinical Research',
    industry: 'Clinical Research / Healthcare',
    title:
      'How We Helped a Clinical Research Organization Scale Patient Recruitment Through Digital Growth',
    summary: REVIVAL_INDEX_SUMMARY,
    image: revivalResearchImg,
    challenges: REVIVAL_MODAL_CHALLENGES,
    whatWeDid: REVIVAL_MODAL_APPROACH,
    results: REVIVAL_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/cups-n-chai`
       (CupsNChaiCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'cups-n-chai',
    category: 'South Asian Café',
    industry: 'Restaurant / Food & Beverage (South Asian Café)',
    title: 'Building a Local Brand Presence for a South Asian Chai Café',
    summary: CUPS_INDEX_SUMMARY,
    image: cupsnchaiImg,
    challenges: CUPS_MODAL_CHALLENGES,
    whatWeDid: CUPS_MODAL_APPROACH,
    results: CUPS_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/schaefer-lyndon`
       (SchaeferLyndonCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'schaefer-lyndon',
    category: 'Self-Storage',
    industry: 'Self-Storage',
    title: 'Driving Digital Growth for a Local Self-Storage Provider',
    summary: SCHAEFER_INDEX_SUMMARY,
    image: schaeferLyndonImg,
    challenges: SCHAEFER_MODAL_CHALLENGES,
    whatWeDid: SCHAEFER_MODAL_APPROACH,
    results: SCHAEFER_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/all-about-concrete`
       (AllAboutConcreteCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'all-about-concrete',
    category: 'Concrete Contracting',
    industry: 'Concrete Contracting (Commercial & Residential)',
    title: 'Strengthening Digital Visibility for a Family-Owned Concrete Contractor',
    summary: AAC_INDEX_SUMMARY,
    image: allAboutConcreteImg,
    challenges: AAC_MODAL_CHALLENGES,
    whatWeDid: AAC_MODAL_APPROACH,
    results: AAC_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/roof-claim`
       (RoofClaimCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'roof-claim',
    category: 'Roofing Services',
    industry: 'Roofing Services',
    title:
      'How We Helped a Roofing Company Replace Referrals With a Predictable, Multi-Channel Lead System',
    summary: ROOF_INDEX_SUMMARY,
    image: roofclaimImg,
    challenges: ROOF_MODAL_CHALLENGES,
    whatWeDid: ROOF_MODAL_APPROACH,
    results: ROOF_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/lung-n-sleep`
       (LungNSleepCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'lung-n-sleep',
    category: 'Pulmonology & Sleep Medicine',
    industry: 'Pulmonology & Sleep Medicine',
    title: 'Building a Complete Digital Presence for a Multi-Specialty Pulmonology & Sleep Clinic',
    summary: LNS_INDEX_SUMMARY,
    image: lungNSleepImg,
    challenges: LNS_MODAL_CHALLENGES,
    whatWeDid: LNS_MODAL_APPROACH,
    results: LNS_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/plumbex`
       (PlumbexCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'plumbex',
    category: 'Plumbing Services',
    industry: 'Plumbing Services',
    title: 'How We Helped a Plumbing Company Turn Emergency Searches Into Booked Jobs',
    summary: PLX_INDEX_SUMMARY,
    image: plumbexImg,
    challenges: PLX_MODAL_CHALLENGES,
    whatWeDid: PLX_MODAL_APPROACH,
    results: PLX_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/brightspark-electrical`
       (BrightSparkCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'brightspark-electrical',
    category: 'Electrical Services',
    industry: 'Electrical Services',
    title:
      'How Google Business Profile Optimization Turned Local Searches Into Booked Electricians',
    summary: BSP_INDEX_SUMMARY,
    image: brightsparkImg,
    challenges: BSP_MODAL_CHALLENGES,
    whatWeDid: BSP_MODAL_APPROACH,
    results: BSP_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/bk-industrial-coatings`
       (BkIndustrialCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'bk-industrial-coatings',
    category: 'Industrial & Agricultural Equipment Coatings',
    industry: 'Industrial & Agricultural Equipment Coatings',
    title: 'A Complete Website Rebuild for a Heavy Equipment Ceramic Coating Company',
    summary: BKI_INDEX_SUMMARY,
    image: bkIndustrialImg,
    challenges: BKI_MODAL_CHALLENGES,
    whatWeDid: BKI_MODAL_APPROACH,
    results: BKI_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/uav-coach-academy`
       (UavCoachCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'uav-coach-academy',
    category: 'Drone Training & Aviation Education',
    industry: 'Drone Training & Aviation Education',
    title:
      'Ranking #1 for Competitive Drone Certification Keywords Through Strategic Pillar Content',
    summary: UAV_INDEX_SUMMARY,
    image: uavCoachImg,
    challenges: UAV_MODAL_CHALLENGES,
    whatWeDid: UAV_MODAL_APPROACH,
    results: UAV_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/lumiere-fine-jewelry`
       (LumiereCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'lumiere-fine-jewelry',
    category: 'Jewelry & Luxury Retail',
    industry: 'Jewelry & Luxury Retail',
    title:
      'Turning Instagram and Facebook Into a Primary Sales Channel for a Luxury Jewelry Retailer',
    summary: LUM_INDEX_SUMMARY,
    image: lumiereCreativesImg,
    challenges: LUM_MODAL_CHALLENGES,
    whatWeDid: LUM_MODAL_APPROACH,
    results: LUM_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/keyguard-locksmith`
       (KeyGuardCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'keyguard-locksmith',
    category: 'Locksmith Services',
    industry: 'Locksmith Services',
    title: 'Turning Emergency Searches Into Booked Locksmith Jobs Through Google Ads',
    summary: KG_INDEX_SUMMARY,
    image: keyguardDashboardImg,
    challenges: KG_MODAL_CHALLENGES,
    whatWeDid: KG_MODAL_APPROACH,
    results: KG_INDEX_RESULTS,
  },
  {
    /* Full bespoke layout at `/case-study/rapidrestore`
       (RapidRestoreCaseStudyPage) — powers the index card, homepage
       carousel, and modal preview. */
    id: 'rapidrestore',
    category: 'Water Damage Restoration',
    industry: 'Water Damage Restoration',
    title: 'Getting Found in AI Overviews and Answer Engines During Water Damage Emergencies',
    summary: RR_INDEX_SUMMARY,
    image: rapidrestoreDashboardImg,
    challenges: RR_MODAL_CHALLENGES,
    whatWeDid: RR_MODAL_APPROACH,
    results: RR_INDEX_RESULTS,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'James Carter',
    role: 'Founder',
    quote: 'We were tired of guessing what worked. DIGIVIBZ brought clarity, structure, and AI-driven insights. The result? Higher-quality leads and nearly 4x revenue growth.',
    rating: 5
  },
  {
    id: '2',
    author: 'Daniel Wright',
    role: 'CEO',
    quote: "DIGIVIBZ didn't just run campaigns; they built a revenue engine for our business. We scaled faster, spent smarter, and finally saw real ROI.",
    rating: 5
  },
  {
    id: '3',
    author: 'Andrew Collins',
    role: 'Managing Director',
    quote: 'Finally, a team that understands growth, not just tactics. DIGIVIBZ built a system that consistently delivers sales.',
    rating: 4
  },
  {
    id: '4',
    author: 'Sarah Jenkins',
    role: 'E-commerce Director',
    quote: "Scaling an online store in a crowded market felt impossible until we partnered with DIGIVIBZ. Their data-driven approach to customer acquisition didn't just increase traffic it transformed our conversion rates and doubled our repeat customer base.",
    rating: 5
  },
  {
    id: '5',
    author: 'Marcus Thorne',
    role: 'Principal Agent',
    quote: 'In real estate, lead quality is everything. DIGIVIBZ replaced our generic marketing with a precision-targeted system that puts us in front of serious buyers. Our cost-per-lead dropped by 40% while our closing rate reached an all-time high.',
    rating: 5
  },
  {
    id: '6',
    author: 'Dr. Elena Rossi',
    role: 'Clinical Director',
    quote: "DIGIVIBZ handled our digital presence with the professionalism and compliance our industry requires. They built a patient-acquisition funnel that filled our booking calendar within months. It's the most consistent growth we've seen in a decade.",
    rating: 4
  },
  {
    id: '7',
    author: 'Liam O’Shea',
    role: 'Co-Founder & CTO',
    quote: 'We needed to move fast and break through the noise. DIGIVIBZ delivered a full-funnel strategy that perfectly aligned our brand with our target users. Their ability to turn complex tech into a compelling digital story was the key to our successful Series A round.',
    rating: 5
  },
  {
    id: '8',
    author: 'Sophia Bennett',
    role: 'Senior Partner',
    quote: "Most agencies talk about clicks. DIGIVIBZ talks about revenue and firm growth. They've refined our digital footprint to attract high-value clients we previously couldn't reach. They are a strategic partner, not just a service provider.",
    rating: 5
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'What does a digital marketing agency do for businesses?',
    answer: 'A digital marketing agency helps businesses attract the right customers and turn that attention into consistent revenue. At DIGIVIBZ, we go further. Instead of just running campaigns, we build an AI-powered revenue system.'
  },
  {
    id: 2,
    question: 'How much does it cost to hire a digital marketing agency in the USA?',
    answer: "Costs vary depending on your goals, industry, and the services you need. At DIGIVIBZ, we don't offer one-size-fits-all pricing. Every engagement starts with a free Growth Audit where we understand your business and recommend a system tailored to your revenue goals."
  },
  {
    id: 3,
    question: 'What results can you expect from a professional digital marketing agency?',
    answer: 'From a results-driven agency, you should expect consistent leads, lower cost per acquisition, and real revenue growth - not just traffic reports. Our clients average 4× revenue growth and a 95% satisfaction rate, all delivered through our AI-powered 5D Growth Framework built to produce measurable results.'
  },
  {
    id: 4,
    question: 'How is AI changing digital marketing in 2026?',
    answer: 'AI is replacing guesswork with data, enabling smarter targeting, faster optimization, and more personalized customer experiences at scale. At DIGIVIBZ, we leverage AI across every stage of our 5D Growth Framework to identify opportunities, automate campaigns, and continuously improve performance.'
  },
  {
    id: 5,
    question: 'Why choose DigiVibz as your digital marketing agency in Florida?',
    answer: "Because we don't just run campaigns, we build AI-powered revenue systems. Unlike traditional agencies, DIGIVIBZ combines AI-driven insights with expert strategy to deliver consistent leads, measurable ROI, and predictable growth."
  },
  {
    id: 6,
    question: 'Does DigiVibz work with startups, small businesses, and enterprises?',
    answer: 'Yes, we work with businesses of all sizes, from early-stage startups to established enterprises.'
  },
  {
    id: 7,
    question: 'Will I get a personalized digital marketing plan for my business?',
    answer: 'Yes, Every strategy is built from scratch using real data, deep audience insights, and your specific revenue goals. Our 5D Growth Framework then structures everything into a clear, step-by-step system covering research, design, development, deployment, and optimization so every decision is intentional, every channel is connected, and every effort moves you closer to predictable revenue growth.'
  },
  {
    id: 8,
    question: 'How fast will I see results with DigiVibz?',
    answer: 'Most US businesses see measurable leads and improved sales within 60–90 days when our internet marketing services apply its 5D system.'
  },
  {
    id: 9,
    question: 'How can Digivibz help generate leads and revenue for my business?',
    answer: 'We build an end-to-end AI-powered revenue system that attracts high-intent visitors, converts them into leads, and turns those leads into paying customers. Every channel (SEO, paid media, content, and automation) works together as one connected strategy.'
  }
];

export const FRAMEWORK_STEPS: ServicePhase[] = [
  {
    id: 1,
    stepNumber: 'STEP 1',
    name: 'Discover',
    subtitle: 'Find what your customers want and where opportunities exist.',
    description: 'We start by understanding your business, your customers, and your market. Using AI-driven insights, we identify:',
    features: [
      'What your ideal customers are actively looking for',
      'Why competitors are winning and where they are weak',
      'Which opportunities will generate the highest return'
    ],
    result: 'Clear direction, smarter decisions, and no wasted budget.'
  },
  {
    id: 2,
    stepNumber: 'STEP 2',
    name: 'Design',
    subtitle: 'Create conversion-focused brand and user experience.',
    description: 'Design isn’t about looking good. It’s about making people say, “This is exactly what I need.” We design conversion-focused experiences that help visitors:',
    features: [
      'Instantly understand why your business is the right choice',
      'Feel confident and safe engaging with your brand',
      'Move smoothly from interest to taking action'
    ],
    result: 'More trust, better engagement, and higher-quality leads that are ready to convert.'
  },
  {
    id: 3,
    stepNumber: 'STEP 3',
    name: 'Develop',
    subtitle: 'Build automated systems that generate leads.',
    description: 'This is where your growth system is built. We develop durable revenue infrastructure:',
    features: [
      'Conversion-focused websites and landing pages',
      'Content and automation that work 24/7',
      'AI-supported assets refined by human strategy'
    ],
    result: 'A digital system that generates leads and sales even when you’re not working.'
  },
  {
    id: 4,
    stepNumber: 'STEP 4',
    name: 'Deploy',
    subtitle: 'Launch across SEO, ads, and digital channels.',
    description: 'We activate your growth across multiple digital channels, with one clear goal: revenue.',
    features: [
      'SEO to attract high-intent buyers',
      'Paid media optimized for conversions, not just clicks',
      'Content that supports long-term sustainable growth'
    ],
    result: 'Consistent traffic, better leads, and controlled scaling.'
  },
  {
    id: 5,
    stepNumber: 'STEP 5',
    name: 'Detect',
    subtitle: 'Track, optimize, and scale winning strategies.',
    description: 'Growth is not a one-time launch. It’s an ongoing process. We continuously:',
    features: [
      'Track performance in real time with precision telemetry',
      'Improve what works and fix what doesn’t',
      'Scale winning strategies with confidence'
    ],
    result: 'Predictable growth, better ROI, and long-term success.'
  }
];

export const SOLUTIONS_SERVICES = [
  {
    category: '1. DISCOVER - Market Intelligence & Research',
    color: '#C61A1A',
    items: ['Market Research', 'SEO Research', 'Audience Targeting']
  },
  {
    category: '2. DESIGN - Creative Strategy & Brand Experience',
    color: '#A51615',
    items: ['Web Designing', 'Graphic Designing', 'Content Writing']
  },
  {
    category: '3. DEVELOP - Revenue Infrastructure',
    color: '#8A1111',
    items: ['Web Development', 'Application Development', 'AI Automation']
  },
  {
    category: '4. DEPLOY - Client Acquisition System',
    color: '#6E0D0D',
    items: [
      'Pay Per Click (PPC)',
      'Social Media Marketing',
      'Google My Business',
      'Search Engine Optimization (SEO)',
      'Influencer Marketing',
      'Video Editing & Marketing',
      'Online Reputation Management'
    ]
  },
  {
    category: '5. DETECT - Growth Compounding Optimization & Scaling',
    color: '#4A0909',
    items: ['Conversion Optimization', 'Campaign Performance Tracking']
  }
];

export const TRADITIONAL_VS_DIGIVIBZ = {
  traditional: [
    'Starts with selling services',
    'Launches campaigns without a clear growth strategy',
    'Works in silos: traffic here, website there',
    'Optimises for activity, not revenue',
    'Reacts slowly to what’s not working',
    'Sends reports that explain numbers but don’t guide decisions'
  ],
  digivibz: [
    'Starts with AI-driven discovery to remove guesswork',
    'Builds a clear, step-by-step revenue system',
    'Connects every channel into one strategy',
    'Optimises for leads, sales, and ROI',
    'Improves performance in real time',
    'Delivers clear insights, actions, and next steps'
  ]
};
