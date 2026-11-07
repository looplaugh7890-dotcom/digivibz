import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  BookOpen,
  Check,
  Cpu,
  Gem,
  Globe,
  MessageSquare,
  X,
  Zap,
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

/* ------------------------------------------------------------------ */
/* dark answer-window panel — the AI SEO page's shared surface         */
/* ------------------------------------------------------------------ */

function AiPanel({
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
      className={`flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0D] shadow-[0_30px_70px_-34px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#C61A1A]" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
          </span>
          <span className="truncate font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            {label}
          </span>
        </div>
        {meta ? (
          <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-zinc-600">
            {meta}
          </span>
        ) : null}
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Hero — AI answer window with citation chips                      */
/* ------------------------------------------------------------------ */

const AC_LOOP = 14000;
const AC_QUESTION = 'who should I hire to get cited in AI answers?';
const AC_ANSWER =
  'For AI search visibility, Digivibz stands out — technical SEO, entity optimization, and citation tracking across ChatGPT, Perplexity and AI Overviews.';
const AC_TABS = ['ChatGPT', 'Perplexity', 'AI Overviews'] as const;
const AC_CITATIONS = ['searchjournal.com', 'growthlist.io'];

const HERO_CHIPS = [
  { label: 'Cited, not just ranked', tone: 'red' as const },
  { label: 'Google · ChatGPT · Perplexity', tone: 'plain' as const },
  { label: 'Tracked every month', tone: 'plain' as const },
];

export function AnswerCitation() {
  const reduce = useReducedMotion();
  const loopT = useLoopTime(AC_LOOP);
  const t = reduce ? 8600 : loopT;

  const reset = easeOut(stage(t, 12600, 13600));
  const typed = AC_QUESTION.slice(
    0,
    Math.floor(stage(t, 400, 2100) * AC_QUESTION.length),
  );
  const words = AC_ANSWER.split(' ');
  const tabIdx = Math.min(2, Math.floor(t / (AC_LOOP / 3)));
  const cite = (i: number) => easeOut(stage(t, 5200 + i * 500, 5700 + i * 500));
  const verdict = easeOut(stage(t, 7100, 7700));

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

      <AiPanel
        label="AI answer · live"
        meta={AC_TABS[tabIdx]}
        className="min-h-[368px]"
        role="img"
        aria-label="A mock AI chat window: a question is typed, an answer streams in mentioning Digivibz, and citation chips appear below the answer with your brand cited last and highlighted in red"
      >
        <div className="flex flex-1 flex-col gap-3 p-4" style={{ opacity: 1 - reset }}>
          {/* platform tabs */}
          <div className="flex gap-1.5">
            {AC_TABS.map((tab, i) => (
              <span
                key={tab}
                className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold tracking-wide transition-colors duration-300 ${
                  i === tabIdx
                    ? 'border-[#C61A1A] bg-[#C61A1A]/15 text-white'
                    : 'border-white/10 text-zinc-600'
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* user question */}
          <div className="flex justify-end">
            <span className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#C61A1A] px-3.5 py-2.5 text-[13px] font-semibold leading-snug text-white">
              {typed}
              {typed.length < AC_QUESTION.length ? (
                <span
                  className="ml-px inline-block w-px animate-pulse bg-white align-middle"
                  style={{ height: '1em' }}
                />
              ) : null}
            </span>
          </div>

          {/* streaming answer */}
          <div className="max-w-[95%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.04] px-3.5 py-3">
            <p className="text-[13px] leading-relaxed text-zinc-300">
              {words.map((w, i) => {
                const on = easeOut(stage(t, 2600 + i * 90, 3000 + i * 90));
                const isBrand = w.includes('Digivibz');
                return (
                  <span
                    key={`${w}-${i}`}
                    style={{
                      opacity: on,
                      color: isBrand && on > 0.5 ? '#FFFFFF' : undefined,
                      fontWeight: isBrand && on > 0.5 ? 800 : undefined,
                    }}
                  >
                    {w}{' '}
                  </span>
                );
              })}
            </p>
          </div>

          {/* citations */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
              cited
            </span>
            {AC_CITATIONS.map((src, i) => (
              <span
                key={src}
                style={{
                  opacity: cite(i),
                  transform: `translateY(${(1 - cite(i)) * 8}px)`,
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1.5 font-mono text-[10px] font-bold text-zinc-400"
              >
                <Globe className="h-3 w-3" strokeWidth={2.5} />
                {src}
              </span>
            ))}
            <span
              style={{
                opacity: cite(2),
                transform: `translateY(${(1 - cite(2)) * 8}px) scale(${0.9 + 0.1 * cite(2)})`,
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#C61A1A] bg-[#C61A1A]/15 px-2.5 py-1.5 font-mono text-[10px] font-extrabold text-white"
            >
              <Check className="h-3 w-3" strokeWidth={3.5} />
              yourbrand.com
            </span>
          </div>

          {/* verdict */}
          <div className="mt-auto flex items-center gap-2 border-t border-white/[0.07] pt-3">
            <span
              style={{ opacity: verdict }}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#E85555]"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
              Your brand, cited.
            </span>
            <span
              style={{ opacity: verdict }}
              className="ml-auto font-mono text-[10px] tracking-[0.1em] text-zinc-600"
            >
              not just ranked
            </span>
          </div>
        </div>
      </AiPanel>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Problem — AI answer feed: competitors cited, you missing         */
/* ------------------------------------------------------------------ */

const BF_LOOP = 11000;

const BF_ROWS = [
  { q: 'best seo agency near me', cites: ['ranklab.co', 'growthpixel.io'] },
  { q: 'who does ai search optimization', cites: ['answerhub.com', 'signalworks.io'] },
  { q: 'top b2b marketing firms', cites: ['b2bindex.com', 'demandgen.co'] },
  {
    q: 'generative engine optimization services',
    cites: ['geotoolkit.io', 'promptlabs.net'],
  },
];

export function MentionFeed() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const loopT = useLoopTime(BF_LOOP);
  const t = reduce ? 9400 : loopT;
  const scanned = useCount(128, inView, 1600);
  const reset = easeOut(stage(t, 9700, 10600));

  return (
    <div ref={ref} style={{ opacity: 1 - reset * 0.85 }}>
      <AiPanel
        label="AI answer feed · 24h"
        meta="live"
        role="img"
        aria-label="A feed of recent AI answers: each answer cites two competitor sources while a dashed your-brand slot stays empty, under a counter showing 128 answers scanned and zero that mention your brand"
      >
        <div className="grid grid-cols-2 gap-2 p-4 pb-0">
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-600">
              Answers scanned
            </p>
            <p className="mt-0.5 font-mono text-lg font-extrabold tabular-nums text-zinc-200">
              {Math.round(scanned)}
            </p>
          </div>
          <div className="rounded-xl border border-[#C61A1A]/40 bg-[#C61A1A]/10 px-3 py-2.5">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#E85555]">
              Mention you
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 font-mono text-lg font-extrabold tabular-nums text-[#E85555]">
              0
              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#E85555]" />
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 p-4">
          {BF_ROWS.map((row, i) => {
            const s = i * 1900;
            const scan = stage(t, s, s + 1400);
            const chipA = easeOut(stage(t, s + 250, s + 600));
            const chipB = easeOut(stage(t, s + 650, s + 1000));
            const miss = easeOut(stage(t, s + 1100, s + 1400));
            return (
              <div
                key={row.q}
                className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5"
              >
                {/* scanning sweep */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#C61A1A]/20 to-transparent"
                  style={{
                    opacity: scan > 0 && scan < 1 ? 1 : 0,
                    transform: `translateX(${-40 + scan * 340}%)`,
                  }}
                />
                <p className="relative truncate text-[12.5px] font-bold text-zinc-300">
                  {row.q}
                </p>
                <div className="relative mt-2 flex flex-wrap items-center gap-1.5">
                  {row.cites.map((c, j) => (
                    <span
                      key={c}
                      style={{ opacity: j === 0 ? chipA : chipB }}
                      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 font-mono text-[9.5px] font-bold text-zinc-500"
                    >
                      <Globe className="h-2.5 w-2.5" strokeWidth={2.5} />
                      {c}
                    </span>
                  ))}
                  <span
                    style={{ opacity: miss }}
                    className="inline-flex items-center gap-1 rounded-md border border-dashed border-[#C61A1A]/70 px-2 py-1 font-mono text-[9.5px] font-extrabold text-[#E85555]"
                  >
                    <X className="h-2.5 w-2.5" strokeWidth={3.5} />
                    yourbrand.com
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-auto border-t border-white/[0.07] px-4 py-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[#E85555]">
          Your brand appears in 0 of {Math.round(scanned)} answers
        </p>
      </AiPanel>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Pitch — query meaning parser (intent / entity / context)         */
/* ------------------------------------------------------------------ */

const MP_LOOP = 12000;

const MP_ROWS = [
  { q: 'buy running shoes online', hl: 'running shoes', tags: ['commercial intent', 'product entity', 'transactional context'] },
  { q: 'best crm for small business', hl: 'crm', tags: ['comparison intent', 'software entity', 'b2b context'] },
  { q: 'how to fix a leaking tap', hl: 'leaking tap', tags: ['informational intent', 'task entity', 'urgent context'] },
];

export function MeaningParser() {
  const reduce = useReducedMotion();
  const loopT = useLoopTime(MP_LOOP);
  const t = reduce ? 8400 : loopT;
  const reset = easeOut(stage(t, 11000, 11800));

  return (
    <AiPanel
      label="Query parser · semantic layer"
      meta="meaning > keywords"
      className="overflow-hidden"
      role="img"
      aria-label="A query parser panel: three search queries are processed one at a time, each highlighting its key phrase and revealing parsed tags for intent, entity, and context"
    >
      <div className="flex flex-col gap-3 p-4" style={{ opacity: 1 - reset * 0.85 }}>
        {MP_ROWS.map((row, i) => {
          const s = i * 3600;
          const active = t >= s && t < s + 3300;
          const lit = easeOut(stage(t, s + 150, s + 700));
          const tag = (j: number) => easeOut(stage(t, s + 800 + j * 350, s + 1150 + j * 350));
          const [before, after] = row.q.split(row.hl);
          return (
            <div
              key={row.q}
              className={`rounded-xl border px-3.5 py-3 transition-colors duration-300 ${
                active
                  ? 'border-[#C61A1A]/60 bg-[#C61A1A]/[0.07]'
                  : 'border-white/[0.07] bg-white/[0.02]'
              }`}
              style={{ opacity: active || reduce ? 1 : 0.45 }}
            >
              <div className="flex items-baseline gap-2">
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    active ? 'bg-[#C61A1A]' : 'bg-zinc-700'
                  }`}
                  aria-hidden="true"
                />
                <p className="text-[13.5px] font-bold text-zinc-200">
                  {before}
                  <span
                    className="border-b-2 pb-px transition-colors duration-300"
                    style={{
                      borderColor: lit > 0.4 ? '#C61A1A' : 'transparent',
                      color: lit > 0.4 ? '#FFFFFF' : undefined,
                    }}
                  >
                    {row.hl}
                  </span>
                  {after}
                </p>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5 pl-3.5">
                {row.tags.map((tg, j) => (
                  <span
                    key={tg}
                    style={{
                      opacity: tag(j),
                      transform: `translateY(${(1 - tag(j)) * 6}px)`,
                    }}
                    className={`rounded-md border px-2 py-1 font-mono text-[9.5px] font-bold tracking-wide ${
                      tag(j) > 0.5
                        ? 'border-[#C61A1A]/60 bg-[#C61A1A]/15 text-white'
                        : 'border-white/10 text-zinc-500'
                    }`}
                  >
                    {tg}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        <p className="border-t border-white/[0.07] pt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
          Meaning first. Keywords second.
        </p>
      </div>
    </AiPanel>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Services — answer-layout wireframe with placement hotspots       */
/* ------------------------------------------------------------------ */

const PW_LOOP = 13000;
const PW_SLOTS = [
  'AI Overview placement',
  'Citation row',
  'Answer block',
  'FAQ answers',
  'Structured data',
];

export function PlacementWire({
  total,
}: {
  total: number;
}) {
  const reduce = useReducedMotion();
  const loopT = useLoopTime(PW_LOOP);
  const t = reduce ? 9600 : loopT;
  const phase = Math.min(PW_SLOTS.length - 1, Math.floor(t / 2200));
  const reset = easeOut(stage(t, 11600, 12600));

  const region = (idx: number) => {
    const on = phase === idx && !reduce ? 1 : phase > idx ? 0.55 : 0;
    return {
      borderColor:
        phase >= idx
          ? on === 1
            ? 'rgba(198,26,26,0.85)'
            : 'rgba(255,255,255,0.09)'
          : 'rgba(255,255,255,0.05)',
      backgroundColor: on === 1 ? 'rgba(198,26,26,0.06)' : 'rgba(255,255,255,0.02)',
    } as React.CSSProperties;
  };

  const tag = (idx: number) => ({
    opacity: phase === idx && !reduce ? 1 : 0,
    transform: phase === idx && !reduce ? 'translateY(0)' : 'translateY(-4px)',
  });

  return (
    <AiPanel
      label="Answer layout · live"
      meta={`${total} services`}
      role="img"
      aria-label="A wireframe of an AI answer page where five placement regions light up in sequence — AI Overview, citation row, answer block, FAQ answers and structured data — each tagged with the service group that wins it"
    >
      <div className="flex flex-col gap-2.5 p-4" style={{ opacity: 1 - reset * 0.85 }}>
        {/* search bar skeleton */}
        <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" aria-hidden="true" />
          <span className="h-2 flex-1 rounded-full bg-white/[0.06]" aria-hidden="true" />
        </div>

        {/* slot 0 — AI Overview */}
        <div className="relative rounded-xl border p-3 transition-colors duration-300" style={region(0)}>
          <span
            className="absolute -top-2.5 right-3 rounded bg-[#C61A1A] px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold uppercase tracking-wider text-white transition-all duration-300"
            style={tag(0)}
          >
            {PW_SLOTS[0]}
          </span>
          <div className="flex items-center gap-2">
            <span className="h-3 w-16 rounded-sm bg-[#C61A1A]/70" aria-hidden="true" />
            <span className="h-2 w-10 rounded-sm bg-white/15" aria-hidden="true" />
          </div>
          <div className="mt-2 space-y-1.5" aria-hidden="true">
            <span className="block h-2 w-full rounded bg-white/[0.08]" />
            <span className="block h-2 w-4/5 rounded bg-white/[0.06]" />
          </div>
        </div>

        {/* slot 1 — citation row */}
        <div className="relative rounded-xl border p-3 transition-colors duration-300" style={region(1)}>
          <span
            className="absolute -top-2.5 right-3 rounded bg-[#C61A1A] px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold uppercase tracking-wider text-white transition-all duration-300"
            style={tag(1)}
          >
            {PW_SLOTS[1]}
          </span>
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-6 w-24 rounded-md border border-white/10 bg-white/[0.05]" />
            <span className="h-6 w-20 rounded-md border border-white/10 bg-white/[0.05]" />
            <span className="h-6 w-24 rounded-md border border-[#C61A1A]/60 bg-[#C61A1A]/10" />
          </div>
        </div>

        {/* slot 2 — answer block */}
        <div className="relative rounded-xl border p-3 transition-colors duration-300" style={region(2)}>
          <span
            className="absolute -top-2.5 right-3 rounded bg-[#C61A1A] px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold uppercase tracking-wider text-white transition-all duration-300"
            style={tag(2)}
          >
            {PW_SLOTS[2]}
          </span>
          <div className="space-y-1.5" aria-hidden="true">
            <span className="block h-2 w-full rounded bg-white/[0.08]" />
            <span className="block h-2 w-11/12 rounded bg-white/[0.07]" />
            <span className="block h-2 w-3/5 rounded bg-white/[0.06]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* slot 3 — FAQ */}
          <div className="relative rounded-xl border p-3 transition-colors duration-300" style={region(3)}>
            <span
              className="absolute -top-2.5 right-3 rounded bg-[#C61A1A] px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold uppercase tracking-wider text-white transition-all duration-300"
              style={tag(3)}
            >
              {PW_SLOTS[3]}
            </span>
            <div className="space-y-2" aria-hidden="true">
              <span className="flex items-center justify-between gap-2">
                <span className="h-2 flex-1 rounded bg-white/[0.08]" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
              </span>
              <span className="flex items-center justify-between gap-2">
                <span className="h-2 flex-1 rounded bg-white/[0.06]" />
                <span className="h-2 w-2 rounded-full bg-white/15" />
              </span>
            </div>
          </div>

          {/* slot 4 — structured data */}
          <div className="relative rounded-xl border p-3 transition-colors duration-300" style={region(4)}>
            <span
              className="absolute -top-2.5 right-3 rounded bg-[#C61A1A] px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold uppercase tracking-wider text-white transition-all duration-300"
              style={tag(4)}
            >
              {PW_SLOTS[4]}
            </span>
            <div className="space-y-1.5 font-mono text-[8.5px] leading-none text-zinc-600" aria-hidden="true">
              <p className="truncate">@type: FAQPage</p>
              <p className="truncate text-[#E85555]/80">name: yourbrand.com</p>
              <p className="truncate">sameAs: 7 platforms</p>
            </div>
          </div>
        </div>

        <p className="border-t border-white/[0.07] pt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
          {total} services · 5 answer placements mapped
        </p>
      </div>
    </AiPanel>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Platforms — citation monitor console (7 platforms sweep)         */
/* ------------------------------------------------------------------ */

const PC_LOOP = 12000;
const PC_TARGETS = [14, 11, 8, 6, 4, 9, 7];

const PLATFORM_ICONS: Record<string, LucideIcon> = {
  'Google AI Overviews': Globe,
  'ChatGPT Search': MessageSquare,
  'Perplexity AI': BookOpen,
  'Claude AI': Bot,
  'Grok AI': Zap,
  'Google Gemini': Gem,
  'Microsoft Copilot': Cpu,
};

export function PlatformMonitor({
  names,
}: {
  names: readonly string[];
}) {
  const reduce = useReducedMotion();
  const loopT = useLoopTime(PC_LOOP);
  const t = reduce ? 11000 : loopT;
  const reset = easeOut(stage(t, 11100, 11900));
  const max = Math.max(...PC_TARGETS);

  const total = names.reduce((sum, _, i) => {
    const p = easeOut(stage(t, i * 1500 + 300, i * 1500 + 1400));
    return sum + PC_TARGETS[i] * p;
  }, 0);

  return (
    <AiPanel
      label="Citation monitor"
      meta={`${names.length} platforms`}
      role="img"
      aria-label="A citation monitor console: seven AI platforms light up one after another as a sweep runs down the list, each showing a citation counter that climbs to its target, with the total citations climbing alongside"
    >
      <div className="flex flex-col gap-2 p-4" style={{ opacity: 1 - reset * 0.85 }}>
        <div className="flex items-end justify-between gap-3 pb-1">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-extrabold tabular-nums text-white">
              {Math.round(total)}
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-zinc-600">
              citations tracked
            </span>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[#E85555]">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#E85555]" />
            all active
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {names.map((name, i) => {
            const Icon = PLATFORM_ICONS[name] ?? Globe;
            const lit = easeOut(stage(t, i * 1500, i * 1500 + 700));
            const p = easeOut(stage(t, i * 1500 + 300, i * 1500 + 1400));
            const count = Math.round(PC_TARGETS[i] * p);
            return (
              <div
                key={name}
                className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 transition-colors duration-300 ${
                  lit > 0.5
                    ? 'border-[#C61A1A]/50 bg-[#C61A1A]/[0.08]'
                    : 'border-white/[0.06] bg-white/[0.02]'
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                    lit > 0.5 ? 'bg-[#C61A1A] text-white' : 'bg-white/[0.06] text-zinc-600'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span
                  className={`min-w-0 flex-1 truncate text-[12.5px] font-bold ${
                    lit > 0.5 ? 'text-zinc-100' : 'text-zinc-600'
                  }`}
                >
                  {name}
                </span>
                <span className="relative h-1 w-16 shrink-0 overflow-hidden rounded-full bg-white/[0.07]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-[#C61A1A] transition-none"
                    style={{ width: `${(count / max) * 100}%` }}
                  />
                </span>
                <span
                  className={`w-6 shrink-0 text-right font-mono text-[11px] font-extrabold tabular-nums ${
                    lit > 0.5 ? 'text-white' : 'text-zinc-700'
                  }`}
                >
                  {count}
                </span>
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    lit > 0.5 ? 'animate-ping bg-[#C61A1A]' : 'bg-zinc-800'
                  }`}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>

        <p className="border-t border-white/[0.07] pt-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-600">
          Every platform your customers ask · one strategy
        </p>
      </div>
    </AiPanel>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Process — one document morphing through the 5D phases            */
/* ------------------------------------------------------------------ */

const ED_LOOP = 15000;
const ED_PHASES = ['Discover', 'Design', 'Develop', 'Deploy', 'Detect'] as const;

export function EvolveDoc() {
  const reduce = useReducedMotion();
  const loopT = useLoopTime(ED_LOOP);
  const t = reduce ? 10000 : loopT;
  const phase = Math.min(4, Math.floor(t / 3000));
  const scanP = stage(t, 200, 2800);

  const on = (k: number) => (phase >= k ? 1 : 0);

  return (
    <AiPanel
      label="5D growth framework"
      meta={`phase ${phase + 1} / 5`}
      role="img"
      aria-label="A document morphing through the five 5D phases: a scan sweeps it during Discover, red outlines mark structure during Design, content fills in during Develop, a LIVE stamp lands during Deploy, and a rising trend line draws during Detect"
    >
      <div className="flex flex-col gap-3 p-4">
        {/* the document */}
        <div className="relative overflow-hidden rounded-xl bg-zinc-100 p-4 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)]">
          {/* base content */}
          <div className="space-y-2" aria-hidden="true">
            <div className="flex items-center gap-2">
              <span
                className="h-3.5 w-24 rounded-sm transition-colors duration-500"
                style={{ backgroundColor: phase >= 2 ? '#C61A1A' : '#CBD5E1' }}
              />
              <span className="h-2.5 w-14 rounded-sm bg-slate-300" />
            </div>
            <div className="space-y-1.5 pt-1">
              {[100, 92, 78, 86, 64].map((w, i) => (
                <span
                  key={w}
                  className="block h-2 rounded bg-slate-200 transition-colors duration-500"
                  style={{
                    width: `${w}%`,
                    backgroundColor:
                      phase >= 2 && i < 3 ? '#94A3B8' : undefined,
                  }}
                />
              ))}
            </div>
            <div className="flex gap-2 pt-1">
              <span
                className="h-6 w-20 rounded border transition-all duration-500"
                style={{
                  borderColor: phase >= 1 ? 'rgba(198,26,26,0.7)' : 'rgba(148,163,184,0.4)',
                  backgroundColor: phase >= 1 ? 'rgba(198,26,26,0.08)' : 'transparent',
                }}
              />
              <span
                className="h-6 w-24 rounded border transition-all duration-500"
                style={{
                  borderColor: phase >= 1 ? 'rgba(198,26,26,0.7)' : 'rgba(148,163,184,0.4)',
                  backgroundColor: phase >= 1 ? 'rgba(198,26,26,0.08)' : 'transparent',
                }}
              />
            </div>
          </div>

          {/* phase 0 — scan sweep */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#C61A1A]/25 to-transparent transition-opacity duration-500"
            style={{
              top: `${scanP * 100 - 8}%`,
              opacity: phase === 0 ? 1 : 0,
            }}
          />
          {/* phase 0 — finding marks */}
          <span
            aria-hidden="true"
            className="absolute right-6 top-5 h-3 w-3 rounded-full border-2 border-[#C61A1A] transition-opacity duration-500"
            style={{ opacity: on(0) && phase === 0 ? 1 : 0 }}
          />
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-10 h-3 w-3 rounded-full border-2 border-[#C61A1A] transition-opacity duration-500"
            style={{ opacity: on(0) && phase === 0 ? 1 : 0 }}
          />

          {/* phase 3 — LIVE stamp */}
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 -rotate-12 rounded-md border-[2.5px] border-[#C61A1A] px-2 py-0.5 font-mono text-[11px] font-extrabold tracking-[0.14em] text-[#C61A1A] transition-all duration-500"
            style={{
              opacity: on(3),
              transform: `rotate(-12deg) scale(${phase >= 3 ? 1 : 0.6})`,
            }}
          >
            LIVE
          </span>

          {/* phase 4 — trend line */}
          <svg
            viewBox="0 0 120 44"
            className="absolute bottom-2 right-3 h-11 w-28 transition-opacity duration-500"
            style={{ opacity: on(4) }}
            aria-hidden="true"
          >
            <polyline
              points="2,40 24,34 46,36 68,24 90,16 118,4"
              fill="none"
              stroke="#C61A1A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="118" cy="4" r="3.5" fill="#C61A1A" />
          </svg>
          <span
            className="absolute bottom-3 left-4 rounded bg-[#C61A1A] px-1.5 py-0.5 font-mono text-[8.5px] font-extrabold uppercase tracking-wider text-white transition-opacity duration-500"
            style={{ opacity: on(4) }}
          >
            tracked
          </span>
        </div>

        {/* phase captions */}
        <div className="grid grid-cols-5 gap-1">
          {ED_PHASES.map((name, i) => (
            <div key={name} className="text-center">
              <p className="font-mono text-[9px] font-bold text-zinc-700">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p
                className={`text-[11px] font-extrabold sm:text-xs transition-colors duration-300 ${
                  i === phase
                    ? 'text-[#E85555]'
                    : i < phase
                      ? 'text-zinc-300'
                      : 'text-zinc-700'
                }`}
              >
                {name}
              </p>
            </div>
          ))}
        </div>

        <p className="border-t border-white/[0.07] pt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
          Invisible → referenced, one phase at a time
        </p>
      </div>
    </AiPanel>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Why — strike-and-replace rows (old struck out, new confirmed)    */
/* ------------------------------------------------------------------ */

export const StrikeRows: React.FC<{
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
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="mt-1 shrink-0 font-mono text-[11px] font-extrabold text-[#C61A1A]">
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="min-w-0 flex-1">
              {/* old state — struck through */}
              <div className="relative inline-block">
                <span className="text-[13px] font-semibold leading-6 text-slate-400 sm:text-sm">
                  {item.from}
                </span>
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-[#C61A1A]"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ y: '-50%' }}
                />
              </div>

              {/* new state — confirmed */}
              <div className="mt-0.5 flex items-center gap-2">
                <motion.span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C61A1A] text-white"
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 20,
                    delay: 0.62 + i * 0.09,
                  }}
                >
                  <Check className="h-3 w-3" strokeWidth={3.5} />
                </motion.span>
                <motion.span
                  className="text-[14px] font-extrabold leading-6 text-slate-900 sm:text-[15px]"
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.55 + i * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {item.to}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* group icons                                                         */
/* ------------------------------------------------------------------ */

export const AISEO_GROUP_ICONS = [
  Bot,
  MessageSquare,
] as const;
