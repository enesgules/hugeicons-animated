'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Scissor01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Scissor01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the blades wind open, snap shut, and make the surrounding frame answer
const frameVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1.015)', 'scale(0.965)', 'scale(1)'],
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1], times: [0, 0.28, 0.55, 1] },
  },
};

const scissorVariants: Variants = {
  normal: { transform: 'rotate(0deg) scaleX(1)' },
  animate: {
    transform: [
      'rotate(0deg) scaleX(1)',
      'rotate(5deg) scaleX(1.08)',
      'rotate(-8deg) scaleX(0.72)',
      'rotate(2deg) scaleX(1.03)',
      'rotate(0deg) scaleX(1)',
    ],
    transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1], times: [0, 0.25, 0.5, 0.76, 1] },
  },
};

const Scissor01Icon = forwardRef<Scissor01IconHandle, Scissor01IconProps>(
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
            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={frameVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M13.4368 9.55807L10.6 12M10.6 12L7 15M10.6 12L13.4949 14.3865M10.6 12L7 9M16 8.5C16 9.32843 15.3284 10 14.5 10C13.6716 10 13 9.32843 13 8.5C13 7.67157 13.6716 7 14.5 7C15.3284 7 16 7.67157 16 8.5ZM16 15.5C16 16.3284 15.3284 17 14.5 17C13.6716 17 13 16.3284 13 15.5C13 14.6716 13.6716 14 14.5 14C15.3284 14 16 14.6716 16 15.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={scissorVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '10.6px 12px' }}
          />
        </svg>
      </div>
    );
  }
);

Scissor01Icon.displayName = 'Scissor01Icon';

export { Scissor01Icon };
