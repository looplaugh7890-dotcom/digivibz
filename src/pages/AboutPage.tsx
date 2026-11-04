import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import {
  Activity,
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  Eye,
  Infinity as InfinityIcon,
  LineChart,
  Lightbulb,
  MoveHorizontal,
  Quote,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import { AboutHero } from './AboutHero';
import { Reveal, StaggerItem, staggerContainer } from '../components/Reveal';
import { CountUp } from '../components/CountUp';
import {
  ACHIEVEMENTS,
  APPROACH_PILLARS,
  AI_BENEFITS,
  BELIEFS,
  IDEAL_CLIENTS,
  MISSION_PIPELINE,
  PRINCIPLE_TABS,
  PROCESS_STEPS,
  PrincipleTab,
  STORY_FLOW,
  TEAM,
  VISION_POINTS,
} from '../data/aboutContent';
import type { TeamMember } from '../data/aboutContent';

interface AboutPageProps {
  onOpenAudit: () => void;
}

/* ==========================================================================
   Shared section header — same eyebrow + headline rhythm as the homepage
   ========================================================================== */
const SectionHead: React.FC<{
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: 'center' | 'left';
}> = ({ eyebrow, title, lead, align = 'center' }) => (
  <div className={align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'}>
    <Reveal>
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-[11px] font-bold text-[#C61A1A] uppercase tracking-widest shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
        {eyebrow}
      </div>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
    </Reveal>
    {lead && (
      <Reveal delay={0.16}>
        <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">{lead}</p>
      </Reveal>
    )}
  </div>
);

/* ==========================================================================
   1. Founder — monogram + quote + story-flow diagram
   ========================================================================== */
const FounderStory: React.FC = () => {
  return (
    <section id="founder" className="py-14 md:py-16 bg-slate-50/60 border-t border-slate-100 relative overflow-hidden">
      {/* Soft glow behind the monogram */}
      <div
        className="absolute top-10 left-[6%] w-[380px] h-[380px] rounded-full pointer-events-none opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(198,26,26,0.10) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHead
          eyebrow="The Founder"
          title={
            <>
              Meet the Strategist Who <span className="text-[#C61A1A]">Built Digivibz</span>
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* -------- Left: monogram + identity + stats -------- */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Reveal direction="zoom">
              <div className="relative w-40 h-40">
                {/* Pulsing rings */}
                <span className="absolute inset-0 rounded-full border-2 border-[#C61A1A]/30" style={{ animation: 'dz-pulse-ring 3s ease-out infinite' }} />
                <span className="absolute inset-0 rounded-full border-2 border-[#C61A1A]/20" style={{ animation: 'dz-pulse-ring 3s ease-out 1.5s infinite' }} />
                {/* Orbiting ring */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full dz-orbit">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#C61A1A" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.55" />
                </svg>
                {/* Initials */}
                <div
                  className="absolute inset-4 rounded-full flex items-center justify-center text-white text-4xl font-extrabold shadow-lg bg-[#C61A1A]"
                >
                  MA
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-6 text-xl font-extrabold text-slate-900">Muhammad Ahsan Akmal</h3>
              <p className="mt-1 text-sm font-semibold text-[#C61A1A]">Founder &amp; CEO</p>
            </Reveal>

            {/* Founder stat pillars */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-8 w-full grid grid-cols-3 lg:grid-cols-1 gap-3"
            >
              {[
                { value: '5+', label: 'Years engineering growth systems' },
                { value: '1000+', label: 'Projects across startups & enterprises' },
                { value: '250+', label: 'US businesses scaled with the system' },
              ].map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="rounded-2xl bg-white border border-slate-200 shadow-2xs px-4 py-3.5 text-center lg:text-left">
                    <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                      <CountUp value={stat.value} />
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500 leading-snug mt-1">{stat.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </motion.div>
          </div>

          {/* -------- Right: quote + philosophy -------- */}
          <div className="lg:col-span-8">
            <Reveal direction="right">
              <div className="relative rounded-3xl bg-white border border-slate-200 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] p-7 sm:p-10">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-red-100 rotate-100" strokeWidth={1.5} />
                <p className="text-lg sm:text-xl text-slate-700 leading-relaxed relative">
                  I didn’t build Digivibz to be just another digital marketing agency. I built it to{' '}
                  <mark className="bg-red-50 text-[#9E1414] font-semibold px-1 rounded">fix a problem</mark> hundreds of
                  businesses were silently suffering from — great products, broken strategies, and zero consistent growth.
                </p>
                <p className="mt-5 text-slate-600 leading-relaxed">
                  After 5+ years and 1000+ projects across startups and established enterprises, I stopped seeing
                  marketing as campaigns and started engineering it as a system. That shift became the{' '}
                  <strong className="text-slate-900">5D Growth Framework</strong> and the foundation of everything
                  Digivibz delivers today.
                </p>

                {/* Non-negotiable philosophy */}
                <div className="mt-7 rounded-2xl border-l-4 border-[#C61A1A] bg-slate-50 px-6 py-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#C61A1A] mb-3">
                    The non-negotiable philosophy
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      'Hope isn’t a strategy.',
                      'Creativity means nothing without conversion.',
                      'Growth should be engineered, not gambled.',
                    ].map((line) => (
                      <li key={line} className="flex items-start gap-2.5 text-sm sm:text-base font-semibold text-slate-800">
                        <CheckCircle2 className="w-5 h-5 text-[#C61A1A] shrink-0 mt-0.5" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-slate-500">
                    That’s the standard I built Digivibz on. That’s the standard every client gets.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* -------- Story flow diagram: Frustration → Philosophy → 5D → Revenue -------- */}
            <div className="mt-8">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
              >
                {STORY_FLOW.map((node, i) => (
                  <StaggerItem key={node.from} className="relative">
                    <div className="h-full rounded-2xl bg-white border border-slate-200 shadow-2xs p-4 relative overflow-hidden">
                      <span className="absolute top-0 left-0 h-1 w-12 bg-[#C61A1A]" />
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Step {i + 1}</div>
                      <div className="mt-1.5 text-sm font-extrabold text-slate-900">{node.from}</div>
                      <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{node.note}</p>
                      {/* flow arrow */}
                      {i < STORY_FLOW.length - 1 && (
                        <svg viewBox="0 0 24 24" className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 z-10">
                          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </StaggerItem>
                ))}
                {/* Terminal node */}
                <StaggerItem className="sm:col-span-2 lg:col-span-4">
                  <div className="rounded-2xl px-5 py-4 flex items-center justify-center gap-3 bg-[#18181B] text-white shadow-md">
                    <TrendingUp className="w-5 h-5 text-red-400" />
                    <span className="text-sm sm:text-base font-bold text-center">
                      …and into <CountUp value="1000+" /> projects of engineered, measurable revenue.
                    </span>
                  </div>
                </StaggerItem>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   2. Principles — interactive tab deck (Belief / Mission / Vision / Approach)
   ========================================================================== */
const TAB_META: Record<PrincipleTab, { icon: React.ElementType; tint: string }> = {
  'Our Belief': { icon: Lightbulb, tint: '#C61A1A' },
  'Our Mission': { icon: Target, tint: '#C61A1A' },
  'Our Vision': { icon: Eye, tint: '#C61A1A' },
  'Our Approach': { icon: Compass, tint: '#C61A1A' },
};

const PrinciplesDeck: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const [active, setActive] = useState<PrincipleTab>(PRINCIPLE_TABS[0]);

  const panel = () => {
    switch (active) {
      /* ---------------- Belief ---------------- */
      case 'Our Belief':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BELIEFS.map((belief, i) => (
              <Reveal key={belief.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl bg-white border border-slate-200 shadow-2xs p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {i === 0 ? <TrendingUp className="w-6 h-6" /> : <Target className="w-6 h-6" />}
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-900">{belief.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{belief.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        );

      /* ---------------- Mission ---------------- */
      case 'Our Mission':
        return (
          <div>
            <Reveal>
              <p className="text-slate-700 leading-relaxed max-w-4xl">
                At DIGIVIBZ, our mission is to redefine how US businesses grow through digital marketing. Using our 5D
                Growth Framework, we transform marketing spend into{' '}
                <strong className="text-slate-900">predictable, measurable revenue</strong> — not just campaigns or
                activity.
              </p>
            </Reveal>

            {/* 5D pipeline rail */}
            <Reveal delay={0.1}>
              <p className="mt-7 text-[11px] font-bold uppercase tracking-widest text-slate-500 text-center">
                Powered by the 5D Growth Framework
              </p>
            </Reveal>

            <div className="mt-5 relative">
              {/* Desktop flow line behind the nodes */}
              <svg className="hidden lg:block absolute left-0 right-0 top-[38px] w-full h-2 pointer-events-none" viewBox="0 0 1000 4" preserveAspectRatio="none">
                <line x1="0" y1="2" x2="1000" y2="2" stroke="#E2E8F0" strokeWidth="2" />
                <line
                  x1="0" y1="2" x2="1000" y2="2"
                  stroke="#C61A1A" strokeWidth="2" strokeDasharray="12 10"
                  className="dz-flow" opacity="0.7"
                />
              </svg>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="grid grid-cols-2 lg:grid-cols-5 gap-4 relative"
              >
                {MISSION_PIPELINE.map((node, i) => (
                  <StaggerItem key={node.step}>
                    <div className="flex flex-col items-center text-center group">
                      <div className="w-[76px] h-[76px] rounded-full flex items-center justify-center text-white shadow-md border-4 border-white group-hover:scale-105 transition-transform bg-[#18181B]">
                        <span className="text-lg font-extrabold">{i + 1}</span>
                      </div>
                      <div className="mt-3 text-sm font-extrabold text-slate-900">{node.step}</div>
                      <div className="mt-1 text-xs text-slate-500 leading-snug max-w-[150px]">{node.body}</div>
                    </div>
                  </StaggerItem>
                ))}
              </motion.div>
            </div>

            <Reveal delay={0.15}>
              <p className="mt-8 text-center text-slate-600 max-w-3xl mx-auto leading-relaxed">
                We help businesses grow predictably and profitably. With the 5D Growth Framework, digital marketing
                becomes a structured engine that drives measurable revenue and long-term business growth.
              </p>
            </Reveal>
          </div>
        );

      /* ---------------- Vision ---------------- */
      case 'Our Vision':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  US businesses that partner with DigiVibz don’t just grow —{' '}
                  <span className="text-[#C61A1A]">they dominate.</span>
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  More leads. Higher conversions. Revenue that compounds month after month. We exist for one reason: to
                  turn your digital presence into your most powerful revenue channel.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {VISION_POINTS.map((point, i) => (
                  <StaggerItem key={point}>
                    <div className="h-full rounded-2xl bg-white border border-slate-200 shadow-2xs p-5 flex gap-3.5">
                      <div className="shrink-0 w-9 h-9 rounded-xl bg-[#18181B] text-white flex items-center justify-center text-sm font-extrabold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">{point}</p>
                    </div>
                  </StaggerItem>
                ))}
              </motion.div>
            </div>

            <div className="lg:col-span-12">
              <Reveal>
                <div className="rounded-2xl bg-[#18181B] text-white px-6 py-4 text-center text-sm sm:text-base font-bold">
                  This isn’t about running campaigns. It’s about building businesses that win.
                </div>
              </Reveal>
            </div>
          </div>
        );

      /* ---------------- Approach ---------------- */
      default:
        return (
          <div>
            <Reveal>
              <p className="text-slate-700 leading-relaxed max-w-4xl">
                At Digivibz, we approach digital marketing with one objective:{' '}
                <strong className="text-slate-900">grow your business revenue strategically and predictably.</strong>{' '}
                As a performance-driven digital marketing agency in the US, we operate with clarity, accountability, and
                measurable outcomes at the core of everything we do.
              </p>
            </Reveal>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {APPROACH_PILLARS.map((pillar) => (
                <StaggerItem key={pillar.num}>
                  <div className="h-full rounded-3xl bg-white border border-slate-200 shadow-2xs p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all group relative overflow-hidden">
                    <span className="absolute -top-6 -right-2 text-7xl font-extrabold text-slate-100 select-none group-hover:text-red-50 transition-colors">
                      {pillar.num}
                    </span>
                    <h3 className="relative text-base font-extrabold text-slate-900">{pillar.title}</h3>
                    <p className="relative mt-2 text-sm text-slate-600 leading-relaxed">{pillar.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </motion.div>
          </div>
        );
    }
  };

  return (
    <section id="principles" className="py-14 md:py-16 bg-white border-t border-slate-100 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] opacity-40 pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHead
          eyebrow="What We Believe"
          title={
            <>
              Scalable Digital Marketing <span className="text-[#C61A1A]">Systems for US Businesses</span>
            </>
          }
          lead="Your business deserves more than random results. Too many companies spend on marketing and see little impact on revenue. At Digivibz, we turn every strategy into measurable business outcomes."
        />

        {/* Tab deck */}
        <div className="mt-10 flex justify-center">
          <Reveal>
            <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
              {PRINCIPLE_TABS.map((tab) => {
                const Icon = TAB_META[tab].icon;
                const isActive = active === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-colors ${
                      isActive ? 'text-white' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    aria-pressed={isActive}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="principle-tab-pill"
                        className="absolute inset-0 rounded-xl shadow-md bg-[#C61A1A]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {tab}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Panel */}
        <div className="mt-10 min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {panel()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bridge CTA */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-slate-800 font-bold text-center sm:text-left">
              This is how we’ve helped <span className="text-[#C61A1A]">250+ businesses</span> scale. Want it?
            </p>
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group whitespace-nowrap"
            >
              <span>Talk to us</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ==========================================================================
   3. 5D process in practice — alternating timeline
   ========================================================================== */
const ProcessTimeline: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  return (
    <section id="process" className="py-14 md:py-16 bg-slate-50/60 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="The System, Applied"
          title={
            <>
              The 5D Growth Framework —{' '}
              <span className="text-[#C61A1A]">Our Proven Digital Marketing Strategy</span>
            </>
          }
          lead="The 5D Growth Framework isn’t theory. Here’s the exact process we follow for every client — how we build predictable growth for real businesses."
        />

        <div className="mt-16 relative">
          {/* Desktop spine */}
          <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-0.5 -translate-x-1/2 bg-slate-200 rounded-full" />
          <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-0.5 -translate-x-1/2 overflow-hidden rounded-full">
            <motion.div
              className="w-full h-full origin-top bg-[#C61A1A]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {PROCESS_STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.num}
                  className={`relative md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-10 items-start`}
                >
                  {/* Card */}
                  <div className={`${isLeft ? 'md:col-start-1' : 'md:col-start-3'} pl-14 md:pl-0`}>
                    <Reveal direction={isLeft ? 'left' : 'right'}>
                      <div className="rounded-3xl bg-white border border-slate-200 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.35)] p-6 sm:p-7 relative overflow-hidden hover:shadow-lg transition-shadow">
                        <span className="absolute top-0 left-0 h-1.5 w-full" style={{ background: step.color }} />
                        <div className="flex items-center gap-3">
                          <span
                            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-sm font-extrabold shadow-sm"
                            style={{ background: step.color }}
                          >
                            {step.num}
                          </span>
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: step.color }}>
                              {step.name}
                            </div>
                            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">{step.title}</h3>
                          </div>
                        </div>

                        <p className="mt-4 text-sm text-slate-600 leading-relaxed">{step.body}</p>

                        {/* Deliverables / channels */}
                        {step.items && step.items.length > 0 && (
                          <div className="mt-4">
                            {step.listLabel && (
                              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                                {step.listLabel}
                              </div>
                            )}
                            <div className="flex flex-wrap gap-2">
                              {step.items.map((item) => (
                                <span
                                  key={item}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border"
                                  style={{ backgroundColor: step.tint, borderColor: `${step.color}33`, color: step.color }}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {step.closing && (
                          <p className="mt-4 pt-4 border-t border-dashed border-slate-200 text-sm font-bold text-slate-800">
                            {step.closing}
                          </p>
                        )}
                      </div>
                    </Reveal>
                  </div>

                  {/* Node on the spine (desktop) */}
                  <div className="hidden md:flex md:col-start-2 w-12 justify-center pt-7">
                    <motion.span
                      className="relative w-6 h-6 rounded-full border-4 border-white shadow-md"
                      style={{ background: step.color }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 0.1 }}
                    >
                      <span className="absolute inset-0 rounded-full" style={{ backgroundColor: step.color, animation: 'dz-pulse-ring 2.6s ease-out infinite' }} />
                    </motion.span>
                  </div>

                  {/* Spacer column */}
                  <div className={`hidden md:block ${isLeft ? 'md:col-start-3' : 'md:col-start-1'}`} />

                  {/* Mobile node */}
                  <span
                    className="md:hidden absolute left-0 top-6 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-sm"
                    style={{ background: step.color }}
                  >
                    {step.num}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal>
          <div className="mt-16 text-center">
            <p className="text-lg sm:text-xl font-bold text-slate-800 max-w-3xl mx-auto leading-relaxed">
              This is how digital marketing transforms from campaigns… into a{' '}
              <span className="text-[#C61A1A]">predictable revenue-generating growth engine.</span>
            </p>
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine mt-7 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <span>Build My Revenue System — Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ==========================================================================
   4. AI + Human — Venn diagram + benefit grid
   ========================================================================== */
const AI_BENEFIT_ICONS = {
  target: Target,
  forecast: LineChart,
  pulse: Activity,
  coin: Wallet,
};

const AIPlusHuman: React.FC = () => {
  return (
    <section id="ai-human" className="py-14 md:py-16 bg-white border-t border-slate-100 relative overflow-hidden">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[640px] h-[420px] rounded-full pointer-events-none opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(198,26,26,0.08) 0%, transparent 70%)' }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHead
          eyebrow="AI + Human"
          title={
            <>
              AI-Powered Digital Marketing With <span className="text-[#C61A1A]">Human-Led Strategy</span>
            </>
          }
          lead="Smarter decisions. Stronger growth. At Digivibz, we use AI to work smarter — not to replace thinking. We integrate AI-powered insights and advanced analytics into every strategy we build."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* -------- Venn diagram -------- */}
          <div className="lg:col-span-6">
            <Reveal direction="zoom">
              <div className="relative max-w-[520px] mx-auto">
                <svg viewBox="0 0 560 340" className="w-full select-none" role="img" aria-label="Venn diagram: AI precision and human strategy combine to produce results">
                  <defs>
                    <radialGradient id="venn-ai" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#18181B" stopOpacity="0.10" />
                      <stop offset="100%" stopColor="#18181B" stopOpacity="0.04" />
                    </radialGradient>
                    <radialGradient id="venn-human" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#C61A1A" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#C61A1A" stopOpacity="0.05" />
                    </radialGradient>
                  </defs>

                  {/* Circles */}
                  <circle cx="215" cy="170" r="130" fill="url(#venn-ai)" stroke="#18181B" strokeWidth="2" className="dz-flow" strokeDasharray="10 8" />
                  <circle cx="345" cy="170" r="130" fill="url(#venn-human)" stroke="#C61A1A" strokeWidth="2" strokeDasharray="10 8" className="dz-flow" />

                  {/* Center overlap marker */}
                  <circle cx="280" cy="170" r="62" fill="#FFFFFF" fillOpacity="0.65" stroke="#E2E8F0" strokeWidth="1.5" />

                  {/* Labels */}
                  <text x="150" y="120" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181B">AI Precision</text>
                  <text x="150" y="142" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748B">Speed · Data · Scale</text>
                  <text x="412" y="120" textAnchor="middle" fontSize="15" fontWeight="800" fill="#9E1414">Human Strategy</text>
                  <text x="412" y="142" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748B">Judgment · Creativity</text>
                  <text x="280" y="165" textAnchor="middle" fontSize="17" fontWeight="800" fill="#18181B">RESULTS</text>
                  <text x="280" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748B">Compounding ROI</text>

                  {/* Bottom captions */}
                  <text x="140" y="315" textAnchor="middle" fontSize="12" fontWeight="700" fill="#18181B">“AI brings speed.”</text>
                  <text x="420" y="315" textAnchor="middle" fontSize="12" fontWeight="700" fill="#9E1414">“Humans bring strategy.”</text>
                  <line x1="248" y1="310" x2="312" y2="310" stroke="#CBD5E1" strokeWidth="1.5" />
                </svg>

                {/* Result pill */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[16%] rounded-full bg-[#18181B] text-white text-xs sm:text-sm font-bold px-5 py-2 shadow-lg">
                  You get <span className="text-red-400">results.</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* -------- Benefit grid -------- */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-5">
                What this means for you
              </p>
            </Reveal>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {AI_BENEFITS.map((benefit) => {
                const Icon = AI_BENEFIT_ICONS[benefit.icon];
                return (
                  <StaggerItem key={benefit.title}>
                    <div className="h-full rounded-2xl bg-white border border-slate-200 shadow-2xs p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="mt-3.5 text-sm font-extrabold text-slate-900">{benefit.title}</h3>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{benefit.body}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   5. Team — horizontal scroll slider
   Desktop: the section pins and vertical mouse scroll drives the cards
   sideways with a subtle 3D tilt. Mobile: native snap-swipe row.
   ========================================================================== */
const TeamCardFace: React.FC<{ member: TeamMember; index: number; total: number }> = ({
  member,
  index,
  total,
}) => (
  <div className="relative h-full w-full rounded-3xl border border-slate-200 bg-white shadow-2xs p-6 sm:p-7 flex flex-col overflow-hidden group hover:border-red-300 hover:shadow-lg transition-all">
    <span className="absolute -top-5 -right-1 text-[100px] font-extrabold leading-none text-slate-100 select-none tabular-nums pointer-events-none">
      {String(index + 1).padStart(2, '0')}
    </span>

    <div className="relative flex items-start justify-between gap-3">
      <div className="relative shrink-0">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-lg font-extrabold shadow-md group-hover:scale-105 transition-transform"
          style={{ background: member.color }}
        >
          {member.initials}
        </div>
        {member.initials === 'MA' && (
          <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#C61A1A] text-white text-[9px] font-extrabold uppercase tracking-wider shadow">
            Founder
          </span>
        )}
      </div>
      <span className="pt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 tabular-nums whitespace-nowrap">
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>

    <h3 className="relative mt-6 text-lg sm:text-xl font-extrabold text-slate-900 leading-tight break-words">
      {member.name}
    </h3>
    <p className="mt-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C61A1A]">{member.role}</p>

    <div className="relative mt-4 h-px bg-slate-100">
      <span className="absolute left-0 top-0 h-px w-10 bg-[#C61A1A]" />
    </div>

    <p className="mt-4 text-sm text-slate-600 leading-relaxed">{member.specialty}</p>

    <div className="mt-auto pt-5 flex flex-wrap gap-2">
      {member.tags.map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#C61A1A] bg-red-50 border border-red-200"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

/** Closing statement rendered as the final slide of the track. */
const TeamClosingFace: React.FC = () => (
  <div className="relative h-full w-full rounded-3xl bg-[#C61A1A] p-6 sm:p-7 flex flex-col overflow-hidden">
    <div
      className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-50 blur-2xl pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)' }}
    />
    <div className="relative w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center">
      <Users className="w-6 h-6 text-white" />
    </div>
    <h3 className="relative mt-6 text-2xl font-extrabold text-white leading-tight">
      One Team. One Goal. Your Growth.
    </h3>
    <p className="relative mt-4 text-sm text-white/85 leading-relaxed">
      Every person on this team was chosen for one reason — they deliver results. Together, we bring the
      expertise, energy, and execution that turns digital marketing into your most powerful business asset.
    </p>
    <div className="relative mt-auto pt-5">
      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#C61A1A] text-[11px] font-bold uppercase tracking-widest shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
        Built for results
      </span>
    </div>
  </div>
);

/** Desktop slide wrapper — tilts/scales each card as it passes the center. */
const TeamSlide: React.FC<{
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: React.ReactNode;
}> = ({ progress, index, total, children }) => {
  const center = (index + 0.5) / total;
  const span = 1 / total;
  // WAAPI keyframe offsets must stay within [0, 1], so clamp the outer stops.
  const from = Math.max(0, center - span);
  const to = Math.min(1, center + span);
  const rotateY = useTransform(progress, [from, center, to], [14, 0, -14]);
  const scale = useTransform(progress, [from, center, to], [0.9, 1, 0.9]);
  return (
    <motion.div
      style={{ rotateY, scale }}
      className="shrink-0 w-[320px] xl:w-[360px] h-[420px] [transform-style:preserve-3d]"
    >
      {children}
    </motion.div>
  );
};

const TeamSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const pinned = !reduceMotion;
  const totalSlides = TEAM.length + 1;

  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

  const [activeSlide, setActiveSlide] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.max(0, Math.min(totalSlides - 1, Math.floor(v * totalSlides)));
    setActiveSlide((prev) => (prev === i ? prev : i));
  });

  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setRange(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [pinned]);

  return (
    <section id="team" className="bg-slate-50/60 border-t border-slate-100 relative">
      {/* Soft brand glow, clipped in its own layer so the pinned sticky keeps working */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[760px] h-[420px] rounded-full opacity-60 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(198,26,26,0.08) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-16 pb-10 md:pb-12">
        <SectionHead
          eyebrow="The Team"
          title={
            <>
              The Team That <span className="text-[#C61A1A]">Drives Your Growth</span>
            </>
          }
          lead="Behind every strategy, every campaign, and every result is a team of specialists who don’t just understand digital marketing — they live it. Not generalists. Carefully built experts, each owning their craft, working toward one goal: your measurable, scalable growth."
        />
      </div>

      {/* -------- Desktop: pinned horizontal scroll driven by vertical wheel -------- */}
      {pinned && (
        <div
          ref={wrapRef}
          className="hidden lg:block relative"
          style={{ height: range > 0 ? `calc(${range}px + 100vh)` : '100vh' }}
        >
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            <div className="w-full" style={{ perspective: 1400 }}>
              <motion.div
                ref={trackRef}
                style={{ x }}
                className="flex gap-6 w-max pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[max(2rem,calc((100vw-80rem)/2+2rem))]"
              >
                {TEAM.map((member, i) => (
                  <TeamSlide key={member.name} progress={scrollYProgress} index={i} total={totalSlides}>
                    <TeamCardFace member={member} index={i} total={totalSlides} />
                  </TeamSlide>
                ))}
                <TeamSlide progress={scrollYProgress} index={TEAM.length} total={totalSlides}>
                  <TeamClosingFace />
                </TeamSlide>
              </motion.div>
            </div>

            {/* Progress rail */}
            <div className="absolute bottom-8 inset-x-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-5">
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">
                  <MoveHorizontal className="w-4 h-4 text-[#C61A1A]" />
                  Scroll to explore
                </span>
                <div className="flex-1 h-1 rounded-full bg-slate-200 overflow-hidden">
                  <motion.div className="h-full w-full origin-left bg-[#C61A1A]" style={{ scaleX: scrollYProgress }} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 tabular-nums whitespace-nowrap">
                  {String(activeSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------- Mobile / reduced-motion: native snap-swipe row -------- */}
      <div className={`relative px-4 sm:px-6 pb-14 md:pb-16 ${pinned ? 'lg:hidden' : ''}`}>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 sm:-mx-6 px-4 sm:px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TEAM.map((member, i) => (
            <div key={member.name} className="snap-center shrink-0 w-[78vw] sm:w-[360px] h-[420px]">
              <TeamCardFace member={member} index={i} total={totalSlides} />
            </div>
          ))}
          <div className="snap-center shrink-0 w-[78vw] sm:w-[360px] h-[420px]">
            <TeamClosingFace />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          <MoveHorizontal className="w-4 h-4 text-[#C61A1A]" />
          Swipe to meet the team
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   6. Who we work with — fit checklist + scarcity card
   ========================================================================== */
const IdealClients: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  return (
    <section id="who-we-work-with" className="py-14 md:py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          eyebrow="Perfect Fit"
          title="Who We Work With"
          lead="Digivibz partners with businesses that are serious about structured, scalable growth. Here’s who we partner with — and why it matters."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Fit checklist */}
          <div className="lg:col-span-7">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full"
            >
              {IDEAL_CLIENTS.map((client, i) => (
                <StaggerItem key={client} className="h-full">
                  <div className="h-full rounded-3xl border border-slate-200 bg-slate-50/70 p-6 relative overflow-hidden hover:border-red-300 hover:bg-red-50/40 transition-colors">
                    <span className="absolute top-5 right-5 text-[10px] font-extrabold text-[#C61A1A] bg-red-50 border border-red-200 rounded-full px-2.5 py-1">
                      FIT {i + 1}/4
                    </span>
                    <CheckCircle2 className="w-8 h-8 text-[#C61A1A]" />
                    <p className="mt-4 text-sm sm:text-base font-bold text-slate-800 leading-snug">{client}</p>
                  </div>
                </StaggerItem>
              ))}
            </motion.div>
          </div>

          {/* Scarcity / CTA */}
          <div className="lg:col-span-5">
            <Reveal direction="right" className="h-full">
              <div
                className="h-full rounded-3xl p-7 sm:p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden bg-[#18181B]"
              >
                <div
                  className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-70 blur-2xl pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(198,26,26,0.45) 0%, transparent 70%)' }}
                />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold uppercase tracking-widest text-red-300">
                    <Users className="w-3.5 h-3.5" />
                    Not sure if that’s you?
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold leading-tight">
                    If you’re committed to real growth, <span className="text-red-400">we should talk.</span>
                  </h3>
                  <p className="mt-4 text-slate-300 text-sm leading-relaxed">
                    We take on limited clients each quarter to ensure results. If this sounds like you, don’t wait.
                  </p>
                </div>
                <button
                  onClick={onOpenAudit}
                  className="dz-btn-shine relative mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group"
                >
                  <span>Claim My Free Spot</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================================================
   8. What can be achieved — ascending staircase
   ========================================================================== */
const ACHIEVEMENT_ICONS = [TrendingUp, Users, Award, InfinityIcon];
const STAIR_OFFSET = ['lg:ml-0', 'lg:ml-10', 'lg:ml-20', 'lg:ml-32'];

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-14 md:py-16 bg-white border-t border-slate-100 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_80%_50%,#000_50%,transparent_100%)] opacity-40 pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHead
          eyebrow="What’s Possible"
          title="What Can Be Achieved"
          lead="With the right strategies and structured growth systems, the possibilities are measurable and scalable. When you partner with DIGIVIBZ, a results-focused US-based agency, you can achieve:"
        />

        <div className="mt-14 max-w-4xl mx-auto space-y-6">
          {ACHIEVEMENTS.map((item, i) => {
            const Icon = ACHIEVEMENT_ICONS[i];
            return (
              <Reveal key={item.num} direction={i % 2 === 0 ? 'left' : 'right'} className={STAIR_OFFSET[i]}>
                <div className="rounded-3xl bg-white border border-slate-200 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.35)] p-6 sm:p-7 flex gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group relative overflow-hidden">
                  {/* Ascending accent bar */}
                  <span className="absolute left-0 top-0 h-full w-1.5" style={{ background: item.color }} />
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <span
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform bg-[#18181B]"
                    >
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="text-[11px] font-extrabold text-slate-400 tabular-nums">{item.num}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Step-up indicator */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex items-center justify-center gap-3 text-slate-400">
            {[1, 2, 3, 4].map((step) => (
              <span key={step} className="rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1.5 text-[11px] font-bold" style={{ transform: `translateY(${(4 - step) * 6}px)` }}>
                Level {step}
              </span>
            ))}
            <svg viewBox="0 0 48 24" className="w-12 h-6 text-[#C61A1A]" fill="none">
              <path d="M2 20 C 14 20, 24 16, 34 8 L 44 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M36 2 L 44 2 L 44 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest">Compounding growth</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ==========================================================================
   9. Final CTA
   ========================================================================== */
const AboutCta: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  return (
    <section id="about-cta" className="py-16 md:py-20 bg-[#0A0A0A] text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_65%_at_50%_50%,#000_60%,transparent_100%)]"
      />
      <div
        className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[720px] h-[480px] rounded-full pointer-events-none opacity-70 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(198,26,26,0.25) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-[11px] font-bold text-red-300 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Ready When You Are
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.12]">
            Ready To Scale Your Revenue With a <span className="text-red-400">Proven Growth Plan?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            DIGIVIBZ builds AI-powered, systems-led growth engines for US businesses. Not random campaigns. Not empty
            promises. <span className="text-white font-semibold">Real leads, real sales, real growth</span> — all
            connected in one smart system.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <span>I’m Ready To Scale My Business!</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenAudit}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:-translate-y-0.5 transition-all"
            >
              Get My Free Growth Audit
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ==========================================================================
   About page composition
   ========================================================================== */
export const AboutPage: React.FC<AboutPageProps> = ({ onOpenAudit }) => {
  return (
    <>
      <AboutHero onOpenAudit={onOpenAudit} />
      <FounderStory />
      <PrinciplesDeck onOpenAudit={onOpenAudit} />
      <ProcessTimeline onOpenAudit={onOpenAudit} />
      <AIPlusHuman />
      <TeamSection />
      <IdealClients onOpenAudit={onOpenAudit} />
      <Achievements />
      <AboutCta onOpenAudit={onOpenAudit} />
    </>
  );
};
