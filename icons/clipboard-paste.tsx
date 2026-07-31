'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ClipboardPasteIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ClipboardPasteIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// pasted content moves into the clipboard while the clip acknowledges it
const pasteVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(-1.2px)', 'translateX(0.8px)', 'translateX(0px)'],
    transition: { duration: 0.28, ease: [0.23, 1, 0.32, 1] },
  },
};

const clipVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(0.5px)', 'translateY(0px)'],
    transition: { duration: 0.26, delay: 0.02, ease: [0.23, 1, 0.32, 1] },
  },
};

const ClipboardPasteIcon = forwardRef<ClipboardPasteIconHandle, ClipboardPasteIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
          <motion.path
            d="M19.502 13.0005H10.502"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={pasteVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '15px 13px' }}
          />
          <motion.path
            d="M17.502 10.0005C17.502 10.0005 20.5019 12.21 20.502 13.0005C20.502 13.7911 17.502 16.0005 17.502 16.0005"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={pasteVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '18px 13px' }}
          />
          <motion.path
            d="M13.998 2.00049H8.99805C8.16962 2.00049 7.49805 2.67206 7.49805 3.50049C7.49805 4.32892 8.16962 5.00049 8.99805 5.00049H13.998C14.8265 5.00049 15.498 4.32892 15.498 3.50049C15.498 2.67206 14.8265 2.00049 13.998 2.00049Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={clipVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '11.5px 3.5px' }}
          />
          <path
            d="M15.4981 3.50049C17.0515 3.5473 17.9781 3.72056 18.6194 4.36185C19.1913 4.93377 19.391 5.73255 19.4607 7.00049M7.49795 3.50049C5.94456 3.5473 5.01802 3.72056 4.37673 4.36184C3.49805 5.24053 3.49805 6.65474 3.49806 9.48318L3.49805 16C3.49805 18.8284 3.49806 20.2426 4.37674 21.1213C5.25541 22 6.66963 22 9.49805 22L13.498 22C16.3265 22 17.7407 22 18.6194 21.1213C19.1092 20.6315 19.3259 19.9753 19.4219 19.0005"
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

ClipboardPasteIcon.displayName = 'ClipboardPasteIcon';

export { ClipboardPasteIcon };
