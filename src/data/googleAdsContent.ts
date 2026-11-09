/**
 * Copy for the Google Ads Agency service page (`/service/google-ads-agency`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - straight apostrophes -> typographic (’) to match site typography
 *   ("you’re", "Here’s", "it’s", "We don’t", "isn’t", "we’d" …), and the
 *   quoted "should" -> “should”
 * - leading/trailing spaces and line breaks normalized
 * - missing space after period restored in 1 place: "disappear.We become"
 *   -> "disappear. We become" (FLAGGED below)
 * - space before question mark removed: "Digivibz ?" -> "Digivibz?"
 *   (FLAGGED below)
 * - double period removed: "Here’s what we use. ." -> "Here’s what we use."
 *   (FLAGGED below)
 * - space before comma removed: "Google Ads Campaign Management ,"
 *   -> "Google Ads Campaign Management," (FLAGGED below)
 * - FAQ answer 10 gained its missing leading space (the only answer that
 *   started flush)
 *
 * Structure notes (flagged):
 * - group 1 (Google Ads Audit Services) opens with a description paragraph
 *   that ends in an ellipsis mid-thought: "…the foundation everything else
 *   is built on…" — rendered as the group description line, kept as written
 * - the audit group's desc and every other group go straight to item cards
 * - item titles repeat across groups: "Audience Targeting" appears in
 *   Display and YouTube; "Campaign Optimization" appears in YouTube and
 *   Analytics — rendered as written (keys are grouped so React stays happy)
 *
 * Kept verbatim pending client input (flagged):
 * - YouTube item "Video Discovery Ads" body says "Through Google
 *   Discovery Ads" (reads like it means YouTube’s discovery placements)
 * - Local Services item "Local Lead Generation" body contains the odd
 *   hyphenation "Google Ads Lead Generation Services-driven calls"
 * - "Ready to Hire Google Ads Agency talent…" heading ends without "?"
 *   exactly as supplied
 *
 * Added UI microcopy (not client copy; layout parity with the other service
 * pages): hero badge + secondary button, section badges, hero chips, "01-05"
 * numbering on the problem list, group service counts, process pills, and
 * the labels/numbers inside the visuals (bid, quality score, ad rank,
 * vitals, dial states, BEFORE/AFTER flips).
 */

export const GA_HERO = {
  badge: 'Google Ads',
  titleLead: 'The Google Ads Agency That Turns Ad Spend Into Actual ',
  titleHighlight: 'Growth',
  intro:
    'Every day you wait is a day your competitors are showing up first. Digivibz exists to make Google Ads work harder for your business, backed by PPC Management Services built on data, not guesswork. We dig into your numbers, your audience, and your competitors, then build a campaign strategy engineered around one thing: real, trackable PPC results. Whether you’re chasing leads, sales, or store visits, we treat every dollar of your spend like it’s our own.',
  cta: 'See How We Grow Your Revenue',
  secondary: 'Get your free audit',
  transition:
    'So what does it actually look like when Google Ads runs without a real strategy behind it? Here’s what most businesses are quietly dealing with',
} as const;

export const GA_PROBLEM = {
  title: 'Still Managing Google Ads on Guesswork?',
  lead: 'Without consistent Google Ads Account Management, your campaigns quietly drain your budget every single day. Here’s what that usually looks like.',
  items: [
    'Wasted Spend On Clicks That Never Convert',
    'Leads Slipping Through With No Follow-Up System',
    'Confusing Reports That Hide More Than They Reveal',
    'Campaigns Running Without Anyone Watching Them Closely',
    'No Time Left To Test, Adjust, Or Optimize',
  ],
  closing:
    'This is exactly why more businesses are turning to a dedicated Google Ads Consultant instead of letting their ad account run on autopilot.',
  transition:
    'Fixing this takes more than better ads, it takes a team that watches your account like their own money is on the line. Here’s how we work.',
} as const;

export interface GaDifferentiator {
  readonly title: string;
  readonly body: string;
}

export const GA_PITCH = {
  title: 'Meet the Team That Treats Your Ad Spend Like Its Own',
  p1: 'Here’s the truth: running ads isn’t the hard part. Running them profitably is. Digivibz is a full-service Google Ads Management partner built for businesses that are done guessing. We don’t hand you a dashboard and disappear. We become the team behind your account, watching every Google Ads Campaign closely, refining your keyword strategy on an ongoing basis, and treating your budget with the same care we’d give our own.',
  p2: 'This isn’t about running ads for the sake of running ads. It’s about building a system that gets smarter every week, one where every click has a job to do and every dollar has to earn its place.',
  asideLead: 'What sets us apart:',
  differentiators: [
    {
      title: 'Audit-first approach',
      body: 'Every account starts with a full audit, not a launch based on guesswork or assumptions about what “should” work',
    },
    {
      title: 'Transparent reporting',
      body: 'You get clear numbers and plain explanations, never buried under jargon you need a translator to understand',
    },
    {
      title: 'Weekly optimization',
      body: 'Your campaigns are reviewed and refined every week, not left running on autopilot until something breaks',
    },
    {
      title: 'Full-service integration',
      body: 'Your ads connect seamlessly with your brand, website, and broader strategy, not managed in an isolated silo',
    },
  ] as readonly GaDifferentiator[],
  ready: 'Ready to Hire Google Ads Agency talent that actually shows up for your business?',
  readyCta: 'Let’s talk.',
  transition:
    'Here’s every campaign type we manage and what each one does for your business.',
} as const;

export interface GaServiceItem {
  readonly title: string;
  readonly body: string;
}

export interface GaServiceGroup {
  readonly key: string;
  /** Lead paragraph printed under the group heading (only the audit group has one). */
  readonly desc?: string;
  readonly items: readonly GaServiceItem[];
}

export const GA_SERVICES: {
  readonly title: string;
  readonly groups: readonly GaServiceGroup[];
  readonly transition: string;
} = {
  title: 'Services That Get You Found First',
  groups: [
    {
      key: 'Google Ads Audit Services',
      desc: 'Before we touch a single setting in your account, our Google Ads Experts dig deep. Most agencies skip this step, we treat it as the foundation everything else is built on…',
      items: [
        {
          title: 'Google Ads Account Analysis',
          body: 'We start with a full account-level review, structure, settings, targeting, and history, to understand how your account has actually performed over time, not just what the dashboard summary says.',
        },
        {
          title: 'Campaign Performance Review',
          body: 'Every Google Ads Campaign gets evaluated individually. We look past surface metrics like clicks and impressions to see what’s really driving (or draining) your results.',
        },
        {
          title: 'Keyword & Search Term Analysis',
          body: 'We compare what you’re bidding on against what people are actually searching. This is often where we find the biggest hidden waste, irrelevant searches quietly eating your budget.',
        },
        {
          title: 'Ad Copy & Asset Review',
          body: 'Your Ad Copy and creative assets get reviewed for relevance, clarity, and performance. Tired or mismatched messaging is one of the most common (and fixable) conversion killers.',
        },
        {
          title: 'Conversion Tracking Audit',
          body: 'If your tracking is broken or incomplete, every decision built on top of it is flawed. We verify your setup so the numbers you’re seeing are numbers you can trust.',
        },
        {
          title: 'Budget & Bid Strategy Analysis',
          body: 'We assess whether your budget is being allocated where it actually earns a return, part of the Google Ads ROI Optimization process that separates profitable accounts from ones just burning cash.',
        },
        {
          title: 'Competitor & Market Analysis',
          body: 'We look at where you sit in your market, who you’re really competing against for clicks, and where the opportunities are that your competitors haven’t found yet.',
        },
        {
          title: 'Optimization Recommendations',
          body: 'The audit ends with a clear, prioritized action plan, not a 40-page report nobody reads, but PPC Strategy Consulting you can actually act on, exactly what needs to change and why.',
        },
      ],
    },
    {
      key: 'Google Search Ads Management',
      items: [
        {
          title: 'Search Campaign Setup',
          body: 'We build your campaigns from the ground up, structured around your goals, your market, and how your customers actually search, not generic templates.',
        },
        {
          title: 'Keyword Research & Targeting',
          body: 'Our Keyword Research process goes beyond search volume. We target the terms that bring in buyers, not just browsers, while avoiding costly, low-intent traffic.',
        },
        {
          title: 'Search Ad Copy Creation',
          body: 'Every headline and description is written to earn the click and set the right expectation. Strong Ad Copy isn’t just about clicks, it’s about attracting the right ones.',
        },
        {
          title: 'Negative Keyword Optimization',
          body: 'We continuously build out negative keyword lists to filter out irrelevant searches, protecting your budget from clicks that were never going to convert.',
        },
        {
          title: 'Bid Management',
          body: 'Smart Google Ads Bidding ensures you’re not overpaying for clicks or underbidding for the placements that actually drive results.',
        },
        {
          title: 'Search Campaign Optimization',
          body: 'Through ongoing PPC Campaign Optimization, we refine targeting, budgets, and creative based on real performance data, not assumptions.',
        },
        {
          title: 'Conversion Tracking Setup',
          body: 'We connect every click to a real outcome, form fill, call, purchase, so you always know exactly what your ads are delivering, down to the last dollar.',
        },
      ],
    },
    {
      key: 'Google Display Ads & Remarketing Management',
      items: [
        {
          title: 'Display Campaign Setup',
          body: 'We build visually engaging campaigns designed to catch attention without feeling intrusive, placed where your ideal customers already spend their time online.',
        },
        {
          title: 'Banner Advertising',
          body: 'From static banners to responsive creative, we design ad assets that stay true to your brand while performing across every placement and screen size.',
        },
        {
          title: 'Audience Targeting',
          body: 'We layer demographic, interest, and behavioral data to make sure your ads reach people who actually fit your ideal customer profile, not just anyone scrolling by.',
        },
        {
          title: 'Remarketing Campaigns',
          body: 'Someone visited your site and left without converting? Our remarketing campaigns bring them back with the right message at the right moment, when they’re most likely to act.',
        },
        {
          title: 'Retargeting Strategy',
          body: 'We build a structured retargeting approach based on how far a visitor got, browsed a page, added to cart, started a form, so your follow-up always matches their intent.',
        },
        {
          title: 'Display Ad Optimization',
          body: 'Through continuous testing and refinement, we improve creative, placements, and targeting over time, making sure your visibility keeps turning into real engagement.',
        },
      ],
    },
    {
      key: 'Google Shopping Ads Management',
      items: [
        {
          title: 'Google Merchant Center Setup',
          body: 'We set up and configure your Merchant Center account correctly from day one, ensuring your product data meets Google’s requirements and avoids costly disapprovals.',
        },
        {
          title: 'Product Feed Management',
          body: 'Your product feed is the backbone of every Shopping campaign. We manage it continuously, keeping titles, prices, and availability accurate and optimized.',
        },
        {
          title: 'Product Data Optimization',
          body: 'We refine product titles, descriptions, and attributes using real search behavior, helping your listings match what shoppers are actually typing into Google.',
        },
        {
          title: 'Shopping Campaign Setup',
          body: 'We structure your campaigns by product performance and priority, so your budget flows toward the items that drive the most revenue.',
        },
        {
          title: 'Shopping Ads Optimization',
          body: 'Through ongoing bid and placement adjustments, we make sure your top-performing products stay visible while underperformers get refined or paused.',
        },
        {
          title: 'E-commerce PPC Management',
          body: 'Beyond Shopping alone, our broader E-commerce PPC Management connects Search, Shopping, and Remarketing into one cohesive strategy built around your store’s full customer journey.',
        },
      ],
    },
    {
      key: 'Google Performance Max Campaign Management',
      items: [
        {
          title: 'Performance Max Setup',
          body: 'We build your campaign structure around clear conversion goals from day one, feeding Google’s automation the right signals to find your best customers faster.',
        },
        {
          title: 'Campaign Asset Creation',
          body: 'We create a full library of headlines, images, videos, and copy variations, giving the system everything it needs to build high-performing ad combinations automatically.',
        },
        {
          title: 'Audience Signal Optimization',
          body: 'We guide the algorithm using first-party data, customer lists, and behavioral signals, helping it find people who look and act like your best existing customers.',
        },
        {
          title: 'Conversion Goal Setup',
          body: 'Every campaign is built around the outcomes that matter to your business, sales, leads, or store visits, so optimization always points toward real revenue.',
        },
        {
          title: 'Budget & Bid Optimization',
          body: 'We monitor spend and bidding closely, making sure your budget flows toward the channels and audiences delivering the strongest return.',
        },
        {
          title: 'Performance Monitoring',
          body: 'Because Performance Max operates with less manual control than traditional campaigns, we track results closely and adjust signals and assets whenever performance shifts.',
        },
      ],
    },
    {
      key: 'YouTube Ads Management',
      items: [
        {
          title: 'YouTube Video Campaign Setup',
          body: 'We structure your campaigns around clear objectives, awareness, consideration, or conversions, so every view works toward an actual business outcome.',
        },
        {
          title: 'In-Stream Ads',
          body: 'Skippable and non-skippable in-stream placements put your message directly in front of viewers before, during, or after the videos they’re already watching.',
        },
        {
          title: 'Video Discovery Ads',
          body: 'Through Google Discovery Ads, we place your video content where people are actively browsing, on YouTube’s homepage, search results, and suggested videos, capturing attention during discovery mode.',
        },
        {
          title: 'Audience Targeting',
          body: 'We combine demographic, interest, and remarketing data to make sure your video reaches viewers genuinely likely to care about what you offer.',
        },
        {
          title: 'Video Remarketing',
          body: 'Viewers who watched but didn’t act aren’t gone, we bring them back with follow-up creative tailored to how much of your video they engaged with.',
        },
        {
          title: 'Campaign Optimization',
          body: 'We continuously refine targeting, placements, and creative based on view-through rates and conversions, not just view counts.',
        },
      ],
    },
    {
      key: 'Google Local Services Ads Management',
      items: [
        {
          title: 'Business Eligibility & Verification',
          body: 'We guide you through Google’s verification process, background checks, licensing, and insurance requirements, so your business qualifies without the usual back-and-forth delays.',
        },
        {
          title: 'Local Services Ads Setup',
          body: 'We build out your profile and service categories correctly from the start, making sure you show up for the exact services you want to be found for.',
        },
        {
          title: 'Google Business Profile Integration',
          body: 'Your Local Services Ads work hand-in-hand with your Google Business Profile, we make sure both are aligned so your reviews, hours, and details stay consistent everywhere.',
        },
        {
          title: 'Service Area & Category Optimization',
          body: 'We refine your service areas and categories over time, focused on Google Ads for Local Businesses looking to capture the most relevant, highest-converting local searches.',
        },
        {
          title: 'Local Lead Generation',
          body: 'Every part of your setup is optimized around one goal, generating Google Ads Lead Generation Services-driven calls and messages from customers ready to book.',
        },
        {
          title: 'Call & Message Lead Management',
          body: 'We help you track and evaluate incoming leads, so you know exactly which calls and messages are turning into real business.',
        },
        {
          title: 'Campaign Monitoring & Optimization',
          body: 'We monitor performance weekly, adjusting budgets and targeting to keep your cost per lead low and your booking volume steady.',
        },
      ],
    },
    {
      key: 'Google Ads Analytics & Optimization',
      items: [
        {
          title: 'Conversion Tracking',
          body: 'We set up accurate Google Ads Conversion Tracking across every campaign, so every lead, sale, or signup is properly attributed back to the ad that drove it.',
        },
        {
          title: 'Google Analytics Integration',
          body: 'By connecting your account to Google Analytics, we give you a complete picture of user behavior beyond the click, from Landing Page engagement to time on site and beyond.',
        },
        {
          title: 'Google Tag Manager Setup',
          body: 'We implement clean, organized tracking through Google Tag Manager, making future updates faster and reducing the risk of broken or duplicate tracking down the line.',
        },
        {
          title: 'ROI Tracking',
          body: 'Every campaign is measured against actual return, not vanity metrics, so you always know your true cost per lead and cost per sale.',
        },
        {
          title: 'Performance Reporting',
          body: 'We deliver clear, jargon-free reports that show what happened, why it happened, and what we’re doing next, no confusing dashboards left for you to decode alone.',
        },
        {
          title: 'Campaign Optimization',
          body: 'Through ongoing Google Ads Campaign Management, we refine landing pages, ad creative, and targeting together, turning more of your existing traffic into paying customers.',
        },
      ],
    },
  ],
  transition:
    'Every one of those campaigns runs through the same structured process so nothing is set up and forgotten.',
};

export const GA_PROCESS = {
  title: 'The 5D Framework That Turns Strategy Into Sales',
  stages: [
    {
      key: 'Discover',
      body: 'We start by understanding your business, your customers, and your competitors. This is where our Google Ads Services begin, not with a template, but with research into what actually moves the needle for your specific market.',
    },
    {
      key: 'Design',
      body: 'Using what we uncover, we design a campaign structure and strategy tailored to your goals, whether that’s leads, sales, or foot traffic, laying the groundwork for a true Search Engine Marketing Services approach across every relevant channel.',
    },
    {
      key: 'Develop',
      body: 'We build out your campaigns, ad copy, creative assets, and tracking systems, developing everything needed for a strong launch instead of rushing live with half-finished setups.',
    },
    {
      key: 'Deploy',
      body: 'Your campaigns go live with precision, budgets allocated correctly, tracking verified, and every setting double-checked before your Google Ads Budget starts working.',
    },
    {
      key: 'Detect',
      body: 'We don’t walk away after launch. We continuously monitor performance, detect what’s working and what isn’t, and adjust in real time, because Google Ads Optimization Services should never stop the moment a campaign goes live.',
    },
  ],
  transition:
    'That process is powered by the right tools at every stage. Here’s what we use.',
} as const;

export interface GaTool {
  readonly name: string;
  readonly purpose: string;
}

export const GA_TOOLS: {
  readonly title: string;
  readonly lead: string;
  readonly subLabel: string;
  readonly items: readonly GaTool[];
  readonly transition: string;
} = {
  title: 'The Tools and Platforms Powering Your Campaigns',
  lead: 'Great strategy needs the right tools behind it. Here’s what we use to build, manage, and optimize every campaign we run.',
  subLabel: 'Platforms & Tools:',
  items: [
    {
      name: 'Google Ads Editor',
      purpose: 'for fast, bulk campaign changes without the lag of manual dashboard edits',
    },
    {
      name: 'Google Ads API',
      purpose: 'enabling custom integrations and automated reporting tailored to your account',
    },
    {
      name: 'Google Ads Scripts',
      purpose: 'automating repetitive tasks like bid adjustments and performance alerts, so nothing slips through the cracks',
    },
    {
      name: 'Google Ads Manager',
      purpose: 'for agencies and multi-account oversight, keeping every campaign organized under one roof',
    },
    {
      name: 'Google Analytics',
      purpose: 'connecting ad performance to real on-site behavior, not just clicks',
    },
    {
      name: 'Google Tag Manager',
      purpose: 'for clean, reliable tracking across every conversion point',
    },
    {
      name: 'Google Merchant Center',
      purpose: 'powering every Shopping and product-based campaign we run',
    },
    {
      name: 'Google Business Profile',
      purpose: 'integrated with Local Services Ads for consistent local visibility',
    },
  ],
  transition:
    'Every tool exists for one reason: to make sure decisions are based on real data, not assumptions.',
};

export const GA_WHY = {
  title: 'What Changes When You Switch to Digivibz?',
  items: [
    {
      from: 'Budget Spent With No Clear Breakdown',
      to: 'Every Dollar Tracked and Explained',
    },
    {
      from: 'Campaigns Set Up Once and Forgotten',
      to: 'Campaigns Reviewed and Refined Weekly',
    },
    {
      from: 'Reports Full of Numbers',
      to: 'Reports That Explain What’s Next',
    },
    {
      from: 'One Generic Strategy For Every Channel',
      to: 'Tailored Google PPC Services Across Search, Shopping, Display, and Local',
    },
  ],
  note: 'We built Digivibz to be the kind of Google Ads Management Services partner we’d want managing our own money, transparent, responsive, and always optimizing toward one outcome: measurable growth, not just activity.',
} as const;

export const GA_FAQ = {
  lead: 'Still have questions before you get started? Here are the ones we hear most.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What does a Google Ads agency do?',
      a: 'A Google Ads agency plans, builds, and manages your Google Ads Management campaigns, from keyword research to ad creation, bidding, and ongoing optimization, so your budget consistently drives leads and sales instead of wasted clicks.',
    },
    {
      q: 'How much does it cost to hire a Google Ads agency?',
      a: 'Costs vary based on your ad spend and campaign complexity. Most agencies charge a flat fee or percentage of spend. We tailor pricing to your goals, so you only pay for what actually moves your business forward.',
    },
    {
      q: 'How long does it take to see results from Google Ads campaigns?',
      a: 'Some campaigns show early signs within 1-2 weeks, but meaningful, consistent results typically take 4-8 weeks as we gather data, refine targeting, and optimize based on real performance, not assumptions.',
    },
    {
      q: 'What services are included in Google Ads management?',
      a: 'Our Google Local Ads Services cover Search, Shopping, Display, YouTube, and Local campaigns, plus audits, conversion tracking, reporting, and ongoing optimization, everything needed to run a full-funnel advertising strategy.',
    },
    {
      q: 'How do I know if my Google Ads campaigns are performing well?',
      a: 'We track performance against real business outcomes, cost per lead, conversion rate, and ROI, not just clicks or impressions. You’ll get clear, jargon-free reports showing exactly how your campaigns are performing.',
    },
    {
      q: 'How can a Google Ads agency improve my campaign performance and ROI?',
      a: 'Through continuous testing, refined targeting, and smarter bidding, an agency identifies what’s wasting budget and what’s driving results, then reallocates spend accordingly to consistently improve your Google Ads ROI Optimization over time.',
    },
    {
      q: 'What is the difference between Google Ads and SEO?',
      a: 'Google Ads delivers immediate, paid visibility through Search Engine Marketing (SEM), while SEO builds organic rankings over time without direct cost per click. Most businesses benefit from using both together.',
    },
    {
      q: 'Are Google Ads effective for local small businesses?',
      a: 'Yes. With the right strategy, Local PPC Management helps small businesses compete against larger competitors by targeting nearby customers with high intent, often delivering strong ROI even on modest budgets.',
    },
    {
      q: 'How do you optimize Google Ads campaigns and reduce wasted ad spend?',
      a: 'We refine keywords, add negative keywords, adjust bids, and improve Google Ads Quality Score through better ad relevance and landing pages, systematically cutting spend on clicks that were never going to convert.',
    },
    {
      q: 'What should I look for when choosing a Google Ads agency?',
      a: 'Look for transparency, proven results, and clear reporting, not vague promises. A strong agency partner should offer regular communication, custom strategies, and continuous optimization rather than a one-size-fits-all approach.',
    },
    {
      q: 'Can you work with my existing Google Ads account and improve performance?',
      a: 'Absolutely. We start with a full audit of your existing account, then optimize what’s working and rebuild what isn’t, no need to start from scratch to see meaningful, measurable improvement.',
    },
  ],
} as const;

export const GA_CTA = {
  title: 'Ready To Turn Ad Spend Into Real Growth?',
  body: 'Every day without a clear strategy is a day your competitors get another head start. Let’s fix that. Get a free, no-obligation audit of your Google Ads account and see exactly where your budget is leaking, and what it would take to turn it into your strongest growth channel.',
  primary: 'Get Your Free Ads Audit',
  secondary: 'Talk to a Strategist Today',
} as const;
