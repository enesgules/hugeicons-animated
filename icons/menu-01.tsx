'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Menu01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Menu01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the hamburger teases what it becomes: top and bottom bars lean toward
// the X while the middle bar recedes, then it all settles back
const topLineVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [0, 3.2, 0],
    rotate: [0, 13, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.45, 1] },
  },
};

const bottomLineVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [0, -3.2, 0],
    rotate: [0, -13, 0],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.45, 1], delay: 0.03 },
  },
};

const midLineVariants: Variants = {
  normal: { opacity: 1, scaleX: 1 },
  animate: {
    opacity: [1, 0.15, 1],
    scaleX: [1, 0.5, 1],
    transition: { duration: 0.5, ease: 'easeInOut', times: [0, 0.45, 1], delay: 0.03 },
  },
};

const Menu01Icon = forwardRef<Menu01IconHandle, Menu01IconProps>(
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
            d="M4 5L20 5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={topLineVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '12px 5px' }}
          />
          <motion.path
            d="M4 12L20 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={midLineVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M4 19L20 19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bottomLineVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', transformOrigin: '12px 19px' }}
          />
        </svg>
      </div>
    );
  }
);

Menu01Icon.displayName = 'Menu01Icon';

export { Menu01Icon };
