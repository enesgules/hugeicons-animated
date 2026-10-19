'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface EarthIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface EarthIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// rest-parity: split-source-path
// The source drawing is split into its exact rim and its two coastlines.
const EARTH_RIM =
  'M12 22C6.47715 22 2 17.5228 2 12C2 9.20746 3.14465 6.68227 4.99037 4.86802M12 22C16.9458 22 21.053 18.4096 21.8573 13.693M21.8573 13.693C21.9511 13.1427 22 12.5771 22 12C22 7.11857 18.5024 3.05405 13.8766 2.17579M13.8766 2.17579C13.2687 2.06039 12.6414 2 12 2C9.26969 2 6.79495 3.09421 4.99037 4.86802';
const EARTH_LAND =
  'M12 22C11.037 21.2864 11.1907 20.4555 11.6738 19.6247C12.4166 18.3474 12.4166 18.3474 12.4166 16.6444C12.4166 14.9414 13.4286 14.1429 17 14.8571C18.6047 15.1781 19.7741 12.9609 21.8573 13.693M13.8766 2.17579C14.3872 3.11599 14.1816 4.23551 13.1027 4.66298C11.3429 5.3603 12.6029 6.64343 11.1035 7.4356C10.1038 7.96372 8.6044 7.83152 7.10496 6.24716C6.31517 5.41264 5.83966 4.95765 4.99037 4.86802';

const SPIN_DURATION = 1.3;
const SPIN_TIMES = [0, 0.16, 0.78, 0.9, 1];
const SPIN_EASE: Easing[] = ['easeInOut', [0.45, 0, 0.25, 1], 'easeInOut', 'easeOut'];

// The globe turns once on its axis: the coastlines ease back, then slide
// east behind the rim while an identical copy of the same land rotates in
// from the west and lands exactly on the rest drawing.
const landVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: [
      'translateX(0px)',
      'translateX(-1.2px)',
      'translateX(20.8px)',
      'translateX(19.8px)',
      'translateX(20px)',
    ],
    transition: { duration: SPIN_DURATION, ease: SPIN_EASE, times: SPIN_TIMES },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const landCopyVariants: Variants = {
  normal: { transform: 'translateX(-20px)' },
  animate: {
    transform: [
      'translateX(-20px)',
      'translateX(-21.2px)',
      'translateX(0.8px)',
      'translateX(-0.2px)',
      'translateX(0px)',
    ],
    transition: { duration: SPIN_DURATION, ease: SPIN_EASE, times: SPIN_TIMES },
  },
};

const EarthIcon = forwardRef<EarthIconHandle, EarthIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const clipId = useId();
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
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="10" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>
            <motion.g
              variants={generatedGeometryVariants}
              animate={controls}
              initial="normal"
            >
              <motion.path
                d={EARTH_LAND}
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.5"
                variants={landCopyVariants}
                animate={controls}
                initial="normal"
              />
            </motion.g>
            <motion.path
              d={EARTH_LAND}
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={landVariants}
              animate={controls}
              initial="normal"
            />
          </g>
          <path
            d={EARTH_RIM}
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

EarthIcon.displayName = 'EarthIcon';

export { EarthIcon };
