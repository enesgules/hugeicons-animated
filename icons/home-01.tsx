'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Home01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Home01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const HOME_TIMES = [0, 0.18, 0.42, 0.6, 0.78, 1];

const DOOR_SMILE = 'M15.0002 17C14.2007 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79971 17.6224 9.00018 17';

// a welcoming hop: the house crouches on its base, springs up, lands with a
// squash, and the door smile widens into a grin as it lands
const svgVariants: Variants = {
  normal: { transform: 'translateY(0%) scaleX(1) scaleY(1)' },
  animate: {
    transform: [
      'translateY(0%) scaleX(1) scaleY(1)',
      'translateY(0%) scaleX(1.06) scaleY(0.9)',
      'translateY(-8%) scaleX(0.97) scaleY(1.05)',
      'translateY(0%) scaleX(1.05) scaleY(0.93)',
      'translateY(0%) scaleX(0.99) scaleY(1.02)',
      'translateY(0%) scaleX(1) scaleY(1)',
    ],
    transition: {
      duration: 0.85,
      ease: ['easeOut', [0.33, 0, 0.2, 1], 'easeIn', 'easeOut', 'easeInOut'],
      times: HOME_TIMES,
    },
  },
};

const smileVariants: Variants = {
  normal: { d: DOOR_SMILE },
  animate: {
    d: [
      DOOR_SMILE,
      DOOR_SMILE,
      DOOR_SMILE,
      'M15.8 16.3C14.85 17.85 13.5 18.7 12 18.7C10.5 18.7 9.15 17.85 8.2 16.3',
      'M15.6 16.5C14.7 17.75 13.4 18.5 12 18.5C10.6 18.5 9.3 17.75 8.4 16.5',
      DOOR_SMILE,
    ],
    transition: { duration: 0.85, ease: 'easeInOut', times: HOME_TIMES },
  },
};

const Home01Icon = forwardRef<Home01IconHandle, Home01IconProps>(
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
          style={{ transformBox: 'fill-box', originX: 0.5, originY: 0.895833 }}
        >
          <path
            d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <motion.path
            d="M15.0002 17C14.2007 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79971 17.6224 9.00018 17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={smileVariants}
            animate={controls}
            initial="normal"
          />
        </motion.svg>
      </div>
    );
  }
);

Home01Icon.displayName = 'Home01Icon';

export { Home01Icon };
