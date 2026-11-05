/**
 * Copy for the Graphic Design service page (`#/service/graphic-designing`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - missing space after a full stop in the Detect stage
 *   ("over time.We stay" -> "over time. We stay")
 * - missing final period on the hero intro ("...to act" -> "...to act.")
 * - stray trailing / double spaces trimmed
 * - ❌ / ✅ markers dropped (they were diff markers, not copy — the
 *   component renders X / check icons in their place)
 */

export const GD_HERO = {
  badge: 'Graphic Design',
  titleLead: 'Graphic Design Services That ',
  titleHighlight: 'Build Strong Brands and Drive Business Growth',
  intro:
    'Great design isn’t just about looking good, it’s about communicating the right message to the right people at the right time. At Digivibz, we deliver Custom Graphic Design Services that build trust, spark interest, and move your audience to act.',
  intro2:
    'Whether you’re launching a brand, growing your social presence, or refreshing your marketing, we design with purpose.',
  cta: 'Get a Free Design Consultation',
  secondary: 'See our design process',
  stats: [
    { value: '500+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction Rate' },
    { value: '10+', label: 'Industries Served' },
    { value: '3 Continents', label: 'Brands Across' },
  ],
  trust: 'Trusted by startups, small businesses, and growing brands worldwide',
} as const;

export const GD_PROBLEM = {
  lead: 'So how do you know if your current visuals are helping your business or hurting it? Here’s where to look.',
  title: 'Bad Design Is Silently Killing Your Business',
  p1: 'Your product is great. Your service is solid. But if your visuals don’t show that, nobody will believe it.',
  p2: 'Here’s what poor design is costing you every single day:',
  costs: [
    'You’re losing trust instantly',
    'You’re blending into the crowd',
    'You’re losing sales',
    'You’re wasting money',
    'You look unprofessional',
  ],
  closing: [
    'The truth is that in today’s market, design is not a luxury. It’s a business tool. And when it’s done wrong, it costs you clients, credibility, and revenue.',
    'At Digivibz, we fix that.',
  ],
  transition:
    'Fixing this takes more than a talented designer. It takes a team that treats your brand like their own. Here’s why hundreds of businesses trust us.',
} as const;

export const GD_WHY = {
  title: 'Why Hundreds of Brands Choose Digivibz Over Every Other Design Agency',
  intro: 'We know you have options. Here’s why businesses that are serious about growth keep choosing us.',
  features: [
    {
      title: 'Strategy Meets Creativity',
      body: 'We are not just a team of artists. Every design we produce is backed by market research, audience insights, and a clear business goal. As a results-driven Graphic Design Agency, we make sure every visual serves a purpose beyond just looking good.',
    },
    {
      title: 'Dedicated to Your Brand',
      body: 'We treat every project like it is our own business on the line. From the first Client Brief to the final delivery, you get a dedicated team that is fully invested in making your brand look its absolute best.',
    },
    {
      title: 'Built for Business Graphic Design Needs at Every Scale',
      body: 'Whether you are a solopreneur just starting out or an established company refreshing your brand, we have the skills, tools, and experience to deliver at every level.',
    },
    {
      title: 'Designs That Work Across Every Platform',
      body: 'From Print Design to digital, from social media to packaging, every design we create is built to work consistently across every medium your brand touches.',
    },
  ],
  transition: 'Here’s everything we design and what each piece does for your business.',
} as const;

export const GD_SERVICES = {
  title: 'Design Solutions That Cover Every Corner of Your Business',
  intro: 'We cover every design need your business has, from first impression to final conversion.',
  items: [
    {
      title: 'Brand Identity Design',
      body: 'Your brand is more than a logo, it’s the feeling people get when they see your business. Our Brand Identity Design Services cover everything from logo marks and color palettes to typography systems and brand guidelines. Every element is built around a detailed Client Brief to ensure your Brand Identity stays consistent, recognizable, and powerful across every touchpoint.',
    },
    {
      title: 'Logo Design',
      body: 'Your logo is the first thing people see and the last thing they forget. Our Logo Design Services deliver clean, scalable, and memorable logos built on strong Color Theory and precision Vector Graphics, ensuring your mark looks sharp everywhere from business cards to billboards. We work in both Vector Graphics and Raster Graphics formats so you always get the right file for the right use.',
    },
    {
      title: 'Marketing Material Design',
      body: 'Your marketing materials are your silent sales team. We design Marketing Collateral including brochures, flyers, banners, and more, each piece crafted using Adobe Illustrator and Adobe Photoshop to communicate your value clearly and push your audience toward action.',
    },
    {
      title: 'Social Media Design',
      body: 'Inconsistent visuals lose followers. Our Social Media Graphic Design service keeps your brand looking polished, on-trend, and instantly recognizable across every platform. We design Social Media Graphics using tools like Canva and Adobe Photoshop so every post works harder for your business.',
    },
    {
      title: 'Packaging Design',
      body: 'Your packaging is your first physical handshake with the customer. Our Packaging Design Services blend creative thinking with market strategy, applying strong Color Theory and Visual Communication principles to make your product stand out on the shelf and leave a lasting impression.',
    },
    {
      title: 'Print Design Services',
      body: 'Digital gets the clicks but Print Design builds the trust. Our solutions cover everything from business cards and letterheads to posters and catalogues, designed in high-resolution Raster Graphics and print-ready formats to ensure your brand looks professional and consistent in every physical format.',
    },
    {
      title: 'Ad Creative Design',
      body: 'Weak ad visuals waste your budget. Our Advertising Design Services produce scroll-stopping creatives built for high conversion, crafted using Adobe Illustrator and guided by Visual Communication strategy to grab attention fast and drive action across digital and print campaigns.',
    },
    {
      title: 'Infographic Design',
      body: 'People process visuals 60,000 times faster than text. We turn your complex data and ideas into clean, shareable infographics, using industry-leading Design Software and smart Typography to make your message impossible to miss or misunderstand.',
    },
    {
      title: 'Presentation / Pitch Deck Design',
      body: 'A great idea deserves a great presentation. We design compelling pitch decks and business presentations using Adobe Photoshop and Canva, applying clean Typography and layout principles that tell your story with clarity and give you the confidence to walk into any room and win.',
    },
    {
      title: 'Web & App UI Graphics',
      body: 'From landing pages to full app interfaces, our Website Graphic Design solutions combine stunning User Interface Design with strategic Web Design principles, ensuring every visual element keeps your audience engaged and your brand looking sharp online.',
    },
  ],
  transition:
    'Every one of those services runs through the same structured process, so nothing is left to guesswork',
} as const;

export const GD_PROCESS = {
  lead: 'Every one of those services runs through the same structured process, so nothing is left to guesswork',
  title: 'Our 5D Process Ensures Every Visual We Create Drives Real Results',
  stages: [
    {
      key: 'Discover',
      body: 'Every great design starts with deep understanding. Before we open any Design Software or sketch a single concept, we dive into your business, your audience, and your goals. Through a detailed discovery session, we learn your brand personality, your market position, your target customer, and what your competitors are doing. This phase sets the entire foundation for everything that follows.',
    },
    {
      key: 'Design',
      body: 'This is where creativity meets strategy. Armed with everything we learned in the discovery phase, our designers get to work building concepts that reflect your Brand Identity from the ground up. Using industry-leading Design Software, we craft visuals with purposeful Typography and balanced Color Theory, ensuring every design decision is intentional and aligned with your business goals.',
    },
    {
      key: 'Develop',
      body: 'In the develop phase, we refine, polish, and perfect every detail of your design based on your feedback and our quality standards. Whether it’s fine-tuning Vector Graphics for perfect scalability across all sizes or revisiting color and layout, nothing moves forward until every element meets our standard of excellence and earns your full approval. This is where good design becomes great design.',
    },
    {
      key: 'Deploy',
      body: 'Once everything is approved, it is time to go live. We prepare and deliver your designs in every format, size, and resolution you need. Everything is organized, clearly labeled, and handed over in one complete package so you can launch without any delays, confusion, or extra work on your end.',
    },
    {
      key: 'Detect',
      body: 'Our job doesn’t end at delivery. In the detect phase, we track how your visuals are performing in the real world, gather feedback from your audience, and identify opportunities to improve and evolve your design over time. We stay by your side to make sure your design keeps working as hard as your business does, long after the files land in your inbox.',
    },
  ],
  transition:
    'Following our 5D process is one thing. Seeing what it does to your brand is another. Here is the real difference it makes.',
} as const;

export const GD_DIFF = {
  title: 'Everything Changes When Your Design Actually Works for Your Business',
  intro:
    'Most businesses are losing customers to poor visuals without even realizing it. Here is exactly what shifts when Digivibz takes over your design.',
  rows: [
    {
      label: 'Your Brand Identity',
      bad: 'Generic, forgettable, and looks like every competitor',
      good: 'Unique, memorable, and instantly recognizable everywhere',
    },
    {
      label: 'Your Logo',
      bad: 'Pixelated, inconsistent, and does not scale across formats',
      good: 'Clean, versatile Vector Graphics built to look sharp everywhere',
    },
    {
      label: 'Your Social Media',
      bad: 'Inconsistent posts that get ignored and scrolled past',
      good: 'Scroll-stopping Social Media Graphics that drive real engagement',
    },
    {
      label: 'Your Marketing Materials',
      bad: 'Generic flyers and banners that fail to communicate value',
      good: 'Persuasive Marketing Collateral designed to convert at every touchpoint',
    },
    {
      label: 'Your Visual Style',
      bad: 'Random colors, mismatched fonts, and no clear direction',
      good: 'A consistent design system built on strong Color Theory and Typography',
    },
  ],
} as const;

export const GD_TOOLS = {
  title: 'Every Tool We Use Has a Purpose Behind It',
  items: [
    {
      mono: 'Ps',
      name: 'Adobe Photoshop',
      tag: 'Photo Editing & Digital Graphics',
      body: 'Retouching. Compositing. Pixel-perfect precision. Everything image-based starts here.',
    },
    {
      mono: 'Ai',
      name: 'Adobe Illustrator',
      tag: 'Logos, Icons & Vector Design',
      body: 'Every logo and icon we create lives here, built in clean Vector Graphics that scale from business cards to billboards without losing a single pixel.',
    },
    {
      mono: 'Id',
      name: 'Adobe InDesign',
      tag: 'Print Layouts & Marketing Materials',
      body: 'Brochures. Catalogues. Flyers. Any Marketing Collateral that needs a polished, print-ready layout gets built in InDesign.',
    },
    {
      mono: 'Xd',
      name: 'Adobe XD',
      tag: 'UI/UX Wireframes & Prototypes',
      body: 'Before a single line of code is written, we map out every screen and interaction here using clean User Interface Design principles.',
    },
    {
      mono: 'Fl',
      name: 'Adobe Firefly',
      tag: 'AI-Powered Creative Ideation',
      body: 'Faster concepts. Smarter exploration. We use Firefly to accelerate the creative process and generate ideas that push boundaries.',
    },
    {
      mono: 'Fi',
      name: 'Figma',
      tag: 'Collaborative Web & App Design',
      body: 'Real-time collaboration. Seamless developer handoff. Our go-to for all Web Design and app interface projects that involve a team.',
    },
    {
      mono: 'Cv',
      name: 'Canva',
      tag: 'Quick Social & Marketing Visuals',
      body: 'Speed without sacrificing quality. Perfect for rapid Social Media Graphics, presentations, and marketing templates that need to go live fast.',
    },
    {
      mono: 'Ad',
      name: 'Affinity Designer',
      tag: 'Vector Illustration & Brand Design',
      body: 'Precision vector control for detailed Brand Identity work, illustrations, and complex graphic projects that demand accuracy.',
    },
    {
      mono: 'Ap',
      name: 'Affinity Photo',
      tag: 'Professional Photo Retouching',
      body: 'High-end image editing, compositing, and photo manipulation, delivering polished visuals across both print and digital formats.',
    },
    {
      mono: 'Pr',
      name: 'Procreate',
      tag: 'Hand-Drawn Illustration & Digital Art',
      body: 'When a project needs a human, artistic touch, custom illustrations, hand-lettering, and creative artwork, this is where it comes to life.',
    },
  ],
} as const;

export const GD_FAQ = {
  lead: 'Here are the questions most clients ask before we start working together.',
  title: 'Frequently Asked Questions',
  items: [
    {
      q: 'What are graphic design services?',
      a: 'Graphic design services cover the creation of visual content that communicates a message, builds a brand, and drives action. This includes everything from logo design and brand identity to social media graphics, marketing collateral, packaging, web graphics, and more.',
    },
    {
      q: 'What graphic design services does Digivibz offer?',
      a: 'Digivibz offers Creative Graphic Design Services covering every visual need your business has, from Brand Identity and Logo Design to Social Media, Packaging, Print, Ad Creatives, Infographics, Pitch Decks, and Web UI Graphics.',
    },
    {
      q: 'Why does my business need professional graphic design services?',
      a: 'First impressions are formed in milliseconds. Poor design costs you trust, credibility, and sales. Strong Visual Branding Services build instant recognition, communicate your value, and make your brand memorable. Professional graphic design is not an expense, it is an investment that pays back every single day.',
    },
    {
      q: 'How much do graphic design services cost?',
      a: 'The cost depends on the scope and complexity of your project. A single logo design differs in price from a full brand identity package or ongoing social media design.',
    },
    {
      q: 'What is included in graphic design services?',
      a: 'It depends on the service you choose. At Digivibz, our Digital Graphic Design Services include everything from initial concept and design to revisions, final delivery, and all necessary file formats for both print and digital use.',
    },
    {
      q: 'Can graphic design help improve my brand identity?',
      a: 'Absolutely. Strong Branding Design Services create a consistent, professional, and memorable visual presence that builds trust and recognition with your audience. The right design makes your brand instantly recognizable and sets you apart from every competitor in your space.',
    },
    {
      q: 'Do you provide custom graphic design or ready-made templates?',
      a: 'We provide 100% custom designs built from scratch around your brand and goals. As a Creative Design Agency, we never use generic templates that make every business look the same.',
    },
    {
      q: 'How do I choose the right graphic design service for my business?',
      a: 'It depends on your business stage. Startups need logos and brand identity. Growing brands need Marketing Collateral Design and social media visuals. Larger companies need Corporate Graphic Design and full brand systems. Not sure? Book a free consultation and we will guide you.',
    },
    {
      q: 'What software and tools are commonly used by graphic designers?',
      a: 'Most designers work with Adobe Illustrator for vector designs, Adobe Photoshop for image editing, and Canva for quick marketing visuals. At Digivibz, our team is skilled across all major Design Software to deliver every project at the highest standard.',
    },
    {
      q: 'What is the process of working with a graphic designer for a project?',
      a: 'We start with a Client Brief to understand your goals, then design, refine based on your feedback, and deliver final files ready to use. Simple, clear, and stress-free from start to finish.',
    },
  ],
} as const;

export const GD_CTA = {
  title: 'Ready to Transform Your Brand With Visuals That Actually Work?',
  body: [
    'Your competitors are investing in design. Your audience is judging your brand every single day. The question is, Are your visuals working for you or against you?',
    'At Digivibz, we deliver Professional Graphic Design Services that turn weak visuals into powerful business assets. From startups to established brands, we have helped businesses across industries look better, communicate clearer, and grow faster.',
    'There is no better time to level up your brand than right now.',
  ],
  button: 'Get a Free Design Consultation',
  secondary: 'View Our Portfolio',
} as const;
