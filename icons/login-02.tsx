'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { springEase, useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

export interface Login02IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Login02IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const DOOR_DURATION = 0.9;
const DOOR_TIMES = [0, 0.16, 0.4, 1];
const ARROW_LAND = springEase(0.5, 0.3);
const DOOR_LAND = springEase(0.45, 0.35);

// Door (login): the arrow winds back, pushes in through the doorway, and
// springs back; the door frame takes the hit and springs back.
const arrowVariants: Variants = {
  normal: { transform: 'translateX(0px)' },
  animate: {
    transform: ['translateX(0px)', 'translateX(-0.8px)', 'translateX(1.4px)', 'translateX(0px)'],
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
      'translateX(1px) scaleX(0.92)',
      'translateX(0px) scaleX(1)',
    ],
    transition: {
      duration: DOOR_DURATION,
      times: DOOR_TIMES,
      ease: ['linear', 'easeIn', DOOR_LAND],
    },
  },
};

const Login02Icon = forwardRef<Login02IconHandle, Login02IconProps>(
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
            style={{ transformBox: 'view-box', originX: 21 / 24, originY: 0.5 }}
          >
            <path
              d="M20.6073 4.00087C21 4.61597 21 5.41166 21 7.00304V16.997C21 18.5883 21 19.384 20.6073 19.9991C20.5372 20.109 20.4586 20.2132 20.3722 20.3108C19.8886 20.8572 19.1233 21.0758 17.5929 21.513C16.0586 21.9513 15.2914 22.1704 14.736 21.8417C14.6396 21.7847 14.55 21.7171 14.4687 21.6402C14 21.1965 14 20.3988 14 18.8034V5.19662C14 3.60122 14 2.80351 14.4687 2.35982C14.55 2.28288 14.6396 2.21527 14.736 2.15827C15.2914 1.82956 16.0586 2.0487 17.5929 2.48699C19.1233 2.92418 19.8886 3.14278 20.3722 3.68925C20.4586 3.78684 20.5372 3.89103 20.6073 4.00087Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M14 4H11.9829C10.0812 4 9.13039 4 8.5396 4.58579C8.21023 4.91238 8.06449 5.34994 8 6M14 20H11.9829C10.0812 20 9.13039 20 8.5396 19.4142C8.21023 19.0876 8.06449 18.6501 8 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </motion.g>
          <motion.path
            d="M10 12H3M8.50005 9.49994C8.50005 9.49994 11 11.3412 11 12C11 12.6588 8.50003 14.4999 8.50003 14.4999"
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

Login02Icon.displayName = 'Login02Icon';

export { Login02Icon };
