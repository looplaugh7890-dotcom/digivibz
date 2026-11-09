import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, HelpCircle, Minus, Plus } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { CTAArrow } from '../components/social/SocialVisuals';
import {
  BlueprintDraw,
  CoverageRibbon,
  KeywordScale,
  RankSlip,
  ReasonLedger,
  RollRows,
  SEO_GROUP_ICONS,
} from '../components/seo/SeoVisuals';
import {
  SEO_CTA,
  SEO_FAQ,
  SEO_HERO,
  SEO_PITCH,
  SEO_PROBLEM,
  SEO_PROCESS,
  SEO_SERVICES,
  SEO_WHY,
} from '../data/seoContent';

interface SeoServicePageProps {
  onOpenAudit: () => void;
}

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const SEO_GROUP_LIST = SEO_SERVICES.groups.map((g) => ({
  key: g.key,
  count: g.items.length,
}));

/* ------------------------------------------------------------------
   Hero — copy left, live keyword balance scale right.
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
              {SEO_HERO.badge}
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]"
            >
              {SEO_HERO.titleLead}
              <span className="relative inline-block text-[#C61A1A]">
                {SEO_HERO.titleHighlight}
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
              {SEO_HERO.intro}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={onOpenAudit}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C61A1A] hover:bg-[#9E1414] text-white text-sm font-extrabold shadow-[0_20px_45px_-20px_rgba(198,26,26,0.85)] transition-colors cursor-pointer"
              >
                {SEO_HERO.cta}
                <CTAArrow />
              </button>
              <button
                onClick={() => scrollToId('seo-process')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-500 text-slate-700 hover:text-slate-900 text-sm font-bold transition-colors cursor-pointer"
              >
                {SEO_HERO.secondary}
              </button>
            </motion.div>
          </div>

          {/* the live keyword scale */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <KeywordScale />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   Problem — the slipping rankings board beside the copy.
------------------------------------------------------------------ */
const ProblemSection: React.FC = () => (
  <section className="py-20 bg-white border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <p className="text-sm sm:text-base font-bold text-slate-600">{SEO_HERO.transition}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <span className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            Where the traffic goes
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {SEO_PROBLEM.title}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-3 text-sm sm:text-base font-semibold text-[#C61A1A]">
            {SEO_PROBLEM.lead}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <Reveal delay={0.08}>
          <div>
            <ul className="space-y-2.5">
              {SEO_PROBLEM.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 transition-colors hover:border-red-200 hover:bg-red-50/40"
                >
                  <span className="font-mono text-[11px] font-extrabold text-[#C61A1A]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[15px] font-extrabold text-slate-800">{item}</span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
              {SEO_PROBLEM.closing}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <RankSlip />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-12 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {SEO_PROBLEM.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Pitch — centered positioning statement beside the reason ledger.
------------------------------------------------------------------ */
const PitchSection: React.FC = () => (
  <section className="py-20 bg-white relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:18px_18px]"
      aria-hidden="true"
    />
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
            The Digivibz way
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {SEO_PITCH.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">{SEO_PITCH.p1}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">{SEO_PITCH.p2}</p>
        </Reveal>
      </div>

      {/* the ledger — what they show vs. what we show */}
      <Reveal delay={0.08}>
        <div className="mt-10">
          <ReasonLedger />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
          {SEO_PITCH.p3}
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-8 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {SEO_PITCH.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Services — coverage ribbon above nine groups of cards.
------------------------------------------------------------------ */
const ServicesSection: React.FC = () => (
  <section className="pb-20 bg-slate-50/70 border-y border-slate-100 relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:20px_20px]"
      aria-hidden="true"
    />
    <div className="relative pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              Every search intent
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {SEO_SERVICES.title}
            </h2>
          </Reveal>
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <Reveal delay={0.1}>
            <CoverageRibbon groups={SEO_GROUP_LIST} />
          </Reveal>
        </div>

        <div className="mt-12 space-y-12">
          {SEO_SERVICES.groups.map((group, gi) => {
            const Icon = SEO_GROUP_ICONS[gi];
            return (
              <div key={group.key}>
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-[#C61A1A]">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
                      {group.key}
                    </h3>
                    <span className="hidden font-mono text-[10px] font-extrabold text-slate-400 sm:inline">
                      {String(group.items.length).padStart(2, '0')} SERVICES
                    </span>
                    <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
                  </div>
                </Reveal>

                <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map((item, i) => (
                    <Reveal key={item.title} delay={Math.min(i * 0.04, 0.24)}>
                      <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-red-300 hover:shadow-[0_24px_50px_-38px_rgba(198,26,26,0.5)]">
                        <div className="flex items-start gap-2.5">
                          <span className="mt-1 h-4 w-0.5 shrink-0 rounded-full bg-[#C61A1A]" />
                          <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                            {item.title}
                          </h4>
                        </div>
                        <p className="mt-2 pl-3 text-[13px] text-slate-600 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Reveal delay={0.08}>
          <p className="mt-12 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
            {SEO_SERVICES.transition}
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Process — 5D phases drawing themselves on the blueprint
   (id anchors the hero's "See how we work" button).
------------------------------------------------------------------ */
const ProcessSection: React.FC = () => (
  <section
    id="seo-process"
    className="py-20 bg-white border-t border-slate-100 relative overflow-hidden"
  >
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
            The 5D system
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {SEO_PROCESS.title}
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        <Reveal delay={0.1}>
          <BlueprintDraw />
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <p className="mt-6 flex flex-wrap justify-center gap-2">
          {SEO_PROCESS.stages.map((stage, i) => (
            <span
              key={stage.key}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-extrabold text-slate-600"
            >
              <span className="font-mono text-[#C61A1A]">{String(i + 1).padStart(2, '0')}</span>{' '}
              {stage.key}
            </span>
          ))}
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-8 max-w-3xl mx-auto space-y-3">
          {SEO_PROCESS.stages.map((stage) => (
            <p key={stage.key} className="text-sm text-slate-600 leading-relaxed">
              <span className="font-extrabold text-slate-900">{stage.key}. </span>
              {stage.body}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="mt-10 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {SEO_PROCESS.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Why — odometer roll rows.
------------------------------------------------------------------ */
const WhySection: React.FC = () => (
  <section className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:18px_18px]"
      aria-hidden="true"
    />
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
            Why Digivibz
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {SEO_WHY.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-10">
        <RollRows items={SEO_WHY.items} />
      </div>

      <Reveal delay={0.12}>
        <p className="mt-10 text-center text-sm sm:text-base text-slate-600 leading-relaxed">
          {SEO_WHY.note}
        </p>
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
              {SEO_FAQ.lead}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {SEO_FAQ.title}
            </h2>
          </Reveal>
        </div>

        <div className="space-y-3">
          {SEO_FAQ.items.map((item, i) => {
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
   Final CTA — full-bleed brand-red band, audit + contact buttons.
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
            {SEO_CTA.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/85">{SEO_CTA.body}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-[#C61A1A] hover:text-[#9E1414] text-sm font-extrabold shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)] transition-colors cursor-pointer"
            >
              {SEO_CTA.primary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/70 text-white hover:bg-white/10 text-sm font-extrabold transition-colors cursor-pointer"
            >
              Talk to our team
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
export const SeoServicePage: React.FC<SeoServicePageProps> = ({ onOpenAudit }) => (
  <main className="bg-white">
    <HeroSection onOpenAudit={onOpenAudit} />
    <ProblemSection />
    <PitchSection />
    <ServicesSection />
    <ProcessSection />
    <WhySection />
    <FaqSection />
    <FinalCtaSection onOpenAudit={onOpenAudit} />
  </main>
);
