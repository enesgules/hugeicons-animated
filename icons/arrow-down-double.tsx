'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowDownDoubleIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowDownDoubleIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Nudge, as in the chevrons: a quick dart along the arrow, a small recoil
// past rest, and a softer second push before it settles. The front chevron
// leads and the back one follows a beat later, so the gap between them
// breathes but never closes.
const chevronVariants: Variants = {
  normal: { transform: 'translateY(0px) scaleX(1)' },
  animate: (i: number) => ({
    transform: [
      'translateY(0px) scaleX(1)',
      'translateY(2.4px) scaleX(0.9)',
      'translateY(-0.45px) scaleX(1.04)',
      'translateY(0.8px) scaleX(0.97)',
      'translateY(0px) scaleX(1)',
    ],
    transition: { duration: 0.56, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] },
  }),
};

const ArrowDownDoubleIcon = forwardRef<ArrowDownDoubleIconHandle, ArrowDownDoubleIconProps>(
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
            d="M17.9997 12.5C17.9997 12.5 13.5807 18.5 11.9996 18.5C10.4185 18.5 5.99966 12.5 5.99966 12.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={chevronVariants}
            custom={0}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 15.5 / 24 }}
          />
          <motion.path
            d="M17.9997 5.50005C17.9997 5.50005 13.5807 11.5 11.9996 11.5C10.4185 11.5 5.99966 5.5 5.99966 5.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={chevronVariants}
            custom={1}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 8.5 / 24 }}
          />
        </svg>
      </div>
    );
  }
);

ArrowDownDoubleIcon.displayName = 'ArrowDownDoubleIcon';

export { ArrowDownDoubleIcon };
