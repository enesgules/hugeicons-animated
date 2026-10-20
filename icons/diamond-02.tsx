'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Diamond02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Diamond02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const GLINT_DURATION = 0.9;
const GLINT_TIMES = [0, 0.18, 0.5, 1];
const GLINT_LAND = springEase(0.45, 0.35);

// Glint, shared by stars, sparkles and gems: a counter-turn with a squeeze,
// a pop that runs just past the pose, and a spring landing. The gem tilts
// instead of turning, its center facet flashes wide, and a twinkle spins
// open on its upper edge as it lands.
const svgVariants: Variants = {
  normal: { transform: 'translateY(0px) rotate(0deg) scale(1)' },
  animate: {
    transform: [
      'translateY(0px) rotate(0deg) scale(1)',
      'translateY(0.3px) rotate(3deg) scale(0.88)',
      'translateY(-1.1px) rotate(-4.5deg) scale(1.14)',
      'translateY(0px) rotate(0deg) scale(1)',
    ],
    transition: {
      duration: GLINT_DURATION,
      times: GLINT_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], GLINT_LAND],
    },
  },
};

const facetVariants: Variants = {
  normal: { transform: 'scaleX(1)' },
  animate: {
    transform: ['scaleX(1)', 'scaleX(0.55)', 'scaleX(1.55)', 'scaleX(1)'],
    transition: {
      duration: GLINT_DURATION,
      times: GLINT_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], GLINT_LAND],
    },
  },
};

const twinkleVariants: Variants = {
  normal: { transform: 'rotate(0deg) scale(0)', visibility: 'hidden' },
  animate: (start: number) => ({
    transform: [
      'rotate(0deg) scale(0)',
      'rotate(0deg) scale(0)',
      'rotate(90deg) scale(1)',
      'rotate(180deg) scale(0)',
      'rotate(180deg) scale(0)',
    ],
    visibility: ['hidden', 'hidden', 'visible', 'hidden', 'hidden'],
    transition: {
      duration: GLINT_DURATION,
      ease: ['linear', [0.23, 1, 0.32, 1], 'easeIn', 'linear'],
      times: [0, start, start + 0.12, start + 0.3, 1],
    },
  }),
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0.08 } },
};

const Diamond02Icon = forwardRef<Diamond02IconHandle, Diamond02IconProps>(
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
            d="M5.78223 4.18192C6.43007 3.68319 6.754 3.43383 7.12788 3.27323C7.29741 3.20041 7.47367 3.14158 7.65459 3.09741C8.0536 3 8.4767 3 9.32289 3H14.6771C15.5233 3 15.9464 3 16.3454 3.09741C16.5263 3.14158 16.7026 3.20041 16.8721 3.27323C17.246 3.43383 17.5699 3.68319 18.2178 4.18192C20.3644 5.83448 21.4378 6.66077 21.8057 7.73078C21.9694 8.20673 22.0305 8.70728 21.9858 9.20461C21.8852 10.3227 21.0379 11.346 19.3433 13.3925L15.3498 18.2153C13.8126 20.0718 13.044 21 12 21C10.956 21 10.1874 20.0718 8.65018 18.2153L4.65671 13.3925C2.96208 11.346 2.11476 10.3227 2.0142 9.20461C1.96947 8.70728 2.03064 8.20673 2.1943 7.73078C2.56224 6.66077 3.63557 5.83448 5.78223 4.18192Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <motion.path
            d="M10 8.5H14"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={facetVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 12 / 24, originY: 8.5 / 24 }}
          />
          <motion.g
            variants={generatedGeometryVariants}
            animate={controls}
            initial="normal"
          >
            <motion.path
              d="M19.1 1.9V6.7M16.7 4.3H21.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.5"
              variants={twinkleVariants}
              custom={0.4}
              animate={controls}
              initial="normal"
              style={{ transformBox: 'view-box', originX: 19.1 / 24, originY: 4.3 / 24 }}
            />
          </motion.g>
        </motion.svg>
      </div>
    );
  }
);

Diamond02Icon.displayName = 'Diamond02Icon';

export { Diamond02Icon };
