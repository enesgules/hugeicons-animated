'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowDown01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowDown01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the chevron lifts a little, then drops with a narrowing squash and springs
// back, the same nudge as chevron-down with a clear wind-up
const arrowVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleX(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleX(1)',
      'translateY(-0.6px) scaleX(1.02)',
      'translateY(2.6px) scaleX(0.9)',
      'translateY(-0.45px) scaleX(1.04)',
      'translateY(0.6px) scaleX(0.98)',
      'translateY(0px) scaleX(1)',
    ],
    transition: { duration: 0.62, ease: [0.23, 1, 0.32, 1], times: [0, 0.14, 0.42, 0.64, 0.82, 1] },
  },
};

const ArrowDown01Icon = forwardRef<ArrowDown01IconHandle, ArrowDown01IconProps>(
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
            d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
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

ArrowDown01Icon.displayName = 'ArrowDown01Icon';

export { ArrowDown01Icon };
