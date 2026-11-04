import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Code2,
  Compass,
  Crosshair,
  Facebook,
  Instagram,
  Linkedin,
  LineChart,
  Palette,
  PenTool,
  Repeat,
  Rocket,
  Search,
  Target,
} from 'lucide-react';
import { CountUp } from '../CountUp';
import {
  SMM_FRAMEWORK,
  SMM_OUTCOMES,
  SMM_PLATFORMS,
  SMM_SYSTEM,
  SmmPlatformId,
} from '../../data/socialMediaContent';

/* ==========================================================================
   Platform brand glyphs — lucide has no TikTok, and X replaced the bird.
   Both drawn as monochrome fills so they stay inside the brand palette.
   ========================================================================== */

const XLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.899 15.644Z"
    />
  </svg>
);

const TikTokLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
  </svg>
);

export const PlatformGlyph: React.FC<{ id: SmmPlatformId; className?: string }> = ({
  id,
  className = 'w-4 h-4',
}) => {
  switch (id) {
    case 'facebook':
      return <Facebook className={className} strokeWidth={2} />;
    case 'instagram':
      return <Instagram className={className} strokeWidth={2} />;
    case 'linkedin':
      return <Linkedin className={className} strokeWidth={2} />;
    case 'twitter':
      return <XLogo className={className} />;
    case 'tiktok':
      return <TikTokLogo className={className} />;
  }
};

/* ==========================================================================
   1. HERO ORBIT — five platforms and five disciplines circling the 5D
   engine. Same radial language as the home wheel and the services
   capability map: dashed tracks, counter-spinning chips, reactor hub.
   ========================================================================== */

/** Outer ring — where the work publishes and amplifies. */
const ORBIT_PLATFORMS: SmmPlatformId[] = ['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'];

/** Inner ring — the disciplines the engine runs on every platform. */
const ORBIT_DISCIPLINES = ['Strategy', 'Content', 'Paid Ads', 'Community', 'Analytics'];

/** Readout strip under the orbit — the numbers the system moves. */
const ORBIT_READOUT = [
  { label: 'Reach', value: '3X' },
  { label: 'Engagement', value: '4.8%' },
  { label: 'Leads / mo', value: '120+' },
];

export const SocialEngineHero: React.FC = () => {
  const reduce = useReducedMotion();
  const spin = (name: string) => (reduce ? '' : name);

  /**
   * One orbiting ring: rotate the frame to `angle`, un-tilt the chip, then
   * counter-spin it so labels stay upright while the ring rotates — the
   * same technique as the services capability map.
   */
  const orbitRing = (
    inset: string,
    ringSpin: string,
    chipSpin: string,
    chips: React.ReactNode[],
    offset = 0,
  ) => (
    <div className={`absolute ${inset} ${spin(ringSpin)}`}>
      {chips.map((chip, i) => {
        const angle = (360 / chips.length) * i + offset;
        return (
          <div key={i} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
            <div
              className="absolute left-1/2 top-0"
              style={{ transform: `translate(-50%, -50%) rotate(${-angle}deg)` }}
            >
              <div className={spin(chipSpin)}>{chip}</div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const platformChips = ORBIT_PLATFORMS.map((id) => (
    <span
      key={id}
      className="flex w-11 h-11 sm:w-12 sm:h-12 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-[0_10px_24px_-14px_rgba(15,23,42,0.45)]"
    >
      <PlatformGlyph id={id} className="w-5 h-5 text-[#C61A1A]" />
    </span>
  ));

  const disciplineChips = ORBIT_DISCIPLINES.map((name) => (
    <span
      key={name}
      className="flex h-7 items-center whitespace-nowrap rounded-full bg-white border border-slate-200 px-3 text-[9px] font-extrabold uppercase tracking-[0.12em] text-slate-600 shadow-[0_8px_20px_-14px_rgba(15,23,42,0.4)]"
    >
      {name}
    </span>
  ));

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_30px_70px_-42px_rgba(15,23,42,0.45)]">
      {/* console header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50/80">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
          Live Growth System
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Social · 5D Engine
        </span>
      </div>

      <div className="p-4 sm:p-5">
        {/* ------------------------------------------------------ orbit map */}
        <div className="relative w-full max-w-[430px] aspect-square mx-auto" aria-hidden="true">
          {/* soft red glow behind the hub */}
          <div
            className="absolute inset-[16%] rounded-full blur-2xl opacity-70 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(198,26,26,0.16) 0%, transparent 70%)',
            }}
          />

          {/* corner captions */}
          <span className="absolute left-0 top-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-500 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
            Always On
          </span>
          <span className="absolute right-0 bottom-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#C61A1A] shadow-xs">
            5 Platforms
          </span>

          {/* ring tracks */}
          <div className="absolute inset-[8%] rounded-full border border-dashed border-slate-200" />
          <div className="absolute inset-[26%] rounded-full border border-dashed border-red-100" />
          <div
            className={`absolute inset-[17%] rounded-full border border-dashed border-slate-100 ${spin(
              'dz-spin',
            )}`}
          />

          {/* outer orbit: platform chips */}
          {orbitRing('inset-[8%]', 'dz-spin', 'dz-spin-rev', platformChips)}

          {/* inner orbit: discipline pills, opposite direction */}
          {orbitRing('inset-[26%]', 'dz-spin-back', 'dz-spin-back-rev', disciplineChips, 18)}

          {/* pulse halo */}
          {!reduce && (
            <div className="absolute inset-0 m-auto w-[34%] h-[34%] rounded-full border-2 border-[#C61A1A]/45 dz-pulse-ring pointer-events-none" />
          )}

          {/* reactor hub */}
          <div className="absolute inset-0 m-auto w-[34%] h-[34%] rounded-full bg-[#18181B] border border-[#C61A1A]/70 text-white flex flex-col items-center justify-center text-center shadow-[0_24px_60px_-18px_rgba(198,26,26,0.55)]">
            <span className="text-xl sm:text-3xl font-extrabold leading-none tracking-tight">
              5<span className="text-[#C61A1A]">d</span>
            </span>
            <span className="mt-1 text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.14em] text-white/75">
              Social Engine
            </span>
            <span className="hidden sm:block mt-1 pt-1 w-[64%] border-t border-white/25 text-[7px] font-semibold uppercase tracking-[0.1em] text-white/60">
              5 Disciplines
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------ readout */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3.5">
          {ORBIT_READOUT.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2"
            >
              <span className="block text-[8px] font-bold uppercase tracking-[0.14em] text-slate-400">
                {metric.label}
              </span>
              <span className="mt-0.5 block text-lg sm:text-xl font-extrabold text-[#18181B] tabular-nums leading-none">
                <CountUp value={metric.value} />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* kinetic ticker */}
      <div className="border-t border-slate-100 bg-[#18181B] py-2 overflow-hidden dz-marquee">
        <div
          className="dz-marquee-track flex w-max items-center gap-6 text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/70"
          style={{ animationDuration: '26s' }}
        >
          {[...Array(2)].flatMap((_, dup) =>
            ['Strategy', 'Content', 'Targeting', 'Optimization', 'Revenue'].map((word) => (
              <span key={`${dup}-${word}`} className="flex items-center gap-6 whitespace-nowrap">
                {word}
                <span className="w-1.5 h-1.5 bg-[#C61A1A] rotate-45" />
              </span>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   2. BUSY-VS-FLAT CHART — activity climbs, results stay flat.
   ========================================================================== */

const ACTIVITY_PTS = [
  [40, 236],
  [124, 220],
  [208, 198],
  [292, 178],
  [376, 152],
  [460, 126],
  [540, 96],
] as const;

const RESULTS_PTS = [
  [40, 262],
  [124, 260],
  [208, 263],
  [292, 259],
  [376, 262],
  [460, 260],
  [540, 261],
] as const;

const toPath = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');

export const BusyFlatChart: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.4)]">
      <div className="flex items-center justify-between mb-3">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
          Activity vs. Results
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          The effort gap
        </span>
      </div>

      <svg viewBox="0 0 580 300" className="w-full h-auto select-none" role="img"
        aria-label="Line chart: social media activity keeps climbing while business results stay flat">
        {/* grid */}
        {[60, 110, 160, 210].map((y) => (
          <line key={y} x1="30" y1={y} x2="556" y2={y} stroke="#E2E8F0" strokeWidth="1" />
        ))}
        <line x1="30" y1="278" x2="556" y2="278" stroke="#CBD5E1" strokeWidth="1.5" />
        <text x="30" y="294" fontSize="9" fontWeight="800" fill="#94A3B8" letterSpacing="1.5">
          THEN
        </text>
        <text x="556" y="294" fontSize="9" fontWeight="800" fill="#94A3B8" letterSpacing="1.5" textAnchor="end">
          NOW
        </text>

        {/* flat results line */}
        <motion.path
          d={toPath(RESULTS_PTS)}
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, delay: 0.35, ease: 'easeInOut' }}
        />

        {/* climbing activity line */}
        <motion.path
          d={toPath(ACTIVITY_PTS)}
          fill="none"
          stroke="#C61A1A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* vertex dots */}
        {ACTIVITY_PTS.map(([x, y], i) => (
          <motion.circle
            key={`a-${i}`}
            cx={x}
            cy={y}
            r={i === ACTIVITY_PTS.length - 1 ? 6 : 4}
            fill={i === ACTIVITY_PTS.length - 1 ? '#C61A1A' : '#FFFFFF'}
            stroke="#C61A1A"
            strokeWidth="2.5"
            initial={reduce ? false : { opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.7 + i * 0.13, duration: 0.35 }}
            style={{ transformOrigin: `${x}px ${y}px` }}
          />
        ))}
        {!reduce && (
          <motion.circle
            cx={540}
            cy={96}
            r="6"
            fill="none"
            stroke="#C61A1A"
            strokeWidth="2"
            initial={{ opacity: 0.6, scale: 1 }}
            whileInView={{ opacity: [0.6, 0, 0.6], scale: [1, 2.4, 1] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2.2, delay: 1.6, repeat: Infinity, repeatDelay: 0.6 }}
            style={{ transformOrigin: '540px 96px' }}
          />
        )}

        {/* end chips */}
        <motion.g
          initial={reduce ? false : { opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 1.35, duration: 0.45 }}
        >
          <rect x="398" y="42" width="158" height="28" rx="14" fill="#C61A1A" />
          <text
            x="477"
            y="60"
            fontSize="11.5"
            fontWeight="800"
            fill="#FFFFFF"
            textAnchor="middle"
            letterSpacing="0.3"
          >
            Your activity keeps climbing
          </text>
        </motion.g>

        <motion.g
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 1.55, duration: 0.45 }}
        >
          <rect x="398" y="216" width="158" height="28" rx="14" fill="#F1F5F9" stroke="#E2E8F0" />
          <text
            x="477"
            y="234"
            fontSize="11.5"
            fontWeight="800"
            fill="#64748B"
            textAnchor="middle"
            letterSpacing="0.3"
          >
            Your results stay flat
          </text>
        </motion.g>
      </svg>

      <div className="mt-2 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 rounded bg-[#C61A1A]" /> Posts, ads, activity
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 rounded bg-slate-400" /> Leads, sales, revenue
        </span>
      </div>
    </div>
  );
};

/* ==========================================================================
   3. PILLAR STEPPER — five system pillars, each with its own micro-diagram.
   ========================================================================== */

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  strategy: <Compass className="w-5 h-5 text-[#C61A1A]" />,
  content: <PenTool className="w-5 h-5 text-[#C61A1A]" />,
  campaigns: <Target className="w-5 h-5 text-[#C61A1A]" />,
  targeting: <Crosshair className="w-5 h-5 text-[#C61A1A]" />,
  optimization: <Repeat className="w-5 h-5 text-[#C61A1A]" />,
};

const PillarDiagram: React.FC<{ id: string }> = ({ id }) => {
  const reduce = useReducedMotion();
  const label = (x: number, text: string) => (
    <text x={x} y="62" fontSize="9" fontWeight="700" fill="#64748B" textAnchor="middle">
      {text}
    </text>
  );

  return (
    <svg viewBox="0 0 260 74" className="w-full max-w-[300px] h-auto select-none" aria-hidden="true">
      {id === 'strategy' && (
        <>
          <path d="M46 30 H 116 M 146 30 H 214" stroke="#CBD5E1" strokeWidth="1.6" strokeDasharray="5 5" />
          <circle cx="32" cy="30" r="13" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="130" cy="30" r="13" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="228" cy="30" r="13" fill="#C61A1A" />
          <path d="M223 30 l3.5 3.5 L234 26" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {label(32, 'Audience')}
          {label(130, 'Market')}
          {label(228, 'Goals')}
        </>
      )}

      {id === 'content' && (
        <>
          {[
            { x: 4, w: 74, t: 'Attention', op: 0.35 },
            { x: 93, w: 74, t: 'Interest', op: 0.65 },
            { x: 182, w: 74, t: 'Action', op: 1 },
          ].map((c) => (
            <g key={c.t}>
              <rect
                x={c.x}
                y="14"
                width={c.w}
                height="32"
                rx="9"
                fill="#C61A1A"
                opacity={c.op}
              />
              <text
                x={c.x + c.w / 2}
                y="34"
                fontSize="10"
                fontWeight="800"
                fill="#FFFFFF"
                textAnchor="middle"
              >
                {c.t}
              </text>
            </g>
          ))}
          <path d="M80 30 H 90 M 169 30 H 179" stroke="#C61A1A" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {id === 'campaigns' && (
        <>
          {[26, 44, 62, 84].map((h, i) => (
            <rect
              key={i}
              x={30 + i * 52}
              y={56 - h}
              width="34"
              height={h}
              rx="5"
              fill="#C61A1A"
              opacity={0.3 + i * 0.23}
            />
          ))}
          <path d="M30 62 H 236" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M196 18 L 226 8"
            stroke="#18181B"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M217 7 L 227 7.5 L 224 17" stroke="#18181B" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {id === 'targeting' && (
        <>
          <circle cx="130" cy="32" r="30" fill="none" stroke="#E2E8F0" strokeWidth="2" />
          <circle cx="130" cy="32" r="19" fill="none" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="130" cy="32" r="9" fill="none" stroke="#FCA5A5" strokeWidth="2" />
          <circle cx="130" cy="32" r="4.5" fill="#C61A1A" />
          <path d="M130 0 V 8 M 130 56 V 64 M 66 32 H 74 M 186 32 H 194" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" />
          {!reduce && (
            <circle cx="130" cy="32" r="30" fill="none" stroke="#C61A1A" strokeWidth="1.5" strokeDasharray="4 8" className="dz-orbit-ring" style={{ transformOrigin: '130px 32px' }} />
          )}
        </>
      )}

      {id === 'optimization' && (
        <>
          <g className={reduce ? undefined : 'dz-spin'} style={{ transformOrigin: '130px 32px' }}>
            <path
              d="M130 8 A 24 24 0 0 1 154 32"
              fill="none"
              stroke="#C61A1A"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path d="M150 25 L 155 33 L 147 35" fill="none" stroke="#C61A1A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M130 56 A 24 24 0 0 1 106 32"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path d="M110 39 L 105 31 L 113 29" fill="none" stroke="#CBD5E1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <circle cx="130" cy="32" r="6" fill="#18181B" />
        </>
      )}
    </svg>
  );
};

export const PillarStepper: React.FC = () => {
  const reduce = useReducedMotion();
  const pillars = SMM_SYSTEM.pillars;
  const [activeId, setActiveId] = useState(pillars[0].id);
  const activeIndex = pillars.findIndex((p) => p.id === activeId);
  const active = pillars[activeIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* ------------------------------------------------------- pillar rail */}
      <div className="lg:col-span-5 relative">
        <span className="absolute left-[27px] top-6 bottom-6 w-0 border-l border-dashed border-slate-200" aria-hidden="true" />
        <div className="space-y-2 relative">
          {pillars.map((pillar, i) => {
            const isActive = pillar.id === activeId;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveId(pillar.id)}
                aria-pressed={isActive}
                className={`relative w-full flex items-center gap-4 rounded-xl p-3 text-left transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white border border-red-200 shadow-[0_16px_36px_-24px_rgba(198,26,26,0.5)]'
                    : 'bg-transparent border border-transparent hover:bg-white hover:border-slate-200'
                }`}
              >
                <span
                  className={`relative z-10 w-11 h-11 shrink-0 rounded-full border-2 flex items-center justify-center text-sm font-extrabold tabular-nums transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C61A1A] border-[#C61A1A] text-white shadow-[0_10px_22px_-10px_rgba(198,26,26,0.7)]'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-sm sm:text-[15px] font-bold leading-snug transition-colors ${
                    isActive ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  {pillar.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ----------------------------------------------------- detail panel */}
      <div className="lg:col-span-7">
        <div className="relative rounded-3xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7 min-h-[440px] sm:min-h-[420px] overflow-hidden">
          <span className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(198,26,26,0.10),transparent_70%)] pointer-events-none" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-white border border-red-100 text-[#C61A1A] shadow-xs">
                  {PILLAR_ICONS[active.id]}
                </span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#C61A1A]">
                  Pillar {String(activeIndex + 1).padStart(2, '0')} / {String(pillars.length).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-4 text-lg sm:text-2xl font-extrabold text-slate-90 tracking-tight leading-snug">
                {active.title}
              </h3>

              <div className="mt-3 space-y-2.5">
                {active.paras.map((p, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {active.bullets && (
                <div className="mt-4 space-y-2">
                  {active.bullets.map((b, i) => (
                    <motion.div
                      key={b}
                      initial={reduce ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.08, duration: 0.35 }}
                      className="flex items-center gap-2.5 text-sm font-medium text-slate-700"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#C61A1A] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                      {b}
                    </motion.div>
                  ))}
                </div>
              )}

              {active.closing && (
                <div className="mt-4 space-y-2.5">
                  {active.closing.map((c, i) => (
                    <p key={i} className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {c}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-5 pt-4 border-t border-slate-200/80 flex justify-center">
                <PillarDiagram id={active.id} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   4. PLATFORM CONSOLE — five platforms, one animated tab panel.
   ========================================================================== */

export const PlatformConsole: React.FC = () => {
  const reduce = useReducedMotion();
  const platforms = SMM_PLATFORMS.platforms;
  const [activeId, setActiveId] = useState<SmmPlatformId>(platforms[0].id);
  const active = platforms.find((p) => p.id === activeId)!;

  return (
    <div>
      {/* tab rail */}
      <div className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center scrollbar-thin">
        {platforms.map((p) => {
          const isActive = p.id === activeId;
          return (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              aria-pressed={isActive}
              className={`shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-[#18181B] text-white shadow-[0_14px_30px_-16px_rgba(24,24,27,0.7)] scale-[1.02]'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <PlatformGlyph id={p.id} className="w-4 h-4" />
              {p.tab}
            </button>
          );
        })}
      </div>

      {/* panel */}
      <div className="mt-5 relative rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-[0_26px_60px_-40px_rgba(15,23,42,0.4)]">
        <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#C61A1A] via-[#C61A1A]/40 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 sm:p-7"
          >
            {/* copy side */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#C61A1A] text-[11px] font-extrabold uppercase tracking-widest">
                <PlatformGlyph id={active.id} className="w-3.5 h-3.5" />
                {active.tab}
              </span>
              <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {active.title}
              </h3>
              <div className="mt-3 space-y-2.5">
                {active.paras.map((p, i) => (
                  <p key={i} className="text-sm text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              {active.closing && (
                <div className="mt-4 p-3.5 rounded-xl bg-[#18181B] text-white text-sm font-semibold leading-relaxed">
                  {active.closing}
                </div>
              )}
            </div>

            {/* checklist side */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5">
              <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C61A1A] animate-pulse" />
                {active.listLabel}
              </span>
              <div className="mt-4 space-y-2.5">
                {active.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={reduce ? false : { opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-2.5 rounded-lg bg-white border border-slate-200 px-3 py-2.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C61A1A] mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700 font-medium leading-snug">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. 5D FRAMEWORK RAIL — progress line grows to the selected stage.
   ========================================================================== */

const FRAMEWORK_ICONS = [
  <Search key="s" className="w-4 h-4 md:w-5 md:h-5" />,
  <Palette key="p" className="w-4 h-4 md:w-5 md:h-5" />,
  <Code2 key="c" className="w-4 h-4 md:w-5 md:h-5" />,
  <Rocket key="r" className="w-4 h-4 md:w-5 md:h-5" />,
  <LineChart key="l" className="w-4 h-4 md:w-5 md:h-5" />,
];

export const FrameworkRail: React.FC = () => {
  const reduce = useReducedMotion();
  const steps = SMM_FRAMEWORK.steps;
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* rail */}
      <div className="relative">
        {/* dashed base track */}
        <span
          className="hidden sm:block absolute left-[10%] right-[10%] top-5 md:top-7 border-t border-dashed border-slate-200"
          aria-hidden="true"
        />
        {/* red progress track */}
        <motion.span
          className="hidden sm:block absolute left-[10%] top-5 md:top-7 h-0.5 bg-[#C61A1A]"
          animate={{ width: `${active * 20}%` }}
          transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-5 gap-1 sm:gap-2">
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <button
                key={step.name}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className="group flex flex-col items-center gap-1.5 sm:gap-2.5 cursor-pointer"
              >
                <span
                  className={`relative w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#C61A1A] border-[#C61A1A] text-white shadow-[0_14px_30px_-12px_rgba(198,26,26,0.7)]'
                      : 'bg-white border-slate-200 text-slate-500 group-hover:border-red-300 group-hover:text-[#C61A1A]'
                  }`}
                >
                  {FRAMEWORK_ICONS[i]}
                  {isActive && !reduce && (
                    <span className="absolute inset-0 rounded-full border-2 border-[#C61A1A] dz-pulse-ring" />
                  )}
                </span>
                <span
                  className={`text-[11px] sm:text-sm font-extrabold transition-colors ${
                    isActive ? 'text-[#C61A1A]' : 'text-slate-700'
                  }`}
                >
                  {step.name}
                </span>
                <span className="hidden sm:block text-[10px] font-bold tabular-nums text-slate-400">
                  {String(i + 1).padStart(2, '0')} / 05
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* detail */}
      <div className="mt-7 rounded-3xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7 min-h-[190px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
          >
            <span
              className="hidden sm:block text-6xl font-extrabold leading-none text-transparent shrink-0 select-none"
              style={{ WebkitTextStroke: '2px #E2E8F0' }}
              aria-hidden="true"
            >
              {String(active + 1).padStart(2, '0')}
            </span>
            <div>
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-[#18181B] text-white flex items-center justify-center">
                  {FRAMEWORK_ICONS[active]}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {steps[active].name}
                </h3>
              </div>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
                {steps[active].desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ==========================================================================
   6. OUTCOME ROWS — from-state chip → flowing arrow → to-state chip.
   ========================================================================== */

export const OutcomeRows: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="space-y-3.5">
      {SMM_OUTCOMES.rows.map((row, i) => (
        <motion.div
          key={row.to}
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="group relative rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 overflow-hidden hover:border-red-300 hover:shadow-[0_24px_50px_-32px_rgba(198,26,26,0.4)] transition-all duration-300"
        >
          <span className="absolute top-0 left-0 h-0.5 w-0 bg-[#C61A1A] group-hover:w-full transition-all duration-500" />

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 text-xs sm:text-sm font-bold">
              {row.from}
            </span>

            <span
              className={`inline-flex items-center transition-transform duration-300 group-hover:translate-x-1 ${
                reduce ? '' : 'dz-float'
              }`}
              style={reduce ? undefined : { animationDelay: `${i * 0.5}s`, animationDuration: '4s' }}
              aria-hidden="true"
            >
              <svg width="46" height="12" viewBox="0 0 46 12" fill="none" className="text-[#C61A1A]">
                <path
                  d="M0 6 H36"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  className={reduce ? undefined : 'dz-flow'}
                />
                <path
                  d="M33 2 L39 6 L33 10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="px-3 py-1.5 rounded-lg bg-[#C61A1A] text-white text-xs sm:text-sm font-extrabold shadow-[0_12px_26px_-16px_rgba(198,26,26,0.8)]">
              {row.to}
            </span>
          </div>

          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{row.sub}</p>
        </motion.div>
      ))}
    </div>
  );
};

/** Small shared CTA arrow used by page-level buttons. */
export const CTAArrow: React.FC = () => (
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
);
