'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowRight01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowRight01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the chevron pulls back a little, then pushes right with a narrowing squash
// and springs back, the same nudge as chevron-right with a clear wind-up
const arrowVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateX(0px) scaleY(1)',
      'translateX(-0.6px) scaleY(1.02)',
      'translateX(2.6px) scaleY(0.9)',
      'translateX(-0.45px) scaleY(1.04)',
      'translateX(0.6px) scaleY(0.98)',
      'translateX(0px) scaleY(1)',
    ],
    transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1], times: [0, 0.14, 0.42, 0.64, 0.82, 1] },
  },
};

const ArrowRight01Icon = forwardRef<ArrowRight01IconHandle, ArrowRight01IconProps>(
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
            d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18"
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

ArrowRight01Icon.displayName = 'ArrowRight01Icon';

export { ArrowRight01Icon };
