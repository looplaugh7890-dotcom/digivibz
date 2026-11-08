import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, FileText, Layers, Settings2, Target, TrendingUp } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  CASE_STUDIES_CTA,
  CASE_STUDIES_INTRO,
  CASE_STUDY_LIBRARY,
  HERO_RESULT_CHIPS,
  INDEX_STATS,
  INSIDE_EVERY_STUDY,
} from '../data/caseStudiesContent';

interface CaseStudiesPageProps {
  onOpenAudit: () => void;
}

/** Short industry label on the hero ledger rows. */
const shortIndustry = (category: string) =>
  category.length > 16 ? category.slice(0, 15).trimEnd() + '…' : category;

/**
 * Case-study index page (`#/case-studies`) — the library.
 *
 * Hero pairs the headline with a "case file" dossier: stacked file covers
 * behind a results ledger whose growth line draws itself, then gets stamped
 * VERIFIED. Below it, every study is a full-width editorial row (cover,
 * story, measured results) linking to its own `#/case-study/<id>` page.
 */
export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onOpenAudit }) => {
  const reduceMotion = useReducedMotion();

  /** In-page scroll WITHOUT touching the hash (hash = route switch). */
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const industries = new Set(CASE_STUDY_LIBRARY.map((s) => s.industry)).size;
  const resultsCount = CASE_STUDY_LIBRARY.reduce((n, s) => n + s.results.length, 0);

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — headline + case-file dossier
      =================================================================== */}
      <section id="case-studies-hero" className="relative pt-6 pb-12 md:pt-8 md:pb-14 overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_38%,#000_70%,transparent_100%)] opacity-70 -z-10 pointer-events-none"
        />
        {!reduceMotion && (
          <div
            className="absolute top-1/4 right-[8%] w-[420px] h-[420px] rounded-full -z-10 pointer-events-none opacity-50 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(198,26,26,0.10) 0%, transparent 70%)',
              animation: 'dz-drift 14s ease-in-out infinite',
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 lg:items-center">
            {/* ---------------------------------------------------- copy */}
            <div className="lg:col-span-6 space-y-5">
              <motion.div
                {...rise(0.05)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-xs font-bold text-[#C61A1A] uppercase tracking-widest shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                Case Studies
              </motion.div>

              <motion.h1
                {...rise(0.12)}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.14]"
              >
                Proof You Can{' '}
                <span className="text-[#C61A1A]">Read in Full.</span>
              </motion.h1>

              <motion.p {...rise(0.24)} className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                {CASE_STUDIES_INTRO}
              </motion.p>

              <motion.div {...rise(0.34)} className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={onOpenAudit}
                  className="dz-btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.99] group cursor-pointer"
                >
                  <span>Get My Free Growth Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#all-case-studies"
                  onClick={scrollTo('all-case-studies')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-slate-200 hover:border-[#C61A1A] hover:text-[#C61A1A] bg-white text-slate-800 font-semibold text-sm sm:text-base rounded-xl transition-all"
                >
                  Browse the Case Studies
                </a>
              </motion.div>

              <motion.div {...rise(0.44)} className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#C61A1A]" />
                  {industries} industries · {resultsCount} measured results
                </span>
                <span className="hidden sm:inline w-px h-4 bg-slate-200" />
                <a
                  href="#framework"
                  className="inline-flex items-center gap-1 hover:text-[#C61A1A] font-medium transition-colors"
                >
                  Powered by the 5D Growth Framework
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>

            {/* -------------------------------------------- case-file dossier */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end">
              {/* result chips — always in a row above the visual */}
              <motion.div
                {...rise(0.4)}
                className="flex flex-wrap items-center justify-center lg:justify-end gap-2 mb-4"
              >
                {HERO_RESULT_CHIPS.map((chip) => (
                  <span
                    key={chip.label}
                    className="inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs"
                  >
                    <strong className="text-[#C61A1A] font-extrabold tabular-nums text-sm">{chip.value}</strong>
                    <span className="font-semibold text-slate-600">{chip.label}</span>
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[440px] pt-3 pb-4"
                aria-hidden="true"
              >
                {/* soft red glow */}
                <div
                  className="absolute inset-[10%] rounded-3xl -z-10 blur-2xl opacity-70 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(198,26,26,0.16) 0%, transparent 70%)',
                  }}
                />

                {/* stacked file covers behind the ledger */}
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, rotate: -14, y: 14 }}
                  animate={{ opacity: 1, rotate: -6, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute left-6 right-6 -top-1 bottom-1 rounded-3xl bg-white border border-slate-200 shadow-[0_18px_44px_-30px_rgba(15,23,42,0.4)] ${
                    reduceMotion ? undefined : 'dz-float'
                  }`}
                >
                  <div className="p-4 space-y-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                      Home Services
                    </span>
                    <div className="space-y-1.5 pt-1">
                      <div className="h-1.5 w-4/5 rounded-full bg-slate-100" />
                      <div className="h-1.5 w-3/5 rounded-full bg-slate-100" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, rotate: 13, y: 10 }}
                  animate={{ opacity: 1, rotate: 4, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-2 right-9 top-2 bottom-3 rounded-3xl bg-white border border-slate-200 shadow-[0_18px_44px_-30px_rgba(15,23,42,0.4)]"
                >
                  <div className="p-4 space-y-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-50 border border-red-100 text-[9px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                      Healthcare
                    </span>
                    <div className="space-y-1.5 pt-1">
                      <div className="h-1.5 w-3/5 rounded-full bg-slate-100" />
                      <div className="h-1.5 w-4/5 rounded-full bg-slate-100" />
                    </div>
                  </div>
                </motion.div>

                {/* front card — the results ledger */}
                <div className="relative z-10 rounded-3xl bg-white border border-slate-200 shadow-[0_28px_70px_-34px_rgba(15,23,42,0.4)] overflow-hidden">
                  <span className="absolute top-0 left-0 right-0 h-1 bg-[#C61A1A]" />

                  <div className="flex items-center justify-between px-5 pt-5">
                    <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                      <FileText className="w-3.5 h-3.5 text-[#C61A1A]" />
                      Case File · Measured Results
                    </span>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#C61A1A] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      All {CASE_STUDY_LIBRARY.length} Studies
                    </span>
                  </div>

                  {/* climbing growth line */}
                  <div className="px-5 pt-3">
                    <svg viewBox="0 0 340 118" className="w-full select-none" role="presentation">
                      <defs>
                        <linearGradient id="cs-area" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#C61A1A" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#C61A1A" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* baseline */}
                      <line x1="10" y1="104" x2="330" y2="104" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="5 5" />

                      {/* area + line */}
                      <motion.path
                        d="M14 96 C 74 92, 100 84, 134 70 S 192 50, 232 38 S 302 22, 326 14 L 326 104 L 14 104 Z"
                        fill="url(#cs-area)"
                        initial={reduceMotion ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.25 }}
                      />
                      <motion.path
                        d="M14 96 C 74 92, 100 84, 134 70 S 192 50, 232 38 S 302 22, 326 14"
                        fill="none"
                        stroke="#C61A1A"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={reduceMotion ? false : { pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.15, delay: 0.55, ease: [0.4, 0, 0.2, 1] }}
                      />

                      {/* start point */}
                      <circle cx="14" cy="96" r="4" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
                      {/* end point */}
                      <motion.g
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 1.55, ease: 'backOut' }}
                        style={{ transformOrigin: '326px 14px' }}
                      >
                        <circle cx="326" cy="14" r="8" fill="#C61A1A" opacity="0.18" className={reduceMotion ? undefined : 'animate-ping'} />
                        <circle cx="326" cy="14" r="4.5" fill="#C61A1A" stroke="#FFFFFF" strokeWidth="2" />
                      </motion.g>

                      <text x="14" y="116" fontSize="8" fontWeight="800" fill="#94A3B8" letterSpacing="1.4">
                        START
                      </text>
                      <text x="330" y="116" fontSize="8" fontWeight="800" fill="#C61A1A" letterSpacing="1.4" textAnchor="end">
                        AFTER 5D
                      </text>
                    </svg>
                  </div>

                  {/* per-study headline results */}
                  <motion.ul
                    initial={reduceMotion ? 'show' : 'hidden'}
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { delayChildren: 0.75, staggerChildren: 0.09 } } }}
                    className="px-5 pb-5 pt-2 space-y-1.5"
                  >
                    {CASE_STUDY_LIBRARY.map((s) => (
                      <motion.li
                        key={s.id}
                        variants={{
                          hidden: { opacity: 0, x: -10 },
                          show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                        }}
                        className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 border border-slate-100 px-3 py-2"
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] shrink-0" />
                          <span className="truncate text-[11px] font-bold text-slate-600">
                            {shortIndustry(s.category)}
                          </span>
                        </span>
                        <span className="flex items-center gap-2.5 shrink-0">
                          {s.results.map((r) => (
                            <span key={r.label} className="text-sm font-extrabold text-[#C61A1A] tabular-nums leading-none">
                              {r.value}
                            </span>
                          ))}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                {/* the stamp */}
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.9, rotate: -34 }}
                  animate={{ opacity: 1, scale: 1, rotate: -12 }}
                  transition={{ delay: 1.7, type: 'spring', stiffness: 230, damping: 13 }}
                  className="absolute z-20 -bottom-1 right-2 px-3.5 py-1.5 rounded-lg border-[2.5px] border-[#C61A1A] bg-white text-[#C61A1A] text-[11px] font-extrabold uppercase tracking-[0.22em] shadow-xs select-none"
                >
                  Verified
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. STATS BAND — the library in four numbers
      =================================================================== */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
          {INDEX_STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.07}
              className={`text-center ${i > 0 ? 'md:border-l md:border-white/15' : ''}`}
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums leading-none">
                {stat.value}
              </div>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#C61A1A] rotate-45 shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ==================================================================
          3. THE LIBRARY — every study as a full-width record row
      =================================================================== */}
      <section id="all-case-studies" className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" /> The Library · {CASE_STUDY_LIBRARY.length} Full Studies
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Pick an Industry. <span className="text-[#C61A1A]">Read the Whole Story.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Each record opens a full page: the challenges, the exact work we shipped, and the
                measured results — in the order they happened.
              </p>
            </Reveal>
          </div>

          <div className="mt-8 space-y-5">
            {CASE_STUDY_LIBRARY.map((study, i) => {
              const imageFirst = i % 2 === 0;
              return (
                <Reveal key={study.id} delay={(i % 2) * 0.06}>
                  <a
                    href={`#/case-study/${study.id}`}
                    className="group relative flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 overflow-hidden hover:border-red-300 hover:shadow-[0_30px_60px_-38px_rgba(198,26,26,0.5)] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C61A1A]"
                  >
                    {/* red rail draws across the top on hover */}
                    <span className="absolute top-0 left-0 h-0.5 w-0 bg-[#C61A1A] group-hover:w-full transition-all duration-500" />

                    {/* cover */}
                    <div
                      className={`relative w-full lg:w-[34%] shrink-0 rounded-2xl overflow-hidden h-44 sm:h-52 lg:h-44 ${
                        imageFirst ? '' : 'lg:order-2'
                      }`}
                    >
                      <img
                        src={study.image}
                        alt={study.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-[45%] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white text-slate-900 shadow-xs">
                        {study.category}
                      </span>
                      <span className="absolute bottom-3 right-3 text-3xl font-extrabold text-white/85 tabular-nums leading-none drop-shadow">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* story + results */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-extrabold tabular-nums text-slate-300 group-hover:text-[#C61A1A] transition-colors">
                          {String(i + 1).padStart(2, '0')} / {String(CASE_STUDY_LIBRARY.length).padStart(2, '0')}
                        </span>
                        <span className="h-px flex-1 bg-slate-100" />
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                          {study.industry}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                        {study.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{study.summary}</p>

                      {/* measured results */}
                      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4 border-t border-slate-100 pt-3.5">
                        {study.results.map((r) => (
                          <div key={r.label} className="min-w-0">
                            <div className="text-lg sm:text-xl font-extrabold text-[#C61A1A] tabular-nums leading-none">
                              {r.value}
                            </div>
                            <div className="mt-1 text-[10.5px] sm:text-[11px] text-slate-500 leading-tight">
                              {r.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* read affordance */}
                    <div className="flex lg:flex-col items-center justify-between lg:justify-center gap-3 lg:w-40 lg:shrink-0 lg:border-l lg:border-slate-100 lg:pl-6">
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-700 group-hover:text-[#C61A1A] transition-colors">
                        Read the full case study
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="flex w-11 h-11 items-center justify-center rounded-full border border-slate-200 text-slate-400 group-hover:bg-[#C61A1A] group-hover:border-[#C61A1A] group-hover:text-white transition-all duration-300 shrink-0">
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. INSIDE EVERY CASE STUDY — what each record documents
      =================================================================== */}
      <section className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-red-200 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" /> What Every Record Documents
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Same Structure. <span className="text-[#C61A1A]">Different Industries.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {INSIDE_EVERY_STUDY.map((item, i) => {
              const icons = [Target, Settings2, TrendingUp];
              const Icon = icons[i];
              return (
                <Reveal key={item.number} delay={i * 0.08}>
                  <div className="relative h-full rounded-2xl bg-white border border-slate-200 p-6 overflow-hidden shadow-xs">
                    <span className="absolute top-3 right-4 text-5xl font-extrabold text-slate-100 tabular-nums leading-none select-none">
                      {item.number}
                    </span>
                    <span className="relative flex w-11 h-11 items-center justify-center rounded-xl bg-red-50 text-[#C61A1A]">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="relative mt-4 text-base font-extrabold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="relative mt-2 text-sm text-slate-600 leading-relaxed">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. CLOSING CTA — red band
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {CASE_STUDIES_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{CASE_STUDIES_CTA.body}</p>
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
              href="#/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/50 hover:bg-white/10 text-white font-semibold text-sm sm:text-base rounded-xl transition-all"
            >
              Talk to Our Team
              <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-xs text-white/75">
              Free personalized plan · Uncover opportunities · Fix gaps · Zero obligation
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
