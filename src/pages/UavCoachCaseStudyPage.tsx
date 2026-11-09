import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  PlaneTakeoff,
  Radar,
  X,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  UAV,
  UAV_CHALLENGE,
  UAV_CTA,
  UAV_FRAMEWORK_HEADING,
  UAV_IMAGE,
  UAV_OVERVIEW,
  UAV_PHASES,
  UAV_RESULTS_HEADING,
  UAV_RESULTS_SHOTS,
  UAV_SNAPSHOT,
  UAV_TAKEAWAYS,
  UAV_WHY_WORKED,
} from '../data/uavCoachCaseStudyContent';

interface UavCoachCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * UAV Coach Academy case study (`/case-study/uav-coach-academy`).
 *
 * Identity: a field guide / flight plan — white throughout (house rule for
 * case study pages) carrying smooth flight-path curves, dotted table-of-
 * contents leader rules, the seven snapshot stats as a telemetry strip with a
 * spanning final tile, the challenge as TOC rows with leader dots and folio
 * numbers, the 5D phases as chapter cards with corner numerals (no file
 * sheets, receipt rail, bay doors, ruler rail, truss cards, chart folders,
 * gauges, pipe runs, route pins, or coat edges — those belong to the earlier
 * studies), and the results as a masonry evidence board of the client's own
 * ranking and SERP screenshots.
 */

/** Repeating dotted leader line, like a table of contents. */
const LeaderRule: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = 'rgba(100,116,139,0.55)',
}) => {
  const rawId = React.useId();
  const id = `leader-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg aria-hidden="true" className={`block w-full ${className}`} height="6" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="10" height="6" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="3" r="1.25" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="6" fill={`url(#${id})`} />
    </svg>
  );
};

/** Section heading in the field-guide style: title + leader rule. */
const LeaderHeading: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
        {children}
      </h2>
      <span className="flex-1 min-w-0">
        <LeaderRule />
      </span>
    </div>
  </Reveal>
);

/** Smooth flight-path curves with waypoint dots, used as hero/CTA line art. */
const FlightPaths: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 1200 320" fill="none" preserveAspectRatio="none" className={`pointer-events-none ${className}`}>
    <path
      d="M0 250 C 180 150, 340 280, 560 190 S 940 70, 1200 140"
      stroke="#E2E8F0"
      strokeWidth="2"
    />
    <path
      d="M0 120 C 220 60, 420 170, 640 110 S 1000 40, 1200 90"
      stroke="#FECACA"
      strokeWidth="2"
    />
    <circle cx="560" cy="190" r="4" fill="#FCA5A5" />
    <circle cx="640" cy="110" r="4" fill="#CBD5E1" />
    <circle cx="940" cy="86" r="4" fill="#FCA5A5" />
  </svg>
);

export const UavCoachCaseStudyPage: React.FC<UavCoachCaseStudyPageProps> = ({ onOpenAudit }) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white guide cover with telemetry strip + pillar guide
      =================================================================== */}
      <section id="uav-hero" className="relative bg-white overflow-hidden">
        <FlightPaths className="absolute inset-x-0 top-0 h-72 w-full opacity-70" />
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
                {UAV.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.16]"
            >
              Ranking <span className="text-[#C61A1A]">#1 for Competitive Drone Certification Keywords</span>{' '}
              Through Strategic Pillar Content
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
                <div className="mt-1.5 text-sm font-bold text-slate-900">{UAV.meta.industry}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{UAV.meta.timeline}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {UAV.meta.channels.map((c) => (
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
                {UAV.meta.objectiveLabel}
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {UAV.meta.objective}
              </p>
            </motion.div>

            {/* snapshot — telemetry strip, seventh tile spans two columns */}
            <motion.div
              {...rise(0.32)}
              className="mt-7 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden text-center"
            >
              <div className="flex items-center justify-between gap-4 px-5 pt-4">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <Radar className="w-3.5 h-3.5 text-[#C61A1A]" />
                  Snapshot · Measured
                </span>
                <span className="w-28 shrink-0">
                  <LeaderRule color="rgba(198,26,26,0.5)" />
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200">
                {UAV_SNAPSHOT.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      className={`bg-white px-4 pt-4 pb-5 ${s.wide ? 'col-span-2' : ''}`}
                    >
                      <span className="mx-auto flex w-9 h-9 items-center justify-center rounded-lg bg-red-50 border border-red-100 text-[#C61A1A]">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div className="mt-2.5 text-xl sm:text-2xl font-extrabold text-[#C61A1A] tabular-nums leading-[1.15]">
                        {s.value}
                      </div>
                      <div className="mt-1.5 text-[11px] font-semibold text-slate-500 leading-tight">
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* client visual — the pillar guide */}
          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 max-w-4xl mx-auto m-0"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)] bg-white">
              <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-slate-200">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                  Pillar Guide · How to Fly a Quadcopter
                </span>
                <span className="w-28 shrink-0 hidden sm:block">
                  <LeaderRule color="rgba(198,26,26,0.5)" />
                </span>
              </div>
              <img
                src={UAV_IMAGE}
                alt="The UAV Coach pillar guide header with chapter table of contents"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
              <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                {UAV.meta.industry}
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </section>

      {/* ==================================================================
          2. PROJECT OVERVIEW — guide lead paragraphs
      =================================================================== */}
      <section id="uav-overview" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeaderHeading>{UAV_OVERVIEW.heading}</LeaderHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed">
              {UAV_OVERVIEW.paras[0]}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {UAV_OVERVIEW.paras[1]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          3. THE CHALLENGE — table-of-contents rows with folio numbers
      =================================================================== */}
      <section id="uav-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeaderHeading>{UAV_CHALLENGE.heading}</LeaderHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              {UAV_CHALLENGE.intro}
            </p>
          </Reveal>

          <div className="mt-6">
            {UAV_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.04, 0.15)}>
                <div className="group flex items-center gap-3.5 py-3.5 border-b border-slate-100 hover:bg-red-50/40 transition-colors">
                  <span className="flex w-8 h-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A]">
                    <X className="w-4 h-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-[15px] font-medium text-slate-800 leading-snug">
                    {p}
                  </span>
                  <span className="flex-1 min-w-0 hidden sm:block opacity-70">
                    <LeaderRule />
                  </span>
                  <span className="hidden sm:block text-[11px] font-extrabold tabular-nums text-slate-300 group-hover:text-[#C61A1A] transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. 5D GROWTH FRAMEWORK — chapter cards with corner numerals
      =================================================================== */}
      <section id="uav-framework" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeaderHeading>{UAV_FRAMEWORK_HEADING}</LeaderHeading>

          <div className="mt-9 space-y-5">
            {UAV_PHASES.map((phase, i) => (
              <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-3 text-6xl font-extrabold text-slate-100 select-none tabular-nums"
                  >
                    {phase.number}
                  </span>

                  <div className="relative flex items-baseline gap-3 pr-16">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A] shrink-0">
                      Phase {phase.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
                      {phase.name}
                    </h3>
                    <span className="flex-1 min-w-0 self-center">
                      <LeaderRule color="rgba(198,26,26,0.4)" />
                    </span>
                  </div>

                  <p className="relative mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                    {phase.intro}
                  </p>

                  <ul className="relative mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {phase.checks.map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="w-2 h-2 bg-[#C61A1A] rotate-45 shrink-0 mt-1.5"
                        />
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
          5. RESULTS — evidence board of ranking & SERP screenshots
      =================================================================== */}
      <section id="uav-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeaderHeading>{UAV_RESULTS_HEADING}</LeaderHeading>

          <div className="mt-8 columns-1 md:columns-2 gap-5">
            {UAV_RESULTS_SHOTS.map((shot, i) => (
              <Reveal key={shot.title} delay={Math.min(i * 0.06, 0.2)} className="mb-5 break-inside-avoid">
                <figure className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
                    <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                      <BookOpen className="w-3.5 h-3.5 text-[#C61A1A]" />
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
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {UAV_TAKEAWAYS.heading}
              </h2>
              <span className="mt-4 block w-28">
                <LeaderRule color="rgba(198,26,26,0.5)" />
              </span>
              <div className="mt-5 space-y-4">
                {UAV_TAKEAWAYS.paras.map((p) => (
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
                <GraduationCap className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {UAV_WHY_WORKED.heading}
              </h2>
              <span className="mt-4 block w-28">
                <LeaderRule />
              </span>
              <div className="mt-5 space-y-4">
                {UAV_WHY_WORKED.paras.map((p) => (
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
          7. CTA — flight-path white close, echoing the hero
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <FlightPaths className="absolute inset-x-0 bottom-0 h-56 w-full opacity-60" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <PlaneTakeoff className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {UAV_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{UAV_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{UAV_CTA.button}</span>
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
