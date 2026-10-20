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

// Chevron, as in arrow-right-02, on a loop: each arrowhead darts along its
// heading and pulls its track with it, recoils a little past rest, makes a
// softer second push, and settles. The top arrow leads, the bottom one follows.
const DART = [0, 2.6, -0.3, 0.45, 0];
const DART_TIMES = [0, 0.3, 0.6, 0.8, 1];

const headVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleY(1)' },
  animate: (direction: number) => ({
    transform: DART.map(
      (x, k) => `translateX(${x * direction}px) scaleY(${[1, 0.94, 1.02, 0.99, 1][k]})`
    ),
    transition: {
      duration: 0.6,
      delay: direction > 0 ? 0 : 0.12,
      times: DART_TIMES,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

const TRACKS = [
  (x: number) => `M${20.5 + x} 5.5H9.5C5.78672 5.5 3 8.18503 3 12`,
  (x: number) => `M${3.5 - x} 18.5H14.5C18.2133 18.5 21 15.815 21 12`,
];

const trackVariants: Variants = {
  normal: (i: number) => ({ d: TRACKS[i](0) }),
  animate: (i: number) => ({
    d: DART.map((x) => TRACKS[i](x)),
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      times: DART_TIMES,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        overflow="visible"
      >
        <motion.path d={TRACKS[0](0)} variants={trackVariants} custom={0} animate={controls} initial="normal" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <motion.path d={TRACKS[1](0)} variants={trackVariants} custom={1} animate={controls} initial="normal" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <motion.path variants={headVariants} custom={1} animate={controls} initial="normal" style={{ transformBox: 'view-box', originX: 21 / 24, originY: 5.5 / 24 }} d="M18.5 3C18.5 3 21 4.84122 21 5.50002C21 6.15882 18.5 8 18.5 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        <motion.path variants={headVariants} custom={-1} animate={controls} initial="normal" style={{ transformBox: 'view-box', originX: 3 / 24, originY: 18.5 / 24 }} d="M5.49998 16C5.49998 16 3.00001 17.8412 3 18.5C2.99999 19.1588 5.5 21 5.5 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
});

ArrowReloadHorizontalIcon.displayName = 'ArrowReloadHorizontalIcon';

export { ArrowReloadHorizontalIcon };
