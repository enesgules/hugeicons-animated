'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface ArrowReloadHorizontalIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ArrowReloadHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Turn, as in refresh: the two-arrow loop rewinds slightly, then whips a full
// revolution; 360 ≡ 0, so the end pose is the rest pose.
const svgVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -25, 360],
    transition: { duration: 0.9, times: [0, 0.2, 1], ease: ['easeIn', 'easeOut'] },
  },
};

const ArrowReloadHorizontalIcon = forwardRef<
  ArrowReloadHorizontalIconHandle,
  ArrowReloadHorizontalIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
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
        variants={svgVariants}
        animate={controls}
        initial="normal"
      >
        <path d="M20.5 5.5H9.5C5.78672 5.5 3 8.18503 3 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M3.5 18.5H14.5C18.2133 18.5 21 15.815 21 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M18.5 3C18.5 3 21 4.84122 21 5.50002C21 6.15882 18.5 8 18.5 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <path d="M5.49998 16C5.49998 16 3.00001 17.8412 3 18.5C2.99999 19.1588 5.5 21 5.5 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </motion.svg>
    </div>
  );
});

ArrowReloadHorizontalIcon.displayName = 'ArrowReloadHorizontalIcon';

export { ArrowReloadHorizontalIcon };
