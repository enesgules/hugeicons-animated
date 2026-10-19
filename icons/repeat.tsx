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

// the refresh whip done twice: rewind, half turn, a short beat, then the same
// again. The loop is point-symmetric, so 180 deg and 360 deg both match rest.
const svgVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [0, -20, 180, 166, 360],
    transition: {
      duration: 1.2,
      times: [0, 0.14, 0.46, 0.6, 1],
      ease: ['easeIn', 'easeOut', 'easeIn', 'easeOut'],
    },
  },
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
          style={{ transformOrigin: '50% 50%' }}
        >
          <path
            d="M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>
    );
  }
);

RepeatIcon.displayName = 'RepeatIcon';

export { RepeatIcon };
