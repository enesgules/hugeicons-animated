'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface BookmarkAdd01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BookmarkAdd01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the bookmark drops into place while the add mark stamps the corner
const containerVariants: Variants = {
  normal: { y: 0, scaleY: 1 },
  animate: {
    y: [0, -1.8, 1, -0.25, 0],
    scaleY: [1, 1.02, 0.96, 1.01, 1],
    transition: { duration: 0.62, times: [0, 0.16, 0.5, 0.76, 1], ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { rotate: 0, scale: 1 },
  animate: {
    rotate: [0, -12, 4, 0],
    scale: [1, 0.5, 1.22, 1],
    transition: { duration: 0.56, delay: 0.04, times: [0, 0.2, 0.62, 1], ease: [0.23, 1, 0.32, 1] },
  },
};

const BookmarkAdd01Icon = forwardRef<BookmarkAdd01IconHandle, BookmarkAdd01IconProps>(
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
            variants={containerVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 11 / 24, originY: 0.5 }}
          >
            <path
              d="M11 2C7.22876 2 5.34315 2 4.17157 3.12874C3 4.25748 3 6.07416 3 9.70753V17.9808C3 20.2867 3 21.4396 3.77285 21.8523C5.26947 22.6514 8.0768 19.9852 9.41 19.1824C10.1832 18.7168 10.5698 18.484 11 18.484C11.4302 18.484 11.8168 18.7168 12.59 19.1824C13.9232 19.9852 16.7305 22.6514 18.2272 21.8523C19 21.4396 19 20.2867 19 17.9808V12.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M3.5 7.00005H10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.path
            d="M17 10L17 2M13 6H21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={plusVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 17 / 24, originY: 6 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

BookmarkAdd01Icon.displayName = 'BookmarkAdd01Icon';

export { BookmarkAdd01Icon };
