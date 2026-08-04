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

const shaftVariants: Variants = {
  normal: { d: 'M7.5 16.5L17.5 6.5' },
  animate: {
    d: ['M7.5 16.5L17.5 6.5', 'M5.5 18.5L13 11', 'M7.5 16.5L17.5 6.5', 'M6.7 17.3L15.9 8.1', 'M7.5 16.5L17.5 6.5'],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.3, 0.58, 0.78, 1] },
  },
};

const headVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: ['translate(0px, 0px)', 'translate(-2px, 2px)', 'translate(0px, 0px)', 'translate(-0.8px, 0.8px)', 'translate(0px, 0px)'],
    transition: { duration: 0.64, ease: [0.23, 1, 0.32, 1], times: [0, 0.28, 0.58, 0.78, 1] },
  },
};

const ArrowDownLeft01Icon = forwardRef<ArrowDownLeft01IconHandle, ArrowDownLeft01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({ controls, onMouseEnter, onMouseLeave, ref });

    return (
      <div className={cn(className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" overflow="visible">
          <motion.path d="M7.5 16.5L17.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={shaftVariants} animate={controls} initial="normal" />
          <motion.path d="M15 17.3497C15 17.3497 8.06166 17.8924 7.08461 16.9154C6.10755 15.9383 6.65037 9 6.65037 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" variants={headVariants} animate={controls} initial="normal" />
        </svg>
      </div>
    );
  }
);

ArrowDownLeft01Icon.displayName = 'ArrowDownLeft01Icon';

export { ArrowDownLeft01Icon };
