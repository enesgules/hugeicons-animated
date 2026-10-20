'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MailSend01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MailSend01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SEND_ARROW =
  'M22 17.5L14 17.5M22 17.5C22 16.7998 20.0057 15.4915 19.5 15M22 17.5C22 18.2002 20.0057 19.5085 19.5 20';

const SEND_DURATION = 0.92;
const SEND_TIMES = [
  0, 0.07, 0.14, 0.22, 0.32, 0.43, 0.5, 0.54, 0.62, 0.71, 0.8, 0.88,
  0.95, 1,
];
const BODY_TIMES = [0, 0.08, 0.16, 0.26, 0.38, 0.5, 0.62, 0.72, 0.82, 0.9, 0.96, 1];

// The envelope recoils as the arrow launches and settles.
const bodyVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0.12px) scaleX(1.006) scaleY(0.994)',
      'translateY(0.28px) scaleX(1.018) scaleY(0.982)',
      'translateY(0.5px) scaleX(1.035) scaleY(0.958)',
      'translateY(0.2px) scaleX(1.014) scaleY(0.986)',
      'translateY(-0.36px) scaleX(0.985) scaleY(1.022)',
      'translateY(0.14px) scaleX(1.008) scaleY(0.994)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
      'translateY(0px) scaleX(1) scaleY(1)',
    ],
    transition: { duration: SEND_DURATION, ease: 'linear', times: BODY_TIMES },
  },
};

// The arrow pulls back, tips, and accelerates beyond the right edge. A second
// full arrow follows the same route out of the envelope's open side.
const departingArrowVariants: Variants = {
  normal: { transform: 'translateX(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateX(0px) rotate(0deg)',
      'translateX(-0.6px) rotate(2.2deg)',
      'translateX(-0.2px) rotate(1.2deg)',
      'translateX(1.4px) rotate(-1deg)',
      'translateX(4.3px) rotate(-3.2deg)',
      'translateX(9.4px) rotate(-5.5deg)',
      'translateX(16px) rotate(-5deg)',
      'translateX(23px) rotate(-3.5deg)',
      'translateX(28px) rotate(-2deg)',
      'translateX(28px) rotate(-2deg)',
      'translateX(28px) rotate(-2deg)',
      'translateX(28px) rotate(-2deg)',
      'translateX(28px) rotate(-2deg)',
      'translateX(28px) rotate(-2deg)',
    ],
    transition: { duration: SEND_DURATION, ease: 'linear', times: SEND_TIMES },
  },
};

const arrivingArrowVariants: Variants = {
  normal: { transform: 'translateX(-28px) rotate(-6deg)' },
  animate: {
    transform: [
      'translateX(-28px) rotate(-6deg)',
      'translateX(-28px) rotate(-6deg)',
      'translateX(-28px) rotate(-6deg)',
      'translateX(-28px) rotate(-6deg)',
      'translateX(-28px) rotate(-6deg)',
      'translateX(-28px) rotate(-6deg)',
      'translateX(-28px) rotate(-6deg)',
      'translateX(-23px) rotate(-6deg)',
      'translateX(-16px) rotate(-5deg)',
      'translateX(-9.8px) rotate(-4deg)',
      'translateX(-4.7px) rotate(-2.5deg)',
      'translateX(-1.4px) rotate(-0.8deg)',
      'translateX(-0.2px) rotate(0.8deg)',
      'translateX(0px) rotate(0deg)',
    ],
    transition: { duration: SEND_DURATION, ease: 'linear', times: SEND_TIMES },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

// Temporary launch trails grow behind the arrow, move back to the left, and
// clear before the replacement arrives.
const trailVariants: Variants = {
  normal: { pathLength: 0, pathOffset: 0, visibility: 'hidden' },
  animate: (i: number) => ({
    pathLength: [0, 0.25, 1, 0.34, 0, 0],
    pathOffset: [0, 0, 0, 0.66, 1, 1],
    visibility: ['hidden', 'visible', 'visible', 'hidden'],
    transition: {
      duration: 0.38,
      delay: 0.06 + i * 0.028,
      ease: 'linear',
      times: [0, 0.14, 0.34, 0.58, 0.8, 1],
      // Hide the trail before it shrinks to a round-cap dot.
      visibility: { duration: 0.38, delay: 0.06 + i * 0.028, ease: 'linear', times: [0, 0.14, 0.69, 0.7] },
    },
  }),
};

const MailSend01Icon = forwardRef<MailSend01IconHandle, MailSend01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const arrowWindowId = useId();
    const arrivalWindowId = useId();
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
          overflow="hidden"
        >
          <defs>
            <clipPath id={arrowWindowId} clipPathUnits="userSpaceOnUse">
              <rect x="12.3" y="13" width="12" height="9" />
            </clipPath>
            <clipPath id={arrivalWindowId} clipPathUnits="userSpaceOnUse">
              <rect x="13" y="13" width="12" height="9" />
            </clipPath>
          </defs>
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d="M11.2 17.5H6.2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={trailVariants}
              custom={0}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M10.8 15.2H7.4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={trailVariants}
              custom={1}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M10.6 13.3H8.4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={trailVariants}
              custom={2}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.g
            variants={bodyVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          >
            <path
              d="M22 12.5C22 12.0086 21.9947 11.0172 21.9842 10.5244C21.9189 7.45883 21.8862 5.92606 20.7551 4.79063C19.6239 3.6552 18.0497 3.61565 14.9012 3.53654C12.9607 3.48778 11.0393 3.48778 9.09882 3.53653C5.95033 3.61563 4.37608 3.65518 3.24495 4.79062C2.11382 5.92605 2.08114 7.45882 2.01576 10.5243C1.99474 11.51 1.99475 12.4899 2.01577 13.4756C2.08114 16.5411 2.11383 18.0739 3.24496 19.2093C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C9.90159 20.4836 10.7011 20.4954 11.5 20.4989"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M2 6L8.91302 9.92462C11.4387 11.3585 12.5613 11.3585 15.087 9.92462L22 6"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <g clipPath={`url(#${arrowWindowId})`}>
            <motion.path
              d={SEND_ARROW}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={departingArrowVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 18 / 24, originY: 17.5 / 24 }}
            />
          </g>
          <motion.g
            clipPath={`url(#${arrivalWindowId})`}
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={SEND_ARROW}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={arrivingArrowVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 18 / 24, originY: 17.5 / 24 }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

MailSend01Icon.displayName = 'MailSend01Icon';

export { MailSend01Icon };
