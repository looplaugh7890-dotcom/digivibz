/**
 * Copy for the Video Editing service page (`/service/video-editing`).
 *
 * Client-provided text, kept verbatim. Only mechanical fixes were applied:
 * - straight apostrophes -> typographic (’) to match site typography
 * - leading/trailing spaces and line breaks normalized
 * - Instagram Reels body: "( tight cuts" -> "(tight cuts" (stray space)
 * - tool sentences split into chips + description tail: the tool names
 *   ("Adobe Premiere Pro, Final Cut Pro, and DaVinci Resolve", "Blender and
 *   Cinema 4D … plus Adobe After Effects", "CapCut and Canva", "Adobe
 *   Audition", "Runway ML and Higgsfield AI") render as chips and the
 *   remaining clause stays verbatim; in the VFX group the duplicated
 *   "Adobe After Effects for" was dropped from the tail since the chip
 *   already names it
 *
 * Duplicates kept verbatim (the source copy repeats them across groups):
 * - "Short Form Video Editing" (Core + Social Media groups)
 * - "Cinematic Video Editing" (Core + Motion Graphics groups)
 *
 * Kept verbatim pending client input (flagged, likely as intended or
 * dropped in transit):
 * - FAQ heading: "Frequently Asked Question" (singular)
 * - pitch body: "built around one goal turning your raw footage" (likely
 *   "one goal: turning your raw footage")
 * - missing commas: "Every project no matter big or small", "mood treating
 *   every project", "ideas to life perfect for product explainers", "fills
 *   the gap from subtle enhancements", "refine footage cleaning up shaky
 *   shots", "use case giving potential buyers", "audiences watch like
 *   strong intros" (none added)
 * - hero intro ends with a bare ")" and no final period
 */

export const VE_HERO = {
  badge: 'Video Editing',
  titleLead: 'Professional Video Editing Services That Get Results, ',
  titleHighlight: 'Not Just Views',
  intro:
    'We offer complete Professional Video Editing services from cutting and color grading to audio syncing and motion graphics. Whether you need a single video polished, a full YouTube channel managed, or an ongoing content pipeline handled every month, our team takes care of it end to end. We work across every format and platform, so your videos are edited to fit exactly where they’re going (YouTube, Instagram, TikTok, your website, or anywhere else)',
  cta: 'Get Your Free Sample Edit',
  secondary: 'See our process',
} as const;

export const VE_PROBLEM = {
  lead: 'But great footage alone doesn’t guarantee a great result. Here’s where most videos actually fall apart.',
  title: 'Tired of Videos That Don’t Get the Views They Deserve?',
  p1: 'A great video isn’t just about good footage, it’s about what happens after. Too many creators and businesses lose viewers in the edit: clunky transitions, flat pacing, audio that doesn’t sync right.',
  itemsLabel: 'What’s Really Holding Your Videos Back:',
  items: [
    'Videos that look amateur despite good footage',
    'Missed deadlines that kill campaign momentum',
    'Inconsistent quality across a growing content calendar',
    'Generic edits that don’t match your brand voice',
    'No clear video editing workflow, just back-and-forth chaos',
  ],
  closing:
    'This is exactly why editing matters, whether it’s a quick social clip or a Long-Form Video Editing project, the goal is never just to polish, it’s to serve a purpose.',
  transition:
    'So what does editing with purpose actually look like? This is where we come in.',
} as const;

export const VE_PITCH = {
  title: 'We Don’t Just Edit Videos. We Build Videos That Get Results.',
  p1: 'At Digivibz, we don’t just trim clips and add transitions. We’re a video editing agency built around one goal turning your raw footage into content that keeps viewers watching, builds trust in your brand, and drives action.',
  p2: 'Whether you’re a creator posting daily, a business running campaigns, or a brand building a content engine, we bring structure, consistency, and craft to every edit, so your video marketing actually works as hard as your content deserves to.',
  button: 'Let’s Build Your Next Video',
  transition:
    'That commitment shows up across every type of video we touch. Here’s the full range of what we do.',
} as const;

export const VE_SERVICES = {
  title: 'The Video Editing Services We Provide',
  intro:
    'From quick social clips to full-scale brand campaigns, our team covers every type of edit your content needs. Each project moves through a structured process (cutting, color, sound, and effects) so nothing feels rushed or inconsistent.',
  groups: [
    {
      key: 'Core Video Editing Services',
      items: [
        {
          title: 'Video Editing Services',
          body: 'This is where it all starts. Every project no matter big or small goes through a full edit: trimming unnecessary footage, fixing pacing, arranging clips in the right order, and making sure the final video tells a clear story. Whether it’s for social media, YouTube, or a business presentation, this is the foundation every other service builds on.',
        },
        {
          title: 'Professional Video Editing',
          body: 'Every video goes through a complete editing process built around clarity, pacing, and polish. We clean up footage, tighten transitions, balance pacing, and make sure the final cut feels smooth and intentional from the first frame to the last, whether it’s a single video or part of an ongoing series.',
        },
        {
          title: 'Long-Form Video Editing',
          body: 'Longer content comes with its own challenges, keeping viewers engaged without losing momentum. We structure long-form videos like YouTube episodes, webinars, interviews, and documentaries so the pacing stays tight, the story stays clear, and viewers stick around instead of clicking away halfway through.',
        },
        {
          title: 'Short Form Video Editing',
          body: 'Fast-paced, attention-grabbing edits built for platforms where the first two seconds decide everything. We cut for hooks, pacing, and punch so short content actually holds attention instead of getting scrolled past.',
        },
        {
          title: 'Cinematic Video Editing',
          body: 'We bring a film-level approach to pacing, framing, and mood treating every project, big or small, with the same attention to visual storytelling.',
        },
        {
          title: 'Video Post Production',
          body: 'Filming is just the start, the real transformation happens in Post-Production. Our video post production process brings editing, sound design, color correction, and effects together into one seamless workflow, turning raw, unedited footage into a complete, publish-ready video ready to go live in any Video Format it needs.',
        },
      ],
    },
    {
      key: 'Social Media Video Editing',
      items: [
        {
          title: 'Short Form Video Editing',
          body: 'Fast-paced, attention-grabbing edits built for platforms where the first two seconds decide everything. We cut for hooks, pacing, and punch so short content actually holds attention instead of getting scrolled past.',
        },
        {
          title: 'TikTok Video Editing',
          body: 'Edited specifically for how TikTok’s audience watches and engages, trend-aware pacing, native-feeling cuts, and sound syncing that keeps the algorithm and the viewer both interested.',
        },
        {
          title: 'Instagram Reels Video Editing',
          body: 'Reels have their own rhythm, and we edit to match it (tight cuts, on-brand visuals, and pacing) designed to perform within Instagram’s fast-scrolling feed.',
        },
        {
          title: 'Viral Video Editing',
          body: 'We can’t guarantee virality, but we edit with everything that gives a video the best shot like strong hooks, smooth pacing, satisfying payoffs, and a structure built for sharing.',
        },
        {
          title: 'Content Repurposing Services',
          body: 'One piece of long-form content, reshaped into multiple pieces of Social Media Video so every video you film gets more mileage across every platform it belongs on.',
        },
      ],
    },
    {
      key: 'Motion Graphics & Animation Services',
      items: [
        {
          title: '2D & 3D Animation Services',
          body: 'From simple explainer graphics to fully animated sequences, we build Motion Graphics Animation that brings ideas to life perfect for product explainers, brand intros, and content that needs more than live footage can deliver.',
        },
        {
          title: 'CGI / VFX Services',
          body: 'When a shot needs something beyond what was filmed, our Visual Effects (VFX) work fills the gap from subtle enhancements to fully composited scenes that blend seamlessly with your original footage.',
        },
        {
          title: 'Cinematic Video Editing',
          body: 'We bring a film-level approach to pacing, framing, and mood treating every project, big or small, with the same attention to visual storytelling.',
        },
        {
          title: 'Video Enhancement Services',
          body: 'Beyond editing, we sharpen, stabilize, and refine footage cleaning up shaky shots, improving clarity, and polishing details so every frame looks as strong as possible.',
        },
      ],
    },
    {
      key: 'Business Video Editing',
      items: [
        {
          title: 'Corporate Video Editing Services',
          body: 'Polished, professional edits for internal communications, training videos, leadership messages, and any content that represents your company to employees, partners, or stakeholders.',
        },
        {
          title: 'Commercial Video Editing Services',
          body: 'Sharp, high-impact edits for ads and commercials built to grab attention fast and communicate your message clearly within seconds.',
        },
        {
          title: 'Promotional Video Editing Services',
          body: 'Edited to highlight offers, launches, and campaigns with pacing and structure designed to drive clicks, sign-ups, or sales.',
        },
        {
          title: 'Brand Video Editing Services',
          body: 'Consistent visual storytelling across every video, so your brand feels the same whether someone’s watching your website, YouTube channel, or social feed.',
        },
      ],
    },
    {
      key: 'Post Production Finishing',
      items: [
        {
          title: 'Color Grading Services',
          body: 'We shape the look and mood of every video through Color Grading, balancing tones, correcting exposure, and creating a consistent visual style that matches your brand or the story you’re telling.',
        },
        {
          title: 'Audio Sync Editing',
          body: 'Clean, properly synced sound is non-negotiable. We handle Audio Editing and syncing so dialogue, music, and effects line up perfectly with the visuals, with no distracting lags or mismatches.',
        },
        {
          title: 'Video Formatting & Resizing',
          body: 'Every platform needs a different fit. What works as a landscape YouTube video won’t work as an Instagram Reel or TikTok post. We resize and reformat each video to match the right video resolution and aspect ratio, so nothing looks cropped or out of place.',
        },
        {
          title: 'Subtitles and Captions Editing',
          body: 'Accurate, well-timed captions that make your videos accessible and watchable with the sound off, essential for social platforms where most viewers scroll without audio.',
        },
      ],
    },
    {
      key: 'Ecommerce Product Video Editing',
      items: [
        {
          title: 'Product Video Editing Services',
          body: 'Clean, detail-focused edits that highlight what makes your product worth buying like clear shots, smooth transitions, and pacing that keeps the focus on the product itself.',
        },
        {
          title: 'Product Showcase Videos',
          body: 'Videos built to show a product from every angle, feature, and use case giving potential buyers everything they need to feel confident before they purchase.',
        },
        {
          title: 'Ecommerce Product Ad Videos',
          body: 'Fast, conversion-focused edits designed for paid ads and marketplace listings short, punchy, and built to stop the scroll and drive a click to buy.',
        },
        {
          title: 'Promotional Product Videos',
          body: 'Edited to support launches, discounts, and campaigns giving your products the spotlight when it matters most for driving sales.',
        },
      ],
    },
    {
      key: 'YouTube Video Editing',
      items: [
        {
          title: 'YouTube Video Editing',
          body: 'Edited specifically for how YouTube audiences watch like strong intros, retention-focused pacing, and structure built to keep viewers watching longer and coming back for more.',
        },
        {
          title: 'Long-Form YouTube Editing',
          body: 'For channels built around in-depth content, we edit longer videos to stay engaging from start to finish, trimming dead space while keeping the story or message intact.',
        },
        {
          title: 'YouTube Shorts Video Editing',
          body: 'Quick, punchy edits built for YouTube’s short-form feed, with fast hooks, tight pacing, and a format designed to perform in a scroll-heavy environment.',
        },
        {
          title: 'Podcast Video Editing',
          body: 'Podcasts aren’t just audio anymore. We edit video versions for YouTube and social clips, syncing camera angles, cutting dead air, and keeping the conversation easy to follow.',
        },
        {
          title: 'Talking Head Video Editing',
          body: 'For interviews, vlogs, or single-speaker videos, we clean up pauses and filler words while keeping the framing steady, so the focus stays on what’s being said.',
        },
        {
          title: 'Thumbnail & Intro/Outro Editing',
          body: 'We design thumbnails that get clicks and create short intros and outros that frame your video professionally, without eating into watch time.',
        },
      ],
    },
    {
      key: 'AI Video Services',
      items: [
        {
          title: 'AI-Generated Videos',
          body: 'Full videos created using AI tools from start to finish, ideal for fast turnarounds, testing content ideas, or scaling output without a full production cycle.',
        },
        {
          title: 'AI Talking Avatar Videos',
          body: 'Realistic AI avatars that deliver your message naturally on camera, giving you a polished, presenter-led video without booking an actual shoot.',
        },
        {
          title: 'AI Voice Over Videos',
          body: 'Natural-sounding voice-overs generated to match your script’s tone and pacing, giving you professional narration in a fraction of the time it takes to record.',
        },
        {
          title: 'Text-to-Video Creation',
          body: 'Written content converted directly into finished video, helping teams move from a script or blog post to a publish-ready video without starting from scratch.',
        },
        {
          title: 'AI Reels / Shorts Automation',
          body: 'Short-form content created and adapted using AI, keeping your channel active with a steady stream of reels and shorts without manual editing on every post.',
        },
        {
          title: 'AI Script to Video Conversion',
          body: 'A finished script transformed into a structured, ready-to-edit video, closing the gap between writing and publishing so projects move faster from idea to final cut.',
        },
        {
          title: 'AI Subtitles & Translation Videos',
          body: 'Automatically generated captions and translations that make your videos accessible to wider audiences and multilingual markets.',
        },
      ],
    },
  ],
  transition:
    'That’s a wide range of services, and it’s only possible because of the tools behind them.',
} as const;

export const VE_TOOLS = {
  title: 'The Tools Behind Every Edit',
  intro:
    'We work across the industry’s leading editing, animation, and AI platforms, so every project gets the right tool for the job, not a one-size-fits-all approach.',
  groups: [
    {
      key: 'Editing & Post-Production',
      tools: ['Adobe Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve'],
      body: 'for cutting, color correction, and finishing across every type of video.',
    },
    {
      key: 'Motion Graphics & VFX',
      tools: ['Blender', 'Cinema 4D', 'Adobe After Effects'],
      body: 'for 2D/3D animation and visual effects, plus motion graphics and compositing.',
    },
    {
      key: 'Fast-Turnaround & Social',
      tools: ['CapCut', 'Canva'],
      body: 'for quick, platform-ready edits built for social media speed and formats.',
    },
    {
      key: 'Audio',
      tools: ['Adobe Audition'],
      body: 'for clean, professional audio editing and syncing.',
    },
    {
      key: 'AI-Powered Production',
      tools: ['Runway ML', 'Higgsfield AI'],
      body: 'for AI-generated video content, automation, and next-generation editing capabilities.',
    },
  ],
  transition:
    'Great tools only matter when they’re used inside a process that actually works. Here’s ours.',
} as const;

export const VE_PROCESS = {
  title: 'The 5D Framework Behind Every Video We Edit',
  stages: [
    {
      key: 'Discover',
      body: 'Before any editing begins, we take time to understand your goals, audience, and brand voice. We look at what the video needs to achieve, who it’s speaking to, and how it fits into your broader content strategy, so every decision made later is grounded in purpose, not guesswork.',
    },
    {
      key: 'Design',
      body: 'Once we understand the goal, we plan how the video should look, feel, and flow. This means mapping out pacing, structure, tone, and visual style ahead of time, so the editing process has a clear direction instead of being figured out as we go.',
    },
    {
      key: 'Develop',
      body: 'This is where the video comes together. Our editors handle every technical layer, cutting footage, grading color, syncing audio, adding motion graphics or effects where needed, refining each detail until the video matches the vision set out in the design phase.',
    },
    {
      key: 'Deploy',
      body: 'The finished video is exported and formatted specifically for where it’s going, whether that’s YouTube, Instagram, TikTok, a website, an ad platform, or a client presentation, so it’s ready to go live immediately without needing further adjustments.',
    },
    {
      key: 'Detect',
      body: 'Once the video is live, we monitor how it performs, tracking engagement, watch time, and audience response. Those insights feed directly into future projects, so every video we edit builds on real data instead of starting from zero each time.',
    },
  ],
  transition:
    'A solid process is only worth something if it’s backed by the right team. Here’s what sets ours apart.',
} as const;

export const VE_WHY = {
  title: 'Why Choose Digivibz for Your Video Editing',
  items: [
    {
      title: 'Experienced Editors, Not Just Software Operators',
      body: 'Our team understands storytelling, pacing, and platform behavior, not just how to use editing software. Every cut is made with intention, not just technical execution.',
    },
    {
      title: 'One Team for Every Format',
      body: 'From short-form social clips to long-form YouTube content to AI-powered video production, you don’t need to juggle multiple freelancers or vendors. We handle it all under one roof.',
    },
    {
      title: 'Consistent Quality, Every Time',
      body: 'Whether it’s a single video or a monthly content pipeline, you get the same level of craft and attention to detail on every single project, no dips in quality as volume increases.',
    },
    {
      title: 'Built Around Your Goals',
      body: 'We don’t edit in a vacuum. Every project starts with understanding what you’re trying to achieve, so the final video actually supports your bigger picture, not just looks good on its own.',
    },
  ],
} as const;

export const VE_FAQ = {
  lead: 'Still have questions before you commit? Here are the ones we get asked most.',
  title: 'Frequently Asked Question',
  items: [
    {
      q: 'What are video editing services and what do they include?',
      a: 'It covers cutting, grading, audio syncing, subtitles, motion graphics, and effects, turning raw footage into a polished, publish-ready video tailored to your platform and goals.',
    },
    {
      q: 'How much do video editing services cost in the USA?',
      a: 'Pricing varies based on video length, complexity, and turnaround time, ranging from project-based flat fees to monthly retainers. We provide custom quotes after understanding your requirements.',
    },
    {
      q: 'How do you price video editing services for different types of videos?',
      a: 'Pricing depends on video length, number of revisions, Video Effects complexity, and turnaround time. Simple social clips cost less than long-form or heavily produced corporate videos.',
    },
    {
      q: 'How much should I charge for a 1-minute or 5-minute video edit?',
      a: 'Pricing depends on complexity, not just length. A 1-minute video with heavy effects can cost more than a simple 5-minute cut. We’re happy to help price your project.',
    },
    {
      q: 'What types of videos do you edit (YouTube, Reels, corporate, ads)?',
      a: 'We edit YouTube videos, Reels, TikToks, Corporate Video content, ads, and everything in between, covering nearly every video format businesses and creators need.',
    },
    {
      q: 'What video editing software do you use for professional editing?',
      a: 'We use Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, After Effects, Blender, Cinema 4D, and other industry-standard tools depending on the project’s needs.',
    },
    {
      q: 'Do you offer AI video editing services as well?',
      a: 'Yes, we offer AI-generated videos, talking avatars, voice-overs, text-to-video creation, and AI-powered automation for teams needing fast, scalable Video Production.',
    },
    {
      q: 'How can I send my raw footage for video editing?',
      a: 'You can share footage through cloud storage links like Google Drive, Dropbox, or WeTransfer. We’ll guide you through the exact process once your project is confirmed.',
    },
    {
      q: 'How long does it take to edit a video?',
      a: 'Turnaround time depends on length, Video Compression needs, and complexity, typically ranging from a couple of days for short clips to a week or more for longer projects.',
    },
    {
      q: 'Can I hire a video editor for YouTube or social media content regularly?',
      a: 'Yes, we offer ongoing monthly packages for creators and businesses needing consistent Social Media Video Editing or regularly scheduled YouTube content.',
    },
    {
      q: 'Do you provide video editing services for businesses and ecommerce brands?',
      a: 'Yes, we handle Business Video Editing Services, Ecommerce Video Editing, Podcast Video Editing, and Real Estate Video Editing, tailored to help businesses and brands across industries market effectively.',
    },
    {
      q: 'Do I fully own the edited videos after delivery?',
      a: 'Yes, once your project is delivered and paid for, you fully own the final edited videos with complete rights to use them however you need, in any Video Resolution required.',
    },
  ],
} as const;

export const VE_CTA = {
  title: 'Let’s Build a Video That Actually Performs',
  body: 'You’ve got the content, the ideas, and the raw footage sitting on a hard drive somewhere. We’ll take it from there, handling everything from the first cut to the final export, so every video is polished, on-brand, and ready to perform wherever it’s published. Whether it’s a single project or an ongoing content pipeline, our team is ready to make it happen.',
  button: 'Get a Free Video Editing Quote',
} as const;
