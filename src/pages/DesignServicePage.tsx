import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChartColumn,
  HeartHandshake,
  HelpCircle,
  LayoutTemplate,
  Layers,
  Lightbulb,
  Maximize,
  Minus,
  Monitor,
  Package,
  Palette,
  PenTool,
  Plus,
  Printer,
  Megaphone,
  Presentation,
  Share2,
  X,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { CTAArrow } from '../components/social/SocialVisuals';
import {
  DesignCanvas,
  DiffLedger,
  FlawAudit,
  LayerStack,
  StatStrip,
  ToolGrid,
} from '../components/design/DesignVisuals';
import {
  GD_CTA,
  GD_DIFF,
  GD_FAQ,
  GD_HERO,
  GD_PROCESS,
  GD_PROBLEM,
  GD_SERVICES,
  GD_TOOLS,
  GD_WHY,
} from '../data/designContent';

interface DesignServicePageProps {
  onOpenAudit: () => void;
}

/** Scroll helper — anchors would hijack the hash router, so we move manually. */
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** One icon per design service, in copy order. */
const SERVICE_ICONS = [
  Palette,
  PenTool,
  Layers,
  Share2,
  Package,
  Printer,
  Megaphone,
  ChartColumn,
  Presentation,
  LayoutTemplate,
];

const WHY_ICONS = [Lightbulb, HeartHandshake, Maximize, Monitor];

/* ------------------------------------------------------------------
   Hero — copy left, live design canvas right, stats strip below.
------------------------------------------------------------------ */
const HeroSection: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white pt-14 pb-16 sm:pt-20 sm:pb-24">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(55% 45% at 78% 30%, rgba(198,26,26,0.09), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(198,26,26,0.06), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* copy */}
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-700 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              {GD_HERO.badge}
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]"
            >
              {GD_HERO.titleLead}
              <span className="relative inline-block text-[#C61A1A]">
                {GD_HERO.titleHighlight}
                {!reduce && (
                  <motion.span
                    className="absolute -bottom-1.5 left-0 h-1 bg-[#C61A1A] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl"
            >
              {GD_HERO.intro}
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl"
            >
              {GD_HERO.intro2}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={onOpenAudit}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C61A1A] hover:bg-[#9E1414] text-white text-sm font-extrabold shadow-[0_20px_45px_-20px_rgba(198,26,26,0.85)] transition-colors cursor-pointer"
              >
                {GD_HERO.cta}
                <CTAArrow />
              </button>
              <button
                onClick={() => scrollToSection('design-process')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-500 text-slate-700 hover:text-slate-900 text-sm font-bold transition-colors cursor-pointer"
              >
                {GD_HERO.secondary}
              </button>
            </motion.div>
          </div>

          {/* design canvas */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <DesignCanvas />
          </motion.div>
        </div>

        {/* stats */}
        <div className="mt-12 sm:mt-14">
          <StatStrip stats={GD_HERO.stats} />
          <Reveal delay={0.2}>
            <p className="mt-5 text-center text-xs sm:text-sm font-semibold text-slate-500">
              {GD_HERO.trust}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   Problem — annotated flaw audit beside the copy.
------------------------------------------------------------------ */
const ProblemSection: React.FC = () => (
  <section className="py-20 bg-white border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            The 3-second glance
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 text-sm sm:text-base font-semibold text-[#C61A1A]">
            {GD_PROBLEM.lead}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {GD_PROBLEM.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <Reveal>
          <FlawAudit />
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {GD_PROBLEM.p1}
            </p>
            <p className="mt-4 text-sm sm:text-base font-semibold text-slate-800">
              {GD_PROBLEM.p2}
            </p>

            <ul className="mt-4 space-y-2.5">
              {GD_PROBLEM.costs.map((cost, i) => (
                <motion.li
                  key={cost}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/50 px-4 py-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C61A1A]">
                    <X className="w-3 h-3 text-white" strokeWidth={3.2} />
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{cost}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-5 space-y-1.5">
              {GD_PROBLEM.closing.map((line, i) => (
                <p
                  key={line.slice(0, 24)}
                  className={
                    i === GD_PROBLEM.closing.length - 1
                      ? 'text-base sm:text-lg font-extrabold text-[#C61A1A]'
                      : 'text-sm sm:text-base font-semibold text-slate-600'
                  }
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-12 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {GD_PROBLEM.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Why — four differentiators.
------------------------------------------------------------------ */
const WhySection: React.FC = () => (
  <section className="py-20 bg-slate-50/70 border-y border-slate-100">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            Why Digivibz
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {GD_WHY.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {GD_WHY.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GD_WHY.features.map((f, i) => {
          const Icon = WHY_ICONS[i];
          return (
            <Reveal key={f.title} delay={0.06 * i}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-red-300 hover:shadow-[0_24px_50px_-38px_rgba(198,26,26,0.5)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0C0C0D] text-[#E83535] transition-colors group-hover:bg-[#C61A1A] group-hover:text-white">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="mt-4 text-base font-extrabold text-slate-900 leading-snug">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {GD_WHY.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Services — ten design solutions.
------------------------------------------------------------------ */
const ServicesSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
            What we design
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {GD_SERVICES.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {GD_SERVICES.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 gap-4">
        {GD_SERVICES.items.map((item, i) => {
          const Icon = SERVICE_ICONS[i];
          return (
            <Reveal key={item.title} delay={Math.min(i * 0.04, 0.28)}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 transition-all hover:border-red-300 hover:shadow-[0_24px_50px_-38px_rgba(198,26,26,0.5)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-[#C61A1A] transition-colors group-hover:bg-[#C61A1A] group-hover:border-[#C61A1A] group-hover:text-white">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-extrabold tracking-widest text-slate-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-3.5 text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Process — the interactive layer stack (id anchors the hero button).
------------------------------------------------------------------ */
const ProcessSection: React.FC = () => (
  <section
    id="design-process"
    className="py-20 bg-slate-50/70 border-y border-slate-100 relative overflow-hidden"
  >
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:20px_20px]"
      aria-hidden="true"
    />
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <p className="text-sm sm:text-base font-bold text-slate-700">{GD_PROCESS.lead}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <span className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
            5D Process
          </span>
        </Reveal>
        <Reveal delay={0.12}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {GD_PROCESS.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-12">
        <Reveal delay={0.1}>
          <LayerStack />
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <p className="mt-10 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {GD_PROCESS.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Diff — before/after ledger.
------------------------------------------------------------------ */
const DiffSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            Before / after
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {GD_DIFF.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {GD_DIFF.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-12">
        <DiffLedger />
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Tools — the software toolkit.
------------------------------------------------------------------ */
const ToolsSection: React.FC = () => (
  <section className="py-20 bg-slate-50/70 border-y border-slate-100">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            The toolkit
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {GD_TOOLS.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-12">
        <ToolGrid />
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   FAQ — accordion (shared service-page pattern).
------------------------------------------------------------------ */
const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#C61A1A]">
              {GD_FAQ.lead}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {GD_FAQ.title}
            </h2>
          </Reveal>
        </div>

        <div className="space-y-3">
          {GD_FAQ.items.map((item, i) => {
            const isOpen = openId === i;
            return (
              <Reveal key={item.q} delay={Math.min(i * 0.04, 0.28)}>
                <div
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? 'border-red-200 bg-red-50/40 shadow-[0_20px_44px_-32px_rgba(198,26,26,0.45)]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          isOpen ? 'bg-[#C61A1A] text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </span>
                      <span
                        className={`text-sm sm:text-base font-extrabold leading-snug ${
                          isOpen ? 'text-[#C61A1A]' : 'text-slate-800'
                        }`}
                      >
                        {item.q}
                      </span>
                    </span>
                    <span
                      className={`mt-0.5 w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'border-[#C61A1A] bg-[#C61A1A] text-white'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                      ) : (
                        <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pl-[3.25rem]">
                          <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   Final CTA — full-bleed brand-red band.
------------------------------------------------------------------ */
const FinalCtaSection: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#C61A1A] py-16 sm:py-20">
      <div
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 15%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 15%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      {!reduce && (
        <motion.span
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/25"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      )}

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {GD_CTA.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-4 space-y-3">
            {GD_CTA.body.map((p) => (
              <p key={p.slice(0, 24)} className="text-sm sm:text-base text-white/85 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-[#C61A1A] hover:text-[#9E1414] text-sm font-extrabold shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)] transition-colors cursor-pointer"
            >
              {GD_CTA.button}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/45 text-white hover:bg-white/10 text-sm font-extrabold transition-colors"
            >
              {GD_CTA.secondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ==========================================================================
   Page
   ========================================================================== */
export const DesignServicePage: React.FC<DesignServicePageProps> = ({ onOpenAudit }) => (
  <main className="bg-white">
    <HeroSection onOpenAudit={onOpenAudit} />
    <ProblemSection />
    <WhySection />
    <ServicesSection />
    <ProcessSection />
    <DiffSection />
    <ToolsSection />
    <FaqSection />
    <FinalCtaSection onOpenAudit={onOpenAudit} />
  </main>
);
