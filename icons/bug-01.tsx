'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Bug01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Bug01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// mirrored left and right leg groups move in opposite physical directions while
// the shell shifts its weight over each planted side
const bugVariants: Variants = {
  normal: {
    transform: 'translate(0px, 0px) rotate(0deg)',
    transition: { type: 'spring', duration: 0.32, bounce: 0 },
  },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      'translate(0.45px, -0.4px) rotate(-1.2deg)',
      'translate(0px, 0px) rotate(0deg)',
      'translate(-0.45px, -0.4px) rotate(1.2deg)',
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: {
      duration: 0.86,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.25, 0.5, 0.75, 1],
      repeat: Infinity,
    },
  },
};

const antennaVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: (phase: -1 | 1) => ({
    transform: [
      'rotate(0deg)',
      'rotate(' + phase * 9 + 'deg)',
      'rotate(0deg)',
      'rotate(' + phase * -9 + 'deg)',
      'rotate(0deg)',
    ],
    transition: {
      duration: 0.86,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.25, 0.5, 0.75, 1],
      repeat: Infinity,
    },
  }),
};

const legVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: [
      'rotate(0deg)',
      'rotate(28deg)',
      'rotate(0deg)',
      'rotate(-28deg)',
      'rotate(0deg)',
    ],
    transition: {
      duration: 0.86,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.25, 0.5, 0.75, 1],
      repeat: Infinity,
    },
  },
};

const Bug01Icon = forwardRef<Bug01IconHandle, Bug01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={bugVariants}
          animate={controls}
          initial="normal"
          style={{ transformBox: 'view-box', originX: 0.5, originY: 12.5 / 24 }}
        >
          <motion.path
            d="M3.01309 4.99084C2.89323 6.05084 3.55249 8.42285 6.48923 8.42285"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={antennaVariants}
            custom={-1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 6.5 / 24, originY: 8.4 / 24 }}
          />
          <motion.path
            d="M17.5951 8.38081C18.8357 8.57881 21.1132 7.49881 20.9957 5.00281"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={antennaVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 17.6 / 24, originY: 8.4 / 24 }}
          />
          <motion.path
            d="M20.9928 20.9989C21.0528 19.9429 20.1777 17.5549 17.599 17.4229"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={legVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 17.6 / 24, originY: 17.4 / 24 }}
          />
          <motion.path
            d="M6.45163 17.4708C5.65013 17.2308 3.01306 18.3348 3.01306 20.9988"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={legVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 6.45 / 24, originY: 17.47 / 24 }}
          />
          <path
            d="M9.3299 6.11884C9.35388 5.09884 9.84533 2.99884 12.0029 2.99884C13.9208 2.99884 14.5861 4.61884 14.676 6.11884M6.26131 9.41884C6.38118 8.63884 7.29216 6.81484 9.36586 6.63484C11.4635 6.55564 14.3403 6.58684 14.8797 6.67084C15.5869 6.73377 17.2951 7.43884 17.7506 9.41884C17.9124 10.4388 17.8285 11.8788 17.8524 12.7188C17.8165 13.5588 17.9207 15.2623 17.7565 16.1388C17.6367 17.0988 16.9894 18.4668 16.1024 19.3068C14.7838 20.7228 11.1639 22.2108 8.03534 19.4508C6.41713 17.8908 6.30925 16.3788 6.18939 15.7788C6.15725 15.4571 6.15875 13.8763 6.16541 12.3588C6.14144 11.046 6.17235 9.78063 6.26131 9.41884Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.path
            d="M3.01306 12.8988H5.9498"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={legVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 5.95 / 24, originY: 12.9 / 24 }}
          />
          <motion.path
            d="M20.9929 12.8988L18.1161 12.8988"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={legVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 18.12 / 24, originY: 12.9 / 24 }}
          />
          <path
            d="M12.0033 16.4988L12.0033 20.2788"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

Bug01Icon.displayName = 'Bug01Icon';

export { Bug01Icon };
