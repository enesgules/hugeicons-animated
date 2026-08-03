'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface RedoIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface RedoIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a complete forward turn mirrors undo and settles in the same visual state
const redoVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)', pathLength: 1 },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(-16deg) scale(0.97)',
      'rotate(360deg) scale(1)',
      'rotate(352deg) scale(1.01)',
      'rotate(360deg) scale(1)',
    ],
    pathLength: [1, 0.82, 1, 1, 1],
    transition: { duration: 0.82, ease: [0.77, 0, 0.175, 1], times: [0, 0.1, 0.68, 0.84, 1] },
  },
};

const RedoIcon = forwardRef<RedoIconHandle, RedoIconProps>(
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
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.2073 3 18.0227 4.67765 19.6166 7.20327M20.7066 3.00076L20.5344 5.05452C20.4104 6.53384 20.3484 7.27349 19.8664 7.68914C19.3844 8.10479 18.6733 8.03185 17.251 7.88595L15.2066 7.67625"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={redoVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
        </svg>
      </div>
    );
  }
);

RedoIcon.displayName = 'RedoIcon';

export { RedoIcon };
