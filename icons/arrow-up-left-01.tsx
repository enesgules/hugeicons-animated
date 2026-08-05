'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowUpLeft01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowUpLeft01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path

const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(-1.8px, -1.8px) scale(0.97)',
      'translate(0.25px, 0.25px) scale(1.01)',
      'translate(-0.4px, -0.4px) scale(0.995)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

const ArrowUpLeft01Icon = forwardRef<ArrowUpLeft01IconHandle, ArrowUpLeft01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({ controls, onMouseEnter, onMouseLeave, ref });

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" overflow="visible">
          <motion.g variants={arrowVariants} animate={controls} initial="normal" style={{ transformOrigin: '12px 12px' }}>
            <path d="M7.5 7.5L17.5 17.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M15 6.65032C15 6.65032 8.06166 6.10759 7.08461 7.08463C6.10755 8.06167 6.65037 15 6.65037 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ArrowUpLeft01Icon.displayName = 'ArrowUpLeft01Icon';

export { ArrowUpLeft01Icon };
