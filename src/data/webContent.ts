/**
 * Copy for the Web Development service page (`#/service/web-development`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - Discover stage paste corruption repaired: the text read
 *   "...a clear project roadmWeb development services cover everything
 *   involved in building and maintaining a website (...). ... fully
 *   functional website. ap so every decision..." — the embedded sentence is
 *   the missing answer to FAQ #1 ("What are web development services?"),
 *   which arrived with no body. It was moved back to the FAQ and "roadmap"
 *   was restored.
 * - FAQ `Q:` / `A:` markers dropped (structure, not copy)
 * - leading spaces removed from two FAQ answers
 * - double space in the CTA paragraph ("user experiences  and") collapsed
 * - technology lists split on " | " (chips render individually)
 * - stage titles split on " — " (chips carry the stage key, the heading
 *   reassembles "Discover — We Learn Before We Build" verbatim)
 * - diff rows split on " → " (the arrow is the rendered separator)
 * - brackets dropped from CTA labels, line breaks normalized
 *
 * Kept verbatim pending client input: process intro ends "...deliver real
 * result." (likely "results").
 */

export const WEB_HERO = {
  badge: 'Web Development',
  titleLead: 'Web Development Services That Build ',
  titleHighlight: 'Fast, Secure & Revenue-Generating Websites',
  intros: [
    'A slow, outdated website is costing you customers every single day. Visitors judge your business in seconds, and if your site is hard to navigate, slow to load, or simply does not look credible, they leave and go straight to your competitor. At Digivibz, we deliver Custom Website Development Services that fix exactly that. Every website we build is fast, functional, and designed with one goal in mind, turning visitors into paying customers around the clock.',
    'Whether you need a brand new site, an online store, a business website, or a complete redesign, we build it right, from the first line of code to the final launch.',
  ],
  cta: 'Get a Free Website Consultation',
  secondary: 'See our process',
  stats: [
    { value: '2000+', label: 'Websites Launched' },
    { value: '99.9%', label: 'Uptime Delivered' },
    { value: '15+', label: 'Industries Served' },
    { value: '40%', label: 'Average Increase in Site Conversions' },
  ],
} as const;

export const WEB_PROBLEM = {
  lead: 'So how do you know if your current website is actually working for your business or quietly costing you customers every day?',
  title: 'Your Website Could Be Losing You Customers Right Now',
  p1: 'Your business is solid. Your offer is strong. But if your website is not performing, none of that matters.',
  p2: 'Here is what a weak website is costing you every single day:',
  costs: [
    "You're losing visitors in seconds",
    "You're invisible on search engines",
    "You're leaking sales to competitors",
    "You're stuck with constant bugs and downtime",
    'You look outdated and untrustworthy',
  ],
  closing: [
    'The truth is, your website is often the first and only interaction a potential customer has with your business. And when it fails to deliver, it costs you leads, credibility, and revenue.',
    'At Digivibz, we fix that.',
  ],
  transition:
    "Fixing this takes more than good developers. It takes a team that builds websites with your revenue in mind from day one. Here's what that looks like.",
} as const;

export const WEB_WHY = {
  title: 'More Than Just Code, Here Is What You Actually Get With Digivibz',
  intro:
    'We know you have options. Here is why businesses that are serious about growth keep choosing Digivibz over every other Website Development Company out there.',
  features: [
    {
      title: 'Fast Delivery Without Cutting Corners',
      body: 'We respect your deadlines. Our Agile Development process ensures your project moves forward efficiently, with regular updates and zero surprises along the way.',
    },
    {
      title: 'Mobile-First by Default',
      body: 'Over 70% of web traffic comes from mobile devices. Every website we build follows Mobile-Friendly Development and Responsive Design principles from day one.',
    },
    {
      title: 'Full Transparency Throughout',
      body: 'You always know where your project stands. From kickoff to launch, we keep communication clear, timelines honest, and deliverables on track.',
    },
    {
      title: 'We Build for the Long Term',
      body: 'A website is not a one-time project, it is an ongoing business asset. Our Full Stack Web Development Services are built to scale, evolve, and grow alongside your business for years to come.',
    },
  ],
  transition: "Here's every type of website we build and what each one does for your business.",
} as const;

export const WEB_SOLUTIONS = {
  title: 'See All Our Web Development Solutions in One Place',
  intro:
    'We build websites that look great, function flawlessly, and drive real business results, covering every type of website your business could ever need.',
  items: [
    {
      title: 'Custom Website Development',
      path: '/custom',
      body: 'No two businesses are exactly alike, and your website should not look like everyone else’s either. Our Custom Website Development services are built entirely from scratch around your goals, your brand identity, and the way your audience thinks and behaves. From the layout to the functionality, every element is designed with intention rather than pulled from a generic template.',
    },
    {
      title: 'Business Website Development',
      path: '/business',
      body: 'Your website is often the very first impression a potential customer forms of your company. Our Business Website Development services deliver clean, professional, and conversion-focused websites that build instant credibility, communicate your value clearly, and represent your brand exactly the way it deserves to be seen.',
    },
    {
      title: 'Ecommerce Website Development',
      path: '/store',
      body: 'Selling online requires more than just a product catalogue. Our Ecommerce Website Development solutions are built for smooth navigation, fast load times, secure checkout, and a shopping experience designed to turn browsers into buyers and first-time customers into repeat ones.',
    },
    {
      title: 'Corporate Website Development',
      path: '/corporate',
      body: 'Larger organizations need websites that reflect their scale, structure, and credibility. We build corporate websites that are professional, well-organized, and built to communicate clearly with stakeholders, partners, investors, and clients alike.',
    },
    {
      title: 'CMS Development',
      path: '/cms',
      body: 'You should not need a developer every time you want to update your website. Our CMS Development services give you a simple, intuitive backend so you can add pages, edit content, and publish updates whenever you want, without writing a single line of code.',
    },
    {
      title: 'Portfolio Websites Development',
      path: '/portfolio',
      body: 'Your work deserves to be seen the right way. We design clean, visually striking portfolio websites that put your projects, skills, and achievements front and center, helping you make a strong impression on potential clients or employers.',
    },
    {
      title: 'Blog / News Websites Development',
      path: '/blog',
      body: 'Publishing content at scale requires a website built to handle it. Our blog and news websites are fast, well-organized, and optimized for readability and search visibility, keeping readers engaged and coming back for more.',
    },
    {
      title: 'Landing Page Development',
      path: '/launch',
      body: 'Every marketing campaign deserves a page built around one single goal. We design high-impact, distraction-free landing pages crafted to capture attention immediately and guide visitors toward one clear action whether that is a sign-up, a lead, or a sale.',
    },
    {
      title: 'Website Redesign',
      path: '/redesign',
      body: 'If your current website feels outdated or is not performing the way it should, a redesign can change everything. We modernize your existing site with better design, faster performance, and an improved user experience, all while preserving the elements that are already working well.',
    },
    {
      title: 'Website Maintenance',
      path: '/care',
      body: 'A website is never truly finished. Our Website Maintenance Services include regular software updates, security monitoring, performance checks, and backups, ensuring your site stays fast, secure, and reliable long after launch.',
    },
    {
      title: 'Responsive Web Development',
      path: '/responsive',
      body: 'Your customers are browsing from phones, tablets, and desktops, often within the same day. Our Responsive Web Development approach ensures your website looks sharp and functions flawlessly across every screen size and device, with no compromise on experience.',
    },
  ],
  transition:
    "Every website we build runs on modern, proven technology. Here's exactly what's under the hood.",
} as const;

export const WEB_TECH = {
  title: 'The Technology Behind Every Website We Build',
  intro:
    'Great websites are not just well-designed, they are built on the right technology. Here is the modern, reliable tech stack our team works with.',
  groups: [
    {
      key: 'Frontend Technologies',
      intro: 'We build fast, interactive, and visually engaging interfaces using:',
      items: ['ReactJS', 'Next.js', 'Vue.js', 'Angular'],
    },
    {
      key: 'Backend Technologies',
      intro: 'We power your website with robust, scalable, and secure backend systems using:',
      items: ['Laravel', 'Node.js', 'Express.js', 'PHP', '.NET Core', 'CodeIgniter', 'Python'],
    },
    {
      key: 'Databases',
      intro: 'We store and manage your data securely and efficiently using:',
      items: ['MySQL', 'MongoDB', 'PostgreSQL', 'Firebase', 'SQLite'],
    },
    {
      key: 'CMS Platforms',
      intro: 'We build easy to manage content systems on trusted platforms using:',
      items: ['WordPress', 'Joomla', 'Drupal', 'Webflow'],
    },
    {
      key: 'Ecommerce Platforms',
      intro: 'We build high-converting online stores on industry-leading platforms using:',
      items: ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Wix'],
    },
    {
      key: 'Cloud & Hosting',
      intro: 'We deploy and host your website on secure, high-performance infrastructure using:',
      items: ['AWS', 'Google Cloud Platform', 'Microsoft Azure', 'DigitalOcean', 'cPanel Hosting'],
    },
  ],
  transition:
    'Great technology means nothing without a great process. Here’s the system we follow on every single project.',
} as const;

export const WEB_PROCESS = {
  lead: 'Great technology means nothing without a great process. Here’s the system we follow on every single project.',
  title: 'The 5D Process Behind Every High-Performing Website We Build',
  intro:
    'We do not just write code, we follow a proven process that ensures every website we build is strategic, scalable, and built to deliver real business result.',
  stages: [
    {
      key: 'Discover',
      tail: 'We Learn Before We Build',
      body: 'We learn everything about your business, your audience, your competitors, and your goals before touching a single line of code. Through a detailed discovery session and Client Brief, we build a clear project roadmap so every decision we make from this point forward has a solid purpose behind it.',
    },
    {
      key: 'Design',
      tail: 'Strategy Takes Visual Shape',
      body: 'We translate everything we learned into a visual blueprint. Our team designs wireframes and interfaces built around strong UI/UX Design principles and User Experience (UX) best practices ensuring your website is not only visually appealing but intuitive, easy to navigate, and built to guide visitors toward action.',
    },
    {
      key: 'Develop',
      tail: 'Write Code That Performs',
      body: 'With the design signed off, our developers bring it to life. We apply the right combination of Front-End Development and Back-End Development technologies, using Full-Stack Development practices and API Integration where needed, we build a website that is fast, functional, secure, and ready to scale as your business grows.',
    },
    {
      key: 'Deploy',
      tail: 'We Handle the Launch',
      body: 'Once everything is tested and approved, we take your website live. We handle the complete launch process including Web Hosting setup, Domain Registration, and Cloud Computing configuration ensuring your site goes live smoothly, securely, and performing at its best from day one.',
    },
    {
      key: 'Detect',
      tail: 'We Keep It Growing',
      body: "Launch is just the beginning. We monitor your website's performance, track user behavior, run regular Website Maintenance checks, and identify opportunities to improve ensuring your website keeps growing and delivering results long after it goes live.",
    },
  ],
  transition:
    "That process isn't just how we work, it's what makes the difference between a website that exists and one that performs. Here's exactly what changes.",
} as const;

export const WEB_DIFF = {
  title: 'What Changes When Digivibz Builds Your Website',
  intro:
    'Working with Digivibz means more than getting a website delivered. You get a complete digital asset built to perform, convert, and grow your business from day one.',
  rows: [
    { from: 'Slow, outdated, and hard to trust', to: 'fast, modern, and credible' },
    { from: 'Buried on Google', to: 'ranking where your customers are actually searching' },
    { from: 'Visitors leaving without acting', to: 'consistent leads and enquiries' },
    { from: 'Constant bugs and downtime', to: 'a stable, secure, and reliable system' },
    { from: 'A one-time launch', to: 'a long-term revenue asset' },
  ],
} as const;

export const WEB_FAQ = {
  lead: "Still have questions before you get started? Here are the ones we hear most.",
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What are web development services?',
      a: 'Web development services cover everything involved in building and maintaining a website (coding, design, hosting, and security). It includes Front-End Development, Back-End Development, and Full-Stack Development working together to deliver a fully functional website.',
    },
    {
      q: 'What does a web development company do?',
      a: 'A Web Development Company plans, designs, builds, and maintains websites for businesses. From strategy and design to coding, testing, and launch, they handle every technical aspect so you can focus on running your business.',
    },
    {
      q: 'What types of web development services are available?',
      a: 'Web development services include custom websites, ecommerce stores, corporate sites, landing pages, blog platforms, portfolio websites, CMS development, website redesigns, and ongoing maintenance, covering every type of website your business could need.',
    },
    {
      q: 'What is the difference between web design and web development?',
      a: 'Web Design focuses on how a website looks (layout, colors, and typography). Web Development focuses on how it works (coding, functionality, and performance). At Digivibz, we handle both under one roof.',
    },
    {
      q: 'What services do web developers offer?',
      a: 'Web developers offer a wide range of services including custom website builds, Ecommerce Website Development, CMS Development, API Integration, Responsive Web Development, website redesigns, and ongoing Website Maintenance covering every technical need your website has.',
    },
    {
      q: 'How much does web development cost?',
      a: 'The cost depends on the scope, complexity, and features of your project. A simple business website differs in price from a full ecommerce platform or custom web application. Contact Digivibz for a free consultation and a custom quote tailored to your budget and goals.',
    },
    {
      q: 'How long does it take to develop a website?',
      a: 'Timelines vary based on project complexity. A simple landing page can be ready in a few days while a full Business Website or ecommerce project typically takes 2 to 6 weeks. We always agree on a clear timeline before we begin.',
    },
    {
      q: 'How do I find a reliable web development agency?',
      a: 'Look for an agency with a strong portfolio, proven client results, clear communication, and end-to-end services. Check reviews, ask about their process, and make sure they understand your business goals before signing anything.',
    },
    {
      q: 'Why should I hire a professional web development company like Digivibz?',
      a: 'A professional Web Development Company like Digivibz brings strategy, technical expertise, and business insight to every project ensuring your website is not just built but built to perform, convert, and grow your revenue from day one.',
    },
    {
      q: 'What is the process of web development?',
      a: 'Our process follows the 5D Framework (Discover, Design, Develop, Deploy, and Detect). We start by understanding your goals, design a blueprint, build the website, launch it live, and then monitor and improve performance after launch.',
    },
    {
      q: 'What technologies are used in web development?',
      a: 'Modern web development uses a wide range of technologies. For frontend we use ReactJS, Next.js, Vue.js, and Angular. For backend we use Laravel, Node.js, PHP, and Python. Databases include MySQL, MongoDB, and PostgreSQL. We also work with cloud platforms like AWS and Google Cloud.',
    },
    {
      q: 'Do you offer website maintenance and support?',
      a: 'Yes. Our website maintenance and support services include regular updates, security monitoring, performance checks, bug fixes, and backups keeping your website fast, secure, and running smoothly long after launch.',
    },
    {
      q: 'Can my website be mobile-friendly and responsive?',
      a: 'Absolutely. Every website we build follows mobile-first principles by default ensuring your site looks sharp and functions flawlessly across all devices including smartphones, tablets, and desktops with no compromise on experience.',
    },
  ],
} as const;

export const WEB_CTA = {
  title: 'Ready to Turn Your Website Into a Revenue Machine?',
  body: [
    'Every day without a high-performing website is a day you are leaving revenue on the table. Your competitors are investing in better websites, faster load times, and smoother user experiences and your audience notices.',
    'At Digivibz, we build fast, functional, and conversion-focused websites that turn visitors into paying customers around the clock. Whether you are starting from scratch or ready for a complete overhaul, we are ready to build something that works.',
    'There is no better time to level up your website than right now.',
  ],
  button: 'Get a Free Website Consultation',
  secondary: 'View Our Work',
} as const;
