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

const pathVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, transform: 'rotate(0deg) scale(1)' },
  animate: (i: number) =>
    i === 0
      ? {
          transform: ['rotate(0deg)', 'rotate(-3deg)', 'rotate(0deg)'],
          transformOrigin: '12px 12px',
          transition: { duration: 0.45, ease: 'easeOut' },
        }
      : {
          pathLength: [0, 1],
          opacity: [0, 1],
          transform: i === 2 ? ['scale(0.5)', 'scale(1)'] : 'scale(1)',
          transformOrigin: '12px 16.75px',
          transition: { duration: 0.38, delay: i * 0.07, ease: 'easeOut' },
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
          variants={pathVariants}
          custom={0}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={pathVariants}
          custom={1}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={pathVariants}
          custom={2}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

HelpCircleIcon.displayName = 'HelpCircleIcon';

export { HelpCircleIcon };
