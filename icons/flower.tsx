'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FlowerIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FlowerIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BLOOM_DURATION = 0.86;
const BLOOM_TIMES = [0, 0.18, 0.5, 0.78, 1];

const POLLEN_DOTS = [
  { cx: 7.4, cy: 5.8, x: -2.6, y: -2.4, delay: 0.16, duration: 0.58 },
  { cx: 16.5, cy: 5.9, x: 2.4, y: -2.5, delay: 0.22, duration: 0.54 },
  { cx: 19.1, cy: 13.1, x: 2.5, y: 0.8, delay: 0.28, duration: 0.5 },
] as const;

// the petals turn around an optically fixed center and release a little pollen
const bloomVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: [
      'rotate(0deg)',
      'rotate(-7deg)',
      'rotate(9deg)',
      'rotate(-2deg)',
      'rotate(0deg)',
    ],
    transition: {
      duration: BLOOM_DURATION,
      ease: [0.77, 0, 0.175, 1],
      times: BLOOM_TIMES,
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden' },
  animate: { visibility: 'visible', transition: { duration: 0.08, ease: 'linear' } },
};

const pollenVariants: Variants = {
  normal: { visibility: 'hidden', transform: 'translate(0px, 0px) scale(0.7)' },
  animate: ({ x, y, delay, duration }: (typeof POLLEN_DOTS)[number]) => ({
    visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden'],
    transform: [
      'translate(0px, 0px) scale(0.7)',
      `translate(${x * 0.08}px, ${y * 0.08}px) scale(0.82)`,
      `translate(${x * 0.42}px, ${y * 0.42}px) scale(1)`,
      `translate(${x * 0.76}px, ${y * 0.76}px) scale(0.92)`,
      `translate(${x}px, ${y}px) scale(0.72)`,
    ],
    transition: {
      transform: {
        delay,
        duration,
        ease: [0.23, 1, 0.32, 1],
        times: [0, 0.12, 0.32, 0.62, 1],
      },
    },
  }),
};

const FlowerIcon = forwardRef<FlowerIconHandle, FlowerIconProps>(
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
            d="M14.4999 12.5C14.4999 13.8807 13.3807 15 11.9999 15C10.6192 15 9.49994 13.8807 9.49994 12.5C9.49994 11.1193 10.6192 10 11.9999 10C13.3807 10 14.4999 11.1193 14.4999 12.5Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M11.9999 3C14.2091 3 15.998 4.91739 15.998 7.12653C16.3182 7.04393 16.6539 7 16.9999 7C19.2091 7 20.9999 8.79086 20.9999 11C20.9999 12.5964 20.0647 13.9745 18.7122 14.616C19.2071 15.2818 19.4999 16.1067 19.4999 17C19.4999 19.2091 17.7091 21 15.4999 21C13.9939 21 12.6823 20.1677 11.9999 18.938C11.3176 20.1677 10.006 21 8.49994 21C6.2908 21 4.49994 19.2091 4.49994 17C4.49994 16.1067 4.79277 15.2818 5.28767 14.616C3.93518 13.9745 2.99994 12.5964 2.99994 11C2.99994 8.79086 4.7908 7 6.99994 7C7.34595 7 7.68169 7.04393 8.0019 7.12652C8.0019 4.91738 9.7908 3 11.9999 3Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bloomVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            {POLLEN_DOTS.map((dot) => (
              <motion.circle
                key={`${dot.cx}-${dot.cy}`}
                cx={dot.cx}
                cy={dot.cy}
                r="0.7"
                fill="currentColor"
                variants={pollenVariants}
                custom={dot}
                animate={controls}
                initial="normal"
              />
            ))}
          </motion.g>
        </svg>
      </div>
    );
  }
);

FlowerIcon.displayName = 'FlowerIcon';

export { FlowerIcon };
