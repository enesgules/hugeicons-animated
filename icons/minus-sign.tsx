'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface MinusSignIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MinusSignIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const minusVariants: Variants = {
  normal: { scaleX: 1 },
  animate: {
    scaleX: [1, 0.35, 1.08, 1],
    transition: { duration: 0.42, ease: 'easeOut' },
  },
};

const MinusSignIcon = forwardRef<MinusSignIconHandle, MinusSignIconProps>(
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
          d="M20 12L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
          variants={minusVariants}
          animate={controls}
          initial="normal"
          style={{ transformOrigin: '12px 12px' }}
        />
        </svg>
      </div>
    );
  }
);

MinusSignIcon.displayName = 'MinusSignIcon';

export { MinusSignIcon };
