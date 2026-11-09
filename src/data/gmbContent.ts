/**
 * Copy for the Google My Business service page (`/service/google-my-business`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - list numbering stripped from services 3-7 ("3. Google Business Profile
 *   Optimization Service" etc. — the component renders its own numbering)
 * - FAQ `Q:` / `A:` markers dropped (structure, not copy)
 * - brackets dropped from the CTA button label ("[Get Your Free GMB Audit]")
 * - missing spaces repaired: "Attributes,Profile" -> "Attributes, Profile",
 *   "Products,we turn" -> "Products, we turn"
 * - "→ to" redundancy: the arrow is kept as the rendered separator and the
 *   following "to " dropped (the arrow already carries direction)
 * - leading / trailing spaces and line breaks normalized
 */

export const GMB_HERO = {
  badge: 'Google My Business',
  titleLead: 'Google Business Profile Management Services That ',
  titleHighlight: 'Get You Found First',
  intros: [
    'Your customers are searching on Google right now. But if your business isn’t showing up, they’re walking straight into your competitor’s door.',
    'A poorly managed or incomplete profile means missed calls, missed visits, and missed revenue. We fix that.',
    'At Digivibz, we provide expert Local SEO Services to manage and optimize your Google Business Profile so your business shows up where it matters most, at the top of local search, on Google Maps, and in front of people who are ready to buy.',
  ],
  cta: 'Get Your Free GMB Audit',
  secondary: 'See our process',
  stats: [
    { value: '500+', label: 'Google Business Profiles Managed' },
    { value: '98%', label: 'Client Retention Rate' },
    { value: '4.9★', label: 'Average Client Rating' },
    { value: '10+', label: 'Industries Served' },
  ],
  trust: 'Trusted by Local Businesses Across Industries',
} as const;

export const GMB_PROBLEM = {
  lead: 'So how do you know if your own profile is actually working for you or quietly losing you customers? Here’s where to look.',
  title: 'Your Business Is Invisible on Google, And It’s Costing You',
  p1: 'Most local businesses are losing customers every single day without even realizing it. Not because they have a bad product or service. But because they simply can’t be found online.',
  p2: 'Here’s what’s silently killing your local growth:',
  costs: [
    'Your profile is incomplete or unverified',
    'You’re not showing up in Google Maps results',
    'Competitors with weaker businesses are outranking you',
    'Negative reviews are driving customers away',
    'Your business information is inconsistent across the web',
    'You’re missing out on free traffic from Local Business SEO',
  ],
  closing:
    'Every day this continues, you’re leaving money on the table. The good news? It’s completely fixable.',
  transition:
    'Fixing this takes more than a quick setup, it takes specialists who treat your profile like their own business depends on it. Here’s why hundreds of local businesses trust us.',
} as const;

export const GMB_WHY = {
  title: 'What Makes Digivibz the Right Choice for Local Search',
  intro:
    'There’s no shortage of agencies claiming to do GMB Optimization Services. Here’s what makes Digivibz different:',
  features: [
    {
      title: 'We Are Specialists, Not Generalists',
      body: 'We don’t do a little bit of everything. Local search and Google Business Profile is our area of expertise and we go deep, not wide.',
    },
    {
      title: 'We Are Transparent With Everything',
      body: 'No hidden work, no vague reports. You always know exactly what we are doing, why we are doing it, and what results it is driving.',
    },
    {
      title: 'We Build Long Term Rankings',
      body: 'We don’t chase quick fixes that fade. Every strategy we implement is built to deliver sustainable local visibility that grows over time.',
    },
    {
      title: 'We Treat Every Profile Like It’s Our Own',
      body: 'Your business matters to us. We give every client the same level of attention, care, and dedication regardless of business size or industry.',
    },
  ],
  transition:
    'Here’s exactly what that looks like in practice, every service that keeps your profile visible, competitive, and trusted.',
} as const;

export const GMB_SERVICES = {
  title: 'All the Services That Get Your Business Found, Chosen, and Trusted',
  intro:
    'We don’t just set up your profile and disappear. Digivibz covers every aspect of your Google My Business presence so you stay visible, competitive, and ahead of the pack.',
  items: [
    {
      title: 'Google Business Profile Audit Service',
      body: 'We conduct a thorough audit of your entire profile, reviewing every section, ranking signal, photo quality, category accuracy, and review performance. You get a detailed report with clear, prioritized action steps so we know exactly where to start and what to fix first.',
    },
    {
      title: 'Google Business Profile Setup Service',
      body: 'We build your complete Google Business Profile Setup from scratch, selecting the right categories, writing a compelling business description, uploading photos, adding services, and completing full Google Business Profile Verification. Everything set up correctly from day one so your profile is ready to rank and convert.',
    },
    {
      title: 'Google Business Profile Optimization Service',
      body: 'We optimize every section of your profile for maximum visibility. From Google Business Profile Categories, Profile Attributes, Profile Photos, and Profile Videos to your Google Business Profile Website, Profile Messaging, Profile Booking, Profile Menu, and Google Business Profile Products, we turn your profile into a complete local storefront.',
    },
    {
      title: 'Google Map Pack Ranking Services',
      body: 'We use proven Google Maps SEO strategies to push your business into the top 3 local search results. Our approach combines profile optimization, citation building, review signals, and regular Google Posts to build your local authority and keep you ranking above the competition.',
    },
    {
      title: 'Local Citation Building Service',
      body: 'We build high-quality citations for your business across trusted directories and platforms. We ensure your business details are accurate and consistent everywhere online, maintaining full NAP Consistency and clean up any incorrect or duplicate listings affecting your rankings.',
    },
    {
      title: 'Google Review Management Services',
      body: 'We build a complete review generation and response system for your business. We create outreach strategies to get more genuine positive reviews, respond to every review professionally, and monitor your reputation continuously through smart Google Review Management to keep your rating strong.',
    },
    {
      title: 'Google Business Profile Suspension Recovery Service',
      body: 'We handle the entire suspension recovery process on your behalf, diagnosing the cause, preparing a strong reinstatement request, communicating with Google support, and following up until your profile is fully restored. We also put safeguards in place to prevent future suspensions.',
    },
  ],
  transition:
    'Every one of those services runs through the same structured process, so nothing falls through the cracks.',
} as const;

export const GMB_PROCESS = {
  lead: 'Every one of those services runs through the same structured process, so nothing falls through the cracks.',
  title: 'Our Proven Approach to Local Search Success',
  intro:
    'We don’t guess. We follow a structured, results-driven process that turns an underperforming profile into a local search powerhouse.',
  stages: [
    {
      key: 'Discover',
      body: 'We start by understanding your business, your target area, your competitors, and your current Google Business Profile standing. This gives us a clear picture of where you are and where you need to be.',
    },
    {
      key: 'Design',
      body: 'We build a custom strategy tailored to your business goals covering Google My Business Optimization, citation building, review management, and ranking priorities specific to your industry and location.',
    },
    {
      key: 'Develop',
      body: 'We execute the full plan setting up, optimizing, and strengthening every element of your profile. From content and categories to citations and Google Q&A, everything is built to perform.',
    },
    {
      key: 'Deploy',
      body: 'We go live. Your optimized profile, citations, and review strategy are activated and pushed into the local search ecosystem making your business visible to customers searching in your area right now.',
    },
    {
      key: 'Detect',
      body: 'We monitor your performance continuously through Google Insights tracking profile views, search queries, customer actions, ranking movements and make ongoing improvements to keep you growing.',
    },
  ],
  transition:
    'That process isn’t theoretical. Here’s exactly what it changes for your profile, from day one.',
} as const;

export const GMB_DIFF = {
  title: 'What Changes When Digivibz Takes Over Your Profile',
  intro:
    'Working with Digivibz means more than a one-time setup. You get a fully managed system that keeps your local presence visible, accurate, and competitive.',
  rows: [
    { from: 'Unverified and incomplete', to: 'a fully optimized local storefront' },
    { from: 'Buried on page 3', to: 'the top of local search' },
    { from: 'Inconsistent listings', to: 'clean, verified information everywhere' },
    { from: 'Invisible on Google Maps', to: 'the top 3 Map Pack' },
    { from: 'Guesswork', to: 'a system that keeps improving' },
  ],
} as const;

export const GMB_FAQ = {
  lead: 'Still have a few questions before you get started? Here are the ones we hear most.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What is a Google Business Profile?',
      a: 'It is a free business listing on Google that shows your business name, location, hours, reviews, and contact details when people search for you online.',
    },
    {
      q: 'What is Google Business Profile Management Service?',
      a: 'It is a done-for-you service that handles the setup, optimization, and ongoing management of your Google Business Profile to improve your local visibility and attract more customers.',
    },
    {
      q: 'How can Google Business Profile help my business grow?',
      a: 'It puts your business in front of local customers who are actively searching for your products or services on Google and Google Maps driving more calls, visits, and sales.',
    },
    {
      q: 'What is Google Map Pack (Local 3-Pack) Ranking?',
      a: 'It is the top 3 business listings that appear on Google when someone searches for a local service. Ranking here means maximum visibility and the highest chance of getting clicked.',
    },
    {
      q: 'How long does it take to rank a Google Business Profile?',
      a: 'Most businesses start seeing improvements within 30 to 60 days. Reaching the top 3 Map Pack typically takes 60 to 90 days depending on your industry and local competition.',
    },
    {
      q: 'What services are included in Google Business Profile management?',
      a: 'Our service covers profile audit, setup, optimization, citation building, review management, Map Pack ranking, and suspension recovery, everything your local presence needs to grow.',
    },
    {
      q: 'Is Google Business Profile management suitable for all businesses?',
      a: 'Yes. Any business that serves local customers whether you have a physical location or operate as a service area business, can benefit from professional profile management.',
    },
    {
      q: 'How can Google Business Profile management services improve local SEO?',
      a: 'A fully optimized profile sends strong relevance and trust signals to Google improving your Google Maps Ranking Services and overall local search visibility across your entire area.',
    },
    {
      q: 'How do I choose the right Google Business Profile management service for my business?',
      a: 'Look for a specialist agency with a proven track record, transparent reporting, and a structured process, not a generalist agency that treats it as an afterthought.',
    },
    {
      q: 'Can a suspended Google Business Profile be recovered?',
      a: 'Yes. We handle the entire reinstatement process diagnosing the issue, submitting a reinstatement request, and communicating with Google until your profile is fully recovered.',
    },
    {
      q: 'What is the typical cost of Google Business Profile management services?',
      a: 'Costs vary based on the scope of services and competition in your area. Contact us for a custom quote tailored to your business needs and goals.',
    },
  ],
} as const;

export const GMB_CTA = {
  title: 'Ready to Get Your Business Found on Google?',
  body: [
    'Every day without a fully optimized Google Business Profile is a day your competitors are taking customers that should be yours. The good news is, it doesn’t have to stay that way.',
    'Digivibz has everything you need to show up, stand out, and win locally. From profile setup to Map Pack rankings, we handle it all so you can focus on running your business.',
    'Let’s get your business to the top of local search today.',
  ],
  button: 'Get Your Free GMB Audit',
} as const;
