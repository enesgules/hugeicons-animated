'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Delete02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Delete02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the hinged lid lifts and tilts; when it lands the bin takes the knock
const lidVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [0, -2, -2, 0],
    rotate: [0, -7, -7, 0],
    transition: { duration: 0.7, ease: 'easeInOut', times: [0, 0.25, 0.6, 1] },
  },
};

const binVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 0.6, 0],
    transition: { duration: 0.2, ease: 'easeOut', delay: 0.66 },
  },
};

const lineVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -0.8, 0],
    transition: { duration: 0.55, ease: 'easeInOut', delay: 0.12 },
  },
};

const Delete02Icon = forwardRef<Delete02IconHandle, Delete02IconProps>(
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
            d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={binVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={lidVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M9.5 16.5L9.5 10.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={lineVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M14.5 16.5L14.5 10.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={lineVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Delete02Icon.displayName = 'Delete02Icon';

export { Delete02Icon };
