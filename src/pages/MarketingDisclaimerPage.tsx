import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ArrowDown,
  ChevronDown,
  Info,
  Mail,
  MessageSquare,
  X,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  CASE_STUDIES_COPY,
  CASE_STUDIES_NOTICE,
  CHANGES_COPY,
  CLIENT_FACTORS_COPY,
  CLIENT_FACTORS_NOTICE,
  COMPLIANCE_ALERT,
  COMPLIANCE_COPY,
  DISCLAIMER_CONTACT_AFTER,
  DISCLAIMER_CONTACT_BEFORE,
  DISCLAIMER_CONTACT_EMAIL,
  DISCLAIMER_CONTACT_FORM_LABEL,
  DISCLAIMER_INTRO,
  DISCLAIMER_SECTIONS,
  DISCLAIMER_STATS,
  INFLUENCE_BRIDGE,
  INFLUENCE_OUTPUT,
  INFLUENCE_SOURCES,
  NO_ADVICE_SENTENCE,
  NO_GUARANTEE_ALERT,
  NO_GUARANTEE_INTRO,
  PLATFORMS_COPY,
  PLATFORMS_NOTICE,
  TIMEFRAMES_COPY,
  TIMEFRAMES_NOTICE,
} from '../data/disclaimerContent';
import type { DisclaimerSectionMeta } from '../data/disclaimerContent';

/**
 * Marketing Results Disclaimer page (`#/marketing-disclaimer`).
 *
 * Same document architecture as the other legal pages — hero figure strip,
 * sticky TOC with scrollspy, numbered sections — with a new signature
 * visual: a results-influence map (three spheres feeding an output
 * range-meter) that shows why outcomes vary instead of being guaranteed.
 */
export const MarketingDisclaimerPage: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(DISCLAIMER_SECTIONS[0].id);
  const mobileTocRef = useRef<HTMLDetailsElement>(null);

  // Scrollspy — mirrors the Navbar's probe pattern (section tops vs. scroll).
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const probe = window.scrollY + 160;
      let current = DISCLAIMER_SECTIONS[0].id;
      for (const section of DISCLAIMER_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= probe) current = section.id;
      }
      setActiveId(current);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /**
   * In-page scroll WITHOUT touching the hash — this app hashes every route,
   * so a plain `#section-id` href would bounce back to the home page.
   */
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
    if (mobileTocRef.current) mobileTocRef.current.open = false;
  };

  return (
    <div className="bg-white">
      {/* ==================================================================
          HERO — centered document header + disclaimer figure strip
      =================================================================== */}
      <section id="disclaimer-hero" className="relative pt-8 pb-12 md:pt-10 md:pb-14 overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,#000_65%,transparent_100%)] opacity-70 -z-10 pointer-events-none"
        />
        {!reduceMotion && (
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[320px] rounded-full -z-10 pointer-events-none opacity-60 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(198,26,26,0.10) 0%, transparent 70%)',
              animation: 'dz-drift 16s ease-in-out infinite',
            }}
          />
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-[11px] font-bold text-[#C61A1A] uppercase tracking-widest shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              Legal · Honest Expectations
            </span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.14]"
          >
            Marketing Results <span className="text-[#C61A1A]">Disclaimer</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto"
          >
            {DISCLAIMER_INTRO.lead}
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            {DISCLAIMER_INTRO.sub}
          </motion.p>

          {/* figure strip — gap-px on a slate background = perfect dividers */}
          <motion.dl
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)]"
          >
            {DISCLAIMER_STATS.map((stat) => (
              <div key={stat.label} className="bg-white px-4 py-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl sm:text-[26px] font-extrabold text-[#C61A1A] tabular-nums leading-none">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-[11px] font-semibold text-slate-500 leading-snug">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* ==================================================================
          RESULTS INFLUENCE MAP — three spheres feeding a range-meter output
      =================================================================== */}
      <section className="pb-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <figure className="rounded-2xl border border-slate-200 bg-slate-50/70 px-5 sm:px-7 pt-6 pb-6">
              <figcaption className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  <Activity className="w-3.5 h-3.5" />
                  Results Influence · What Shapes Your Outcomes
                </span>
                <span className="hidden sm:inline text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  Three spheres, one range
                </span>
              </figcaption>

              {/* three source spheres */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {INFLUENCE_SOURCES.map((source, i) => (
                  <div
                    key={source.eyebrow}
                    className={`rounded-xl border p-4 ${i === 0 ? 'border-red-200 bg-red-50/50' : 'border-slate-200 bg-white'}`}
                  >
                    <span
                      className={`block text-[10px] font-extrabold uppercase tracking-widest tabular-nums ${
                        i === 0 ? 'text-[#C61A1A]' : 'text-slate-400'
                      }`}
                    >
                      {source.eyebrow}
                    </span>
                    <h3 className="mt-1.5 text-sm font-extrabold text-slate-900">{source.title}</h3>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {source.chips.map((chip) => (
                        <span
                          key={chip}
                          className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${
                            i === 0
                              ? 'bg-white border-red-100 text-[#C61A1A]'
                              : 'bg-slate-100 border-slate-200 text-slate-500'
                          }`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                    {/* dashed leg toward the output */}
                    <span
                      aria-hidden="true"
                      className="mx-auto mt-3 block w-0 h-4 border-l border-dashed border-slate-300"
                    />
                  </div>
                ))}
              </div>

              {/* bridge into the output */}
              <div className="flex flex-col items-center justify-center mt-1" aria-hidden="true">
                <ArrowDown className="w-5 h-5 text-[#C61A1A]" />
                <span className="mt-1 text-[10px] font-extrabold uppercase tracking-wider text-[#C61A1A]">
                  {INFLUENCE_BRIDGE}
                </span>
              </div>

              {/* output panel — estimate range, not a guarantee */}
              <div className="mt-3 max-w-xl mx-auto rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                <span className="block text-center text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  {INFLUENCE_OUTPUT.eyebrow}
                </span>

                <div className="mt-4 relative h-2 rounded-full bg-white border border-dashed border-slate-300">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 h-2 w-[34%] rounded-full bg-[#C61A1A]" />
                </div>
                <div className="mt-2 grid grid-cols-3 text-[10px] font-bold text-slate-400">
                  <span className="text-left">{INFLUENCE_OUTPUT.leftEnd}</span>
                  <span className="text-center text-[#C61A1A] font-extrabold uppercase tracking-wider">
                    {INFLUENCE_OUTPUT.center}
                  </span>
                  <span className="text-right">{INFLUENCE_OUTPUT.rightEnd}</span>
                </div>

                <div className="mt-4 flex justify-center">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-black px-3.5 py-2">
                    <X className="w-3.5 h-3.5 text-[#C61A1A]" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
                      {INFLUENCE_OUTPUT.chip}
                    </span>
                  </span>
                </div>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          BODY — sticky table of contents + disclaimer sections
      =================================================================== */}
      <section className="pb-16 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-10">

            {/* ---------------------------------------------- desktop TOC */}
            <aside className="hidden lg:block lg:col-span-3">
              <nav aria-label="Table of contents" className="sticky top-24">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-4 pb-3">
                  On This Page
                </div>
                <ul className="max-h-[calc(100vh-9rem)] overflow-y-auto pr-1 space-y-0.5">
                  {DISCLAIMER_SECTIONS.map((section, index) => {
                    const active = activeId === section.id;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={scrollTo(section.id)}
                          aria-current={active ? 'true' : undefined}
                          className={`flex items-center gap-2.5 border-l-2 pl-3.5 pr-2 py-2 text-[13px] leading-snug transition-colors ${
                            active
                              ? 'border-[#C61A1A] text-[#C61A1A] font-bold bg-red-50/70 rounded-r-lg'
                              : 'border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                          }`}
                        >
                          <span className={`text-[10px] font-extrabold tabular-nums shrink-0 ${active ? 'text-[#C61A1A]' : 'text-slate-300'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {section.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* ------------------------------------- mobile TOC (collapsible) */}
            <details
              ref={mobileTocRef}
              className="group lg:hidden col-span-1 rounded-2xl border border-slate-200 bg-white overflow-hidden"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none text-sm font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
                <span>On This Page</span>
                <ChevronDown className="w-4 h-4 text-[#C61A1A] transition-transform group-open:rotate-180" />
              </summary>
              <ul className="border-t border-slate-100 p-2 max-h-[60vh] overflow-y-auto">
                {DISCLAIMER_SECTIONS.map((section, index) => {
                  const active = activeId === section.id;
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={scrollTo(section.id)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          active ? 'bg-red-50 text-[#C61A1A] font-bold' : 'text-slate-600'
                        }`}
                      >
                        <span className={`text-[10px] font-extrabold tabular-nums ${active ? 'text-[#C61A1A]' : 'text-slate-300'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {section.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </details>

            {/* ------------------------------------------- disclaimer sections */}
            <div className="lg:col-span-9 xl:col-span-9">
              <div className="max-w-3xl">
                {DISCLAIMER_SECTIONS.map((section, index) => (
                  <DisclaimerSection key={section.id} meta={section} index={index}>
                    <SectionBody id={section.id} />
                  </DisclaimerSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   Section shell — numbered header with the section's icon
   ========================================================================== */
const DisclaimerSection: React.FC<{
  meta: DisclaimerSectionMeta;
  index: number;
  children: React.ReactNode;
}> = ({ meta, index, children }) => {
  const Icon = meta.icon;
  return (
    <section
      id={meta.id}
      className={`pt-10 mt-10 ${index === 0 ? '!mt-0 !pt-0' : 'border-t border-slate-100'}`}
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="shrink-0 w-11 h-11 rounded-xl bg-red-50 text-[#C61A1A] flex items-center justify-center border border-red-100">
            <Icon className="w-5 h-5" />
          </span>
          <div className="min-w-0">
            <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(DISCLAIMER_SECTIONS.length).padStart(2, '0')}
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {meta.label}
            </h2>
          </div>
        </div>
      </Reveal>
      <div className="mt-5">{children}</div>
    </section>
  );
};

/* ==========================================================================
   Per-section content — one renderer per shape of disclaimer text
   ========================================================================== */
const SectionBody: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    /* ----------------------------- no guaranteed results (prose + red alert) */
    case 'no-guaranteed-results':
      return (
        <>
          <Prose>
            <p>{NO_GUARANTEE_INTRO}</p>
          </Prose>
          <Reveal delay={0.05}>
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50/70 p-4 sm:p-5">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#C61A1A] text-white flex items-center justify-center shrink-0">
                  <X className="w-4 h-4" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  No guaranteed outcomes
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{NO_GUARANTEE_ALERT}</p>
            </div>
          </Reveal>
        </>
      );

    /* --------------------------------- case studies (prose + illustration note) */
    case 'case-studies':
      return (
        <>
          <Prose>
            <p>{CASE_STUDIES_COPY}</p>
          </Prose>
          <Reveal delay={0.05}>
            <p className="mt-4 flex items-start gap-3 text-sm text-slate-600 leading-relaxed rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">
              <Info className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
              <span>{CASE_STUDIES_NOTICE}</span>
            </p>
          </Reveal>
        </>
      );

    /* ------------------------------------------------- timeframes (prose + range note) */
    case 'timeframes':
      return (
        <>
          <Prose>
            <p>{TIMEFRAMES_COPY}</p>
          </Prose>
          <Reveal delay={0.05}>
            <p className="mt-4 flex items-start gap-3 text-sm font-semibold text-slate-800 leading-relaxed rounded-xl bg-red-50 border border-red-100 px-4 py-3.5">
              <Info className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
              <span>{TIMEFRAMES_NOTICE}</span>
            </p>
          </Reveal>
        </>
      );

    /* ------------------------------- third-party (prose + red-border boundary) */
    case 'third-party-platforms':
      return (
        <>
          <Prose>
            <p>{PLATFORMS_COPY}</p>
          </Prose>
          <Reveal delay={0.05}>
            <div className="mt-4 rounded-2xl border-l-4 border-[#C61A1A] border-y border-r border-y-slate-200 border-r-slate-200 bg-white p-5 sm:p-6 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.4)]">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2.5">
                No control over platform changes
              </span>
              <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">{PLATFORMS_NOTICE}</p>
            </div>
          </Reveal>
        </>
      );

    /* --------------------------------- client factors (prose + delay notice) */
    case 'client-dependent-factors':
      return (
        <>
          <Prose>
            <p>{CLIENT_FACTORS_COPY}</p>
          </Prose>
          <Reveal delay={0.05}>
            <p className="mt-4 flex items-start gap-3 text-sm font-semibold text-slate-800 leading-relaxed rounded-xl bg-red-50 border border-red-100 px-4 py-3.5">
              <Info className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
              <span>{CLIENT_FACTORS_NOTICE}</span>
            </p>
          </Reveal>
        </>
      );

    /* ------------------------------- compliance (prose + red liability alert) */
    case 'compliance-responsibility':
      return (
        <>
          <Prose>
            <p>{COMPLIANCE_COPY}</p>
          </Prose>
          <Reveal delay={0.05}>
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50/70 p-4 sm:p-5">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#C61A1A] text-white flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Client-side compliance
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{COMPLIANCE_ALERT}</p>
            </div>
          </Reveal>
        </>
      );

    /* ------------------------------- no financial advice (single emphasis card) */
    case 'no-financial-advice':
      return (
        <Reveal delay={0.05}>
          <div className="rounded-2xl border-l-4 border-[#C61A1A] border-y border-r border-y-slate-200 border-r-slate-200 bg-white p-5 sm:p-6 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.4)]">
            <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2.5">
              Informational purposes only
            </span>
            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">{NO_ADVICE_SENTENCE}</p>
          </div>
        </Reveal>
      );

    case 'changes-to-disclaimer':
      return (
        <Prose>
          {CHANGES_COPY.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </Prose>
      );

    /* ------------------------------------------------- contact (with links) */
    case 'contact-us':
      return (
        <>
          <Prose>
            <p>
              {DISCLAIMER_CONTACT_BEFORE}{' '}
              <a
                href={`mailto:${DISCLAIMER_CONTACT_EMAIL}`}
                className="font-bold text-[#C61A1A] hover:underline underline-offset-2"
              >
                {DISCLAIMER_CONTACT_EMAIL}
              </a>{' '}
              {DISCLAIMER_CONTACT_AFTER}{' '}
              <a
                href="#/contact"
                className="font-bold text-[#C61A1A] hover:underline underline-offset-2"
              >
                {DISCLAIMER_CONTACT_FORM_LABEL}
              </a>
              .
            </p>
          </Prose>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <Reveal delay={0.05}>
              <a
                href={`mailto:${DISCLAIMER_CONTACT_EMAIL}`}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:border-red-200 hover:shadow-[0_18px_40px_-32px_rgba(198,26,26,0.45)] transition-all h-full"
              >
                <span className="shrink-0 w-11 h-11 rounded-xl bg-red-50 text-[#C61A1A] flex items-center justify-center border border-red-100">
                  <Mail className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    Email us
                  </span>
                  <span className="block text-sm font-bold text-slate-900 group-hover:text-[#C61A1A] transition-colors break-words">
                    {DISCLAIMER_CONTACT_EMAIL}
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="#/contact"
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 hover:border-red-200 hover:shadow-[0_18px_40px_-32px_rgba(198,26,26,0.45)] transition-all h-full"
              >
                <span className="shrink-0 w-11 h-11 rounded-xl bg-red-50 text-[#C61A1A] flex items-center justify-center border border-red-100">
                  <MessageSquare className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    Prefer writing?
                  </span>
                  <span className="block text-sm font-bold text-slate-900 group-hover:text-[#C61A1A] transition-colors">
                    Use our contact form
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </>
      );

    default:
      return null;
  }
};

/* ==========================================================================
   Small building block shared by several sections
   ========================================================================== */

/** Consistent prose rhythm (site-wide body sizes). */
const Prose: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <Reveal delay={0.04} className={`space-y-3.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed ${className}`}>
    {children}
  </Reveal>
);
