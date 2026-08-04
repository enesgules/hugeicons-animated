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

const lockBodyVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.975)', 'scale(1.025)', 'scale(1)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};

const keyholeVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: ['translateY(-0.6px) scaleY(0.92)', 'translateY(0.35px) scaleY(1.06)', 'translateY(0px) scaleY(1)'],
    transition: { duration: 0.48, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
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
          variants={lockBodyVariants}
          style={{ transformOrigin: '12px 12px' }}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 13L12 16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"
          variants={keyholeVariants}
          style={{ transformOrigin: '12px 13px' }}
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
