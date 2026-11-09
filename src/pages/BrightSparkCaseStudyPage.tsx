import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  MapPin,
  MapPinned,
  MousePointerClick,
  X,
  Zap,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  BSP,
  BSP_CHALLENGE,
  BSP_CTA,
  BSP_FRAMEWORK_HEADING,
  BSP_OVERVIEW,
  BSP_PHASES,
  BSP_RESULTS_HEADING,
  BSP_RESULTS_SHOTS,
  BSP_SERVICES,
  BSP_SNAPSHOT,
  BSP_TAKEAWAYS,
  BSP_WHY_WORKED,
} from '../data/brightsparkCaseStudyContent';

interface BrightSparkCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * BrightSpark Electrical case study (`/case-study/brightspark-electrical`).
 *
 * Identity: a local map-pack board — white throughout (house rule for case
 * study pages) carrying contour-ring texture, dashed route rules with waypoint
 * rings, the snapshot stats as an insights strip, the challenge as missed
 * listing rows, the 5D phases as stops on a dashed route with red pin nodes
 * (no file sheets, receipt rail, bay doors, ruler rail, truss cards, chart
 * folders, gauges, or pipe runs — those belong to the earlier studies), and
 * the results as a masonry evidence board of the client's own Google Business
 * Profile screenshots.
 */

/** Repeating dashed route with a waypoint ring, used as a rule. */
const RouteRule: React.FC<{ className?: string; color?: string; pin?: string }> = ({
  className = '',
  color = 'rgba(100,116,139,0.5)',
  pin = 'rgba(198,26,26,0.65)',
}) => {
  const rawId = React.useId();
  const id = `route-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg aria-hidden="true" className={`block w-full ${className}`} height="12" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="96" height="12" patternUnits="userSpaceOnUse">
          <rect x="0" y="5.25" width="16" height="1.5" rx="0.75" fill={color} />
          <rect x="26" y="5.25" width="16" height="1.5" rx="0.75" fill={color} />
          <rect x="52" y="5.25" width="16" height="1.5" rx="0.75" fill={color} />
          <circle cx="82" cy="6" r="4.5" fill="none" stroke={pin} strokeWidth="1.5" />
          <circle cx="82" cy="6" r="1.75" fill={pin} />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill={`url(#${id})`} />
    </svg>
  );
};

/** Section heading in the map-pack style: title + route rule. */
const RouteHeading: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
        {children}
      </h2>
      <span className="flex-1 min-w-0">
        <RouteRule />
      </span>
    </div>
  </Reveal>
);

export const BrightSparkCaseStudyPage: React.FC<BrightSparkCaseStudyPageProps> = ({
  onOpenAudit,
}) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  /** Contour rings radiating from two off-axis centers, like a service-area map. */
  const contourRings = (opacity: number): React.CSSProperties => ({
    backgroundImage:
      'repeating-radial-gradient(circle at 12% 18%, rgba(198,26,26,0.55) 0px, rgba(198,26,26,0.55) 1px, transparent 1px, transparent 56px), repeating-radial-gradient(circle at 88% 82%, rgba(198,26,26,0.45) 0px, rgba(198,26,26,0.45) 1px, transparent 1px, transparent 72px)',
    maskImage: 'radial-gradient(ellipse 85% 70% at 50% 40%, #000 35%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 85% 70% at 50% 40%, #000 35%, transparent 100%)',
    opacity,
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white map-pack header with insights strip
      =================================================================== */}
      <section id="bsp-hero" className="relative bg-white overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={contourRings(0.07)} />
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
                {BSP.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.16]"
            >
              How Google Business Profile Optimization Turned Local Searches Into{' '}
              <span className="text-[#C61A1A]">Booked Electricians</span>
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
                <div className="mt-1.5 text-sm font-bold text-slate-900">{BSP.meta.industry}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{BSP.meta.timeline}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {BSP.meta.channels.map((c) => (
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
                {BSP.meta.objectiveLabel}
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {BSP.meta.objective}
              </p>
            </motion.div>

            {/* snapshot — insights strip */}
            <motion.div
              {...rise(0.32)}
              className="mt-7 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden text-center"
            >
              <div className="flex items-center justify-between gap-4 px-5 pt-4">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <BarChart3 className="w-3.5 h-3.5 text-[#C61A1A]" />
                  Snapshot · Measured
                </span>
                <span className="w-28 shrink-0">
                  <RouteRule color="rgba(148,163,184,0.6)" pin="rgba(198,26,26,0.55)" />
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200">
                {BSP_SNAPSHOT.map((s) => {
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
        </div>
      </section>

      {/* ==================================================================
          2. SERVICES WE PROVIDED — slim route band
      =================================================================== */}
      <section className="py-8 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A] shrink-0">
                {BSP_SERVICES.heading}
              </span>
              <span className="flex-1 min-w-0 hidden sm:block">
                <RouteRule />
              </span>
              <div className="flex flex-wrap gap-2">
                {BSP_SERVICES.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-50 border border-[#C61A1A]/25 text-sm font-bold text-[#C61A1A]"
                  >
                    <Zap className="w-4 h-4" />
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
      <section id="bsp-overview" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RouteHeading>{BSP_OVERVIEW.heading}</RouteHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed">
              {BSP_OVERVIEW.paras[0]}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {BSP_OVERVIEW.paras[1]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          4. THE CHALLENGE — missed-listing rows
      =================================================================== */}
      <section id="bsp-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RouteHeading>{BSP_CHALLENGE.heading}</RouteHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              {BSP_CHALLENGE.intro}
            </p>
          </Reveal>

          <div className="mt-6 space-y-2.5">
            {BSP_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.04, 0.15)}>
                <div className="group flex items-start gap-3.5 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-[#C61A1A]/40 hover:translate-x-1 transition-all">
                  <span className="flex w-8 h-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#C61A1A]">
                    <X className="w-4 h-4" strokeWidth={3} />
                  </span>
                  <span className="text-sm sm:text-[15px] font-medium text-slate-800 leading-snug pt-1">
                    {p}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. 5D GROWTH FRAMEWORK — stops on a dashed route with pin nodes
      =================================================================== */}
      <section id="bsp-framework" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RouteHeading>{BSP_FRAMEWORK_HEADING}</RouteHeading>

          <div className="mt-10 relative">
            <div
              aria-hidden="true"
              className="absolute left-[19px] top-5 bottom-5 border-l-2 border-dashed border-slate-300"
            />
            <div className="space-y-6">
              {BSP_PHASES.map((phase, i) => (
                <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                  <article className="relative grid grid-cols-[40px_1fr] gap-4 sm:gap-6">
                    {/* pin node on the route */}
                    <span className="relative z-10 flex w-10 h-10 items-center justify-center rounded-full bg-[#C61A1A] text-white text-sm font-extrabold tabular-nums shadow-md shadow-red-200 ring-4 ring-slate-50">
                      {phase.number}
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 rotate-45 rounded-[2px] bg-[#C61A1A]"
                      />
                    </span>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
                          {phase.name}
                        </h3>
                        <span className="flex-1 min-w-0">
                          <RouteRule color="rgba(198,26,26,0.35)" pin="rgba(198,26,26,0.55)" />
                        </span>
                      </div>

                      <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                        {phase.intro}
                      </p>

                      <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                        {phase.checks.map((c) => (
                          <li key={c} className="flex items-start gap-2.5">
                            <span className="flex w-4.5 h-4.5 shrink-0 items-center justify-center rounded bg-red-50 text-[#C61A1A] mt-0.5">
                              <Check className="w-3 h-3" strokeWidth={3.5} />
                            </span>
                            <span className="text-sm text-slate-700 leading-snug">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          6. RESULTS — evidence board of the client's GBP screenshots
      =================================================================== */}
      <section id="bsp-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RouteHeading>{BSP_RESULTS_HEADING}</RouteHeading>

          <div className="mt-8 columns-1 md:columns-2 gap-5">
            {BSP_RESULTS_SHOTS.map((shot, i) => (
              <Reveal key={shot.title} delay={Math.min(i * 0.06, 0.2)} className="mb-5 break-inside-avoid">
                <figure className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-200 bg-slate-50">
                    <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#C61A1A]" />
                      {shot.title}
                    </span>
                    <span className="text-[11px] font-extrabold text-[#C61A1A] tabular-nums whitespace-nowrap">
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
          7. KEY TAKEAWAYS + WHY THIS WORKED — two ruled columns
      =================================================================== */}
      <section className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <Reveal>
            <article>
              <span className="flex w-11 h-11 items-center justify-center rounded-xl bg-red-50 text-[#C61A1A]">
                <Zap className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {BSP_TAKEAWAYS.heading}
              </h2>
              <span className="mt-4 block w-28">
                <RouteRule color="rgba(198,26,26,0.4)" pin="rgba(198,26,26,0.6)" />
              </span>
              <div className="mt-5 space-y-4">
                {BSP_TAKEAWAYS.paras.map((p) => (
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
                <MousePointerClick className="w-5 h-5" />
              </span>
              <h2 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {BSP_WHY_WORKED.heading}
              </h2>
              <span className="mt-4 block w-28">
                <RouteRule />
              </span>
              <div className="mt-5 space-y-4">
                {BSP_WHY_WORKED.paras.map((p) => (
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
          8. CTA — contour-ring white close, echoing the hero
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={contourRings(0.06)} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <MapPinned className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {BSP_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{BSP_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{BSP_CTA.button}</span>
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
