'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface AlertCircleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlertCircleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const circleVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: [
      'scale(1)',
      'scale(0.99)',
      'scale(0.975)',
      'scale(0.988)',
      'scale(1.012)',
      'scale(0.998)',
      'scale(1)',
    ],
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.12, 0.28, 0.48, 0.68, 0.86, 1],
    },
  },
};

const stemVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [0, 0.16, 0.38, 0.64, 0.86, 1],
    transition: {
      duration: 0.42,
      delay: 0.03,
      ease: 'linear',
      times: [0, 0.14, 0.32, 0.54, 0.76, 1],
    },
  },
};

const dotVariants: Variants = {
  normal: { transform: 'scale(1)', opacity: 1 },
  animate: {
    transform: ['scale(0.8)', 'scale(0.92)', 'scale(1.06)', 'scale(1)'],
    opacity: [0, 0.5, 1, 1],
    transition: {
      duration: 0.18,
      delay: 0.31,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.28, 0.68, 1],
    },
  },
};

const AlertCircleIcon = forwardRef<AlertCircleIconHandle, AlertCircleIconProps>(
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
          variants={circleVariants}
          style={{ transformOrigin: '12px 12px' }}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M12 8V12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={stemVariants}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={dotVariants}
          style={{ transformOrigin: '12px 15.75px' }}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

AlertCircleIcon.displayName = 'AlertCircleIcon';

export { AlertCircleIcon };
