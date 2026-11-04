import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, X, Check, TrendingUp, MoveHorizontal } from 'lucide-react';
import { TRADITIONAL_VS_DIGIVIBZ } from '../data/content';
import { Reveal } from './Reveal';
import { CountUp } from './CountUp';
import { Logo } from './Logo';

interface AgencyComparisonProps {
  onOpenAudit: () => void;
}

/* ------------------------------------------------------------------
   Shared funnel geometry — one shape, two paint jobs.
   Both layers render the funnel at the exact same position so the
   seeker bar visually "splits" it: cracked stone gray on the
   traditional side, brand-red ramp on the DIGIVIBZ side.
------------------------------------------------------------------ */
const FUNNEL_BANDS = [
  'M 20 30 A 100 24 0 0 0 220 30 L 190 116 A 70 17 0 0 1 50 116 Z',
  'M 50 120 A 70 17 0 0 0 190 120 L 176 174 A 56 14 0 0 1 64 174 Z',
  'M 64 178 A 56 14 0 0 0 176 178 L 164 228 A 44 12 0 0 1 76 228 Z',
  'M 76 232 A 44 12 0 0 0 164 232 L 154 278 A 34 10 0 0 1 86 278 Z',
  'M 86 282 A 34 10 0 0 0 154 282 L 146 318 A 26 8 0 0 1 94 318 Z',
];

const FUNNEL_CRACKS = [
  'M 66 44 L 84 64 L 72 86 L 92 108',
  'M 158 52 L 144 76 L 160 98 L 148 116',
  'M 104 132 L 120 154 L 108 174',
  'M 148 192 L 134 214 L 146 236',
  'M 96 246 L 112 268 L 100 290',
];

const FUNNEL_PALETTES = {
  traditional: {
    stops: [
      ['#F1F5F9', '#E2E8F0'],
      ['#E2E8F0', '#CBD5E1'],
      ['#CBD5E1', '#94A3B8'],
      ['#94A3B8', '#64748B'],
      ['#64748B', '#475569'],
    ],
    lip: '#E2E8F0',
    inner: '#94A3B8',
    crack: '#64748B',
  },
  digivibz: {
    stops: [
      ['#D92121', '#C61A1A'],
      ['#C61A1A', '#A51615'],
      ['#A51615', '#8A1111'],
      ['#8A1111', '#6E0D0D'],
      ['#6E0D0D', '#4A0909'],
    ],
    lip: '#D92121',
    inner: '#6E0D0D',
    crack: null as string | null,
  },
} as const;

const CompareFunnel: React.FC<{ variant: keyof typeof FUNNEL_PALETTES }> = ({ variant }) => {
  const p = FUNNEL_PALETTES[variant];
  return (
    <svg viewBox="0 0 240 340" className="w-full h-auto select-none" aria-hidden="true">
      <defs>
        {p.stops.map((stops, i) => (
          <linearGradient key={i} id={`cmpFunnel-${variant}-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stops[0]} />
            <stop offset="100%" stopColor={stops[1]} />
          </linearGradient>
        ))}
      </defs>

      {FUNNEL_BANDS.map((d, i) => (
        <path key={i} d={d} fill={`url(#cmpFunnel-${variant}-${i})`} />
      ))}

      {/* 3D rim: bright lip + dark interior */}
      <ellipse cx="120" cy="30" rx="100" ry="24" fill={p.lip} />
      <ellipse cx="120" cy="33" rx="84" ry="16" fill={p.inner} />

      {p.crack && (
        <g
          stroke={p.crack}
          strokeWidth="1.6"
          fill="none"
          opacity="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {FUNNEL_CRACKS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      )}
    </svg>
  );
};

const clampPos = (v: number) => Math.min(96, Math.max(4, v));

export const AgencyComparison: React.FC<AgencyComparisonProps> = ({ onOpenAudit }) => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const jumpTo = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    setPos(clampPos(((clientX - rect.left) / rect.width) * 100));
  };

  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const onHandle = !!(e.target as HTMLElement).closest?.('[data-slider-handle]');
    // Touch: only the handle drags; swiping elsewhere must keep scrolling the page.
    if (e.pointerType === 'touch' && !onHandle) return;
    draggingRef.current = true;
    try {
      containerRef.current?.setPointerCapture(e.pointerId);
    } catch {
      /* synthetic pointers may not be capturable */
    }
    jumpTo(e.clientX);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) jumpTo(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    try {
      containerRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const onHandleKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPos((p) => clampPos(p - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPos((p) => clampPos(p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPos(4);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPos(96);
    }
  };

  const fade = 36;
  const tradMask = `linear-gradient(to right, #000 0, #000 calc(${pos}% - ${fade}px), transparent calc(${pos}%))`;
  const digiMask = `linear-gradient(to left, #000 0, #000 calc(${100 - pos}% - ${fade}px), transparent calc(${100 - pos}%))`;
  const maskStyle = (mask: string): React.CSSProperties => ({
    maskImage: mask,
    WebkitMaskImage: mask,
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskSize: '100% 100%',
    WebkitMaskSize: '100% 100%',
  });

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Turn Marketing From An Expense Into An AI-Powered Revenue System With a{' '}
              <span className="text-[#C61A1A]">Top-Rated Digital Marketing Agency</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-4 space-y-1 text-sm sm:text-base text-slate-600">
            <p className="font-semibold text-slate-900">
              Traditional Agencies vs. The DIGIVIBZ Growth System
            </p>
            <p>
              Most agencies still work the old way. They focus on tasks, channels, and monthly activities.
            </p>
            <p className="font-medium text-slate-800">
              DIGIVIBZ works differently. We focus on systems, measurable outcomes, and sustainable revenue growth.
            </p>
          </Reveal>
        </div>

        {/* ---------------- Mobile / tablet: stacked cards ---------------- */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch lg:hidden">

          {/* Traditional */}
          <Reveal>
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 h-full hover:shadow-md transition-shadow">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  The Legacy Model
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Traditional Agency Approach
                </h3>
              </div>
              <div className="space-y-3.5">
                {TRADITIONAL_VS_DIGIVIBZ.traditional.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <span className="p-0.5 rounded-full bg-slate-100 text-slate-400 mt-0.5 shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Center: hourglass + stat */}
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center justify-center p-4 h-full">
              <div className="relative w-full max-w-[280px] flex flex-col items-center text-center">

                <div className="mb-4 bg-white p-4 rounded-xl border border-red-100 shadow-md dz-glow-pulse rounded-xl">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C61A1A] uppercase tracking-wider mb-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Proven Multiplier
                  </div>
                  <div className="text-4xl font-extrabold text-[#C61A1A] tracking-tight">
                    <CountUp value="4X" />
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    average revenue growth across our client engagements
                  </p>
                </div>

                <svg viewBox="0 0 200 240" className="w-44 h-auto drop-shadow-sm select-none overflow-visible">
                  <defs>
                    <linearGradient id="hourGradTop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F1F5F9" />
                      <stop offset="100%" stopColor="#E2E8F0" />
                    </linearGradient>
                    <linearGradient id="hourGradBottom" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FEE2E2" />
                      <stop offset="100%" stopColor="#FECACA" />
                    </linearGradient>
                  </defs>

                  <path d="M20 20 L180 20 L115 110 L85 110 Z" fill="url(#hourGradTop)" stroke="#E2E8F0" strokeWidth="2" />
                  <path d="M85 130 L115 130 L180 220 L20 220 Z" fill="url(#hourGradBottom)" stroke="#E2E8F0" strokeWidth="2" />
                  <line x1="100" y1="110" x2="100" y2="130" stroke="#C61A1A" strokeWidth="4" strokeDasharray="3 3" />

                  {/* Animated grains streaming through the neck */}
                  <circle cx="100" cy="112" r="3" fill="#C61A1A" style={{ animation: 'dz-drop 1.8s linear infinite' }} />
                  <circle cx="100" cy="112" r="2.5" fill="#C61A1A" style={{ animation: 'dz-drop 1.8s linear infinite', animationDelay: '0.6s' }} />
                  <circle cx="100" cy="112" r="2" fill="#C61A1A" style={{ animation: 'dz-drop 1.8s linear infinite', animationDelay: '1.2s' }} />
                </svg>

                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-2">
                  Predictable Flow Architecture
                </span>
              </div>
            </div>
          </Reveal>

          {/* DIGIVIBZ */}
          <Reveal delay={0.15}>
            <div className="bg-white p-6 sm:p-7 rounded-2xl border-2 border-red-500/20 shadow-md space-y-4 relative overflow-hidden h-full hover:shadow-lg transition-shadow">
              <div className="absolute top-0 right-0 bg-[#C61A1A] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                AI-Powered
              </div>
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-[#C61A1A] uppercase tracking-wider block">
                  The Modern Solution
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  The DIGIVIBZ Growth System
                </h3>
              </div>
              <div className="space-y-3.5">
                {TRADITIONAL_VS_DIGIVIBZ.digivibz.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium"
                  >
                    <span className="p-0.5 rounded-full bg-red-100 text-[#C61A1A] mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ------------ Desktop: draggable seeker-bar comparison ------------ */}
        <Reveal className="hidden lg:block mt-14">
          <div
            ref={containerRef}
            onPointerDown={startDrag}
            onPointerMove={onMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
            className="relative h-[560px] rounded-3xl border border-slate-200 bg-white overflow-hidden select-none cursor-ew-resize shadow-xs"
          >
            {/* Traditional layer — visible LEFT of the seeker */}
            <div className="absolute inset-0 z-0" style={maskStyle(tradMask)}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-[36%] pl-8 xl:pl-10 pr-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    The Legacy Model
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    Traditional Agency Approach
                  </h3>
                  <div className="mt-5 space-y-3">
                    {TRADITIONAL_VS_DIGIVIBZ.traditional.map((point, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <span className="p-0.5 rounded-full bg-slate-100 text-slate-400 mt-0.5 shrink-0">
                          <X className="w-3.5 h-3.5" />
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Traditional funnel half — identical position in both layers */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] xl:w-[272px] pointer-events-none">
                <CompareFunnel variant="traditional" />
              </div>
            </div>

            {/* DIGIVIBZ layer — visible RIGHT of the seeker */}
            <div className="absolute inset-0 z-10" style={maskStyle(digiMask)}>
              <div className="absolute inset-0 flex items-center justify-end">
                <div className="w-[36%] pr-8 xl:pr-10 pl-4">
                  <span className="text-xs font-bold text-[#C61A1A] uppercase tracking-wider block">
                    The Modern Solution
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    The DIGIVIBZ Growth System
                  </h3>

                  {/* Proven Multiplier stat */}
                  <div className="mt-4 bg-white p-3.5 rounded-xl border border-red-100 shadow-md">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C61A1A] uppercase tracking-wider mb-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Proven Multiplier
                    </div>
                    <div className="text-4xl font-extrabold text-[#C61A1A] tracking-tight">
                      <CountUp value="4X" />
                    </div>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      average revenue growth across our client engagements
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {TRADITIONAL_VS_DIGIVIBZ.digivibz.map((point, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-slate-800 font-medium"
                      >
                        <span className="p-0.5 rounded-full bg-red-100 text-[#C61A1A] mt-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5">
                    <Logo size="sm" />
                  </div>
                </div>
              </div>

              {/* DIGIVIBZ funnel half — identical position in both layers */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] xl:w-[272px] pointer-events-none">
                <CompareFunnel variant="digivibz" />
              </div>
            </div>

            {/* Seeker bar */}
            <div
              className="absolute inset-y-0 z-20 w-[3px] bg-[#18181B] -translate-x-1/2 pointer-events-none"
              style={{ left: `${pos}%` }}
            />
            <button
              type="button"
              data-slider-handle
              role="slider"
              aria-label="Compare traditional marketing with the DIGIVIBZ growth system"
              aria-orientation="horizontal"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              onKeyDown={onHandleKey}
              className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#18181B] text-white shadow-lg flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#C61A1A] focus:ring-offset-2"
              style={{ left: `${pos}%`, touchAction: 'none' }}
            >
              <MoveHorizontal className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
            <MoveHorizontal className="w-3.5 h-3.5" />
            Drag the handle — traditional marketing on the left, the complete DIGIVIBZ way on the right
          </p>
        </Reveal>

        {/* CTA */}
        <div className="mt-14 text-center space-y-4">
          <Reveal>
            <button
              onClick={onOpenAudit}
              className="dz-btn-shine inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C61A1A] hover:bg-[#9E1414] text-white font-semibold text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <span>Get My Free Growth Audit</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xs sm:text-sm text-slate-500 italic max-w-xl mx-auto">
              The difference isn't just on paper. Here's what this system actually delivered, across real businesses, in real industries.
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
};
