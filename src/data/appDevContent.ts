/**
 * Copy for the App Development service page (`/service/application-development`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - "Digivibs" -> "Digivibz" (brand-name typo, where present)
 * - stray spaces before punctuation normalized
 * - the outline number on the closing CTA heading ("7. Ready to Build...")
 *   dropped — it was section numbering, not headline copy
 */

export const APP_HERO = {
  badge: 'App Development',
  titleLead: 'Custom Web & Mobile App Development Company for ',
  titleHighlight: 'Real Business Results',
  intros: [
    'At Digivibz, we are focused on building high-performance digital solutions for modern businesses. As a premium agency, we specialize in custom app development that is scalable, user-focused, and aligned with your long-term business objectives.',
    'From intuitive web platforms to powerful mobile solutions, our team delivers end-to-end mobile app development services with a strong focus on performance and usability. We also provide AI-powered Application Development services, empowering businesses to integrate intelligent automation, predictive analytics, and machine learning capabilities that transform their applications into smart, future-ready solutions.',
  ],
  cta: 'Book Your Consultation',
} as const;

export const APP_PROBLEM = {
  lead: 'Most businesses think they need an app. What they actually need is a system. Here’s why the difference matters.',
  title: 'Why Most Applications Fail to Support Real Business Growth',
  p1a: 'Most applications don’t fail at the development stage.',
  p1b: 'They fail at the thinking stage.',
  failures: [
    {
      code: 'ERR_01',
      title: 'Built Without Direction',
      body: 'Many applications start with an idea, but no clear understanding of how that idea fits into the business. Without direction, development becomes execution without purpose.',
    },
    {
      code: 'ERR_02',
      title: 'Designed Around Features, Not Usage',
      body: 'Adding more features doesn’t make an application better. What matters is how people use it. When usability is ignored, even well-executed web app development or mobile app development struggles to deliver real value.',
    },
    {
      code: 'ERR_03',
      title: 'No Connection to Business Operations',
      body: 'An application is often treated as a separate product, not a part of the business. This creates gaps between how the business runs and how the application supports it.',
    },
    {
      code: 'ERR_04',
      title: 'No Room for Growth',
      body: 'What works today may not work tomorrow. When scalability isn’t considered from the start, applications quickly become limiting instead of enabling.',
    },
    {
      code: 'ERR_05',
      title: 'Execution Without Structure',
      body: 'Development without a structured approach leads to inconsistency, delays, and unclear outcomes. The result is an application that exists - but doesn’t perform, even when supported by AI app services or modern technologies.',
    },
  ],
  closing: [
    'An application should not be built just to launch.',
    'It should be built to support how a business operates, evolves, and grows.',
    'And that requires more than development.',
    'It requires the right thinking behind it.',
  ],
  transition:
    'The problem isn’t development. It’s the thinking behind it. Here’s the shift that changes everything.',
} as const;

export const APP_SHIFT = {
  title:
    'Most Businesses Get Just an App, The Right App Development Agency Delivers a Full Business Growth System',
  p1a: 'An application is not just a digital product.',
  p1b: 'It’s part of how your business operates.',
  thinkLabel: 'Most businesses think in terms of:',
  thinkQuote: '“We need an app.”',
  shiftLabel: 'But the real shift is:',
  shiftQuote: '“We need a system that supports our business.”',
  /** Split on "→" by the UI into the minus (old thinking) and plus (new) lines. */
  rows: [
    'From Features → To Functionality That Matters',
    'Single Product → To end-to-end Business System',
    'Short-Term Solution → To Long-Term Asset',
    'From Execution → To Purposeful Thinking',
  ],
  closing: [
    'When you make this shift,',
    'your application stops being just software.',
    'It becomes something your business can rely on.',
  ],
  transition: 'That shift is exactly how we work. Here’s what it looks like in practice.',
} as const;

export const APP_SYSTEM = {
  title:
    'Digivibz Mobile App Development Agency, Where Applications Become Strategic Business Assets',
  intro: [
    'At Digivibz, we go beyond just building applications.',
    'As a leading App Development agency, we create systems that become an integral part of how your business operates.',
  ],
  pillars: [
    {
      title: 'Tailored Solutions Through Our Custom App Development Services',
      body: 'Every business has its own goals, processes, and audience. We don’t offer cookie-cutter solutions. We take the time to understand your operations and design applications that align perfectly with your business needs.',
    },
    {
      title: 'End-to-End Expertise',
      body: 'From initial planning to development, deployment, and beyond, we manage every step. Our team ensures consistency, quality, and clarity throughout the process, giving you a single trusted app agency rather than juggling multiple vendors.',
    },
    {
      title: 'Future-Ready Systems With Cloud-Native Application Development',
      body: 'Applications should grow with your business. We design systems that anticipate future needs, whether it’s scaling operations, adding new features, or adopting emerging technologies. For businesses that need cross-platform reach without a native app, we also build progressive web apps that deliver a fast, reliable, and app-like experience across all devices.',
    },
    {
      title: 'Collaborative Partnership',
      body: 'We don’t just deliver software and walk away. We work alongside your team, offering guidance, insights, and ongoing support so your system continues to provide value over time.',
    },
    {
      title: 'Focused on Results That Matter',
      body: 'Our priority is the impact your application has on your business. We build systems that simplify processes, enhance productivity, and empower your team.',
    },
  ],
  closing: [
    'With Digivibz, your application becomes more than just software.',
    'It becomes a strategic tool that drives your business forward, today and in the future.',
  ],
  transition:
    'Every project follows one structured system, from the first conversation to long after launch.',
} as const;

export const APP_FRAMEWORK = {
  title: 'The 5D Framework Behind Every Application We Build',
  intro:
    'At Digivibz, we don’t just build applications, we engineer business systems. Our proven 5D Growth Framework ensures every project moves through a structured, results-driven journey.',
  stages: [
    {
      key: 'Discover',
      title: 'Understand Your Business Inside Out',
      body: 'We start by analyzing your business goals, workflows, and user needs. Through deep research and stakeholder discovery, we identify what your application must achieve to drive real growth.',
      includes: [
        'Business and user research',
        'Competitor and market analysis',
        'Technical feasibility assessment',
        'Project scope and roadmap',
        'Business requirement analysis & architecture planning',
      ],
      outcome:
        'No assumptions. Only insights that guide strategy and design, so your application starts with a clear purpose.',
    },
    {
      key: 'Design',
      title: 'From Concept to Strategic Blueprint',
      body: 'Every interaction, screen, and feature is mapped to your business objectives. We build wireframes, interactive prototypes, and complete design systems in Figma before a single line of code is written.',
      includes: [
        'User experience and journey mapping',
        'Wireframes and high-fidelity designs',
        'Interactive Figma prototype',
        'Brand-aligned design system',
        'Database design & API architecture planning',
      ],
      outcome:
        'You see your application come to life before development begins. Every screen approved, every detail finalized.',
    },
    {
      key: 'Develop',
      title: 'Build With Precision Using Industry-Leading Technologies',
      body: 'Our team transforms approved designs into a fully functional, scalable application using modern technologies and industry best practices, ensuring quality, performance, and long-term maintainability.',
      includes: [
        'Frontend development (React.js, Next.js, Vue.js, Angular)',
        'Backend development (Node.js, Python, Laravel, .NET)',
        'Mobile development (React Native, Flutter, Swift, Kotlin)',
        'AI/ML integration (OpenAI APIs, TensorFlow, Custom ML Models)',
        'Database design, API development & integration',
        'Continuous quality assurance & testing',
      ],
      outcome:
        'Applications that work seamlessly, scale easily, and support your operations from day one.',
    },
    {
      key: 'Deploy',
      title: 'Launch With Confidence Through Solid Infrastructure & DevOps',
      body: 'Launching an application is more than flipping a switch. We ensure smooth deployment, secure infrastructure, team training, and immediate optimization for real-world performance.',
      includes: [
        'Cloud infrastructure setup (AWS, Azure, Google Cloud)',
        'DevOps, Docker, Kubernetes & CI/CD configuration',
        'Security hardening and SSL',
        'App Store deployment (iOS & Android)',
        'Server setup & cloud configuration',
        'Team training, documentation & soft launch',
      ],
      outcome:
        'Your application goes live without disruption, immediately adding value to your business.',
    },
    {
      key: 'Detect',
      title: 'Optimize and Scale What Works',
      body: 'The work doesn’t stop at launch. We continuously monitor performance, gather user insights, and optimize every aspect of your application to ensure measurable, long-term growth.',
      includes: [
        'Performance and uptime monitoring',
        'User behavior analytics',
        'A/B testing and conversion optimization',
        'Security updates and maintenance',
        'Post-launch support (3–6 months)',
        'Ongoing maintenance plans available',
      ],
      outcome:
        'A living, evolving business asset that adapts to your changing goals and keeps delivering impact.',
    },
  ],
  closing:
    'That system exists for one reason to make sure your application becomes a long-term business asset, not just software that runs.',
} as const;

export const APP_ASSETS = {
  title: 'Why Your Custom Mobile App Development Should Be a Business Asset, Not Just Software',
  intro: 'Most applications are built to work, not to drive real business impact.',
  items: [
    {
      problem: 'Software That Functions But Doesn’t Deliver Value',
      body: 'Many applications exist just to perform tasks, with no connection to business goals.',
      approach:
        'Through Mobile App development, We design applications as part of your business system, aligning every feature with your operations and workflows.',
      benefit:
        'Your application becomes a tool that actively supports decision-making, efficiency, and growth, not just code that runs.',
    },
    {
      problem: 'Disconnected Tools and Processes',
      body: 'Applications often operate in isolation, creating friction and inefficiency.',
      approach:
        'We integrate your system with your existing processes, teams, and workflows, building a seamless ecosystem.',
      benefit: 'Your business runs smarter, faster, and more efficiently, with all parts working together.',
    },
    {
      problem: 'Short-Term Thinking That Limits Growth',
      body: 'Many applications fail to scale as your business evolves.',
      approach:
        'We build scalable, flexible systems designed to grow with your business, accommodating new features, users, and objectives.',
      benefit:
        'Your application is future-proof, continuing to deliver impact over the long term.',
    },
    {
      problem: 'Features Without Strategic Purpose',
      body: 'Applications are often overloaded with unnecessary features that don’t solve real problems.',
      approach: 'Every feature is tied to a business outcome. Every flow is purposeful.',
      benefit:
        'Your system doesn’t just function, it creates measurable results and strengthens your business.',
    },
  ],
} as const;

export const APP_FAQ = {
  lead: 'Before you decide, here are the questions most clients ask us first.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: '1. What makes DIGIVIBZ different from other app development agencies?',
      a: 'At Digivibz, we don’t just write code, we build business systems designed to grow with you. Our structured 5D Growth Framework covers everything from discovery to post-launch optimization, ensuring every decision is tied to real outcomes.',
    },
    {
      q: '2. Can DIGIVIBZ develop AI-powered applications for businesses?',
      a: 'Yes, AI integration is one of our core specialties. We build intelligent applications using OpenAI APIs, TensorFlow, and custom ML models tailored to your specific business needs. Whether it’s automation, smart recommendations, or data-driven insights, we embed AI into your application in a way that delivers real, measurable value.',
    },
    {
      q: '3. How much does it cost to develop a custom mobile app?',
      a: 'The cost of developing a custom mobile app depends on factors like complexity, features, platforms (iOS/Android), and integrations required. Every business has unique needs, so we provide a detailed proposal after understanding your specific requirements.',
    },
    {
      q: '4. How long does it take to build a web or mobile application?',
      a: 'The timeline varies based on the complexity, features, and scope of your project, a simple app may take 6–8 weeks while a more complex solution can take 4–6 months. We define a clear project roadmap during the Discover phase so you always know what to expect and when. Our team ensures timely delivery without compromising on quality or functionality.',
    },
    {
      q: '5. Do you provide app maintenance and support after launch?',
      a: 'Yes, we offer post-launch support for 3–6 months along with ongoing maintenance plans to keep your application secure, updated, and performing at its best.',
    },
    {
      q: '6. Difference Between Web App & Mobile App Development?',
      a: 'Web apps run through browsers and are accessible on any device without installation, while mobile apps are built specifically for iOS or Android, offering better performance and a native experience. At Digivibz, we help you choose the right approach or combine both based on your business goals.',
    },
    {
      q: 'Why should businesses invest in custom application development?',
      a: 'Unlike off-the-shelf software, custom applications are built around your specific workflows and goals, giving you full flexibility and a competitive edge. They scale with your business and integrate seamlessly with your existing systems.',
    },
    {
      q: 'Do I own the source code and intellectual property?',
      a: 'Yes, absolutely. Once the project is complete and final payment is made, you have full ownership of the source code and all intellectual property. No hidden clauses, no licensing fees, it’s entirely yours.',
    },
    {
      q: 'What is the development process?',
      a: 'We follow our proven 5D Growth Framework (Discover, Design, Develop, Deploy, and Detect) Each phase is structured to ensure your application is built with purpose, delivered on time, and continuously optimized after launch.',
    },
    {
      q: 'What is Enterprise Application Development Services?',
      a: 'Enterprise mobile app development involves building applications designed to streamline internal operations, improve productivity, and support large-scale business processes. Unlike consumer apps, they are built to handle complex integrations, high user loads, and strict security requirements.',
    },
    {
      q: 'How do I choose between native and cross-platform development?',
      a: 'If you need top-tier performance and platform-specific features, native is the way to go. If you want faster delivery and cost efficiency across both iOS and Android, cross-platform development with React Native or Flutter is the smarter choice.',
    },
    {
      q: 'What is the Best Mobile App Development Platform & iOS App Development Option?',
      a: 'It depends on your goals, Flutter and React Native are ideal for cross-platform apps, while Swift and Kotlin are best for native iOS and Android development. At Digivibz, we recommend the right platform based on your specific project needs.',
    },
  ],
} as const;

export const APP_CTA = {
  title: 'Ready to Build an Application That Drives Real Business Growth?',
  body: 'Your business deserves more than just software, it deserves a strategic application that drives growth, efficiency, and results. Partner with Digivibz, a leading web and mobile app development agency, to transform your ideas into custom applications that deliver measurable business impact. Ready to get started?',
  button: 'Book Your Consultation',
} as const;
