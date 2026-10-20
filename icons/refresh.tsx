'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface RefreshIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface RefreshIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const TURN_LAND = springEase(0.45, 0.35);

// Turn: winds up against the turn, whips one full turn a little past rest,
// and lands with a spring. 360 deg matches rest.
const svgVariants: Variants = {
  normal: { transform: 'rotate(0deg)' },
  animate: {
    transform: ['rotate(0deg)', 'rotate(-18deg)', 'rotate(384deg)', 'rotate(360deg)'],
    transition: {
      duration: 0.8,
      times: [0, 0.15, 0.55, 1],
      ease: ['easeOut', [0.4, 0, 0.2, 1], TURN_LAND],
    },
  },
};

const RefreshIcon = forwardRef<RefreshIconHandle, RefreshIconProps>(
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
            d="M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12"
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

RefreshIcon.displayName = 'RefreshIcon';

export { RefreshIcon };
