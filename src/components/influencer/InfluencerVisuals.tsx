import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Check,
  Crosshair,
  FileText,
  Globe,
  Handshake,
  ShieldCheck,
  X,
  Youtube,
} from 'lucide-react';
import { PlatformGlyph } from '../social/SocialVisuals';
import { ImPlatformId } from '../../data/influencerContent';

/* ==========================================================================
   Shared helpers
   ========================================================================== */

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

/** Window chrome shared by every "real software" panel on the page. */
const WindowHeader: React.FC<{
  title: string;
  status: string;
  tone?: 'scan' | 'reject' | 'live' | 'match';
}> = ({ title, status, tone = 'scan' }) => (
  <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
    <span className="hidden sm:flex gap-1.5 shrink-0" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
    </span>
    <span className="ml-1 font-mono text-[10.5px] font-bold text-slate-600">{title}</span>
    <span
      className={`ml-auto inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[9.5px] font-extrabold ${
        tone === 'reject' || tone === 'match'
          ? 'border-[#C61A1A] bg-[#C61A1A] text-white'
          : tone === 'live'
            ? 'border-red-200 bg-red-50 text-[#C61A1A]'
            : 'border-slate-200 bg-white text-slate-500'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          tone === 'scan' ? 'bg-slate-400 animate-pulse' : 'bg-white'
        }`}
      />
      {status}
    </span>
  </div>
);

/* ==========================================================================
   1. HERO — "Match Console": a campaign brief screens a creator shortlist.
   Fit bars fill, a scan line sweeps the rows, the best-fit creator locks in
   with a MATCHED stamp — the largest account deliberately does NOT win,
   mirroring the copy's "instead of chasing follower counts".
   ========================================================================== */

const MATCH_CHIPS = [
  { label: 'Vetted creators', Icon: ShieldCheck, tone: 'red' },
  { label: 'Fit-scored', Icon: Crosshair, tone: 'plain' },
  { label: 'Contracts handled', Icon: Handshake, tone: 'plain' },
] as const;

const CREATORS = [
  { initials: 'MK', handle: '@maya.creates', meta: 'Beauty · 128K', fit: 94, win: true },
  { initials: 'TS', handle: '@techwithsam', meta: 'Tech · 512K', fit: 61, win: false },
  { initials: 'LE', handle: '@luna.eats', meta: 'Food · 89K', fit: 78, win: false },
] as const;

const GOALS = ['Brand Awareness', 'Engagement', 'Sales'] as const;

const LOOP_MS = 10500;
const STEP_MS = 50;
const BAR_AT = 900;
const BAR_STAG = 450;
const BAR_DUR = 800;
const SCAN_AT = 3600;
const SCAN_DUR = 1500;
const PICK_AT = 5400;
const FADE_AT = 9700;
const FINAL_T = 9000;

export const MatchConsole: React.FC = () => {
  const reduce = useReducedMotion();
  const [rawT, setRawT] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setRawT((x) => (x + STEP_MS) % LOOP_MS), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const t = reduce ? FINAL_T : rawT;

  const scanP = clamp((t - SCAN_AT) / SCAN_DUR);
  const scanning = t >= SCAN_AT && t < SCAN_AT + SCAN_DUR;
  const picked = t >= PICK_AT;
  const bodyFade = t >= FADE_AT ? 0 : 1;
  /** Row centers as a fraction of the rows area (three equal rows). */
  const rowCenters = [1 / 6, 3 / 6, 5 / 6];

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
        {MATCH_CHIPS.map(({ label, Icon, tone }, i) => (
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
        aria-label="A creator match console: a campaign brief screens three shortlisted creators, fit scores fill, a scan line sweeps the list, and the best-fit creator is stamped matched while the largest account passes"
      >
        <WindowHeader
          title="match-console.dz"
          status={picked ? 'MATCHED' : 'SCANNING'}
          tone={picked ? 'match' : 'scan'}
        />

        <motion.div
          className="p-3 sm:p-4 space-y-3"
          animate={{ opacity: bodyFade }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          {/* brief bar */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-mono text-[9.5px] font-extrabold uppercase tracking-wider text-slate-400">
                Brief
              </span>
              {GOALS.map((g, i) => (
                <span
                  key={g}
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-extrabold ${
                    i === 0
                      ? 'border-red-200 bg-red-50 text-[#C61A1A]'
                      : 'border-slate-200 bg-white text-slate-500'
                  }`}
                >
                  {g}
                </span>
              ))}
              <span className="ml-auto font-mono text-[10px] font-bold text-slate-500">
                Women 25–34 · US
              </span>
            </div>
          </div>

          {/* shortlist */}
          <div className="flex items-center justify-between px-0.5">
            <span className="font-mono text-[9.5px] font-extrabold uppercase tracking-wider text-slate-400">
              Shortlist · 3 of 84 screened
            </span>
            <span className="font-mono text-[9.5px] font-bold text-slate-400">fit score</span>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-slate-200">
            {/* scan line */}
            {scanning && (
              <motion.div
                className="pointer-events-none absolute inset-x-0 z-10 h-px bg-[#C61A1A]"
                style={{ top: `${scanP * 100}%`, boxShadow: '0 0 12px 2px rgba(198,26,26,0.55)' }}
                aria-hidden="true"
              />
            )}

            {CREATORS.map((c, i) => {
              const p = clamp((t - BAR_AT - i * BAR_STAG) / BAR_DUR);
              const score = Math.round(c.fit * (1 - Math.pow(1 - p, 3)));
              const isWinner = picked && c.win;
              const passed = picked && !c.win;
              const dist = Math.abs(rowCenters[i] - scanP);
              const lit = scanning && dist < 0.16;

              return (
                <div
                  key={c.handle}
                  className={`flex items-center gap-2.5 sm:gap-3 border-b border-slate-100 px-3 py-2.5 transition-colors duration-300 last:border-b-0 ${
                    isWinner
                      ? 'bg-red-50/60'
                      : lit
                        ? 'bg-red-50/30'
                        : passed
                          ? 'bg-white opacity-55'
                          : 'bg-white'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold transition-colors ${
                      isWinner
                        ? 'bg-[#C61A1A] text-white ring-2 ring-red-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {c.initials}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-extrabold text-slate-800">
                      {c.handle}
                    </span>
                    <span className="block font-mono text-[10px] font-bold text-slate-400">
                      {c.meta}
                    </span>
                  </span>

                  {/* fit bar */}
                  <span className="hidden sm:flex w-20 sm:w-24 shrink-0 flex-col gap-1">
                    <span className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <span
                        className={`block h-full rounded-full transition-colors ${
                          isWinner ? 'bg-[#C61A1A]' : 'bg-slate-400'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </span>
                    <span className="text-right font-mono text-[9.5px] font-extrabold text-slate-500">
                      {score}%
                    </span>
                  </span>

                  {/* verdict */}
                  <span className="shrink-0">
                    {picked ? (
                      c.win ? (
                        <motion.span
                          initial={reduce ? false : { scale: 1.5, opacity: 0, rotate: -14 }}
                          animate={{ scale: 1, opacity: 1, rotate: -6 }}
                          transition={{ type: 'spring', stiffness: 380, damping: 16 }}
                          className="inline-block rounded border-2 border-[#C61A1A] px-1.5 py-0.5 font-mono text-[9px] font-extrabold tracking-wider text-[#C61A1A]"
                        >
                          MATCHED
                        </motion.span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[9px] font-extrabold text-slate-400">
                          <X className="w-2.5 h-2.5" strokeWidth={3} />
                          PASS
                        </span>
                      )
                    ) : (
                      <span className="inline-block w-[52px] text-right font-mono text-[9px] font-extrabold text-slate-300">
                        —
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between px-0.5">
            <span className="font-mono text-[10px] font-bold text-slate-400">
              84 screened · vetted for audience fit &amp; authenticity
            </span>
            <span
              className={`font-mono text-[9.5px] font-extrabold ${
                picked ? 'text-[#C61A1A]' : 'text-slate-400'
              }`}
            >
              {picked ? '1 contract ready' : 'ranking…'}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   2. PROBLEM — "Vetting Report": a creator profile is audited row by row,
   each row landing a red flag that maps to the numbered list beside it,
   closing with a REJECTED stamp.
   ========================================================================== */

const AUDIT_ROWS = [
  { label: 'Audience match', value: '29% in-target', flag: 'wrong audience' },
  { label: 'Engagement rate', value: '0.4%', flag: 'fake engagement' },
  { label: 'Campaign brief', value: 'not attached', flag: 'no strategy' },
  { label: 'Response time', value: '14 days late', flag: 'missed deadlines' },
  { label: 'Result tracking', value: 'none', flag: 'no measurement' },
] as const;

export const VettingReport: React.FC = () => {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? AUDIT_ROWS.length + 1 : 0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (reduce || !playing || step > AUDIT_ROWS.length) return;
    const id = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 500 : 700);
    return () => window.clearTimeout(id);
  }, [playing, step, reduce]);

  const done = step > AUDIT_ROWS.length;

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
        aria-label="A vetting report auditing a creator profile: audience match, engagement, brief, response time and tracking are flagged one by one, and the profile is stamped rejected"
      >
        <WindowHeader
          title="vetting-report.dz"
          status={done ? 'REJECTED' : 'AUDITING'}
          tone={done ? 'reject' : 'scan'}
        />

        <div className="p-3 sm:p-4 space-y-3">
          {/* profile head */}
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[13px] font-extrabold text-slate-600">
              VK
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-extrabold text-slate-800">
                @viral.kai
              </span>
              <span className="block font-mono text-[10px] font-bold text-slate-400">
                Fitness · TikTok · quoted $12K
              </span>
            </span>
            <span className="text-right">
              <span className="block text-lg font-extrabold leading-none text-slate-900">1.2M</span>
              <span className="block font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
                followers
              </span>
            </span>
          </div>

          {/* audit rows */}
          <div className="relative overflow-hidden rounded-lg border border-slate-200">
            {AUDIT_ROWS.map((row, i) => {
              const shown = step > i;
              return (
                <div
                  key={row.label}
                  className={`flex items-center gap-2.5 border-b border-slate-100 px-3 py-2.5 transition-colors duration-300 last:border-b-0 ${
                    shown ? 'bg-white' : 'bg-white opacity-0'
                  }`}
                >
                  <AlertTriangle
                    className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                      shown ? 'text-[#C61A1A]' : 'text-slate-200'
                    }`}
                    strokeWidth={2.5}
                  />
                  <span className="min-w-0 flex-1 truncate text-[12px] font-bold text-slate-600">
                    {row.label}
                  </span>
                  <span
                    className={`font-mono text-[11px] font-extrabold transition-colors ${
                      shown ? 'text-slate-900' : 'text-slate-300'
                    }`}
                  >
                    {shown ? row.value : '——'}
                  </span>
                  <AnimatePresence>
                    {shown && (
                      <motion.span
                        initial={reduce ? false : { scale: 1.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.18, type: 'spring', stiffness: 400, damping: 18 }}
                        className="shrink-0 rounded border border-[#C61A1A] bg-red-50 px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold uppercase tracking-wide text-[#C61A1A]"
                      >
                        {row.flag}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* REJECTED stamp — centered in the blank gap between the row
                labels and the right-aligned values, so it never covers a
                flag badge (the flags map to the list beside the panel). */}
            <AnimatePresence>
              {done && (
                <motion.div
                  initial={reduce ? false : { scale: 1.8, opacity: 0, rotate: -26 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 15 }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="rounded-md border-[3px] border-[#C61A1A] px-3 py-1 font-mono text-sm sm:text-lg font-extrabold tracking-[0.14em] text-[#C61A1A] opacity-80 mix-blend-multiply">
                    REJECTED
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between px-0.5">
            <span className="font-mono text-[10px] font-bold text-slate-400">
              5 checks · 0 passed
            </span>
            <span className="font-mono text-[9.5px] font-extrabold text-slate-400">
              {done ? 'brief sent to Digivibz' : 'auditing…'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   3. SERVICES BAND — "Disclosure Ticker": a scrolling strip of ad-disclosure
   tags (#AD, SPONSORED, GIFTED…) sits atop the services section, the
   influencer-world analogue of the video page's film strip.
   ========================================================================== */

const DISCLOSURE_TAGS = [
  '#AD',
  'SPONSORED',
  'GIFTED',
  'AMBASSADOR',
  'AFFILIATE',
  'PAID PARTNERSHIP',
  'BRAND DEAL',
] as const;

export const DisclosureTicker: React.FC = () => (
  <div className="flex overflow-hidden border-y border-slate-200 bg-white py-2" aria-hidden="true">
    <div className="flex w-max shrink-0 animate-[dz-marquee_26s_linear_infinite] items-center">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center">
          {DISCLOSURE_TAGS.map((tag) => (
            <span key={`${copy}-${tag}`} className="flex items-center">
              <span className="px-4 font-mono text-[11px] font-extrabold tracking-[0.16em] text-slate-400">
                {tag}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-[#C61A1A]" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/* ==========================================================================
   4. PROCESS — "Campaign Board": a kanban of the five 5D stages with the
   campaign brief travelling between columns (layoutId), task chips checking
   off as it passes. Distinct from the rails, steppers and film strips used
   on the other service pages.
   ========================================================================== */

const BOARD_COLUMNS = [
  { key: 'Discover', tasks: ['brand audit', 'niche map'] },
  { key: 'Design', tasks: ['creator criteria', 'content angles'] },
  { key: 'Develop', tasks: ['outreach sent', 'contracts signed'] },
  { key: 'Deploy', tasks: ['posts live', 'stories up'] },
  { key: 'Detect', tasks: ['KPIs tracked', 'report sent'] },
] as const;

const BOARD_TICK_MS = 3000;

export const CampaignBoard: React.FC = () => {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % BOARD_COLUMNS.length), BOARD_TICK_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_36px_80px_-42px_rgba(15,23,42,0.6)]"
      role="img"
      aria-label="A campaign board showing the five 5D stages as columns; the campaign brief travels from Discover to Detect while task chips check off"
    >
      <WindowHeader title="campaign-board.dz" status={`STAGE ${idx + 1}/5`} tone="live" />

      {/* progress */}
      <div className="h-1 w-full bg-slate-100">
        <motion.div
          className="h-full bg-[#C61A1A]"
          animate={{ width: `${((idx + 1) / BOARD_COLUMNS.length) * 100}%` }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="overflow-x-auto p-3 sm:p-4">
        <div className="flex min-w-[560px] gap-2.5 sm:gap-3">
          {BOARD_COLUMNS.map((col, i) => {
            const active = i === idx;
            const past = i < idx;
            return (
              <button
                key={col.key}
                type="button"
                onClick={() => setIdx(i)}
                aria-pressed={active}
                className={`group flex min-w-0 flex-1 cursor-pointer flex-col rounded-xl border p-2.5 text-left transition-colors duration-300 ${
                  active
                    ? 'border-red-300 bg-red-50/50'
                    : past
                      ? 'border-slate-200 bg-white hover:border-slate-300'
                      : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className={`font-mono text-[9.5px] font-extrabold ${
                      active ? 'text-[#C61A1A]' : 'text-slate-400'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`truncate text-[12px] font-extrabold ${
                      active ? 'text-[#C61A1A]' : 'text-slate-700'
                    }`}
                  >
                    {col.key}
                  </span>
                </span>

                {/* travelling brief slot */}
                <span className="mt-2 flex h-11 items-center">
                  {active ? (
                    <motion.span
                      layoutId="im-brief"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 320, damping: 30 }
                      }
                      className="flex w-full items-center gap-1.5 rounded-md border border-[#C61A1A] bg-white px-2 py-1.5 shadow-[0_10px_22px_-14px_rgba(198,26,26,0.7)]"
                    >
                      <FileText className="h-3.5 w-3.5 shrink-0 text-[#C61A1A]" />
                      <span className="truncate font-mono text-[9.5px] font-extrabold text-slate-700">
                        brief.pdf
                      </span>
                    </motion.span>
                  ) : (
                    <span className="flex h-9 w-full items-center rounded-md border border-dashed border-slate-200" />
                  )}
                </span>

                {/* task chips */}
                <span className="mt-2 flex flex-col gap-1.5">
                  {col.tasks.map((task) => {
                    const checked = i <= idx;
                    return (
                      <span
                        key={task}
                        className={`flex items-center gap-1.5 rounded border px-1.5 py-1 text-[10px] font-bold transition-colors duration-300 ${
                          checked
                            ? 'border-red-100 bg-white text-slate-600'
                            : 'border-slate-100 bg-white/60 text-slate-300'
                        }`}
                      >
                        <span
                          className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border transition-colors ${
                            checked ? 'border-[#C61A1A] bg-[#C61A1A]' : 'border-slate-300'
                          }`}
                        >
                          {checked && (
                            <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
                          )}
                        </span>
                        <span className="truncate">{task}</span>
                      </span>
                    );
                  })}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. WHY — "Swap Ledger": a two-column ledger of what changes — the old way
   struck through on the left, the Digivibz way bold on the right. Deliberately
   not SMM's pill-and-dashed-arrow OutcomeRows.
   ========================================================================== */

export const SwapLedger: React.FC<{
  items: readonly { from: string; to: string }[];
}> = ({ items }) => {
  const reduce = useReducedMotion();

  return (
    <div
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_-48px_rgba(15,23,42,0.55)]"
      role="table"
      aria-label="What changes when you switch to Digivibz influencer marketing"
    >
      {/* header */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-slate-200 bg-slate-50/70 px-4 py-2.5 sm:px-5">
        <span className="font-mono text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
          The old way
        </span>
        <span aria-hidden="true" />
        <span className="text-right font-mono text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-[#C61A1A]">
          With Digivibz
        </span>
      </div>

      {items.map((item, i) => (
        <motion.div
          key={item.from}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="group grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-slate-100 px-4 py-3.5 transition-colors last:border-b-0 hover:bg-red-50/30 sm:px-5 sm:gap-3"
        >
          {/* before */}
          <span className="flex min-w-0 items-center gap-2">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <X className="h-2.5 w-2.5 text-slate-400" strokeWidth={3.5} />
            </span>
            <span className="min-w-0 text-[12.5px] sm:text-sm font-bold text-slate-400 line-through decoration-slate-300">
              {item.from}
            </span>
          </span>

          {/* arrow */}
          <ArrowRight
            className="h-4 w-4 shrink-0 text-[#C61A1A] transition-transform duration-300 group-hover:translate-x-0.5"
            strokeWidth={3}
            aria-hidden="true"
          />

          {/* after */}
          <span className="flex min-w-0 items-center justify-end gap-2 text-right">
            <span className="min-w-0 text-[12.5px] sm:text-sm font-extrabold text-slate-900">
              {item.to}
            </span>
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#C61A1A]">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
            </span>
          </span>
        </motion.div>
      ))}
    </div>
  );
};

/* ==========================================================================
   Icon sets for the page's card sections.
   ========================================================================== */

export const GROUP_ICONS = [Crosshair, Bot, Globe] as const;

/* ==========================================================================
   Platform glyphs for the cross-platform cards. lucide covers four of the
   six; YouTube comes from lucide too, and Snapchat is drawn as a monochrome
   fill so it stays inside the brand palette.
   ========================================================================== */

const SnapchatLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2.5c-2.9 0-4.9 2.1-4.9 5 0 .8.1 1.7-.2 2.4-.4.6-1.2.8-1.9 1-.6.2-.8.6-.6 1 .2.5.8.7 1.4.9.5.2.7.6.8 1 .1.5.3.8.8 1 .6.2 1.5.3 2.3.6.5.2.9.7 1.4.7s.9-.5 1.4-.7c.8-.3 1.7-.4 2.3-.6.5-.2.7-.5.8-1 .1-.4.3-.8.8-1 .6-.2 1.2-.4 1.4-.9.2-.4 0-.8-.6-1-.7-.2-1.5-.4-1.9-1-.3-.7-.2-1.6-.2-2.4 0-2.9-2-5-4.9-5Z" />
  </svg>
);

/** Renders the right glyph for one of the six campaign platforms. */
export const PlatformIcon: React.FC<{ id: ImPlatformId; className?: string }> = ({
  id,
  className = 'w-4 h-4',
}) => {
  switch (id) {
    case 'youtube':
      return <Youtube className={className} strokeWidth={2} />;
    case 'snapchat':
      return <SnapchatLogo className={className} />;
    default:
      return <PlatformGlyph id={id} className={className} />;
  }
};
