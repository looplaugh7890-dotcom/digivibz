import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  PenTool,
  Rocket,
  Search,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { CountUp } from '../components/CountUp';
import { ProjectMockup } from '../components/ProjectMockup';
import { CASE_STUDIES } from '../data/content';
import {
  GROWTH_SYSTEM_CLOSER,
  GROWTH_SYSTEM_STEPS,
  PORTFOLIO_CTA,
  PORTFOLIO_INTRO,
  PORTFOLIO_PROJECTS,
  PORTFOLIO_STATS,
  RESULTS_BOARD,
  WORKING_STYLE_PARAS,
  WORKING_STYLE_PHASES,
} from '../data/portfolioContent';

/** Step icons for the 5D pipeline. */
const STEP_ICONS = [Search, PenTool, Wrench, Rocket, Activity] as const;

/** Pipeline node x-positions (viewBox 1000 wide, y = 46). */
const NODE_X = [80, 280, 480, 680, 880];

/**
 * Portfolio page (`#/portfolio`) — the proof page: results board hero,
 * stats rail, client project previews, featured case-study grid, the 5D
 * pipeline, the working-style pulse board, and the closing audit CTA.
 */
export const PortfolioPage: React.FC<{ onOpenAudit: () => void }> = ({ onOpenAudit }) => {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

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
          1. HERO — headline + results board
      =================================================================== */}
      <section id="portfolio-hero" className="relative pt-6 pb-12 md:pt-8 md:pb-14 overflow-hidden bg-white">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_38%,#000_70%,transparent_100%)] opacity-70 -z-10 pointer-events-none"
        />
        {!reduceMotion && (
          <div
            className="absolute top-1/4 right-[8%] w-[420px] h-[420px] rounded-full -z-10 pointer-events-none opacity-50 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(198,26,26,0.10) 0%, transparent 70%)',
              animation: 'dz-drift 14s ease-in-out infinite',
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 lg:items-center">
            {/* ---------------------------------------------------- copy */}
            <div className="lg:col-span-5 space-y-5">
              <motion.div
                {...rise(0.05)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-xs font-bold text-[#C61A1A] uppercase tracking-widest shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                Portfolio
              </motion.div>

              <motion.h1
                {...rise(0.12)}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.14]"
              >
                The Work Behind{' '}
                <span className="text-[#C61A1A]">Real Business Growth</span>
              </motion.h1>

              <motion.p {...rise(0.24)} className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                {PORTFOLIO_INTRO}
              </motion.p>

              <motion.div {...rise(0.34)} className="pt-1">
                <a
                  href="#featured-cases"
                  onClick={scrollTo('featured-cases')}
                  className="dz-btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.99] group cursor-pointer"
                >
                  <span>View Case Studies</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>

              <motion.div
                {...rise(0.44)}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm text-slate-500"
              >
                <span className="inline-flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#C61A1A]" />
                  <strong className="text-slate-800">4X</strong>&nbsp;avg revenue growth
                </span>
                <span className="hidden sm:inline w-px h-4 bg-slate-200" />
                <span>
                  <strong className="text-slate-800">250+</strong>&nbsp;US businesses served
                </span>
              </motion.div>
            </div>

            {/* --------------------------------------------- results board */}
            <div className="lg:col-span-7">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
                  {/* panel header */}
                  <div className="flex items-center justify-between px-5 sm:px-6 pt-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C61A1A] animate-pulse" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        Results Board
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C61A1A] bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                      Last 12 Months
                    </span>
                  </div>

                  {/* ranked horizontal bars */}
                  <div className="px-5 sm:px-6 pt-5 pb-4 space-y-3.5">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <span>Client project</span>
                      <span>Growth multiple</span>
                    </div>
                    {RESULTS_BOARD.map((row, i) => (
                      <div key={row.label} className="flex items-center gap-3 sm:gap-4">
                        <span className="w-24 sm:w-32 shrink-0 text-xs font-bold text-slate-600 truncate">
                          {row.label}
                        </span>
                        <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-[#C61A1A]"
                            initial={reduceMotion ? false : { width: 0 }}
                            animate={{ width: `${(row.value / 4) * 100}%` }}
                            transition={{
                              duration: 0.9,
                              delay: 0.35 + i * 0.09,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />
                        </div>
                        <span className="w-9 shrink-0 text-right text-xs font-extrabold text-slate-900 tabular-nums">
                          {row.value}X
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* footer strip */}
                  <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/60">
                    <div className="py-3.5 px-2 text-center">
                      <div className="text-lg sm:text-xl font-extrabold text-[#C61A1A] leading-none tabular-nums">
                        <CountUp value="4X" />
                      </div>
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Avg growth
                      </div>
                    </div>
                    <div className="py-3.5 px-2 text-center">
                      <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-none tabular-nums">
                        <CountUp value="6" />
                      </div>
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Projects ranked
                      </div>
                    </div>
                    <div className="py-3.5 px-2 text-center">
                      <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-none tabular-nums">
                        100%
                      </div>
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Measured
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
          2. STATS RAIL — the four proof metrics
      =================================================================== */}
      <section className="bg-white border-y border-slate-100 relative">
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#C61A1A] to-transparent opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
            {PORTFOLIO_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="py-7 px-3 sm:px-5 text-center">
                <span className="inline-block w-6 h-0.5 rounded-full bg-[#C61A1A] mb-3" />
                <div
                  className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight tabular-nums ${
                    stat.red ? 'text-[#C61A1A]' : 'text-slate-900'
                  }`}
                >
                  <CountUp value={stat.value} />
                </div>
                <p className="mt-2 text-[11px] sm:text-xs text-slate-500 font-medium leading-snug max-w-[18rem] mx-auto">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          3. SELECTED CLIENT WORK — Atlas + Northbridge previews
      =================================================================== */}
      <section id="selected-work" className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" /> Client Projects
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Selected <span className="text-[#C61A1A]">Client Work</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 space-y-14">
            {PORTFOLIO_PROJECTS.map((project, i) => (
              <Reveal key={project.slug} delay={0.05} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* mockup (alternates sides) */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-32px_rgba(15,23,42,0.25)] p-3 sm:p-4 hover:shadow-[0_28px_70px_-32px_rgba(15,23,42,0.32)] transition-shadow">
                    <ProjectMockup
                      variant={project.variant}
                      metric={project.metric.value}
                      url={
                        project.variant === 'finance'
                          ? 'atlasfinancial.com'
                          : 'northbridgelegal.com'
                      }
                    />
                  </div>
                </div>

                {/* copy */}
                <div className={i % 2 === 1 ? 'lg:order-1 lg:pr-4' : 'lg:pl-4'}>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    {project.industry}
                  </span>
                  <h3 className="mt-4 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">{project.description}</p>

                  {/* headline result */}
                  <div className="mt-5 inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                    <span className="text-2xl font-extrabold text-[#C61A1A] tabular-nums">{project.metric.value}</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
                      {project.metric.label}
                    </span>
                  </div>

                  <div className="mt-6">
                    <a
                      href={`#/case-study/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800 hover:text-[#C61A1A] transition-colors group cursor-pointer"
                    >
                      View Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. FEATURED CASE STUDIES — full-detail previews → detail pages
      =================================================================== */}
      <section id="featured-cases" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-red-200 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" /> Featured Case Studies
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured <span className="text-[#C61A1A]">Case Studies</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CASE_STUDIES.map((study, i) => (
              <Reveal key={study.id} delay={0.06 * i}>
                <a
                  href={`#/case-study/${study.id}`}
                  className="group block h-full bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#C61A1A]"
                >
                  {/* image + overlay */}
                  <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                    <img
                      src={study.image}
                      alt={study.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/25 to-transparent" />
                    <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-900 shadow-xs">
                      {study.industry}
                    </span>
                    <h3 className="absolute bottom-4 left-4 right-4 text-base sm:text-lg font-bold text-white leading-snug">
                      {study.category}
                    </h3>
                  </div>

                  {/* body */}
                  <div className="p-5">
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{study.summary}</p>

                    {/* result chips */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {study.results.map((res) => (
                        <div key={res.label} className="rounded-lg bg-slate-50 border border-slate-100 px-2 py-2 text-center">
                          <div className="text-base sm:text-lg font-extrabold text-[#C61A1A] tabular-nums leading-none">
                            {res.value}
                          </div>
                          <div className="mt-1 text-[9px] sm:text-[10px] text-slate-500 font-semibold leading-tight">
                            {res.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-[#C61A1A] transition-colors">
                        View Case Study
                      </span>
                      <span className="p-1.5 rounded-full bg-slate-50 group-hover:bg-red-50 text-slate-400 group-hover:text-[#C61A1A] transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          5. HOW WE DRIVE GROWTH — interactive 5D pipeline
      =================================================================== */}
      <section id="growth-system" className="py-14 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5" /> The System Behind The Results
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                How We Drive Consistent{' '}
                <span className="text-[#C61A1A]">Business Growth</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Every result you see isn’t random, it’s built on a structured system we apply to every business we
                work with. Our 5D Growth Framework ensures every decision is intentional, every action is
                measurable, and every outcome is aligned with real business growth.
              </p>
            </Reveal>
          </div>

          {/* pipeline track */}
          <Reveal delay={0.1} className="mt-10">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_-32px_rgba(15,23,42,0.22)] overflow-hidden">
              <div className="flex items-center justify-between px-5 sm:px-6 pt-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C61A1A] animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    5D Growth Pipeline
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C61A1A] bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                  Repeatable
                </span>
              </div>

              <svg
                viewBox="0 0 1000 116"
                className="w-full select-none mt-2"
                role="img"
                aria-label="Pipeline diagram: Discover, Design, Develop, Deploy, Detect"
              >
                {/* base track */}
                <line x1="80" y1="46" x2="920" y2="46" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
                {/* animated flow */}
                <line
                  x1="80"
                  y1="46"
                  x2="920"
                  y2="46"
                  stroke="#C61A1A"
                  strokeWidth="3"
                  strokeDasharray="12 10"
                  strokeLinecap="round"
                  opacity={0.55}
                  className={reduceMotion ? undefined : 'dz-flow'}
                />

                {GROWTH_SYSTEM_STEPS.map((step, i) => {
                  const active = i === activeStep;
                  const x = NODE_X[i];
                  return (
                    <g
                      key={step.name}
                      onClick={() => setActiveStep(i)}
                      onMouseEnter={() => setActiveStep(i)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* halo for the active node */}
                      {active && !reduceMotion && (
                        <circle cx={x} cy={46} r="26" fill="none" stroke="#C61A1A" strokeWidth="1.5" opacity="0.35">
                          <animate attributeName="r" values="26;38;26" dur="2.4s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle
                        cx={x}
                        cy={46}
                        r="24"
                        fill={active ? '#C61A1A' : '#FFFFFF'}
                        stroke={active ? '#C61A1A' : '#E2E8F0'}
                        strokeWidth="2.5"
                      />
                      <text
                        x={x}
                        y={52}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="800"
                        fill={active ? '#FFFFFF' : '#C61A1A'}
                      >
                        0{i + 1}
                      </text>
                      <text
                        x={x}
                        y={94}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="800"
                        fill={active ? '#C61A1A' : '#475569'}
                        letterSpacing="1"
                      >
                        {step.name.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* step cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 p-4 sm:p-5 pt-1">
                {GROWTH_SYSTEM_STEPS.map((step, i) => {
                  const Icon = STEP_ICONS[i];
                  const active = i === activeStep;
                  return (
                    <div
                      key={step.name}
                      onMouseEnter={() => setActiveStep(i)}
                      className={`rounded-xl border p-4 transition-all cursor-default ${
                        active
                          ? 'border-[#C61A1A] bg-red-50/50 shadow-sm'
                          : 'border-slate-200 bg-white hover:border-red-200'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          active ? 'bg-[#C61A1A] text-white' : 'bg-red-50 text-[#C61A1A]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <h3 className="mt-3 text-sm font-extrabold text-slate-900">{step.name}</h3>
                      <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* closer band */}
          <Reveal delay={0.12} className="mt-8">
            <div className="rounded-2xl bg-[#C61A1A] px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#C61A1A] text-xs font-bold uppercase tracking-widest shrink-0">
                5D Growth Framework
              </span>
              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed max-w-3xl">
                {GROWTH_SYSTEM_CLOSER}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================================
          6. WHAT WORKING WITH US FEELS LIKE — copy + project pulse board
      =================================================================== */}
      <section id="working-style" className="py-14 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* copy */}
            <div className="lg:col-span-6 space-y-4">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-red-200 text-[#C61A1A] rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5" /> The Experience
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  What Working With <span className="text-[#C61A1A]">Digivibz Feels Like</span>
                </h2>
              </Reveal>
              <Reveal delay={0.14} className="space-y-3.5 pt-1">
                {WORKING_STYLE_PARAS.map((para, i) => (
                  <p
                    key={i}
                    className={`text-sm sm:text-base leading-relaxed ${
                      i === 0 ? 'font-semibold text-slate-800' : 'text-slate-600'
                    }`}
                  >
                    {para}
                  </p>
                ))}
              </Reveal>
            </div>

            {/* project pulse board */}
            <Reveal direction="right" delay={0.1} className="lg:col-span-6">
              <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)]">
                {/* header */}
                <div className="flex items-center justify-between px-5 sm:px-6 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C61A1A] animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      Project Pulse
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#C61A1A] bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                    On Track
                  </span>
                </div>

                {/* phases */}
                <div className="px-5 sm:px-6 py-5 space-y-4">
                  {WORKING_STYLE_PHASES.map((group, i) => (
                    <div key={group.phase} className="relative">
                      {i < WORKING_STYLE_PHASES.length - 1 && (
                        <span className="absolute left-[15px] top-9 bottom-[-18px] w-px bg-gradient-to-b from-red-200 to-red-100" />
                      )}
                      <div className="flex items-start gap-3.5">
                        <span className="relative z-10 w-8 h-8 rounded-full bg-[#C61A1A] text-white flex items-center justify-center text-[11px] font-extrabold shrink-0">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                            {group.phase}
                          </div>
                          <ul className="mt-1.5 space-y-1.5">
                            {group.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className="p-0.5 rounded-full bg-red-100 text-[#C61A1A] mt-0.5 shrink-0">
                                  <Check className="w-3 h-3" />
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* footer */}
                <div className="px-5 sm:px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-[#C61A1A] shrink-0" />
                  <p className="text-xs sm:text-sm font-semibold text-slate-600">
                    You always know what’s happening — and why.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================================
          7. CLOSING CTA — red band
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
              {PORTFOLIO_CTA.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">{PORTFOLIO_CTA.body}</p>
          </Reveal>
          <Reveal delay={0.14} className="mt-7">
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-100 text-[#C61A1A] font-bold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <span>Get My Free Growth Audit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
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
