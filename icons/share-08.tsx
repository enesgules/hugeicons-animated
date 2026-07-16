'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface Share08IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Share08IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the network lights up — nodes pulse outward from the source
const nodeVariants: Variants = {
  normal: { scale: 1 },
  animate: (i: number) => ({
    scale: [1, 1.25, 1],
    transition: { duration: 0.45, ease: 'easeInOut', delay: i * 0.12 },
  }),
};

const wireVariants: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: {
    pathLength: [0, 1],
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const Share08Icon = forwardRef<Share08IconHandle, Share08IconProps>(
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
        >
          <motion.path
            d="M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={nodeVariants}
            custom={1}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={nodeVariants}
            custom={0}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={nodeVariants}
            custom={2}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={wireVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Share08Icon.displayName = 'Share08Icon';

export { Share08Icon };
