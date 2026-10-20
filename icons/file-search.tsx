'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FileSearchIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FileSearchIconProps extends HTMLAttributes<HTMLDivElement> {
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

const LENS_LAND = springEase(0.5, 0.3);

// The magnifier sweeps around the page looking for a match, comes back to its
// spot, zooms in once when it finds it, and springs back to size.
const lensVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(-2.2px, 0.2px) scale(1)',
      'translate(-0.6px, -2.2px) scale(1)',
      'translate(1.8px, -1.4px) scale(1)',
      'translate(0px, 0px) scale(1)',
      'translate(0px, 0px) scale(1.18)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: {
      duration: PAGE_DURATION,
      times: [0, 0.12, 0.24, 0.36, 0.48, 0.6, 1],
      ease: ['easeInOut', 'easeInOut', 'easeInOut', 'easeInOut', [0.4, 0, 0.2, 1], LENS_LAND],
    },
  },
};

const FileSearchIcon = forwardRef<FileSearchIconHandle, FileSearchIconProps>(
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
          <motion.path
            d="M13.5 16.5L15 18M14 14.5C14 15.8807 12.8807 17 11.5 17C10.1193 17 9 15.8807 9 14.5C9 13.1193 10.1193 12 11.5 12C12.8807 12 14 13.1193 14 14.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={lensVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 11.5 / 24, originY: 14.5 / 24 }}
          />
          <motion.path
            d="M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={pageVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          />
        </svg>
      </div>
    );
  }
);

FileSearchIcon.displayName = 'FileSearchIcon';

export { FileSearchIcon };
