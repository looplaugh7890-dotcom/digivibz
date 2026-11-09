import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowDown,
  ArrowRight,
  Ban,
  Check,
  ChevronDown,
  Cookie,
  Database,
  Lock,
  Mail,
  MessageSquare,
  Network,
  Package,
  Quote,
  Scale,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  CHANGES_COPY,
  CHILDREN_COPY,
  COOKIES_INTRO,
  COOKIES_LEAD,
  COLLECT_BLOCKS,
  CONTACT_AFTER,
  CONTACT_BEFORE,
  CONTACT_EMAIL,
  CONTACT_FORM_LABEL,
  COOKIE_TYPES,
  PERSONAL_NOTE,
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
  PRIVACY_STATS,
  PROMISE_CARDS,
  RETENTION_COPY,
  RIGHTS_CLOSING,
  RIGHTS_ITEMS,
  RIGHTS_LEAD,
  SECURITY_COPY,
  SHARE_LAW,
  SHARE_MAIN,
  USE_ITEMS,
  USE_LEAD,
} from '../data/privacyContent';
import type { PrivacySectionMeta } from '../data/privacyContent';

/** Promise-card icons by title (titles come from the data file). */
const PROMISE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Never sold': Ban,
  'In-house only': Users,
  'Lawful disclosure': Scale,
};

/**
 * Privacy Policy page (`/privacy-policy`).
 *
 * Same document architecture as the Refund page — sticky TOC with scrollspy,
 * numbered sections, rule lists — with a signed personal note up top, a
 * figure strip, three collection cards, cookie-type cards, and an "In short"
 * promise recap at the end.
 */
export const PrivacyPolicyPage: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(PRIVACY_SECTIONS[0].id);
  const mobileTocRef = useRef<HTMLDetailsElement>(null);

  // Scrollspy — mirrors the Navbar's probe pattern (section tops vs. scroll).
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const probe = window.scrollY + 160;
      let current = PRIVACY_SECTIONS[0].id;
      for (const section of PRIVACY_SECTIONS) {
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
          HERO — centered document header + privacy figure strip
      =================================================================== */}
      <section id="privacy-hero" className="relative pt-8 pb-12 md:pt-10 md:pb-14 overflow-hidden bg-white">
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
              Legal · Privacy by Design
            </span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.14]"
          >
            Privacy <span className="text-[#C61A1A]">Policy</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto text-left sm:text-center"
          >
            {PRIVACY_INTRO.lead}
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            {PRIVACY_INTRO.sub}
          </motion.p>

          {/* figure strip — gap-px on a slate background = perfect dividers */}
          <motion.dl
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)]"
          >
            {PRIVACY_STATS.map((stat) => (
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
          PERSONAL NOTE — the one signed, non-policy addition
      =================================================================== */}
      <section className="pb-2 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl bg-black text-white px-5 sm:px-7 py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="flex gap-4 items-start min-w-0">
                <span className="shrink-0 w-9 h-9 rounded-full bg-[#C61A1A] flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </span>
                <p className="text-sm leading-relaxed text-slate-300 max-w-3xl">
                  <span className="text-white font-bold">A note before you read: </span>
                  {PERSONAL_NOTE.text}
                </p>
              </div>
              <span className="shrink-0 text-sm font-extrabold text-[#C61A1A] sm:text-right">
                {PERSONAL_NOTE.signature}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          DATA FLOW — small diagram: collected → in-house → your project,
          with the third-party branch visibly blocked
      =================================================================== */}
      <section className="pt-4 pb-4 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <figure className="rounded-2xl border border-slate-200 bg-slate-50/70 px-5 sm:px-7 pt-6 pb-6">
              <figcaption className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  <Network className="w-3.5 h-3.5" />
                  Data Flow · Where Your Information Goes
                </span>
                <span className="hidden sm:inline text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  In-house only
                </span>
              </figcaption>

              <div className="mt-5 flex flex-col sm:flex-row items-stretch gap-3 sm:gap-2">
                {/* 01 — what comes in */}
                <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold tabular-nums text-slate-300">01</span>
                    <Database className="w-4 h-4 text-slate-300" />
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold text-slate-900">Your data</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {['Forms', 'Quotes', 'Cookies', 'Analytics'].map((chip) => (
                      <span
                        key={chip}
                        className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                <FlowArrow />

                {/* 02 — in-house vault with the blocked third-party branch */}
                <div className="flex-1 rounded-xl border border-red-200 bg-red-50/50 p-4 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold tabular-nums text-[#C61A1A]">02</span>
                    <ShieldCheck className="w-4 h-4 text-[#C61A1A]" />
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold text-slate-900">Digivibz in-house</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Handled exclusively by our in-house team
                  </p>

                  {/* blocked path: dashed rail crossed out, ending in a black chip */}
                  <div className="mt-auto pt-3">
                    <div className="flex items-center gap-2" aria-hidden="true">
                      <span className="flex-1 border-t border-dashed border-slate-300" />
                      <span className="w-5 h-5 rounded-full bg-white border border-[#C61A1A] text-[#C61A1A] flex items-center justify-center">
                        <X className="w-3 h-3" />
                      </span>
                      <span className="flex-1 border-t border-dashed border-slate-300" />
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-black px-3 py-2">
                      <Ban className="w-3.5 h-3.5 text-[#C61A1A]" />
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
                        No third-party sale
                      </span>
                    </div>
                  </div>
                </div>

                <FlowArrow />

                {/* 03 — where it ends up */}
                <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold tabular-nums text-slate-300">03</span>
                    <Package className="w-4 h-4 text-slate-300" />
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold text-slate-900">Your project</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Deliver and manage your services
                  </p>
                </div>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          BODY — sticky table of contents + policy sections
      =================================================================== */}
      <section className="pb-16 border-t border-slate-100 mt-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-10">

            {/* ---------------------------------------------- desktop TOC */}
            <aside className="hidden lg:block lg:col-span-3">
              <nav aria-label="Table of contents" className="sticky top-24">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-4 pb-3">
                  On This Page
                </div>
                <ul className="max-h-[calc(100vh-9rem)] overflow-y-auto pr-1 space-y-0.5">
                  {PRIVACY_SECTIONS.map((section, index) => {
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
                {PRIVACY_SECTIONS.map((section, index) => {
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

            {/* ------------------------------------------- policy sections */}
            <div className="lg:col-span-9 xl:col-span-9">
              <div className="max-w-3xl">
                {PRIVACY_SECTIONS.map((section, index) => (
                  <PolicySection key={section.id} meta={section} index={index}>
                    <SectionBody id={section.id} />
                  </PolicySection>
                ))}

                {/* ---------------------------------- "in short" promise recap */}
                <Reveal delay={0.05}>
                  <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="w-7 h-7 rounded-lg bg-[#C61A1A] text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                        In short — our promise
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {PROMISE_CARDS.map((card) => {
                        const CardIcon = PROMISE_ICONS[card.title] ?? Check;
                        return (
                          <div key={card.title} className="rounded-xl bg-white border border-slate-200 p-4">
                            <span className="w-8 h-8 rounded-lg bg-red-50 text-[#C61A1A] flex items-center justify-center">
                              <CardIcon className="w-4 h-4" />
                            </span>
                            <h3 className="mt-3 text-sm font-extrabold text-slate-900">{card.title}</h3>
                            <p className="mt-1 text-xs text-slate-500 leading-relaxed">{card.body}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
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
const PolicySection: React.FC<{
  meta: PrivacySectionMeta;
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
              {String(index + 1).padStart(2, '0')} / {String(PRIVACY_SECTIONS.length).padStart(2, '0')}
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
   Per-section content — one renderer per shape of policy text
   ========================================================================== */
const SectionBody: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    /* --------------------------------- information we collect (3 cards) */
    case 'information-we-collect':
      return (
        <div className="space-y-4">
          {COLLECT_BLOCKS.map((block, i) => {
            const BlockIcon = block.icon;
            return (
              <Reveal key={block.title} delay={0.05 * i}>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 flex gap-4 hover:border-red-200 transition-colors">
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-red-50 text-[#C61A1A] flex items-center justify-center border border-red-100">
                    <BlockIcon className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 tabular-nums">
                      Category {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-0.5 text-sm font-extrabold text-slate-900">{block.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{block.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      );

    /* ---------------------------------------- how we use (checkmark list) */
    case 'how-we-use':
      return (
        <>
          <Prose>
            <p className="font-semibold text-slate-800">{USE_LEAD}</p>
          </Prose>
          <RuleList items={[...USE_ITEMS]} tone="check" className="mt-5" />
        </>
      );

    /* --------------------------------- cookies (prose + two type cards) */
    case 'cookies':
      return (
        <>
          <Prose>
            <p>{COOKIES_INTRO}</p>
            <p className="font-semibold text-slate-800">{COOKIES_LEAD}</p>
          </Prose>
          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            {COOKIE_TYPES.map((type, i) => (
              <Reveal key={type.name} delay={0.06 * i} className="h-full">
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C61A1A] tabular-nums">
                      Type {type.index}
                    </span>
                    <Cookie className="w-4 h-4 text-slate-300" />
                  </div>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    <span className="font-extrabold text-slate-900">{type.name}</span>{' '}
                    {type.sentence.slice(type.name.length)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      );

    /* ------------------------------- how we share (black promise + prose) */
    case 'how-we-share':
      return (
        <>
          <Reveal>
            <div className="rounded-2xl bg-black text-white p-5 sm:p-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#C61A1A] flex items-center justify-center">
                  <Ban className="w-4 h-4 text-white" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-red-400">
                  No selling. No sharing.
                </span>
              </div>
              <p className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">{SHARE_MAIN}</p>
            </div>
          </Reveal>
          <Prose className="mt-4">
            <p>{SHARE_LAW}</p>
          </Prose>
        </>
      );

    /* --------------------------------- data security (red-border emphasis) */
    case 'data-security':
      return (
        <Reveal delay={0.05}>
          <div className="rounded-2xl border-l-4 border-[#C61A1A] border-y border-r border-y-slate-200 border-r-slate-200 bg-white p-5 sm:p-6 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.4)]">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-[#C61A1A]" />
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Industry-standard measures
              </span>
            </div>
            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">{SECURITY_COPY}</p>
          </div>
        </Reveal>
      );

    case 'data-retention':
      return (
        <Prose>
          <p>{RETENTION_COPY}</p>
        </Prose>
      );

    /* -------------------------------------- rights (checklist + closing) */
    case 'your-rights':
      return (
        <>
          <Prose>
            <p className="font-semibold text-slate-800">{RIGHTS_LEAD}</p>
          </Prose>
          <RuleList items={[...RIGHTS_ITEMS]} tone="check" className="mt-5" />
          <Reveal delay={0.06}>
            <p className="mt-5 flex items-start gap-2 text-sm font-semibold text-slate-800 leading-relaxed rounded-xl bg-red-50 border border-red-100 px-4 py-3">
              <Check className="w-4 h-4 text-[#C61A1A] shrink-0 mt-0.5" />
              {RIGHTS_CLOSING}
            </p>
          </Reveal>
        </>
      );

    /* ------------------------------- children's privacy (18+ figure + copy) */
    case 'childrens-privacy':
      return (
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 items-center">
            <div className="text-center sm:pr-5 sm:border-r sm:border-slate-100">
              <span className="block text-4xl font-extrabold text-[#C61A1A] tabular-nums leading-none">
                18+
              </span>
              <span className="mt-2 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Minimum age
              </span>
            </div>
            <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">{CHILDREN_COPY}</p>
          </div>
        </Reveal>
      );

    case 'policy-changes':
      return (
        <Prose>
          <p>{CHANGES_COPY}</p>
        </Prose>
      );

    /* ------------------------------------------------- contact (with links) */
    case 'contact-us':
      return (
        <>
          <Prose>
            <p>
              {CONTACT_BEFORE}{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-bold text-[#C61A1A] hover:underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>{' '}
              {CONTACT_AFTER}{' '}
              <a
                href="/contact"
                className="font-bold text-[#C61A1A] hover:underline underline-offset-2"
              >
                {CONTACT_FORM_LABEL}
              </a>
              .
            </p>
          </Prose>

          <div className="mt-5 grid sm:grid-cols-2 gap-4">
            <Reveal delay={0.05}>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
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
                    {CONTACT_EMAIL}
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="/contact"
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
   Small building blocks shared by several sections
   ========================================================================== */

/**
 * Directional connector between data-flow cards — right-pointing on desktop,
 * down-pointing in the mobile stack. Decorative only.
 */
const FlowArrow: React.FC = () => (
  <>
    <div className="hidden sm:flex items-center justify-center w-6 shrink-0" aria-hidden="true">
      <ArrowRight className="w-4 h-4 text-slate-300" />
    </div>
    <div className="sm:hidden flex justify-center" aria-hidden="true">
      <ArrowDown className="w-4 h-4 text-slate-300" />
    </div>
  </>
);

/** Consistent prose rhythm (site-wide body sizes). */
const Prose: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <Reveal delay={0.04} className={`space-y-3.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed ${className}`}>
    {children}
  </Reveal>
);

/**
 * Policy rule list — `check` for permitted/rightful actions, `cross` kept for
 * parity with the refund page's blocked-items lists.
 */
const RuleList: React.FC<{ items: string[]; tone: 'check' | 'cross'; className?: string }> = ({
  items,
  tone,
  className = '',
}) => (
  <Reveal delay={0.06} className={className}>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
              tone === 'check' ? 'bg-red-50 text-[#C61A1A]' : 'bg-slate-100 text-slate-500'
            }`}
            aria-hidden="true"
          >
            {tone === 'check' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
          </span>
          <span className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </Reveal>
);
