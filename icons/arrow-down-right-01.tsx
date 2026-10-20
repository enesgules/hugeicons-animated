'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowDownRight01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowDownRight01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path

const NUDGE_LAND = springEase(0.5, 0.3);

// Nudge, shared by every arrow and chevron: a short wind-up against the
// direction, a dart along it, and a spring landing back in place.
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(-0.49px, -0.49px) scale(1.03)',
      'translate(1.84px, 1.84px) scale(0.9)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: {
      duration: 0.8,
      times: [0, 0.16, 0.4, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], NUDGE_LAND],
    },
  },
};

const ArrowDownRight01Icon = forwardRef<ArrowDownRight01IconHandle, ArrowDownRight01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({ controls, onMouseEnter, onMouseLeave, ref });

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" overflow="visible">
          <motion.g variants={arrowVariants} animate={controls} initial="normal" style={{ transformOrigin: '12px 12px' }}>
            <path d="M16.5 16.5L6.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </motion.g>
        </svg>
      </div>
    );
  }
);

ArrowDownRight01Icon.displayName = 'ArrowDownRight01Icon';

export { ArrowDownRight01Icon };
