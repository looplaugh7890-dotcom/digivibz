import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { CountUp } from '../components/CountUp';

interface AboutHeroProps {
  onOpenAudit: () => void;
}

/** The five stages orbiting the engine core, mirrored in the strip under the schematic. */
const ENGINE_STAGES = ['Discover', 'Design', 'Develop', 'Deploy', 'Detect'];

/** Positions of the 5 stage nodes on the orbit ring (center 280,158 / r 84). */
const STAGE_NODES = [
  { x: 280, y: 74 },
  { x: 359.9, y: 132 },
  { x: 329.4, y: 225.9 },
  { x: 230.6, y: 225.9 },
  { x: 200.1, y: 132 },
];

const ENGINE_STATS = [
  { value: '5+', label: 'Years' },
  { value: '1000+', label: 'Projects' },
  { value: '250+', label: 'Businesses' },
];

/**
 * About hero — left column is the copy, right column is the animated
 * "Growth Engine" schematic: marketing spend enters the 5D core (five
 * stages orbiting a red reactor) and leaves as predictable revenue.
 * Same motive as the page: growth is engineered, not gambled.
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

  const spin = (duration: number) =>
    reduceMotion ? undefined : { animation: `dz-orbit ${duration}s linear infinite`, transformOrigin: '280px 158px' };

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
          {/* Right column: the Growth Engine schematic                    */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center w-full pt-2 lg:pt-0">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* Engine panel */}
              <div className="rounded-3xl bg-white border border-slate-200 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] overflow-hidden">
                {/* Panel header */}
                <div className="flex items-center justify-between px-5 sm:px-6 pt-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C61A1A] animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      The Growth Engine
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C61A1A] bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                    5D Framework
                  </span>
                </div>

                {/* Schematic */}
                <svg viewBox="0 0 560 300" className="w-full select-none" role="img" aria-label="Schematic: marketing spend enters the 5D Growth Engine and leaves as predictable revenue">
                  {/* Input connector: spend → core */}
                  <line x1="112" y1="158" x2="192" y2="158" stroke="#E2E8F0" strokeWidth="2" />
                  <line x1="112" y1="158" x2="192" y2="158" stroke="#C61A1A" strokeWidth="2" strokeDasharray="10 8" className="dz-flow" opacity="0.5" />
                  <path d="M188 152 L196 158 L188 164" fill="none" stroke="#C61A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Output connector: core → revenue */}
                  <line x1="368" y1="158" x2="448" y2="158" stroke="#E2E8F0" strokeWidth="2" />
                  <line x1="368" y1="158" x2="448" y2="158" stroke="#C61A1A" strokeWidth="2" strokeDasharray="10 8" className="dz-flow" opacity="0.5" />
                  <path d="M444 152 L452 158 L444 164" fill="none" stroke="#C61A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Input node: scattered spend */}
                  <rect x="20" y="120" width="92" height="76" rx="16" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                  <circle cx="48" cy="146" r="4.5" fill="#94A3B8" />
                  <circle cx="70" cy="158" r="4.5" fill="#CBD5E1" />
                  <circle cx="52" cy="172" r="4.5" fill="#94A3B8" opacity="0.6" />
                  <circle cx="82" cy="140" r="3" fill="#CBD5E1" opacity="0.8" />
                  <text x="66" y="216" textAnchor="middle" className="dz-engine-label" fontSize="10" fontWeight="700" fill="#64748B" letterSpacing="1">MARKETING</text>
                  <text x="66" y="230" textAnchor="middle" className="dz-engine-label" fontSize="10" fontWeight="700" fill="#64748B" letterSpacing="1">SPEND</text>

                  {/* Output node: predictable revenue */}
                  <rect x="448" y="120" width="92" height="76" rx="16" fill="#C61A1A" />
                  <path d="M494 174 L494 146 M484 156 L494 146 L504 156" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="494" y="216" textAnchor="middle" className="dz-engine-label" fontSize="10" fontWeight="700" fill="#64748B" letterSpacing="1">PREDICTABLE</text>
                  <text x="494" y="230" textAnchor="middle" className="dz-engine-label" fontSize="10" fontWeight="700" fill="#64748B" letterSpacing="1">REVENUE</text>

                  {/* Orbit ring */}
                  <circle cx="280" cy="158" r="84" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
                  <g style={spin(26)}>
                    <circle cx="280" cy="158" r="84" fill="none" stroke="#C61A1A" strokeWidth="1.5" strokeDasharray="3 10" opacity="0.45" />
                  </g>

                  {/* Core */}
                  <circle cx="280" cy="158" r="44" fill="#C61A1A" />
                  <text x="280" y="160" textAnchor="middle" fontSize="26" fontWeight="800" fill="#FFFFFF">5D</text>
                  <text x="280" y="178" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="rgba(255,255,255,0.85)" letterSpacing="2.5">ENGINE</text>

                  {/* Stage nodes on the ring */}
                  {STAGE_NODES.map((node, i) => (
                    <g key={ENGINE_STAGES[i]}>
                      <circle cx={node.x} cy={node.y} r="15" fill="#FFFFFF" stroke="#C61A1A" strokeWidth="2" />
                      <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#C61A1A">
                        {i + 1}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Stage legend strip */}
                <div className="grid grid-cols-5 divide-x divide-slate-100 border-t border-slate-100">
                  {ENGINE_STAGES.map((stage, i) => (
                    <div key={stage} className="py-2.5 px-1 text-center">
                      <div className="text-[10px] font-extrabold text-[#C61A1A] tabular-nums">0{i + 1}</div>
                      <div className="mt-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-600 truncate">
                        {stage}
                      </div>
                    </div>
                  ))}
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
