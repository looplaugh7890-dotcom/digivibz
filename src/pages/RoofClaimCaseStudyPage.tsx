import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Home,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  ROOF,
  ROOF_CHALLENGE,
  ROOF_CTA,
  ROOF_FRAMEWORK_HEADING,
  ROOF_IMAGE,
  ROOF_PHASES,
  ROOF_RESULTS,
  ROOF_RESULTS_HEADING,
  ROOF_SNAPSHOT,
  ROOF_TAKEAWAYS,
  ROOF_WHY_WORKED,
} from '../data/roofclaimCaseStudyContent';

interface RoofClaimCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * RoofClaim case study (`/case-study/roof-claim`).
 *
 * Identity: a roofer's "storm report" — white throughout (house rule for case
 * study pages) carrying a shingle-tab texture, zigzag roofline rules trailing
 * each heading, the snapshot stats as a four-up stat strip in the hero, the
 * challenge as a droplet leak list, the 5D phases as truss cards capped with a
 * red zigzag ridge (no file sheets, receipt rail, bay doors, or ruler rail —
 * those belong to the earlier studies), and results as a three-up measure grid.
 */

/** Zigzag roofline rule (repeat-x triangle band). */
const zigzag = (color: string): React.CSSProperties => ({
  backgroundImage: `linear-gradient(135deg, ${color} 25%, transparent 25%), linear-gradient(225deg, ${color} 25%, transparent 25%)`,
  backgroundSize: '12px 8px',
  backgroundPosition: '-6px 0, -6px 0',
  backgroundRepeat: 'repeat-x',
});

const ZigzagRule: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = 'rgba(100,116,139,0.45)',
}) => <span aria-hidden="true" className={`h-2 ${className}`} style={zigzag(color)} />;

/** Section heading in the roofline style: title + zigzag rule. */
const RoofHeading: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
        {children}
      </h2>
      <ZigzagRule className="flex-1" />
    </div>
  </Reveal>
);

export const RoofClaimCaseStudyPage: React.FC<RoofClaimCaseStudyPageProps> = ({
  onOpenAudit,
}) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  /** Shingle tabs: wide rectangular grid fading out radially. */
  const shingles = (opacity: number): React.CSSProperties => ({
    backgroundImage:
      'repeating-linear-gradient(to bottom, #0A0A0A 0px, #0A0A0A 1px, transparent 1px, transparent 18px), repeating-linear-gradient(to right, #0A0A0A 0px, #0A0A0A 1px, transparent 1px, transparent 34px)',
    maskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, #000 40%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, #000 40%, transparent 100%)',
    opacity,
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white storm report with snapshot stats + client visual
      =================================================================== */}
      <section id="roof-hero" className="relative bg-white overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={shingles(0.08)} />
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
                {ROOF.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.16]"
            >
              How We Helped a Roofing Company Replace Referrals With a{' '}
              <span className="text-[#C61A1A]">Predictable, Multi-Channel Lead System</span>
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
                <div className="mt-1.5 text-sm font-bold text-slate-900">{ROOF.meta.industry}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{ROOF.meta.timeline}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {ROOF.meta.channels.map((c) => (
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
                {ROOF.meta.objectiveLabel}
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {ROOF.meta.objective}
              </p>
            </motion.div>

            {/* snapshot — the four headline stats */}
            <motion.div
              {...rise(0.32)}
              className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-3 rounded-2xl bg-white border border-slate-200 shadow-xs p-4 sm:p-5 text-center"
            >
              {ROOF_SNAPSHOT.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="px-2 py-2">
                    <span className="mx-auto flex w-9 h-9 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A]">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="mt-2 text-2xl sm:text-[28px] font-extrabold text-[#C61A1A] tabular-nums leading-none">
                      {s.value}
                    </div>
                    <div className="mt-1.5 text-[11px] font-semibold text-slate-500 leading-tight">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* client visual — ridge-capped board */}
          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 max-w-4xl mx-auto m-0"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)]">
              <span className="absolute top-0 left-0 right-0 h-1.5 bg-[#C61A1A] z-10" />
              <img
                src={ROOF_IMAGE}
                alt="RoofClaim roofing website displayed on a desktop monitor against a dark shingle background"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
              <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                {ROOF.meta.industry}
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </section>

      {/* ==================================================================
          2. THE CHALLENGE — droplet leak list
      =================================================================== */}
      <section id="roof-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RoofHeading>{ROOF_CHALLENGE.heading}</RoofHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              {ROOF_CHALLENGE.intro}
            </p>
          </Reveal>

          <div className="mt-6 border-t border-slate-200">
            {ROOF_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.04, 0.15)}>
                <div className="group flex items-center gap-4 sm:gap-5 py-3.5 border-b border-slate-200 hover:bg-red-50/40 transition-colors">
                  <Droplets className="w-4.5 h-4.5 text-[#C61A1A] shrink-0" />
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
          3. 5D GROWTH FRAMEWORK — truss cards with a red zigzag ridge
      =================================================================== */}
      <section id="roof-framework" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RoofHeading>{ROOF_FRAMEWORK_HEADING}</RoofHeading>

          <div className="mt-9 space-y-5">
            {ROOF_PHASES.map((phase, i) => (
              <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 right-0 h-2"
                    style={zigzag('rgba(198,26,26,0.75)')}
                  />

                  <div className="mt-2 flex items-center gap-3 sm:gap-4">
                    <span className="flex w-9 h-9 shrink-0 items-center justify-center rounded-lg bg-[#C61A1A] text-white text-xs font-extrabold tabular-nums shadow-md shadow-red-200">
                      {phase.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-[0.16em] text-slate-900">
                      {phase.name}
                    </h3>
                    <ZigzagRule className="hidden sm:block flex-1" />
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
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
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. RESULTS — three-up measure grid
      =================================================================== */}
      <section id="roof-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RoofHeading>{ROOF_RESULTS_HEADING}</RoofHeading>

          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROOF_RESULTS.map((r, i) => {
              const Icon = r.icon;
              return (
                <Reveal key={r.text} delay={Math.min(i * 0.05, 0.2)}>
                  <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 hover:border-red-300 hover:bg-red-50/30 transition-colors">
                    <span className="flex w-10 h-10 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A] group-hover:bg-[#C61A1A] group-hover:text-white transition-colors">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <p className="mt-3.5 text-sm font-semibold text-slate-800 leading-snug">
                      {r.text}
                    </p>
                    <ZigzagRule className="mt-4 w-full" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. KEY TAKEAWAYS + WHY THIS WORKED — stacked bands, zigzag divider
      =================================================================== */}
      <section className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <article>
              <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-red-50 text-[#C61A1A]">
                <Lightbulb className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {ROOF_TAKEAWAYS.heading}
              </h2>
              <ZigzagRule className="mt-4 w-28" color="rgba(198,26,26,0.5)" />
              <div className="mt-5 space-y-4">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {ROOF_TAKEAWAYS.paras[0]}
                </p>
                {ROOF_TAKEAWAYS.paras.slice(1).map((p) => (
                  <p key={p.slice(0, 40)} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          </Reveal>

          <ZigzagRule className="my-10 w-full" />

          <Reveal delay={0.08}>
            <article>
              <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {ROOF_WHY_WORKED.heading}
              </h2>
              <ZigzagRule className="mt-4 w-28" />
              <div className="mt-5 space-y-4">
                {ROOF_WHY_WORKED.paras.map((p) => (
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
          6. CTA — shingled white close, echoing the hero
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={shingles(0.07)} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <Home className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {ROOF_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{ROOF_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{ROOF_CTA.button}</span>
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
