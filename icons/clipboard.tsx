'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

/** Imperative controls for the Clipboard icon animation. */
export interface ClipboardIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ClipboardIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FRONT_BOARD_PATH =
  'M17.0235 3.03358L16.0689 2.77924C13.369 2.05986 12.019 1.70018 10.9555 2.31074C9.89196 2.9213 9.53023 4.26367 8.80678 6.94841L7.78366 10.7452C7.0602 13.4299 6.69848 14.7723 7.3125 15.8298C7.92652 16.8874 9.27651 17.247 11.9765 17.9664L12.9311 18.2208C15.631 18.9401 16.981 19.2998 18.0445 18.6893C19.108 18.0787 19.4698 16.7363 20.1932 14.0516L21.2163 10.2548C21.9398 7.57005 22.3015 6.22768 21.6875 5.17016C21.0735 4.11264 19.7235 3.75295 17.0235 3.03358Z';

// The front clipboard merges over the rear board, pauses, then duplicates.
const frontBoardVariants: Variants = {
  normal: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', duration: 0.3, bounce: 0 },
  },
  animate: {
    x: [0, 0.35, -5, -5, 0.45, 0],
    y: [0, -0.25, 3, 3, -0.3, 0],
    scale: [1, 1.025, 1, 1, 1.035, 1],
    rotate: [0, 1.5, -30, -30, 1, 0],
    transition: {
      duration: 0.9,
      ease: 'easeInOut',
      times: [0, 0.1, 0.38, 0.52, 0.84, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

/** Animated Clipboard icon with imperative hover controls. */
const ClipboardIcon = forwardRef<ClipboardIconHandle, ClipboardIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const occlusionMaskId = useId();
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
          <defs>
            <mask
              id={occlusionMaskId}
              maskUnits="userSpaceOnUse"
              x="-4"
              y="-4"
              width="32"
              height="32"
            >
              <rect x="-4" y="-4" width="32" height="32" fill="white" />
              <motion.g
                variants={generatedGeometryVariants}
                animate={controls}
                initial="normal"
              >
                <motion.path
                  d={FRONT_BOARD_PATH}
                  fill="black"
                  stroke="black"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  variants={frontBoardVariants}
                  animate={controls}
                  initial="normal"
                  style={{ transformOrigin: '14.5px 10.5px' }}
                />
              </motion.g>
            </mask>
          </defs>
          <motion.g
            variants={frontBoardVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '14.5px 10.5px' }}
          >
            <path
              d={FRONT_BOARD_PATH}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M16.8538 7.43306C16.8538 8.24714 16.1901 8.90709 15.3714 8.90709C14.5527 8.90709 13.889 8.24714 13.889 7.43306C13.889 6.61898 14.5527 5.95904 15.3714 5.95904C16.1901 5.95904 16.8538 6.61898 16.8538 7.43306Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </motion.g>
          <path
            d="M12 20.9463L11.0477 21.2056C8.35403 21.9391 7.00722 22.3059 5.94619 21.6833C4.88517 21.0608 4.52429 19.6921 3.80253 16.9547L2.78182 13.0834C2.06006 10.346 1.69918 8.97731 2.31177 7.89904C2.84167 6.96631 4 7.00027 5.5 7.00015"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            mask={`url(#${occlusionMaskId})`}
          />
        </svg>
      </div>
    );
  }
);

ClipboardIcon.displayName = 'ClipboardIcon';

export { ClipboardIcon };
