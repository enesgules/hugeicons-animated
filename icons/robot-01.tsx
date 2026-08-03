'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Robot01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Robot01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the antenna tunes in, the face tilts, and the eyes blink in response
const robotHeadVariants: Variants = {
  normal: { rotate: 0, translateY: 0, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    rotate: [0, -5, 4, 0],
    translateY: [0, -0.6, 0],
    transition: { duration: 1, times: [0, 0.3, 0.7, 1], ease: 'easeInOut' },
  },
};

const robotEyeVariants: Variants = {
  normal: { scaleY: 1 },
  animate: (i: number) => ({
    scaleY: [1, 0.1, 1, 1, 0.1, 1],
    transition: { duration: 0.9, times: [0, 0.12, 0.24, 0.58, 0.7, 0.82], delay: i * 0.03 },
  }),
};

const antennaVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -15, 12, -5, 0],
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

const robotSmileVariants: Variants = {
  normal: { opacity: 0, pathLength: 0 },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: { duration: 0.35, delay: 0.35, ease: 'easeOut' },
  },
};

const Robot01Icon = forwardRef<Robot01IconHandle, Robot01IconProps>(
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
            d="M12 4V2"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={antennaVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 4px' }}
          />
          <path
            d="M20 22C20 17.5817 16.4183 14 12 14C7.58172 14 4 17.5817 4 22"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M9.375 8.25H9.25M9.5 8.25C9.5 8.38807 9.38807 8.5 9.25 8.5C9.11193 8.5 9 8.38807 9 8.25C9 8.11193 9.11193 8 9.25 8C9.38807 8 9.5 8.11193 9.5 8.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={robotEyeVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '9.25px 8.25px' }}
          />
          <motion.path
            d="M14.875 8.25H14.75M15 8.25C15 8.38807 14.8881 8.5 14.75 8.5C14.6119 8.5 14.5 8.38807 14.5 8.25C14.5 8.11193 14.6119 8 14.75 8C14.8881 8 15 8.11193 15 8.25Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={robotEyeVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '14.75px 8.25px' }}
          />
          <motion.path
            d="M15.1538 4H8.84615C7.59095 4 6.96334 4 6.47397 4.22025C5.91693 4.47095 5.47095 4.91693 5.22025 5.47397C5 5.96334 5 6.59095 5 7.84615C5 9.85448 5 10.8586 5.3524 11.6417C5.75353 12.5329 6.46709 13.2465 7.35835 13.6476C8.14135 14 9.14552 14 11.1538 14H12.8462C14.8545 14 15.8586 14 16.6417 13.6476C17.5329 13.2465 18.2465 12.5329 18.6476 11.6417C19 10.8586 19 9.85448 19 7.84615C19 6.59095 19 5.96334 18.7797 5.47397C18.529 4.91693 18.0831 4.47095 17.526 4.22025C17.0367 4 16.4091 4 15.1538 4Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={robotHeadVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 9px' }}
          />
          <motion.path d="M9.5 11C10.2 11.7 11 12 12 12C13 12 13.8 11.7 14.5 11" stroke="currentColor" strokeLinecap="round" strokeWidth="1.1" variants={robotSmileVariants} animate={controls} initial="normal" />
        </svg>
      </div>
    );
  }
);

Robot01Icon.displayName = 'Robot01Icon';

export { Robot01Icon };
