import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BadgeCheck, Check, Eye, Layers, Palette, Type, X } from 'lucide-react';
import { CountUp } from '../CountUp';
import { GD_DIFF, GD_PROCESS, GD_TOOLS } from '../../data/designContent';

/* ==========================================================================
   1. HERO — "DesignCanvas": an artboard where a pen tool draws a bezier
   brand mark — construction guides, anchor points with handles, swatches,
   crop marks. The designer's screen, mid-concept.
   ========================================================================== */

const MARK_PATH = 'M 160 300 C 240 160, 320 160, 380 250 S 500 340, 540 200';
const ANCHORS = [
  { x: 160, y: 300, t: 0.8 },
  { x: 380, y: 250, t: 1.7 },
  { x: 540, y: 200, t: 2.55 },
];

const HERO_CHIPS = [
  { label: 'Aa Typography', Icon: Type, pos: 'left-[0%] top-[4%]' },
  { label: 'Brand palette', Icon: Palette, pos: 'right-[0%] top-[18%]' },
  { label: '100% Vector', Icon: BadgeCheck, pos: 'right-[6%] bottom-[8%]' },
];

export const DesignCanvas: React.FC = () => {
  const reduce = useReducedMotion();

  const nib = {
    hidden: { opacity: 0, x: 160, y: 300 },
    show: {
      opacity: [0, 1, 1, 1],
      x: [160, 160, 380, 540],
      y: [300, 300, 250, 200],
      transition: { duration: 1.75, delay: 0.8, times: [0, 0.04, 0.55, 1], ease: 'easeInOut' as const },
    },
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

      <motion.svg
        viewBox="0 0 640 440"
        className="relative w-full h-auto block"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-label="A pen tool drawing a brand mark on a design artboard with guides and color swatches"
        role="img"
      >
        <defs>
          <pattern id="gd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#E2E8F0" />
          </pattern>
          <filter id="gd-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0F172A" floodOpacity="0.14" />
          </filter>
        </defs>

        {/* canvas dot grid */}
        <rect x="0" y="0" width="640" height="440" fill="url(#gd-grid)" />

        {/* artboard */}
        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '325px 220px' }}
        >
          <rect x="90" y="55" width="470" height="330" rx="6" fill="#FFFFFF" filter="url(#gd-shadow)" />
          <rect x="90" y="55" width="470" height="330" rx="6" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />

          {/* crop marks */}
          {[
            'M 74 45 L 74 63 M 66 55 L 84 55',
            'M 576 45 L 576 63 M 566 55 L 584 55',
            'M 74 377 L 74 395 M 66 385 L 84 385',
            'M 576 377 L 576 395 M 566 385 L 584 385',
          ].map((d) => (
            <path key={d} d={d} stroke="#94A3B8" strokeWidth="1.5" />
          ))}

          {/* construction guides */}
          <motion.circle
            cx="350"
            cy="230"
            r="115"
            fill="none"
            stroke="#C61A1A"
            strokeOpacity="0.28"
            strokeWidth="1.5"
            strokeDasharray="7 7"
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: '350px 230px' }}
          />
          <motion.line
            x1="115"
            y1="300"
            x2="535"
            y2="300"
            stroke="#C61A1A"
            strokeOpacity="0.22"
            strokeWidth="1.5"
            strokeDasharray="7 7"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeInOut' }}
          />

          {/* the brand mark being drawn */}
          <motion.path
            d={MARK_PATH}
            fill="none"
            stroke="#C61A1A"
            strokeWidth="7"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.75, delay: 0.8, ease: 'easeInOut' }}
          />

          {/* handles on the middle anchor */}
          <motion.g
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 2.05 }}
          >
            <line x1="380" y1="250" x2="320" y2="160" stroke="#64748B" strokeWidth="1.5" />
            <line x1="380" y1="250" x2="440" y2="340" stroke="#64748B" strokeWidth="1.5" />
            <circle cx="320" cy="160" r="5" fill="#FFFFFF" stroke="#C61A1A" strokeWidth="2" />
            <circle cx="440" cy="340" r="5" fill="#FFFFFF" stroke="#C61A1A" strokeWidth="2" />
          </motion.g>

          {/* anchor points */}
          {ANCHORS.map((a) => (
            <motion.rect
              key={`${a.x}`}
              x={a.x - 5.5}
              y={a.y - 5.5}
              width="11"
              height="11"
              fill="#FFFFFF"
              stroke="#C61A1A"
              strokeWidth="2.5"
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.28, delay: a.t, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: `${a.x}px ${a.y}px` }}
            />
          ))}

          {/* swatches */}
          {['#C61A1A', '#18181B', '#64748B', '#FFFFFF'].map((c, i) => (
            <motion.rect
              key={c}
              x={112 + i * 26}
              y="344"
              width="19"
              height="19"
              rx="4"
              fill={c}
              stroke={c === '#FFFFFF' ? '#CBD5E1' : 'none'}
              strokeWidth="1.5"
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 2.6 + i * 0.09, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ transformOrigin: `${121.5 + i * 26}px 353.5px` }}
            />
          ))}

          {/* file label */}
          <motion.text
            x="536"
            y="360"
            fontSize="11"
            fontWeight="700"
            textAnchor="end"
            fill="#94A3B8"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.9 }}
          >
            brand-mark_v3 · 100% vector
          </motion.text>
        </motion.g>

        {/* pen nib tracking the path */}
        {!reduce && (
          <motion.g variants={nib} initial="hidden" animate="show">
            <g transform="rotate(32)">
              <path d="M 0 0 L -6.5 -24 L 6.5 -24 Z" fill="#18181B" />
              <path d="M 0 0 L -3 -8 L 3 -8 Z" fill="#C61A1A" />
              <rect x="-6.5" y="-30" width="13" height="7" rx="3" fill="#C61A1A" />
              <line x1="0" y1="-9" x2="0" y2="-22" stroke="#FFFFFF" strokeWidth="1.4" />
            </g>
          </motion.g>
        )}
        {reduce && (
          <g transform="translate(540 200) rotate(32)">
            <path d="M 0 0 L -6.5 -24 L 6.5 -24 Z" fill="#18181B" />
            <path d="M 0 0 L -3 -8 L 3 -8 Z" fill="#C61A1A" />
            <rect x="-6.5" y="-30" width="13" height="7" rx="3" fill="#C61A1A" />
          </g>
        )}
      </motion.svg>

      {/* floating chips */}
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
                  opacity: { duration: 0.5, delay: 0.4 + i * 0.15 },
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
   2. PROBLEM — "Flaw Audit": a mock flyer annotated like a defect diagram —
   red callouts pointing at hierarchy, type, color and layout flaws — capped
   with an IGNORED stamp.
   ========================================================================== */

const CALLOUTS = [
  { label: 'NO HIERARCHY', lx: 16, ly: 122, tx: 130, ty: 120, side: 'left' },
  { label: 'MISMATCHED TYPE', lx: 16, ly: 176, tx: 132, ty: 172, side: 'left' },
  { label: 'FLAT COLOR', lx: 16, ly: 268, tx: 148, ty: 262, side: 'left' },
  { label: 'OFF-GRID', lx: 544, ly: 236, tx: 448, ty: 232, side: 'right' },
];

export const FlawAudit: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full aspect-[28/21] rounded-2xl border border-slate-200 bg-slate-50/70 overflow-hidden">
      <svg
        viewBox="0 0 560 420"
        className="absolute inset-0 w-full h-full"
        aria-label="A flyer mockup annotated with design flaws and stamped IGNORED"
        role="img"
      >
        {/* flyer */}
        <motion.g
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x="110" y="40" width="340" height="340" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* logo box */}
          <rect x="132" y="62" width="58" height="24" rx="4" fill="#CBD5E1" />
          {/* headline + type lines (no hierarchy: everything same weight) */}
          <rect x="132" y="112" width="216" height="17" rx="3" fill="#94A3B8" />
          <rect x="132" y="140" width="188" height="9" rx="3" fill="#CBD5E1" />
          <rect x="132" y="158" width="164" height="9" rx="3" fill="#CBD5E1" />
          <rect x="132" y="176" width="196" height="9" rx="3" fill="#CBD5E1" />
          {/* image block, off-grid */}
          <g transform="rotate(-2.5 285 250)">
            <rect x="142" y="196" width="298" height="118" rx="6" fill="#E2E8F0" />
            <path d="M 168 288 L 232 224 L 288 288 Z" fill="#CBD5E1" />
            <circle cx="392" cy="234" r="16" fill="#CBD5E1" />
          </g>
          {/* flat button */}
          <rect x="132" y="332" width="118" height="30" rx="5" fill="#94A3B8" />
        </motion.g>

        {/* callouts */}
        {CALLOUTS.map((c, i) => (
          <motion.g
            key={c.label}
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, delay: 0.45 + i * 0.22, ease: [0.34, 1.56, 0.64, 1] }}
            style={{
              transformOrigin: c.side === 'left' ? `${c.tx}px ${c.ty}px` : `${c.tx}px ${c.ty}px`,
            }}
          >
            <line x1={c.lx + (c.side === 'left' ? 86 : -86)} y1={c.ly - 4} x2={c.tx} y2={c.ty} stroke="#C61A1A" strokeWidth="1.5" />
            <circle cx={c.tx} cy={c.ty} r="5" fill="#FFFFFF" stroke="#C61A1A" strokeWidth="2.5" />
            <text
              x={c.lx}
              y={c.ly}
              fontSize="10"
              fontWeight="800"
              letterSpacing="0.5"
              fill="#C61A1A"
              textAnchor={c.side === 'left' ? 'start' : 'end'}
            >
              {c.label}
            </text>
          </motion.g>
        ))}

        {/* IGNORED stamp */}
        <motion.g
          initial={reduce ? false : { scale: 2.4, opacity: 0, rotate: -24 }}
          whileInView={{ scale: 1, opacity: 1, rotate: -12 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: '398px 356px' }}
        >
          <rect x="322" y="336" width="152" height="40" rx="5" fill="none" stroke="#C61A1A" strokeWidth="3.5" />
          <text
            x="398"
            y="363"
            fontSize="21"
            fontWeight="800"
            letterSpacing="3"
            textAnchor="middle"
            fill="#C61A1A"
          >
            IGNORED
          </text>
        </motion.g>
      </svg>

      {/* attention chip */}
      <motion.span
        className="absolute right-[4%] top-[5%] inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-[10px] font-extrabold leading-snug text-[#C61A1A] shadow-sm"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, delay: 1.9 }}
      >
        0.3s — that’s all it gets
      </motion.span>
    </div>
  );
};

/* ==========================================================================
   3. PROCESS — "Layer Stack": a design-app layers panel beside an artboard
   preview. Picking a stage reveals the layers built so far — the visual
   literally assembles as the 5D process advances.
   ========================================================================== */

export const LayerStack: React.FC = () => {
  const [stage, setStage] = useState(0);
  const reduce = useReducedMotion();
  const stages = GD_PROCESS.stages;
  const on = (i: number) => stage >= i;

  const layer = (i: number) => ({
    initial: false as const,
    animate: { opacity: on(i) ? 1 : 0, y: on(i) ? 0 : 6 },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay: on(i) ? i * 0.04 : 0 },
  });

  return (
    <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-8 items-start">
      {/* artboard preview */}
      <div className="relative rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.4)]">
        <div className="flex items-center gap-2 px-1 pb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C61A1A]" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
          <span className="ml-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            composition.ai — preview
          </span>
        </div>
        <svg viewBox="0 0 480 340" className="w-full h-auto block" aria-hidden="true">
          <rect x="0" y="0" width="480" height="340" rx="8" fill="#F8FAFC" />
          <rect x="16" y="16" width="448" height="308" rx="5" fill="#FFFFFF" stroke="#E2E8F0" />

          {/* L0 — discover: guides + grid */}
          <motion.g {...layer(0)}>
            {[64, 128, 192, 256].map((y) => (
              <line key={y} x1="40" y1={y} x2="440" y2={y} stroke="#F1F5F9" strokeWidth="1.5" />
            ))}
            <circle cx="240" cy="168" r="86" fill="none" stroke="#C61A1A" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="40" y1="168" x2="440" y2="168" stroke="#C61A1A" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="240" y1="40" x2="240" y2="296" stroke="#C61A1A" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="6 6" />
            <rect x="36" y="30" width="16" height="16" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
            <rect x="428" y="286" width="16" height="16" fill="none" stroke="#CBD5E1" strokeWidth="1.5" />
          </motion.g>

          {/* L1 — design: wireframe skeleton */}
          <motion.g {...layer(1)}>
            <rect x="44" y="44" width="84" height="20" rx="4" fill="none" stroke="#94A3B8" strokeWidth="2" />
            <line x1="44" y1="80" x2="266" y2="80" stroke="#64748B" strokeWidth="7" strokeLinecap="round" />
            <line x1="44" y1="98" x2="214" y2="98" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" />
            <rect x="44" y="216" width="112" height="30" rx="6" fill="none" stroke="#94A3B8" strokeWidth="2" />
            <circle cx="374" cy="150" r="56" fill="none" stroke="#94A3B8" strokeWidth="2" />
          </motion.g>

          {/* L2 — develop: fills + refined shapes */}
          <motion.g {...layer(2)}>
            <circle cx="374" cy="150" r="46" fill="#C61A1A" />
            <rect x="44" y="44" width="84" height="20" rx="4" fill="#18181B" />
            <line x1="44" y1="80" x2="266" y2="80" stroke="#18181B" strokeWidth="7" strokeLinecap="round" />
            <line x1="44" y1="98" x2="214" y2="98" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
            <path d="M 60 240 L 96 204 L 132 240 Z" fill="#18181B" />
          </motion.g>

          {/* L3 — deploy: layout + button + swatches */}
          <motion.g {...layer(3)}>
            <rect x="44" y="128" width="200" height="5" rx="2.5" fill="#E2E8F0" />
            <rect x="44" y="140" width="176" height="5" rx="2.5" fill="#E2E8F0" />
            <rect x="44" y="152" width="190" height="5" rx="2.5" fill="#E2E8F0" />
            <rect x="44" y="216" width="112" height="30" rx="6" fill="#C61A1A" />
            <rect x="172" y="224" width="14" height="14" rx="3" fill="#18181B" />
            <rect x="192" y="224" width="14" height="14" rx="3" fill="#64748B" />
            <rect x="212" y="224" width="14" height="14" rx="3" fill="#CBD5E1" />
          </motion.g>

          {/* L4 — detect: performance overlay */}
          <motion.g {...layer(4)}>
            <rect x="292" y="216" width="150" height="72" rx="8" fill="#FFFFFF" stroke="#FECACA" strokeWidth="1.5" />
            <motion.path
              d="M 306 272 C 334 268, 346 254, 366 252 C 388 250, 398 236, 428 230"
              fill="none"
              stroke="#C61A1A"
              strokeWidth="3"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: on(4) ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            />
            <circle cx="428" cy="230" r="4.5" fill="#C61A1A" />
            <path d="M 404 226 L 410 220 M 410 220 L 404 220 M 410 220 L 410 226" stroke="#C61A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
          </motion.g>
        </svg>
      </div>

      {/* layers panel */}
      <div className="rounded-2xl border border-zinc-800 bg-[#18181B] overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.6)]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
          <Layers className="w-3.5 h-3.5 text-[#E83535]" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/60">
            Layers — 5D Process
          </span>
        </div>

        <div className="p-2.5 space-y-1.5">
          {stages.map((s, i) => {
            const active = stage === i;
            const visible = on(i);
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setStage(i)}
                aria-expanded={active}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors cursor-pointer ${
                  active ? 'bg-[#C61A1A]' : 'hover:bg-white/5'
                }`}
              >
                <Eye
                  className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                    active ? 'text-white' : visible ? 'text-white/70' : 'text-white/25'
                  }`}
                  strokeWidth={2.4}
                />
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-extrabold ${
                    active ? 'bg-white text-[#C61A1A]' : visible ? 'bg-white/15 text-white/80' : 'bg-white/5 text-white/35'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-sm font-extrabold uppercase tracking-wide ${
                    active ? 'text-white' : visible ? 'text-white/85' : 'text-white/40'
                  }`}
                >
                  {s.key}
                </span>
                {active && (
                  <motion.span
                    layoutId="gd-layer-bar"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                    transition={{ duration: 0.25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="px-4 pb-4 pt-1 border-t border-zinc-800 min-h-[132px]">
          <motion.p
            key={stage}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-[13px] leading-relaxed text-white/70 border-l-2 border-[#C61A1A] pl-3.5"
          >
            {stages[stage].body}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   4. DIFF — "Version Compare": before/after ledger, X vs check, like a
   design-tool compare view.
   ========================================================================== */

const CheckDrawn: React.FC<{ delay: number }> = ({ delay }) => {
  const reduce = useReducedMotion();
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C61A1A]">
      <motion.svg
        viewBox="0 0 16 16"
        className="w-3 h-3"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      >
        <path
          d="M 3 8.5 L 6.5 12 L 13 4.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
        />
      </motion.svg>
    </span>
  );
};

export const DiffLedger: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-3">
      {/* header — desktop only */}
      <div className="hidden lg:grid grid-cols-[190px_minmax(0,1fr)_minmax(0,1fr)] gap-3 px-1">
        <span />
        <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
          <X className="w-3.5 h-3.5" strokeWidth={3} />
          Before
        </span>
        <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#C61A1A]">
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
          With Digivibz
        </span>
      </div>

      {GD_DIFF.rows.map((row, i) => (
        <motion.div
          key={row.label}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[190px_minmax(0,1fr)_minmax(0,1fr)] gap-3 items-stretch"
        >
          <div className="flex items-center lg:items-start pt-1">
            <span className="text-sm font-extrabold text-slate-900">{row.label}</span>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50/50 px-4 py-3.5">
            <motion.span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#C61A1A]"
              initial={reduce ? false : { scale: 0, rotate: -90 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <X className="w-3 h-3 text-[#C61A1A]" strokeWidth={3.2} />
            </motion.span>
            <p className="text-sm text-slate-500 leading-snug">{row.bad}</p>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.5)]">
            <CheckDrawn delay={0.3 + i * 0.08} />
            <p className="text-sm font-semibold text-slate-800 leading-snug">{row.good}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ==========================================================================
   5. TOOLS — app-icon tiles: monogram badge, name, purpose tagline.
   ========================================================================== */

export const ToolGrid: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {GD_TOOLS.items.map((t, i) => (
        <motion.div
          key={t.name}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
          className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-red-300 hover:shadow-[0_24px_50px_-38px_rgba(198,26,26,0.5)]"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#18181B] text-[#E83535] text-sm font-extrabold tracking-tight transition-colors group-hover:bg-[#C61A1A] group-hover:text-white">
            {t.mono}
          </span>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
              {t.name}
            </h3>
            <p className="mt-0.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#C61A1A]">
              {t.tag}
            </p>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{t.body}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/* ==========================================================================
   6. HERO STATS — the four numbers under the hero copy.
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
