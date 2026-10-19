'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface GiftIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface GiftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const GIFT_DURATION = 1.1;
const GIFT_TIMES = [0, 0.12, 0.3, 0.46, 0.58, 0.7, 0.84, 1];
const GIFT_EASE: Easing[] = [
  'easeInOut',
  [0.33, 1, 0.68, 1],
  'easeInOut',
  [0.55, 0, 0.85, 0.35],
  'easeOut',
  'easeInOut',
  'easeInOut',
];
// The box squashes by this factor, so the lid rides down with its top edge.
const lidOnBox = (scaleY: number) => 11 * (1 - scaleY);
const BOX_SCALE = [1, 0.94, 1.02, 1, 0.95, 1.01, 1, 1];

// Something inside pushes: the box squats, the lid pops off with a tilt while
// the bow loops flap upward, then the lid drops back on and the box squashes
// under it and rebounds.
const boxVariants: Variants = {
  normal: { scaleY: 1 },
  animate: {
    scaleY: BOX_SCALE,
    transition: { duration: GIFT_DURATION, times: GIFT_TIMES, ease: GIFT_EASE },
  },
};

const lidVariants: Variants = {
  normal: { translateY: 0, rotate: 0 },
  animate: {
    translateY: [lidOnBox(1), lidOnBox(0.94), -2.4, -2.6, lidOnBox(0.95), lidOnBox(1.01), 0, 0],
    rotate: [0, 0, -6, 4, 0, 0, 0, 0],
    transition: { duration: GIFT_DURATION, times: GIFT_TIMES, ease: GIFT_EASE },
  },
};

const bowVariants: Variants = {
  normal: { rotate: 0 },
  animate: (direction: number) => ({
    rotate: [0, 0, 5, 11, 0, 5, 0, 0].map((angle) => angle * direction),
    transition: { duration: GIFT_DURATION, times: GIFT_TIMES, ease: GIFT_EASE },
  }),
};

const BOW_KNOT = { transformBox: 'view-box', originX: 0.5, originY: 7 / 24 } as const;

const GiftIcon = forwardRef<GiftIconHandle, GiftIconProps>(
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
            variants={boxVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 22 / 24 }}
          >
            <path
              d="M4 11V15C4 18.2998 4 19.9497 5.02513 20.9749C6.05025 22 7.70017 22 11 22H13C16.2998 22 17.9497 22 18.9749 20.9749C20 19.9497 20 18.2998 20 15V11"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M12 11L12 22"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.g
            variants={lidVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 9 / 24 }}
          >
            <path
              d="M3 9C3 8.25231 3 7.87846 3.20096 7.6C3.33261 7.41758 3.52197 7.26609 3.75 7.16077C4.09808 7 4.56538 7 5.5 7H18.5C19.4346 7 19.9019 7 20.25 7.16077C20.478 7.26609 20.6674 7.41758 20.799 7.6C21 7.87846 21 8.25231 21 9C21 9.74769 21 10.1215 20.799 10.4C20.6674 10.5824 20.478 10.7339 20.25 10.8392C19.9019 11 19.4346 11 18.5 11H5.5C4.56538 11 4.09808 11 3.75 10.8392C3.52197 10.7339 3.33261 10.5824 3.20096 10.4C3 10.1215 3 9.74769 3 9Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M6 3.78571C6 2.79949 6.79949 2 7.78571 2H8.14286C10.2731 2 12 3.7269 12 5.85714V7H9.21429C7.43908 7 6 5.56091 6 3.78571Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={bowVariants}
              custom={1}
              animate={controls}
              initial="normal"
              style={BOW_KNOT}
            />
            <motion.path
              d="M18 3.78571C18 2.79949 17.2005 2 16.2143 2H15.8571C13.7269 2 12 3.7269 12 5.85714V7H14.7857C16.5609 7 18 5.56091 18 3.78571Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={bowVariants}
              custom={-1}
              animate={controls}
              initial="normal"
              style={BOW_KNOT}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

GiftIcon.displayName = 'GiftIcon';

export { GiftIcon };
