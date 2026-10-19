'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Image01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Image01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

// Sunset and sunrise: the sun lifts slightly, sinks down and to the right behind
// the hill (a mask just above the hill line hides it), then rises back up with a
// small overshoot. The frame and the hill stay still.
const SUN_EASE: Easing[] = [
  'easeOut',
  'easeIn',
  'linear',
  [0.23, 1, 0.32, 1],
  'easeInOut',
];

const sunVariants: Variants = {
  normal: { translateX: 0, translateY: 0 },
  animate: {
    translateX: [0, -0.25, 3.6, 3.6, -0.28, 0],
    translateY: [0, -0.6, 9.2, 9.2, -0.7, 0],
    transition: {
      duration: 1.2,
      ease: SUN_EASE,
      times: [0, 0.1, 0.4, 0.55, 0.83, 1],
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

const Image01Icon = forwardRef<Image01IconHandle, Image01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const maskId = useId();
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
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="-4" y="-4" width="32" height="32">
              <rect x="-4" y="-4" width="32" height="32" fill="white" />
              <motion.g
                variants={generatedGeometryVariants}
                animate={controls}
                initial="normal"
              >
                {/* the hill line raised by 2.5, closed below: everything under it is land */}
                <path
                  d="M5 18.5C9.37246 13.275 14.2741 6.38406 21.4975 11.0424L28 11.0424V28H-4V18.5Z"
                  fill="black"
                />
              </motion.g>
            </mask>
          </defs>
          <g mask={`url(#${maskId})`}>
            <motion.circle
              cx="7.5"
              cy="7.5"
              r="1.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              variants={sunVariants}
              animate={controls}
              initial="normal"
            />
          </g>
          <path
            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }
);

Image01Icon.displayName = 'Image01Icon';

export { Image01Icon };
