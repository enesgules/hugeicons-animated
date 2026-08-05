'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Sun03IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Sun03IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// a bright solar breath: the core gathers energy, the rays burst outward,
// and both settle into a gentle living shimmer instead of a slow wobble
const coreVariants: Variants = {
  normal: { transform: 'scale(1)', transition: { duration: 0.2, ease: 'easeOut' } },
  animate: {
    transform: ['scale(1)', 'scale(0.9)', 'scale(1.16)', 'scale(1.02)', 'scale(1)'],
    transition: {
      duration: 1.15,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.12, 0.32, 0.58, 1],
      repeat: Infinity,
      repeatDelay: 0.18,
    },
  },
};

const raysVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)', transition: { duration: 0.2, ease: 'easeOut' } },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(-7deg) scale(0.82)',
      'rotate(5deg) scale(1.18)',
      'rotate(-2deg) scale(1.04)',
      'rotate(0deg) scale(1)',
    ],
    visibility: ['visible', 'visible', 'visible', 'visible', 'visible'],
    transition: {
      duration: 1.15,
      ease: [0.77, 0, 0.175, 1],
      times: [0, 0.12, 0.34, 0.62, 1],
      repeat: Infinity,
      repeatDelay: 0.18,
    },
  },
};

const Sun03Icon = forwardRef<Sun03IconHandle, Sun03IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
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
            d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            variants={coreVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.path
            d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={raysVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
        </svg>
      </div>
    );
  }
);

Sun03Icon.displayName = 'Sun03Icon';

export { Sun03Icon };
