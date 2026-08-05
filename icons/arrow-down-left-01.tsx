'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowDownLeft01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowDownLeft01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path

const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(-2.1px, 2.1px) scale(0.97)',
      'translate(0.25px, -0.25px) scale(1.01)',
      'translate(-0.4px, 0.4px) scale(0.995)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

const ArrowDownLeft01Icon = forwardRef<ArrowDownLeft01IconHandle, ArrowDownLeft01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({ controls, onMouseEnter, onMouseLeave, ref });

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" overflow="visible">
          <motion.g variants={arrowVariants} animate={controls} initial="normal" style={{ transformOrigin: '12px 12px' }}>
            <path d="M7.5 16.5L17.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M15 17.3497C15 17.3497 8.06166 17.8924 7.08461 16.9154C6.10755 15.9383 6.65037 9 6.65037 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ArrowDownLeft01Icon.displayName = 'ArrowDownLeft01Icon';

export { ArrowDownLeft01Icon };
