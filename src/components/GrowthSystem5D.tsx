import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface GrowthSystem5DProps {
  onOpenAudit: () => void;
  onScrollToFramework: () => void;
}

/* ==========================================================================
   GEOMETRY — everything derives from these constants so the wheel, brackets
   and text blocks stay perfectly centered & mirrored around the hub.
   Clock angle: 0deg = 12 o'clock, 90deg = 3 o'clock, 180deg = 6 o'clock...
   ========================================================================== */
const CX = 460; // exact horizontal center of the 920-wide viewBox -> perfect mirror symmetry
const CY = 300;
const R_IN = 72; // donut inner radius
const R_OUT = 120; // donut outer radius
const R_RING = 150; // thin outer frame ring
const R_HUB = 70; // white center disc
const R_ICON = (R_IN + R_OUT) / 2; // 96 -> icon band

// Convert a clock angle + radius to cartesian points around (CX, CY)
function polar(r: number, clockDeg: number) {
  const rad = ((clockDeg - 90) * Math.PI) / 180.0;
  return {
    x: +(CX + r * Math.cos(rad)).toFixed(2),
    y: +(CY + r * Math.sin(rad)).toFixed(2),
  };
}

// Annular donut sector path
function makeDonutPath(rIn: number, rOut: number, startDeg: number, endDeg: number) {
  const p1 = polar(rOut, startDeg);
  const p2 = polar(rOut, endDeg);
  const p3 = polar(rIn, endDeg);
  const p4 = polar(rIn, startDeg);
  const largeArc = endDeg - startDeg <= 180 ? 0 : 1;

  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOut} ${rOut} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rIn} ${rIn} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    'Z',
  ].join(' ');
}

/* White line icons drawn inside each colored sector */
const SECTOR_ICONS: Record<string, React.ReactNode> = {
  detect: (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  discover: (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  design: (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  develop: (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
    </svg>
  ),
  deploy: (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v13" />
      <path d="M17 10l-5 5-5-5" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
};

/* The 5 donut sectors + their perfectly centered text blocks */
const SEGMENTS = [
  {
    id: 'detect',
    name: 'Detect',
    color: '#7E22CE',
    hoverColor: '#6B21A8',
    startDeg: 290,
    endDeg: 354,
    midDeg: 322,
    // Centered under the top-left bracket arm (arm spans x: 60 -> 446)
    label: {
      x: 253,
      titleY: 104,
      descY: 136,
      lines: ['Track, optimize, and', 'scale winning', 'strategies.'],
    },
  },
  {
    id: 'discover',
    name: 'Discover',
    color: '#0284C7',
    hoverColor: '#0369A1',
    startDeg: 6,
    endDeg: 70,
    midDeg: 38,
    // Centered under the top-right bracket arm (arm spans x: 474 -> 860)
    label: {
      x: 667,
      titleY: 104,
      descY: 136,
      lines: ['Find what your customers', 'want and where', 'opportunities exist.'],
    },
  },
  {
    id: 'design',
    name: 'Design',
    color: '#C61A1A',
    hoverColor: '#B91C1C',
    startDeg: 78,
    endDeg: 142,
    midDeg: 110,
    // Title + copy sit BELOW the middle-right connector (line spans x: 610 -> 860)
    label: {
      x: 735,
      titleY: 348,
      descY: 380,
      lines: ['Create conversion-focused', 'brand and user', 'experience.'],
    },
  },
  {
    id: 'develop',
    name: 'Develop',
    color: '#15803D',
    hoverColor: '#166534',
    startDeg: 150,
    endDeg: 210,
    midDeg: 180,
    // Bottom-center: perfectly aligned with the hub's vertical axis
    label: {
      x: 460,
      titleY: 482,
      descY: 512,
      lines: ['Build automated systems', 'that generate leads.'],
    },
  },
  {
    id: 'deploy',
    name: 'Deploy',
    color: '#1D4ED8',
    hoverColor: '#1E40AF',
    startDeg: 218,
    endDeg: 282,
    midDeg: 250,
    // Title + copy sit BELOW the middle-left connector (line spans x: 60 -> 310)
    label: {
      x: 185,
      titleY: 348,
      descY: 380,
      lines: ['Launch across SEO, ads,', 'and digital channels.'],
    },
  },
] as const;

/* Connector brackets — every left path has an exact mirror on the right */
interface Bracket {
  id: string;
  d: string;
  color: string;
  hover: string;
  delay: number;
  dim?: boolean;
}

const BRACKETS: Bracket[] = [
  // Detect: rises from the top of the ring, rounds the corner, runs left
  { id: 'detect', d: 'M 458 150 V 72 Q 458 60 446 60 H 60', color: '#7E22CE', hover: '#6B21A8', delay: 0.55 },
  // Discover: exact mirror image on the right side
  { id: 'discover', d: 'M 462 150 V 72 Q 462 60 474 60 H 860', color: '#0284C7', hover: '#0369A1', delay: 0.62 },
  // Deploy: horizontal line from the wheel's 9 o'clock point
  { id: 'deploy', d: 'M 310 300 H 60', color: '#1D4ED8', hover: '#1E40AF', delay: 0.72 },
  // Design: exact mirror image from the wheel's 3 o'clock point
  { id: 'design', d: 'M 610 300 H 860', color: '#C61A1A', hover: '#B91C1C', delay: 0.78 },
  // Develop leg: 45deg diagonal down-right into a horizontal foot
  { id: 'develop', d: 'M 556.42 414.9 L 642 500 Q 650 508 662 508 H 860', color: '#15803D', hover: '#166534', delay: 0.88 },
  // Balance leg (exact mirror of the Develop leg) closing the composition bottom-left
  { id: 'deploy', d: 'M 363.58 414.9 L 278 500 Q 270 508 258 508 H 60', color: '#1D4ED8', hover: '#1E40AF', delay: 0.94, dim: true },
];

export const GrowthSystem5D: React.FC<GrowthSystem5DProps> = ({ onOpenAudit, onScrollToFramework }) => {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const enter = (delay: number) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, amount: 0.2 as const },
          transition: { duration: 0.5, delay },
        };

  return (
    <div className="w-full flex flex-col items-center select-none">

      {/* ==================================================================
          DESKTOP & TABLET: Pure SVG vector chart — mathematically aligned
          brackets, centered labels, mirrored left/right composition
          ================================================================== */}
      <div className="hidden md:flex w-full max-w-[560px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[740px] items-center justify-center">
        <svg
          viewBox="0 0 920 600"
          className="w-full h-auto drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="The DIGIVIBZ 5D Growth System: Detect, Discover, Design, Develop and Deploy"
        >
          <defs>
            <filter id="hub-shadow" x="-25%" y="-25%" width="150%" height="150%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#0f172a" floodOpacity="0.10" />
            </filter>
            <filter id="play-shadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C61A1A" floodOpacity="0.4" />
            </filter>
            <filter id="sector-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="4" stdDeviation="7" floodColor="#0f172a" floodOpacity="0.22" />
            </filter>
          </defs>

          {/* ------------------------------------------------------------
              0. AMBIENT BACKGROUND — slowly orbiting dashed rings
              ------------------------------------------------------------ */}
          <circle
            cx={CX}
            cy={CY}
            r={166}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.1"
            strokeDasharray="2 11"
            strokeLinecap="round"
            opacity="0.38"
            className="dz-orbit-ring pointer-events-none"
          />
          <circle
            cx={CX}
            cy={CY}
            r={182}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1"
            strokeDasharray="1 16"
            strokeLinecap="round"
            opacity="0.3"
            className="dz-orbit-ring-reverse pointer-events-none"
          />

          {/* ------------------------------------------------------------
              1. CONNECTOR BRACKETS (draw themselves in on reveal)
              ------------------------------------------------------------ */}
          {BRACKETS.map((b, i) => {
            const isHot = hoveredStage === b.id;
            return (
              <g key={`${b.id}-${i}`} className="pointer-events-none">
                <motion.path
                  d={b.d}
                  fill="none"
                  stroke={isHot ? b.hover : b.color}
                  strokeWidth={isHot ? 2.6 : 1.75}
                  strokeLinecap="round"
                  opacity={b.dim && !isHot ? 0.8 : 1}
                  className="transition-all duration-200"
                  initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.05, delay: b.delay, ease: 'easeInOut' }}
                />
                {/* Energy current flowing toward the wheel on hover */}
                {isHot && (
                  <path
                    d={b.d}
                    fill="none"
                    stroke={b.hover}
                    strokeWidth={2.8}
                    strokeLinecap="round"
                    strokeDasharray="6 12"
                    className="dz-flow"
                    opacity={0.85}
                  />
                )}
              </g>
            );
          })}

          {/* Outer thin frame ring */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={R_RING}
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="1.2"
            opacity="0.75"
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, delay: 0.35, ease: 'easeInOut' }}
          />

          {/* ------------------------------------------------------------
              2. THE 5 DONUT SECTORS + WHITE ICONS
              ------------------------------------------------------------ */}
          {SEGMENTS.map((seg, i) => {
            const isHot = hoveredStage === seg.id;
            const iconPos = polar(R_ICON, seg.midDeg);
            // Radial lift vector: pushes the slice outward along its own angle
            const liftX = +(Math.sin((seg.midDeg * Math.PI) / 180) * 7).toFixed(2);
            const liftY = +(-Math.cos((seg.midDeg * Math.PI) / 180) * 7).toFixed(2);

            return (
              <motion.g
                key={seg.id}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.65 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.09,
                  ease: [0.34, 1.4, 0.64, 1],
                }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              >
                <motion.g
                  className="cursor-pointer"
                  animate={{ x: isHot ? liftX : 0, y: isHot ? liftY : 0, scale: isHot ? 1.05 : 1 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 24 }}
                  style={{ transformOrigin: `${iconPos.x}px ${iconPos.y}px` }}
                  onMouseEnter={() => setHoveredStage(seg.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                  onClick={onScrollToFramework}
                >
                  <path
                    d={makeDonutPath(R_IN, R_OUT, seg.startDeg, seg.endDeg)}
                    fill={seg.color}
                    filter={isHot ? 'url(#sector-glow)' : undefined}
                    className="transition-[filter] duration-200"
                  />
                  <g transform={`translate(${iconPos.x - 10.5}, ${iconPos.y - 10.5})`} className="pointer-events-none">
                    {SECTOR_ICONS[seg.id]}
                  </g>
                  <title>{seg.name}</title>
                </motion.g>
              </motion.g>
            );
          })}

          {/* ------------------------------------------------------------
              3. CENTER HUB — white disc, "5d", DIGIVIBZ & play button
              ------------------------------------------------------------ */}
          <motion.g
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.95 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <circle cx={CX} cy={CY} r={R_HUB} fill="#FFFFFF" filter="url(#hub-shadow)" />

            <text
              x={CX}
              y={CY - 24}
              textAnchor="middle"
              fill="#C61A1A"
              fontSize="24"
              fontWeight="900"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="-0.5px"
            >
              5d
            </text>

            <text
              x={CX}
              y={CY - 11}
              textAnchor="middle"
              fill="#64748B"
              fontSize="9"
              fontWeight="600"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              Growth System by
            </text>

            <text
              x={CX}
              y={CY + 4}
              textAnchor="middle"
              fontSize="11"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.8px"
            >
              <tspan fill="#0F172A" fontWeight="900">DIGI</tspan>
              <tspan fill="#C61A1A" fontWeight="900">VIBZ</tspan>
            </text>

            {/* Interactive play button with pulsing ripples */}
            <g className="cursor-pointer" onClick={onOpenAudit}>
              {!reduceMotion && (
                <>
                  <circle
                    cx={CX}
                    cy={CY + 27}
                    r="15"
                    fill="#C61A1A"
                    opacity="0.4"
                    style={{
                      transformOrigin: `${CX}px ${CY + 27}px`,
                      animation: 'dz-pulse-ring 2.6s ease-out infinite',
                    }}
                  />
                  <circle
                    cx={CX}
                    cy={CY + 27}
                    r="15"
                    fill="#C61A1A"
                    opacity="0.4"
                    style={{
                      transformOrigin: `${CX}px ${CY + 27}px`,
                      animation: 'dz-pulse-ring 2.6s ease-out infinite',
                      animationDelay: '1.3s',
                    }}
                  />
                </>
              )}
              <circle cx={CX} cy={CY + 27} r="15" fill="#C61A1A" filter="url(#play-shadow)" />
              <polygon
                points={`${CX - 3.5},${CY + 21.5} ${CX + 5.5},${CY + 27} ${CX - 3.5},${CY + 32.5}`}
                fill="#FFFFFF"
                className="pointer-events-none transition-transform duration-200 group-hover:translate-x-0.5"
              />
              <title>Get your free growth audit</title>
            </g>
          </motion.g>

          {/* ------------------------------------------------------------
              4. THE 5 TEXT BLOCKS — each centered on its own bracket
              ------------------------------------------------------------ */}
          {SEGMENTS.map((seg, i) => {
            const isHot = hoveredStage === seg.id;
            return (
              <motion.g
                key={`label-${seg.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.75 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredStage(seg.id)}
                onMouseLeave={() => setHoveredStage(null)}
                onClick={onScrollToFramework}
              >
                <text
                  x={seg.label.x}
                  y={seg.label.titleY}
                  textAnchor="middle"
                  fill={isHot ? seg.hoverColor : seg.color}
                  fontSize="26"
                  fontWeight="800"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  letterSpacing="-0.5px"
                  className="transition-colors duration-200"
                >
                  {seg.name}
                </text>
                <text
                  x={seg.label.x}
                  y={seg.label.descY}
                  textAnchor="middle"
                  fill="#475569"
                  fontSize="14.5"
                  fontWeight="500"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  opacity={isHot ? 1 : 0.85}
                  className="transition-opacity duration-200"
                >
                  {seg.label.lines.map((line, li) => (
                    <tspan key={li} x={seg.label.x} dy={li === 0 ? 0 : 22}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </motion.g>
            );
          })}

        </svg>
      </div>

      {/* ==================================================================
          MOBILE VIEW (< 768px): Scaled vector hub + touch-friendly cards
          ================================================================== */}
      <div className="flex md:hidden flex-col items-center w-full space-y-4">

        {/* Crisp central vector wheel with play button */}
        <div className="relative w-[240px] sm:w-[280px] aspect-square flex items-center justify-center">
          <svg
            viewBox="302 142 316 316"
            className="w-full h-full drop-shadow-sm"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="The DIGIVIBZ 5D Growth System wheel"
          >
            <defs>
              <filter id="hub-shadow-mob" x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.10" />
              </filter>
            </defs>

            <circle cx={CX} cy={CY} r={R_RING} fill="none" stroke="#CBD5E1" strokeWidth="1.2" opacity="0.8" />

            {SEGMENTS.map((seg) => {
              const iconPos = polar(R_ICON, seg.midDeg);
              return (
                <g key={seg.id} className="cursor-pointer" onClick={onScrollToFramework}>
                  <path d={makeDonutPath(R_IN, R_OUT, seg.startDeg, seg.endDeg)} fill={seg.color} />
                  <g transform={`translate(${iconPos.x - 10.5}, ${iconPos.y - 10.5})`}>
                    {SECTOR_ICONS[seg.id]}
                  </g>
                  <title>{seg.name}</title>
                </g>
              );
            })}

            <circle cx={CX} cy={CY} r={R_HUB} fill="#FFFFFF" filter="url(#hub-shadow-mob)" />

            <text x={CX} y={CY - 24} textAnchor="middle" fill="#C61A1A" fontSize="24" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif">
              5d
            </text>
            <text x={CX} y={CY - 11} textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">
              Growth System by
            </text>
            <text x={CX} y={CY + 4} textAnchor="middle" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">
              <tspan fill="#0F172A" fontWeight="900">DIGI</tspan>
              <tspan fill="#C61A1A" fontWeight="900">VIBZ</tspan>
            </text>

            <g className="cursor-pointer" onClick={onOpenAudit}>
              <circle cx={CX} cy={CY + 27} r="15" fill="#C61A1A" />
              <polygon
                points={`${CX - 3.5},${CY + 21.5} ${CX + 5.5},${CY + 27} ${CX - 3.5},${CY + 32.5}`}
                fill="#FFFFFF"
              />
              <title>Get your free growth audit</title>
            </g>
          </svg>
        </div>

        {/* Mobile stage cards: fully readable with generous touch targets */}
        <motion.div
          className="w-full space-y-2.5 px-2"
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          <div className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider pb-1">
            The AI-Powered 5D Growth Framework
          </div>
          {SEGMENTS.map((seg) => (
            <motion.div
              key={seg.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              onClick={onScrollToFramework}
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer shadow-2xs"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                  <span className="font-bold text-base" style={{ color: seg.color }}>
                    {seg.name}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  Learn more →
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-snug pl-5">
                {seg.label.lines.join(' ')}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>

    </div>
  );
};
