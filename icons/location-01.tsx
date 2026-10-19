'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Location01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Location01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HOP_DURATION = 0.72;
const HOP_TIMES = [0, 0.34, 0.58, 0.78, 1];

// Same beat as location-add-01: the pin hops and lands on its tip with a
// short squash. The inner circle contracts on the lift and pulses on landing.
const pinVariants: Variants = {
  normal: { translateY: 0, scaleY: 1 },
  animate: {
    translateY: [0, -2.6, 0, 0, 0],
    scaleY: [1, 1.04, 0.91, 1.03, 1],
    transition: {
      duration: HOP_DURATION,
      times: HOP_TIMES,
      ease: [[0.33, 1, 0.68, 1], [0.55, 0, 0.85, 0.35], 'easeOut', 'easeInOut'],
    },
  },
};

const circleVariants: Variants = {
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.86, 1.14, 0.97, 1],
    transition: {
      duration: HOP_DURATION,
      times: HOP_TIMES,
      ease: [[0.33, 1, 0.68, 1], [0.55, 0, 0.85, 0.35], 'easeOut', 'easeInOut'],
    },
  },
};

const Location01Icon = forwardRef<Location01IconHandle, Location01IconProps>(
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
          <motion.g
            variants={pinVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 22 / 24 }}
          >
            <path
              d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <motion.path
              d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z"
              stroke="currentColor"
              strokeWidth="1.5"
              variants={circleVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 0.5, originY: 11 / 24 }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Location01Icon.displayName = 'Location01Icon';

export { Location01Icon };
