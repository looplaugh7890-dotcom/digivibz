import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Bot,
  Check,
  Layers,
  Mail,
  MessagesSquare,
  Mic,
  Moon,
  TrendingUp,
  Unplug,
  Workflow,
} from 'lucide-react';
import type { IaStackLayer } from '../../data/aiAutomationContent';

/* ==========================================================================
   Shared helpers
   ========================================================================== */

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

/** Window chrome shared by the page's "live system" panels. */
const PanelHeader: React.FC<{ title: string; status: string; live?: boolean }> = ({
  title,
  status,
  live = false,
}) => (
  <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
    <span className="hidden sm:flex gap-1.5 shrink-0" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
    </span>
    <span className="ml-1 font-mono text-[10.5px] font-bold text-slate-600">{title}</span>
    <span
      className={`ml-auto inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[9.5px] font-extrabold ${
        live ? 'border-[#C61A1A] bg-[#C61A1A] text-white' : 'border-slate-200 bg-white text-slate-500'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${live ? 'bg-white animate-pulse' : 'bg-slate-400'}`}
      />
      {status}
    </span>
  </div>
);

/* ==========================================================================
   1. HERO — "Chore Console": a little robot works a conveyor of chores.
   Task chips ride the belt, pass under the bot, and emerge stamped DONE
   while the done-today counter climbs. The user asked for "AI doing all the
   tasks — a robot doing the chores".
   ========================================================================== */

const CHORE_CHIPS = [
  'reply to lead #4821',
  'sync 14 CRM records',
  'route ticket #773',
  'file invoice #2291',
] as const;

const HERO_LOGS = [
  '09:41:02 · 12 new leads answered in 0.4s each',
  '09:41:07 · 14 CRM records synced · 0 duplicates',
  '09:41:11 · ticket #773 routed to billing',
  '09:41:16 · weekly report sent to 6 inboxes',
] as const;

const HERO_CHIPS = [
  { label: 'Works while you sleep', Icon: Moon, tone: 'red' },
  { label: 'No manual triggers', Icon: Unplug, tone: 'plain' },
  { label: 'Fits your current stack', Icon: Layers, tone: 'plain' },
] as const;

const LOOP_MS = 10000;
const STEP_MS = 50;
const N_CHORES = CHORE_CHIPS.length;
/** Chip x-position where it has cleared the robot and can show its stamp —
    the narrow track is shorter, so the chip clears the bot sooner. */
const STAMP_U_WIDE = 0.72;
const STAMP_U_NARROW = 0.66;
/** Frozen frame for reduced-motion: one chip just stamped, arm down. */
const FINAL_T = 7600;

/** True while the viewport is at least `px` wide (SSR-safe matchMedia). */
const useMinWidth = (px: number) => {
  const [ok, setOk] = useState(
    () => typeof window === 'undefined' || window.innerWidth >= px,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [px]);
  return ok;
};

export const ChoreConsole: React.FC = () => {
  const reduce = useReducedMotion();
  const wide = useMinWidth(640);
  const [rawT, setRawT] = useState(0);
  const [done, setDone] = useState(47);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setRawT((x) => (x + STEP_MS) % LOOP_MS), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const t = reduce ? FINAL_T : rawT;
  const us = CHORE_CHIPS.map((_, i) => (t / LOOP_MS + i / N_CHORES) % 1);
  const stampU = wide ? STAMP_U_WIDE : STAMP_U_NARROW;

  /* On narrow screens the four chips would collide on one belt, so only
     every other chip rides it — spacing doubles and each still fits. */
  const visible = wide ? [0, 1, 2, 3] : [0, 2];

  /* Monotone "done today" counter: +1 each time a visible chip clears the
     robot. Crossings never coincide with a loop wrap at these offsets. */
  const crossed = visible.filter((i) => us[i] >= stampU).length;
  const prevCrossed = useRef<number | null>(null);
  useEffect(() => {
    if (prevCrossed.current === null) {
      prevCrossed.current = crossed;
      return;
    }
    const prev = prevCrossed.current;
    if (crossed > prev) setDone((d) => d + (crossed - prev));
    prevCrossed.current = crossed;
  }, [crossed]);

  const working = visible.some((i) => us[i] >= 0.42 && us[i] <= 0.62);
  const logIdx = Math.floor(t / (LOOP_MS / N_CHORES)) % N_CHORES;

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
        aria-label="A chore console: task chips ride a conveyor past a small robot that stamps each one done while a done-today counter climbs"
      >
        <PanelHeader title="chore-console.dz" status="AUTOPILOT ON" live />

        <div className="p-3 sm:p-4 space-y-3">
          {/* legend */}
          <div className="flex items-center justify-between px-0.5">
            <span className="font-mono text-[9.5px] font-extrabold uppercase tracking-wider text-slate-400">
              queue → bot → done
            </span>
            <span className="font-mono text-[9.5px] font-bold text-slate-400">
              0 touches from your team
            </span>
          </div>

          {/* stage */}
          <div className="relative h-[152px] overflow-hidden rounded-lg border border-slate-200 bg-slate-50/60 sm:h-[168px]">
            <div
              className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:16px_16px]"
              aria-hidden="true"
            />

            {/* chip track (sits on the belt line) */}
            <div className="absolute inset-x-2 top-3 bottom-7">
              {visible.map((i) => {
                const label = CHORE_CHIPS[i];
                const u = us[i];
                /* fade in/out before the chip would clip the track edges */
                const inFade = wide ? clamp((u - 0.06) / 0.08) : clamp((u - 0.12) / 0.08);
                const outFade = wide
                  ? 1 - clamp((u - 0.82) / 0.08)
                  : 1 - clamp((u - 0.76) / 0.08);
                const op = inFade * outFade;
                const stamped = u >= stampU;
                return (
                  <div
                    key={label}
                    className={`absolute bottom-0 z-0 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-1 shadow-[0_8px_18px_-12px_rgba(15,23,42,0.55)] transition-colors ${
                      stamped ? 'border-[#C61A1A] bg-red-50' : 'border-slate-200 bg-white'
                    }`}
                    style={{ left: `${u * 100}%`, opacity: op }}
                  >
                    <span className="font-mono text-[9px] font-bold text-slate-600">{label}</span>
                    {stamped && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                        className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#C61A1A]"
                      >
                        <Check className="h-2 w-2 text-white" strokeWidth={4} />
                      </motion.span>
                    )}
                  </div>
                );
              })}

              {/* the bot */}
              <div
                className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
                aria-hidden="true"
              >
                {/* antenna */}
                <span className="flex flex-col items-center">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-[#C61A1A]"
                    animate={reduce ? undefined : { opacity: [1, 0.3, 1] }}
                    transition={reduce ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="h-2 w-px bg-slate-400" />
                </span>

                {/* head */}
                <div className="relative flex h-9 w-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white shadow-[0_6px_14px_-8px_rgba(15,23,42,0.5)] sm:h-10 sm:w-14">
                  <span className="absolute -left-2 top-2.5 h-4 w-2 rounded-l bg-slate-300" />
                  <span className="absolute -right-2 top-2.5 h-4 w-2 rounded-r bg-slate-300" />
                  {[0, 1].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-slate-800"
                      animate={reduce ? undefined : { scaleY: [1, 1, 0.12, 1, 1] }}
                      transition={
                        reduce
                          ? undefined
                          : {
                              duration: 3.4,
                              repeat: Infinity,
                              times: [0, 0.44, 0.5, 0.56, 1],
                              delay: i * 0.12,
                            }
                      }
                    />
                  ))}
                </div>

                {/* body with a little processing screen */}
                <div className="relative -mt-0.5 flex h-8 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white sm:w-12">
                  <span className="flex h-4 w-6 items-end justify-center gap-[2px] rounded bg-slate-900 p-[3px]">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-full w-[3px] rounded-[1px] bg-[#C61A1A]"
                        style={{ transformOrigin: 'bottom' }}
                        animate={reduce ? undefined : { scaleY: [0.4, 1, 0.6, 0.9, 0.4] }}
                        transition={
                          reduce
                            ? undefined
                            : { duration: 1.8 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }
                        }
                      />
                    ))}
                  </span>

                  {/* stamping arm */}
                  <motion.span
                    className="absolute left-full top-1.5 flex h-1.5 w-5 origin-left items-center rounded-full bg-slate-400 sm:w-6"
                    animate={{ rotate: working ? 30 : -14 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 16 }}
                  >
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#C61A1A]" />
                  </motion.span>
                </div>

                {/* base */}
                <span className="mt-0.5 h-1.5 w-8 rounded-full bg-slate-300" />
              </div>
            </div>

            {/* conveyor belt */}
            <div className="absolute inset-x-0 bottom-0 h-7 overflow-hidden border-t border-slate-200 bg-white">
              <div
                className={`flex h-full w-max items-center ${
                  reduce ? '' : 'animate-[dz-marquee_4s_linear_infinite]'
                }`}
              >
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex items-center">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <span key={`${copy}-${i}`} className="flex w-5 justify-center">
                        <span
                          className={`h-3 w-px ${i % 6 === 0 ? 'bg-red-300' : 'bg-slate-300'}`}
                        />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* live log + counter */}
          <div className="flex items-center justify-between gap-3 px-0.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-red-50 text-[#C61A1A]">
                <Bot className="h-3 w-3" />
              </span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={logIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="truncate font-mono text-[10px] font-bold text-slate-500"
                >
                  {HERO_LOGS[logIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="shrink-0 text-right">
              <span className="block text-lg font-extrabold leading-none text-[#C61A1A]">
                {done}
              </span>
              <span className="block font-mono text-[8.5px] font-extrabold uppercase tracking-wider text-slate-400">
                chores done
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   2. PROBLEM — "Manual Drain": an hourglass empties while the week's manual
   chores stack up beside it, hour by hour, closing on hours-lost-per-week.
   ========================================================================== */

const DRAIN_ROWS = [
  { label: 'Chasing leads by hand', h: 9 },
  { label: 'Copy-pasting data', h: 8 },
  { label: 'Answering the same questions', h: 7 },
  { label: 'Switching between tools', h: 6 },
  { label: 'Updating status sheets', h: 5 },
] as const;

const Hourglass: React.FC<{ reduce: boolean }> = ({ reduce }) => (
  <svg viewBox="0 0 72 104" className="w-16 shrink-0 sm:w-20" aria-hidden="true">
    <rect x="10" y="3" width="52" height="6" rx="3" fill="#334155" />
    <rect x="10" y="95" width="52" height="6" rx="3" fill="#334155" />
    <path
      d="M16 9 H56 L42 52 L56 95 H16 L30 52 Z"
      fill="#ffffff"
      stroke="#CBD5E1"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* top sand — drains and refills on the loop */}
    <motion.path
      d="M21 13 H51 L41 47 H31 Z"
      fill="#C61A1A"
      opacity="0.9"
      style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }}
      animate={reduce ? undefined : { scaleY: [1, 0.12, 1] }}
      transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* falling stream */}
    <motion.rect
      x="35.2"
      y="46"
      width="1.6"
      height="42"
      fill="#C61A1A"
      animate={reduce ? undefined : { opacity: [0.25, 0.9, 0.25] }}
      transition={reduce ? undefined : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* bottom mound — grows as the top drains */}
    <motion.path
      d="M22 91 H50 L36 62 Z"
      fill="#C61A1A"
      opacity="0.9"
      style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
      animate={reduce ? undefined : { scaleY: [0.12, 1, 0.12] }}
      transition={reduce ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
  </svg>
);

export const HourglassDrain: React.FC = () => {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? DRAIN_ROWS.length + 1 : 0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (reduce || !playing || step > DRAIN_ROWS.length) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 450 : 650);
    return () => window.clearTimeout(id);
  }, [playing, step, reduce]);

  const done = step > DRAIN_ROWS.length;
  const shown = DRAIN_ROWS.slice(0, Math.min(step, DRAIN_ROWS.length));
  const total = shown.reduce((s, r) => s + r.h, 0);

  return (
    <motion.div
      onViewportEnter={() => setPlaying(true)}
      viewport={{ once: true, amount: 0.35 }}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        className="absolute inset-2 sm:inset-5 bg-[radial-gradient(ellipse_at_50%_45%,rgba(198,26,26,0.1),transparent_70%)] blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_36px_80px_-42px_rgba(15,23,42,0.6)]"
        role="img"
        aria-label="A manual-mode panel: an hourglass drains while the week's manual chores fill in one by one, totaling 35 hours lost"
      >
        <PanelHeader title="manual-mode.dz" status={done ? 'DRAINING' : 'COUNTING'} />

        <div className="p-3 sm:p-4">
          <div className="flex gap-3 sm:gap-4">
            <Hourglass reduce={!!reduce} />

            <div className="min-w-0 flex-1 space-y-2">
              {DRAIN_ROWS.map((row, i) => {
                const shownRow = i < step;
                return (
                  <div key={row.label} className={shownRow ? '' : 'invisible'}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`truncate text-[11.5px] font-bold transition-colors ${
                          shownRow ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        {row.label}
                      </span>
                      <span
                        className={`shrink-0 font-mono text-[10.5px] font-extrabold transition-colors ${
                          shownRow ? 'text-[#C61A1A]' : 'text-slate-300'
                        }`}
                      >
                        {shownRow ? `${row.h}h/wk` : '—'}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        className="h-full rounded-full bg-[#C61A1A]"
                        initial={{ width: 0 }}
                        animate={{ width: shownRow ? `${(row.h / 10) * 100}%` : 0 }}
                        transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* total */}
          <div className="mt-3 flex items-end justify-between gap-3 border-t border-slate-100 px-0.5 pt-3">
            <div>
              <span className="block font-mono text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                lost to manual work
              </span>
              <span className="block text-[11px] font-bold text-slate-500">
                {done ? '≈ 1 full workday, every week' : 'counting the week…'}
              </span>
            </div>
            <span className="text-2xl font-extrabold leading-none text-[#C61A1A]">
              {total}
              <span className="text-sm">h</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   3. SERVICES BAND — "Task Log Ticker": a scrolling strip of timestamped
   auto-actions, the automation analogue of the influencer page's disclosure
   ticker and the video page's film strip.
   ========================================================================== */

const LOG_LINES = [
  '09:41:02 · lead #4821 → auto-reply sent',
  '09:41:07 · 14 CRM records synced',
  '09:41:11 · ticket #773 → routed to billing',
  '09:41:15 · invoice #2291 → filed & logged',
  '09:41:20 · weekly report → 6 inboxes',
  '09:41:26 · 27 chats answered · 0 wait',
] as const;

export const LogTicker: React.FC = () => (
  <div className="flex overflow-hidden border-y border-slate-200 bg-white py-2" aria-hidden="true">
    <div className="flex w-max shrink-0 animate-[dz-marquee_32s_linear_infinite] items-center">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center">
          {LOG_LINES.map((line) => (
            <span key={`${copy}-${line}`} className="flex items-center">
              <span className="flex items-center gap-1.5 px-4">
                <Check className="h-3 w-3 text-[#C61A1A]" strokeWidth={3.5} />
                <span className="font-mono text-[11px] font-bold text-slate-400">{line}</span>
              </span>
              <span className="h-3 w-px bg-slate-200" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/* ==========================================================================
   4. STACK — "Server Rack": the six tool layers as rack units with screw
   rails and an LED that cycles down the rack, one active unit at a time.
   ========================================================================== */

export const ServerRack: React.FC<{ layers: readonly IaStackLayer[] }> = ({ layers }) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % layers.length),
      1600,
    );
    return () => window.clearInterval(id);
  }, [reduce, layers.length]);

  const railScrews = layers.map((layer, i) => (
    <div
      key={layer.name}
      className="flex flex-1 items-center justify-center border-b border-slate-200 last:border-b-0"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
    </div>
  ));

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-[0_36px_80px_-42px_rgba(15,23,42,0.6)]"
      role="img"
      aria-label="A server rack of six technology layers; the active layer's LED lights as it cycles through the brain, workflow, communication, CRM, voice and infrastructure layers"
    >
      <PanelHeader
        title="stack-rack.dz"
        status={`${layers.length} LAYERS · LINKED`}
        live={!reduce}
      />

      <div className="flex">
        {/* left rail */}
        <div className="flex w-6 shrink-0 flex-col border-r border-slate-200 bg-slate-50">
          {railScrews}
        </div>

        {/* units */}
        <div className="min-w-0 flex-1">
          {layers.map((layer, i) => {
            const on = i === active;
            return (
              <motion.div
                key={layer.name}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-start gap-3 border-b border-slate-200 px-3 py-3 transition-colors duration-500 last:border-b-0 sm:px-4 ${
                  on ? 'bg-red-50/50' : 'bg-white'
                }`}
              >
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center">
                  <span
                    className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                      on ? 'bg-[#C61A1A] animate-pulse' : 'bg-slate-300'
                    }`}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span
                      className={`text-[13px] font-extrabold transition-colors ${
                        on ? 'text-[#C61A1A]' : 'text-slate-800'
                      }`}
                    >
                      {layer.name}
                    </span>
                    {layer.role && (
                      <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold uppercase tracking-wider text-slate-500">
                        {layer.role}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-slate-500">{layer.desc}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {layer.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[9.5px] font-bold text-slate-600"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="hidden w-14 shrink-0 text-right font-mono text-[9px] font-extrabold text-slate-400 sm:block">
                  {on ? 'ACTIVE' : 'LINKED'}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* right rail */}
        <div className="flex w-6 shrink-0 flex-col border-l border-slate-200 bg-slate-50">
          {railScrews}
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. PROCESS — "5D Circuit": a PCB trace with five via pads; a red current
   pulse draws along the trace and each pad lights as the pulse reaches it.
   ========================================================================== */

const CIRCUIT_LOOP = 9000;
const CIRCUIT_RISE = 6800;

export const CircuitPath: React.FC<{ stages: readonly string[] }> = ({ stages }) => {
  const reduce = useReducedMotion();
  const [rawT, setRawT] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setRawT((x) => (x + STEP_MS) % CIRCUIT_LOOP), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const t = reduce ? CIRCUIT_RISE : rawT;
  const p = clamp(t / CIRCUIT_RISE);
  const n = stages.length;
  /* Pad centers sit at 10%, 30% … 90% of the 700-wide viewBox. */
  const centers = stages.map((_, i) => (i * 2 + 1) / 10);
  const reachedIdx = centers.filter((c) => p >= c).length;
  const currentIdx = reachedIdx - 1;
  const frontX = p * 700;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_36px_80px_-42px_rgba(15,23,42,0.6)]"
      role="img"
      aria-label="A circuit path through the five 5D stages; a red current draws along the trace and lights each pad from Discover to Detect"
    >
      <PanelHeader
        title="5d-circuit.dz"
        status={reduce ? 'COMPLETE' : `STAGE ${Math.max(reachedIdx, 1)}/${n}`}
        live={!reduce}
      />

      <div className="overflow-x-auto p-3 sm:p-4">
        <div className="relative min-w-[620px]">
          <div
            className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#0F172A_1px,transparent_1px)] [background-size:16px_16px]"
            aria-hidden="true"
          />
          <svg viewBox="0 0 700 110" className="relative block w-full" aria-hidden="true">
            {/* decorative stubs + vias (all upward, labels live below) */}
            {centers.map((c, i) => {
              const x = c * 700;
              const tip = i % 2 === 0 ? 22 : 12;
              return (
                <g key={`stub-${i}`} stroke="#CBD5E1" strokeWidth="2.5" fill="none">
                  <line x1={x} y1={34} x2={x} y2={tip + 4} />
                  <circle cx={x} cy={tip} r="4" fill="#ffffff" />
                </g>
              );
            })}

            {/* base trace */}
            <line x1="0" y1="50" x2="700" y2="50" stroke="#E2E8F0" strokeWidth="3" />

            {/* drawn (energized) trace */}
            <motion.path
              d="M0,50 H700"
              stroke="#C61A1A"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              initial={false}
              animate={{ pathLength: p }}
              transition={{ duration: reduce ? 0 : STEP_MS / 1000, ease: 'linear' }}
            />

            {/* current pulse at the trace front */}
            {!reduce && p > 0.02 && p < 0.995 && (
              <>
                <circle cx={frontX} cy={50} r="10" fill="#C61A1A" opacity="0.18" />
                <circle cx={frontX} cy={50} r="4" fill="#C61A1A" />
              </>
            )}

            {/* pads */}
            {centers.map((c, i) => {
              const x = c * 700;
              const lit = p >= c;
              const isCurrent = !reduce && i === currentIdx && p < 0.995;
              return (
                <g key={`pad-${i}`}>
                  {isCurrent && (
                    <motion.g
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                      animate={{ scale: [1, 1.65], opacity: [0.5, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                    >
                      <circle cx={x} cy={50} r={17} fill="none" stroke="#C61A1A" strokeWidth="2" />
                    </motion.g>
                  )}
                  <rect
                    x={x - 16}
                    y={34}
                    width="32"
                    height="32"
                    rx="8"
                    fill={lit ? '#C61A1A' : '#ffffff'}
                    stroke={lit ? '#C61A1A' : '#CBD5E1'}
                    strokeWidth="2.5"
                  />
                  <text
                    x={x}
                    y={50.5}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={lit ? '#ffffff' : '#94A3B8'}
                    fontSize="13"
                    fontWeight="800"
                    fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* stage labels under the pads */}
          <div className="pointer-events-none absolute inset-x-0 top-[70%]">
            {stages.map((stage, i) => {
              const lit = p >= centers[i];
              return (
                <span
                  key={stage}
                  className={`absolute -translate-x-1/2 whitespace-nowrap font-mono text-[9px] font-extrabold uppercase tracking-wider transition-colors ${
                    lit ? 'text-[#C61A1A]' : 'text-slate-400'
                  }`}
                  style={{ left: `${(i * 2 + 1) * 10}%` }}
                >
                  {stage}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   6. WHY — "Switch Panel": five manual-vs-auto rows where each row's toggle
   flips to ON in sequence. Deliberately not the influencer page's
   strikethrough SwapLedger or SMM's pill-and-arrow OutcomeRows.
   ========================================================================== */

export const SwitchPanel: React.FC<{
  items: readonly { from: string; to: string }[];
}> = ({ items }) => {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? items.length : 0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (reduce || !playing || step >= items.length) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 350 : 420);
    return () => window.clearTimeout(id);
  }, [playing, step, reduce, items.length]);

  return (
    <motion.div
      onViewportEnter={() => setPlaying(true)}
      viewport={{ once: true, amount: 0.3 }}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-48px_rgba(15,23,42,0.55)]"
      role="table"
      aria-label="What changes when you switch to Digivibz AI automation: each manual chore toggles over to its automated outcome"
    >
      {/* header — centered pair on mobile, split columns from sm up */}
      <div className="flex items-center justify-center gap-3 border-b border-slate-200 bg-slate-50/70 px-4 py-2.5 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-5">
        <span className="font-mono text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-slate-400 sm:text-right">
          Manual mode
        </span>
        <span aria-hidden="true" className="hidden sm:inline-block" />
        <span className="font-mono text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-[#C61A1A]">
          On autopilot
        </span>
      </div>

      {items.map((item, i) => {
        const on = i < step;
        return (
          <div
            key={item.from}
            className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 border-b border-slate-100 px-4 py-3.5 transition-colors last:border-b-0 hover:bg-red-50/30 sm:grid-cols-[1fr_auto_1fr] sm:px-5"
          >
            {/* before */}
            <span
              className={`text-[12.5px] font-bold transition-colors sm:text-right ${
                on ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {item.from}
            </span>

            {/* toggle */}
            <span
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-300 ${
                on ? 'border-[#C61A1A] bg-[#C61A1A]' : 'border-slate-300 bg-slate-200'
              }`}
              aria-hidden="true"
            >
              <motion.span
                className="ml-1 h-4.5 w-4.5 rounded-full bg-white shadow-md"
                initial={{ x: 0 }}
                animate={{ x: on ? 20 : 0 }}
                transition={
                  reduce ? { duration: 0 } : { type: 'spring', stiffness: 460, damping: 28 }
                }
              />
            </span>

            {/* after */}
            <span className="col-span-2 text-[12.5px] font-extrabold text-slate-900 sm:col-span-1 sm:text-left">
              {item.to}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
};

/* ==========================================================================
   Icon sets for the page's card sections.
   ========================================================================== */

export const GROUP_ICONS = [
  Workflow,
  MessagesSquare,
  Mic,
  TrendingUp,
  Mail,
  Bot,
] as const;
