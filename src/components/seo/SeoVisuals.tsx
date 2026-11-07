import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Search,
  Compass,
  Wrench,
  FileText,
  PenTool,
  MapPin,
  Link,
  ShoppingCart,
  Building2,
  BarChart3,
  TrendingUp,
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

/** light instrument panel — the SEO page's shared surface */
function SEOPanel({
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
      className={`flex flex-col rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C61A1A] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C61A1A]" />
          </span>
          <span className="truncate font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
            {label}
          </span>
        </div>
        {meta ? (
          <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-slate-400">
            {meta}
          </span>
        ) : null}
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Hero — Keyword Balance Scale                                     */
/* ------------------------------------------------------------------ */

const KS_LOOP = 12000;
const KS_QUERY = 'buy office chairs online';

const KS_KEYWORDS = [
  { text: 'buy office chairs', vol: '2.9K/mo' },
  { text: 'office chairs online', vol: '1.3K/mo' },
  { text: 'ergonomic chair sale', vol: '880/mo' },
];

const HERO_CHIPS = [
  { label: 'Intent before volume', tone: 'red' as const },
  { label: 'No recycled tactics', tone: 'plain' as const },
  { label: 'Reported every month', tone: 'plain' as const },
];

export function KeywordScale() {
  const reduce = useReducedMotion();
  const loopT = useLoopTime(KS_LOOP);
  const t = reduce ? 8600 : loopT;

  const typed = KS_QUERY.slice(0, Math.floor(stage(t, 250, 2350) * KS_QUERY.length));
  const land = (i: number) => easeOut(stage(t, 2600 + i * 550, 3450 + i * 550));
  const landed = land(0) + land(1) + land(2);
  const reset = easeOut(stage(t, 10400, 11400));
  const angle = 11 * (landed / 3) * (1 - reset);
  const leftOn = easeOut(stage(t, 2500, 3200)) * (1 - reset);
  const demand = Math.round(5080 * easeOut(stage(t, 4600, 7200)) * (1 - reset));
  const verdictOn = easeOut(stage(t, 7400, 8000)) * (1 - reset);

  return (
    <motion.div
      className="relative w-full"
      animate={reduce ? undefined : { y: [0, -6, 0] }}
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

      <SEOPanel
        label="Keyword demand · scale"
        meta="weighted by volume"
        className="min-h-[360px] overflow-hidden"
        role="img"
        aria-label="A balance scale under a search bar: a typed query produces three buyer-intent keyword chips that stack onto the right side, tipping the beam past one generic word on the left, while a combined monthly search counter climbs to 5,080"
      >
        <div className="px-4 pt-4 pb-5 sm:px-5">
          {/* search bar */}
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/70 px-3.5 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-slate-700">
              {typed}
              {typed.length < KS_QUERY.length ? (
                <span
                  className="ml-px inline-block w-px animate-pulse bg-[#C61A1A] align-middle"
                  style={{ height: '1em' }}
                />
              ) : null}
            </span>
            <span className="shrink-0 rounded-full bg-[#C61A1A] px-3 py-1 text-[11px] font-extrabold text-white">
              Search
            </span>
          </div>

          {/* seesaw */}
          <div className="relative mt-4 h-[200px]">
            {/* fulcrum */}
            <div className="absolute left-1/2 top-[138px] -translate-x-1/2">
              <div className="h-0 w-0 border-l-[11px] border-r-[11px] border-t-[36px] border-l-transparent border-r-transparent border-t-slate-800" />
            </div>
            <div className="absolute left-1/2 top-[174px] h-2 w-28 -translate-x-1/2 rounded-full bg-slate-800" />

            {/* beam */}
            <div
              className="absolute left-[8%] right-[8%] top-[130px] h-2 rounded-full bg-slate-800"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#C61A1A]" />

              {/* left — the generic word */}
              <div
                className="absolute bottom-full left-0 flex flex-col-reverse items-start gap-1.5"
                style={{ transform: `rotate(${-angle}deg)`, transformOrigin: 'left bottom' }}
              >
                <span
                  style={{
                    opacity: leftOn,
                    transform: `translateY(${(1 - leftOn) * -14}px) scale(${0.86 + 0.14 * leftOn})`,
                  }}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-extrabold text-slate-500 shadow-[0_12px_26px_-18px_rgba(15,23,42,0.45)]"
                >
                  chairs
                  <span className="font-mono text-[9px] font-bold text-slate-400">generic</span>
                </span>
              </div>

              {/* right — buyer-intent keywords */}
              <div
                className="absolute bottom-full right-0 flex flex-col-reverse items-end gap-1.5"
                style={{ transform: `rotate(${-angle}deg)`, transformOrigin: 'right bottom' }}
              >
                {KS_KEYWORDS.map((k, i) => {
                  const on = land(i) * (1 - reset);
                  return (
                    <span
                      key={k.text}
                      style={{
                        opacity: on,
                        transform: `translateY(${(1 - land(i)) * -16}px) scale(${0.86 + 0.14 * land(i)})`,
                      }}
                      className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#C61A1A]/60 bg-white px-2.5 py-1.5 text-[11px] font-extrabold text-slate-800 shadow-[0_12px_26px_-18px_rgba(15,23,42,0.55)]"
                    >
                      {k.text}
                      <span className="font-mono text-[9px] font-bold text-[#C61A1A]">{k.vol}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* counter + verdict */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-extrabold tabular-nums text-slate-900">
                {demand.toLocaleString('en-US')}
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
                monthly searches
              </span>
            </div>
            <span
              style={{ opacity: verdictOn }}
              className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-extrabold text-[#C61A1A]"
            >
              The right keywords carry the weight.
            </span>
          </div>
        </div>
      </SEOPanel>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Problem — Rank Slippage board                                    */
/* ------------------------------------------------------------------ */

const RS_LOOP = 11000;

const RS_ROWS = [
  { id: 'a', head: 'The 25 Best Office Chairs of 2026', url: 'chairreviewhub.com/best-office-chairs' },
  { id: 'you', head: 'Ergonomic Office Chairs | Free Shipping', url: 'yourbrand.com/office-chairs' },
  { id: 'b', head: 'Office Chairs & Desks — Shop Online', url: 'furnishdirect.com/chairs' },
  { id: 'c', head: 'Buy Office Chairs Direct From The Maker', url: 'makerseating.com' },
  { id: 'd', head: 'Executive & Task Chairs On Sale', url: 'seatworld.com' },
];

const RS_ORDER = ['a', 'you', 'b', 'c', 'd'];
const RS_SLID = ['a', 'b', 'c', 'd', 'you'];

function FadeVal({ value, className = '' }: { value: string; className?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0.15, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={className}
    >
      {value}
    </motion.span>
  );
}

export function RankSlip() {
  const reduce = useReducedMotion();
  const loopT = useLoopTime(RS_LOOP);
  const t = reduce ? 6000 : loopT;

  const slid = t >= 3400 && t < 8600;
  const order = slid ? RS_SLID : RS_ORDER;
  const updateOn =
    easeOut(stage(t, 3300, 3700)) * (1 - easeOut(stage(t, 4800, 5300)));

  return (
    <SEOPanel
      label="Rankings · yourbrand.com"
      meta="desktop · US"
      className="overflow-hidden"
      role="img"
      aria-label="A mock Google results board: the site sits at position 02 until a core update banner flashes, after which its result slides to the bottom of the list and the position badge reads 47"
    >
      <div className="grid grid-cols-2 gap-2 px-4 pt-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">
            Avg. position
          </p>
          <FadeVal
            value={slid ? '47.3' : '4.2'}
            className={`mt-0.5 block font-mono text-lg font-extrabold tabular-nums ${
              slid ? 'text-[#C61A1A]' : 'text-slate-900'
            }`}
          />
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">
            Clicks (30d)
          </p>
          <FadeVal
            value={slid ? '-64%' : '+18%'}
            className={`mt-0.5 block font-mono text-lg font-extrabold tabular-nums ${
              slid ? 'text-[#C61A1A]' : 'text-slate-900'
            }`}
          />
        </div>
      </div>

      <div className="relative mt-3 px-4 pb-4">
        {/* update toast */}
        <motion.div
          initial={false}
          animate={{ opacity: updateOn, y: (1 - updateOn) * -8 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none absolute right-6 top-0 z-10 rounded-lg border-2 border-[#C61A1A] bg-white px-2.5 py-1.5 font-mono text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#C61A1A] shadow-[0_16px_34px_-18px_rgba(198,26,26,0.7)]"
        >
          Core update 4.2 · rolling out
        </motion.div>

        <div className="flex flex-col gap-2">
          {order.map((id, idx) => {
            const row = RS_ROWS.find((r) => r.id === id)!;
            const isYou = id === 'you';
            const badge = isYou ? (slid ? '47' : '02') : String(idx + 1).padStart(2, '0');
            return (
              <motion.div
                key={id}
                layout
                transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                  isYou
                    ? slid
                      ? 'border-red-300 bg-red-50/70'
                      : 'border-red-200 bg-red-50/40'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <span
                  className={`flex h-6 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-extrabold ${
                    isYou ? 'bg-[#C61A1A] text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <FadeVal key={badge} value={badge} />
                </span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold text-white ${
                    isYou ? 'bg-[#C61A1A]' : 'bg-slate-800'
                  }`}
                >
                  {isYou ? 'Y' : row.head.charAt(0)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-bold text-slate-800">
                    {row.head}
                  </span>
                  <span className="block truncate font-mono text-[10px] text-slate-400">
                    {row.url}
                  </span>
                </span>
                {isYou && slid ? (
                  <span className="shrink-0 font-mono text-[10px] font-extrabold text-[#C61A1A]">
                    &#9660; 45
                  </span>
                ) : null}
              </motion.div>
            );
          })}
        </div>

        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
          {slid ? 'you fell to page two' : 'you held position 02'}
        </p>
      </div>
    </SEOPanel>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Pitch — Reason ledger (numbers vs. reasons)                      */
/* ------------------------------------------------------------------ */

const RL_ROWS = [
  {
    action: 'Rebuilt internal links across the top 10 pages',
    why: 'authority was stuck on old blog posts',
  },
  {
    action: 'Fixed core web vitals on /services',
    why: '4.8s load was leaking rankings',
  },
  {
    action: 'Rewrote 6 titles to match search intent',
    why: 'impressions high, clicks flat',
  },
];

export function ReasonLedger() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const sessions = useCount(12.4, inView, 1500);
  const links = useCount(341, inView, 1600);
  const kws = useCount(128, inView, 1700);

  return (
    <div ref={ref} className="grid gap-4 md:grid-cols-2">
      {/* what most agencies show */}
      <SEOPanel label="What most agencies show" meta="monthly">
        <div className="flex flex-1 flex-col p-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              { k: 'Sessions', v: `${sessions.toFixed(1)}K` },
              { k: 'Backlinks', v: String(Math.round(links)) },
              { k: 'Keywords', v: String(Math.round(kws)) },
            ].map((cell) => (
              <div
                key={cell.k}
                className="rounded-xl border border-slate-100 bg-slate-50/70 px-2 py-2.5 text-center"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">
                  {cell.k}
                </p>
                <p className="mt-0.5 flex items-center justify-center gap-1 font-mono text-base font-extrabold tabular-nums text-slate-700">
                  {cell.v}
                  <TrendingUp className="h-3 w-3 text-slate-400" strokeWidth={3} />
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5" aria-hidden="true">
            {[86, 64, 47].map((w, i) => (
              <motion.div
                key={w}
                initial={reduce ? false : { scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="h-2 rounded bg-slate-200"
                style={{ width: `${w}%`, transformOrigin: 'left' }}
              />
            ))}
          </div>
          <p className="mt-auto border-t border-slate-100 pt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
            Numbers. No reasons.
          </p>
        </div>
      </SEOPanel>

      {/* what we show you */}
      <SEOPanel label="What we show you" meta="always">
        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-col gap-2.5">
            {RL_ROWS.map((row, i) => (
              <motion.div
                key={row.action}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5"
              >
                <p className="text-[13px] font-bold leading-snug text-slate-800">{row.action}</p>
                <p className="mt-1.5 flex items-start gap-1.5 text-[12px] leading-snug text-slate-500">
                  <span className="mt-px shrink-0 rounded bg-[#C61A1A] px-1 py-px font-mono text-[9px] font-extrabold uppercase tracking-wider text-white">
                    Why
                  </span>
                  {row.why}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mt-auto border-t border-slate-100 pt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#C61A1A]">
            Every action tied to a reason
          </p>
        </div>
      </SEOPanel>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Services — Coverage ribbon (9 groups, one system)                */
/* ------------------------------------------------------------------ */

const COVERAGE_SHORT: Record<string, string> = {
  'SEO Strategy & Consulting': 'Strategy',
  'Technical SEO Services': 'Technical',
  'On-Page SEO Services': 'On-Page',
  'SEO Content Services': 'Content',
  'Local SEO Services': 'Local',
  'Off-Page SEO Services': 'Off-Page',
  'Ecommerce SEO Services': 'Ecommerce',
  'Enterprise & Business SEO Services': 'Enterprise',
  'SEO Analytics & Reporting': 'Analytics',
};

export function CoverageRibbon({
  groups,
}: {
  groups: readonly { key: string; count: number }[];
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const total = groups.reduce((sum, g) => sum + g.count, 0);
  const shown = useCount(total, inView, 1600);

  return (
    <div ref={ref}>
      <SEOPanel label="Service coverage" meta="one system" className="overflow-hidden">
        <div className="flex items-end justify-between gap-3 px-4 pt-4">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-extrabold tabular-nums text-slate-900">
              {Math.round(shown)}
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-500">
              services
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
            {groups.length} groups · one system
          </span>
        </div>

        <div className="mt-3 flex h-12 gap-[3px] px-4">
          {groups.map((g, i) => (
            <motion.div
              key={g.key}
              title={`${g.key} — ${g.count}`}
              initial={reduce ? false : { scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="flex origin-bottom items-center justify-center rounded-md"
              style={{
                flexGrow: g.count,
                flexBasis: 0,
                backgroundColor: `rgba(198, 26, 26, ${0.95 - i * 0.06})`,
              }}
            >
              <span className="hidden font-mono text-[11px] font-extrabold text-white sm:block">
                {g.count}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 px-4 pb-4">
          {groups.map((g, i) => (
            <span key={g.key} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
              <span
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: `rgba(198, 26, 26, ${0.95 - i * 0.06})` }}
                aria-hidden="true"
              />
              {COVERAGE_SHORT[g.key] ?? g.key}
              <span className="font-mono text-[10px] font-bold text-slate-400">{g.count}</span>
            </span>
          ))}
        </div>
      </SEOPanel>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Process — Blueprint build (5 phases drawn on grid paper)         */
/* ------------------------------------------------------------------ */

const BP_LOOP = 12000;
const BP_PHASES = ['Discover', 'Design', 'Develop', 'Deploy', 'Detect'] as const;

const BP_BRICKS = [
  { x: 209, y: 52, w: 52, h: 18, o: 0.95 },
  { x: 209, y: 76, w: 52, h: 18, o: 0.8 },
  { x: 209, y: 100, w: 24, h: 18, o: 0.65 },
  { x: 237, y: 100, w: 24, h: 18, o: 0.5 },
];

const BP_BARS = [
  { x: 391, y: 92, h: 28 },
  { x: 409, y: 76, h: 44 },
  { x: 427, y: 58, h: 62 },
];

export function BlueprintDraw() {
  const reduce = useReducedMotion();
  const loopT = useLoopTime(BP_LOOP);
  const t = reduce ? 9000 : loopT;

  const vis = Math.min(easeOut(stage(t, 0, 400)), 1 - easeOut(stage(t, 10800, 11600)));
  const p = (i: number) => easeOut(stage(t, 400 + i * 1550, 1500 + i * 1550));
  const p2 = (i: number) => easeOut(stage(t, 800 + i * 1550, 1500 + i * 1550));
  const dash = (v: number) => (v <= 0 ? '0 1' : v >= 1 ? undefined : `${v} 1`);

  return (
    <SEOPanel
      label="Build plan · v1"
      meta="5 phases"
      className="overflow-hidden"
      role="img"
      aria-label="A blueprint on grid paper where five phases draw themselves in sequence: a magnifier over signals, a page outline, stacked blocks, a raised flag, and rising bars with a check mark"
    >
      <div className="bg-[linear-gradient(#EEF2F6_1px,transparent_1px),linear-gradient(90deg,#EEF2F6_1px,transparent_1px)] [background-size:24px_24px] px-4 py-4">
        <svg
          viewBox="0 0 470 140"
          className="block h-auto w-full"
          style={{ opacity: vis }}
          aria-hidden="true"
        >
          {/* 01 Discover — magnifier over live signals */}
          <circle
            cx="47"
            cy="70"
            r="26"
            fill="none"
            stroke="#0F172A"
            strokeWidth="3"
            pathLength={1}
            strokeDasharray={dash(p(0))}
          />
          <line
            x1="66"
            y1="89"
            x2="86"
            y2="109"
            stroke="#0F172A"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={p2(0) > 0 ? 1 : 0}
            pathLength={1}
            strokeDasharray={dash(p2(0))}
          />
          {([
            [41, 64],
            [53, 76],
            [44, 82],
          ] as const).map(([cx, cy], j) => (
            <circle
              key={j}
              cx={cx}
              cy={cy}
              r="3.5"
              fill="#C61A1A"
              opacity={easeOut(stage(t, 900 + j * 140, 1250 + j * 140))}
            />
          ))}

          {/* 02 Design — the page plan */}
          <rect
            x="109"
            y="44"
            width="64"
            height="60"
            rx="6"
            fill="none"
            stroke="#C61A1A"
            strokeWidth="3"
            pathLength={1}
            strokeDasharray={dash(p(1))}
          />
          {[
            { y: 62, w: 44, c: '#94A3B8' },
            { y: 76, w: 34, c: '#CBD5E1' },
            { y: 90, w: 44, c: '#CBD5E1' },
          ].map((ln) => (
            <line
              key={ln.y}
              x1="119"
              y1={ln.y}
              x2={119 + ln.w}
              y2={ln.y}
              stroke={ln.c}
              strokeWidth="3"
              strokeLinecap="round"
              opacity={p2(1) > 0 ? 1 : 0}
              pathLength={1}
              strokeDasharray={dash(p2(1))}
            />
          ))}

          {/* 03 Develop — the build stacks up */}
          {BP_BRICKS.map((b, j) => {
            const s = easeOut(stage(t, 3500 + j * 170, 4100 + j * 170));
            return (
              <rect
                key={j}
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx="3"
                fill="#C61A1A"
                opacity={b.o}
                style={{
                  transformOrigin: `${b.x}px ${b.y + b.h}px`,
                  transform: `scaleY(${s})`,
                }}
              />
            );
          })}

          {/* 04 Deploy — flag goes up */}
          <line
            x1="329"
            y1="40"
            x2="329"
            y2="118"
            stroke="#0F172A"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={p(3) > 0 ? 1 : 0}
            pathLength={1}
            strokeDasharray={dash(p(3))}
          />
          <path
            d="M329 44 L371 57 L329 70 Z"
            fill="#C61A1A"
            style={{
              transformOrigin: '329px 57px',
              transform: `scaleX(${easeOut(stage(t, 5500, 6150))})`,
            }}
          />
          <circle cx="329" cy="120" r="4" fill="#0F172A" opacity={p(3)} />

          {/* 05 Detect — signal climbs, gets the all-clear */}
          {BP_BARS.map((b, j) => {
            const s = easeOut(stage(t, 6600 + j * 160, 7150 + j * 160));
            return (
              <rect
                key={j}
                x={b.x}
                y={b.y}
                width="12"
                height={b.h}
                rx="3"
                fill="#0F172A"
                opacity={0.85}
                style={{
                  transformOrigin: `${b.x}px ${b.y + b.h}px`,
                  transform: `scaleY(${s})`,
                }}
              />
            );
          })}
          <circle
            cx="453"
            cy="45"
            r="13"
            fill="none"
            stroke="#C61A1A"
            strokeWidth="3"
            pathLength={1}
            strokeDasharray={dash(p2(4))}
          />
          <path
            d="M447 45 L452 50 L460 39"
            fill="none"
            stroke="#C61A1A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={p2(4) > 0 ? 1 : 0}
            pathLength={1}
            strokeDasharray={dash(p2(4))}
          />
        </svg>

        {/* phase captions */}
        <div className="mt-2 grid grid-cols-5 gap-1">
          {BP_PHASES.map((name, i) => {
            const v = p(i);
            const tone = v <= 0 ? 'text-slate-300' : v >= 1 ? 'text-slate-800' : 'text-[#C61A1A]';
            return (
              <div key={name} className="text-center">
                <p className="font-mono text-[9px] font-bold text-slate-400">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className={`text-[11px] font-extrabold sm:text-xs ${tone}`}>{name}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          One connected system
        </p>
      </div>
    </SEOPanel>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Why — odometer roll rows (from rolls up, to rolls in)            */
/* ------------------------------------------------------------------ */

export const RollRows: React.FC<{
  items: readonly { from: string; to: string }[];
}> = ({ items }) => {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <motion.div
          key={item.from}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="group rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-colors hover:border-red-300 hover:shadow-[0_24px_50px_-38px_rgba(198,26,26,0.5)] sm:px-5"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="shrink-0 font-mono text-[11px] font-extrabold text-[#C61A1A]">
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="relative h-6 min-w-0 flex-1 overflow-hidden">
              <motion.div
                className="flex flex-col"
                initial={reduce ? false : { y: '0%' }}
                whileInView={{ y: '-50%' }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="h-6 truncate text-[13px] font-bold leading-6 text-slate-400 sm:text-sm">
                  {item.from}
                </span>
                <span className="h-6 truncate text-[13px] font-extrabold leading-6 text-slate-900 sm:text-sm">
                  {item.to}
                </span>
              </motion.div>
            </div>

            <span
              className="relative hidden h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100 sm:block"
              aria-hidden="true"
            >
              <motion.span
                className="absolute inset-y-0 left-0 w-full rounded-full bg-[#C61A1A]"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* group icons                                                         */
/* ------------------------------------------------------------------ */

export const SEO_GROUP_ICONS = [
  Compass,
  Wrench,
  FileText,
  PenTool,
  MapPin,
  Link,
  ShoppingCart,
  Building2,
  BarChart3,
] as const;
