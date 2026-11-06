import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  BarChart3,
  BatteryFull,
  Bell,
  Check,
  CircleX,
  Cpu,
  CreditCard,
  Home,
  ShoppingCart,
  Signal,
  Smartphone,
  TrendingUp,
  Wifi,
  Zap,
} from 'lucide-react';
import { CountUp } from '../CountUp';
import { APP_ASSETS, APP_FRAMEWORK, APP_SHIFT, APP_SYSTEM } from '../../data/appDevContent';

/* ==========================================================================
   1. HERO — "Live App Phone": a phone with an app running inside it. The
   screen cycles shop -> cart -> stats, a push notification slides in over
   the cart, the tab bar tracks the active screen, and the release pipeline
   beside it fills as the build compiles, tests, and ships.
   ========================================================================== */

const RUN_CHIPS = [
  { label: 'Native + hybrid builds', Icon: Smartphone, tone: 'red' },
  { label: '60 FPS target', Icon: Zap, tone: 'plain' },
  { label: 'AI-ready', Icon: Cpu, tone: 'plain' },
] as const;

const RUN_TABS = [
  { label: 'Shop', Icon: Home },
  { label: 'Cart', Icon: ShoppingCart },
  { label: 'Stats', Icon: BarChart3 },
] as const;

const RUN_STAGES = [
  'Compile · 482 modules',
  'Tests · 128 / 128',
  'Ship · App Store + Play',
];

const RUN_METRICS = [
  { value: '60 FPS', label: 'Frame rate' },
  { value: '99.8%', label: 'Crash-free' },
  { value: '42ms', label: 'API p95' },
  { value: '4.9', label: 'Store rating' },
] as const;

/** Figures taken from the page's own FAQ copy (kept from the old hero). */
const RUN_TIMELINE = [
  { value: '6–8 WKS', label: 'Simple app' },
  { value: '4–6 MO', label: 'Complex build' },
  { value: '3–6 MO', label: 'Post-launch' },
] as const;

const RUN_STACK = ['React Native', 'Swift', 'Kotlin', 'Flutter', 'Firebase'];

const LOOP_MS = 8000;
const STEP_MS = 40;
const SCREEN_MS = LOOP_MS / 3;

export const LiveAppPhone: React.FC = () => {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setT((x) => (x + STEP_MS) % LOOP_MS), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const screen = reduce ? 0 : Math.floor(t / SCREEN_MS) % 3;
  const progress = reduce ? 100 : (t / LOOP_MS) * 100;
  const stage = reduce ? 2 : Math.min(2, Math.floor(t / SCREEN_MS));
  const notifOn = !reduce && t >= SCREEN_MS + 500 && t < 2 * SCREEN_MS - 300;
  const shipped = reduce || stage >= 2;

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
        {RUN_CHIPS.map(({ label, Icon, tone }, i) => (
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
        aria-label="A phone running an app — the screen cycles through shop, cart and stats views while a push notification arrives and the release pipeline beside it compiles, tests and ships"
      >
        {/* window header */}
        <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
          <span className="hidden sm:flex gap-1.5 shrink-0" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </span>
          <span className="ml-1 font-mono text-[10.5px] font-bold text-slate-600">app.run</span>
          <span
            className={`ml-auto inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[9.5px] font-extrabold ${
              shipped
                ? 'border-red-200 bg-red-50 text-[#C61A1A]'
                : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                shipped ? 'bg-[#C61A1A] animate-pulse' : 'bg-slate-400'
              }`}
            />
            {shipped ? 'SHIPPED' : 'BUILDING'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 p-3.5 sm:p-4">
          {/* ------------------------------------------------------ phone */}
          <div className="shrink-0 mx-auto sm:mx-0 w-[170px] sm:w-[184px]">
            <div className="rounded-[1.9rem] bg-slate-900 p-[6px] shadow-[0_26px_60px_-30px_rgba(15,23,42,0.7)]">
              <div className="relative flex h-[326px] sm:h-[344px] flex-col overflow-hidden rounded-[1.5rem] bg-white">
                {/* dynamic island + status bar */}
                <span
                  className="absolute left-1/2 top-1.5 z-10 h-2 w-11 -translate-x-1/2 rounded-full bg-slate-900"
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between px-3.5 pt-2.5 pb-1">
                  <span className="font-mono text-[9px] font-bold text-slate-900">9:41</span>
                  <span className="flex items-center gap-1 text-slate-900" aria-hidden="true">
                    <Signal className="w-2.5 h-2.5" />
                    <Wifi className="w-2.5 h-2.5" />
                    <BatteryFull className="w-3 h-3" />
                  </span>
                </div>

                {/* screens */}
                <div className="relative flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {/* ------------------------------------------ shop */}
                    {screen === 0 && (
                      <motion.div
                        key="shop"
                        initial={reduce ? false : { opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduce ? undefined : { opacity: 0, x: -14 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex flex-col gap-2 px-3 pt-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[12.5px] font-extrabold text-slate-900">
                            Discover
                          </span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-50">
                            <Bell className="w-3 h-3 text-[#C61A1A]" />
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          {['New', 'Deals', 'Saved'].map((c, i) => (
                            <span
                              key={c}
                              className={`rounded-full px-2 py-0.5 text-[8.5px] font-extrabold ${
                                i === 0
                                  ? 'bg-[#C61A1A] text-white'
                                  : 'bg-slate-100 text-slate-500'
                              }`}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                        {[0, 1].map((i) => (
                          <div
                            key={i}
                            className="rounded-xl border border-slate-200 p-2 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                                <ShoppingBagPlaceholder />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-[10.5px] font-extrabold text-slate-800">
                                  {i === 0 ? 'Aero runner — red' : 'Daily kit bundle'}
                                </span>
                                <span className="mt-0.5 block text-[9px] text-slate-400">
                                  {i === 0 ? '4.8 ★ · 214 sold' : '4.6 ★ · 98 sold'}
                                </span>
                              </span>
                              <span className="shrink-0 font-mono text-[10.5px] font-extrabold text-[#C61A1A]">
                                {i === 0 ? '$86' : '$42'}
                              </span>
                            </div>
                          </div>
                        ))}
                        <span className="mt-auto mb-1 flex items-center justify-center rounded-lg bg-[#C61A1A] py-2 text-[10.5px] font-extrabold text-white">
                          Shop new arrivals
                        </span>
                      </motion.div>
                    )}

                    {/* ------------------------------------------ cart */}
                    {screen === 1 && (
                      <motion.div
                        key="cart"
                        initial={reduce ? false : { opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduce ? undefined : { opacity: 0, x: -14 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex flex-col gap-2 px-3 pt-1"
                      >
                        <span className="text-[12.5px] font-extrabold text-slate-900">
                          Your cart · 2
                        </span>
                        {[
                          { name: 'Aero runner — red', price: '$86' },
                          { name: 'Daily kit bundle', price: '$42' },
                        ].map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 p-2"
                          >
                            <span className="h-7 w-7 shrink-0 rounded-lg bg-slate-100" />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[10px] font-extrabold text-slate-800">
                                {item.name}
                              </span>
                              <span className="block font-mono text-[9px] text-slate-400">
                                Qty 1
                              </span>
                            </span>
                            <span className="shrink-0 font-mono text-[10.5px] font-extrabold text-slate-900">
                              {item.price}
                            </span>
                          </div>
                        ))}
                        <div className="mt-auto flex items-center justify-between border-t border-dashed border-slate-200 pt-2">
                          <span className="text-[10.5px] font-bold text-slate-500">Total</span>
                          <span className="font-mono text-[13px] font-extrabold text-slate-900">
                            $128
                          </span>
                        </div>
                        <span className="mb-1 flex items-center justify-center gap-1.5 rounded-lg bg-[#C61A1A] py-2 text-[10.5px] font-extrabold text-white">
                          <CreditCard className="w-3.5 h-3.5" />
                          Pay now
                        </span>
                      </motion.div>
                    )}

                    {/* ------------------------------------------ stats */}
                    {screen === 2 && (
                      <motion.div
                        key="stats"
                        initial={reduce ? false : { opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={reduce ? undefined : { opacity: 0, x: -14 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex flex-col gap-2 px-3 pt-1"
                      >
                        <span className="text-[12.5px] font-extrabold text-slate-900">
                          This week
                        </span>
                        <div className="flex items-end justify-between">
                          <span className="font-mono text-[20px] font-extrabold leading-none text-slate-900">
                            $12,480
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-1.5 py-0.5 text-[9.5px] font-extrabold text-[#C61A1A]">
                            <TrendingUp className="w-3 h-3" />
                            +18%
                          </span>
                        </div>
                        <div className="flex h-20 items-end gap-1.5 rounded-xl border border-slate-200 p-2">
                          {[38, 54, 44, 66, 80].map((h, i) => (
                            <motion.span
                              key={i}
                              className={`flex-1 rounded-t ${
                                i === 4 ? 'bg-[#C61A1A]' : 'bg-slate-200'
                              }`}
                              initial={reduce ? false : { height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{
                                duration: 0.5,
                                delay: 0.15 + i * 0.09,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
                            <BarChart3 className="w-3.5 h-3.5 text-[#C61A1A]" />
                          </span>
                          <span className="text-[10px] font-bold text-slate-600">
                            Weekly report ready
                          </span>
                        </div>
                        <span className="mt-auto mb-1 flex items-center justify-center rounded-lg border border-slate-200 py-2 text-[10.5px] font-extrabold text-slate-700">
                          Export report
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* push notification */}
                  <AnimatePresence>
                    {notifOn && (
                      <motion.div
                        initial={reduce ? false : { opacity: 0, y: -18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -18 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-x-2 top-2 z-20 flex items-center gap-2 rounded-xl border border-slate-200 bg-white/95 px-2.5 py-2 shadow-[0_16px_34px_-20px_rgba(15,23,42,0.7)] backdrop-blur"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#C61A1A] text-white">
                          <Bell className="w-3 h-3" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[10px] font-extrabold text-slate-900">
                            Order #2841 confirmed
                          </span>
                          <span className="block truncate text-[9px] text-slate-500">
                            Out for delivery — tap to track
                          </span>
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* tab bar */}
                <div className="relative flex border-t border-slate-100 bg-white">
                  {RUN_TABS.map((tab, i) => {
                    const active = screen === i;
                    const Icon = tab.Icon;
                    return (
                      <span
                        key={tab.label}
                        className="relative flex flex-1 flex-col items-center gap-0.5 py-2"
                      >
                        {active && (
                          <motion.span
                            layoutId="run-tab"
                            className="absolute inset-x-5 top-0 h-0.5 rounded-full bg-[#C61A1A]"
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          />
                        )}
                        <Icon
                          className={`w-3.5 h-3.5 ${
                            active ? 'text-[#C61A1A]' : 'text-slate-400'
                          }`}
                        />
                        <span
                          className={`text-[8.5px] font-extrabold ${
                            active ? 'text-[#C61A1A]' : 'text-slate-400'
                          }`}
                        >
                          {tab.label}
                        </span>
                        {tab.label === 'Cart' && (
                          <span className="absolute right-[26%] top-1 h-1.5 w-1.5 rounded-full bg-[#C61A1A]" />
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------- pipeline */}
          <div className="min-w-0 flex-1 space-y-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-slate-500">
                  release.pipeline
                </span>
                <span className="font-mono text-[9.5px] font-extrabold tabular-nums text-[#C61A1A]">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                <motion.span
                  className="block h-full rounded-full bg-[#C61A1A]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                />
              </div>

              <div className="mt-2.5 space-y-1.5">
                {RUN_STAGES.map((label, i) => {
                  const done = stage >= i;
                  return (
                    <div key={label} className="flex items-center gap-2">
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          done ? 'bg-[#C61A1A] text-white' : 'border border-slate-300 bg-white'
                        }`}
                      >
                        {done && <Check className="w-2.5 h-2.5" strokeWidth={4} />}
                      </span>
                      <span
                        className={`truncate text-[11px] font-bold ${
                          done ? 'text-slate-800' : 'text-slate-400'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* metrics */}
            <div className="grid grid-cols-2 gap-2">
              {RUN_METRICS.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2"
                >
                  <span className="block text-[15px] font-extrabold tabular-nums leading-none text-slate-900">
                    <CountUp value={m.value} />
                  </span>
                  <span className="mt-1 block font-mono text-[8.5px] font-bold uppercase tracking-wider text-slate-400">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* stack */}
            <div className="flex flex-wrap gap-1.5">
              {RUN_STACK.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-extrabold text-slate-600"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* timeline readout (FAQ figures) */}
        <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50/60">
          {RUN_TIMELINE.map((m) => (
            <div key={m.label} className="px-2 py-3 text-center">
              <div className="text-[13px] sm:text-sm font-extrabold tabular-nums leading-none text-slate-900">
                <CountUp value={m.value} />
              </div>
              <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/** Small wireframe product glyph for the shop screen cards. */
const ShoppingBagPlaceholder: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-400" fill="none" aria-hidden="true">
    <path
      d="M5 8h14l-1.2 11H6.2L5 8Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M9 8a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* ==========================================================================
   2. PROBLEM — drop-off funnel: ideas collapse at the thinking stage,
   the exact failure the section's copy describes.
   ========================================================================== */

const FUNNEL_STAGES = [
  { label: 'Ideas', w: 100, slate: true },
  { label: 'Thinking', w: 38, mark: true },
  { label: 'Design', w: 30 },
  { label: 'Build', w: 24 },
  { label: 'Launch', w: 18 },
  { label: 'Growth', w: 12 },
];

export const FailureFunnel: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Where applications die
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Ideas → Growth
        </span>
      </div>

      <div className="space-y-1.5">
        {FUNNEL_STAGES.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-3">
            <span className="w-16 sm:w-20 shrink-0 text-right text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {stage.label}
            </span>
            <div className="relative flex-1 h-5 sm:h-6">
              <motion.div
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: `${stage.w}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-md ${stage.slate ? 'bg-slate-300' : 'bg-[#C61A1A]/85'}`}
              />
            </div>
            {stage.mark && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-[#C61A1A]">
                <span className="w-1 h-1 rounded-full bg-[#C61A1A]" />
                Most fail here
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   3. SHIFT — a code-diff viewer: old thinking struck through, the system
   mindset added in red. The page's argument rendered the way devs read it.
   ========================================================================== */

export const ShiftDiff: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-3xl border border-white/10 bg-[#101013] overflow-hidden shadow-[0_40px_90px_-50px_rgba(0,0,0,0.85)]">
      {/* window chrome */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <span className="flex items-center gap-2" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C61A1A]" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
          <span className="ml-2 font-mono text-[10px] font-bold tracking-wider text-white/50">
            mindset.shift
          </span>
        </span>
        <span className="font-mono text-[10px] font-bold text-white/45">+4 −4</span>
      </div>

      <div className="p-4 sm:p-5 space-y-2">
        {APP_SHIFT.rows.map((row, i) => {
          const [from, to] = row.split('→').map((s) => s.trim());
          return (
            <motion.div
              key={row}
              initial={reduce ? false : { opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-white/15 hover:bg-white/[0.05]"
            >
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-xs font-bold text-slate-500 select-none">−</span>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-slate-500 line-through decoration-slate-600/70">
                  {from}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2.5">
                <span className="font-mono text-xs font-bold text-[#E83535] select-none">+</span>
                <span className="text-[11px] sm:text-xs font-extrabold text-white">{to}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ==========================================================================
   4. SYSTEM — the pillar manifest: five always-open spec rows, index and
   accent rule lighting up on hover. Reads like a system bill of materials.
   ========================================================================== */

export const SystemManifest: React.FC = () => (
  <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.4)]">
    <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 border-b border-slate-100 bg-slate-50/70">
      <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
        system-manifest
      </span>
      <span className="font-mono text-[10px] font-bold text-slate-400">5 modules</span>
    </div>

    {APP_SYSTEM.pillars.map((pillar, i) => (
      <div
        key={pillar.title}
        className="group relative border-b border-slate-100 px-5 sm:px-7 py-6 transition-colors last:border-0 hover:bg-red-50/30"
      >
        <span
          aria-hidden="true"
          className="absolute left-0 top-5 bottom-5 w-1 origin-top scale-y-0 rounded-r bg-[#C61A1A] transition-transform duration-300 group-hover:scale-y-100"
        />
        <div className="flex items-start gap-4">
          <span className="mt-0.5 font-mono text-xs font-bold tabular-nums text-slate-400 transition-colors group-hover:text-[#C61A1A]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-3xl">{pillar.body}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* ==========================================================================
   5. FRAMEWORK — a dark pipeline rail: five phase gates on a drawing
   progress line, each swapping a detail panel (checklist + outcome).
   ========================================================================== */

export const PipelineRail: React.FC = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const stage = APP_FRAMEWORK.stages[active];

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
      {/* rail */}
      <div className="relative">
        <div className="absolute left-[6%] right-[6%] top-9 h-px bg-white/10 hidden sm:block" aria-hidden="true" />
        <motion.div
          className="absolute left-[6%] top-9 h-px bg-[#C61A1A] hidden sm:block origin-left"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ right: '6%' }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col sm:flex-row gap-2.5 sm:gap-2">
          {APP_FRAMEWORK.stages.map((s, i) => {
            const isActive = active === i;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`group flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-xl border px-3 py-3.5 text-center transition-all ${
                  isActive
                    ? 'border-[#C61A1A]/70 bg-[#C61A1A]/15'
                    : 'border-white/10 bg-[#0C0C0D] hover:border-white/30'
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold tabular-nums transition-colors ${
                    isActive ? 'bg-[#C61A1A] text-white' : 'bg-white/10 text-white/70'
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-xs font-extrabold uppercase tracking-wider ${
                    isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                  }`}
                >
                  {s.key}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* detail panel */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-[#0C0C0D] p-5 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.key}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                Phase {String(active + 1).padStart(2, '0')}
              </span>
              <span className="rounded-full border border-[#C61A1A]/60 bg-[#C61A1A]/15 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-[#E83535]">
                {stage.key}
              </span>
            </div>

            <h3 className="mt-3 text-lg sm:text-xl font-extrabold text-white leading-snug">
              {stage.title}
            </h3>
            <p className="mt-2.5 text-sm text-slate-400 leading-relaxed max-w-3xl">{stage.body}</p>

            <div className="mt-5">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/45">
                What this includes:
              </span>
              <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {stage.includes.map((item) => (
                  <span key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check className="w-3.5 h-3.5 mt-1 shrink-0 text-[#C61A1A]" strokeWidth={3} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-r-xl border-l-2 border-[#C61A1A] bg-[#C61A1A]/10 px-4 py-3.5">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E83535]">
                Outcome:
              </span>
              <p className="mt-1 text-sm font-semibold text-white leading-relaxed">{stage.outcome}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ==========================================================================
   6. ASSETS — four ledger rows: the gap, the approach, then a benefit
   track that fills from "just software" to "business asset" on scroll.
   ========================================================================== */

const ASSET_FILL = [80, 85, 90, 95];

export const AssetMeters: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white px-5 sm:px-8 py-2 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.4)]">
      {APP_ASSETS.items.map((item, i) => (
        <div
          key={item.problem}
          className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5 border-b border-slate-100 py-7 last:border-0"
        >
          {/* the gap */}
          <div className="lg:col-span-5">
            <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
              <CircleX className="w-3.5 h-3.5" />
              The gap
            </span>
            <h3 className="mt-2 text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {item.problem}
            </h3>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{item.body}</p>
          </div>

          {/* the fix */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#C61A1A]">
              Our Approach
            </span>
            <p className="mt-2.5 text-sm font-medium text-slate-700 leading-relaxed">
              {item.approach}
            </p>

            {/* asset track */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                <span>Just software</span>
                <span className="text-[#C61A1A]">Business asset</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={reduce ? false : { width: 0 }}
                  whileInView={{ width: `${ASSET_FILL[i]}%` }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-[#C61A1A]"
                />
              </div>
            </div>

            <div className="mt-3.5 flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C61A1A]">
                <Check className="w-3 h-3 text-white" strokeWidth={3.5} />
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                <span className="font-extrabold text-slate-900">Benefit: </span>
                {item.benefit}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
