'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CreditCardIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CreditCardIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const CARD_DURATION = 1.15;
const SLOT_Y = 22.6;

// A reader slot opens under the card. The card lifts, dips into the slot
// (the part below the slot is clipped), waits a beat for the payment, then
// pops back out with a small overshoot while the slot closes again.
const cardVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -1.1, 7.5, 7.5, -0.9, 0.25, 0],
    transition: {
      duration: CARD_DURATION,
      times: [0, 0.16, 0.38, 0.52, 0.72, 0.84, 1],
      ease: [
        [0.33, 1, 0.68, 1],
        [0.55, 0, 0.85, 0.35],
        'linear',
        [0.33, 1, 0.68, 1],
        'easeInOut',
        'easeInOut',
      ],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: CARD_DURATION, times: [0, 0.9, 0.92] },
  },
};

const slotVariants: Variants = {
  normal: { scaleX: 0 },
  animate: {
    scaleX: [0, 1, 1, 0],
    transition: {
      duration: CARD_DURATION,
      times: [0, 0.16, 0.74, 0.9],
      ease: [[0.33, 1, 0.68, 1], 'linear', [0.32, 0, 0.67, 0]],
    },
  },
};

const CreditCardIcon = forwardRef<CreditCardIconHandle, CreditCardIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const clipId = useId();
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
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <rect x="-4" y="-6" width="32" height={SLOT_Y - 0.75 + 6} />
            </clipPath>
          </defs>
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d={`M0 ${SLOT_Y}H24`}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={slotVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 0.5, originY: SLOT_Y / 24 }}
            />
          </motion.g>
          <g clipPath={`url(#${clipId})`}>
            <motion.g variants={cardVariants} animate={controls} initial="normal">
              <path
                d="M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M10 16H11.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M14.5 16L18 16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path d="M2 9H22" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
            </motion.g>
          </g>
        </svg>
      </div>
    );
  }
);

CreditCardIcon.displayName = 'CreditCardIcon';

export { CreditCardIcon };
