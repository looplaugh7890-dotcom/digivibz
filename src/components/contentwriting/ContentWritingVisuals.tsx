import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BookOpen, ChevronDown, Search, TrendingUp } from 'lucide-react';
import { CountUp } from '../CountUp';
import { CW_FRAMEWORK, CW_PROOF } from '../../data/contentWritingContent';

/* ==========================================================================
   1. HERO — "InkPenBook": an open book where a pen writes the page in red
   ink, line by line, while the left page holds the old gray writing.
   The page's thesis in one visual: content being actually written.
   ========================================================================== */

/**
 * Handwriting-like path: word groups separated by gaps, slight baseline
 * drift, and taller strokes where ascenders would be — reads like writing
 * rather than a continuous wave.
 */
const scribble = (x: number, y: number, w: number, seed: number): string => {
  let d = '';
  let cx = 0;
  let wi = 0;
  while (cx < w) {
    const dy = ((seed + wi * 3) % 5) - 2; // per-word baseline drift
    d += wi === 0 ? `M ${x} ${y + dy}` : ` M ${x + cx} ${y + dy}`;
    const strokes = 3 + ((seed + wi * 7) % 4); // 3–6 strokes per word
    for (let s = 0; s < strokes && cx < w; s++) {
      const avail = w - cx;
      if (avail < 5) {
        cx = w;
        break;
      }
      const step = Math.min(11 + ((seed + wi + s * 5) % 4) * 3, avail); // 11–20px
      let rise = 4 + ((seed + wi + s * 3) % 4) * 2; // 4–10px
      if ((seed + wi + s) % 5 === 0) rise = Math.round(rise * 1.7); // ascender
      const dip = (seed + wi + s) % 3;
      d += ` q ${(step / 2).toFixed(1)} -${rise} ${step} ${dip}`;
      cx += step;
    }
    wi++;
    if (cx < w) cx += 6 + ((seed + wi) % 4); // gap between words
  }
  return d;
};

/** The headline word written first — revealed by a clip that follows the pen. */
const HEADLINE = { x: 346, y: 158, clipW: 128, penEnd: 464 };

/** Body lines: x, y, width per written line (last one is short). */
const WRITE_LINES = [
  { x: 346, y: 192, w: 208, sw: 3.5 },
  { x: 346, y: 230, w: 192, sw: 3.5 },
  { x: 346, y: 268, w: 208, sw: 3.5 },
  { x: 346, y: 306, w: 120, sw: 3.5 },
];

/** All five ruled guides (headline included). */
const GUIDES = [
  { x: 346, y: 150, w: 210 },
  { x: 346, y: 192, w: 208 },
  { x: 346, y: 230, w: 192 },
  { x: 346, y: 268, w: 208 },
  { x: 346, y: 306, w: 120 },
];

const LEFT_LINES = [
  { x: 96, y: 150, w: 190 },
  { x: 96, y: 192, w: 196 },
  { x: 96, y: 230, w: 184 },
  { x: 96, y: 268, w: 196 },
  { x: 96, y: 306, w: 110 },
];

/** Old writing fades toward the bottom — content that disappeared. */
const OLD_OPACITY = [1, 0.9, 0.7, 0.5, 0.32];

/** Absolute start time for step i (0 = headline): 0.45s + i * 0.9s. */
const stepAt = (i: number) => 0.45 + i * 0.9;

/** Fountain pen, tip at local (0,0), soft page shadow, leaning up-right. */
const PenBody: React.FC = () => (
  <g>
    <ellipse
      cx="9"
      cy="7"
      rx="15"
      ry="3.5"
      fill="#0F172A"
      opacity="0.22"
      filter="url(#cw-soft)"
    />
    <g transform="rotate(30)">
      <path d="M 0 0 L -5 -13 L 5 -13 Z" fill="#C61A1A" />
      <rect x="-6.5" y="-27" width="13" height="15" rx="3" fill="#E2E8F0" />
      <line x1="0" y1="-26" x2="0" y2="-15" stroke="#94A3B8" strokeWidth="1.4" />
      <rect x="-8" y="-78" width="16" height="53" rx="6" fill="#18181B" />
      <rect x="-8" y="-35" width="16" height="7" rx="1.5" fill="#C61A1A" />
      <rect x="6" y="-74" width="4.5" height="26" rx="2" fill="#9E1414" />
      <rect x="-3" y="-74" width="6" height="6" rx="2" fill="#3F3F46" />
    </g>
  </g>
);

const HERO_CHIPS = [
  { label: 'Ranks', Icon: Search },
  { label: 'Reads well', Icon: BookOpen },
  { label: 'Converts', Icon: TrendingUp },
];

export const InkPenBook: React.FC = () => {
  const reduce = useReducedMotion();

  /* Explicit absolute delays keep every line, pen, and reveal in sync. */
  const draw = (delay: number) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.8, delay, ease: 'easeInOut' as const },
    },
  });

  const pen = (x0: number, x1: number, y: number, delay: number) => ({
    hidden: { opacity: 0, x: x0, y: y - 16 },
    show: {
      opacity: [0, 1, 1, 0],
      x: [x0, x0 + 4, x1, x1],
      y: [y - 16, y, y, y - 16],
      transition: {
        duration: 1,
        delay,
        times: [0, 0.1, 0.8, 1],
        ease: 'easeInOut' as const,
      },
    },
  });

  const headlineClip = {
    hidden: { width: 0 },
    show: {
      width: HEADLINE.clipW,
      transition: { duration: 0.8, delay: stepAt(0), ease: 'easeInOut' as const },
    },
  };

  const underlineV = {
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: stepAt(0) + 0.85, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <motion.div
      className="relative w-full"
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={reduce ? undefined : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* warm ink glow behind the book */}
      <div
        className="absolute inset-2 sm:inset-6 bg-[radial-gradient(ellipse_at_50%_45%,rgba(198,26,26,0.13),transparent_70%)] blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <motion.svg
          viewBox="0 0 640 440"
          className="relative w-full h-auto block"
          initial={reduce ? false : 'hidden'}
          animate="show"
          aria-label="A pen writing the word Growth and red ink lines into an open book"
          role="img"
        >
          <defs>
            <linearGradient id="cw-page" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F8FAFC" />
            </linearGradient>
            <linearGradient id="cw-fold-r" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cw-fold-l" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.12" />
            </linearGradient>
            <filter id="cw-soft" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
            {!reduce && (
              <clipPath id="cw-headline">
                <motion.rect x={HEADLINE.x - 6} y="116" height="58" variants={headlineClip} />
              </clipPath>
            )}
          </defs>

        {/* shadow */}
        <ellipse cx="320" cy="412" rx="250" ry="15" fill="#0F172A" opacity="0.10" />

        {/* red cover + page stack */}
        <path
          d="M 60 112 C 140 88, 260 88, 318 112 L 318 396 C 260 372, 140 372, 60 392 Z
             M 580 112 C 500 88, 380 88, 322 112 L 322 396 C 380 372, 500 372, 580 392 Z"
          fill="#C61A1A"
        />
        <path
          d="M 60 104 C 140 80, 260 80, 318 104 L 318 388 C 260 364, 140 364, 60 384 Z
             M 580 104 C 500 80, 380 80, 322 104 L 322 388 C 380 364, 500 364, 580 384 Z"
          fill="#CBD5E1"
        />

        {/* pages */}
        <path
          d="M 60 96 C 140 72, 260 72, 318 96 L 318 380 C 260 356, 140 356, 60 376 Z"
          fill="url(#cw-page)"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />
        <path
          d="M 580 96 C 500 72, 380 72, 322 96 L 322 380 C 380 356, 500 356, 580 376 Z"
          fill="url(#cw-page)"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />
        <path d="M 320 92 L 320 384" stroke="#0F172A" strokeOpacity="0.28" strokeWidth="3.5" />
        {/* inner fold shadows give the pages depth at the spine */}
        <rect x="322" y="97" width="18" height="283" fill="url(#cw-fold-r)" />
        <rect x="300" y="97" width="18" height="283" fill="url(#cw-fold-l)" />

        {/* ruled guides */}
        {GUIDES.map((l) => (
          <line
            key={`gr-${l.y}`}
            x1={l.x - 2}
            y1={l.y + 7}
            x2={l.x + l.w + 6}
            y2={l.y + 7}
            stroke="#EFF3F7"
            strokeWidth="2"
          />
        ))}
        {LEFT_LINES.map((l) => (
          <line
            key={`gl-${l.y}`}
            x1={l.x - 2}
            y1={l.y + 7}
            x2={l.x + l.w + 6}
            y2={l.y + 7}
            stroke="#F1F5F9"
            strokeWidth="2"
          />
        ))}
        {/* red margin rule + a few ink specks on the written page */}
        <line x1="336" y1="112" x2="336" y2="366" stroke="#C61A1A" strokeOpacity="0.3" strokeWidth="1.5" />
        <circle cx="556" cy="332" r="2" fill="#C61A1A" opacity="0.5" />
        <circle cx="547" cy="345" r="1.3" fill="#C61A1A" opacity="0.4" />
        <circle cx="561" cy="347" r="1.6" fill="#C61A1A" opacity="0.45" />

        {/* left page — old gray writing, fading toward the bottom */}
        {LEFT_LINES.map((l, i) => (
          <path
            key={`old-${l.y}`}
            d={scribble(l.x, l.y, l.w, l.y)}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={OLD_OPACITY[i]}
          />
        ))}

        {/* right page — headline word + body lines, each written with the pen */}
        {reduce ? (
          <>
            <text
              x={HEADLINE.x + 2}
              y={HEADLINE.y + 2}
              fontFamily="Georgia, 'Times New Roman', serif"
              fontStyle="italic"
              fontWeight="700"
              fontSize="34"
              fill="#C61A1A"
            >
              Growth.
            </text>
            <path
              d="M 350 174 Q 405 181 466 172"
              fill="none"
              stroke="#C61A1A"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {WRITE_LINES.map((l) => (
              <path
                key={`new-${l.y}`}
                d={scribble(l.x, l.y, l.w, l.y + 7)}
                fill="none"
                stroke="#C61A1A"
                strokeWidth={l.sw}
                strokeLinecap="round"
              />
            ))}
            <g transform={`translate(${WRITE_LINES[3].x + WRITE_LINES[3].w} ${WRITE_LINES[3].y})`}>
              <PenBody />
            </g>
          </>
        ) : (
          <>
            <text
              clipPath="url(#cw-headline)"
              x={HEADLINE.x + 2}
              y={HEADLINE.y + 2}
              fontFamily="Georgia, 'Times New Roman', serif"
              fontStyle="italic"
              fontWeight="700"
              fontSize="34"
              fill="#C61A1A"
            >
              Growth.
            </text>
            <motion.path
              d="M 350 174 Q 405 181 466 172"
              fill="none"
              stroke="#C61A1A"
              strokeWidth="3"
              strokeLinecap="round"
              variants={underlineV}
              aria-hidden="true"
            />
            {WRITE_LINES.map((l, j) => (
              <motion.path
                key={`new-${l.y}`}
                d={scribble(l.x, l.y, l.w, l.y + 7)}
                fill="none"
                stroke="#C61A1A"
                strokeWidth={l.sw}
                strokeLinecap="round"
                variants={draw(stepAt(j + 1))}
                aria-hidden="true"
              />
            ))}
            {/* pens: headline first, then one per body line */}
            <motion.g
              variants={pen(HEADLINE.x, HEADLINE.penEnd, HEADLINE.y, stepAt(0))}
              aria-hidden="true"
            >
              <PenBody />
            </motion.g>
            {WRITE_LINES.map((l, j) => (
              <motion.g
                key={`pen-${l.y}`}
                variants={pen(l.x, l.x + l.w, l.y, stepAt(j + 1))}
                aria-hidden="true"
              >
                <PenBody />
              </motion.g>
            ))}
          </>
        )}

        {/* caret blinks at the end of the last line once written */}
        <motion.rect
          x="472"
          y="294"
          width="3.5"
          height="22"
          rx="1.5"
          fill="#C61A1A"
          initial={{ opacity: 0 }}
          animate={{ opacity: reduce ? 1 : [0, 1, 1, 1] }}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  delay: 5,
                  duration: 1.1,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                  times: [0, 0.05, 0.6, 1],
                }
          }
        />
      </motion.svg>

      {/* floating promises from the hero copy */}
      {HERO_CHIPS.map(({ label, Icon }, i) => (
        <motion.span
          key={label}
          className={`absolute inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-extrabold text-slate-700 shadow-[0_14px_30px_-18px_rgba(15,23,42,0.45)] ${
            i === 0
              ? 'left-[3%] top-[6%]'
              : i === 1
                ? 'right-[2%] top-[24%]'
                : 'right-[7%] bottom-[14%]'
          }`}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: [0, -7, 0] }}
          transition={
            reduce
              ? undefined
              : {
                  opacity: { duration: 0.5, delay: 0.3 + i * 0.15 },
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
   2. PROBLEM — "Results Flatline": effort keeps climbing while traffic and
   leads flatline at zero. The failure the section's copy describes.
   ========================================================================== */

export const ResultsFlatline: React.FC = () => {
  const reduce = useReducedMotion();

  const effort = 'M 64 215 L 180 176 L 300 137 L 420 102 L 500 74';
  const results = 'M 64 230 C 104 212, 146 194, 186 207 C 226 220, 268 244, 330 249 L 500 250';

  return (
    <div className="relative w-full aspect-[28/15] rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden">
      <svg
        viewBox="0 0 560 300"
        className="absolute inset-0 w-full h-full"
        aria-label="Chart: your effort keeps rising while traffic and leads flatline"
        role="img"
      >
        {/* grid */}
        {[70, 130, 190].map((y) => (
          <line key={y} x1="64" y1={y} x2="520" y2={y} stroke="#E2E8F0" strokeWidth="1.5" />
        ))}
        {/* axes */}
        <line x1="64" y1="34" x2="64" y2="250" stroke="#CBD5E1" strokeWidth="2" />
        <line x1="64" y1="250" x2="524" y2="250" stroke="#CBD5E1" strokeWidth="2" />

        {/* effort line */}
        <motion.path
          d={effort}
          fill="none"
          stroke="#94A3B8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="500"
          cy="74"
          r="5.5"
          fill="#94A3B8"
          initial={reduce ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.35, delay: 1.05 }}
        />

        {/* results line — bumps once, then flatlines */}
        <motion.path
          d={results}
          fill="none"
          stroke="#C61A1A"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="500"
          cy="250"
          r="6.5"
          fill="#C61A1A"
          initial={reduce ? false : { scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.35, delay: 1.5 }}
        />
      </svg>

      {/* legend */}
      <span className="absolute left-[15%] top-[7%] inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
        <span className="w-3 h-0.5 rounded-full bg-slate-400" />
        Effort you put in
      </span>
      <span className="absolute left-[15%] top-[24%] inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#C61A1A]">
        <span className="w-3 h-0.5 rounded-full bg-[#C61A1A]" />
        Traffic &amp; leads
      </span>

      {/* annotation on the flatline */}
      <span className="absolute left-[42%] right-[3%] top-[56%] block rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-[10px] font-extrabold leading-snug text-[#C61A1A] shadow-sm">
        Buried without a single conversion
      </span>

      {/* axis label */}
      <span className="absolute left-[11%] bottom-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">
        As you keep publishing →
      </span>
    </div>
  );
};

/* ==========================================================================
   3. INDUSTRY — "Writer Venn": human writers ∩ AI research = content that's
   both smart and scalable. Labels sit in % over an 8:5 box so they track
   the SVG exactly at any width.
   ========================================================================== */

export const WriterVenn: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full aspect-[8/5] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.4)]">
      <svg
        viewBox="0 0 480 300"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <clipPath id="cw-lens">
            <circle cx="300" cy="165" r="95" />
          </clipPath>
        </defs>
        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '240px 165px' }}
        >
          <circle cx="180" cy="165" r="95" fill="#C61A1A" fillOpacity="0.06" />
          <circle cx="300" cy="165" r="95" fill="#0F172A" fillOpacity="0.05" />
          <circle cx="180" cy="165" r="95" fill="#C61A1A" fillOpacity="0.16" clipPath="url(#cw-lens)" />
          <circle cx="180" cy="165" r="95" fill="none" stroke="#C61A1A" strokeWidth="2.5" />
          <circle cx="300" cy="165" r="95" fill="none" stroke="#334155" strokeWidth="2.5" />
        </motion.g>
      </svg>

      {/* labels */}
      <span className="absolute left-[33%] top-[6%] -translate-x-1/2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-extrabold text-[#C61A1A] whitespace-nowrap">
        Human writers
      </span>
      <span className="absolute left-[67%] top-[6%] -translate-x-1/2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] font-extrabold text-white whitespace-nowrap">
        AI research
      </span>
      <span className="absolute left-[50%] top-[54%] -translate-x-1/2 -translate-y-1/2 text-center text-[11px] sm:text-xs font-extrabold leading-tight text-slate-900 whitespace-nowrap">
        Smart <span className="text-[#C61A1A]">+</span> scalable
      </span>
    </div>
  );
};

/* ==========================================================================
   4. FRAMEWORK — "Ink Chapters": a vertical editorial spine whose red ink
   fills as you open chapters (serif numerals, one open at a time).
   ========================================================================== */

export const InkChapters: React.FC = () => {
  const [active, setActive] = useState(0);
  const stages = CW_FRAMEWORK.stages;

  return (
    <div className="space-y-4">
      {stages.map((s, i) => {
        const reached = i <= active;
        const isOpen = active === i;
        return (
          <div key={s.key} className="relative pl-14 sm:pl-20">
            {/* spine — red ink fills down to the open chapter */}
            {i < stages.length - 1 && (
              <span
                className={`absolute left-5 sm:left-7 top-11 -bottom-1.5 w-px transition-colors duration-500 ${
                  reached ? 'bg-[#C61A1A]' : 'bg-slate-200'
                }`}
                aria-hidden="true"
              />
            )}

            {/* chapter dot */}
            <span
              className={`absolute left-0 sm:left-2 top-1 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                isOpen
                  ? 'border-[#C61A1A] bg-[#C61A1A] text-white shadow-[0_0_0_6px_rgba(198,26,26,0.12)]'
                  : reached
                    ? 'border-[#C61A1A] bg-white text-[#C61A1A]'
                    : 'border-slate-200 bg-white text-slate-400'
              }`}
              aria-hidden="true"
            >
              <span className="font-serif italic text-sm font-bold">{i + 1}</span>
            </span>

            <div
              className={`rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? 'border-red-200 bg-red-50/40 shadow-[0_22px_48px_-34px_rgba(198,26,26,0.45)]'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => setActive(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-serif italic text-xs font-bold text-[#C61A1A]">
                    Chapter {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-base sm:text-lg font-extrabold uppercase tracking-wide ${
                      isOpen ? 'text-[#C61A1A]' : 'text-slate-800'
                    }`}
                  >
                    {s.key}
                  </span>
                </span>
                <span
                  className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'border-[#C61A1A] bg-[#C61A1A] text-white rotate-180'
                      : 'border-slate-200 text-slate-500'
                  }`}
                >
                  <ChevronDown className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-[#C61A1A] pl-4">
                        {s.body}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ==========================================================================
   5. PROOF — retention ring + CountUp stat tiles on a dark ledger card.
   ========================================================================== */

const RetentionRing: React.FC = () => {
  const reduce = useReducedMotion();
  const r = 64;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative w-40 h-40 sm:w-44 sm:h-44 shrink-0">
      <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
        <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="11" />
        <motion.circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="#C61A1A"
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? false : { strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - 0.94) }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums leading-none">
          <CountUp value="94%" />
        </span>
        <span className="mt-1.5 text-[9px] font-extrabold uppercase tracking-widest text-white/50 text-center px-4">
          Client retention
        </span>
      </div>
    </div>
  );
};

export const StatLedger: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0C0C0D] px-6 sm:px-10 py-9">
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(198,26,26,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(198,26,26,0.5) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse at 80% 20%, black 10%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 80% 20%, black 10%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative grid lg:grid-cols-[auto_1fr] gap-10 lg:gap-14 items-center">
        <div className="flex flex-col items-center">
          <RetentionRing />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
          {CW_PROOF.stats.map((s, i) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums leading-none">
                <CountUp value={s.value} />
              </div>
              <motion.div
                className="mt-3 h-0.5 bg-[#C61A1A] rounded-full sm:origin-left origin-center"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '3rem' }}
              />
              <div className="mt-2.5 text-[11px] font-extrabold uppercase tracking-widest text-white/55">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
