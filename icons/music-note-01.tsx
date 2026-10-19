'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MusicNote01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MusicNote01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Call and answer: the small note crouches and hops, and as it lands the
// beamed pair crouches and hops after it, each squashing on take-off and
// landing like a bouncing ball.
const hopVariants: Variants = {
  normal: { translateY: 0, scaleX: 1, scaleY: 1 },
  animate: ([height, delay]: [number, number]) => ({
    translateY: [0, 0, -height, 0, 0, 0],
    scaleX: [1, 1.1, 0.95, 1.08, 0.98, 1],
    scaleY: [1, 0.84, 1.07, 0.9, 1.02, 1],
    transition: {
      duration: 0.6,
      delay,
      ease: ['easeOut', [0.23, 1, 0.32, 1], 'easeIn', 'easeOut', 'easeInOut'],
      times: [0, 0.2, 0.46, 0.68, 0.84, 1],
    },
  }),
};

const MusicNote01Icon = forwardRef<MusicNote01IconHandle, MusicNote01IconProps>(
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
            d="M7 9.5C7 10.8807 5.88071 12 4.5 12C3.11929 12 2 10.8807 2 9.5C2 8.11929 3.11929 7 4.5 7C5.88071 7 7 8.11929 7 9.5ZM7 9.5V2C7.33333 2.5 7.6 4.6 10 5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={hopVariants}
            custom={[1.6, 0]}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 4.5 / 24, originY: 12.75 / 24 }}
          />
          <motion.g
            variants={hopVariants}
            custom={[2, 0.36]}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 15 / 24, originY: 22 / 24 }}
          >
            <circle cx="10.5" cy="19.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M13 19.5L13 11C13 10.09 13 9.63502 13.2466 9.35248C13.4932 9.06993 13.9938 9.00163 14.9949 8.86504C18.0085 8.45385 20.2013 7.19797 21.3696 6.42937C21.6498 6.24509 21.7898 6.15295 21.8949 6.20961C22 6.26627 22 6.43179 22 6.76283V17.9259"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M13 13C17.8 13 21 10.6667 22 10"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

MusicNote01Icon.displayName = 'MusicNote01Icon';

export { MusicNote01Icon };
