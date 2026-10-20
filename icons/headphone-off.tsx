'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface HeadphoneOffIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface HeadphoneOffIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HEADBAND_CONTINUATION =
  'M5.63604 5.63579C6.302 4.969 7.084 4.402 7.95702 3.95678';
const RIGHT_EARCUP_CONTINUATION =
  'M16.2065 16.2068L16.7614 14.6127C16.9466 14.1466 17.5383 13.9131 18.0251 14.0297C19.5356 14.5333 20.3538 16.1718 19.8526 17.6895L19.4146 19.0158C19.385 19.121 19.348 19.217 19.3028 19.3031';

const OFF_DURATION = 1.2;
const SLASH_LAND = springEase(0.5, 0.3);

// Slash off, shared by every icon with a slash: the slash winds back and
// shoots off the bottom-right corner, the outline heals across its breaks,
// then a fresh slash darts in from the top-left corner and lands with a
// spring while the breaks reopen where it crosses.
const departingSlashVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(-0.8px, -0.8px)',
      'translate(24px, 24px)',
      'translate(24px, 24px)',
    ],
    transition: {
      duration: OFF_DURATION,
      times: [0, 0.12, 0.34, 1],
      ease: ['easeOut', 'easeIn', 'linear'],
    },
  },
};

const arrivingSlashVariants: Variants = {
  normal: { transform: 'translate(-24px, -24px)' },
  animate: {
    transform: [
      'translate(-24px, -24px)',
      'translate(-24px, -24px)',
      'translate(1.2px, 1.2px)',
      'translate(0px, 0px)',
    ],
    transition: {
      duration: OFF_DURATION,
      times: [0, 0.6, 0.8, 1],
      ease: ['linear', [0.4, 0, 0.2, 1], SLASH_LAND],
    },
  },
};

// Each continuation draws once the departing slash has passed its break and
// retracts just before the arriving slash reaches it. A zero-length stroke
// with round caps draws a dot, so it is only visible while it has length.
const continuationVariants: Variants = {
  normal: { pathLength: 0, visibility: 'hidden' },
  animate: ([drawn, crossed]: [number, number]) => ({
    pathLength: [0, 0, 1, 1, 0, 0],
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: OFF_DURATION,
      ease: 'easeOut',
      times: [0, drawn, drawn + 0.08, crossed - 0.015, crossed + 0.015, 1],
    },
  }),
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const HeadphoneOffIcon = forwardRef<HeadphoneOffIconHandle, HeadphoneOffIconProps>(
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
          overflow="hidden"
        >
          <path
            d="M8.97651 19.6041L7.23857 14.6125C7.05341 14.1464 6.4617 13.9128 5.97493 14.0295C4.46441 14.533 3.6462 16.1716 4.14742 17.6892L4.58543 19.0155C5.08664 20.5332 6.71747 21.3552 8.22799 20.8516C8.68896 20.6553 9.10449 20.0895 8.97651 19.6041Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M3 2.99976L21 20.9998"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={departingSlashVariants}
            animate={controls}
            initial="normal"
          />
          <path
            d="M16.2065 16.2068L15.0235 19.6046C14.8955 20.09 15.311 20.6558 15.772 20.8522C17.1843 21.323 18.7018 20.635 19.3028 19.3031"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M3.91512 16.9998C3.41512 15.4998 3 13.4366 3 11.9998C3 9.51447 4.00736 7.26447 5.63604 5.63579M7.95702 3.95678C9.17263 3.34453 10.546 2.99976 12 2.99976C16.9706 2.99976 21 7.02919 21 11.9998C21 13.2238 20.6987 14.9024 20.3004 16.3001"
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
              d={HEADBAND_CONTINUATION}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={continuationVariants}
              custom={[0.201, 0.656]}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d={RIGHT_EARCUP_CONTINUATION}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={continuationVariants}
              custom={[0.282, 0.692]}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M3 2.99976L21 20.9998"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={arrivingSlashVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

HeadphoneOffIcon.displayName = 'HeadphoneOffIcon';

export { HeadphoneOffIcon };
