'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface SaveIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface SaveIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// the disk presses into place, then a drawn check confirms the write
const saveBodyVariants: Variants = {
  normal: { scale: 1, translateY: 0, transition: { type: 'spring', duration: 0.45, bounce: 0 } },
  animate: {
    scale: [1, 0.97, 1.025, 1],
    translateY: [0, 0.5, 0],
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const saveSlotVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, 1.2, 0],
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

const saveCheckVariants: Variants = {
  normal: { opacity: 0, pathLength: 0, scale: 0.5 },
  animate: {
    opacity: [0, 0, 1],
    pathLength: [0, 0, 1],
    scale: [0.5, 0.5, 1],
    transition: { duration: 0.75, times: [0, 0.48, 1], ease: 'easeOut' },
  },
};

const SaveIcon = forwardRef<SaveIconHandle, SaveIconProps>(
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
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          overflow="visible"
          variants={saveBodyVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        >
          <path
            d="M15.8787 3H11C7.22876 3 5.34315 3 4.17157 4.17157C3 5.34315 3 7.22876 3 11V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H13C16.7712 21 18.6569 21 19.8284 19.8284C21 18.6569 21 16.7712 21 13V8.12132C21 7.66475 21 7.43646 20.9758 7.2174C20.8924 6.4633 20.5963 5.74846 20.122 5.15629C19.9843 4.98427 19.8228 4.82285 19.5 4.5C19.1772 4.17715 19.0157 4.01573 18.8437 3.87795C18.2515 3.40366 17.5367 3.10757 16.7826 3.02421C16.5635 3 16.3353 3 15.8787 3Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M17 3.5V4C17 5.88562 17 6.82843 16.4142 7.41421C15.8284 8 14.8856 8 13 8H11C9.11438 8 8.17157 8 7.58579 7.41421C7 6.82843 7 5.88562 7 4V3.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={saveSlotVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path
            d="M17 20.5V17C17 15.1144 17 14.1716 16.4142 13.5858C15.8284 13 14.8856 13 13 13H11C9.11438 13 8.17157 13 7.58579 13.5858C7 14.1716 7 15.1144 7 17V20.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={saveSlotVariants}
            animate={controls}
            initial="normal"
          />
          <motion.path d="M9.4 16.8L11.1 18.3L14.8 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" variants={saveCheckVariants} animate={controls} initial="normal" style={{ transformOrigin: '12px 17px' }} />
        </motion.svg>
      </div>
    );
  }
);

SaveIcon.displayName = 'SaveIcon';

export { SaveIcon };
