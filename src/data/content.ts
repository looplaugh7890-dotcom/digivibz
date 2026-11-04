import { CaseStudy, Testimonial, FAQItem, ServicePhase } from '../types';

// Bundled via ESM imports so Vite fingerprints them into /assets and rewrites
// to relative paths — literal '/src/assets/...' strings only resolve in dev
// and would 404 on static hosting (Hostinger).
import caseStudyHomeServicesImg from '../assets/images/case_study_home_services_1793265215637.jpg';
import caseStudyFitnessGymImg from '../assets/images/case_study_fitness_gym_1793265216970.jpg';
import caseStudyEcommerceImg from '../assets/images/case_study_ecommerce_1793265216797.jpg';
import caseStudyHealthcareImg from '../assets/images/case_study_healthcare_1793265216984.jpg';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'home-services',
    category: 'Home services',
    industry: 'Home Services / Local Services',
    title: 'A local services business transformed visibility into dependable...',
    summary: 'Our 5D Growth Framework helped turn local visibility into consistent, high-converting monthly revenue with a tailored booking flow.',
    image: caseStudyHomeServicesImg,
    challenges: [
      'Low-quality leads that drained sales bandwidth',
      'Poor local visibility across primary service zip codes',
      'Inconsistent monthly revenue with seasonal dips'
    ],
    whatWeDid: [
      'Our 5D Growth Framework helped turn visibility into consistent revenue',
      'Built a conversion-focused local website and streamlined lead flow',
      'Optimised SEO, paid media, and automated follow-ups as one unified system'
    ],
    results: [
      { label: 'Increase in qualified leads', value: '4×' },
      { label: 'Revenue growth', value: '2.9×' },
      { label: 'Lower cost per enquiry', value: '58%' }
    ]
  },
  {
    id: 'fitness-gyms',
    category: 'Fitness centers & gyms',
    industry: 'Fitness Centers & Gyms',
    title: 'A fitness brand increased enquiries and converted more leads...',
    summary: 'Turned casual website visitors into signed annual members by coupling automated nurturing funnels with high-intent social and local ads.',
    image: caseStudyFitnessGymImg,
    challenges: [
      'Few membership enquiries and stagnant walk-ins',
      'Low online engagement across digital touchpoints',
      'Many leads dropping off during trial sign-up stage'
    ],
    whatWeDid: [
      'Used our 5D Growth Framework to turn website visitors into paying members',
      'Built a high-converting website with automated 24/7 SMS & email follow-ups',
      'Combined paid ads and hyper-targeted content marketing to drive qualified traffic'
    ],
    results: [
      { label: 'More membership enquiries', value: '4×' },
      { label: 'Growth in monthly revenue', value: '3×' },
      { label: 'Better lead-to-member conversion', value: '70%' }
    ]
  },
  {
    id: 'ecommerce',
    category: 'E-commerce',
    industry: 'E-commerce',
    title: 'An ecommerce brand improved visibility, traffic quality, and online...',
    summary: 'Overhauled digital store architecture, optimized product detail pages, and ran precision acquisition campaigns to double repeat customers.',
    image: caseStudyEcommerceImg,
    challenges: [
      'Low online sales conversion rates',
      'Poor product visibility against entrenched legacy retailers',
      'High cost per order that eliminated margin'
    ],
    whatWeDid: [
      'Used our 5D Growth Framework to boost online sales and qualified traffic',
      'Improved product pages and built automated revenue retention funnels',
      'Ran SEO and paid ads together to reach ready-to-buy customer segments'
    ],
    results: [
      { label: 'Increase in online sales', value: '3.5×' },
      { label: 'Growth in website traffic', value: '4×' },
      { label: 'Lower cost per order', value: '50%' }
    ]
  },
  {
    id: 'healthcare',
    category: 'Healthcare',
    industry: 'Healthcare',
    title: 'A healthcare practice transformed patient acquisition and bookings...',
    summary: 'Replaced manual marketing with an AI-driven patient acquisition engine that kept consultation schedules full year-round.',
    image: caseStudyHealthcareImg,
    challenges: [
      'Low visibility in local medical search results',
      'Inconsistent patient inquiries month over month',
      'High cost per lead from unoptimized paid ad campaigns'
    ],
    whatWeDid: [
      'Used AI-driven market insights to identify high-intent patient searches',
      'Built a conversion-focused website and seamless online booking system',
      'Deployed SEO, paid media, and compliance-ready automation as one growth system'
    ],
    results: [
      { label: 'Increase in patient inquiries', value: '4×' },
      { label: 'Revenue growth', value: '3.2×' },
      { label: 'Reduction in cost per lead', value: '65%' }
    ]
  }
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
