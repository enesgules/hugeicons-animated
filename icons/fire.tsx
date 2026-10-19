'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface FireIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FireIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FLAME_REST =
  'M13.8561 22C26.0783 19 19.2338 7 10.9227 2C9.9453 5.5 8.47838 6.5 5.54497 10C1.66121 14.6339 3.5895 20 8.96719 22C8.1524 21 6.04958 18.9008 7.5 16C8 15 9 14 8.5 12C9.47778 12.5 11.5 13 12 15.5C12.8148 14.5 13.6604 12.4 12.8783 10C19 14.5 16.5 19 13.8561 22Z';
const FLAME_LICK_LEFT =
  'M13.8561 22C26.0046 18.88 17.8487 6.4 8.2227 1.2C8.2307 4.84 6.989 5.88 4.6818 9.52C1.3214 14.3393 3.5514 19.92 8.9672 22C8.1615 20.935 6.1053 18.6994 7.6602 15.61C8.2051 14.545 9.2539 13.48 8.8629 11.35C9.8121 11.8825 11.8066 12.415 12.1821 15.0775C13.0438 14.0125 14.0003 11.776 13.3641 9.22C19.229 14.0125 16.5529 18.805 13.8561 22Z';
const FLAME_RISE =
  'M13.8561 22C26.0984 18.82 19.742 6.1 12.0227 0.8C10.5963 4.51 9.0313 5.57 5.8387 9.28C1.7633 14.1919 3.5998 19.88 8.9672 22C8.1466 21.015 6.0141 18.9473 7.398 16.09C7.8695 15.105 8.8384 14.12 8.2691 12.15C9.2651 12.6425 11.3049 13.135 11.8841 15.5975C12.6691 14.6125 13.4441 12.544 12.5692 10.18C18.8543 14.6125 16.4664 19.045 13.8561 22Z';
const FLAME_LICK_RIGHT =
  'M13.8561 22C26.1521 18.94 20.6554 6.7 13.7227 1.6C11.7109 5.17 10.0087 6.19 6.4249 9.76C2.004 14.4866 3.6276 19.96 8.9672 22C8.1574 20.925 6.08 18.6684 7.5874 15.55C8.1119 14.475 9.1385 13.4 8.6979 11.25C9.6601 11.7875 11.6672 12.325 12.0993 15.0125C12.9397 13.9375 13.8458 11.68 13.1433 9.1C19.1249 13.9375 16.5288 18.775 13.8561 22Z';
const FLAME_DROP =
  'M13.8561 22C26.0534 19.075 18.6625 7.375 9.7227 2.5C9.2208 5.9125 7.859 6.8875 5.207 10.3C1.5389 14.8181 3.5767 20.05 8.9672 22C8.1449 20.97 6.004 18.8078 7.3689 15.82C7.8322 14.79 8.7923 13.76 8.2031 11.7C9.2043 12.215 11.2492 12.73 11.851 15.305C12.6274 14.275 13.3823 12.112 12.4808 9.64C18.8126 14.275 16.4567 18.91 13.8561 22Z';

// Drawn flame frames: the base stays rooted while the outer tongue licks
// left, rises, licks right and drops, and the inner tongue flickers off-beat.
// Every frame keeps the source command list, so the outline morphs smoothly.
const flameVariants: Variants = {
  normal: { d: FLAME_REST, transition: { duration: 0.25, ease: 'easeOut' } },
  animate: {
    d: [FLAME_REST, FLAME_LICK_LEFT, FLAME_RISE, FLAME_LICK_RIGHT, FLAME_DROP, FLAME_REST],
    transition: {
      duration: 1.05,
      ease: 'easeInOut',
      times: [0, 0.2, 0.42, 0.62, 0.82, 1],
      repeat: Infinity,
    },
  },
};

const FireIcon = forwardRef<FireIconHandle, FireIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const { handleMouseEnter, handleMouseLeave } = useIconAnimation({
      controls,
      loops: true,
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
            d={FLAME_REST}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={flameVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

FireIcon.displayName = 'FireIcon';

export { FireIcon };
