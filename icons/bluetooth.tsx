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

// The two nodes swap sides once: one takes the upper half-arc and the other
// takes a slightly shallower lower half-arc with its own acceleration.
const LEFT_HALF_ORBIT_TIMES = [0, 0.07, 0.16, 0.28, 0.43, 0.59, 0.73, 0.88, 1];
const RIGHT_HALF_ORBIT_TIMES = [0, 0.1, 0.22, 0.34, 0.49, 0.63, 0.77, 0.9, 1];

const leftNodeVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(0.6px, -3.7px)',
      'translate(2.4px, -6.9px)',
      'translate(4.7px, -9.1px)',
      'translate(6.8px, -10.2px)',
      'translate(9px, -9.5px)',
      'translate(11.2px, -7px)',
      'translate(12.9px, -3.5px)',
      'translate(13.5px, 0px)',
    ],
    transition: { duration: 0.72, ease: 'linear', times: LEFT_HALF_ORBIT_TIMES },
  },
};

const rightNodeVariants: Variants = {
  normal: { transform: 'translate(0px, 0px)' },
  animate: {
    transform: [
      'translate(0px, 0px)',
      'translate(-0.4px, 3.4px)',
      'translate(-2px, 6.5px)',
      'translate(-4.3px, 8.8px)',
      'translate(-6.5px, 9.8px)',
      'translate(-8.8px, 9.1px)',
      'translate(-11px, 6.7px)',
      'translate(-12.7px, 3.2px)',
      'translate(-13.5px, 0px)',
    ],
    transition: { duration: 0.76, ease: 'linear', times: RIGHT_HALF_ORBIT_TIMES },
  },
};

const nodeSourceVariants: Variants = {
  normal: { visibility: 'visible', transition: { duration: 0.08 } },
  animate: { visibility: 'hidden', transition: { duration: 0.08 } },
};
const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0.08 } },
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
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
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
  }
);

BluetoothIcon.displayName = 'BluetoothIcon';

export { BluetoothIcon };
