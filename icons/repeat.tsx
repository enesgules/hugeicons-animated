'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface RepeatIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface RepeatIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Chevron, as in arrow-right-02, on a loop: each arrowhead darts along its
// heading and stretches its track, recoils a little past rest, makes a softer
// second push, and settles. The top arrow leads, the bottom one follows.
const DART = [0, 2.6, -0.3, 0.45, 0];

const r = (value: number) => Math.round(value * 10000) / 10000;
const LOOPS = [
  (x: number) =>
    `M${r(16.3884 + x)} 3L${r(17.3913 + x)} 3.97574C${r(17.8393 + x)} 4.41165 ${r(18.0633 + x)} 4.62961 ${r(17.9844 + x)} 4.81481C${r(17.9056 + x)} 5 ${r(17.5888 + x)} 5 ${r(16.9552 + x)} 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16`,
  (x: number) =>
    `M${r(7.61156 - x)} 21L${r(6.60875 - x)} 20.0243C${r(6.16074 - x)} 19.5883 ${r(5.93673 - x)} 19.3704 ${r(6.01557 - x)} 19.1852C${r(6.09441 - x)} 19 ${r(6.4112 - x)} 19 ${r(7.04478 - x)} 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8`,
];

const loopVariants: Variants = {
  normal: (i: number) => ({ d: LOOPS[i](0) }),
  animate: (i: number) => ({
    d: DART.map((x) => LOOPS[i](x)),
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      times: [0, 0.3, 0.6, 0.8, 1],
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

const RepeatIcon = forwardRef<RepeatIconHandle, RepeatIconProps>(
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
            d={LOOPS[0](0)}
            variants={loopVariants}
            custom={0}
            animate={controls}
            initial="normal"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d={LOOPS[1](0)}
            variants={loopVariants}
            custom={1}
            animate={controls}
            initial="normal"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

RepeatIcon.displayName = 'RepeatIcon';

export { RepeatIcon };
