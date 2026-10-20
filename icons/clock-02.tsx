'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Clock02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Clock02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The fast-forward of clock-01, run backwards because the arrowed rim points
// counter-clockwise: the long hand rewinds two circuits while the short hand
// rewinds one, speeding up and slowing down into the source shape.
const CLOCK_REST = 'M12 8L12 12L14 14';

const handsVariants: Variants = {
  normal: { d: CLOCK_REST },
  animate: {
    d: [
      CLOCK_REST,
      'M8.536 10L12 12L14.732 12.732',
      'M8.536 14L12 12L14.732 11.268',
      'M12 16L12 12L14 10',
      'M15.464 14L12 12L12.732 9.268',
      'M15.464 10L12 12L11.268 9.268',
      'M12 8L12 12L10 10',
      'M8.536 10L12 12L9.268 11.268',
      'M8.536 14L12 12L9.268 12.732',
      'M12 16L12 12L10 14',
      'M15.464 14L12 12L11.268 14.732',
      'M15.464 10L12 12L12.732 14.732',
      CLOCK_REST,
    ],
    transition: {
      duration: 1.04,
      ease: 'linear',
      times: [0, 0.12, 0.22, 0.3, 0.37, 0.43, 0.49, 0.55, 0.61, 0.68, 0.76, 0.86, 1],
    },
  },
};

const Clock02Icon = forwardRef<Clock02IconHandle, Clock02IconProps>(
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
          <path
            d="M5.04798 8.60657L2.53784 8.45376C4.33712 3.70477 9.503 0.999914 14.5396 2.34474C19.904 3.77711 23.0904 9.26107 21.6565 14.5935C20.2227 19.926 14.7116 23.0876 9.3472 21.6553C5.36419 20.5917 2.58192 17.2946 2 13.4844"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
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

Clock02Icon.displayName = 'Clock02Icon';

export { Clock02Icon };
