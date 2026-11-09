/**
 * Copy for the AI SEO Services service page (`/service/ai-seo-services`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - straight apostrophes -> typographic (’) to match site typography
 *   ("Here’s", "doesn’t", "you’re", "Google’s" …)
 * - leading/trailing spaces trimmed (several service items, all platform
 *   items and several FAQ answers started with a space, one GEO item had a
 *   trailing space — FLAGGED below)
 * - the Why items were written as one string with a " -> " separator
 *   ("Other Agencies Chase Rankings -> We Chase Visibility Everywhere");
 *   split into { from, to } fields. The arrow glyph is expressed by the
 *   visual treatment (strike-through + check), not rendered literally.
 *
 * Structure notes (flagged, rendered as written otherwise):
 * - the transition "Here’s exactly how we build that visibility, every
 *   service that gets your brand found across Google and AI platforms."
 *   appears TWICE in the brief: once after the pitch and again after the
 *   Why section. Both are rendered (FLAGGED to the client).
 * - "Explore Our AI SEO Services" sits between the pitch transition and the
 *   services lead; rendered as a button that scrolls to the services
 *   section (FLAGGED — it may have been intended as a heading).
 * - services section renders title then lead ("AI-Powered SEO Services" /
 *   "Getting found in AI search isn’t one fix…"); the brief listed the lead
 *   first (layout order only, copy unchanged).
 * - no FAQ lead line was supplied; a short UI microcopy lead was added.
 *
 * Kept verbatim pending client input (flagged):
 * - pitch p2: "AI Platforms don’t just crawl pages" (capital P mid-sentence)
 * - FAQ Optimization item: "so Platforms like ChatGPT" (capital P)
 * - platforms closing: "real Optimize for AI Search Engine strategy, not
 *   guesswork" (reads as an unfinished phrase)
 * - mixed spellings: British "realise" beside US "summarizing/optimizing"
 *
 * Added UI microcopy (not client copy; layout parity with the other service
 * pages): hero badge + secondary button, hero floating chips, section
 * badges, "01-05" numbering on the problem list, group service counts,
 * process pills, FAQ lead, a secondary "Talk to our team" contact link in
 * the final CTA, and all labels/status text inside the visuals (questions,
 * answers, citation sources, parse tags, wireframe slot labels, platform
 * statuses, pipeline detail lines).
 */

export const AISEO_HERO = {
  badge: 'AI SEO Services',
  titleLead: 'AI SEO Services to Help You Show Up ',
  titleHighlight: 'Everywhere People Search',
  intro:
    'Search has changed. People now ask ChatGPT, Google AI Overviews, and Perplexity for answers instead of typing a query and scrolling through links. When businesses look for an AI SEO Agency, they need more than rankings, they need visibility across every platform people use to search. That’s what Digivibz delivers, combining proven SEO with AI-first strategy so you’re found no matter how people search.',
  cta: 'Get Your Free AI Search Audit',
  secondary: 'See how we work',
  transition:
    'But here’s what most businesses don’t realise while they’re focused on Google rankings, AI platforms are already answering their customers’ questions without them.',
} as const;

export const AISEO_PROBLEM = {
  title: 'Your Business Doesn’t Exist in AI Search Results',
  lead: 'While you’re focused on ranking, AI platforms are already answering your customers’ questions, and if your brand isn’t part of that answer, you don’t exist to them. Here’s what that usually looks like.',
  items: [
    'Ranking on Google Doesn’t Guarantee Ranking in AI',
    'AI Answers Your Customers Without Mentioning You',
    'Content That Ranks on Google Isn’t Always Picked Up by AI',
    'No Way to Know If You Show Up in AI Overviews',
    'Your Competitors Could Be Getting Recommended by AI',
  ],
  closing:
    'This is exactly why more businesses are moving past traditional Search Engine Optimization (SEO) alone and investing in real AI Search Optimization to protect their Brand Visibility in AI Search before competitors take that space first.',
  transition:
    'Fixing this takes more than old-school tactics, it takes a team that understands how Generative AI and Machine Learning are reshaping search itself. Here’s how we work.',
} as const;

export const AISEO_PITCH = {
  title: 'Search Changed Shape. Your Strategy Should Too.',
  p1: 'For years, ranking on Google was the whole game. Now, AI platforms are summarizing, answering, and recommending before a user ever clicks a link. That’s not a threat to Search Engine Optimization (SEO), it’s an evolution of it.',
  p2: 'AI Platforms don’t just crawl pages, they understand meaning, context, and intent. That means visibility now depends on a real AI SEO Strategy, one built around Semantic Search, Entity Optimization, and User Intent, not just keywords stuffed into a page.',
  p3: 'At Digivibz, we don’t replace your SEO foundation, we build on it. Combining classic On-Page SEO and Technical SEO with AI Search Optimization, so you’re visible everywhere your customers are actually looking, Google, ChatGPT, Perplexity, and beyond.',
  transition:
    'Here’s exactly how we build that visibility, every service that gets your brand found across Google and AI platforms.',
  explore: 'Explore Our AI SEO Services',
} as const;

export interface AiSeoServiceItem {
  readonly title: string;
  readonly body: string;
}

export interface AiSeoServiceGroup {
  readonly key: string;
  readonly items: readonly AiSeoServiceItem[];
}

export const AISEO_SERVICES: {
  readonly title: string;
  readonly lead: string;
  readonly groups: readonly AiSeoServiceGroup[];
  readonly transition: string;
} = {
  title: 'AI-Powered SEO Services',
  lead: 'Getting found in AI search isn’t one fix, it’s a full strategy. Here’s how we build it.',
  groups: [
    {
      key: 'AI Search Optimization Services',
      items: [
        {
          title: 'AI Keyword Research & Analysis',
          body: 'People used to type short search terms. Now they ask AI Platforms full questions. We study how your customers actually phrase these questions on Google, ChatGPT, and Perplexity, so your Keyword Research is based on how people search today.',
        },
        {
          title: 'AI-Powered SEO Strategy',
          body: 'Once we understand where you stand, we build a full plan made for your industry and competitors. It combines proven SEO Strategy basics with tactics designed specifically for AI search.',
        },
        {
          title: 'AI Search Content Optimization',
          body: 'Content that ranks well on Google isn’t always picked up by AI Platforms. We improve your content through Content Optimization and Natural Language Processing (NLP) principles, so it’s easy for both Google and AI models to read and understand.',
        },
        {
          title: 'Generative Engine Optimization (GEO)',
          body: 'Our GEO Services make sure AI Platforms actually see, understand, and recommend your business.',
        },
        {
          title: 'AI Search Visibility Optimization',
          body: 'We improve how often and how favorably your brand shows up when AI Platforms generate answers, so you’re part of the conversation, not left out of it. This is the core of our Generative Engine Optimization Services, built to keep you visible as AI search grows.',
        },
        {
          title: 'AI Overview Optimization',
          body: 'Google’s AI Overviews now sit above traditional search results. We optimize your content specifically to earn a place inside these AI-generated summaries, using AI Overview Optimization techniques built for this exact placement.',
        },
        {
          title: 'LLM Optimization Services',
          body: 'AI platforms like ChatGPT and Gemini rely on large language models to understand information and generate responses. We optimize your content structure, entities, and information clarity so LLMs can better understand your brand, improving your chances of being recognized and referenced in AI-generated answers.',
        },
        {
          title: 'AI Citation Optimization',
          body: 'Getting mentioned by name matters. As part of our GEO Optimization Services, we work to increase the chances AI platforms cite your business directly as a trusted source, using Data-Driven Marketing to track and improve citation frequency over time.',
        },
      ],
    },
    {
      key: 'Answer Engine Optimization (AEO)',
      items: [
        {
          title: 'Answer Optimization Services',
          body: 'We structure your content around the exact questions your customers are asking, so AI platforms can pull clear, direct answers straight from your website.',
        },
        {
          title: 'Structured Data Optimization',
          body: 'Using Structured Data, we organize your content in a way AI platforms and search engines can easily read and understand, a core part of our AEO Optimization Services that improves your chances of being selected as the answer.',
        },
        {
          title: 'FAQ Optimization',
          body: 'We format your FAQs specifically for AI pickup, clear questions, direct answers, so Platforms like ChatGPT and Google AI Overviews can reference them accurately. This is where our Answer Engine Optimization Services really shine.',
        },
        {
          title: 'Featured Snippet Optimization',
          body: 'We position key content to win the answer box on Google, the space that appears before every other search result, a key piece of our broader AEO SEO Services approach.',
        },
        {
          title: 'Voice Search Optimization',
          body: 'As more people use voice assistants to search, we optimize your content for spoken queries, using best practices so you show up in voice results too.',
        },
      ],
    },
  ],
  transition:
    'Every service we just described is built for the platforms your customers are already searching on. Here’s where we work.',
};

export interface AiSeoPlatform {
  readonly name: string;
  readonly body: string;
}

export const AISEO_PLATFORMS: {
  readonly title: string;
  readonly lead: string;
  readonly items: readonly AiSeoPlatform[];
  readonly closing: string;
  readonly transition: string;
} = {
  title: 'The Platforms Your Customers Search On. And Where We Work.',
  lead: 'AI search isn’t one platform, it’s a growing ecosystem. We build your visibility across every major AI search platforms your customers are already using, not just Google.',
  items: [
    {
      name: 'Google AI Overviews',
      body: 'Earning placement inside Google’s AI-generated summaries at the top of search results.',
    },
    {
      name: 'ChatGPT Search',
      body: 'Through dedicated ChatGPT Optimization Services, we help your brand get referenced when people search directly inside ChatGPT.',
    },
    {
      name: 'Perplexity AI',
      body: 'Our Perplexity Optimization Services improve how your content is sourced and cited within Perplexity’s AI-powered answers.',
    },
    {
      name: 'Claude AI',
      body: 'Optimizing your content structure so Anthropic’s Claude can accurately understand and reference your business.',
    },
    {
      name: 'Grok AI',
      body: 'Positioning your brand for visibility within Grok’s AI-driven search and recommendations.',
    },
    {
      name: 'Google Gemini',
      body: 'Using Gemini AI Optimization, we improve how your content is picked up and presented through Google’s Gemini model.',
    },
    {
      name: 'Microsoft Copilot',
      body: 'Ensuring your business is visible when users search and ask questions through Copilot.',
    },
  ],
  closing:
    'Wherever your customers are asking questions, we make sure your business is part of the answer. That’s the goal behind everything we do, real Optimize for AI Search Engine strategy, not guesswork.',
  transition:
    'Covering every platform is one thing. Having a structured process behind it is what makes it work consistently.',
};

export const AISEO_PROCESS = {
  title: 'Our 5D Growth Framework for AI Search Visibility',
  lead: 'Getting found by AI search isn’t luck, it’s a process. Here’s how we take you from invisible to referenced, step by step.',
  stages: [
    {
      key: 'Discover',
      body: 'We start with a full AI SEO Audit & Analysis, using Competitor Analysis and SEO Tools like Google Search Console and Google Analytics to understand exactly where you stand across Google and AI platforms.',
    },
    {
      key: 'Design',
      body: 'Based on what we find, we design a custom AI SEO Strategy built around your industry, your competitors, and the specific AI platforms your customers use most.',
    },
    {
      key: 'Develop',
      body: 'We build out the content, structure, and technical foundation, covering Technical SEO, Off-Page SEO, and Link Building, so both Google and AI models can properly read and trust your site.',
    },
    {
      key: 'Deploy',
      body: 'Your optimized content goes live, structured for AI Search Marketing across every platform we’ve identified, from Google AI Overviews to ChatGPT and Perplexity.',
    },
    {
      key: 'Detect',
      body: 'We continuously track performance using Predictive Analytics and Data Analysis, refining your AI Search Visibility Services as AI platforms evolve, so you stay visible long term, not just for a moment.',
    },
  ],
  transition:
    'That process is only as good as the team running it. Here’s how we compare to every other agency claiming to do AI SEO.',
} as const;

export const AISEO_WHY = {
  title: 'What Makes Digivibz Different?',
  lead: 'Choosing the right partner for Artificial Intelligence SEO Services makes the difference between staying visible and getting left behind. Here’s how we compare.',
  items: [
    {
      from: 'Other Agencies Chase Rankings',
      to: 'We Chase Visibility Everywhere',
    },
    {
      from: 'Generic SEO Reports',
      to: 'Real AI Search Visibility Tracking',
    },
    {
      from: 'One-Size-Fits-All Strategy',
      to: 'Strategy Built for Your Industry and Platforms',
    },
    {
      from: 'SEO That Ends at Rankings',
      to: 'SEO That Extends Into AI Answers',
    },
    {
      from: 'Slow to Adapt',
      to: 'Built for How Search Works Right Now',
    },
  ],
  note: 'With a real strategy behind your AI Search Presence Optimization, Digivibz helps you stay visible everywhere your customers are searching, today and as AI search keeps evolving.',
  /* Second occurrence of the pitch transition — rendered verbatim, FLAGGED. */
  transitionAgain:
    'Here’s exactly how we build that visibility, every service that gets your brand found across Google and AI platforms.',
} as const;

export const AISEO_FAQ = {
  lead: 'Straight answers before you commit.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What are AI SEO services?',
      a: 'AI SEO services help your business get found on Google and AI platforms like ChatGPT and Perplexity. They combine traditional SEO with strategies built specifically for how AI Platforms search, understand, and recommend content.',
    },
    {
      q: 'What is AI SEO and how does it work?',
      a: 'AI SEO optimizes your content so both search engines and AI platforms can find, understand, and reference it. It uses Semantic Search, Entity Optimization, and Natural Language Processing (NLP) to align content with how AI actually processes information.',
    },
    {
      q: 'How is AI SEO different from traditional SEO?',
      a: 'Traditional SEO focuses on ranking on Google. AI SEO goes further, optimizing for Generative AI Search Optimization so your brand also appears inside AI-generated answers on platforms like ChatGPT and Google AI Overviews.',
    },
    {
      q: 'What is the difference between GEO and AEO?',
      a: 'GEO improves your visibility inside AI-generated answers on platforms like ChatGPT, Gemini, and Google AI Overviews. AEO focuses on winning direct answers like Featured Snippets, FAQs, and voice search. Together, they get your brand seen everywhere customers search.',
    },
    {
      q: 'How can AI improve SEO performance and search visibility?',
      a: 'AI improves SEO through Predictive Analytics and Data Analysis, identifying patterns humans might miss. This leads to smarter AI Search Visibility Optimization, better content structure, and stronger performance across both Google and AI platforms.',
    },
    {
      q: 'Can AI SEO help my business appear in AI search results?',
      a: 'Yes. Through AI Answer Optimization and structured content, we improve your chances of being referenced or cited directly within AI-generated search results across major platforms.',
    },
    {
      q: 'How do you optimize websites for ChatGPT, Google AI Overviews, Gemini, and Perplexity?',
      a: 'We use GEO SEO Services, structuring your content, data, and answers so each platform can accurately understand, trust, and reference your business when generating responses.',
    },
    {
      q: 'How do you measure AI SEO success and visibility?',
      a: 'We track citation frequency, AI-generated mentions, and traditional rankings using Google Search Console and Google Analytics, giving you a clear, measurable picture of your AI Search Visibility Optimization over time.',
    },
    {
      q: 'How long does AI SEO take to show results?',
      a: 'Most businesses start seeing measurable improvements within 3 to 6 months, though timelines vary depending on competition, current visibility, and how much content needs optimization.',
    },
    {
      q: 'How much do AI SEO services cost?',
      a: 'Pricing depends on your business size, goals, and current SEO foundation. We provide a custom quote after understanding your specific needs during a free consultation.',
    },
    {
      q: 'Is AI SEO worth investing in for my business?',
      a: 'Yes. As more customers use AI Platforms to search, businesses without Generative Search Optimization risk becoming invisible. Investing early helps you stay ahead as search continues shifting toward AI.',
    },
  ],
} as const;

export const AISEO_CTA = {
  title: 'Ready to Show Up Where Your Customers Are Actually Searching?',
  body: 'Google isn’t the only place your customers are looking for answers anymore. Every day you wait, competitors are getting recommended by AI Platforms your business isn’t even part of. Let’s fix that before it costs you more customers.',
  primary: 'Get Your Free AI Search Visibility Audit',
} as const;
