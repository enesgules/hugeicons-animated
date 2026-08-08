'use client';

import type { Easing, Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';
import { useIconAnimation } from '@/lib/use-icon-animation';
import { cn } from '@/lib/utils';

/** Imperative controls for the Copy icon animation. */
export interface Copy01IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Copy01IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FRONT_PATH =
  'M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z';

const COPY_DURATION = 0.86;
const COPY_TIMES = [0, 0.1, 0.34, 0.46, 0.56, 0.76, 0.88, 1];
const COPY_EASING: Easing[] = [
  [0.23, 1, 0.32, 1],
  [0.77, 0, 0.175, 1],
  [0.23, 1, 0.32, 1],
  'linear',
  [0.77, 0, 0.175, 1],
  [0.23, 1, 0.32, 1],
  [0.23, 1, 0.32, 1],
];

// The front sheet grows to cover the rear panel, pauses, then returns.
const frontVariants: Variants = {
  normal: {
    transform: 'translate(0px, 0px) scale(1)',
    strokeWidth: 1.5,
    visibility: 'visible',
  },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(0.45px, 0.45px) scale(0.97)',
      'translate(-6.2px, -6.2px) scale(1.2)',
      'translate(-6px, -6px) scale(1.14)',
      'translate(-6px, -6px) scale(1.14)',
      'translate(0.65px, 0.65px) scale(0.96)',
      'translate(-0.25px, -0.25px) scale(1.03)',
      'translate(0px, 0px) scale(1)',
    ],
    strokeWidth: [
      1.5,
      1.5 / 0.97,
      1.5 / 1.2,
      1.5 / 1.14,
      1.5 / 1.14,
      1.5 / 0.96,
      1.5 / 1.03,
      1.5,
    ],
    visibility: 'visible',
    transition: {
      duration: COPY_DURATION,
      ease: COPY_EASING,
      times: COPY_TIMES,
    },
  },
};

// The invisible mask grows during the overlap so the rear panel is fully hidden.
const occlusionVariants: Variants = {
  normal: { transform: 'translate(0px, 0px) scale(1)' },
  animate: {
    transform: [
      'translate(0px, 0px) scale(1)',
      'translate(0.45px, 0.45px) scale(0.97)',
      'translate(-6.2px, -6.2px) scale(1.24)',
      'translate(-6px, -6px) scale(1.18)',
      'translate(-6px, -6px) scale(1.18)',
      'translate(0.65px, 0.65px) scale(1.06)',
      'translate(-0.25px, -0.25px) scale(1.03)',
      'translate(0px, 0px) scale(1)',
    ],
    transition: {
      duration: COPY_DURATION,
      ease: COPY_EASING,
      times: COPY_TIMES,
    },
  },
};

const generatedGeometryVariants: Variants = {
  normal: { visibility: 'hidden', transition: { duration: 0.08 } },
  animate: { visibility: 'visible', transition: { duration: 0 } },
};

/** Animated Copy icon with imperative hover controls. */
const Copy01Icon = forwardRef<Copy01IconHandle, Copy01IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const occlusionMaskId = useId();
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
          <defs>
            <mask
              id={occlusionMaskId}
              maskUnits="userSpaceOnUse"
              x="-4"
              y="-4"
              width="32"
              height="32"
            >
              <rect x="-4" y="-4" width="32" height="32" fill="white" />
              <motion.g
                variants={generatedGeometryVariants}
                animate={controls}
                initial="normal"
              >
                <motion.path
                  d={FRONT_PATH}
                  fill="black"
                  stroke="black"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  variants={occlusionVariants}
                  animate={controls}
                  initial="normal"
                  style={{ transformOrigin: '15.5px 15.5px' }}
                />
              </motion.g>
            </mask>
          </defs>
          <motion.path
            d={FRONT_PATH}
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            variants={frontVariants}
            animate={controls}
            initial="normal"
            style={{ transformOrigin: '15.5px 15.5px' }}
          />
          <motion.path
            d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            mask={`url(#${occlusionMaskId})`}
          />
        </svg>
      </div>
    );
  }
);

Copy01Icon.displayName = 'Copy01Icon';

export { Copy01Icon };
