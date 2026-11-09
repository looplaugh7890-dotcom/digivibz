import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Gem,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  LUM,
  LUM_CHALLENGE,
  LUM_CTA,
  LUM_FRAMEWORK_HEADING,
  LUM_IMAGE,
  LUM_OVERVIEW,
  LUM_PHASES,
  LUM_RESULTS_HEADING,
  LUM_RESULTS_SHOTS,
  LUM_TAKEAWAYS,
  LUM_WHY_WORKED,
} from '../data/lumiereCaseStudyContent';

interface LumiereCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * Lumière Fine Jewelry case study (`/case-study/lumiere-fine-jewelry`).
 *
 * Identity: a jeweller's vitrine — white throughout (house rule for case
 * study pages) carrying scattered four-point sparkle glints, a chain-link
 * rule of alternating oval links under every heading, display-case cards with
 * an inner lining frame and prong dots for the 5D phases, the client's own
 * campaign snapshot graphic framed as the hero vitrine board, shelf rows for
 * the challenge, and the results as a display board: the Meta campaign table
 * full width above the two ad-creative triptychs side by side (no flight
 * paths, leader dots, folio numbers, telemetry strips, gauges, pipe runs,
 * route pins, coat edges, or riveted plates — those belong to earlier
 * studies).
 */

/** Four-point sparkle glint in a 24-unit box. */
const SPARKLE_PATH =
  'M12 0C13.2 6.8 17.2 10.8 24 12C17.2 13.2 13.2 17.2 12 24C10.8 17.2 6.8 13.2 0 12C6.8 10.8 10.8 6.8 12 0Z';

const SparkleIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={`pointer-events-none ${className}`}>
    <path d={SPARKLE_PATH} />
  </svg>
);

/** Scattered sparkle glints, used as hero/CTA line art. */
const SparkleScatter: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 1200 300" fill="none" preserveAspectRatio="none" className={`pointer-events-none ${className}`}>
    <path d={SPARKLE_PATH} transform="translate(80 50) scale(1.1)" fill="#E2E8F0" />
    <path d={SPARKLE_PATH} transform="translate(250 140) scale(0.7)" fill="#FECACA" />
    <path d={SPARKLE_PATH} transform="translate(420 60) scale(0.9)" fill="#E2E8F0" />
    <path d={SPARKLE_PATH} transform="translate(690 110) scale(1.4)" fill="#FECACA" />
    <path d={SPARKLE_PATH} transform="translate(880 50) scale(0.8)" fill="#E2E8F0" />
    <path d={SPARKLE_PATH} transform="translate(1040 130) scale(1.1)" fill="#FCA5A5" />
    <path d={SPARKLE_PATH} transform="translate(1140 40) scale(0.6)" fill="#E2E8F0" />
    <path d={SPARKLE_PATH} transform="translate(550 200) scale(0.6)" fill="#FCA5A5" />
  </svg>
);

/** Repeating chain-link rule: alternating wide and narrow oval links. */
const ChainRule: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = 'rgba(148,163,184,0.7)',
}) => {
  const rawId = React.useId();
  const id = `chain-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg aria-hidden="true" className={`block w-full ${className}`} height="12" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="26" height="12" patternUnits="userSpaceOnUse">
          <ellipse cx="9" cy="6" rx="7.5" ry="4" fill="none" stroke={color} strokeWidth="1.4" />
          <ellipse cx="21" cy="6" rx="3" ry="4" fill="none" stroke={color} strokeWidth="1.4" />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill={`url(#${id})`} />
    </svg>
  );
};

/** Section heading in the vitrine style: title + chain-link rule. */
const ChainHeading: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
        {children}
      </h2>
      <span className="flex-1 min-w-0">
        <ChainRule color="rgba(198,26,26,0.4)" />
      </span>
    </div>
  </Reveal>
);

export const LumiereCaseStudyPage: React.FC<LumiereCaseStudyPageProps> = ({ onOpenAudit }) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const [leadShot, ...pairShots] = LUM_RESULTS_SHOTS;

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white vitrine cover with sparkle scatter + snapshot board
      =================================================================== */}
      <section id="lumiere-hero" className="relative bg-white overflow-hidden">
        <SparkleScatter className="absolute inset-x-0 top-0 h-72 w-full opacity-70" />
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
                {LUM.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.16]"
            >
              Turning <span className="text-[#C61A1A]">Instagram and Facebook</span> Into a Primary
              Sales Channel for a Luxury Jewelry Retailer
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
                <div className="mt-1.5 text-sm font-bold text-slate-900">{LUM.meta.industry}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{LUM.meta.timeline}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {LUM.meta.channels.map((c) => (
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
                {LUM.meta.objectiveLabel}
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {LUM.meta.objective}
              </p>
            </motion.div>

            {/* snapshot — the client's own campaign snapshot, framed as a vitrine board */}
            <motion.figure
              initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-3xl mx-auto m-0"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)] bg-white">
                <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-slate-200">
                  <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    <Gem className="w-3.5 h-3.5 text-[#C61A1A]" />
                    Snapshot · Measured Across Facebook &amp; Instagram
                  </span>
                  <span className="w-28 shrink-0 hidden sm:block">
                    <ChainRule color="rgba(198,26,26,0.45)" />
                  </span>
                </div>
                <img
                  src={LUM_IMAGE}
                  alt="Lumière Fine Jewelry campaign snapshot: 9,200+ net audience growth, 48% overall audience growth rate, 45K+ total engagement actions and 280%+ engagement growth on Instagram"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
                <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                  {LUM.meta.industry}
                </figcaption>
              </div>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. PROJECT OVERVIEW — vitrine lead paragraphs
      =================================================================== */}
      <section id="lumiere-overview" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChainHeading>{LUM_OVERVIEW.heading}</ChainHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed">
              {LUM_OVERVIEW.paras[0]}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {LUM_OVERVIEW.paras[1]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          3. THE CHALLENGE — shelf rows on a chain-link rail
      =================================================================== */}
      <section id="lumiere-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChainHeading>{LUM_CHALLENGE.heading}</ChainHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              {LUM_CHALLENGE.intro}
            </p>
          </Reveal>

          <div className="mt-6">
            {LUM_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.04, 0.15)}>
                <div className="group flex items-center gap-3.5 py-3.5 border-b border-slate-100 hover:bg-red-50/40 transition-colors">
                  <span className="flex w-8 h-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A]">
                    <X className="w-4 h-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-[15px] font-medium text-slate-800 leading-snug">
                    {p}
                  </span>
                  <span className="flex-1 min-w-0 hidden sm:block opacity-60">
                    <ChainRule />
                  </span>
                  <SparkleIcon className="hidden sm:block w-3 h-3 shrink-0 text-slate-300 group-hover:text-[#C61A1A] transition-colors" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. 5D GROWTH FRAMEWORK — display-case cards with inner lining
      =================================================================== */}
      <section id="lumiere-framework" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChainHeading>{LUM_FRAMEWORK_HEADING}</ChainHeading>

          <div className="mt-9 space-y-5">
            {LUM_PHASES.map((phase, i) => (
              <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                <article className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                  {/* inner lining frame, like a display case */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2 rounded-xl border border-slate-100"
                  />
                  {/* prong dots at the lining corners */}
                  <span aria-hidden="true" className="pointer-events-none absolute left-2 top-2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span aria-hidden="true" className="pointer-events-none absolute right-2 top-2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span aria-hidden="true" className="pointer-events-none absolute left-2 bottom-2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span aria-hidden="true" className="pointer-events-none absolute right-2 bottom-2 translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-300" />

                  <div className="relative flex items-center gap-3.5">
                    <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-red-50 border border-red-100 text-[#C61A1A]">
                      <Gem className="w-4.5 h-4.5" />
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
                      <ChainRule color="rgba(198,26,26,0.35)" />
                    </span>
                  </div>

                  <p className="relative mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                    {phase.intro}
                  </p>

                  <ul className="relative mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {phase.checks.map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <SparkleIcon className="w-3 h-3 shrink-0 mt-1.5 text-[#C61A1A]" />
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
          5. RESULTS — display board: campaign table + creative triptychs
      =================================================================== */}
      <section id="lumiere-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChainHeading>{LUM_RESULTS_HEADING}</ChainHeading>

          <Reveal delay={0.06} className="mt-8">
            <figure className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-[#C61A1A]" />
                  {leadShot.title}
                </span>
                <span className="text-[11px] font-extrabold text-[#C61A1A] tabular-nums truncate">
                  {leadShot.stat}
                </span>
              </div>
              <img src={leadShot.src} alt={leadShot.alt} className="w-full h-auto block" />
            </figure>
          </Reveal>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            {pairShots.map((shot, i) => (
              <Reveal key={shot.title} delay={0.1 + i * 0.06}>
                <figure className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
                    <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                      <Sparkles className="w-3.5 h-3.5 text-[#C61A1A]" />
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
                <Gem className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {LUM_TAKEAWAYS.heading}
              </h2>
              <span className="mt-4 block w-28">
                <ChainRule color="rgba(198,26,26,0.45)" />
              </span>
              <div className="mt-5 space-y-4">
                {LUM_TAKEAWAYS.paras.map((p) => (
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
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {LUM_WHY_WORKED.heading}
              </h2>
              <span className="mt-4 block w-28">
                <ChainRule />
              </span>
              <div className="mt-5 space-y-4">
                {LUM_WHY_WORKED.paras.map((p) => (
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
          7. CTA — sparkle-scatter white close, echoing the hero
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <SparkleScatter className="absolute inset-x-0 bottom-0 h-56 w-full opacity-60" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <ShoppingBag className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {LUM_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{LUM_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{LUM_CTA.button}</span>
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
