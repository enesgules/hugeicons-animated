'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface HelpCircleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HelpCircleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the question searches upward, finds its stop, and the dot catches up
const ringVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(1.018)', 'scale(1)'],
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.56, 0.78, 1],
    },
  },
};

const questionVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(-0.9px) rotate(-3deg)',
      'translateY(0.25px) rotate(1deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: { duration: 0.34, ease: [0.23, 1, 0.32, 1] },
  },
};

const dotVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1)' },
  animate: {
    transform: [
      'translateY(0px) scale(1)',
      'translateY(-0.7px) scale(0.72)',
      'translateY(0.15px) scale(1.24)',
      'translateY(0px) scale(1)',
    ],
    transition: { duration: 0.3, delay: 0.05, ease: [0.23, 1, 0.32, 1] },
  },
};

const HelpCircleIcon = forwardRef<HelpCircleIconHandle, HelpCircleIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
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
        <motion.circle
          cx="12" cy="12" r="10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={ringVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        />
        <motion.path
          d="M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={questionVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 13.5px' }}
        />
        <motion.path
          d="M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={dotVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 16.75px' }}
        />
        </svg>
      </div>
    );
  }
);

HelpCircleIcon.displayName = 'HelpCircleIcon';

export { HelpCircleIcon };
