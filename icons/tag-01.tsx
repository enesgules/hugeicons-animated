'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Tag01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Tag01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SWING = springEase(0.8, 0.45);
const SWING_DURATION = 1.3;
const SWING_TIMES = [0, 0.16, 1];

// Pendulum: the hanging price tag is kicked to one side, then a high-bounce
// spring swings it back through rest and it settles on its string hole.
const tagVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, 18, 0],
    transition: { duration: SWING_DURATION, times: SWING_TIMES, ease: ['easeOut', SWING] },
  },
};

const Tag01Icon = forwardRef<Tag01IconHandle, Tag01IconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={tagVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '72.9167% 27.0833%' }}
        >
          <circle
            cx="1.5"
            cy="1.5"
            r="1.5"
            transform="matrix(1 0 0 -1 16 8.00024)"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M7.00002 14.0002L10 17.0002"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

Tag01Icon.displayName = 'Tag01Icon';

export { Tag01Icon };
