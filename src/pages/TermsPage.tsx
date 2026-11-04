import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  Copyright,
  Info,
  Lock,
  Mail,
  MessageSquare,
  X,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  AMENDMENTS_COPY,
  CONFIDENTIALITY_COPY,
  FORCE_MAJEURE_COPY,
  IP_COPY,
  MARKETING_COPY,
  MARKETING_PROMISE,
  MODIFICATIONS_COPY,
  MODIFICATIONS_NOTICE,
  OWNERSHIP_FLOW,
  PAYMENT_ALERT,
  PAYMENT_INTRO,
  RESPONSIBILITIES_COPY,
  RESPONSIBILITIES_NOTICE,
  REVISION_COPY,
  SERVICES_SENTENCES,
  TERMS_CONTACT_AFTER,
  TERMS_CONTACT_BEFORE,
  TERMS_CONTACT_EMAIL,
  TERMS_CONTACT_FORM_LABEL,
  TERMS_INTRO,
  TERMS_REFUND_COPY,
  TERMS_SECTIONS,
  TERMS_STATS,
  TERMINATION_COPY,
  TERMINATION_FIGURE,
  TERMINATION_FIGURE_LABEL,
  THIRD_PARTY_CHIPS,
  THIRD_PARTY_INTRO,
  THIRD_PARTY_NOTICE,
} from '../data/termsContent';
import type { TermsSectionMeta } from '../data/termsContent';

/**
 * Terms & Conditions page (`#/terms`).
 *
 * Same document architecture as the Refund & Privacy pages — hero figure
 * strip, an ownership-flow diagram, sticky TOC with scrollspy, numbered
 * sections — with consequence alerts, a 30-day figure card, and contact
 * cards closing the document.
 */
export const TermsPage: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(TERMS_SECTIONS[0].id);
  const mobileTocRef = useRef<HTMLDetailsElement>(null);

  // Scrollspy — mirrors the Navbar's probe pattern (section tops vs. scroll).
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const probe = window.scrollY + 160;
      let current = TERMS_SECTIONS[0].id;
      for (const section of TERMS_SECTIONS) {
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
          HERO — centered document header + terms figure strip
      =================================================================== */}
      <section id="terms-hero" className="relative pt-8 pb-12 md:pt-10 md:pb-14 overflow-hidden bg-white">
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
              Legal · Clear &amp; Fair
            </span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.14]"
          >
            Terms &amp; <span className="text-[#C61A1A]">Conditions</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto"
          >
            {TERMS_INTRO}
          </motion.p>

          {/* figure strip — gap-px on a slate background = perfect dividers */}
          <motion.dl
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)]"
          >
            {TERMS_STATS.map((stat) => (
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
          OWNERSHIP FLOW — small diagram: who holds the work, and when
      =================================================================== */}
      <section className="pb-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <figure className="rounded-2xl border border-slate-200 bg-slate-50/70 px-5 sm:px-8 pt-6 pb-6">
              <figcaption className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  <Copyright className="w-3.5 h-3.5" />
                  Intellectual Property · Ownership Flow
                </span>
                <button
                  type="button"
                  onClick={scrollTo('intellectual-property')}
                  className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-[#C61A1A] transition-colors"
                >
                  Read full clause
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </figcaption>

              <div className="mt-5 flex flex-col sm:flex-row items-stretch gap-3 sm:gap-2">
                {/* until payment — Digivibz holds the work */}
                <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 tabular-nums">
                    01 · {OWNERSHIP_FLOW.from.eyebrow}
                  </span>
                  <h3 className="mt-2 text-sm font-extrabold text-slate-900">
                    {OWNERSHIP_FLOW.from.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {OWNERSHIP_FLOW.from.detail}
                  </p>
                </div>

                {/* bridge — right on desktop, down in the mobile stack */}
                <div
                  className="hidden sm:flex w-24 shrink-0 flex-col items-center justify-center"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-5 h-5 text-[#C61A1A]" />
                  <span className="mt-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#C61A1A] text-center leading-tight">
                    {OWNERSHIP_FLOW.bridge}
                  </span>
                </div>
                <div
                  className="sm:hidden flex flex-col items-center justify-center"
                  aria-hidden="true"
                >
                  <ArrowDown className="w-5 h-5 text-[#C61A1A]" />
                  <span className="mt-1 text-[10px] font-extrabold uppercase tracking-wider text-[#C61A1A]">
                    {OWNERSHIP_FLOW.bridge}
                  </span>
                </div>

                {/* after payment — client takes ownership */}
                <div className="flex-1 rounded-xl border border-red-200 bg-red-50/50 p-4">
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A] tabular-nums">
                    02 · {OWNERSHIP_FLOW.to.eyebrow}
                  </span>
                  <h3 className="mt-2 text-sm font-extrabold text-slate-900">
                    {OWNERSHIP_FLOW.to.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {OWNERSHIP_FLOW.to.detail}
                  </p>
                </div>
              </div>

              {/* the carve-out — black chip, matching the site's promise styling */}
              <div className="mt-4 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-lg bg-black px-3.5 py-2">
                  <X className="w-3.5 h-3.5 text-[#C61A1A]" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
                    {OWNERSHIP_FLOW.exception}
                  </span>
                </span>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          BODY — sticky table of contents + terms sections
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
                  {TERMS_SECTIONS.map((section, index) => {
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
                {TERMS_SECTIONS.map((section, index) => {
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

            {/* ------------------------------------------- terms sections */}
            <div className="lg:col-span-9 xl:col-span-9">
              <div className="max-w-3xl">
                {TERMS_SECTIONS.map((section, index) => (
                  <TermSection key={section.id} meta={section} index={index}>
                    <SectionBody id={section.id} />
                  </TermSection>
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
const TermSection: React.FC<{
  meta: TermsSectionMeta;
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
              {String(index + 1).padStart(2, '0')} / {String(TERMS_SECTIONS.length).padStart(2, '0')}
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
   Per-section content — one renderer per shape of terms text
   ========================================================================== */
const SectionBody: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    /* ------------------------------- services (prose + scope agreement note) */
    case 'services-provided':
      return (
        <>
          <Prose>
            <p>{SERVICES_SENTENCES[0]}</p>
          </Prose>
          <Reveal delay={0.05}>
            <p className="mt-4 flex items-start gap-3 text-sm text-slate-600 leading-relaxed rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">
              <Info className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
              <span>{SERVICES_SENTENCES[1]}</span>
            </p>
          </Reveal>
        </>
      );

    /* --------------------------------- payment (prose + red consequence) */
    case 'payment-terms':
      return (
        <>
          <Prose>
            <p>{PAYMENT_INTRO[0]}</p>
          </Prose>
          <Reveal delay={0.05}>
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50/70 p-4 sm:p-5">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#C61A1A] text-white flex items-center justify-center shrink-0">
                  <Info className="w-4 h-4" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Late payments
                </span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{PAYMENT_ALERT}</p>
            </div>
          </Reveal>
        </>
      );

    /* ------------------------------------------- confidentiality (shield card) */
    case 'confidentiality':
      return (
        <Reveal delay={0.05}>
          <div className="rounded-2xl border-l-4 border-[#C61A1A] border-y border-r border-y-slate-200 border-r-slate-200 bg-white p-5 sm:p-6 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.4)]">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-[#C61A1A]" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Mutual obligation
              </span>
            </div>
            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
              {CONFIDENTIALITY_COPY}
            </p>
          </div>
        </Reveal>
      );

    /* -------------------------------------- intellectual property (plain prose) */
    case 'intellectual-property':
      return (
        <Prose>
          <p>{IP_COPY}</p>
        </Prose>
      );

    /* ------------------------------- third-party (chips + liability boundary) */
    case 'third-party-tools':
      return (
        <>
          <Prose>
            <p>{THIRD_PARTY_INTRO}</p>
          </Prose>
          <div className="mt-4 flex flex-wrap gap-2">
            {THIRD_PARTY_CHIPS.map((chip) => (
              <span
                key={chip}
                className="px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-500"
              >
                {chip}
              </span>
            ))}
          </div>
          <Reveal delay={0.05}>
            <p className="mt-4 flex items-start gap-3 text-sm text-slate-600 leading-relaxed rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">
              <Info className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
              <span>{THIRD_PARTY_NOTICE}</span>
            </p>
          </Reveal>
        </>
      );

    /* -------------------------------- responsibilities (prose + delay notice) */
    case 'client-responsibilities':
      return (
        <>
          <Prose>
            <p>{RESPONSIBILITIES_COPY}</p>
          </Prose>
          <Reveal delay={0.05}>
            <p className="mt-4 flex items-start gap-3 text-sm font-semibold text-slate-800 leading-relaxed rounded-xl bg-red-50 border border-red-100 px-4 py-3.5">
              <Info className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
              <span>{RESPONSIBILITIES_NOTICE}</span>
            </p>
          </Reveal>
        </>
      );

    /* --------------------------- contract termination (30-day figure card) */
    case 'contract-termination':
      return (
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 items-center">
            <div className="text-center sm:pr-5 sm:border-r sm:border-slate-100">
              <span className="block text-4xl font-extrabold text-[#C61A1A] tabular-nums leading-none">
                {TERMINATION_FIGURE}
              </span>
              <span className="mt-2 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                {TERMINATION_FIGURE_LABEL}
              </span>
            </div>
            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              {TERMINATION_COPY[0]}
            </p>
          </div>
        </Reveal>
      );

    case 'revision-policy':
      return (
        <Prose>
          <p>{REVISION_COPY[0]}</p>
        </Prose>
      );

    /* ---------------------------------- refund (prose + cross-page link) */
    case 'refund-policy':
      return (
        <>
          <Prose>
            <p>{TERMS_REFUND_COPY[0]}</p>
          </Prose>
          <Reveal delay={0.05}>
            <a
              href="#/refund-policy"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-[#C61A1A] hover:bg-[#C61A1A] hover:text-white hover:border-[#C61A1A] transition-colors"
            >
              Full Refund Policy
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </Reveal>
        </>
      );

    /* --------------------------------- marketing (prose + black consent box) */
    case 'marketing-permissions':
      return (
        <>
          <Prose>
            <p>{MARKETING_COPY}</p>
          </Prose>
          <Reveal delay={0.05}>
            <div className="mt-4 rounded-2xl bg-black text-white p-5 flex gap-4 items-start">
              <span className="shrink-0 w-7 h-7 rounded-lg bg-[#C61A1A] flex items-center justify-center mt-0.5">
                <Lock className="w-4 h-4 text-white" />
              </span>
              <p className="text-sm leading-relaxed text-slate-300">{MARKETING_PROMISE}</p>
            </div>
          </Reveal>
        </>
      );

    /* ------------------------------ service modifications (prose + advance note) */
    case 'service-modifications':
      return (
        <>
          <Prose>
            <p>{MODIFICATIONS_COPY}</p>
          </Prose>
          <Reveal delay={0.05}>
            <p className="mt-4 flex items-start gap-3 text-sm text-slate-600 leading-relaxed rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">
              <Info className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
              <span>{MODIFICATIONS_NOTICE}</span>
            </p>
          </Reveal>
        </>
      );

    /* ------------------------------------------ force majeure (emphasis card) */
    case 'force-majeure':
      return (
        <Reveal delay={0.05}>
          <div className="rounded-2xl border-l-4 border-[#C61A1A] border-y border-r border-y-slate-200 border-r-slate-200 bg-white p-5 sm:p-6 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.4)]">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-[#C61A1A]" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Events beyond reasonable control
              </span>
            </div>
            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
              {FORCE_MAJEURE_COPY}
            </p>
          </div>
        </Reveal>
      );

    case 'amendments':
      return (
        <Prose>
          <p>{AMENDMENTS_COPY}</p>
        </Prose>
      );

    /* ------------------------------------------------- contact (with links) */
    case 'contact-us':
      return (
        <>
          <Prose>
            <p>
              {TERMS_CONTACT_BEFORE}{' '}
              <a
                href={`mailto:${TERMS_CONTACT_EMAIL}`}
                className="font-bold text-[#C61A1A] hover:underline underline-offset-2"
              >
                {TERMS_CONTACT_EMAIL}
              </a>{' '}
              {TERMS_CONTACT_AFTER}{' '}
              <a
                href="#/contact"
                className="font-bold text-[#C61A1A] hover:underline underline-offset-2"
              >
                {TERMS_CONTACT_FORM_LABEL}
              </a>
              .
            </p>
          </Prose>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <Reveal delay={0.05}>
              <a
                href={`mailto:${TERMS_CONTACT_EMAIL}`}
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
                    {TERMS_CONTACT_EMAIL}
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
