'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface SleepingIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SleepingIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// deep sleep — the big Z drifts off and is reborn, a drawn little z
// trails higher, and the mouth puffs with each snore
const zVariants: Variants = {
  normal: { opacity: 1, translateX: 0, translateY: 0, transition: { duration: 0.3 } },
  animate: {
    opacity: [1, 1, 0, 0, 1],
    translateY: [0, -2, -3.2, 0, 0],
    translateX: [0, 0.8, 1.4, 0, 0],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      times: [0, 0.5, 0.68, 0.7, 1],
      repeat: Infinity,
    },
  },
};

const littleZVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.15 } },
  animate: {
    opacity: [0, 1, 0],
    translateY: [1.5, -2.5],
    translateX: [0, 1],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity, delay: 0.6 },
  },
};

const snoreVariants: Variants = {
  normal: { scale: 1, transition: { duration: 0.3 } },
  animate: {
    scale: [1, 1.3, 1],
    transition: { duration: 2, ease: 'easeInOut', repeat: Infinity },
  },
};

const SleepingIcon = forwardRef<SleepingIconHandle, SleepingIconProps>(
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
        >
          <path
            d="M13 2.04938C12.6711 2.01672 12.3375 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M10 11H8.70711C8.25435 11 7.82014 10.8201 7.5 10.5M14 11H15.2929C15.7456 11 16.1799 10.8201 16.5 10.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.circle
            cx="12"
            cy="16"
            r="2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={snoreVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 16px' }}
          />
          <motion.path
            d="M17 2H19.9474C20.5675 2 20.8775 2 20.9601 2.20009C21.0427 2.40019 20.8317 2.64023 20.4098 3.1203L17.9846 5.8797C17.5627 6.35977 17.3517 6.59981 17.4343 6.79991C17.5169 7 17.8269 7 18.447 7H21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={zVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M13 0.5H15.2L13 2.7H15.2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={littleZVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

SleepingIcon.displayName = 'SleepingIcon';

export { SleepingIcon };
