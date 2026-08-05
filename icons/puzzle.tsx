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

// the piece tests its fit while neighboring pieces briefly approach its open sides
const puzzleVariants: Variants = {
  normal: { translateX: 0, translateY: 0, rotate: 0, scale: 1, transition: { type: 'spring', duration: 0.5, bounce: 0 } },
  animate: {
    translateX: [0, 1.1, -0.45, 0],
    translateY: [0, -1.2, 0.45, 0],
    rotate: [0, 4, -2, 0],
    scale: [1, 0.96, 1.04, 1],
    transition: { duration: 0.85, times: [0, 0.3, 0.66, 1], ease: 'easeInOut' },
  },
};

const neighborPieceVariants: Variants = {
  normal: { opacity: 0, scale: 0.25 },
  animate: (i: number) => ({
    opacity: [0, 0.8, 0.8, 0],
    scale: [0.55, 1, 1, 0.8],
    translateX: i === 0 ? [1.5, 0, 0, 1.5] : [-1.5, 0, 0, -1.5],
    transition: { duration: 0.74, times: [0, 0.3, 0.68, 1], delay: i * 0.05, ease: [0.23, 1, 0.32, 1] },
  }),
};
const generatedGeometryVariants: Variants = {
  normal: { opacity: 0, transition: { duration: 0.08 } },
  animate: { opacity: 1, transition: { duration: 0.08 } },
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
          <motion.path
            d="M12.828 6.00096C12.9388 5.68791 12.999 5.35099 12.999 5C12.999 3.34315 11.6559 2 9.99904 2C8.34219 2 6.99904 3.34315 6.99904 5C6.99904 5.35099 7.05932 5.68791 7.17008 6.00096C4.88532 6.0093 3.66601 6.09039 2.87772 6.87868C2.08951 7.66689 2.00836 8.88603 2 11.1704C2.31251 11.06 2.64876 11 2.99904 11C4.6559 11 5.99904 12.3431 5.99904 14C5.99904 15.6569 4.6559 17 2.99904 17C2.64876 17 2.31251 16.94 2 16.8296C2.00836 19.114 2.08951 20.3331 2.87772 21.1213C3.66593 21.9095 4.88508 21.9907 7.16941 21.999C7.05908 21.6865 6.99904 21.3503 6.99904 21C6.99904 19.3431 8.34219 18 9.99904 18C11.6559 18 12.999 19.3431 12.999 21C12.999 21.3503 12.939 21.6865 12.8287 21.999C15.113 21.9907 16.3322 21.9095 17.1204 21.1213C17.9086 20.333 17.9897 19.1137 17.9981 16.829C18.3111 16.9397 18.648 17 18.999 17C20.6559 17 21.999 15.6569 21.999 14C21.999 12.3431 20.6559 11 18.999 11C18.648 11 18.3111 11.0603 17.9981 11.171C17.9897 8.88627 17.9086 7.66697 17.1204 6.87868C16.3321 6.09039 15.1128 6.0093 12.828 6.00096Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={puzzleVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
          <motion.path d="M18.5 5H21V7.5C20.7 7.4 20.4 7.35 20.1 7.35C19.25 7.35 18.55 8.05 18.55 8.9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" variants={neighborPieceVariants} custom={0} animate={controls} initial="normal" style={{ transformOrigin: '19.75px 6.8px' }} />
          <motion.path d="M5.5 19H3V16.5C3.3 16.6 3.6 16.65 3.9 16.65C4.75 16.65 5.45 15.95 5.45 15.1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" variants={neighborPieceVariants} custom={1} animate={controls} initial="normal" style={{ transformOrigin: '4.25px 17.2px' }} />
          </motion.g>
        </svg>
      </div>
    );
  }
);

PuzzleIcon.displayName = 'PuzzleIcon';

export { PuzzleIcon };
