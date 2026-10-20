'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface File01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface File01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PAGE_DURATION = 1;
const PAGE_TIMES = [0, 0.16, 0.4, 1];
const PAGE_LAND = springEase(0.45, 0.35);

// Page, shared by every file and document: the sheet lifts and tips back,
// presses down, and lands on a spring.
const pageVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg)',
      'translateY(-0.8px) rotate(-1deg)',
      'translateY(0.5px) rotate(0.6deg)',
      'translateY(0px) rotate(0deg)',
    ],
    transition: {
      duration: PAGE_DURATION,
      times: PAGE_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], PAGE_LAND],
    },
  },
};

const MARK_LAND = springEase(0.5, 0.3);

// The text lines retract toward their start as the page presses down, then
// spring back out to full length.
const lineVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(1)', 'scaleX(0.5)', 'scaleX(1)'],
    transition: {
      duration: PAGE_DURATION,
      times: PAGE_TIMES,
      ease: ['linear', [0.4, 0, 0.2, 1], MARK_LAND],
    },
  },
};

const File01Icon = forwardRef<File01IconHandle, File01IconProps>(
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
            d="M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5M20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2C8.22877 2 6.34315 2 5.17157 3.17157C4 4.34314 4 6.22876 4 10L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={pageVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
          <motion.path
            d="M8 7L16 7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={lineVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 8 / 24, originY: 7 / 24 }}
          />
          <motion.path
            d="M8 11L12 11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={lineVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 8 / 24, originY: 11 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

File01Icon.displayName = 'File01Icon';

export { File01Icon };
