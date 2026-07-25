'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface PuzzleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PuzzleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the piece tests its fit, clicks down, and sends a tiny confirmation spark
const puzzleVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0, scale: 1, transition: { type: 'spring', duration: 0.5, bounce: 0 } },
  animate: {
    translateX: [0, 1.1, -0.45, 0],
    translateY: [0, -1.2, 0.45, 0],
    rotate: [0, 4, -2, 0],
    scale: [1, 0.96, 1.04, 1],
    transition: { duration: 0.85, times: [0, 0.3, 0.66, 1], ease: 'easeInOut' },
  },
};

const fitSparkVariants: Variants = {
  normal: { opacity: 0, scale: 0.25 },
  animate: (i: number) => ({
    opacity: [0, 0, 0.9, 0],
    scale: [0.25, 0.25, 1, 1.35],
    transition: { duration: 0.85, times: [0, 0.58, 0.75, 1], delay: i * 0.04, ease: 'easeOut' },
  }),
};

const PuzzleIcon = forwardRef<PuzzleIconHandle, PuzzleIconProps>(
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
            d="M12.828 6.00096C12.9388 5.68791 12.999 5.35099 12.999 5C12.999 3.34315 11.6559 2 9.99904 2C8.34219 2 6.99904 3.34315 6.99904 5C6.99904 5.35099 7.05932 5.68791 7.17008 6.00096C4.88532 6.0093 3.66601 6.09039 2.87772 6.87868C2.08951 7.66689 2.00836 8.88603 2 11.1704C2.31251 11.06 2.64876 11 2.99904 11C4.6559 11 5.99904 12.3431 5.99904 14C5.99904 15.6569 4.6559 17 2.99904 17C2.64876 17 2.31251 16.94 2 16.8296C2.00836 19.114 2.08951 20.3331 2.87772 21.1213C3.66593 21.9095 4.88508 21.9907 7.16941 21.999C7.05908 21.6865 6.99904 21.3503 6.99904 21C6.99904 19.3431 8.34219 18 9.99904 18C11.6559 18 12.999 19.3431 12.999 21C12.999 21.3503 12.939 21.6865 12.8287 21.999C15.113 21.9907 16.3322 21.9095 17.1204 21.1213C17.9086 20.333 17.9897 19.1137 17.9981 16.829C18.3111 16.9397 18.648 17 18.999 17C20.6559 17 21.999 15.6569 21.999 14C21.999 12.3431 20.6559 11 18.999 11C18.648 11 18.3111 11.0603 17.9981 11.171C17.9897 8.88627 17.9086 7.66697 17.1204 6.87868C16.3321 6.09039 15.1128 6.0093 12.828 6.00096Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={puzzleVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path d="M19.5 6V3.8M18.4 4.9H20.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" variants={fitSparkVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '19.5px 4.9px' }} />
          <motion.path d="M4 20V18.4M3.2 19.2H4.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" variants={fitSparkVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '4px 19.2px' }} />
        </svg>
      </div>
    );
  }
);

PuzzleIcon.displayName = 'PuzzleIcon';

export { PuzzleIcon };
