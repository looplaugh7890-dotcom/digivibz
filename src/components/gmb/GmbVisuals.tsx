import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, BadgeCheck, Check, Image as ImageIcon, MapPin, Search, Star, Store, X } from 'lucide-react';
import { CountUp } from '../CountUp';
import { GMB_DIFF, GMB_PROCESS } from '../../data/gmbContent';

/* ==========================================================================
   1. HERO — "SearchRun": a Google-style search types itself, results open,
   and Your Business climbs from the bottom of the Map Pack to rank #1.
   Loops. The requested centrepiece.
   ========================================================================== */

const QUERY = 'coffee shop near me';
type Phase = 'typing' | 'searching' | 'results' | 'ranked' | 'clearing';

const HERO_CHIPS = [
  { label: 'Verified profile', Icon: BadgeCheck, tone: 'plain' },
  { label: 'Top 3 Map Pack', Icon: MapPin, tone: 'red' },
  { label: '4.9★ rating', Icon: Star, tone: 'plain' },
] as const;

const CompetitorRow: React.FC<{ delay: number }> = ({ delay }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="h-2.5 w-32 max-w-[60%] rounded-full bg-slate-300" />
          <div className="mt-1.5 h-2 w-44 max-w-[80%] rounded-full bg-slate-200" />
        </div>
        <div className="flex shrink-0 gap-0.5">
          {[0, 1, 2, 3, 4].map((s) => (
            <Star key={s} className="w-3 h-3 text-slate-300" fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const SearchRun: React.FC = () => {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? QUERY : '');
  const [phase, setPhase] = useState<Phase>(reduce ? 'ranked' : 'typing');

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const run = () => {
      if (cancelled) return;
      setTyped('');
      setPhase('typing');
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setTyped(QUERY.slice(0, i));
        if (i < QUERY.length) {
          later(tick, 52 + Math.random() * 46);
        } else {
          later(() => !cancelled && setPhase('searching'), 340);
          later(() => !cancelled && setPhase('results'), 760);
          later(() => !cancelled && setPhase('ranked'), 1780);
          later(() => !cancelled && setPhase('clearing'), 6300);
          later(run, 7100);
        }
      };
      later(tick, 480);
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  const ranked = phase === 'ranked';
  const showPanel = phase === 'results' || ranked || phase === 'clearing';
  const order = ranked ? ['you', 'c1', 'c2'] : ['c1', 'c2', 'you'];

  const rowFor = (key: string) => {
    if (key === 'you') {
      return (
        <motion.div
          key="you"
          layout
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className={`relative rounded-xl border px-3.5 py-2.5 transition-colors ${
            ranked
              ? 'border-[#C61A1A] bg-red-50/70 shadow-[0_16px_34px_-24px_rgba(198,26,26,0.7)]'
              : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className={`text-[13px] font-extrabold leading-none ${ranked ? 'text-slate-900' : 'text-slate-500'}`}>
                  Your Business
                </span>
                <AnimatePresence>
                  {ranked && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 22, delay: 0.25 }}
                      className="rounded-md bg-[#C61A1A] px-1.5 py-0.5 text-[9px] font-extrabold leading-none text-white"
                    >
                      #1
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${ranked ? 'text-[#C61A1A]' : 'text-slate-300'}`}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </span>
                <span className={`text-[10px] font-bold ${ranked ? 'text-[#C61A1A]' : 'text-slate-400'}`}>4.9</span>
                <span className="text-[10px] font-semibold text-slate-400">· Open now</span>
              </div>
            </div>
            <AnimatePresence>
              {ranked && (
                <motion.span
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex shrink-0 items-center gap-1 rounded-md border border-red-200 bg-white px-1.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#C61A1A]"
                >
                  <ArrowRight className="w-2.5 h-2.5 -rotate-90" strokeWidth={3} />
                  Ranked
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      );
    }
    return <CompetitorRow key={key} delay={key === 'c1' ? 0.15 : 0.3} />;
  };

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

      <div className="relative" role="img" aria-label="A Google search for a local business where Your Business appears at rank number one in the Map Pack">
        {/* search bar */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 sm:px-5 py-3.5 shadow-[0_24px_55px_-30px_rgba(15,23,42,0.45)]"
        >
          <Search className="w-4.5 h-4.5 shrink-0 text-slate-400" strokeWidth={2.6} />
          <span className="flex-1 min-w-0 truncate text-sm sm:text-base font-semibold text-slate-800">
            {typed}
            {!reduce && phase !== 'ranked' && phase !== 'clearing' && (
              <motion.span
                className="ml-px inline-block w-px h-4 sm:h-5 align-middle bg-[#C61A1A]"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.45, 0.5, 1] }}
              />
            )}
          </span>
          <motion.span
            className="shrink-0 rounded-full bg-[#C61A1A] px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-extrabold text-white"
            animate={
              phase === 'searching' && !reduce ? { scale: [1, 0.92, 1] } : { scale: 1 }
            }
            transition={{ duration: 0.3 }}
          >
            Search
          </motion.span>
        </motion.div>

        {/* results panel */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: -14, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_30px_65px_-35px_rgba(15,23,42,0.5)]">
                {/* map strip */}
                <div className="relative overflow-hidden rounded-xl bg-slate-100">
                  <svg viewBox="0 0 560 108" className="block w-full h-auto" aria-hidden="true">
                    <rect width="560" height="108" fill="#F1F5F9" />
                    {[26, 66, 96].map((y) => (
                      <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="#FFFFFF" strokeWidth="10" />
                    ))}
                    {[70, 190, 320, 450].map((x) => (
                      <line key={x} x1={x} y1="0" x2={x} y2="108" stroke="#FFFFFF" strokeWidth="10" />
                    ))}
                    <rect x="216" y="30" width="70" height="26" rx="4" fill="#E2E8F0" />
                    <rect x="356" y="70" width="62" height="22" rx="4" fill="#E2E8F0" />
                    <rect x="86" y="70" width="60" height="22" rx="4" fill="#E2E8F0" />
                    <circle cx="284" cy="54" r="34" fill="none" stroke="#C61A1A" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="6 6" />
                    <path
                      d="M284 34 c-8.5 0 -15 6.4 -15 14.3 C269 57 284 74 284 74 s15 -17 15 -25.7 c0 -7.9 -6.5 -14.3 -15 -14.3 z"
                      fill="#C61A1A"
                    />
                    <circle cx="284" cy="48.5" r="5.5" fill="#FFFFFF" />
                  </svg>
                  <span className="absolute left-2.5 top-2.5 rounded-md bg-white/95 px-2 py-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-500 shadow-sm">
                    Map Pack
                  </span>
                </div>

                {/* listings */}
                <div className="mt-2.5 space-y-2">
                  {order.map((key) => rowFor(key))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ==========================================================================
   2. PROBLEM — "LocalMap": a neighbourhood map where three rivals hold the
   numbered Map Pack pins and your unverified pin flickers outside it, capped
   with a rank ladder (1-2-3 ... 17 = you).
   ========================================================================== */

const RIVAL_PINS = [
  { x: 178, y: 118, n: '1', delay: 0.35 },
  { x: 336, y: 96, n: '2', delay: 0.55 },
  { x: 398, y: 214, n: '3', delay: 0.75 },
];

export const LocalMap: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full aspect-[28/20] rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden">
      <svg
        viewBox="0 0 560 400"
        className="absolute inset-0 w-full h-full"
        aria-label="A local map where three competitors hold the numbered Map Pack pins and the unverified business sits outside the pack"
        role="img"
      >
        <rect width="560" height="400" fill="#F1F5F9" />
        {/* streets */}
        {[64, 176, 288, 372].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="560" y2={y} stroke="#FFFFFF" strokeWidth="16" />
        ))}
        {[76, 208, 344, 476].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" stroke="#FFFFFF" strokeWidth="16" />
        ))}
        {/* blocks */}
        {[
          { x: 96, y: 84, w: 92, h: 72 },
          { x: 228, y: 84, w: 96, h: 72 },
          { x: 364, y: 196, w: 92, h: 72 },
          { x: 96, y: 196, w: 92, h: 72 },
          { x: 228, y: 308, w: 96, h: 44 },
          { x: 496, y: 84, w: 52, h: 72 },
        ].map((b) => (
          <rect key={`${b.x}-${b.y}`} x={b.x} y={b.y} width={b.w} height={b.h} rx="5" fill="#E2E8F0" />
        ))}

        {/* search radius sweep */}
        <motion.circle
          cx="278"
          cy="186"
          r="128"
          fill="none"
          stroke="#C61A1A"
          strokeOpacity="0.4"
          strokeWidth="2"
          strokeDasharray="10 10"
          initial={reduce ? false : { rotate: 0 }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
        <motion.circle
          cx="278"
          cy="186"
          r="128"
          fill="#C61A1A"
          initial={{ opacity: 0.05 }}
          animate={reduce ? undefined : { opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* rival pins, numbered1-3 */}
        {RIVAL_PINS.map((p) => (
          <motion.g
            key={p.n}
            initial={reduce ? false : { y: -46, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18, delay: p.delay }}
          >
            <path
              d={`M ${p.x} ${p.y} c -10 -15 -16 -23 -16 -31 a 16 16 0 1 1 32 0 c 0 8 -6 16 -16 31 z`}
              fill="#C61A1A"
            />
            <circle cx={p.x} cy={p.y - 31} r="10.5" fill="#FFFFFF" />
            <text
              x={p.x}
              y={p.y - 27}
              fontSize="12"
              fontWeight="800"
              textAnchor="middle"
              fill="#C61A1A"
            >
              {p.n}
            </text>
          </motion.g>
        ))}

        {/* your unverified pin — dim, flickering */}
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 1.05 }}
        >
          <motion.g
            animate={reduce ? undefined : { opacity: [1, 0.35, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          >
            <path
              d="M 452 336 c -10 -15 -16 -23 -16 -31 a 16 16 0 1 1 32 0 c 0 8 -6 16 -16 31 z"
              fill="#FFFFFF"
              stroke="#94A3B8"
              strokeWidth="2.5"
              strokeDasharray="5 4"
            />
            <text
              x="452"
              y="310"
              fontSize="10"
              fontWeight="800"
              textAnchor="middle"
              fill="#94A3B8"
            >
              you
            </text>
          </motion.g>
          <line
            x1="446"
            y1="330"
            x2="360"
            y2="242"
            stroke="#94A3B8"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
          <text x="352" y="236" fontSize="11" fontWeight="800" textAnchor="end" fill="#94A3B8">
            not in the pack
          </text>
        </motion.g>
      </svg>

      {/* query chip */}
      <motion.span
        className="absolute left-[4%] top-[5%] inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-extrabold text-slate-700 shadow-[0_14px_30px_-18px_rgba(15,23,42,0.4)]"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Search className="w-3.5 h-3.5 text-[#C61A1A]" strokeWidth={2.8} />
        “service near me”
      </motion.span>

      {/* rivals chip */}
      <motion.span
        className="absolute right-[4%] top-[5%] inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-[10px] font-extrabold leading-snug text-[#C61A1A] shadow-sm"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        3 rivals hold the Map Pack
      </motion.span>

      {/* rank ladder */}
      <motion.div
        className="absolute left-[4%] bottom-[5%] flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/95 px-2.5 py-2 shadow-sm"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        {['1', '2', '3'].map((n) => (
          <span
            key={n}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-[#C61A1A] text-[10px] font-extrabold text-white"
          >
            {n}
          </span>
        ))}
        <span className="px-0.5 text-[11px] font-extrabold text-slate-400">···</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-[10px] font-extrabold text-slate-400">
          17
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">you</span>
      </motion.div>

      {/* unverified chip */}
      <motion.span
        className="absolute right-[4%] bottom-[5%] inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-extrabold text-slate-500 shadow-sm"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 1.35 }}
      >
        <X className="w-3 h-3" strokeWidth={3.2} />
        Profile: unverified
      </motion.span>
    </div>
  );
};

/* ==========================================================================
   3. PROCESS — "ProfileBuilder": stage chips rebuild a Google Business
   Profile card section by section — audit, categories, photos, live badge,
   insights.
   ========================================================================== */

const blockAnim = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

export const ProfileBuilder: React.FC = () => {
  const [stage, setStage] = useState(0);
  const reduce = useReducedMotion();
  const stages = GMB_PROCESS.stages;
  const on = (i: number) => stage >= i;

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

      <div className="mt-8 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8 items-start">
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

        {/* profile card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.55)] min-h-[430px]">
          <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C61A1A] text-white">
              <Store className="w-5 h-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base font-extrabold text-slate-900 leading-none">Your Business</h4>
                {on(3) && (
                  <motion.span
                    {...blockAnim}
                    className="inline-flex items-center gap-1 rounded-md bg-[#C61A1A] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    Live
                  </motion.span>
                )}
              </div>
              <p className="mt-1 text-xs font-semibold text-slate-500">Coffee shop · Open now</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 text-[#C61A1A]" fill="currentColor" strokeWidth={0} />
              ))}
              <span className="text-xs font-extrabold text-slate-700">4.9</span>
            </div>
          </div>

          <div className="mt-4 space-y-3.5">
            {/* L0 — discover: audit checklist */}
            {on(0) && (
              <motion.div {...blockAnim} className="rounded-xl border-2 border-dashed border-red-200 bg-red-50/40 p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#C61A1A]">
                  Audit report
                </p>
                <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {['Categories', 'Photos', 'Ranking signals', 'Reviews'].map((a) => (
                    <span key={a} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                      <Check className="w-3 h-3 text-[#C61A1A]" strokeWidth={3.4} />
                      {a}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* L1 — design: categories + attributes */}
            {on(1) && (
              <motion.div {...blockAnim} className="flex flex-wrap gap-1.5">
                {['Primary: Café', 'Wi-Fi', 'Parking', 'Wheelchair access'].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-600"
                  >
                    {c}
                  </span>
                ))}
              </motion.div>
            )}

            {/* L2 — develop: photos + services */}
            {on(2) && (
              <motion.div {...blockAnim} className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((p) => (
                  <span
                    key={p}
                    className="flex h-14 items-center justify-center rounded-lg bg-slate-100 text-slate-400"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </span>
                ))}
              </motion.div>
            )}

            {/* L3 — deploy: booking + posts */}
            {on(3) && (
              <motion.div {...blockAnim} className="flex gap-2">
                <span className="flex-1 rounded-lg bg-[#C61A1A] px-3 py-2 text-center text-[11px] font-extrabold text-white">
                  Book online
                </span>
                <span className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-extrabold text-slate-600">
                  Message
                </span>
                <span className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-extrabold text-slate-600">
                  Post
                </span>
              </motion.div>
            )}

            {/* L4 — detect: insights */}
            {on(4) && (
              <motion.div {...blockAnim} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    Google Insights
                  </p>
                  <p className="text-[10px] font-extrabold text-[#C61A1A]">Profile views ↑</p>
                </div>
                <div className="mt-2.5 flex h-12 items-end gap-1.5">
                  {[38, 52, 44, 66, 78, 100].map((h, i) => (
                    <motion.span
                      key={h}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex-1 rounded-t ${i >= 4 ? 'bg-[#C61A1A]' : 'bg-slate-300'}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   4. DIFF — before → after rows.
   ========================================================================== */

export const DiffRows: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-3">
      {GMB_DIFF.rows.map((row, i) => (
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
   5. HERO STATS
   ========================================================================== */

export const StatStrip: React.FC<{ stats: readonly { value: string; label: string }[] }> = ({
  stats,
}) => (
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
