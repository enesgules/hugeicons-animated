'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowDownRight01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowDownRight01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path

const shaftVariants: Variants = {
  normal: { d: 'M16.5 16.5L6.5 6.5' },
  animate: {
    d: ['M16.5 16.5L6.5 6.5', 'M18.5 18.5L11 11', 'M16.5 16.5L6.5 6.5', 'M17.3 17.3L8.1 8.1', 'M16.5 16.5L6.5 6.5'],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.3, 0.58, 0.78, 1] },
  },
};

const headVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ['translate(0px, 0px)', 'translate(2px, 2px)', 'translate(0px, 0px)', 'translate(0.8px, 0.8px)', 'translate(0px, 0px)'],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.28, 0.58, 0.78, 1] },
  },
};

const ArrowDownRight01Icon = forwardRef<ArrowDownRight01IconHandle, ArrowDownRight01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({ controls, onMouseEnter, onMouseLeave, ref });

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" overflow="visible">
          <motion.path d="M16.5 16.5L6.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={shaftVariants} animate={controls} initial="normal" />
          <motion.path d="M9 17.3497C9 17.3497 15.9383 17.8924 16.9154 16.9154C17.8924 15.9383 17.3496 9 17.3496 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={headVariants} animate={controls} initial="normal" />
        </svg>
      </div>
    );
  }
);

ArrowDownRight01Icon.displayName = 'ArrowDownRight01Icon';

export { ArrowDownRight01Icon };
