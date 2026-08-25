'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FireIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FireIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FLAME_REST =
  'M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z';
const FLAME_LEFT =
  'M13.8561 22C25.5 19.7 18.3 7.6 9.45 2.25C8.75 5.9 7.8 6.85 5.05 10.6C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.15 18.7 7.75 16.2C8.45 15.1 9.4 14.2 8.85 12.45C9.65 12.95 11.45 13.35 11.9 15.85C12.75 14.75 13.35 12.8 12.55 10.55C18.15 14.85 16.05 19.15 13.8561 22Z';
const FLAME_RIGHT =
  'M13.8561 22C26.5 18.45 20.15 6.45 12.25 1.6C10.5 5.15 8.9 6.1 5.9 9.55C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 5.9 19.05 7.3 15.65C7.8 14.75 8.7 13.65 8.2 11.45C9.3 12.05 11.55 12.65 12.1 15.1C12.95 14.05 13.95 11.95 13.2 9.45C19.65 14.05 16.8 18.75 13.8561 22Z';
const FLAME_TALL =
  'M13.8561 22C26.15 19.05 19.55 5.7 11.25 1.1C10.6 4.9 9.4 6.25 6.05 9.85C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.35 18.85 7.65 16.05C8.25 14.9 9.15 13.9 8.7 11.8C9.65 12.45 11.55 13.1 12 15.55C12.85 14.4 13.45 12.15 12.7 9.65C19.1 14.15 16.7 18.85 13.8561 22Z';
const FLAME_PINCH =
  'M13.8561 22C25.8 19.2 19.25 7.1 11.65 1.85C10.65 5.45 9.45 6.55 6.2 10.05C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.2 18.9 7.55 16.15C8.2 15 9.1 14.05 8.55 12.05C9.45 12.55 11.2 13.05 11.95 15.45C12.8 14.2 13.75 12.15 12.55 10C18.7 14.4 16.45 19 13.8561 22Z';

const flameVariants: Variants = {
  normal: { d: FLAME_REST },
  animate: {
    d: [FLAME_REST, FLAME_LEFT, FLAME_TALL, FLAME_RIGHT, FLAME_PINCH, FLAME_REST],
    transition: {
      duration: 2.05,
      ease: [0.65, 0, 0.35, 1],
      times: [0, 0.14, 0.3, 0.48, 0.74, 1],
      repeat: Infinity,
    },
  },
};

const particleVariants: Variants = {
  normal: {
    opacity: 0,
    transform: 'translate(0px, 0px) scale(0.35)',
    visibility: 'hidden',
  },
  animate: (index: number) => {
    const motions = [
      ['-0.4px', '-1.5px', '-1.3px', '-4.2px', '-2px', '-6px'],
      ['0.2px', '-1.2px', '1.1px', '-3.8px', '1.5px', '-5.6px'],
      ['0.4px', '-1px', '-0.5px', '-3.5px', '-1.4px', '-5px'],
      ['-0.2px', '-1.3px', '1.4px', '-3.2px', '2.1px', '-4.7px'],
      ['0.2px', '-1.1px', '-1.2px', '-3.6px', '-2.2px', '-5.2px'],
    ][index % 5];

    return {
      opacity: [0, 1, 0.7, 0],
      transform: [
        'translate(0px, 0px) scale(0.35)',
        `translate(${motions[0]}, ${motions[1]}) scale(1)`,
        `translate(${motions[2]}, ${motions[3]}) scale(0.72)`,
        `translate(${motions[4]}, ${motions[5]}) scale(0.12)`,
      ],
      visibility: ['hidden', 'visible', 'visible', 'hidden'],
      transition: {
        duration: 1.05 + (index % 3) * 0.12,
        delay: index * 0.18,
        ease: 'easeOut',
        repeat: Infinity,
        repeatDelay: 0.12,
      },
    };
  },
};

const trailVariants: Variants = {
  normal: {
    opacity: 0,
    pathLength: 0,
    transform: 'translate(0px, 0px) scale(0.7)',
    visibility: 'hidden',
  },
  animate: (index: number) => ({
    opacity: [0, 0.9, 0.55, 0],
    pathLength: [0, 1, 1, 0],
    transform: [
      'translate(0px, 0px) scale(0.7)',
      `translate(${index ? '0.7px' : '-0.7px'}, -1.2px) scale(1)`,
      `translate(${index ? '1.5px' : '-1.4px'}, -3.6px) scale(0.78)`,
      `translate(${index ? '2px' : '-1.9px'}, -5.2px) scale(0.35)`,
    ],
    visibility: ['hidden', 'visible', 'visible', 'hidden'],
    transition: {
      duration: 1.18,
      delay: 0.25 + index * 0.42,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 0.18,
    },
  }),
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0.08 } },
};

const FireIcon = forwardRef<FireIconHandle, FireIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
      onMouseEnter,
      onMouseLeave,
      ref,
    });

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
        >
          <motion.path
            d={FLAME_REST}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={flameVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.circle
              cx="8.6"
              cy="8.1"
              r="0.48"
              fill="currentColor"
              variants={particleVariants}
              custom={0}
              animate={controls}
              initial="normal"
            />
            <motion.circle
              cx="12.1"
              cy="5.3"
              r="0.42"
              fill="currentColor"
              variants={particleVariants}
              custom={1}
              animate={controls}
              initial="normal"
            />
            <motion.circle
              cx="15.2"
              cy="8.3"
              r="0.5"
              fill="currentColor"
              variants={particleVariants}
              custom={2}
              animate={controls}
              initial="normal"
            />
            <motion.circle
              cx="10.2"
              cy="10.1"
              r="0.36"
              fill="currentColor"
              variants={particleVariants}
              custom={3}
              animate={controls}
              initial="normal"
            />
            <motion.circle
              cx="14.1"
              cy="6.8"
              r="0.32"
              fill="currentColor"
              variants={particleVariants}
              custom={4}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M8.7 8.8L9.2 7.6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="0.75"
              variants={trailVariants}
              custom={0}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M15.2 8.8L15.7 7.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="0.75"
              variants={trailVariants}
              custom={1}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M11.3 6.7L11.7 5.4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="0.75"
              variants={trailVariants}
              custom={2}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

FireIcon.displayName = 'FireIcon';

export { FireIcon };
