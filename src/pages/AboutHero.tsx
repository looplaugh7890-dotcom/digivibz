import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { CountUp } from '../components/CountUp';

interface AboutHeroProps {
  onOpenAudit: () => void;
}

/** Trailing-12-month client profit series ($K) behind the hero ledger. */
const PROFIT_MONTHS = [
  { m: 'M1', v: 42 },
  { m: 'M2', v: 55 },
  { m: 'M3', v: 51 },
  { m: 'M4', v: 68 },
  { m: 'M5', v: 84 },
  { m: 'M6', v: 79 },
  { m: 'M7', v: 96 },
  { m: 'M8', v: 112 },
  { m: 'M9', v: 108 },
  { m: 'M10', v: 131 },
  { m: 'M11', v: 147 },
  { m: 'M12', v: 168 },
];

/** Peak monthly value — every bar height is scaled against it. */
const PROFIT_MAX = 168;

/** Share of the chart height the peak bar uses (headroom for the callout). */
const BAR_SCALE = 88;

const ENGINE_STATS = [
  { value: '5+', label: 'Years' },
  { value: '1000+', label: 'Projects' },
  { value: '250+', label: 'Businesses' },
];

/**
 * About hero — left column is the copy, right column is an interactive
 * profit ledger: twelve months of client-profit bars rise on scroll, a
 * red trend line draws across their tops, and hovering (or tapping) any
 * bar reveals that month's figure. Same motive as the page: growth is
 * engineered, not gambled.
 */
export const AboutHero: React.FC<AboutHeroProps> = ({ onOpenAudit }) => {
  const reduceMotion = useReducedMotion();

  /**
   * Scroll to a section on this page WITHOUT changing the hash. A hash
   * change (e.g. to #founder) would be picked up by App's router as a
   * home-page anchor and unmount the About page.
   */
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  };

  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const [hoverBar, setHoverBar] = useState<number | null>(null);
  const activeBar = hoverBar ?? PROFIT_MONTHS.length - 1;

  /** Trend polyline through the bar tops, in 0–100 chart coordinates. */
  const trendPath = PROFIT_MONTHS.map((p, i) => {
    const x = ((i + 0.5) / PROFIT_MONTHS.length) * 100;
    const y = 100 - (p.v / PROFIT_MAX) * BAR_SCALE;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');

  return (
    <section id="about-hero" className="relative pt-6 pb-12 md:pt-8 md:pb-14 overflow-hidden bg-white">
      {/* Perspective grid floor (same texture as the home hero) */}
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 lg:items-center items-center">

          {/* ---------------------------------------------------------- */}
          {/* Left column: headline + CTA                                  */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5">
            <motion.div {...rise(0.05)} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-red-200 text-xs font-bold text-[#C61A1A] uppercase tracking-widest shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
              About Us
            </motion.div>

            <motion.h1
              {...rise(0.12)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold text-slate-900 tracking-tight leading-[1.14]"
            >
              AI-Powered Digital Marketing{' '}
              <span className="text-[#C61A1A]">Agency Built to Grow US Businesses</span>
            </motion.h1>

            <motion.p {...rise(0.24)} className="text-lg sm:text-xl font-semibold text-slate-700">
              Smarter campaigns. Faster growth. Measurable revenue.
            </motion.p>

            <motion.p {...rise(0.32)} className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Behind Digivibz is one person who got tired of watching businesses fail for the
              wrong reasons. Here's why he built it — and the system that now turns marketing
              spend into predictable revenue.
            </motion.p>

            <motion.div {...rise(0.42)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                onClick={onOpenAudit}
                className="dz-btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.99] group cursor-pointer"
              >
                <span>Boost Your Revenue Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#founder"
                onClick={scrollToSection('founder')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base rounded-xl border border-slate-300 shadow-2xs hover:border-slate-400 hover:-translate-y-0.5 transition-all"
              >
                <span>Meet the Founder</span>
              </a>
            </motion.div>

            {/* Mini proof strip */}
            <motion.div {...rise(0.52)} className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#C61A1A]" />
                <strong className="text-slate-800">$700M+</strong>&nbsp;client revenue influenced
              </span>
              <span className="hidden sm:inline w-px h-4 bg-slate-200" />
              <span><strong className="text-slate-800">95%</strong>&nbsp;client satisfaction</span>
            </motion.div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Right column: interactive profit ledger                     */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center w-full pt-2 lg:pt-0">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* Ledger panel */}
              <div className="rounded-3xl bg-white border border-slate-200 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] overflow-hidden">
                {/* Panel header */}
                <div className="flex items-center justify-between px-5 sm:px-6 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C61A1A] animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      Profit Ledger
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C61A1A] bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                    5D Framework
                  </span>
                </div>

                {/* Headline figure */}
                <div className="flex flex-wrap items-end justify-between gap-3 px-5 sm:px-6 pt-4">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Profits generated
                    </span>
                    <span className="mt-1 block text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums leading-none">
                      $<CountUp value="1.14M" />
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[11px] font-extrabold text-[#C61A1A] tabular-nums">
                    <TrendingUp className="w-3.5 h-3.5" />
                    300% M1 → M12
                  </span>
                </div>

                {/* Interactive bar chart */}
                <div className="px-5 sm:px-6 pt-5 pb-1">
                  <div className="relative h-36 sm:h-44">
                    {/* gridlines */}
                    {[25, 50, 75].map((g) => (
                      <span
                        key={g}
                        className="absolute left-0 right-0 border-t border-slate-100"
                        style={{ top: `${g}%` }}
                        aria-hidden="true"
                      />
                    ))}

                    {/* trend line */}
                    {reduceMotion ? (
                      <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full"
                        aria-hidden="true"
                      >
                        <path
                          d={trendPath}
                          fill="none"
                          stroke="#C61A1A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full"
                        aria-hidden="true"
                      >
                        <motion.path
                          d={trendPath}
                          fill="none"
                          stroke="#C61A1A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </svg>
                    )}

                    {/* bars */}
                    <div className="absolute inset-0 flex items-end gap-1.5">
                      {PROFIT_MONTHS.map((p, i) => {
                        const delta =
                          i > 0
                            ? Math.round(
                                ((p.v - PROFIT_MONTHS[i - 1].v) / PROFIT_MONTHS[i - 1].v) * 100,
                              )
                            : null;
                        return (
                          <button
                            key={p.m}
                            type="button"
                            aria-label={`${p.m}: $${p.v}K profit`}
                            onMouseEnter={() => setHoverBar(i)}
                            onMouseLeave={() => setHoverBar(null)}
                            onFocus={() => setHoverBar(i)}
                            onBlur={() => setHoverBar(null)}
                            onClick={() => setHoverBar(i)}
                            className={`group relative flex h-full flex-1 cursor-pointer items-end outline-none ${
                              activeBar === i ? 'z-10' : 'z-0'
                            }`}
                          >
                            <motion.span
                              initial={reduceMotion ? false : { scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: 0.3 + i * 0.05,
                                duration: 0.55,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              style={{
                                height: `${(p.v / PROFIT_MAX) * BAR_SCALE}%`,
                                transformOrigin: 'bottom',
                              }}
                              className={`w-full rounded-t-md transition-colors duration-200 ${
                                activeBar === i
                                  ? 'bg-[#C61A1A]'
                                  : 'bg-[#C61A1A]/25 group-hover:bg-[#C61A1A]/55'
                              }`}
                            />
                            {activeBar === i && (
                              <span
                                className={`absolute bottom-full mb-2 whitespace-nowrap ${
                                  i === 0
                                    ? 'left-0'
                                    : i === PROFIT_MONTHS.length - 1
                                      ? 'right-0'
                                      : 'left-1/2 -translate-x-1/2'
                                }`}
                              >
                                <motion.span
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.18 }}
                                  className="block rounded-lg bg-[#18181B] px-2.5 py-1.5 text-[10px] font-extrabold text-white tabular-nums shadow-lg"
                                >
                                  {p.m} · ${p.v}K
                                  {delta !== null && (
                                    <span className="ml-1 text-red-400">
                                      {delta >= 0 ? '↑' : '↓'}
                                      {Math.abs(delta)}%
                                    </span>
                                  )}
                                </motion.span>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* month axis */}
                  <div className="mt-2 flex gap-1.5">
                    {PROFIT_MONTHS.map((p, i) => (
                      <span
                        key={p.m}
                        className={`flex-1 text-center text-[8px] font-bold uppercase tracking-wide sm:text-[9px] ${
                          activeBar === i ? 'text-[#C61A1A]' : 'text-slate-400'
                        }`}
                      >
                        {p.m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Proof strip */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/60">
                  {ENGINE_STATS.map((stat) => (
                    <div key={stat.label} className="py-3.5 px-2 text-center">
                      <div className="text-lg sm:text-xl font-extrabold text-slate-900 leading-none tabular-nums">
                        <CountUp value={stat.value} />
                      </div>
                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Under-card: system label */}
              <div className="mt-3 mx-auto w-fit flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181B] text-white text-xs font-semibold shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                Powered by the 5D Growth Framework
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
