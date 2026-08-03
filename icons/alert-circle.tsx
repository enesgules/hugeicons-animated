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

const pathVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, transform: 'translateY(0) scale(1)' },
  animate: (i: number) =>
    i === 0
      ? {
          transform: ['scale(1)', 'scale(1.04)', 'scale(1)'],
          transformOrigin: '12px 12px',
          transition: { duration: 0.45, ease: 'easeOut' },
        }
      : {
          pathLength: [0, 1],
          opacity: [0, 1],
          transform: i === 1 ? ['translateY(-1px)', 'translateY(0)'] : ['scale(0.6)', 'scale(1)'],
          transformOrigin: '12px 15.75px',
          transition: { duration: 0.35, delay: i * 0.06, ease: 'easeOut' },
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
          variants={pathVariants}
          custom={0}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M12 8V12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={pathVariants}
          custom={1}
          animate={controls}
          initial="normal"
        />
        <motion.path
          d="M12.125 15.75H12M12.25 15.75C12.25 15.8881 12.1381 16 12 16C11.8619 16 11.75 15.8881 11.75 15.75C11.75 15.6119 11.8619 15.5 12 15.5C12.1381 15.5 12.25 15.6119 12.25 15.75Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
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

AlertCircleIcon.displayName = 'AlertCircleIcon';

export { AlertCircleIcon };
