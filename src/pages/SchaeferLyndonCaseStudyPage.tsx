import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  ShieldCheck,
  Warehouse,
  XCircle,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  SCHAEFER,
  SCHAEFER_CHALLENGE,
  SCHAEFER_CTA,
  SCHAEFER_FRAMEWORK_HEADING,
  SCHAEFER_IMAGE,
  SCHAEFER_OVERVIEW,
  SCHAEFER_PHASES,
  SCHAEFER_RESULTS,
  SCHAEFER_RESULTS_HEADING,
  SCHAEFER_TAKEAWAYS,
  SCHAEFER_WHY_WORKED,
} from '../data/schaeferLyndonCaseStudyContent';

interface SchaeferLyndonCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * Schaefer Lyndon case study (`/case-study/schaefer-lyndon`).
 *
 * Identity: a self-storage "facility manifest" — white throughout (house rule
 * for case study pages) carrying a roll-up-door slat texture, section headings
 * stamped with manifest codes and double rules, the meta strip as a bordered
 * white sign card, the challenge as a gate-log ledger, the 5D phases as numbered
 * bay doors along a corridor line (no file sheets, no receipt rail — those
 * belong to Revival and CupsNChai), and results as occupied-unit plates.
 */

/** Section heading in the manifest style: code stamp + title + double rule. */
const ManifestHeading: React.FC<{ code: string; children: React.ReactNode; delay?: number }> = ({
  code,
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-5">
      <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-[#C61A1A] text-white text-xs font-extrabold tabular-nums shadow-md shadow-red-200">
        {code}
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-slate-900">
        {children}
      </h2>
      <span aria-hidden="true" className="flex-1 h-1.5 border-y border-slate-300" />
    </div>
  </Reveal>
);

export const SchaeferLyndonCaseStudyPage: React.FC<SchaeferLyndonCaseStudyPageProps> = ({
  onOpenAudit,
}) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  /** Roll-up-door slats: thin horizontal lines fading out radially. */
  const slats = (opacity: number): React.CSSProperties => ({
    backgroundImage:
      'repeating-linear-gradient(to bottom, #0A0A0A 0px, #0A0A0A 1px, transparent 1px, transparent 12px)',
    maskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, #000 40%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, #000 40%, transparent 100%)',
    opacity,
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white facility sign with the client visual
      =================================================================== */}
      <section id="schaefer-hero" className="relative bg-white overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={slats(0.16)} />
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
                {SCHAEFER.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.14]"
            >
              Driving <span className="text-[#C61A1A]">Digital Growth</span> for a Local
              Self-Storage Provider
            </motion.h1>

            {/* meta strip — white facility sign card */}
            <motion.div
              {...rise(0.2)}
              className="mt-7 grid grid-cols-1 sm:grid-cols-3 rounded-2xl bg-white border border-slate-200 shadow-xs divide-y sm:divide-y-0 sm:divide-x divide-slate-200 overflow-hidden text-center"
            >
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Industry
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{SCHAEFER.meta.industry}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{SCHAEFER.meta.timeline}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {SCHAEFER.meta.channels.map((c) => (
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
                {SCHAEFER.meta.objectiveLabel}
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {SCHAEFER.meta.objective}
              </p>
            </motion.div>
          </div>

          {/* client visual — full-width board */}
          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 max-w-4xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)]">
              <img
                src={SCHAEFER_IMAGE}
                alt="Schaefer Lyndon self-storage website shown on a laptop and phone beside stacked moving boxes"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
              <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                {SCHAEFER.meta.industry}
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </section>

      {/* ==================================================================
          2. PROJECT OVERVIEW — manifest lead paragraph
      =================================================================== */}
      <section id="schaefer-overview" className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ManifestHeading code="01">{SCHAEFER_OVERVIEW.heading}</ManifestHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed">
              {SCHAEFER_OVERVIEW.paras[0]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          3. THE CHALLENGE — gate-log ledger
      =================================================================== */}
      <section id="schaefer-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ManifestHeading code="02">{SCHAEFER_CHALLENGE.heading}</ManifestHeading>

          <div className="mt-7 rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            {SCHAEFER_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.05, 0.15)}>
                <div className="group flex items-center gap-4 sm:gap-5 px-4 sm:px-6 py-4 hover:bg-red-50/50 transition-colors">
                  <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A] group-hover:bg-[#C61A1A] group-hover:text-white transition-colors">
                    <XCircle className="w-4.5 h-4.5" />
                  </span>
                  <span className="flex-1 text-sm sm:text-[15px] font-medium text-slate-800 leading-snug">
                    {p}
                  </span>
                  <span className="shrink-0 text-xs font-extrabold tabular-nums tracking-widest text-slate-300 group-hover:text-[#C61A1A] transition-colors">
                    D-{String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. 5D GROWTH FRAMEWORK — numbered bay doors on a corridor line
      =================================================================== */}
      <section
        id="schaefer-framework"
        className="py-14 md:py-16 bg-slate-50 border-y border-slate-100"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ManifestHeading code="03">{SCHAEFER_FRAMEWORK_HEADING}</ManifestHeading>

          <div className="mt-9 relative">
            <span
              aria-hidden="true"
              className="hidden sm:block absolute left-[31px] top-4 bottom-4 w-px bg-[#C61A1A]/25"
            />
            <div className="space-y-8">
              {SCHAEFER_PHASES.map((phase, i) => (
                <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                  <article className="relative grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 sm:gap-7">
                    {/* bay door plate */}
                    <div className="relative hidden sm:block">
                      <span className="relative flex w-16 h-16 items-center justify-center rounded-xl border-2 border-slate-900 bg-white text-xl font-extrabold tabular-nums text-slate-900 shadow-md overflow-hidden">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 pointer-events-none"
                          style={slats(0.12)}
                        />
                        <span className="relative">{phase.number}</span>
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-3 sm:hidden">
                        <span className="flex w-10 h-10 items-center justify-center rounded-lg bg-[#C61A1A] text-white text-sm font-extrabold tabular-nums shadow-md shadow-red-200">
                          {phase.number}
                        </span>
                        <h3 className="text-lg font-extrabold uppercase tracking-[0.16em] text-slate-900">
                          {phase.name}
                        </h3>
                      </div>
                      <div className="hidden sm:flex items-center gap-4">
                        <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-[0.16em] text-slate-900">
                          {phase.name}
                        </h3>
                        <span aria-hidden="true" className="h-px flex-1 bg-slate-200" />
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

                      <p className="mt-5 flex items-start gap-3 rounded-xl bg-white border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 leading-relaxed">
                        <span aria-hidden="true" className="w-2 h-2 mt-1.5 shrink-0 bg-[#C61A1A] rotate-45" />
                        {phase.note}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. RESULTS — occupied-unit plates
      =================================================================== */}
      <section id="schaefer-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ManifestHeading code="04">{SCHAEFER_RESULTS_HEADING}</ManifestHeading>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SCHAEFER_RESULTS.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal
                  key={r.text}
                  delay={Math.min(i * 0.05, 0.2)}
                  className={i === SCHAEFER_RESULTS.length - 1 ? 'sm:col-span-2' : undefined}
                >
                  <div className="group relative h-full rounded-2xl border border-slate-200 bg-white p-5 overflow-hidden hover:border-red-300 hover:bg-red-50/30 transition-colors">
                    <span className="absolute top-0 left-0 right-0 h-1 bg-[#C61A1A]/80" />
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A] group-hover:bg-[#C61A1A] group-hover:text-white transition-colors">
                        <Icon className="w-4.5 h-4.5" />
                      </span>
                      <span className="text-xs font-extrabold tabular-nums tracking-widest text-slate-300 group-hover:text-[#C61A1A] transition-colors">
                        R-{String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="mt-3.5 text-sm sm:text-base font-semibold text-slate-800 leading-snug">
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
            <article>
              <div className="flex items-center gap-4">
                <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-red-50 text-[#C61A1A]">
                  <Lightbulb className="w-5 h-5" />
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {SCHAEFER_TAKEAWAYS.heading}
                </h2>
                <span aria-hidden="true" className="flex-1 h-1.5 border-y border-slate-200" />
              </div>
              <div className="mt-5 space-y-4">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {SCHAEFER_TAKEAWAYS.paras[0]}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                  {SCHAEFER_TAKEAWAYS.paras.slice(1).map((p) => (
                    <p key={p.slice(0, 40)} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="pt-12 border-t-4 border-double border-slate-200">
              <div className="flex items-center gap-4">
                <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {SCHAEFER_WHY_WORKED.heading}
                </h2>
                <span aria-hidden="true" className="flex-1 h-1.5 border-y border-slate-200" />
              </div>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                {SCHAEFER_WHY_WORKED.paras.map((p) => (
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
          7. CTA — slatted white close, echoing the hero
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={slats(0.12)} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <Warehouse className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {SCHAEFER_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{SCHAEFER_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{SCHAEFER_CTA.button}</span>
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
