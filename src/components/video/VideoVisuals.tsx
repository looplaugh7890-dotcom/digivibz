import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AudioLines,
  BadgeCheck,
  Bot,
  Briefcase,
  Check,
  Clapperboard,
  Cpu,
  Film,
  Layers,
  Music,
  Palette,
  Play,
  Scissors,
  Share2,
  ShoppingCart,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  Target,
  Youtube,
  Zap,
} from 'lucide-react';

const RED = '#C61A1A';

/* ==========================================================================
   1. HERO — "EditSuite": a full editing-software experience. The playhead
   sweeps the timeline, a razor splits the clip twice, the dead segment is
   selected and ripples away, the audio syncs, the grade applies in the
   viewer, and the export fills — then the whole sequence loops.
   ========================================================================== */

const LOOP_MS = 11200;
const STEP_MS = 40;

const CUT1_AT = 2800;
const CUT1_END = 3400;
const CUT2_AT = 5400;
const CUT2_END = 6000;
const SELECT_AT = 6200;
const RIPPLE_AT = 6800;
const SYNC_AT = 7400;
const GRADE_AT = 7700;
const TITLE_AT = 8200;
const EXPORT_AT = 8800;
const EXPORT_MS = 1400;
const FADE_AT = 10600;
/** Resting time used for reduced motion: everything in its final state. */
const FINAL_T = 10300;

const HERO_CHIPS = [
  { label: 'Razor cuts', Icon: Scissors, tone: 'red' },
  { label: 'Color grading', Icon: Palette, tone: 'plain' },
  { label: 'Frame-synced audio', Icon: AudioLines, tone: 'plain' },
] as const;

const EFFECTS = [
  { label: 'Cut & trim', at: CUT1_END },
  { label: 'Pacing pass', at: 5800 },
  { label: 'Ripple delete', at: 7300 },
  { label: 'Audio sync', at: SYNC_AT + 300 },
  { label: 'Color grade', at: GRADE_AT + 400 },
  { label: 'Motion title', at: TITLE_AT + 300 },
] as const;

const SHOTS = ['A_CAM', 'B_CAM', 'C_CAM'] as const;
const CLIP_NAMES = ['RAW_A.MOV', 'B_CAM.MOV', 'C_CAM.MOV'] as const;

/** Shot framing: wide, medium, close — feet planted on the ground line. */
const SHOT_FRAMES = [
  { x: 108, s: 0.62 },
  { x: 178, s: 1.0 },
  { x: 158, s: 1.52 },
] as const;

const WAVE_N = 56;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const WAVE_JAG = Array.from({ length: WAVE_N }, (_, i) =>
  clamp(16 + ((i * 47) % 58) + (i % 5) * 3, 12, 92),
);
const WAVE_EVEN = Array.from(
  { length: WAVE_N },
  (_, i) => clamp(40 + Math.sin(i / 3.4) * 18 + Math.sin(i / 8) * 12, 14, 88),
);

/** Scope histogram: clumped in log, spread once graded. */
const SCOPE_FLAT = [18, 24, 34, 52, 72, 84, 78, 58, 40, 28, 22, 18, 15, 12];
const SCOPE_GRADE = [46, 72, 54, 82, 62, 92, 70, 86, 64, 96, 74, 58, 80, 52];

/** Playhead position in % of the track, piecewise with pauses at each cut. */
const playheadAt = (t: number) => {
  if (t < CUT1_AT) return 38 * (t / CUT1_AT);
  if (t < CUT1_END) return 38;
  if (t < CUT2_AT) return 38 + 26 * ((t - CUT1_END) / (CUT2_AT - CUT1_END));
  if (t < RIPPLE_AT) return 64;
  return 64 + 10 * clamp((t - RIPPLE_AT) / 1800, 0, 1);
};

const timecode = (pct: number) => {
  const frames = Math.round((pct / 100) * 16 * 24);
  const s = Math.floor(frames / 24);
  const f = frames % 24;
  return `00:00:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
};

export const EditSuite: React.FC = () => {
  const reduce = useReducedMotion();
  const [rawT, setRawT] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setRawT((x) => (x + STEP_MS) % LOOP_MS), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const t = reduce ? FINAL_T : rawT;

  const wA = t >= CUT1_AT ? 38 : 100;
  const wB = t >= RIPPLE_AT ? 0 : t >= CUT2_AT ? 26 : t >= CUT1_AT ? 62 : 0;
  const wC = t >= CUT2_AT ? 36 : 0;
  const shot = t < CUT1_END ? 0 : t < CUT2_END ? 1 : 2;
  const graded = t >= GRADE_AT;
  const selected = t >= SELECT_AT && t < RIPPLE_AT;
  const syncing = clamp((t - SYNC_AT) / 500, 0, 1);
  const ph = playheadAt(t);
  const exporting = t >= EXPORT_AT && t < EXPORT_AT + EXPORT_MS;
  const exported = t >= EXPORT_AT + EXPORT_MS;
  const exportPct = clamp((t - EXPORT_AT) / EXPORT_MS, 0, 1) * 100;
  const doneCount = EFFECTS.filter((e) => t >= e.at).length;
  const bodyFade = t >= FADE_AT ? 0 : 1;

  /** Clips sit inset 4px inside the track — convert clip-% to track-%. */
  const at = (pct: number) => `calc(4px + (100% - 8px) * ${pct / 100})`;

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
        aria-label="A video editing suite: the playhead sweeps the timeline, a razor splits the clip twice, the dead segment ripples away, the audio syncs, the color grade applies in the viewer, and the export completes"
      >
        {/* window header */}
        <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
          <span className="hidden sm:flex gap-1.5 shrink-0" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </span>
          <span className="ml-1 font-mono text-[10.5px] font-bold text-slate-600">
            edit-suite.dz
          </span>
          <span
            className={`ml-auto inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[9.5px] font-extrabold ${
              exported
                ? 'border-[#C61A1A] bg-[#C61A1A] text-white'
                : exporting
                  ? 'border-red-200 bg-red-50 text-[#C61A1A]'
                  : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                exported ? 'bg-white' : exporting ? 'bg-[#C61A1A] animate-pulse' : 'bg-slate-400'
              }`}
            />
            {exported ? 'EXPORTED' : exporting ? 'EXPORTING' : 'EDITING'}
          </span>
        </div>

        <motion.div
          className="p-3 sm:p-4 space-y-3"
          animate={{ opacity: bodyFade }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          {/* viewer + effects rack */}
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] gap-3">
            {/* ---------------------------------------------------- viewer */}
            <div className="rounded-lg border border-slate-200 bg-white p-2 space-y-2">
              <div className="relative aspect-video overflow-hidden rounded-md bg-[#0F172A]">
                <svg
                  viewBox="0 0 320 180"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <rect width="320" height="180" fill="#0F172A" />
                  <rect y="118" width="320" height="62" fill="#1E293B" />
                  <line x1="0" y1="118" x2="320" y2="118" stroke="#334155" strokeWidth="1.5" />
                  {/* key light — gray in log, brand red once graded */}
                  <motion.circle
                    cx="258"
                    cy="46"
                    r="15"
                    animate={{ fill: graded ? RED : '#475569' }}
                    transition={{ duration: reduce ? 0 : 0.6 }}
                  />
                  <motion.circle
                    cx="258"
                    cy="46"
                    r="30"
                    fill={RED}
                    animate={{ opacity: graded ? 0.22 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.6 }}
                  />
                  {/* three shot framings, crossfaded */}
                  {SHOT_FRAMES.map((f, i) => (
                    <motion.g
                      key={i}
                      transform={`translate(${f.x} 140) scale(${f.s})`}
                      animate={{ opacity: shot === i ? 1 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.35 }}
                    >
                      <circle
                        cy="-54"
                        r="13"
                        fill="#64748B"
                        stroke={graded ? RED : 'transparent'}
                        strokeWidth="2.5"
                        vectorEffect="non-scaling-stroke"
                      />
                      <path
                        d="M-26 0 Q0 -36 26 0 L26 8 L-26 8 Z"
                        fill="#64748B"
                        stroke={graded ? RED : 'transparent'}
                        strokeWidth="2.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    </motion.g>
                  ))}
                  {/* log wash lifts away on grade */}
                  <motion.rect
                    width="320"
                    height="180"
                    fill="#94A3B8"
                    animate={{ opacity: graded ? 0 : 0.14 }}
                    transition={{ duration: reduce ? 0 : 0.6 }}
                  />
                  {/* letterbox */}
                  <rect width="320" height="12" fill="#000000" />
                  <rect y="168" width="320" height="12" fill="#000000" />
                </svg>

                {/* viewer overlays */}
                <span
                  className={`absolute left-2 top-3.5 rounded px-1.5 py-0.5 font-mono text-[8px] font-extrabold tracking-wider ${
                    graded ? 'bg-[#C61A1A] text-white' : 'bg-white/15 text-slate-300'
                  }`}
                >
                  {graded ? 'GRADED' : 'LOG'}
                </span>
                <span className="absolute right-2 top-3.5 font-mono text-[8px] font-bold text-slate-400">
                  H.264
                </span>
                <span className="absolute bottom-3.5 left-2 font-mono text-[8px] font-bold text-slate-400">
                  SHOT · {SHOTS[shot]}
                </span>
                {/* scopes */}
                <span className="absolute bottom-3.5 right-2 flex h-6 w-[84px] items-end gap-[1.5px] rounded bg-black/45 px-1.5 py-1">
                  {SCOPE_FLAT.map((h, i) => (
                    <span
                      key={i}
                      className={`flex-1 rounded-[1px] transition-all duration-500 ${
                        graded ? 'bg-[#C61A1A]' : 'bg-slate-500'
                      }`}
                      style={{ height: `${graded ? SCOPE_GRADE[i] : h}%` }}
                    />
                  ))}
                </span>
              </div>

              {/* transport */}
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-slate-500">
                  <SkipBack className="w-3.5 h-3.5" fill="currentColor" />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C61A1A] text-white shadow-[0_8px_18px_-10px_rgba(198,26,26,0.9)]">
                  <Play className="w-3.5 h-3.5" fill="currentColor" />
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-slate-500">
                  <SkipForward className="w-3.5 h-3.5" fill="currentColor" />
                </span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <motion.span
                    className="block h-full rounded-full bg-[#C61A1A]"
                    animate={{ width: `${ph}%` }}
                    transition={{ duration: reduce ? 0 : STEP_MS / 1000, ease: 'linear' }}
                  />
                </span>
                <span className="font-mono text-[9px] font-bold tabular-nums text-slate-500">
                  {timecode(ph)}
                </span>
              </div>
            </div>

            {/* ----------------------------------------------- effects rack */}
            <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  effects.rack
                </span>
                <span className="font-mono text-[9px] font-extrabold tabular-nums text-[#C61A1A]">
                  {doneCount}/{EFFECTS.length}
                </span>
              </div>

              <ul className="space-y-1.5">
                {EFFECTS.map((e) => {
                  const done = t >= e.at;
                  return (
                    <li key={e.label} className="flex items-center gap-2">
                      <span
                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full transition-colors ${
                          done ? 'bg-[#C61A1A] text-white' : 'border border-slate-300 bg-white'
                        }`}
                      >
                        {done && <Check className="w-2 h-2" strokeWidth={4} />}
                      </span>
                      <span
                        className={`text-[10.5px] font-bold transition-colors ${
                          done ? 'text-slate-700' : 'text-slate-400'
                        }`}
                      >
                        {e.label}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold text-slate-500">
                    export.mp4
                  </span>
                  <span className="font-mono text-[9px] font-extrabold tabular-nums text-[#C61A1A]">
                    {Math.round(exportPct)}%
                  </span>
                </div>
                <span className="block h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <motion.span
                    className="block h-full rounded-full bg-[#C61A1A]"
                    animate={{ width: `${exportPct}%` }}
                    transition={{ duration: reduce ? 0 : STEP_MS / 1000, ease: 'linear' }}
                  />
                </span>
                <div className="flex gap-1.5 pt-0.5">
                  {['16:9', '9:16', '1:1'].map((fmt, i) => (
                    <span
                      key={fmt}
                      className={`rounded border px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold ${
                        i === 0
                          ? 'border-red-200 bg-red-50 text-[#C61A1A]'
                          : 'border-slate-200 bg-white text-slate-400'
                      }`}
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------- timeline */}
          <div className="rounded-lg border border-slate-200 bg-white p-2.5">
            <div className="flex gap-2">
              {/* track heads */}
              <div className="flex w-5 shrink-0 flex-col gap-1.5 pt-5">
                {['V1', 'A1', 'T1'].map((h) => (
                  <span
                    key={h}
                    className={`flex items-center justify-center rounded font-mono text-[8px] font-extrabold text-slate-500 ${
                      h === 'V1' ? 'h-8 bg-slate-100' : 'h-6 bg-slate-100'
                    }`}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* tracks */}
              <div className="relative min-w-0 flex-1">
                {/* ruler */}
                <div className="relative mb-1.5 h-3.5">
                  {Array.from({ length: 21 }, (_, i) => (
                    <span
                      key={i}
                      className={`absolute bottom-0 w-px ${
                        i % 4 === 0 ? 'h-1.5 bg-slate-300' : 'h-1 bg-slate-200'
                      }`}
                      style={{ left: `${i * 5}%` }}
                    />
                  ))}
                  {[0, 5, 10, 15, 20].map((i) => (
                    <span
                      key={`l-${i}`}
                      className={`absolute top-0 font-mono text-[7.5px] font-bold text-slate-400 ${
                        i === 20 ? '-translate-x-full' : ''
                      }`}
                      style={{ left: `${i * 5}%` }}
                    >
                      00:{String((i / 5) * 4).padStart(2, '0')}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  {/* V1 — video */}
                  <div className="relative h-8 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                    <div className="absolute inset-y-1 left-1 right-1 flex">
                      {[
                        { w: wA, name: CLIP_NAMES[0], showDivider: t >= CUT1_AT },
                        { w: wB, name: CLIP_NAMES[1], showDivider: t >= CUT2_AT },
                        { w: wC, name: CLIP_NAMES[2], showDivider: false },
                      ].map((c, i) => (
                        <motion.div
                          key={c.name}
                          initial={false}
                          animate={{
                            width: `${c.w}%`,
                            opacity: c.w === 0 ? 0 : 1,
                          }}
                          transition={
                            reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                          }
                          className={`relative h-full shrink-0 overflow-hidden rounded-[4px] ${
                            i === 1 && selected
                              ? 'bg-red-100 ring-2 ring-[#C61A1A]'
                              : 'bg-slate-300'
                          }`}
                        >
                          <span className="absolute inset-0 flex items-center gap-1 px-1.5">
                            <span className="h-3 w-3 shrink-0 rounded-[2px] bg-slate-400/80" />
                            <span className="truncate font-mono text-[7.5px] font-bold text-slate-600">
                              {i === 1 && selected ? 'DEAD AIR' : c.name}
                            </span>
                          </span>
                          {c.showDivider && (
                            <span className="absolute inset-y-0 right-0 w-0.5 bg-white" />
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* razor flashes */}
                    {t >= CUT1_AT && t <= CUT1_END && (
                      <motion.span
                        className="absolute inset-y-0 z-10"
                        style={{ left: at(38) }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.6, times: [0, 0.18, 0.6, 1] }}
                      >
                        <span className="absolute inset-y-0 left-0 w-0.5 bg-[#C61A1A]" />
                        <Scissors className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded border border-red-200 bg-white p-0.5 text-[#C61A1A]" />
                      </motion.span>
                    )}
                    {t >= CUT2_AT && t <= CUT2_END && (
                      <motion.span
                        className="absolute inset-y-0 z-10"
                        style={{ left: at(64) }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 0.6, times: [0, 0.18, 0.6, 1] }}
                      >
                        <span className="absolute inset-y-0 left-0 w-0.5 bg-[#C61A1A]" />
                        <Scissors className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded border border-red-200 bg-white p-0.5 text-[#C61A1A]" />
                      </motion.span>
                    )}

                    {/* trimmed-gap chip */}
                    {t >= 7300 && t < FADE_AT && (
                      <span
                        className="absolute left-[86%] top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
                      >
                        <motion.span
                          className="block rounded border border-red-200 bg-white px-1 py-0.5 font-mono text-[7.5px] font-extrabold text-[#C61A1A] shadow-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35, delay: 0.25 }}
                        >
                          −26% trimmed
                        </motion.span>
                      </span>
                    )}
                  </div>

                  {/* A1 — audio */}
                  <div className="relative h-6 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                    <div className="absolute inset-y-1 left-1 right-1 flex items-center gap-[1.5px]">
                      {WAVE_JAG.map((h, i) => {
                        const height = h + (WAVE_EVEN[i] - h) * syncing;
                        const played = ((i + 0.5) / WAVE_N) * 100 < ph;
                        return (
                          <span
                            key={i}
                            className={`h-full flex-1 rounded-[1px] transition-colors ${
                              played ? 'bg-[#C61A1A]' : 'bg-slate-300'
                            }`}
                            style={{ height: `${height}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* T1 — titles */}
                  <div className="relative h-6 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                    <motion.span
                      className="absolute inset-y-1 flex items-center overflow-hidden rounded-[4px] border-l-2 border-[#C61A1A] bg-slate-800 px-1.5"
                      style={{ left: '40%' }}
                      initial={false}
                      animate={{
                        width: t >= TITLE_AT ? '24%' : '0%',
                        opacity: t >= TITLE_AT ? 1 : 0,
                      }}
                      transition={
                        reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                      }
                    >
                      <span className="truncate font-mono text-[7.5px] font-bold text-white">
                        TITLE · lower-third
                      </span>
                    </motion.span>
                  </div>
                </div>

                {/* playhead */}
                <span
                  className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-[#C61A1A] transition-[left] duration-100 ease-linear"
                  style={{ left: at(ph) }}
                >
                  <span className="absolute -top-0.5 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#C61A1A]" />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   2. PROBLEM — viewer with a retention curve: flat edits bleed viewers at
   the exact moments the copy names; a purposeful edit holds the line.
   ========================================================================== */

const PINS = [
  { x: 30, y: 44, label: 'clunky transition', side: 'right' },
  { x: 60, y: 64, label: 'flat pacing', side: 'right' },
  { x: 82, y: 73, label: 'audio drift', side: 'left' },
] as const;

export const DropOffPlayer: React.FC = () => {
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setT((x) => (x + 40) % 8000), 40);
    return () => window.clearInterval(id);
  }, [reduce]);

  const prog = reduce ? 58 : (t / 8000) * 100;

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.55)]"
      role="img"
      aria-label="A video player whose audience-retention curve drops steeply at three annotated moments — a clunky transition, flat pacing, and audio drift — beside a dashed benchmark line that stays high"
    >
      <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
        <span className="hidden sm:flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </span>
        <span className="ml-1 font-mono text-[10.5px] font-bold text-slate-600">
          viewer-retention.dz
        </span>
        <span className="ml-auto rounded-md border border-red-200 bg-red-50 px-2 py-0.5 font-mono text-[9.5px] font-extrabold text-[#C61A1A]">
          FLAT EDIT
        </span>
      </div>

      <div className="p-3.5 sm:p-4 space-y-3.5">
        {/* player frame */}
        <div className="relative aspect-video overflow-hidden rounded-lg bg-[#0F172A]">
          <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <rect width="320" height="180" fill="#0F172A" />
            <rect y="122" width="320" height="58" fill="#1E293B" />
            <line x1="0" y1="122" x2="320" y2="122" stroke="#334155" strokeWidth="1.5" />
            <circle cx="70" cy="48" r="14" fill="#475569" />
            <g transform="translate(210 144) scale(0.9)">
              <circle cy="-54" r="13" fill="#64748B" />
              <path d="M-26 0 Q0 -36 26 0 L26 8 L-26 8 Z" fill="#64748B" />
            </g>
            <rect width="320" height="10" fill="#000" />
            <rect y="170" width="320" height="10" fill="#000" />
          </svg>

          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#C61A1A] text-white shadow-[0_16px_36px_-14px_rgba(198,26,26,0.9)]">
            {!reduce && (
              <motion.span
                className="absolute inset-0 rounded-full border border-[#C61A1A]"
                animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
          </span>

          <span className="absolute inset-x-2 bottom-2 flex items-center gap-2">
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
              <motion.span
                className="block h-full rounded-full bg-[#C61A1A]"
                animate={{ width: `${prog}%` }}
                transition={{ duration: reduce ? 0 : 0.1, ease: 'linear' }}
              />
            </span>
            <span className="font-mono text-[8px] font-bold tabular-nums text-slate-300">
              {Math.floor((prog / 100) * 2)}:{String(Math.floor(((prog / 100) * 120) % 60)).padStart(2, '0')} / 2:00
            </span>
          </span>
        </div>

        {/* retention chart */}
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500">
              audience retention
            </span>
            <span className="flex items-center gap-2.5">
              <span className="flex items-center gap-1 font-mono text-[8.5px] font-bold text-slate-500">
                <span className="h-0.5 w-3 bg-[#C61A1A]" />
                flat edit
              </span>
              <span className="flex items-center gap-1 font-mono text-[8.5px] font-bold text-slate-500">
                <span className="h-0.5 w-3 border-t border-dashed border-slate-400" />
                purposeful
              </span>
            </span>
          </div>

          <div className="relative">
            <svg viewBox="0 0 320 130" className="block w-full" aria-hidden="true">
              {[28, 62, 96].map((y) => (
                <line key={y} x1="4" y1={y} x2="316" y2={y} stroke="#F1F5F9" strokeWidth="1" />
              ))}
              <motion.path
                d="M 4 16 C 40 20, 64 54, 96 66 S 150 88, 192 96 S 268 112, 316 116 L 316 126 L 4 126 Z"
                fill={RED}
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 0.12 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.path
                d="M 4 16 C 40 20, 64 54, 96 66 S 150 88, 192 96 S 268 112, 316 116"
                fill="none"
                stroke={RED}
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
              />
              <motion.path
                d="M 4 16 C 70 18, 140 24, 208 30 S 288 38, 316 40"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeDasharray="5 5"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.1, delay: 0.25, ease: 'easeOut' }}
              />
              {PINS.map((p, i) => (
                <motion.circle
                  key={p.label}
                  cx={(p.x / 100) * 312 + 4}
                  cy={(p.y / 100) * 130}
                  r="4"
                  fill={RED}
                  stroke="#fff"
                  strokeWidth="2"
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: 0.9 + i * 0.18 }}
                />
              ))}
            </svg>

            {PINS.map((p, i) => (
              <motion.span
                key={p.label}
                className={`absolute rounded border border-red-100 bg-white/95 px-1 py-0.5 text-[8.5px] font-extrabold text-[#C61A1A] shadow-sm ${
                  p.side === 'right' ? 'translate-x-1.5' : '-translate-x-full'
                }`}
                style={{ left: `${p.x}%`, top: `calc(${p.y}% - 1.6rem)` }}
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: 1.05 + i * 0.18 }}
              >
                {p.label}
              </motion.span>
            ))}
          </div>

          <div className="mt-1 flex justify-between font-mono text-[8px] font-bold text-slate-400">
            <span>0:00</span>
            <span>1:00</span>
            <span>2:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   3. PROCESS — the 5D stages as clips on a film strip. Click a clip and the
   playhead slides to it while the stage detail crossfades below.
   ========================================================================== */

export const TimelineStages: React.FC<{
  stages: readonly { key: string; body: string }[];
}> = ({ stages }) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <div>
      {/* film-strip rail */}
      <div className="flex gap-1.5 sm:gap-2">
        {stages.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.key}
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`group relative flex-1 cursor-pointer rounded-lg border px-1.5 pb-2 pt-1 text-left transition-all ${
                on
                  ? 'border-[#C61A1A] bg-red-50/70 shadow-[0_16px_36px_-28px_rgba(198,26,26,0.8)]'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {on && (
                <motion.span
                  layoutId="ve-stage-head"
                  className="absolute -top-2 left-1/2 h-0 w-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#C61A1A]"
                  style={{ x: '-50%' }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              {/* sprockets */}
              <span className="mb-1.5 flex justify-between px-0.5" aria-hidden="true">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className={`h-1 w-2.5 rounded-[1px] ${on ? 'bg-red-300' : 'bg-slate-200'}`}
                  />
                ))}
              </span>
              <span
                className={`block font-mono text-[8px] font-extrabold tracking-wider ${
                  on ? 'text-[#C61A1A]' : 'text-slate-400'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`mt-0.5 block truncate text-[11px] font-extrabold sm:text-xs ${
                  on ? 'text-slate-900' : 'text-slate-600'
                }`}
              >
                {s.key}
              </span>
              <span className="mt-1.5 flex justify-between px-0.5" aria-hidden="true">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className={`h-1 w-2.5 rounded-[1px] ${on ? 'bg-red-300' : 'bg-slate-200'}`}
                  />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      {/* stage detail */}
      <div className="relative mt-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-[0_24px_55px_-42px_rgba(15,23,42,0.5)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.key}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#C61A1A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C61A1A]" />
                Stage {String(active + 1).padStart(2, '0')} / 05
              </span>
              <span className="font-mono text-[10px] font-bold text-slate-400">
                {String(Math.min(active + 1, 5) * 20)}%
              </span>
            </div>
            <h3 className="mt-2.5 text-lg font-extrabold text-slate-900 sm:text-xl">
              {stage.key}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{stage.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ==========================================================================
   4. Decorative film strip — sprocket band used between sections.
   ========================================================================== */

export const FilmStrip: React.FC = () => (
  <div
    className="flex items-center justify-between gap-3 overflow-hidden bg-slate-900 px-3 py-1.5"
    aria-hidden="true"
  >
    {Array.from({ length: 40 }, (_, i) => (
      <span key={i} className="h-2 w-3.5 shrink-0 rounded-[2px] bg-white/85" />
    ))}
  </div>
);

/* ==========================================================================
   Icon sets for the page's card sections.
   ========================================================================== */

export const WHY_ICONS = [Clapperboard, Layers, BadgeCheck, Target] as const;

export const GROUP_ICONS = [
  Scissors,
  Share2,
  Layers,
  Briefcase,
  SlidersHorizontal,
  ShoppingCart,
  Youtube,
  Bot,
] as const;

export const TOOL_ICONS = [Film, Layers, Zap, Music, Cpu] as const;
