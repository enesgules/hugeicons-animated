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

// the folder leans into the action and the add mark snaps firmly into place
const folderVariants: Variants = {
  normal: { transform: 'translateY(0px)' },
  animate: {
    transform: ['translateY(0px) rotate(0deg)', 'translateY(-1.7px) rotate(-2deg)', 'translateY(0.4px) rotate(0.7deg)', 'translateY(0px) rotate(0deg)'],
    transition: { duration: 0.56, ease: [0.23, 1, 0.32, 1] },
  },
};

const plusVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(1)' },
  animate: {
    transform: ['rotate(-18deg) scale(0.5)', 'rotate(5deg) scale(1.22)', 'rotate(-2deg) scale(0.97)', 'rotate(0deg) scale(1)'],
    transition: { duration: 0.5, delay: 0.08, ease: [0.23, 1, 0.32, 1] },
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
          <motion.path
            d="M13 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            variants={folderVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '11px 18px' }}
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
            style={{ transformOrigin: '18px 17px' }}
          />
        </svg>
      </div>
    );
  }
);

FolderAddIcon.displayName = 'FolderAddIcon';

export { FolderAddIcon };
