'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface CrownIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CrownIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Crowning: the crown crouches on its base, hops up, rocks once side to side
// in the air like a hand setting it straight, and drops back onto the base
// with a squash and a small rebound. The jewel stays put and pops as the
// crown lands around it.
const CROWN_DURATION = 1;
const SNAP = [0.23, 1, 0.32, 1] as const;

const crownVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg) scaleX(1) scaleY(1)',
      'translateY(0.4px) rotate(0deg) scaleX(1.04) scaleY(0.93)',
      'translateY(-3px) rotate(-7deg) scaleX(0.98) scaleY(1.03)',
      'translateY(-3px) rotate(6deg) scaleX(1) scaleY(1)',
      'translateY(0px) rotate(0deg) scaleX(1.05) scaleY(0.92)',
      'translateY(-0.5px) rotate(0deg) scaleX(0.99) scaleY(1.02)',
      'translateY(0px) rotate(0deg) scaleX(1) scaleY(1)',
    ],
    transition: {
      duration: CROWN_DURATION,
      times: [0, 0.14, 0.36, 0.54, 0.68, 0.82, 1],
      ease: [SNAP, SNAP, 'easeInOut', [0.55, 0, 1, 0.45], SNAP, 'easeInOut'],
    },
  },
};

const jewelVariants: Variants = {
  normal: { transform: 'scale(1)' },
  animate: {
    transform: ['scale(1)', 'scale(1)', 'scale(0.4)', 'scale(1.35)', 'scale(1)'],
    transition: {
      duration: CROWN_DURATION,
      times: [0, 0.5, 0.68, 0.8, 1],
      ease: ['linear', 'easeIn', SNAP, 'easeInOut'],
    },
  },
};

const CrownIcon = forwardRef<CrownIconHandle, CrownIconProps>(
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
          <path
            d="M5 21H19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            variants={jewelVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 12.75 / 24 }}
            d="M12.125 12.75H12M12.25 12.75C12.25 12.8881 12.1381 13 12 13C11.8619 13 11.75 12.8881 11.75 12.75C11.75 12.6119 11.8619 12.5 12 12.5C12.1381 12.5 12.25 12.6119 12.25 12.75Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.g
            variants={crownVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 0.5, originY: 17 / 24 }}
          >
            <path
              d="M14.9152 7.61089L13.8078 5.38179C13.019 3.79393 12.6246 3 12 3C11.3754 3 10.981 3.79393 10.1922 5.38179L9.08483 7.61089C8.58107 8.62494 8.32919 9.13197 7.87976 9.24608C7.8485 9.25401 7.81689 9.26043 7.78503 9.26533C7.32682 9.3357 6.89919 8.96678 6.04393 8.22895C4.0124 6.47635 2.99663 5.60004 2.38034 5.94899C2.34045 5.97157 2.30213 5.99686 2.26565 6.02467C1.70197 6.45439 2.09541 7.74136 2.88229 10.3153L4.04783 14.1279C4.47098 15.5121 4.68255 16.2042 5.21787 16.6021C5.75318 17 6.47261 17 7.91147 17L16.0886 16.9999C17.5274 16.9999 18.2468 16.9999 18.7821 16.602C19.3175 16.2041 19.529 15.512 19.9522 14.1279L21.1177 10.3153C21.9046 7.74137 22.298 6.4544 21.7344 6.02468C21.6979 5.99687 21.6595 5.97158 21.6197 5.94899C21.0034 5.60006 19.9876 6.47636 17.9561 8.22896C17.1008 8.96679 16.6732 9.3357 16.215 9.26533C16.1831 9.26043 16.1515 9.25401 16.1202 9.24607C15.6708 9.13197 15.4189 8.62494 14.9152 7.61089Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

CrownIcon.displayName = 'CrownIcon';

export { CrownIcon };
