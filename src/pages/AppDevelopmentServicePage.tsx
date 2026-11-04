import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, HelpCircle, Minus, Plus } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { CTAArrow } from '../components/social/SocialVisuals';
import {
  AssetMeters,
  FailureFunnel,
  PipelineRail,
  ShiftDiff,
  SystemBlueprint,
  SystemManifest,
} from '../components/appdev/AppDevVisuals';
import {
  APP_ASSETS,
  APP_CTA,
  APP_FAQ,
  APP_FRAMEWORK,
  APP_HERO,
  APP_PROBLEM,
  APP_SHIFT,
  APP_SYSTEM,
} from '../data/appDevContent';

interface AppDevelopmentServicePageProps {
  onOpenAudit: () => void;
}

/** Scroll helper — anchors would hijack the hash router, so we move manually. */
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ------------------------------------------------------------------
   Hero — dark stage, grid floor, copy left / system blueprint right.
------------------------------------------------------------------ */
const HeroSection: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0C0C0D] pt-14 pb-16 sm:pt-20 sm:pb-24">
      {/* grid floor */}
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,26,26,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(198,26,26,0.55) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          maskImage: 'radial-gradient(ellipse at 50% 35%, black 25%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 35%, black 25%, transparent 78%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(198,26,26,0.18), transparent 70%), radial-gradient(40% 40% at 85% 90%, rgba(198,26,26,0.10), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* ---------------------------------------------------- copy */}
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/85"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              {APP_HERO.badge}
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.08]"
            >
              {APP_HERO.titleLead}
              <span className="relative inline-block text-[#E83535]">
                {APP_HERO.titleHighlight}
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

            {APP_HERO.intros.map((para, i) => (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl ${
                  i === 0 ? 'mt-5' : 'mt-3.5'
                }`}
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={onOpenAudit}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C61A1A] hover:bg-[#9E1414] text-white text-sm font-extrabold shadow-[0_20px_45px_-20px_rgba(198,26,26,0.85)] transition-colors cursor-pointer"
              >
                {APP_HERO.cta}
                <CTAArrow />
              </button>
              <button
                onClick={() => scrollToSection('app-framework')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 hover:border-white/35 text-white/85 hover:text-white text-sm font-bold transition-colors cursor-pointer"
              >
                See the 5D framework
              </button>
            </motion.div>
          </div>

          {/* ------------------------------------------------- blueprint */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <SystemBlueprint />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   Problem — lead, thinking-stage quote, drop-off funnel, error cards.
------------------------------------------------------------------ */
const ProblemSection: React.FC = () => (
  <section className="py-20 bg-white relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:18px_18px]"
      aria-hidden="true"
    />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            The real problem
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {APP_PROBLEM.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {APP_PROBLEM.lead}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
          {APP_PROBLEM.p1a}
          <br />
          <span className="text-[#C61A1A]">{APP_PROBLEM.p1b}</span>
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-8">
          <FailureFunnel />
        </div>
      </Reveal>

      {/* failure cards */}
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {APP_PROBLEM.failures.map((f, i) => (
          <Reveal key={f.code} delay={Math.min(i * 0.06, 0.3)}>
            <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-red-300 hover:shadow-[0_24px_50px_-38px_rgba(198,26,26,0.5)]">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#18181B] px-2 py-1 font-mono text-[10px] font-bold tracking-wider text-[#E83535]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] transition-transform group-hover:scale-150" />
                {f.code}
              </span>
              <h3 className="mt-3 text-base font-extrabold text-slate-900 leading-snug">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 space-y-1.5 text-center">
        {APP_PROBLEM.closing.map((line, i) => (
          <Reveal key={line} delay={0.05 * i}>
            <p
              className={
                i === APP_PROBLEM.closing.length - 1
                  ? 'text-base sm:text-lg font-extrabold text-[#C61A1A]'
                  : 'text-sm sm:text-base font-semibold text-slate-600'
              }
            >
              {line}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-8 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {APP_PROBLEM.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Shift — the two quotes, then the mindset diff viewer.
------------------------------------------------------------------ */
const ShiftSection: React.FC = () => (
  <section className="py-20 bg-slate-50/70 border-y border-slate-100">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            The shift
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {APP_SHIFT.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {APP_SHIFT.p1a} {APP_SHIFT.p1b}
          </p>
        </Reveal>
      </div>

      {/* before / after quotes */}
      <div className="mt-9 grid sm:grid-cols-2 gap-4">
        <Reveal delay={0.05}>
          <div className="h-full rounded-2xl border border-slate-200 bg-white p-5">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
              {APP_SHIFT.thinkLabel}
            </span>
            <p className="mt-2 text-lg font-bold text-slate-500">{APP_SHIFT.thinkQuote}</p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="h-full rounded-2xl border-2 border-[#C61A1A] bg-red-50/60 p-5">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#C61A1A]">
              {APP_SHIFT.shiftLabel}
            </span>
            <p className="mt-2 text-lg font-extrabold text-[#C61A1A]">{APP_SHIFT.shiftQuote}</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <div className="mt-8">
          <ShiftDiff />
        </div>
      </Reveal>

      <div className="mt-9 space-y-1 text-center">
        {APP_SHIFT.closing.map((line, i) => (
          <Reveal key={line} delay={0.05 * i}>
            <p
              className={
                i === APP_SHIFT.closing.length - 1
                  ? 'text-base sm:text-lg font-extrabold text-slate-900'
                  : 'text-sm sm:text-base font-semibold text-slate-600'
              }
            >
              {line}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-6 text-center text-sm sm:text-base font-bold text-[#C61A1A]">
          {APP_SHIFT.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   System — the pillar manifest.
------------------------------------------------------------------ */
const SystemSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            Built as a system
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {APP_SYSTEM.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-4 space-y-1.5">
            {APP_SYSTEM.intro.map((line) => (
              <p key={line} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10">
          <SystemManifest />
        </div>
      </Reveal>

      <div className="mt-9 space-y-1.5 text-center">
        {APP_SYSTEM.closing.map((line, i) => (
          <Reveal key={line} delay={0.05 * i}>
            <p
              className={
                i === APP_SYSTEM.closing.length - 1
                  ? 'text-base sm:text-lg font-extrabold text-slate-900'
                  : 'text-sm sm:text-base font-semibold text-slate-600'
              }
            >
              {line}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-6 text-center text-sm sm:text-base font-bold text-[#C61A1A] max-w-3xl mx-auto">
          {APP_SYSTEM.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Framework — dark stage, pipeline rail with phase detail.
------------------------------------------------------------------ */
const FrameworkSection: React.FC = () => {
  return (
    <section id="app-framework" className="py-20 bg-[#0C0C0D] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,26,26,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(198,26,26,0.5) 1px, transparent 1px)',
          backgroundSize: '58px 58px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 20%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/[0.06] text-white/85 text-[11px] font-extrabold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              5D Growth Framework
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {APP_FRAMEWORK.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              {APP_FRAMEWORK.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          <Reveal delay={0.1}>
            <PipelineRail />
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <p className="mt-9 text-center text-sm sm:text-base font-bold text-slate-300 max-w-3xl mx-auto">
            {APP_FRAMEWORK.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   Assets — gap vs. approach ledger rows with benefit tracks.
------------------------------------------------------------------ */
const AssetSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            Asset, not software
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {APP_ASSETS.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {APP_ASSETS.intro}
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10">
          <AssetMeters />
        </div>
      </Reveal>
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
              {APP_FAQ.lead}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {APP_FAQ.title}
            </h2>
          </Reveal>
        </div>

        <div className="space-y-3">
          {APP_FAQ.items.map((item, i) => {
            const isOpen = openId === i;
            return (
              <Reveal key={item.q} delay={Math.min(i * 0.04, 0.3)}>
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
            {APP_CTA.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{APP_CTA.body}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <button
            onClick={onOpenAudit}
            className="group mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-[#C61A1A] hover:text-[#9E1414] text-sm font-extrabold shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)] transition-colors cursor-pointer"
          >
            {APP_CTA.button}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Reveal>
      </div>
    </section>
  );
};

/* ==========================================================================
   Page
   ========================================================================== */
export const AppDevelopmentServicePage: React.FC<AppDevelopmentServicePageProps> = ({
  onOpenAudit,
}) => (
  <main className="bg-white">
    <HeroSection onOpenAudit={onOpenAudit} />
    <ProblemSection />
    <ShiftSection />
    <SystemSection />
    <FrameworkSection />
    <AssetSection />
    <FaqSection />
    <FinalCtaSection onOpenAudit={onOpenAudit} />
  </main>
);
