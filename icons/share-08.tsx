'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Share08IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Share08IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LAUNCH_DURATION = 0.8;
const LAUNCH_TIMES = [0, 0.16, 0.4, 1];
const NODE_LAND = springEase(0.5, 0.3);

// Launch, shared by the link and share icons, sent across a network: the
// source node winds up while the wires erase, then it fires, the wires redraw
// with the signal, and each node it reaches pops and lands with a spring.
const nodeVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: (i: number) => ({
    transform: ['scale(1)', 'scale(0.85)', 'scale(1.2)', 'scale(1)'],
    transition: {
      duration: LAUNCH_DURATION,
      delay: i * 0.12,
      times: LAUNCH_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], NODE_LAND],
    },
  }),
};

const wireVariants: Variants = {
  normal: { pathLength: 1, visibility: 'visible' },
  animate: {
    pathLength: [1, 0, 1, 1],
    visibility: ['visible', 'hidden', 'visible', 'visible'],
    transition: {
      duration: LAUNCH_DURATION,
      times: [0, 0.16, 0.5, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], 'linear'],
    },
  },
};

const Share08Icon = forwardRef<Share08IconHandle, Share08IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: false,
      onMouseEnter,
      onMouseLeave,
      ref,
    });

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
