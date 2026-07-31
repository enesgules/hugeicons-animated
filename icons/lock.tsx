'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface LockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface LockIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const pathVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, transform: 'rotate(0deg) scale(1)' },
  animate: (i: number) =>
    i === 0
      ? {
          transform: ['scale(1)', 'scale(1.035)', 'scale(1)'],
          transformOrigin: '12px 12px',
          transition: { duration: 0.45, ease: 'easeOut' },
        }
      : {
          transform: ['rotate(0deg)', 'rotate(-8deg)', 'rotate(0deg)'],
          transformOrigin: '12px 11px',
          transition: { duration: 0.42, delay: 0.06, ease: 'easeInOut' },
        },
};

const LockIcon = forwardRef<LockIconHandle, LockIconProps>(
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
        <motion.path
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5"
          variants={pathVariants}
          custom={0}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 13L12 16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"
          variants={pathVariants}
          custom={1}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

LockIcon.displayName = 'LockIcon';

export { LockIcon };
