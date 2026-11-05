import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Bell,
  Eye,
  HelpCircle,
  MapPin,
  Minus,
  Plus,
  Radar,
  RefreshCw,
  SearchCheck,
  Share2,
  Siren,
  Star,
  Users,
  Zap,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { CountUp } from '../components/CountUp';
import { CTAArrow } from '../components/social/SocialVisuals';
import { CaseVisual, FirstSearch, RecordStage, ReputationRadar, StatStrip } from '../components/orm/OrmVisuals';
import {
  ORM_CTA,
  ORM_FAQ,
  ORM_FRAMEWORK,
  ORM_HERO,
  ORM_PROBLEM,
  ORM_RESULTS,
  ORM_SERVICES,
  ORM_WHY,
} from '../data/ormContent';

interface OrmServicePageProps {
  onOpenAudit: () => void;
}

/** Scroll helper — anchors would hijack the hash router, so we move manually. */
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** One icon per ORM service. */
const SERVICE_ICONS = [Radar, SearchCheck, Share2, MapPin, Star, ArrowRight, Siren];
const WHY_ICONS = [Users, Zap, RefreshCw, Eye];

/* ------------------------------------------------------------------
   Hero — copy left, recording setup right, stats strip below.
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
              {ORM_HERO.badge}
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]"
            >
              {ORM_HERO.titleLead}
              <span className="relative inline-block text-[#C61A1A]">
                {ORM_HERO.titleHighlight}
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
              {ORM_HERO.intro}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={onOpenAudit}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#C61A1A] hover:bg-[#9E1414] text-white text-sm font-extrabold shadow-[0_20px_45px_-20px_rgba(198,26,26,0.85)] transition-colors cursor-pointer"
              >
                {ORM_HERO.cta}
                <CTAArrow />
              </button>
              <button
                onClick={() => scrollToSection('reputation-framework')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-500 text-slate-700 hover:text-slate-900 text-sm font-bold transition-colors cursor-pointer"
              >
                {ORM_HERO.secondary}
              </button>
            </motion.div>
          </div>

          {/* recording setup */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <RecordStage />
          </motion.div>
        </div>

        {/* stats */}
        <div className="mt-12 sm:mt-14">
          <StatStrip stats={ORM_HERO.stats} />
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   Problem — the first-search SERP beside the copy, scenarios below.
------------------------------------------------------------------ */
const ProblemSection: React.FC = () => (
  <section className="py-20 bg-white border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            The first search
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 text-sm sm:text-base font-semibold text-[#C61A1A]">
            {ORM_PROBLEM.lead}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {ORM_PROBLEM.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <Reveal>
          <FirstSearch />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-3.5">
            {ORM_PROBLEM.lines.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`text-sm sm:text-base leading-relaxed ${
                  i === ORM_PROBLEM.lines.length - 1
                    ? 'font-bold text-slate-900'
                    : 'text-slate-600'
                }`}
              >
                {line}
              </motion.p>
            ))}
            <p className="pt-2 text-base font-extrabold text-[#C61A1A]">{ORM_PROBLEM.problemQ}</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-12">
        <Reveal>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-500">
            {ORM_PROBLEM.askLabel}
          </p>
        </Reveal>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          {ORM_PROBLEM.scenarios.map((s, i) => (
            <Reveal key={s.title} delay={Math.min(i * 0.07, 0.3)}>
              <div className="h-full rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition-all hover:border-red-300 hover:bg-white hover:shadow-[0_24px_50px_-38px_rgba(198,26,26,0.5)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-[#C61A1A] text-xs font-extrabold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-1.5 text-center">
        {ORM_PROBLEM.closing.map((line, i) => (
          <Reveal key={line} delay={0.05 * i}>
            <p
              className={
                i === ORM_PROBLEM.closing.length - 1
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
          {ORM_PROBLEM.transition}
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
            In your corner
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {ORM_WHY.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ORM_WHY.features.map((f, i) => {
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
          {ORM_WHY.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Services — seven numbered services.
------------------------------------------------------------------ */
const ServicesSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
            Seven services
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {ORM_SERVICES.intro}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-2 text-lg sm:text-xl font-extrabold text-slate-900">
            {ORM_SERVICES.hook}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ORM_SERVICES.items.map((item, i) => {
          const Icon = SERVICE_ICONS[i];
          return (
            <Reveal key={item.title} delay={Math.min(i * 0.05, 0.3)}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-red-300 hover:shadow-[0_24px_50px_-38px_rgba(198,26,26,0.5)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-[#C61A1A] transition-colors group-hover:bg-[#C61A1A] group-hover:border-[#C61A1A] group-hover:text-white">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-xs font-extrabold tracking-widest text-slate-400">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-3.5 text-base font-extrabold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {ORM_SERVICES.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Framework — the reputation radar (id anchors the hero button).
------------------------------------------------------------------ */
const FrameworkSection: React.FC = () => (
  <section
    id="reputation-framework"
    className="py-20 bg-slate-50/70 border-y border-slate-100 relative overflow-hidden"
  >
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:20px_20px]"
      aria-hidden="true"
    />
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
            5D Growth Framework
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {ORM_FRAMEWORK.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-12">
        <Reveal delay={0.1}>
          <ReputationRadar />
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <p className="mt-10 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {ORM_FRAMEWORK.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Results — three case studies, each with its own small diagram.
------------------------------------------------------------------ */
const ResultsSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            Proven in the wild
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {ORM_RESULTS.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {ORM_RESULTS.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid lg:grid-cols-3 gap-5">
        {ORM_RESULTS.cases.map((c, i) => (
          <Reveal key={c.label} delay={0.08 * i}>
            <div className="h-full flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:border-red-300 hover:shadow-[0_28px_60px_-42px_rgba(198,26,26,0.55)]">
              <div className="flex items-center justify-between px-5 pt-5">
                <span className="font-serif italic text-lg font-bold text-[#C61A1A]">
                  {c.label}
                </span>
                <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#C61A1A]">
                  Case study
                </span>
              </div>
              <div className="px-5 pt-3">
                <CaseVisual kind={c.visual} />
              </div>
              <div className="px-5 pb-5 pt-3 flex-1 flex flex-col gap-2.5">
                {c.body.map((p) => (
                  <p key={p.slice(0, 24)} className="text-sm text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
                <div className="mt-auto pt-4 flex items-baseline gap-2.5 border-t border-slate-100">
                  <span className="text-2xl font-extrabold text-[#C61A1A] tabular-nums">
                    <CountUp value={c.metric.value} />
                  </span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    {c.metric.label}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {ORM_RESULTS.closing}
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
              {ORM_FAQ.lead}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {ORM_FAQ.title}
            </h2>
          </Reveal>
        </div>

        <div className="space-y-3">
          {ORM_FAQ.items.map((item, i) => {
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
            {ORM_CTA.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{ORM_CTA.body}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <button
            onClick={onOpenAudit}
            className="group mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-[#C61A1A] hover:text-[#9E1414] text-sm font-extrabold shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)] transition-colors cursor-pointer"
          >
            {ORM_CTA.button}
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
export const OrmServicePage: React.FC<OrmServicePageProps> = ({ onOpenAudit }) => (
  <main className="bg-white">
    <HeroSection onOpenAudit={onOpenAudit} />
    <ProblemSection />
    <WhySection />
    <ServicesSection />
    <FrameworkSection />
    <ResultsSection />
    <FaqSection />
    <FinalCtaSection onOpenAudit={onOpenAudit} />
  </main>
);
