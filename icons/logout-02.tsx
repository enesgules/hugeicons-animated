'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Logout02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Logout02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DOOR_DURATION = 0.9;
const DOOR_TIMES = [0, 0.16, 0.4, 1];
const ARROW_LAND = springEase(0.5, 0.3);
const DOOR_LAND = springEase(0.45, 0.35);

// Door (logout): the arrow winds back, pushes out through the doorway, and
// springs back; the door frame recoils from the push and springs back.
const arrowVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(-0.8px)', 'translateX(2.6px)', 'translateX(0px)'],
    transition: {
      duration: DOOR_DURATION,
      times: DOOR_TIMES,
      ease: ['easeOut', [0.4, 0, 0.2, 1], ARROW_LAND],
    },
  },
};

const doorVariants: Variants = {
  normal: { transform: 'translateX(0px) scaleX(1)' },
  animate: {
    transform: [
      'translateX(0px) scaleX(1)',
      'translateX(0px) scaleX(1)',
      'translateX(-1px) scaleX(0.92)',
      'translateX(0px) scaleX(1)',
    ],
    transition: {
      duration: DOOR_DURATION,
      times: DOOR_TIMES,
      ease: ['linear', 'easeIn', DOOR_LAND],
    },
  },
};

const Logout02Icon = forwardRef<Logout02IconHandle, Logout02IconProps>(
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
          <motion.g
            variants={doorVariants}
            animate={controls}
            initial="normal"
            style={{ transformBox: 'view-box', originX: 4 / 24, originY: 0.5 }}
          >
            <path
              d="M4.39267 4.00087C4 4.61597 4 5.41166 4 7.00304V16.997C4 18.5883 4 19.384 4.39267 19.9991C4.46279 20.109 4.5414 20.2132 4.62777 20.3108C5.11144 20.8572 5.87666 21.0758 7.4071 21.513C8.9414 21.9513 9.70856 22.1704 10.264 21.8417C10.3604 21.7847 10.45 21.7171 10.5313 21.6402C11 21.1965 11 20.3988 11 18.8034V5.19662C11 3.60122 11 2.80351 10.5313 2.35982C10.45 2.28288 10.3604 2.21527 10.264 2.15827C9.70856 1.82956 8.9414 2.0487 7.4071 2.48699C5.87666 2.92418 5.11144 3.14278 4.62777 3.68925C4.5414 3.78684 4.46279 3.89103 4.39267 4.00087Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M11 4H13.0171C14.9188 4 15.8696 4 16.4604 4.58579C16.7898 4.91238 16.9355 5.34994 17 6M11 20H13.0171C14.9188 20 15.8696 20 16.4604 19.4142C16.7898 19.0876 16.9355 18.6501 17 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.path
            d="M21 12H14M19.5 9.49994C19.5 9.49994 22 11.3412 22 12C22 12.6588 19.5 14.4999 19.5 14.4999"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={arrowVariants}
            animate={controls}
            initial="normal"
          />
        </svg>
      </div>
    );
  }
);

Logout02Icon.displayName = 'Logout02Icon';

export { Logout02Icon };
