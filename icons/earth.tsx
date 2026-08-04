'use client';

import type { Variants } from 'motion/react';
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
// The original continuous drawing is separated into its exact rim and land
// segments. One continuous world strip wraps behind the rim as the globe turns.
const EARTH_RIM =
  'M12 22C6.47715 22 2 17.5228 2 12C2 9.20746 3.14465 6.68227 4.99037 4.86802M12 22C16.9458 22 21.053 18.4096 21.8573 13.693M21.8573 13.693C21.9511 13.1427 22 12.5771 22 12C22 7.11857 18.5024 3.05405 13.8766 2.17579M13.8766 2.17579C13.2687 2.06039 12.6414 2 12 2C9.26969 2 6.79495 3.09421 4.99037 4.86802';
const EARTH_WORLD_START =
  'M12 22C11.037 21.2864 11.1907 20.4555 11.6738 19.6247C12.4166 18.3474 12.4166 18.3474 12.4166 16.6444C12.4166 14.9414 13.4286 14.1429 17 14.8571C18.6047 15.1781 19.7741 12.9609 21.8573 13.693C23.2 13.9 24.2 12.4 25.5 11.8C27 11.1 28.4 12.3 29.5 13.6C30.6 15 31.1 16.6 32.6 17.1C34.1 18 35.4 21.4 36.2 22M75 22C74.037 21.2864 74.1907 20.4555 74.6738 19.6247C75.4166 18.3474 75.4166 18.3474 75.4166 16.6444C75.4166 14.9414 76.4286 14.1429 80 14.8571C81.6047 15.1781 82.7741 12.9609 84.8573 13.693M4.99037 4.86802C5.83966 4.95765 6.31517 5.41264 7.10496 6.24716C8.6044 7.83152 10.1038 7.96372 11.1035 7.4356C12.6029 6.64343 11.3429 5.3603 13.1027 4.66298C14.1816 4.23551 14.3872 3.11599 13.8766 2.17579C15.6 0.7 18.3 0.3 20.2 1.5C21.2 2.2 21.9 3.3 22.4 4.4C23.8 8.5 24.6 6.6 25.9 5.8C27.3 5 28.8 6 29.7 7.4C30.7 8.9 32.3 8.6 33.5 7.5C34.8 6.2 36.3 6.7 37.4 8C38.5 9.3 39 10.8 40.5 11.1C42.1 11.4 43.5 10.2 44.8 9.1C46.2 7.8 47.8 8.2 49.1 9.5C50.5 10.9 52 10.4 53.1 9.1C54.4 7.6 55.7 5.9 57.5 5.7C59.5 5.5 61 7 62.2 7.8C63.4 8.6 63.4 2.2 64.5 1.2C65.6 0.2 66.8 1.4 67.99037 4.86802C68.83966 4.95765 69.31517 5.41264 70.10496 6.24716C71.6044 7.83152 73.1038 7.96372 74.1035 7.4356C75.6029 6.64343 74.3429 5.3603 76.1027 4.66298C77.1816 4.23551 77.3872 3.11599 76.8766 2.17579M42.4 17.2C45.5 16.3 52.8 16.5 55.8 18.2C56.3 20 52.4 21.4 47.2 21.2C43.7 21 41.6 18.6 42.4 17.2Z';
const EARTH_WORLD_END =
  'M-51 22C-51.963 21.2864 -51.8093 20.4555 -51.3262 19.6247C-50.5834 18.3474 -50.5834 18.3474 -50.5834 16.6444C-50.5834 14.9414 -49.5714 14.1429 -46 14.8571C-44.3953 15.1781 -43.2259 12.9609 -41.1427 13.693C-39.8 13.9 -38.8 12.4 -37.5 11.8C-36 11.1 -34.6 12.3 -33.5 13.6C-32.4 15 -31.9 16.6 -30.4 17.1C-28.9 18 -27.6 21.4 -26.8 22M12 22C11.037 21.2864 11.1907 20.4555 11.6738 19.6247C12.4166 18.3474 12.4166 18.3474 12.4166 16.6444C12.4166 14.9414 13.4286 14.1429 17 14.8571C18.6047 15.1781 19.7741 12.9609 21.8573 13.693M-58.00963 4.86802C-57.16034 4.95765 -56.68483 5.41264 -55.89504 6.24716C-54.3956 7.83152 -52.8962 7.96372 -51.8965 7.4356C-50.3971 6.64343 -51.6571 5.3603 -49.8973 4.66298C-48.8184 4.23551 -48.6128 3.11599 -49.1234 2.17579C-47.4 0.7 -44.7 0.3 -42.8 1.5C-41.8 2.2 -41.1 3.3 -40.6 4.4C-39.2 8.5 -38.4 6.6 -37.1 5.8C-35.7 5 -34.2 6 -33.3 7.4C-32.3 8.9 -30.7 8.6 -29.5 7.5C-28.2 6.2 -26.7 6.7 -25.6 8C-24.5 9.3 -24 10.8 -22.5 11.1C-20.9 11.4 -19.5 10.2 -18.2 9.1C-16.8 7.8 -15.2 8.2 -13.9 9.5C-12.5 10.9 -11 10.4 -9.9 9.1C-8.6 7.6 -7.3 5.9 -5.5 5.7C-3.5 5.5 -2 7 -0.8 7.8C0.4 8.6 0.4 2.2 1.5 1.2C2.6 0.2 3.8 1.4 4.99037 4.86802C5.83966 4.95765 6.31517 5.41264 7.10496 6.24716C8.6044 7.83152 10.1038 7.96372 11.1035 7.4356C12.6029 6.64343 11.3429 5.3603 13.1027 4.66298C14.1816 4.23551 14.3872 3.11599 13.8766 2.17579M-20.6 17.2C-17.5 16.3 -10.2 16.5 -7.2 18.2C-6.7 20 -10.6 21.4 -15.8 21.2C-19.3 21 -21.4 18.6 -20.6 17.2Z';

const worldVariants: Variants = {
  normal: { d: EARTH_WORLD_START },
  animate: {
    d: EARTH_WORLD_END,
    transition: { duration: 1.7, ease: 'linear' },
  },
};

const globeVariants: Variants = {
  normal: { rotate: 0, scaleX: 1, scaleY: 1, y: 0 },
  animate: {
    rotate: [0, -0.6, 0.45, 0],
    scaleX: [1, 1.035, 1.015, 1],
    scaleY: [1, 0.965, 0.985, 1],
    y: [0, 0.14, -0.06, 0],
    transition: {
      duration: 1.7,
      ease: [0.37, 0, 0.63, 1],
      times: [0, 0.32, 0.72, 1],
    },
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
            <clipPath id={clipId}>
              <circle cx="12" cy="12" r="10" />
            </clipPath>
          </defs>
          <motion.g
            variants={globeVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '12px 12px' }}
          >
            <path
              d={EARTH_RIM}
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <g clipPath={`url(#${clipId})`}>
              <motion.path
                d={EARTH_WORLD_START}
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.5"
                variants={worldVariants}
                animate={controls}
                initial="normal"
              />
            </g>
          </motion.g>
        </svg>
      </div>
    );
  }
);

EarthIcon.displayName = 'EarthIcon';

export { EarthIcon };
