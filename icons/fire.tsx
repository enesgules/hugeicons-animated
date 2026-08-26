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

const FLAME_REST =
  'M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z';
const FLAME_LEAN_LEFT =
  'M13.8561 22C25.4 19.2 18.4 7.2 9.65 2.15C8.75 5.7 7.65 6.8 4.9 10.45C1.7 14.8 3.6 20 8.96719 22C8.15 21 6.15 18.65 7.65 16.15C8.35 15.1 9.4 14.15 8.85 12.45C9.65 12.9 11.45 13.35 11.9 15.85C12.75 14.7 13.35 12.8 12.55 10.55C18.2 14.8 16.1 19.15 13.8561 22Z';
const FLAME_LIFT =
  'M13.8561 22C26.15 19.05 19.55 5.7 11.25 1.1C10.6 4.9 9.4 6.25 6.05 9.85C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.35 18.85 7.65 16.05C8.25 14.9 9.15 13.9 8.7 11.8C9.65 12.45 11.55 13.1 12 15.55C12.85 14.4 13.45 12.15 12.7 9.65C19.1 14.15 16.7 18.85 13.8561 22Z';
const FLAME_LEAN_RIGHT =
  'M13.8561 22C26.5 18.45 20.15 6.45 12.25 1.6C10.5 5.15 8.9 6.1 5.9 9.55C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 5.9 19.05 7.3 15.65C7.8 14.75 8.7 13.65 8.2 11.45C9.3 12.05 11.55 12.65 12.1 15.1C12.95 14.05 13.95 11.95 13.2 9.45C19.65 14.05 16.8 18.75 13.8561 22Z';
const FLAME_QUICK =
  'M13.8561 22C26.2 19.1 19.95 6.7 12.05 1.35C10.95 5 9.4 6.25 6.1 9.65C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.2 18.9 7.55 16.15C8.2 15 9.1 14.05 8.55 12.05C9.45 12.55 11.2 13.05 11.95 15.45C12.8 14.2 13.75 12.15 12.55 10C18.7 14.4 16.45 19 13.8561 22Z';

const flameVariants: Variants = {
  normal: {
    originX: '50%',
    originY: '100%',
    d: FLAME_REST,
    transform: 'translate(0px, 0px) scaleY(1)',
  },
  animate: {
    originX: '50%',
    originY: '100%',
    d: [
      FLAME_REST,
      FLAME_LEAN_LEFT,
      FLAME_LIFT,
      FLAME_LEAN_RIGHT,
      FLAME_QUICK,
      FLAME_REST,
    ],
    transform: [
      'translate(0px, 0px) scaleY(1)',
      'translate(-0.15px, 0px) scaleY(1.02)',
      'translate(0px, -0.15px) scaleY(1.06)',
      'translate(0.18px, 0px) scaleY(0.98)',
      'translate(-0.05px, 0.08px) scaleY(1.01)',
      'translate(0px, 0px) scaleY(1)',
    ],
    transition: {
      duration: 1.1,
      ease: [0.4, 0, 0.2, 1],
      times: [0, 0.16, 0.32, 0.52, 0.72, 1],
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
            d={FLAME_REST}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={flameVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
          />
        </svg>
      </div>
    );
  }
);

FireIcon.displayName = 'FireIcon';

export { FireIcon };
