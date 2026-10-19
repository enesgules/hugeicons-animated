'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface BulbIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BulbIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the bulb charges (current drains, glass and filament pinch), then switches
// on: the filament flares, the glass swells, and five rays shoot outward and
// leave, so the bulb ends exactly as it started
const BULB_DURATION = 0.7;
const BULB_TIMES = [0, 0.28, 0.48, 0.72, 1];

const glassVariants: Variants = {
  normal: { transform: 'scale(1, 1)' },
  animate: {
    transform: ['scale(1, 1)', 'scale(0.96, 0.93)', 'scale(1.04, 1.05)', 'scale(0.99, 0.985)', 'scale(1, 1)'],
    transition: { duration: BULB_DURATION, times: BULB_TIMES, ease: ['easeInOut', 'easeOut', 'easeInOut', 'easeInOut'] },
  },
};

const filamentVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(0.75)', 'scale(1.35)', 'scale(0.92)', 'scale(1)'],
    transition: { duration: BULB_DURATION, times: BULB_TIMES, ease: ['easeInOut', 'easeOut', 'easeInOut', 'easeInOut'] },
  },
};

const currentVariants: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 0.3, 1, 1],
    transition: { duration: BULB_DURATION, times: [0, 0.28, 0.46, 1], ease: ['easeInOut', 'easeOut', 'linear'] },
  },
};

// each ray waits hidden for the switch-on, grows out from the glass, then its
// tail chases the tip away; the wait is a keyframe so no cap dot shows early
const RAY_LIFE = 0.46;
const rayVariants: Variants = {
  normal: { visibility: 'hidden', pathLength: 0, pathOffset: 0 },
  animate: (delay: number) => {
    const start = 0.3 + delay;
    const total = start + RAY_LIFE;
    return {
      visibility: ['hidden', 'hidden', 'visible', 'visible', 'hidden'],
      pathLength: [0, 0, 1, 1, 0],
      pathOffset: [0, 0, 0, 0, 1],
      transition: {
        duration: total,
        times: [0, start / total, (start + 0.42 * RAY_LIFE) / total, (start + 0.55 * RAY_LIFE) / total, 1],
        ease: ['linear', 'easeOut', 'linear', 'easeIn'],
      },
    };
  },
};

// rays sit on circles r = 10.75..12.25 around the glass centre (12, 9.9)
const RAYS = [
  { d: 'M12 -0.85V-2.35', delay: 0 },
  { d: 'M4.4 2.3L3.34 1.24', delay: 0.03 },
  { d: 'M19.6 2.3L20.66 1.24', delay: 0.03 },
  { d: 'M1.25 9.9H-0.25', delay: 0.06 },
  { d: 'M22.75 9.9H24.25', delay: 0.06 },
];

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden' },
  animate: { visibility: 'visible' },
};

const BulbIcon = forwardRef<BulbIconHandle, BulbIconProps>(
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
            d="M5.14286 14C4.41735 12.8082 4 11.4118 4 9.91886C4 5.54539 7.58172 2 12 2C16.4183 2 20 5.54539 20 9.91886C20 11.4118 19.5827 12.8082 18.8571 14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={glassVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 14 / 24 }}
          />
          <motion.path
            d="M14 10C13.3875 10.6432 12.7111 11 12 11C11.2889 11 10.6125 10.6432 10 10"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={filamentVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 10.5 / 24 }}
          />
          <path
            d="M7.38287 17.0982C7.291 16.8216 7.24507 16.6833 7.25042 16.5713C7.26174 16.3343 7.41114 16.1262 7.63157 16.0405C7.73579 16 7.88105 16 8.17157 16H15.8284C16.119 16 16.2642 16 16.3684 16.0405C16.5889 16.1262 16.7383 16.3343 16.7496 16.5713C16.7549 16.6833 16.709 16.8216 16.6171 17.0982C16.4473 17.6094 16.3624 17.8651 16.2315 18.072C15.9572 18.5056 15.5272 18.8167 15.0306 18.9408C14.7935 19 14.525 19 13.9881 19H10.0119C9.47495 19 9.2065 19 8.96944 18.9408C8.47283 18.8167 8.04281 18.5056 7.7685 18.072C7.63755 17.8651 7.55266 17.6094 7.38287 17.0982Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M15 19L14.8707 19.6466C14.7293 20.3537 14.6586 20.7072 14.5001 20.9866C14.2552 21.4185 13.8582 21.7439 13.3866 21.8994C13.0816 22 12.7211 22 12 22C11.2789 22 10.9184 22 10.6134 21.8994C10.1418 21.7439 9.74484 21.4185 9.49987 20.9866C9.34144 20.7072 9.27073 20.3537 9.12932 19.6466L9 19"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.path
            d="M12 15.5V11"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={currentVariants}
            animate={controls}
            initial="normal"
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            {RAYS.map(({ d, delay }) => (
              <motion.path
                key={d}
                d={d}
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                variants={rayVariants}
                custom={delay}
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

BulbIcon.displayName = 'BulbIcon';

export { BulbIcon };
