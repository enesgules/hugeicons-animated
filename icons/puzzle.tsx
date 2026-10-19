'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface PuzzleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface PuzzleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PUZZLE_DURATION = 1.1;
const PUZZLE_TIMES = [0, 0.26, 0.5, 0.62, 1];

// The whole piece is picked up (it tilts and grows a little as it comes
// toward the viewer), turns square above its slot, then drops in. On contact
// it compresses from the bottom edge and rebounds once before it settles.
const pieceVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0, scale: 1 },
  animate: {
    translateX: [0, 0.9, 0, 0, 0],
    translateY: [0, -1.7, -1.6, 0, 0],
    rotate: [0, -9, 0, 0, 0],
    scale: [1, 1.06, 1.06, 1, 1],
    transition: {
      duration: PUZZLE_DURATION,
      times: PUZZLE_TIMES,
      ease: [[0.33, 1, 0.68, 1], 'easeInOut', [0.55, 0, 0.85, 0.35], 'linear'],
    },
  },
};

const seatVariants: Variants = {
  normal: { scaleX: 1, scaleY: 1 },
  animate: {
    scaleX: [1, 1, 1.05, 0.98, 1.005, 1],
    scaleY: [1, 1, 0.9, 1.04, 0.99, 1],
    transition: {
      duration: PUZZLE_DURATION,
      times: [0, 0.62, 0.71, 0.83, 0.92, 1],
      ease: 'easeOut',
    },
  },
};

const PuzzleIcon = forwardRef<PuzzleIconHandle, PuzzleIconProps>(
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
            variants={pieceVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 0.5 }}
          >
            <motion.path
              d="M12.828 6.00096C12.9388 5.68791 12.999 5.35099 12.999 5C12.999 3.34315 11.6559 2 9.99904 2C8.34219 2 6.99904 3.34315 6.99904 5C6.99904 5.35099 7.05932 5.68791 7.17008 6.00096C4.88532 6.0093 3.66601 6.09039 2.87772 6.87868C2.08951 7.66689 2.00836 8.88603 2 11.1704C2.31251 11.06 2.64876 11 2.99904 11C4.6559 11 5.99904 12.3431 5.99904 14C5.99904 15.6569 4.6559 17 2.99904 17C2.64876 17 2.31251 16.94 2 16.8296C2.00836 19.114 2.08951 20.3331 2.87772 21.1213C3.66593 21.9095 4.88508 21.9907 7.16941 21.999C7.05908 21.6865 6.99904 21.3503 6.99904 21C6.99904 19.3431 8.34219 18 9.99904 18C11.6559 18 12.999 19.3431 12.999 21C12.999 21.3503 12.939 21.6865 12.8287 21.999C15.113 21.9907 16.3322 21.9095 17.1204 21.1213C17.9086 20.333 17.9897 19.1137 17.9981 16.829C18.3111 16.9397 18.648 17 18.999 17C20.6559 17 21.999 15.6569 21.999 14C21.999 12.3431 20.6559 11 18.999 11C18.648 11 18.3111 11.0603 17.9981 11.171C17.9897 8.88627 17.9086 7.66697 17.1204 6.87868C16.3321 6.09039 15.1128 6.0093 12.828 6.00096Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={seatVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 0.5, originY: 22 / 24 }}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

PuzzleIcon.displayName = 'PuzzleIcon';

export { PuzzleIcon };
