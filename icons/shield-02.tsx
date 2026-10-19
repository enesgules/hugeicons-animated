'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Shield02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Shield02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const SHIELD_PATH =
  'M18.7088 3.49534C16.8165 2.55382 14.5009 2 12 2C9.4991 2 7.1835 2.55382 5.29116 3.49534C4.36318 3.95706 3.89919 4.18792 3.4496 4.91378C3 5.63965 3 6.34248 3 7.74814V11.2371C3 16.9205 7.54236 20.0804 10.173 21.4338C10.9067 21.8113 11.2735 22 12 22C12.7265 22 13.0933 21.8113 13.8269 21.4338C16.4576 20.0804 21 16.9205 21 11.2371L21 7.74814C21 6.34249 21 5.63966 20.5504 4.91378C20.1008 4.18791 19.6368 3.95706 18.7088 3.49534Z';
const SHIELD_BOSS_PATH =
  'M15 11C15 12.6568 13.6569 14 12 14C10.3431 14 9 12.6568 9 11C9 9.34314 10.3431 8 12 8C13.6569 8 15 9.34314 15 11Z';

const SHIELD_DURATION = 1;

// The shield is raised: it dips, lifts, and a polished glint sweeps across
// its face from the top left. The glint stays inside the rim and passes
// behind the raised boss, then the shield settles back down.
const shieldVariants: Variants = {
  normal: { y: 0 },
  animate: {
    y: [0, 0.45, -1.1, -1.1, 0.2, 0],
    transition: {
      duration: SHIELD_DURATION,
      times: [0, 0.12, 0.3, 0.66, 0.84, 1],
      ease: ['easeOut', [0.3, 0, 0.2, 1], 'linear', 'easeInOut', 'easeOut'],
    },
  },
};

const glintVariants: Variants = {
  normal: { x: 4, y: 4 },
  animate: {
    x: [4, 4, 21, 21],
    y: [4, 4, 21, 21],
    transition: {
      duration: SHIELD_DURATION,
      times: [0, 0.2, 0.64, 1],
      ease: ['linear', [0.45, 0, 0.55, 1], 'linear'],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: {
    visibility: ['visible', 'visible', 'hidden'],
    transition: { duration: SHIELD_DURATION, times: [0, 0.99, 1] },
  },
};

const Shield02Icon = forwardRef<Shield02IconHandle, Shield02IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const faceMaskId = useId();
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
          <defs>
            {/* The shield face, inset from the rim and with the boss cut out. */}
            <mask id={faceMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <path d={SHIELD_PATH} fill="white" stroke="black" strokeWidth="2.7" />
              <path d={SHIELD_BOSS_PATH} fill="black" stroke="black" strokeWidth="2.7" />
            </mask>
          </defs>
          <motion.g variants={shieldVariants} animate={controls} initial="normal">
            <motion.g variants={generatedGeometryVariants} animate={controls} initial="normal">
              <g mask={`url(#${faceMaskId})`}>
                <motion.path
                  d="M-10 10L10 -10M-11.84 8.16L8.16 -11.84"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  variants={glintVariants}
                  animate={controls}
                  initial="normal"
                />
              </g>
            </motion.g>
            <path
              d={SHIELD_PATH}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d={SHIELD_BOSS_PATH}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

Shield02Icon.displayName = 'Shield02Icon';

export { Shield02Icon };
