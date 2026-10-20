'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FileEditIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FileEditIconProps extends HTMLAttributes<HTMLDivElement> {
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

const PENCIL_LAND = springEase(0.5, 0.3);

// The pencil lifts off its tip, scribbles two quick strokes, lifts again, and
// taps down on a spring.
const pencilVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg)' },
  animate: {
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      'translate(0.3px, -0.9px) rotate(-8deg)',
      'translate(1.3px, 0px) rotate(4deg)',
      'translate(-0.4px, -0.3px) rotate(-5deg)',
      'translate(1px, 0px) rotate(3deg)',
      'translate(0.2px, -1.2px) rotate(-9deg)',
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: {
      duration: PAGE_DURATION,
      times: [0, 0.14, 0.22, 0.3, 0.38, 0.48, 1],
      ease: ['easeOut', 'easeInOut', 'easeInOut', 'easeInOut', 'easeInOut', PENCIL_LAND],
    },
  },
};

const FileEditIcon = forwardRef<FileEditIconHandle, FileEditIconProps>(
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
            d="M13 20.8268V22H14.1734C14.5827 22 14.7874 22 14.9715 21.9238C15.1555 21.8475 15.3003 21.7028 15.5897 21.4134L20.4133 16.5894C20.6864 16.3164 20.8229 16.1799 20.8959 16.0327C21.0347 15.7525 21.0347 15.4236 20.8959 15.1434C20.8229 14.9961 20.6864 14.8596 20.4133 14.5866C20.1403 14.3136 20.0038 14.1771 19.8565 14.1041C19.5763 13.9653 19.2473 13.9653 18.9671 14.1041C18.8198 14.1771 18.6833 14.3136 18.4103 14.5866L18.4103 14.5866L13.5867 19.4106C13.2972 19.7 13.1525 19.8447 13.0762 20.0287C13 20.2128 13 20.4174 13 20.8268Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={pencilVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 13 / 24, originY: 22 / 24 }}
          />
          <motion.path
            d="M19 11C19 11 19 9.4306 18.8478 9.06306C18.6955 8.69552 18.4065 8.40649 17.8284 7.82843L13.0919 3.09188C12.593 2.593 12.3436 2.34355 12.0345 2.19575C11.9702 2.165 11.9044 2.13772 11.8372 2.11401C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88607C4.26731 3.06508 4.06508 3.26731 3.88607 3.48933C3 4.58831 3 6.21082 3 9.45584V14C3 17.7712 3 19.6569 4.17157 20.8284C5.23467 21.8915 6.8857 21.99 10 21.9991M12 2.5V3C12 5.82843 12 7.24264 12.8787 8.12132C13.7574 9 15.1716 9 18 9H18.5"
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

FileEditIcon.displayName = 'FileEditIcon';

export { FileEditIcon };
