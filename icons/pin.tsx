'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PinIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PinIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PIN_DURATION = 1.05;
const PIN_TIMES = [0, 0.2, 0.32, 0.44, 0.58, 0.72, 0.86, 1];
const PIN_EASE: Easing[] = [
  [0.33, 1, 0.68, 1],
  [0.55, 0, 0.85, 0.35],
  'easeInOut',
  'easeInOut',
  'easeInOut',
  'easeInOut',
  'easeInOut',
];
// The head sinks this far along the needle axis on impact.
const SINK = 0.9;
const NEEDLE_LENGTH = 5 * Math.SQRT2;
const sunkLength = (sink: number) => 1 - (sink * Math.SQRT2) / NEEDLE_LENGTH;

// The pin draws back along its needle and is pushed in: the head drives down
// the needle (the needle shortens as it enters the board), then the pin
// wobbles on its planted tip and settles.
const pinVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0 },
  animate: {
    translateX: [0, 1.4, 0, 0, 0, 0, 0, 0],
    translateY: [0, -1.4, 0, 0, 0, 0, 0, 0],
    rotate: [0, 0, 0, -7, 5, -2.5, 1, 0],
    transition: { duration: PIN_DURATION, times: PIN_TIMES, ease: PIN_EASE },
  },
};

const headVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, 0, -SINK, -0.2, 0, 0, 0, 0],
    translateY: [0, 0, SINK, 0.2, 0, 0, 0, 0],
    transition: { duration: PIN_DURATION, times: PIN_TIMES, ease: PIN_EASE },
  },
};

const needleVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 1, sunkLength(SINK), sunkLength(0.2), 1, 1, 1, 1],
    transition: { duration: PIN_DURATION, times: PIN_TIMES, ease: PIN_EASE },
  },
};

const PinIcon = forwardRef<PinIconHandle, PinIconProps>(
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
            style={{ transformBox: 'view-box', originX: 3 / 24, originY: 21 / 24 }}
          >
            <motion.path
              d="M3 21L8 16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={needleVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M13.2585 18.8714C9.51516 18.0215 5.97844 14.4848 5.12853 10.7415C4.99399 10.1489 4.92672 9.85266 5.12161 9.37197C5.3165 8.89129 5.55457 8.74255 6.03071 8.44509C7.10705 7.77265 8.27254 7.55888 9.48209 7.66586C11.1793 7.81598 12.0279 7.89104 12.4512 7.67048C12.8746 7.44991 13.1622 6.93417 13.7376 5.90269L14.4664 4.59604C14.9465 3.73528 15.1866 3.3049 15.7513 3.10202C16.316 2.89913 16.6558 3.02199 17.3355 3.26771C18.9249 3.84236 20.1576 5.07505 20.7323 6.66449C20.978 7.34417 21.1009 7.68401 20.898 8.2487C20.6951 8.8134 20.2647 9.05346 19.4039 9.53358L18.0672 10.2792C17.0376 10.8534 16.5229 11.1406 16.3024 11.568C16.0819 11.9955 16.162 12.8256 16.3221 14.4859C16.4399 15.7068 16.2369 16.88 15.5555 17.9697C15.2577 18.4458 15.1088 18.6839 14.6283 18.8786C14.1477 19.0733 13.8513 19.006 13.2585 18.8714Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={headVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

PinIcon.displayName = 'PinIcon';

export { PinIcon };
