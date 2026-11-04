import React from 'react';
import { motion, Variants } from 'motion/react';

/**
 * Shared scroll-reveal wrapper used across the whole page so every section
 * enters with the same rhythm (fade + rise, once per session).
 */
interface RevealProps {
  children: React.ReactNode;
  /** Animation delay in seconds (use for staggering siblings). */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  className?: string;
  /** 'up' (default), 'left', 'right' or 'zoom'. */
  direction?: 'up' | 'left' | 'right' | 'zoom';
}

const offsets = {
  up: { x: 0, y: 26 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
  zoom: { x: 0, y: 0, scale: 0.94 },
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y,
  className,
  direction = 'up',
}) => {
  const from = offsets[direction];
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...from, ...(y ? { y } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/** Container variant for staggering a group of RevealItem children. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/** A motion.div preconfigured with the shared staggerItem animation. */
export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <motion.div className={className} variants={staggerItem}>
    {children}
  </motion.div>
);
