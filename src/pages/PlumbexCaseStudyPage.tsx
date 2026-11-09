import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ClipboardList,
  Gauge,
  Wrench,
  X,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  PLX,
  PLX_CHALLENGE,
  PLX_CTA,
  PLX_FRAMEWORK_HEADING,
  PLX_IMAGE,
  PLX_PHASES,
  PLX_RESULTS,
  PLX_RESULTS_HEADING,
  PLX_SNAPSHOT,
  PLX_TAKEAWAYS,
  PLX_WHY_WORKED,
} from '../data/plumbexCaseStudyContent';

interface PlumbexCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * Plumbex case study (`/case-study/plumbex`).
 *
 * Identity: an emergency dispatch board plumbed together — white throughout
 * (house rule for case study pages) carrying pipe-run rules with coupling
 * collars, a faint pipe schematic in the hero and CTA, the snapshot stats on
 * pressure-gauge dials, the challenge as leak-report cards, the 5D phases as a
 * vertical riser with red coupling nodes (no file sheets, receipt rail, bay
 * doors, ruler rail, truss cards, or chart folders — those belong to the
 * earlier studies), and results as booked-job rows with a stamp.
 */

/** Repeating pipe run with coupling collars, used as a rule. */
const PipeRule: React.FC<{ className?: string; color?: string; collar?: string }> = ({
  className = '',
  color = 'rgba(100,116,139,0.45)',
  collar = 'rgba(100,116,139,0.65)',
}) => {
  const rawId = React.useId();
  const id = `pipe-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg aria-hidden="true" className={`block w-full ${className}`} height="10" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="88" height="10" patternUnits="userSpaceOnUse">
          <rect x="0" y="3.5" width="88" height="3" fill={color} />
          <rect x="0" y="0.5" width="5" height="9" rx="1" fill={collar} />
          <rect x="44" y="0.5" width="5" height="9" rx="1" fill={collar} />
        </pattern>
      </defs>
      <rect width="100%" height="10" fill={`url(#${id})`} />
    </svg>
  );
};

/** Section heading in the dispatch style: title + pipe-run rule. */
const PipeHeading: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
        {children}
      </h2>
      <span className="flex-1 min-w-0">
        <PipeRule />
      </span>
    </div>
  </Reveal>
);

/** Pressure-gauge dial for the snapshot panel. */
const GaugeDial: React.FC<{ fraction: number }> = ({ fraction }) => {
  const arc = Math.PI * 50;
  const theta = Math.PI * (1 - fraction);
  const nx = 60 + 40 * Math.cos(theta);
  const ny = 60 - 40 * Math.sin(theta);
  return (
    <svg aria-hidden="true" viewBox="0 0 120 66" className="block w-full">
      <path
        d="M10 60 A50 50 0 0 1 110 60"
        fill="none"
        stroke="#E2E8F0"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M10 60 A50 50 0 0 1 110 60"
        fill="none"
        stroke="#C61A1A"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${arc * fraction} ${arc}`}
      />
      <line x1="60" y1="60" x2={nx} y2={ny} stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

/** Faint pipe-schematic line art: run with two elbows, a valve, and a drip. */
const PipeSchematic: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 420 320" fill="none" className={`pointer-events-none ${className}`}>
    <path
      d="M20 60 H180 Q200 60 200 80 V200 Q200 220 220 220 H400"
      stroke="#E2E8F0"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <rect x="56" y="48" width="10" height="24" rx="2" fill="#CBD5E1" />
    <rect x="126" y="48" width="10" height="24" rx="2" fill="#CBD5E1" />
    <rect x="188" y="136" width="24" height="10" rx="2" fill="#CBD5E1" />
    <rect x="296" y="208" width="10" height="24" rx="2" fill="#CBD5E1" />
    <line x1="110" y1="60" x2="110" y2="38" stroke="#FCA5A5" strokeWidth="5" strokeLinecap="round" />
    <circle cx="110" cy="26" r="13" stroke="#FCA5A5" strokeWidth="5" />
    <line x1="97" y1="26" x2="123" y2="26" stroke="#FCA5A5" strokeWidth="4" />
    <line x1="110" y1="13" x2="110" y2="39" stroke="#FCA5A5" strokeWidth="4" />
    <path
      d="M350 238 c-6 8 -9 12 -9 17 a9 9 0 0 0 18 0 c0 -5 -3 -9 -9 -17 z"
      fill="#FECACA"
    />
  </svg>
);

export const PlumbexCaseStudyPage: React.FC<PlumbexCaseStudyPageProps> = ({ onOpenAudit }) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white dispatch header with gauge panel + client visual
      =================================================================== */}
      <section id="plx-hero" className="relative bg-white overflow-hidden">
        <PipeSchematic className="absolute -right-14 top-16 w-[360px] hidden lg:block opacity-80" />
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
                {PLX.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.16]"
            >
              How We Helped a Plumbing Company Turn Emergency Searches Into{' '}
              <span className="text-[#C61A1A]">Booked Jobs</span>
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
                <div className="mt-1.5 text-sm font-bold text-slate-900">{PLX.meta.industry}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{PLX.meta.timeline}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {PLX.meta.channels.map((c) => (
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
                {PLX.meta.objectiveLabel}
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {PLX.meta.objective}
              </p>
            </motion.div>

            {/* snapshot — pressure-gauge panel */}
            <motion.div
              {...rise(0.32)}
              className="mt-7 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden text-center"
            >
              <div className="flex items-center justify-between gap-4 px-5 pt-4">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <Gauge className="w-3.5 h-3.5 text-[#C61A1A]" />
                  Snapshot · Measured
                </span>
                <span className="w-28 shrink-0">
                  <PipeRule color="rgba(198,26,26,0.4)" collar="rgba(198,26,26,0.6)" />
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200">
                {PLX_SNAPSHOT.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="bg-white px-4 pt-5 pb-5">
                      <span className="relative block w-24 mx-auto">
                        <GaugeDial fraction={s.gauge} />
                        <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 flex w-6 h-6 items-center justify-center rounded-md bg-red-50 border border-red-100 text-[#C61A1A]">
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                      </span>
                      <div className="mt-3.5 text-2xl sm:text-3xl font-extrabold text-[#C61A1A] tabular-nums leading-none">
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

          {/* client visual — dispatch board */}
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
                  Emergency Call Board · Live
                </span>
                <span className="w-28 shrink-0 hidden sm:block">
                  <PipeRule color="rgba(198,26,26,0.4)" collar="rgba(198,26,26,0.6)" />
                </span>
              </div>
              <img
                src={PLX_IMAGE}
                alt="Plumbex website shown on a laptop over the brand blue and yellow background"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
              <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                {PLX.meta.industry}
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </section>

      {/* ==================================================================
          2. THE CHALLENGE — leak-report cards
      =================================================================== */}
      <section id="plx-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PipeHeading>{PLX_CHALLENGE.heading}</PipeHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              {PLX_CHALLENGE.intro}
            </p>
          </Reveal>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PLX_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.04, 0.15)}>
                <div className="h-full flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white p-4 hover:border-[#C61A1A]/40 hover:bg-red-50/40 transition-colors">
                  <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A]">
                    <X className="w-4 h-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-[15px] font-medium text-slate-800 leading-snug">
                    {p}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. 5D GROWTH FRAMEWORK — riser diagram with coupling nodes
      =================================================================== */}
      <section id="plx-framework" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <PipeHeading>{PLX_FRAMEWORK_HEADING}</PipeHeading>

          <div className="mt-10 relative">
            <div
              aria-hidden="true"
              className="absolute left-[18px] top-4 bottom-4 w-1 rounded bg-slate-200"
            />
            <div className="space-y-6">
              {PLX_PHASES.map((phase, i) => (
                <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                  <article className="relative grid grid-cols-[40px_1fr] gap-4 sm:gap-6">
                    {/* coupling node on the riser */}
                    <span className="relative z-10 flex w-10 h-10 items-center justify-center rounded-xl bg-[#C61A1A] text-white text-sm font-extrabold tabular-nums shadow-md shadow-red-200 ring-4 ring-slate-50">
                      {phase.number}
                    </span>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
                          {phase.name}
                        </h3>
                        <span className="flex-1 min-w-0">
                          <PipeRule color="rgba(198,26,26,0.35)" collar="rgba(198,26,26,0.55)" />
                        </span>
                      </div>

                      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                        {phase.intro}
                      </p>

                      <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                        {phase.checks.map((c) => (
                          <li key={c} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" strokeWidth={3} />
                            <span className="text-sm text-slate-700 leading-snug">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. RESULTS — booked-job rows with a stamp
      =================================================================== */}
      <section id="plx-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <PipeHeading>{PLX_RESULTS_HEADING}</PipeHeading>

          <div className="mt-7 rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            {PLX_RESULTS.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.text} delay={Math.min(i * 0.05, 0.2)}>
                  <div className="group grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-5 px-4 sm:px-6 py-4 hover:bg-red-50/40 transition-colors">
                    <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A] group-hover:bg-[#C61A1A] group-hover:text-white transition-colors">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                      {r.text}
                    </p>
                    <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-sm border-2 border-[#C61A1A]/45 text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A] -rotate-3">
                      Booked
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. KEY TAKEAWAYS + WHY THIS WORKED — two ruled columns
      =================================================================== */}
      <section className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <Reveal>
            <article>
              <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-red-50 text-[#C61A1A]">
                <ClipboardList className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {PLX_TAKEAWAYS.heading}
              </h2>
              <span className="mt-4 block w-28">
                <PipeRule color="rgba(198,26,26,0.4)" collar="rgba(198,26,26,0.6)" />
              </span>
              <div className="mt-5 space-y-4">
                {PLX_TAKEAWAYS.paras.map((p) => (
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
                <BadgeCheck className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {PLX_WHY_WORKED.heading}
              </h2>
              <span className="mt-4 block w-28">
                <PipeRule />
              </span>
              <div className="mt-5 space-y-4">
                {PLX_WHY_WORKED.paras.map((p) => (
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
          7. CTA — white close with the schematic mirrored
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <PipeSchematic className="absolute -left-16 -bottom-8 w-[340px] hidden md:block opacity-70 -scale-x-100" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <Wrench className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {PLX_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{PLX_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{PLX_CTA.button}</span>
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
