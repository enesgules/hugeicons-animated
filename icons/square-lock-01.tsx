'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SquareLock01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SquareLock01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Unlock and relock: the shackle presses in, pops up and swings open on its
// right leg, hangs open, then closes slowly and seats softly. The body (with
// its keyhole) carries the seated shackle down in a small push.
const SQUARE_LOCK_DURATION = 1.4;
const SQUARE_LOCK_TIMES = [0, 0.09, 0.27, 0.35, 0.6, 0.88, 0.94, 1];

const shackleVariants: Variants = {
  normal: { y: 0, rotate: 0 },
  animate: {
    y: [0, 0.4, -1.4, -1.2, -1.2, 0, 0, 0],
    rotate: [0, 0, 13.5, 12, 12, 0, 0, 0],
    transition: {
      duration: SQUARE_LOCK_DURATION,
      times: SQUARE_LOCK_TIMES,
      ease: [
        'easeOut',
        [0.3, 0, 0.2, 1],
        'easeInOut',
        'linear',
        [0.45, 0, 0.25, 1],
        'easeOut',
        'easeInOut',
      ],
    },
  },
};

const bodyVariants: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, 0, 0.35, 0],
    transition: {
      duration: SQUARE_LOCK_DURATION,
      times: [0, 0.87, 0.94, 1],
      ease: ['linear', 'easeOut', 'easeInOut'],
    },
  },
};

const SquareLock01Icon = forwardRef<SquareLock01IconHandle, SquareLock01IconProps>(
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
          <motion.g variants={bodyVariants} animate={controls} initial="normal">
            <path
              d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <motion.path
              d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={shackleVariants}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 16.5 / 24, originY: 9 / 24 }}
            />
            <path
              d="M12.125 15.5H12M12.25 15.5C12.25 15.6381 12.1381 15.75 12 15.75C11.8619 15.75 11.75 15.6381 11.75 15.5C11.75 15.3619 11.8619 15.25 12 15.25C12.1381 15.25 12.25 15.3619 12.25 15.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>
      </div>
    );
  },
);

SquareLock01Icon.displayName = 'SquareLock01Icon';

export { SquareLock01Icon };
