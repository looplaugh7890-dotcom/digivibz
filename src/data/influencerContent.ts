/**
 * Copy for the Influencer Marketing service page (`#/service/influencer-marketing`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - straight apostrophes -> typographic (’) to match site typography
 * - leading/trailing spaces and line breaks normalized (several bodies and
 *   the "Influencer Campaign Strategy & Management" group key started or
 *   ended with stray spaces)
 * - Why items split on the " → " separator into { from, to } for rendering;
 *   the visible text is unchanged
 *
 * Kept verbatim pending client input (flagged):
 * - group heading "AI-powered influencer marketing services" is lowercase
 *   while every other heading is Title Case
 * - "Why Businesses Choose Digivibz For Influencer Marketing?" ends with a
 *   question mark (other service headings do not)
 * - near-duplicate FAQ pair: "What types of influencers does DIGIVIBZ LLC
 *   work with?" (item 3) and "What types of influencers do you work with?"
 *   (item 8) — both kept, answers differ
 * - "our Influencer Campaign Management Agency offering covers the full
 *   promotion process" reads awkwardly (likely "our Influencer Campaign
 *   Management offering covers…") — kept as written
 * - the problem section's five items follow the paragraph with no label
 *   line (the video page had one; this copy does not)
 */

export const IM_HERO = {
  badge: 'Influencer Marketing',
  titleLead: 'Influencer Marketing Services To Help Your Business Grow Through ',
  titleHighlight: 'Trusted Voices',
  intro:
    'Digivibz is an Influencer Marketing Agency built to do more than just connect brands with creators. As part of our full digital marketing services, we manage the entire process, from finding influencers who align with your brand to negotiating partnerships and executing campaigns, so your brand connects with voices your audience already trusts. You won’t have to juggle outreach, contracts, or content approvals on your own. We handle it all and keep you updated on what’s working, so every campaign runs smoothly from the first conversation to the final results.',
  cta: 'Get A Free Influencer Marketing Plan',
  secondary: 'See our process',
} as const;

export const IM_PROBLEM = {
  lead: 'It sounds simple on paper. In practice, most campaigns run into the same wall.',
  title: 'Most Influencer Campaigns Fail Before They Even Launch',
  p1: 'Influencer marketing looks simple from the outside. Post a product, tag a creator, watch the sales roll in. But most brands quickly realize it’s not that easy. Without the right strategy, even a well-funded campaign can fall flat, and the same mistakes tend to show up again and again.',
  items: [
    'Wrong Influencer, Wrong Audience',
    'Fake Followers, Fake Engagement',
    'No Clear Strategy',
    'Poor Communication And Missed Deadlines',
    'No Way To Measure Results',
  ],
  closing:
    'That’s where we come in. Digivibz takes the guesswork out of influencer marketing, so every campaign is built on strategy, not luck.',
  transition: 'Here’s what that strategy-first approach actually looks like in practice.',
} as const;

export const IM_PITCH = {
  title: 'We Build Influencer Campaigns That Actually Work',
  p1: 'Digivibz takes a strategic approach to Influencer Marketing, built on data, not guesswork. Instead of chasing follower counts, we focus on finding creators whose audience, values, and content style genuinely align with your brand. Every campaign starts with clear goals, moves through careful influencer vetting, and ends with measurable results you can actually track.',
  p2: 'As a full-service Influencer Marketing Company, we work like an extension of your team, not just another vendor. From the first outreach message to the final performance report, we manage every detail so you get expert results without the hassle of managing it all yourself.',
  button: 'Book A Free Strategy Call',
  transition: 'Here’s exactly what that looks like broken down step by step.',
} as const;

export type ImPlatformId =
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'tiktok'
  | 'linkedin'
  | 'snapchat';

export const IM_SERVICES = {
  title: 'We Handle Every Step Of Your Influencer Campaign',
  intro:
    'From the first idea to the final report, we handle every part of your influencer campaign so you don’t have to manage it alone.',
  groups: [
    {
      key: 'Influencer Campaign Strategy & Management',
      items: [
        {
          title: 'Campaign Strategy Development',
          body: 'We start by understanding your brand, goals, and target audience in detail. From there, we build a campaign strategy designed to hit specific outcomes, whether that’s brand awareness, engagement, or direct sales, rather than producing content just to fill a calendar.',
        },
        {
          title: 'Influencer Discovery & Shortlisting',
          body: 'Using Influencer Discovery tools alongside manual research, we identify creators whose audience, values, and content style genuinely match your brand. We look beyond follower count to focus on relevance, so every shortlisted influencer fits your specific campaign goals.',
        },
        {
          title: 'Influencer Outreach & Selection',
          body: 'We handle outreach professionally and follow up consistently, keeping communication clear from the very first message. The final selection is based on thorough Influencer Vetting, including engagement quality, audience authenticity, and content style, not just surface-level numbers.',
        },
        {
          title: 'Collaboration & Partnership Setup',
          body: 'We manage negotiations, timelines, and Influencer Contracts on your behalf, so every partnership is clear, professional, and protected from the start. This keeps expectations aligned between your brand and the influencer throughout the campaign.',
        },
        {
          title: 'UGC & Content Planning',
          body: 'We plan Content Creation around your brand guidelines while giving influencers creative freedom to keep their content authentic. This balance helps campaigns feel genuine to the influencer’s audience while still staying on-brand.',
        },
        {
          title: 'Product & Brand Promotion Execution',
          body: 'As part of our digital marketing services, our Influencer Campaign Management Agency offering covers the full promotion process, from Sponsored Content and product seeding to Affiliate Marketing, making sure every partnership feels natural rather than forced within the influencer’s usual content style.',
        },
        {
          title: 'Campaign Management & Optimization',
          body: 'We oversee timelines, deliverables, and day-to-day communication throughout the campaign. If something isn’t performing as expected, we adjust strategy in real time to keep results on track instead of waiting until the campaign ends.',
        },
        {
          title: 'Analytics & Performance Reporting',
          body: 'Every campaign ends with a detailed breakdown of Performance Metrics, covering reach, engagement, and conversions. This gives you a clear picture of what worked and where your budget delivered the strongest results.',
        },
      ],
    },
    {
      key: 'AI-powered influencer marketing services',
      items: [
        {
          title: 'Concept & Persona Design',
          body: 'We start by defining your AI influencer’s personality, appearance, and tone of voice, making sure it reflects your brand identity and appeals directly to your target audience.',
        },
        {
          title: 'Storyboarding',
          body: 'Every piece of content is planned out in advance, mapping scenes, messaging, and visuals so the final output feels intentional rather than random or robotic.',
        },
        {
          title: 'Digital Influencer Creation',
          body: 'Using advanced AI tools, we bring the persona to life visually, creating a consistent, realistic digital influencer that can be used across multiple campaigns and platforms.',
        },
        {
          title: 'Voice & Personality Layer',
          body: 'We add natural speech patterns, tone, and personality traits to the AI influencer, so interactions and content feel authentic rather than scripted.',
        },
        {
          title: 'Scene & Content Production',
          body: 'From here, we produce AI-generated influencer content, including videos, images, and captions, tailored specifically to your campaign goals and platform requirements.',
        },
        {
          title: 'Campaign Execution',
          body: 'Once the content is ready, we manage the rollout across your chosen platforms, keeping messaging consistent and aligned with your overall marketing strategy.',
        },
        {
          title: 'Optimization & Analytics',
          body: 'We continuously track how your AI influencer’s content performs, refining tone, visuals, and messaging based on real engagement data to improve results over time.',
        },
      ],
    },
    {
      key: 'Cross-platform Influencer Campaigns',
      items: [
        {
          title: 'Instagram Influencer Marketing',
          platform: 'instagram' as ImPlatformId,
          body: 'We create Reels, Stories, and feed content that blends seamlessly with an influencer’s usual style while highlighting your brand naturally to an engaged audience.',
        },
        {
          title: 'Facebook Influencer Marketing',
          platform: 'facebook' as ImPlatformId,
          body: 'We tap into community-driven engagement, using trusted creators to reach audiences who value recommendations from people they follow.',
        },
        {
          title: 'YouTube Influencer Marketing',
          platform: 'youtube' as ImPlatformId,
          body: 'We produce dedicated videos, integrations, and shorts, giving your brand long-form exposure through creators with loyal, engaged audiences.',
        },
        {
          title: 'TikTok Influencer Marketing',
          platform: 'tiktok' as ImPlatformId,
          body: 'We create fast, authentic content designed to perform well within TikTok’s algorithm while staying true to each creator’s unique style.',
        },
        {
          title: 'LinkedIn Influencer Marketing',
          platform: 'linkedin' as ImPlatformId,
          body: 'We connect B2B brands with industry voices and thought leaders, building credibility with a more professional, decision-making audience.',
        },
        {
          title: 'Snapchat Influencer Marketing',
          platform: 'snapchat' as ImPlatformId,
          body: 'We focus on short, authentic, in-the-moment content that feels personal and keeps your brand top of mind with younger audiences.',
        },
      ],
    },
  ],
  transition:
    'All of this runs through one consistent process, no matter the platform or campaign type.',
} as const;

export const IM_PROCESS = {
  title: 'Our 5D Growth Framework For Influencer Marketing',
  intro:
    'Every successful influencer campaign follows a clear process. Our 5D Growth Framework keeps your strategy focused at every stage, from research to results.',
  stages: [
    {
      key: 'Discover',
      body: 'We research your brand, audience, and goals, then explore relevant Influencer Marketing Platforms to identify where your ideal customers are most active and engaged.',
    },
    {
      key: 'Design',
      body: 'We map out a campaign strategy tailored to your brand, defining messaging, content style, and the type of influencer partnerships that will resonate most with your Audience Engagement goals.',
    },
    {
      key: 'Develop',
      body: 'We move into influencer discovery, outreach, and partnership setup, building the foundation for content that feels authentic while staying aligned with your brand identity.',
    },
    {
      key: 'Deploy',
      body: 'Campaigns go live across chosen platforms, with content rolled out on schedule and communication managed closely to keep everything running smoothly.',
    },
    {
      key: 'Detect',
      body: 'We track performance in real time, analyzing engagement and results, then refine the strategy where needed to keep improving outcomes throughout the campaign.',
    },
  ],
  transition:
    'A strong process is only as good as the team running it. Here’s what sets ours apart.',
} as const;

export const IM_WHY = {
  title: 'Why Businesses Choose Digivibz For Influencer Marketing?',
  intro:
    'Influencer marketing works best when it’s handled by people who understand both strategy and creators. While many Social Media Influencer Marketing Agency providers focus only on posting content, we focus on building partnerships that actually drive results.',
  items: [
    { from: 'Guesswork', to: 'A Clear Strategy Built For Your Brand' },
    { from: 'Cold Outreach', to: 'Genuine Influencer Relationships' },
    { from: 'Juggling Multiple Vendors', to: 'One Team Managing Everything' },
    { from: 'Vanity Metrics', to: 'Real, Trackable Results' },
    { from: 'Outsourced Execution', to: 'An Experienced In-House Team' },
  ],
} as const;

export const IM_FAQ = {
  lead: 'Still weighing your options? Here are the questions we hear most often.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What is an influencer marketing agency?',
      a: 'An influencer marketing agency connects brands with content creators who have engaged audiences. They handle influencer discovery, outreach, campaign management, and reporting, so brands can run effective campaigns without managing everything in-house.',
    },
    {
      q: 'What does an influencer marketing agency do?',
      a: 'An Influencer Advertising Agency typically manages the entire process, from finding the right influencers to negotiating partnerships, planning content, and tracking performance. As part of our full digital marketing services, we handle all of this so your brand gets measurable results from every campaign.',
    },
    {
      q: 'What types of influencers does DIGIVIBZ LLC work with?',
      a: 'We work with nano, micro, and macro influencers across every major platform, matching each brand with creators whose audience and content style genuinely align with their goals.',
    },
    {
      q: 'What does influencer marketing do?',
      a: 'Influencer marketing helps brands build trust and reach new audiences through creators their target customers already follow, driving awareness, engagement, and conversions in a way traditional ads often can’t.',
    },
    {
      q: 'How does influencer marketing work?',
      a: 'Brands partner with influencers to create authentic content promoting their product or service. The influencer’s audience sees this as a trusted recommendation, which helps drive engagement, traffic, and sales.',
    },
    {
      q: 'Is influencer marketing effective?',
      a: 'Yes, when done strategically. Campaigns built on proper influencer vetting and clear goals consistently outperform generic advertising by reaching audiences through voices they already trust and engage with.',
    },
    {
      q: 'What platforms are best for influencer marketing?',
      a: 'The best platform depends on your audience and goals. We run campaigns across Instagram, Facebook, YouTube, TikTok, LinkedIn, and Snapchat, choosing the right mix based on where your customers are most active.',
    },
    {
      q: 'What types of influencers do you work with?',
      a: 'We work with influencers across every tier and platform, selecting creators based on audience relevance and engagement quality rather than follower count alone.',
    },
    {
      q: 'How much does influencer marketing cost?',
      a: 'Costs vary based on influencer tier, platform, and campaign scope. We build custom packages based on your budget and goals, so you only pay for what fits your specific strategy.',
    },
    {
      q: 'What industries work best with influencer marketing?',
      a: 'Most industries benefit from influencer marketing, including fashion, beauty, tech, food, fitness, and finance. The key is finding creators whose audience genuinely aligns with your specific product or service.',
    },
    {
      q: 'What is UGC in influencer marketing?',
      a: 'UGC, or user-generated content, is authentic content created by influencers or customers featuring your brand. It’s used in campaigns and ads because it feels more genuine than traditional branded content.',
    },
    {
      q: 'Do you manage influencer campaigns end-to-end?',
      a: 'Yes, our Influencer Outreach Services cover the entire process, from discovery and negotiation to content approval, campaign execution, and performance reporting, so you don’t have to manage it yourself.',
    },
    {
      q: 'Why should brands invest in influencer marketing?',
      a: 'Influencer marketing builds trust faster than traditional advertising. As a long-term Brand Influencer Marketing strategy, it drives awareness, engagement, and sales through voices your audience already follows and trusts.',
    },
  ],
} as const;

export const IM_CTA = {
  title: 'Ready To Grow Your Brand With The Right Influencers?',
  body: 'Great influencer partnerships don’t happen by accident. They come from strategy, careful vetting, and clear communication from start to finish. Whether you’re running your first campaign or looking to scale an ongoing influencer strategy, our team is ready to help you connect with creators who actually move the needle for your brand.',
  button: 'Get A Free Influencer Marketing Plan',
} as const;
