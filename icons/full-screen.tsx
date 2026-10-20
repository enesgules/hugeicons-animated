'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FullScreenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FullScreenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path
const FRAME_DURATION = 0.8;
const FRAME_TIMES = [0, 0.16, 0.4, 1];
const MARK_LAND = springEase(0.5, 0.3);

// Frame (expand): the four corners contract for leverage, burst outward, and
// spring back. Each corner piece travels along its own direction (x, y).
const CORNER_TRAVEL = [0, -0.5, 1.4, 0];
const cornerVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: ([dx, dy]: [number, number]) => ({
    transform: CORNER_TRAVEL.map((v) => `translate(${v * dx}px, ${v * dy}px)`),
    transition: {
      duration: FRAME_DURATION,
      times: FRAME_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], MARK_LAND],
    },
  }),
};

const FullScreenIcon = forwardRef<FullScreenIconHandle, FullScreenIconProps>(
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
            d="M15.5 21C16.8956 21 17.5933 21 18.1611 20.8278C19.4395 20.44 20.44 19.4395 20.8278 18.1611C21 17.5933 21 16.8956 21 15.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[1, 1]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M21 8.5C21 7.10444 21 6.40666 20.8278 5.83886C20.44 4.56046 19.4395 3.56004 18.1611 3.17224C17.5933 3 16.8956 3 15.5 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[1, -1]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M8.5 21C7.10444 21 6.40666 21 5.83886 20.8278C4.56046 20.44 3.56004 19.4395 3.17224 18.1611C3 17.5933 3 16.8956 3 15.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[-1, 1]}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M3 8.5C3 7.10444 3 6.40666 3.17224 5.83886C3.56004 4.56046 4.56046 3.56004 5.83886 3.17224C6.40666 3 7.10444 3 8.5 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={cornerVariants}
            custom={[-1, -1]}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

FullScreenIcon.displayName = 'FullScreenIcon';

export { FullScreenIcon };
