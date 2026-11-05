import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  Check,
  FileCode2,
  FileText,
  Gauge,
  RotateCw,
  Smartphone,
  TriangleAlert,
  X,
} from 'lucide-react';
import { CountUp } from '../CountUp';
import { WEB_DIFF, WEB_PROCESS } from '../../data/webContent';

/* ==========================================================================
   1. HERO — "CodeToSite": a split IDE window. The left pane types a React
   component line by line; the right pane renders the landing page in sync,
   skeleton first, then headline, sub, CTA, trust chip. Loops.
   ========================================================================== */

type Tok = { t: string; c?: 'tag' | 'attr' | 'str' | 'punc' | 'txt' };

const CODE_LINES: Tok[][] = [
  [{ t: '<Landing', c: 'tag' }],
  [
    { t: '  headline', c: 'attr' },
    { t: '=', c: 'punc' },
    { t: '"Built to convert"', c: 'str' },
  ],
  [
    { t: '  sub', c: 'attr' },
    { t: '=', c: 'punc' },
    { t: '"Loads in 1.1s on mobile"', c: 'str' },
  ],
  [
    { t: '  cta', c: 'attr' },
    { t: '=', c: 'punc' },
    { t: '"Get Started"', c: 'str' },
  ],
  [
    { t: '  uptime', c: 'attr' },
    { t: '={', c: 'punc' },
    { t: '99.9', c: 'txt' },
    { t: '}', c: 'punc' },
  ],
  [{ t: '/>', c: 'punc' }],
  [
    { t: 'export default ', c: 'attr' },
    { t: 'Site', c: 'tag' },
  ],
];

const TOK_DARK: Record<string, string> = {
  tag: 'text-[#E83535]',
  attr: 'text-slate-400',
  str: 'text-slate-100',
  punc: 'text-slate-600',
  txt: 'text-slate-200',
};

const TOK_LIGHT: Record<string, string> = {
  tag: 'text-[#C61A1A]',
  attr: 'text-slate-500',
  str: 'text-slate-900',
  punc: 'text-slate-400',
  txt: 'text-slate-700',
};

const TokLine: React.FC<{ line: Tok[]; theme: 'dark' | 'light' }> = ({ line, theme }) => {
  const map = theme === 'dark' ? TOK_DARK : TOK_LIGHT;
  return (
    <span className="whitespace-pre">
      {line.map((tk, i) => (
        <span key={i} className={map[tk.c ?? 'txt']}>
          {tk.t}
        </span>
      ))}
    </span>
  );
};

const HERO_CHIPS = [
  { label: 'Lighthouse 98', Icon: Gauge, tone: 'red' },
  { label: '99.9% uptime', Icon: Activity, tone: 'plain' },
  { label: 'Mobile-first', Icon: Smartphone, tone: 'plain' },
] as const;

export const CodeToSite: React.FC = () => {
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(reduce ? CODE_LINES.length : 0);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const run = () => {
      if (cancelled) return;
      setRevealed(0);
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setRevealed(i);
        if (i < CODE_LINES.length) later(tick, 440);
        else later(run, 6200);
      };
      later(tick, 600);
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  const skeleton = revealed < 1;

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

      {/* floating chips — sit above the visual so they never cover it */}
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
        className="relative rounded-2xl border border-slate-800 bg-[#141210] overflow-hidden shadow-[0_36px_80px_-40px_rgba(15,23,42,0.75)]"
        role="img"
        aria-label="A code editor where a developer types a React component and the website renders in the live preview beside it"
      >
        {/* title bar */}
        <div className="flex items-center gap-2.5 border-b border-slate-800 bg-[#0C0C0D] px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          </span>
          <span className="ml-1 rounded-md bg-[#141210] px-2.5 py-1 font-mono text-[10px] font-bold text-slate-300">
            Landing.tsx
          </span>
          <span className="hidden sm:inline font-mono text-[10px] text-slate-600">digivibz/web</span>
        </div>

        <div className="grid sm:grid-cols-2">
          {/* code pane */}
          <div className="border-b sm:border-b-0 sm:border-r border-slate-800 px-4 py-4 min-h-[212px]">
            <div className="space-y-1.5 font-mono text-[11px] sm:text-[11.5px] leading-5">
              {CODE_LINES.slice(0, revealed).map((line, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex gap-3"
                >
                  <span className="w-5 shrink-0 select-none text-right text-slate-700">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <TokLine line={line} theme="dark" />
                    {i === revealed - 1 && (
                      <motion.span
                        className="ml-px inline-block h-3.5 w-px translate-y-[2px] bg-[#E83535]"
                        animate={{ opacity: [1, 1, 0, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.45, 0.5, 1] }}
                      />
                    )}
                  </span>
                </motion.div>
              ))}
              {revealed === 0 && (
                <div className="flex gap-3">
                  <span className="w-5 shrink-0 select-none text-right text-slate-700">1</span>
                  <span className="h-3.5 w-24 rounded bg-slate-800" />
                </div>
              )}
            </div>
          </div>

          {/* browser preview pane */}
          <div className="bg-white">
            <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-2">
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
              </span>
              <span className="flex-1 rounded-md bg-slate-100 px-2 py-0.5 text-center font-mono text-[9.5px] font-bold text-slate-500">
                yourbrand.com
              </span>
              <RotateCw className="w-3 h-3 text-slate-400" strokeWidth={2.6} />
            </div>

            <div className="min-h-[168px] px-4 py-4">
              {/* mini nav — always part of the page */}
              <div className="flex items-center justify-between" aria-hidden="true">
                <span className="h-2.5 w-16 rounded-full bg-slate-900" />
                <span className="flex gap-1.5">
                  <span className="h-1.5 w-6 rounded-full bg-slate-300" />
                  <span className="h-1.5 w-6 rounded-full bg-slate-300" />
                  <span className="h-1.5 w-6 rounded-full bg-slate-300" />
                </span>
              </div>

              <AnimatePresence mode="wait">
                {skeleton ? (
                  <motion.div
                    key="skeleton"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 space-y-2.5"
                    aria-hidden="true"
                  >
                    <div className="h-3.5 w-4/5 rounded bg-slate-200 animate-pulse" />
                    <div className="h-3.5 w-3/5 rounded bg-slate-200 animate-pulse" />
                    <div className="h-2 w-4/5 rounded bg-slate-100 animate-pulse" />
                    <div className="h-2 w-3/5 rounded bg-slate-100 animate-pulse" />
                    <div className="h-7 w-24 rounded-lg bg-slate-200 animate-pulse" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="page"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5"
                  >
                    <AnimatePresence>
                      {revealed >= 2 && (
                        <motion.h4
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-base sm:text-lg font-extrabold leading-tight text-slate-900"
                        >
                          Built to convert
                        </motion.h4>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {revealed >= 3 && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-1.5 text-[11px] font-semibold text-slate-500"
                        >
                          Loads in 1.1s on mobile
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {revealed >= 4 && (
                        <motion.span
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 inline-flex rounded-lg bg-[#C61A1A] px-3.5 py-2 text-[11px] font-extrabold text-white"
                        >
                          Get Started
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {revealed >= 5 && (
                        <motion.span
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-extrabold text-slate-600"
                        >
                          <Check className="w-3 h-3 text-[#C61A1A]" strokeWidth={3.4} />
                          99.9% uptime
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* status bar */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-800 bg-[#0C0C0D] px-4 py-2 font-mono text-[10px]">
          <span className="flex items-center gap-1.5 text-slate-500">
            <Check className="w-3 h-3 text-[#E83535]" strokeWidth={3.2} />
            0 errors
          </span>
          <span className="flex items-center gap-3">
            <span className="hidden sm:inline text-slate-500">LCP 1.1s</span>
            <span className="font-bold text-[#E83535]">Lighthouse 98</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   2. PROBLEM — "PerfAudit": a PageSpeed-style report. Gauge score, metric
   bars, and a visitor-retention curve collapsing before the page loads.
   ========================================================================== */

const GAUGE_R = 52;
const GAUGE_C = 2 * Math.PI * GAUGE_R;

const METRICS = [
  { label: 'LCP', val: '7.8 s', pct: 92 },
  { label: 'CLS', val: '0.42', pct: 64 },
  { label: 'TBT', val: '2.1 s', pct: 78 },
];

export const PerfAudit: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.55)]"
      role="img"
      aria-label="A performance report showing a score of 34, slow load metrics, and visitors leaving before the page finishes loading"
    >
      {/* header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-3">
        <span className="font-mono text-[11px] font-bold text-slate-500">yourbrand.com</span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-[#C61A1A]">
          <TriangleAlert className="w-3 h-3" strokeWidth={3} />
          Needs work
        </span>
      </div>

      <div className="px-5 pt-5 pb-4">
        <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-5 sm:gap-7 items-center">
          {/* gauge */}
          <div className="relative w-[110px] sm:w-[128px] shrink-0">
            <svg viewBox="0 0 128 128" className="w-full h-auto -rotate-90" aria-hidden="true">
              <circle cx="64" cy="64" r={GAUGE_R} fill="none" stroke="#F1F5F9" strokeWidth="11" />
              <motion.circle
                cx="64"
                cy="64"
                r={GAUGE_R}
                fill="none"
                stroke="#C61A1A"
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={GAUGE_C}
                initial={reduce ? false : { strokeDashoffset: GAUGE_C }}
                whileInView={{ strokeDashoffset: GAUGE_C * (1 - 0.34) }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={reduce ? { strokeDashoffset: GAUGE_C * (1 - 0.34) } : undefined}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-extrabold leading-none text-slate-900">
                34
              </span>
              <span className="mt-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                Performance
              </span>
            </div>
          </div>

          {/* metric bars */}
          <div className="space-y-3 min-w-0">
            {METRICS.map((m, i) => (
              <div key={m.label}>
                <div className="flex items-baseline justify-between font-mono text-[11px]">
                  <span className="font-bold text-slate-600">{m.label}</span>
                  <span className="font-extrabold text-slate-900">{m.val}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#C61A1A]"
                    initial={reduce ? false : { width: 0 }}
                    whileInView={{ width: `${m.pct}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.35 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={reduce ? { width: `${m.pct}%` } : undefined}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* retention curve */}
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/60 px-4 pt-3.5 pb-3">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Visitors remaining as your page loads
          </p>
          <svg viewBox="0 0 440 96" className="mt-2 block w-full h-auto" aria-hidden="true">
            {[16, 48, 80].map((y) => (
              <line key={y} x1="0" y1={y} x2="440" y2={y} stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 6" />
            ))}
            <motion.path
              d="M 0 14 C 55 15, 85 34, 130 60 S 235 84, 440 88 L 440 96 L 0 96 Z"
              fill="#C61A1A"
              fillOpacity="0.09"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            />
            <motion.path
              d="M 0 14 C 55 15, 85 34, 130 60 S 235 84, 440 88"
              fill="none"
              stroke="#C61A1A"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.circle
              cx="0"
              cy="14"
              r="4.5"
              fill="#C61A1A"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />
          </svg>
          <div className="mt-1 flex justify-between font-mono text-[9.5px] font-bold text-slate-400">
            <span>0s</span>
            <span>2s</span>
            <span>4s</span>
            <span>6s</span>
          </div>
        </div>

        {/* annotation */}
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-100 bg-red-50/60 px-3.5 py-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C61A1A]">
            <X className="w-3 h-3 text-white" strokeWidth={3.2} />
          </span>
          <p className="text-[12.5px] font-extrabold leading-snug text-slate-800">
            88% leave before your offer appears
          </p>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   3. TECH — "StackManifest": a spec-sheet card. Numbered category rows on
   the left, monospace technology chips on the right, hover to light up.
   ========================================================================== */

export const StackManifest: React.FC<{
  groups: readonly { key: string; intro: string; items: readonly string[] }[];
}> = ({ groups }) => {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.5)]">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-3">
        <span className="font-mono text-[11px] font-bold text-slate-500">stack.manifest</span>
        <span className="rounded-md border border-red-200 bg-red-50 px-2 py-1 font-mono text-[10px] font-extrabold text-[#C61A1A]">
          06 categories
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {groups.map((g, i) => (
          <motion.div
            key={g.key}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] gap-3 md:gap-6 px-5 py-5 transition-colors hover:bg-slate-50/70"
          >
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[11px] font-extrabold text-[#C61A1A]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[15px] font-extrabold leading-snug text-slate-900">{g.key}</h3>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{g.intro}</p>
            </div>
            <div className="flex flex-wrap gap-2 self-center">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-[11.5px] font-bold text-slate-600 transition-colors group-hover:border-slate-300 hover:border-[#C61A1A] hover:bg-red-50 hover:text-[#C61A1A]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   4. PROCESS — "DevWorkspace": stage chips drive an IDE window. File tree
   on the left, the stage's file content on the right — brief checklist,
   wireframe, code, deploy terminal, monitoring log.
   ========================================================================== */

const FILES = ['discovery.md', 'wireframes.fig', 'App.tsx', 'deploy.yml', 'monitor.log'];

const DEV_CODE: Tok[][] = [
  [
    { t: 'export function ', c: 'attr' },
    { t: 'Page', c: 'tag' },
    { t: '() {', c: 'punc' },
  ],
  [
    { t: '  const ', c: 'attr' },
    { t: 'data', c: 'txt' },
    { t: ' = await ', c: 'attr' },
    { t: 'fetch', c: 'tag' },
    { t: "('/api')", c: 'punc' },
  ],
  [{ t: '  return <', c: 'attr' }, { t: 'Landing', c: 'tag' }, { t: ' {...data} />', c: 'attr' }],
  [{ t: '}', c: 'punc' }],
];

const MONITOR_BARS = [42, 54, 48, 60, 57, 68, 64, 74, 71, 82, 79, 92];

export const DevWorkspace: React.FC = () => {
  const [stage, setStage] = useState(0);
  const reduce = useReducedMotion();
  const stages = WEB_PROCESS.stages;
  const on = (i: number) => stage >= i;
  const file = FILES[stage];

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

      <div className="mt-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-8 items-start">
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
                  {stages[stage].key} <span className="text-slate-400">—</span>{' '}
                  <span className="text-slate-700 normal-case tracking-normal text-base sm:text-lg font-bold">
                    {stages[stage].tail}
                  </span>
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

        {/* IDE window */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.55)]">
          {/* title bar */}
          <div className="flex items-center gap-2.5 border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            </span>
            <span className="ml-1 font-mono text-[10.5px] font-bold text-slate-600">{file}</span>
            <AnimatePresence>
              {stage === 3 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                  className="ml-auto inline-flex items-center gap-1 rounded-md bg-[#C61A1A] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  Live
                </motion.span>
              )}
            </AnimatePresence>
            <span className="ml-auto font-mono text-[10px] text-slate-400">
              {String(stage + 1).padStart(2, '0')}/05
            </span>
          </div>

          <div className="grid grid-cols-[auto_minmax(0,1fr)]">
            {/* file tree */}
            <div className="border-r border-slate-200 bg-slate-50/70 px-2 py-3 sm:px-3 sm:w-[152px]">
              <p className="px-1.5 pb-2 font-mono text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                Project
              </p>
              <ul className="flex gap-1 overflow-x-auto sm:block sm:space-y-0.5 sm:overflow-visible pb-1 sm:pb-0">
                {FILES.map((f, i) => {
                  const active = stage === i;
                  return (
                    <li key={f}>
                      <button
                        type="button"
                        onClick={() => setStage(i)}
                        aria-current={active}
                        className={`flex w-full items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1.5 text-left font-mono text-[10.5px] font-bold transition-colors cursor-pointer ${
                          active
                            ? 'border-l-2 border-[#C61A1A] bg-red-50 text-[#C61A1A]'
                            : 'border-l-2 border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                        }`}
                      >
                        {i === 3 ? (
                          <FileText className="w-3 h-3 shrink-0" />
                        ) : (
                          <FileCode2 className="w-3 h-3 shrink-0" />
                        )}
                        {f}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* content pane */}
            <div className="min-h-[248px] px-4 py-4 sm:px-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* 0 — discovery checklist */}
                  {stage === 0 && (
                    <ul className="space-y-2.5">
                      {['Client Brief reviewed', 'Competitors mapped', 'Audience defined', 'Project roadmap set'].map(
                        (t, i) => (
                          <motion.li
                            key={t}
                            initial={reduce ? false : { opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                            className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5"
                          >
                            <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#C61A1A]">
                              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.6} />
                            </span>
                            <span className="font-mono text-[11.5px] font-bold text-slate-700">{t}</span>
                          </motion.li>
                        ),
                      )}
                    </ul>
                  )}

                  {/* 1 — wireframe */}
                  {stage === 1 && (
                    <div className="space-y-2.5" aria-hidden="true">
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.08 }}
                        className="flex items-center justify-between rounded-md bg-slate-200 px-3 py-2"
                      >
                        <span className="h-2 w-12 rounded-full bg-slate-400" />
                        <span className="flex gap-1.5">
                          <span className="h-1.5 w-5 rounded-full bg-slate-400" />
                          <span className="h-1.5 w-5 rounded-full bg-slate-400" />
                          <span className="h-1.5 w-5 rounded-full bg-slate-400" />
                        </span>
                      </motion.div>
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.18 }}
                        className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4"
                      >
                        <div className="h-3 w-3/4 rounded bg-slate-300" />
                        <div className="mt-2 h-2 w-1/2 rounded bg-slate-200" />
                        <div className="mt-3.5 flex gap-2">
                          <span className="h-6 w-20 rounded-md bg-[#C61A1A]" />
                          <span className="h-6 w-16 rounded-md border border-slate-300" />
                        </div>
                      </motion.div>
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.28 }}
                        className="grid grid-cols-3 gap-2"
                      >
                        {[0, 1, 2].map((c) => (
                          <span key={c} className="h-12 rounded-md bg-slate-100 border border-slate-200" />
                        ))}
                      </motion.div>
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.36 }}
                        className="h-3 rounded bg-slate-200"
                      />
                    </div>
                  )}

                  {/* 2 — code */}
                  {stage === 2 && (
                    <div className="space-y-1.5 rounded-lg bg-[#141210] px-4 py-3.5 font-mono text-[11.5px] leading-5">
                      {DEV_CODE.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={reduce ? false : { opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.25, delay: 0.1 + i * 0.1 }}
                          className="flex gap-3"
                        >
                          <span className="w-4 shrink-0 select-none text-right text-slate-700">{i + 1}</span>
                          <span className="min-w-0 flex-1">
                            <TokLine line={line} theme="dark" />
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* 3 — deploy terminal */}
                  {stage === 3 && (
                    <div className="space-y-2 rounded-lg bg-[#141210] px-4 py-3.5 font-mono text-[11.5px] leading-5">
                      <p className="text-slate-300">
                        <span className="mr-2 font-extrabold text-[#E83535]">$</span>
                        digivibz deploy --prod
                      </p>
                      {['build passed — 12.4s', 'DNS configured', 'SSL issued'].map((t, i) => (
                        <motion.p
                          key={t}
                          initial={reduce ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: 0.25 + i * 0.22 }}
                          className="flex items-center gap-2 text-slate-400"
                        >
                          <Check className="w-3 h-3 text-[#E83535]" strokeWidth={3.4} />
                          {t}
                        </motion.p>
                      ))}
                      <motion.p
                        initial={reduce ? false : { opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: 0.95 }}
                        className="flex items-center gap-2 pt-1 font-extrabold text-slate-100"
                      >
                        <Check className="w-3 h-3 text-[#E83535]" strokeWidth={3.4} />
                        yourbrand.com is live
                      </motion.p>
                    </div>
                  )}

                  {/* 4 — monitor log */}
                  {stage === 4 && (
                    <div>
                      <div className="rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-3.5">
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                            Uptime — last 12 weeks
                          </p>
                          <p className="font-mono text-[10px] font-extrabold text-[#C61A1A]">99.9%</p>
                        </div>
                        <div className="mt-3 flex h-16 items-end gap-1.5">
                          {MONITOR_BARS.map((h, i) => (
                            <motion.span
                              key={i}
                              initial={reduce ? false : { height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{
                                duration: 0.5,
                                delay: 0.15 + i * 0.05,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className={`flex-1 rounded-t ${i >= 9 ? 'bg-[#C61A1A]' : 'bg-slate-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {[
                          { k: 'LCP', v: '1.1s' },
                          { k: 'Errors', v: '0' },
                          { k: 'Checks', v: 'Daily' },
                        ].map((s) => (
                          <div
                            key={s.k}
                            className="rounded-lg border border-slate-200 px-2.5 py-2 text-center"
                          >
                            <p className="font-mono text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                              {s.k}
                            </p>
                            <p className="mt-0.5 font-mono text-[12px] font-extrabold text-slate-800">
                              {s.v}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* status bar */}
          <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/70 px-4 py-2 font-mono text-[10px]">
            <span className="text-slate-500">stage: {stages[stage].key.toLowerCase()}</span>
            <span className="font-bold text-[#C61A1A]">built to perform</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. DIFF — before → after rows.
   ========================================================================== */

export const WebDiffRows: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-3">
      {WEB_DIFF.rows.map((row, i) => (
        <motion.div
          key={row.from}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2.5 lg:gap-4 items-center"
        >
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-slate-400">
              <X className="w-3 h-3 text-slate-500" strokeWidth={3.2} />
            </span>
            <span className="text-sm font-semibold text-slate-500">{row.from}</span>
          </div>

          <span className="flex justify-center lg:justify-start">
            <motion.span
              initial={reduce ? false : { x: -6, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C61A1A] text-white"
            >
              <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" strokeWidth={3} />
            </motion.span>
          </span>

          <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-white px-4 py-3.5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.5)]">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C61A1A]">
              <Check className="w-3 h-3 text-white" strokeWidth={3.4} />
            </span>
            <span className="text-sm font-extrabold text-slate-800">{row.to}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ==========================================================================
   6. HERO STATS
   ========================================================================== */

export const WebStatStrip: React.FC<{
  stats: readonly { value: string; label: string }[];
}> = ({ stats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((s, i) => (
      <motion.div
        key={s.label}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-[0_20px_45px_-38px_rgba(15,23,42,0.5)]"
      >
        <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tabular-nums leading-none">
          <CountUp value={s.value} />
        </div>
        <div className="mt-2 h-0.5 w-8 bg-[#C61A1A] rounded-full" />
        <div className="mt-2 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-500 leading-snug">
          {s.label}
        </div>
      </motion.div>
    ))}
  </div>
);
