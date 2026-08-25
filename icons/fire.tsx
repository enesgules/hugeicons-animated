'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FireIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FireIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The flame is drawn through three compatible poses while its base stays planted.
const FLAME_REST =
  'M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z';
const FLAME_LEFT =
  'M13.8561 22C25.5 19.7 18.3 7.6 9.45 2.25C8.75 5.9 7.8 6.85 5.05 10.6C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.15 18.7 7.75 16.2C8.45 15.1 9.4 14.2 8.85 12.45C9.65 12.95 11.45 13.35 11.9 15.85C12.75 14.75 13.35 12.8 12.55 10.55C18.15 14.85 16.05 19.15 13.8561 22Z';
const FLAME_RIGHT =
  'M13.8561 22C26.5 18.45 20.15 6.45 12.25 1.6C10.5 5.15 8.9 6.1 5.9 9.55C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 5.9 19.05 7.3 15.65C7.8 14.75 8.7 13.65 8.2 11.45C9.3 12.05 11.55 12.65 12.1 15.1C12.95 14.05 13.95 11.95 13.2 9.45C19.65 14.05 16.8 18.75 13.8561 22Z';

const flameVariants: Variants = {
  normal: { d: FLAME_REST },
  animate: {
    d: [FLAME_REST, FLAME_LEFT, FLAME_REST, FLAME_RIGHT, FLAME_REST],
    transition: {
      duration: 1.35,
      ease: [0.65, 0, 0.35, 1],
      times: [0, 0.22, 0.5, 0.78, 1],
      repeat: Infinity,
    },
  },
};

const FireIcon = forwardRef<FireIconHandle, FireIconProps>(
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
            d="M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={flameVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

FireIcon.displayName = 'FireIcon';

export { FireIcon };
