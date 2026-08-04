'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Clock01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Clock01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the hour hand stays planted while only the minute hand advances
const CLOCK_REST = 'M12 8V12L14 14';

const handsVariants: Variants = {
  normal: { d: CLOCK_REST },
  animate: {
    d: [
      CLOCK_REST,
      'M12 8V12L12 14.828',
      'M12 8V12L10 14',
      'M12 8V12L9.172 12',
      'M12 8V12L10 10',
      'M12 8V12L12 9.172',
      'M12 8V12L14 10',
      'M12 8V12L14.828 12',
      CLOCK_REST,
    ],
    transition: {
      duration: 0.92,
      ease: 'linear',
      times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
    },
  },
};

const Clock01Icon = forwardRef<Clock01IconHandle, Clock01IconProps>(
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
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.path
            d="M12 8V12L14 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={handsVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Clock01Icon.displayName = 'Clock01Icon';

export { Clock01Icon };
