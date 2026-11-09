/**
 * Copy for the Content Writing service page (`/service/content-writing`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - stray space before commas normalized ("our words,no" -> "our words, no")
 * - sentence-case after a full stop in the closing CTA ("no commitment" -> "No commitment")
 * - FAQ "Q:" / stray "A:" format markers dropped (they were Q&A labels, not copy)
 *
 * NOTE: two passages arrive truncated in the source copy and are kept as-is
 * pending client confirmation — Script Writing ("...from the first line to the")
 * and the Detect stage ("...and refine the st").
 */

export const CW_HERO = {
  badge: 'Content Writing',
  titleLead: 'Best Content Writing Services for SEO, AI Search and ',
  titleHighlight: 'Business Growth',
  intro:
    'Digivibz combines skilled human writers with AI-powered precision to fuel your website with blogs, sales copy, SEO pages, and everything in between. Built for businesses that want content that ranks, reads well, and actually converts.',
  cta: 'Get My Free Content Plan',
} as const;

export const CW_PROBLEM = {
  lead: 'Most businesses are already creating content. The problem is almost none of it is working, and here’s why.',
  title: 'Stop Publishing Content That Disappears, Your Business Deserves More',
  p1a: 'You’re putting in the effort. Blog posts go up. Pages get written. Social captions get posted.',
  p1b: 'But the traffic doesn’t come. The leads don’t follow. And the content that took hours to create gets buried without a single conversion.',
  soundFamiliar: 'Sound familiar?',
  askLabel: 'Are you dealing with any of these?',
  pains: [
    'Content that doesn’t rank',
    'Words that don’t convert',
    'No time to write consistently',
    'Inconsistent brand voice',
    'AI content that feels hollow',
    'Wasted budget, zero results',
  ],
  closing: [
    'The problem isn’t that you need more content.',
    'It’s that you need content built with a strategy behind it.',
    'That’s exactly what Digivibz fixes.',
  ],
  transition:
    'The solution isn’t more content. It’s the right content, written by people who understand your industry and your audience.',
} as const;

export const CW_INDUSTRY = {
  title:
    'A Content Writing Services Company Built for Every Industry, Every Audience, Every Goal',
  intro:
    'Not all industries speak the same language, and neither should their content. At Digivibz, every project is handled by writers who understand your space, not just your brief. From fast-moving e-commerce brands to highly regulated industries like legal, medical, and finance, we bring the right expertise to every word we write.',
  features: [
    {
      title: 'Industry-Matched Writers',
      body: 'Every piece is assigned to a writer with direct experience in your niche, so the content reads like it was written by an insider, not a generalist.',
    },
    {
      title: 'Human + AI Hybrid Approach',
      body: 'We combine the creativity and judgment of skilled human writers with the speed and precision of AI-powered research tools, giving you content that’s both smart and scalable.',
    },
  ],
  transition:
    'Here’s every type of content we produce and what each one does for your business.',
} as const;

export const CW_TYPES = {
  title: 'Every Type of Content Your Business Needs, Under One Roof',
  intro:
    'Great content doesn’t just fill pages, it drives traffic, builds trust, and turns readers into buyers. Our SEO content writing services cover every format your business needs, delivered by human writers powered by AI-driven research.',
  items: [
    {
      title: 'Blog & Article Writing',
      body: 'From thought leadership to how-to guides, our SEO blog writing services craft content that ranks on Google and keeps your audience coming back. Every post is backed by deep research, strategic keywords, and a structure built for both readers and search engines.',
    },
    {
      title: 'Website Content Writing',
      body: 'First impressions matter. Our website content writing services give every page a clear voice, strong message, and SEO structure that performs. From homepages to service pages, every word is written with purpose and conversion in mind.',
    },
    {
      title: 'Product & E-commerce Writing',
      body: 'Descriptions that don’t just describe, they sell. We write product copy that answers buyer questions and pushes conversions. Each piece is crafted to reduce hesitation and move shoppers confidently toward checkout.',
    },
    {
      title: 'Copywriting Services',
      body: 'Headlines, landing pages, service pages, ads, our SEO copywriting services turn browsers into leads with copy built around intent. We write words that don’t just sound good, they drive measurable results.',
    },
    {
      title: 'Email Content Writing',
      body: 'Nurture, convert, and retain. We craft email sequences that feel personal, read naturally, and drive action at every stage. Whether it’s a welcome flow or a re-engagement campaign, every email has a clear goal and a clear CTA.',
    },
    {
      title: 'Social Media Content Writing',
      body: 'Scroll-stopping captions, posts, and campaign copy tailored to your brand voice across every platform. We keep your feed consistent, engaging, and always aligned with what your audience wants to see.',
    },
    {
      title: 'SEO Content Writing',
      body: 'Our SEO-friendly content writing services are built to rank, without sacrificing readability or brand tone. We balance search intent with storytelling so your content wins on both fronts.',
    },
    {
      title: 'B2B & Corporate Content',
      body: 'Long sales cycles need smart content. Our B2B content writing services speak directly to decision-makers with authority and clarity. From whitepapers to case studies, we create content that earns trust and moves deals forward.',
    },
    {
      title: 'Technical Content Writing',
      body: 'Our technical content writing services translate expertise into content your audience actually understands. We work with subject matter experts to ensure every detail is accurate, clear, and credible.',
    },
    {
      title: 'Script Writing Services',
      body: 'Video scripts, podcast outlines, explainer content, words written for ears, not just eyes. We match your tone, pace, and message so every word lands exactly the way it should. Whether it’s a 30-second ad or a full-length explainer, we script it to hold attention from the first line to the',
    },
    {
      title: 'Ghostwriting Services',
      body: 'Your ideas, our words, no credit taken, full quality delivered. We write under your name with your exact voice, whether it’s a book, a LinkedIn article, or a thought leadership piece. The spotlight stays on you; we just make sure what you say is impossible to ignore.',
    },
  ],
  transition:
    'Wide range. But what makes them powerful is the system behind every single piece.',
} as const;

export const CW_FRAMEWORK = {
  title: 'How We Write Content That Actually Works, Our 5D Growth Framework',
  intro:
    'Every piece of content we deliver follows a proven, structured process. No shortcuts, no guesswork, just a repeatable system that turns your content into a growth engine.',
  stages: [
    {
      key: 'Discover',
      body: 'Before we write a single word, we get to know your business inside out. We research your target audience, analyze competitor content, identify high-value keywords, and map out the search intent behind every topic. This is where strategy is born, so everything we create has a clear purpose and direction.',
    },
    {
      key: 'Design',
      body: 'With insights in hand, we build a content blueprint tailored to your goals. We plan content formats, structure outlines, define tone of voice, and align every piece with your buyer journey, from awareness to decision. No two content plans look the same because no two businesses are the same.',
    },
    {
      key: 'Develop',
      body: 'This is where the writing happens. We lean on AI for research, structure, and speed, while human content specialists handle the writing, reviewing, and refining, ensuring accuracy, originality, brand voice, and readability. The outcome is content that reads naturally and connects with your audience from the very first line.',
    },
    {
      key: 'Deploy',
      body: 'Content is delivered publish-ready, properly formatted, internally linked, meta-optimized, and aligned with your brand guidelines. We handle every detail so you can go live without the back and forth.',
    },
    {
      key: 'Detect',
      body: 'Once live, we track how your content performs, rankings, traffic, engagement, and conversions. We analyze what’s working, identify what needs improvement, and refine the st',
    },
  ],
  transition:
    'That process has been running for 8 years across 12 industries. Here’s what it’s consistently delivered.',
} as const;

export const CW_PROOF = {
  title: 'Your Search for a Quality Content Writing Services Partner Ends Here',
  intro:
    'Dozens of agencies promise great content. Few deliver it consistently, strategically, and at scale. Here’s why businesses choose Digivibz and stay:',
  reasons: [
    {
      title: 'Clients Who Stay',
      body: 'Our 94% client retention rate speaks louder than any pitch. When businesses see content that ranks, converts, and grows their brand, they don’t leave. We don’t just deliver content, we become an extension of your team, invested in your success as much as you are.',
    },
    {
      title: 'Experience That Adapts',
      body: 'With over 8 years of content writing experience across 12+ industries, we’ve seen every algorithm update, every content trend, and every shift in audience behavior. We don’t just keep up, we stay ahead, so your content always works with the latest standards, not against them.',
    },
    {
      title: 'Results You Can Measure',
      body: 'We don’t chase word counts, we chase outcomes. From traffic growth to lead generation, every piece of content we produce is tied to a real business goal. Our data-driven approach has helped businesses across industries turn their content into a consistent, compounding revenue channel.',
    },
  ],
  statsLead: 'The numbers behind the retention, experience, and results.',
  stats: [
    { value: '500+', label: 'Projects Delivered' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '12+', label: 'Industries Served' },
  ],
} as const;

export const CW_FAQ = {
  lead: 'Still have questions before you get started? Here are the ones we hear most.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What is included in your content writing services?',
      a: 'Our content writing services cover everything your business needs (blogs, website copy, product descriptions, email content, social media posts, B2B content, technical writing, and more). Every project includes keyword research, content strategy, writing, editing, and SEO optimization, all delivered through our proven 5D Growth Framework.',
    },
    {
      q: 'Do you provide keyword research with content writing?',
      a: 'Yes. Keyword research is built into every project, not sold as an add-on. Before we write a single word, we identify the terms your audience is searching for and map them naturally into your content so everything we deliver is positioned to rank from day one.',
    },
    {
      q: 'Can you write content for my specific industry?',
      a: 'Yes. We’ve written content across 12+ industries, including e-commerce, healthcare, finance, tech, real estate, and more. Every project is assigned to a writer who understands your niche, so the content reads like it was written by an insider, not a generalist.',
    },
    {
      q: 'What is the difference between content writing and copywriting?',
      a: 'Content writing focuses on informing, educating, and engaging your audience (blogs, articles, and guides). Copywriting is built to persuade and drive action (landing pages, ads, and sales pages). We handle both, so your entire content strategy works together to inform, engage, and convert.',
    },
    {
      q: 'Do you write AI-assisted content or fully human content?',
      a: 'We use a Human + AI hybrid approach. Our AI content writing services use AI for research, structure, and efficiency, while every piece is written, reviewed, and refined by human content specialists ensuring accuracy, originality, and a brand voice that feels authentically yours.',
    },
    {
      q: 'Can you help with website service page content?',
      a: 'Absolutely. Service page content is one of the most important pieces of your website, it’s where visitors decide whether to trust you or leave. We write clear, persuasive service pages that explain what you offer, why it matters, and why your business is the right choice.',
    },
    {
      q: 'Can you help with e-commerce website content?',
      a: 'Yes. From product descriptions to category pages and collection copy, we write e-commerce content that answers buyer questions, builds trust, and pushes shoppers toward checkout without sounding like every other store online.',
    },
  ],
} as const;

export const CW_CTA = {
  title: 'Partner With a Content Writing Agency That Treats Your Growth as Its Own',
  body: 'Stop publishing content that goes nowhere. Let’s build a strategy that ranks, converts, and scales. Whether you need a single blog post or a full-scale content operation, Digivibz is ready to deliver. Tell us about your business and we’ll put together a free content plan tailored to your goals. No commitment, no fluff, just a clear roadmap to content that works.',
  button: 'Get My Free Content Strategy',
} as const;
