'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ViewOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ViewOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The upper lid lifts off the closed lid (y = 14 at rest) to an arch at `top`.
const CLOSED = 14;
const OPEN = 2.5;
const lidTop = (open: number) => +(CLOSED - open * (CLOSED - OPEN)).toFixed(3);
const upperLid = (open: number) => {
  const top = lidTop(open);
  return `M22 8C22 8 18 ${top} 12 ${top}C6 ${top} 2 8 2 8`;
};
const eyeOpening = (open: number) => {
  const top = lidTop(open);
  return `M22 8C22 8 18 ${top} 12 ${top}C6 ${top} 2 8 2 8C2 8 6 14 12 14C18 14 22 8 22 8Z`;
};

const VIEW_OFF_DURATION = 1.18;
const VIEW_OFF_TIMES = [
  0, 0.05, 0.1, 0.16, 0.24, 0.34, 0.44, 0.56, 0.68, 0.76, 0.82, 0.87,
  0.92, 0.97, 1,
];
// The lid follows the slash of the eye-off icon: it snaps open as that slash
// leaves, holds the open eye, and shuts on the same easing as the slash that
// comes back.
const OPENNESS = [0, 0.033, 0.167, 1.05, 1, 1, 1, 1, 1, 1, 0.75, 0.375, 0.125, 0.025, 0];
// While the eye is open, the pupil darts left and right as in the eye icon.
const GLANCE = [0, 0, 0, 0, 0, -1.6, -0.2, 1.5, 0, 0, 0, 0, 0, 0, 0];

const upperLidVariants: Variants = {
  normal: { d: upperLid(0) },
  animate: {
    d: OPENNESS.map(upperLid),
    transition: { duration: VIEW_OFF_DURATION, ease: 'linear', times: VIEW_OFF_TIMES },
  },
};

const openingVariants: Variants = {
  normal: { d: eyeOpening(0) },
  animate: {
    d: OPENNESS.map(eyeOpening),
    transition: { duration: VIEW_OFF_DURATION, ease: 'linear', times: VIEW_OFF_TIMES },
  },
};

const pupilVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: GLANCE.map((x) => `translateX(${x}px)`),
    transition: { duration: VIEW_OFF_DURATION, ease: 'easeInOut', times: VIEW_OFF_TIMES },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: VIEW_OFF_DURATION, ease: 'linear', times: [0, 0.99, 1] },
  },
};

const ViewOffIcon = forwardRef<ViewOffIconHandle, ViewOffIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const openingClipId = useId();
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
          <defs>
            <clipPath id={openingClipId} clipPathUnits="userSpaceOnUse">
              <motion.path
                d={eyeOpening(0)}
                variants={openingVariants}
                animate={controls}
                initial="normal"
              />
            </clipPath>
          </defs>
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={upperLid(0)}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={upperLidVariants}
              animate={controls}
              initial="normal"
            />
            <g clipPath={`url(#${openingClipId})`}>
              <motion.path
                d="M14.5 8.5C14.5 7.11929 13.3807 6 12 6C10.6193 6 9.5 7.11929 9.5 8.5C9.5 9.88071 10.6193 11 12 11C13.3807 11 14.5 9.88071 14.5 8.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                variants={pupilVariants}
                animate={controls}
                initial="normal"
              />
            </g>
          </motion.g>
          <path
            d="M22 8C22 8 18 14 12 14C6 14 2 8 2 8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <path
            d="M15 13.5L16.5 16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M20 11L22 13"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M2 13L4 11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M9 13.5L7.5 16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

ViewOffIcon.displayName = 'ViewOffIcon';

export { ViewOffIcon };
