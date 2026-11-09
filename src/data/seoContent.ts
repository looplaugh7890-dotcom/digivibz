/**
 * Copy for the SEO Services service page (`/service/seo-services`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - straight apostrophes -> typographic (’) to match site typography
 *   ("Here’s", "Let’s", "what’s" …)
 * - leading/trailing spaces and line breaks normalized (several items had
 *   trailing spaces, the Why lead paragraph started with a space, and the
 *   "SEO Content Services" group heading had trailing spaces — FLAGGED below)
 * - missing initial letter restored in 1 place: "ll of these services run
 *   through one consistent system" -> "All of these services…" (FLAGGED below)
 *
 * Structure notes (flagged):
 * - no group carries a lead/description paragraph; every group goes straight
 *   to item cards
 * - near-duplicate item titles across groups (FLAGGED, rendered as written):
 *   "Content Optimization" (SEO Content Services) vs "Content Optimization
 *   Services" (On-Page SEO Services); "Backlink Building Services" (Local)
 *   sits beside "Link Building Services" (Off-Page)
 *
 * Kept verbatim pending client input (flagged):
 * - pitch paragraph 2: "What separates a SEO Services Agency…" ("a SEO"
 *   reads as "an SEO")
 * - FAQ answer 7: "We provide a Website SEO Audit Services first" (service
 *   name capitalized mid-sentence)
 *
 * Added UI microcopy (not client copy; layout parity with the other service
 * pages): hero badge + secondary button, section badges, hero floating chips,
 * "01-05" numbering on the problem list, group service counts, process pills,
 * a secondary "Talk to our team" contact link in the final CTA, and the
 * labels/numbers inside the visuals (keyword volumes, intent tallies,
 * position counter, matched counter, milestone labels).
 */

export const SEO_HERO = {
  badge: 'SEO Services',
  titleLead: 'Grow Your Business With SEO Services That ',
  titleHighlight: 'Actually Rank',
  intro:
    'You did not start your business to be invisible on Google. Every day your website stays hidden from search, another buyer finds someone else, clicks their link, and never thinks about you again. As a performance driven SEO Agency, Digivibz exists to change that story. We dig into why your site is being overlooked, fix what is holding you back, and build a system designed to get you found, get you clicked, and get you chosen. No guesswork. No recycled tactics. Just strategy shaped around how real customers actually search, compare, and buy.',
  cta: 'Get Your Free SEO Audit',
  secondary: 'See how we work',
  transition:
    'If that sounds familiar, here’s what’s likely happening to your traffic right now.',
} as const;

export const SEO_PROBLEM = {
  title: 'Your Website Is Losing Customers Before They Even Find You',
  lead: 'Without a real SEO strategy, your website quietly loses customers to competitors every single day. Here’s what that usually looks like.',
  items: [
    'Organic Traffic That Never Grows No Matter What You Publish',
    'Rankings That Drop Every Time Google Updates Its Algorithm',
    'A Website Built For Design, But Not Optimized For Search Engines',
    'Content That Gets Published But Never Reaches Your Audience',
    'No Clear System Tracking What Is Actually Working',
  ],
  closing:
    'This is exactly why more businesses are walking away from DIY fixes and turning to Professional SEO Services instead of letting their website rank on autopilot.',
  transition:
    'Fixing this takes more than a few blog posts, it takes a team that treats your rankings like their own revenue is on the line. Here’s how we work.',
} as const;

export const SEO_PITCH = {
  title: 'Not Just Another SEO Company Promising Rankings',
  p1: 'Search through any list of agencies and you will find the same promises repeated word for word, faster rankings, more traffic, guaranteed results. Most of them mean it when they say it. Few of them can actually prove it.',
  p2: 'What separates a SEO Services Agency that delivers from one that just talks is simple, visibility into the work. Some agencies hand you a monthly report full of numbers and call it strategy. Others disappear after the audit and leave you guessing what happens next. Digivibz was built differently, every action tied to a reason, every ranking tied to a decision you can see and understand.',
  p3: 'You are not looking for someone to run your SEO. You are looking for a partner who treats your growth like it matters as much to them as it does to you. That is the difference between hiring an agency and hiring the right one.',
  transition: 'Here’s everything that partnership actually covers.',
} as const;

export interface SeoServiceItem {
  readonly title: string;
  readonly body: string;
}

export interface SeoServiceGroup {
  readonly key: string;
  readonly items: readonly SeoServiceItem[];
}

export const SEO_SERVICES: {
  readonly title: string;
  readonly groups: readonly SeoServiceGroup[];
  readonly transition: string;
} = {
  title: 'Every SEO Service Your Growth Actually Needs',
  groups: [
    {
      key: 'SEO Strategy & Consulting',
      items: [
        {
          title: 'SEO Strategy Development',
          body: 'We build a custom roadmap based on your business goals and current position on Google, not a generic template pulled from someone else’s playbook.',
        },
        {
          title: 'SEO Consulting Services',
          body: 'Get direct access to a team that reviews your account, answers your questions honestly, and guides every decision with real strategy behind it.',
        },
        {
          title: 'SEO Competitor Analysis',
          body: 'We study who is outranking you and why, breaking down their content, their backlinks. Then we turn every gap we find into your next opportunity to close the distance and take their position.',
        },
        {
          title: 'SEO Roadmap Planning',
          body: 'Every action gets sequenced into a clear timeline, so you always know what is happening and why it matters.',
        },
      ],
    },
    {
      key: 'Technical SEO Services',
      items: [
        {
          title: 'Technical SEO Audit & Website Analysis',
          body: 'We run a full SEO Website Audit to uncover exactly what is holding your site back, from broken links to indexing issues search engines are silently penalizing you for.',
        },
        {
          title: 'Website Structure Optimization',
          body: 'We organize your site so both visitors and search engines can find what they need without confusion or wasted clicks.',
        },
        {
          title: 'Crawlability & Indexing Optimization',
          body: 'We make sure Google can actually see and index every page that matters, instead of missing your best content entirely.',
        },
        {
          title: 'Site Speed Optimization',
          body: 'Slow pages lose rankings and visitors. We speed up load times so neither one walks away.',
        },
        {
          title: 'Core Web Vitals Optimization',
          body: 'We fix the technical signals Google uses to judge user experience, directly impacting where you rank.',
        },
        {
          title: 'Schema Markup Implementation',
          body: 'We add structured data that helps search engines understand your content better, often earning richer, more clickable results.',
        },
        {
          title: 'SEO Migration Services',
          body: 'Redesigning or moving your site? We protect your rankings through the transition instead of letting them reset to zero.',
        },
      ],
    },
    {
      key: 'On-Page SEO Services',
      items: [
        {
          title: 'Keyword Research Services',
          body: 'We find the exact terms your customers are searching for, so your pages target demand that actually exists.',
        },
        {
          title: 'Keyword Mapping',
          body: 'Every keyword gets assigned to the right page, avoiding overlap and making sure each page has a clear purpose.',
        },
        {
          title: 'Meta Title & Description Optimization',
          body: 'We craft titles and descriptions that earn clicks, not just impressions, right from the search results page.',
        },
        {
          title: 'Header Optimization',
          body: 'We structure your headings so both readers and search engines understand your content at a glance.',
        },
        {
          title: 'Internal Linking Optimization',
          body: 'We connect your pages strategically, guiding visitors deeper into your site while spreading ranking authority where it counts.',
        },
        {
          title: 'Content Optimization Services',
          body: 'We refine existing content to match search intent, close gaps competitors are exploiting, and improve rankings without starting from scratch.',
        },
        {
          title: 'URL Optimization',
          body: 'We clean up your URLs so they are clear, keyword relevant, and built to perform, not just exist.',
        },
      ],
    },
    {
      key: 'SEO Content Services',
      items: [
        {
          title: 'SEO Blog Writing',
          body: 'We create blog content built around real search demand, positioning your brand as the answer before customers even finish typing their question.',
        },
        {
          title: 'Content Optimization',
          body: 'We refine existing pages to match search intent and close the gaps competitors are already exploiting through better content marketing.',
        },
        {
          title: 'Topic Cluster Development',
          body: 'We group related content around core themes, helping search engines see your site as a true authority in your industry.',
        },
        {
          title: 'Landing Page SEO',
          body: 'We optimize high-intent pages to rank and convert, turning search traffic into leads instead of just visits.',
        },
        {
          title: 'Content Gap Analysis',
          body: 'We uncover exactly what content your competitors have that you do not, then close that gap through SEO Content Optimization built to fill the missing demand.',
        },
      ],
    },
    {
      key: 'Local SEO Services',
      items: [
        {
          title: 'Local SEO Strategy',
          body: 'We build a plan focused on your specific service areas, making sure you show up where your actual customers are searching.',
        },
        {
          title: 'Google Business Profile Optimization',
          body: 'We optimize your profile so it stands out with accurate details, strong visuals, and information that earns clicks.',
        },
        {
          title: 'Google Maps SEO',
          body: 'We improve your visibility on Google Maps, helping nearby customers find and choose you first.',
        },
        {
          title: 'Local Keyword Research & Optimization',
          body: 'We target the exact terms local customers use, turning nearby searches into real foot traffic and calls.',
        },
        {
          title: 'Local Citation Building',
          body: 'We list your business accurately across trusted directories, strengthening the trust signals search engines rely on.',
        },
        {
          title: 'Backlink Building Services',
          body: 'We earn links from local sources that boost both your authority and your relevance in your area.',
        },
        {
          title: 'Review Management',
          body: 'We help you build and manage a strong review presence, since reviews directly influence local rankings and customer trust.',
        },
      ],
    },
    {
      key: 'Off-Page SEO Services',
      items: [
        {
          title: 'Off-Page SEO Strategy',
          body: 'We build a plan focused on earning trust signals beyond your website, strengthening how search engines view your authority.',
        },
        {
          title: 'Link Building Services',
          body: 'We secure quality backlinks from relevant, trusted sources, helping your site earn the authority search engines reward with rankings.',
        },
        {
          title: 'Digital PR & Brand Mentions',
          body: 'Through Digital PR Services, we get your brand featured and mentioned across credible platforms, building recognition and ranking signals together.',
        },
        {
          title: 'Guest Posting',
          body: 'We place your content on respected industry sites, earning both backlinks and exposure to audiences already searching for what you offer.',
        },
        {
          title: 'Brand Authority Building',
          body: 'Through dedicated Authority Building Services, we position your brand as a trusted name search engines and customers both recognize.',
        },
      ],
    },
    {
      key: 'Ecommerce SEO Services',
      items: [
        {
          title: 'Ecommerce SEO Strategy',
          body: 'We build a plan focused on your product catalog, buyer search behavior, and where your store is losing visibility.',
        },
        {
          title: 'Product Page SEO',
          body: 'We optimize individual product pages to rank for high-intent searches, turning browsers into buyers before they even compare options.',
        },
        {
          title: 'Category Page SEO',
          body: 'We structure and optimize category pages so search engines understand your store’s layout and rank it accordingly.',
        },
        {
          title: 'Ecommerce Technical SEO',
          body: 'We fix technical issues unique to online stores, from duplicate product URLs to slow-loading checkout flows hurting your rankings.',
        },
        {
          title: 'Conversion-Focused SEO',
          body: 'We combine ranking strategy with conversion principles, making sure traffic to your store actually turns into sales.',
        },
      ],
    },
    {
      key: 'Enterprise & Business SEO Services',
      items: [
        {
          title: 'B2B SEO Services',
          body: 'We build strategies around longer sales cycles and decision-maker searches, aligning your SEO campaign with how B2B buyers actually research.',
        },
        {
          title: 'SaaS SEO Services',
          body: 'We target the specific search behavior of software buyers, helping your platform get discovered earlier in their decision process.',
        },
        {
          title: 'International SEO Services',
          body: 'We structure your site to rank across multiple countries and languages, avoiding the technical conflicts that hurt global visibility.',
        },
        {
          title: 'Multi-Location SEO',
          body: 'We manage rankings across every location you operate in, keeping each one visible in its own local search results.',
        },
      ],
    },
    {
      key: 'SEO Analytics & Reporting',
      items: [
        {
          title: 'SEO Reporting',
          body: 'We deliver clear, honest reports that show real progress, not just charts designed to look impressive.',
        },
        {
          title: 'Ranking Tracking',
          body: 'We monitor your search engine ranking across key terms, so you always know exactly where you stand against competitors.',
        },
        {
          title: 'Traffic Analysis',
          body: 'Using Google Analytics and web analytics, we break down where your visitors come from and what they do once they arrive.',
        },
        {
          title: 'Conversion Tracking',
          body: 'We track what happens after the click, connecting your SEO efforts directly to leads, sales, and real business impact.',
        },
        {
          title: 'SEO Performance Monitoring',
          body: 'We continuously monitor performance, catching drops early and adjusting strategy before small issues become lost rankings.',
        },
      ],
    },
  ],
  transition:
    'All of these services run through one consistent system, not a patchwork of one-off fixes.',
};

export const SEO_PROCESS = {
  title: 'The System That Powers Every Ranking We Deliver',
  stages: [
    {
      key: 'Discover',
      body: 'We dig into your market, your competitors, and your current standing on Google to uncover exactly where the real opportunity lives. This stage removes the guesswork before a single change gets made.',
    },
    {
      key: 'Design',
      body: 'We build a custom strategy around what we find, mapping out the exact path from where you stand today to where you want your business to be. Every recommendation is tied to a clear reason.',
    },
    {
      key: 'Develop',
      body: 'We execute the plan across every layer of your website, from technical fixes to content and link building, turning strategy into real, measurable action instead of theory sitting in a document.',
    },
    {
      key: 'Deploy',
      body: 'We launch every optimization with precision, testing along the way to make sure nothing breaks and everything works together as one connected system, not scattered fixes.',
    },
    {
      key: 'Detect',
      body: 'We track performance continuously after launch, catching issues early and adjusting course before small problems have the chance to turn into lost rankings or wasted effort.',
    },
  ],
  transition:
    'That system is exactly why businesses keep choosing us over agencies running on autopilot.',
} as const;

export const SEO_WHY = {
  title: 'Why Do Businesses Choose Digivibz Over Every Other Agency?',
  lead: 'Most agencies sell SEO Optimization Services the same way, a checklist, a monthly report, and a promise that results are coming. Digivibz works differently, building every strategy around your specific market instead of applying the same playbook to every client.',
  items: [
    {
      from: 'Generic Checklists',
      to: 'Custom Strategy Built Around Your Market',
    },
    {
      from: 'Guesswork Driven Fixes',
      to: 'Proven System Backed By Real Data',
    },
    {
      from: 'Hidden Reporting',
      to: 'Full Transparency On Every Ranking Move',
    },
    {
      from: 'Automated Dashboards',
      to: 'Real Team You Can Actually Talk To',
    },
    {
      from: 'Vanity Metrics',
      to: 'Results You Can Track And Trust',
    },
  ],
  note: 'More businesses comparing their options for a Best SEO Agency are choosing a partner who treats their growth like it matters.',
} as const;

export const SEO_FAQ = {
  lead: 'Before you commit, here are the questions we hear most often.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What are SEO services and how can they help my business grow?',
      a: 'SEO services improve your website’s visibility on Google, helping you attract more organic traffic, generate leads, and grow revenue without relying entirely on paid ads.',
    },
    {
      q: 'What does an SEO agency do?',
      a: 'An SEO agency researches keywords, optimizes your website, builds authority through links, and tracks performance, all designed to improve your search engine ranking over time.',
    },
    {
      q: 'How does SEO work?',
      a: 'SEO works by aligning your website with what search engines and users are looking for, through technical fixes, quality content, and trusted backlinks that build authority.',
    },
    {
      q: 'What types of SEO services do you provide?',
      a: 'We offer technical SEO, on-page SEO, content strategy, local SEO, ecommerce SEO, enterprise SEO, and off-page authority building, all customized to your specific business goals.',
    },
    {
      q: 'Why should I hire an SEO company instead of doing SEO myself?',
      a: 'SEO changes constantly and requires technical skill, strategy, and time. A dedicated team avoids costly mistakes and gets results faster than trial and error alone.',
    },
    {
      q: 'How long does SEO take to show results?',
      a: 'Most businesses see initial movement within three to four months, with stronger, more consistent results building over six to twelve months depending on competition.',
    },
    {
      q: 'How much do SEO services cost?',
      a: 'Pricing depends on your website size, competition, and goals. We provide a Website SEO Audit Services first, then a custom quote based on real findings.',
    },
    {
      q: 'Is SEO worth investing in for small businesses?',
      a: 'Yes, SEO often delivers stronger long-term ROI than paid ads since traffic keeps coming without ongoing cost per click, making it valuable for businesses of any size.',
    },
    {
      q: 'How do you measure SEO success and performance?',
      a: 'We track rankings, organic traffic, conversions, and revenue impact, giving you clear reporting that connects SEO work directly to real business results.',
    },
    {
      q: 'What factors affect website SEO rankings?',
      a: 'Rankings are influenced by site speed, content quality, backlinks, mobile experience, technical health, and how well your pages match what searchers are actually looking for.',
    },
    {
      q: 'How do you create a customized SEO strategy for a business?',
      a: 'We start with research into your market, competitors, and current performance, then build a strategy around your specific goals instead of applying a generic template.',
    },
    {
      q: 'What is the difference between organic SEO and paid advertising?',
      a: 'SEO builds long-term visibility through unpaid rankings, while paid ads deliver instant traffic that stops the moment you stop paying. Most businesses benefit from both.',
    },
  ],
} as const;

export const SEO_CTA = {
  title: 'Ready To Rank Higher And Grow Faster?',
  body: 'Every day you wait is another day someone else gets found first, gets clicked, and gets chosen instead of you. Rankings do not fix themselves, and neither does lost revenue. Let’s change that, starting with a free, no pressure look at exactly where your website stands today and what it will take to move it forward.',
  primary: 'Get Your Free SEO Audit',
} as const;
