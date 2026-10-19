'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface BluetoothIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BluetoothIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The two side nodes swap places once: the left node orbits over the glyph
// and the right node under it, on opposing half-ellipses wide enough to clear
// the rune. The lower orbit is slightly flatter and accelerates more gently.
const leftNodeVariants: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [
      0, -1.56, -2.02, -1.82, -1.19, -0.26, 0.9, 2.22, 3.66, 5.19, 6.75, 8.31, 9.84, 11.28, 12.6,
      13.76, 14.69, 15.32, 15.52, 15.06, 13.5,
    ],
    y: [
      0, -1.83, -3.62, -5.31, -6.88, -8.27, -9.47, -10.42, -11.13, -11.56, -11.7, -11.56, -11.13,
      -10.42, -9.47, -8.27, -6.88, -5.31, -3.62, -1.83, 0,
    ],
    transition: {
      duration: 0.82,
      ease: 'linear',
      times: [
        0, 0.232, 0.292, 0.335, 0.368, 0.397, 0.422, 0.444, 0.464, 0.483, 0.5, 0.517, 0.536, 0.556,
        0.578, 0.603, 0.632, 0.665, 0.708, 0.768, 1,
      ],
    },
  },
};

const rightNodeVariants: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    x: [
      0, 1.45, 1.87, 1.66, 1.04, 0.12, -1.01, -2.31, -3.72, -5.22, -6.75, -8.28, -9.78, -11.19,
      -12.49, -13.62, -14.54, -15.16, -15.37, -14.95, -13.5,
    ],
    y: [
      0, 1.79, 3.54, 5.2, 6.73, 8.1, 9.26, 10.2, 10.89, 11.31, 11.45, 11.31, 10.89, 10.2, 9.26, 8.1,
      6.73, 5.2, 3.54, 1.79, 0,
    ],
    transition: {
      duration: 0.82,
      delay: 0.04,
      ease: 'linear',
      times: [
        0, 0.158, 0.224, 0.274, 0.316, 0.354, 0.387, 0.418, 0.447, 0.474, 0.5, 0.526, 0.553, 0.582,
        0.613, 0.646, 0.684, 0.726, 0.776, 0.842, 1,
      ],
    },
  },
};

// The copies sit exactly on the source nodes at both ends of the swap.
const nodeSourceVariants: Variants = {
  normal: { visibility: 'visible', transition: { duration: 0 } },
  animate: { visibility: 'hidden', transition: { duration: 0 } },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const BluetoothIcon = forwardRef<BluetoothIconHandle, BluetoothIconProps>(
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
          <motion.g variants={generatedGeometryVariants} animate={controls} initial="normal">
            <motion.path
              d="M5.37952 12H5.25452M5.50452 12C5.50452 12.1381 5.39259 12.25 5.25452 12.25C5.11645 12.25 5.00452 12.1381 5.00452 12C5.00452 11.8619 5.11645 11.75 5.25452 11.75C5.39259 11.75 5.50452 11.8619 5.50452 12Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={leftNodeVariants}
              animate={controls}
              initial="normal"
            />
            <motion.path
              d="M18.8795 12H18.7545M19.0045 12C19.0045 12.1381 18.8926 12.25 18.7545 12.25C18.6164 12.25 18.5045 12.1381 18.5045 12C18.5045 11.8619 18.6164 11.75 18.7545 11.75C18.8926 11.75 19.0045 11.8619 19.0045 12Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={rightNodeVariants}
              animate={controls}
              initial="normal"
            />
          </motion.g>
          <path
            d="M12.4742 12L16.2428 9.05534C17.3189 8.21451 17.857 7.79409 17.9716 7.24865C18.0144 7.04517 18.0154 6.83493 17.9748 6.63101C17.8657 6.08438 17.332 5.65832 16.2645 4.8062C14.6552 3.52156 13.8505 2.87924 13.1738 3.01878C12.9267 3.06975 12.6962 3.18351 12.504 3.34942C11.9779 3.80362 11.9779 4.84315 11.9779 6.92221V11.6122M12.4742 12L11.9779 12.3877M12.4742 12L16.2428 14.9446C17.319 15.7855 17.857 16.2059 17.9716 16.7513C18.0144 16.9548 18.0155 17.165 17.9748 17.369C17.8658 17.9156 17.332 18.3417 16.2645 19.1938C14.6552 20.4784 13.8505 21.1208 13.1738 20.9812C12.9266 20.9302 12.6962 20.8165 12.504 20.6506C11.9779 20.1964 11.9779 19.1568 11.9779 17.0778V12.3877M12.4742 12L11.9779 11.6122M11.9779 12.3877L6.00452 17.055M11.9779 12.3877V11.6122M11.9779 11.6122L6.00452 6.94494"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M5.37952 12H5.25452M18.8795 12H18.7545M5.50452 12C5.50452 12.1381 5.39259 12.25 5.25452 12.25C5.11645 12.25 5.00452 12.1381 5.00452 12C5.00452 11.8619 5.11645 11.75 5.25452 11.75C5.39259 11.75 5.50452 11.8619 5.50452 12ZM19.0045 12C19.0045 12.1381 18.8926 12.25 18.7545 12.25C18.6164 12.25 18.5045 12.1381 18.5045 12C18.5045 11.8619 18.6164 11.75 18.7545 11.75C18.8926 11.75 19.0045 11.8619 19.0045 12Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={nodeSourceVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  },
);

BluetoothIcon.displayName = 'BluetoothIcon';

export { BluetoothIcon };
