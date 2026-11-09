/**
 * Copy for the Web Designing service page (`/service/web-designing`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - FAQ `Q1:` … `Q10:` markers dropped (structure, not copy)
 * - missing space repaired: "asset,not just" -> "asset, not just"
 * - leading / trailing spaces and line breaks normalized (service bodies,
 *   stage bodies, FAQ answers, focus items, hero intro)
 * - technology / platform tables split into rows (the "Platform | What We Do
 *   With It" grid is rendered as a table)
 * - stage titles already carry their key ("Discover", "Design" …)
 *
 * Kept verbatim pending client input (punctuation likely dropped in transit):
 * - approach: "starts every project with deep discovery understanding your
 *   business…"
 * - landing page item: "laser-focused on one goal turning your traffic…"
 * - focus item: "we design with conversion in mind every layout, every CTA…"
 */

export const WD_HERO = {
  badge: 'Web Designing',
  titleLead: 'Web Design Services That Turn Your Website Into a ',
  titleHighlight: 'Revenue-Generating Machine',
  intros: [
    'A great website doesn’t just exist, it performs. Digivibz delivers website design and development services that load fast, look sharp on every device, and guide visitors straight to conversion. We don’t believe in cookie-cutter templates or generic layouts. Every website we build is crafted with purpose, combining clean aesthetics, intuitive navigation, and conversion-driven structure to create an experience your visitors actually enjoy.',
    'Whether you’re starting fresh, rebranding, or scaling up, we build websites that do the heavy lifting for your business, attracting the right audience, building instant trust, and turning clicks into customers.',
  ],
  cta: 'Get a Free Website Consultation',
  secondary: 'See our process',
} as const;

export const WD_PROBLEM = {
  lead: 'So how do you know if your current website is actually working or quietly costing you visitors every single day?',
  title: 'Your Website Has 7 Seconds to Make an Impression. Is It Failing?',
  p1: 'Most businesses don’t lose customers because of bad products. They lose them because of bad websites. If any of these sound familiar, it’s time for a change:',
  items: [
    'Your Design Looks Like It’s From 2010',
    'Visitors Come But Never Stay',
    'Your Site Falls Apart on Mobile',
    'Your Pages Take Forever to Load',
    'Nobody Can Find You on Google',
  ],
  closing: 'Every day your website stays broken is a day your competitors are winning. Let Digivibz fix that.',
  transition:
    'The fix isn’t a prettier website. It’s a website built with a clear strategy behind it. Here’s how we approach it.',
} as const;

export const WD_APPROACH = {
  title: 'We Don’t Just Design Websites, We Design Your Path to More Revenue',
  paragraphs: [
    'At Digivibz, we believe your website should be your most powerful marketing asset, not just a digital brochure. We are a custom web design company that combines creative thinking with data-driven strategy to build websites that look stunning, perform flawlessly, and deliver real business results.',
    'Our team of experienced designers, developers, and strategists starts every project with deep discovery understanding your business, your audience, and your goals. From wireframing and prototyping to final launch, every step is intentional. We craft pixel-perfect designs that balance beautiful user interface (UI) with seamless user experience (UX) ensuring every visitor gets an experience worth remembering.',
    'We don’t do generic. We don’t do templates. We build websites rooted in strong branding, smart graphic design, and a conversion-first mindset so every visitor lands on a site that feels professional, trustworthy, and impossible to ignore.',
  ],
  cta: 'See How We Work',
} as const;

export const WD_SERVICES = {
  lead: 'Here’s every type of website we design and what each one does for your business.',
  title: 'Web Design Services That Drive Real Results for Your Businesses',
  items: [
    {
      title: 'Custom Website Design',
      variant: 'landing',
      body: 'No templates. No shortcuts. We design every website from scratch, built around your brand identity, your audience, and your business goals. The result is a unique, high-performing website that stands out in a crowded market.',
    },
    {
      title: 'Business Website Design',
      variant: 'business',
      body: 'Your website is your hardest-working employee. We create business website design solutions that position your brand professionally, communicate your value clearly, and convert visitors into loyal customers.',
    },
    {
      title: 'Corporate Website Design',
      variant: 'corporate',
      body: 'Enterprise brands need enterprise-level design. We build sleek, authoritative corporate website design solutions that reflect your company’s credibility, communicate your vision, and impress every stakeholder who lands on your page.',
    },
    {
      title: 'Ecommerce Website Design',
      variant: 'ecommerce',
      body: 'Turn your online store into a revenue machine. We design e-commerce websites that are visually compelling, easy to navigate, and optimized to drive more sales, from product pages to checkout.',
    },
    {
      title: 'UI/UX Design Services',
      variant: 'components',
      body: 'Great design is more than aesthetics. Our UI UX design services focus on creating intuitive, engaging experiences that keep visitors on your site longer and guide them naturally toward conversion.',
    },
    {
      title: 'Portfolio Website Design',
      variant: 'portfolio',
      body: 'Make your work speak for itself. We design stunning portfolio websites that showcase your skills, projects, and achievements in a way that attracts clients and opportunities.',
    },
    {
      title: 'Blog / News Website Design',
      variant: 'blog',
      body: 'Build your authority and grow your audience with a clean, readable, and SEO-friendly blog or news website designed to keep readers coming back for more.',
    },
    {
      title: 'Responsive Web Design',
      variant: 'devices',
      body: 'Your website must look and perform perfectly on every screen size. Our responsive website design services ensure your site delivers a flawless experience, whether your visitor is on a desktop, tablet, or mobile phone.',
    },
    {
      title: 'CMS Website Design',
      variant: 'editor',
      body: 'Take full control of your website without touching a single line of code. We build content management system powered websites that are easy to update, manage, and scale as your business grows.',
    },
    {
      title: 'Landing Page Design',
      variant: 'single',
      body: 'First impressions close deals. We design high-converting landing pages that are laser-focused on one goal turning your traffic into leads, signups, or sales.',
    },
    {
      title: 'Website Redesign Services',
      variant: 'redesign',
      body: 'Is your current website holding you back? We refresh and rebuild outdated websites into modern, conversion-focused platforms that re-engage your audience and reignite your growth.',
    },
  ],
  transition:
    'Whatever platform fits your business, we know it inside out. Here’s what we build on.',
} as const;

export const WD_PLATFORMS = {
  title: 'The Platforms We Use to Build Websites That Perform',
  intro:
    'No matter what platform you’re on, or want to move to, we know it inside out. We design and build on the world’s most powerful CMS and ecommerce platforms so your website is fast, flexible, and future-proof.',
  columns: ['Platform', 'What We Do With It'] as const,
  groups: [
    {
      key: 'CMS Platforms',
      note: null,
      rows: [
        {
          name: 'WordPress',
          body: 'The world’s #1 CMS. We build fast, flexible WordPress website design solutions that are easy to manage, simple to update, and built to scale.',
        },
        {
          name: 'Joomla',
          body: 'Powerful and versatile. Perfect for businesses that need advanced features without sacrificing design quality or user experience.',
        },
        {
          name: 'Drupal',
          body: 'Built for enterprise. We use Drupal to design high-traffic, complex websites that demand top-tier security, performance, and scalability.',
        },
        {
          name: 'Webflow',
          body: 'The future of web design. Pixel-perfect, fully responsive websites built visually, fast, clean, and code-free.',
        },
      ],
    },
    {
      key: 'Ecommerce Platforms',
      note: 'Your online store deserves a platform that sells as hard as you do.',
      rows: [
        {
          name: 'Shopify',
          body: 'The #1 ecommerce platform. We design high-converting Shopify stores that look stunning, load instantly, and make buying effortless.',
        },
        {
          name: 'WooCommerce',
          body: 'Flexible ecommerce on WordPress. We build WooCommerce stores that combine design freedom with powerful selling features.',
        },
        {
          name: 'Magento',
          body: 'Built for serious sellers. We design Magento stores with advanced product management, scalability, and a premium shopping experience.',
        },
        {
          name: 'BigCommerce',
          body: 'Fast-growing businesses love it. We build BigCommerce stores optimized for performance, conversions, and seamless customer journeys.',
        },
        {
          name: 'Wix',
          body: 'Simple yet powerful. We design polished, professional Wix websites that give small businesses a big online presence.',
        },
      ],
    },
  ],
  closing:
    'Not sure which platform is right for you? We’ll help you choose the one that fits your goals, your budget, and your growth plans.',
} as const;

export const WD_PROCESS = {
  lead: 'Great platforms mean nothing without a great process. Here’s the system we follow on every project.',
  title: 'The 5-Step Process Behind Every Website We Build',
  intro:
    'Every website we design follows our proven 5D Growth Framework, a step-by-step process designed to eliminate guesswork, ensure quality, and deliver results that exceed expectations.',
  stages: [
    {
      key: 'Discover',
      body: 'We start by digging deep into your business, your goals, your audience, your competitors, and your market. This discovery phase gives us everything we need to design a website that speaks directly to your ideal customer and positions your brand ahead of the competition.',
    },
    {
      key: 'Design',
      body: 'This is where your vision comes to life. Our designers create detailed wireframes and interactive prototypes using Figma and Adobe XD, giving you a clear visual picture of your website before a single line of code is written. Every design decision is rooted in user interface (UI) best practices and user experience (UX) principles.',
    },
    {
      key: 'Develop',
      body: 'Once the design is approved, our developers bring it to life with clean, efficient code. We build on your chosen platform, whether that’s WordPress, Shopify, or any other CMS, ensuring your website is fast, secure, mobile-first, and built to perform.',
    },
    {
      key: 'Deploy',
      body: 'Before launch, we run thorough testing across all devices and browsers to ensure everything works perfectly. Then we launch your website with zero downtime, full website accessibility compliance, and a smooth handover so you’re in complete control from day one.',
    },
    {
      key: 'Detect',
      body: 'Our job doesn’t end at launch. We monitor your website’s performance, track user behavior, and use data-driven insights to continuously improve your site’s conversion rate optimization, so your website keeps getting better over time.',
    },
  ],
  transition:
    'A great process produces great results. But results only matter if your website is solving the right problems. Here’s exactly what we focus on.',
} as const;

export const WD_FOCUS = {
  title: 'Stop Settling for Pretty Websites, Start Getting Ones That Solve Problems',
  intro:
    'Most web design agencies hand you a good-looking website. At Digivibz, we go further. Every website we design is built to solve a specific business problem and deliver measurable results.',
  items: [
    {
      title: 'Your Visitors Aren’t Converting',
      body: 'We design with conversion in mind every layout, every CTA, every user flow is strategically placed to guide your visitor toward taking action. More clicks. More leads. More sales.',
    },
    {
      title: 'Your Brand Looks Unprofessional Online',
      body: 'We combine strong branding with sharp graphic design to create a website that instantly communicates trust, credibility, and authority so your business makes the right impression every single time.',
    },
    {
      title: 'Your Website Breaks on Mobile',
      body: 'We follow a mobile-first design approach designing for the smallest screen first and scaling up so your website looks and performs flawlessly on every device your customers use.',
    },
    {
      title: 'Your Competitors Are Outranking You',
      body: 'We don’t just design, we strategize. We analyze your competition, identify the gaps, and build a website that positions your business as the obvious choice in your market.',
    },
    {
      title: 'Your Website Is Hard to Manage',
      body: 'We build on platforms like WordPress and other leading content management systems that give you full control so updating your website is simple, fast, and stress-free.',
    },
  ],
  closing:
    'At Digivibz, a website isn’t just a deliverable, it’s a solution. And we don’t stop until it works.',
} as const;

export const WD_FAQ = {
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What are web design services?',
      a: 'Web design services cover everything involved in creating a website from layout and visuals to navigation and user experience. It includes planning, designing, and optimizing a site to attract visitors and convert them into customers.',
    },
    {
      q: 'What does a website design company do?',
      a: 'A website design company plans, designs, and builds websites tailored to your business goals. They handle everything from visual design and user experience to platform setup, mobile optimization, and launch so your website performs from day one.',
    },
    {
      q: 'How much do web design services cost in the USA?',
      a: 'Web design costs vary based on complexity, features, and the agency you choose. At Digivibz, we offer affordable web design services with flexible packages for every budget — from simple business sites to full-scale ecommerce stores.',
    },
    {
      q: 'How long does it take to design a website?',
      a: 'Most websites are completed in 2–4 weeks. Complex projects may take longer. Our professional website designers follow a streamlined process to deliver your website on time without cutting corners on quality.',
    },
    {
      q: 'What is included in web design services?',
      a: 'Our creative web design services include strategy, wireframing, UI/UX design, responsive development, CMS integration, speed optimization, SEO-friendly structure, and post-launch support, everything your website needs to perform from day one.',
    },
    {
      q: 'What is the difference between web design and web development?',
      a: 'Web design focuses on visuals, layout, and user experience. Web development handles the code and functionality behind it. At Digivibz, our professional web design agency covers both under one roof.',
    },
    {
      q: 'Will my website be mobile-friendly?',
      a: 'Absolutely. Every website we build is a mobile friendly website design tested across all devices and screen sizes to ensure a flawless experience for every visitor, everywhere.',
    },
    {
      q: 'What platforms do you use for website design?',
      a: 'We design on WordPress, Joomla, Drupal, Webflow, Shopify, WooCommerce, Magento, BigCommerce, and Wix giving every client the right platform for their specific goals and budget.',
    },
    {
      q: 'Why is UI/UX important in website design?',
      a: 'Good UI/UX keeps visitors engaged, reduces bounce rates, and guides users toward conversion. A user-friendly website design builds trust instantly and makes it easy for visitors to find what they need and take action.',
    },
    {
      q: 'Can you redesign my old website?',
      a: 'Yes. Whether your site looks outdated or simply isn’t converting, we offer full website redesign solutions, modernizing your design, improving performance, and rebuilding it into a modern website design that drives real results.',
    },
  ],
} as const;

export const WD_CTA = {
  title: 'Tired of a Website That Looks Good but Delivers Nothing?',
  body: [
    'Your website is the first thing your customers see and the last thing you should leave to chance. At Digivibz, we combine creativity, strategy, and technical expertise to build websites that rank higher, engage deeper, and convert faster. From the very first click to the final conversion, every element of your website is designed with purpose and built for results. Let’s stop leaving money on the table and start building a website that works for you around the clock.',
  ],
  button: 'Get a Free Consultation',
  secondary: 'View Our Portfolio',
} as const;
