'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ViewOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ViewOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The upper lid lifts off the closed lid (y = 14 at rest) to an arch at `top`.
const upperLid = (top: number) => `M22 8C22 8 18 ${top} 12 ${top}C6 ${top} 2 8 2 8`;
const eyeOpening = (top: number) =>
  `M22 8C22 8 18 ${top} 12 ${top}C6 ${top} 2 8 2 8C2 8 6 14 12 14C18 14 22 8 22 8Z`;

const CLOSED = 14;
const OPEN = 2.5;
const BLINK = springEase(0.45, 0.35);
const PEEK_DURATION = 1.2;
const PEEK_TIMES = [0, 0.2, 0.36, 0.52, 0.64, 0.76, 1];
const PEEK_EASE: Easing[] = ['easeOut', [0.4, 0, 0.2, 1], 'easeInOut', 'easeInOut', 'easeIn', BLINK];
const LID_TOPS = [CLOSED, OPEN, OPEN, OPEN, OPEN, CLOSED, CLOSED];
const GLANCE = [0, 0, -2.2, 2, 0, 0, 0];

// Glance and blink, shared by the eye icons. The closed eye peeks open,
// glances left and right, and shuts; the lashes take the hit with a spring.
const upperLidVariants: Variants = {
  normal: { d: upperLid(CLOSED) },
  animate: {
    d: LID_TOPS.map(upperLid),
    transition: { duration: PEEK_DURATION, times: PEEK_TIMES, ease: PEEK_EASE },
  },
};

const openingVariants: Variants = {
  normal: { d: eyeOpening(CLOSED) },
  animate: {
    d: LID_TOPS.map(eyeOpening),
    transition: { duration: PEEK_DURATION, times: PEEK_TIMES, ease: PEEK_EASE },
  },
};

const pupilVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: GLANCE.map((x) => `translateX(${x}px)`),
    transition: { duration: PEEK_DURATION, times: PEEK_TIMES, ease: PEEK_EASE },
  },
};

const closedEyeVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: [0, 0, 0, 0, 0, 0.9, 0].map((y) => `translateY(${y}px)`),
    transition: { duration: PEEK_DURATION, times: PEEK_TIMES, ease: PEEK_EASE },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: PEEK_DURATION, ease: 'linear', times: [0, 0.76, 1] },
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
                d={eyeOpening(CLOSED)}
                variants={openingVariants}
                animate={controls}
                initial="normal"
              />
            </clipPath>
          </defs>
          <motion.g
            variants={closedEyeVariants}
            animate={controls}
            initial="normal"
          >
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
            >
              <motion.path
                d={upperLid(CLOSED)}
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
          </motion.g>
        </svg>
      </div>
    );
  }
);

ViewOffIcon.displayName = 'ViewOffIcon';

export { ViewOffIcon };
