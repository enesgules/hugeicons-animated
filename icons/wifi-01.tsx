'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Wifi01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Wifi01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// while you hover, the signal keeps broadcasting — pulses ripple outward
const arcVariants: Variants = {
  normal: { opacity: 1, transition: { duration: 0.3 } },
  animate: (i: number) => ({
    opacity: [0.25, 1, 0.25],
    transition: {
      duration: 1.1,
      ease: 'easeInOut',
      repeat: Infinity,
      delay: i * 0.22,
    },
  }),
};

const Wifi01Icon = forwardRef<Wifi01IconHandle, Wifi01IconProps>(
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
          <motion.path
            d="M8.25 14.5C10.25 12.5 13.75 12.5 15.75 14.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arcVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M18.5 11.5C14.7324 8.16667 9.5 8.16667 5.5 11.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arcVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M2 8.5C8.31579 3.16669 15.6842 3.16668 22 8.49989"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arcVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
          <circle
            cx="12"
            cy="18"
            r="1.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

Wifi01Icon.displayName = 'Wifi01Icon';

export { Wifi01Icon };
