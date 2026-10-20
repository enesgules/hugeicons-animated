'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface AlarmClockIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AlarmClockIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RING_DURATION = 0.9;
const RING_TIMES = [0, 0.07, 0.5, 0.57, 1];
const RING_LAND = springEase(0.7, 0.45);

// The alarm rings: on each strike the clock is knocked to one side (left,
// then right) and both bells are thrown outward, then a high-bounce spring
// rattles them back to rest, over and over while it rings. No extra ringing marks are added.
const svgVariants: Variants = {
  normal: { rotate: 0, transition: { duration: 0.3 } },
  animate: {
    rotate: [0, -6, 0, 6, 0],
    transition: {
      duration: RING_DURATION,
      times: RING_TIMES,
      ease: ['easeOut', RING_LAND, 'easeOut', RING_LAND],
      repeat: Infinity,
    },
  },
};

const bellVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) rotate(0deg)', transition: { duration: 0.16 } },
  animate: (direction: number) => ({
    transform: [
      'translate(0px, 0px) rotate(0deg)',
      `translate(${direction * -1.6}px, 0.6px) rotate(${direction * 9}deg)`,
      'translate(0px, 0px) rotate(0deg)',
      `translate(${direction * -1.6}px, 0.6px) rotate(${direction * 9}deg)`,
      'translate(0px, 0px) rotate(0deg)',
    ],
    transition: {
      duration: RING_DURATION,
      times: RING_TIMES,
      ease: ['easeOut', RING_LAND, 'easeOut', RING_LAND],
      repeat: Infinity,
    },
  }),
};

const AlarmClockIcon = forwardRef<AlarmClockIconHandle, AlarmClockIconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={svgVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '50% 54.1667%' }}
        >
          <path
            d="M20.5 12.5C20.5 17.1944 16.6944 21 12 21C7.30558 21 3.5 17.1944 3.5 12.5C3.5 7.80558 7.30558 4 12 4C16.6944 4 20.5 7.80558 20.5 12.5Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M5.88 18.7031L3.5 21.0031"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M18.14 18.668L20.5 20.998"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M5 3L2 6"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bellVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 3.5 / 24, originY: 4.5 / 24 }}
          />
          <motion.path
            d="M22 6L19 3"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={bellVariants}
            custom={-1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 20.5 / 24, originY: 4.5 / 24 }}
          />
          <path
            d="M12 8V12.5L14 14.5"
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

AlarmClockIcon.displayName = 'AlarmClockIcon';

export { AlarmClockIcon };
