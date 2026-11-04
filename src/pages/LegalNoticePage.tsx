import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronDown,
  Info,
  Mail,
  MessageSquare,
  Globe,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  ACCURACY_COPY,
  ACCURACY_NOTICE,
  CHANGES_COPY,
  COMPANY_FIELDS,
  COMPANY_LINKS,
  EXTERNAL_COPY,
  EXTERNAL_NOTICE,
  GOVERNANCE_MAP,
  GOVERNING_COPY,
  IP_COPY,
  IP_NOTICE,
  LEGAL_CONTACT_AFTER,
  LEGAL_CONTACT_BEFORE,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CONTACT_FORM_LABEL,
  LEGAL_NOTICE_INTRO,
  LEGAL_NOTICE_SECTIONS,
  LEGAL_NOTICE_STATS,
  LIABILITY_COPY,
  LIABILITY_RISK,
  POLICY_LINKS,
  PURPOSE_COPY,
  RELATED_COPY,
} from '../data/legalNoticeContent';
import type { LegalNoticeSectionMeta } from '../data/legalNoticeContent';

/**
 * Legal Notice page (`#/legal-notice`).
 *
 * Same document architecture as the other legal pages — hero figure strip,
 * sticky TOC with scrollspy, numbered sections — with a new signature
 * visual: a hub-and-spoke governance map (the client relationship at the
 * center, the four related policies hanging off a dashed bus) stamped with
 * an official seal.
 */
export const LegalNoticePage: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(LEGAL_NOTICE_SECTIONS[0].id);
  const mobileTocRef = useRef<HTMLDetailsElement>(null);

  // Scrollspy — mirrors the Navbar's probe pattern (section tops vs. scroll).
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const probe = window.scrollY + 160;
      let current = LEGAL_NOTICE_SECTIONS[0].id;
      for (const section of LEGAL_NOTICE_SECTIONS) {
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

  const SealIcon = GOVERNANCE_MAP.icon;

  return (
    <div className="bg-white">
      {/* ==================================================================
          HERO — centered document header + legal figure strip
      =================================================================== */}
      <section id="legal-hero" className="relative pt-8 pb-12 md:pt-10 md:pb-14 overflow-hidden bg-white">
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
              Legal · Official Information
            </span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.14]"
          >
            Legal <span className="text-[#C61A1A]">Notice</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto"
          >
            {LEGAL_NOTICE_INTRO}
          </motion.p>

          {/* figure strip — gap-px on a slate background = perfect dividers */}
          <motion.dl
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)]"
          >
            {LEGAL_NOTICE_STATS.map((stat) => (
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
          GOVERNANCE MAP — hub-and-spoke: relationship at center, four
          policy nodes hanging off a dashed bus, stamped "official"
      =================================================================== */}
      <section className="pb-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <figure className="relative rounded-2xl border border-slate-200 bg-slate-50/70 px-5 sm:px-7 pt-6 pb-6 overflow-hidden">
              <figcaption className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  <Globe className="w-3.5 h-3.5" />
                  Legal Notice · Governance Map
                </span>
                <span className="hidden sm:inline text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  {GOVERNANCE_MAP.captionRight}
                </span>
              </figcaption>

              {/* the seal — rotated stamp in the corner */}
              <span
                aria-hidden="true"
                className="absolute top-14 right-4 sm:right-7 rotate-[-9deg] w-[74px] h-[74px] rounded-full border-2 border-[#C61A1A]/70 bg-white/80 flex flex-col items-center justify-center gap-0.5 pointer-events-none"
              >
                <span className="absolute inset-1 rounded-full border border-dashed border-[#C61A1A]/50" />
                <SealIcon className="w-4 h-4 text-[#C61A1A] relative" />
                <span className="text-[8px] font-extrabold uppercase tracking-widest text-[#C61A1A] relative">
                  {GOVERNANCE_MAP.seal}
                </span>
                <span className="text-[6px] font-bold uppercase tracking-[0.2em] text-[#C61A1A]/80 relative">
                  Digivibz
                </span>
              </span>

              <div className="mt-4 flex flex-col items-center">
                {/* center hub — the relationship being governed */}
                <div className="max-w-xs rounded-2xl bg-black text-white px-6 py-4 text-center border border-black">
                  <span className="block text-[9px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                    {GOVERNANCE_MAP.hub.eyebrow}
                  </span>
                  <span className="mt-1.5 block text-sm font-extrabold leading-snug">
                    {GOVERNANCE_MAP.hub.title}
                  </span>
                </div>

                {/* trunk down to the bus */}
                <span
                  aria-hidden="true"
                  className="w-0 h-5 border-l border-dashed border-slate-300"
                />
                <span
                  aria-hidden="true"
                  className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 -mt-px"
                >
                  {GOVERNANCE_MAP.busLabel}
                </span>

                {/* horizontal bus + four policy nodes on dashed legs */}
                <div className="w-full max-w-3xl mt-3">
                  <div className="hidden sm:block w-full border-t border-dashed border-slate-300" aria-hidden="true" />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-3 sm:gap-y-0">
                    {POLICY_LINKS.map((policy) => {
                      const Icon = policy.icon;
                      return (
                        <div key={policy.href} className="flex flex-col items-center">
                          {/* leg down from the bus (mobile: from the trunk) */}
                          <span
                            aria-hidden="true"
                            className="sm:hidden w-0 h-4 border-l border-dashed border-slate-300"
                          />
                          <span
                            aria-hidden="true"
                            className="hidden sm:block w-0 h-5 border-l border-dashed border-slate-300"
                          />
                          <a
                            href={policy.href}
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 flex flex-col items-center gap-1.5 text-center hover:border-red-200 hover:shadow-[0_14px_32px_-26px_rgba(198,26,26,0.5)] transition-all group"
                          >
                            <span className="w-7 h-7 rounded-lg bg-red-50 text-[#C61A1A] flex items-center justify-center border border-red-100">
                              <Icon className="w-3.5 h-3.5" />
                            </span>
                            <span className="text-[11px] font-bold text-slate-700 group-hover:text-[#C61A1A] transition-colors leading-snug">
                              {policy.label}
                            </span>
                            <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-[#C61A1A] transition-colors" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          BODY — sticky table of contents + legal notice sections
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
                  {LEGAL_NOTICE_SECTIONS.map((section, index) => {
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
                {LEGAL_NOTICE_SECTIONS.map((section, index) => {
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

            {/* ------------------------------------------- notice sections */}
            <div className="lg:col-span-9 xl:col-span-9">
              <div className="max-w-3xl">
                {LEGAL_NOTICE_SECTIONS.map((section, index) => (
                  <NoticeSection key={section.id} meta={section} index={index}>
                    <SectionBody id={section.id} />
                  </NoticeSection>
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
const NoticeSection: React.FC<{
  meta: LegalNoticeSectionMeta;
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
              {String(index + 1).padStart(2, '0')} / {String(LEGAL_NOTICE_SECTIONS.length).padStart(2, '0')}
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
   Per-section content — one renderer per shape of notice text
   ========================================================================== */
const SectionBody: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    /* ----------------------- company information (official record card) */
    case 'company-information':
      return (
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_16px_40px_-34px_rgba(15,23,42,0.4)]">
            <div className="flex items-center gap-2.5 px-5 py-3.5 bg-black">
              <span className="w-6 h-6 rounded-md bg-[#C61A1A] flex items-center justify-center shrink-0">
                <Info className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white">
                Official company record
              </span>
            </div>
            <dl className="divide-y divide-slate-100">
              {COMPANY_FIELDS.map((field) => (
                <div
                  key={field.label}
                  className="grid grid-cols-1 sm:grid-cols-[10.5rem_1fr] gap-1 sm:gap-4 px-5 py-3.5"
                >
                  <dt className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 pt-1">
                    {field.label}:
                  </dt>
                  <dd className="text-sm text-slate-700 leading-relaxed break-words">
                    {field.label === 'Email' ? (
                      <a
                        href={`mailto:${COMPANY_LINKS.email}`}
                        className="font-bold text-[#C61A1A] hover:underline underline-offset-2"
                      >
                        {field.value}
                      </a>
                    ) : field.label === 'Phone' ? (
                      <a
                        href={COMPANY_LINKS.phoneHref}
                        className="font-bold text-[#C61A1A] hover:underline underline-offset-2"
                      >
                        {field.value}
                      </a>
                    ) : field.label === 'Business Address' ? (
                      <span className="inline-block rounded-md border border-dashed border-slate-300 bg-slate-50 px-2.5 py-1 text-slate-500">
                        {field.value}
                      </span>
                    ) : (
                      field.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      );

    /* --------------------------------- purpose (prose + advice boundary) */
    case 'purpose-of-website':
      return (
        <>
          <Prose>
            <p>{PURPOSE_COPY[0]}</p>
          </Prose>
          <Reveal delay={0.05}>
            <p className="mt-4 flex items-start gap-3 text-sm text-slate-600 leading-relaxed rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">
              <Info className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
              <span>{PURPOSE_COPY[1]}</span>
            </p>
          </Reveal>
        </>
      );

    /* -------------------------------------- IP (prose + black permission) */
    case 'intellectual-property':
      return (
        <>
          <Prose>
            <p>{IP_COPY}</p>
          </Prose>
          <Reveal delay={0.05}>
            <div className="mt-4 rounded-2xl bg-black text-white p-5 flex gap-4 items-start">
              <span className="shrink-0 w-7 h-7 rounded-lg bg-[#C61A1A] flex items-center justify-center mt-0.5">
                <Info className="w-4 h-4 text-white" />
              </span>
              <p className="text-sm leading-relaxed text-slate-300">{IP_NOTICE}</p>
            </div>
          </Reveal>
        </>
      );

    /* --------------------------------- accuracy (prose + correction note) */
    case 'accuracy-of-information':
      return (
        <>
          <Prose>
            <p>{ACCURACY_COPY}</p>
          </Prose>
          <Reveal delay={0.05}>
            <p className="mt-4 flex items-start gap-3 text-sm font-semibold text-slate-800 leading-relaxed rounded-xl bg-red-50 border border-red-100 px-4 py-3.5">
              <Info className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
              <span>{ACCURACY_NOTICE}</span>
            </p>
          </Reveal>
        </>
      );

    /* ------------------------------- external links (prose + discretion) */
    case 'external-links':
      return (
        <>
          <Prose>
            <p>{EXTERNAL_COPY}</p>
          </Prose>
          <Reveal delay={0.05}>
            <div className="mt-4 rounded-2xl border-l-4 border-[#C61A1A] border-y border-r border-y-slate-200 border-r-slate-200 bg-white p-5 sm:p-6 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.4)]">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2.5">
                Visiting linked sites is at your own discretion
              </span>
              <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                {EXTERNAL_NOTICE}
              </p>
            </div>
          </Reveal>
        </>
      );

    /* ---------------------- limitation of liability (emphasis + risk chip) */
    case 'limitation-of-liability':
      return (
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-red-200 bg-red-50/70 p-4 sm:p-5">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-7 h-7 rounded-lg bg-[#C61A1A] text-white flex items-center justify-center shrink-0">
                <Info className="w-4 h-4" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C61A1A]">
                Use of this website is at your own risk
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{LIABILITY_COPY}</p>
            <p className="mt-3 text-sm font-bold text-slate-900">{LIABILITY_RISK}</p>
          </div>
        </Reveal>
      );

    case 'governing-law':
      return (
        <Prose>
          <p>{GOVERNING_COPY}</p>
        </Prose>
      );

    /* --------------------------- related policies (prose + cross-links) */
    case 'related-policies':
      return (
        <>
          <Prose>
            <p>{RELATED_COPY}</p>
          </Prose>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            {POLICY_LINKS.map((policy) => {
              const Icon = policy.icon;
              return (
                <Reveal key={policy.href} delay={0.04}>
                  <a
                    href={policy.href}
                    className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 h-full hover:border-red-200 hover:shadow-[0_14px_32px_-26px_rgba(198,26,26,0.5)] transition-all"
                  >
                    <span className="shrink-0 w-9 h-9 rounded-lg bg-red-50 text-[#C61A1A] flex items-center justify-center border border-red-100">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0 text-sm font-bold text-slate-800 group-hover:text-[#C61A1A] transition-colors leading-snug">
                      {policy.label}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-auto shrink-0 text-slate-300 group-hover:text-[#C61A1A] transition-colors" />
                  </a>
                </Reveal>
              );
            })}
          </div>
        </>
      );

    case 'changes-to-notice':
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
              {LEGAL_CONTACT_BEFORE}{' '}
              <a
                href={`mailto:${LEGAL_CONTACT_EMAIL}`}
                className="font-bold text-[#C61A1A] hover:underline underline-offset-2"
              >
                {LEGAL_CONTACT_EMAIL}
              </a>{' '}
              {LEGAL_CONTACT_AFTER}{' '}
              <a
                href="#/contact"
                className="font-bold text-[#C61A1A] hover:underline underline-offset-2"
              >
                {LEGAL_CONTACT_FORM_LABEL}
              </a>
              .
            </p>
          </Prose>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <Reveal delay={0.05}>
              <a
                href={`mailto:${LEGAL_CONTACT_EMAIL}`}
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
                    {LEGAL_CONTACT_EMAIL}
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
