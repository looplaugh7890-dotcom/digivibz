import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, ChevronDown, Clock, Info, Mail, Phone, ScrollText, X } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  AMOUNTS_INTRO,
  AMOUNTS_NOTE,
  CONTACT_ACKNOWLEDGMENT,
  CONTACT_CARDS,
  CONTACT_INTRO,
  CONTACT_RESPONSE,
  DELIVERY_RULES,
  ELIGIBILITY_INTRO,
  ELIGIBILITY_LEAD,
  ELIGIBILITY_RULES,
  GENERAL_OVERVIEW,
  INACTIVITY_COPY,
  LIABILITY_COPY,
  NON_REFUNDABLE_LEAD,
  NON_REFUNDABLE_RULES,
  NO_REFUND_DELIVERY,
  OWNERSHIP_COPY,
  POLICY_INTRO,
  POLICY_SECTIONS,
  POLICY_STATS,
  PROCEDURE_LEAD,
  PROCEDURE_STEPS,
  QUALITY_COPY,
  RECORDS_COPY,
  REFUND_TIERS,
  REVISION_INTRO,
  REVISION_RULES,
  UPDATES_COPY,
} from '../data/policyContent';
import type { PolicySectionMeta } from '../data/policyContent';

/** Contact-card icon per label (labels come from the data file). */
const CONTACT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Email: Mail,
  Phone: Phone,
  'Support Hours': Clock,
};

/**
 * Short captions for the "refund window" timeline strip. Percentages mirror
 * REFUND_TIERS — the verbatim tier details live in section 07's cards below;
 * these are only visual labels for the diagram.
 */
const TIMELINE = [
  { percent: '90%', when: '0–48 Hours', note: 'Before initiation' },
  { percent: '60%', when: '48 Hours Later', note: 'Before first delivery' },
  { percent: '0%', when: 'After First Delivery', note: 'Revisions, not refunds' },
] as const;

/**
 * Refund & Return Policy page (`#/refund-policy`).
 *
 * Long-form legal content made scannable: a sticky table of contents with
 * scrollspy, a hero figure strip, a visual refund-tier chart, a numbered
 * request stepper, and rule lists split into "allowed" / "not allowed".
 */
export const RefundPolicyPage: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(POLICY_SECTIONS[0].id);
  const mobileTocRef = useRef<HTMLDetailsElement>(null);

  // Scrollspy — mirrors the Navbar's probe pattern (section tops vs. scroll).
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const probe = window.scrollY + 160;
      let current = POLICY_SECTIONS[0].id;
      for (const section of POLICY_SECTIONS) {
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
          HERO — centered document header + policy figure strip
      =================================================================== */}
      <section id="policy-hero" className="relative pt-8 pb-12 md:pt-10 md:pb-14 overflow-hidden bg-white">
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
              Legal · Transparency
            </span>
          </motion.div>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.14]"
          >
            Refund &amp; Return <span className="text-[#C61A1A]">Policy</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto"
          >
            {POLICY_INTRO.lead}
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto"
          >
            {POLICY_INTRO.sub}
          </motion.p>

          {/* figure strip — gap-px on a slate background = perfect dividers */}
          <motion.dl
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden max-w-3xl mx-auto shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)]"
          >
            {POLICY_STATS.map((stat) => (
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
          REFUND WINDOW — small timeline visual: order → first delivery
      =================================================================== */}
      <section className="pb-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <figure className="rounded-2xl border border-slate-200 bg-slate-50/70 px-5 sm:px-8 pt-6 pb-7">
              <figcaption className="flex items-center justify-between gap-3 text-[10px] font-extrabold uppercase tracking-widest">
                <span className="flex items-center gap-2 text-[#C61A1A]">
                  <Clock className="w-3.5 h-3.5" />
                  Refund Window · Order → Delivery
                </span>
                <button
                  type="button"
                  onClick={scrollTo('refund-amount')}
                  className="hidden sm:flex items-center gap-1 normal-case tracking-normal text-[11px] font-bold text-slate-400 hover:text-[#C61A1A] transition-colors"
                >
                  Full breakdown
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </figcaption>

              <div className="relative mt-7 grid sm:grid-cols-3 gap-7 sm:gap-3 text-center">
                {/* dashed rail behind the milestone circles (desktop only) */}
                <div
                  aria-hidden="true"
                  className="hidden sm:flex absolute top-[24px] left-[20%] right-[21%] items-center"
                >
                  <span className="flex-1 border-t border-dashed border-slate-300" />
                  <ArrowRight className="w-4 h-4 -ml-1 shrink-0 text-[#C61A1A]" />
                </div>

                {TIMELINE.map((m, i) => {
                  const isFinal = i === TIMELINE.length - 1;
                  return (
                    <div key={m.when} className="relative flex flex-col items-center">
                      <span
                        className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-extrabold tabular-nums shadow-sm ${
                          isFinal
                            ? 'bg-black border-black text-white'
                            : 'bg-white border-[#C61A1A] text-[#C61A1A]'
                        }`}
                      >
                        {m.percent}
                      </span>
                      <span className="mt-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-800">
                        {m.when}
                      </span>
                      <span className="mt-1 text-[11px] font-semibold text-slate-500">
                        {m.note}
                      </span>
                      {!isFinal && (
                        <span
                          aria-hidden="true"
                          className="sm:hidden mt-3 w-0 h-5 border-l border-dashed border-slate-300"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          BODY — sticky table of contents + policy sections
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
                  {POLICY_SECTIONS.map((section, index) => {
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
                {POLICY_SECTIONS.map((section, index) => {
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
                {POLICY_SECTIONS.map((section, index) => (
                  <PolicySection key={section.id} meta={section} index={index}>
                    <SectionBody id={section.id} />
                  </PolicySection>
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
const PolicySection: React.FC<{
  meta: PolicySectionMeta;
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
              {String(index + 1).padStart(2, '0')} / {POLICY_SECTIONS.length}
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
  const reduceMotion = useReducedMotion();
  switch (id) {
    /* ---------------------------------------------------- prose sections */
    case 'general-overview':
      return (
        <Prose>
          {GENERAL_OVERVIEW.map((para) => (
            <p key={para.slice(0, 40)}>{para}</p>
          ))}
        </Prose>
      );

    /* ------------------------------------------- revision policy (checks) */
    case 'revision-policy':
      return (
        <>
          <Prose>
            <p>{REVISION_INTRO}</p>
          </Prose>
          <RuleList items={[...REVISION_RULES]} tone="check" className="mt-5" />
        </>
      );

    /* ------------------------------------------- eligibility (intro+check) */
    case 'refund-eligibility':
      return (
        <>
          <Prose>
            <p>{ELIGIBILITY_INTRO}</p>
            <p className="font-semibold text-slate-800">{ELIGIBILITY_LEAD}</p>
          </Prose>
          <RuleList items={[...ELIGIBILITY_RULES]} tone="check" className="mt-5" />
        </>
      );

    /* ------------------------------------- no refund after delivery (alert) */
    case 'no-refund-after-delivery':
      return (
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-red-200 bg-red-50/70 p-5 sm:p-6">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-lg bg-[#C61A1A] text-white flex items-center justify-center">
                <Info className="w-4 h-4" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C61A1A]">
                Important
              </span>
            </div>
            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">{NO_REFUND_DELIVERY}</p>
          </div>
        </Reveal>
      );

    /* ------------------------------------ non-refundable (cross-mark list) */
    case 'non-refundable-situations':
      return (
        <>
          <Prose>
            <p className="font-semibold text-slate-800">{NON_REFUNDABLE_LEAD}</p>
          </Prose>
          <RuleList items={[...NON_REFUNDABLE_RULES]} tone="cross" className="mt-5" />
        </>
      );

    /* ------------------------------------------- procedure (numbered flow) */
    case 'refund-request-procedure':
      return (
        <>
          <Prose>
            <p className="font-semibold text-slate-800">{PROCEDURE_LEAD}</p>
          </Prose>
          <ol className="mt-5">
            {PROCEDURE_STEPS.map((step, i, arr) => (
              <li key={step.slice(0, 30)} className="relative flex gap-4 pb-6 last:pb-0">
                {i < arr.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[15px] top-9 bottom-0 w-px bg-red-100"
                  />
                )}
                <span className="relative z-10 shrink-0 w-8 h-8 rounded-full bg-[#C61A1A] text-white text-xs font-extrabold flex items-center justify-center tabular-nums shadow-md">
                  {i + 1}
                </span>
                <p className="text-sm text-slate-600 leading-relaxed pt-1.5">{step}</p>
              </li>
            ))}
          </ol>
        </>
      );

    /* ---------------------------------- refund amount (tier chart = hero) */
    case 'refund-amount':
      return (
        <>
          <Prose>
            <p>{AMOUNTS_INTRO}</p>
          </Prose>
          <div className="mt-5 grid sm:grid-cols-3 gap-4">
            {REFUND_TIERS.map((tier, i) => {
              const isZero = tier.percent === 0;
              return (
                <Reveal key={tier.title} delay={0.06 * i} className="h-full">
                  <div
                    className={`h-full rounded-2xl border p-5 flex flex-col ${
                      isZero ? 'bg-black border-black' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`text-3xl font-extrabold tabular-nums leading-none ${
                          isZero ? 'text-white' : 'text-[#C61A1A]'
                        }`}
                      >
                        {tier.percent}%
                      </span>
                      <span
                        className={`text-[9px] font-extrabold uppercase tracking-widest ${
                          isZero ? 'text-red-400' : 'text-slate-400'
                        }`}
                      >
                        Refund
                      </span>
                    </div>

                    {/* meter — animates to the tier's real percentage */}
                    <div
                      className={`mt-3 h-1.5 rounded-full overflow-hidden ${
                        isZero ? 'bg-white/15' : 'bg-slate-100'
                      }`}
                    >
                      <motion.div
                        className="h-full rounded-full bg-[#C61A1A]"
                        /* Reduced motion: start at the final width so the bar
                           is simply present instead of animating in. */
                        initial={{ width: reduceMotion ? `${tier.percent}%` : 0 }}
                        whileInView={{ width: `${tier.percent}%` }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>

                    <h3
                      className={`mt-4 text-sm font-extrabold leading-snug ${
                        isZero ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {tier.title}
                    </h3>
                    <p
                      className={`mt-1 text-[11px] font-bold uppercase tracking-wide leading-snug ${
                        isZero ? 'text-red-400' : 'text-[#C61A1A]'
                      }`}
                    >
                      {tier.window}
                    </p>
                    <p
                      className={`mt-2.5 text-sm leading-relaxed ${
                        isZero ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {tier.detail}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-4 flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
            <Info className="w-3.5 h-3.5 text-[#C61A1A] shrink-0 mt-0.5" />
            {AMOUNTS_NOTE}
          </p>
        </>
      );

    /* -------------------------------------------- prose w/ black emphasis */
    case 'ownership-copyright':
      return (
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">{OWNERSHIP_COPY}</p>
          </div>
        </Reveal>
      );

    case 'quality-assurance':
      return (
        <Prose>
          <p>{QUALITY_COPY}</p>
        </Prose>
      );

    /* -------------------------------------------------- delivery (checks) */
    case 'delivery-policy':
      return <RuleList items={[...DELIVERY_RULES]} tone="check" />;

    case 'project-inactivity':
      return (
        <Prose>
          <p>{INACTIVITY_COPY}</p>
        </Prose>
      );

    case 'record-maintenance':
      return (
        <Prose>
          <p>{RECORDS_COPY}</p>
        </Prose>
      );

    case 'limitation-liability':
      return (
        <Reveal delay={0.05}>
          <div className="rounded-2xl border-l-4 border-[#C61A1A] border-y border-r border-y-slate-200 border-r-slate-200 bg-white p-5 sm:p-6 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.4)]">
            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">{LIABILITY_COPY}</p>
          </div>
        </Reveal>
      );

    case 'policy-updates':
      return (
        <Prose>
          <p>{UPDATES_COPY}</p>
        </Prose>
      );

    /* ------------------------------------------------- contact + closing */
    case 'contact-us':
      return (
        <>
          <Prose>
            <p>{CONTACT_INTRO}</p>
          </Prose>

          <div className="mt-5 grid sm:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden">
            {CONTACT_CARDS.map((card) => {
              const CardIcon = CONTACT_ICONS[card.label] ?? Mail;
              return (
                <div key={card.label} className="bg-white px-4 py-5 text-center">
                  <span className="mx-auto w-9 h-9 rounded-full bg-red-50 text-[#C61A1A] flex items-center justify-center">
                    <CardIcon className="w-4 h-4" />
                  </span>
                  <span className="mt-3 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    {card.label}
                  </span>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="mt-1 block text-sm font-bold text-slate-900 hover:text-[#C61A1A] transition-colors break-words"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <span className="mt-1 block text-sm font-bold text-slate-900">{card.value}</span>
                  )}
                </div>
              );
            })}
          </div>

          <Prose className="mt-5">
            <p>{CONTACT_RESPONSE}</p>
          </Prose>

          {/* formal closing acknowledgment */}
          <Reveal delay={0.05}>
            <div className="mt-6 rounded-2xl bg-black text-white p-5 sm:p-6 flex gap-4 items-start">
              <ScrollText className="w-5 h-5 text-[#C61A1A] shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed text-slate-300">{CONTACT_ACKNOWLEDGMENT}</p>
            </div>
          </Reveal>
        </>
      );

    default:
      return null;
  }
};

/* ==========================================================================
   Small building blocks shared by several sections
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

/**
 * Policy rule list — `check` for conditions that qualify, `cross` for the
 * situations that do not, so readers can tell them apart at a glance.
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
