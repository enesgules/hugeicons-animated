'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Leaf01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Leaf01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const GUST_DURATION = 1.4;

// rest-parity: split-source-path
// A gust bends the leaf from its stem: the whole stem sways around its base,
// while the blade (with its midrib) flexes at the point where the stem enters
// it and lags behind, so the tip whips and settles after the base.
const stemVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -1.5, 4, -2.5, 1.2, -0.4, 0],
    transition: {
      duration: GUST_DURATION,
      ease: 'easeInOut',
      times: [0, 0.16, 0.38, 0.58, 0.76, 0.9, 1],
    },
  },
};

const bladeVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -1, 8, -5, 2.5, -0.8, 0],
    transition: {
      duration: GUST_DURATION,
      ease: 'easeInOut',
      times: [0, 0.2, 0.44, 0.64, 0.8, 0.92, 1],
    },
  },
};

const Leaf01Icon = forwardRef<Leaf01IconHandle, Leaf01IconProps>(
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
            variants={stemVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 3 / 24, originY: 21 / 24 }}
          >
            <path
              d="M3 21C3.4 18.6 4.73306 16.92672 7.57584 15.77206"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
            />
            <motion.g
              variants={bladeVariants}
              animate={controls}
              initial="normal"
              style={{
                transformBox: 'view-box',
                originX: 7.57584 / 24,
                originY: 15.77206 / 24,
              }}
            >
              <path
                d="M7.64584 15.7108C7.23279 14.8966 7 13.9755 7 13C7 9.78484 9.5 7.5 13 7C17.0817 6.4169 18.8333 4.16667 20 3C23.5 16 17 19 13 19C11.9071 19 10.8825 18.7078 10 18.1973"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M7.57584 15.77206C8.28653 15.4834 9.09158 15.2271 10 15C13.2167 14.1958 15.4634 12.1791 17 10.0549"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    );
  }
);

Leaf01Icon.displayName = 'Leaf01Icon';

export { Leaf01Icon };
