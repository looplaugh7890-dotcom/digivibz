import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ProjectMockupProps {
  /** Which composition to draw — matches the client's industry. */
  variant: 'finance' | 'legal';
  /** Floating red metric badge (e.g. "2.3X"). */
  metric: string;
  /** Shown in the browser URL bar. */
  url: string;
  className?: string;
}

/**
 * ProjectMockup — a hand-drawn browser mockup of the client work.
 * Replaces stock photography with something on-brand: white surface,
 * slate skeletons, brand-red accents, and a dashed flow line that
 * traces the conversion path (same `dz-flow` motion as the site diagrams).
 */
export const ProjectMockup: React.FC<ProjectMockupProps> = ({
  variant,
  metric,
  url,
  className = '',
}) => {
  const reduceMotion = useReducedMotion();
  const flow = reduceMotion ? undefined : { className: 'dz-flow' };

  return (
    <svg
      viewBox="0 0 560 340"
      className={`w-full select-none ${className}`}
      role="img"
      aria-label={
        variant === 'finance'
          ? `Mockup of the Atlas Financial Consulting website rebuild — ${metric}`
          : `Mockup of the Northbridge Legal Advisors website rebuild — ${metric}`
      }
    >
      {/* -------------------------------------------------- browser shell */}
      <rect x="8" y="8" width="544" height="324" rx="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <line x1="8" y1="46" x2="552" y2="46" stroke="#F1F5F9" strokeWidth="1.5" />
      <circle cx="32" cy="27" r="5" fill="#C61A1A" />
      <circle cx="50" cy="27" r="5" fill="#E2E8F0" />
      <circle cx="68" cy="27" r="5" fill="#E2E8F0" />
      <rect x="92" y="17" width="250" height="20" rx="10" fill="#F8FAFC" stroke="#F1F5F9" strokeWidth="1" />
      <text x="106" y="31" fontSize="10" fontWeight="600" fill="#94A3B8" letterSpacing="0.3">
        {url}
      </text>
      <rect x="512" y="19" width="24" height="16" rx="5" fill="#F1F5F9" />

      {variant === 'finance' ? (
        /* ================================================== finance layout */
        <g>
          {/* headline skeleton */}
          <rect x="32" y="68" width="272" height="14" rx="7" fill="#E2E8F0" />
          <rect x="32" y="92" width="208" height="14" rx="7" fill="#F1F5F9" />
          <rect x="32" y="116" width="148" height="10" rx="5" fill="#F1F5F9" />

          {/* red CTA */}
          <rect x="32" y="140" width="104" height="30" rx="9" fill="#C61A1A" />
          <text x="84" y="159" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#FFFFFF" letterSpacing="0.5">
            Get Started
          </text>

          {/* stat cards */}
          <rect x="344" y="64" width="88" height="60" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <rect x="356" y="78" width="40" height="8" rx="4" fill="#E2E8F0" />
          <rect x="356" y="94" width="24" height="18" rx="4" fill="#C61A1A" opacity="0.85" />
          <rect x="386" y="100" width="12" height="12" rx="3" fill="#FCA5A5" />
          <rect x="404" y="90" width="16" height="22" rx="3" fill="#C61A1A" />

          <rect x="444" y="64" width="88" height="60" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <rect x="456" y="78" width="40" height="8" rx="4" fill="#E2E8F0" />
          <rect x="456" y="96" width="14" height="16" rx="3" fill="#FCA5A5" />
          <rect x="476" y="88" width="14" height="24" rx="3" fill="#C61A1A" />
          <rect x="496" y="82" width="14" height="30" rx="3" fill="#C61A1A" opacity="0.85" />

          {/* performance chart card */}
          <rect x="32" y="188" width="500" height="118" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <rect x="48" y="202" width="72" height="8" rx="4" fill="#E2E8F0" />
          <rect x="470" y="200" width="46" height="14" rx="7" fill="#FEE2E2" />
          <text x="493" y="211" textAnchor="middle" fontSize="9" fontWeight="800" fill="#C61A1A">LIVE</text>

          {/* grid */}
          {[234, 258, 282].map((y) => (
            <line key={y} x1="48" y1={y} x2="516" y2={y} stroke="#F1F5F9" strokeWidth="1.5" />
          ))}
          {/* area under the curve */}
          <path
            d="M48 286 L128 274 L208 278 L288 258 L368 244 L448 226 L516 216 L516 292 L48 292 Z"
            fill="#C61A1A"
            opacity="0.07"
          />
          {/* the growth curve */}
          <path
            d="M48 286 L128 274 L208 278 L288 258 L368 244 L448 226 L516 216"
            fill="none"
            stroke="#C61A1A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48 286 L128 274 L208 278 L288 258 L368 244 L448 226 L516 216"
            fill="none"
            stroke="#C61A1A"
            strokeWidth="2.5"
            strokeDasharray="10 8"
            strokeLinecap="round"
            opacity="0.55"
            {...flow}
          />
          <circle cx="516" cy="216" r="4.5" fill="#C61A1A" stroke="#FFFFFF" strokeWidth="2" />
        </g>
      ) : (
        /* ==================================================== legal layout */
        <g>
          {/* hero headline skeleton */}
          <rect x="32" y="68" width="264" height="14" rx="7" fill="#E2E8F0" />
          <rect x="32" y="92" width="200" height="14" rx="7" fill="#F1F5F9" />
          <rect x="32" y="116" width="152" height="10" rx="5" fill="#F1F5F9" />

          {/* red CTA */}
          <rect x="32" y="140" width="104" height="30" rx="9" fill="#C61A1A" />
          <text x="84" y="159" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#FFFFFF" letterSpacing="0.5">
            Free Consult
          </text>

          {/* courthouse visual */}
          <rect x="352" y="64" width="180" height="106" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
          <path d="M442 84 L486 104 L398 104 Z" fill="#C61A1A" />
          <rect x="404" y="110" width="12" height="34" rx="3" fill="#C61A1A" opacity="0.85" />
          <rect x="436" y="110" width="12" height="34" rx="3" fill="#C61A1A" />
          <rect x="468" y="110" width="12" height="34" rx="3" fill="#C61A1A" opacity="0.85" />
          <rect x="394" y="148" width="96" height="10" rx="5" fill="#E2E8F0" />

          {/* three service cards */}
          {[32, 204, 376].map((x, i) => (
            <g key={x}>
              <rect x={x} y="188" width="156" height="118" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              <rect x={x + 16} y="204" width="34" height="34" rx="9" fill="#FEE2E2" />
              <circle cx={x + 33} cy={221} r="6" fill="#C61A1A" />
              <rect x={x + 16} y={252} width={i === 1 ? 96 : 112} height="9" rx="4.5" fill="#E2E8F0" />
              <rect x={x + 16} y={268} width={i === 2 ? 78 : 92} height="9" rx="4.5" fill="#F1F5F9" />
              <rect x={x + 16} y={284} width="58" height="9" rx="4.5" fill="#F1F5F9" />
            </g>
          ))}
        </g>
      )}

      {/* ------------------------------------------- floating metric badge */}
      <motion.g
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <rect x="416" y="282" width="112" height="44" rx="14" fill="#C61A1A" />
        <text x="472" y="311" textAnchor="middle" fontSize="19" fontWeight="800" fill="#FFFFFF">
          {metric}
        </text>
      </motion.g>
    </svg>
  );
};
