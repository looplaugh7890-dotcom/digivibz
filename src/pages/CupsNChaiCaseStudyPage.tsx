import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Coffee,
  Lightbulb,
  XCircle,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  CUPS,
  CUPS_CHALLENGE,
  CUPS_CTA,
  CUPS_FRAMEWORK_HEADING,
  CUPS_IMAGE,
  CUPS_OVERVIEW,
  CUPS_PHASES,
  CUPS_RESULTS,
  CUPS_RESULTS_HEADING,
  CUPS_TAKEAWAYS,
  CUPS_WHY_WORKED,
} from '../data/cupsnchaiCaseStudyContent';

interface CupsNChaiCaseStudyPageProps {
  onOpenAudit: () => void;
}

/** Section heading in the café-menu style: title + dashed leader line. */
const MenuHeading: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        {children}
      </h2>
      <span aria-hidden="true" className="flex-1 border-b-2 border-dashed border-[#C61A1A]/30" />
    </div>
  </Reveal>
);

/**
 * CupsNChai case study (`#/case-study/cups-n-chai`).
 *
 * Identity: a café "menu board" — white throughout (house rule for case
 * study pages) carrying a dotted-board texture, section headings trailed by
 * dashed menu leaders, the challenge as a numbered ledger with a chalk-line
 * closer, the 5D phases on a red receipt rail (no cards, no ghost words —
 * those belong to Revival), and results as dashed menu rows.
 */
export const CupsNChaiCaseStudyPage: React.FC<CupsNChaiCaseStudyPageProps> = ({
  onOpenAudit,
}) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const chalkDots = (opacity: number): React.CSSProperties => ({
    backgroundImage: 'radial-gradient(#0A0A0A 1.2px, transparent 1.2px)',
    backgroundSize: '24px 24px',
    maskImage: 'radial-gradient(ellipse 75% 60% at 50% 30%, #000 40%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 30%, #000 40%, transparent 100%)',
    opacity,
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white menu board with the client visual
      =================================================================== */}
      <section id="cups-hero" className="relative bg-white overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={chalkDots(0.2)} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-10 md:pb-16">
          <motion.a
            {...rise(0)}
            href="#/case-studies"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </motion.a>

          <div className="mt-8 max-w-4xl mx-auto text-center">
            <motion.div {...rise(0.06)}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold text-[#C61A1A] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                {CUPS.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.14]"
            >
              Building a <span className="text-[#C61A1A]">Local Brand Presence</span> for a
              South Asian Chai Café
            </motion.h1>

            {/* meta strip — menu-header line, not a box */}
            <motion.div
              {...rise(0.2)}
              className="mt-7 grid grid-cols-1 sm:grid-cols-3 border-y border-slate-200 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-center"
            >
              <div className="px-4 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Industry
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{CUPS.meta.industry}</div>
              </div>
              <div className="px-4 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{CUPS.meta.timeline}</div>
              </div>
              <div className="px-4 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {CUPS.meta.channels.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-600"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div {...rise(0.26)} className="mt-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                <span className="w-6 h-px bg-[#C61A1A]" />
                {CUPS.meta.objectiveLabel}
                <span className="w-6 h-px bg-[#C61A1A]" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {CUPS.meta.objective}
              </p>
            </motion.div>
          </div>

          {/* client visual — full-width board */}
          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 max-w-4xl mx-auto m-0"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)]">
              <img
                src={CUPS_IMAGE}
                alt="CupsNChai South Asian chai café website, mobile pages, and brand collateral"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
              <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/15 text-[10px] font-extrabold uppercase tracking-widest text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                {CUPS.meta.industry}
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </section>

      {/* ==================================================================
          2. PROJECT OVERVIEW — editorial lead with drop cap
      =================================================================== */}
      <section id="cups-overview" className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MenuHeading>{CUPS_OVERVIEW.heading}</MenuHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#C61A1A] first-letter:leading-[0.85]">
              {CUPS_OVERVIEW.paras[0]}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {CUPS_OVERVIEW.paras[1]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          3. THE CHALLENGE — numbered ledger with a chalk-line closer
      =================================================================== */}
      <section id="cups-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MenuHeading>{CUPS_CHALLENGE.heading}</MenuHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              {CUPS_CHALLENGE.intro}
            </p>
          </Reveal>

          {/* the five defects */}
          <div className="mt-7 border-y border-slate-200 divide-y divide-dashed divide-slate-200">
            {CUPS_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.05, 0.15)}>
                <div className="group flex items-center gap-4 sm:gap-5 py-4 hover:bg-red-50/50 transition-colors">
                  <span className="w-6 shrink-0 text-sm font-extrabold tabular-nums text-[#C61A1A]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <XCircle className="w-4.5 h-4.5 text-[#C61A1A] shrink-0" />
                  <span className="text-sm sm:text-[15px] font-medium text-slate-800 leading-snug">
                    {p}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-7">
            <div className="relative rounded-2xl bg-[#0A0A0A] px-6 py-5 sm:px-8 sm:py-6 overflow-hidden">
              <span aria-hidden="true" className="absolute left-0 top-0 bottom-0 w-1 bg-[#C61A1A]" />
              <p className="relative text-sm sm:text-base font-semibold text-white leading-relaxed">
                {CUPS_CHALLENGE.closing}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          4. 5D GROWTH FRAMEWORK — red receipt rail
      =================================================================== */}
      <section
        id="cups-framework"
        className="py-14 md:py-16 bg-slate-50 border-y border-slate-100"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <MenuHeading>{CUPS_FRAMEWORK_HEADING}</MenuHeading>

          <div className="mt-9 relative">
            <span
              aria-hidden="true"
              className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px bg-[#C61A1A]/25"
            />
            <div className="space-y-8">
              {CUPS_PHASES.map((phase, i) => (
                <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                  <article className="relative pl-11 sm:pl-16">
                    <span className="absolute left-0 top-0 flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-full bg-[#C61A1A] text-white text-xs sm:text-sm font-extrabold tabular-nums shadow-md shadow-red-200 ring-4 ring-slate-50">
                      {phase.number}
                    </span>

                    <div className="flex items-center gap-4">
                      <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-[0.18em] text-slate-900">
                        {phase.name}
                      </h3>
                      <span aria-hidden="true" className="h-px flex-1 bg-slate-200" />
                    </div>

                    {phase.intro && (
                      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                        {phase.intro}
                      </p>
                    )}

                    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {phase.checks.map((c) => (
                        <li key={c} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700 leading-snug">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. RESULTS — dashed menu rows
      =================================================================== */}
      <section id="cups-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MenuHeading>{CUPS_RESULTS_HEADING}</MenuHeading>

          <div className="mt-7 border-t border-slate-200">
            {CUPS_RESULTS.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.text} delay={Math.min(i * 0.05, 0.2)}>
                  <div className="flex items-center gap-4 sm:gap-5 py-4 border-b border-dashed border-slate-200 group hover:bg-red-50/50 transition-colors">
                    <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A] group-hover:bg-[#C61A1A] group-hover:text-white transition-colors">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                      {r.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================
          6. KEY TAKEAWAYS + WHY THIS WORKED — stacked editorial bands
      =================================================================== */}
      <section className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <Reveal>
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10">
              <div className="lg:col-span-4">
                <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-red-50 text-[#C61A1A]">
                  <Lightbulb className="w-5 h-5" />
                </span>
                <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {CUPS_TAKEAWAYS.heading}
                </h2>
                <span aria-hidden="true" className="mt-4 block w-16 h-1 bg-[#C61A1A]" />
              </div>
              <div className="lg:col-span-8 space-y-4 lg:border-l lg:border-slate-200 lg:pl-10">
                {CUPS_TAKEAWAYS.paras.map((p) => (
                  <p key={p.slice(0, 40)} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 pt-12 border-t border-slate-100">
              <div className="lg:col-span-4">
                <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                  <BadgeCheck className="w-5 h-5" />
                </span>
                <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {CUPS_WHY_WORKED.heading}
                </h2>
                <span aria-hidden="true" className="mt-4 block w-16 h-1 bg-slate-900" />
              </div>
              <div className="lg:col-span-8 space-y-4 lg:border-l lg:border-slate-200 lg:pl-10">
                {CUPS_WHY_WORKED.paras.map((p) => (
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
          7. CTA — dotted white close, echoing the hero
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={chalkDots(0.14)} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <Coffee className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {CUPS_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{CUPS_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{CUPS_CTA.button}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#/case-studies"
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
