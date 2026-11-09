import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cross,
  Lightbulb,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  LNS,
  LNS_CHALLENGE,
  LNS_CTA,
  LNS_FRAMEWORK_HEADING,
  LNS_IMAGE,
  LNS_OVERVIEW,
  LNS_PHASES,
  LNS_RESULTS,
  LNS_RESULTS_HEADING,
  LNS_SNAPSHOT,
  LNS_TAKEAWAYS,
  LNS_WHY_WORKED,
} from '../data/lungNSleepCaseStudyContent';

interface LungNSleepCaseStudyPageProps {
  onOpenAudit: () => void;
}

/**
 * Lung-N-Sleep case study (`/case-study/lung-n-sleep`).
 *
 * Identity: a clinical chart — white throughout (house rule for case study
 * pages) carrying an ECG-paper grid, pulse-trace rules trailing each heading,
 * the snapshot stats on a dark vitals-monitor strip, the challenge as a
 * two-column intake list, the 5D phases as chart-folder cards with red index
 * tabs (no file sheets, receipt rail, bay doors, ruler rail, or truss cards —
 * those belong to the earlier studies), and results as chart rows.
 */

/** Repeating ECG pulse trace used as a rule. */
const PulseRule: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = 'rgba(100,116,139,0.55)',
}) => {
  const rawId = React.useId();
  const id = `pulse-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg aria-hidden="true" className={`block w-full ${className}`} height="12" preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="72" height="12" patternUnits="userSpaceOnUse">
          <path
            d="M0 6 H26 L31 6 L35 1.5 L39 10.5 L43 6 H72"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height="12" fill={`url(#${id})`} />
    </svg>
  );
};

/** Section heading in the chart style: title + pulse-trace rule. */
const ChartHeading: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <Reveal delay={delay}>
    <div className="flex items-center gap-4 sm:gap-6">
      <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.06em] text-slate-900">
        {children}
      </h2>
      <span className="flex-1 min-w-0">
        <PulseRule />
      </span>
    </div>
  </Reveal>
);

export const LungNSleepCaseStudyPage: React.FC<LungNSleepCaseStudyPageProps> = ({
  onOpenAudit,
}) => {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  /** ECG paper: fine red grid with a heavier line every fifth square. */
  const ecgPaper = (opacity: number): React.CSSProperties => ({
    backgroundImage:
      'repeating-linear-gradient(to right, rgba(198,26,26,0.55) 0px, rgba(198,26,26,0.55) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(to bottom, rgba(198,26,26,0.55) 0px, rgba(198,26,26,0.55) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(to right, rgba(198,26,26,0.9) 0px, rgba(198,26,26,0.9) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(to bottom, rgba(198,26,26,0.9) 0px, rgba(198,26,26,0.9) 1px, transparent 1px, transparent 40px)',
    maskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, #000 40%, transparent 100%)',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, #000 40%, transparent 100%)',
    opacity,
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — white chart header with vitals monitor + client visual
      =================================================================== */}
      <section id="lns-hero" className="relative bg-white overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={ecgPaper(0.06)} />
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
                {LNS.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="mt-5 text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.16]"
            >
              Building a <span className="text-[#C61A1A]">Complete Digital Presence</span> for a
              Multi-Specialty Pulmonology & Sleep Clinic
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
                <div className="mt-1.5 text-sm font-bold text-slate-900">{LNS.meta.industry}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Timeline
                </div>
                <div className="mt-1.5 text-sm font-bold text-slate-900">{LNS.meta.timeline}</div>
              </div>
              <div className="px-5 py-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Primary Channels
                </div>
                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {LNS.meta.channels.map((c) => (
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
                {LNS.meta.objectiveLabel}
                <span className="w-2 h-2 bg-[#C61A1A] rotate-45" />
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {LNS.meta.objective}
              </p>
            </motion.div>

            {/* snapshot — vitals monitor strip (white; house rule: no black) */}
            <motion.div {...rise(0.32)} className="mt-7 rounded-2xl bg-white border border-slate-200 overflow-hidden text-center shadow-xs">
              <div className="flex items-center justify-between gap-4 px-5 pt-4">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <Activity className="w-3.5 h-3.5 text-[#C61A1A]" />
                  Snapshot · Measured
                </span>
                <span className="w-28 shrink-0">
                  <PulseRule color="rgba(198,26,26,0.7)" />
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200">
                {LNS_SNAPSHOT.map((s) => {
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

          {/* client visual — chart-header board */}
          <motion.figure
            initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 max-w-4xl mx-auto m-0"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)] bg-white">
              <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-b border-slate-200">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                  Patient Acquisition System · Live
                </span>
                <span className="w-28 shrink-0 hidden sm:block">
                  <PulseRule color="rgba(198,26,26,0.5)" />
                </span>
              </div>
              <img
                src={LNS_IMAGE}
                alt="Lung-N-Sleep Disorder Center website shown on a desktop monitor and tablet beside a clinician"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
              <figcaption className="absolute left-3 bottom-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-700 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                {LNS.meta.industry}
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </section>

      {/* ==================================================================
          2. PROJECT OVERVIEW — chart lead paragraphs
      =================================================================== */}
      <section id="lns-overview" className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChartHeading>{LNS_OVERVIEW.heading}</ChartHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed">
              {LNS_OVERVIEW.paras[0]}
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {LNS_OVERVIEW.paras[1]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          3. THE CHALLENGE — two-column intake list
      =================================================================== */}
      <section id="lns-challenge" className="py-14 md:py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChartHeading>{LNS_CHALLENGE.heading}</ChartHeading>

          <Reveal delay={0.06}>
            <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed">
              {LNS_CHALLENGE.intro}
            </p>
          </Reveal>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {LNS_CHALLENGE.problems.map((p, i) => (
              <Reveal key={p} delay={Math.min(i * 0.04, 0.15)}>
                <div className="group flex items-start gap-3.5 py-3.5 border-b border-dashed border-slate-300 hover:bg-red-50/40 transition-colors">
                  <Cross className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
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
          4. 5D GROWTH FRAMEWORK — chart-folder cards with red index tabs
      =================================================================== */}
      <section id="lns-framework" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChartHeading>{LNS_FRAMEWORK_HEADING}</ChartHeading>

          <div className="mt-10 space-y-7">
            {LNS_PHASES.map((phase, i) => (
              <Reveal key={phase.number} delay={Math.min(i * 0.05, 0.15)}>
                <article className="relative">
                  {/* folder index tab */}
                  <span className="absolute -top-3.5 left-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-t-lg bg-[#C61A1A] text-white text-[11px] font-extrabold uppercase tracking-widest shadow-md shadow-red-200">
                    <span className="tabular-nums">{phase.number}</span>
                    <span aria-hidden="true" className="w-px h-3 bg-white/40" />
                    {phase.name}
                  </span>

                  <div className="rounded-2xl rounded-tl-none border border-slate-200 bg-white p-6 sm:p-7 pt-8 shadow-xs">
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
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
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. RESULTS — chart rows with pulse traces
      =================================================================== */}
      <section id="lns-results" className="py-14 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChartHeading>{LNS_RESULTS_HEADING}</ChartHeading>

          <div className="mt-7 rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            {LNS_RESULTS.map((r, i) => {
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
                      <PulseRule color="rgba(198,26,26,0.6)" />
                    </span>
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
                {LNS_TAKEAWAYS.heading}
              </h2>
              <span className="mt-4 block w-28">
                <PulseRule color="rgba(198,26,26,0.5)" />
              </span>
              <div className="mt-5 space-y-4">
                {LNS_TAKEAWAYS.paras.map((p) => (
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
                {LNS_WHY_WORKED.heading}
              </h2>
              <span className="mt-4 block w-28">
                <PulseRule />
              </span>
              <div className="mt-5 space-y-4">
                {LNS_WHY_WORKED.paras.map((p) => (
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
          7. CTA — ECG-paper white close, echoing the hero
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-100">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={ecgPaper(0.05)} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-[#C61A1A]/25 text-xs font-bold uppercase tracking-widest text-[#C61A1A]">
              <Stethoscope className="w-3.5 h-3.5" />
              Start Your Case Study
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {LNS_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">{LNS_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>{LNS_CTA.button}</span>
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
