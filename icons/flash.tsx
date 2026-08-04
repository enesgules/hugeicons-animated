'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FlashIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FlashIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the bolt stores tension, discharges through its own outline, and settles
const svgVariants: Variants = {
  normal: { transform: 'translateY(0px) scale(1)' },
  animate: {
    transform: ['translateY(0px) scale(1)', 'translateY(-0.8px) scale(0.94)', 'translateY(0.45px) scale(1.12)', 'translateY(-0.12px) scale(0.99)', 'translateY(0px) scale(1)'],
    transition: { duration: 0.52, ease: [0.23, 1, 0.32, 1] },
  },
};

const boltVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [0.2, 1, 1],
    transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
  },
};

const FlashIcon = forwardRef<FlashIconHandle, FlashIconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={svgVariants}
          animate={controls}
          initial="normal"
        >
          <motion.path
            d="M5.22576 11.3294L12.224 2.34651C12.7713 1.64397 13.7972 2.08124 13.7972 3.01707V9.96994C13.7972 10.5305 14.1995 10.985 14.6958 10.985H18.0996C18.8729 10.985 19.2851 12.0149 18.7742 12.6706L11.776 21.6535C11.2287 22.356 10.2028 21.9188 10.2028 20.9829V14.0301C10.2028 13.4695 9.80048 13.015 9.3042 13.015H5.90035C5.12711 13.015 4.71494 11.9851 5.22576 11.3294Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={boltVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

FlashIcon.displayName = 'FlashIcon';

export { FlashIcon };
