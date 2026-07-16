'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface FireIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FireIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, it burns — for real: the flame OUTLINE morphs between
// poses (lick left, straighten, lick right), the whole body bobs on the
// heat, and embers break loose, wander up, and wink out
const svgVariants: Variants = {
  normal: { translateY: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  animate: {
    translateY: [0, -0.5, 0.2, 0],
    transition: { duration: 0.9, ease: 'easeInOut', repeat: Infinity },
  },
};

// three poses of the same 9-segment path — tips and tongues move, base stays put
const FLAME_REST =
  'M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z';
const FLAME_LEFT =
  'M13.8561 22C26.0783 19.5 18.9 7.2 9.9 2.4C9.1 5.8 8.2 6.8 5.2 10.4C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.2 18.7 7.8 16.3C8.4 15.2 9.4 14.2 8.9 12.6C9.7 13 11.5 13.4 11.9 15.9C12.7 14.8 13.3 12.8 12.5 10.6C18.4 14.9 16.2 19.2 13.8561 22Z';
const FLAME_RIGHT =
  'M13.8561 22C26.0783 18.6 19.6 6.6 12.1 1.7C10.4 5.2 8.8 6.2 5.9 9.6C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 5.9 19.1 7.3 15.7C7.8 14.8 8.7 13.7 8.2 11.5C9.3 12.1 11.5 12.7 12.1 15.1C12.9 14.1 13.9 12 13.2 9.5C19.5 14.1 16.8 18.8 13.8561 22Z';

const flameVariants: Variants = {
  normal: { d: FLAME_REST, transition: { duration: 0.3, ease: 'easeOut' } },
  animate: {
    d: [FLAME_REST, FLAME_LEFT, FLAME_REST, FLAME_RIGHT, FLAME_REST],
    transition: { duration: 1.7, ease: 'easeInOut', repeat: Infinity },
  },
};

// embers: born at the flame's shoulder, they wander up, shrink, and wink out
const emberVariants: Variants = {
  normal: { opacity: 0, translateY: 0, translateX: 0, scale: 1, transition: { duration: 0.2 } },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    translateY: [0.5, -4.5],
    translateX: [0, i % 2 === 0 ? -0.9 : 0.9],
    scale: [1, 0.65],
    transition: {
      duration: 1.1,
      ease: 'easeOut',
      repeat: Infinity,
      repeatDelay: 0.3,
      delay: i * 0.45,
    },
  }),
};

const FireIcon = forwardRef<FireIconHandle, FireIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('animate');
        else onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) controls.start('normal');
        else onMouseLeave?.(e);
      },
      [controls, onMouseLeave]
    );

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
