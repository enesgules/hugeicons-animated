'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ChevronUpIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChevronUpIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const chevronVariants: Variants = {
  normal: { translateY: 0 },
  animate: {
    translateY: [0, -1.75, 0.35, 0],
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const ChevronUpIcon = forwardRef<ChevronUpIconHandle, ChevronUpIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
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
          d="M18 15C18 15 13.5811 9.00001 12 9C10.4188 8.99999 6 15 6 15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={chevronVariants}
          animate={controls}
          initial="normal"
        />
        </svg>
      </div>
    );
  }
);

ChevronUpIcon.displayName = 'ChevronUpIcon';

export { ChevronUpIcon };
