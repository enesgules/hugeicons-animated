'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Moon02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Moon02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const NIGHT_PERIOD = 2.4;

const TWINKLES = [
  { x: 16.8, y: 5.6, arm: 1.5, start: 0.08 },
  { x: 19.6, y: 10.2, arm: 1, start: 0.56 },
] as const;

// The crescent rocks slowly like a cradle; inside its bite, two small
// twinkles take turns to spin open and close, never touching the moon.
const moonVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  animate: {
    rotate: [0, -7, 7, 0],
    transition: {
      duration: NIGHT_PERIOD,
      ease: ['easeOut', 'easeInOut', 'easeIn'],
      times: [0, 0.25, 0.75, 1],
      repeat: Infinity,
    },
  },
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
      'rotate(90deg) scale(0.8)',
      'rotate(180deg) scale(0)',
      'rotate(180deg) scale(0)',
    ],
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: NIGHT_PERIOD,
      ease: ['linear', [0.23, 1, 0.32, 1], 'easeInOut', 'easeIn', 'linear'],
      times: [0, start, start + 0.1, start + 0.2, start + 0.3, 1],
      repeat: Infinity,
    },
  }),
};

const Moon02Icon = forwardRef<Moon02IconHandle, Moon02IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
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
            d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={moonVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 11 / 24, originY: 13 / 24 }}
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            {TWINKLES.map(({ x, y, arm, start }) => (
              <motion.path
                key={`${x}-${y}`}
                d={`M${x} ${y - arm}V${y + arm}M${x - arm} ${y}H${x + arm}`}
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

Moon02Icon.displayName = 'Moon02Icon';

export { Moon02Icon };
