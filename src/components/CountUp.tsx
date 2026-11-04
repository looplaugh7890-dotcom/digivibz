import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface CountUpProps {
  /** Numeric string such as "250+", "4X" or "95%". */
  value: string;
  /** Animation duration in milliseconds. */
  duration?: number;
  className?: string;
}

const NUMERIC_PREFIX = /^(\d+)(.*)$/;

/**
 * Counts up to the numeric prefix of `value` the first time it scrolls into
 * view (e.g. "250+" ticks 0 -> 250 and keeps the suffix).
 *
 * Robustness notes:
 * - Parsed parts are memoized and only primitives go into the effect's
 *   dependency array. Using `value.match()` directly in deps creates a new
 *   array reference every render and restarts the animation endlessly.
 * - Progress is derived from wall-clock time (`performance.now`) and ticked by
 *   BOTH requestAnimationFrame and a setInterval fallback, so the counter still
 *   reaches its final value when rAF is throttled (hidden/background tab),
 *   instead of freezing mid-animation.
 */
export const CountUp: React.FC<CountUpProps> = ({ value, duration = 1500, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduceMotion = useReducedMotion();

  // Fallback for environments where IntersectionObserver callbacks are
  // delayed or dropped (background/throttled tabs): a passive scroll listener
  // performs a cheap rect check until the element is seen once.
  const [rectSeen, setRectSeen] = useState(false);
  useEffect(() => {
    if (inView || rectSeen) return;
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 40 && r.bottom > 40) setRectSeen(true);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [inView, rectSeen]);

  const start = inView || rectSeen;

  const { target, suffix, isNumeric } = useMemo(() => {
    const match = value.match(NUMERIC_PREFIX);
    return {
      isNumeric: Boolean(match),
      target: match ? parseInt(match[1], 10) : 0,
      suffix: match ? match[2] : '',
    };
  }, [value]);

  const [display, setDisplay] = useState(isNumeric && !reduceMotion ? `0${suffix}` : value);

  useEffect(() => {
    if (!start) return;
    // Non-numeric value or reduced motion: just show the final string.
    if (!isNumeric || reduceMotion) {
      setDisplay(value);
      return;
    }

    const startTime = performance.now();
    let raf = 0;
    let interval = 0;
    let lastShown = -1;

    const tick = () => {
      const progress = Math.min(1, (performance.now() - startTime) / duration);
      const current = Math.round(target * (1 - Math.pow(1 - progress, 3))); // easeOutCubic
      if (current !== lastShown) {
        lastShown = current;
        setDisplay(`${current}${suffix}`);
      }
      if (progress >= 1) stop(true);
    };

    const stop = (done = false) => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
      if (done) setDisplay(`${target}${suffix}`);
    };

    raf = requestAnimationFrame(function loop() {
      tick();
      if (performance.now() - startTime < duration) raf = requestAnimationFrame(loop);
    });
    // Fallback ticker: keeps the animation progressing if rAF never fires.
    interval = window.setInterval(tick, 50);

    return () => stop();
  }, [start, isNumeric, reduceMotion, target, suffix, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};
