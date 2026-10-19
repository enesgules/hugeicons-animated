'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FilterIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FilterIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// A copy of the rim drops into the funnel as a liquid level and drains
// through it: it narrows down the sloped walls (kept clear of the outline),
// squeezes through the neck, and runs down the spout as a single drop.
const LEVELS = [
  'M6.23433 3H17.7657',
  'M5.1 5.5H18.9',
  'M7.1 8H16.9',
  'M9.2 10H14.8',
  'M11.4 12H12.6',
  'M11.7 14.5H12.3',
  'M11.75 17H12.25',
  'M12 18.6H12',
];

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const levelVariants: Variants = {
  normal: { d: LEVELS[0], visibility: 'hidden' },
  animate: {
    d: LEVELS,
    visibility: ['visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'visible', 'hidden'],
    transition: {
      duration: 1,
      times: [0, 0.2, 0.38, 0.52, 0.64, 0.75, 0.87, 1],
      ease: 'linear',
    },
  },
};

const FilterIcon = forwardRef<FilterIconHandle, FilterIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
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
            d="M8.85746 12.5061C6.36901 10.6456 4.59564 8.59915 3.62734 7.44867C3.3276 7.09253 3.22938 6.8319 3.17033 6.3728C2.96811 4.8008 2.86701 4.0148 3.32795 3.5074C3.7889 3 4.60404 3 6.23433 3H17.7657C19.396 3 20.2111 3 20.672 3.5074C21.133 4.0148 21.0319 4.8008 20.8297 6.37281C20.7706 6.83191 20.6724 7.09254 20.3726 7.44867C19.403 8.60062 17.6261 10.6507 15.1326 12.5135C14.907 12.6821 14.7583 12.9567 14.7307 13.2614C14.4837 15.992 14.2559 17.4876 14.1141 18.2442C13.8853 19.4657 12.1532 20.2006 11.226 20.8563C10.6741 21.2466 10.0043 20.782 9.93278 20.1778C9.79643 19.0261 9.53961 16.6864 9.25927 13.2614C9.23409 12.9539 9.08486 12.6761 8.85746 12.5061Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={LEVELS[0]}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={levelVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

FilterIcon.displayName = 'FilterIcon';

export { FilterIcon };
