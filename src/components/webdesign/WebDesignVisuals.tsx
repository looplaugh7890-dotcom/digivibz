import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Blocks,
  Check,
  Hand,
  LayoutTemplate,
  MessageSquare,
  MousePointer2,
  MousePointerClick,
  PenTool,
  ShoppingBag,
} from 'lucide-react';

/* ==========================================================================
   1. HERO — "DesignCanvas": a design-tool window. The artboard reflows
   desktop → tablet → phone on a loop (breakpoint control is clickable),
   with rulers, selection handles, and a collaborator cursor. The site is
   being designed in front of you.
   ========================================================================== */

type Phase = 'desktop' | 'tablet' | 'phone';

const PHASES: { key: Phase; label: string; bp: string; width: string; links: number }[] = [
  { key: 'desktop', label: 'Desktop', bp: '1440px', width: '100%', links: 4 },
  { key: 'tablet', label: 'Tablet', bp: '768px', width: '74%', links: 2 },
  { key: 'phone', label: 'Phone', bp: '390px', width: '50%', links: 0 },
];

const NAV_LINKS = ['Work', 'Services', 'About', 'Contact'];

const CURSOR_POS: Record<Phase, { left: string; top: string }> = {
  desktop: { left: '58%', top: '26%' },
  tablet: { left: '40%', top: '44%' },
  phone: { left: '24%', top: '58%' },
};

const HERO_CHIPS = [
  { label: 'Pixel-perfect designs', Icon: PenTool, tone: 'red' },
  { label: 'Figma & Adobe XD', Icon: LayoutTemplate, tone: 'plain' },
  { label: 'Conversion-first', Icon: MousePointerClick, tone: 'plain' },
] as const;

const TOOL_RAIL = [
  { Icon: MousePointer2, active: true },
  { Icon: LayoutTemplate, active: false },
  { Icon: PenTool, active: false },
  { Icon: MessageSquare, active: false },
  { Icon: Hand, active: false },
];

export const DesignCanvas: React.FC = () => {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (reduce || manual) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % PHASES.length), 2800);
    return () => window.clearInterval(id);
  }, [reduce, manual]);

  const phase = PHASES[idx];
  const cards = phase.key === 'desktop' ? 3 : phase.key === 'tablet' ? 2 : 1;
  const stacked = phase.key === 'phone';

  return (
    <motion.div
      className="relative w-full"
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={reduce ? undefined : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="absolute inset-2 sm:inset-6 bg-[radial-gradient(ellipse_at_50%_45%,rgba(198,26,26,0.12),transparent_70%)] blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* chips above the visual */}
      <div className="relative mb-3 flex flex-wrap items-center gap-2">
        {HERO_CHIPS.map(({ label, Icon, tone }, i) => (
          <motion.span
            key={label}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-extrabold shadow-[0_14px_30px_-18px_rgba(15,23,42,0.45)] ${
              tone === 'red'
                ? 'border-red-200 bg-red-50 text-[#C61A1A]'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: [0, -7, 0] }}
            transition={
              reduce
                ? undefined
                : {
                    opacity: { duration: 0.5, delay: 0.5 + i * 0.15 },
                    y: { duration: 3.4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' },
                  }
            }
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </motion.span>
        ))}
      </div>

      <div
        className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_36px_80px_-42px_rgba(15,23,42,0.6)]"
        role="img"
        aria-label="A design tool window where a website artboard reflows between desktop, tablet, and phone layouts"
      >
        {/* title bar */}
        <div className="flex items-center gap-2.5 border-b border-slate-200 bg-slate-50/70 px-3 sm:px-4 py-2.5">
          <span className="hidden sm:flex gap-1.5 shrink-0" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </span>

          {/* breakpoint control */}
          <div className="flex flex-1 justify-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
            {PHASES.map((p, i) => (
              <button
                key={p.key}
                type="button"
                onClick={() => {
                  setManual(true);
                  setIdx(i);
                }}
                aria-pressed={idx === i}
                className={`flex-1 rounded-md px-1.5 sm:px-2.5 py-1 text-[9.5px] sm:text-[10.5px] font-extrabold uppercase tracking-wide transition-colors cursor-pointer ${
                  idx === i
                    ? 'bg-[#C61A1A] text-white'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <span className="hidden sm:block w-14 text-right font-mono text-[10px] font-bold text-slate-400">
            {phase.bp}
          </span>
        </div>

        <div className="flex">
          {/* tool rail */}
          <div className="flex sm:flex-col gap-1 border-r border-slate-200 bg-slate-50/70 px-1.5 py-2.5">
            {TOOL_RAIL.map(({ Icon, active }, i) => (
              <span
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-md ${
                  active
                    ? 'bg-[#C61A1A] text-white'
                    : 'text-slate-400 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </span>
            ))}
          </div>

          {/* canvas */}
          <div className="relative min-h-[300px] flex-1 bg-slate-100 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px] px-3 sm:px-6 py-5">
            {/* rulers */}
            <div
              className="absolute inset-x-0 top-0 h-3.5 border-b border-slate-300/70 bg-[repeating-linear-gradient(90deg,#CBD5E1_0_1px,transparent_1px_24px)]"
              aria-hidden="true"
            />
            <div
              className="absolute inset-y-0 left-0 w-3.5 border-r border-slate-300/70 bg-[repeating-linear-gradient(180deg,#CBD5E1_0_1px,transparent_1px_24px)]"
              aria-hidden="true"
            />

            {/* artboard + collaborator cursor */}
            <div className="relative mt-3.5">
              <motion.div
                initial={false}
                animate={{ width: phase.width }}
                transition={{ type: 'spring', stiffness: 240, damping: 30 }}
                className="relative mx-auto"
              >
                {/* frame label */}
                <div className="absolute -top-5 left-0 flex items-center gap-2">
                  <span className="font-mono text-[9.5px] font-extrabold text-[#C61A1A]">
                    Home / Hero
                  </span>
                  <span className="font-mono text-[9.5px] text-slate-400">{phase.bp}</span>
                </div>

                {/* selection */}
                <div className="pointer-events-none absolute -inset-1.5 border border-[#C61A1A]/70" aria-hidden="true">
                  {[
                    'left-0 top-0',
                    'right-0 top-0',
                    'left-0 bottom-0',
                    'right-0 bottom-0',
                  ].map((pos) => (
                    <span
                      key={pos}
                      className={`absolute h-1.5 w-1.5 bg-white border border-[#C61A1A] ${pos}`}
                    />
                  ))}
                </div>

                {/* the design */}
                <div className="rounded-md bg-white p-3 sm:p-4 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.6)]">
                  {/* nav */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-full bg-slate-900 ${stacked ? 'h-2.5 w-10' : 'h-2.5 w-14'}`} />
                    <div className="flex items-center gap-2.5">
                      <AnimatePresence>
                        {PHASES[idx].links > 0 && (
                          <motion.span
                            layout={!reduce}
                            className="hidden sm:flex gap-2"
                            key={`links-${phase.links}`}
                          >
                            {NAV_LINKS.slice(0, phase.links).map((l) => (
                              <span key={l} className="h-1.5 w-7 rounded-full bg-slate-300" />
                            ))}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {phase.links === 0 && (
                        <span className="flex flex-col gap-[3px]" aria-hidden="true">
                          <span className="h-[2px] w-4 bg-slate-700" />
                          <span className="h-[2px] w-4 bg-slate-700" />
                          <span className="h-[2px] w-4 bg-slate-700" />
                        </span>
                      )}
                      <motion.span
                        layout={!reduce}
                        className={`rounded bg-[#C61A1A] ${stacked ? 'h-4 w-8' : 'h-4 w-12'}`}
                      />
                    </div>
                  </div>

                  {/* hero */}
                  <div className={`mt-3.5 ${stacked ? 'space-y-2' : 'flex items-start gap-3'}`}>
                    <div className="flex-1 space-y-1.5">
                      <motion.span
                        layout={!reduce}
                        className={`block rounded bg-slate-800 ${stacked ? 'h-2.5 w-[88%]' : 'h-3 w-[76%]'}`}
                      />
                      <motion.span
                        layout={!reduce}
                        className={`block rounded bg-slate-800 ${stacked ? 'h-2.5 w-[64%]' : 'h-3 w-[56%]'}`}
                      />
                      <span className="block h-1.5 w-[70%] rounded bg-slate-200" />
                      <span className="block h-1.5 w-[52%] rounded bg-slate-200" />
                      <motion.span
                        layout={!reduce}
                        className={`mt-1.5 block rounded bg-[#C61A1A] ${stacked ? 'h-5 w-full' : 'h-5 w-20'}`}
                      />
                    </div>
                    {!stacked && (
                      <motion.span
                        layout={!reduce}
                        className="block h-16 w-[38%] shrink-0 rounded bg-slate-100 border border-slate-200"
                      />
                    )}
                  </div>

                  {/* cards */}
                  <div className="mt-3.5 grid grid-cols-3 gap-2">
                    {[0, 1, 2].map((c) => (
                      <AnimatePresence key={c}>
                        {c < cards && (
                          <motion.span
                            initial={false}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.3 }}
                            className="block rounded border border-slate-200 bg-slate-50 p-1.5"
                          >
                            <span className="block h-1.5 w-2/3 rounded bg-slate-300" />
                            <span className="mt-1 block h-1 w-full rounded bg-slate-200" />
                            <span className="mt-1 block h-1 w-4/5 rounded bg-slate-200" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* collaborator cursor */}
              <motion.span
                className="absolute z-10 flex items-start"
                initial={false}
                animate={CURSOR_POS[phase.key]}
                transition={{ type: 'spring', stiffness: 200, damping: 26 }}
              >
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
                  <path d="M1 1 L13 8 L7.2 9.2 L5 16 Z" fill="#C61A1A" stroke="#FFFFFF" strokeWidth="1.2" />
                </svg>
                <span className="ml-0.5 -mt-1 rounded rounded-tl-none bg-[#C61A1A] px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold text-white">
                  Digivibz
                </span>
              </motion.span>
            </div>
          </div>
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/70 px-4 py-2 font-mono text-[10px]">
          <span className="text-slate-500">artboard · {phase.label.toLowerCase()}</span>
          <span className="font-bold text-[#C61A1A]">zoom 83%</span>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   2. PROBLEM — "ScanPath": an eye-tracking scanpath over a wireframe that
   runs out of the 7-second window and bounces.
   ========================================================================== */

const GAZE = [
  { x: 62, y: 30, n: '1', delay: 0.5 },
  { x: 130, y: 66, n: '2', delay: 1.3 },
  { x: 106, y: 154, n: '3', delay: 2.2 },
  { x: 314, y: 122, n: '4', delay: 3.2 },
  { x: 74, y: 228, n: '5', delay: 4.3 },
];

export const ScanPath: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.55)]"
      role="img"
      aria-label="An eye-tracking scanpath over a page wireframe: five fixations, then the visitor bounces before seven seconds"
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-3">
        <span className="font-mono text-[11px] font-bold text-slate-500">first-impression.test</span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2 py-1 font-mono text-[10px] font-extrabold text-[#C61A1A]">
          7-second window
        </span>
      </div>

      <div className="px-4 pt-4 pb-4">
        <div className="relative">
          <svg viewBox="0 0 440 268" className="block w-full h-auto" aria-hidden="true">
          {/* wireframe page */}
          <rect x="8" y="8" width="424" height="24" rx="4" fill="#E2E8F0" />
          <circle cx="24" cy="20" r="5" fill="#94A3B8" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={300 + i * 44} y="17" width="32" height="6" rx="3" fill="#CBD5E1" />
          ))}

          <rect x="8" y="46" width="216" height="16" rx="4" fill="#CBD5E1" />
          <rect x="8" y="68" width="150" height="12" rx="4" fill="#E2E8F0" />

          <rect x="8" y="94" width="200" height="86" rx="6" fill="#F1F5F9" stroke="#E2E8F0" />
          <rect x="224" y="94" width="208" height="10" rx="4" fill="#E2E8F0" />
          <rect x="224" y="112" width="184" height="10" rx="4" fill="#E2E8F0" />
          <rect x="224" y="130" width="196" height="10" rx="4" fill="#E2E8F0" />
          <rect x="224" y="152" width="96" height="24" rx="5" fill="#C61A1A" />

          <rect x="8" y="196" width="128" height="60" rx="6" fill="#F1F5F9" stroke="#E2E8F0" />
          <rect x="152" y="196" width="128" height="60" rx="6" fill="#F1F5F9" stroke="#E2E8F0" />
          <rect x="296" y="196" width="136" height="60" rx="6" fill="#F1F5F9" stroke="#E2E8F0" />

          {/* scanpath */}
          <motion.polyline
            points={GAZE.map((g) => `${g.x},${g.y}`).join(' ')}
            fill="none"
            stroke="#C61A1A"
            strokeWidth="1.6"
            strokeDasharray="5 6"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 4.4, delay: 0.5, ease: 'linear' }}
          />
          {GAZE.map((g) => (
            <motion.g
              key={g.n}
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 420, damping: 20, delay: g.delay }}
            >
              <circle cx={g.x} cy={g.y} r="12" fill="#FFFFFF" fillOpacity="0.88" stroke="#C61A1A" strokeWidth="2" />
              <text
                x={g.x}
                y={g.y + 4}
                fontSize="11"
                fontWeight="800"
                textAnchor="middle"
                fill="#C61A1A"
                style={{ fontFamily: 'monospace' }}
              >
                {g.n}
              </text>
            </motion.g>
          ))}
        </svg>

        {/* bounce stamp */}
        <motion.span
          initial={reduce ? false : { scale: 1.6, opacity: 0, rotate: -14 }}
          whileInView={{ scale: 1, opacity: 1, rotate: -7 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 5.2 }}
          className="absolute right-3 sm:right-6 top-[54%] rounded-md border-2 border-[#C61A1A] bg-white/90 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#C61A1A] shadow-sm"
        >
          Bounced
        </motion.span>
        </div>

        {/* attention bar */}
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5">
          <div className="flex items-baseline justify-between font-mono text-[10px] font-bold text-slate-500">
            <span>Attention</span>
            <span className="text-[#C61A1A]">7.0s</span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#C61A1A]"
              initial={reduce ? false : { width: '100%' }}
              whileInView={{ width: '7%' }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 6, delay: 0.4, ease: 'linear' }}
              style={reduce ? { width: '7%' } : undefined}
            />
          </div>
          <div className="mt-1 flex justify-between font-mono text-[9px] text-slate-400">
            <span>0s</span>
            <span>visitors decide here</span>
            <span>7s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   3. SERVICES — "WireframePreview": a bespoke mini wireframe per service.
   ========================================================================== */

const G1 = '#E2E8F0';
const G2 = '#F1F5F9';
const G3 = '#CBD5E1';
const RED = '#C61A1A';

export const WireframePreview: React.FC<{ variant: string }> = ({ variant }) => {
  const bar = (x: number, y: number, w: number, h: number, fill = G1, key?: React.Key) => (
    <rect key={key} x={x} y={y} width={w} height={h} rx="3" fill={fill} />
  );

  const nav = (
    <>
      {bar(8, 8, 144, 9)}
      {bar(10, 10.5, 18, 4, '#94A3B8')}
    </>
  );

  switch (variant) {
    case 'landing':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {nav}
          {bar(8, 26, 96, 11, '#334155')}
          {bar(8, 41, 64, 7, G3)}
          {bar(8, 54, 46, 13, RED)}
          {bar(8, 74, 144, 6, G2)}
        </svg>
      );
    case 'business':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {nav}
          {bar(8, 25, 72, 10, '#334155')}
          {bar(8, 40, 36, 11, RED)}
          {[
            [8, 58],
            [58, 58],
            [108, 58],
          ].map(([x, y]) => (
            <g key={x}>
              {bar(x, y, 44, 22, G2)}
              {bar(x + 4, y + 5, 24, 4, G3)}
              {bar(x + 4, y + 13, 34, 4, G1)}
            </g>
          ))}
        </svg>
      );
    case 'corporate':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {nav}
          {bar(8, 25, 144, 24, G2)}
          {bar(12, 32, 70, 5, G3)}
          {bar(12, 40, 44, 4, G1)}
          {[8, 46, 84, 122].map((x, i) => (
            <g key={x}>
              {bar(x, 56, 34, 24, i === 0 ? G3 : G2)}
              {bar(x + 4, 72, 16, 4, i === 0 ? RED : G3)}
            </g>
          ))}
        </svg>
      );
    case 'ecommerce':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {nav}
          {bar(96, 10, 40, 5, G3)}
          {[
            [8, 24],
            [58, 24],
            [108, 24],
            [8, 56],
            [58, 56],
            [108, 56],
          ].map(([x, y], i) => (
            <g key={`${x}-${y}`}>
              {bar(x, y, 44, 24, G2)}
              {bar(x + 4, y + 4, 36, 10, G1)}
              {bar(x + 4, y + 17, 14, 4, i === 0 ? RED : G3)}
            </g>
          ))}
        </svg>
      );
    case 'components':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {bar(8, 10, 44, 15, RED)}
          <rect x="58" y="10" width="44" height="15" rx="4" fill="none" stroke={G3} strokeWidth="2" />
          {bar(8, 33, 94, 13, G2)}
          <rect x="8" y="56" width="16" height="16" rx="3" fill={RED} />
          <rect x="30" y="56" width="16" height="16" rx="3" fill="#0F172A" />
          <rect x="52" y="56" width="16" height="16" rx="3" fill={G3} />
          <rect x="74" y="56" width="16" height="16" rx="3" fill={G2} stroke={G1} />
          <rect x="104" y="59" width="30" height="12" rx="6" fill={G3} />
          <circle cx="128" cy="65" r="4.5" fill={RED} />
          {bar(8, 78, 60, 5, G1)}
        </svg>
      );
    case 'portfolio':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {bar(8, 8, 60, 8, '#334155')}
          {bar(8, 22, 70, 28, G2)}
          {bar(8, 56, 70, 24, G3)}
          {bar(86, 8, 66, 24, G3)}
          {bar(86, 38, 66, 42, G2)}
          {bar(90, 44, 30, 5, RED)}
        </svg>
      );
    case 'blog':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {bar(8, 8, 84, 10, '#334155')}
          {[26, 46, 66].map((y, i) => (
            <g key={y}>
              {bar(8, y, 144, 16, G2)}
              {bar(12, y + 3, 16, 10, i === 0 ? RED : G3)}
              {bar(34, y + 4, 90, 4, G3)}
              {bar(34, y + 10, 60, 3, G1)}
            </g>
          ))}
        </svg>
      );
    case 'devices':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          <rect x="8" y="12" width="82" height="52" rx="4" fill="#FFFFFF" stroke={G3} strokeWidth="2" />
          {bar(14, 18, 40, 5, '#334155')}
          {bar(14, 27, 60, 8, G1)}
          {bar(14, 40, 26, 8, RED)}
          {bar(14, 54, 70, 4, G2)}
          <rect x="98" y="18" width="26" height="44" rx="4" fill="#FFFFFF" stroke={G3} strokeWidth="2" />
          {bar(102, 24, 14, 4, '#334155')}
          {bar(102, 32, 18, 6, G1)}
          {bar(102, 44, 12, 6, RED)}
          <rect x="132" y="24" width="20" height="38" rx="4" fill="#FFFFFF" stroke={G3} strokeWidth="2" />
          {bar(135, 29, 10, 3, '#334155')}
          {bar(135, 36, 14, 5, G1)}
          {bar(135, 46, 9, 5, RED)}
          {bar(30, 72, 100, 6, G2)}
        </svg>
      );
    case 'editor':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {bar(8, 8, 36, 72, G2)}
          {[16, 28, 40, 52].map((y, i) => (
            <g key={y}>
              <rect x="13" y={y} width="5" height="5" rx="1" fill={i === 0 ? RED : G3} />
              {bar(22, y + 1, 16, 3, G3)}
            </g>
          ))}
          {bar(52, 8, 100, 9, '#334155')}
          {bar(52, 24, 100, 5, G1)}
          {bar(52, 33, 84, 5, G1)}
          {bar(52, 46, 50, 18, G2)}
          {bar(106, 46, 46, 18, G2)}
          {bar(52, 70, 40, 10, RED)}
        </svg>
      );
    case 'single':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {bar(64, 8, 32, 6, '#334155')}
          {bar(34, 22, 92, 11, '#334155')}
          {bar(48, 37, 64, 6, G3)}
          {bar(54, 49, 52, 14, RED)}
          {bar(40, 70, 80, 6, G2)}
        </svg>
      );
    case 'redesign':
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          <defs>
            <clipPath id="wd-left">
              <rect x="0" y="0" width="80" height="88" />
            </clipPath>
            <clipPath id="wd-right">
              <rect x="80" y="0" width="80" height="88" />
            </clipPath>
          </defs>
          <g clipPath="url(#wd-left)" opacity="0.75">
            {bar(8, 8, 64, 9, G3)}
            {bar(8, 24, 64, 16, G1)}
            {bar(8, 46, 30, 10, G3)}
            {bar(8, 62, 64, 6, G1)}
            {bar(8, 74, 64, 6, G1)}
          </g>
          <g clipPath="url(#wd-right)">
            {bar(86, 8, 66, 9, '#334155')}
            {bar(86, 24, 66, 16, G2)}
            {bar(86, 46, 34, 11, RED)}
            {bar(86, 63, 60, 5, G1)}
            {bar(86, 72, 44, 5, G1)}
          </g>
          <line x1="80" y1="4" x2="80" y2="84" stroke={RED} strokeWidth="1.5" strokeDasharray="5 5" />
          <circle cx="80" cy="44" r="7" fill="#FFFFFF" stroke={RED} strokeWidth="2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 160 88" className="w-full h-auto" aria-hidden="true">
          {nav}
          {bar(8, 26, 144, 54, G2)}
        </svg>
      );
  }
};

/* ==========================================================================
   4. PLATFORMS — two data tables in design-tool cards.
   ========================================================================== */

export const PlatformTables: React.FC<{
  groups: readonly {
    key: string;
    note: string | null;
    rows: readonly { name: string; body: string }[];
  }[];
  columns: readonly [string, string];
}> = ({ groups, columns }) => {
  const reduce = useReducedMotion();
  const GroupIcon = [Blocks, ShoppingBag];

  return (
    <div className="space-y-6">
      {groups.map((g, gi) => {
        const Icon = GroupIcon[gi] ?? Blocks;
        return (
          <motion.div
            key={g.key}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.5)]"
          >
            <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-3.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C61A1A] text-white">
                <Icon className="w-4 h-4" />
              </span>
              <h3 className="text-base font-extrabold text-slate-900">{g.key}</h3>
              <span className="ml-auto rounded-md border border-red-200 bg-red-50 px-2 py-1 font-mono text-[10px] font-extrabold text-[#C61A1A]">
                {String(g.rows.length).padStart(2, '0')} platforms
              </span>
            </div>

            {g.note && (
              <p className="border-b border-slate-100 px-5 py-3 text-[13px] font-bold text-[#C61A1A]">
                {g.note}
              </p>
            )}

            <div className="grid grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[170px_minmax(0,1fr)] gap-x-4 border-b border-slate-100 px-5 py-2.5">
              <span className="font-mono text-[9.5px] font-extrabold uppercase tracking-widest text-slate-400">
                {columns[0]}
              </span>
              <span className="hidden sm:block font-mono text-[9.5px] font-extrabold uppercase tracking-widest text-slate-400">
                {columns[1]}
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {g.rows.map((row, i) => (
                <motion.div
                  key={row.name}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: 0.06 * i }}
                  className="group grid grid-cols-1 sm:grid-cols-[170px_minmax(0,1fr)] gap-x-4 gap-y-1 px-5 py-4 transition-colors hover:bg-slate-50/70"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-0.5 rounded-full bg-slate-200 transition-colors group-hover:bg-[#C61A1A]" />
                    <span className="text-[15px] font-extrabold text-slate-900">{row.name}</span>
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-slate-600">{row.body}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ==========================================================================
   5. PROCESS — "StageCanvas": stage chips drive a design-tool canvas that
   shows each stage's artifact: research board, wireframe + hi-fi with
   dev-mode inspect, device testing, conversion funnel.
   ========================================================================== */

const ARTIFACTS = [
  { file: 'discovery.board', tool: 'FigJam' },
  { file: 'home.fig', tool: 'Figma' },
  { file: 'inspect', tool: 'Dev Mode' },
  { file: 'launch.check', tool: 'Browser' },
  { file: 'conversion.log', tool: 'Analytics' },
];

const STICKY = [
  { label: 'Audience', rot: -3, red: false },
  { label: 'Competitors', rot: 2.5, red: false },
  { label: 'Goals', rot: -1.5, red: true },
  { label: 'Market', rot: 3, red: false },
];

const INSPECT_ROWS = [
  { k: 'padding', v: '14 / 24' },
  { k: 'color', v: '#C61A1A', swatch: true },
  { k: 'font', v: '16 / 24' },
  { k: 'radius', v: '12' },
  { k: 'gap', v: '16' },
];

const FUNNEL = [
  { label: 'Visitors', pct: 100, w: '100%' },
  { label: 'Engaged', pct: 62, w: '62%' },
  { label: 'Leads', pct: 24, w: '44%' },
  { label: 'Customers', pct: 9.4, w: '26%', red: true },
];

const DeviceFrame: React.FC<{ label: string; className?: string; bar: string }> = ({
  label,
  className,
  bar,
}) => (
  <span className={`flex flex-col items-center gap-1.5 ${className ?? ''}`}>
    <span className="block rounded-[5px] border-2 border-slate-300 bg-white p-1.5 shadow-sm">
      <span className={`block rounded-[3px] bg-slate-100 ${bar}`}>
        <span className="mt-1 ml-1 block h-1 w-1/2 rounded bg-slate-400" />
        <span className="mt-1 ml-1 block h-1 w-2/5 rounded bg-slate-300" />
        <span className="mt-1.5 ml-1 block h-2.5 w-2/5 rounded-sm bg-[#C61A1A]" />
      </span>
    </span>
    <span className="font-mono text-[9px] font-extrabold text-slate-400">{label}</span>
  </span>
);

export const StageCanvas: React.FC<{
  stages: readonly { key: string; body: string }[];
}> = ({ stages }) => {
  const [stage, setStage] = useState(0);
  const reduce = useReducedMotion();
  const artifact = ARTIFACTS[stage];

  return (
    <div>
      {/* stage chips */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
        {stages.map((s, i) => {
          const active = stage === i;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setStage(i)}
              aria-expanded={active}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                active
                  ? 'bg-[#C61A1A] text-white shadow-[0_16px_34px_-18px_rgba(198,26,26,0.9)]'
                  : 'border border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-700'
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[9px] ${
                  active ? 'bg-white text-[#C61A1A]' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.key}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 items-start">
        {/* description */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-[0_28px_60px_-45px_rgba(15,23,42,0.5)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-extrabold leading-none text-red-100">
                  {String(stage + 1).padStart(2, '0')}
                </span>
                <span className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-[#C61A1A]">
                  {stages[stage].key}
                </span>
              </div>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {stages[stage].body}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex gap-1.5" aria-hidden="true">
            {stages.map((s, i) => (
              <span
                key={s.key}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  i <= stage ? 'bg-[#C61A1A]' : 'bg-slate-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* canvas window */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.55)]">
          <div className="flex items-center gap-2.5 border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            </span>
            <span className="ml-1 font-mono text-[10.5px] font-bold text-slate-600">
              {artifact.file}
            </span>
            <span className="ml-auto rounded-md border border-red-200 bg-red-50 px-2 py-0.5 font-mono text-[9.5px] font-extrabold text-[#C61A1A]">
              {artifact.tool}
            </span>
          </div>

          <div className="min-h-[264px] px-4 py-4 sm:px-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* 0 — research board */}
                {stage === 0 && (
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      discovery — week 1
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {STICKY.map((s, i) => (
                        <motion.span
                          key={s.label}
                          initial={reduce ? false : { opacity: 0, y: 12, rotate: 0 }}
                          animate={{ opacity: 1, y: 0, rotate: reduce ? 0 : s.rot }}
                          transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
                          className={`flex h-20 sm:h-24 items-start justify-center rounded-sm px-2 pt-3 text-center font-mono text-[11px] font-extrabold shadow-[0_10px_22px_-16px_rgba(15,23,42,0.7)] ${
                            s.red
                              ? 'bg-[#C61A1A] text-white'
                              : 'bg-white text-slate-600 border border-slate-200'
                          }`}
                        >
                          {s.label}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 1 — wireframe vs hi-fi */}
                {stage === 1 && (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-2.5">
                      <span className="font-mono text-[9.5px] font-extrabold text-slate-400">
                        wireframe
                      </span>
                      <div className="mt-2 space-y-1.5" aria-hidden="true">
                        <span className="block h-2 w-full rounded bg-slate-300" />
                        <span className="block h-4 w-3/4 rounded bg-slate-200" />
                        <span className="block h-4 w-1/2 rounded bg-slate-200" />
                        <span className="block h-6 w-1/3 rounded border border-slate-300" />
                        <span className="grid grid-cols-2 gap-1.5">
                          <span className="h-8 rounded bg-slate-200" />
                          <span className="h-8 rounded bg-slate-200" />
                        </span>
                      </div>
                    </div>
                    <div className="relative rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
                      <span className="font-mono text-[9.5px] font-extrabold text-[#C61A1A]">
                        hi-fi
                      </span>
                      <div className="mt-2 space-y-1.5" aria-hidden="true">
                        <span className="flex items-center justify-between">
                          <span className="h-2 w-8 rounded bg-slate-900" />
                          <span className="h-3.5 w-8 rounded-sm bg-[#C61A1A]" />
                        </span>
                        <span className="block h-4 w-3/4 rounded bg-slate-800" />
                        <span className="block h-4 w-1/2 rounded bg-slate-800" />
                        <span className="block h-6 w-1/3 rounded-sm bg-[#C61A1A]" />
                        <span className="grid grid-cols-2 gap-1.5">
                          <span className="h-8 rounded border border-slate-200 bg-slate-50" />
                          <span className="h-8 rounded border border-slate-200 bg-slate-50" />
                        </span>
                      </div>
                      {/* selection */}
                      <span
                        className="pointer-events-none absolute inset-1 border border-[#C61A1A]"
                        aria-hidden="true"
                      />
                      <span className="absolute -left-1 -top-1 h-2 w-2 border border-[#C61A1A] bg-white" aria-hidden="true" />
                      <span className="absolute -right-1 -top-1 h-2 w-2 border border-[#C61A1A] bg-white" aria-hidden="true" />
                      <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-[#C61A1A] bg-white" aria-hidden="true" />
                      <span className="absolute -bottom-1 -right-1 h-2 w-2 border border-[#C61A1A] bg-white" aria-hidden="true" />
                    </div>
                  </div>
                )}

                {/* 2 — dev mode inspect */}
                {stage === 2 && (
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
                    <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50/70 py-6">
                      <span className="relative inline-block rounded-md bg-[#C61A1A] px-4 py-2.5 text-[11px] font-extrabold text-white">
                        Get Started
                        <span
                          className="pointer-events-none absolute -inset-1.5 border border-[#C61A1A]"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-4 font-mono text-[9.5px] font-bold text-slate-400">
                        button / primary
                      </span>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="font-mono text-[9.5px] font-extrabold uppercase tracking-wider text-slate-400">
                        inspect
                      </p>
                      <div className="mt-2 space-y-1.5">
                        {INSPECT_ROWS.map((r, i) => (
                          <motion.p
                            key={r.k}
                            initial={reduce ? false : { opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.25, delay: 0.1 + i * 0.08 }}
                            className="flex items-center justify-between gap-2 rounded border border-slate-100 bg-slate-50/70 px-2 py-1.5 font-mono text-[10.5px]"
                          >
                            <span className="text-slate-400">{r.k}</span>
                            <span className="flex items-center gap-1.5 font-bold text-slate-700">
                              {r.swatch && (
                                <span className="h-3 w-3 rounded-sm bg-[#C61A1A]" aria-hidden="true" />
                              )}
                              {r.v}
                            </span>
                          </motion.p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3 — device testing */}
                {stage === 3 && (
                  <div>
                    <div className="flex items-end justify-center gap-4 sm:gap-6 py-4">
                      <DeviceFrame label="1440" bar="h-16 w-40" />
                      <DeviceFrame label="768" bar="h-20 w-24" />
                      <DeviceFrame label="390" bar="h-24 w-14" />
                    </div>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      {['All devices tested', '0 downtime', 'Accessibility pass'].map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[10.5px] font-extrabold text-slate-600"
                        >
                          <Check className="w-3 h-3 text-[#C61A1A]" strokeWidth={3.4} />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4 — funnel */}
                {stage === 4 && (
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      conversion funnel
                    </p>
                    <div className="mt-3 space-y-2.5">
                      {FUNNEL.map((f, i) => (
                        <div key={f.label}>
                          <div className="flex items-baseline justify-between font-mono text-[10.5px]">
                            <span className="font-bold text-slate-600">{f.label}</span>
                            <span
                              className={`font-extrabold ${f.red ? 'text-[#C61A1A]' : 'text-slate-800'}`}
                            >
                              {f.pct}%
                            </span>
                          </div>
                          <div className="mt-1 h-4 rounded bg-slate-100 overflow-hidden">
                            <motion.span
                              className={`block h-full rounded ${f.red ? 'bg-[#C61A1A]' : 'bg-slate-300'}`}
                              initial={reduce ? false : { width: 0 }}
                              animate={{ width: f.w }}
                              transition={{
                                duration: 0.7,
                                delay: 0.15 + i * 0.14,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50/60 px-3 py-2">
                      <MousePointerClick className="w-3.5 h-3.5 text-[#C61A1A]" />
                      <span className="text-[11px] font-extrabold text-slate-700">
                        CRO — continuous improvement
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/70 px-4 py-2 font-mono text-[10px]">
            <span className="text-slate-500">stage: {stages[stage].key.toLowerCase()}</span>
            <span className="font-bold text-[#C61A1A]">designed to convert</span>
          </div>
        </div>
      </div>
    </div>
  );
};
