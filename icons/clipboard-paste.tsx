'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

/** Imperative controls for the Clipboard Paste icon animation. */
export interface ClipboardPasteIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ClipboardPasteIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The arrow pulls back and releases while the complete clipboard absorbs it.
const pasteVariants: Variants = {
  normal: {
    x: 0,
    scaleX: 1,
    transition: { type: 'spring', duration: 0.3, bounce: 0 },
  },
  animate: {
    x: [0, -1.4, -1.4, 1.6, -0.35, 0],
    scaleX: [1, 0.9, 0.9, 1.04, 0.99, 1],
    transition: {
      duration: 0.68,
      ease: 'easeInOut',
      times: [0, 0.16, 0.28, 0.6, 0.82, 1],
    },
  },
};

const boardVariants: Variants = {
  normal: {
    x: 0,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', duration: 0.3, bounce: 0 },
  },
  animate: {
    x: [0, 0, 0, -0.5, 0.22, 0],
    scale: [1, 1, 1, 0.985, 1.012, 1],
    rotate: [0, 0, 0, -0.6, 0.25, 0],
    transition: {
      duration: 0.68,
      ease: 'easeInOut',
      times: [0, 0.16, 0.34, 0.6, 0.82, 1],
    },
  },
};

/** Animated Clipboard Paste icon with imperative hover controls. */
const ClipboardPasteIcon = forwardRef<ClipboardPasteIconHandle, ClipboardPasteIconProps>(
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
            variants={pasteVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '15px 13px' }}
          >
            <path
              d="M19.502 13.0005H10.502"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M17.502 10.0005C17.502 10.0005 20.5019 12.21 20.502 13.0005C20.502 13.7911 17.502 16.0005 17.502 16.0005"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.g
            variants={boardVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '11.5px 12px' }}
          >
            <path
              d="M13.998 2.00049H8.99805C8.16962 2.00049 7.49805 2.67206 7.49805 3.50049C7.49805 4.32892 8.16962 5.00049 8.99805 5.00049H13.998C14.8265 5.00049 15.498 4.32892 15.498 3.50049C15.498 2.67206 14.8265 2.00049 13.998 2.00049Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M15.4981 3.50049C17.0515 3.5473 17.9781 3.72056 18.6194 4.36185C19.1913 4.93377 19.391 5.73255 19.4607 7.00049M7.49795 3.50049C5.94456 3.5473 5.01802 3.72056 4.37673 4.36184C3.49805 5.24053 3.49805 6.65474 3.49806 9.48318L3.49805 16C3.49805 18.8284 3.49806 20.2426 4.37674 21.1213C5.25541 22 6.66963 22 9.49805 22L13.498 22C16.3265 22 17.7407 22 18.6194 21.1213C19.1092 20.6315 19.3259 19.9753 19.4219 19.0005"
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

ClipboardPasteIcon.displayName = 'ClipboardPasteIcon';

export { ClipboardPasteIcon };
