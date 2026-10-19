'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Scissor01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Scissor01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SNIP_DURATION = 0.95;
const SNIP_TIMES = [0, 0.16, 0.32, 0.5, 0.66, 1];
const SNIP_EASE: Easing[] = [
  [0.33, 1, 0.68, 1],
  [0.55, 0, 0.85, 0.35],
  'easeInOut',
  [0.55, 0, 0.85, 0.35],
  'easeInOut',
];
const PIVOT = { transformBox: 'view-box', originX: 10.6 / 24, originY: 0.5 } as const;

// rest-parity: split-source-path
// Two snips: each blade turns on the shared pivot, opens a little wider, then
// snaps nearly shut, and the scissors creep forward with each cut. The rings
// stop short of touching. The frame stays still.
const scissorVariants: Variants = {
  normal: { translateX: 0 },
  animate: {
    translateX: [0, 0, -0.6, -0.6, -1.2, 0],
    transition: { duration: SNIP_DURATION, times: SNIP_TIMES, ease: SNIP_EASE },
  },
};

const bladeVariants: Variants = {
  normal: { rotate: 0 },
  animate: (direction: number) => ({
    rotate: [0, 7, -16, 5, -16, 0].map((angle) => angle * direction),
    transition: { duration: SNIP_DURATION, times: SNIP_TIMES, ease: SNIP_EASE },
  }),
};

const Scissor01Icon = forwardRef<Scissor01IconHandle, Scissor01IconProps>(
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
          <path
            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.g variants={scissorVariants} animate={controls} initial="normal">
            <motion.path
              d="M10.6 12L13.4949 14.3865M10.6 12L7 9M16 15.5C16 16.3284 15.3284 17 14.5 17C13.6716 17 13 16.3284 13 15.5C13 14.6716 13.6716 14 14.5 14C15.3284 14 16 14.6716 16 15.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={bladeVariants}
              custom={1}
              animate={controls}
              initial="normal"
              style={PIVOT}
            />
            <motion.path
              d="M13.4368 9.55807L10.6 12M10.6 12L7 15M16 8.5C16 9.32843 15.3284 10 14.5 10C13.6716 10 13 9.32843 13 8.5C13 7.67157 13.6716 7 14.5 7C15.3284 7 16 7.67157 16 8.5Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={bladeVariants}
              custom={-1}
              animate={controls}
              initial="normal"
              style={PIVOT}
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Scissor01Icon.displayName = 'Scissor01Icon';

export { Scissor01Icon };
