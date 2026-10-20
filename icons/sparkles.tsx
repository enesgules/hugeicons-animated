'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SparklesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SparklesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const GLINTS = [
  { x: 5, y: 5, delay: 0.2 },
  { x: 19.5, y: 19, delay: 0.35 },
] as const;

// The twinkle of the stars on magic-wand-01, played once: each star squeezes
// small as it turns to the diagonal, pops large as it lands on the next
// quarter turn and settles, the small one a beat later. Mini-sparkles pop in
// the free corners, as around the wand. The two stars sit close, so the small
// star pops less to keep a clear gap to the big one.
const starVariants: Variants = {
  normal: { scale: 1, rotate: 0 },
  animate: ({ delay, pop }: { delay: number; pop: number }) => ({
    scale: [1, 0.3, pop, 1],
    rotate: [0, 45, 90, 90],
    transition: { duration: 1.1, ease: 'easeInOut', delay },
  }),
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0.08 } },
};

const glintVariants: Variants = {
  normal: { visibility: 'hidden', scale: 0.4 },
  animate: (delay: number) => ({
    visibility: ['hidden', 'visible', 'hidden'],
    scale: [0.4, 1, 0.6],
    transition: { duration: 1.1, ease: 'easeOut', delay },
  }),
};

const SparklesIcon = forwardRef<SparklesIconHandle, SparklesIconProps>(
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
            d="M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={starVariants}
            custom={{ delay: 0, pop: 1.3 }}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 15 / 24, originY: 9 / 24 }}
          />
          <motion.path
            d="M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={starVariants}
            custom={{ delay: 0.3, pop: 1.2 }}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 7 / 24, originY: 17 / 24 }}
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            {GLINTS.map(({ x, y, delay }) => (
              <motion.path
                key={`${x}-${y}`}
                d={`M${x} ${y - 1}V${y + 1}M${x - 1} ${y}H${x + 1}`}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={glintVariants}
                custom={delay}
                animate={controls}
                initial="normal"
                style={{ transformBox: 'view-box', originX: x / 24, originY: y / 24 }}
              />
            ))}
          </motion.g>
        </svg>
      </div>
    );
  }
);

SparklesIcon.displayName = 'SparklesIcon';

export { SparklesIcon };
