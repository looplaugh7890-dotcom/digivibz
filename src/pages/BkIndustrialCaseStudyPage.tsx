import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Handshake,
  Monitor,
  Sparkles,
  SprayCan,
  X,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  BKI,
  BKI_CHALLENGE,
  BKI_CTA,
  BKI_FRAMEWORK_HEADING,
  BKI_IMAGE,
  BKI_IMAGE_INSET,
  BKI_OVERVIEW,
  BKI_PHASES,
  BKI_RESULTS,
  BKI_RESULTS_HEADING,
  BKI_SERVICES,
  BKI_SNAPSHOT,
  BKI_TAKEAWAYS,
  BKI_WHY_WORKED,
} from '../data/bkIndustrialCaseStudyContent';

interface BkIndustrialCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * BK Industrial Coatings case study (`/case-study/bk-industrial-coatings`).
 *
 * Identity: a coating spec sheet — white throughout (house rule for case
 * study pages) carrying wide spray-pass texture, gloss coat rules with a drip
 * tick, the snapshot stats on a riveted spec plate, the challenge as coated
 * edge defect tags, the 5D phases as work-order cards with a coated left edge
 * and gloss-dot bullets (no file sheets, receipt rail, bay doors, ruler rail,
 * truss cards, chart folders, gauges, pipe runs, or route pins — those belong
 * to the earlier studies), and results as spec rows closing on a
 * delivered-site board that reuses the hero image.
 */

/** Repeating gloss coat band with a highlight line and drip tick, used as a rule. */
const CoatRule: React.FC<{ className?: string; color?: string; gloss?: string }> = ({
  className = '',
  color = 'rgba(100,116,139,0.45)',
  gloss = 'rgba(100,116,139,0.75)',
}) => {
  const rawId = React.useId();
  const id = `coat-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg aria-hidden="true" className={`block w-full ${className}`} height="9" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="120" height="9" patternUnits="userSpaceOnUse">
          <rect x="0" y="3" width="120" height="3" fill={color} />
          <rect x="0" y="3" width="120" height="1" fill={gloss} />
          <rect x="92" y="6" width="2.5" height="3" rx="1.25" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="9" fill={`url(#${id})`} />
    </svg>
  );
};

/** Section heading in the spec-sheet style: title + gloss coat rule. */
const CoatHeading: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
        {children}
      </h2>
      <span className="flex-1 min-w-0">
        <CoatRule />
      </span>
    </div>
  </Reveal>
);

export const BkIndustrialCaseStudyPage: React.FC<BkIndustrialCaseStudyPageProps> = ({
  onOpenAudit,
}) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  /** Wide diagonal spray passes, like overlapping coats of finish. */
  const sprayPasses = (opacity: number): React.CSSProperties => ({
    backgroundImage:
      'repeating-linear-gradient(115deg, rgba(198,26,26,0.5) 0px, rgba(198,26,26,0.5) 18px, transparent 18px, transparent 46px)',
    maskImage: 'radial-gradient(ellipse 85% 70% at 50% 35%, #000 35%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 35%, #000 35%, transparent 100%)',
    opacity,
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white spec header with riveted plate + site boards
      =================================================================== */}
      <section id="bki-hero" className="relative bg-white overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={sprayPasses(0.05)} />
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
                {BKI.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.16]"
            >
              A Complete Website Rebuild for a{' '}
              <span className="text-[#C61A1A]">Heavy Equipment Ceramic Coating</span> Company
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
                <div className="mt-1.5 text-sm font-bold text-slate-900">{BKI.meta.industry}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{BKI.meta.timeline}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {BKI.meta.channels.map((c) => (
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
                {BKI.meta.objectiveLabel}
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {BKI.meta.objective}
              </p>
            </motion.div>

            {/* snapshot — riveted spec plate */}
            <motion.div {...rise(0.32)} className="mt-7 relative rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden text-center">
              <span aria-hidden="true" className="absolute left-2.5 top-2.5 w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span aria-hidden="true" className="absolute right-2.5 top-2.5 w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span aria-hidden="true" className="absolute left-2.5 bottom-2.5 w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span aria-hidden="true" className="absolute right-2.5 bottom-2.5 w-1.5 h-1.5 rounded-full bg-slate-300" />
              <div className="flex items-center justify-between gap-4 px-6 pt-4">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-[#C61A1A]" />
                  Snapshot · Measured
                </span>
                <span className="w-28 shrink-0">
                  <CoatRule color="rgba(198,26,26,0.4)" gloss="rgba(198,26,26,0.65)" />
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200">
                {BKI_SNAPSHOT.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="bg-white px-4 pt-4 pb-5">
                      <span className="mx-auto flex w-9 h-9 items-center justify-center rounded-lg bg-red-50 border border-red-100 text-[#C61A1A]">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div className="mt-2.5 text-2xl sm:text-3xl font-extrabold text-[#C61A1A] tabular-nums leading-none">
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

          {/* client visual — layered site boards */}
          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 max-w-4xl mx-auto m-0"
          >
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)] bg-white">
                <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-slate-200">
                  <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                    Rebuilt Site · Home & Services
                  </span>
                  <span className="w-28 shrink-0 hidden sm:block">
                    <CoatRule color="rgba(198,26,26,0.4)" gloss="rgba(198,26,26,0.65)" />
                  </span>
                </div>
                <img
                  src={BKI_IMAGE}
                  alt="The rebuilt BK Industrial Coatings website: homepage and services page side by side"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
                <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                  {BKI.meta.industry}
                </figcaption>
              </div>
              {/* layered inset — services page */}
              <div className="hidden md:block absolute -bottom-10 -right-6 w-60 rotate-2 rounded-xl overflow-hidden border-4 border-white shadow-[0_20px_45px_-18px_rgba(0,0,0,0.5)]">
                <img
                  src={BKI_IMAGE_INSET}
                  alt="The rebuilt BK Industrial Coatings services page"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </motion.figure>
        </div>
      </section>

      {/* ==================================================================
          2. SERVICES WE PROVIDED — slim coat band
      =================================================================== */}
      <section className="py-8 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A] shrink-0">
                {BKI_SERVICES.heading}
              </span>
              <span className="flex-1 min-w-0 hidden sm:block">
                <CoatRule />
              </span>
              <div className="flex flex-wrap gap-2">
                {BKI_SERVICES.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-50 border border-[#C61A1A]/25 text-sm font-bold text-[#C61A1A]"
                  >
                    <Monitor className="w-4 h-4" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          3. PROJECT OVERVIEW — lead paragraphs
      =================================================================== */}
      <section id="bki-overview" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoatHeading>{BKI_OVERVIEW.heading}</CoatHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed">
              {BKI_OVERVIEW.paras[0]}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {BKI_OVERVIEW.paras[1]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          4. THE CHALLENGE — coated-edge defect tags
      =================================================================== */}
      <section id="bki-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoatHeading>{BKI_CHALLENGE.heading}</CoatHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              {BKI_CHALLENGE.intro}
            </p>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {BKI_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.04, 0.15)}>
                <div className="h-full flex items-start gap-3 rounded-xl border border-slate-200 border-l-2 border-l-[#C61A1A] bg-white px-4 py-3 hover:bg-red-50/40 transition-colors">
                  <X className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" strokeWidth={3} />
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
          5. 5D GROWTH FRAMEWORK — work-order cards with a coated edge
      =================================================================== */}
      <section id="bki-framework" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoatHeading>{BKI_FRAMEWORK_HEADING}</CoatHeading>

          <div className="mt-9 space-y-5">
            {BKI_PHASES.map((phase, i) => (
              <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                <article className="rounded-2xl border border-slate-200 border-l-4 border-l-[#C61A1A] bg-white p-6 sm:p-7 shadow-xs">
                  <div className="flex items-center gap-4">
                    <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white text-sm font-extrabold tabular-nums">
                      {phase.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
                      {phase.name}
                    </h3>
                    <span className="flex-1 min-w-0">
                      <CoatRule color="rgba(198,26,26,0.35)" gloss="rgba(198,26,26,0.6)" />
                    </span>
                  </div>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                    {phase.intro}
                  </p>

                  <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {phase.checks.map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] shrink-0 mt-2"
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
          6. RESULTS — spec rows + delivered-site board (hero image reused)
      =================================================================== */}
      <section id="bki-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoatHeading>{BKI_RESULTS_HEADING}</CoatHeading>

          <div className="mt-7 rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            {BKI_RESULTS.map((r, i) => {
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
                    <span className="hidden sm:block w-24 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                      <CoatRule color="rgba(198,26,26,0.5)" gloss="rgba(198,26,26,0.75)" />
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* delivered-site board — same image as the hero, per the brief */}
          <Reveal delay={0.1}>
            <figure className="mt-7 rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-white">
              <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                  The Delivered Site · 7 Core Pages
                </span>
                <span className="w-24 shrink-0 hidden sm:block">
                  <CoatRule color="rgba(198,26,26,0.4)" gloss="rgba(198,26,26,0.65)" />
                </span>
              </div>
              <img
                src={BKI_IMAGE}
                alt="The delivered BK Industrial Coatings website: homepage and services page side by side"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          7. KEY TAKEAWAYS + WHY THIS WORKED — two ruled columns
      =================================================================== */}
      <section className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <Reveal>
            <article>
              <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-red-50 text-[#C61A1A]">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {BKI_TAKEAWAYS.heading}
              </h2>
              <span className="mt-4 block w-28">
                <CoatRule color="rgba(198,26,26,0.4)" gloss="rgba(198,26,26,0.65)" />
              </span>
              <div className="mt-5 space-y-4">
                {BKI_TAKEAWAYS.paras.map((p) => (
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
                <Handshake className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {BKI_WHY_WORKED.heading}
              </h2>
              <span className="mt-4 block w-28">
                <CoatRule />
              </span>
              <div className="mt-5 space-y-4">
                {BKI_WHY_WORKED.paras.map((p) => (
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
          8. CTA — spray-pass white close, echoing the hero
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={sprayPasses(0.045)} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <SprayCan className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {BKI_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{BKI_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{BKI_CTA.button}</span>
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
