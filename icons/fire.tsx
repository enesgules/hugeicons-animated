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

// the base stays planted while the flame stretches, leans, and snaps between
// uneven poses; embers peel away on their own rhythm
const svgVariants: Variants = {
  normal: {
    translateY: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  animate: {
    translateY: [0, -0.25, 0, -0.4, 0.1, 0],
    rotate: [0, -2.5, 1.5, -1.5, 2, 0],
    scaleX: [1, 0.97, 1.02, 0.98, 1.01, 1],
    scaleY: [1, 1.07, 0.99, 1.05, 1.01, 1],
    transition: {
      duration: 1.15,
      ease: 'easeInOut',
      times: [0, 0.18, 0.4, 0.62, 0.82, 1],
    },
  },
};

// three compatible path poses let the tip and inner tongue move independently
const FLAME_REST =
  'M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z';
const FLAME_LEFT =
  'M13.8561 22C24.8 19.6 18.2 7.4 8.9 1.5C8.7 5.4 7.4 7.1 4.9 10.7C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 5.9 18.6 7.9 15.8C8.6 14.8 9.7 14 8.8 11.6C10.2 12.3 11.8 13.1 12 15.9C12.9 14.4 13.2 12 12.2 9.6C18.3 14.2 16.2 19.3 13.8561 22Z';
const FLAME_RIGHT =
  'M13.8561 22C25.8 18.5 21 7.2 13.7 1.6C11.8 5.3 9.7 6.2 6.2 9.1C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.1 19.2 7.2 15.6C7.7 14.5 8.5 13.4 8 10.9C9.5 11.8 11.6 12.3 12.3 15C13.2 13.8 14.3 11.6 13.5 8.9C20.1 13.8 16.9 18.8 13.8561 22Z';

const flameVariants: Variants = {
  normal: { d: FLAME_REST, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    d: [FLAME_REST, FLAME_LEFT, FLAME_RIGHT, FLAME_LEFT, FLAME_REST],
    transition: {
      duration: 1.15,
      ease: 'easeInOut',
      times: [0, 0.2, 0.46, 0.72, 1],
    },
  },
};

const emberVariants: Variants = {
  normal: { opacity: 0, translateY: 0, translateX: 0, scale: 1, transition: { duration: 0.2 } },
  animate: (i: number) => ({
    opacity: [0, 0.9, 0.55, 0],
    translateY: [0.5, -1.5, -3.3],
    translateX: [0, i % 2 === 0 ? -0.6 : 0.6, i % 2 === 0 ? -1.2 : 1.2],
    scale: [0.8, 1, 0.45],
    transition: {
      duration: 0.9,
      ease: 'easeOut',
      delay: i * 0.33,
    },
  }),
};

const FireIcon = forwardRef<FireIconHandle, FireIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={svgVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '50% 88%' }}
        >
          <motion.path
            d="M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={flameVariants}
            animate={controls}
            initial="normal"
          />
          <motion.circle
            cx="8.5"
            cy="7"
            r="0.9"
            fill="currentColor"
            variants={emberVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.circle
            cx="15.5"
            cy="8.5"
            r="0.7"
            fill="currentColor"
            variants={emberVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.circle
            cx="12"
            cy="4.5"
            r="0.6"
            fill="currentColor"
            variants={emberVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

FireIcon.displayName = 'FireIcon';

export { FireIcon };
