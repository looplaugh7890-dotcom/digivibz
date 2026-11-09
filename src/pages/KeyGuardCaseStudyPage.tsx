import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  KeyRound,
  PhoneCall,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  KG,
  KG_CHALLENGE,
  KG_CTA,
  KG_FRAMEWORK_HEADING,
  KG_IMAGE,
  KG_OVERVIEW,
  KG_PHASES,
  KG_RESULTS,
  KG_RESULTS_HEADING,
  KG_RESULTS_SHOTS,
  KG_TAKEAWAYS,
  KG_WHY_WORKED,
} from '../data/keyguardCaseStudyContent';

interface KeyGuardCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * KeyGuard Locksmith case study (`/case-study/keyguard-locksmith`).
 *
 * Identity: a 24/7 dispatch board — white throughout (house rule for case
 * study pages) carrying key-blade line art (bow ring + serrated blade) in the
 * hero and CTA, a serrated key-cut rule under every heading, lock-cylinder
 * tumbler pins as the phase-card corner ornament, key-round markers on the
 * challenge shelf rows and framework checks, the client's own snapshot
 * graphic framed as the hero board, the results bullets as a dispatch log
 * card, and the three performance screenshots as a masonry evidence board
 * (no sparkles, chain links, vitrines, flight paths, leader dots, telemetry
 * strips, gauges, pipe runs, route pins, or coat edges — those belong to
 * earlier studies).
 */

/** Repeating serrated rule, like the cuts on a key blade. */
const KeyRule: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = 'rgba(148,163,184,0.8)',
}) => {
  const rawId = React.useId();
  const id = `keycut-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg aria-hidden="true" className={`block w-full ${className}`} height="8" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="14" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 7 L3.5 1.5 L7 7 L10.5 1.5 L14 7" fill="none" stroke={color} strokeWidth="1.4" />
        </pattern>
      </defs>
      <rect width="100%" height="8" fill={`url(#${id})`} />
    </svg>
  );
};

/** Section heading in the dispatch style: title + serrated key-cut rule. */
const KeyHeading: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
        {children}
      </h2>
      <span className="flex-1 min-w-0">
        <KeyRule color="rgba(198,26,26,0.45)" />
      </span>
    </div>
  </Reveal>
);

/** Key-blade line art: bow ring + serrated blade, used as hero/CTA art. */
const KeyLine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 1200 140" fill="none" preserveAspectRatio="none" className={`pointer-events-none ${className}`}>
    <circle cx="70" cy="56" r="26" stroke="#E2E8F0" strokeWidth="2.5" />
    <circle cx="70" cy="56" r="10" stroke="#E2E8F0" strokeWidth="2.5" />
    <path d="M96 56 H1140" stroke="#E2E8F0" strokeWidth="2.5" />
    <path d="M980 56 v14 h16 v-14 M1044 56 v20 h14 v-20 M1104 56 v12 h12 v-12" stroke="#E2E8F0" strokeWidth="2.5" />
    <circle cx="150" cy="102" r="17" stroke="#FECACA" strokeWidth="2" />
    <circle cx="150" cy="102" r="6.5" stroke="#FECACA" strokeWidth="2" />
    <path d="M167 102 H900" stroke="#FECACA" strokeWidth="2" />
    <path d="M760 102 v12 h12 v-12 M822 102 v16 h12 v-16" stroke="#FECACA" strokeWidth="2" />
    <circle cx="1050" cy="102" r="4" fill="#FCA5A5" />
  </svg>
);

/** Lock-cylinder tumbler pins, one highlighted per phase. */
const TumblerPins: React.FC<{ offset: number; className?: string }> = ({
  offset,
  className = '',
}) => {
  const base = [14, 8, 16, 10, 12];
  const heights = base.map((_, i) => base[(i + offset) % base.length]);
  return (
    <svg aria-hidden="true" viewBox="0 0 50 20" width="50" height="20" className={`pointer-events-none ${className}`}>
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 10 + 1}
          y={20 - h}
          width="5"
          height={h}
          rx="1.5"
          fill={i === offset % base.length ? '#FCA5A5' : '#CBD5E1'}
        />
      ))}
    </svg>
  );
};

export const KeyGuardCaseStudyPage: React.FC<KeyGuardCaseStudyPageProps> = ({ onOpenAudit }) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white dispatch cover with key-blade art + snapshot board
      =================================================================== */}
      <section id="keyguard-hero" className="relative bg-white overflow-hidden">
        <KeyLine className="absolute inset-x-0 top-0 h-72 w-full opacity-70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-10 md:pb-16">
          <motion.a
            {...rise(0)}
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </motion.a>

          <div className="mt-8 max-w-4xl mx-auto text-center">
            <motion.div {...rise(0.06)}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold text-[#C61A1A] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                {KG.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.16]"
            >
              Turning <span className="text-[#C61A1A]">Emergency Searches</span> Into Booked
              Locksmith Jobs Through Google Ads
            </motion.h1>

            {/* meta strip — white sign card */}
            <motion.div
              {...rise(0.2)}
              className="mt-7 grid grid-cols-1 sm:grid-cols-3 rounded-2xl bg-white border border-slate-200 shadow-xs divide-y sm:divide-y-0 sm:divide-x divide-slate-200 overflow-hidden text-center"
            >
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Industry
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{KG.meta.industry}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{KG.meta.timeline}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {KG.meta.channels.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-600"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div {...rise(0.26)} className="mt-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2.5 text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
                {KG.meta.objectiveLabel}
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {KG.meta.objective}
              </p>
            </motion.div>

            {/* snapshot — the client's own campaign snapshot, framed as a dispatch board */}
            <motion.figure
              initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-3xl mx-auto m-0"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)] bg-white">
                <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-slate-200">
                  <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    <KeyRound className="w-3.5 h-3.5 text-[#C61A1A]" />
                    Snapshot · Measured Over 6 Months
                  </span>
                  <span className="w-28 shrink-0 hidden sm:block">
                    <KeyRule color="rgba(198,26,26,0.45)" />
                  </span>
                </div>
                <img
                  src={KG_IMAGE}
                  alt="KeyGuard Locksmith campaign snapshot: 68 calls generated per month, $24 average cost per lead, 4,900 clicks over 6 months and 312 total booked jobs from ads"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
                <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                  {KG.meta.industry}
                </figcaption>
              </div>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. PROJECT OVERVIEW — dispatch lead paragraphs
      =================================================================== */}
      <section id="keyguard-overview" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <KeyHeading>{KG_OVERVIEW.heading}</KeyHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed">
              {KG_OVERVIEW.paras[0]}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {KG_OVERVIEW.paras[1]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          3. THE CHALLENGE — shelf rows on a serrated rail
      =================================================================== */}
      <section id="keyguard-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <KeyHeading>{KG_CHALLENGE.heading}</KeyHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              {KG_CHALLENGE.intro}
            </p>
          </Reveal>

          <div className="mt-6">
            {KG_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.04, 0.15)}>
                <div className="group flex items-center gap-3.5 py-3.5 border-b border-slate-100 hover:bg-red-50/40 transition-colors">
                  <span className="flex w-8 h-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A]">
                    <X className="w-4 h-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-[15px] font-medium text-slate-800 leading-snug">
                    {p}
                  </span>
                  <span className="flex-1 min-w-0 hidden sm:block opacity-60">
                    <KeyRule />
                  </span>
                  <KeyRound className="hidden sm:block w-3.5 h-3.5 shrink-0 text-slate-300 group-hover:text-[#C61A1A] transition-colors" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. 5D GROWTH FRAMEWORK — cut-card phases with tumbler pins
      =================================================================== */}
      <section id="keyguard-framework" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <KeyHeading>{KG_FRAMEWORK_HEADING}</KeyHeading>

          <div className="mt-9 space-y-5">
            {KG_PHASES.map((phase, i) => (
              <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                  <TumblerPins
                    offset={i}
                    className="absolute right-6 top-6 hidden sm:block"
                  />

                  <div className="relative flex items-center gap-3.5 pr-16">
                    <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-red-50 border border-red-100 text-[#C61A1A]">
                      <KeyRound className="w-4.5 h-4.5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                        Phase {phase.number}
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
                        {phase.name}
                      </h3>
                    </div>
                    <span className="flex-1 min-w-0 hidden sm:block">
                      <KeyRule color="rgba(198,26,26,0.35)" />
                    </span>
                  </div>

                  <p className="relative mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                    {phase.intro}
                  </p>

                  <ul className="relative mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {phase.checks.map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <KeyRound className="w-3 h-3 shrink-0 mt-1 text-[#C61A1A]" />
                        <span className="text-sm text-slate-700 leading-snug">{c}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. RESULTS — dispatch log + performance evidence board
      =================================================================== */}
      <section id="keyguard-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <KeyHeading>{KG_RESULTS_HEADING}</KeyHeading>

          <Reveal delay={0.06}>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
              <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-slate-200 bg-slate-50">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <PhoneCall className="w-3.5 h-3.5 text-[#C61A1A]" />
                  Dispatch Log · Booked From Ads
                </span>
                <span className="w-28 shrink-0 hidden sm:block">
                  <KeyRule color="rgba(198,26,26,0.45)" />
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {KG_RESULTS.map((r) => {
                  const Icon = r.icon;
                  return (
                    <div key={r.text} className="flex items-center gap-3.5 px-5 py-3.5 hover:bg-red-50/40 transition-colors">
                      <span className="flex w-8 h-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A]">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-sm sm:text-[15px] font-medium text-slate-800 leading-snug">
                        {r.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <div className="mt-5 columns-1 md:columns-2 gap-5">
            {KG_RESULTS_SHOTS.map((shot, i) => (
              <Reveal key={shot.title} delay={0.1 + i * 0.06} className="mb-5 break-inside-avoid">
                <figure className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
                    <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                      <KeyRound className="w-3.5 h-3.5 text-[#C61A1A]" />
                      {shot.title}
                    </span>
                    <span className="text-[11px] font-extrabold text-[#C61A1A] tabular-nums truncate">
                      {shot.stat}
                    </span>
                  </div>
                  <img src={shot.src} alt={shot.alt} className="w-full h-auto block" />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          6. KEY TAKEAWAYS + WHY THIS WORKED — two ruled columns
      =================================================================== */}
      <section className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <Reveal>
            <article>
              <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-red-50 text-[#C61A1A]">
                <KeyRound className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {KG_TAKEAWAYS.heading}
              </h2>
              <span className="mt-4 block w-28">
                <KeyRule color="rgba(198,26,26,0.45)" />
              </span>
              <div className="mt-5 space-y-4">
                {KG_TAKEAWAYS.paras.map((p) => (
                  <p key={p.slice(0, 40)} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="lg:border-l lg:border-slate-200 lg:pl-14">
              <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {KG_WHY_WORKED.heading}
              </h2>
              <span className="mt-4 block w-28">
                <KeyRule />
              </span>
              <div className="mt-5 space-y-4">
                {KG_WHY_WORKED.paras.map((p) => (
                  <p key={p.slice(0, 40)} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          7. CTA — key-blade white close, echoing the hero
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <KeyLine className="absolute inset-x-0 bottom-0 h-56 w-full opacity-60" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <PhoneCall className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {KG_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{KG_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{KG_CTA.button}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-sm sm:text-base rounded-xl transition-all"
            >
              View More Case Studies
              <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
