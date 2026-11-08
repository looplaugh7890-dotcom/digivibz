import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Target, TrendingUp } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { ProjectMockup } from '../components/ProjectMockup';
import { CASE_STUDIES } from '../data/content';
import { PORTFOLIO_PROJECTS, PORTFOLIO_CTA } from '../data/portfolioContent';
import { CaseStudy } from '../types';

interface CaseStudyPageProps {
  /** Slug from `#/case-study/<slug>`. */
  slug: string;
  onOpenAudit: () => void;
}

/** Small red section eyebrow shared by both layouts. */
const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
    {children}
  </span>
);

/**
 * Case-study detail route (`#/case-study/<slug>`).
 *
 * Full layout for the four featured studies; a preview layout for the
 * Atlas / Northbridge entries whose dedicated pages will be fleshed out
 * in a later pass (unknown slugs bounce to `#/portfolio`).
 */
export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ slug, onOpenAudit }) => {
  const reduceMotion = useReducedMotion();

  const study: CaseStudy | undefined = CASE_STUDIES.find((s) => s.id === slug);
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  // Unknown slug → send the visitor back to the portfolio grid.
  if (!study && !project) {
    if (window.location.hash !== '#/portfolio') window.location.hash = '#/portfolio';
    return null;
  }

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  /* ======================================================================
     PREVIEW layout — Atlas / Northbridge (future dedicated pages)
  ======================================================================= */
  if (project) {
    return (
      <div className="bg-white">
        {/* hero */}
        <section className="relative pt-8 pb-12 md:pt-10 md:pb-14 overflow-hidden">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_35%,#000_70%,transparent_100%)] opacity-70 -z-10 pointer-events-none"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.a
              {...rise(0)}
              href="#/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#C61A1A] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </motion.a>

            <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 lg:items-center">
              <div className="lg:col-span-6 space-y-5">
                <motion.div {...rise(0.06)}>
                  <Eyebrow>{project.industry} · Case Study Preview</Eyebrow>
                </motion.div>
                <motion.h1
                  {...rise(0.12)}
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.14]"
                >
                  {project.name}
                </motion.h1>

                {/* headline result */}
                <motion.div
                  {...rise(0.2)}
                  className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100"
                >
                  <span className="text-3xl font-extrabold text-[#C61A1A] tabular-nums">
                    {project.metric.value}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 leading-tight">
                    {project.metric.label}
                  </span>
                </motion.div>

                <motion.p {...rise(0.28)} className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  {project.description}
                </motion.p>

                <motion.div {...rise(0.36)} className="pt-1">
                  <button
                    onClick={onOpenAudit}
                    className="dz-btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
                  >
                    <span>Get My Free Growth Audit</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>

              {/* mockup */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-6"
              >
                <div className="rounded-3xl border border-slate-200 bg-white p-3 sm:p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
                  <ProjectMockup
                    variant={project.variant}
                    metric={project.metric.value}
                    url={
                      project.variant === 'finance'
                        ? 'atlasfinancial.com'
                        : 'northbridgelegal.com'
                    }
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* preview note */}
        <section className="py-12 md:py-14 bg-slate-50 border-y border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
              <div className="rounded-2xl bg-white border border-slate-200 px-6 py-8 shadow-xs">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#C61A1A] text-xs font-bold uppercase tracking-widest">
                  Preview
                </span>
                <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  The full {project.name} case study is on the way
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  We’re packaging the complete breakdown — challenges, strategy, and measured
                  results — into a dedicated page. In the meantime, explore the other case studies
                  or claim your own growth plan.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="#/portfolio"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 hover:border-[#C61A1A] hover:text-[#C61A1A] bg-white text-slate-800 font-semibold text-sm rounded-xl transition-all"
                  >
                    View Case Studies
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={onOpenAudit}
                    className="dz-btn-shine inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    Get My Free Growth Audit
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    );
  }

  /* ======================================================================
     FULL layout — the four featured case studies
  ======================================================================= */
  const s = study as CaseStudy;

  return (
    <div className="bg-white">
      {/* hero */}
      <section className="relative pt-8 pb-12 md:pt-10 md:pb-14 overflow-hidden">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_35%,#000_70%,transparent_100%)] opacity-70 -z-10 pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.a
            {...rise(0)}
            href="#/case-studies"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#C61A1A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </motion.a>

          <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 lg:items-center">
            <div className="lg:col-span-7 space-y-5">
              <motion.div {...rise(0.06)}>
                <Eyebrow>{s.industry} · Case Study</Eyebrow>
              </motion.div>
              <motion.h1
                {...rise(0.12)}
                className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.15]"
              >
                {s.title}
              </motion.h1>
              <motion.p {...rise(0.22)} className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                {s.summary}
              </motion.p>
            </div>

            {/* headline results */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
                <div className="flex items-center justify-between px-5 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C61A1A] animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      Measured Results
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C61A1A] bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                    {s.category}
                  </span>
                </div>
                <div className="px-5 py-5 space-y-3">
                  {s.results.map((res, i) => (
                    <motion.div
                      key={res.label}
                      initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-4 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3"
                    >
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#C61A1A] tabular-nums leading-none">
                        {res.value}
                      </span>
                      <span className="text-sm font-semibold text-slate-700 leading-tight">
                        {res.label}
                      </span>
                      <TrendingUp className="w-4 h-4 text-[#C61A1A] ml-auto shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* cover image */}
      <section className="pb-12 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.3)]">
              <img
                src={s.image}
                alt={s.title}
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-72 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-900 shadow-xs">
                {s.industry}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* challenges / what we did */}
      <section className="py-12 md:py-14 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Reveal>
              <div className="h-full rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-xs">
                <h2 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest">
                  <Target className="w-3.5 h-3.5" /> Challenges
                </h2>
                <ul className="mt-5 space-y-3.5">
                  {s.challenges.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#C61A1A] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl bg-white border border-red-100 p-6 sm:p-7 shadow-xs">
                <h2 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#C61A1A] text-xs font-bold uppercase tracking-widest">
                  <CheckCircle2 className="w-3.5 h-3.5" /> What We Did
                </h2>
                <ul className="mt-5 space-y-3.5">
                  {s.whatWeDid.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#C61A1A] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* results */}
          <Reveal delay={0.1} className="mt-6">
            <div className="rounded-2xl bg-[#C61A1A] px-6 py-6">
              <h2 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#C61A1A] text-xs font-bold uppercase tracking-widest">
                Results
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {s.results.map((res) => (
                  <div key={res.label} className="rounded-xl bg-white/10 border border-white/20 px-4 py-4 text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums leading-none">
                      {res.value}
                    </div>
                    <div className="mt-2 text-xs font-semibold text-white/85 leading-snug">{res.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {PORTFOLIO_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{PORTFOLIO_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.14} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-100 text-[#C61A1A] font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>Get My Free Growth Audit</span>
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
