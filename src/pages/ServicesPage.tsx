import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Layers, Radio } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import {
  CONVERGENCE_OUTCOMES,
  CONVERGENCE_SERVICES,
  SERVICE_CATEGORIES,
  SERVICE_DETAIL_SLUGS,
  SERVICES,
  SERVICES_CTA,
  SERVICES_INTRO,
  SYSTEM_COPY,
  ServiceCategoryId,
} from '../data/servicesContent';

/** Filter tab option — "all" plus the four disciplines. */
type FilterId = ServiceCategoryId | 'all';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Services' },
  ...SERVICE_CATEGORIES.map((c) => ({ id: c.id as FilterId, label: c.label })),
];

/**
 * Hero orbit split — the first half of the services ride the outer ring,
 * the rest ride the inner ring, so all fifteen appear around the hub.
 */
const HALF = Math.ceil(SERVICES.length / 2);
const OUTER_NODES = SERVICES.slice(0, HALF);
const INNER_NODES = SERVICES.slice(HALF);

/** Left-node y positions for the "one system" diagram (viewBox 560×380). */
const NODE_Y = [48, 108, 168, 228, 288, 348];

const PATHS_LEFT = [
  'M130 48 Q 190 58 230 164',
  'M130 108 Q 190 116 231 178',
  'M130 168 Q 195 172 229 186',
  'M130 228 Q 195 222 229 194',
  'M130 288 Q 190 270 231 204',
  'M130 348 Q 190 322 233 216',
];

const PATHS_RIGHT = [
  'M331 190 Q 380 132 427 112',
  'M332 190 L 427 190',
  'M331 190 Q 380 248 427 268',
];

const OUTCOME_Y = [112, 190, 268];

/*
 * Cards animate individually (own `initial` + `whileInView`) rather than
 * inheriting variants from the grid container: when a filter re-mounts a
 * card that previously exited, a container-level `whileInView` (once: true)
 * has already fired and never re-emits "show", which used to leave the new
 * card stuck at opacity 0 — a blank section. Per-card observers fire on
 * mount even mid-session, so every filter switch reveals its cards.
 */

/**
 * Services page (`#/services`) — all fifteen services around an orbiting
 * capability map, a kinetic service marquee, a filterable grid, and the
 * "one system" convergence diagram.
 */
export const ServicesPage: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<FilterId>('all');

  const filtered = filter === 'all' ? SERVICES : SERVICES.filter((s) => s.category === filter);

  const countFor = (id: FilterId) =>
    id === 'all' ? SERVICES.length : SERVICES.filter((s) => s.category === id).length;

  const categoryLabel = (id: ServiceCategoryId) =>
    SERVICE_CATEGORIES.find((c) => c.id === id)?.label ?? '';

  /** In-page scroll WITHOUT touching the hash (hash = route switch). */
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="bg-white">
      {/* ==================================================================
          1. HERO — headline + capability console
      =================================================================== */}
      <section id="services-hero" className="relative pt-6 pb-10 md:pt-8 md:pb-12 overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_38%,#000_70%,transparent_100%)] opacity-70 -z-10 pointer-events-none"
        />
        {!reduceMotion && (
          <div
            className="absolute top-1/3 left-[6%] w-[420px] h-[420px] rounded-full -z-10 pointer-events-none opacity-50 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(198,26,26,0.10) 0%, transparent 70%)',
              animation: 'dz-drift 14s ease-in-out infinite',
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 lg:items-center">
            {/* ---------------------------------------------------- copy */}
            <div className="lg:col-span-6 space-y-5">
              <motion.div
                {...rise(0.05)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-xs font-bold text-[#C61A1A] uppercase tracking-widest shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                Services
              </motion.div>

              <motion.h1
                {...rise(0.12)}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.14]"
              >
                {SERVICES.length} Services.{' '}
                <span className="text-[#C61A1A]">One Growth System.</span>
              </motion.h1>

              <motion.p {...rise(0.24)} className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                {SERVICES_INTRO}
              </motion.p>

              <motion.div {...rise(0.34)} className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={onOpenAudit}
                  className="dz-btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.99] group cursor-pointer"
                >
                  <span>Get My Free Growth Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#all-services"
                  onClick={scrollTo('all-services')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-slate-200 hover:border-[#C61A1A] hover:text-[#C61A1A] bg-white text-slate-800 font-semibold text-sm sm:text-base rounded-xl transition-all"
                >
                  Explore All Services
                </a>
              </motion.div>

              <motion.div {...rise(0.44)} className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#C61A1A]" />
                  4 disciplines · 1 accountable team
                </span>
                <span className="hidden sm:inline w-px h-4 bg-slate-200" />
                <a
                  href="#framework"
                  className="inline-flex items-center gap-1 hover:text-[#C61A1A] font-medium transition-colors"
                >
                  Powered by the 5D Growth Framework
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>

            {/* -------------------------------------- orbiting capability map */}
            <div className="lg:col-span-6 flex justify-center">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[480px] aspect-square"
                aria-hidden="true"
              >
                {/* soft red glow behind the hub */}
                <div
                  className="absolute inset-[16%] rounded-full -z-10 blur-2xl opacity-70 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(198,26,26,0.18) 0%, transparent 70%)',
                  }}
                />

                {/* corner captions */}
                <span className="absolute left-0 top-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                  Capability Map
                </span>
                <span className="absolute right-0 bottom-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#C61A1A] shadow-xs">
                  4 Disciplines
                </span>

                {/* ring tracks */}
                <div className="absolute inset-[8%] rounded-full border border-dashed border-slate-200" />
                <div className="absolute inset-[26%] rounded-full border border-dashed border-red-100" />
                <div
                  className={`absolute inset-[17%] rounded-full border border-dashed border-slate-100 ${
                    reduceMotion ? undefined : 'dz-spin'
                  }`}
                />

                {/* ---------------------------------------- outer orbit: 1st half */}
                <div className={`absolute inset-[8%] ${reduceMotion ? undefined : 'dz-spin'}`}>
                  {OUTER_NODES.map((service, i) => {
                    const angle = (360 / OUTER_NODES.length) * i;
                    const Icon = service.icon;
                    return (
                      <div
                        key={service.slug}
                        className="absolute inset-0"
                        style={{ transform: `rotate(${angle}deg)` }}
                      >
                        {/* sit on the track, un-tilt the angle, then counter-spin
                            while the ring rotates so the icon stays upright */}
                        <div
                          className="absolute left-1/2 top-0"
                          style={{ transform: `translate(-50%, -50%) rotate(${-angle}deg)` }}
                        >
                          <div className={reduceMotion ? undefined : 'dz-spin-rev'}>
                            <span className="flex w-11 h-11 sm:w-12 sm:h-12 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-[0_10px_24px_-14px_rgba(15,23,42,0.45)]">
                              <Icon className="w-5 h-5 text-[#C61A1A]" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ---------------------------------------- inner orbit: 2nd half */}
                <div className={`absolute inset-[26%] ${reduceMotion ? undefined : 'dz-spin-back'}`}>
                  {INNER_NODES.map((service, i) => {
                    const angle = (360 / INNER_NODES.length) * i + 20;
                    const Icon = service.icon;
                    return (
                      <div
                        key={service.slug}
                        className="absolute inset-0"
                        style={{ transform: `rotate(${angle}deg)` }}
                      >
                        <div
                          className="absolute left-1/2 top-0"
                          style={{ transform: `translate(-50%, -50%) rotate(${-angle}deg)` }}
                        >
                          <div className={reduceMotion ? undefined : 'dz-spin-back-rev'}>
                            <span className="flex w-10 h-10 sm:w-11 sm:h-11 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-[0_10px_24px_-14px_rgba(15,23,42,0.45)]">
                              <Icon className="w-4.5 h-4.5 text-[#C61A1A] sm:w-5 sm:h-5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* pulse halo */}
                {!reduceMotion && (
                  <div className="absolute inset-0 m-auto w-[32%] h-[32%] rounded-full border-2 border-[#C61A1A] dz-pulse-ring pointer-events-none" />
                )}

                {/* center hub */}
                <div className="absolute inset-0 m-auto w-[32%] h-[32%] rounded-full bg-[#C61A1A] text-white flex flex-col items-center justify-center text-center shadow-[0_24px_60px_-18px_rgba(198,26,26,0.6)]">
                  <span className="text-3xl sm:text-[40px] font-extrabold leading-none tabular-nums">
                    {SERVICES.length}
                  </span>
                  <span className="mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] opacity-90">
                    Services
                  </span>
                  <span className="hidden sm:block mt-1.5 pt-1.5 w-[68%] border-t border-white/30 text-[8px] font-semibold uppercase tracking-[0.12em] opacity-85">
                    One Growth System
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. KINETIC MARQUEE — every service name, on the move
      =================================================================== */}
      <div
        aria-hidden="true"
        className="border-y border-slate-100 bg-slate-50/70 py-3.5 overflow-hidden dz-marquee"
      >
        <div className="dz-marquee-track flex w-max items-center gap-7 [animation-duration:36s]">
          {[...SERVICES, ...SERVICES].map((service, i) => (
            <span
              key={`${service.slug}-${i}`}
              className="flex items-center gap-7 text-[13px] font-extrabold uppercase tracking-widest text-slate-700 whitespace-nowrap"
            >
              {service.name}
              <span className="w-1.5 h-1.5 bg-[#C61A1A] rotate-45 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ==================================================================
          3. EVERY SERVICE — filterable grid
      =================================================================== */}
      <section id="all-services" className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" /> {SERVICES.length} Services · {SERVICE_CATEGORIES.length} Disciplines
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore Every <span className="text-[#C61A1A]">Service</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Filter by discipline, or browse the full stack — every service is delivered by the
                same team, on the same strategy.
              </p>
            </Reveal>
          </div>

          {/* filter tabs */}
          <Reveal delay={0.1} className="mt-8">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    aria-pressed={active}
                    className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#C61A1A] text-white shadow-md'
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-red-300 hover:text-[#C61A1A]'
                    }`}
                  >
                    {f.label}
                    <span
                      className={`text-[10px] font-extrabold tabular-nums ${
                        active ? 'text-white/80' : 'text-slate-400'
                      }`}
                    >
                      {countFor(f.id)}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* grid — each card self-animates so filter re-mounts always reveal */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((service, index) => {
                const Icon = service.icon;
                const number = SERVICES.findIndex((s) => s.slug === service.slug) + 1;
                const hasPage = SERVICE_DETAIL_SLUGS.includes(service.slug);
                const card = (
                  <>
                    {/* red rail draws across the top on hover */}
                    <span className="absolute top-0 left-0 h-0.5 w-0 bg-[#C61A1A] group-hover:w-full transition-all duration-500" />

                    <div className="flex items-start justify-between gap-3">
                      <span className="w-11 h-11 rounded-xl bg-red-50 text-[#C61A1A] flex items-center justify-center group-hover:bg-[#C61A1A] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-xs font-extrabold tabular-nums text-slate-300 group-hover:text-[#C61A1A] transition-colors">
                        {String(number).padStart(2, '0')} / {SERVICES.length}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[15px] font-extrabold text-slate-900 tracking-tight leading-snug">
                      {service.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{service.description}</p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 truncate">
                        {categoryLabel(service.category)}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-[#C61A1A] transition-colors shrink-0">
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {hasPage ? 'View Page' : 'In System'}
                      </span>
                    </div>
                  </>
                );

                const cardProps = {
                  key: service.slug,
                  layout: true as const,
                  initial: reduceMotion ? false : { opacity: 0, y: 18 },
                  whileInView: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1] as const,
                      delay: reduceMotion ? 0 : (index % 3) * 0.06,
                    },
                  },
                  viewport: { once: true, margin: '-40px' },
                  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' as const } },
                  whileHover: reduceMotion ? undefined : { y: -5 },
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
                  className:
                    'group relative bg-white rounded-2xl border border-slate-200 p-5 overflow-hidden hover:border-red-300 hover:shadow-[0_24px_50px_-30px_rgba(198,26,26,0.35)] transition-colors duration-300',
                };

                /* Cards with a detail page become real links; the rest stay put. */
                return hasPage ? (
                  <motion.a
                    {...cardProps}
                    href={`#/service/${service.slug}`}
                    aria-label={`View ${service.name} service page`}
                    className={`${cardProps.className} block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C61A1A]`}
                  >
                    {card}
                  </motion.a>
                ) : (
                  <motion.article {...cardProps}>{card}</motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. ONE SYSTEM — convergence diagram
      =================================================================== */}
      <section id="one-system" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* copy */}
            <div className="lg:col-span-5 space-y-4">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-red-200 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5" /> How It Connects
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  Your Marketing Should Work as{' '}
                  <span className="text-[#C61A1A]">One System</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14} className="space-y-3.5 pt-1">
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{SYSTEM_COPY.p1}</p>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{SYSTEM_COPY.p2}</p>
                <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                  {SYSTEM_COPY.p3}
                </p>
              </Reveal>
              <Reveal delay={0.2} className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenAudit}
                  className="dz-btn-shine inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all group cursor-pointer"
                >
                  <span>Get My Free Growth Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="#/portfolio"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-[#C61A1A] transition-colors group"
                >
                  See the results
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Reveal>
            </div>

            {/* diagram */}
            <Reveal direction="right" delay={0.1} className="lg:col-span-7">
              {/* ------------------------------------------ desktop diagram */}
              <div className="hidden sm:block rounded-3xl bg-white border border-slate-200 p-4 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.25)]">
                <svg
                  viewBox="0 0 560 380"
                  className="w-full select-none"
                  role="img"
                  aria-label="Diagram: six services converging into one growth system that produces qualified leads, lower cost per lead, and revenue growth"
                >
                  {/* column captions */}
                  <text x="8" y="20" fontSize="10" fontWeight="800" fill="#94A3B8" letterSpacing="1.5">
                    OUR SERVICES
                  </text>
                  <text x="430" y="20" fontSize="10" fontWeight="800" fill="#94A3B8" letterSpacing="1.5">
                    OUTCOMES
                  </text>

                  {/* service → hub connectors */}
                  {PATHS_LEFT.map((d) => (
                    <path
                      key={d}
                      d={d}
                      fill="none"
                      stroke="#C61A1A"
                      strokeWidth="1.6"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                      opacity="0.55"
                      className={reduceMotion ? undefined : 'dz-flow'}
                    />
                  ))}

                  {/* hub → outcome connectors */}
                  {PATHS_RIGHT.map((d) => (
                    <path
                      key={d}
                      d={d}
                      fill="none"
                      stroke="#C61A1A"
                      strokeWidth="1.6"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                      opacity="0.55"
                      className={reduceMotion ? undefined : 'dz-flow'}
                    />
                  ))}

                  {/* left service nodes */}
                  {CONVERGENCE_SERVICES.map((label, i) => (
                    <g key={label}>
                      <rect
                        x="8"
                        y={NODE_Y[i] - 16}
                        width="122"
                        height="32"
                        rx="9"
                        fill="#FFFFFF"
                        stroke="#E2E8F0"
                        strokeWidth="1.5"
                      />
                      <text
                        x="69"
                        y={NODE_Y[i] + 4}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="700"
                        fill="#475569"
                      >
                        {label}
                      </text>
                    </g>
                  ))}

                  {/* center hub */}
                  {!reduceMotion && (
                    <circle cx="280" cy="190" r="50" fill="none" stroke="#C61A1A" strokeWidth="1.5" opacity="0.35">
                      <animate attributeName="r" values="50;68;50" dur="2.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.35;0;0.35" dur="2.6s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx="280" cy="190" r="50" fill="#C61A1A" />
                  <text x="280" y="186" textAnchor="middle" fontSize="15" fontWeight="800" fill="#FFFFFF">
                    ONE
                  </text>
                  <text
                    x="280"
                    y="206"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#FFFFFF"
                    letterSpacing="1.5"
                    opacity="0.9"
                  >
                    SYSTEM
                  </text>

                  {/* right outcome nodes */}
                  {CONVERGENCE_OUTCOMES.map((label, i) => (
                    <g key={label}>
                      <rect
                        x="430"
                        y={OUTCOME_Y[i] - 16}
                        width="122"
                        height="32"
                        rx="9"
                        fill="#FEF2F2"
                        stroke="#FCA5A5"
                        strokeWidth="1.5"
                      />
                      <text
                        x="491"
                        y={OUTCOME_Y[i] + 4}
                        textAnchor="middle"
                        fontSize="10.5"
                        fontWeight="800"
                        fill="#C61A1A"
                      >
                        {label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* --------------------------------------- mobile diagram */}
              <div className="sm:hidden rounded-3xl bg-white border border-slate-200 p-5 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.25)] space-y-4">
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  Our Services
                </div>
                <div className="flex flex-wrap gap-2">
                  {CONVERGENCE_SERVICES.map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-600"
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center py-1">
                  <span className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#C61A1A] text-white text-center leading-tight">
                    <span>
                      <span className="block text-sm font-extrabold">ONE</span>
                      <span className="block text-[10px] font-bold tracking-widest opacity-90">
                        SYSTEM
                      </span>
                    </span>
                    {!reduceMotion && (
                      <span className="absolute inset-0 rounded-full border border-[#C61A1A] animate-ping opacity-40" />
                    )}
                  </span>
                </div>

                <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  Outcomes
                </div>
                <div className="flex flex-wrap gap-2">
                  {CONVERGENCE_OUTCOMES.map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs font-extrabold text-[#C61A1A]"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. CLOSING CTA — red band
      =================================================================== */}
      <section className="relative py-14 md:py-16 bg-[#C61A1A] overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-1 bg-white/70" />
        <div className="absolute top-0 right-0 w-40 h-1 bg-white/70" />
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '3rem 3rem',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 50%, transparent 100%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {SERVICES_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{SERVICES_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.14} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-100 text-[#C61A1A] font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>Get My Free Growth Audit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/50 hover:bg-white/10 text-white font-semibold text-sm sm:text-base rounded-xl transition-all"
            >
              Talk to Our Team
              <ArrowRight className="w-4 h-4" />
            </a>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-xs text-white/75">
              Free personalized plan · Uncover opportunities · Fix gaps · Zero obligation
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
