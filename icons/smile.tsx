'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface SmileIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SmileIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// recognition: a small head tilt, the smile widens, and it blinks —
// the eyes are drawn shut and open again via scaleY at their own height
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -6, -6, 0],
    transition: { duration: 1.1, ease: 'easeInOut', times: [0, 0.25, 0.75, 1] },
  },
};

const mouthVariants: Variants = {
  normal: {
    d: 'M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  animate: {
    d: 'M7.6 14.6C8.7 16.6 10.3 17.7 12 17.7C13.7 17.7 15.3 16.6 16.4 14.6',
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const eyeVariants: Variants = {
  normal: { scaleY: 1, transition: { duration: 0.2 } },
  animate: {
    scaleY: [1, 0.15, 1, 1, 0.15, 1],
    transition: {
      duration: 1.1,
      times: [0, 0.12, 0.24, 0.5, 0.62, 0.74],
      ease: 'easeInOut',
    },
  },
};

const SmileIcon = forwardRef<SmileIconHandle, SmileIconProps>(
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
          style={{ transformOrigin: '12px 12px' }}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={mouthVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M15.625 8.387V8.91649M8.375 8.387V8.91649M8.75 8.75C8.75 8.33579 8.58211 8 8.375 8C8.16789 8 8 8.33579 8 8.75C8 9.16421 8.16789 9.5 8.375 9.5C8.58211 9.5 8.75 9.16421 8.75 8.75ZM16 8.75C16 8.33579 15.8321 8 15.625 8C15.4179 8 15.25 8.33579 15.25 8.75C15.25 9.16421 15.4179 9.5 15.625 9.5C15.8321 9.5 16 9.16421 16 8.75Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={eyeVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 8.7px' }}
          />
        </motion.svg>
      </div>
    );
  }
);

SmileIcon.displayName = 'SmileIcon';

export { SmileIcon };
