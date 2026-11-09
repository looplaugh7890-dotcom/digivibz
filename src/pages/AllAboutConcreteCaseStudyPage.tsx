import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HardHat,
  Lightbulb,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  AAC,
  AAC_CHALLENGE,
  AAC_CTA,
  AAC_FRAMEWORK_HEADING,
  AAC_IMAGE,
  AAC_OVERVIEW,
  AAC_PHASES,
  AAC_RESULTS,
  AAC_RESULTS_HEADING,
  AAC_TAKEAWAYS,
  AAC_WHY_WORKED,
} from '../data/allAboutConcreteCaseStudyContent';

interface AllAboutConcreteCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * All About Concrete case study (`/case-study/all-about-concrete`).
 *
 * Identity: a contractor's "site board" — white throughout (house rule for
 * case study pages) carrying a rebar-mesh crosshatch, section headings trailed
 * by measuring-tape tick rules, the client visual staked with red survey
 * corner brackets, the challenge as a punch list, the 5D phases hung on a
 * vertical ruler rail (no file sheets, receipt rail, or bay doors — those
 * belong to Revival, CupsNChai, and Schaefer Lyndon), and results as core-
 * sample cards.
 */

/** Measuring-tape tick rule that trails section headings. */
const TickRule: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    aria-hidden="true"
    className={`flex-1 h-1.5 ${className}`}
    style={{
      backgroundImage: 'repeating-linear-gradient(to right, rgba(100,116,139,0.45) 0 1px, transparent 1px 7px)',
    }}
  />
);

/** Section heading in the site-board style: title + tick rule. */
const SiteHeading: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
        {children}
      </h2>
      <TickRule />
    </div>
  </Reveal>
);

export const AllAboutConcreteCaseStudyPage: React.FC<AllAboutConcreteCaseStudyPageProps> = ({
  onOpenAudit,
}) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  /** Rebar mesh: diagonal crosshatch fading out radially. */
  const mesh = (opacity: number): React.CSSProperties => ({
    backgroundImage:
      'repeating-linear-gradient(45deg, #0A0A0A 0px, #0A0A0A 1px, transparent 1px, transparent 14px), repeating-linear-gradient(-45deg, #0A0A0A 0px, #0A0A0A 1px, transparent 1px, transparent 14px)',
    maskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, #000 40%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, #000 40%, transparent 100%)',
    opacity,
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white site board with the staked client visual
      =================================================================== */}
      <section id="aac-hero" className="relative bg-white overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={mesh(0.08)} />
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
                {AAC.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.14]"
            >
              Strengthening <span className="text-[#C61A1A]">Digital Visibility</span> for a
              Family-Owned Concrete Contractor
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
                <div className="mt-1.5 text-sm font-bold text-slate-900">{AAC.meta.industry}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{AAC.meta.timeline}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {AAC.meta.channels.map((c) => (
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
                {AAC.meta.objectiveLabel}
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {AAC.meta.objective}
              </p>
            </motion.div>
          </div>

          {/* client visual — staked with red survey corner brackets */}
          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-10 max-w-4xl mx-auto"
          >
            <span aria-hidden="true" className="absolute -top-2.5 -left-2.5 w-8 h-8 border-t-[3px] border-l-[3px] border-[#C61A1A] rounded-tl-xl" />
            <span aria-hidden="true" className="absolute -top-2.5 -right-2.5 w-8 h-8 border-t-[3px] border-r-[3px] border-[#C61A1A] rounded-tr-xl" />
            <span aria-hidden="true" className="absolute -bottom-2.5 -left-2.5 w-8 h-8 border-b-[3px] border-l-[3px] border-[#C61A1A] rounded-bl-xl" />
            <span aria-hidden="true" className="absolute -bottom-2.5 -right-2.5 w-8 h-8 border-b-[3px] border-r-[3px] border-[#C61A1A] rounded-br-xl" />
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)]">
              <img
                src={AAC_IMAGE}
                alt="All About Concrete website shown on a laptop and phone beside a branded hard hat and site plans"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
              <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                {AAC.meta.industry}
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </section>

      {/* ==================================================================
          2. PROJECT OVERVIEW — site-board lead paragraph
      =================================================================== */}
      <section id="aac-overview" className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SiteHeading>{AAC_OVERVIEW.heading}</SiteHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed">
              {AAC_OVERVIEW.paras[0]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          3. THE CHALLENGE — punch list
      =================================================================== */}
      <section id="aac-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SiteHeading>{AAC_CHALLENGE.heading}</SiteHeading>

          <div className="mt-7 border-t border-dashed border-slate-300">
            {AAC_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.05, 0.15)}>
                <div className="group flex items-center gap-4 sm:gap-5 py-4 border-b border-dashed border-slate-300 hover:bg-red-50/40 transition-colors">
                  <span className="flex w-7 h-7 shrink-0 items-center justify-center rounded-md border-2 border-[#C61A1A]/60 text-[#C61A1A] group-hover:bg-[#C61A1A] group-hover:text-white group-hover:border-[#C61A1A] transition-colors">
                    <XCircle className="w-4 h-4" />
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
          4. 5D GROWTH FRAMEWORK — phases hung on a vertical ruler rail
      =================================================================== */}
      <section id="aac-framework" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SiteHeading>{AAC_FRAMEWORK_HEADING}</SiteHeading>

          <div className="mt-9 relative">
            {/* ruler rail */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 bottom-2 w-2 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(198,26,26,0.4) 0px, rgba(198,26,26,0.4) 1.5px, transparent 1.5px, transparent 9px)',
              }}
            />
            <div className="space-y-9">
              {AAC_PHASES.map((phase, i) => (
                <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                  <article className="relative pl-8 sm:pl-12">
                    {/* diamond node on the rail */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-[5px] top-1.5 w-3 h-3 bg-[#C61A1A] rotate-45 ring-4 ring-slate-50"
                    />

                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-sm font-extrabold tabular-nums text-[#C61A1A]">
                        {phase.number}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-[0.16em] text-slate-900">
                        {phase.name}
                      </h3>
                      <TickRule className="hidden sm:block" />
                    </div>

                    <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                      {phase.intro}
                    </p>

                    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {phase.checks.map((c) => (
                        <li key={c} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700 leading-snug">{c}</span>
                        </li>
                      ))}
                    </ul>

                    {phase.note && (
                      <p className="mt-5 flex items-start gap-3 rounded-xl border border-dashed border-[#C61A1A]/40 bg-red-50/40 px-4 py-3 text-sm font-semibold text-slate-700 leading-relaxed">
                        <HardHat className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
                        {phase.note}
                      </p>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. RESULTS — core-sample cards
      =================================================================== */}
      <section id="aac-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SiteHeading>{AAC_RESULTS_HEADING}</SiteHeading>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AAC_RESULTS.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.text} delay={Math.min(i * 0.06, 0.2)}>
                  <div className="group relative h-full rounded-2xl border border-slate-200 bg-white p-5 overflow-hidden hover:border-red-300 hover:bg-red-50/30 transition-colors">
                    <span className="absolute top-0 left-0 right-0 h-1 bg-[#C61A1A]" />
                    <span className="flex w-10 h-10 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A] group-hover:bg-[#C61A1A] group-hover:text-white transition-colors">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <p className="mt-3.5 text-sm font-semibold text-slate-800 leading-snug">
                      {r.text}
                    </p>
                    <TickRule className="mt-4 flex-none h-1.5 w-full" />
                  </div>
                </Reveal>
              );
            })}
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
                <Lightbulb className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {AAC_TAKEAWAYS.heading}
              </h2>
              <TickRule className="mt-4 flex-none h-1.5 w-24" />
              <div className="mt-5 space-y-4">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {AAC_TAKEAWAYS.paras[0]}
                </p>
                {AAC_TAKEAWAYS.paras.slice(1).map((p) => (
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
                {AAC_WHY_WORKED.heading}
              </h2>
              <TickRule className="mt-4 flex-none h-1.5 w-24" />
              <div className="mt-5 space-y-4">
                {AAC_WHY_WORKED.paras.map((p) => (
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
          7. CTA — crosshatched white close, echoing the hero
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={mesh(0.07)} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <HardHat className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {AAC_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{AAC_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{AAC_CTA.button}</span>
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
