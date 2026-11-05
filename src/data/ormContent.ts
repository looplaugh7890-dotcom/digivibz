/**
 * Copy for the Online Reputation Management service page
 * (`#/service/online-reputation-management`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - outline numbering stripped from the service list and 5D stages
 *   ("1. Brand Monitoring Services" -> "Brand Monitoring Services"; the
 *   numbers are rendered by the components)
 * - FAQ "Q:" / "A:" format markers dropped (they were Q&A labels, not copy)
 * - stray trailing spaces and mid-sentence line breaks normalized
 */

export const ORM_HERO = {
  badge: 'Online Reputation Management',
  titleLead: 'Online Reputation Management Services Designed to ',
  titleHighlight: 'Win Trust at First Search',
  intro:
    'DIGIVIBZ is a digital marketing company that brings the same focus and results you’d expect from a dedicated reputation management company, removing negative content, highlighting your best reviews, and building a brand people trust at first glance, so your next customer chooses you with confidence.',
  cta: 'Get Your Free Reputation Audit',
  secondary: 'See how we manage it',
  stats: [
    { value: '300+', label: 'Brands Protected' },
    { value: '60,000+', label: 'Reviews Managed' },
    { value: '4.8/5', label: 'Average Client Rating' },
    { value: '95%', label: 'Client Reputation Improvement Rate' },
  ],
} as const;

export const ORM_PROBLEM = {
  lead: 'Every day your reputation goes unmanaged, it’s costing you customers you never even knew you lost.',
  title: 'Your Online Reputation Is More Than Just Reviews',
  lines: [
    'Before a customer calls you, they search you.',
    'Before a client signs a contract, they Google you.',
    'Before a patient books an appointment, they read your reviews.',
    'And in those few seconds of searching, before they’ve ever spoken to you, they’ve already made a decision.',
  ],
  problemQ: 'The problem? You may not like what they’re finding.',
  askLabel: 'Are any of these happening to your business right now?',
  scenarios: [
    {
      title: 'A prospect finds a one-star review from two years ago.',
      body: 'They don’t know the context. They don’t know your side. They just close the tab and call your competitor.',
    },
    {
      title: 'An old complaint ranks on page one of Google.',
      body: 'It’s outdated. It’s unfair. But it’s there every time someone searches your name. And it’s quietly turning away customers you’ll never know you lost.',
    },
    {
      title: 'A dissatisfied customer posts about you on social media.',
      body: 'It gets shared. It gets seen. And by the time you notice it. The damage is already done.',
    },
    {
      title: 'You’ve tried responding to reviews yourself.',
      body: 'But it’s scattered, inconsistent, and the negative content is still ranking. Good intentions without a system don’t move the needle.',
    },
  ],
  closing: [
    'The cost of an unmanaged reputation isn’t just embarrassing.',
    'It’s lost revenue, lost clients, and lost growth happening silently, every day.',
    'That’s exactly what DIGIVIBZ is built to fix.',
  ],
  transition:
    'Fixing a reputation isn’t just a technical job, it takes a team that moves fast and treats your brand like their own. Here’s who’s in your corner.',
} as const;

export const ORM_WHY = {
  title: 'What Makes DIGIVIBZ the Right ORM Agency for You',
  features: [
    {
      title: 'A Team That Actually Cares',
      body: 'You get a dedicated specialist, not a ticket number. We treat your reputation like it’s our own.',
    },
    {
      title: 'Speed When It Matters',
      body: 'Reputation issues don’t wait, so neither do we. We respond fast and act faster.',
    },
    {
      title: 'A Process That Works',
      body: 'Our 5D Growth Framework isn’t a guess. It’s a system refined campaign after campaign.',
    },
    {
      title: 'Real Transparency',
      body: 'You’ll always know what we’re doing, why we’re doing it, and how it’s working. No black boxes, no jargon.',
    },
  ],
  transition:
    'Here’s exactly what we do and how each service protects and rebuilds your reputation.',
} as const;

export const ORM_SERVICES = {
  intro:
    'Whether it’s business reputation management or personal reputation management services, we’ve built a system to handle it all',
  hook: 'Here’s exactly how.',
  items: [
    {
      title: 'Brand Monitoring Services',
      body: 'We check the internet every day for anything new about your brand (Google reviews, social mentions, news, blogs, and forums). Our online brand monitoring services spot it the moment it happens, so you’re never the last to know. This also keeps your brand active and consistent online, which is exactly the kind of signal Google rewards with better rankings.',
    },
    {
      title: 'Google Reputation Management',
      body: 'When someone searches your name on Google, what they see matters. Our Google review management services keep your search results and Google listing looking their best, and we reply to reviews for you.',
    },
    {
      title: 'Social Media Reputation Management',
      body: 'We keep an eye on your social media pages (comments, messages, posts) so nothing bad slips by unnoticed. Our brand reputation management services help us catch problems early and handle them before they grow.',
    },
    {
      title: 'Local Business Reputation Management',
      body: 'If you have a local business, people check your reviews and information before visiting. We make sure that information is correct and reply to reviews quickly, so your business looks trustworthy.',
    },
    {
      title: 'Negative Review Management',
      body: 'Got a bad review? We respond to it, try to fix the problem, and remove it if possible. Our reputation repair services turn a bad review into a chance to show you care.',
    },
    {
      title: 'Negative Content Suppression',
      body: 'Sometimes something negative shows up high on Google. We don’t wait for it to go away, we create better content to push it further down, so people see the good stuff first.',
    },
    {
      title: 'Crisis Reputation Management',
      body: 'If something big and bad happens to your brand, we act fast. We help control the damage, manage what people are saying, and protect your reputation, even after things calm down.',
    },
  ],
  transition:
    'Every service you just read runs on one structured system, built so nothing slips through the gaps.',
} as const;

export const ORM_FRAMEWORK = {
  title: 'How We Manage Your Reputation: The 5D Growth Framework',
  stages: [
    {
      key: 'Discover',
      body: 'We start by looking at what’s already out there: your reviews, search results, social mentions, and any negative content. This gives us a clear picture of where you stand today. We use this starting point to figure out exactly what’s helping your brand and what’s hurting it, so every next step is based on facts, not guesswork.',
    },
    {
      key: 'Design',
      body: 'Next, we plan exactly what needs to happen: which reviews to respond to, which content to suppress, and what story we want your brand to tell. This plan is built around your brand and your goals specifically, not a generic template, so every action we take actually moves the needle.',
    },
    {
      key: 'Develop',
      body: 'We build everything needed to make that plan work, like fresh content, response templates, and monitoring tools tailored to your brand. Every piece is created to support the bigger picture, whether that’s content built to outrank something negative or a response written to win back trust.',
    },
    {
      key: 'Deploy',
      body: 'Then we put the plan into action: publishing content, responding to reviews, and pushing the right message to the right places. We make sure everything goes out at the right time and in the right order, so the impact builds instead of getting lost.',
    },
    {
      key: 'Detect',
      body: 'Finally, we keep watching. We track results, catch new issues early, and adjust the plan so your reputation keeps improving. Reputation management isn’t a one-time fix, so we stay on top of new reviews, mentions, and search changes long after the first results come in.',
    },
  ],
  transition:
    'That system isn’t theoretical. Here’s what it’s actually done for brands like yours.',
} as const;

export const ORM_RESULTS = {
  title: 'Real Results, Not Just Promises',
  intro:
    'Our 5D Framework isn’t just a nice idea on paper. It’s the exact process behind every reputation we’ve helped turn around. Here’s what that’s looked like in practice.',
  cases: [
    {
      label: '#1',
      visual: 'rank' as const,
      body: [
        'A local healthcare clinic was stuck with an old complaint sitting right at the top of Google.',
        'It wasn’t fair, it wasn’t recent, but it was the first thing every new patient saw.',
        'We pushed it down with stronger, more relevant content and made sure every review going forward got a thoughtful response.',
        'Within 60 days, that complaint dropped from the top spot to page four and new patient calls went up by 35%.',
      ],
      metric: { value: '35%', label: 'More patient calls' },
    },
    {
      label: '#2',
      visual: 'stars' as const,
      body: [
        'A home services business was losing jobs to competitors with worse work but better ratings.',
        'Their Google rating sat at 3.2 stars, and most people never even called.',
        'We helped them start collecting genuine reviews consistently and responded to every single one, good or bad.',
        'In 90 days, their rating climbed to 4.6 stars, and inbound calls went up by 28%.',
      ],
      metric: { value: '4.6', label: 'Stars, up from 3.2' },
    },
    {
      label: '#3',
      visual: 'recovery' as const,
      body: [
        'An online store had a complaint go viral right in the middle of their busiest sales period.',
        'Every share was scaring off potential customers.',
        'We jumped on it fast, responded publicly, resolved it transparently, and pushed positive content above the noise.',
        'Within two weeks, the conversation had turned around, and they didn’t lose a single day of sales.',
      ],
      metric: { value: '0', label: 'Days of sales lost' },
    },
  ],
  closing:
    'This is what a real system looks like when it’s actually working for you, not just running campaigns, but protecting your business every single day.',
} as const;

export const ORM_FAQ = {
  lead: 'Still have questions before you get started? Here are the ones we hear most.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What are online reputation management services?',
      a: 'Online reputation management services help you control what people see when they search your name. This includes monitoring reviews and mentions, responding to feedback, removing or pushing down negative content, and promoting positive content so your brand looks trustworthy at first glance.',
    },
    {
      q: 'How to manage online reputation?',
      a: 'Managing your online reputation comes down to four simple steps. First, see what’s already out there about you (your reviews, search results, and social mentions). Second, respond to feedback, both good and bad. Third, fix or remove anything negative that’s hurting your image. Fourth, keep sharing good content so people see the best of your brand. Since this takes ongoing work, many businesses let an agency like DIGIVIBZ handle it for them.',
    },
    {
      q: 'How long does reputation management take?',
      a: 'It depends on the issue. Small fixes, like responding to a review, can happen in days. Bigger issues, like removing negative search results, usually take 60 to 90 days to show real improvement.',
    },
    {
      q: 'How much does an ORM typically cost?',
      a: 'Costs vary based on the work involved, smaller projects can start around a few hundred dollars a month, while bigger jobs like crisis management cost more. DIGIVIBZ offers a free audit to give you an accurate quote.',
    },
    {
      q: 'Is it possible to remove negative brand-related content from search results?',
      a: 'Sometimes, if it violates a platform’s policies or you have legal grounds. Otherwise, we use suppression: pushing it down with stronger content so it’s no longer the first thing people see.',
    },
    {
      q: 'Do online reputation managers write the reviews for your company?',
      a: 'No, writing fake reviews violates platform policies and can get your account penalized. Instead, we help you earn genuine reviews from real customers and respond to the ones you already have.',
    },
    {
      q: 'How to get more reviews on Google and other platforms?',
      a: 'The easiest way is to simply ask. Most happy customers won’t leave a review unless prompted, so send a quick follow-up email or text with a direct link to your review page right after a purchase or service.',
    },
    {
      q: 'Should I respond to all reviews, even the bad ones?',
      a: 'Yes. Responding to every review, good or bad, shows future customers you’re paying attention and that you care. With bad reviews especially, a calm, helpful response can turn a bad situation into proof that you handle problems well.',
    },
  ],
} as const;

export const ORM_CTA = {
  title: 'Ready to Take Control of Your Online Reputation?',
  body: 'Whether you need online reputation management services for business or online reputation management services for individuals, DIGIVIBZ has a plan built for you. Get a free audit today and see exactly what’s affecting your reputation, no obligation required.',
  button: 'Get Your Free Reputation Audit',
} as const;
