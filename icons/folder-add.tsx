'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FolderAddIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FolderAddIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// The plus is wound back, then twisted a quarter turn into the folder corner
// like a screw locking home. A plus turned 90 degrees matches its rest pose.
const plusVariants: Variants = {
  normal: { rotate: 0, scale: 1 },
  animate: {
    rotate: [0, -16, 104, 86, 91, 90],
    scale: [1, 0.84, 1.1, 0.97, 1.01, 1],
    transition: {
      duration: 0.75,
      ease: ['easeOut', [0.3, 0, 0.2, 1], 'easeInOut', 'easeInOut', 'easeOut'],
      times: [0, 0.2, 0.55, 0.72, 0.86, 1],
    },
  },
};

const FolderAddIcon = forwardRef<FolderAddIconHandle, FolderAddIconProps>(
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
            d="M13 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M18 13V21M22 17H14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={plusVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 18 / 24, originY: 17 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

FolderAddIcon.displayName = 'FolderAddIcon';

export { FolderAddIcon };
