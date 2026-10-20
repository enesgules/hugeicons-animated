'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SparklesIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SparklesIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const GLINT_DURATION = 0.9;
const GLINT_TIMES = [0, 0.18, 0.5, 1];
const GLINT_LAND = springEase(0.45, 0.35);
const TWINKLES = [
  { x: 5, y: 4.5, start: 0.5 },
  { x: 19.5, y: 18.5, start: 0.62 },
] as const;

// Glint, shared by stars, sparkles and gems: a counter-turn with a squeeze,
// one turn by the shape's symmetry with a pop that runs just past the pose,
// and a spring landing. Four-point stars turn a quarter turn; the small one
// answers in the opposite direction a beat later, so their arms are never
// diagonal at the same time. The two stars sit close, so their overshoot and
// pop are smaller than a lone star's to keep a clear gap between them. Two tiny twinkles spin open in
// the free corners as the stars land.
const starVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: (direction: number) => ({
    transform: [
      'rotate(0deg) scale(1)',
      `rotate(${direction * -14}deg) scale(0.88)`,
      `rotate(${direction * 96}deg) scale(1.08)`,
      `rotate(${direction * 90}deg) scale(1)`,
    ],
    transition: {
      duration: GLINT_DURATION,
      delay: direction < 0 ? 0.12 : 0,
      times: GLINT_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], GLINT_LAND],
    },
  }),
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const twinkleVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(0)', visibility: 'hidden' },
  animate: (start: number) => ({
    transform: [
      'rotate(0deg) scale(0)',
      'rotate(0deg) scale(0)',
      'rotate(90deg) scale(1)',
      'rotate(180deg) scale(0)',
      'rotate(180deg) scale(0)',
    ],
    visibility: ['hidden', 'hidden', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: GLINT_DURATION,
      ease: ['linear', [0.23, 1, 0.32, 1], 'easeIn', 'linear'],
      times: [0, start, start + 0.12, start + 0.3, 1],
    },
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
            custom={1}
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
            custom={-1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 7 / 24, originY: 17 / 24 }}
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            {TWINKLES.map(({ x, y, start }) => (
              <motion.path
                key={`${x}-${y}`}
                d={`M${x} ${y - 1}V${y + 1}M${x - 1} ${y}H${x + 1}`}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={twinkleVariants}
                custom={start}
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
