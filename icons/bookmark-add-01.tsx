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

// The add mark winds up and stamps a quarter turn; the ribbon catches the hit
// at the binding and its saved-state fold drops with it.
const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'rotate(0deg) scale(1)',
      'rotate(-18deg) scale(0.86)',
      'rotate(102deg) scale(1.1)',
      'rotate(86deg) scale(0.97)',
      'rotate(90deg) scale(1)',
    ],
    transition: {
      duration: 0.6,
      times: [0, 0.22, 0.55, 0.78, 1],
      ease: 'easeInOut',
    },
  },
};

const ribbonVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) scaleY(1)',
      'translateY(1.8px) scaleY(0.92)',
      'translateY(-0.45px) scaleY(1.03)',
      'translateY(0px) scaleY(1)',
    ],
    transition: { duration: 0.58, delay: 0.3, ease: [0.23, 1, 0.32, 1] },
  },
};

const foldVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px)', 'translateY(1.4px)', 'translateY(-0.2px)', 'translateY(0px)'],
    transition: { duration: 0.5, delay: 0.36, ease: [0.23, 1, 0.32, 1] },
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
            variants={ribbonVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 11 / 24, originY: 12 / 24 }}
          >
            <path
              d="M11 2C7.22876 2 5.34315 2 4.17157 3.12874C3 4.25748 3 6.07416 3 9.70753V17.9808C3 20.2867 3 21.4396 3.77285 21.8523C5.26947 22.6514 8.0768 19.9852 9.41 19.1824C10.1832 18.7168 10.5698 18.484 11 18.484C11.4302 18.484 11.8168 18.7168 12.59 19.1824C13.9232 19.9852 16.7305 22.6514 18.2272 21.8523C19 21.4396 19 20.2867 19 17.9808V12.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <motion.path
              d="M3.5 7.00005H10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={foldVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <motion.path
            d="M17 10L17 2M13 6H21"
            stroke="currentColor"
            strokeLinecap="round"
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
