import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  FileText,
  Layers,
  Lightbulb,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  REVIVAL,
  REVIVAL_CTA,
  REVIVAL_CHALLENGE,
  REVIVAL_FRAMEWORK_HEADING,
  REVIVAL_IMAGE,
  REVIVAL_PHASES,
  REVIVAL_RESULTS,
  REVIVAL_RESULTS_HEADING,
  REVIVAL_TAKEAWAYS,
  REVIVAL_WHY_WORKED,
} from '../data/revivalCaseStudyContent';

interface RevivalResearchCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * Revival Research case study (`#/case-study/revival-research`).
 *
 * Identity: a black editorial dossier — the site's only dark case-study
 * layout. The client's own visual anchors the hero, the challenge reads as
 * a red-marked defect list, and the 5D phases are oversized "file sheets"
 * with ghost phase words (no arrows, no orbit — those belong elsewhere).
 */
export const RevivalResearchCaseStudyPage: React.FC<RevivalResearchCaseStudyPageProps> = ({
  onOpenAudit,
}) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — black dossier header with the client visual
      =================================================================== */}
      <section id="revival-hero" className="relative bg-[#0A0A0A] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '3.5rem 3.5rem',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, #000 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, #000 60%, transparent 100%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 md:pt-10 md:pb-16">
          <motion.a
            {...rise(0)}
            href="#/case-studies"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </motion.a>

          <motion.div {...rise(0.06)} className="mt-7">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-bold text-[#F87171] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              {REVIVAL.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.12)}
            className="mt-5 max-w-5xl text-3xl sm:text-4xl md:text-[44px] font-extrabold text-white tracking-tight leading-[1.14]"
          >
            How We Helped a Clinical Research Organization{' '}
            <span className="text-[#FF6B6B]">Scale Patient Recruitment</span> Through Digital Growth
          </motion.h1>

          {/* meta bar */}
          <motion.div
            {...rise(0.2)}
            className="mt-7 grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-white/10 bg-white/[0.04] divide-y sm:divide-y-0 sm:divide-x divide-white/10 overflow-hidden"
          >
            <div className="px-5 py-4">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Industry</div>
              <div className="mt-1.5 text-sm font-bold text-white">{REVIVAL.meta.industry}</div>
            </div>
            <div className="px-5 py-4">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Timeline</div>
              <div className="mt-1.5 text-sm font-bold text-white">{REVIVAL.meta.timeline}</div>
            </div>
            <div className="px-5 py-4">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                Primary Channels
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {REVIVAL.meta.channels.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-[11px] font-semibold text-slate-200"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* objective + client visual */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <motion.div {...rise(0.28)} className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#FF6B6B]">
                <span className="w-6 h-px bg-[#C61A1A]" />
                {REVIVAL.meta.objectiveLabel}
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{REVIVAL.meta.objective}</p>
            </motion.div>

            <motion.figure
              initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 m-0"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]">
                <img
                  src={REVIVAL_IMAGE}
                  alt="Revival Research clinical trial website and patient recruitment campaign creatives"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
                <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/15 text-[10px] font-extrabold uppercase tracking-widest text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                  {REVIVAL.meta.industry}
                </figcaption>
              </div>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. THE CHALLENGE — red-marked defect list
      =================================================================== */}
      <section id="revival-challenge" className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <h2 className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                <XCircle className="w-3.5 h-3.5" /> {REVIVAL_CHALLENGE.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                {REVIVAL_CHALLENGE.intro[0]}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                {REVIVAL_CHALLENGE.intro[1]}
              </p>
            </Reveal>
          </div>

          {/* the six defects */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            {REVIVAL_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={(i % 2) * 0.06}>
                <div className="group flex items-start gap-3 h-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 hover:border-red-200 hover:bg-red-50/40 transition-colors">
                  <XCircle className="w-4.5 h-4.5 text-[#C61A1A] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-[15px] text-slate-700 leading-snug">{p}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-7">
            <p className="border-l-4 border-[#C61A1A] bg-red-50/50 rounded-r-xl px-5 py-4 text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
              {REVIVAL_CHALLENGE.closing}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          3. 5D GROWTH FRAMEWORK — five file sheets with ghost phase words
      =================================================================== */}
      <section id="revival-framework" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-red-200 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" /> The Method
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {REVIVAL_FRAMEWORK_HEADING}
              </h2>
            </Reveal>
          </div>

          <div className="mt-8 space-y-5">
            {REVIVAL_PHASES.map((phase, i) => (
              <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                <article className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
                  {/* ghost phase word */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 right-4 sm:right-8 text-[46px] sm:text-[80px] font-extrabold uppercase tracking-tighter leading-none text-slate-100 select-none pointer-events-none"
                  >
                    {phase.name}
                  </span>

                  <div className="relative">
                    {/* header */}
                    <div className="flex items-center gap-4">
                      <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-[#C61A1A] text-white text-sm font-extrabold tabular-nums shadow-md shadow-red-200">
                        {phase.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-[0.14em] text-slate-900">
                        {phase.name}
                      </h3>
                      <span className="h-px flex-1 bg-slate-200" />
                    </div>

                    <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                      {phase.intro}
                    </p>

                    {/* checks */}
                    <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {phase.checks.map((c) => (
                        <li key={c} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700 leading-snug">{c}</span>
                        </li>
                      ))}
                    </ul>

                    {/* phase note */}
                    <p className="mt-5 pt-4 border-t border-slate-100 border-l-2 border-l-[#C61A1A] pl-4 text-sm font-semibold text-slate-700 leading-relaxed">
                      {phase.note}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. RESULTS — six measured numbers on black
      =================================================================== */}
      <section id="revival-results" className="py-14 md:py-16 bg-[#0A0A0A] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '3rem 3rem',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 40%, transparent 100%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-wider text-[#FF6B6B]">
                  <Award className="w-3.5 h-3.5" /> 8 Months · Measured
                </div>
                <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {REVIVAL_RESULTS_HEADING}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Revival Research · Patient Recruitment System
              </span>
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIVAL_RESULTS.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.value + r.label} delay={(i % 3) * 0.07}>
                  <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-[#C61A1A]/60 hover:bg-white/[0.06] transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#FF6B6B] tabular-nums leading-none">
                        {r.value}
                      </span>
                      <span className="flex w-9 h-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 group-hover:text-[#FF6B6B] group-hover:border-[#C61A1A]/50 transition-colors">
                        <Icon className="w-4 h-4" />
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-300 leading-snug">{r.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. KEY TAKEAWAYS + WHY THIS WORKED
      =================================================================== */}
      <section className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal>
            <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs relative overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-1 bg-[#C61A1A]" />
              <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-red-50 text-[#C61A1A]">
                <Lightbulb className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {REVIVAL_TAKEAWAYS.heading}
              </h2>
              <div className="mt-4 space-y-3.5">
                {REVIVAL_TAKEAWAYS.paras.map((p) => (
                  <p key={p.slice(0, 40)} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 relative overflow-hidden">
              <span className="absolute top-0 left-0 right-0 h-1 bg-slate-900" />
              <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-white border border-red-100 text-[#C61A1A]">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {REVIVAL_WHY_WORKED.heading}
              </h2>
              <div className="mt-4 space-y-3.5">
                {REVIVAL_WHY_WORKED.paras.map((p) => (
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
          6. CTA — red band
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-[#C61A1A] overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-1 bg-white/70" />
        <div className="absolute top-0 right-0 w-40 h-1 bg-white/70" />
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '3rem 3rem',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold uppercase tracking-widest text-white">
              <FileText className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {REVIVAL_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{REVIVAL_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-100 text-[#C61A1A] font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{REVIVAL_CTA.button}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#/case-studies"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/50 hover:bg-white/10 text-white font-semibold text-sm sm:text-base rounded-xl transition-all"
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
