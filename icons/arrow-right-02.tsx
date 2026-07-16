'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ArrowRight02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowRight02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a launch and a softer echo — the head leads, the shaft stretches after it
const shaftVariants: Variants = {
  normal: { d: 'M18.5 12L4.99997 12' },
  animate: {
    d: [
      'M18.5 12L4.99997 12',
      'M18.5 12L9.5 12',
      'M18.5 12L4.99997 12',
      'M18.5 12L7.5 12',
      'M18.5 12L4.99997 12',
    ],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.28, 0.55, 0.75, 1], delay: 0.04 },
  },
};

const headVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, 4, 0, 1.8, 0],
    transition: { duration: 0.8, ease: 'easeInOut', times: [0, 0.25, 0.55, 0.75, 1] },
  },
};

const ArrowRight02Icon = forwardRef<ArrowRight02IconHandle, ArrowRight02IconProps>(
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
            d="M18.5 12L4.99997 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={shaftVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={headVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

ArrowRight02Icon.displayName = 'ArrowRight02Icon';

export { ArrowRight02Icon };
