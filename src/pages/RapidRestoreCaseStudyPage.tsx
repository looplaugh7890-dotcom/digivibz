import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Cpu,
  MessagesSquare,
  Quote,
  X,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  RR,
  RR_CHALLENGE,
  RR_CTA,
  RR_FRAMEWORK_HEADING,
  RR_IMAGE,
  RR_OVERVIEW,
  RR_PHASES,
  RR_RESULTS_HEADING,
  RR_RESULTS_SHOTS,
  RR_TAKEAWAYS,
  RR_WHY_WORKED,
} from '../data/rapidRestoreCaseStudyContent';

interface RapidRestoreCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * RapidRestore case study (`/case-study/rapidrestore`).
 *
 * Identity: an answer-engine citation graph — white throughout (house rule
 * for case study pages) carrying a knowledge-graph line art (red diamond
 * source node linked to slate query nodes), a circuit-trace rule (solid line
 * with square pads) under every heading, citation-bracket markers on the
 * framework checks, bracketed citation tags closing the challenge rows,
 * three-node graph glyphs as the phase-card corner ornament, the client's
 * own snapshot graphic framed as the hero board, and the results as a masonry
 * evidence board of the traffic chart, citations chart and AEO/GEO dashboard
 * (no key blades, serrations, tumbler pins, sparkles, chain links, vitrines,
 * flight paths, leader dots, telemetry strips, gauges, pipe runs, route pins,
 * or coat edges — those belong to earlier studies).
 */

/** Circuit-trace rule: solid line punctuated by square pads. */
const TraceRule: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = 'rgba(148,163,184,0.8)',
}) => {
  const rawId = React.useId();
  const id = `trace-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg aria-hidden="true" className={`block w-full ${className}`} height="8" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="30" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 4 H20" stroke={color} strokeWidth="1.4" />
          <rect x="22" y="1.5" width="5" height="5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="8" fill={`url(#${id})`} />
    </svg>
  );
};

/** Citation bracket glyph, used as the check marker. */
const CiteMark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 8 12" fill="none" className={`pointer-events-none ${className}`}>
    <path d="M6 1 H2 V11 H6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

/** Section heading in the citation style: title + circuit-trace rule. */
const TraceHeading: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
        {children}
      </h2>
      <span className="flex-1 min-w-0">
        <TraceRule color="rgba(198,26,26,0.45)" />
      </span>
    </div>
  </Reveal>
);

/** Citation-graph line art: red source diamond linked to query nodes. */
const CitationGraph: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 1200 300" fill="none" preserveAspectRatio="none" className={`pointer-events-none ${className}`}>
    <path d="M600 150 L300 80 M600 150 L420 215 M600 150 L760 70 M600 150 L880 195 M600 150 L1050 110 M600 150 L150 165" stroke="#E2E8F0" strokeWidth="1.6" />
    <circle cx="300" cy="80" r="5" fill="#CBD5E1" />
    <circle cx="420" cy="215" r="4" fill="#E2E8F0" />
    <circle cx="760" cy="70" r="5" fill="#CBD5E1" />
    <circle cx="880" cy="195" r="4" fill="#FECACA" />
    <circle cx="1050" cy="110" r="5" fill="#CBD5E1" />
    <circle cx="150" cy="165" r="4" fill="#E2E8F0" />
    <rect x="592" y="142" width="16" height="16" transform="rotate(45 600 150)" fill="#FCA5A5" />
  </svg>
);

/** Three-node graph glyph, one node highlighted per phase. */
const NodeGlyph: React.FC<{ offset: number; className?: string }> = ({
  offset,
  className = '',
}) => (
  <svg aria-hidden="true" viewBox="0 0 46 18" width="46" height="18" className={`pointer-events-none ${className}`}>
    <path d="M6 9 H23 H40" stroke="#CBD5E1" strokeWidth="1.4" />
    {[6, 23, 40].map((x, i) => (
      <circle key={x} cx={x} cy="9" r="3.5" fill={i === offset % 3 ? '#FCA5A5' : '#CBD5E1'} />
    ))}
  </svg>
);

export const RapidRestoreCaseStudyPage: React.FC<RapidRestoreCaseStudyPageProps> = ({ onOpenAudit }) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white citation cover with graph art + snapshot board
      =================================================================== */}
      <section id="rr-hero" className="relative bg-white overflow-hidden">
        <CitationGraph className="absolute inset-x-0 top-0 h-72 w-full opacity-70" />
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
                {RR.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.16]"
            >
              Getting Found in <span className="text-[#C61A1A]">AI Overviews and Answer Engines</span>{' '}
              During Water Damage Emergencies
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
                <div className="mt-1.5 text-sm font-bold text-slate-900">{RR.meta.industry}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{RR.meta.timeline}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {RR.meta.channels.map((c) => (
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
                {RR.meta.objectiveLabel}
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {RR.meta.objective}
              </p>
            </motion.div>

            {/* snapshot — the client's own campaign snapshot, framed as a citation board */}
            <motion.figure
              initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-3xl mx-auto m-0"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)] bg-white">
                <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-slate-200">
                  <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    <Bot className="w-3.5 h-3.5 text-[#C61A1A]" />
                    Snapshot · AI Citation Performance
                  </span>
                  <span className="w-28 shrink-0 hidden sm:block">
                    <TraceRule color="rgba(198,26,26,0.45)" />
                  </span>
                </div>
                <img
                  src={RR_IMAGE}
                  alt="RapidRestore campaign snapshot: 14 content pieces featured in Google AI Overview, 6 topics cited by ChatGPT and Perplexity, 210% increase in AI-referred traffic and number 1 cited source for 8 key queries"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto block"
                />
                <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                  {RR.meta.industry}
                </figcaption>
              </div>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. PROJECT OVERVIEW — citation lead paragraphs
      =================================================================== */}
      <section id="rr-overview" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TraceHeading>{RR_OVERVIEW.heading}</TraceHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed">
              {RR_OVERVIEW.paras[0]}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {RR_OVERVIEW.paras[1]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          3. THE CHALLENGE — rows closed by bracketed citation tags
      =================================================================== */}
      <section id="rr-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TraceHeading>{RR_CHALLENGE.heading}</TraceHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              {RR_CHALLENGE.intro}
            </p>
          </Reveal>

          <div className="mt-6">
            {RR_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.04, 0.15)}>
                <div className="group flex items-center gap-3.5 py-3.5 border-b border-slate-100 hover:bg-red-50/40 transition-colors">
                  <span className="flex w-8 h-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A]">
                    <X className="w-4 h-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-[15px] font-medium text-slate-800 leading-snug">
                    {p}
                  </span>
                  <span className="flex-1 min-w-0 hidden sm:block opacity-60">
                    <TraceRule />
                  </span>
                  <span className="hidden sm:block text-[11px] font-extrabold tabular-nums text-slate-300 group-hover:text-[#C61A1A] transition-colors">
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. 5D GROWTH FRAMEWORK — answer cards with node glyphs
      =================================================================== */}
      <section id="rr-framework" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <TraceHeading>{RR_FRAMEWORK_HEADING}</TraceHeading>

          <div className="mt-9 space-y-5">
            {RR_PHASES.map((phase, i) => (
              <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                  <NodeGlyph offset={i} className="absolute right-6 top-7 hidden sm:block" />

                  <div className="relative flex items-center gap-3.5 pr-16">
                    <span className="flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-red-50 border border-red-100 text-[#C61A1A]">
                      <Bot className="w-4.5 h-4.5" />
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
                      <TraceRule color="rgba(198,26,26,0.35)" />
                    </span>
                  </div>

                  <p className="relative mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                    {phase.intro}
                  </p>

                  <ul className="relative mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {phase.checks.map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <CiteMark className="w-2 h-3 shrink-0 mt-1 text-[#C61A1A]" />
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
          5. RESULTS — evidence board of AI performance screenshots
      =================================================================== */}
      <section id="rr-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <TraceHeading>{RR_RESULTS_HEADING}</TraceHeading>

          <div className="mt-8 columns-1 md:columns-2 gap-5">
            {RR_RESULTS_SHOTS.map((shot, i) => (
              <Reveal key={shot.title} delay={Math.min(i * 0.06, 0.2)} className="mb-5 break-inside-avoid">
                <figure className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
                    <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                      <CiteMark className="w-2 h-3 text-[#C61A1A]" />
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
                <Quote className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {RR_TAKEAWAYS.heading}
              </h2>
              <span className="mt-4 block w-28">
                <TraceRule color="rgba(198,26,26,0.45)" />
              </span>
              <div className="mt-5 space-y-4">
                {RR_TAKEAWAYS.paras.map((p) => (
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
                <Cpu className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {RR_WHY_WORKED.heading}
              </h2>
              <span className="mt-4 block w-28">
                <TraceRule />
              </span>
              <div className="mt-5 space-y-4">
                {RR_WHY_WORKED.paras.map((p) => (
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
          7. CTA — citation-graph white close, echoing the hero
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <CitationGraph className="absolute inset-x-0 bottom-0 h-56 w-full opacity-60" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <MessagesSquare className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {RR_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{RR_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{RR_CTA.button}</span>
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
