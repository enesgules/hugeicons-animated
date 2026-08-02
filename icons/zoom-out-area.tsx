'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ZoomOutAreaIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ZoomOutAreaIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the minus pinches the view inward, the lens follows, and the bounds settle around it
const lensVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.94)', 'scale(1.01)', 'scale(1)'],
    transition: { duration: 0.38, delay: 0.04, ease: [0.23, 1, 0.32, 1] },
  },
};

const minusVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.35)', 'scaleX(1.08)', 'scaleX(1)'],
    transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
  },
};

const boundsVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(0.982)', 'scale(1)'],
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
      times: [0, 0.42, 0.72, 1],
    },
  },
};

const ZoomOutAreaIcon = forwardRef<ZoomOutAreaIconHandle, ZoomOutAreaIconProps>(
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
          d="M18.5016 18.5L21 21M20 14.5C20 11.4624 17.5376 9 14.5 9C11.4624 9 9 11.4624 9 14.5C9 17.5376 11.4624 20 14.5 20C17.5376 20 20 17.5376 20 14.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={lensVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '14.5px 14.5px' }}
        />
        <motion.path
          d="M16.5 14.5H12.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={minusVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '14.5px 14.5px' }}
        />
        <motion.path
          d="M10 3H14M3 10V14M6.5 21C4.567 21 3 19.433 3 17.5M17.5 3C19.433 3 21 4.567 21 6.5M3 6.5C3 4.567 4.567 3 6.5 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={boundsVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        />
        </svg>
      </div>
    );
  }
);

ZoomOutAreaIcon.displayName = 'ZoomOutAreaIcon';

export { ZoomOutAreaIcon };
