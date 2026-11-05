import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CircleX,
  Clapperboard,
  Cpu,
  Feather,
  Globe,
  HelpCircle,
  Mail,
  Minus,
  MousePointerClick,
  Newspaper,
  Plus,
  RefreshCw,
  Search,
  Share2,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { CTAArrow } from '../components/social/SocialVisuals';
import {
  InkChapters,
  InkPenBook,
  ResultsFlatline,
  StatLedger,
  WriterVenn,
} from '../components/contentwriting/ContentWritingVisuals';
import {
  CW_CTA,
  CW_FAQ,
  CW_FRAMEWORK,
  CW_HERO,
  CW_INDUSTRY,
  CW_PROBLEM,
  CW_PROOF,
  CW_TYPES,
} from '../data/contentWritingContent';

interface ContentWritingServicePageProps {
  onOpenAudit: () => void;
}

/** Scroll helper — anchors would hijack the hash router, so we move manually. */
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** One icon per content format — the 11-type ledger. */
const TYPE_ICONS = [
  Newspaper, // Blog & Article
  Globe, // Website
  ShoppingCart, // Product & E-commerce
  MousePointerClick, // Copywriting
  Mail, // Email
  Share2, // Social
  Search, // SEO
  Briefcase, // B2B
  Cpu, // Technical
  Clapperboard, // Script
  Feather, // Ghostwriting
];

/* ------------------------------------------------------------------
   Hero — paper-white stage, copy left / pen writing in book right.
------------------------------------------------------------------ */
const HeroSection: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white pt-14 pb-16 sm:pt-20 sm:pb-24">
      {/* paper dot texture + soft red glow */}
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
          {/* ---------------------------------------------------- copy */}
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-700 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              {CW_HERO.badge}
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.08]"
            >
              {CW_HERO.titleLead}
              <span className="relative inline-block text-[#C61A1A]">
                {CW_HERO.titleHighlight}
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
              {CW_HERO.intro}
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
                {CW_HERO.cta}
                <CTAArrow />
              </button>
              <button
                onClick={() => scrollToSection('content-framework')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 hover:border-slate-500 text-slate-700 hover:text-slate-900 text-sm font-bold transition-colors cursor-pointer"
              >
                See how we write
              </button>
            </motion.div>
          </div>

          {/* ------------------------------------------------ the book */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <InkPenBook />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------
   Problem — flatline chart beside the copy, pain chips below.
------------------------------------------------------------------ */
const ProblemSection: React.FC = () => (
  <section className="py-20 bg-white border-t border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            The real problem
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {CW_PROBLEM.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {CW_PROBLEM.lead}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <Reveal>
          <div className="space-y-4">
            <p className="text-sm sm:text-base font-semibold text-slate-600 leading-relaxed">
              {CW_PROBLEM.p1a}
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{CW_PROBLEM.p1b}</p>
            <p className="text-base font-extrabold text-slate-900">{CW_PROBLEM.soundFamiliar}</p>

            <p className="pt-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#C61A1A]">
              {CW_PROBLEM.askLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {CW_PROBLEM.pains.map((pain, i) => (
                <Reveal key={pain} delay={Math.min(i * 0.05, 0.25)}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                    <CircleX className="w-3.5 h-3.5 text-[#C61A1A]" />
                    {pain}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ResultsFlatline />
        </Reveal>
      </div>

      <div className="mt-12 space-y-1.5 text-center">
        {CW_PROBLEM.closing.map((line, i) => (
          <Reveal key={line} delay={0.05 * i}>
            <p
              className={
                i === CW_PROBLEM.closing.length - 1
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
          {CW_PROBLEM.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Industry — Venn on the left, the two features stacked right.
------------------------------------------------------------------ */
const IndustrySection: React.FC = () => (
  <section className="py-20 bg-slate-50/70 border-y border-slate-100">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            Writers for your world
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {CW_INDUSTRY.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {CW_INDUSTRY.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid lg:grid-cols-2 gap-8 items-center">
        <Reveal>
          <WriterVenn />
        </Reveal>

        <div className="space-y-4">
          {CW_INDUSTRY.features.map((f, i) => (
            <Reveal key={f.title} delay={0.08 + i * 0.08}>
              <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-red-300 hover:shadow-[0_24px_50px_-38px_rgba(198,26,26,0.5)]">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#C61A1A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2.5 text-lg font-extrabold text-slate-900 leading-snug">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {CW_INDUSTRY.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Types — the 11-format ledger.
------------------------------------------------------------------ */
const TypesSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            11 formats, one roof
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {CW_TYPES.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {CW_TYPES.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CW_TYPES.items.map((item, i) => {
          const Icon = TYPE_ICONS[i];
          return (
            <Reveal key={item.title} delay={Math.min(i * 0.05, 0.3)}>
              <div className="group h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-red-300 hover:shadow-[0_24px_50px_-38px_rgba(198,26,26,0.5)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-[#C61A1A] transition-colors group-hover:bg-[#C61A1A] group-hover:border-[#C61A1A] group-hover:text-white">
                  <Icon className="w-5 h-5" />
                </span>
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
          {CW_TYPES.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Framework — the ink-chapter spine (id anchors the hero button).
------------------------------------------------------------------ */
const FrameworkSection: React.FC = () => (
  <section
    id="content-framework"
    className="py-20 bg-slate-50/70 border-y border-slate-100 relative overflow-hidden"
  >
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:20px_20px]"
      aria-hidden="true"
    />
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
            5D Growth Framework
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {CW_FRAMEWORK.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {CW_FRAMEWORK.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-12">
        <Reveal delay={0.1}>
          <InkChapters />
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <p className="mt-10 text-center text-sm sm:text-base font-bold text-slate-700 max-w-3xl mx-auto">
          {CW_FRAMEWORK.transition}
        </p>
      </Reveal>
    </div>
  </section>
);

/* ------------------------------------------------------------------
   Proof — three reasons, then the dark stat ledger.
------------------------------------------------------------------ */
const REASON_ICONS = [Users, RefreshCw, BarChart3];

const ProofSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A]" />
            Why they stay
          </span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {CW_PROOF.title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            {CW_PROOF.intro}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-4">
        {CW_PROOF.reasons.map((r, i) => {
          const Icon = REASON_ICONS[i];
          return (
            <Reveal key={r.title} delay={0.06 * i}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-red-300 hover:shadow-[0_24px_50px_-38px_rgba(198,26,26,0.5)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0C0C0D] text-[#E83535]">
                  <Icon className="w-5 h-5" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-slate-900 leading-snug">
                  {r.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{r.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.08}>
        <p className="mt-12 text-center text-xs font-extrabold uppercase tracking-[0.16em] text-[#C61A1A]">
          {CW_PROOF.statsLead}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6">
          <StatLedger />
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
              {CW_FAQ.lead}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {CW_FAQ.title}
            </h2>
          </Reveal>
        </div>

        <div className="space-y-3">
          {CW_FAQ.items.map((item, i) => {
            const isOpen = openId === i;
            return (
              <Reveal key={item.q} delay={Math.min(i * 0.05, 0.3)}>
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
            {CW_CTA.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{CW_CTA.body}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <button
            onClick={onOpenAudit}
            className="group mt-8 inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-[#C61A1A] hover:text-[#9E1414] text-sm font-extrabold shadow-[0_24px_50px_-24px_rgba(0,0,0,0.6)] transition-colors cursor-pointer"
          >
            {CW_CTA.button}
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
export const ContentWritingServicePage: React.FC<ContentWritingServicePageProps> = ({
  onOpenAudit,
}) => (
  <main className="bg-white">
    <HeroSection onOpenAudit={onOpenAudit} />
    <ProblemSection />
    <IndustrySection />
    <TypesSection />
    <FrameworkSection />
    <ProofSection />
    <FaqSection />
    <FinalCtaSection onOpenAudit={onOpenAudit} />
  </main>
);
