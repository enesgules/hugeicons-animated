'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowUp01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowUp01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the chevron dips a little, then rises with a narrowing squash and springs
// back, the same nudge as chevron-up with a clear wind-up
const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleX(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleX(1)',
      'translateY(0.6px) scaleX(1.02)',
      'translateY(-2.6px) scaleX(0.9)',
      'translateY(0.45px) scaleX(1.04)',
      'translateY(-0.6px) scaleX(0.98)',
      'translateY(0px) scaleX(1)',
    ],
    transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1], times: [0, 0.14, 0.42, 0.64, 0.82, 1] },
  },
};

const ArrowUp01Icon = forwardRef<ArrowUp01IconHandle, ArrowUp01IconProps>(
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
            d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

ArrowUp01Icon.displayName = 'ArrowUp01Icon';

export { ArrowUp01Icon };
