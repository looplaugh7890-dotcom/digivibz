import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Bell, MessageSquare, Star } from 'lucide-react';
import { CountUp } from '../CountUp';
import { ORM_FRAMEWORK } from '../../data/ormContent';

/* ==========================================================================
   1. HERO — "RecordStage": an influencer filming content — ring light,
   creator with headphones, phone on a tripod capturing it all — while
   rating and review chips float in around the setup.
   ========================================================================== */

/** Waveform bars on the phone screen: heights per bar. */
const WAVE_BARS = [14, 26, 18, 34, 22, 30, 12];

const HERO_CHIPS = [
  { label: '4.8 rating', Icon: Star, pos: 'left-[2%] top-[6%]' },
  { label: 'New review', Icon: Bell, pos: 'right-[1%] top-[22%]' },
  { label: 'Mention caught', Icon: MessageSquare, pos: 'right-[4%] bottom-[12%]' },
];

export const RecordStage: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative w-full"
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={reduce ? undefined : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* warm glow behind the setup */}
      <div
        className="absolute inset-2 sm:inset-6 bg-[radial-gradient(ellipse_at_50%_45%,rgba(198,26,26,0.12),transparent_70%)] blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <motion.svg
        viewBox="0 0 640 440"
        className="relative w-full h-auto block"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-label="An influencer recording content on a phone with a ring light while review ratings float around"
        role="img"
      >
        <defs>
          <filter id="orm-soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <linearGradient id="orm-sweep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C61A1A" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#C61A1A" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* floor */}
        <ellipse cx="320" cy="404" rx="245" ry="16" fill="#0F172A" opacity="0.10" />
        <ellipse
          cx="320"
          cy="404"
          rx="180"
          ry="10"
          fill="#C61A1A"
          opacity="0.07"
          filter="url(#orm-soft)"
        />

        {/* ---------------------------------------------------- ring light */}
        <g>
          <motion.circle
            cx="140"
            cy="152"
            r="66"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="24"
            animate={reduce ? undefined : { opacity: [0.35, 0.85, 0.35] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="140" cy="152" r="66" fill="none" stroke="#F1F5F9" strokeWidth="14" />
          <circle cx="140" cy="152" r="66" fill="none" stroke="#E2E8F0" strokeWidth="2" />
          <line x1="140" y1="218" x2="140" y2="366" stroke="#94A3B8" strokeWidth="7" />
          <line x1="140" y1="366" x2="104" y2="400" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
          <line x1="140" y1="366" x2="176" y2="400" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
          <line x1="140" y1="366" x2="140" y2="402" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* ------------------------------------------------------ creator */}
        <g>
          {/* body */}
          <path
            d="M 244 392 L 244 300 C 244 258, 266 234, 300 234 C 334 234, 356 258, 356 300 L 356 392 Z"
            fill="#C61A1A"
          />
          {/* arm holding a small product up */}
          <path
            d="M 348 268 C 380 264, 398 244, 402 222"
            fill="none"
            stroke="#C61A1A"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <rect x="386" y="188" width="34" height="42" rx="7" fill="#18181B" />
          <rect x="392" y="196" width="22" height="5" rx="2.5" fill="#C61A1A" />
          <rect x="392" y="206" width="16" height="4" rx="2" fill="#52525B" />
          {/* head */}
          <circle cx="300" cy="188" r="36" fill="#18181B" />
          {/* headphones — red band + ear pads */}
          <path
            d="M 262 186 C 262 154, 276 140, 300 140 C 324 140, 338 154, 338 186"
            fill="none"
            stroke="#C61A1A"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <rect x="252" y="180" width="16" height="30" rx="7" fill="#C61A1A" />
          <rect x="332" y="180" width="16" height="30" rx="7" fill="#C61A1A" />
          {/* mic on the headset */}
          <path
            d="M 336 208 C 336 226, 322 234, 310 234"
            fill="none"
            stroke="#18181B"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="307" cy="234" r="6" fill="#18181B" />
        </g>

        {/* ------------------------------------------------ phone on tripod */}
        <g>
          {/* tripod */}
          <line x1="510" y1="268" x2="510" y2="378" stroke="#94A3B8" strokeWidth="7" />
          <line x1="510" y1="378" x2="474" y2="404" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
          <line x1="510" y1="378" x2="546" y2="404" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
          <line x1="510" y1="378" x2="510" y2="406" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" />
          <rect x="494" y="256" width="32" height="14" rx="5" fill="#64748B" />

          {/* phone */}
          <rect x="466" y="112" width="92" height="160" rx="14" fill="#18181B" />
          <rect x="473" y="124" width="78" height="136" rx="7" fill="#0F172A" />

          {/* REC indicator */}
          <motion.circle
            cx="487"
            cy="140"
            r="5.5"
            fill="#C61A1A"
            animate={reduce ? undefined : { opacity: [1, 1, 0.15, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, times: [0, 0.5, 0.7, 1] }}
          />
          <text
            x="499"
            y="144"
            fontSize="11"
            fontWeight="800"
            fontFamily="ui-monospace, monospace"
            fill="#FFFFFF"
            letterSpacing="2"
          >
            REC
          </text>

          {/* capture frame corners around the creator */}
          <path d="M 484 158 L 484 172 M 484 158 L 496 158" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M 540 158 L 540 172 M 540 158 L 528 158" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M 484 236 L 484 222 M 484 236 L 496 236" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M 540 236 L 540 222 M 540 236 L 528 236" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2" />

          {/* waveform on screen */}
          {WAVE_BARS.map((h, i) => (
            <motion.rect
              key={i}
              x={484 + i * 10}
              y={214 - h / 2}
              width="5"
              height={h}
              rx="2.5"
              fill="#C61A1A"
              style={{ transformOrigin: `${486.5 + i * 10}px 214px` }}
              animate={reduce ? undefined : { scaleY: [0.45, 1, 0.6, 1, 0.45] }}
              transition={{
                duration: 1.3,
                repeat: Infinity,
                delay: i * 0.11,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* record button */}
          <circle cx="512" cy="246" r="8" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
          <circle cx="512" cy="246" r="4.5" fill="#C61A1A" />
        </g>
      </motion.svg>

      {/* floating reputation chips */}
      {HERO_CHIPS.map(({ label, Icon, pos }, i) => (
        <motion.span
          key={label}
          className={`absolute inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-extrabold text-slate-700 shadow-[0_14px_30px_-18px_rgba(15,23,42,0.45)] ${pos}`}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: [0, -7, 0] }}
          transition={
            reduce
              ? undefined
              : {
                  opacity: { duration: 0.5, delay: 0.35 + i * 0.15 },
                  y: { duration: 3.4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' },
                }
          }
        >
          <Icon className="w-3.5 h-3.5 text-[#C61A1A]" />
          {label}
        </motion.span>
      ))}
    </motion.div>
  );
};

/* ==========================================================================
   2. PROBLEM — "First Search": the SERP a prospect actually sees — an old
   one-star review sitting at position one, red-flagged, while the brand's
   real results wait below the fold.
   ========================================================================== */

export const FirstSearch: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full aspect-[28/17] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.4)]">
      {/* search bar */}
      <div className="absolute left-[6%] right-[6%] top-[6%] flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5">
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="#64748B" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
        <span className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">your brand name</span>
        <span className="ml-auto text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Google</span>
      </div>

      <svg
        viewBox="0 0 560 340"
        className="absolute inset-0 w-full h-full"
        aria-label="Search results where an old one-star review ranks first"
        role="img"
      >
        {/* result 1 — the negative review */}
        <motion.g
          initial={reduce ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x="46" y="92" width="468" height="86" rx="10" fill="#FEF2F2" stroke="#FECACA" strokeWidth="2" />
          <rect x="46" y="92" width="5" height="86" rx="2.5" fill="#C61A1A" />
          <text x="68" y="122" fontSize="13" fontWeight="800" fill="#0F172A">
            Awful experience — avoid this place
          </text>
          {/* one red star */}
          <path
            d="M 73 136 l 3.2 6.5 7.2 1 -5.2 5.1 1.2 7.1 -6.4 -3.4 -6.4 3.4 1.2 -7.1 -5.2 -5.1 7.2 -1 Z"
            fill="#C61A1A"
          />
          <text x="92" y="150" fontSize="11" fontWeight="700" fill="#C61A1A">
            1.0 · 2 years ago
          </text>
          <text x="92" y="166" fontSize="10" fill="#64748B">
            Result #1 — this is the first thing they see
          </text>
        </motion.g>

        {/* results 2 & 3 — buried real content */}
        {[
          { y: 194, w: 430, t: 'Your best review — page 3' },
          { y: 254, w: 386, t: 'Your website — page 4' },
        ].map((r, i) => (
          <motion.g
            key={r.y}
            initial={reduce ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.45 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <rect x="46" y={r.y} width={r.w} height="44" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
            <rect x="64" y={r.y + 14} width={r.w - 60} height="7" rx="3.5" fill="#CBD5E1" />
            <rect x="64" y={r.y + 27} width={r.w - 140} height="6" rx="3" fill="#E2E8F0" />
            <text x={r.w - 2} y={r.y + 27} fontSize="9" fontWeight="700" fill="#94A3B8" textAnchor="end">
              {i === 0 ? 'page 3' : 'page 4'}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* annotation */}
      <motion.span
        className="absolute left-[6%] bottom-[6%] inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-[10px] font-extrabold leading-snug text-[#C61A1A] shadow-sm"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45, delay: 0.85 }}
      >
        They close the tab. Your competitor gets the call.
      </motion.span>
    </div>
  );
};

/* ==========================================================================
   3. FRAMEWORK — "Reputation Radar": a sweeping radar with the five 5D
   stages as blips; picking a stage re-centres the readout.
   ========================================================================== */

const RADAR_BLIPS = [
  { x: 240, y: 96 },
  { x: 377, y: 194 },
  { x: 325, y: 356 },
  { x: 155, y: 356 },
  { x: 103, y: 194 },
];

export const ReputationRadar: React.FC = () => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const stages = ORM_FRAMEWORK.stages;
  const current = stages[active];

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 items-center">
      {/* radar */}
      <div className="relative mx-auto w-full max-w-[420px]">
        <svg viewBox="0 0 480 480" className="w-full h-auto block" aria-hidden="true">
          {/* rings */}
          {[180, 130, 80, 40].map((r) => (
            <circle key={r} cx="240" cy="240" r={r} fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          ))}
          {/* crosshairs */}
          <line x1="60" y1="240" x2="420" y2="240" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="240" y1="60" x2="240" y2="420" stroke="#E2E8F0" strokeWidth="1.5" />

          {/* sweep */}
          {!reduce && (
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '240px 240px' }}
            >
              <path d="M 240 240 L 240 60 A 180 180 0 0 1 395.9 150 Z" fill="url(#orm-sweep)" />
              <line x1="240" y1="240" x2="240" y2="60" stroke="#C61A1A" strokeWidth="2.5" strokeOpacity="0.7" />
            </motion.g>
          )}

          {/* blips */}
          {RADAR_BLIPS.map((b, i) => {
            const on = i === active;
            return (
              <g
                key={i}
                onClick={() => setActive(i)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Show ${stages[i].key} stage`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <circle cx={b.x} cy={b.y} r="26" fill="transparent" />
                {on && !reduce && (
                  <motion.circle
                    cx={b.x}
                    cy={b.y}
                    fill="none"
                    stroke="#C61A1A"
                    strokeWidth="2"
                    initial={{ r: 16, opacity: 0.7 }}
                    animate={{ r: [16, 26], opacity: [0.7, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
                <circle
                  cx={b.x}
                  cy={b.y}
                  r={on ? 13 : 9}
                  fill={on ? '#C61A1A' : '#FFFFFF'}
                  stroke={on ? '#C61A1A' : '#CBD5E1'}
                  strokeWidth="3"
                />
                <text
                  x={b.x}
                  y={b.y + 4}
                  fontSize="11"
                  fontWeight="800"
                  textAnchor="middle"
                  fill={on ? '#FFFFFF' : '#94A3B8'}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}

          {/* centre readout */}
          <circle cx="240" cy="240" r="54" fill="#FFFFFF" stroke="#C61A1A" strokeWidth="2.5" />
          <text
            x="240"
            y="236"
            fontSize="10"
            fontWeight="800"
            letterSpacing="1.5"
            textAnchor="middle"
            fill="#94A3B8"
          >
            STAGE
          </text>
          <text
            key={current.key}
            x="240"
            y="258"
            fontSize="15"
            fontWeight="800"
            textAnchor="middle"
            fill="#C61A1A"
            letterSpacing="0.5"
          >
            {current.key.toUpperCase()}
          </text>
        </svg>
      </div>

      {/* stage list */}
      <div className="space-y-2.5">
        {stages.map((s, i) => {
          const on = i === active;
          return (
            <div key={s.key}>
              <button
                type="button"
                onClick={() => setActive(on ? -1 : i)}
                aria-expanded={on}
                className={`w-full flex items-center gap-3.5 rounded-xl border px-4 py-3 text-left transition-all cursor-pointer ${
                  on
                    ? 'border-red-300 bg-red-50/50 shadow-[0_18px_40px_-30px_rgba(198,26,26,0.5)]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold transition-colors ${
                    on ? 'bg-[#C61A1A] text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-sm sm:text-base font-extrabold uppercase tracking-wide ${
                    on ? 'text-[#C61A1A]' : 'text-slate-800'
                  }`}
                >
                  {s.key}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 ml-4 pl-4 text-sm text-slate-600 leading-relaxed border-l-2 border-[#C61A1A]">
                      {s.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ==========================================================================
   4. RESULTS — three small diagrams: a rank drop, a star climb, a recovery
   curve. One per case study card.
   ========================================================================== */

export const RankDrop: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 280 130" className="w-full h-auto block" aria-label="Complaint dropping from the top spot to page four" role="img">
      <line x1="34" y1="20" x2="34" y2="110" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="4 5" />
      <text x="46" y="24" fontSize="10" fontWeight="800" fill="#0F172A">Top spot</text>
      <text x="46" y="112" fontSize="10" fontWeight="800" fill="#94A3B8">Page 4</text>
      <motion.circle
        cx="34"
        cy="26"
        r="8"
        fill="#C61A1A"
        initial={reduce ? false : { cy: 26 }}
        whileInView={{ cy: 104 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={92}
          y={28 + i * 30}
          width={168 - i * 26}
          height="14"
          rx="7"
          fill={i === 0 ? '#FECACA' : '#E2E8F0'}
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '92px 0px' }}
        />
      ))}
      <motion.path
        d="M 52 66 L 74 66 M 74 66 L 66 60 M 74 66 L 66 72"
        fill="none"
        stroke="#C61A1A"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      />
    </svg>
  );
};

const STAR_D =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

export const StarClimb: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 280 130" className="w-full h-auto block" aria-label="Client rating climbing from 3.2 to 4.6 stars" role="img">
      <defs>
        <clipPath id="orm-star-fill">
          <motion.rect
            x="0"
            y="0"
            height="130"
            initial={reduce ? false : { width: 0 }}
            whileInView={{ width: 236 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </clipPath>
      </defs>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${26 + i * 50}, 34) scale(1.7)`}>
          <path d={STAR_D} fill="#E2E8F0" />
        </g>
      ))}
      <g clipPath="url(#orm-star-fill)">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${26 + i * 50}, 34) scale(1.7)`}>
            <path d={STAR_D} fill="#C61A1A" />
          </g>
        ))}
      </g>
      <text x="26" y="112" fontSize="13" fontWeight="800" fill="#94A3B8">3.2</text>
      <motion.path
        d="M 52 106 L 84 106 M 84 106 L 77 101 M 84 106 L 77 111"
        fill="none"
        stroke="#C61A1A"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay: 1.3 }}
      />
      <text x="96" y="112" fontSize="15" fontWeight="800" fill="#C61A1A">4.6 stars</text>
    </svg>
  );
};

export const RecoveryCurve: React.FC = () => {
  const reduce = useReducedMotion();
  const path = 'M 24 104 L 74 104 L 104 22 L 150 78 L 256 96';

  return (
    <svg viewBox="0 0 280 130" className="w-full h-auto block" aria-label="Viral complaint peaking then recovering within two weeks" role="img">
      <line x1="24" y1="110" x2="262" y2="110" stroke="#E2E8F0" strokeWidth="2" />
      <motion.path
        d={path}
        fill="none"
        stroke="#C61A1A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx="256"
        cy="96"
        r="6"
        fill="#C61A1A"
        initial={reduce ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.3, delay: 1.5 }}
      />
      <line x1="196" y1="24" x2="196" y2="110" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="202" y="34" fontSize="10" fontWeight="800" fill="#64748B">2 weeks</text>
      <text x="100" y="16" fontSize="10" fontWeight="800" fill="#C61A1A">Viral</text>
      <text x="216" y="122" fontSize="9" fontWeight="700" fill="#94A3B8" textAnchor="middle">recovered</text>
    </svg>
  );
};

/** Picks the right diagram per case study. */
export const CaseVisual: React.FC<{ kind: 'rank' | 'stars' | 'recovery' }> = ({ kind }) => {
  if (kind === 'rank') return <RankDrop />;
  if (kind === 'stars') return <StarClimb />;
  return <RecoveryCurve />;
};

/* ==========================================================================
   5. HERO STATS — the four numbers under the hero copy.
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
