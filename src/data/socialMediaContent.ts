/**
 * Copy for the Social Media Marketing service page (`/service/social-media-marketing`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - "Digivibs" -> "Digivibz" (brand-name typo)
 * - stray spaces before commas normalized
 * - ✅ marks rendered as on-brand check icons in the UI (no emoji)
 * - one merged comparison row split into its two original items (6 vs 6)
 */

export const SMM_HERO = {
  badge: 'Social Media Marketing',
  titleLead: 'Social Media Marketing Services That Boost Your Revenue by ',
  titleHighlight: '3X',
  intro:
    'Digivibz, a Social Media Growth Agency, helps businesses turn social media into a consistent growth system. From building a strong brand presence to generating qualified leads & sales through targeted campaigns, our Social Media services deliver measurable results. Powered by our proven 5D Growth Framework, we help you attract the right audience, build trust, and turn attention into revenue.',
  cta: 'Get My Free Social Media Audit',
} as const;

export const SMM_PROBLEM = {
  kicker: 'If your digital platform feels busy but results stay flat, you’re not alone.',
  title: 'Your Social Media Isn’t the Problem, Your Strategy Is',
  p1: 'Many businesses put a lot of effort into their marketing, like posting content, running social media marketing campaigns, and staying active on social platforms.',
  lead: 'It looks busy. But the results rarely follow:',
  bullets: [
    'Random content doesn’t attract the right customers',
    'Ads reach people who don’t convert',
    'Marketing spend rises, but sales stay the same',
  ],
  focus: 'The problem isn’t effort - it’s focus.',
  p2: 'Businesses often treat marketing through social media like a checklist: post daily, run campaigns, track likes and shares. The real question - “Is this bringing in customers?” - rarely gets answered.',
  p3: 'Without a system that connects marketing to business outcomes, every post, ad, and campaign becomes just noise. Your audience sees activity, but they don’t take action. Leads don’t increase. Revenue doesn’t grow. Growth stays unpredictable.',
  p4: 'The solution isn’t working harder. It’s working smarter - creating marketing that’s designed by a digital marketing agency to drive real results for your business.',
  transition: 'The problem isn’t social platforms. It’s how most agencies approach it. Here’s the difference.',
} as const;

export const SMM_COMPARE = {
  titleLead: 'What Digivibz Delivers',
  titleHighlight: 'Where Traditional Marketing Fails',
  traditional: {
    label: 'The Old Way',
    heading: 'Traditional Marketing Approach',
    items: [
      'Random posting with no measurable system',
      'Focused on Vanity Metrics, Not the Leads That Matter',
      'Operates in isolation, disconnected from sales and revenue',
      'One-off campaigns with minimal tracking or analysis',
      'Results are inconsistent and hard to measure',
      'Generic strategies applied across industries, one-size-fits-all',
    ],
  },
  digivibz: {
    label: 'The Growth System',
    heading: 'Digivibz Digital Platforms Growth System',
    items: [
      'Strategy-driven using our 5D Growth Framework',
      'Focused on revenue, leads, and measurable outcomes',
      'Campaigns are fully integrated with business growth systems',
      'Continuous optimization based on real data',
      'Scalable and predictable results',
      'Premium, B2B-focused approach tailored to your business goals',
    ],
  },
  closing:
    'At Digivibz, we take a different approach - one that’s built around your business outcomes, not your posting schedule.',
} as const;

export const SMM_STRATEGY = {
  title: 'Start Growing With a Smarter Social Media Strategy',
  p1: 'At Digivibz, we take a different approach. We don’t just run marketing campaigns or post content - we build a strategy that works for your business, driving measurable results.',
  p2: 'Our strategies are guided by our 5D Growth Framework, a proven system that ensures every campaign, message, and initiative is aligned with your growth goals.',
  lead: 'With this approach, your marketing:',
  bullets: [
    'Attracts the right audience consistently',
    'Moves potential customers toward action',
    'Converts visibility into leads and revenue',
    'Becomes predictable, measurable, and efficient',
  ],
  p3: 'It’s not guesswork. It’s a structured solution that transforms your online presence into a reliable business growth system, the hallmark of a best social media marketing agency.',
  transition: 'Here’s exactly what that looks like and what each part does for your business.',
} as const;

export const SMM_STATS = [
  { value: '250+', label: 'B2B Campaigns' },
  { value: '5+', label: 'Years of Expertise' },
  { value: '1000+', label: 'Happy Clients' },
] as const;

export interface SmmPillar {
  id: string;
  title: string;
  paras: string[];
  bullets?: string[];
  closing?: string[];
}

export const SMM_SYSTEM = {
  label: 'Not Just Services, A Complete System Built for Social Media Growth',
  title: 'Everything You Need to Turn Online Presence Into a Growth Channel',
  intro:
    'Our social media management services are built as a complete system - not isolated tasks. Every part works together to attract the right audience, move them toward action, and drive real business results.',
  pillars: [
    {
      id: 'strategy',
      title: 'Strategy & Planning That Aligns With Your Business Goals',
      paras: [
        'We start by building a clear direction.',
        'Not random ideas - but a strategy based on your audience, your market, and your growth objectives.',
        'Every campaign, content plan, and platform decision is made with one focus: driving measurable results for your business.',
      ],
    },
    {
      id: 'content',
      title: 'Content That Attracts and Drives Action',
      paras: [
        'We don’t create content just to stay active.',
        'Every post, visual, and message is designed to:',
      ],
      bullets: ['Capture attention', 'Build interest', 'Guide your audience toward the next step'],
      closing: [
        'Because social media content marketing should do more than fill your feed - it should create demand.',
      ],
    },
    {
      id: 'campaigns',
      title: 'Targeted Campaigns Built for Performance',
      paras: [
        'Organic reach alone is not enough.',
        'We run highly targeted paid marketing campaigns across the right platforms to:',
      ],
      bullets: [
        'Reach the people most likely to convert',
        'Maximize the impact of your budget',
        'Turn visibility into qualified opportunities',
      ],
      closing: ['Every campaign is built for performance - not just reach.'],
    },
    {
      id: 'targeting',
      title: 'Smart Targeting That Reaches the Right Audience',
      paras: [
        'Getting attention is easy. Getting the right attention is not.',
        'We use data, behavior insights, and continuous testing to ensure your marketing reaches people who are more likely to take action - not just scroll past.',
      ],
    },
    {
      id: 'optimization',
      title: 'Continuous Optimization, Backed by a Proven System',
      paras: [
        'Marketing doesn’t stop after launch.',
        'We continuously monitor, test, and improve every part of your campaigns - from content to targeting to performance.',
        'So your results don’t stay static. They improve over time.',
      ],
    },
  ] as SmmPillar[],
  transition:
    'We run this system across the platforms your audience actually uses. Here’s how we approach each one.',
} as const;

export type SmmPlatformId = 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok';

export interface SmmPlatform {
  id: SmmPlatformId;
  tab: string;
  title: string;
  paras: string[];
  listLabel: string;
  items: string[];
  closing?: string;
}

export const SMM_PLATFORMS = {
  title: 'Grow Your Business Revenue With Our Social Media Marketing Services',
  intro:
    'Revenue doesn’t grow by accident. At Digivibz, we build platform-specific strategies that put your brand in front of the right audience and turn that attention into real business results.',
  platforms: [
    {
      id: 'facebook',
      tab: 'Facebook',
      title: 'Facebook advertising services',
      paras: [
        'Most businesses are on Facebook. Very few are actually growing from it.',
        'If your page gets little engagement, your ads burn budget without results, or your posts drive no real business, the problem isn’t Facebook. It’s the missing strategy behind it.',
        'That’s exactly what Digivibz fixes.',
      ],
      listLabel: 'What We Deliver on Facebook:',
      items: [
        'Content strategy aligned with your audience and business goals',
        'High-performing ad campaigns that drive real action',
        'Scroll-stopping creatives & copy that convert attention into leads',
        'Precise audience targeting that puts your budget in the right place',
        'Continuous optimization so your results keep improving',
      ],
      closing: 'Facebook has the audience. We build the system that turns that audience into your customers.',
    },
    {
      id: 'instagram',
      tab: 'Instagram',
      title: 'Instagram marketing services',
      paras: [
        'We manage and grow your Instagram presence with a strategy built around your business goals from content creation to paid campaigns, everything works together to build your brand and drive real results.',
      ],
      listLabel: 'What’s Included:',
      items: [
        'Profile Audit & Optimization',
        'Content Strategy & Planning',
        'Reels, Carousels & Stories Creation',
        'Community Engagement & Management',
        'Instagram Ad Campaigns',
        'Performance Tracking & Reporting',
      ],
    },
    {
      id: 'twitter',
      tab: 'X / Twitter',
      title: 'Twitter/X Marketing',
      paras: [
        'Twitter/X is where conversations happen, trends are born, and brands build real authority in their industry. We manage your Twitter/X presence with a strategy focused on keeping your brand visible, relevant, and engaging in the moments that matter most.',
        'From building a consistent posting schedule to joining the right conversations — we make sure your brand is always part of the discussion.',
      ],
      listLabel: 'What’s Included:',
      items: [
        'Profile Optimization & Branding',
        'Content Strategy & Tweet Planning',
        'Trend Monitoring & Real-Time Engagement',
        'Audience Growth & Community Building',
        'Twitter/X Ad Campaigns',
        'Performance Tracking & Reporting',
      ],
    },
    {
      id: 'linkedin',
      tab: 'LinkedIn',
      title: 'LinkedIn Marketing Services',
      paras: [
        'LinkedIn is the go-to platform for b2b social media marketing, connecting your brand with decision-makers, industry leaders, and high-value professionals. We manage your LinkedIn presence with a strategy designed to position your brand as a credible, trusted voice and turn that credibility into real business opportunities.',
        'From thought leadership content to targeted ad campaigns, we make sure your brand reaches the right professionals at the right time.',
      ],
      listLabel: 'What’s Included:',
      items: [
        'Profile & Company Page Optimization',
        'Content Strategy & Planning',
        'Thought Leadership & Industry Content',
        'Connection Building & Community Engagement',
        'LinkedIn Ad Campaigns',
        'Lead Generation Strategy',
        'Performance Tracking & Reporting',
      ],
    },
    {
      id: 'tiktok',
      tab: 'TikTok',
      title: 'Tiktok advertising services',
      paras: [
        'We manage your TikTok presence with a strategy built around platform-native content that captures attention, builds brand awareness, and drives real business results.',
        'From creative short-form videos to targeted ad campaigns — we make sure your brand shows up in a way that resonates, entertains, and converts.',
      ],
      listLabel: 'What’s Included:',
      items: [
        'Profile Optimization & Branding',
        'Content Strategy & Planning',
        'Short-Form Video Creation & Editing',
        'Trend Research & Creative Ideation',
        'Hashtag Strategy & Audience Growth',
        'TikTok Ad Campaigns',
        'Performance Tracking & Reporting',
      ],
    },
  ] as SmmPlatform[],
  transition:
    'Each of those services works. But what makes them powerful is how they work together through one structured system.',
} as const;

export const SMM_FRAMEWORK = {
  title: 'The 5D Growth Framework That Powers Your Social Media Results',
  paras: [
    'At Digivibz, every strategy is guided by our 5D Growth Framework - a structured approach designed to turn marketing efforts into measurable business results.',
    'It ensures that every campaign, every message, and every decision is aligned with your goals - not left to guesswork.',
    'From understanding your market to executing and optimizing campaigns, this framework keeps your marketing strategies focused, connected, and performance-driven.',
    'So instead of isolated efforts, you get a system where everything works together - built to drive consistent growth over time.',
  ],
  steps: [
    {
      name: 'Discover',
      desc: 'We start by understanding your business, audience, and growth goals. This step uncovers opportunities, identifies gaps, and sets the foundation for a strategy that actually works.',
    },
    {
      name: 'Design',
      desc: 'Next, we craft a clear and actionable strategy. From content themes to targeting approaches, every element is designed to attract the right audience and align with your business objectives.',
    },
    {
      name: 'Develop',
      desc: 'Here we create compelling content, ads, and campaigns that engage your audience and drive them toward taking meaningful actions.',
    },
    {
      name: 'Deploy',
      desc: 'We execute the strategy across social channels with precision, ensuring consistent delivery and maximum impact. Every paid marketing campaign is optimized for engagement and conversion.',
    },
    {
      name: 'Detect',
      desc: 'Finally, we track, measure, and analyze performance. Insights from this phase allow us to refine campaigns, optimize results, and continuously improve ROI, keeping your business growth on track.',
    },
  ],
  transition: 'In practice, this is what changes when the system is running.',
} as const;

export const SMM_OUTCOMES = {
  title: 'From Posting to Performing, What Our Social Media System Delivers',
  intro:
    'Working with Digivibz means more than running campaigns or posting content. You get a 5D structured system that brings clarity, consistency, and real business impact to your marketing.',
  rows: [
    {
      from: 'From Guessing',
      to: 'To Predictable SM Growth',
      sub: 'You know exactly where your leads come from and what’s driving results.',
    },
    {
      from: 'Turning Random Traffic',
      to: 'Into the right opportunities',
      sub: 'Your marketing attracts people who are actually interested in your offering.',
    },
    {
      from: 'From wasted spend',
      to: 'to purposeful investment',
      sub: 'Your budget is focused on campaigns that deliver measurable outcomes.',
    },
    {
      from: 'Aligning Disconnected Efforts',
      to: 'Into Scalable Growth',
      sub: 'Your content, campaigns, and messaging work together toward one goal.',
    },
    {
      from: 'From Unpredictable Results',
      to: 'To a Reliable System',
      sub: 'Your marketing becomes structured, measurable, and built to improve over time.',
    },
  ],
  closing: 'Getting there is more straightforward and more affordable than you might expect.',
  cta: 'Get My Free Social Media Audit',
} as const;

export const SMM_PROCESS = {
  lead: 'Here’s exactly what happens from the moment you sign up to the day your first campaign goes live.',
  title: 'How You’ll Work With Us?',
  intro:
    'At Digivibz, we make marketing clear, structured, and results-driven. Here’s what your journey looks like when you partner with us:',
  steps: [
    {
      title: 'Discovery Call',
      desc: 'We start by understanding your business, goals, and current challenges. This ensures we focus on the results that matter most to you and sets the foundation for social media services that deliver measurable growth',
    },
    {
      title: 'Customized Strategy',
      desc: 'Based on our insights, we design a strategy tailored to your audience, growth objectives, and business priorities.',
    },
    {
      title: 'Campaign Launch',
      desc: 'We roll out your content, ads, and engagement initiatives, keeping everything aligned with your growth strategy.',
    },
    {
      title: 'Transparent Reporting',
      desc: 'You’ll receive regular updates and clear metrics showing how campaigns perform and where your ROI is growing.',
    },
    {
      title: 'Continuous Improvement',
      desc: 'We refine campaigns in real time, optimizing every step to ensure maximum impact. This includes paid marketing efforts for high-performing campaigns.',
    },
  ],
  closing:
    'With this process, you’ll always know what’s happening, why it matters, and how it contributes to your business growth.',
} as const;

export const SMM_FAQ = {
  lead: 'Still have questions? Good, here are the ones we hear most before a client says yes.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What does a social media marketing agency do?',
      a: 'It helps businesses grow online through content creation, paid advertising, audience targeting, lead generation, and conversion-focused strategies across platforms like Facebook, Instagram, LinkedIn, X/Twitter and TikTok.',
    },
    {
      q: 'How can marketing help my business grow?',
      a: 'Marketing helps attract the right audience, increase brand awareness, generate qualified leads, and turn online engagement into real sales and revenue.',
    },
    {
      q: 'Why should I choose Digivibz for marketing?',
      a: 'Unlike most social media marketing companies, Digivibz uses a results-driven 5D Growth Framework focused on generating measurable business growth, qualified leads, and higher ROI instead of vanity metrics.',
    },
    {
      q: 'How long does it take to see results from marketing?',
      a: 'Paid campaigns can start generating leads within days, while long-term growth through content and brand building typically improves within 60–90 days.',
    },
    {
      q: 'What are the 5 types of media marketing?',
      aLines: [
        '1. DISCOVER – Research & Audience Insights',
        'Understand your market, competitors, and target audience before launching campaigns.',
        '2. DESIGN – Strategy & Funnel Planning',
        'Create high-converting strategies, funnels, messaging, and ad concepts.',
        '3. DEVELOP – Campaign & Asset Setup',
        'Build campaigns, creatives, landing pages, and tracking systems.',
        '4. DEPLOY – Traffic & Campaign Execution',
        'Launch and manage campaigns across Google, Meta, SEO, and email channels.',
        '5. DETECT – Optimization & Scaling',
        'Track performance, improve conversions, reduce costs, and scale winning campaigns.',
      ],
    },
    {
      q: 'Which Digital platforms are best for marketing?',
      a: 'The best platform depends on your business goals. Facebook and Instagram work well for lead generation and eCommerce, while LinkedIn is highly effective for B2B marketing.',
    },
    {
      q: 'Do you offer customized Digital Platform marketing strategies?',
      a: 'Yes. Digivibz creates personalized marketing strategies based on your business goals, target audience, industry, and growth objectives.',
    },
    {
      q: 'Can marketing generate real leads and sales?',
      a: 'Yes. With the right strategy, audience targeting, and conversion-focused campaigns, marketing can consistently generate qualified leads, customers, and revenue for your business.',
    },
  ],
  transition: 'Ready to stop posting and start growing? Let’s build your system.',
} as const;

export const SMM_CTA = {
  title: 'Ready to Turn Social Media Into a Growth System?',
  body: 'Partner with Digivibz and transform your online presence into predictable leads and revenue. Our 5D Growth Framework ensures every campaign is strategic, measurable, and results-driven.',
  button: 'Book Your Consultation Today',
} as const;
