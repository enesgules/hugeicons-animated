'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface SentIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SentIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the plane banks and surges; its fold line redraws like a speed streak
const svgVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0 },
  animate: {
    translateX: [0, 2.5, 0],
    translateY: [0, -2.5, 0],
    rotate: [0, 5, 0],
    transition: { duration: 0.65, ease: 'easeInOut', times: [0, 0.4, 1] },
  },
};

const streakVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.15 },
  },
};

const SentIcon = forwardRef<SentIconHandle, SentIconProps>(
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
        >
          <path
            d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.path
            d="M11.4999 12.5L14.9999 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={streakVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

SentIcon.displayName = 'SentIcon';

export { SentIcon };
