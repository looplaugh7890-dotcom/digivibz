/**
 * Copy for the Email Marketing service page (`#/service/email-marketing`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - "DigiVibz" -> "Digivibz" in FAQ #12 (brand spelling, matches site)
 * - platform lists split into chips: "GoHighLevel, Zoho, / Constant Contact, /
 *   GetResponse, / AWeber" -> five chips; "ConvertKit, / Drip" -> two chips
 * - leading / trailing spaces and line breaks normalized (stage bodies,
 *   service bodies, FAQ answers, platform notes, change rows)
 * - change rows split at their " -> " into before / after cells
 * - stage titles carry their parenthetical as `hint`
 *   ("Discover (We Learn Before We Write)" -> key + hint)
 *
 * Kept verbatim pending client input (flagged, punctuation/grammar likely
 * as intended or dropped in transit):
 * - problem lead: "But here's the question most businesses never ask, are
 *   your emails actually reaching people, or quietly disappearing?"
 *   (comma splice — reads as intentional copy style)
 * - automation service: "like welcome emails series" (likely "welcome email
 *   series")
 * - hero stat: "42% Average Open Rate Delivered"
 */

export const EM_HERO = {
  badge: 'Email Marketing',
  titleLead: 'Email Marketing Services Built to Drive ',
  titleHighlight: 'Leads and Sales',
  intros: [
    'Most people don’t take action the first time they visit your website. If you don’t follow up with them, they simply forget about your business and go with someone else instead. That’s what email marketing fixes. At Digivibz, we offer Email Automation Services that automatically send the right message to the right person at the right time, so you stay in touch with your customers and leads without doing extra work every day.',
    'Whether you want to welcome new subscribers, follow up with people who didn’t book or buy, or send a newsletter people actually enjoy reading, we build simple, effective email systems that turn one-time visitors into loyal, long-term customers.',
  ],
  cta: 'Get a Free Email Marketing Audit',
  secondary: 'See our process',
  stats: [
    { value: '800+', label: 'Email Campaigns Launched' },
    { value: '42%', label: 'Average Open Rate Delivered' },
    { value: '5X', label: 'Average ROI From Email Campaigns' },
    { value: '12+', label: 'Industries Served' },
  ],
} as const;

export const EM_PROBLEM = {
  lead: 'But here’s the question most businesses never ask, are your emails actually reaching people, or quietly disappearing?',
  title: 'Your Emails Could Be Losing You Customers Right Now',
  p1: 'Your business is solid. Your product or service is great. But if nobody’s opening your emails, none of that matters.',
  p2: 'Here’s what a weak email strategy is costing you every single day:',
  items: [
    'You’re losing leads because nobody follows up with them',
    'Your emails are landing in spam instead of the inbox',
    'People forget about you and buy from a competitor instead',
    'You’re sending the same message to everyone, and nobody’s engaging',
    'You have no idea what’s actually working and what’s wasting your time',
  ],
  closing:
    'The truth is, email is one of the easiest ways to stay in front of your customers, but only if it’s done right. When it’s ignored or done poorly, you lose leads, sales, and trust, all without even realizing it. At Digivibz, we fix that.',
  transition:
    'Fixing this takes more than writing better emails. It takes a team that builds the system behind them. Here’s why businesses trust Digivibz with theirs.',
} as const;

export const EM_WHY = {
  title: 'Here’s Why Growing Businesses Choose Digivibz for Email',
  intro:
    'We know you have options. Here’s why businesses that are serious about growth keep choosing Digivibz for their email marketing.',
  items: [
    {
      title: 'Built on Strategy, Not Guesswork',
      body: 'We don’t just write emails and hit send. Every campaign starts with a clear plan based on your goals, your audience, and what’s actually going to make them buy.',
    },
    {
      title: 'Focused on Getting Into the Inbox',
      body: 'An email that lands in spam is an email that never gets read. We follow best practices for Email Deliverability, so your messages actually reach your customers instead of disappearing.',
    },
    {
      title: 'Full Transparency Throughout',
      body: 'You always know what’s happening with your campaigns. From strategy to results, we keep communication clear and honest, no confusing reports, no guesswork.',
    },
    {
      title: 'Built for Long-Term Growth',
      body: 'Email marketing isn’t a one-time task, it’s an ongoing system. We build campaigns and automations that keep working for your business long after they’re set up.',
    },
  ],
} as const;

export const EM_SERVICES = {
  lead: 'Here’s every email service we offer and what each one does for your business.',
  title: 'See All Our Email Marketing Solutions in One Place',
  intro:
    'We handle every part of email marketing that helps your business generate more leads, more sales, and more repeat customers.',
  items: [
    {
      title: 'Email Campaign Management',
      variant: 'campaign',
      body: 'Planning, writing, and sending emails is only half the job. Our Email Campaign Management service handles everything from scheduling to performance tracking, so every campaign goes out at the right time and actually gets results.',
    },
    {
      title: 'Email Automation Services',
      variant: 'automation',
      body: 'Some emails should never depend on someone remembering to send them. We set up automated sequences, like welcome emails series, follow-ups, and reminders, that go out on their own, so you stay in touch with customers without lifting a finger.',
    },
    {
      title: 'Ecommerce Email Marketing',
      variant: 'ecommerce',
      body: 'Online stores lose sales every day from abandoned carts and one-time buyers who never return. Our Ecommerce Email Marketing service brings customers back with the right message at the right moment, turning browsers into buyers and buyers into repeat customers.',
    },
    {
      title: 'B2B Email Marketing',
      variant: 'b2b',
      body: 'Selling to businesses is different from selling to everyday customers. Our B2B Email Marketing service focuses on building trust over time, nurturing leads with useful, relevant emails until they’re ready to talk to your sales team.',
    },
    {
      title: 'Newsletter Marketing',
      variant: 'newsletter',
      body: 'A good newsletter keeps your audience engaged and your brand top of mind. Our Newsletter Marketing service creates content people actually want to open, not another email that gets ignored.',
    },
    {
      title: 'Email Copywriting Services',
      variant: 'copy',
      body: 'The words in your email decide whether someone reads on or hits delete. Our Email Copywriting Services craft clear, persuasive messages that sound like your brand and get people to take action.',
    },
    {
      title: 'Email List Building Services',
      variant: 'list',
      body: 'An email strategy is only as strong as the list behind it. Our Email List Building Services help you grow a list of real, interested subscribers, not random addresses that never engage.',
    },
    {
      title: 'Email Template Design',
      variant: 'template',
      body: 'How an email looks matters just as much as what it says. Our Email Template Design service creates clean, mobile-friendly designs that reflect your brand and make every email easy to read and act on.',
    },
    {
      title: 'Email Segmentation & Personalization',
      variant: 'segment',
      body: 'Sending the same email to everyone rarely works. With Email Segmentation & Personalization, we group your audience by their interests and behavior, so each person gets a message that actually feels relevant to them.',
    },
    {
      title: 'Email Performance Reporting',
      variant: 'report',
      body: 'You should never have to guess if your emails are working. Our Email Performance Reporting service shows you exactly what’s opening, what’s converting, and what needs to improve, in simple, clear reports.',
    },
  ],
  transition:
    'Whatever platform you’re already on or the one that fits your goals best, we know how to make it work for you.',
} as const;

export const EM_PLATFORMS = {
  title: 'The Email Platforms We Use to Get Your Emails Opened',
  intro:
    'Every business is different, and so is the platform that fits it best. We choose the right tool based on your goals, your audience, and how your business actually operates, not a one-size-fits-all setup.',
  groups: [
    {
      key: 'All-in-One Email Marketing Platforms',
      note: 'Best for businesses that need a complete system for campaigns, automation, and reporting in one place.',
      platforms: [
        'Mailchimp',
        'HubSpot',
        'ActiveCampaign',
        'GoHighLevel',
        'Zoho',
        'Constant Contact',
        'GetResponse',
        'AWeber',
      ],
    },
    {
      key: 'Ecommerce Email Marketing Platforms',
      note: 'Best for online stores focused on sales, abandoned cart recovery, and repeat purchases.',
      platforms: ['Klaviyo', 'Omnisend', 'Shopify Email'],
    },
    {
      key: 'Deliverability & Outreach Systems',
      note: 'Best for cold outreach, lead generation, and making sure your emails land in the inbox, not spam.',
      platforms: ['Instantly', 'Brevo', 'SendGrid', 'Campaign Monitor'],
    },
    {
      key: 'Simple, Creator-Friendly Tools',
      note: 'Best for coaches, creators, and personal brands who want straightforward newsletters and audience building without complexity.',
      platforms: ['ConvertKit', 'Drip'],
    },
  ],
  closing:
    'Whatever platform your business already uses, or whichever fits your goals best, we know how to make it work for you.',
} as const;

export const EM_PROCESS = {
  title: 'Our 5D Process for Every Email Marketing Campaign',
  intro:
    'We don’t just write emails and hit send. We follow a clear, proven process that makes sure every campaign has a purpose and is built to get results.',
  stages: [
    {
      key: 'Discover',
      hint: 'We Learn Before We Write',
      body: 'We start by understanding your business, your audience, and what you want to achieve. This is where we build your Email Marketing Strategy, mapping out what your customers need to hear and when, so every email that follows has a clear reason behind it.',
    },
    {
      key: 'Design',
      hint: 'We Shape the Message',
      body: 'Once we know what to say, we focus on how it looks and reads. We write the copy and design Email Templates that are clean, easy to read, and built to match your brand across every device.',
    },
    {
      key: 'Develop',
      hint: 'We Build the System',
      body: 'This is where we set up Email Automation workflow and Email Segmentation behind the scenes, making sure the right message reaches the right person automatically, based on who they are and how they’ve interacted with your business before.',
    },
    {
      key: 'Deploy',
      hint: 'We Send and Test',
      body: 'Once everything is ready, we launch your campaigns. Along the way, we run A/B Testing on subject lines, content, and send times to see what actually gets people to open and click.',
    },
    {
      key: 'Detect',
      hint: 'We Track and Improve',
      body: 'Launch is just the beginning. We monitor Email Analytics closely, keeping an eye on your email open rate, clicks, and conversions, and use that data to keep improving every campaign that follows.',
    },
  ],
  transition:
    'That process isn’t just how we work, it’s what makes the difference between emails that get ignored and ones that generate revenue. Here’s exactly what changes.',
} as const;

export const EM_CHANGES = {
  title: 'What Changes When Digivibz Runs Your Email Marketing',
  intro:
    'Working with Digivibz means more than sending better emails. You get a complete email system that stays in front of your customers, brings them back, and turns one-time buyers into loyal repeat customers automatically.',
  items: [
    { before: 'Emails landing in spam', after: 'landing in the inbox every time' },
    { before: 'One generic message to everyone', after: 'the right message to the right person' },
    {
      before: 'No idea what’s working',
      after: 'clear data on every open, click, and conversion',
    },
    { before: 'Newsletters nobody reads', after: 'emails people actually look forward to' },
    {
      before: 'Random sending with no strategy',
      after: 'a structured system built for long-term growth',
    },
  ],
} as const;

export const EM_FAQ = {
  lead: 'Still have a few questions before you get started? Here are the ones we hear most.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What are email marketing services and how do they work?',
      a: 'Email marketing services help businesses reach customers directly through their inbox with the right message at the right time, turning subscribers into loyal, paying customers.',
    },
    {
      q: 'Why is email marketing important for businesses today?',
      a: 'People rarely buy on their first visit. Lead Nurturing Emails keep your business in front of them, building trust over time until they’re ready to purchase.',
    },
    {
      q: 'What is included in professional email marketing services?',
      a: 'A full service includes strategy, copywriting, and design, often starting with a Welcome Email Series for new subscribers, plus ongoing campaigns and performance tracking.',
    },
    {
      q: 'How much do email marketing services cost in the USA?',
      a: 'Cost depends on your list size, campaign volume, and industry, especially if Email Compliance rules apply. We recommend a free consultation for an accurate quote.',
    },
    {
      q: 'What is email automation and how does it help businesses?',
      a: 'Email automation sends messages automatically based on customer actions. A common example is Abandoned Cart Email Automation, which reminds shoppers about items left behind and helps recover sales you’d otherwise lose.',
    },
    {
      q: 'What is drip email marketing and email funnel automation?',
      a: 'Drip Email Campaigns send a series of emails over time, guiding someone from first hearing about your business to becoming a paying customer.',
    },
    {
      q: 'How does email list building improve marketing results?',
      a: 'A list of genuinely interested subscribers gets higher open rates and more clicks, leading to more sales from every campaign compared to a random list.',
    },
    {
      q: 'What platforms do you use for email marketing?',
      a: 'We work with Mailchimp, Klaviyo, HubSpot, ActiveCampaign, GoHighLevel, and Zoho, recommending the right one based on your business type and goals.',
    },
    {
      q: 'Is email marketing effective for ecommerce and Shopify stores?',
      a: 'Yes. Ecommerce brands benefit from abandoned cart reminders, order updates, and Customer Retention Emails that bring past buyers back to shop again.',
    },
    {
      q: 'Do you provide B2B cold email outreach services?',
      a: 'Yes. We build outreach sequences to start conversations with the right prospects, plus Re-engagement Email Campaigns to win back leads who went quiet.',
    },
    {
      q: 'What is email segmentation and why is it important?',
      a: 'It means grouping subscribers by interest or behavior so each gets relevant content. Combined with Email Marketing Analytics, we see what each group responds to.',
    },
    {
      q: 'Why should I choose Digivibz for email marketing services?',
      a: 'We build systems, not just emails. From strategy to Email A/B Testing to reporting, every decision is backed by data and focused on your revenue.',
    },
  ],
} as const;

export const EM_CTA = {
  title: 'Ready to Turn Your Emails Into a Revenue Machine?',
  body: [
    'Every day without a strong email strategy is a day you’re leaving leads and sales on the table. Your competitors are staying in front of their customers, building trust, and bringing them back to buy again, and your audience notices when you don’t.',
    'At Digivibz, we build email systems that turn one-time visitors into repeat customers, automatically and consistently. Whether you’re starting from scratch or ready to fix what’s not working, we’re ready to build something that gets results.',
    'There’s no better time to start than right now.',
  ],
  button: 'Get a Free Email Marketing Audit',
} as const;
