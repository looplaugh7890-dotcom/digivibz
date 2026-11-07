import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Search,
  ClipboardCheck,
  Monitor,
  Tag,
  Zap,
  Youtube,
  MapPin,
  BarChart3,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Timer,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** eased 0→1 progress of a stage inside a loop */
const stage = (t: number, start: number, end: number) =>
  clamp01((t - start) / Math.max(1, end - start));

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

function useLoopTime(loopMs: number) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setT((now - start) % loopMs);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loopMs]);
  return t;
}

function useCount(to: number, active: boolean, duration = 1400, from = 0) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = clamp01((now - start) / duration);
      setValue(from + (to - from) * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, from, to, duration]);
  return value;
}

function GAPanel({
  label,
  meta,
  children,
  className = '',
  role,
  'aria-label': ariaLabel,
}: {
  label: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  role?: string;
  'aria-label'?: string;
}) {
  return (
    <div
      role={role}
      aria-label={ariaLabel}
      className={`rounded-2xl border border-white/10 bg-[#141416] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C61A1A] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C61A1A]" />
          </span>
          <span className="truncate font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            {label}
          </span>
        </div>
        {meta ? (
          <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-white/45">
            {meta}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Hero — Ad Auction Console                                        */
/* ------------------------------------------------------------------ */

const AUCTION_LOOP = 11000;
const QUERY = 'emergency plumber near me';

const HERO_CHIPS = [
  { label: 'Quality Score first', tone: 'red' as const },
  { label: 'Every dollar tracked', tone: 'plain' as const },
  { label: 'Reviewed weekly', tone: 'plain' as const },
];

const SERP_ADS = [
  { url: 'yourbrand.com/plumber', head: '24/7 Emergency Plumber — Flat Rates', lines: 'Licensed & insured. Fast response in your area. Book online today.' },
  { url: 'competitor-a.com', head: 'Plumbing Repair | Same-Day Service', lines: 'Local experts available now. Free quotes on all repairs.' },
];

export function AuctionConsole() {
  const t = useLoopTime(AUCTION_LOOP);
  const typed = QUERY.slice(0, Math.floor(stage(t, 300, 1500) * QUERY.length));
  const bid = (4.1 * easeOut(stage(t, 1400, 2400))).toFixed(2);
  const qs = (8 * easeOut(stage(t, 1700, 2700))).toFixed(1);
  const rank = (Number(bid) * Number(qs)).toFixed(1);
  const youGrow = easeOut(stage(t, 2900, 3900));
  const rivalA = easeOut(stage(t, 3100, 4100));
  const rivalB = easeOut(stage(t, 3300, 4300));
  const stamped = t >= 4700 && t < 9700;
  const stampIn = easeOut(stage(t, 4700, 5200));
  const stampOut = 1 - stage(t, 9700, 10300);

  return (
    <motion.div
      className="relative w-full"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* chips above the visual */}
      <div className="relative mb-3 flex flex-wrap items-center gap-2">
        {HERO_CHIPS.map(({ label, tone }, i) => (
          <motion.span
            key={label}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-extrabold shadow-[0_14px_30px_-18px_rgba(15,23,42,0.45)] ${
              tone === 'red'
                ? 'border-red-200 bg-red-50 text-[#C61A1A]'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -7, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.5 + i * 0.15 },
              y: { duration: 3.4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' },
            }}
          >
            {label}
          </motion.span>
        ))}
      </div>

      <GAPanel
        label="Ad Auction · Live"
        meta={`budget $412/day`}
        className="min-h-[360px] overflow-hidden"
        role="img"
        aria-label="A live Google Ads auction console: a search query types in, two ads appear on a mock results page, bid and quality score multiply into ad rank, and a top of page stamp lands on the first ad"
      >
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.15fr_1fr]">
        {/* SERP mock */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2">
            <Search className="h-3.5 w-3.5 shrink-0 text-white/50" />
            <span className="truncate text-[12px] text-white/85">
              {typed}
              {typed.length < QUERY.length ? (
                <span className="ml-px inline-block w-px animate-pulse bg-[#C61A1A] align-middle" style={{ height: '0.9em' }} />
              ) : null}
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {SERP_ADS.map((ad, i) => (
              <motion.div
                key={ad.url}
                initial={false}
                animate={{
                  opacity: t > 1900 + i * 350 ? 1 : 0.35,
                  x: t > 1900 + i * 350 ? 0 : 8,
                }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-lg border px-3 py-2.5 ${
                  i === 0
                    ? 'border-[#C61A1A]/60 bg-[#C61A1A]/[0.07]'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`rounded px-1 py-px text-[9px] font-bold tracking-wide ${
                      i === 0 ? 'bg-[#C61A1A] text-white' : 'bg-white/20 text-white/80'
                    }`}
                  >
                    Ad
                  </span>
                  <span className="truncate font-mono text-[10px] text-white/45">{ad.url}</span>
                </div>
                <p className="mt-1 truncate text-[13px] font-semibold text-white/90">{ad.head}</p>
                <p className="mt-0.5 line-clamp-1 text-[11px] text-white/50">{ad.lines}</p>
                {i === 0 && stamped ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 1.6, rotate: -14 }}
                    animate={{ opacity: stampIn * stampOut, scale: 1.6 - 0.6 * stampIn, rotate: -9 }}
                    transition={{ duration: 0.25 }}
                    className="absolute -right-1.5 -top-2 rounded border-2 border-[#C61A1A] bg-[#141416] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#FF5B5B] shadow-[0_0_18px_rgba(198,26,26,0.5)]"
                  >
                    Top of page
                  </motion.span>
                ) : null}
              </motion.div>
            ))}

            {/* organic results, dimmed */}
            <div className="flex flex-col gap-2 opacity-40">
              {[0, 1].map((i) => (
                <div key={i} className="px-1">
                  <div className="h-2 w-1/3 rounded bg-white/15" />
                  <div className="mt-1.5 h-1.5 w-4/5 rounded bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* auction math */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: 'Your bid', v: `$${bid}` },
              { k: 'Quality', v: qs },
              { k: 'Ad rank', v: rank },
            ].map((cell, i) => (
              <div
                key={cell.k}
                className={`rounded-lg border px-2 py-2 text-center ${
                  i === 2 && t > 2800
                    ? 'border-[#C61A1A]/60 bg-[#C61A1A]/10'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                  {cell.k}
                </p>
                <p
                  className={`mt-0.5 font-mono text-[15px] font-bold tabular-nums ${
                    i === 2 && t > 2800 ? 'text-[#FF5B5B]' : 'text-white/90'
                  }`}
                >
                  {cell.v}
                </p>
              </div>
            ))}
          </div>

          {/* rank ladder */}
          <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
              Auction results
            </p>
            {[
              { name: 'You', w: youGrow, you: true },
              { name: 'Competitor A', w: rivalA, you: false },
              { name: 'Competitor B', w: rivalB, you: false },
            ].map((row) => (
              <div key={row.name} className="flex items-center gap-2">
                <span
                  className={`w-[76px] shrink-0 truncate text-[10px] ${
                    row.you ? 'font-semibold text-white/90' : 'text-white/45'
                  }`}
                >
                  {row.name}
                </span>
                <div className="h-3 flex-1 overflow-hidden rounded bg-white/[0.06]">
                  <motion.div
                    className={`h-full rounded ${row.you ? 'bg-[#C61A1A]' : 'bg-white/25'}`}
                    initial={false}
                    style={{ width: `${(row.you ? 88 : row.name === 'Competitor A' ? 64 : 47) * row.w}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-center font-mono text-[10px] tracking-[0.1em] text-white/40">
            RANK = BID × QUALITY SCORE
          </p>
        </div>
      </div>
      </GAPanel>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Problem — Budget Leak                                            */
/* ------------------------------------------------------------------ */

const CRACKS = [
  { x: 14, label: 'Wasted clicks', delay: 0 },
  { x: 32, label: 'No follow-up', delay: 0.7 },
  { x: 50, label: 'Hidden reports', delay: 1.4 },
  { x: 68, label: 'Unwatched campaigns', delay: 2.1 },
  { x: 84, label: 'No testing', delay: 2.8 },
];

export function BudgetLeak() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const wasted = useCount(38, inView, 1600);

  return (
    <div
      ref={ref}
      className="min-h-[340px] rounded-2xl border border-white/10 bg-[#141416] p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Daily budget · $500
        </span>
        <span className="font-mono text-[11px] tracking-[0.12em] text-white/45">
          unmanaged account
        </span>
      </div>

      {/* pipe with cracks — labels stagger into two rows so they never collide */}
      <div className="relative mt-6 h-28">
        <div className="absolute left-0 right-0 top-12 h-6 rounded-full border border-white/15 bg-white/[0.05]" />
        <div className="absolute left-0 top-12 flex h-6 w-24 items-center justify-center rounded-l-full border border-r-0 border-white/15 bg-[#C61A1A]/25">
          <span className="font-mono text-[9px] font-bold tracking-wider text-white/80">IN</span>
        </div>

        {CRACKS.map((c, i) => (
          <div key={c.label} className="absolute top-0" style={{ left: `${c.x}%` }}>
            <span
              className="absolute left-0 block -translate-x-1/2 whitespace-nowrap rounded border border-[#C61A1A]/50 bg-[#C61A1A]/10 px-1.5 py-0.5 text-center font-mono text-[9px] text-[#FF8A8A]"
              style={{ top: i % 2 === 1 ? 22 : 0 }}
            >
              {c.label}
            </span>
            {/* crack */}
            <span className="absolute left-0 top-[72px] block h-3 w-px -translate-x-1/2 rotate-12 bg-[#C61A1A]" />
            {/* drip (ml instead of -translate-x: framer animates transform) */}
            <motion.span
              className="absolute left-0 top-[82px] ml-[-3px] h-2 w-1.5 rounded-b-full bg-[#C61A1A]"
              animate={{ y: [0, 44], opacity: [1, 1, 0] }}
              transition={{
                duration: 1.6,
                delay: c.delay,
                repeat: Infinity,
                repeatDelay: 1.4,
                times: [0, 0.75, 1],
                ease: 'easeIn',
              }}
            />
          </div>
        ))}
      </div>

      {/* waste pool */}
      <div className="relative mt-1 h-24 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#C61A1A] to-[#C61A1A]/50"
          initial={{ height: '0%' }}
          animate={inView ? { height: '62%' } : {}}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            wasted before it converts
          </p>
          <p className="font-mono text-3xl font-bold tabular-nums text-white drop-shadow">
            {wasted.toFixed(0)}%
          </p>
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[10px] tracking-[0.1em] text-white/40">
        5 LEAKS · ONE ACCOUNT · NO ONE WATCHING
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Team — Account Vitals Monitor                                    */
/* ------------------------------------------------------------------ */

const VITALS = [
  { k: 'CTR', v: '6.4%', dir: 'up' as const, fill: 0.78 },
  { k: 'Cost / lead', v: '$18.20', dir: 'down' as const, fill: 0.62 },
  { k: 'Quality Score', v: '8.7/10', dir: 'up' as const, fill: 0.87 },
  { k: 'Conv. rate', v: '11.2%', dir: 'up' as const, fill: 0.7 },
];

export function VitalsMonitor() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });

  return (
    <div ref={ref}>
      <GAPanel
        label="Account vitals"
        meta="last 7 days"
        className="min-h-[300px] overflow-hidden"
      >
      <div className="p-4 sm:p-5">
        {/* ECG */}
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] px-2 py-3">
          <svg viewBox="0 0 320 70" className="h-16 w-full" preserveAspectRatio="none" aria-hidden>
            <motion.path
              d="M0 50 L46 50 L58 50 L64 26 L70 58 L76 44 L96 44 L110 44 L116 18 L122 60 L128 44 L158 44 L172 44 L178 30 L184 54 L190 44 L226 44 L240 44 L246 22 L252 58 L258 44 L300 44 L320 44"
              fill="none"
              stroke="#C61A1A"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </svg>
          <span className="absolute right-2 top-2 rounded border border-[#C61A1A]/60 bg-[#141416] px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.14em] text-[#FF5B5B]">
            OPTIMIZED
          </span>
        </div>

        {/* vitals rows */}
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {VITALS.map((row, i) => (
            <div
              key={row.k}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[11px] text-white/60">{row.k}</span>
                <span className="flex items-center gap-1 font-mono text-[12px] font-bold text-white/90">
                  {row.v}
                  {row.dir === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-[#FF5B5B]" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-white/50" />
                  )}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded bg-white/[0.07]">
                <motion.div
                  className="h-full rounded bg-[#C61A1A]"
                  initial={{ width: '0%' }}
                  animate={inView ? { width: `${row.fill * 100}%` } : {}}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.1em] text-white/45">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-[#FF5B5B]" /> TRACKING VERIFIED
          </span>
          <span className="flex items-center gap-1">
            <Timer className="h-3 w-3 text-white/50" /> REVIEWED WEEKLY
          </span>
        </div>
      </div>
      </GAPanel>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Services band — Ad Ticker                                        */
/* ------------------------------------------------------------------ */

const TICKER_ADS = [
  { head: 'Emergency Plumber — Flat Rates', url: 'yourbrand.com/plumber' },
  { head: '20% Off First Order | Shop Now', url: 'yourbrand.com/shop' },
  { head: 'Book A Demo — No Setup Fees', url: 'yourbrand.com/demo' },
  { head: 'Same-Day HVAC Repair', url: 'yourbrand.com/hvac' },
  { head: 'Free Quote In 2 Minutes', url: 'yourbrand.com/quote' },
  { head: 'Trusted By 4,000+ Local Stores', url: 'yourbrand.com/stores' },
];

function TickerRow({ items, reverse }: { items: typeof TICKER_ADS; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-1.5">
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
      >
        {duplicated(doubled)}
      </motion.div>
    </div>
  );
}

function duplicated(list: typeof TICKER_ADS) {
  return list.map((ad, i) => (
    <div
      key={`${ad.head}-${i}`}
      className="flex w-[230px] shrink-0 flex-col gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2"
    >
      <div className="flex items-center gap-1.5">
        <span className="rounded bg-[#C61A1A] px-1 py-px text-[9px] font-bold text-white">Ad</span>
        <span className="truncate font-mono text-[10px] text-white/45">{ad.url}</span>
      </div>
      <p className="truncate text-[12px] font-semibold text-white/85">{ad.head}</p>
      <div className="flex gap-1.5">
        <span className="h-1 w-1/3 rounded bg-white/15" />
        <span className="h-1 w-1/4 rounded bg-white/10" />
      </div>
    </div>
  ));
}

export function AdTicker() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#141416] py-3 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]">
      <div className="mb-2 flex items-center justify-between px-4">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Live ad placements
        </span>
        <span className="font-mono text-[11px] tracking-[0.12em] text-white/45">
          search · display · shopping · youtube
        </span>
      </div>
      <TickerRow items={TICKER_ADS} />
      <TickerRow items={[...TICKER_ADS].reverse()} reverse />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Process — Growth Stairs                                          */
/* ------------------------------------------------------------------ */

const STAIR_KEYS = ['Discover', 'Design', 'Develop', 'Deploy', 'Detect'];
const STAIR_H = [26, 40, 54, 68, 84]; // % heights
const STAIR_X = [10, 29, 48, 67, 86]; // % centers

export function GrowthStairs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });

  return (
    <div
      ref={ref}
      className="min-h-[320px] rounded-2xl border border-white/10 bg-[#141416] p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Campaign trajectory
        </span>
        <span className="font-mono text-[11px] tracking-[0.12em] text-white/45">5D · week 1 → 5</span>
      </div>

      <div className="relative mt-5 h-48">
        {/* trend line — clip wipe (pathLength dashes break under non-scaling-stroke) */}
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
          transition={{ duration: 2.4, delay: 0.5, ease: 'easeInOut' }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
            aria-hidden
          >
            <polyline
              points={STAIR_X.map((x, i) => `${x},${96 - STAIR_H[i]}`).join(' ')}
              fill="none"
              stroke="#C61A1A"
              strokeWidth={1.6}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* steps */}
        {STAIR_KEYS.map((key, i) => (
          <div key={key} className="absolute bottom-0" style={{ left: `${STAIR_X[i]}%`, height: `${STAIR_H[i]}%` }}>
            <div
              className="absolute bottom-0 w-11 -translate-x-1/2 rounded-t border border-white/12 bg-white/[0.05]"
              style={{ height: '100%' }}
            />
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.1em] text-white/55">
              {key}
            </span>
          </div>
        ))}

        {/* climbing campaign chip */}
        <motion.div
          className="absolute z-10"
          initial={{ opacity: 0, left: `${STAIR_X[0]}%`, bottom: `${STAIR_H[0] - 4}%` }}
          animate={
            inView
              ? {
                  left: STAIR_X.map((x) => `${x}%`),
                  bottom: STAIR_H.map((h) => `${h - 4}%`),
                  opacity: [0, 1, 1, 1, 1, 1, 0],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 6,
            times: [0, 0.16, 0.34, 0.52, 0.7, 0.9, 1],
            delay: 0.4,
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: 'easeInOut',
          }}
        >
          <span className="flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border border-[#C61A1A] bg-[#141416] px-2 py-1 text-[10px] font-semibold text-white shadow-[0_0_16px_rgba(198,26,26,0.45)]">
            <TrendingUp className="h-3 w-3 text-[#FF5B5B]" />
            campaign
          </span>
        </motion.div>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-1.5">
        {STAIR_KEYS.map((key, i) => (
          <div
            key={key}
            className="rounded border border-white/10 bg-white/[0.03] px-1 py-1.5 text-center font-mono text-[9px] uppercase tracking-wider text-white/50"
          >
            {`0${i + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Tools — Dial Panel                                               */
/* ------------------------------------------------------------------ */

const DIALS = [
  { name: 'Ads Editor', v: 94 },
  { name: 'Ads API', v: 87 },
  { name: 'Scripts', v: 91 },
  { name: 'Ads Manager', v: 96 },
  { name: 'Analytics', v: 93 },
  { name: 'Tag Manager', v: 89 },
  { name: 'Merchant', v: 90 },
  { name: 'Business Profile', v: 95 },
];

function Dial({ name, value, index, active }: { name: string; value: number; index: number; active: boolean }) {
  const angle = -90 + (value / 100) * 180;
  const shown = useCount(value, active, 1200);

  return (
    <div className="flex flex-col items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-3">
      <div className="relative h-14 w-24">
        <svg viewBox="0 0 100 56" className="h-full w-full" aria-hidden>
          <path
            d="M8 50 A 42 42 0 0 1 92 50"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={7}
            strokeLinecap="round"
          />
          <motion.path
            d="M8 50 A 42 42 0 0 1 92 50"
            fill="none"
            stroke="#C61A1A"
            strokeWidth={7}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: value / 100 } : {}}
            transition={{ duration: 1.2, delay: index * 0.12, ease: 'easeOut' }}
          />
        </svg>
        <motion.span
          className="absolute bottom-1.5 left-1/2 ml-[-1px] h-7 w-0.5 origin-bottom rounded bg-white/85"
          initial={{ rotate: -90 }}
          animate={active ? { rotate: angle } : {}}
          transition={{ duration: 1.2, delay: index * 0.12, ease: 'easeOut' }}
        />
        <span className="absolute inset-x-0 bottom-0 text-center font-mono text-[11px] font-bold tabular-nums text-white/90">
          {shown.toFixed(0)}
        </span>
      </div>
      <span className="text-center text-[10px] leading-tight text-white/60">{name}</span>
    </div>
  );
}

export function DialPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-[#141416] p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Tool coverage
        </span>
        <span className="font-mono text-[11px] tracking-[0.12em] text-white/45">8 platforms</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {DIALS.map((d, i) => (
          <Dial key={d.name} name={d.name} value={d.v} index={i} active={inView} />
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[10px] tracking-[0.1em] text-white/40">
        REAL DATA · ZERO ASSUMPTIONS
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Why — Flip Rows                                                  */
/* ------------------------------------------------------------------ */

export function FlipRows({
  items,
}: {
  items: readonly { from: string; to: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {items.map((row, i) => (
        <div
          key={row.from}
          className="relative"
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="relative h-[116px] w-full"
            style={{ transformStyle: 'preserve-3d' }}
            initial={false}
            animate={inView ? { rotateY: 180 } : { rotateY: 0 }}
            transition={{ duration: 0.7, delay: i * 0.18, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* before */}
            <div
              className="absolute inset-0 flex flex-col justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/70 px-4"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <span className="w-max rounded border border-slate-300 px-1.5 py-px font-mono text-[9px] font-bold tracking-[0.16em] text-slate-500">
                BEFORE
              </span>
              <p className="text-[14px] font-medium text-slate-600">{row.from}</p>
            </div>
            {/* after */}
            <div
              className="absolute inset-0 flex flex-col justify-center gap-1.5 rounded-xl border border-[#C61A1A]/60 bg-red-50/60 px-4 shadow-[0_20px_44px_-32px_rgba(198,26,26,0.5)]"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <span className="w-max rounded bg-[#C61A1A] px-1.5 py-px font-mono text-[9px] font-bold tracking-[0.16em] text-white">
                AFTER
              </span>
              <p className="text-[14px] font-semibold text-slate-900">{row.to}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* shared icon sets                                                    */
/* ------------------------------------------------------------------ */

export const GA_GROUP_ICONS = [
  ClipboardCheck, // Audit
  Search,         // Search
  Monitor,        // Display
  Tag,            // Shopping
  Zap,            // Performance Max
  Youtube,        // YouTube
  MapPin,         // Local Services
  BarChart3,      // Analytics
];
