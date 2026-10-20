'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Share01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Share01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Launch, as in external-link and link-square-02: the arrow loads back into
// the box, breaks free along its heading, and pulls the box after it; the box
// opening widens while the arrow loads.
const arrowVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(-0.9px, 0.35px)',
      'translate(3.8px, -1.45px)',
      'translate(-0.45px, 0.17px)',
      'translate(0px, 0px)',
    ],
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
};

const boxVariants: Variants = {
  normal: { transform: 'scale(1)', pathLength: 1 },
  animate: {
    transform: ['scale(1)', 'scale(0.95)', 'scale(1.025)', 'scale(1)'],
    pathLength: [1, 0.86, 1, 1],
    transition: { duration: 0.56, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
  },
};

const Share01Icon = forwardRef<Share01IconHandle, Share01IconProps>(
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
            d="M9.39584 4.5H8.35417C5.40789 4.5 3.93475 4.5 3.01946 5.37868C2.10417 6.25736 2.10417 7.67157 2.10417 10.5V14.5C2.10417 17.3284 2.10417 18.7426 3.01946 19.6213C3.93475 20.5 5.40789 20.5 8.35417 20.5H12.5608C15.5071 20.5 16.9802 20.5 17.8955 19.6213C18.4885 19.052 18.6973 18.2579 18.7708 17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={boxVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M16.1667 7V3.85355C16.1667 3.65829 16.3316 3.5 16.535 3.5C16.6326 3.5 16.7263 3.53725 16.7954 3.60355L21.5275 8.14645C21.7634 8.37282 21.8958 8.67986 21.8958 9C21.8958 9.32014 21.7634 9.62718 21.5275 9.85355L16.7954 14.3964C16.7263 14.4628 16.6326 14.5 16.535 14.5C16.3316 14.5 16.1667 14.3417 16.1667 14.1464V11H13.1157C8.875 11 7.3125 14.5 7.3125 14.5V12C7.3125 9.23858 9.64435 7 12.5208 7H16.1667Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Share01Icon.displayName = 'Share01Icon';

export { Share01Icon };
