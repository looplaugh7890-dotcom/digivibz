/**
 * Copy for the AI Automation service page (`#/service/ai-automation`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - straight apostrophes -> typographic (’) to match site typography
 * - leading/trailing spaces and line breaks normalized (several item
 *   titles and tool names carried trailing spaces: "Approval Automation ",
 *   "Autonomous AI Systems ", "AI Chatbots " …)
 * - stray space before comma removed in 7 places: "AI Chatbot Development ,",
 *   "Customer Support Automation Solutions ,", "AI Lead Generation Automation ,",
 *   "AI Business Automation ," (FAQ 2), "Cloud Computing ," (FAQ 10),
 *   "Automation for Enterprises ," (FAQ 9), "CRM Workflow Optimization ,"
 *   (FAQ 12)
 * - FAQ question numbers "2."-"12." stripped — they were list markers (item 1
 *   was unnumbered), not part of the question text
 *
 * Structure note (flagged): groups 1, 3 and 5 (Business Process Automation,
 * AI Virtual Assistant Services, AI Email Automation) open with a paragraph
 * that has no item title. Rendered as the group's description line under the
 * heading — if those paragraphs were meant to be standalone service cards,
 * titles are needed.
 *
 * Kept verbatim pending client input (flagged):
 * - hero: "Most ai automation agency providers" — lowercase "ai"
 * - "Why Do Businesses Choose Digivibz?" ends with a question mark
 * - group 3 description ends "without adding to your headcount" and the AI
 *   Calling Agents body ends "without added headcount" — near-repetition,
 *   kept as written
 * - group descriptions mean groups 3 and 5 each carry only one service card
 *
 * Added UI microcopy (not client copy; layout parity with the other service
 * pages): hero badge + secondary button, section badges, hero chips, "01-05"
 * numbering on the problem list, and the label lines inside the visuals
 * (queue counters, log lines, rack status text).
 */

export const IA_HERO = {
  badge: 'AI Automation',
  titleLead: 'AI Automation Services Built to Work While ',
  titleHighlight: 'You Sleep',
  intro:
    'Every day, your team loses hours to things like repetitive admin work, leads that get forgotten, and answering the same customer questions again and again. Most ai automation agency providers just hand you a tool and leave you to figure it out. Digivibz does it differently. We build simple, smart systems that fit right into how your business already works. They run in the background, handle the repetitive tasks automatically, and free up your team to focus on real growth.',
  cta: 'Start Automating Now',
  secondary: 'See our process',
  transition:
    'If that sounds like your team right now, here’s what’s likely happening behind the scenes.',
} as const;

export const IA_PROBLEM = {
  title: 'Still Running Your Business the Hard Way?',
  lead: 'Manual work quietly drains Operational Efficiency every single day. Here’s what that usually looks like.',
  items: [
    'Slow Lead Follow-Up That Costs Sales',
    'Repetitive Manual Tasks Eating Up Hours',
    'Delayed Customer Support Response Times',
    'Disconnected Tools Creating Data Chaos',
    'Limited Team Bandwidth To Handle Growth',
  ],
  closing:
    'This is exactly why more businesses are turning to AI Task Automation instead of adding more manual hours to the problem.',
  transition:
    'So where does manual work actually stop, and automation take over?',
} as const;

export const IA_PITCH = {
  title: 'Where Manual Work Ends And Automation Begins',
  p1: 'Digivibz turns scattered, manual processes into connected systems that work on their own. Using Artificial Intelligence and Machine Learning, we design automation that doesn’t just save time, it changes how your business runs day to day. Every workflow we build is part of a bigger shift toward Digital Transformation, giving your team the space to focus on decisions that actually need a human.',
  p2: 'This is what AI Solutions for Business should feel like: less manual effort, more consistent results.',
  button: 'See How Automation Fits Your Business',
  transition:
    'Here’s the full range of automation we build, from everyday operations to fully autonomous systems.',
} as const;

export interface IaServiceItem {
  readonly title: string;
  readonly body: string;
}

export interface IaServiceGroup {
  readonly key: string;
  /** Lead paragraph printed under the group heading (no item title in copy). */
  readonly desc?: string;
  readonly items: readonly IaServiceItem[];
}

export const IA_SERVICES: {
  readonly title: string;
  readonly groups: readonly IaServiceGroup[];
  readonly transition: string;
} = {
  title: 'Explore Our AI Automation Services',
  groups: [
    {
      key: 'Business Process Automation',
      desc: 'Every business runs on dozens of small processes that quietly slow things down when done manually. We connect and automate these processes so they run consistently, without waiting on a person to push them forward.',
      items: [
        {
          title: 'Internal Workflow Automation',
          body: 'We map out how work moves across your team and automate the handoffs, using AI Workflow Automation to keep tasks moving without manual triggers.',
        },
        {
          title: 'Task Automation',
          body: 'Recurring, rule-based tasks get handled automatically, freeing your team from repetitive daily work.',
        },
        {
          title: 'Approval Automation',
          body: 'Approval chains often stall in someone’s inbox. We build systems using Robotic Process Automation to route requests and approvals instantly, based on the rules you set.',
        },
        {
          title: 'Document Automation',
          body: 'From generating documents to filing them correctly, we automate the process end-to-end, supported by clean Data Integration across your existing tools.',
        },
        {
          title: 'Admin Automation',
          body: 'Day-to-day admin work like updating records or scheduling gets handled through Digital Process Automation, so nothing falls through the cracks.',
        },
      ],
    },
    {
      key: 'AI Customer Support Automation',
      items: [
        {
          title: 'AI Chatbots',
          body: 'We handle everything from strategy to AI Chatbot Development, building chatbots that understand real questions using Natural Language Processing and reply instantly, day or night.',
        },
        {
          title: 'Customer Support Automation',
          body: 'We automate ticket routing, responses, and follow-ups through Customer Support Automation Solutions, cutting response times significantly.',
        },
        {
          title: 'WhatsApp Automation',
          body: 'Automated, real-time replies on the channel your customers already trust, powered by Chatbots built for two-way conversation.',
        },
      ],
    },
    {
      key: 'AI Virtual Assistant Services',
      desc: 'Round-the-clock support handled by intelligent virtual assistants, giving customers help whenever they need it without adding to your headcount.',
      items: [
        {
          title: 'AI Calling Agents',
          body: 'Automated voice systems that handle calls, bookings, and follow-ups, improving overall Customer Experience without added headcount.',
        },
      ],
    },
    {
      key: 'AI Sales Automation',
      items: [
        {
          title: 'Lead Generation Automation',
          body: 'Capture and qualify leads automatically through AI Lead Generation Automation, so your pipeline stays full without manual effort.',
        },
        {
          title: 'CRM Automation',
          body: 'Keep customer data accurate and up to date with CRM Automation Services, removing the need for manual updates.',
        },
        {
          title: 'Sales Funnel Automation',
          body: 'Guide leads through every stage automatically using Sales Funnel Automation, moving them closer to a sale without manual follow-up.',
        },
      ],
    },
    {
      key: 'AI Email Automation',
      desc: 'Personalized, timely email sequences sent automatically, backed by Predictive Analytics to identify the best time to reach each lead.',
      items: [
        {
          title: 'Customer Retention Automation',
          body: 'Keep customers engaged after the sale with automated check-ins and offers, strengthening long-term Customer Experience.',
        },
      ],
    },
    {
      key: 'Autonomous AI Systems',
      items: [
        {
          title: 'AI Agents',
          body: 'Autonomous agents that complete multi-step tasks on their own, powered by Artificial Intelligence built to handle real business logic.',
        },
        {
          title: 'AI Workflow Automation',
          body: 'Connect tools and processes into one intelligent system using Workflow Automation Software, removing manual handoffs between platforms.',
        },
        {
          title: 'AI Decision Systems',
          body: 'Systems that analyze data and make informed decisions in real time, reducing the need for manual review through AI Process Automation.',
        },
        {
          title: 'AI Integration Services',
          body: 'Seamlessly connect your existing tools and platforms with AI System Integration, creating one unified system instead of scattered software.',
        },
      ],
    },
  ],
  transition:
    'All of this runs on a proven stack of tools, layered together so every part of the system talks to each other.',
};

export interface IaStackLayer {
  readonly name: string;
  /** Parenthetical role from the copy, e.g. "(Brain System)". */
  readonly role?: string;
  readonly desc: string;
  readonly tools: readonly string[];
}

export const IA_STACK: {
  readonly title: string;
  readonly layers: readonly IaStackLayer[];
  readonly transition: string;
} = {
  title: 'The Technology Behind Our Automation',
  layers: [
    {
      name: 'AI Intelligence Layer',
      role: 'Brain System',
      desc: 'The core intelligence that powers every automated decision and response.',
      tools: ['OpenAI (GPT models)', 'Claude AI', 'LangChain', 'Flowise AI'],
    },
    {
      name: 'Automation Engine Layer',
      role: 'Workflow System',
      desc: 'The engines that connect your tools and run workflows automatically in the background.',
      tools: ['Make.com', 'Zapier', 'n8n'],
    },
    {
      name: 'Customer Communication Layer',
      desc: 'The channels where your customers get instant, automated responses.',
      tools: [
        'WhatsApp Business API',
        'Twilio (SMS & Voice Automation)',
        'Intercom',
        'Zendesk',
        'Chatbot Builders',
      ],
    },
    {
      name: 'CRM & Sales Layer',
      role: 'Revenue System',
      desc: 'Where leads, deals, and customer data stay organized and up to date automatically.',
      tools: ['HubSpot CRM', 'Salesforce', 'Zoho CRM', 'GoHighLevel (GHL)', 'Pipedrive'],
    },
    {
      name: 'Voice AI Systems Layer',
      role: 'Voice Automation',
      desc: 'The technology behind natural, human-like automated phone conversations.',
      tools: ['Vapi AI', 'Retell AI', 'Bland AI', 'ElevenLabs (Voice Cloning)'],
    },
    {
      name: 'Infrastructure & Integration Layer',
      desc: 'The backbone that keeps every system connected, secure, and running smoothly.',
      tools: ['APIs & Webhooks', 'Google Cloud Platform (GCP)', 'Amazon Web Services (AWS)', 'Custom Backend Systems'],
    },
  ],
  transition:
    'Great tools only deliver results inside the right process. Here’s how we build every system, start to finish.',
};

export const IA_PROCESS = {
  title: 'The 5D Framework Behind Every System We Build',
  stages: [
    {
      key: 'Discover',
      body: 'We start by understanding how your business actually runs today, where time is lost, and where automation will make the biggest impact.',
    },
    {
      key: 'Design',
      body: 'We map out the exact workflows, tools, and systems needed, building a blueprint tailored to your business instead of a generic template.',
    },
    {
      key: 'Develop',
      body: 'Our team builds and configures the automation, connecting your tools through Automation Tools and testing every workflow before it goes live.',
    },
    {
      key: 'Deploy',
      body: 'Once tested, we launch the system into your business, integrating it smoothly with your existing processes and teams.',
    },
    {
      key: 'Detect',
      body: 'We continuously monitor performance, using Process Mining to catch inefficiencies early and refine the system as your business grows.',
    },
  ],
  transition:
    'That process is exactly why businesses choose us over piecing together tools on their own.',
} as const;

export const IA_WHY = {
  title: 'Why Do Businesses Choose Digivibz?',
  items: [
    { from: 'Manual, Repetitive Processes', to: 'Workflows That Run Automatically' },
    { from: 'Leads Followed Up Late', to: 'Leads Engaged Instantly Through AI Marketing Automation' },
    { from: 'Slow, Understaffed Support', to: '24/7 Support Without Extra Hires' },
    { from: 'Scattered, Disconnected Tools', to: 'One Fully Connected System' },
    { from: 'Growth Capped By Manual Work', to: 'Enterprise Automation Solutions That Scale With You' },
  ],
} as const;

export const IA_FAQ = {
  lead: 'Before you commit, here are the questions we hear most often.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What is AI automation in business?',
      a: 'AI automation uses Intelligent Automation to handle repetitive business tasks automatically, reducing manual work, cutting errors, and freeing your team to focus on higher-value decisions.',
    },
    {
      q: 'What exactly does DIGIVIBZ LLC offer in AI automation?',
      a: 'We offer end-to-end AI Business Automation, covering workflows, customer support, sales, and custom AI agents built specifically around how your business operates.',
    },
    {
      q: 'Do I need technical knowledge to work with your AI automation services?',
      a: 'No. We handle strategy, setup, and AI Consulting, guiding you through every step so you don’t need any technical background to get started.',
    },
    {
      q: 'Which types of businesses benefit from AI automation services?',
      a: 'Growing teams and AI Automation for Startups both benefit, since automation scales to match your team size, industry, and daily workload.',
    },
    {
      q: 'What business processes can be automated?',
      a: 'Most repetitive processes, including approvals, data entry, customer support, and lead follow-up, can be automated through Business Automation Solutions tailored to your workflow.',
    },
    {
      q: 'Will AI automation replace my employees?',
      a: 'No. Automation handles repetitive tasks, not decision-making. Your team stays focused on strategy and relationships, while systems are built with AI Ethics in mind.',
    },
    {
      q: 'How do you help choose the right automation tools?',
      a: 'We assess your current workflow and recommend tools based on Automation Strategy, matching the right platforms to your goals instead of a one-size-fits-all setup.',
    },
    {
      q: 'What is the difference between AI automation and agentic AI?',
      a: 'AI automation uses predefined workflows enhanced with AI capabilities, while agentic AI systems can autonomously reason, make decisions, and complete multi-step tasks with less human intervention.',
    },
    {
      q: 'How long does it take to build an AI automation system?',
      a: 'Timelines vary by complexity, but most projects, including Automation for Enterprises, launch within a few weeks depending on the systems and integrations involved.',
    },
    {
      q: 'What technologies do you use for AI automation?',
      a: 'We work with leading platforms across Cloud Computing, workflow engines, and CRM systems, building on tools like OpenAI, Make.com, and HubSpot depending on your needs.',
    },
    {
      q: 'Can AI automation improve business revenue or productivity?',
      a: 'Yes. By automating lead follow-up, support, and sales workflows, businesses see faster response times, fewer missed opportunities, and stronger Workflow Automation across every team.',
    },
    {
      q: 'How do AI automation services work end-to-end?',
      a: 'We follow our 5D process, from Discover to Detect, combining CRM Workflow Optimization, chatbots, and workflow automation into one connected system built around your business.',
    },
  ],
} as const;

export const IA_CTA = {
  title: 'Ready To Put Your Business On Autopilot?',
  body: 'You’ve seen what manual work is costing you: slow follow-ups, missed leads, overworked teams, and tools that don’t talk to each other. None of that has to be permanent. Every business we work with started exactly where you are now, wondering if automation was worth it, unsure where to even begin. Then we mapped out their workflows, connected their tools, and built systems that started saving them hours within weeks. Your business could be next. Book a free consultation and we’ll walk you through exactly where automation fits into your business, what it would look like, and what results you can realistically expect. No pressure, no confusing jargon, just a clear plan built around how you actually work.',
  button: 'Book Your Free Consultation',
} as const;
