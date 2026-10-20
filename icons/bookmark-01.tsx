'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Bookmark01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Bookmark01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BOOKMARK_DURATION = 0.8;
const BOOKMARK_TIMES = [0, 0.16, 0.4, 1];
const BOOKMARK_LAND = springEase(0.45, 0.35);

// Bookmark, shared by every ribbon: it lifts out of the page, drops into the
// binding with a squash, and springs to its saved length. The fold line is
// pushed down by the drop and springs back with it.
const ribbonVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleY(1)',
      'translateY(-1.4px) scaleY(1.04)',
      'translateY(2.4px) scaleY(0.88)',
      'translateY(0px) scaleY(1)',
    ],
    transition: {
      duration: BOOKMARK_DURATION,
      times: BOOKMARK_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], BOOKMARK_LAND],
    },
  },
};

const foldVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(0px)', 'translateY(1.4px)', 'translateY(0px)'],
    transition: {
      duration: BOOKMARK_DURATION,
      times: BOOKMARK_TIMES,
      ease: ['linear', [0.4, 0, 0.2, 1], BOOKMARK_LAND],
    },
  },
};

const Bookmark01Icon = forwardRef<Bookmark01IconHandle, Bookmark01IconProps>(
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
            variants={ribbonVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 22 / 24 }}
          >
            <path
              d="M4 17.9808V9.70753C4 6.07416 4 4.25748 5.17157 3.12874C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.12874C20 4.25748 20 6.07416 20 9.70753V17.9808C20 20.2867 20 21.4396 19.2272 21.8523C17.7305 22.6514 14.9232 19.9852 13.59 19.1824C12.8168 18.7168 12.4302 18.484 12 18.484C11.5698 18.484 11.1832 18.7168 10.41 19.1824C9.0768 19.9852 6.26947 22.6514 4.77285 21.8523C4 21.4396 4 20.2867 4 17.9808Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M4 7H20"
              stroke="currentColor"
              strokeWidth="1.5"
              variants={foldVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Bookmark01Icon.displayName = 'Bookmark01Icon';

export { Bookmark01Icon };
